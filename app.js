const BOARD_WIDTH = 2000;
const BOARD_HEIGHT = 1125;
const DWELL_TIME_MS = 900;
const HAND_TRIGGER_COOLDOWN_MS = 260;
const HAND_REARM_DELAY_MS = 220;
const HOTSPOT_PADDING_FINE = { x: 8, y: 10 };
const HOTSPOT_PADDING_COARSE = { x: 14, y: 16 };
const VOICE_PRIORITIES = ["kk-kz", "kk", "tr-tr", "tr", "ru-ru", "ru", "en-us", "en-gb", "en"];
const AUDIO_BASE_PATH = "assets/audio";

const TYPE_META = {
  vowel: {
    label: "Дауысты",
    speech: "Дауысты дыбыс.",
    className: "vowel",
  },
  consonantSoft: {
    label: "Дауыссыз жіңішке",
    speech: "Дауыссыз дыбыс.",
    className: "soft",
  },
  consonantHard: {
    label: "Дауыссыз жуан",
    speech: "Дауыссыз дыбыс.",
    className: "hard",
  },
  consonantNeutral: {
    label: "Дауыссыз",
    speech: "Дауыссыз дыбыс.",
    className: "neutral",
  },
  consonantMixed: {
    label: "Дауыссыз, нұсқалары бар",
    speech: "Дауыссыз дыбыс, жуан және жіңішке нұсқалары бар.",
    className: "hard",
  },
  compound: {
    label: "Қосарлы таңба",
    speech: "Қосарлы таңба.",
    className: "compound",
  },
};

const COMPOUND_DESCRIPTION =
  "Бұл карточкада бірнеше дыбыс не дыбыс тіркесі бірге берілген. Яғни бұл жеке әріптен гөрі қосарлы таңба ретінде оқытылады.";

