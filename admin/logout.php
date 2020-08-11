<?php
$start   = session_start();
$destroy = session_destroy();

if ($start && $destroy) {
    header('location:../index.php');
} else {
    echo "failed";
}
