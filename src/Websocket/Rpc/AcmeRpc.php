<?php

namespace App\Websocket\Rpc;

use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\RPC\RpcInterface;
use Ratchet\ConnectionInterface;

final class AcmeRpc implements RpcInterface
{
    /**
     * Adds the params together
     *
     * Note: $conn isnt used here, but contains the connection of the person making this request.
     *
     * @param ConnectionInterface $connection
     * @param WampRequest $request
     * @param array $params
	 *
     * @return array
     */
    public function sum(ConnectionInterface $connection, WampRequest $request, $params): array
    {
		return ['result' => array_sum($params)];
	}

    /**
     * Name of RPC, use for pubsub router (see step3)
     *
     * @return string
     */
    public function getName()
    {
        return 'acme.rpc';
    }
}
