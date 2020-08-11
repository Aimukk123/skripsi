<?php

$output = array(
    'ok'      => 0,
    'message' => 'failed to access',
    'result'  => array(),
);

function output_json($array)
{
    $output = '{}';
    if (!empty($array)) {
        if (is_object($array)) {
            $array = (array) $array;
        }
        if (!is_array($array)) {
            $output = $array;
        } else {
            if (defined('JSON_PRETTY_PRINT')) {
                $output = json_encode($array, JSON_PRETTY_PRINT);
            } else {
                $output = json_encode($array);
            }
        }
    }
    header('content-type: form-data; charset: UTF-8');
    // header('content-type: application/json; charset: UTF-8');
    // header('content-type: application/x-www-form-urlencoded; charset: UTF-8');
    // header('cache-control: must-revalidate');
    // header('expires: ' . gmdate('D, d M Y H:i:s', time() + 31536000) . ' GMT');
    echo $output;
    exit();
}

function api_ok($value, $is_ok = 1)
{
    global $output;
    if (empty($value)) {
        $is_ok = 0;
    }
    if (is_array($value)) {
        if (isset($value['ok']) && isset($value['message']) && isset($value['result'])) {
            $output = $value;
        } else {
            $out = array('ok' => $is_ok);
            if (isset($value['ok'])) {
                $out['ok'] = $value['ok'] ? 1 : 0;
                unset($value['ok']);
            }
            if (isset($value['message'])) {
                $out['message'] = $value['message'];
                unset($value['message']);
            }
            if ($out['ok']) {
                $out['message'] = 'success';
            }
            if (isset($value['result'])) {
                $out['result'] = $value['result'];
            } else {
                $out['result'] = $value;
            }
            $output = array_merge($output, $out);
        }
    } else {
        $output = array(
            'ok'      => $is_ok,
            'message' => $is_ok ? 'success' : (is_string($value) ? $value : (!empty($output['message']) ? $output['message'] : 'failed')),
            'result'  => $value,
        );
    }
    $output['result'] = $output['result'];
}

function api_no($value)
{
    api_ok($value, 0);
}

$json = file_get_contents('php://input');
if (!empty($json)) {
    $_POST = (array) json_decode($json);
}
