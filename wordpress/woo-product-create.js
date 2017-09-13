"use strict";

module.exports = function(RED) {
	const WooCommerceAPI = require('woocommerce-api');
	function wooProductCreate( config ) {
		RED.nodes.createNode( this, config );
		var node = this;
		node.config = config;
		node.siteconfig = RED.nodes.getNode( node.config.config );

		this.on( 'input', function( msg ) {
			msg.payload = typeof WooCommerceAPI;
			node.send( msg );
		} );
	};

	RED.nodes.registerType( 'woo-product-create', wooProductCreate );
}
