<?php 
error_reporting(0);
include '../config/koneksi.php';
$id_jenis = $_GET['id_jenis'];

?>

<!DOCTYPE html>
<html lang="en">

  <head>
    <title>Tes Kepribadian</title>
    <?php include 'head.php' ?>
  </head>

  <body id="page-top">

    <?php include 'navbar.php'; ?>

    <div id="wrapper">

    <?php include 'sidebar.php'; ?>

      <div id="content-wrapper">

        <div class="container-fluid">

          <!-- Breadcrumbs-->
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Test</li>
          </ol>

          <!-- DataTables Example -->
          <div class="card mb-3">
            <div class="card-header">
              <i class="fas fa-table"></i>
              List Soal</div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nomor Soal</th>
                      <?php 
                        if($id_jenis == 1 ){
                      ?>
                      <th>Pernyataan</th>
                      <th>Jenis Kepribadian</th>

                      <?php
                        }elseif($id_jenis == 2 ){
                      ?>

                      <th>Pernyataan</th>
                      <th>Jenis Kepribadian</th>
                      <th>Kategori</th>

                      <?php
                        }elseif($id_jenis == 3 ){
                      ?>

                      <th>Pernyataan</th>
                      <th>Jawaban</th>
                      <th>Huruf</th>

                      <?php
                        }
                       ?>

                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>No</th>
                      <th>Nomor Soal</th>
                      <?php 
                        if($id_jenis == 1 ){
                      ?>
                      <th>Pernyataan</th>
                      <th>Jenis Kepribadian</th>

                      <?php
                        }elseif($id_jenis == 2 ){
                      ?>

                      <th>Pernyataan</th>
                      <th>Jenis Kepribadian</th>
                      <th>Kategori</th>

                      <?php
                        }elseif($id_jenis == 3 ){
                      ?>

                      <th>Pernyataan</th>
                      <th>Jawaban</th>
                      <th>Huruf</th>

                      <?php
                        }
                       ?>

                      <th>Aksi</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <?php 
                    $i = 1;
                    $query = mysqli_query($conn, "SELECT `id_soal`,`no_soal`, `pernyataan`, `jawaban`, `huruf`, `jenis_kepribadian`, `kategori` FROM `soal` WHERE `id_jenis` = '$id_jenis' ");
                    while ($data = mysqli_fetch_array($query)) {
                    ?>
                    <tr>
                      <td><?php echo $i++ ?></td>
                      <td><?php echo $data['no_soal']; ?></td>
                      
                      <?php 
                      if($data['pernyataan'] != null){
                      echo "<td>".$data['pernyataan']."</td>";
                      }
                      if($data['jawaban'] != null){
                      echo "<td>".$data['jawaban']."</td>";
                      }
                      if($data['huruf'] != null){
                      echo "<td>".$data['huruf']."</td>";
                      }
                      if($data['jenis_kepribadian'] != null){
                      echo "<td>".$data['jenis_kepribadian']."</td>";
                      }
                      if($data['kategori'] != null){
                      echo "<td>".$data['kategori']."</td>";
                      }
                      ?>
                      <td>
                        <!-- <a onclick="deleteConfirm('index.php')" href="#!" class="btn btn-small text-danger"><i class="fas fa-trash"></i> Hapus</a> -->
                      </td>
                    </tr>
                    <?php
                    }
                    ?>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
          </div>

          <p class="small text-center text-muted my-5">
            <em>More table examples coming soon...</em>
          </p>

        </div>
        <!-- /.container-fluid -->

        <?php include 'footer.php'; ?>

      </div>
      <!-- /.content-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <?php include 'js.php'; ?>
    <?php include 'modal.php'; ?>

    <script>
      function deleteConfirm(url){
        $('#btn-delete').attr('href', url);
        $('#deleteModal').modal();
      }
    </script>

  </body>

</html>