const CARDS = [
  {
    id: "zh-y",
    label: "Ж/Й",
    spoken: "Ж немесе Й",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "Ж және й дыбыстары үшін қолданылатын карточка. Слайдта жуан және жіңішке нұсқалары бірге көрсетілген.",
    bounds: { left: 1016, top: 234, width: 92, height: 172 },
  },
  {
    id: "e",
    label: "Е",
    spoken: "Е",
    type: "vowel",
    kind: "Дауысты дыбыс",
    description: "Е таңбасы дауысты дыбысты білдіреді.",
    bounds: { left: 1121, top: 234, width: 92, height: 172 },
  },
  {
    id: "d",
    label: "Д",
    spoken: "Д",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "Д дыбысына арналған карточка. Жуан, жіңішке және қосымша белгісі бар нұсқалары слайдта бірге берілген.",
    bounds: { left: 1227, top: 234, width: 92, height: 172 },
  },
  {
    id: "g-gh",
    label: "Г/Ғ",
    spoken: "Г немесе Ғ",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "Г және Ғ дыбыстарына сәйкес келетін таңба. Буын жуан не жіңішке болуына қарай түрленіп қолданылады.",
    bounds: { left: 1330, top: 234, width: 94, height: 172 },
  },
  {
    id: "v",
    label: "В",
    spoken: "В",
    type: "consonantNeutral",
    kind: "Негізгі таңба",
    description: "В дыбысына арналған дауыссыз таңба.",
    bounds: { left: 1436, top: 234, width: 92, height: 172 },
  },
  {
    id: "b",
    label: "Б",
    spoken: "Б",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "Б дыбысы үшін қолданылатын карточка. Слайдтағы келесі беттерде бұл таңбаның бірнеше буында қолданылуы көрсетілген.",
    bounds: { left: 1539, top: 234, width: 92, height: 172 },
  },
  {
    id: "ae",
    label: "Ә",
    spoken: "Ә",
    type: "vowel",
    kind: "Дауысты дыбыс",
    description: "Ә таңбасы дауысты дыбысты білдіреді.",
    bounds: { left: 1643, top: 234, width: 94, height: 172 },
  },
  {
    id: "a",
    label: "А",
    spoken: "А",
    type: "vowel",
    kind: "Дауысты дыбыс",
    description: "А таңбасы дауысты дыбысты білдіреді.",
    bounds: { left: 1747, top: 234, width: 94, height: 172 },
  },
  {
    id: "alt-lt-ld",
    label: "АЛТ / ЛТ / ЛД",
    spoken: "Алт, Лт немесе Лд",
    type: "compound",
    kind: "Қосарлы таңба",
    description: COMPOUND_DESCRIPTION,
    bounds: { left: 393, top: 354, width: 107, height: 147 },
  },
  {
    id: "ant-nt-nd",
    label: "АНТ / НТ / НД",
    spoken: "Ант, Нт немесе Нд",
    type: "compound",
    kind: "Қосарлы таңба",
    description: COMPOUND_DESCRIPTION,
    bounds: { left: 510, top: 354, width: 107, height: 147 },
  },
  {
    id: "nch-nsh",
    label: "НЧ / НШ",
    spoken: "Нч немесе Нш",
    type: "compound",
    kind: "Қосарлы таңба",
    description: COMPOUND_DESCRIPTION,
    bounds: { left: 627, top: 354, width: 109, height: 147 },
  },
  {
    id: "ik-ek-yk",
    label: "ИК / ЕК / ЫК",
    spoken: "Ик, Ек немесе Ық",
    type: "compound",
    kind: "Қосарлы таңба",
    description: COMPOUND_DESCRIPTION,
    bounds: { left: 744, top: 354, width: 107, height: 147 },
  },
  {
    id: "ok-uk-front",
    label: "ӨК / ҮК",
    spoken: "Өк немесе Үк",
    type: "compound",
    kind: "Қосарлы таңба",
    description: COMPOUND_DESCRIPTION,
    bounds: { left: 275, top: 356, width: 108, height: 146 },
  },
  {
    id: "oq-uq",
    label: "ОҚ / ҰҚ",
    spoken: "Оқ немесе Ұқ",
    type: "compound",
    kind: "Қосарлы таңба",
    description: COMPOUND_DESCRIPTION,
    bounds: { left: 158, top: 357, width: 108, height: 147 },
  },
  {
    id: "o-u",
    label: "О/У",
    spoken: "О немесе У",
    type: "vowel",
    kind: "Дауысты дыбыс",
    description:
      "О және У дыбыстары көрсетілген дауысты карточка. Екі дыбыс бір таңбада қатар берілген.",
    bounds: { left: 1014, top: 447, width: 92, height: 171 },
  },
  {
    id: "ng",
    label: "Ң",
    spoken: "Ң",
    type: "consonantNeutral",
    kind: "Негізгі таңба",
    description: "Ң дыбысына арналған дауыссыз таңба.",
    bounds: { left: 1121, top: 447, width: 92, height: 171 },
  },
  {
    id: "n",
    label: "Н",
    spoken: "Н",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "Н дыбысына арналған карточка. Бұл жерде де жуан, жіңішке және қосымша түрі қатар көрсетілген.",
    bounds: { left: 1225, top: 447, width: 94, height: 171 },
  },
  {
    id: "m",
    label: "М",
    spoken: "М",
    type: "consonantNeutral",
    kind: "Негізгі таңба",
    description: "М дыбысына арналған дауыссыз таңба.",
    bounds: { left: 1332, top: 447, width: 92, height: 171 },
  },
  {
    id: "l",
    label: "Л",
    spoken: "Л",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "Л дыбысының карточкасы. Жуан және жіңішке буынға қарай түрліше таңбаланады.",
    bounds: { left: 1436, top: 448, width: 93, height: 170 },
  },
  {
    id: "k-q",
    label: "К/Қ",
    spoken: "К немесе Қ",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "К және Қ дыбыстары үшін қолданылатын таңба. Слайдта оның екі түрлі нұсқасы берілген.",
    bounds: { left: 1539, top: 447, width: 94, height: 171 },
  },
  {
    id: "i",
    label: "И",
    spoken: "И",
    type: "vowel",
    kind: "Дауысты дыбыс",
    description: "И таңбасы дауысты дыбысты білдіреді.",
    bounds: { left: 1643, top: 448, width: 94, height: 170 },
  },
  {
    id: "z",
    label: "З",
    spoken: "З",
    type: "consonantNeutral",
    kind: "Негізгі таңба",
    description: "З дыбысына арналған дауыссыз таңба.",
    bounds: { left: 1747, top: 447, width: 94, height: 171 },
  },
  {
    id: "ai-yai",
    label: "АЙ / ЯЙ",
    spoken: "Ай немесе Яй",
    type: "compound",
    kind: "Қосарлы таңба",
    description: COMPOUND_DESCRIPTION,
    bounds: { left: 509, top: 538, width: 108, height: 146 },
  },
  {
    id: "ot-ut",
    label: "ОТ / УТ",
    spoken: "От немесе Ут",
    type: "compound",
    kind: "Қосарлы таңба",
    description: COMPOUND_DESCRIPTION,
    bounds: { left: 627, top: 538, width: 109, height: 146 },
  },
  {
    id: "art-rt-rd",
    label: "АРТ / РТ / РД",
    spoken: "Арт, Рт немесе Рд",
    type: "compound",
    kind: "Қосарлы таңба",
    description: COMPOUND_DESCRIPTION,
    bounds: { left: 744, top: 538, width: 107, height: 146 },
  },
  {
    id: "c",
    label: "Ц",
    spoken: "Ц",
    type: "consonantNeutral",
    kind: "Негізгі таңба",
    description: "Ц дыбысына арналған дауыссыз таңба.",
    bounds: { left: 1014, top: 661, width: 94, height: 171 },
  },
  {
    id: "h",
    label: "Х",
    spoken: "Х",
    type: "consonantNeutral",
    kind: "Негізгі таңба",
    description: "Х дыбысына арналған дауыссыз таңба.",
    bounds: { left: 1119, top: 661, width: 94, height: 171 },
  },
  {
    id: "f",
    label: "Ф",
    spoken: "Ф",
    type: "consonantNeutral",
    kind: "Негізгі таңба",
    description: "Ф дыбысына арналған дауыссыз таңба.",
    bounds: { left: 1227, top: 659, width: 93, height: 172 },
  },
  {
    id: "t",
    label: "Т",
    spoken: "Т",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "Т дыбысына арналған карточка. Бұл жерде де буын ерекшелігіне қарай бірнеше нұсқа көрсетілген.",
    bounds: { left: 1330, top: 659, width: 94, height: 172 },
  },
  {
    id: "s",
    label: "С",
    spoken: "С",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "С дыбысына арналған таңба. Слайдта жіңішке және жуан нұсқалары қатар берілген.",
    bounds: { left: 1434, top: 659, width: 94, height: 172 },
  },
  {
    id: "r",
    label: "Р",
    spoken: "Р",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "Р дыбысына арналған карточка. Жуан, жіңішке және қосымша белгісі бар түрлері көрінеді.",
    bounds: { left: 1539, top: 659, width: 94, height: 172 },
  },
  {
    id: "p",
    label: "П",
    spoken: "П",
    type: "consonantNeutral",
    kind: "Негізгі таңба",
    description: "П дыбысына арналған дауыссыз таңба.",
    bounds: { left: 1643, top: 659, width: 94, height: 172 },
  },
  {
    id: "oe-ue",
    label: "Ө/Ү",
    spoken: "Ө немесе Ү",
    type: "vowel",
    kind: "Дауысты дыбыс",
    description:
      "Ө және Ү дыбыстары бірге берілген дауысты карточка.",
    bounds: { left: 1747, top: 659, width: 94, height: 172 },
  },
  {
    id: "i-y",
    label: "І/Ы",
    spoken: "І немесе Ы",
    type: "vowel",
    kind: "Дауысты дыбыс",
    description: "І және Ы дыбыстарына арналған дауысты карточка.",
    bounds: { left: 1541, top: 870, width: 92, height: 171 },
  },
  {
    id: "sh",
    label: "Ш",
    spoken: "Ш",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "Ш дыбысына арналған карточка. Негізгі және қосымша таңбалары бірге көрсетілген.",
    bounds: { left: 1643, top: 871, width: 94, height: 172 },
  },
  {
    id: "ch",
    label: "Ч",
    spoken: "Ч",
    type: "consonantMixed",
    kind: "Негізгі таңба",
    description:
      "Ч дыбысына арналған карточка. Жуан және жіңішке нұсқалары бірге орналасқан.",
    bounds: { left: 1747, top: 870, width: 94, height: 171 },
  },
];

