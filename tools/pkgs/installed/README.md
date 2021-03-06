# Installed Packages

> List installed package dependencies.

<section class="intro">

</section>

<!-- /.intro -->

<section class="usage">

## Usage

```javascript
var pkgs = require( '@stdlib/tools/pkgs/installed' );
```

#### pkgs( \[options], clbk )

Generates a list of installed package dependencies. 

```javascript
pkgs( onPkgs );

function onPkgs( error, list ) {
    if ( error ) {
        throw error;
    }
    console.dir( list );
}
```

The function accepts the following `options`:

-   **dir**: root directory from which to search for packages. Default: current working directory.
-   **depth**: search depth. Default: `+infinity` (the entire dependency tree).
-   **dev**: `boolean` indicating whether to include dev dependencies. Default: `true`.

By default, the function searches the entire package dependency tree. To limit the search depth, set the `depth` option.

```javascript
var opts = {
    'depth': 0 // search only top-level installed packages
};

pkgs( opts, onPkgs );

function onPkgs( error, list ) {
    if ( error ) {
        throw error;
    }
    console.dir( list );
}
```

To exclude development package dependencies, set the `dev` option to `false`.

```javascript
var opts = {
    'dev': false
};

pkgs( opts, onPkgs );

function onPkgs( error, list ) {
    if ( error ) {
        throw error;
    }
    console.dir( list );
}
```

</section>

<!-- /.usage -->

<section class="examples">

<!-- ## Examples

``` javascript

``` -->

</section>

<!-- /.examples -->

* * *

<section class="cli">

## CLI

<section class="usage">

### Usage

```bash
Usage: installed-pkgs [options] [dir]

Options:

  -h,    --help                      Print this message.
  -V,    --version                   Print the package version.
         --depth level               Search depth.
         --no-dev                    Exclude dev dependencies.
```

</section>

<!-- /.usage -->

<section class="notes">

### Notes

-   If not provided a `dir` argument, the search directory is the current working directory.

</section>

<!-- /.notes -->

<section class="examples">

### Examples

```bash
$ DEBUG=* installed-pkgs
...
...
...
```

</section>

<!-- /.examples -->

</section>

<!-- /.cli -->

<section class="links">

</section>

<!-- /.links -->
