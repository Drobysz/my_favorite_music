// Functions

function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0);
}

function isInt(n) {
    return n % 1 === 0;
} 

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); 
    const remainingSeconds = Math.round(seconds % 60); 

    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${formattedSeconds}`;
}

// API-key for DeepL
const API_KEY = '185283cc-ee1b-4d8d-ae98-542c430fb012:fx';

// function for translations making 
async function translateText(text, targetLang) {
  const url = 'https://api-free.deepl.com/v2/translate';
  
  // request parameters
  const params = new URLSearchParams({
    auth_key: API_KEY,
    text: text,
    // source_lang: sourceLang.toUpperCase(),
    target_lang: targetLang.toUpperCase(), 
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data.translations[0].text;
  } catch (error) {
    console.error('Ошибка при переводе:', error);
    return null;
  }
}

// UPLOAD IMAGE

const imgInput = document.getElementById('imgInput');
const uploadBtn = document.getElementById('uploadBtn');
const sbmt = document.getElementById('submit');
const nickname = document.querySelector('.nickname h1').textContent;

uploadBtn.onclick = ()=> imgInput.click();

imgInput.addEventListener('change', (event)=>{
    const img = event.target.files[0];
    if (img){
       sbmt.click();
    }
});

// Rendering of user image
const accImg = document.querySelector('.acc_img');
const userImg = accImg.getAttribute('user_img');
const imgPath = `imgs/users/${userImg}`;

fetch(imgPath,{method: 'head'})
  .then( (response)=>{
    if (response.ok){
       accImg.style.backgroundImage = `url(${imgPath})`;
    } else {
        console.log('Error');
    }
  }
    
);

// removing of logo border
const logo = document.querySelector('.logo_text h1');

setTimeout(()=>logo.style.border = '0', 1500);

// Language bar
const langs = {
    'FR': '🇫🇷Fr',
    'DE': '🇩🇪Ge',
    'EN': '🇬🇧En',
    'RU': '🇷🇺Ru',
    'AR': '🇦🇪Ar'
}

const langsContainer = document.querySelector('.langs_container');
const currentLang = document.querySelector('.user_lang').textContent;
let $langColor = '';

for (var key in langs){
    
    $langColor = 'white';
    
    if (currentLang === key){
        $langColor = 'yellow';
    }
    
    langsContainer.innerHTML += `
    <div style="color: ${$langColor};" class="lang_block" value="${key}"><h2>${langs[key]}</h2></div>
    `;

}

const langBlocks = document.querySelectorAll('.lang_block');
langBlocks.forEach((langBlock)=>{
    langBlock.onclick = ()=>{
        var changeLang = {
            'nickname': nickname,
            'new_language': langBlock.getAttribute('value')
        };  

        window.location.href = `change_lang.php?nickname=${changeLang['nickname']}&new_language=${changeLang['new_language']}`;
    };
});

// ALBUM BAR FILLING

// album bar
const albumBar = document.querySelector('.album_zone');

// song bar
const songBar = document.querySelector('.songs_zone');

// FILLING

const fillAlbumBar = (albumArr, albumBar)=>{
    var index = 0;
    albumArr.forEach((album)=>{
        albumBar.insertAdjacentHTML('beforeend', `

            <div class="album_block">
               <div class="album_img shadow_out1 shadow_inner" style="background-image: url('imgs/album/${album.name}.jpg'); background-size: cover;">
                  <svg class="album_info concealed_btn content_block" index="${index}" width="75" height="75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9H12.01C12.5623 9 13.01 8.55228 13.01 8C13.01 7.44772 12.5623 7 12.01 7H12ZM10.5 11C9.94772 11 9.5 11.4477 9.5 12C9.5 12.5523 9.94772 13 10.5 13H11V16C11 16.5523 11.4477 17 12 17H14C14.5523 17 15 16.5523 15 16C15 15.4477 14.5523 15 14 15H13V12C13 11.4477 12.5523 11 12 11H10.5Z" fill="#222222"/>
                  </svg>
               </div>
               <h3 class="album_name shadow_out2">${album.name} • ${album.artist}</h3>
            </div>

            `);
            index+=1;
    });
}

const fillSongBar = (songArr, songBar)=>{
    var index;
    // columns numbers
    let columnsNum = Math.ceil(songArr.length / 3);
    
    // columns creating
    for (index = 0; index < columnsNum; index++){
       songBar.insertAdjacentHTML('beforeend', `
              
              <div class="songs_column" colindex="${index}">

              </div>

        `);
    };
    
    // created columns
    const columns = document.querySelectorAll('.songs_column');
    
    // columns filling
    let columnNum = 0;
    
    for ( index = 0; index < songArr.length; index++ ){
       
       // 3 song blocks per column    
       if ( ( isInt((index/3)) ) && ( index !== 0 ) ){
          columnNum += 1;
       };
    
       columns[columnNum].insertAdjacentHTML('beforeend', `
        <div class="song_block shadow_out3">
            <div class="song_img shadow_inner" style="background-image: url('imgs/song/${songArr[index].name}.jpg'); background-size: cover;">
                <svg class="paused concealed_btn content_block " index="${index}" width="65" height="65" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1378 10.5689L9.60498 7.30249C8.40816 6.70408 7 7.57437 7 8.91246V15.0875C7 16.4256 8.40816 17.2959 9.60498 16.6975L16.1378 13.4311C17.3171 12.8414 17.3171 11.1586 16.1378 10.5689Z" fill="#222222"/>
                </svg>
            </div>
            <div class="song_info" index="${index}">
                <h3 class="song_name">${songArr[index].name}</h3>
                <h3 class="artist_name">${songArr[index].artist}</h3>
            </div>
        </div>
        `);

    };
};

fetch('json/data.json').then(function(response) { 
    response.json().then(function(albumData){ 
        
        // DATA
        const albums = albumData["albums"];
        const songs = albumData["songs"];
        songsLength = songs.length;

        fillAlbumBar(albums, albumBar);
        fillSongBar(songs, songBar);
        
        // OPENING AND CLOSING OF MODAL WINDOWS

        // btns activatings modal windows
        const albumInfo = document.querySelectorAll('.album_info');
        const songInfo = document.querySelectorAll('.song_info');     
         
        // modal pages
        const albumPage = document.querySelector('.album_page');
        const songPage = document.querySelector('.song_page');

        // blurred backround
        const mainContainer = document.querySelector('.main_container');
        const footerText = document.querySelector('.footer_text');

        // opening of modal windows 

        const currentLang = document.querySelector('.user_lang').textContent;

        let animationStyle = 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both';

        albumInfo.forEach((albumBtn)=>{
            albumBtn.onclick = function(){
            // modal window template opening
            albumPage.style.display = 'block';
            albumPage.style.animation=animationStyle;
            mainContainer.style.filter = 'blur(0.3rem)';
            footerText.style.filter = 'blur(0.3rem)';
            document.querySelector('.player').style.filter = 'blur(0.3rem)';

            // album content filling

            const albumImg = document.querySelector('.album_img-page');
            const albumTitle = document.querySelector('.album_name-page');
            const albumRecension = document.querySelector('.album_recension p');
            // index
            let index = Number( albumBtn.getAttribute('index') );
            // album dataset
            const album = albums[index];
            // short info about album
            const shortAlbInfo = document.querySelector('.alb_short_info');
            // Songs zone
            const albumSongsZone = document.querySelector('.songs_box iframe');
            
            // img
            albumImg.style.backgroundImage = `url('imgs/album/${album.name}.jpg')`;
            albumImg.style.backgroundSize = 'cover';
            // title
            albumTitle.innerHTML = `${album.name} • ${album.artist}`;
            // recension text
            translateText(album.description, currentLang).then((translatedText) => albumRecension.innerHTML = `${translatedText}`);
            // info about right owner
            translateText("All rights are reserved to", currentLang).then((translatedText) => {
                let rightText = `${translatedText}`;
                shortAlbInfo.innerHTML = `${rightText}  <strong class="r_owner">${album.rights_owner}</strong> (2025)`;
               }
             );
            // Integrated Apple Music Player
            albumSongsZone.setAttribute('src', album.songs); 
         };
        });

        songInfo.forEach((songBtn)=>{
            songBtn.onclick = function(){
            // modal window template opening
            songPage.style.display = 'inline-flex';
            songPage.style.animation = animationStyle;
            mainContainer.style.filter = 'blur(0.3rem)';
            footerText.style.filter = 'blur(0.3rem)';
            document.querySelector('.player').style.filter = 'blur(0.3rem)';

            // song content filling

            const songImg = document.querySelector('.song_img-page');
            const songTitle = document.querySelector('.song_name-page');
            const songRecension = document.querySelector('.song_recension p');
            // index
            let index = Number( songBtn.getAttribute('index') );
            // song dataset
            const song = songs[index];
            // short info about song
            const shortSngInfo = document.querySelector('.sng_short_info');

            // img
            songImg.style.backgroundImage = `url('imgs/song/${song.name}.jpg')`;
            songImg.style.backgroundSize = 'cover';
            // title
            songTitle.innerHTML = `${song.name} • ${song.artist}`;
            // recension text
            translateText(song.description, currentLang).then((translatedText) => songRecension.innerHTML = `${translatedText}`);
            // genius + YT links + info about right owner
            translateText("All rights are reserved to", currentLang).then((translatedText) => {
                let rightText = `${translatedText}`;
                shortSngInfo.innerHTML = `<a target="_blank" href="${song.url_song}">Genius</a> • <a target="_blank" href="${song.url_prop_site}">You Tube</a> • ${rightText} <strong class="r_owner">${song.rights_owner}</strong> (2025)`;
               }
             );

        };
        });

        //  modal windows in array
        const modalWindows = document.querySelectorAll('.modal_page');

        //  back btn
        const backBtns = document.querySelectorAll('.back');

        //  closing of modal windows

        backBtns.forEach((backBtn)=>{
            backBtn.onclick = function(){
                mainContainer.style.filter = 'blur(0)';
                footerText.style.filter = 'blur(0)';    
                document.querySelector('.player').style.filter = 'blur(0)'; 
                modalWindows.forEach((window)=>window.style.display = 'none');
            };
        });
        
        // CHANGING OF PAGES

        // Albums sliders
        const albLeftSlider = document.querySelector('.alb_sldr .left');
        const albRightSlider = document.querySelector('.alb_sldr .right');

        // Songs sliders
        const sngLeftSlider = document.querySelector('.sng_sldr .left');
        const sngRightSlider = document.querySelector('.sng_sldr .right');

        // objects number
        const albNum = albums.length;
        const sngNum = document.querySelectorAll('.songs_column').length;

        // objects
        const albInfo = document.querySelectorAll('.album_info');
        const songCol = document.querySelectorAll('.songs_column');

        // current pages
        let albPg = 0;
        let sngPg = 0;

        // CHANGING of albums pages
        albLeftSlider.onclick = ()=>{
           let correctId = 1; 
           if ( (albPg-4) === 4 ){
              albPg-=8;
              correctId = 0; 
           }else if ( (albPg-4) >= 0){
              albPg-=4;
           };
           console.log('Album page: '+albPg);
           albInfo[albPg-correctId].scrollIntoView({behavior:'smooth', block:'nearest', inline:'end'});
        };

        albRightSlider.onclick = ()=>{
            if ( (albPg+4) === 4 ){
                albPg+=8;
            }else if ((albPg+4) <= albNum){
                albPg+=4;
            }; 
            console.log('Album page: '+albPg);
            albInfo[albPg-1].scrollIntoView({behavior:'smooth', block:'nearest', inline:'end'});
        };

        // CHANGING of songs pages
        sngLeftSlider.onclick = ()=>{
            let correctId = 1;
            if ( (sngPg-2) === 2 ){
                sngPg-=4;
                correctId = 0; 
             }else if ( (sngPg-2) >= 0){
                sngPg-=2;
             };
            console.log('Song page: '+(sngPg-correctId));
            songCol[sngPg-correctId].scrollIntoView({behavior:'smooth', block:'nearest', inline:'end'});
        };

        sngRightSlider.onclick = ()=>{
            if ( (sngPg+2) === 2 ){
                sngPg+=4;
            }else if ((sngPg+2) <= sngNum){
                sngPg+=2;
            }; 
            console.log('Song page: '+(sngPg-1));
            console.log(songCol[sngPg-1]);
            songCol[sngPg-1].scrollIntoView({behavior:'smooth', block:'nearest', inline:'end'});
        };

        // PLAYER FUNCTIONALITY
        
        // play song block buttons
        const sngBtnsPlay = document.querySelectorAll('.paused');
        
        // div 'player'
        const player = document.querySelector('.player');

        // control bar buttons
        const expLeft = document.querySelector('.exp_left');
        const expRight = document.querySelector('.exp_right');
        const playStopBar = document.querySelector('.play-stop_bar');
        // array 'song' wil be also used in this block

        // player image
        const playerImg = document.querySelector('.img_bar');

        // player title
        const playerTitle = document.querySelector('.player_title');

        // audio tag
        const audioTag = document.querySelector('.songBoardInvisible');

        // svg signs
        const player_paused = `
        <path d="M16.1378 10.5689L9.60498 7.30249C8.40816 6.70408 7 7.57437 7 8.91246V15.0875C7 16.4256 8.40816 17.2959 9.60498 16.6975L16.1378 13.4311C17.3171 12.8414 17.3171 11.1586 16.1378 10.5689Z" fill="#FFFFFF"/>
        `;
        const player_playing = `
        <rect x="6" y="5" width="4" height="14" rx="1" fill="#FFFFFF"/>
        <rect x="14" y="5" width="4" height="14" rx="1" fill="#FFFFFF"/>
        `;
        
        const sngBar_paused = `
        <path d="M16.1378 10.5689L9.60498 7.30249C8.40816 6.70408 7 7.57437 7 8.91246V15.0875C7 16.4256 8.40816 17.2959 9.60498 16.6975L16.1378 13.4311C17.3171 12.8414 17.3171 11.1586 16.1378 10.5689Z" fill="#222222"/>
        `;
        const sngBar_playing = `
        <rect x="6" y="5" width="4" height="14" rx="1" fill="#222222"/>
        <rect x="14" y="5" width="4" height="14" rx="1" fill="#222222"/>
        `; 

        // activation of "sngBtnPlay"

        sngBtnsPlay.forEach((sngBtnPlay)=>{
            
            sngBtnPlay.onclick = ()=>{
                let sngID = Number(sngBtnPlay.getAttribute('index'));
                const playing = document.querySelector('.playing');
                console.log(playing);
                let lastSngID = 1000;
                
                if (!isEmpty(playing)){
                    // change of btns playing --> paused
                    playing.innerHTML = sngBar_paused;

                    playing.classList.replace('playing', 'paused');

                    // change of classes
                    lastSngID = Number(playing.getAttribute('index'));
                    console.log(lastSngID);
                };

                if (sngID !== lastSngID){
                    // change of btns paused --> playing
                    sngBtnPlay.innerHTML=sngBar_playing;
                    
                    // change of classes
                    sngBtnPlay.classList.replace('paused', 'playing');

                    // song content filling into player

                    player.setAttribute('index', sngID);
                    
                    // appearing of player
                    if ((player.style.display === '') || (player.style.display === 'none')){
                       player.style.display = 'flex';
                    };
                    
                    // song source installing
                    audioTag.src = `audio/songs/${songs[sngID].name}.mp3`;

                    // song image installing
                    playerImg.style.backgroundImage = `url('imgs/song/${songs[sngID].name}.jpg')`;
                    playerImg.style.backgroundSize = 'cover';
                    
                    // name - artist
                    playerTitle.innerHTML = `
                    <h3 class="player_name">${songs[sngID].name}</h3>
                    <h3 class="player_artist">${songs[sngID].artist}</h3>
                    `;

                    // change of play/stop btn
                    if (playStopBar.classList.contains('paused_player')){
                        playStopBar.innerHTML = player_playing;   
                        playStopBar.classList.replace('paused_player', 'playing_player');   
                    };
                    audioTag.play(); 
                 
                } else if (playing.classList.contains('paused')) {
                    playStopBar.classList.replace('playing_player', 'paused_player');

                    playStopBar.innerHTML = player_paused;

                    audioTag.pause(); 
                };
            };
        });

        // CONTROL ELEMENTS EVENTS

        playStopBar.onclick = ()=>{
            let songID = player.getAttribute('index');

            if (playStopBar.classList.contains('paused_player')){
                audioTag.play();
                
                playStopBar.classList.replace('paused_player', 'playing_player');

                playStopBar.innerHTML = player_playing;

                sngBtnsPlay[songID].innerHTML = sngBar_playing; 
                 
            } else if(playStopBar.classList.contains('playing_player')){
                audioTag.pause();
                
                playStopBar.classList.replace('playing_player', 'paused_player');

                playStopBar.innerHTML = player_paused;

                sngBtnsPlay[songID].innerHTML = sngBar_paused;
            };

        };
        const renderPlayer = (id, sign)=>{
            player.setAttribute('index', id);
            audioTag.src = `audio/songs/${songs[id].name}.mp3`;
            
            // song image installing
            playerImg.style.backgroundImage = `url('imgs/song/${songs[id].name}.jpg')`;
            playerImg.style.backgroundSize = 'cover';
            
            // name - artist
            playerTitle.innerHTML = `
            <h3 class="player_name">${songs[id].name}</h3>
            <h3 class="player_artist">${songs[id].artist}</h3>
            `;

            if (sign === '+'){
                sngBtnsPlay[id-1].innerHTML = sngBar_paused;    
                sngBtnsPlay[id-1].classList.replace('playing','paused');
            } else if (sign === '-'){
                sngBtnsPlay[id+1].innerHTML = sngBar_paused;
                sngBtnsPlay[id-1].classList.replace('playing','paused');
            };

            sngBtnsPlay[id].innerHTML=sngBar_playing;
            sngBtnsPlay[id].classList.replace('paused','playing');

            audioTag.play();
        };
        // for the case audio being ended
        audioTag.addEventListener('ended', ()=>{
            let audioID = Number(player.getAttribute('index'));
            
            if (audioID+1 !== songsLength){
                renderPlayer(audioID+1, '+');
            };

        });
        
        // slider ->
        expRight.onclick = ()=>{
            let audioID = Number(player.getAttribute('index'));
            if (audioID+1 !== (songsLength)){
                renderPlayer(audioID+1, '+');
            };
        };
        
        // <- slider
        expLeft.onclick = ()=>{
            let audioID = Number(player.getAttribute('index'));
            if (audioID !== 0){
                renderPlayer(audioID-1, '-');
            };
        };
        
        // progress bar
        const progressBar = document.querySelector('.sng_slider');
        const currentTime = document.querySelector('.current_time');
        const duration = document.querySelector('.duration');
        
        const colorfulBackground = ()=>{
            let valuePercentage = Math.ceil((progressBar.value / progressBar.max) * 100);
            progressBar.style.background = `linear-gradient(to right, #8758ff ${valuePercentage}%, #ebe9e7 ${valuePercentage}%)`;
        };

        audioTag.onloadedmetadata = ()=>{
            progressBar.max = audioTag.duration;
            progressBar.value = audioTag.currentTime;

            duration.innerHTML = formatTime(audioTag.duration);
            currentTime.innerHTML = formatTime(audioTag.currentTime);
            colorfulBackground();
        };

        if (audioTag.play()){
            setInterval(()=>{
                progressBar.value = audioTag.currentTime;
                currentTime.innerHTML = formatTime(audioTag.currentTime);
            }, 500);
            setInterval( ()=>{colorfulBackground()},100);
        };

        progressBar.onchange = ()=>{
            audioTag.currentTime = progressBar.value;
            currentTime.innerHTML = formatTime(audioTag.currentTime);
            colorfulBackground()
            audioTag.play();
        }; 
        
        colorfulBackground();

        // VOLUME
        const volumeSliderValue = document.querySelector('.volume-slider');
        const volumeIcn = document.querySelector('.volume');
        
        // Signs
        let volumeHigh = `<path d="M4.15838 13.9306C3.44537 12.7423 3.44537 11.2577 4.15838 10.0694C4.37596 9.70674 4.73641 9.45272 5.1511 9.36978L6.84413 9.03117C6.94499 9.011 7.03591 8.95691 7.10176 8.87788L9.17085 6.39498C10.3534 4.97592 10.9447 4.26638 11.4723 4.45742C12 4.64846 12 5.57207 12 7.41928L12 16.5807C12 18.4279 12 19.3515 11.4723 19.5426C10.9447 19.7336 10.3534 19.0241 9.17085 17.605L7.10176 15.1221C7.03591 15.0431 6.94499 14.989 6.84413 14.9688L5.1511 14.6302C4.73641 14.5473 4.37596 14.2933 4.15838 13.9306Z" fill="#FFFFFF"/>
        <path d="M14.5355 8.46447C15.4684 9.39732 15.9948 10.6611 16 11.9803C16.0052 13.2996 15.4888 14.5674 14.5633 15.5076" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <path d="M18.6569 6.34314C20.1494 7.83572 20.9916 9.85769 20.9999 11.9685C21.0083 14.0793 20.182 16.1078 18.7012 17.6121" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>`;

        let volumeLow = `<path d="M4.15838 13.9306C3.44537 12.7423 3.44537 11.2577 4.15838 10.0694C4.37596 9.70674 4.73641 9.45272 5.1511 9.36978L6.84413 9.03117C6.94499 9.011 7.03591 8.95691 7.10176 8.87788L9.17085 6.39498C10.3534 4.97592 10.9447 4.26638 11.4723 4.45742C12 4.64846 12 5.57207 12 7.41928L12 16.5807C12 18.4279 12 19.3515 11.4723 19.5426C10.9447 19.7336 10.3534 19.0241 9.17085 17.605L7.10176 15.1221C7.03591 15.0431 6.94499 14.989 6.84413 14.9688L5.1511 14.6302C4.73641 14.5473 4.37596 14.2933 4.15838 13.9306Z" fill="#FFFFFF"/>
        <path d="M14.5355 8.46447C15.4684 9.39732 15.9948 10.6611 16 11.9803C16.0052 13.2996 15.4888 14.5674 14.5633 15.5076" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>`;

        let volumeMuted = `<path d="M4.15838 13.9306C3.44537 12.7423 3.44537 11.2577 4.15838 10.0694C4.37596 9.70674 4.73641 9.45272 5.1511 9.36978L6.84413 9.03117C6.94499 9.011 7.03591 8.95691 7.10176 8.87788L9.17085 6.39498C10.3534 4.97592 10.9447 4.26638 11.4723 4.45742C12 4.64846 12 5.57207 12 7.41928L12 16.5807C12 18.4279 12 19.3515 11.4723 19.5426C10.9447 19.7336 10.3534 19.0241 9.17085 17.605L7.10176 15.1221C7.03591 15.0431 6.94499 14.989 6.84413 14.9688L5.1511 14.6302C4.73641 14.5473 4.37596 14.2933 4.15838 13.9306Z" fill="#FFFFFF"/>
        <path d="M15 15L21 9" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <path d="M21 15L15 9" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>`;

        volumeSliderValue.addEventListener('input', ()=>{
            audioTag.volume = volumeSliderValue.value;

            let volumeStat = Number(audioTag.volume);
            
            if (volumeStat > 0.5){
               volumeIcn.innerHTML = volumeHigh;
            } else if ((volumeStat <= 0.5) &&(Number(audioTag.volume) !== 0) ){
                volumeIcn.innerHTML = volumeLow;
            } else if (volumeStat === 0){
                volumeIcn.innerHTML = volumeMuted;
            }
        });
        
        // I've tried making a function which would be stopping my main player in the case Apple Music iframe being clicked, but since clicks on Apple Music iframes are indetectable, i had to abandon the idea to implement such necessery function 
        
        // SEARCH BAR

        const searchBar = document.querySelector('.search_bar');
        const resultItemsContainer = document.querySelector('.result_items_container');
        
        function contentSearching(){
            let marginTop = 155;
            resultItemsContainer.innerHTML="";

            const checkHeight = (height)=>{
                if (Number(resultItemsContainer.offsetHeight) >= 400){
                    resultItemsContainer.style.overflowY = 'scroll';
                } else {
                    marginTop += 93.77;
                }
            }
            
            const searchBarPush = (obj, index, type)=>{
                resultItemsContainer.innerHTML += `
                <div class="result_item_block shadow_out3">
                    <div class="song_img shadow_inner" style="background-image: url('imgs/${type}/${obj.name}.jpg'); background-size: cover;">
                    </div>
                    <div class="${type}_info search_info" index="${index}">
                        <h3 class="song_name">${obj.name}</h3>
                        <h3 class="artist_name">${obj.artist}</h3>
                    </div>
                </div>
               `; 

            }
            if (searchBar.value.length >= 2){
                for (id in albums){
                    if ( (albums[id].name.includes(searchBar.value)) || (albums[id].artist.includes(searchBar.value)) ){
                        searchBarPush(albums[id], id, 'album');
                        resultItemsContainer.style.marginTop = `${marginTop}px`;
                        checkHeight(Number(resultItemsContainer.offsetHeight));
                    }
    
                } 
    
                for (id in songs){
                    if ( (songs[id].name.includes(searchBar.value)) || (songs[id].artist.includes(searchBar.value)) ){
                        searchBarPush(songs[id], id, 'song');
                        resultItemsContainer.style.marginTop = `${marginTop}px`;
                        checkHeight(Number(resultItemsContainer.offsetHeight));
                    }
    
                } 

                const searchInfo = document.querySelectorAll('.search_info');
                
                searchInfo.forEach((searchObj)=>{
                    searchObj.onclick = ()=>{

                        let searchIndex = searchObj.getAttribute('index');
                        if (searchObj.classList.contains('album_info')){
                            const albsArr = document.querySelectorAll('.album_img .album_info');
                            console.log('Worked');
                            console.log(albsArr[searchIndex]);
                            albsArr[searchIndex].scrollIntoView({behavior:'smooth', block:'end', inline:'end'});

                        } else if (searchObj.classList.contains('song_info')){
                            const sngsArr = document.querySelectorAll('.songs_column .song_info');

                            sngsArr[searchIndex].scrollIntoView({behavior:'smooth', block:'end', inline:'end'});
                        }
                    };
                });
            }
            
        };

        searchBar.addEventListener('input', ()=>{
            resultItemsContainer.style.display='block';

            setTimeout(() => contentSearching(), 1000);
        });

        searchBar.addEventListener('blur', ()=>{
            setTimeout(() => {
               resultItemsContainer.style.display='none';
               resultItemsContainer.innerHTML = '';
            }, 2000);
            resultItemsContainer.style.overflowY = 'none';
        });
    }); 
});
