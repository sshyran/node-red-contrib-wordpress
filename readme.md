# node-red-contrib-wordpress

A set of [Node-RED](https://nodered.org/)</a> nodes to interact with the [WordPress.org REST API](https://developer.wordpress.org/rest-api/) and [WooCommerce REST API](http://woocommerce.github.io/woocommerce-rest-api-docs/).

**Beta - Expect some node changes!**

## Install

Run the following command in the root directory (default `~/.node-red`) of your Node-RED install:

    npm install node-red-contrib-wordpress
	
For now, we use [basic auth](https://tools.ietf.org/html/rfc2617) to interact with the WordPress API. You will need to install the [basic auth plugin](https://github.com/wp-api/basic-auth) to your WordPress website. We highly recommend you use SSL on your site when using basic auth.

We also have a [helper plugin](https://github.com/automattic/node-red-wordpress) which adds additional REST API endpoints to WordPress and shortcodes you may find useful to install and experiment with.

## Nodes

### Get Posts

Grab a collection of posts. There is a basic set of query options within the Node. Expect more soon.

### Create Posts

Create new posts on your WordPress site.

### Get Page

Coming soon

### Create/Update Page

Coming soon

### Get Option

Get a setting/option from the `wp_options` table. Note, a limited set of [options](https://developer.wordpress.org/rest-api/reference/settings/#arguments) are available on this endpoint by default.

### Set Option

Set a setting/option in the `wp_options` table. Again, a limited set of [options](https://developer.wordpress.org/rest-api/reference/settings/#arguments) are available on this endpoint by default.

### Create Product

Injests a product object and passes this to the WooCommerce API. This is a just for demo purposes at the moment.

## Usage

Please see [the wiki for examples and experiments](https://github.com/Automattic/node-red-contrib-wordpress/wiki).

## Credits

Made possble with the help of the following projects:

* [Node WPAPI](https://github.com/WP-API/node-wpapi)
* [WooCommerce API for Node](https://github.com/woocommerce/wc-api-node)
* [WordPress REST API](https://developer.wordpress.org/rest-api/)