const state = {
  selectedId: "a",
  voiceEnabled: true,
  currentVoice: null,
  audioPlayer: null,
  audioUnlocked: false,
  speechPrimed: false,
  speechRequestId: 0,
  boardReady: false,
  camera: null,
  hands: null,
  cameraRunning: false,
  hoverId: null,
  hoverProgress: 0,
  hoverStartedAt: 0,
  hoverLockedId: null,
  hoverReleaseStartedAt: 0,
  smoothedCursor: null,
  lastHandTriggerAt: 0,
  selectedFrom: "Бастапқы көрініс",
};

const cardById = new Map(CARDS.map((card) => [card.id, card]));

const boardImage = document.getElementById("board-image");
const hotspotsLayer = document.getElementById("hotspots");
const previewCanvas = document.getElementById("preview-canvas");
const selectedLabel = document.getElementById("selected-label");
const selectedKind = document.getElementById("selected-kind");
const selectedDescription = document.getElementById("selected-description");
const typePill = document.getElementById("type-pill");
const spokenText = document.getElementById("spoken-text");
const selectionSource = document.getElementById("selection-source");
const voiceStatusText = document.getElementById("voice-status-text");
const startCameraButton = document.getElementById("start-camera");
const toggleVoiceButton = document.getElementById("toggle-voice");
const speakAgainButton = document.getElementById("speak-again");
const fullscreenButton = document.getElementById("fullscreen-btn");
const handCursor = document.getElementById("hand-cursor");
const cameraVideo = document.getElementById("camera-video");
const cameraCanvas = document.getElementById("camera-canvas");
const cameraPlaceholder = document.getElementById("camera-placeholder");
const cameraStatus = document.getElementById("camera-status");
const trackingStatus = document.getElementById("tracking-status");
const hoverStatus = document.getElementById("hover-status");

