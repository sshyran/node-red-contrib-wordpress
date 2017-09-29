"use strict";
module.exports = function( RED ) {
	const WooCommerceAPI = require( 'woocommerce-api' );
	function wooApi( config ) {
		const node = this;
		RED.nodes.createNode( node, config );
		node.config = config;
		node.siteconfig = RED.nodes.getNode( node.config.config );

		this.on( 'input', function( msg ) {
			const WooCommerce = new WooCommerceAPI( {
				url: node.siteconfig.url,
				consumerKey: node.siteconfig.credentials.key,
				consumerSecret: node.siteconfig.credentials.secret,
				wpAPI: true,
				version: 'wc/v1'
			} );
			const method = node.config.method;
			const endpoint = msg.endpoint || node.config.endpoint;
			function handleResponse( err, data, res ) {
				if ( err ) {
					console.log( err );
					msg.payload = 'There was an error, check the console';
				} else {
					msg.payload = res;
				}
				node.send( msg );
			}
			if ( method === 'post' || method === 'put' ) {
				WooCommerce[ method ]( endpoint, msg.payload, handleResponse );
			} else {
				WooCommerce[ method ]( endpoint, handleResponse );
			}
		} );
	};

	RED.nodes.registerType( 'woocommerce', wooApi );
}
