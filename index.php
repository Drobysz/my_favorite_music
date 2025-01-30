<?php
    session_start();

    if (isset($_SESSION['nickname']) === false){
      header('Location: log-reg/log.php');
    } else {
      $db = new PDO('sqlite:users_db.db');

      $stmt = $db->prepare('select language, user_img from users where nickname = ?');
      $stmt->execute([$_SESSION['nickname']]);

      $user_info = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    $title = 'Main Page';
    $css_src = 'css/main.css';
    $js_src = 'js/main.js';
    require 'header-footer/header.php';
?>

<div class="main_container">
   <!-- MENU -->
   <div class="menu">
      <div class="menu-content logo">
         <div class="logo_img inline_box_el"></div>
         <div class="logo_text inline_box_el"><h1>MUSIC</h1></div>
      </div>
      
      <div class="menu-content search_bar_container">
         <input type="text" class="search_bar" placeholder="Search of tracks, albums and artists">
         <div class="result_items_container"></div>
      </div>
      
      <div class="menu-content nickname"><h1><?=$_SESSION['nickname']?></h1></div>
      <div class="menu-content acc_img" user_img="<?=$user_info['user_img']?>">
         <form action="img_upload.php" method="post" id="uploadForm" enctype="multipart/form-data">
            <input type="file" id="imgInput" name="file" accept="image/png, image/jpeg" require>
            <button type="submit" id="submit"></button>
            <button type="button" id="uploadBtn">
               <svg class="edit concealed_btn" width="33" height="33" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.204 10.796L19 9C19.5453 8.45475 19.8179 8.18213 19.9636 7.88803C20.2409 7.32848 20.2409 6.67152 19.9636 6.11197C19.8179 5.81788 19.5453 5.54525 19 5C18.4548 4.45475 18.1821 4.18213 17.888 4.03639C17.3285 3.75911 16.6715 3.75911 16.112 4.03639C15.8179 4.18213 15.5453 4.45475 15 5L13.1814 6.81866C14.1452 8.46926 15.5314 9.84482 17.204 10.796ZM11.7269 8.27311L4.8564 15.1436C4.43134 15.5687 4.21881 15.7812 4.07907 16.0423C3.93934 16.3034 3.88039 16.5981 3.7625 17.1876L3.1471 20.2646C3.08058 20.5972 3.04732 20.7635 3.14193 20.8581C3.23654 20.9527 3.40284 20.9194 3.73545 20.8529L6.81243 20.2375C7.40189 20.1196 7.69661 20.0607 7.95771 19.9209C8.21881 19.7812 8.43134 19.5687 8.8564 19.1436L15.7458 12.2542C14.1241 11.2386 12.7524 9.87627 11.7269 8.27311Z" fill="#222222"/>
               </svg>
            </button>
         </form>
      </div>
      <div class="menu-content inline_box_el lang">
         <img class="lang_img" src="imgs/dev/lang 1.png" alt="#"> 
         <div class="user_lang"><?=$user_info['language']?></div>
         <div class="langs_container">
            <h3 class="no_result">No results</h3>
         </div> 
      </div>
   </div>
   <!-- MAIN PAGE -->
   <div class="music_content_box">

       <!-- Album Container -->
       <div class="album_container">
          <div class="title title_alb_marg">
               <h1 class="title_h1 inline_box_el">My adorable albums</h1>

               <div class="page_changer alb_sldr inline_box_el">
                  <svg class="left" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="-1" x2="12.5503" y2="-1" transform="matrix(-0.861454 0.507836 -0.861454 -0.507836 12.5285 0.297241)" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <path d="M13.6187 14.2491L1.94577 7.36781" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>

                  <svg class="right" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="-1" x2="12.5453" y2="-1" transform="matrix(0.864327 -0.50281 0.854481 0.519598 4.11447 14.7947)" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <path d="M2.06299 0.83548L13.6372 7.87362" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
               </div>
          </div>     
          <div class="album_zone scrollbar"></div>
       </div>
       <!-- Songs Container -->
       <div class="songs_container">
          <div class="title title_song_marg">
              <h1 class="title_h1 inline_box_el">My adorable songs</h1>

              <div class="page_changer sng_sldr inline_box_el">
                  <svg class="left" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="-1" x2="12.5503" y2="-1" transform="matrix(-0.861454 0.507836 -0.861454 -0.507836 12.5285 0.297241)" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <path d="M13.6187 14.2491L1.94577 7.36781" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>

                  <svg class="right" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="-1" x2="12.5453" y2="-1" transform="matrix(0.864327 -0.50281 0.854481 0.519598 4.11447 14.7947)" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <path d="M2.06299 0.83548L13.6372 7.87362" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
               </div>
          </div>     
          <div class="songs_zone scrollbar"></div>
       </div>
   </div>
</div>

<!-- Footer-Copyright -->
<h1 class="footer_text">All rights are reserved to the individual <strong id="fln">Alexandre Drobyshevski</strong>. 2024©</h1>

<div class="space"></div>

<!-- MODAL WINDOWS -->

<!-- Album page -->
<?php require 'info_pages/album_page.php'?>     

<!-- Songs page -->
<?php require 'info_pages/song_page.php'?>  

<!-- Player -->

<div class="player" index="#">
   
   <audio controls class="songBoardInvisible">
      <source src="#" type="audio/mp3">
   </audio>

   <div class="controls">

      <svg class="exp_left control_el" width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M17 6L11 12L17 18" stroke="#FFFFFF" stroke-width="2"/>
         <path d="M6 7V17" stroke="#FFFFFF" stroke-width="2"/>
      </svg>

      <svg class="play-stop_bar paused_player control_el" width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M16.1378 10.5689L9.60498 7.30249C8.40816 6.70408 7 7.57437 7 8.91246V15.0875C7 16.4256 8.40816 17.2959 9.60498 16.6975L16.1378 13.4311C17.3171 12.8414 17.3171 11.1586 16.1378 10.5689Z" fill="#FFFFFF"/>
      </svg>

      <svg class="exp_right control_el" width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M7 6L13 12L7 18" stroke="#FFFFFF" stroke-width="2"/>
         <path d="M18 7V17" stroke="#FFFFFF" stroke-width="2"/>
      </svg>

   </div>
   <div class="img_bar"></div>
   <div class="player_title"></div>
   <div class="progress_bar">
      <input type="range" class="sng_slider" id="range" value="0" min="0" max="1000">
      <div class="time_range">
         <h3 class="current_time">0:00</h3>
         <h3 class="duration">0:00</h3>
      </div>
   </div>
   <div class="volume_container">
      <svg class="volume" width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M4.15838 13.9306C3.44537 12.7423 3.44537 11.2577 4.15838 10.0694C4.37596 9.70674 4.73641 9.45272 5.1511 9.36978L6.84413 9.03117C6.94499 9.011 7.03591 8.95691 7.10176 8.87788L9.17085 6.39498C10.3534 4.97592 10.9447 4.26638 11.4723 4.45742C12 4.64846 12 5.57207 12 7.41928L12 16.5807C12 18.4279 12 19.3515 11.4723 19.5426C10.9447 19.7336 10.3534 19.0241 9.17085 17.605L7.10176 15.1221C7.03591 15.0431 6.94499 14.989 6.84413 14.9688L5.1511 14.6302C4.73641 14.5473 4.37596 14.2933 4.15838 13.9306Z" fill="#FFFFFF"/>
         <path d="M14.5355 8.46447C15.4684 9.39732 15.9948 10.6611 16 11.9803C16.0052 13.2996 15.4888 14.5674 14.5633 15.5076" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
         <path d="M18.6569 6.34314C20.1494 7.83572 20.9916 9.85769 20.9999 11.9685C21.0083 14.0793 20.182 16.1078 18.7012 17.6121" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <div class="slider-container">
         <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="1">
      </div>
   </div>
</div>

<!-- FOOTER -->
<?php require 'header-footer/footer.php'?>