<?php
// error_reporting(0);
include '_function.php';
include '../config/koneksi.php';

$a     = [];
$query = mysqli_query($conn, "SELECT `id_jenis`,`nama_test`,`deskripsi`,`submit_url` FROM `jenis_test` ");
while ($data = mysqli_fetch_array($query)) {
    $a[] = [
        'id'          => $data['id_jenis'],
        'test_name'   => $data['nama_test'],
        'description' => $data['deskripsi'],
        'url' => "question.php?id={$data['id_jenis']}",
        'submit_url' => $data['submit_url']
    ];
}

api_ok(array(
    'title' => 'Aplikasi Test Kepribadian',
    'description' => "Definisi tes kepribadian secara umum yaitu teknik untuk mengesahkan ataupun menolak hipotesis dalam pengukuran mental yang akan menghasilkan skor untuk membandinggkan antara dua orang atau lebih. Tes kepribadian disusun untuk mengukur bermacam-macam faktor psikologis tertentu yang biasanya juga berkaitan dengan kemampuan fisik seseorang. Pengertian tes kepribadian menurut Lee J. Cronbach dalam Essential of Psychological Testing, tes kepribadian ialah tes yang dipergunakan untuk mengetahui perbedaan diantara setiap kepribadian, dan kepribadian itu sifatnya individual, yang artinya tak seorang pun mempunyai kepribadian yang sama antara sau dengan yang lain. Kepribadian itu juga bukanalah suatu yang benar atau salah, bukan juga suatu yang baik atau buruk. Kepribadaian yaitu apa adanya diri kita yang telah mempunyai kepribadian yang unik yang berbeda dengan yang lainnya.",
    'list'  => $a,
));
output_json($output);
