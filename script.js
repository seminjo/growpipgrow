const appState = {
  pageIndex: 0,
  score: 0,
  slowMode: false,
  audioPlayedThisPage: false,
  exploredWords: new Set(),
  wrongAttempted: false,
  selectedReaction: null,
  retellOrder: []
};

const vocabulary = {
  seed: {
    emoji: "🌰",
    meaning: "a small part of a plant that can grow",
    example: "Pip is a tiny seed."
  },
  soil: {
    emoji: "🟫",
    meaning: "the earth where plants grow",
    example: "The seed is in the soil."
  },
  rain: {
    emoji: "🌧️",
    meaning: "water that falls from clouds",
    example: "Rain falls on the garden."
  },
  water: {
    emoji: "💧",
    meaning: "a clear liquid that people and plants need",
    example: "Pip needs water."
  },
  sun: {
    emoji: "☀️",
    meaning: "the bright star we see in the sky",
    example: "The sun gives Pip light."
  },
  root: {
    emoji: "🌱",
    meaning: "the part of a plant that grows under the ground",
    example: "A little root grows down."
  },
  leaf: {
    emoji: "🍃",
    meaning: "a green part of a plant",
    example: "A green leaf comes out."
  },
  flower: {
    emoji: "🌼",
    meaning: "the colorful part of some plants",
    example: "Pip opens a flower."
  }
};

const pages = [
  {
    text: "Pip is a tiny seed. Pip sleeps under the soil.",
    vocab: ["seed", "soil"],
    scene: "seed",
    question: {
      text: "Where is Pip sleeping?",
      answers: ["Under the soil", "In a cup", "On a chair"],
      correct: 0,
      hint: "Look at the picture. Pip is under the ground."
    }
  },
  {
    text: "\"I want to grow,\" says Pip. \"But what do I need?\"",
    vocab: [],
    scene: "wonder",
    question: {
      text: "What does Pip want to do?",
      answers: ["Grow", "Sleep forever", "Fly"],
      correct: 0,
      hint: "Pip says, “I want to grow.”"
    }
  },
  {
    text: "Tap, tap, tap! Rain falls on the soil. \"Here is water!\" says Rain.",
    vocab: ["rain", "soil", "water"],
    scene: "rain",
    question: {
      text: "What does Rain give Pip?",
      answers: ["Water", "Candy", "A toy"],
      correct: 0,
      hint: "Rain gives something a plant can drink."
    }
  },
  {
    text: "Pip drinks the water. \"Thank you, Rain! But I need something warm.\"",
    vocab: ["water", "rain"],
    scene: "drink",
    question: {
      text: "What does Pip need next?",
      answers: ["Something warm", "A bicycle", "Ice"],
      correct: 0,
      hint: "Pip says he needs something warm."
    }
  },
  {
    text: "The sun comes out. \"Here is light!\" says the Sun. Pip feels warm.",
    vocab: ["sun"],
    scene: "sun",
    question: {
      text: "What gives Pip light and warmth?",
      answers: ["The Sun", "The Moon", "A shoe"],
      correct: 0,
      hint: "Look at the bright thing in the sky."
    }
  },
  {
    text: "\"Grow, Pip, grow!\" Pip grows a little root. Push, push, push!",
    vocab: ["root"],
    scene: "root",
    question: {
      text: "What grows first?",
      answers: ["A root", "A flower", "An apple"],
      correct: 0,
      hint: "It grows under the soil."
    }
  },
  {
    text: "Pip pushes through the soil. A little green leaf comes out. \"Hello, world!\" says Pip.",
    vocab: ["soil", "leaf"],
    scene: "leaf",
    question: {
      text: "What comes out above the soil?",
      answers: ["A green leaf", "A red hat", "A fish"],
      correct: 0,
      hint: "It is a small green part of a plant."
    }
  },
  {
    text: "Whoosh! Whoosh! The wind blows. Pip bends left. Pip bends right. But Pip is okay.",
    vocab: [],
    scene: "wind",
    question: {
      text: "Is Pip okay after the wind blows?",
      answers: ["Yes", "No"],
      correct: 0,
      hint: "The last sentence says Pip is okay."
    }
  },
  {
    text: "One day passes. Two days pass. Pip grows two big leaves. \"I am growing!\"",
    vocab: ["leaf"],
    scene: "leaves",
    question: {
      text: "How many big leaves does Pip grow?",
      answers: ["Two", "Five", "Ten"],
      correct: 0,
      hint: "The story says “two big leaves.”"
    }
  },
  {
    text: "One morning, Pip opens a beautiful flower. \"I needed water, light, and time.\" Grow, Pip, grow!",
    vocab: ["flower", "water"],
    scene: "flower",
    question: {
      text: "What does Pip become at the end?",
      answers: ["A flower", "A cloud", "A car"],
      correct: 0,
      hint: "Look at Pip’s final form."
    }
  }
];

