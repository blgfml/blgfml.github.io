/* themes/hexo-theme-matery/source/js/digimon.js */

class DigimonGame {
  constructor() {
    // --- CONFIGURATION ---
    this.requirements = { EGG: 5, BABY: 5, TEEN: 9 };

    // --- ASSETS: FRAME 1 and FRAME 2 ---
    // Make sure you save your images as egg_1.png, egg_2.png, etc.
    this.images = {
      EGG:  ["https://humulos.com/digimon/images/dot/vbdm/agu.gif",  "https://humulos.com/digimon/images/dot/vbdm/frame2/agu.gif"], 
      BABY: ["https://humulos.com/digimon/images/dot/vbdm/metalgrey_va.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/metalgrey_va.gif"],
      TEEN: ["https://humulos.com/digimon/images/dot/vbdm/omega.gif",  "https://humulos.com/digimon/images/dot/vbdm/frame2/omega.gif"], 
    };

    // --- STATE ---
    this.phases = ['EGG', 'BABY', 'TEEN'];
    this.currentPhaseIndex = 0;
    this.isPlaying = false;
    this.totalSeconds = 0;
    this.timeAtLastEvolution = 0;
    
    // Animation State
    this.frameIndex = 0; // 0 = Frame 1, 1 = Frame 2
    this.animationInterval = null;
    this.timerInterval = null;
    this.evolutionPending = false;

    // --- DOM ELEMENTS ---
    this.els = {
      img: document.getElementById('pet-img'),
      msg: document.getElementById('msg-display'),
      time: document.getElementById('time-display'),
      modal: document.getElementById('evolve-modal')
    };
    
    // Start the idle animation immediately (bouncing)
    this.startAnimation();
    this.updateDisplay();
  }

  // --- ANIMATION ENGINE ---
  startAnimation() {
    // Clear any existing animation to be safe
    if (this.animationInterval) clearInterval(this.animationInterval);

    // Toggle frames every 500ms (Half a second)
    this.animationInterval = setInterval(() => {
      this.toggleFrame();
    }, 500); 
  }

  toggleFrame() {
    // Switch between 0 and 1
    this.frameIndex = this.frameIndex === 0 ? 1 : 0;
    
    // Get current phase name (e.g., 'EGG')
    const phase = this.phases[this.currentPhaseIndex];
    
    // Update the image source
    // Use the image array: images['EGG'][0] or images['EGG'][1]
    this.els.img.src = this.images[phase][this.frameIndex];
  }

  // --- BUTTON INPUT HANDLERS ---
  handleRightTopInput() {
    if (this.evolutionPending) {
        this.triggerEvolution();
    } else if (!this.isPlaying) {
        this.start();
    }
  }

  handleRightBottomInput() {
    if (this.isPlaying) this.stop();
  }

  handleLeftInput() {
      if(!this.isPlaying) return;
      this.flashMessage("DO NOTHING HAHAHHAHA");
  }

  // --- GAME LOGIC ---
  start() {
    if(this.isPlaying) return;
    this.isPlaying = true;
    this.els.msg.innerText = "ACTIVE";
    this.timerInterval = setInterval(() => { this.tick(); }, 1000);
  }

  stop() {
    this.isPlaying = false;
    this.els.msg.innerText = "PAUSED";
    clearInterval(this.timerInterval);
    this.els.modal.style.display = 'none';
    this.evolutionPending = false;
  }

  tick() {
    this.totalSeconds++;
    this.updateDisplay();
    this.checkEvolution();
  }

  checkEvolution() {
    if (this.evolutionPending || !this.isPlaying) return;
    const timeInCurrentPhase = this.totalSeconds - this.timeAtLastEvolution;
    const currentPhaseName = this.phases[this.currentPhaseIndex];
    if (this.currentPhaseIndex >= this.phases.length - 1) return; 

    if (timeInCurrentPhase >= this.requirements[currentPhaseName]) {
      this.showEvolutionPrompt();
    }
  }

  showEvolutionPrompt() {
    this.evolutionPending = true;
    this.els.modal.style.display = 'flex';
  }

  triggerEvolution() {
    this.els.modal.style.display = 'none';
    this.evolutionPending = false;
    this.currentPhaseIndex++;
    
    // Reset stats for next level
    this.timeAtLastEvolution = this.totalSeconds;
    
    // Force update image immediately to Frame 1 of new monster
    this.frameIndex = 0;
    const newPhase = this.phases[this.currentPhaseIndex];
    this.els.img.src = this.images[newPhase][0];
    
    this.flashMessage("EVOLVED!");
  }

  updateDisplay() {
    const mins = Math.floor(this.totalSeconds / 60);
    const secs = this.totalSeconds % 60;
    this.els.time.innerText = `T: ${mins}:${secs.toString().padStart(2, '0')}`;
  }

  flashMessage(text) {
      const originalText = this.els.msg.innerText;
      this.els.msg.innerText = text;
      setTimeout(() => {
          if(this.isPlaying && !this.evolutionPending) {
             this.els.msg.innerText = "ACTIVE";
          } else if (!this.isPlaying) {
             this.els.msg.innerText = originalText;
          }
      }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('digimon-container')) {
        window.game = new DigimonGame();
    }
});