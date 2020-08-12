<?php 
error_reporting(0);
include '../config/koneksi.php';
$id_jenis = $_GET['id_jenis'];

?>

<!DOCTYPE html>
<html lang="en">

  <head>
    <title>Detail</title>
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
            <li class="breadcrumb-item active">Detail Tes</li>
          </ol>

          <!-- DataTables Example -->
          <div class="card mb-3">
            <div class="card-header">
              <i class="fas fa-table"></i>
              User Manager</div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Jenis Tes</th>
                      <th>Nama Kepribadian</th>
                      <th>Detail</th>
                      <th>Saran Pengembangan</th>
                      <th>Saran Profesi</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Jenis Tes</th>
                      <th>Nama Kepribadian</th>
                      <th>Detail</th>
                      <th>Saran Pengembangan</th>
                      <th>Saran Profesi</th>
                      <th>Aksi</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <?php 
                    $query = mysqli_query($conn, "SELECT `id_jenis_kepribadian`,`jenis_test`, `nama_kepribadian`, `detail`, `saran_pengembangan`, `saran_profesi` FROM `jenis_kepribadian` WHERE `id_jenis` = '$id_jenis' ");
                    while ($data = mysqli_fetch_array($query)) {
                    ?>
                    <tr>
                      <td><?php echo $data['jenis_test']; ?></td>
                      <td><?php echo $data['nama_kepribadian']; ?></td>
                      <td>
                        <?php
                          $d = unserialize($data['detail']);
                          for ($i=0; $i <count($d) ; $i++) { 
                            echo $d[$i]."<br/>";
                          }
                        ?>
                      </td>
                      <td><?php echo $data['saran_pengembangan']; ?></td>
                      <td><?php echo $data['saran_profesi']; ?></td>
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