const screens = {
  cover: document.getElementById("coverScreen"),
  story: document.getElementById("storyScreen"),
  question: document.getElementById("questionScreen"),
  result: document.getElementById("resultScreen")
};

const el = {
  startBtn: document.getElementById("startBtn"),
  pageCounter: document.getElementById("pageCounter"),
  growthEmoji: document.getElementById("growthEmoji"),
  growthLabel: document.getElementById("growthLabel"),
  illustration: document.getElementById("illustration"),
  storyText: document.getElementById("storyText"),
  readBtn: document.getElementById("readBtn"),
  slowBtn: document.getElementById("slowBtn"),
  audioNote: document.getElementById("audioNote"),
  nextBtn: document.getElementById("nextBtn"),
  questionProgress: document.getElementById("questionProgress"),
  pipCharacter: document.getElementById("pipCharacter"),
  questionText: document.getElementById("questionText"),
  answers: document.getElementById("answers"),
  feedbackPanel: document.getElementById("feedbackPanel"),
  feedbackTitle: document.getElementById("feedbackTitle"),
  feedbackText: document.getElementById("feedbackText"),
  continueBtn: document.getElementById("continueBtn"),
  scoreText: document.getElementById("scoreText"),
  vocabText: document.getElementById("vocabText"),
  readAgainBtn: document.getElementById("readAgainBtn"),
  retellAgainBtn: document.getElementById("retellAgainBtn"),
  vocabModal: document.getElementById("vocabModal"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  vocabEmoji: document.getElementById("vocabEmoji"),
  vocabWord: document.getElementById("vocabWord"),
  vocabMeaning: document.getElementById("vocabMeaning"),
  vocabExample: document.getElementById("vocabExample"),
  coverFeedback: document.getElementById("coverFeedback"),
  retellBank: document.getElementById("retellBank"),
  retellSlots: document.getElementById("retellSlots"),
  checkRetellBtn: document.getElementById("checkRetellBtn"),
  resetRetellBtn: document.getElementById("resetRetellBtn"),
  retellFeedback: document.getElementById("retellFeedback"),
  emojiRow: document.getElementById("emojiRow"),
  likeSelect: document.getElementById("likeSelect"),
  becauseSelect: document.getElementById("becauseSelect"),
  builtSentence: document.getElementById("builtSentence")
};

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getGrowthStage() {
  const progress = appState.pageIndex / (pages.length - 1);
  if (progress < 0.2) return { emoji: "🌰", label: "Seed" };
  if (progress < 0.4) return { emoji: "🌱", label: "Root" };
  if (progress < 0.65) return { emoji: "🌱", label: "Sprout" };
  if (progress < 0.9) return { emoji: "🌿", label: "Leaf" };
  return { emoji: "🌼", label: "Flower" };
}

function renderScene(scene) {
  const scenes = {
    seed: sceneTemplate("🌰", 50, 72, "Pip sleeps under the soil."),
    wonder: sceneTemplate("🌰", 50, 70, "Pip wonders what he needs."),
    rain: sceneTemplate("🌧️", 25, 20, "Rain helps Pip.", "🌰", 50, 72),
    drink: sceneTemplate("💧", 42, 52, "Pip drinks water.", "🌰", 50, 73),
    sun: sceneTemplate("☀️", 74, 22, "The Sun gives Pip light.", "🌱", 50, 72),
    root: sceneTemplate("🌱", 50, 68, "A root begins to grow."),
    leaf: sceneTemplate("🌱", 50, 54, "A green leaf comes out."),
    wind: sceneTemplate("💨", 28, 28, "Pip bends in the wind.", "🌿", 55, 58),
    leaves: sceneTemplate("🌿", 50, 55, "Pip grows two big leaves."),
    flower: sceneTemplate("🌼", 50, 48, "Pip becomes a flower!")
  };

  el.illustration.innerHTML = scenes[scene] || scenes.seed;
}

function sceneTemplate(primary, x1, y1, label, secondary = "", x2 = 0, y2 = 0) {
  return `
    <div class="scene">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="scene-emoji big" style="left:${x1}%; top:${y1}%">${primary}</div>
      ${secondary ? `<div class="scene-emoji medium" style="left:${x2}%; top:${y2}%">${secondary}</div>` : ""}
      <div class="scene-label">${label}</div>
    </div>
  `;
}

function tokenizeStory(text, vocabList) {
  const known = new Set(vocabList.map(v => v.toLowerCase()));
  const tokens = text.match(/\b[\w’'-]+\b|[^\w\s]/g) || [];
  let output = "";
  let wordIndex = 0;

  for (const token of tokens) {
    const isWord = /[\w’'-]/.test(token);
    if (!isWord) {
      output += token;
      continue;
    }

    const clean = token.toLowerCase().replace(/[^\w'-]/g, "");
    const isVocab = known.has(clean) && vocabulary[clean];
    const content = isVocab
      ? `<button type="button" class="vocab-word word-token" data-word="${clean}" data-word-index="${wordIndex}">${token}</button>`
      : `<span class="word-token" data-word-index="${wordIndex}">${token}</span>`;

    output += (output && !/[“"(\[]$/.test(output.slice(-1)) ? " " : "") + content;
    wordIndex += 1;
  }

  return output
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/([“"]) /g, "$1");
}

function renderStoryPage() {
  cancelSpeech();
  const page = pages[appState.pageIndex];
  appState.audioPlayedThisPage = false;
  appState.wrongAttempted = false;

  el.pageCounter.textContent = `Page ${appState.pageIndex + 1} / ${pages.length}`;
  const growth = getGrowthStage();
  el.growthEmoji.textContent = growth.emoji;
  el.growthLabel.textContent = growth.label;

  renderScene(page.scene);
  el.storyText.innerHTML = tokenizeStory(page.text, page.vocab);
  el.nextBtn.disabled = true;
  el.audioNote.textContent = "Listen once to unlock the next page.";
  el.slowBtn.classList.toggle("active", appState.slowMode);
  el.slowBtn.setAttribute("aria-pressed", String(appState.slowMode));

  bindVocabButtons();
}

function bindVocabButtons() {
  document.querySelectorAll(".vocab-word").forEach(button => {
    button.addEventListener("click", () => openVocab(button.dataset.word));
  });
}

function openVocab(word) {
  const item = vocabulary[word];
  if (!item) return;

  appState.exploredWords.add(word);
  el.vocabEmoji.textContent = item.emoji;
  el.vocabWord.textContent = word;
  el.vocabMeaning.textContent = item.meaning;
  el.vocabExample.textContent = item.example;
  el.vocabModal.classList.remove("hidden");
}

function closeVocab() {
  el.vocabModal.classList.add("hidden");
}

let currentUtterance = null;
let fallbackTimer = null;

function cancelSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
  if (fallbackTimer) {
    clearInterval(fallbackTimer);
    fallbackTimer = null;
  }
  clearHighlight();
}

function clearHighlight() {
  document.querySelectorAll(".word-token.speaking").forEach(node => {
    node.classList.remove("speaking");
  });
}

function highlightWord(index) {
  clearHighlight();
  const token = el.storyText.querySelector(`[data-word-index="${index}"]`);
  if (token) token.classList.add("speaking");
}

function speakCurrentPage() {
  const page = pages[appState.pageIndex];

  if (!("speechSynthesis" in window)) {
    appState.audioPlayedThisPage = true;
    el.nextBtn.disabled = false;
    el.audioNote.textContent = "Speech is not supported in this browser. You can continue.";
    return;
  }

  cancelSpeech();

  const utterance = new SpeechSynthesisUtterance(page.text);
  utterance.lang = "en-US";
  utterance.rate = appState.slowMode ? 0.68 : 0.9;
  utterance.pitch = 1.05;
  currentUtterance = utterance;

  let boundaryEventsReceived = 0;
  const words = page.text.match(/\b[\w’'-]+\b/g) || [];
  const charStarts = [];
  let searchFrom = 0;

  words.forEach(word => {
    const index = page.text.indexOf(word, searchFrom);
    charStarts.push(index);
    searchFrom = index + word.length;
  });

  utterance.onboundary = event => {
    if (event.name !== "word") return;
    boundaryEventsReceived += 1;

    let wordIndex = 0;
    for (let i = 0; i < charStarts.length; i++) {
      if (charStarts[i] <= event.charIndex) wordIndex = i;
      else break;
    }
    highlightWord(wordIndex);
  };

  utterance.onstart = () => {
    el.audioNote.textContent = appState.slowMode ? "Playing slowly..." : "Playing...";
    const duration = Math.max(220, (appState.slowMode ? 430 : 320));
    let i = 0;

    fallbackTimer = setInterval(() => {
      if (boundaryEventsReceived === 0) {
        highlightWord(Math.min(i, words.length - 1));
        i += 1;
      }
      if (i >= words.length && fallbackTimer) {
        clearInterval(fallbackTimer);
        fallbackTimer = null;
      }
    }, duration);
  };

  utterance.onend = () => {
    clearHighlight();
    if (fallbackTimer) {
      clearInterval(fallbackTimer);
      fallbackTimer = null;
    }
    appState.audioPlayedThisPage = true;
    el.nextBtn.disabled = false;
    el.audioNote.textContent = "Nice! You can go to the question.";
  };

  utterance.onerror = () => {
    clearHighlight();
    appState.audioPlayedThisPage = true;
    el.nextBtn.disabled = false;
    el.audioNote.textContent = "Audio could not play, but you can continue.";
  };

  window.speechSynthesis.speak(utterance);
}

function renderQuestion() {
  cancelSpeech();
  const question = pages[appState.pageIndex].question;

  el.questionProgress.textContent = `Question ${appState.pageIndex + 1} / ${pages.length}`;
  el.questionText.textContent = question.text;
  el.answers.innerHTML = "";
  el.feedbackPanel.classList.add("hidden");
  appState.wrongAttempted = false;

  const growth = getGrowthStage();
  el.pipCharacter.textContent = growth.emoji;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(index, button));
    el.answers.appendChild(button);
  });

  showScreen("question");
}

function checkAnswer(index, button) {
  const question = pages[appState.pageIndex].question;
  const buttons = [...el.answers.querySelectorAll(".answer-btn")];

  if (index === question.correct) {
    if (!appState.wrongAttempted) {
      appState.score += 1;
    }

    buttons.forEach(btn => btn.disabled = true);
    button.style.borderColor = "var(--accent)";
    button.style.background = "var(--accent-soft)";

    el.feedbackTitle.textContent = "✅ Yes! Nice!";
    el.feedbackText.textContent = "Pip grows a little.";
    el.feedbackPanel.classList.remove("hidden");
    el.continueBtn.classList.remove("hidden");

    el.pipCharacter.classList.add("pop");
    setTimeout(() => el.pipCharacter.classList.remove("pop"), 350);
    return;
  }

  if (!appState.wrongAttempted) {
    appState.wrongAttempted = true;
    button.disabled = true;
    button.style.borderColor = "var(--danger)";
    el.feedbackTitle.textContent = "↩ Try one more time";
    el.feedbackText.textContent = question.hint;
    el.feedbackPanel.classList.remove("hidden");
    el.continueBtn.classList.add("hidden");
  } else {
    buttons.forEach(btn => btn.disabled = true);
    buttons[question.correct].style.borderColor = "var(--accent)";
    buttons[question.correct].style.background = "var(--accent-soft)";

    el.feedbackTitle.textContent = "💡 Here is the answer";
    el.feedbackText.textContent = `${question.answers[question.correct]}. ${question.hint}`;
    el.feedbackPanel.classList.remove("hidden");
    el.continueBtn.classList.remove("hidden");
  }
}

function proceedAfterQuestion() {
  el.continueBtn.classList.remove("hidden");

  if (appState.pageIndex >= pages.length - 1) {
    renderResult();
    return;
  }

  appState.pageIndex += 1;
  renderStoryPage();
  showScreen("story");
}

function renderResult() {
  cancelSpeech();
  el.scoreText.textContent = `${appState.score} / ${pages.length}`;
  el.vocabText.textContent = `${appState.exploredWords.size} / ${Object.keys(vocabulary).length} explored`;
  buildRetell();
  updateBuiltSentence();
  showScreen("result");
}

const retellCards = [
  { id: "seed", emoji: "🌰", label: "Seed" },
  { id: "rain", emoji: "🌧️", label: "Rain" },
  { id: "sprout", emoji: "🌱", label: "Sprout" },
  { id: "flower", emoji: "🌼", label: "Flower" }
];

function shuffledCards() {
  return [...retellCards].sort(() => Math.random() - 0.5);
}

function buildRetell() {
  appState.retellOrder = [];
  el.retellBank.innerHTML = "";
  el.retellSlots.innerHTML = "";
  el.retellFeedback.textContent = "";

  shuffledCards().forEach(card => {
    const node = document.createElement("button");
    node.type = "button";
    node.className = "retell-card";
    node.draggable = true;
    node.dataset.id = card.id;
    node.innerHTML = `<span>${card.emoji}</span><span>${card.label}</span>`;

    node.addEventListener("click", () => addRetellCard(card.id));
    node.addEventListener("dragstart", event => {
      event.dataTransfer.setData("text/plain", card.id);
    });

    el.retellBank.appendChild(node);
  });

  for (let i = 0; i < 4; i++) {
    const slot = document.createElement("div");
    slot.className = "retell-slot";
    slot.dataset.index = i;
    slot.textContent = `${i + 1}`;

    slot.addEventListener("dragover", event => event.preventDefault());
    slot.addEventListener("drop", event => {
      event.preventDefault();
      const id = event.dataTransfer.getData("text/plain");
      placeCardInSlot(id, i);
    });

    el.retellSlots.appendChild(slot);
  }
}

function addRetellCard(id) {
  if (appState.retellOrder.includes(id)) return;
  const emptyIndex = appState.retellOrder.length;
  if (emptyIndex >= 4) return;
  placeCardInSlot(id, emptyIndex);
}

function placeCardInSlot(id, index) {
  const card = retellCards.find(item => item.id === id);
  if (!card) return;

  appState.retellOrder = appState.retellOrder.filter(item => item !== id);

  while (appState.retellOrder.length < index) {
    appState.retellOrder.push(null);
  }
  appState.retellOrder[index] = id;
  appState.retellOrder = appState.retellOrder.filter(Boolean);

  renderRetellSlots();
}

function renderRetellSlots() {
  [...el.retellSlots.children].forEach((slot, index) => {
    const id = appState.retellOrder[index];
    const card = retellCards.find(item => item.id === id);

    if (card) {
      slot.classList.add("filled");
      slot.innerHTML = `<span style="font-size:30px">${card.emoji}</span><span>${card.label}</span>`;
    } else {
      slot.classList.remove("filled");
      slot.textContent = `${index + 1}`;
    }
  });

  [...el.retellBank.children].forEach(cardNode => {
    const used = appState.retellOrder.includes(cardNode.dataset.id);
    cardNode.disabled = used;
    cardNode.style.opacity = used ? ".35" : "1";
  });
}

function checkRetell() {
  const correct = ["seed", "rain", "sprout", "flower"];
  if (appState.retellOrder.length < 4) {
    el.retellFeedback.textContent = "Put all four cards in order first.";
    return;
  }

  const isCorrect = correct.every((id, index) => appState.retellOrder[index] === id);
  el.retellFeedback.textContent = isCorrect
    ? "✅ Great! Seed → Rain → Sprout → Flower"
    : "↩ Try again. Think about what happened first.";
}

function resetRetell() {
  buildRetell();
}

function updateBuiltSentence() {
  el.builtSentence.textContent =
    `I like ${el.likeSelect.value} because ${el.becauseSelect.value}.`;
}

function restartStory() {
  cancelSpeech();
  appState.pageIndex = 0;
  appState.score = 0;
  appState.audioPlayedThisPage = false;
  appState.wrongAttempted = false;
  appState.retellOrder = [];
  appState.selectedReaction = null;

  document.querySelectorAll(".emoji-btn").forEach(btn => btn.classList.remove("selected"));
  renderStoryPage();
  showScreen("story");
}

/* Cover prediction */
document.querySelectorAll(".cover-choice").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".cover-choice").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");

    if (button.dataset.coverChoice === "Candy") {
      el.coverFeedback.textContent = "Plants do not need candy. Try water or sun!";
    } else {
      el.coverFeedback.textContent = "Good prediction!";
    }
  });
});

/* Main events */
el.startBtn.addEventListener("click", () => {
  restartStory();
});

el.readBtn.addEventListener("click", speakCurrentPage);

el.slowBtn.addEventListener("click", () => {
  appState.slowMode = !appState.slowMode;
  el.slowBtn.classList.toggle("active", appState.slowMode);
  el.slowBtn.setAttribute("aria-pressed", String(appState.slowMode));
  if (currentUtterance) {
    speakCurrentPage();
  }
});

el.nextBtn.addEventListener("click", renderQuestion);

el.continueBtn.addEventListener("click", proceedAfterQuestion);

el.closeModalBtn.addEventListener("click", closeVocab);
el.vocabModal.addEventListener("click", event => {
  if (event.target === el.vocabModal) closeVocab();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !el.vocabModal.classList.contains("hidden")) {
    closeVocab();
  }
});

el.readAgainBtn.addEventListener("click", restartStory);

el.retellAgainBtn.addEventListener("click", () => {
  document.getElementById("retellTitle").scrollIntoView({ behavior: "smooth", block: "start" });
  resetRetell();
});

el.checkRetellBtn.addEventListener("click", checkRetell);
el.resetRetellBtn.addEventListener("click", resetRetell);

el.emojiRow.addEventListener("click", event => {
  const button = event.target.closest(".emoji-btn");
  if (!button) return;
  [...el.emojiRow.querySelectorAll(".emoji-btn")].forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");
  appState.selectedReaction = button.getAttribute("aria-label");
});

el.likeSelect.addEventListener("change", updateBuiltSentence);
el.becauseSelect.addEventListener("change", updateBuiltSentence);

/* Initial state */
buildRetell();
updateBuiltSentence();
