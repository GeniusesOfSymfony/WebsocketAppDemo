<?php

namespace AppBundle\Service;

use Gos\Bundle\WebSocketBundle\Event\ClientRejectedEvent;
use Gos\Bundle\WebSocketBundle\Event\Events;
use Gos\Bundle\WebSocketBundle\Server\App\Stack\HandshakeMiddlewareAbstract;
use Guzzle\Http\Message\RequestInterface;
use Guzzle\Http\Message\Response;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Security\Core\Authentication\Token\AnonymousToken;


class SampleMiddleware extends HandshakeMiddlewareAbstract
{
    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    /**
     * @var array
     */
    protected $firewalls;

    /**
     * @var SecurityContextInterface|TokenStorageInterface
     */
    protected $tokenStorage;

    /**
     * OAuthMiddleware constructor.
     * @param EventDispatcherInterface $eventDispatcher
     * @param array $firewalls
     */
    public function __construct(
        EventDispatcherInterface $eventDispatcher,
        $firewalls = array(),
        $tokenStorage
    )
    {
        $this->eventDispatcher = $eventDispatcher;
        $this->firewalls = $firewalls;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @param ConnectionInterface $conn
     * @param RequestInterface|null $request
     *
     * @return void
     */
    public function onOpen(ConnectionInterface $conn, RequestInterface $request = null)
    {
//        try {
//            $accessToken = $this->oAuthService->verifyAccessToken($request->getQuery()->get('access_token'));
//        } catch (OAuth2AuthenticateException $e) {
//            $this->eventDispatcher->dispatch(
//                Events::CLIENT_REJECTED,
//                new ClientRejectedEvent($e->getMessage(), $request)
//            );
//
//            $this->close($conn, 403);
//            return ;
//        }
//
//        $user = $accessToken->getUser();
//        $token = new AnonymousToken(
//            $request->getQuery()->get('access_token'),
//            $user,
//            $user->getRoles()
//        );
//        $this->tokenStorage->setToken($token);

        return $this->_component->onOpen($conn, $request);
    }

    /**
     * Close a connection with an HTTP response.
     *
     * @param \Ratchet\ConnectionInterface $conn
     * @param int $code HTTP status code
     */
    protected function close(ConnectionInterface $conn, $code = 400)
    {
        $response = new Response($code, [
            'X-Powered-By' => \Ratchet\VERSION,
        ]);

        $conn->send((string)$response);
        $conn->close();
    }
}
