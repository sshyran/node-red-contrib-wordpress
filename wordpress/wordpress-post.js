module.exports = function(RED) {
	"use strict";
	var WPAPI = require( 'wpapi' );

	// WordPress Get Post

	function wordpressGetPost( config ) {
		RED.nodes.createNode( this, config );
		var node = this;
		node.config = config;
		node.siteconfig = RED.nodes.getNode( node.config.config );

		this.on( 'input', function( msg ) {
			var wp = new WPAPI({
    		endpoint: node.siteconfig.url,
    	// This assumes you are using basic auth, as described further below
				username: node.siteconfig.username,
				password: node.siteconfig.credentials.password
			});

			var postsPromise = wp.posts();
			var filters = [ 'search', 'order', 'per_page', 'page' ];
			filters.forEach( function( filter ) {
				if( node.config[ filter ] ) {
					postsPromise = postsPromise.param( filter, node.config[ filter ] )
				}
			} );

			postsPromise.get( function( err, data ) {
		    if ( err ) {
					console.log( err );
		        // handle err
		    }
		    node.send( { posts: data } );
			});


		} );
	};

	RED.nodes.registerType( 'wordpress-post', wordpressGetPost );
}
