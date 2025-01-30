<?php
   
   $db = new PDO('sqlite:users_db.db');
   var_dump($db);
   echo '<br>';

   $users = [
      'Alex10' => 'Edelweise24',
      'Staufenberg' => 'Valkirie44',
      'Appalon12' => '1974y'
   ];

//    foreach( array_keys($users) as $key ){
//       $stmt=$db->prepare('insert into users (nickname, password, language) values (?, ?, ?)');
//       $stmt->execute([$key, $users[$key], 'FR']);
//    }

   echo '<br>Table 1<br><br>';
   $stmt = $db->prepare('select * from users');
   $stmt->execute();

   $usersDB = $stmt->fetchAll(PDO::FETCH_ASSOC);

   var_dump($usersDB);
   
   echo '<br>';

   foreach( array_keys($users) as $key ){
        $stmt = $db->prepare('update users set password = ? where nickname = ?');
        echo '<br><br>'.$key.'---'.hash( 'sha3-256' , $users[$key] ).'<br><br>';
        $stmt->execute([ hash( 'sha3-256' , $users[$key] ), $key ]); 
   }
 
//    $stmt = $db->prepare('update users set password = ? where nickname = ?');
//    $stmt->execute(['Edelweise25','Alex10']);

   $stmt = $db->prepare('select password from users');
   $stmt->execute();

   $usersDBP = $stmt->fetchAll(PDO::FETCH_ASSOC);
   
   echo '<br>Table 2<br><br>';

   var_dump($usersDBP);



?>