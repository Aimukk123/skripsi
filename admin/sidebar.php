<?php
include '../config/koneksi.php';
?>

      <!-- Sidebar -->
      <ul class="sidebar navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="index.php">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-fw fa-database"></i>
            <span>Data tes</span>
          </a>
          <div class="dropdown-menu" aria-labelledby="pagesDropdown">
          <?php
          $query = mysqli_query($conn, "SELECT `nama_test` FROM `jenis_test`");
          while ($d = mysqli_fetch_array($query)) {
          ?>
            <h6 class="dropdown-header" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" ><?php echo $d['nama_test']; ?></h6>
            <a class="dropdown-item" href="" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">Tes Kepribadian</a>
            <a class="dropdown-item" href="" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">Detail Kepribadian</a>
            <div class="dropdown-divider"></div>
          <?php
          }
          ?>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="user.php">
            <i class="fas fa-fw fa-user"></i>
            <span>User Manager</span></a>
        </li>
      </ul>
