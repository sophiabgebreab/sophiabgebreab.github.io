const playlist = [
    {
        title: '505 - Arctic Monkeys',
        file: '505',
    },
    {
        title: 'R U Mine? - Arctic Monkeys',
        file: 'R_U_Mine',
    },
    {
        title: 'Mardy Bum - Arctic Monkeys',
        file: 'Mardy_Bum',
    }
];

let currentTrackIndex = 0;
        let sound = null;

        function loadTrack(index) {
            if (sound) {
                sound.unload();
            }
            sound = new Howl({
                src: ['../../audio/' + playlist[index].file + '.mp3'],
                volume: 0.5,
                loop: true,
                autoplay: true,
                onend: function() {
                    console.log('Finished!');
                    document.body.classList.remove('playing');
                },
                onplay: function() {
                    document.getElementById('duration').textContent = formatTime(Math.round(sound.duration()));
                    document.body.classList.add('playing');
                    requestAnimationFrame(step);
                },
                onpause: function() {
                    document.body.classList.remove('playing');
                },
                onseek: function() {
                    requestAnimationFrame(step);
                }
            });
            document.getElementById('track').textContent = playlist[index].title;
        }

        function playPause() {
            if (sound.playing()) {
                sound.pause();
            } else {
                sound.play();
            }
        }

        function nextTrack() {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadTrack(currentTrackIndex);
        }

        function prevTrack() {
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrackIndex);
        }

        function step() {
            const seek = sound.seek() || 0;
            document.getElementById('timer').textContent = formatTime(Math.round(seek));
            if (sound.playing()) {
                requestAnimationFrame(step);
            }
        }

        function formatTime(secs) {
            const minutes = Math.floor(secs / 60) || 0;
            const seconds = (secs - minutes * 60) || 0;
            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }

        document.getElementById('button1').addEventListener('click', () => loadTrack(currentTrackIndex));
        document.getElementById('button2').addEventListener('click', playPause);
        document.getElementById('playBtn').addEventListener('click', () => {
            sound.play();
            document.body.classList.add('playing');
        });
        document.getElementById('pauseBtn').addEventListener('click', () => {
            sound.pause();
            document.body.classList.remove('playing');
        });
        document.getElementById('nextBtn').addEventListener('click', nextTrack);
        document.getElementById('prevBtn').addEventListener('click', prevTrack);


