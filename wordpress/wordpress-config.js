module.exports = function(RED) {
	"use strict";
	
	function wordpressConfig( n ) {
		RED.nodes.createNode( this, n );

		this.url = n.url || false;
		this.username = n.username || false;
		
		this.on('close', function() {
			// tidy up?
		});
	};
	
	RED.nodes.registerType( 'wordpress-config', wordpressConfig, {
		credentials: {
			password: { type: 'password' }
		}
	} );
}