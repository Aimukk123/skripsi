<?php
error_reporting(0);
include '_function.php';
include '../config/koneksi.php';
include '../config/_encrypt.php';

$result   = array();
$email    = $_POST['email'];
$password = $_POST['password'];

if (!empty($email) && !empty($password)) {
    $pass    = encrypt_decrypt($password, 'encrypt');
    $query   = mysqli_query($conn, "SELECT * FROM `user` WHERE `password`='$pass' AND `email`='$email' ");
    $num_row = mysqli_num_rows($query);

    if ($num_row != 0) {
        $data   = mysqli_fetch_assoc($query);
        $result = array(
            'id_user'            => $data['id_user'],
            'username'            => $data['username'],
            'nama_lengkap'  => $data['nama_lengkap'],
            'email'         => $data['email'],
            'jenis_kelamin' => $data['jekel'],
            'tanggal_lahir' => $data['tanggal_lahir'],
        );
        api_ok(array(
            'user' => $result,
        ));
    } else {
        api_no(['message' => 'email atau password anda salah']);
    }

} else {
    api_no(['message' => 'email dan password tidak boleh kosong']);
}

output_json($output);