function createHotspots() {
  const fragment = document.createDocumentFragment();

  CARDS.forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hotspot";
    button.dataset.id = card.id;
    button.title = card.label;
    button.setAttribute(
      "aria-label",
      `${card.label}: ${TYPE_META[card.type].label}`
    );
    positionElement(button, card.bounds);

    button.addEventListener("click", () => {
      primeSpeech();
      selectCard(card.id, "Қолмен таңдалды");
    });

    fragment.appendChild(button);
  });

  hotspotsLayer.appendChild(fragment);
}

function positionElement(element, bounds) {
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const padding = isCoarsePointer ? HOTSPOT_PADDING_COARSE : HOTSPOT_PADDING_FINE;
  const expandedBounds = {
    left: Math.max(0, bounds.left - padding.x),
    top: Math.max(0, bounds.top - padding.y),
    width: Math.min(
      BOARD_WIDTH - Math.max(0, bounds.left - padding.x),
      bounds.width + padding.x * 2
    ),
    height: Math.min(
      BOARD_HEIGHT - Math.max(0, bounds.top - padding.y),
      bounds.height + padding.y * 2
    ),
  };

  element.style.left = `${(expandedBounds.left / BOARD_WIDTH) * 100}%`;
  element.style.top = `${(expandedBounds.top / BOARD_HEIGHT) * 100}%`;
  element.style.width = `${(expandedBounds.width / BOARD_WIDTH) * 100}%`;
  element.style.height = `${(expandedBounds.height / BOARD_HEIGHT) * 100}%`;
}

