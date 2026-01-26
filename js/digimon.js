/* themes/hexo-theme-matery/source/js/digimon.js */

class DigimonGame {
  constructor() {
    // 1. LOAD EXTERNAL DATA
    const data = window.DigimonData;
    if (!data) return console.error("Digimon Data missing!");

    this.requirements = data.requirements;
    this.petLines = data.petLines;
    this.skins = data.skins;
    this.skinNames = data.skinNames.map(name => name.toUpperCase());

    // --- STATE INITIALIZATION ---
    this.phases = ['PHASE_0', 'PHASE_1', 'PHASE_2', 'PHASE_3', 'PHASE_4', 'PHASE_5', 'PHASE_6', 'PHASE_7'];
    this.currentPetIndex = 0;

    // STARTUP LOGIC:
    // Load the 'tree' from the chosen line
    this.currentTree = this.petLines[0].tree;
    // Set current object to the first one in PHASE_0
    this.currentDigimon = this.currentTree['PHASE_0'][0];
    this.currentPhaseImages = this.currentDigimon.images;

    this.currentPhaseIndex = 0;
    this.gameState = 'GAME';
    this.isPlaying = false;
    this.totalSeconds = 0;
    this.timeAtLastEvolution = 0;

    // Menu Config
    this.menuOptions = ["DIGIVICE", "PARTNER", "CANCEL"];
    this.menuIndex = 0;
    this.skinSelectionIndex = 0;
    this.petSelectionIndex = 0;
    this.isMenuAnimating = false;

    // Animation
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

  // --- ANIMATION ---
  startAnimation() {
    if (this.animationInterval) clearInterval(this.animationInterval);
    this.animationInterval = setInterval(() => { this.toggleFrame(); }, 500);
  }

  toggleFrame() {
    this.frameIndex = this.frameIndex === 0 ? 1 : 0;

    if (this.gameState === 'MENU_PET') {
      // PREVIEW LOGIC: Find the LAST PHASE that exists for this pet
      const previewTree = this.petLines[this.petSelectionIndex].tree;
      let lastPhaseImages = null;

      // Loop BACKWARDS from Phase 7 down to Phase 0
      for (let i = this.phases.length - 1; i >= 0; i--) {
        const phaseName = this.phases[i];
        // Check if this phase exists and has at least one Digimon
        if (previewTree[phaseName] && previewTree[phaseName].length > 0) {
          // Found it! Use the images of the first Digimon ([0]) in this phase
          lastPhaseImages = previewTree[phaseName][0].images;
          break; // Stop looking, we found the highest form
        }
      }

      // If we found images, update the screen
      if (lastPhaseImages) {
        this.els.img.src = lastPhaseImages[this.frameIndex];
      }

    } else {
      // GAME MODE: Use current Digimon images
      this.els.img.src = this.currentPhaseImages[this.frameIndex];
    }
  }

  // --- INPUTS (Standard) ---
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
    this[propName] = newIndex;
    this.animateBarTransition(dataArray[this[propName] - dir < 0 ? dataArray.length - 1 : (this[propName] - dir) % dataArray.length], dataArray[newIndex], dir);
    if (this.gameState === 'MENU_SKIN') this.els.container.style.backgroundImage = `url('${this.skins[this[propName]]}')`;
  }

  animateBarTransition(oldText, newText, dir) {
    this.isMenuAnimating = true;
    const barContainer = document.querySelector('.menu-bar');
    if (!barContainer) return;

    // Regenerate clean HTML each time
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
  }

  applySkin(index) { this.els.container.style.backgroundImage = `url('${this.skins[index]}')`; this.flashMessage("SKIN SET!"); }

  applyPet(index) {
    if (index !== this.currentPetIndex) {
      this.currentPetIndex = index;
      // RESET GAME WITH NEW LINE
      this.currentTree = this.petLines[index].tree;
      this.currentDigimon = this.currentTree['PHASE_0'][0];
      this.currentPhaseImages = this.currentDigimon.images;

      this.currentPhaseIndex = 0;
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

    // --- ENHANCEMENT: MAX LEVEL CHECK ---
    // 1. Check if the current Digimon has any 'next' options defined in data
    // If the array is empty [] or undefined, they are at their Final Form.
    if (!this.currentDigimon.next || this.currentDigimon.next.length === 0) {
      return; // STOP HERE. Do not check timer. Do not show prompt.
    }

    // 2. Standard Timer Logic (Only runs if they CAN evolve)
    const timeInCurrentPhase = this.totalSeconds - this.timeAtLastEvolution;
    const currentPhaseName = this.phases[this.currentPhaseIndex];

    // Safety check: Prevent going beyond Phase 7 in the array
    if (this.currentPhaseIndex >= this.phases.length - 1) return;

    if (timeInCurrentPhase >= this.requirements[currentPhaseName]) {
      this.showEvolutionPrompt();
    }
  }

  showEvolutionPrompt() { this.evolutionPending = true; this.els.modal.style.display = 'flex'; }

  // --- NEW TREE EVOLUTION LOGIC ---
  triggerEvolution() {
    this.els.modal.style.display = 'none';
    this.evolutionPending = false;

    // 1. Get possible next IDs from CURRENT digimon
    const options = this.currentDigimon.next;

    if (!options || options.length === 0) return; // End of line

    // 2. Pick one ID randomly (Handling the branch)
    const nextID = options[Math.floor(Math.random() * options.length)];

    // 3. Find that Object in the NEXT Phase array
    this.currentPhaseIndex++;
    const nextPhaseName = this.phases[this.currentPhaseIndex];
    const possibleDigimons = this.currentTree[nextPhaseName];

    const nextDigimonObj = possibleDigimons.find(d => d.id === nextID);

    if (nextDigimonObj) {
      this.currentDigimon = nextDigimonObj;
      this.currentPhaseImages = this.currentDigimon.images;
      this.timeAtLastEvolution = this.totalSeconds;
      this.frameIndex = 0;
      this.els.img.src = this.currentPhaseImages[0];
      this.flashMessage("EVOLVED!");
    } else {
      console.error("Evolution Error: ID not found in next phase:", nextID);
    }
  }

  updateDisplay() {
    if (this.gameState !== 'GAME') return;

    const mins = Math.floor(this.totalSeconds / 60);
    const secs = this.totalSeconds % 60;

    // Check if MAX LEVEL (No next evolutions)
    const isMaxLevel = (!this.currentDigimon.next || this.currentDigimon.next.length === 0);

    if (this.isPlaying) {
      if (isMaxLevel) {
        this.els.msg.innerText = "MAX LEVEL"; // Special Status!
      } else {
        this.els.msg.innerText = "ACTIVE";
      }
    } else {
      this.els.msg.innerText = "PAUSED";
    }

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