document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('audio-element');
    if (!audio) return;

    var btnPlayMain = document.getElementById('btn-play-main');
    var btnPlayBottom = document.getElementById('btn-play-bottom');

    var timeCurrent = document.getElementById('time-current');
    var timeTotal = document.getElementById('time-total');
    var progressBar = document.getElementById('progress-bar');
    var volumeBar = document.getElementById('volume-bar');
    var btnVolume = document.getElementById('btn-volume');

    var isDraggingProgress = false;

    // --- TIME FORMATTING ---
    function formatTime(time) {
        var numTime = parseFloat(time);
        if (isNaN(numTime) || !isFinite(numTime)) return "0:00";
        var mins = Math.floor(numTime / 60);
        var secs = Math.floor(numTime % 60);
        return mins + ":" + (secs < 10 ? "0" : "") + secs;
    }

    // --- FORCE TOTAL TIME UPDATE ---
    function updateTotalTime() {
        if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
            timeTotal.textContent = formatTime(audio.duration);
            progressBar.max = audio.duration;
        }
    }

    // Listen to every possible event where the browser might figure out the song length
    audio.addEventListener('loadedmetadata', updateTotalTime);
    audio.addEventListener('durationchange', updateTotalTime);
    audio.addEventListener('canplay', updateTotalTime);

    var mainCover = document.querySelector('.main-cover');
    var bottomCover = document.getElementById('player-img');

    // --- PLAY / PAUSE ---
    function togglePlay() {
        if (audio.paused) {
            audio.play();
            if (btnPlayMain) btnPlayMain.innerHTML = '&#x23F8;&#xFE0E;'; // Pause text symbol
            if (btnPlayBottom) btnPlayBottom.innerHTML = '&#x23F8;&#xFE0E;';
            if (mainCover) mainCover.classList.add('is-playing');
            if (bottomCover) bottomCover.classList.add('is-playing');
        } else {
            audio.pause();
            if (btnPlayMain) btnPlayMain.innerHTML = '&#x25B6;&#xFE0E;'; // Play text symbol
            if (btnPlayBottom) btnPlayBottom.innerHTML = '&#x25B6;&#xFE0E;';
            if (mainCover) mainCover.classList.remove('is-playing');
            if (bottomCover) bottomCover.classList.remove('is-playing');
        }
    }

    if (btnPlayMain) btnPlayMain.addEventListener('click', togglePlay);
    if (btnPlayBottom) btnPlayBottom.addEventListener('click', togglePlay);

    // --- PROGRESS BAR ---
    audio.addEventListener('timeupdate', function () {
        if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);

        // Backup check
        if (timeTotal && timeTotal.textContent === "0:00") {
            updateTotalTime();
        }

        if (progressBar && !isDraggingProgress && isFinite(audio.currentTime)) {
            progressBar.value = audio.currentTime;
        }
    });

    if (progressBar) {
        progressBar.addEventListener('input', function () {
            isDraggingProgress = true;
            timeCurrent.textContent = formatTime(progressBar.value);
        });

        progressBar.addEventListener('change', function () {
            audio.currentTime = parseFloat(progressBar.value);
            isDraggingProgress = false;
        });
    }

    // --- VOLUME CONTROL ---
    if (volumeBar && btnVolume) {
        volumeBar.addEventListener('input', function () {
            audio.volume = volumeBar.value;
            btnVolume.textContent = audio.volume === 0 ? '🔇' : '🔊';
        });

        btnVolume.addEventListener('click', function () {
            if (audio.volume > 0) {
                audio.dataset.lastVolume = audio.volume;
                audio.volume = 0;
                volumeBar.value = 0;
                btnVolume.textContent = '🔇';
            } else {
                var lastVol = audio.dataset.lastVolume || 1;
                audio.volume = lastVol;
                volumeBar.value = lastVol;
                btnVolume.textContent = '🔊';
            }
        });
    }

    // Reset play buttons and stop spinning when song ends
    audio.addEventListener('ended', function () {
        if (btnPlayMain) btnPlayMain.innerHTML = '&#x25B6;&#xFE0E;';
        if (btnPlayBottom) btnPlayBottom.innerHTML = '&#x25B6;&#xFE0E;';
        if (progressBar) progressBar.value = 0;
        if (timeCurrent) timeCurrent.textContent = "0:00";

        if (mainCover) mainCover.classList.remove('is-playing');
        if (bottomCover) bottomCover.classList.remove('is-playing');
    });

    // ==========================================
    // --- FAIL-SAFE CINEMATIC LYRICS ENGINE ---
    // ==========================================
    var rawLyricsText = document.getElementById('raw-lyrics');
    var lyricsContent = document.getElementById('lyrics-content');
    var lyricsWindow = document.getElementById('lyrics-window');
    var lrcData = [];
    var activeLineIndex = -1;

    if (rawLyricsText && lyricsContent) {
        var rawText = rawLyricsText.value || rawLyricsText.textContent || "";
        var lines = rawText.split('\n');
        var fallbackTime = 0;

        for (var i = 0; i < lines.length; i++) {
            var rawLine = lines[i].trim();
            if (!rawLine) continue;

            // Matches exact decimal timestamps like [00:01.01]
            var match = rawLine.match(/\[(\d+):(\d+)(?:[.,:](\d+))?\](.*)/);

            if (match) {
                var minutes = parseInt(match[1]);
                var seconds = parseInt(match[2]);
                var milliseconds = match[3] ? parseFloat("0." + match[3]) : 0;

                var timeInSeconds = (minutes * 60) + seconds + milliseconds;
                var text = match[4].trim();

                if (text) {
                    lrcData.push({ time: timeInSeconds, text: text });
                    fallbackTime = timeInSeconds;
                }
            } else {
                fallbackTime += 0.1;
                lrcData.push({ time: fallbackTime, text: rawLine });
            }
        }

        // Render purely the text to HTML
        lyricsContent.innerHTML = '';
        lrcData.forEach(function (lineData, index) {
            var p = document.createElement('p');
            p.className = 'lyric-line';
            p.innerText = lineData.text;
            p.dataset.index = index;
            p.dataset.time = lineData.time;

            // Allow clicking a lyric line to jump to that part of the song
            p.addEventListener('click', function () {
                if (audio) {
                    audio.currentTime = parseFloat(this.dataset.time);
                    if (audio.paused) togglePlay();
                }
            });

            lyricsContent.appendChild(p);
        });

        var lyricElements = document.querySelectorAll('.lyric-line');

        // Sync lyrics automatically as the song plays
        if (audio && lyricsWindow) {
            audio.addEventListener('timeupdate', function () {
                if (lrcData.length === 0) return;

                var currentTime = audio.currentTime;
                var newIndex = -1;

                // Find which line should be active
                for (var i = 0; i < lrcData.length; i++) {
                    if (currentTime >= lrcData[i].time - 0.1) {
                        newIndex = i;
                    } else {
                        break;
                    }
                }

                // If the song moves to a new line, update UI and scroll
                if (newIndex !== -1 && newIndex !== activeLineIndex) {
                    if (activeLineIndex !== -1 && lyricElements[activeLineIndex]) {
                        lyricElements[activeLineIndex].classList.remove('active');
                    }

                    activeLineIndex = newIndex;
                    var activeEl = lyricElements[activeLineIndex];

                    if (activeEl) {
                        activeEl.classList.add('active');

                        // Smoothly scroll the window to center the active line
                        var containerCenter = lyricsWindow.clientHeight / 2;
                        var elementOffset = activeEl.offsetTop;
                        var elementHeight = activeEl.clientHeight;

                        lyricsWindow.scrollTo({
                            top: elementOffset - containerCenter + (elementHeight / 2),
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }

    }

    // --- DOWNLOAD BUTTON ---

    var btnDownload = document.getElementById('btn-download');
    if (btnDownload) {
        btnDownload.addEventListener('click', function () {
            var driveLink = btnDownload.getAttribute('data-link');

            if (driveLink && driveLink.trim() !== '') {
                // If a Google Drive link is provided in the markdown, open it in a new tab
                window.open(driveLink, '_blank');
            } else {
                // Fallback: If no drive link is provided, download the web audio file normally
                var link = document.createElement('a');
                link.href = audio.src;
                link.download = '';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    }

    // --- SHARE BUTTON ---
    var btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', function () {
            // Uses native mobile share menu if available
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // Fallback for desktop: copy to clipboard
                navigator.clipboard.writeText(window.location.href).then(function () {
                    alert('Link copied to clipboard!');
                });
            }
        });
    }
});