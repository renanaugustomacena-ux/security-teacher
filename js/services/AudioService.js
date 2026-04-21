/**
 * Audio Service
 * Handles Web Audio API context, analysis, and playback
 */
class AudioService {
  constructor() {
    this.audioContext = null;
    this.source = null;
    this.analyzer = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.buffer = null;
    this.startTime = 0;
    this.pauseOffset = 0;
    this.currentPlaybackRate = 1.0;
    this.onPlaybackEnd = null;
  }

  init() {
    if (!this.audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.analyzer = this.audioContext.createAnalyser();
      this.analyzer.fftSize = 2048;
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
    }
    return this.audioContext.state;
  }

  async loadAudio(fileOrUrl) {
    this.init();
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    let arrayBuffer;
    if (fileOrUrl instanceof Blob) {
      arrayBuffer = await fileOrUrl.arrayBuffer();
    } else {
      const response = await fetch(fileOrUrl);
      arrayBuffer = await response.arrayBuffer();
    }

    this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
    return this.buffer;
  }

  play(startOffset = 0) {
    if (!this.buffer) return;
    this.stop();

    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.playbackRate.value = this.currentPlaybackRate;

    // Connect Chain: Source -> Analyzer -> Gain -> Destination
    this.source.connect(this.analyzer);
    this.analyzer.connect(this.gainNode);

    const actualStartOffset = Math.max(0, Math.min(startOffset, this.buffer.duration));
    this.source.start(0, actualStartOffset);
    this.startTime = this.audioContext.currentTime;
    this.isPlaying = true;
    this.pauseOffset = actualStartOffset;

    this.source.onended = () => {
      if (this.isPlaying) {
        this.isPlaying = false;
        this.pauseOffset = 0;
        if (this.onPlaybackEnd) {
          this.onPlaybackEnd();
        }
      }
    };
  }

  getCurrentTime() {
    if (!this.isPlaying || !this.audioContext) return this.pauseOffset;
    const wallClockElapsed = this.audioContext.currentTime - this.startTime;
    return this.pauseOffset + wallClockElapsed * this.currentPlaybackRate;
  }

  setPlaybackRate(rate) {
    if (!this.source) {
      this.currentPlaybackRate = rate;
      return;
    }
    // Capture current position before changing rate
    const currentPos = this.getCurrentTime();
    this.currentPlaybackRate = rate;
    this.source.playbackRate.value = rate;
    // Reset tracking to maintain continuity
    this.pauseOffset = currentPos;
    this.startTime = this.audioContext.currentTime;
  }

  pause() {
    if (this.isPlaying && this.source) {
      this.pauseOffset = this.getCurrentTime();
      this.source.stop();
      this.isPlaying = false;
    }
  }

  stop() {
    if (this.source) {
      try {
        this.source.onended = null;
        this.source.stop();
      } catch (err) {
        // InvalidStateError when stop() is called on a source that never started.
        if (err?.name !== 'InvalidStateError') {
          console.warn('[audio] source.stop failed:', err);
        }
      }
      try {
        this.source.disconnect();
      } catch (err) {
        console.warn('[audio] source.disconnect failed:', err);
      }
      this.source = null;
    }
    this.isPlaying = false;
    this.pauseOffset = 0;
  }

  getAnalysisData() {
    if (!this.analyzer) return null;
    const dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
    this.analyzer.getByteFrequencyData(dataArray);
    return dataArray;
  }
}

export const audioService = new AudioService();
