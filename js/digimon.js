/* themes/hexo-theme-matery/source/js/digimon.js */

class DigimonGame {
  constructor() {
    // 1. LOAD EXTERNAL DATA
    const data = window.DigimonData;
    if (!data) {
      console.error("Digimon Data file missing!");
      return;
    }

    this.requirements = data.requirements;
    this.petLines = data.petLines;
    this.skins = data.skins;

    // --- UPDATED: FORCE UPPERCASE CONVERSION ---
    // This ensures even if you type "Hikari Ver." in the data file, it becomes "HIKARI VER."
    this.skinNames = data.skinNames.map(name => name.toUpperCase());

    // --- STATE INITIALIZATION ---
    this.currentPetIndex = 0;
    this.images = this.petLines[0].sprites;
    this.currentPhaseImages = this.images['PHASE_0'];

    this.phases = ['PHASE_0', 'PHASE_1', 'PHASE_2', 'PHASE_3', 'PHASE_4', 'PHASE_5', 'PHASE_6', 'PHASE_7'];
    this.currentPhaseIndex = 0;

    this.gameState = 'GAME';
    this.isPlaying = false;
    this.totalSeconds = 0;
    this.timeAtLastEvolution = 0;

    // Menu Config
    this.menuOptions = ["SKIN", "PET", "CANCEL"];
    this.menuIndex = 0;
    this.skinSelectionIndex = 0;
    this.petSelectionIndex = 0;
    this.isMenuAnimating = false;

    // Frame Animation
    this.frameIndex = 0;
    this.animationInterval = null;
    this.timerInterval = null;
    this.evolutionPending = false;

    // --- DOM ELEMENTS ---
    this.els = {
      container: document.getElementById('digimon-container'),
      img: document.getElementById('pet-img'),
      msg: document.getElementById('msg-display'),
      time: document.getElementById('time-display'),
      modal: document.getElementById('evolve-modal'),
      menuOverlay: document.getElementById('menu-overlay')
    };

    this.startAnimation();
    this.updateDisplay();
  }

  // --- ANIMATION ENGINE ---
  startAnimation() {
    if (this.animationInterval) clearInterval(this.animationInterval);
    this.animationInterval = setInterval(() => { this.toggleFrame(); }, 500);
  }

