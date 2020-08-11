<?php
error_reporting(0);
include '_function.php';
include '../config/koneksi.php';

$list   = array();
$id_user     = $_GET['id_user'];

$query  = mysqli_query($conn, "SELECT * FROM `result` INNER JOIN `jenis_test` WHERE result.id_jenis = jenis_test.id_jenis and result.id_user ='$id_user' ");

while ($data = mysqli_fetch_array($query)) {
    $list[] = array(
        'id'                => $data['id_result'],
        'id_user'           => $data['id_user'],
        'email'             => $data['email'],
        'tanggal'           => $data['tanggal'],
        'jenis_test' => $data['nama_test'],
        'jenis_kepribadian' => $data['jenis_kepribadian'],
        'detail'            => unserialize($data['detail'])
    );
}

if (!empty($id_user)) {
    if (mysqli_num_rows($query) != 0) {
        api_ok($list);
    } else {
        api_no(['message' => 'Id user tidak ditemukan']);
    }
} else {
    api_no(['message' => 'Anda harus memasukan id user']);
}

output_json($output);
