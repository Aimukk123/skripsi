<?php
error_reporting(0);
include '../config/koneksi.php';
include '_function.php';

date_default_timezone_set('Asia/Jakarta');
$result = array();

$datane   = $_POST['data'];
$email    = $_POST['email'];
$id_jenis = $_POST['id_jenis'];
$id_user = $_POST['id_user'];

$select_id = implode(",", explode("|", $datane));

$rule1 = "1,8,15,22,29,36,43,50,57,64";
$rule2 = "2,9,16,23,30,37,44,51,58,65";
$rule3 = "3,10,17,24,31,38,45,52,59,66";
$rule4 = "4,11,18,25,32,39,46,53,60,67";
$rule5 = "5,12,19,26,33,40,47,54,61,68";
$rule6 = "6,13,20,27,34,41,48,55,62,69";
$rule7 = "7,14,21,28,35,42,49,56,63,70";
$time_stamp = date("Y-m-d H:i:s");

if (!empty($datane) && !empty($email) && !empty($id_jenis) && !empty($id_user)) {

    $sql1 = "SELECT SUM(IF(huruf='A',1,0)) AS jawabanA, SUM(IF(huruf='B',1,0)) AS jawabanB FROM soal WHERE id_jenis=3 AND id_soal IN($select_id) AND no_soal IN ($rule1)";
    $sql2 = "SELECT SUM(IF(huruf='A',1,0)) AS jawabanA, SUM(IF(huruf='B',1,0)) AS jawabanB FROM soal WHERE id_jenis=3 AND id_soal IN($select_id) AND no_soal IN ($rule2)";
    $sql3 = "SELECT SUM(IF(huruf='A',1,0)) AS jawabanA, SUM(IF(huruf='B',1,0)) AS jawabanB FROM soal WHERE id_jenis=3 AND id_soal IN($select_id) AND no_soal IN ($rule3)";
    $sql4 = "SELECT SUM(IF(huruf='A',1,0)) AS jawabanA, SUM(IF(huruf='B',1,0)) AS jawabanB FROM soal WHERE id_jenis=3 AND id_soal IN($select_id) AND no_soal IN ($rule4)";
    $sql5 = "SELECT SUM(IF(huruf='A',1,0)) AS jawabanA, SUM(IF(huruf='B',1,0)) AS jawabanB FROM soal WHERE id_jenis=3 AND id_soal IN($select_id) AND no_soal IN ($rule5)";
    $sql6 = "SELECT SUM(IF(huruf='A',1,0)) AS jawabanA, SUM(IF(huruf='B',1,0)) AS jawabanB FROM soal WHERE id_jenis=3 AND id_soal IN($select_id) AND no_soal IN ($rule6)";
    $sql7 = "SELECT SUM(IF(huruf='A',1,0)) AS jawabanA, SUM(IF(huruf='B',1,0)) AS jawabanB FROM soal WHERE id_jenis=3 AND id_soal IN($select_id) AND no_soal IN ($rule7)";

    $query1 = mysqli_query($conn, $sql1);
    $query2 = mysqli_query($conn, $sql2);
    $query3 = mysqli_query($conn, $sql3);
    $query4 = mysqli_query($conn, $sql4);
    $query5 = mysqli_query($conn, $sql5);
    $query6 = mysqli_query($conn, $sql6);
    $query7 = mysqli_query($conn, $sql7);

    $res1 = mysqli_fetch_assoc($query1);
    $res2 = mysqli_fetch_assoc($query2);
    $res3 = mysqli_fetch_assoc($query3);
    $res4 = mysqli_fetch_assoc($query4);
    $res5 = mysqli_fetch_assoc($query5);
    $res6 = mysqli_fetch_assoc($query6);
    $res7 = mysqli_fetch_assoc($query7);

    $hurufA1 = $res1['jawabanA'];
    $hurufA2 = $res2['jawabanA'];
    $hurufA3 = $res3['jawabanA'];
    $hurufA4 = $res4['jawabanA'];
    $hurufA5 = $res5['jawabanA'];
    $hurufA6 = $res6['jawabanA'];
    $hurufA7 = $res7['jawabanA'];

    $hurufB1 = $res1['jawabanB'];
    $hurufB2 = $res2['jawabanB'];
    $hurufB3 = $res3['jawabanB'];
    $hurufB4 = $res4['jawabanB'];
    $hurufB5 = $res5['jawabanB'];
    $hurufB6 = $res6['jawabanB'];
    $hurufB7 = $res7['jawabanB'];

    $extrovertE = $hurufA1;
    $introvertI = $hurufB1;

    $sensingS   = $hurufA3 + $hurufA2;
    $intuitionN = $hurufB3 + $hurufB2;

    $thinkingT = $hurufA5 + $hurufA4;
    $feelingF  = $hurufB5 + $hurufB4;

    $judgingJ    = $hurufA7 + $hurufA6;
    $perceivingP = $hurufB7 + $hurufB6;

    $hasil1 = $extrovertE >= $introvertI ? 'E' : 'I'; //ekstrovert . introvert
    $hasil2 = $sensingS >= $intuitionN ? 'S' : 'N'; //sensing . intuition
    $hasil3 = $thinkingT >= $feelingF ? 'T' : 'F'; //thinking . feeling
    $hasil4 = $judgingJ >= $perceivingP ? 'J' : 'P'; //judging .perceiving

    // $jenis_kepribadian = substr($hasil1, 0, 1) . '' . substr($hasil2, 0, 1) . '' . substr($hasil3, 0, 1) . '' . substr($hasil4, 0, 1);
    $jenis_kepribadian = $hasil1 . '' . $hasil2 . '' . $hasil3 . '' . $hasil4;

    $detail = [
        ['x' => 'extrovert', 'y' => $extrovertE],
        ['x' => 'introvert', 'y' => $introvertI],
        ['x' => 'sensing', 'y' => $sensingS],
        ['x' => 'intuition', 'y' => $intuitionN],
        ['x' => 'thinking', 'y' => $thinkingT],
        ['x' => 'feeling', 'y' => $feelingF],
        ['x' => 'judging', 'y' => $judgingJ],
        ['x' => 'perceiving', 'y' => $perceivingP],
    ];
    $result_detail = serialize($detail);

    $insert = mysqli_query($conn, "INSERT INTO `result`(`id_result`, `id_jenis`, `id_user`,`email`, `tanggal`, `detail`, `jenis_kepribadian`)
        VALUES (null,'$id_jenis','$id_user','$email','$time_stamp','$result_detail','$jenis_kepribadian' )");

    if ($insert) {
        api_ok(array(
            'jenis_kepribadian' => $jenis_kepribadian,
        ));
    } else {
        api_no(['message' => 'Tidak dapat menyimpan hasil']);
    }

} else {
    api_no(['message' => 'wajib diisi']);
}

output_json($output);
