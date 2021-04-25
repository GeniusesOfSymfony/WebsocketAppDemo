<?php

use Symfony\Config\GosWebSocketConfig;

return static function (GosWebSocketConfig $gosWebSocket) {
    $gosWebSocket
        ->server()
            ->port('%env(int:GOS_WEB_SOCKET_SERVER_PORT)%')
            ->host('%env(GOS_WEB_SOCKET_SERVER_IP)%')
            ->router()
                ->resources(['resource' => '%kernel.project_dir%/config/pubsub/websocket/*', 'type' => 'glob'])

    ;
};