function selectCard(cardId, sourceLabel, options = {}) {
  const card = cardById.get(cardId);
  if (!card) return;

  const { silent = false } = options;

  state.selectedId = cardId;
  state.selectedFrom = sourceLabel;

  selectedLabel.textContent = card.label;
  selectedKind.textContent = card.kind;
  selectedDescription.textContent = card.description;
  spokenText.textContent = buildSpeech(card);
  selectionSource.textContent = sourceLabel;

  const type = TYPE_META[card.type];
  typePill.textContent = type.label;
  typePill.className = `type-pill type-pill--${type.className}`;

  document.querySelectorAll(".hotspot").forEach((hotspot) => {
    hotspot.classList.toggle("is-active", hotspot.dataset.id === card.id);
  });

  drawPreview(card);

  if (!silent && state.voiceEnabled) {
    speakCard(card);
  }
}

function buildSpeech(card) {
  return `${card.spoken}. ${TYPE_META[card.type].speech}`;
}

function getAudioSource(card) {
  return `${AUDIO_BASE_PATH}/${card.id}.mp3`;
}

function hasSpeechSupport() {
  return (
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window
  );
}

function hasAudioSupport() {
  return typeof Audio !== "undefined";
}

function updateVoiceStatus(text) {
  if (voiceStatusText) {
    voiceStatusText.textContent = text;
  }
}

function setupAudio() {
  if (!hasAudioSupport()) {
    updateVoiceStatus("Бұл браузерде аудио жоқ");
    return;
  }

  const player = new Audio();
  player.preload = "auto";

  player.addEventListener("playing", () => {
    updateVoiceStatus("Дыбыс ойналып жатыр");
  });

  player.addEventListener("ended", () => {
    updateVoiceStatus("Дыбыс дайын");
  });

  player.addEventListener("pause", () => {
    if (!player.ended && player.currentTime > 0) {
      updateVoiceStatus("Дыбыс тоқтатылды");
    }
  });

  player.addEventListener("error", () => {
    updateVoiceStatus("Аудио ашылмады, қосалқы дауыс тексерілуде");
  });

  state.audioPlayer = player;
  updateVoiceStatus("Дыбыс дайын");
}

function primeAudio() {
  state.audioUnlocked = true;
}

function fitCanvasToDisplay(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const width = Math.round(canvas.clientWidth * ratio);
  const height = Math.round(canvas.clientHeight * ratio);

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

function drawPreview(card) {
  if (!boardImage.complete) return;

  fitCanvasToDisplay(previewCanvas);

  const ctx = previewCanvas.getContext("2d");
  const width = previewCanvas.width;
  const height = previewCanvas.height;
  const pad = 24 * (window.devicePixelRatio || 1);

  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(255,255,255,0.94)");
  gradient.addColorStop(1, "rgba(216,209,195,0.95)");
  ctx.fillStyle = gradient;
  roundRect(ctx, 0, 0, width, height, 32 * (window.devicePixelRatio || 1));
  ctx.fill();

  const scale = Math.min(
    (width - pad * 2) / card.bounds.width,
    (height - pad * 2) / card.bounds.height
  );
  const drawWidth = card.bounds.width * scale;
  const drawHeight = card.bounds.height * scale;
  const dx = (width - drawWidth) / 2;
  const dy = (height - drawHeight) / 2;

  ctx.save();
  roundRect(ctx, dx, dy, drawWidth, drawHeight, 22 * (window.devicePixelRatio || 1));
  ctx.clip();
  ctx.drawImage(
    boardImage,
    card.bounds.left,
    card.bounds.top,
    card.bounds.width,
    card.bounds.height,
    dx,
    dy,
    drawWidth,
    drawHeight
  );
  ctx.restore();

  ctx.strokeStyle = "rgba(115, 75, 43, 0.18)";
  ctx.lineWidth = 2 * (window.devicePixelRatio || 1);
  roundRect(ctx, dx, dy, drawWidth, drawHeight, 22 * (window.devicePixelRatio || 1));
  ctx.stroke();
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function setupVoices() {
  if (!hasSpeechSupport()) {
    if (!state.audioPlayer) {
      toggleVoiceButton.disabled = true;
      speakAgainButton.disabled = true;
      updateVoiceStatus("Бұл браузерде дыбыс жоқ");
    }
    return;
  }

  const pickVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    let selected = null;

    VOICE_PRIORITIES.some((lang) => {
      selected =
        voices.find((voice) => voice.lang.toLowerCase() === lang) ||
        voices.find((voice) => voice.lang.toLowerCase().startsWith(lang));
      return Boolean(selected);
    });

    state.currentVoice = selected || voices[0] || null;

    if (state.audioPlayer) {
      return;
    }

    if (state.currentVoice) {
      updateVoiceStatus(`Дайын: ${state.currentVoice.name} (${state.currentVoice.lang})`);
    } else {
      updateVoiceStatus("Дайын: жүйелік дауыс қолданылады");
    }
  };

  pickVoice();
  if (typeof window.speechSynthesis.addEventListener === "function") {
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
  } else {
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }
  window.setTimeout(pickVoice, 250);
  window.setTimeout(pickVoice, 1000);
}

function primeSpeech() {
  if (!hasSpeechSupport()) return false;

  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.resume();
    state.speechPrimed = true;

    if (state.audioPlayer) {
      return true;
    }

    if (state.currentVoice) {
      updateVoiceStatus(`Дайын: ${state.currentVoice.name} (${state.currentVoice.lang})`);
    } else {
      updateVoiceStatus("Дайын: жүйелік дауыс қолданылады");
    }

    return true;
  } catch (error) {
    console.warn("Speech warm-up failed", error);
    updateVoiceStatus("Дыбысты іске қосу болмады");
    return false;
  }
}

