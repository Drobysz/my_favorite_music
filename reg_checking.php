<?php  
   
   session_start();

   $db = new PDO('sqlite:users_db.db');

   unset($_SESSION['error_nick']);
   unset($_SESSION['error_pass']);
   unset($_SESSION['error_pass2']);

   function trim_SpecChars($obj) { 
      return htmlspecialchars(trim($obj));
   }

   $stmt = $db->prepare('select nickname from users where nickname = ?');
   $stmt->execute([trim_SpecChars($_GET['nickname'])]);

   $match_nickname = $stmt->fetch(PDO::FETCH_ASSOC);
   
   $hashed = hash('sha3-256', trim_SpecChars($_GET['password']));

   $stmt = $db->prepare('select password from users where password = ?');
   $stmt->execute([$hashed]);

   $match_password = $stmt->fetch(PDO::FETCH_ASSOC);

   
   if (($match_nickname != false) || ($match_password != false)){
      $_SESSION['error_nick'] = 'Your nickname or password already exists!';

      $_SESSION['error_pass'] = 'Your nickname or password already exists!';

      header('Location: log-reg/reg.php');

   } elseif (strlen(trim($_GET['nickname'])) > 12){
      $_SESSION['error_nick'] =  'Your nickname exceed 8 letters';

      header('Location: log-reg/reg.php');

   } elseif (( strlen(trim($_GET['password'])) <= 4 ) && (preg_match('/[!@#$%^&*()]1-9/', $_GET['password']) >= 1)) {
      $_SESSION['error_pass'] = 'Your password doesn\'t exceed 4 letters or doesn\'t contain at least 1 symbol';

      header('Location: log-reg/reg.php');

   } elseif (trim($_GET['password']) != trim($_GET['password2'])) {
      $_SESSION['error_pass2'] = 'Your password doesn\'t match';

      header('Location: log-reg/reg.php');

   } else {
      $stmt = $db->prepare('insert into users (nickname, password, language, user_img) values (?, ?, ?, ?)');
      $stmt->execute([trim_SpecChars($_GET['nickname']), trim_SpecChars($hashed), 'FR', 'standard_icon.png']);

      $_SESSION['nickname']=trim_SpecChars($_GET['nickname']);

      header('Location: index.php');
   }

?>