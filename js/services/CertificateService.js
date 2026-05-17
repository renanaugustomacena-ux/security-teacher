const TOPIC_NAMES = {
  cybersecurity: 'Cybersecurity',
  python: 'Python',
  linux: 'Linux',
  cpp: 'C++',
  rust: 'Rust',
  networking: 'Networking',
  databases: 'Databases',
  'git-vcs': 'Git & Version Control',
  'cloud-computing': 'Cloud Computing',
  'docker-k8s': 'Docker & Kubernetes',
  nodejs: 'Node.js',
  'ai-engineering': 'AI Engineering',
  'software-dev': 'Software Development',
  'ethical-hacking': 'Ethical Hacking',
  'system-monitoring': 'System Monitoring',
  devsecops: 'DevSecOps',
  'c-programming': 'C Programming',
};

const WIDTH = 1200;
const HEIGHT = 800;
const BG = '#0d1117';
const ACCENT = '#00ff41';
const TEXT = '#c9d1d9';
const DIM = '#8b949e';

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

function drawCornerAccents(ctx) {
  const len = 30;
  const off = 24;
  ctx.strokeStyle = ACCENT;
  ctx.lineWidth = 2;

  // top-left
  ctx.beginPath();
  ctx.moveTo(off, off + len);
  ctx.lineTo(off, off);
  ctx.lineTo(off + len, off);
  ctx.stroke();

  // top-right
  ctx.beginPath();
  ctx.moveTo(WIDTH - off - len, off);
  ctx.lineTo(WIDTH - off, off);
  ctx.lineTo(WIDTH - off, off + len);
  ctx.stroke();

  // bottom-right
  ctx.beginPath();
  ctx.moveTo(WIDTH - off, HEIGHT - off - len);
  ctx.lineTo(WIDTH - off, HEIGHT - off);
  ctx.lineTo(WIDTH - off - len, HEIGHT - off);
  ctx.stroke();

  // bottom-left
  ctx.beginPath();
  ctx.moveTo(off + len, HEIGHT - off);
  ctx.lineTo(off, HEIGHT - off);
  ctx.lineTo(off, HEIGHT - off - len);
  ctx.stroke();
}

function drawBorders(ctx) {
  ctx.strokeStyle = ACCENT;

  // outer border
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, WIDTH - 24, HEIGHT - 24);

  // inner border
  ctx.lineWidth = 1;
  ctx.strokeRect(18, 18, WIDTH - 36, HEIGHT - 36);
}

class CertificateService {
  getTopicName(topicId) {
    return TOPIC_NAMES[topicId] || topicId;
  }

  generateCertificate(topicId, userName, stats = {}) {
    const name = userName || 'Anonymous Learner';
    const topic = this.getTopicName(topicId);
    const { itemsCount = 0, levelsCount = 0, smartScore = 0, accuracy = 0 } = stats;
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');

    // background
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // borders and accents
    drawBorders(ctx);
    drawCornerAccents(ctx);

    // title
    ctx.textAlign = 'center';
    ctx.fillStyle = ACCENT;
    ctx.font = 'bold 14px monospace';
    ctx.fillText('─'.repeat(30), WIDTH / 2, 70);

    ctx.font = 'bold 28px monospace';
    ctx.fillText('CERTIFICATE OF PROFICIENCY', WIDTH / 2, 110);

    ctx.font = 'bold 14px monospace';
    ctx.fillText('─'.repeat(30), WIDTH / 2, 135);

    // presented to
    ctx.fillStyle = DIM;
    ctx.font = '16px monospace';
    ctx.fillText('This certificate is presented to', WIDTH / 2, 190);

    // user name
    ctx.fillStyle = TEXT;
    ctx.font = 'bold 36px monospace';
    ctx.fillText(name, WIDTH / 2, 240);

    // topic line
    ctx.fillStyle = DIM;
    ctx.font = '16px monospace';
    ctx.fillText('for demonstrated proficiency in', WIDTH / 2, 290);

    ctx.fillStyle = ACCENT;
    ctx.font = 'bold 30px monospace';
    ctx.fillText(topic, WIDTH / 2, 335);

    // stats block
    const statsY = 410;
    const col1 = WIDTH / 2 - 200;
    const col2 = WIDTH / 2 + 200;
    ctx.font = '16px monospace';

    ctx.fillStyle = DIM;
    ctx.textAlign = 'right';
    ctx.fillText('Items Studied:', col1, statsY);
    ctx.fillStyle = TEXT;
    ctx.textAlign = 'left';
    ctx.fillText(` ${itemsCount}`, col1, statsY);

    ctx.fillStyle = DIM;
    ctx.textAlign = 'right';
    ctx.fillText('Levels:', col1, statsY + 30);
    ctx.fillStyle = TEXT;
    ctx.textAlign = 'left';
    ctx.fillText(` ${levelsCount}`, col1, statsY + 30);

    ctx.fillStyle = DIM;
    ctx.textAlign = 'right';
    ctx.fillText('SmartScore:', col2, statsY);
    ctx.fillStyle = ACCENT;
    ctx.textAlign = 'left';
    ctx.fillText(` ${smartScore}/100`, col2, statsY);

    ctx.fillStyle = DIM;
    ctx.textAlign = 'right';
    ctx.fillText('Accuracy:', col2, statsY + 30);
    ctx.fillStyle = TEXT;
    ctx.textAlign = 'left';
    ctx.fillText(` ${accuracy}%`, col2, statsY + 30);

    // divider
    ctx.fillStyle = ACCENT;
    ctx.textAlign = 'center';
    ctx.font = '14px monospace';
    ctx.fillText('─'.repeat(50), WIDTH / 2, 510);

    // date
    ctx.fillStyle = DIM;
    ctx.font = '16px monospace';
    ctx.fillText(`Issued on ${dateStr}`, WIDTH / 2, 555);

    // branding
    ctx.fillStyle = ACCENT;
    ctx.font = 'bold 20px monospace';
    ctx.fillText('Knowledge AIO', WIDTH / 2, 620);
    ctx.fillStyle = DIM;
    ctx.font = '14px monospace';
    ctx.fillText('All-In-One Bilingual Tech Vocabulary', WIDTH / 2, 650);

    // verification hash
    const hash = simpleHash(topicId + name + dateStr);
    ctx.fillStyle = DIM;
    ctx.font = '12px monospace';
    ctx.fillText(`Verification: ${hash}`, WIDTH / 2, 730);

    return canvas;
  }

  downloadCertificate(topicId, userName, stats) {
    const canvas = this.generateCertificate(topicId, userName, stats);
    const link = document.createElement('a');
    link.download = `certificate-${topicId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  /** Exposed for testing. */
  _hash(str) {
    return simpleHash(str);
  }
}

export { CertificateService };
export const certificateService = new CertificateService();
