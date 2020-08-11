<?php
error_reporting(0);
include '_function.php';
include '../config/koneksi.php';

$list             = array();
$nama_kepribadian = $_GET['nama_kepribadian'];
$id_jenis         = $_GET['id_jenis'];

if (!empty($nama_kepribadian)) {
    $soal = mysqli_query($conn, "SELECT * FROM `jenis_kepribadian` WHERE `nama_kepribadian` = '$nama_kepribadian' ");
    while ($data = mysqli_fetch_array($soal)) {
        $list = array(
            'jenis_test'         => $data['jenis_test'],
            'nama_kepribadian'   => $data['nama_kepribadian'],
            'detail'             => unserialize($data['detail']),
            'saran_pengembangan' => unserialize($data['saran_pengembangan']),
            'saran_profesi'      => $data['saran_profesi'],
        );
    }
    api_ok($list);
} elseif (!empty($id_jenis)) {
    $soal = mysqli_query($conn, "SELECT * FROM `jenis_kepribadian` WHERE `id_jenis` = '$id_jenis' ");
    while ($data = mysqli_fetch_array($soal)) {
        $list[] = array(
            'jenis_test'         => $data['jenis_test'],
            'nama_kepribadian'   => $data['nama_kepribadian'],
            'detail'             => unserialize($data['detail']),
            'saran_pengembangan' => unserialize($data['saran_pengembangan']),
            'saran_profesi'      => $data['saran_profesi'],
        );
    }
    api_ok($list);
}else{
	$soal = mysqli_query($conn, "SELECT * FROM `jenis_kepribadian`");
    while ($data = mysqli_fetch_array($soal)) {
        $list[] = array(
            'jenis_test'         => $data['jenis_test'],
            'nama_kepribadian'   => $data['nama_kepribadian'],
            'detail'             => unserialize($data['detail']),
            'saran_pengembangan' => unserialize($data['saran_pengembangan']),
            'saran_profesi'      => $data['saran_profesi'],
        );
    }
    api_ok($list);
}

output_json($output);
