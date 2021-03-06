# Search Index

> Create a serialized [lunr.js][lunr-js] search index.

<section class="usage">

## Usage

```javascript
var create = require( '@stdlib/tools/search/create' );
```

#### create( \[options,] clbk )

Asynchronously creates a serialized [lunr.js][lunr-js] search index.

```javascript
create( onCreate );

function onCreate( error, idx ) {
    if ( error ) {
        throw error;
    }
    console.log( idx );
}
```

The function accepts the following `options`:

-   **dir**: root directory from which to search for packages. May be either an absolute file path or a path relative to the current working directory. Default: current working directory.
-   **pattern**: glob pattern used to find packages. Default: `'**/package.json'` (note: pattern **must** end with `package.json`).
-   **ignore**: list of glob patterns used to exclude matches.

To search for packages from an alternative directory, set the `dir` option.

```javascript
var opts = {
    'dir': '/foo/bar/baz'
};

create( opts, onCreate );

function onCreate( error, idx ) {
    if ( error ) {
        throw error;
    }
    console.log( idx );
}
```

To provide an alternative include filter, set the `pattern` option.

```javascript
var opts = {
    'pattern': '**/foo/**/package.json'
};

create( opts, onCreate );

function onCreate( error, idx ) {
    if ( error ) {
        throw error;
    }
    console.log( idx );
}
```

To exclude matches, set the `ignore` option.

```javascript
var opts = {
    'ignore': [
        'node_modules/**',
        'build/**',
        'reports/**'
    ]
};

create( opts, onCreate );

function onCreate( error, idx ) {
    if ( error ) {
        throw error;
    }
    console.log( idx );
}
```

</section>

<!-- /.usage -->

<section class="examples">

## Examples

```javascript
var lunr = require( 'lunr' );
var path = require( 'path' );
var tokenizer = require( '@stdlib/tools/search/create/lib/tokenizer.js' );
var create = require( '@stdlib/tools/search/create' );

lunr.tokenizer.registerFunction( tokenizer, 'readme_tokenizer' );
lunr.tokenizer.load( 'readme_tokenizer' );

create({
    'dir': '/path/to/stdlib/lib/node_modules/@stdlib'
}, onCreate );

function onCreate( error, idx ) {
    var store;
    if ( error ) {
        throw error;
    }
    idx.tokenizer = 'readme_tokenizer';
    store = lunr.Index.load( idx );

    // Perform a search:
    console.log( store.search( 'encrypt' ) );
}
```

</section>

<!-- /.examples -->

* * *

<section class="cli">

## CLI

<section class="usage">

### Usage

```bash
Usage: create-search [options] [dir]

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
         --pattern pattern     Inclusion glob pattern.
         --ignore pattern      Exclusion glob pattern.
```

</section>

<!-- /.usage -->

<section class="notes">

### Notes

-   If not provided a `dir` argument, the current working directory is the search directory.

-   To provide multiple exclusion glob patterns, set multiple `--ignore` option arguments.

    ```bash
    $ create-search --ignore=node_modules/** --ignore=build/** --ignore=reports/**
    ```

</section>

<!-- /.notes -->

<section class="examples">

### Examples

```bash
$ create-search . > search_index.json
```

</section>

<!-- /.examples -->

</section>

<!-- /.cli -->

<section class="links">

[lunr-js]: http://lunrjs.com/

</section>

<!-- /.links -->
