# node-red-contrib-wordpress

A set of [Node-RED](https://nodered.org/)</a> nodes to interact with the [WordPress.org REST API](https://developer.wordpress.org/rest-api/) and [WooCommerce REST API](http://woocommerce.github.io/woocommerce-rest-api-docs/).

## Install

Run the following command in the root directory of your Node-RED install:

    npm install node-red-contrib-wordpress
	
For now we are using basic auth to interact with the core API. You will need to install the [basic auth plugin](https://github.com/wp-api/basic-auth) to your WordPress website. It is highly recommended you use SSL on your site when using basic auth.

We also have developed a [helper plugin](https://github.com/automattic/node-red-wordpress) which adds some additional endpoints and useful shortcodes which you may find useful to install and experiment with.

## Nodes

### Get Posts

### Create/Update Posts

### Get Page

### Create/Update Page

### Get Option

Grab a setting/option from the `wp_options` table. Only [certain options](https://developer.wordpress.org/rest-api/reference/settings/#arguments) are available on this endpoint by default.

### Set Option

Set a setting/option in the `wp_options` table. Only [certain options](https://developer.wordpress.org/rest-api/reference/settings/#arguments) are available on this endpoint by default.

### Create Product

## Usage

Please see [the wiki for examples and experiments](https://github.com/Automattic/node-red-contrib-wordpress/wiki).

## Credits

Made possble with the help of the following projects:

* [Node WPAPI](https://github.com/WP-API/node-wpapi)
* [WooCommerce API for Node](https://github.com/woocommerce/wc-api-node)
