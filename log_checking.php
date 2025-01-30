<?php
   
session_start();

function trim_SpecChars($obj) { 
   return htmlspecialchars(trim($obj));
}

$db = new PDO('sqlite:users_db.db');

$stmt = $db->prepare('select nickname from users where nickname = ?');
$stmt->execute([trim_SpecChars($_GET['nickname'])]);

$match_nickname = $stmt->fetch(PDO::FETCH_ASSOC);

$hashed = hash('sha3-256', trim_SpecChars($_GET['password']));

$stmt = $db->prepare('select password from users where password = ?');
$stmt->execute([$hashed]);

$match_password = $stmt->fetch(PDO::FETCH_ASSOC);

if (($match_nickname != false) && ($match_password != false)){

   $_SESSION['nickname'] = htmlspecialchars($_GET['nickname']);
   $_SESSION['error_log'] = '';
   
   header('Location: index.php');
} else {
   $_SESSION['error_log'] = 'Your nickname or password is incorrect';
   header('Location: log-reg/log.php');
}
?>