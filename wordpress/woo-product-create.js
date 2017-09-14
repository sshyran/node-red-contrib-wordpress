"use strict";
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
			WooCommerce.post( 'products', msg.payload, function( err, data, res ) {
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
