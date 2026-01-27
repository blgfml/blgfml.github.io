/* themes/hexo-theme-matery/source/js/digimon.js */

class DigimonGame {
  constructor() {
    // 1. LOAD DATA
    const data = window.DigimonData;
    if (!data) return console.error("Digimon Data missing!");

    this.requirements = data.requirements;
    this.petLines = data.petLines;
    this.skins = data.skins;
    this.skinNames = data.skinNames.map(n => n.toUpperCase());

    // --- STATE ---
    this.phases = ['PHASE_0', 'PHASE_1', 'PHASE_2', 'PHASE_3', 'PHASE_4', 'PHASE_5', 'PHASE_6', 'PHASE_7'];

    // STARTUP
    this.currentPetIndex = 0;
    this.currentTree = this.petLines[0].tree;
    this.currentDigimon = this.currentTree['PHASE_0'][0];
    this.currentPhaseImages = this.currentDigimon.images;
    this.currentPhaseIndex = 0;

    // STATS
    this.petStats = { wpm: 0, accuracy: 0 };

    // GAME LOOP
    this.gameState = 'GAME';
    this.isPlaying = true;
    this.totalSeconds = 0;
    this.timeAtLastEvolution = 0;

    // MENUS
    this.menuOptions = ["SKIN", "PARTNER", "TRAIN", "CANCEL"];
    this.menuIndex = 0;
    this.skinSelectionIndex = 0;
    this.petSelectionIndex = 0;

    // TYPING GAME VARS
    this.typingTarget = "";
    this.typingIndex = 0;
    this.typingTimer = 0;
    this.typingCorrectChars = 0;
    this.typingTotalChars = 0;
    this.wordParts = ["DATA", "CORE", "NET", "WEB", "LINK", "CODE", "GIGA", "MEGA", "TERA", "BYTE", "NEO", "ZERO", "FLAME", "BLUE", "RED", "OMNI", "ALPHA", "BETA", "VIRUS", "FILE", "SCAN", "LOAD"];

    // ANIMATION
    this.isMenuAnimating = false;
    this.frameIndex = 0;
    this.animationInterval = null;
    this.timerInterval = null;
    this.evolutionPending = false;

    // DOM
    this.els = {
      container: document.getElementById('digimon-container'),
      img: document.getElementById('pet-img'),
      msg: document.getElementById('msg-display'),
      time: document.getElementById('time-display'),
      modal: document.getElementById('evolve-modal'),
      menuOverlay: document.getElementById('menu-overlay'),
      // NEW: Select the hidden input
      input: document.getElementById('virtual-keyboard')
    };

    // --- UPDATED INPUT LISTENER ---
    // We listen to the hidden input box for mobile compatibility
    if (this.els.input) {
      this.els.input.addEventListener('input', (e) => this.handleTyping(e));
      // Also keep document listener for Desktop users who might click away
      document.addEventListener('keydown', (e) => {
        if (this.gameState === 'GAME_TYPING') {
          this.els.input.focus(); // Refocus if they click away
        }
      });
    }

    this.startAnimation();
    this.start();
    this.updateDisplay();
  }

  // ... (Keep startAnimation, toggleFrame, inputs as is) ...
  startAnimation() {
    if (this.animationInterval) clearInterval(this.animationInterval);
    this.animationInterval = setInterval(() => { this.toggleFrame(); }, 500);
  }

  toggleFrame() {
    this.frameIndex = this.frameIndex === 0 ? 1 : 0;
    if (this.gameState === 'MENU_PET') {
      const images = this.getPreviewImages(this.petSelectionIndex);
      if (images) this.els.img.src = images[this.frameIndex];
    } else {
      this.els.img.src = this.currentPhaseImages[this.frameIndex];
    }
  }

  getPreviewImages(petIndex) {
    const previewTree = this.petLines[petIndex].tree;
    for (let i = this.phases.length - 1; i >= 0; i--) {
      const phaseName = this.phases[i];
      if (previewTree[phaseName] && previewTree[phaseName].length > 0) {
        return previewTree[phaseName][0].images;
      }
    }
    return null;
  }

  // --- INPUTS ---
  handleRightTopInput() {
    if (this.evolutionPending) { this.triggerEvolution(); return; }
    if (this.isMenuAnimating) return;

    switch (this.gameState) {
      case 'GAME': this.enterMenu(); break;
      case 'MENU_MAIN':
        if (this.menuIndex === 0) this.enterSkinMenu();
        else if (this.menuIndex === 1) this.enterPetMenu();
        else if (this.menuIndex === 2) this.startTypingGame();
        else this.exitMenu();
        break;
      case 'MENU_SKIN': this.applySkin(this.skinSelectionIndex); this.exitMenu(); break;
      case 'MENU_PET': this.applyPet(this.petSelectionIndex); this.exitMenu(); break;
    }
  }