  toggleFrame() {
    this.frameIndex = this.frameIndex === 0 ? 1 : 0;

    if (this.gameState === 'MENU_PET') {
      // Preview Phase 6 (Mega)
      const previewSprites = this.petLines[this.petSelectionIndex].sprites['PHASE_5'];
      if (Array.isArray(previewSprites[0])) {
        this.els.img.src = previewSprites[0][this.frameIndex];
      } else {
        this.els.img.src = previewSprites[this.frameIndex];
      }
    } else {
      this.els.img.src = this.currentPhaseImages[this.frameIndex];
    }
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
        else this.exitMenu();
        break;
      case 'MENU_SKIN': this.applySkin(this.skinSelectionIndex); this.exitMenu(); break;
      case 'MENU_PET': this.applyPet(this.petSelectionIndex); this.exitMenu(); break;
    }
  }

  handleUpInput() {
    if (this.isMenuAnimating) return;
    switch (this.gameState) {
      case 'GAME': if (this.isPlaying) this.flashMessage("STATUS: HAPPY"); break;
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
    if (this.isMenuAnimating) return;
    switch (this.gameState) {
      case 'GAME': if (this.isPlaying) this.flashMessage("STATUS: HUNGRY"); break;
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
      case 'GAME': if (this.isPlaying) this.stop(); else this.start(); break;
      default: this.exitMenu(); break;
    }
  }

  // --- MENU LOGIC ---
  navigateMenu(dir, propName, dataArray) {
    let newIndex = this[propName] + dir;
    if (newIndex >= dataArray.length) newIndex = 0;
    if (newIndex < 0) newIndex = dataArray.length - 1;

    const currentText = dataArray[this[propName]];
    const nextText = dataArray[newIndex];

    this[propName] = newIndex;
    this.animateBarTransition(currentText, nextText, dir);

    if (this.gameState === 'MENU_SKIN') {
      this.els.container.style.backgroundImage = `url('${this.skins[this[propName]]}')`;
    }
  }

  animateBarTransition(oldText, newText, dir) {
    this.isMenuAnimating = true;
    const barContainer = document.querySelector('.menu-bar');
    if (!barContainer) return;

    const oldEl = document.createElement('div');
    oldEl.className = 'menu-text';
    oldEl.innerText = oldText;

    const newEl = document.createElement('div');
    newEl.className = 'menu-text';
    newEl.innerText = newText;

    if (dir === 1) {
      oldEl.classList.add('slide-out-up');
      newEl.classList.add('slide-in-up');
    } else {
      oldEl.classList.add('slide-out-down');
      newEl.classList.add('slide-in-down');
    }

    barContainer.innerHTML = '';
    barContainer.appendChild(oldEl);
    barContainer.appendChild(newEl);

    setTimeout(() => {
      this.isMenuAnimating = false;
      barContainer.innerHTML = `<div class="menu-text">${newText}</div>`;
    }, 200);
  }

  renderStaticBar(text) {
    this.els.menuOverlay.style.display = 'flex';
    this.els.menuOverlay.innerHTML = `<div class="menu-bar"><div class="menu-text">${text}</div></div>`;
  }

  enterMenu() {
    this.gameState = 'MENU_MAIN';
    this.menuIndex = 0;
    this.renderStaticBar(this.menuOptions[0]);
    this.els.msg.innerText = ""; this.els.time.innerText = "";
  }
  enterSkinMenu() {
    this.gameState = 'MENU_SKIN';
    this.skinSelectionIndex = 0;
    this.renderStaticBar(this.skinNames[0]);
  }
  enterPetMenu() {
    this.gameState = 'MENU_PET';
    this.petSelectionIndex = this.currentPetIndex;
    this.updatePetMenuDisplay();
  }
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
  }

  applySkin(index) {
    this.els.container.style.backgroundImage = `url('${this.skins[index]}')`;
    this.flashMessage("SKIN SET!");
  }

  applyPet(index) {
    if (index !== this.currentPetIndex) {
      this.currentPetIndex = index;
      this.images = this.petLines[index].sprites;
      this.currentPhaseIndex = 0;
      this.currentPhaseImages = this.images['PHASE_0'];
      this.totalSeconds = 0;
      this.timeAtLastEvolution = 0;
      this.flashMessage("NEW EGG!");
    } else {
      this.flashMessage("NO CHANGE");
    }
  }

  // --- GAME LOGIC ---
  start() { if (!this.isPlaying) { this.isPlaying = true; this.els.msg.innerText = "ACTIVE"; this.timerInterval = setInterval(() => { this.tick(); }, 1000); } }
  stop() { this.isPlaying = false; this.els.msg.innerText = "PAUSED"; clearInterval(this.timerInterval); this.els.modal.style.display = 'none'; this.evolutionPending = false; }

  tick() {
    if (this.gameState !== 'GAME') return;
    this.totalSeconds++;
    this.updateDisplay();
    this.checkEvolution();
  }

  checkEvolution() {
    if (this.evolutionPending || !this.isPlaying) return;
    const timeInCurrentPhase = this.totalSeconds - this.timeAtLastEvolution;
    const currentPhaseName = this.phases[this.currentPhaseIndex];
    if (this.currentPhaseIndex >= this.phases.length - 1) return;
    if (timeInCurrentPhase >= this.requirements[currentPhaseName]) this.showEvolutionPrompt();
  }

  showEvolutionPrompt() { this.evolutionPending = true; this.els.modal.style.display = 'flex'; }

  triggerEvolution() {
    this.els.modal.style.display = 'none';
    this.evolutionPending = false;
    this.currentPhaseIndex++;
    this.timeAtLastEvolution = this.totalSeconds;
    this.frameIndex = 0;

    const newPhase = this.phases[this.currentPhaseIndex];
    const potentialSprites = this.images[newPhase];

    // Branching Logic
    if (Array.isArray(potentialSprites[0])) {
      const randomIndex = Math.floor(Math.random() * potentialSprites.length);
      this.currentPhaseImages = potentialSprites[randomIndex];
    } else {
      this.currentPhaseImages = potentialSprites;
    }

    this.els.img.src = this.currentPhaseImages[0];
    this.flashMessage("EVOLVED!");
  }

  updateDisplay() {
    if (this.gameState !== 'GAME') return;
    const mins = Math.floor(this.totalSeconds / 60);
    const secs = this.totalSeconds % 60;
    this.els.msg.innerText = this.isPlaying ? "ACTIVE" : "PAUSED";
    this.els.time.innerText = `T: ${mins}:${secs.toString().padStart(2, '0')}`;
  }

  flashMessage(text) {
    const originalText = this.els.msg.innerText;
    this.els.msg.innerText = text;
    setTimeout(() => {
      if (this.gameState === 'GAME') {
        this.els.msg.innerText = (!this.isPlaying) ? originalText : "ACTIVE";
      }
    }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('digimon-container')) window.game = new DigimonGame();
});