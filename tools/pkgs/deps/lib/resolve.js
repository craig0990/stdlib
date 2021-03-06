'use strict';

// MODULES //

var debug = require( 'debug' )( 'pkg-deps:async:resolve' );
var pkgDeps = require( '@stdlib/_tools/modules/pkg-deps' );
var transform = require( './transform.js' );


// MAIN //

/**
* Resolves package dependencies.
*
* @private
* @param {(ObjectArray)} entries - package entry points
* @param {boolean} builtins - boolean indicating whether to include built-in package dependencies
* @param {Callback} clbk - callback to invoke after resolving package dependencies
*/
function resolve( entries, builtins, clbk ) {
	var count;
	var cache;
	var opts;
	var len;
	var i;

	len = entries.length;
	count = 0;
	cache = new Array( len );

	opts = {
		'walk': true,
		'builtins': builtins
	};
	debug( 'Options: %s', JSON.stringify( opts ) );

	debug( 'Resolving %d packages...', len );
	for ( i = 0; i < len; i++ ) {
		cache[ i ] = {
			'pkg': entries[ i ].pkg,
			'dir': entries[ i ].dir
		};
		debug( 'Resolving package: %s (%d of %d)...', entries[ i ].pkg, i+1, len );
		pkgDeps( entries[ i ].entries, opts, getClbk( i ) );
	}

	/**
	* Returns a callback to be invoked upon resolving package dependencies.
	*
	* @private
	* @param {NonNegativeInteger} idx - index
	* @returns {Callback} callback
	*/
	function getClbk( idx ) {
		var pkg = entries[ idx ].pkg;
		var k = idx + 1;
		return onDeps;
		/**
		* Callback invoked upon resolving dependencies.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {ObjectArray} results - results
		* @returns {void}
		*/
		function onDeps( error, results ) {
			if ( error ) {
				debug( 'Encountered an error when resolving package dependencies: %s (%d of %d). Error: %s', pkg, k, len, error.message );
				return clbk( error );
			}
			debug( 'Successfully resolved package dependencies: %s (%d of %d).', pkg, k, len );

			results = transform( results );
			cache[ idx ].files = results.files;
			cache[ idx ].deps = results.deps;

			count += 1;
			debug( 'Resolved %d of %d packages.', count, len );
			if ( count === len ) {
				return clbk( null, cache );
			}
		} // end FUNCTION onDeps()
	} // end FUNCTION getClbk()
} // end FUNCTION resolve()


// EXPORTS //

module.exports = resolve;