  handleUpInput() {
    if (this.isMenuAnimating || this.gameState === 'GAME_TYPING') return;
    switch (this.gameState) {
      case 'MENU_MAIN': this.navigateMenu(-1, 'menuIndex', this.menuOptions); break;
      case 'MENU_SKIN': this.navigateMenu(-1, 'skinSelectionIndex', this.skinNames); break;
      case 'MENU_PET':
        this.petSelectionIndex--;
        if (this.petSelectionIndex < 0) this.petSelectionIndex = this.petLines.length - 1;
        this.updatePetMenuDisplay();
        break;
    }
  }

  handleDownInput() {
    if (this.isMenuAnimating || this.gameState === 'GAME_TYPING') return;
    switch (this.gameState) {
      case 'MENU_MAIN': this.navigateMenu(1, 'menuIndex', this.menuOptions); break;
      case 'MENU_SKIN': this.navigateMenu(1, 'skinSelectionIndex', this.skinNames); break;
      case 'MENU_PET':
        this.petSelectionIndex++;
        if (this.petSelectionIndex >= this.petLines.length) this.petSelectionIndex = 0;
        this.updatePetMenuDisplay();
        break;
    }
  }

  handleRightBottomInput() {
    if (this.isMenuAnimating) return;
    switch (this.gameState) {
      case 'GAME': this.flashMessage("ACTIVE"); break;
      case 'GAME_TYPING': this.finishTypingGame(); break; // Allow early exit
      default: this.exitMenu(); break;
    }
  }

  // --- TYPING GAME LOGIC (MOBILE UPDATED) ---

  startTypingGame() {
    this.gameState = 'GAME_TYPING';
    this.els.menuOverlay.style.display = 'none';
    this.els.msg.innerText = "READY...";

    // --- FIX: Force Mobile Keyboard Open ---
    this.els.input.value = "";
    this.els.input.focus();
    // ---------------------------------------

    this.typingCorrectChars = 0;
    this.typingTotalChars = 0;
    this.typingTimer = 20;
    this.typingIndex = 0;
    this.generateRandomWord();
  }

  generateRandomWord() {
    if (this.gameState !== 'GAME_TYPING') return;
    this.typingIndex = 0;
    const part1 = this.wordParts[Math.floor(Math.random() * this.wordParts.length)];
    const part2 = this.wordParts[Math.floor(Math.random() * this.wordParts.length)];
    this.typingTarget = (Math.random() > 0.3) ? part1 + part2 : part1;
    this.els.time.innerText = this.typingTarget;
    this.els.msg.innerText = "_".repeat(this.typingTarget.length);
  }

  handleTyping(e) {
    if (this.gameState !== 'GAME_TYPING') return;

    // --- FIX: READ FROM INPUT VALUE INSTEAD OF KEY CODE ---
    // Mobile sends specific events, better to read the value directly
    const val = this.els.input.value;
    if (!val) return; // Empty

    // Get the last character typed
    const inputChar = val.slice(-1).toUpperCase();

    // Clear the input immediately so it's ready for next char
    this.els.input.value = "";

    // Logic for Valid Character
    if (inputChar.match(/[a-zA-Z]/i)) {
      const targetChar = this.typingTarget[this.typingIndex];
      this.typingTotalChars++;

      if (inputChar === targetChar) {
        this.typingCorrectChars++;
        this.typingIndex++;
        const typedPart = this.typingTarget.substring(0, this.typingIndex);
        const remainingPart = "_".repeat(this.typingTarget.length - this.typingIndex);
        this.els.msg.innerText = typedPart + remainingPart;

        if (this.typingIndex >= this.typingTarget.length) {
          this.els.time.innerText = "OK!";
          this.els.msg.innerText = "";
          setTimeout(() => { this.generateRandomWord(); }, 100);
        }
      } else {
        const currentText = this.els.msg.innerText;
        this.els.msg.innerText = "ERR";
        setTimeout(() => {
          if (this.gameState === 'GAME_TYPING') this.els.msg.innerText = currentText;
        }, 100);
      }
    }
  }

