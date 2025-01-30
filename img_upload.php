<?php
session_start();

if (isset($_FILES['file'])) {

    $nickname = $_SESSION['nickname'];
    $uploadDir = 'imgs/users/';

    $db = new PDO('sqlite:users_db.db');
    $stmt = $db->prepare('select user_img from users where nickname = ?');
    $stmt->execute([$nickname]);
    $old_user_img = $stmt->fetch(PDO::FETCH_ASSOC);

    $imgPathPNG = $uploadDir . $old_user_img['user_img'];
    
    if (file_exists($imgPathPNG)){
        unlink($imgPathPNG);
    }

    $file = $_FILES['file'];

    $tmpFilePath = $file['tmp_name'];
    
    $newFileNameNoExt = explode('.',$file['name']);
    $newFileName = $newFileNameNoExt[0] . '.png';
    for ($i=0; $i < strlen($newFileName); $i++ ){
       if ($newFileName[$i] == ' '){
        $newFileName[$i] = '_';
       }
    }

    $destination = $uploadDir . $newFileName;
    
    if ($file['size'] <= 5 * 1024 * 1024){
        move_uploaded_file($tmpFilePath, $destination);
        
        $stmt = $db->prepare('update users set user_img = ? where nickname = ?');
        $stmt->execute([$newFileName, $nickname]);

        header('Location: index.php');
    } else {
        header('Location: index.php');
    }

} else {
  echo 'The image wasn\'t sent';
};

?>