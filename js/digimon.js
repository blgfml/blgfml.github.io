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

    // --- MAP DATA ---
    this.maps = data.maps || []; // Safety fallback

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
    // Added ADVENTURE to the menu list
    this.menuOptions = ["ADVENTURE", "PARTNER", "TRAIN", "CANCEL"];
    this.menuIndex = 0;
    this.skinSelectionIndex = 0;
    this.petSelectionIndex = 0;

    // MAP VARS
    this.selectedMapIndex = 0;
    this.selectedLevelIndex = 0;
    this.currentEnemy = null;

    // TYPING GAME VARS
    this.typingTarget = "";
    this.typingIndex = 0;
    this.typingTimer = 0;
    this.typingCorrectChars = 0;
    this.typingTotalChars = 0;
    this.wordParts = ["DATA", "CORE", "NET", "WEB", "LINK", "CODE", "GIGA", "MEGA", "TERA", "BYTE", "NEO", "ZERO", "FLAME", "BLUE", "RED", "OMNI", "ALPHA", "BETA", "VIRUS", "FILE", "SCAN", "LOAD"];
    this.isTrainingMode = true; // Track if we are training or fighting

    // ANIMATION
    this.isMenuAnimating = false;
    this.frameIndex = 0;
    this.animationInterval = null;
    this.timerInterval = null;
    this.evolutionPending = false;

    // DOM
    this.els = {
      container: document.getElementById('digimon-container'),
      screen: document.querySelector('.screen-layer'),
      img: document.getElementById('pet-img'),
      msg: document.getElementById('msg-display'),
      time: document.getElementById('time-display'),
      modal: document.getElementById('evolve-modal'),
      menuOverlay: document.getElementById('menu-overlay'),
      input: document.getElementById('virtual-keyboard')
    };

    // --- CREATE VS SCREEN DOM ---
    if (!document.getElementById('vs-screen')) {
      const vsDiv = document.createElement('div');
      vsDiv.id = 'vs-screen';
      vsDiv.innerHTML = `
            <img id="vs-player" class="vs-sprite" src="">
            <div class="vs-text">VS</div>
            <img id="vs-enemy" class="vs-sprite" src="">
        `;
      document.querySelector('.screen-layer').appendChild(vsDiv);
      this.els.vsScreen = vsDiv;
      this.els.vsPlayer = document.getElementById('vs-player');
      this.els.vsEnemy = document.getElementById('vs-enemy');
    }

    // --- KEYBOARD LISTENERS & MOBILE FIX ---
    if (this.els.input) {
      this.els.input.addEventListener('input', (e) => this.handleTyping(e));

      // FIX: If user taps the game container while typing, bring back keyboard
      this.els.container.addEventListener('click', (e) => {
        if (this.gameState === 'GAME_TYPING') {
          this.els.input.focus();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (this.gameState === 'GAME_TYPING') {
          this.els.input.focus();
        }
      });
    }

    this.startAnimation();
    this.start();
    this.updateDisplay();
  }

  // --- ANIMATION ---
  startAnimation() {
    if (this.animationInterval) clearInterval(this.animationInterval);
    this.animationInterval = setInterval(() => { this.toggleFrame(); }, 500);
  }

  toggleFrame() {
    this.frameIndex = this.frameIndex === 0 ? 1 : 0;

    if (this.gameState === 'MENU_PET') {
      const images = this.getPreviewImages(this.petSelectionIndex);
      if (images) this.els.img.src = images[this.frameIndex];
    }
    else if (this.gameState === 'GAME_VS') {
      // Animate VS Screen
      this.els.vsPlayer.src = this.currentPhaseImages[this.frameIndex];
      if (this.currentEnemy && this.currentEnemy.images) {
        this.els.vsEnemy.src = this.currentEnemy.images[this.frameIndex];
      }
    }
    else {
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
        if (this.menuIndex === 0) this.enterMapSelect(); // ADVENTURE
        else if (this.menuIndex === 1) this.enterPetMenu();
        else if (this.menuIndex === 2) this.startTypingGame(true); // TRAIN (True = Training Mode)
        else this.exitMenu();
        break;
      case 'MENU_MAP': this.enterLevelSelect(); break;
      case 'MENU_LEVEL': this.tryEnterBattle(); break;
      case 'GAME_VS': this.startBattleGame(); break;
      case 'MENU_SKIN': this.applySkin(this.skinSelectionIndex); this.exitMenu(); break;
      case 'MENU_PET': this.applyPet(this.petSelectionIndex); this.exitMenu(); break;
    }
  }

  handleUpInput() {
    if (this.isMenuAnimating || this.gameState === 'GAME_TYPING') return;
    switch (this.gameState) {
      case 'MENU_MAIN': this.navigateMenu(-1, 'menuIndex', this.menuOptions); break;
      case 'MENU_MAP': this.navigateMenu(-1, 'selectedMapIndex', this.maps.map(m => m.name)); break;
      case 'MENU_LEVEL': this.navigateLevel(-1); break;
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
      case 'MENU_MAP': this.navigateMenu(1, 'selectedMapIndex', this.maps.map(m => m.name)); break;
      case 'MENU_LEVEL': this.navigateLevel(1); break;
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
      case 'GAME_VS': this.exitMenu(); break; // Cancel Battle
      case 'GAME_TYPING': this.finishTypingGame(); break; // Early exit
      case 'MENU_LEVEL': this.enterMapSelect(); break; // Back to Map
      default: this.exitMenu(); break;
    }
  }

  // ===============================================
  //            MAP & LEVEL SYSTEM
  // ===============================================

  enterMapSelect() {
    this.gameState = 'MENU_MAP';
    this.selectedMapIndex = 0;

    // --- FIX: HIDE PET ---
    this.els.img.style.display = 'none';

    this.renderStaticBar(this.maps[0].name);
    this.updateMapStatusDisplay();
  }

  updateMapStatusDisplay() {
    const map = this.maps[this.selectedMapIndex];
    this.els.time.innerText = map.isUnlocked ? "UNLOCKED" : "LOCKED";
    this.els.msg.innerText = "SELECT MAP";

    this.els.screen.style.background = map.background;
    this.els.screen.style.backgroundSize = "cover";
    this.els.screen.style.backgroundPosition = "center";
  }

  enterLevelSelect() {
    const map = this.maps[this.selectedMapIndex];
    if (!map.isUnlocked) {
      this.flashMessage("LOCKED!");
      return;
    }
    this.gameState = 'MENU_LEVEL';
    this.selectedLevelIndex = 0;
    this.els.menuOverlay.style.display = 'none';
    this.renderMapPins();
    this.updateLevelInfo();
  }
  renderMapPins() {
    // Clear old pins
    document.querySelectorAll('.map-pin').forEach(p => p.remove());

    const map = this.maps[this.selectedMapIndex];

    map.levels.forEach((level, index) => {
      const pin = document.createElement('div');
      pin.className = 'map-pin';
      pin.style.left = level.x + '%';
      pin.style.top = level.y + '%';

      if (level.isCleared) pin.classList.add('cleared');
      else if (level.isUnlocked) pin.classList.add('unlocked');
      if (index === this.selectedLevelIndex) pin.classList.add('selected');

      // --- CHANGE THIS to append to 'screen' ---
      this.els.screen.appendChild(pin);
    });
  }

  navigateLevel(dir) {
    const map = this.maps[this.selectedMapIndex];
    this.selectedLevelIndex += dir;
    if (this.selectedLevelIndex >= map.levels.length) this.selectedLevelIndex = 0;
    if (this.selectedLevelIndex < 0) this.selectedLevelIndex = map.levels.length - 1;
    this.renderMapPins();
    this.updateLevelInfo();
  }

  updateLevelInfo() {
    const level = this.maps[this.selectedMapIndex].levels[this.selectedLevelIndex];
    this.els.time.innerText = level.name;
    this.els.msg.innerText = `PHASE: ${level.phase}`;
  }

  tryEnterBattle() {
    const level = this.maps[this.selectedMapIndex].levels[this.selectedLevelIndex];
    if (!level.isUnlocked && !level.isCleared) {
      this.flashMessage("LOCKED");
      return;
    }
    if (this.currentPhaseIndex < level.phase) {
      this.flashMessage("TOO WEAK!");
      return;
    }
    this.currentEnemy = this.findEnemyData(level.enemyId);
    if (!this.currentEnemy) {
      // Fallback if enemy ID is missing
      this.currentEnemy = { images: ["", ""] };
      console.warn("Enemy data missing for:", level.enemyId);
    }

    this.gameState = 'GAME_VS';
    this.els.vsScreen.style.display = 'flex';
    this.els.time.innerText = "";
    this.els.msg.innerText = "BATTLE!";
    this.frameIndex = 0;
  }

  findEnemyData(id) {
    for (let line of this.petLines) {
      for (let phase in line.tree) {
        const digi = line.tree[phase].find(d => d.id === id);
        if (digi) return digi;
      }
    }
    return null;
  }

  startBattleGame() {
    const level = this.maps[this.selectedMapIndex].levels[this.selectedLevelIndex];
    this.els.vsScreen.style.display = 'none';
    // Launch Typing Game in Battle Mode (false)
    // Defaults to wpm 10 if difficulty is missing
    const diff = level.difficulty || { wpm: 10 };
    this.startTypingGame(false, diff);
  }

  resolveBattle(win) {
    this.gameState = 'MENU_LEVEL';
    if (win) {
      this.flashMessage("WIN!");
      const map = this.maps[this.selectedMapIndex];
      const level = map.levels[this.selectedLevelIndex];
      level.isCleared = true;

      // Unlock Next
      if (this.selectedLevelIndex + 1 < map.levels.length) {
        map.levels[this.selectedLevelIndex + 1].isUnlocked = true;
      } else {
        this.flashMessage("MAP CLEAR!");
        if (this.selectedMapIndex + 1 < this.maps.length) {
          this.maps[this.selectedMapIndex + 1].isUnlocked = true;
        }
      }
    } else {
      this.flashMessage("LOSE...");
    }
    this.renderMapPins();
  }

  // ===============================================
  //            TYPING GAME LOGIC
  // ===============================================

  startTypingGame(isTraining = true, difficulty = null) {
    this.gameState = 'GAME_TYPING';
    this.els.menuOverlay.style.display = 'none';
    this.els.msg.innerText = "READY...";

    this.isTrainingMode = isTraining;
    this.battleDifficulty = difficulty;

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

    // Read Input Value directly
    const val = this.els.input.value;
    if (!val) return;

    const inputChar = val.slice(-1).toUpperCase();
    this.els.input.value = ""; // Clear immediately

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
    this.els.input.blur(); // Close Keyboard

    const minutes = 20 / 60;
    const grossWPM = (this.typingCorrectChars / 5) / minutes;
    let accuracy = 0;
    if (this.typingTotalChars > 0) accuracy = Math.floor((this.typingCorrectChars / this.typingTotalChars) * 100);

    // TRAINING MODE: Save stats
    if (this.isTrainingMode) {
      this.petStats.wpm = Math.floor(grossWPM);
      this.petStats.accuracy = accuracy;
      this.gameState = 'GAME';
      this.els.time.innerText = `WPM:${this.petStats.wpm}`;
      this.els.msg.innerText = `ACC:${this.petStats.accuracy}%`;
      setTimeout(() => { this.updateDisplay(); }, 3000);
    }
    // BATTLE MODE: Check Win/Loss
    else {
      const passed = grossWPM >= (this.battleDifficulty ? this.battleDifficulty.wpm : 10);
      this.resolveBattle(passed);
    }
  }

  // --- EVOLUTION ---
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
    if (this.gameState === 'MENU_MAP') this.updateMapStatusDisplay();
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
    this.els.vsScreen.style.display = 'none';
    document.querySelectorAll('.map-pin').forEach(p => p.remove());

    // --- CHANGE THIS: Reset Screen Background ---
    if (this.els.screen) this.els.screen.style.background = "";

    // Reset Container Background (just in case skins modified it)
    this.els.container.style.background = "";

    this.els.img.style.display = 'block';
    this.applySkin(this.skinSelectionIndex);
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