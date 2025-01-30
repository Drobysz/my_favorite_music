<?php
$db = new PDO('sqlite:users_db.db');

$stmt = $db->prepare('update users set language = ? where nickname = ?');
$stmt->execute([$_GET['new_language'] ,$_GET['nickname']]);

header('Location: index.php');
?>