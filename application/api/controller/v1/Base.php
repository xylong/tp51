<?php

namespace app\api\controller\v1;

use think\Controller;

class Base extends Controller
{
    public static function json($status, $message, $data = [], $httpCode = 200)
    {
        $return = [
            'status' => $status,
            'message' => $message,
            'data' => $data
        ];

        return json($return, $httpCode);
    }
}
