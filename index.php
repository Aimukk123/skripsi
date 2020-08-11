<?php
error_reporting(0);
session_start();

if (!empty($_GET['error'])) {
    $error = $_GET['error'];
}

if (!empty($_SESSION['username'])) {
  header('location:admin/index.php');
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Aplikasi Tes Jenis Kepribadian</title>
<?php include 'head.php';?>
</head>
<body>
    <div class="container">
      <div class="card card-login mx-auto mt-5">
        <div class="card-header">Login</div>
        <div class="card-body">
          <form action="admin/login.php" method="post">
            <div class="form-group">
              <div class="form-label-group">
                <input autocomplete="off" type="text" id="username" name="username" class="form-control" placeholder="Username" required="required" autofocus="autofocus">
                <label for="username">Username</label>
              </div>
            </div>
            <div class="form-group">
              <div class="form-label-group">
                <input autocomplete="off" type="password" id="password" name="password" class="form-control" placeholder="Password" required="required">
                <label for="password">Password</label>
              </div>
            </div>

            <?php if ($error): ?>
            <div class="alert alert-danger" role="alert">
              <?php if ($error == 1): ?>
                <?php echo 'Silahkan login terlebih dahulu'; ?>
              <?php endif;?>
              <?php if ($error == 2): ?>
                <?php echo 'Username/Password Salah'; ?>
              <?php endif;?>
            </div>
            <?php endif;?>

            <input class="btn btn-primary btn-block " type="submit" name="submit" value="Login">
          </form>
        </div>
      </div>
    </div>
  </body>
</html>