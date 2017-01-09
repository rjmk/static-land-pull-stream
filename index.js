exports.source = {
  concat: concat,
  chain: chain,
  empty: empty,
  map: map,
  ap: ap,
  of: of
}

function concat (s, t) {
  var sFinished = false
  return function stream (abort, cb) {
    if (sFinished) return t(abort, cb)

    s(abort, function (end, data) {
      if (!end) return cb(null, data)
      sFinished = true
      stream(abort, cb)
    })
  }
}

function chain(f, stream) {
  return function (abort, cb) {
    stream(abort, function (end, data) {
      if (end) return cb(end)
      f(data)(abort, cb)
    })
  }
}

function empty () {
  return function (abort, cb) { cb(true) }
}

function map (f, stream) {
  return function (abort, cb) {
    stream(abort, function (end, data) {
      cb(end, f(data))
    })
  }
}

function ap(s, t) {
  return chain(f => map(f, t), s)
}

function of (x) {
  var called = false
  return function (abort, cb) {
    if (abort) return cb(abort)
    cb(called, x)
    called = true
  }
}
