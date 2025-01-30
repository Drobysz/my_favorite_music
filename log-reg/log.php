<?php
    session_start();

    $errorMessage = isset($_SESSION['error_log']) ? $_SESSION['error_log'] : '';

    $title = 'Log In';
    $css_src = '../css/log-reg.css';
    $js_src = '../js/login.js';
    require '../header-footer/header.php'
?>

<div class="main_container">
   
   <div class="logo_container">
      <div class="logo_img"></div>  
      <h1 class="logo_text">MUSIC</h1>
   </div>

   <form action="../log_checking.php" method="get">
      
      <label for="login">NICKNAME</label>
      <input type="text" class="input_block" name="nickname">
      <p class='error'><?=$errorMessage?></p>
      
      <label for="password">PASSWORD</label>
      <input type="password" class="input_block" name="password">
      <p class='error last_error'><?=$errorMessage?></p>
      
      <input type="submit" class="btn-submit" value="LOGIN">
      <h3 class="relink">Aren't you registered yet? There's a <a href="reg.php">link</a> for you</h3>

    </form>
</div>

<?php require '../header-footer/footer.php'?>