"use strict";

var data = {
	name: 'Test 1',
	type: 'simple',
	regular_price: '21.99',
	description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
	short_description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
	categories: [
		{
			id: 9
		},
		{
			id: 14
		}
	],
	images: [
		{
			src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg',
			position: 0
		},
		{
			src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg',
			position: 1
		}
	]
};

module.exports = function( RED ) {
	const WooCommerceAPI = require( 'woocommerce-api' );
	function wooProductCreate( config ) {
		const node = this;
		RED.nodes.createNode( node, config );
		node.config = config;
		node.siteconfig = RED.nodes.getNode( node.config.config );

		this.on( 'input', function( msg ) {
			var WooCommerce = new WooCommerceAPI( {
				url: node.siteconfig.url,
				consumerKey: node.siteconfig.credentials.key,
				consumerSecret: node.siteconfig.credentials.secret,
				wpAPI: true,
				version: 'wc/v1'
			} );
			WooCommerce.post( 'products', data, function( err, data, res ) {
				if ( err ) {
					console.log( err );
					msg.payload = 'There was an error, check the console';
				} else {
					msg.payload = res;
				}
				node.send( msg );
			} );

		} );
	};

	RED.nodes.registerType( 'woo-product-create', wooProductCreate );
}
