<?php
include '../config/koneksi.php';
$username = $_POST['username'];
$password = $_POST['password'];

if (isset($username) && isset($password)) {
    $user  = trim($username);
    $pass  = trim($password);
    $query = mysqli_query($conn, "SELECT `username`, `password` FROM `admin` WHERE `username` = '$user' and `password` = '$pass' ");
    $data  = mysqli_fetch_assoc($query);
    
    if (mysqli_num_rows($query) != 0) {
    	session_start();
    	$_SESSION['username'] = $data['username'];
    	header('location:index.php');
    } else {
    	header('location:../index.php?error=2');
    }
} else {
    echo "failed";
}