  finishTypingGame() {
    // --- FIX: Close Mobile Keyboard ---
    this.els.input.blur();
    // ----------------------------------

    const minutes = 20 / 60;
    const grossWPM = (this.typingCorrectChars / 5) / minutes;
    let accuracy = 0;
    if (this.typingTotalChars > 0) accuracy = Math.floor((this.typingCorrectChars / this.typingTotalChars) * 100);
    this.petStats.wpm = Math.floor(grossWPM);
    this.petStats.accuracy = accuracy;
    this.gameState = 'GAME';
    this.els.time.innerText = `WPM:${this.petStats.wpm}`;
    this.els.msg.innerText = `ACC:${this.petStats.accuracy}%`;
    setTimeout(() => { this.updateDisplay(); }, 3000);
  }

  // ... (Rest of logic: checkEvolution, tick, etc. remains exactly the same) ...
  checkEvolution() {
    if (this.evolutionPending) return;
    if (!this.currentDigimon.next || this.currentDigimon.next.length === 0) return;

    const timeInCurrentPhase = this.totalSeconds - this.timeAtLastEvolution;
    const currentPhaseName = this.phases[this.currentPhaseIndex];
    if (this.currentPhaseIndex >= this.phases.length - 1) return;
    if (timeInCurrentPhase < this.requirements[currentPhaseName]) return;

    const nextPhaseName = this.phases[this.currentPhaseIndex + 1];
    const possibleDigimons = this.currentTree[nextPhaseName];
    const nextIDs = this.currentDigimon.next;

    const canEvolve = nextIDs.some(id => {
      const target = possibleDigimons.find(d => d.id === id);
      if (!target) return false;
      if (!target.conditions) return true;
      if (target.conditions.minWPM && this.petStats.wpm < target.conditions.minWPM) return false;
      if (target.conditions.minAccuracy && this.petStats.accuracy < target.conditions.minAccuracy) return false;
      if (target.conditions.maxAccuracy && this.petStats.accuracy > target.conditions.maxAccuracy) return false;
      return true;
    });

    if (canEvolve) this.showEvolutionPrompt();
  }

  tick() {
    if (this.gameState === 'GAME_TYPING') {
      if (this.typingTimer > 0) {
        this.typingTimer--;
        if (this.typingTimer === 0) this.finishTypingGame();
      }
      return;
    }
    if (this.gameState !== 'GAME') return;
    this.totalSeconds++;
    this.updateDisplay();
    this.checkEvolution();
  }

  // --- HELPERS ---
  navigateMenu(dir, propName, dataArray) {
    let newIndex = this[propName] + dir;
    if (newIndex >= dataArray.length) newIndex = 0;
    if (newIndex < 0) newIndex = dataArray.length - 1;
    this[propName] = newIndex;
    this.animateBarTransition(dataArray[this[propName] - dir < 0 ? dataArray.length - 1 : (this[propName] - dir) % dataArray.length], dataArray[newIndex], dir);
    if (this.gameState === 'MENU_SKIN') this.els.container.style.backgroundImage = `url('${this.skins[this[propName]]}')`;
  }

  animateBarTransition(oldText, newText, dir) {
    this.isMenuAnimating = true;
    const barContainer = document.querySelector('.menu-bar');
    if (!barContainer) return;
    barContainer.innerHTML = '';
    const oldEl = document.createElement('div'); oldEl.className = 'menu-text'; oldEl.innerText = oldText;
    const newEl = document.createElement('div'); newEl.className = 'menu-text'; newEl.innerText = newText;
    if (dir === 1) { oldEl.classList.add('slide-out-up'); newEl.classList.add('slide-in-up'); }
    else { oldEl.classList.add('slide-out-down'); newEl.classList.add('slide-in-down'); }
    barContainer.appendChild(oldEl); barContainer.appendChild(newEl);
    setTimeout(() => { this.isMenuAnimating = false; barContainer.innerHTML = `<div class="menu-text">${newText}</div>`; }, 200);
  }

