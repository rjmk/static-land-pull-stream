# Static Pull Stream

IN PROGRESS

Definitions of common algebras for [pull-streams](https://github.com/pull-stream)
using the [static-land](https://github.com/rpominov/static-land) spec.

I've only done source streams so far.

## Vibe

I have tried to avoid using abstractions here
(at the cost of internal mutation and stuff),
because pull streams are low level and this is providing the functional wrappers.

That said there are unexcused problems with the code.

And also probably some further algebras that could be defined.

## Of some interest

With regards to [fantasy-land](https://github.com/fantasyland/fantasy-land)
we would have had to
  a) mutate the global function prototype, or
  b) made an object that 'newtype'd the function like `{ runStream: ... }`.