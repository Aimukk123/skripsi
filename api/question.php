<?php
error_reporting(0);
include '_function.php';
include '../config/koneksi.php';

$list   = array();
$detail = array();
$id     = $_GET['id'];

$soal  = mysqli_query($conn, "SELECT `id_soal`, `id_jenis`, `no_soal`, `pernyataan`, `jawaban`, `huruf`, `jenis_kepribadian`, `kategori` FROM (SELECT * FROM `soal` ORDER BY rand() ) AS `temp` WHERE `id_jenis`='$id' ORDER BY no_soal ");
$jenis = mysqli_query($conn, "SELECT `id_jenis`,`nama_test` FROM `jenis_test`  WHERE `id_jenis`= $id ");
$data1 = mysqli_fetch_assoc($jenis);

while ($data = mysqli_fetch_array($soal)) {
    $list[] = array(
        'id_soal'           => $data['id_soal'],
        'id_jenis'          => $data['id_jenis'],
        'no_soal'           => $data['no_soal'],
        'pernyataan'        => $data['pernyataan'],
        'jawaban'           => $data['jawaban'],
        'huruf'             => $data['huruf'],
        'jenis_kepribadian' => $data['jenis_kepribadian'],
        'kategori'          => $data['kategori'],
    );
}

if (!empty($id)) {
    if (mysqli_num_rows($soal) != 0) {
        api_ok(array(
            'id'         => $data1['id_jenis'],
            'jenis_test' => $data1['nama_test'],
            'list'       => $list,
        ));
    } else {
        api_no(['message' => 'Id tidak ditemukan']);
    }
} else {
    api_no(['message' => 'Anda harus memasukan id']);
}

output_json($output);
