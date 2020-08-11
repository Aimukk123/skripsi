<?php
// error_reporting(0);
include '_function.php';
include '../config/koneksi.php';
include '../config/_encrypt.php';

$result        = array();
$nama_lengkap  = $_POST['nama_lengkap'];
$email         = $_POST['email'];
$username      = $_POST['username'];
$password      = $_POST['password'];
$jekel         = $_POST['jekel'];
$tanggal_lahir = $_POST['tanggal_lahir'];

if (!empty($nama_lengkap) && !empty($email) && !empty($username) && !empty($password) && !empty($jekel) && !empty($tanggal_lahir)) {
    $check_user   = mysqli_query($conn, "SELECT `email` FROM `user` where email='$email' ");
    $pass_encrypt = encrypt_decrypt($password, 'encrypt');

    if (mysqli_num_rows($check_user) == 0) {
        $query = mysqli_query($conn, "INSERT INTO `user`(`id_user`, `nama_lengkap`, `email`, `username`, `password`, `jekel`, `tanggal_lahir`) VALUES (null,'$nama_lengkap','$email','$username','$pass_encrypt','$jekel','$tanggal_lahir')");
        if ($query) {
            $qlogin  = mysqli_query($conn, "SELECT `id_user`,`nama_lengkap`,`email`,`jekel`,`tanggal_lahir` FROM `user` WHERE `password`='$pass_encrypt' AND `email`='$email' ");
            $num_row = mysqli_num_rows($qlogin);

            if ($num_row != 0) {
                $data   = mysqli_fetch_assoc($qlogin);
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
            }

        } else {
            api_no(['message' => 'registrasi gagal']);
        }

    } else {
        api_no(['message' => 'email anda sudah terdaftar']);
    }

} else {
    api_no(['message' => 'semua field wajib diisi']);
}

output_json($output);