  renderStaticBar(text) {
    this.els.menuOverlay.style.display = 'flex';
    this.els.menuOverlay.innerHTML = `<div class="menu-bar"><div class="menu-text">${text}</div></div>`;
  }
  enterMenu() { this.gameState = 'MENU_MAIN'; this.menuIndex = 0; this.renderStaticBar(this.menuOptions[0]); this.els.msg.innerText = ""; this.els.time.innerText = ""; }
  enterSkinMenu() { this.gameState = 'MENU_SKIN'; this.skinSelectionIndex = 0; this.renderStaticBar(this.skinNames[0]); }
  enterPetMenu() { this.gameState = 'MENU_PET'; this.petSelectionIndex = this.currentPetIndex; this.updatePetMenuDisplay(); }
  exitMenu() {
    this.gameState = 'GAME';
    this.els.menuOverlay.style.display = 'none';
    this.updateDisplay();
    this.frameIndex = 0;
    this.toggleFrame();
  }
  updatePetMenuDisplay() {
    this.els.menuOverlay.style.display = 'none';
    this.els.time.innerText = "PICK EGG:";
    this.els.msg.innerText = "> " + this.petLines[this.petSelectionIndex].name;
    const images = this.getPreviewImages(this.petSelectionIndex);
    if (images) { this.frameIndex = 0; this.els.img.src = images[0]; }
  }
  applySkin(index) { this.els.container.style.backgroundImage = `url('${this.skins[index]}')`; this.flashMessage("SKIN SET!"); }
  applyPet(index) {
    if (index !== this.currentPetIndex) {
      this.currentPetIndex = index;
      this.currentTree = this.petLines[index].tree;
      this.currentDigimon = this.currentTree['PHASE_0'][0];
      this.currentPhaseImages = this.currentDigimon.images;
      this.currentPhaseIndex = 0;
      this.totalSeconds = 0;
      this.timeAtLastEvolution = 0;
      this.petStats = { wpm: 0, accuracy: 0 };
      this.flashMessage("NEW EGG!");
    } else {
      this.flashMessage("NO CHANGE");
    }
  }
  start() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isPlaying = true;
    this.timerInterval = setInterval(() => { this.tick(); }, 1000);
  }
  stop() { this.isPlaying = false; this.els.msg.innerText = "PAUSED"; clearInterval(this.timerInterval); }

  showEvolutionPrompt() { this.evolutionPending = true; this.els.modal.style.display = 'flex'; }
  triggerEvolution() {
    this.els.modal.style.display = 'none';
    this.evolutionPending = false;
    const nextIDs = this.currentDigimon.next;
    if (!nextIDs || nextIDs.length === 0) return;
    const nextPhaseName = this.phases[this.currentPhaseIndex + 1];
    const possibleDigimons = this.currentTree[nextPhaseName];
    const candidates = nextIDs.map(id => possibleDigimons.find(d => d.id === id)).filter(d => d);
    const validCandidates = candidates.filter(target => {
      if (!target.conditions) return true;
      if (target.conditions.minWPM && this.petStats.wpm < target.conditions.minWPM) return false;
      if (target.conditions.minAccuracy && this.petStats.accuracy < target.conditions.minAccuracy) return false;
      if (target.conditions.maxAccuracy && this.petStats.accuracy > target.conditions.maxAccuracy) return false;
      return true;
    });
    if (validCandidates.length === 0) return;
    validCandidates.sort((a, b) => {
      const wpmA = (a.conditions && a.conditions.minWPM) ? a.conditions.minWPM : 0;
      const wpmB = (b.conditions && b.conditions.minWPM) ? b.conditions.minWPM : 0;
      return wpmB - wpmA;
    });
    const winner = validCandidates[0];
    this.currentPhaseIndex++;
    this.currentDigimon = winner;
    this.currentPhaseImages = this.currentDigimon.images;
    this.timeAtLastEvolution = this.totalSeconds;
    this.frameIndex = 0;
    this.petStats = { wpm: 0, accuracy: 0 };
    this.els.img.src = this.currentPhaseImages[0];
    this.flashMessage("EVOLVED!");
  }
  updateDisplay() {
    if (this.gameState !== 'GAME') return;
    const mins = Math.floor(this.totalSeconds / 60);
    const secs = this.totalSeconds % 60;
    const name = this.currentDigimon.id ? this.currentDigimon.id.toUpperCase() : "DIGIMON";
    if (!this.currentDigimon.next || this.currentDigimon.next.length === 0) {
      this.els.msg.innerText = (this.totalSeconds % 2 === 0) ? "MAX LEVEL" : name;
    } else {
      const timeInCurrentPhase = this.totalSeconds - this.timeAtLastEvolution;
      const currentPhaseName = this.phases[this.currentPhaseIndex];
      const requiredTime = this.requirements[currentPhaseName];
      if (timeInCurrentPhase >= requiredTime) {
        this.els.msg.innerText = (this.totalSeconds % 2 === 0) ? "TIME TO TRAIN!" : name;
      } else {
        this.els.msg.innerText = name;
      }
    }
    this.els.time.innerText = `T: ${mins}:${secs.toString().padStart(2, '0')}`;
  }
  flashMessage(text) {
    const originalText = this.els.msg.innerText;
    this.els.msg.innerText = text;
    setTimeout(() => {
      if (this.gameState === 'GAME') {
        const isMaxLevel = (!this.currentDigimon.next || this.currentDigimon.next.length === 0);
        this.els.msg.innerText = isMaxLevel ? "MAX LEVEL" : "ACTIVE";
      }
    }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('digimon-container')) window.game = new DigimonGame();
});