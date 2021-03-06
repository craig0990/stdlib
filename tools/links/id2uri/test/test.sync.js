'use strict';

// MODULES //

var tape = require( 'tape' );
var id2uri = require( './../lib/sync.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof id2uri, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if the first argument is not a string primitive', function test( t ) {
	var values;
	var i;
	values = [
		5,
		NaN,
		null,
		void 0,
		true,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			id2uri( value );
		};
	}
});

tape( 'if the function encounters an error when attempting to read a database, the function returns the error', function test( t ) {
	var out = id2uri( 'sublime-text', {
		'database': './nonexisting.json'
	});
	t.strictEqual( out instanceof Error, true, 'returns an error' );
	t.end();
});

tape( 'the function returns the URI corresponding to a given id', function test( t ) {
	var out = id2uri( 'sublime-text' );
	t.strictEqual( out, 'https://www.sublimetext.com/', 'returns correct URI' );
	t.end();
});

tape( 'the function returns `null` if the id is not found in the database', function test( t ) {
	var out = id2uri( 'not-there' );
	t.strictEqual( out, null, 'returns null' );
	t.end();
});

tape( 'the function returns the URI corresponding to a given id', function test( t ) {
	var out = id2uri( 'sublime-text', {
		'database': './test/fixtures/database.json'
	});
	t.strictEqual( out, 'https://www.sublimetext.com/', 'returns correct URI' );
	t.end();
});
