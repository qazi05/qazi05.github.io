(() => {
  const canvas = document.getElementById('pattern-canvas');
  if (!canvas) return;

  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return;

  const width = canvas.width;
  const height = canvas.height;
  const size = width * height;
  const image = context.createImageData(width, height);
  const pixels = image.data;
  const neighbors = Array.from({ length: 8 }, () => new Uint32Array(size));
  const presets = {
    spots: { feed: 0.035, kill: 0.065, diffusion: 0.50 },
    stripes: { feed: 0.022, kill: 0.051, diffusion: 0.50 },
    maze: { feed: 0.029, kill: 0.057, diffusion: 0.50 },
    coral: { feed: 0.055, kill: 0.062, diffusion: 0.50 }
  };
  const palette = [
    [251, 227, 208], // cream
    [243, 201, 175], // peach
    [217, 156, 151], // blush
    [187, 94, 97],   // rose
    [162, 52, 56]    // ember
  ];
  const controls = {
    preset: document.getElementById('pattern-preset'),
    feed: document.getElementById('feed-rate'),
    kill: document.getElementById('kill-rate'),
    diffusion: document.getElementById('diffusion-rate'),
    speed: document.getElementById('pattern-speed'),
    toggle: document.getElementById('pattern-toggle'),
    reset: document.getElementById('pattern-reset'),
    status: document.getElementById('pattern-status')
  };
  const outputs = {
    feed: document.getElementById('feed-value'),
    kill: document.getElementById('kill-value'),
    diffusion: document.getElementById('diffusion-value'),
    speed: document.getElementById('speed-value')
  };

  let a = new Float32Array(size);
  let b = new Float32Array(size);
  let nextA = new Float32Array(size);
  let nextB = new Float32Array(size);
  let running = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = true;
  let lastFrame = 0;
  let drawing = false;

  for (let y = 0; y < height; y++) {
    const up = (y + height - 1) % height;
    const down = (y + 1) % height;
    for (let x = 0; x < width; x++) {
      const left = (x + width - 1) % width;
      const right = (x + 1) % width;
      const i = y * width + x;
      neighbors[0][i] = up * width + x;
      neighbors[1][i] = down * width + x;
      neighbors[2][i] = y * width + left;
      neighbors[3][i] = y * width + right;
      neighbors[4][i] = up * width + left;
      neighbors[5][i] = up * width + right;
      neighbors[6][i] = down * width + left;
      neighbors[7][i] = down * width + right;
    }
  }

  function updateOutputs() {
    outputs.feed.value = Number(controls.feed.value).toFixed(3);
    outputs.kill.value = Number(controls.kill.value).toFixed(3);
    outputs.diffusion.value = Number(controls.diffusion.value).toFixed(2);
    outputs.speed.value = controls.speed.value;
  }

  function updateStatus() {
    controls.toggle.textContent = running ? 'Pause' : 'Play';
    controls.status.textContent = running ? 'Pattern growing' : 'Paused';
  }

  function seed(cx, cy, radius = 5) {
    const r2 = radius * radius;
    for (let dy = -radius; dy <= radius; dy++) {
      const y = (cy + dy + height) % height;
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx * dx + dy * dy > r2) continue;
        const x = (cx + dx + width) % width;
        const i = y * width + x;
        a[i] = 0.15;
        b[i] = 0.9;
      }
    }
  }

  function startOver() {
    a.fill(1);
    b.fill(0);
    for (let i = 0; i < 18; i++) {
      seed(
        12 + Math.floor(Math.random() * (width - 24)),
        12 + Math.floor(Math.random() * (height - 24)),
        3 + Math.floor(Math.random() * 5)
      );
    }
    render();
  }

  function step() {
    const feed = Number(controls.feed.value);
    const kill = Number(controls.kill.value);
    const diffusion = Number(controls.diffusion.value);
    const [up, down, left, right, upLeft, upRight, downLeft, downRight] = neighbors;

    for (let i = 0; i < size; i++) {
      const av = a[i];
      const bv = b[i];
      const lapA = 0.2 * (a[up[i]] + a[down[i]] + a[left[i]] + a[right[i]])
        + 0.05 * (a[upLeft[i]] + a[upRight[i]] + a[downLeft[i]] + a[downRight[i]]) - av;
      const lapB = 0.2 * (b[up[i]] + b[down[i]] + b[left[i]] + b[right[i]])
        + 0.05 * (b[upLeft[i]] + b[upRight[i]] + b[downLeft[i]] + b[downRight[i]]) - bv;
      const reaction = av * bv * bv;
      nextA[i] = Math.max(0, Math.min(1, av + lapA - reaction + feed * (1 - av)));
      nextB[i] = Math.max(0, Math.min(1, bv + diffusion * lapB + reaction - (kill + feed) * bv));
    }

    [a, nextA] = [nextA, a];
    [b, nextB] = [nextB, b];
  }

  function render() {
    for (let i = 0; i < size; i++) {
      const shade = Math.max(0, Math.min(3.999, (b[i] - 0.01) * 13));
      const band = Math.floor(shade);
      const blend = shade - band;
      const offset = i * 4;
      for (let channel = 0; channel < 3; channel++) {
        pixels[offset + channel] = palette[band][channel] * (1 - blend)
          + palette[band + 1][channel] * blend;
      }
      pixels[offset + 3] = 255;
    }
    context.putImageData(image, 0, 0);
  }

  function drawAt(event) {
    const bounds = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - bounds.left) * width / bounds.width);
    const y = Math.floor((event.clientY - bounds.top) * height / bounds.height);
    seed(Math.max(0, Math.min(width - 1, x)), Math.max(0, Math.min(height - 1, y)), 5);
    render();
  }

  function animate(time) {
    if (running && visible && !document.hidden && time - lastFrame >= 1000 / 30) {
      for (let i = 0; i < Number(controls.speed.value); i++) step();
      render();
      lastFrame = time;
    }
    requestAnimationFrame(animate);
  }

  controls.preset.addEventListener('change', () => {
    const preset = presets[controls.preset.value];
    controls.feed.value = preset.feed;
    controls.kill.value = preset.kill;
    controls.diffusion.value = preset.diffusion;
    updateOutputs();
    startOver();
  });
  for (const name of ['feed', 'kill', 'diffusion', 'speed']) {
    controls[name].addEventListener('input', updateOutputs);
  }
  controls.toggle.addEventListener('click', () => {
    running = !running;
    updateStatus();
  });
  controls.reset.addEventListener('click', startOver);

  canvas.addEventListener('pointerdown', event => {
    drawing = true;
    canvas.setPointerCapture(event.pointerId);
    drawAt(event);
  });
  canvas.addEventListener('pointermove', event => {
    if (drawing) drawAt(event);
  });
  canvas.addEventListener('pointerup', () => { drawing = false; });
  canvas.addEventListener('pointercancel', () => { drawing = false; });
  canvas.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      seed(Math.floor(width / 2), Math.floor(height / 2), 7);
      render();
    }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
    }).observe(canvas);
  }

  updateOutputs();
  updateStatus();
  startOver();
  requestAnimationFrame(animate);
})();
