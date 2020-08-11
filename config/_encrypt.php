<?php

function encrypt_decrypt($password, $action)
{
    $output = false;
    $method = "AES-128-ECB";
    $key    = "kudalumping";

    if ($action == "encrypt") {
        $output = openssl_encrypt($password, $method, $key);
    } elseif ($action == "decrypt") {
        $output = openssl_decrypt($password, $method, $key);
    }

    return $output;
}
