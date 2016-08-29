# Static Pull Stream

Definitions of common algebras for [pull-streams](https://github.com/pull-stream)
using the [static-land](https://github.com/rpominov/static-land) spec.

## Installation

`npm install static-pull`

## Usage

```js
var sourceType = require('static-pull').source
```

## Source Streams

Algebras implemented:

* Semigroup
* Monoid
* Functor
* Apply
* Applicative

A sensible `chain` method can be created, but not one that derives the `ap` included here.

## Vibe

I have tried to avoid using abstractions internally
(at the cost of (hidden) mutation and stuff),
because pull streams are low level and this is providing the functional wrappers.

## Of some interest

With regards to [fantasy-land](https://github.com/fantasyland/fantasy-land)
we would have had to
  a) mutate the global function prototype, or
  b) made an object that 'newtype'd the function like `{ runStream: ... }`.

## TODO

* Sink streams
* Through streams
