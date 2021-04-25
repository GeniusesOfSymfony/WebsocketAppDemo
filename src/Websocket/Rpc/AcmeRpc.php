<?php

namespace App\Websocket\Rpc;

use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\RPC\RpcInterface;
use Ratchet\ConnectionInterface;

final class AcmeRpc implements RpcInterface
{
    public function sum(ConnectionInterface $connection, WampRequest $request, array $params): array
    {
		return ['result' => array_sum($params)];
	}

    public function getName(): string
    {
        return 'acme.rpc';
    }
}