function speakCard(card) {
  if (state.audioPlayer) {
    playCardAudio(card);
    return;
  }

  speakCardWithSpeechSynthesis(card);
}

function playCardAudio(card) {
  if (!state.audioPlayer) {
    speakCardWithSpeechSynthesis(card);
    return;
  }

  primeAudio();

  const player = state.audioPlayer;
  const nextSrc = new URL(getAudioSource(card), window.location.href).href;

  if (player.src !== nextSrc) {
    player.src = nextSrc;
  }

  player.pause();
  player.currentTime = 0;
  updateVoiceStatus("Дыбыс жүктелуде...");

  const playPromise = player.play();

  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch((error) => {
      console.warn("Audio playback failed", error);
      updateVoiceStatus("Аудио іске қосылмады, қосалқы дауыс тексерілуде");
      speakCardWithSpeechSynthesis(card);
    });
  }
}

function speakCardWithSpeechSynthesis(card) {
  if (!hasSpeechSupport()) {
    updateVoiceStatus("Бұл құрылғыда дыбыс іске қосылмады");
    return;
  }

  primeSpeech();

  const synth = window.speechSynthesis;
  const requestId = ++state.speechRequestId;
  const voice = state.currentVoice;
  const voiceLabel = voice
    ? `${voice.name} (${voice.lang})`
    : "жүйелік дауыс";

  const utterance = new SpeechSynthesisUtterance(buildSpeech(card));
  utterance.lang = voice?.lang || "kk-KZ";
  utterance.rate = 0.88;
  utterance.pitch = 1;
  utterance.volume = 1;

  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    if (requestId === state.speechRequestId) {
      updateVoiceStatus(`Қосалқы дауыс оқып жатыр: ${voiceLabel}`);
    }
  };

  utterance.onend = () => {
    if (requestId === state.speechRequestId) {
      updateVoiceStatus(`Қосалқы дауыс дайын: ${voiceLabel}`);
    }
  };

  utterance.onerror = (event) => {
    if (requestId === state.speechRequestId) {
      console.warn("Speech synthesis error", event.error);
      updateVoiceStatus(`Қате: ${event.error || "дыбыстау істемеді"}`);
    }
  };

  synth.cancel();
  synth.resume();
  synth.speak(utterance);
}

function updateVoiceButton() {
  toggleVoiceButton.textContent = `Дыбыстау: ${
    state.voiceEnabled ? "қосулы" : "өшірулі"
  }`;
  toggleVoiceButton.setAttribute("aria-pressed", String(state.voiceEnabled));
}

