<!--

@license Apache-2.0

Copyright (c) 2024 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# reject

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Return a shallow copy of an [ndarray][@stdlib/ndarray/ctor] containing only those elements which fail a test implemented by a predicate function.

<section class="intro">

</section>

<!-- /.intro -->



<section class="usage">

## Usage

```javascript
import reject from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-reject@deno/mod.js';
```

#### reject( x\[, options], predicate\[, thisArg] )

Returns a shallow copy of an [ndarray][@stdlib/ndarray/ctor] containing only those elements which fail a test implemented by a `predicate` function.

<!-- eslint-disable max-len -->

```javascript
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@deno/mod.js';
import ndarray from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-ctor@deno/mod.js';
import ndarray2array from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-to-array@deno/mod.js';

function predicate( z ) {
    return z <= 6.0;
}

var buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );
var shape = [ 2, 3 ];
var strides = [ 6, 1 ];
var offset = 1;

var x = ndarray( 'float64', buffer, shape, strides, offset, 'row-major' );
// returns <ndarray>

var y = reject( x, predicate );
// returns <ndarray>

var arr = ndarray2array( y );
// returns [ 8.0, 9.0, 10.0 ]
```

The function accepts the following arguments:

-   **x**: input [ndarray][@stdlib/ndarray/ctor].
-   **options**: function options _(optional)_.
-   **predicate**: predicate function.
-   **thisArg**: predicate function execution context _(optional)_.

The function accepts the following options:

-   **dtype**: output ndarray [data type][@stdlib/ndarray/dtypes]. If not specified, the output ndarray [data type][@stdlib/ndarray/dtypes] is inferred from the input [ndarray][@stdlib/ndarray/ctor].
-   **order**: index iteration order. By default, the function iterates over elements according to the [layout order][@stdlib/ndarray/orders] of the provided [ndarray][@stdlib/ndarray/ctor]. Accordingly, for row-major input [ndarrays][@stdlib/ndarray/ctor], the last dimension indices increment fastest. For column-major input [ndarrays][@stdlib/ndarray/ctor], the first dimension indices increment fastest. To override the inferred order and ensure that indices increment in a specific manor, regardless of the input [ndarray][@stdlib/ndarray/ctor]'s layout order, explicitly set the iteration order. Note, however, that iterating according to an order which does not match that of the input [ndarray][@stdlib/ndarray/ctor] may, in some circumstances, result in performance degradation due to cache misses. Must be either `'row-major'` or `'column-major'`.

By default, the output ndarray [data type][@stdlib/ndarray/dtypes] is inferred from the input [ndarray][@stdlib/ndarray/ctor]. To return an ndarray with a different [data type][@stdlib/ndarray/dtypes], specify the `dtype` option.

<!-- eslint-disable max-len -->

```javascript
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@deno/mod.js';
import ndarray from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-ctor@deno/mod.js';
import dtype from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-dtype@deno/mod.js';
import ndarray2array from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-to-array@deno/mod.js';

function predicate( z ) {
    return z <= 6.0;
}

var buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );
var shape = [ 2, 3 ];
var strides = [ 6, 1 ];
var offset = 1;

var x = ndarray( 'float64', buffer, shape, strides, offset, 'row-major' );
// returns <ndarray>

var opts = {
    'dtype': 'float32'
};
var y = reject( x, opts, predicate );
// returns <ndarray>

var dt = dtype( y );
// returns 'float32'

var arr = ndarray2array( y );
// returns [ 8.0, 9.0, 10.0 ]
```

To set the `predicate` function execution context, provide a `thisArg`.

<!-- eslint-disable no-invalid-this, max-len -->

```javascript
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@deno/mod.js';
import ndarray from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-ctor@deno/mod.js';
import ndarray2array from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-to-array@deno/mod.js';

function predicate( z ) {
    this.count += 1;
    return z <= 6.0;
}

var buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );
var shape = [ 2, 3 ];
var strides = [ 6, 1 ];
var offset = 1;

var x = ndarray( 'float64', buffer, shape, strides, offset, 'row-major' );
// returns <ndarray>

var ctx = {
    'count': 0
};
var y = reject( x, predicate, ctx );
// returns <ndarray>

var arr = ndarray2array( y );
// returns [ 8.0, 9.0, 10.0 ]

var count = ctx.count;
// returns 6
```

The `predicate` function is provided the following arguments:

-   **value**: current array element.
-   **indices**: current array element indices.
-   **arr**: the input [ndarray][@stdlib/ndarray/ctor].

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   The function does **not** perform explicit casting (e.g., from a real-valued floating-point number to a complex floating-point number). Any such casting should be performed **prior to** calling this function.
-   The function **always** returns a one-dimensional [ndarray][@stdlib/ndarray/ctor].

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
import discreteUniform from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-array-discrete-uniform@deno/mod.js';
import ndarray2array from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-to-array@deno/mod.js';
import naryFunction from 'https://cdn.jsdelivr.net/gh/stdlib-js/utils-nary-function@deno/mod.js';
import array from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-array@deno/mod.js';
var isPositive = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-number' ).isPrimitive;
import reject from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-reject@deno/mod.js';

var buffer = discreteUniform( 10, -100, 100, {
    'dtype': 'generic'
});
var x = array( buffer, {
    'shape': [ 5, 2 ],
    'dtype': 'generic'
});
console.log( ndarray2array( x ) );

var y = reject( x, naryFunction( isPositive, 1 ) );
console.log( ndarray2array( y ) );
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/ndarray-reject.svg
[npm-url]: https://npmjs.org/package/@stdlib/ndarray-reject

[test-image]: https://github.com/stdlib-js/ndarray-reject/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/ndarray-reject/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/ndarray-reject/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/ndarray-reject?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/ndarray-reject.svg
[dependencies-url]: https://david-dm.org/stdlib-js/ndarray-reject/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/ndarray-reject/tree/deno
[deno-readme]: https://github.com/stdlib-js/ndarray-reject/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/ndarray-reject/tree/umd
[umd-readme]: https://github.com/stdlib-js/ndarray-reject/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/ndarray-reject/tree/esm
[esm-readme]: https://github.com/stdlib-js/ndarray-reject/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/ndarray-reject/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/ndarray-reject/main/LICENSE

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray-ctor/tree/deno

[@stdlib/ndarray/dtypes]: https://github.com/stdlib-js/ndarray-dtypes/tree/deno

[@stdlib/ndarray/orders]: https://github.com/stdlib-js/ndarray-orders/tree/deno

<!-- <related-links> -->

<!-- </related-links> -->

</section>

<!-- /.links -->
