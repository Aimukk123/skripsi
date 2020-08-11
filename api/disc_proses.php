<?php
error_reporting(0);
include '../config/koneksi.php';
include '_function.php';

date_default_timezone_set('Asia/Jakarta');

function arrayObject($a, $b)
{
    return ['x' => $a, 'y' => $b];
}

$result = array();

$datane   = $_POST['data'];
$email    = $_POST['email'];
$id_jenis = $_POST['id_jenis'];
$id_user = $_POST['id_user'];

$idm = implode(",", explode("|", $datane));

if (!empty($datane) && !empty($email) && !empty($id_jenis) && !empty($id_user) ) {
    $query             = mysqli_query($conn, "SELECT jenis_kepribadian, COUNT(jenis_kepribadian) as jumlah from soal WHERE id_soal IN ($idm) GROUP BY jenis_kepribadian ORDER BY jumlah DESC LIMIT 1");
    $dt                = mysqli_fetch_assoc($query);
    $jenis_kepribadian = $dt['jenis_kepribadian'];
    $jumlah            = $dt['jumlah'];
    $time_stamp = date("Y-m-d H:i:s");

    $query_detail = mysqli_query($conn, "SELECT jenis_kepribadian, COUNT(jenis_kepribadian) as jumlah from soal WHERE id_soal IN ($idm) GROUP BY jenis_kepribadian ORDER BY jenis_kepribadian ASC");

    while ($detail = mysqli_fetch_array($query_detail)) {
        $kepribadian[] = $detail['jenis_kepribadian'];
        $total[]       = intval($detail['jumlah']);
    }

    $detail_hasil = array_map("arrayObject", $kepribadian, $total);
    $field_detail = serialize($detail_hasil);

    $simpan = mysqli_query($conn, "INSERT INTO `result`(`id_result`, `id_jenis`,`id_user`, `email`, `tanggal`, `detail`, `jenis_kepribadian`)
    	VALUES (null,'$id_jenis','$id_user','$email','$time_stamp','$field_detail','$jenis_kepribadian')");

    if ($simpan) {
        api_ok(array(
            'jenis_kepribadian' => $jenis_kepribadian,
        ));
    } else {
        api_no(['message' => 'gagal disimpan']);
    }

} else {
    api_no(['message' => 'wajib diisi']);
}
output_json($output);