function getCurrentCard() {
  return cardById.get(state.selectedId) || CARDS[0];
}

function updateHandCursor(x, y, progress, visible) {
  handCursor.hidden = !visible;
  if (!visible) return;

  handCursor.style.left = `${x}px`;
  handCursor.style.top = `${y}px`;
  handCursor.style.setProperty("--progress", `${Math.round(progress * 100)}`);
}

function updateDwellHotspots(targetId = null) {
  document.querySelectorAll(".hotspot").forEach((hotspot) => {
    hotspot.classList.toggle("is-dwell", hotspot.dataset.id === targetId);
  });
}

function resetHoverState(options = {}) {
  const { preserveLock = false } = options;

  state.hoverId = null;
  state.hoverProgress = 0;
  state.hoverStartedAt = 0;
  state.hoverReleaseStartedAt = 0;

  if (!preserveLock) {
    state.hoverLockedId = null;
  }

  hoverStatus.textContent = "0%";
  updateDwellHotspots();
}

function setCameraStatus(text) {
  cameraStatus.textContent = text;
}

async function toggleCamera() {
  if (state.cameraRunning) {
    stopCamera();
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    setCameraStatus("Қолжетімсіз");
    trackingStatus.textContent = "Бұл браузерде камера жоқ";
    return;
  }

  if (!window.Hands || !window.Camera) {
    setCameraStatus("Қате");
    trackingStatus.textContent = "Қол тану кітапханасы жүктелмеді";
    return;
  }

  try {
    state.hands = new window.Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    state.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.75,
      minTrackingConfidence: 0.7,
    });

    state.hands.onResults(onHandResults);

    state.camera = new window.Camera(cameraVideo, {
      onFrame: async () => {
        if (state.hands) {
          await state.hands.send({ image: cameraVideo });
        }
      },
      width: 640,
      height: 480,
    });

    await state.camera.start();

    state.cameraRunning = true;
    state.smoothedCursor = null;
    cameraPlaceholder.hidden = true;
    setCameraStatus("Қосулы");
    trackingStatus.textContent = "Қол ізделуде";
    startCameraButton.textContent = "Қолмен таңдау режимін өшіру";
  } catch (error) {
    console.error(error);
    setCameraStatus("Қате");
    trackingStatus.textContent = "Камера рұқсатын тексеріңіз";
  }
}

function stopCamera() {
  if (state.camera?.stop) {
    state.camera.stop();
  }

  const stream = cameraVideo.srcObject;
  if (stream?.getTracks) {
    stream.getTracks().forEach((track) => track.stop());
  }

  cameraVideo.srcObject = null;
  state.camera = null;
  state.hands = null;
  state.cameraRunning = false;
  state.smoothedCursor = null;

  const ctx = cameraCanvas.getContext("2d");
  ctx.clearRect(0, 0, cameraCanvas.width, cameraCanvas.height);

  cameraPlaceholder.hidden = false;
  setCameraStatus("Өшірулі");
  trackingStatus.textContent = "Дайын";
  hoverStatus.textContent = "0%";
  handCursor.hidden = true;
  resetHoverState();
  startCameraButton.textContent = "Қолмен таңдау режимін қосу";
}

