/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPlainObject = require( '@stdlib/assert-is-plain-object' );
var isFunction = require( '@stdlib/assert-is-function' );
var isndarrayLike = require( '@stdlib/assert-is-ndarray-like' );
var isOrder = require( '@stdlib/ndarray-base-assert-is-order' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var ctors = require( '@stdlib/ndarray-base-buffer-ctors' );
var zeros = require( '@stdlib/array-base-zeros' );
var getShape = require( '@stdlib/ndarray-shape' );
var getDType = require( '@stdlib/ndarray-dtype' );
var getOrder = require( '@stdlib/ndarray-order' );
var numel = require( '@stdlib/ndarray-base-numel' );
var nextCartesianIndex = require( '@stdlib/ndarray-base-next-cartesian-index' ).assign;
var gcopy = require( '@stdlib/blas-base-gcopy' );
var format = require( '@stdlib/error-tools-fmtprodmsg' );


// MAIN //

/**
* Returns a shallow copy of an ndarray containing only those elements which fail a test implemented by a predicate function.
*
* @param {ndarray} x - input ndarray
* @param {Options} [options] - function options
* @param {string} [options.dtype] - output array data type
* @param {boolean} [options.order] - index iteration order
* @param {Callback} predicate - predicate function
* @param {*} [thisArg] - predicate execution context
* @throws {TypeError} first argument must be an ndarray-like object
* @throws {TypeError} callback argument must be a function
* @throws {TypeError} options argument must be an object
* @returns {ndarray} output ndarray
*
* @example
* var isOdd = require( '@stdlib/assert-is-odd' ).isPrimitive;
* var Float64Array = require( '@stdlib/array-float64' );
* var ndarray = require( '@stdlib/ndarray-ctor' );
* var ndarray2array = require( '@stdlib/ndarray-to-array' );
*
* var buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0 ] );
* var shape = [ 2, 3 ];
* var strides = [ 6, 1 ];
* var offset = 1;
*
* var x = ndarray( 'float64', buffer, shape, strides, offset, 'row-major' );
* // returns <ndarray>
*
* var y = reject( x, isOdd );
* // returns <ndarray>
*
* var arr = ndarray2array( y );
* // returns [ 2.0, 4.0, 8.0, 10.0 ]
*/
function reject( x, options, predicate, thisArg ) {
	var hasOpts;
	var ndims;
	var cache;
	var clbk;
	var opts;
	var ctor;
	var cidx;
	var ctx;
	var ord;
	var dim;
	var idx;
	var buf;
	var dt;
	var sh;
	var N;
	var y;
	var v;
	var i;
	if ( !isndarrayLike( x ) ) {
		throw new TypeError( format( 'null5t', x ) );
	}
	if ( arguments.length < 3 ) {
		clbk = options;
	} else if ( arguments.length === 3 ) {
		if ( isFunction( options ) ) {
			clbk = options;
			ctx = predicate;
		} else {
			hasOpts = true;
			opts = options;
			clbk = predicate;
		}
	} else {
		hasOpts = true;
		opts = options;
		clbk = predicate;
		ctx = thisArg;
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( format( 'null2b', clbk ) );
	}
	if ( hasOpts ) {
		if ( !isPlainObject( opts ) ) {
			throw new TypeError( format( 'null2V', opts ) );
		}
		if ( hasOwnProp( opts, 'dtype' ) ) {
			dt = opts.dtype;
		} else {
			dt = getDType( x );
		}
		if ( hasOwnProp( opts, 'order' ) ) {
			if ( !isOrder( opts.order ) ) {
				throw new TypeError( format( 'null5C', 'order', opts.order ) );
			}
			ord = opts.order;
		}
	} else {
		dt = getDType( x );
	}
	// Resolve an output array buffer constructor:
	ctor = ctors( dt );
	if ( ctor === null ) {
		// The only way we should get here is if the user provided an unsupported data type, as `getDType` should error if the input array has an unrecognized/unsupported data type...
		throw new TypeError( format( 'nullBf', 'dtype', opts.dtype ) );
	}
	// Resolve the iteration order:
	if ( ord === void 0 ) {
		ord = getOrder( x );
	}
	// Resolve the input array shape:
	sh = getShape( x );

	// Compute the number of array elements:
	N = numel( sh );

	// Retrieve the number of dimensions:
	ndims = sh.length;

	// Resolve the dimension in which indices should iterate fastest:
	if ( ord === 'row-major' ) {
		dim = ndims - 1;
	} else { // ord === 'column-major'
		dim = 0;
	}
	// Initialize an index array workspace:
	idx = zeros( ndims );

	// Initialize a value cache for those elements which pass a predicate function (note: unfortunately, we use an associative array here, as no other good options. If we use a "generic" array, we are limited to 2^32-1 elements. If we allocate, say, a Float64Array buffer for storing indices, we risk materializing lazily-materialized input ndarray values again (e.g., lazy accessor ndarray), which could be expensive. If we allocate a workspace buffer of equal size to the input ndarray to store materialized values, we'd then need to perform another copy in order to shrink the buffer, as, otherwise, could be holding on to significantly more memory than needed for the returned ndarray. There are likely other options, but all involve complexity, so the simplest option is used here.):
	cache = {
		'length': 0
	};

	// Filter elements according to a predicate function...
	cidx = -1;
	for ( i = 0; i < N; i++ ) {
		if ( i > 0 ) {
			idx = nextCartesianIndex( sh, ord, idx, dim, idx );
		}
		v = x.get.apply( x, idx );
		if ( !clbk.call( ctx, v, idx.slice(), x ) ) {
			cache.length += 1;
			cidx += 1;
			cache[ cidx ] = v;
		}
	}
	// Retrieve the number of cached elements:
	N = cache.length;

	// Allocate an output array buffer:
	buf = new ctor( N );

	// Copy cached elements to the output array buffer:
	gcopy( N, cache, 1, buf, 1 );

	// Create an output ndarray:
	y = new x.constructor( dt, buf, [ N ], [ 1 ], 0, ord );

	return y;
}


// EXPORTS //

module.exports = reject;