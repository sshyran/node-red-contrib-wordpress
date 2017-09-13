module.exports = function(RED) {
	"use strict";

	function wooConfig( n ) {
		RED.nodes.createNode( this, n );

		this.url = n.url || false;

		this.on('close', function() {
			// tidy up?
		});
	};

	RED.nodes.registerType( 'woo-config', wooConfig, {
		credentials: {
			key: { type: 'password' },
			secret: { type: 'password' },
		}
	} );
}
