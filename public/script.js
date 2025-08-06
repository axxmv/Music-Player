const songDropdown = document.getElementById('songDropdown');
const audioPlayer = document.getElementById('audioPlayer');
let currentLi = null;

async function loadSongs() {
    //block 1
    
    try {
      const res = await fetch('/api/songs');
      if (!res.ok) throw new Error('Network response was not ok');
  
      const songs = await res.json();
  
      const songList = document.getElementById('songList');

         //was
  
      
      songList.innerHTML = '';
      songDropdown.innerHTML = '<option disabled selected>Full Song List</option>';
      

  //block2
      songs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = song;
        li.style.cursor = 'pointer';
  
        li.onclick = () => {
          audioPlayer.src = `/music/${encodeURIComponent(song)}`;
          audioPlayer.play();
          if (currentLi) {
            currentLi.classList.remove('pulsing'); // ✨ NEW: Remove pulsing from previous
          }
  
          li.classList.add('pulsing'); // ✨ NEW: Add pulsing to current song
          currentLi = li; // ✨ NEW: Store this item as the current one
        };


//block3
        const option = document.createElement('option');
        option.value = song;
        option.textContent = song;
        songDropdown.appendChild(option);


        songList.appendChild(li);
      });

  
    } catch (error) {
      console.error('Failed to load songs:', error);
    }



    //block 4

     
  }

    
  
  songDropdown.addEventListener('change', () => {
    const selectedSong = songDropdown.value;
    audioPlayer.src = `/music/${encodeURIComponent(selectedSong)}`;
    audioPlayer.play();
  });
//load songs
  window.addEventListener('DOMContentLoaded', loadSongs);