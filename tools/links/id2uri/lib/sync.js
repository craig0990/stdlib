'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var getKeys = require( 'object-keys' ).shim();
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var readJSON = require( '@stdlib/fs/read-json' ).sync;
var instanceOf = require( '@stdlib/assert/instance-of' );
var cwd = require( '@stdlib/utils/cwd' );
var config = require( './defaults.js' );
var validate = require( './validate.js' );


// MAIN //

/**
* Synchronously returns the URI corresponding to a provided id.
*
* @param {string} id - id
* @param {Options} [options] - options
* @param {string} [options.database] - path to a link database file (JSON)
* @throws {TypeError} must provide a string
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @returns {(Error|string|null)} result
*
* @example
* var uri = id2uri( 'bibtex' );
* // returns 'http://www.bibtex.org/'
*/
function id2uri( id, options ) {
	var fopts;
	var opts;
	var keys;
	var err;
	var db;
	var i;
	if ( !isString( id ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string. Value: `'+id+'`.' );
	}
	opts = {
		'database': config.database
	};
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	opts.database = resolve( cwd(), opts.database );
	fopts = {
		'encoding': 'utf8'
	};
	db = readJSON( opts.database, fopts );
	if ( instanceOf( db, Error ) ) {
		return db;
	}
	keys = getKeys( db );
	for ( i = 0; i < keys.length; i++ ) {
		if ( db[ keys[i] ].id === id ) {
			return keys[ i ];
		}
	}
	return null;
} // end FUNCTION id2uri()


// EXPORTS //

module.exports = id2uri;
