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
				msg.payload = data;
				node.send( msg );
			});


		} );
	};

	RED.nodes.registerType( 'wordpress-post', wordpressGetPost );

	// WordPress Create Post

	function wordpressCreatePost( config ) {
		RED.nodes.createNode( this, config );
		var node = this;
		node.config = config;
		node.siteconfig = RED.nodes.getNode( node.config.config );

		this.on( 'input', function( msg ) {
			var wp = new WPAPI({
				endpoint: node.siteconfig.url,
				username: node.siteconfig.username,
				password: node.siteconfig.credentials.password
			});

			var fields = [ 'title', 'content', 'status' ];
			fields.forEach( function( field ) {
				if( msg[ field ] ) {
					node.config[ field ] = msg[ field ];
				}
			} );

			wp.posts().create( {
				title: node.config.title,
				content: msg.payload || node.config.content,
				status: node.config.status
			} ).then( function( response ) {
				msg.payload = response;
				node.send( msg );
			} );
		} );
	};

	RED.nodes.registerType( 'wordpress-post-create', wordpressCreatePost );
}
