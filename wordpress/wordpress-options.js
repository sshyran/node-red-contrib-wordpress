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
			var wp = new WPAPI({
				endpoint: node.siteconfig.url,
				username: node.siteconfig.username,
				password: node.siteconfig.credentials.password
			});

			var optionName = false;
			if ( msg.hasOwnProperty( 'option' ) ) {
				optionName = msg.option;
			} else if ( node.config.hasOwnProperty( 'option' ) ) {
				optionName = node.config.option;
			}

			if ( optionName ) {
				wp.settings().auth().then( function( response ) {
					if ( response.hasOwnProperty( optionName ) ) {
						msg.wordpressResponse = response;
						msg.payload = response[optionName];
						node.status( { fill: 'green', shape: 'dot', text: 'ok' } );
						node.send( msg );
					}
				} ).catch( function( e ) {
					node.status( { fill: 'red', shape: 'dot', text: e.code } );
				} );
			}
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
			var wp = new WPAPI({
				endpoint: node.siteconfig.url,
				username: node.siteconfig.username,
				password: node.siteconfig.credentials.password
			});

			var key = false;
			if ( msg.hasOwnProperty( 'option' ) ) {
				key = msg.option.toString();
			} else if ( node.config.hasOwnProperty( 'option' ) ) {
				key = node.config.option.toString();
			}

			if ( key && msg.payload ) {
				wp.settings().auth().update( {
					[ key ]: msg.payload.toString()
				} ).then( function( response ) {
					if ( response.hasOwnProperty( key ) ) {
						msg.wordpressResponse = response;
						msg.payload = response[key];
						node.status( { fill: 'green', shape: 'dot', text: 'ok' } );
						node.send( msg );
					}
				} ).catch( function( e ) {
					node.status( { fill: 'red', shape: 'dot', text: e.code } );
				} );
			}
		} );

	};

	RED.nodes.registerType( 'set-option', wordpressSetOption );
}