function onHandResults(results) {
  drawCameraFrame(results);

  const landmarks = results.multiHandLandmarks?.[0];

  if (!landmarks) {
    trackingStatus.textContent = "Қол көрінбеді";
    updateHandCursor(0, 0, 0, false);
    resetHoverState();
    return;
  }

  trackingStatus.textContent = "Қол табылды";

  const indexTip = landmarks[8];
  const rawX = (1 - indexTip.x) * window.innerWidth;
  const rawY = indexTip.y * window.innerHeight;

  if (!state.smoothedCursor) {
    state.smoothedCursor = { x: rawX, y: rawY };
  } else {
    state.smoothedCursor.x += (rawX - state.smoothedCursor.x) * 0.35;
    state.smoothedCursor.y += (rawY - state.smoothedCursor.y) * 0.35;
  }

  const { x, y } = state.smoothedCursor;
  const target = document.elementFromPoint(x, y)?.closest(".hotspot");
  const now = performance.now();

  if (!target) {
    updateHandCursor(x, y, 0, true);

    if (state.hoverLockedId) {
      if (!state.hoverReleaseStartedAt) {
        state.hoverReleaseStartedAt = now;
      }

      if (now - state.hoverReleaseStartedAt < HAND_REARM_DELAY_MS) {
        state.hoverId = null;
        state.hoverProgress = 0;
        state.hoverStartedAt = 0;
        hoverStatus.textContent = "0%";
        updateDwellHotspots();
        return;
      }
    }

    resetHoverState();
    return;
  }

  const targetId = target.dataset.id;
  state.hoverReleaseStartedAt = 0;

  if (state.hoverLockedId === targetId) {
    state.hoverId = targetId;
    state.hoverProgress = 1;
    hoverStatus.textContent = "100%";
    updateDwellHotspots(targetId);
    updateHandCursor(x, y, 1, true);
    return;
  }

  if (state.hoverLockedId && state.hoverLockedId !== targetId) {
    state.hoverLockedId = null;
  }

  updateDwellHotspots(targetId);

  if (state.hoverId !== targetId) {
    state.hoverId = targetId;
    state.hoverStartedAt = now;
    state.hoverProgress = 0;
  }

  state.hoverProgress = Math.min(1, (now - state.hoverStartedAt) / DWELL_TIME_MS);
  hoverStatus.textContent = `${Math.round(state.hoverProgress * 100)}%`;
  updateHandCursor(x, y, state.hoverProgress, true);

  if (
    state.hoverProgress >= 1 &&
    now - state.lastHandTriggerAt > HAND_TRIGGER_COOLDOWN_MS
  ) {
    state.lastHandTriggerAt = now;
    state.hoverLockedId = targetId;
    state.hoverProgress = 1;
    hoverStatus.textContent = "100%";
    updateHandCursor(x, y, 1, true);
    selectCard(targetId, "Қолмен таңдалды");
  }
}

function drawCameraFrame(results) {
  const ctx = cameraCanvas.getContext("2d");
  const width = cameraCanvas.width;
  const height = cameraCanvas.height;

  ctx.clearRect(0, 0, width, height);

  if (!results.image) {
    return;
  }

  ctx.save();
  ctx.scale(-1, 1);
  ctx.drawImage(results.image, -width, 0, width, height);
  ctx.restore();

  const landmarks = results.multiHandLandmarks?.[0];
  if (!landmarks) return;

  const point = landmarks[8];
  const x = width - point.x * width;
  const y = point.y * height;

  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 203, 64, 0.95)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 203, 64, 0.6)";
  ctx.stroke();
}

function handleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

function init() {
  updateVoiceStatus("Дайындалуда...");
  setupAudio();
  createHotspots();
  setupVoices();
  updateVoiceButton();

  const unlockSpeech = () => {
    primeAudio();
    primeSpeech();
  };

  document.addEventListener("pointerdown", unlockSpeech, {
    once: true,
    passive: true,
  });

  document.addEventListener("keydown", unlockSpeech, { once: true });

  boardImage.addEventListener("load", () => {
    state.boardReady = true;
    drawPreview(getCurrentCard());
  });

  if (boardImage.complete) {
    state.boardReady = true;
    drawPreview(getCurrentCard());
  }

  startCameraButton.addEventListener("click", toggleCamera);

  toggleVoiceButton.addEventListener("click", () => {
    primeAudio();
    primeSpeech();
    state.voiceEnabled = !state.voiceEnabled;
    updateVoiceButton();
    updateVoiceStatus(
      state.voiceEnabled ? "Дыбыстау қосылды" : "Дыбыстау өшірілді"
    );
  });

  speakAgainButton.addEventListener("click", () => {
    primeAudio();
    primeSpeech();
    speakCard(getCurrentCard());
  });

  fullscreenButton.addEventListener("click", handleFullscreen);

  window.addEventListener("resize", () => {
    drawPreview(getCurrentCard());
  });

  selectCard(state.selectedId, state.selectedFrom, { silent: true });
}

init();
