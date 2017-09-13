module.exports = function(RED) {
	"use strict";
	var WPAPI = require( 'wpapi' );

	// WordPress Get Option

	function wordpressGetOption( config ) {
		RED.nodes.createNode( this, config );
		var node = this;
		node.config = config;
		node.siteconfig = RED.nodes.getNode( node.config.config );

		this.on( 'input', function( msg ) {
			var apiPromise = WPAPI.discover( node.siteconfig.url ).then( function( site ) {
				return site.auth( {
					username: node.siteconfig.username,
					password: node.siteconfig.credentials.password
				} );
			} ).catch( function( e ) {
				// handle connection / auth errors here ?
				// console.log( e );
			 	// node.status( { fill: 'red', shape: 'dot', text: e } );
			} );

			apiPromise.then( function( site ) {
				if ( node.config.option ) { // allow for the option name to be set in msg.option too?
					site.settings().then( function( response ) {
						if ( response.hasOwnProperty( node.config.option ) ) {
							msg.payload = response[node.config.option];
							node.status( { fill: 'green', shape: 'dot', text: 'ok' } );
							node.send( msg );
						}
					} ).catch( function( e ) {
						node.status( { fill: 'red', shape: 'dot', text: e.code } );
					} );
				}
			} );
		} );
	};

	RED.nodes.registerType( 'get-option', wordpressGetOption );

	// WordPress Set Option

	function wordpressSetOption( config ) {
		RED.nodes.createNode( this, config );
		var node = this;
		node.config = config;
		node.siteconfig = RED.nodes.getNode( node.config.config );

		this.on( 'input', function( msg ) {
			var apiPromise = WPAPI.discover( node.siteconfig.url ).then( function( site ) {
				return site.auth( {
					username: node.siteconfig.username,
					password: node.siteconfig.credentials.password
				} );
			} ).catch( function( e ) {
				// handle connection / auth errors here ?
				// console.log( e );
			 	// node.status( { fill: 'red', shape: 'dot', text: e } );
			} );

			apiPromise.then( function( site ) {
				if ( node.config.option && msg.payload ) { // allow for the option name to be set in msg.option too?
					var key = node.config.option.toString();

					site.settings().update( {
						[ key ]: msg.payload.toString()
					} ).then( function( response ) {
						if ( response.hasOwnProperty( node.config.option ) ) {
							msg.payload = response[node.config.option];
							node.status( { fill: 'green', shape: 'dot', text: 'ok' } );
							node.send( msg );
						}
					} ).catch( function( e ) {
						node.status( { fill: 'red', shape: 'dot', text: e.code } );
					} );
				}
			} );
		} );

	};

	RED.nodes.registerType( 'set-option', wordpressSetOption );
}
