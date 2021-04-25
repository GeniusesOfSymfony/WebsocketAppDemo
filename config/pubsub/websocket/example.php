<?php

use Gos\Bundle\PubSubRouterBundle\Loader\Configurator\RoutingConfigurator;

return static function (RoutingConfigurator $routes): void {
    $collection = $routes->collection();

    $collection->add('acme_topic', 'acme/channel', 'acme.topic');

    $collection->add('acme_rpc', 'sample/{method}', 'acme.rpc')
        ->requirements(
            [
                'method' => '[a-z_]+',
            ]
        );
};
