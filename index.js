exports.source = {
  concat: concat,
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

function ap (s, t) {
  return function (abort, cb) {
    var streams = {
      s: { returned: false, end: null, data: undefined, stream: s },
      t: { returned: false, end: null, data: undefined, stream: t }
    }

    function pull (s) {
      s.stream(abort, function (end, data) {
        s.returned = true
        s.data = data
        s.end = end

        if (streams.s.end || streams.t.end) return cb(true)

        if (streams.s.returned && streams.t.returned)
          cb(null, streams.s.data(streams.t.data))
      })
    }

    eachStream(pull)

    function eachStream (f) {
      return [ 's', 't' ].forEach(function (s) { f(streams[s]) })
    }
  }
}

function of (x) {
  var called = false
  return function (abort, cb) {
    if (abort) return cb(abort)
    cb(called, x)
    called = true
  }
}

