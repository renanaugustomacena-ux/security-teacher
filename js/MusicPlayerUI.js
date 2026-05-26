export const musicPlayerUIMixin = {

  _showPlayer() {
    const selection = document.getElementById('song-selection');
    const container = document.getElementById('karaoke-container');
    if (selection) selection.classList.add('hidden');
    if (container) container.classList.remove('hidden');
    this._hideCompletion();

    const titleEl = document.getElementById('karaoke-song-title');
    const artistEl = document.getElementById('karaoke-artist');
    if (titleEl) titleEl.textContent = this.currentSong?.title || '';
    if (artistEl) artistEl.textContent = this.currentSong?.artist || '';

    const scrollContainer = document.getElementById('lyrics-scroll-container');
    if (scrollContainer) scrollContainer.classList.remove('hidden');

    const viewport = document.getElementById('lyrics-scroll-viewport');
    if (viewport) {
      viewport.textContent = '';
      viewport.style.transform = 'translateY(0)';
      const placeholder = document.createElement('div');
      placeholder.className = 'lyrics-scroll-placeholder';
      placeholder.id = 'lyrics-scroll-placeholder';
      placeholder.textContent = 'Sincronizzazione... / Syncing...';
      viewport.appendChild(placeholder);
    }
  },

  _renderRealtimeControls() {
    const nav = document.querySelector('.karaoke-nav');
    if (!nav) return;
    nav.textContent = '';

    const playBtn = document.createElement('button');
    playBtn.className = 'btn btn-primary';
    playBtn.id = 'play-pause-btn';
    playBtn.textContent = 'Riprendi / Play';
    playBtn.addEventListener('click', () => this.togglePlayback());
    nav.appendChild(playBtn);

    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn btn-secondary';
    prevBtn.textContent = '⏮ Linea / Line';
    prevBtn.addEventListener('click', () => this.prevLine());
    nav.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-secondary';
    nextBtn.textContent = 'Linea / Line ⏭';
    nextBtn.addEventListener('click', () => this.nextLine());
    nav.appendChild(nextBtn);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn btn-secondary';
    resetBtn.textContent = '↻ Reset';
    resetBtn.addEventListener('click', () => this.restartSong());
    nav.appendChild(resetBtn);

    const syncGroup = document.createElement('div');
    syncGroup.className = 'sync-offset-controls';
    const offsets = [
      { label: '-1s', delta: -1 },
      { label: '-0.5s', delta: -0.5 },
      { label: '-0.1s', delta: -0.1 },
    ];
    const positives = [
      { label: '+0.1s', delta: 0.1 },
      { label: '+0.5s', delta: 0.5 },
      { label: '+1s', delta: 1 },
    ];
    for (const { label, delta } of offsets) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-sync';
      btn.textContent = label;
      btn.addEventListener('click', () => this.adjustSync(delta));
      syncGroup.appendChild(btn);
    }
    const display = document.createElement('span');
    display.id = 'sync-offset-display';
    display.textContent = 'Sync: +0.00s';
    syncGroup.appendChild(display);
    for (const { label, delta } of positives) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-sync';
      btn.textContent = label;
      btn.addEventListener('click', () => this.adjustSync(delta));
      syncGroup.appendChild(btn);
    }
    const resetSync = document.createElement('button');
    resetSync.className = 'btn btn-sync';
    resetSync.textContent = 'Reset sync';
    resetSync.addEventListener('click', () => this.resetSync());
    syncGroup.appendChild(resetSync);

    nav.appendChild(syncGroup);
    this._updateOffsetDisplay();
  },

  _updatePlayButton(isPlaying) {
    const btn = document.getElementById('play-pause-btn');
    if (!btn) return;
    btn.textContent = isPlaying ? '⏸ Pausa / Pause' : '▶ Riprendi / Play';
  },

  _renderPlaceholder({ primary, detail, hint }) {
    const viewport = document.getElementById('lyrics-scroll-viewport');
    if (!viewport) return;
    viewport.textContent = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'lyrics-scroll-placeholder';
    wrapper.id = 'lyrics-scroll-placeholder';

    const p1 = document.createElement('p');
    p1.textContent = primary;
    wrapper.appendChild(p1);

    if (detail) {
      const p2 = document.createElement('p');
      p2.style.fontSize = '0.85rem';
      p2.style.marginTop = '0.5rem';
      p2.style.opacity = '0.7';
      p2.textContent = detail;
      if (hint) {
        p2.appendChild(document.createElement('br'));
        p2.appendChild(document.createTextNode(hint));
      }
      wrapper.appendChild(p2);
    }
    viewport.appendChild(wrapper);
  },

  _hideCompletion() {
    const el = document.getElementById('step-completion');
    if (el) el.classList.add('hidden');
  },
};
