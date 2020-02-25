<?php

namespace App\Websocket\Topic;

use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;

final class AcmeTopic implements TopicInterface
{
    /**
     * This will receive any Subscription requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic $topic
     * @param WampRequest $request
     *
     * @return void
     */
    public function onSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request): void
    {
        // This will broadcast the message to ALL subscribers of this topic.
        $topic->broadcast(['msg' => $connection->resourceId.' has joined '.$topic->getId()]);
    }

    /**
     * This will receive any UnSubscription requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic $topic
     * @param WampRequest $request
     *
     * @return void
     */
    public function onUnSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request): void
    {
        //this will broadcast the message to ALL subscribers of this topic.
        $topic->broadcast(['msg' => $connection->resourceId.' has left '.$topic->getId()]);
    }

    /**
     * This will receive any Publish requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param                     $Topic topic
     * @param WampRequest $request
     * @param                     $event
     * @param array $exclude
     * @param array $eligibles
     *
     * @return mixed|void
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

    /**
     * Like RPC is will use to prefix the channel
     *
     * @return string
     */
    public function getName(): string
    {
        return 'acme.topic';
    }
}
