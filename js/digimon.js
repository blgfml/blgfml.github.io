// WRAP EVERYTHING IN THIS FUNCTION (The "Closure")
(function () {

  class DigimonGame {
    constructor() {
      // 1. LOAD DATA
      const data = window.DigimonData;
      if (!data) return console.error("Data Missing"); // Shortened error

      this.requirements = data.requirements;
      this.petLines = data.petLines;
      this.skins = data.skins;
      this.skinNames = data.skinNames.map(n => n.toUpperCase());
      this.maps = data.maps || [];

      this.sfxData = data.sfx || {};
      this.currentBGM = null;
      this.currentBGMUrl = "";
      this.audioUnlocked = false;

      this.audioSettings = { bgm: true, sfx: true };
      this.soundMenuIndex = 0;

      this.phases = ['PHASE_0', 'PHASE_1', 'PHASE_2', 'PHASE_3', 'PHASE_4', 'PHASE_5', 'PHASE_6', 'PHASE_7'];
      this.currentPetIndex = 0;
      this.currentTree = this.petLines[0].tree;
      this.currentDigimon = this.currentTree['PHASE_0'][0];
      this.currentPhaseImages = this.currentDigimon.images;
      this.currentPhaseIndex = 0;
      this.petStats = { wpm: 0, accuracy: 0 };

      this.gameState = 'GAME';
      this.isPlaying = true;
      this.totalSeconds = 0;
      this.timeAtLastEvolution = 0;

      this.menuOptions = ["ADVENTURE", "PARTNER", "TRAIN", "SKIN", "SOUND"];
      this.menuIndex = 0;
      this.skinSelectionIndex = 0;
      this.petSelectionIndex = 0;

      this.selectedMapIndex = 0;
      this.selectedLevelIndex = 0;
      this.currentEnemy = null;

      this.typingTarget = "";
      this.typingIndex = 0;
      this.typingTimer = 0;
      this.typingCorrectChars = 0;
      this.typingTotalChars = 0;
      this.wordParts = ["DATA", "CORE", "NET", "WEB", "LINK", "CODE", "GIGA", "MEGA", "TERA", "BYTE", "NEO", "ZERO", "VIRUS", "FILE", "SCAN"];
      this.isTrainingMode = true;

      this.isMenuAnimating = false;
      this.frameIndex = 0;
      this.animationInterval = null;
      this.timerInterval = null;
      this.evolutionPending = false;

      // DOM ELEMENTS
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

      // VS SCREEN SETUP
      if (!document.getElementById('vs-screen')) {
        const vsDiv = document.createElement('div');
        vsDiv.id = 'vs-screen';
        vsDiv.innerHTML = `<img id="vs-player" class="vs-sprite" src=""><div class="vs-text">VS</div><img id="vs-enemy" class="vs-sprite" src="">`;
        document.querySelector('.screen-layer').appendChild(vsDiv);
        this.els.vsScreen = vsDiv;
        this.els.vsPlayer = document.getElementById('vs-player');
        this.els.vsEnemy = document.getElementById('vs-enemy');
      }

      // --- CRITICAL: NEW EVENT LISTENERS ---
      // This allows the minifier to rename 'handleUpInput' to 'a' safely
      document.getElementById('btn-up').addEventListener('click', () => this.handleUpInput());
      document.getElementById('btn-down').addEventListener('click', () => this.handleDownInput());
      document.getElementById('btn-a').addEventListener('click', () => this.handleRightTopInput());
      document.getElementById('btn-b').addEventListener('click', () => this.handleRightBottomInput());

      // Unlock Audio Listeners
      const unlockHandler = () => {
        this.unlockAudio();
        document.removeEventListener('click', unlockHandler);
        document.removeEventListener('keydown', unlockHandler);
      };
      document.addEventListener('click', unlockHandler);
      document.addEventListener('keydown', unlockHandler);

      if (this.els.input) {
        this.els.input.addEventListener('input', (e) => this.handleTyping(e));
        this.els.container.addEventListener('click', (e) => {
          if (this.gameState === 'GAME_TYPING') this.els.input.focus();
        });
        document.addEventListener('keydown', (e) => {
          if (this.gameState === 'GAME_TYPING') this.els.input.focus();
        });
      }

      this.preloadAssets();
      this.startAnimation();
      this.start();
      this.updateDisplay();
      this.playPetBGM();
    }

    // --- ALL METHODS REMAIN THE SAME BELOW ---
    // (Just ensure they are inside the class)

    unlockAudio() {
      if (this.audioUnlocked) return;
      this.audioUnlocked = true;
      if (this.currentBGM && this.currentBGM.paused && this.audioSettings.bgm) {
        this.currentBGM.play().catch(e => { });
      }
    }

    playBGM(url) {
      if (!url) return;
      if (this.currentBGMUrl === url) {
        if (this.currentBGM && this.currentBGM.paused && this.audioSettings.bgm && this.audioUnlocked) {
          this.currentBGM.play();
        }
        return;
      }

      if (this.currentBGM) {
        this.currentBGM.pause();
        this.currentBGM = null;
      }

      this.currentBGMUrl = url;
      this.currentBGM = new Audio(url);
      this.currentBGM.loop = true;
      this.currentBGM.volume = 0.15;

      if (this.audioUnlocked && this.audioSettings.bgm) {
        this.currentBGM.play().catch(e => { });
      }
    }

    playSFX(key) {
      if (!this.audioUnlocked || !this.audioSettings.sfx) return;
      const url = this.sfxData[key];
      if (!url) return;

      const sfx = new Audio(url);
      sfx.volume = 0.3;
      sfx.play().catch(e => { });
    }

    toggleBGM() {
      this.audioSettings.bgm = !this.audioSettings.bgm;
      if (this.audioSettings.bgm) {
        if (this.currentBGM) this.currentBGM.play();
        else this.playPetBGM();
      } else {
        if (this.currentBGM) this.currentBGM.pause();
      }
      this.playSFX('button');
    }

    toggleSFX() {
      this.audioSettings.sfx = !this.audioSettings.sfx;
      this.playSFX('button');
    }

    preloadAssets() {
      const imagesToLoad = [];
      this.skins.forEach(url => imagesToLoad.push(url));
      this.petLines.forEach(line => {
        Object.keys(line.tree).forEach(phaseKey => {
          line.tree[phaseKey].forEach(digimon => {
            if (digimon.images) digimon.images.forEach(imgUrl => imagesToLoad.push(imgUrl));
          });
        });
      });
      this.maps.forEach(map => {
        if (map.background && map.background.includes('url')) {
          const match = map.background.match(/url\(['"]?(.*?)['"]?\)/);
          if (match && match[1]) imagesToLoad.push(match[1]);
        }
      });
      imagesToLoad.forEach(url => { (new Image()).src = url; });
    }

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

    handleRightTopInput() {
      this.playSFX('button');
      if (this.evolutionPending) { this.triggerEvolution(); return; }
      if (this.isMenuAnimating) return;

      switch (this.gameState) {
        case 'GAME': this.enterMenu(); break;
        case 'MENU_MAIN':
          if (this.menuIndex === 0) this.enterMapSelect();
          else if (this.menuIndex === 1) this.enterPetMenu();
          else if (this.menuIndex === 2) this.startTypingGame(true);
          else if (this.menuIndex === 3) this.enterSkinMenu();
          else if (this.menuIndex === 4) this.enterSoundMenu();
          break;
        case 'MENU_SOUND':
          if (this.soundMenuIndex === 0) {
            this.toggleBGM();
            this.updateSoundMenuDisplay();
          } else if (this.soundMenuIndex === 1) {
            this.toggleSFX();
            this.updateSoundMenuDisplay();
          } else {
            this.enterMenu();
          }
          break;
        case 'MENU_MAP': this.enterLevelSelect(); break;
        case 'MENU_LEVEL': this.tryEnterBattle(); break;
        case 'GAME_VS': this.startBattleGame(); break;
        case 'MENU_SKIN': this.applySkin(this.skinSelectionIndex); this.exitMenu(); break;
        case 'MENU_PET': this.applyPet(this.petSelectionIndex); this.exitMenu(); break;
      }
    }

    handleUpInput() {
      this.playSFX('button');
      if (this.isMenuAnimating || this.gameState === 'GAME_TYPING') return;
      switch (this.gameState) {
        case 'MENU_MAIN': this.navigateMenu(-1, 'menuIndex', this.menuOptions); break;
        case 'MENU_SOUND':
          this.soundMenuIndex--;
          if (this.soundMenuIndex < 0) this.soundMenuIndex = 2;
          this.updateSoundMenuDisplay();
          break;
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
      this.playSFX('button');
      if (this.isMenuAnimating || this.gameState === 'GAME_TYPING') return;
      switch (this.gameState) {
        case 'MENU_MAIN': this.navigateMenu(1, 'menuIndex', this.menuOptions); break;
        case 'MENU_SOUND':
          this.soundMenuIndex++;
          if (this.soundMenuIndex > 2) this.soundMenuIndex = 0;
          this.updateSoundMenuDisplay();
          break;
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
      this.playSFX('button');
      if (this.isMenuAnimating) return;
      switch (this.gameState) {
        case 'GAME': this.flashMessage("ACTIVE"); break;
        case 'MENU_MAIN': this.exitMenu(); break;
        case 'MENU_SOUND':
        case 'MENU_SKIN':
        case 'MENU_PET':
        case 'MENU_MAP':
          this.enterMenu();
          break;
        case 'MENU_LEVEL': this.enterMapSelect(); break;
        case 'GAME_VS': this.exitMenu(); break;
        case 'GAME_TYPING': this.finishTypingGame(); break;
        default: this.exitMenu(); break;
      }
    }

    enterSoundMenu() {
      this.gameState = 'MENU_SOUND';
      this.soundMenuIndex = 0;
      this.updateSoundMenuDisplay();
    }

    updateSoundMenuDisplay() {
      let optionName = "";
      if (this.soundMenuIndex === 0) {
        optionName = `BGM: ${this.audioSettings.bgm ? "ON" : "OFF"}`;
      } else if (this.soundMenuIndex === 1) {
        optionName = `SFX: ${this.audioSettings.sfx ? "ON" : "OFF"}`;
      } else {
        optionName = "EXIT";
      }
      this.els.menuOverlay.style.display = 'flex';
      this.els.menuOverlay.innerHTML = `<div class="menu-bar"><div class="menu-text">${optionName}</div></div>`;
    }

    enterMapSelect() {
      this.gameState = 'MENU_MAP';
      this.selectedMapIndex = 0;
      this.els.img.style.display = 'none';
      this.renderStaticBar(this.maps[0].name);
      this.updateMapStatusDisplay();
      if (this.maps[0].bgm) this.playBGM(this.maps[0].bgm);
    }

    updateMapStatusDisplay() {
      const map = this.maps[this.selectedMapIndex];
      this.els.time.innerText = map.isUnlocked ? "UNLOCKED" : "LOCKED";
      this.els.msg.innerText = "SELECT MAP";
      this.els.screen.style.background = map.background;
      this.els.screen.style.backgroundSize = "cover";
      this.els.screen.style.backgroundPosition = "center";
      if (map.bgm) this.playBGM(map.bgm);
    }

    enterLevelSelect() {
      const map = this.maps[this.selectedMapIndex];
      if (!map.isUnlocked) { this.flashMessage("LOCKED!"); return; }
      this.gameState = 'MENU_LEVEL';
      this.selectedLevelIndex = 0;
      this.els.menuOverlay.style.display = 'none';
      this.renderMapPins();
      this.updateLevelInfo();
    }

    renderMapPins() {
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
      if (!level.isUnlocked && !level.isCleared) { this.flashMessage("LOCKED"); return; }
      if (this.currentPhaseIndex < level.phase) { this.flashMessage("TOO WEAK!"); return; }
      this.currentEnemy = this.findEnemyData(level.enemyId);
      if (!this.currentEnemy) this.currentEnemy = { images: ["", ""] };

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
      this.startTypingGame(false, level.difficulty || { wpm: 10 });
    }

    resolveBattle(win) {
      this.gameState = 'MENU_LEVEL';
      this.playSFX(win ? 'win' : 'lose');
      if (win) {
        this.flashMessage("WIN!");
        const map = this.maps[this.selectedMapIndex];
        const level = map.levels[this.selectedLevelIndex];
        level.isCleared = true;
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

    startTypingGame(isTraining = true, difficulty = null) {
      this.gameState = 'GAME_TYPING';
      this.els.menuOverlay.style.display = 'none';
      this.els.msg.innerText = "READY...";
      this.isTrainingMode = isTraining;
      this.battleDifficulty = difficulty;
      this.els.input.value = "";
      this.els.input.focus();
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
      const val = this.els.input.value;
      if (!val) return;
      const inputChar = val.slice(-1).toUpperCase();
      this.els.input.value = "";
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
          setTimeout(() => { if (this.gameState === 'GAME_TYPING') this.els.msg.innerText = currentText; }, 100);
        }
      }
    }

    finishTypingGame() {
      this.els.input.blur();
      const minutes = 20 / 60;
      const grossWPM = (this.typingCorrectChars / 5) / minutes;
      let accuracy = 0;
      if (this.typingTotalChars > 0) accuracy = Math.floor((this.typingCorrectChars / this.typingTotalChars) * 100);

      if (this.isTrainingMode) {
        this.petStats.wpm = Math.floor(grossWPM);
        this.petStats.accuracy = accuracy;
        this.gameState = 'GAME';
        this.els.time.innerText = `WPM:${this.petStats.wpm}`;
        this.els.msg.innerText = `ACC:${this.petStats.accuracy}%`;
        setTimeout(() => { this.updateDisplay(); }, 3000);
      } else {
        const passed = grossWPM >= (this.battleDifficulty ? this.battleDifficulty.wpm : 10);
        this.resolveBattle(passed);
      }
    }

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

    showEvolutionPrompt() {
      this.evolutionPending = true;
      this.els.modal.style.display = 'flex';
    }

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
      this.playSFX('evolve');
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

    navigateMenu(dir, propName, dataArray) {
      let newIndex = this[propName] + dir;
      if (newIndex >= dataArray.length) newIndex = 0;
      if (newIndex < 0) newIndex = dataArray.length - 1;
      this[propName] = newIndex;
      this.animateBarTransition(dataArray[this[propName] - dir < 0 ? dataArray.length - 1 : (this[propName] - dir) % dataArray.length], dataArray[newIndex], dir);
      if (this.gameState === 'MENU_SKIN') {
        this.els.container.style.backgroundImage = `url('${this.skins[this[propName]]}')`;
      }
      if (this.gameState === 'MENU_MAP') {
        this.updateMapStatusDisplay();
      }
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
    enterSkinMenu() {
      this.gameState = 'MENU_SKIN';
      this.skinSelectionIndex = 0;
      this.renderStaticBar(this.skinNames[0]);
      this.els.container.style.backgroundImage = `url('${this.skins[0]}')`;
    }
    enterPetMenu() { this.gameState = 'MENU_PET'; this.petSelectionIndex = this.currentPetIndex; this.updatePetMenuDisplay(); }

    exitMenu() {
      this.gameState = 'GAME';
      this.els.menuOverlay.style.display = 'none';
      this.els.vsScreen.style.display = 'none';
      document.querySelectorAll('.map-pin').forEach(p => p.remove());
      if (this.els.screen) this.els.screen.style.background = "";
      this.els.container.style.background = "";
      this.els.img.style.display = 'block';
      this.applySkin(this.skinSelectionIndex);
      this.updateDisplay();
      this.frameIndex = 0;
      this.toggleFrame();
      this.playPetBGM();
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
        this.playPetBGM();
      } else {
        this.flashMessage("NO CHANGE");
      }
    }
    start() { if (this.timerInterval) clearInterval(this.timerInterval); this.isPlaying = true; this.timerInterval = setInterval(() => { this.tick(); }, 1000); }
    stop() { this.isPlaying = false; this.els.msg.innerText = "PAUSED"; clearInterval(this.timerInterval); }

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

  // WAIT FOR DOM, THEN START
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('digimon-container')) {
      new DigimonGame(); // We don't save this to 'window.game' anymore
    }
  });

})(); // END OF CLOSURE