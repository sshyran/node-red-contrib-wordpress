"use strict";

var data = {
	name: 'Premium Quality',
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

module.exports = function(RED) {
	const WooCommerceAPI = require('woocommerce-api');
	function wooProductCreate( config ) {
		const node = this;
		RED.nodes.createNode( node, config );
		node.config = config;
		node.siteconfig = RED.nodes.getNode( node.config.config );

		this.on( 'input', function( msg ) {
			var WooCommerce = new WooCommerceAPI({
				url: node.siteconfig.url,
				consumerKey: 'ck_b8385d9ac2e1ab4738b18226fb3ca4131d058a4c',
				consumerSecret: 'cs_07982f3ce2fa4f8e098666051c6728f05478f1ff',
				wpAPI: true,
				version: 'wc/v1'
			});
			WooCommerce.post('products', data, function(err, data, res) {
				console.log(res);
			});
			msg.payload = typeof WooCommerceAPI;
			node.send( msg );
		} );
	};

	RED.nodes.registerType( 'woo-product-create', wooProductCreate );
}
