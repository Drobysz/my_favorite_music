<?php
    session_start();

    $error_nick = isset($_SESSION['error_nick']) ? $_SESSION['error_nick'] : '';

    $error_pass = isset($_SESSION['error_pass']) ? $_SESSION['error_pass'] : '';

    $error_pass2 = isset($_SESSION['error_pass2']) ? $_SESSION['error_pass2'] : '';

    $title = 'Registration';
    $css_src = '../css/log-reg.css';
    $js_src = '../js/register.js';
    require '../header-footer/header.php'
?>

<div class="main_container">
    <form action="../reg_checking.php" method="get">
      
      <div class="logo_container">
          <div class="logo_img"></div>  
          <h1 class="logo_text">MUSIC</h1>
      </div>

      <label for="nickname">NICKNAME</label>
      <input type="text" class="input_block" name="nickname" placeholder="It mustn't exceed 12 letters and symbols">
      <p class='error'><?=$error_nick?></p>
      
      <label for="password">PASSWORD</label>
      <input type="password" class="input_block" name="password" placeholder="It must exceed 4 letters and contain at least 1 symbol">
      <p class='error'><?=$error_pass?></p>

      <label for="password2">REPEAT YOUR PASSWORD</label>
      <input type="password" class="input_block" name="password2">
      <p class='error last_error'><?=$error_pass2?></p>
      
      <input type="submit" class="btn-submit" value="REGISTER">
      <h3 class="relink">Are you registered already? There's a <a href="log.php">link</a> for you</h3>

    </form>
</div>

<?php require '../header-footer/footer.php'?> 