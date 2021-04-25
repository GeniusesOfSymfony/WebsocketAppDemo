<?php

namespace App\Websocket\Topic;

use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;

final class AcmeTopic implements TopicInterface
{
    public function onSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request): void
    {
        // This will broadcast the message to ALL subscribers of this topic.
        $topic->broadcast(['msg' => $connection->resourceId.' has joined '.$topic->getId()]);
    }

    public function onUnSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request): void
    {
        //this will broadcast the message to ALL subscribers of this topic.
        $topic->broadcast(['msg' => $connection->resourceId.' has left '.$topic->getId()]);
    }

    /**
     * @param mixed $event The event data
     */
    public function onPublish(
        ConnectionInterface $connection,
        Topic $topic,
        WampRequest $request,
        $event,
        array $exclude,
        array $eligible
    ): void {
        /*
            $topic->getId() will contain the FULL requested uri, so you can proceed based on that

            if ($topic->getId() == "acme/channel/shout")
               //shout something to all subs.
        */

        $topic->broadcast(
            [
                'msg' => $event,
            ]
        );
    }

    public function getName(): string
    {
        return 'acme.topic';
    }
}
