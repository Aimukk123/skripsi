<?php

// mysql_connect('localhost', 'root', '');
// mysql_select_db('db_kepribadian');

// on server
// $host = 'localhost';
// $user = 'id11163583_root';
// $pass = 'hrQd8WA-{KqF0zc5';
// $db   = 'id11163583_kepribadian';

// on local
$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'id_kepribadian';

$conn = mysqli_connect($host, $user, $pass, $db);
