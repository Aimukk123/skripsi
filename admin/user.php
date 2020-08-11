<?php 
error_reporting(0);
include '../config/koneksi.php';
?>

<!DOCTYPE html>
<html lang="en">

  <head>
    <title>User Manager</title>
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
            <li class="breadcrumb-item active">User</li>
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
                      <th>Nama Lengkap</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Jenis Kelamin</th>
                      <th>Tanggal Lahir</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Nama Lengkap</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Jenis Kelamin</th>
                      <th>Tanggal Lahir</th>
                      <th>Aksi</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <?php 
                    $query = mysqli_query($conn, "SELECT `id_user`, `nama_lengkap`, `email`, `username`, `password`, `jekel`, `tanggal_lahir` FROM `user`");
                    while ($data = mysqli_fetch_array($query)) {
                    ?>
                    <tr>
                      <td><?php echo $data['nama_lengkap']; ?></td>
                      <td><?php echo $data['email']; ?></td>
                      <td><?php echo $data['username']; ?></td>
                      <td>*******</td>
                      <td><?php echo $data['jekel']; ?></td>
                      <td><?php echo $data['tanggal_lahir']; ?></td>
                      <td>
                        <a onclick="deleteConfirm('index.php')" href="#!" class="btn btn-small text-danger"><i class="fas fa-trash"></i> Hapus</a>
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

        <!-- Sticky Footer -->
        <footer class="sticky-footer">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright © Your Website 2018</span>
            </div>
          </div>
        </footer>

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
