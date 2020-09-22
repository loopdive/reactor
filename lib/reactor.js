function e(e) {
  return e && "object" == typeof e && "default" in e ? e.default : e;
}
var t = require("react"),
  r = e(t),
  n = require("styled-components"),
  i = e(n);
function o(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function a(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function s(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? a(Object(r), !0).forEach(function (t) {
          o(e, t, r[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
      : a(Object(r)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
        });
  }
  return e;
}
function l(e, t) {
  return t || (t = e.slice(0)), (e.raw = t), e;
}
function u() {
  return (u =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r)
          Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
      return e;
    }).apply(this, arguments);
}
function c(e, t) {
  if (null == e) return {};
  var r,
    n,
    i = {},
    o = Object.keys(e);
  for (n = 0; n < o.length; n++) t.indexOf((r = o[n])) >= 0 || (i[r] = e[r]);
  return i;
}
const d = {
  arr: Array.isArray,
  obj: (e) => "[object Object]" === Object.prototype.toString.call(e),
  fun: (e) => "function" == typeof e,
  str: (e) => "string" == typeof e,
  num: (e) => "number" == typeof e,
  und: (e) => void 0 === e,
  nul: (e) => null === e,
  set: (e) => e instanceof Set,
  map: (e) => e instanceof Map,
  equ(e, t) {
    if (typeof e != typeof t) return !1;
    if (d.str(e) || d.num(e)) return e === t;
    if (
      d.obj(e) &&
      d.obj(t) &&
      Object.keys(e).length + Object.keys(t).length === 0
    )
      return !0;
    let r;
    for (r in e) if (!(r in t)) return !1;
    for (r in t) if (e[r] !== t[r]) return !1;
    return !d.und(r) || e === t;
  },
};
function h(e, t) {
  return d.und(e) || d.nul(e) ? t : e;
}
function f(e) {
  return d.und(e) ? [] : d.arr(e) ? e : [e];
}
function p(e) {
  for (
    var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
    n < t;
    n++
  )
    r[n - 1] = arguments[n];
  return d.fun(e) ? e(...r) : e;
}
function m(e) {
  const t = (function (e) {
    return c(e, [
      "to",
      "from",
      "config",
      "onStart",
      "onRest",
      "onFrame",
      "children",
      "reset",
      "reverse",
      "force",
      "immediate",
      "delay",
      "attach",
      "destroyed",
      "interpolateTo",
      "ref",
      "lazy",
    ]);
  })(e);
  if (d.und(t)) return u({ to: t }, e);
  const r = Object.keys(e).reduce(
    (r, n) => (d.und(t[n]) ? u({}, r, { [n]: e[n] }) : r),
    {}
  );
  return u({ to: t }, r);
}
class g {
  constructor() {
    (this.payload = void 0), (this.children = []);
  }
  getAnimatedValue() {
    return this.getValue();
  }
  getPayload() {
    return this.payload || this;
  }
  attach() {}
  detach() {}
  getChildren() {
    return this.children;
  }
  addChild(e) {
    0 === this.children.length && this.attach(), this.children.push(e);
  }
  removeChild(e) {
    const t = this.children.indexOf(e);
    this.children.splice(t, 1), 0 === this.children.length && this.detach();
  }
}
class y extends g {
  constructor() {
    super(...arguments),
      (this.payload = []),
      (this.attach = () =>
        this.payload.forEach((e) => e instanceof g && e.addChild(this))),
      (this.detach = () =>
        this.payload.forEach((e) => e instanceof g && e.removeChild(this)));
  }
}
class v extends g {
  constructor() {
    super(...arguments),
      (this.payload = {}),
      (this.attach = () =>
        Object.values(this.payload).forEach(
          (e) => e instanceof g && e.addChild(this)
        )),
      (this.detach = () =>
        Object.values(this.payload).forEach(
          (e) => e instanceof g && e.removeChild(this)
        ));
  }
  getValue(e) {
    void 0 === e && (e = !1);
    const t = {};
    for (const r in this.payload) {
      const n = this.payload[r];
      (!e || n instanceof g) &&
        (t[r] = n instanceof g ? n[e ? "getAnimatedValue" : "getValue"]() : n);
    }
    return t;
  }
  getAnimatedValue() {
    return this.getValue(!0);
  }
}
let b,
  w,
  E,
  k,
  x = (e) =>
    "undefined" != typeof window ? window.requestAnimationFrame(e) : -1,
  O = () => Date.now();
class C extends v {
  constructor(e, t) {
    super(),
      (this.update = void 0),
      (this.payload = e.style ? u({}, e, { style: k(e.style) }) : e),
      (this.update = t),
      this.attach();
  }
}
let V = !1;
const j = new Set(),
  P = () => {
    if (!V) return !1;
    let e = O();
    for (let t of j) {
      let r = !1;
      for (let n = 0; n < t.configs.length; n++) {
        let i,
          o,
          a = t.configs[n];
        for (let t = 0; t < a.animatedValues.length; t++) {
          let n = a.animatedValues[t];
          if (n.done) continue;
          let s = a.fromValues[t],
            l = a.toValues[t],
            u = n.lastPosition,
            c = l instanceof g,
            d = Array.isArray(a.initialVelocity)
              ? a.initialVelocity[t]
              : a.initialVelocity;
          if ((c && (l = l.getValue()), a.immediate))
            n.setValue(l), (n.done = !0);
          else if ("string" != typeof s && "string" != typeof l) {
            if (void 0 !== a.duration)
              (u = s + a.easing((e - n.startTime) / a.duration) * (l - s)),
                (i = e >= n.startTime + a.duration);
            else if (a.decay)
              (u =
                s +
                (d / (1 - 0.998)) *
                  (1 - Math.exp(-(1 - 0.998) * (e - n.startTime)))),
                (i = Math.abs(n.lastPosition - u) < 0.1),
                i && (l = u);
            else {
              (o = void 0 !== n.lastTime ? n.lastTime : e),
                (d =
                  void 0 !== n.lastVelocity
                    ? n.lastVelocity
                    : a.initialVelocity),
                e > o + 64 && (o = e);
              let t = Math.floor(e - o);
              for (let e = 0; e < t; ++e)
                (d +=
                  (((-a.tension * (u - l) + -a.friction * d) / a.mass) * 1) /
                  1e3),
                  (u += (1 * d) / 1e3);
              let r = !(!a.clamp || 0 === a.tension) && (s < l ? u > l : u < l),
                c = Math.abs(d) <= a.precision,
                h = 0 === a.tension || Math.abs(l - u) <= a.precision;
              (i = r || (c && h)), (n.lastVelocity = d), (n.lastTime = e);
            }
            c && !a.toValues[t].done && (i = !1),
              i ? (n.value !== l && (u = l), (n.done = !0)) : (r = !0),
              n.setValue(u),
              (n.lastPosition = u);
          } else n.setValue(l), (n.done = !0);
        }
        t.props.onFrame && (t.values[a.name] = a.interpolation.getValue());
      }
      t.props.onFrame && t.props.onFrame(t.values),
        r || (j.delete(t), t.stop(!0));
    }
    return j.size ? x(P) : (V = !1), V;
  };
function S(e, t, r) {
  if ("function" == typeof e) return e;
  if (Array.isArray(e)) return S({ range: e, output: t, extrapolate: r });
  if (E && "string" == typeof e.output[0]) return E(e);
  const n = e,
    i = n.output,
    o = n.range || [0, 1],
    a = n.extrapolateLeft || n.extrapolate || "extend",
    s = n.extrapolateRight || n.extrapolate || "extend",
    l = n.easing || ((e) => e);
  return (e) => {
    const t = (function (e, t) {
      for (var r = 1; r < t.length - 1 && !(t[r] >= e); ++r);
      return r - 1;
    })(e, o);
    return (function (e, t, r, n, i, o, a, s, l) {
      let u = l ? l(e) : e;
      if (u < t) {
        if ("identity" === a) return u;
        "clamp" === a && (u = t);
      }
      if (u > r) {
        if ("identity" === s) return u;
        "clamp" === s && (u = r);
      }
      return n === i
        ? n
        : t === r
        ? e <= t
          ? n
          : i
        : (-Infinity === t
            ? (u = -u)
            : Infinity === r
            ? (u -= t)
            : (u = (u - t) / (r - t)),
          (u = o(u)),
          -Infinity === n
            ? (u = -u)
            : Infinity === i
            ? (u += n)
            : (u = u * (i - n) + n),
          u);
    })(e, o[t], o[t + 1], i[t], i[t + 1], l, a, s, n.map);
  };
}
class A extends y {
  constructor(e, t, r, n) {
    super(),
      (this.calc = void 0),
      (this.payload =
        e instanceof y && !(e instanceof A)
          ? e.getPayload()
          : Array.isArray(e)
          ? e
          : [e]),
      (this.calc = S(t, r, n));
  }
  getValue() {
    return this.calc(...this.payload.map((e) => e.getValue()));
  }
  updateConfig(e, t, r) {
    this.calc = S(e, t, r);
  }
  interpolate(e, t, r) {
    return new A(this, e, t, r);
  }
}
class z extends g {
  constructor(e) {
    var t;
    super(),
      (t = this),
      (this.animatedStyles = new Set()),
      (this.value = void 0),
      (this.startPosition = void 0),
      (this.lastPosition = void 0),
      (this.lastVelocity = void 0),
      (this.startTime = void 0),
      (this.lastTime = void 0),
      (this.done = !1),
      (this.setValue = function (e, r) {
        void 0 === r && (r = !0), (t.value = e), r && t.flush();
      }),
      (this.value = e),
      (this.startPosition = e),
      (this.lastPosition = e);
  }
  flush() {
    0 === this.animatedStyles.size &&
      (function e(t, r) {
        "update" in t ? r.add(t) : t.getChildren().forEach((t) => e(t, r));
      })(this, this.animatedStyles),
      this.animatedStyles.forEach((e) => e.update());
  }
  clearStyles() {
    this.animatedStyles.clear();
  }
  getValue() {
    return this.value;
  }
  interpolate(e, t, r) {
    return new A(this, e, t, r);
  }
}
class R extends y {
  constructor(e) {
    super(), (this.payload = e.map((e) => new z(e)));
  }
  setValue(e, t) {
    void 0 === t && (t = !0),
      Array.isArray(e)
        ? e.length === this.payload.length &&
          e.forEach((e, r) => this.payload[r].setValue(e, t))
        : this.payload.forEach((r) => r.setValue(e, t));
  }
  getValue() {
    return this.payload.map((e) => e.getValue());
  }
  interpolate(e, t) {
    return new A(this, e, t);
  }
}
let q = 0;
class M {
  constructor() {
    (this.id = void 0),
      (this.idle = !0),
      (this.hasChanged = !1),
      (this.guid = 0),
      (this.local = 0),
      (this.props = {}),
      (this.merged = {}),
      (this.animations = {}),
      (this.interpolations = {}),
      (this.values = {}),
      (this.configs = []),
      (this.listeners = []),
      (this.queue = []),
      (this.localQueue = void 0),
      (this.getValues = () => this.interpolations),
      (this.id = q++);
  }
  update(e) {
    if (!e) return this;
    const t = m(e),
      r = t.delay,
      n = void 0 === r ? 0 : r,
      i = t.to,
      o = c(t, ["delay", "to"]);
    if (d.arr(i) || d.fun(i)) this.queue.push(u({}, o, { delay: n, to: i }));
    else if (i) {
      let e = {};
      Object.entries(i).forEach((t) => {
        let r = t[0];
        const i = u({ to: { [r]: t[1] }, delay: p(n, r) }, o);
        e[i.delay] = u({}, e[i.delay], i, {
          to: u({}, e[i.delay] && e[i.delay].to, i.to),
        });
      }),
        (this.queue = Object.values(e));
    }
    return (
      (this.queue = this.queue.sort((e, t) => e.delay - t.delay)),
      this.diff(o),
      this
    );
  }
  start(e) {
    if (this.queue.length) {
      (this.idle = !1),
        this.localQueue &&
          this.localQueue.forEach((e) => {
            let t = e.from,
              r = void 0 === t ? {} : t,
              n = e.to,
              i = void 0 === n ? {} : n;
            d.obj(r) && (this.merged = u({}, r, this.merged)),
              d.obj(i) && (this.merged = u({}, this.merged, i));
          });
      const t = (this.local = ++this.guid),
        r = (this.localQueue = this.queue);
      (this.queue = []),
        r.forEach((n, i) => {
          let o = n.delay,
            a = c(n, ["delay"]);
          const s = (n) => {
            i === r.length - 1 &&
              t === this.guid &&
              n &&
              ((this.idle = !0),
              this.props.onRest && this.props.onRest(this.merged)),
              e && e();
          };
          let l = d.arr(a.to) || d.fun(a.to);
          o
            ? setTimeout(() => {
                t === this.guid &&
                  (l ? this.runAsync(a, s) : this.diff(a).start(s));
              }, o)
            : l
            ? this.runAsync(a, s)
            : this.diff(a).start(s);
        });
    } else
      d.fun(e) && this.listeners.push(e),
        this.props.onStart && this.props.onStart(),
        j.has(this) || j.add(this),
        V || ((V = !0), x(P));
    return this;
  }
  stop(e) {
    return this.listeners.forEach((t) => t(e)), (this.listeners = []), this;
  }
  pause(e) {
    return this.stop(!0), e && j.has(this) && j.delete(this), this;
  }
  runAsync(e, t) {
    var r = this;
    let n = c(e, ["delay"]);
    const i = this.local;
    let o = Promise.resolve(void 0);
    if (d.arr(n.to))
      for (let e = 0; e < n.to.length; e++) {
        const t = e,
          r = u({}, n, m(n.to[t]));
        d.arr(r.config) && (r.config = r.config[t]),
          (o = o.then(() => {
            if (i === this.guid)
              return new Promise((e) => this.diff(r).start(e));
          }));
      }
    else if (d.fun(n.to)) {
      let e,
        t = 0;
      o = o.then(() =>
        n
          .to(
            (r) => {
              const o = u({}, n, m(r));
              if (
                (d.arr(o.config) && (o.config = o.config[t]),
                t++,
                i === this.guid)
              )
                return (e = new Promise((e) => this.diff(o).start(e)));
            },
            function (e) {
              return void 0 === e && (e = !0), r.stop(e);
            }
          )
          .then(() => e)
      );
    }
    o.then(t);
  }
  diff(e) {
    this.props = u({}, this.props, e);
    let t = this.props,
      r = t.from,
      n = void 0 === r ? {} : r,
      i = t.to,
      o = void 0 === i ? {} : i,
      a = t.config,
      s = void 0 === a ? {} : a,
      l = t.attach,
      c = t.reset,
      m = t.immediate;
    if (t.reverse) {
      var g = [o, n];
      (n = g[0]), (o = g[1]);
    }
    (this.merged = u({}, n, this.merged, o)), (this.hasChanged = !1);
    let y = l && l(this);
    if (
      ((this.animations = Object.entries(this.merged).reduce((e, t) => {
        let r = t[0],
          i = t[1],
          o = e[r] || {};
        const a = d.num(i),
          l = d.str(i) && !i.startsWith("#") && !/\d/.test(i) && !w[i],
          g = d.arr(i),
          v = !a && !g && !l;
        let b = d.und(n[r]) ? i : n[r],
          k = a || g || l ? i : 1,
          x = p(s, r);
        y && (k = y.animations[r].parent);
        let C,
          V = o.parent,
          j = o.interpolation,
          P = f(y ? k.getPayload() : k),
          S = i;
        v && (S = E({ range: [0, 1], output: [i, i] })(1));
        let A = j && j.getValue();
        const q = !d.und(V) && o.animatedValues.some((e) => !e.done),
          M = !d.equ(S, A),
          T = !d.equ(S, o.previous),
          L = !d.equ(x, o.config);
        if (c || (T && M) || L) {
          if (a || l) V = j = o.parent || new z(b);
          else if (g) V = j = o.parent || new R(b);
          else if (v) {
            let e = o.interpolation && o.interpolation.calc(o.parent.value);
            (e = void 0 === e || c ? b : e),
              o.parent ? ((V = o.parent), V.setValue(0, !1)) : (V = new z(0));
            const t = { output: [e, i] };
            o.interpolation
              ? ((j = o.interpolation), o.interpolation.updateConfig(t))
              : (j = V.interpolate(t));
          }
          return (
            (P = f(y ? k.getPayload() : k)),
            (C = f(V.getPayload())),
            c && !v && V.setValue(b, !1),
            (this.hasChanged = !0),
            C.forEach((e) => {
              (e.startPosition = e.value),
                (e.lastPosition = e.value),
                (e.lastVelocity = q ? e.lastVelocity : void 0),
                (e.lastTime = q ? e.lastTime : void 0),
                (e.startTime = O()),
                (e.done = !1),
                e.animatedStyles.clear();
            }),
            p(m, r) && V.setValue(v ? k : i, !1),
            u({}, e, {
              [r]: u({}, o, {
                name: r,
                parent: V,
                interpolation: j,
                animatedValues: C,
                toValues: P,
                previous: S,
                config: x,
                fromValues: f(V.getValue()),
                immediate: p(m, r),
                initialVelocity: h(x.velocity, 0),
                clamp: h(x.clamp, !1),
                precision: h(x.precision, 0.01),
                tension: h(x.tension, 170),
                friction: h(x.friction, 26),
                mass: h(x.mass, 1),
                duration: x.duration,
                easing: h(x.easing, (e) => e),
                decay: x.decay,
              }),
            })
          );
        }
        return M
          ? e
          : (v && (V.setValue(1, !1), j.updateConfig({ output: [S, S] })),
            (V.done = !0),
            (this.hasChanged = !0),
            u({}, e, { [r]: u({}, e[r], { previous: S }) }));
      }, this.animations)),
      this.hasChanged)
    ) {
      (this.configs = Object.values(this.animations)),
        (this.values = {}),
        (this.interpolations = {});
      for (let e in this.animations)
        (this.interpolations[e] = this.animations[e].interpolation),
          (this.values[e] = this.animations[e].interpolation.getValue());
    }
    return this;
  }
  destroy() {
    this.stop(),
      (this.props = {}),
      (this.merged = {}),
      (this.animations = {}),
      (this.interpolations = {}),
      (this.values = {}),
      (this.configs = []),
      (this.local = 0);
  }
}
const T = (e) => {
  const r = d.fun(e),
    n = ((e, r) => {
      const n = t.useRef(!1),
        i = t.useRef(),
        o = d.fun(r),
        a = t.useMemo(() => {
          let e;
          return (
            i.current &&
              (i.current.map((e) => e.destroy()), (i.current = void 0)),
            [
              new Array(1).fill().map((t, n) => {
                const i = new M(),
                  a = o ? p(r, n, i) : r[n];
                return 0 === n && (e = a.ref), i.update(a), e || i.start(), i;
              }),
              e,
            ]
          );
        }, [1]),
        s = a[1];
      (i.current = a[0]),
        t.useImperativeHandle(s, () => ({
          start: () =>
            Promise.all(i.current.map((e) => new Promise((t) => e.start(t)))),
          stop: (e) => i.current.forEach((t) => t.stop(e)),
          get controllers() {
            return i.current;
          },
        }));
      const l = t.useMemo(
        () => (e) =>
          i.current.map((t, r) => {
            t.update(o ? p(e, r, t) : e[r]), s || t.start();
          }),
        [1]
      );
      t.useEffect(() => {
        n.current ? o || l(r) : s || i.current.forEach((e) => e.start());
      }),
        t.useEffect(
          () => ((n.current = !0), () => i.current.forEach((e) => e.destroy())),
          []
        );
      const u = i.current.map((e) => e.getValues());
      return o ? [u, l, (e) => i.current.forEach((t) => t.pause(e))] : u;
    })(0, r ? e : [e]),
    i = n[0];
  return r ? [i[0], n[1], n[2]] : i;
};
class L extends v {
  constructor(e) {
    void 0 === e && (e = {}),
      super(),
      !e.transform || e.transform instanceof g || (e = b.transform(e)),
      (this.payload = e);
  }
}
const F = {
    transparent: 0,
    aliceblue: 4042850303,
    antiquewhite: 4209760255,
    aqua: 16777215,
    aquamarine: 2147472639,
    azure: 4043309055,
    beige: 4126530815,
    bisque: 4293182719,
    black: 255,
    blanchedalmond: 4293643775,
    blue: 65535,
    blueviolet: 2318131967,
    brown: 2771004159,
    burlywood: 3736635391,
    burntsienna: 3934150143,
    cadetblue: 1604231423,
    chartreuse: 2147418367,
    chocolate: 3530104575,
    coral: 4286533887,
    cornflowerblue: 1687547391,
    cornsilk: 4294499583,
    crimson: 3692313855,
    cyan: 16777215,
    darkblue: 35839,
    darkcyan: 9145343,
    darkgoldenrod: 3095792639,
    darkgray: 2846468607,
    darkgreen: 6553855,
    darkgrey: 2846468607,
    darkkhaki: 3182914559,
    darkmagenta: 2332068863,
    darkolivegreen: 1433087999,
    darkorange: 4287365375,
    darkorchid: 2570243327,
    darkred: 2332033279,
    darksalmon: 3918953215,
    darkseagreen: 2411499519,
    darkslateblue: 1211993087,
    darkslategray: 793726975,
    darkslategrey: 793726975,
    darkturquoise: 13554175,
    darkviolet: 2483082239,
    deeppink: 4279538687,
    deepskyblue: 12582911,
    dimgray: 1768516095,
    dimgrey: 1768516095,
    dodgerblue: 512819199,
    firebrick: 2988581631,
    floralwhite: 4294635775,
    forestgreen: 579543807,
    fuchsia: 4278255615,
    gainsboro: 3705462015,
    ghostwhite: 4177068031,
    gold: 4292280575,
    goldenrod: 3668254975,
    gray: 2155905279,
    green: 8388863,
    greenyellow: 2919182335,
    grey: 2155905279,
    honeydew: 4043305215,
    hotpink: 4285117695,
    indianred: 3445382399,
    indigo: 1258324735,
    ivory: 4294963455,
    khaki: 4041641215,
    lavender: 3873897215,
    lavenderblush: 4293981695,
    lawngreen: 2096890111,
    lemonchiffon: 4294626815,
    lightblue: 2916673279,
    lightcoral: 4034953471,
    lightcyan: 3774873599,
    lightgoldenrodyellow: 4210742015,
    lightgray: 3553874943,
    lightgreen: 2431553791,
    lightgrey: 3553874943,
    lightpink: 4290167295,
    lightsalmon: 4288707327,
    lightseagreen: 548580095,
    lightskyblue: 2278488831,
    lightslategray: 2005441023,
    lightslategrey: 2005441023,
    lightsteelblue: 2965692159,
    lightyellow: 4294959359,
    lime: 16711935,
    limegreen: 852308735,
    linen: 4210091775,
    magenta: 4278255615,
    maroon: 2147483903,
    mediumaquamarine: 1724754687,
    mediumblue: 52735,
    mediumorchid: 3126187007,
    mediumpurple: 2473647103,
    mediumseagreen: 1018393087,
    mediumslateblue: 2070474495,
    mediumspringgreen: 16423679,
    mediumturquoise: 1221709055,
    mediumvioletred: 3340076543,
    midnightblue: 421097727,
    mintcream: 4127193855,
    mistyrose: 4293190143,
    moccasin: 4293178879,
    navajowhite: 4292783615,
    navy: 33023,
    oldlace: 4260751103,
    olive: 2155872511,
    olivedrab: 1804477439,
    orange: 4289003775,
    orangered: 4282712319,
    orchid: 3664828159,
    palegoldenrod: 4008225535,
    palegreen: 2566625535,
    paleturquoise: 2951671551,
    palevioletred: 3681588223,
    papayawhip: 4293907967,
    peachpuff: 4292524543,
    peru: 3448061951,
    pink: 4290825215,
    plum: 3718307327,
    powderblue: 2967529215,
    purple: 2147516671,
    rebeccapurple: 1714657791,
    red: 4278190335,
    rosybrown: 3163525119,
    royalblue: 1097458175,
    saddlebrown: 2336560127,
    salmon: 4202722047,
    sandybrown: 4104413439,
    seagreen: 780883967,
    seashell: 4294307583,
    sienna: 2689740287,
    silver: 3233857791,
    skyblue: 2278484991,
    slateblue: 1784335871,
    slategray: 1887473919,
    slategrey: 1887473919,
    snow: 4294638335,
    springgreen: 16744447,
    steelblue: 1182971135,
    tan: 3535047935,
    teal: 8421631,
    thistle: 3636451583,
    tomato: 4284696575,
    turquoise: 1088475391,
    violet: 4001558271,
    wheat: 4125012991,
    white: 4294967295,
    whitesmoke: 4126537215,
    yellow: 4294902015,
    yellowgreen: 2597139199,
  },
  I = "[-+]?\\d*\\.?\\d+";
function D() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const B = new RegExp("rgb" + D(I, I, I)),
  $ = new RegExp("rgba" + D(I, I, I, I)),
  G = new RegExp("hsl" + D(I, "[-+]?\\d*\\.?\\d+%", "[-+]?\\d*\\.?\\d+%")),
  N = new RegExp("hsla" + D(I, "[-+]?\\d*\\.?\\d+%", "[-+]?\\d*\\.?\\d+%", I)),
  W = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  H = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  Q = /^#([0-9a-fA-F]{6})$/,
  Y = /^#([0-9a-fA-F]{8})$/;
function K(e, t, r) {
  return (
    r < 0 && (r += 1),
    r > 1 && (r -= 1),
    r < 1 / 6
      ? e + 6 * (t - e) * r
      : r < 0.5
      ? t
      : r < 2 / 3
      ? e + (t - e) * (2 / 3 - r) * 6
      : e
  );
}
function U(e, t, r) {
  const n = r < 0.5 ? r * (1 + t) : r + t - r * t,
    i = 2 * r - n,
    o = K(i, n, e + 1 / 3),
    a = K(i, n, e),
    s = K(i, n, e - 1 / 3);
  return (
    (Math.round(255 * o) << 24) |
    (Math.round(255 * a) << 16) |
    (Math.round(255 * s) << 8)
  );
}
function X(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function Z(e) {
  return (((parseFloat(e) % 360) + 360) % 360) / 360;
}
function J(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(255 * t);
}
function _(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function ee(e) {
  let t = (function (e) {
    let t;
    return "number" == typeof e
      ? e >>> 0 === e && e >= 0 && e <= 4294967295
        ? e
        : null
      : (t = Q.exec(e))
      ? parseInt(t[1] + "ff", 16) >>> 0
      : F.hasOwnProperty(e)
      ? F[e]
      : (t = B.exec(e))
      ? ((X(t[1]) << 24) | (X(t[2]) << 16) | (X(t[3]) << 8) | 255) >>> 0
      : (t = $.exec(e))
      ? ((X(t[1]) << 24) | (X(t[2]) << 16) | (X(t[3]) << 8) | J(t[4])) >>> 0
      : (t = W.exec(e))
      ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>> 0
      : (t = Y.exec(e))
      ? parseInt(t[1], 16) >>> 0
      : (t = H.exec(e))
      ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4], 16) >>>
        0
      : (t = G.exec(e))
      ? (255 | U(Z(t[1]), _(t[2]), _(t[3]))) >>> 0
      : (t = N.exec(e))
      ? (U(Z(t[1]), _(t[2]), _(t[3])) | J(t[4])) >>> 0
      : null;
  })(e);
  return null === t
    ? e
    : ((t = t || 0),
      `rgba(${(4278190080 & t) >>> 24}, ${(16711680 & t) >>> 16}, ${
        (65280 & t) >>> 8
      }, ${(255 & t) / 255})`);
}
const te = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  re = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
  ne = new RegExp(`(${Object.keys(F).join("|")})`, "g");
let ie = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0,
};
const oe = ["Webkit", "Ms", "Moz", "O"];
function ae(e, t, r) {
  return null == t || "boolean" == typeof t || "" === t
    ? ""
    : r || "number" != typeof t || 0 === t || (ie.hasOwnProperty(e) && ie[e])
    ? ("" + t).trim()
    : t + "px";
}
ie = Object.keys(ie).reduce(
  (e, t) => (
    oe.forEach(
      (r) =>
        (e[((e, t) => e + t.charAt(0).toUpperCase() + t.substring(1))(r, t)] =
          e[t])
    ),
    e
  ),
  ie
);
const se = {};
var le, ue;
(k = (e) => new L(e)),
  (E = (e) => {
    const t = e.output
        .map((e) => e.replace(re, ee))
        .map((e) => e.replace(ne, ee)),
      r = t[0].match(te).map(() => []);
    t.forEach((e) => {
      e.match(te).forEach((e, t) => r[t].push(+e));
    });
    const n = t[0].match(te).map((t, n) => S(u({}, e, { output: r[n] })));
    return (e) => {
      let r = 0;
      return t[0]
        .replace(te, () => n[r++](e))
        .replace(
          /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
          (e, t, r, n, i) =>
            `rgba(${Math.round(t)}, ${Math.round(r)}, ${Math.round(n)}, ${i})`
        );
    };
  }),
  (w = F),
  (b = {
    fn: (e, t) => {
      if (!e.nodeType || void 0 === e.setAttribute) return !1;
      {
        const i = t.style,
          o = t.children,
          a = t.scrollTop,
          s = t.scrollLeft,
          l = c(t, ["style", "children", "scrollTop", "scrollLeft"]),
          u =
            "filter" === e.nodeName ||
            (e.parentNode && "filter" === e.parentNode.nodeName);
        void 0 !== a && (e.scrollTop = a),
          void 0 !== s && (e.scrollLeft = s),
          void 0 !== o && (e.textContent = o);
        for (let t in i)
          if (i.hasOwnProperty(t)) {
            var r = 0 === t.indexOf("--"),
              n = ae(t, i[t], r);
            "float" === t && (t = "cssFloat"),
              r ? e.style.setProperty(t, n) : (e.style[t] = n);
          }
        for (let t in l) {
          const r = u
            ? t
            : se[t] ||
              (se[t] = t.replace(/([A-Z])/g, (e) => "-" + e.toLowerCase()));
          void 0 !== e.getAttribute(r) && e.setAttribute(r, l[t]);
        }
      }
    },
    transform: (e) => e,
  });
const ce = ((le = (e) =>
  t.forwardRef((n, i) => {
    const o = (function () {
        const e = t.useState(!1)[1];
        return t.useCallback(() => e((e) => !e), []);
      })(),
      a = t.useRef(!0),
      s = t.useRef(null),
      l = t.useRef(null),
      h = t.useCallback((e) => {
        const t = s.current;
        (s.current = new C(e, () => {
          let e = !1;
          l.current && (e = b.fn(l.current, s.current.getAnimatedValue())),
            (l.current && !1 !== e) || o();
        })),
          t && t.detach();
      }, []);
    t.useEffect(
      () => () => {
        (a.current = !1), s.current && s.current.detach();
      },
      []
    ),
      t.useImperativeHandle(i, () => ((e) => e.current)(l)),
      h(n);
    const f = c(s.current.getValue(), ["scrollTop", "scrollLeft"]),
      p =
        !d.fun((m = e)) || m.prototype instanceof r.Component
          ? (e) =>
              (l.current = (function (e, t) {
                return t && (d.fun(t) ? t(e) : d.obj(t) && (t.current = e)), e;
              })(e, i))
          : void 0;
    var m;
    return r.createElement(e, u({}, f, { ref: p }));
  })),
void 0 === (ue = !1) && (ue = !0),
(e) =>
  (d.arr(e) ? e : Object.keys(e)).reduce((e, t) => {
    const r = ue ? t[0].toLowerCase() + t.substring(1) : t;
    return (e[r] = le(r)), e;
  }, le))([
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan",
]);
function de(e, t, r) {
  var n, i, o, a, s;
  function l() {
    var u = Date.now() - a;
    u < t && u >= 0
      ? (n = setTimeout(l, t - u))
      : ((n = null), r || ((s = e.apply(o, i)), (o = i = null)));
  }
  null == t && (t = 100);
  var u = function () {
    (o = this), (i = arguments), (a = Date.now());
    var u = r && !n;
    return (
      n || (n = setTimeout(l, t)), u && ((s = e.apply(o, i)), (o = i = null)), s
    );
  };
  return (
    (u.clear = function () {
      n && (clearTimeout(n), (n = null));
    }),
    (u.flush = function () {
      n && ((s = e.apply(o, i)), (o = i = null), clearTimeout(n), (n = null));
    }),
    u
  );
}
de.debounce = de;
var he = de;
function fe(
  { debounce: e, scroll: r, polyfill: n } = { debounce: 0, scroll: !1 }
) {
  const i =
    n || ("undefined" == typeof window ? class {} : window.ResizeObserver);
  if (!i)
    throw new Error(
      "This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills"
    );
  const [o, a] = t.useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
    }),
    s = t.useRef({
      element: null,
      scrollContainers: null,
      resizeObserver: null,
      lastBounds: o,
    }),
    l = e ? ("number" == typeof e ? e : e.scroll) : null,
    u = e ? ("number" == typeof e ? e : e.resize) : null,
    [c, d, h] = t.useMemo(() => {
      const e = () => {
        if (!s.current.element) return;
        const {
            left: e,
            top: t,
            width: r,
            height: n,
            bottom: i,
            right: o,
            x: l,
            y: u,
          } = s.current.element.getBoundingClientRect(),
          c = {
            left: e,
            top: t,
            width: r,
            height: n,
            bottom: i,
            right: o,
            x: l,
            y: u,
          };
        Object.freeze(c),
          me(s.current.lastBounds, c) || a((s.current.lastBounds = c));
      };
      return [e, u ? he.debounce(e, u) : e, l ? he.debounce(e, l) : e];
    }, [a, l, u]);
  function f() {
    s.current.scrollContainers &&
      (s.current.scrollContainers.forEach((e) =>
        e.removeEventListener("scroll", h, !0)
      ),
      (s.current.scrollContainers = null)),
      s.current.resizeObserver &&
        (s.current.resizeObserver.disconnect(),
        (s.current.resizeObserver = null));
  }
  function p() {
    s.current.element &&
      ((s.current.resizeObserver = new i(h)),
      s.current.resizeObserver.observe(s.current.element),
      r &&
        s.current.scrollContainers &&
        s.current.scrollContainers.forEach((e) =>
          e.addEventListener("scroll", h, { capture: !0, passive: !0 })
        ));
  }
  var m, g, y;
  return (
    (m = h),
    (g = Boolean(r)),
    t.useEffect(() => {
      if (g) {
        const e = m;
        return (
          window.addEventListener("scroll", e, { capture: !0, passive: !0 }),
          () => {
            window.removeEventListener("scroll", e, !0);
          }
        );
      }
    }, [m, g]),
    t.useEffect(() => {
      const e = y;
      return (
        window.addEventListener("resize", e),
        () => {
          window.removeEventListener("resize", e);
        }
      );
    }, [(y = d)]),
    t.useEffect(() => {
      f(), p();
    }, [r, h, d]),
    t.useEffect(() => f, []),
    [
      (e) => {
        e &&
          e !== s.current.element &&
          (f(),
          (s.current.element = e),
          (s.current.scrollContainers = (function e(t) {
            const r = [];
            if (!t || t === document.body) return r;
            const {
              overflow: n,
              overflowX: i,
              overflowY: o,
            } = window.getComputedStyle(t);
            return (
              [n, i, o].some((e) => "auto" === e || "scroll" === e) &&
                r.push(t),
              [...r, ...e(t.parentElement)]
            );
          })(e)),
          p());
      },
      o,
      c,
    ]
  );
}
const pe = ["x", "y", "top", "bottom", "left", "right", "width", "height"],
  me = (e, t) => pe.every((r) => e[r] === t[r]);
var ge;
"undefined" != typeof module &&
  Object.getOwnPropertyDescriptor &&
  Object.getOwnPropertyDescriptor(module, "exports").writable &&
  (module.exports = fe);
var ye = t.useLayoutEffect,
  ve = ["mousedown", "touchstart"],
  be = function (e) {
    if ("touchstart" === e)
      return (function () {
        if (void 0 !== ge) return ge;
        var e = !1,
          t = {
            get passive() {
              e = !0;
            },
          },
          r = function () {};
        return (
          window.addEventListener("t", r, t),
          window.removeEventListener("t", r, t),
          (ge = e),
          e
        );
      })()
        ? { passive: !0 }
        : void 0;
  };
function we(e, r) {
  var n = (function (e) {
    var r = t.useRef(e);
    return (
      ye(function () {
        r.current = e;
      }),
      r
    );
  })(r);
  t.useEffect(
    function () {
      if (r) {
        var t = function (t) {
          e.current &&
            n.current &&
            !e.current.contains(t.target) &&
            n.current(t);
        };
        return (
          ve.forEach(function (e) {
            document.addEventListener(e, t, be(e));
          }),
          function () {
            ve.forEach(function (e) {
              document.removeEventListener(e, t, be(e));
            });
          }
        );
      }
    },
    [!r]
  );
}
var Ee = function (e) {
  var n = e.Button,
    i = e.List,
    o = e.options,
    a = t.useState(!1),
    s = a[0],
    l = a[1],
    u = t.useRef(null);
  return (
    we(u, function () {
      return l(!1);
    }),
    r.createElement(
      "div",
      {
        style: { position: "relative" },
        onMouseEnter: function () {
          l(!0);
        },
        onMouseLeave: function () {
          return l(!1);
        },
      },
      r.createElement(n, {
        activated: s,
        onClick: function () {
          return l(!s);
        },
      }),
      r.createElement(
        "div",
        { ref: u, style: { visibility: s ? "visible" : "hidden" } },
        r.createElement(
          i,
          null,
          o.map(function (e, t) {
            return r.createElement(e, { key: t });
          })
        )
      )
    )
  );
};
function ke() {
  var e = l([
    "\n  position: absolute;\n  width: 75%;\n  height: 0.15em;\n  background-color: white;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) rotate(0deg);\n",
  ]);
  return (
    (ke = function () {
      return e;
    }),
    e
  );
}
function xe() {
  var e = l(["\n  height: 2em;\n  width: 2em;\n  position: relative;\n"]);
  return (
    (xe = function () {
      return e;
    }),
    e
  );
}
var Oe = i.div(xe()),
  Ce = i(ce.span)(ke());
function Ve() {
  var e = l([
    "\n  position: absolute;\n  height: 2.5em;\n  width: 2.5em;\n  border-radius: 50%;\n  background-color: ",
    ";\n  top: 50%;\n  transform: translateY(-50%);\n",
  ]);
  return (
    (Ve = function () {
      return e;
    }),
    e
  );
}
function je() {
  var e = l([
    "\n  height: 3.2em;\n  width: 6.8em;\n  border: 0.19em solid ",
    ";\n  border-radius: 2.5em;\n  position: relative;\n  cursor: pointer;\n  ",
    "\n",
  ]);
  return (
    (je = function () {
      return e;
    }),
    e
  );
}
var Pe = i(ce.div)(
    je(),
    function (e) {
      return e.theme.switch.border;
    },
    function (e) {
      return e.styles;
    }
  ),
  Se = i(ce.div)(Ve(), function (e) {
    return e.theme.switch.selector;
  }),
  Ae = n.withTheme(function (e) {
    var t,
      n,
      i,
      o = e.size,
      a = e.activated,
      l = e.animatedProps,
      u = e.theme;
    return r.createElement(
      Pe,
      {
        onClick: e.onClick,
        styles: e.styles,
        style: s(
          s(
            {
              fontSize:
                (null == u || null === (t = u.switch) || void 0 === t
                  ? void 0
                  : t.size) || (void 0 === o ? 16 : o),
            },
            e.style
          ),
          T(
            s(
              {
                backgroundColor: a
                  ? (null == u || null === (n = u.switch) || void 0 === n
                      ? void 0
                      : n.selected) || "green"
                  : (null == u || null === (i = u.switch) || void 0 === i
                      ? void 0
                      : i.unselected) || "red",
              },
              l
            )
          )
        ),
      },
      r.createElement(Se, { style: s({}, T({ left: a ? "4%" : "59%" })) })
    );
  });
(exports.Accordion = function (e) {
  var n = e.open,
    i = e.children,
    o = t.useState(0),
    a = o[0],
    l = o[1],
    u = fe(),
    c = u[0],
    d = u[1].height,
    h = T({ config: { friction: 10 }, height: n ? a : 0 });
  return (
    t.useEffect(
      function () {
        return (
          l(d),
          window.addEventListener("resize", function () {
            return l(d);
          }),
          function () {
            window.removeEventListener("resize", function () {
              return l(d);
            });
          }
        );
      },
      [d]
    ),
    r.createElement(
      ce.div,
      { style: s({ overflow: "hidden" }, h) },
      r.createElement("div", { ref: c }, i)
    )
  );
}),
  (exports.DropdownMenu = Ee),
  (exports.Hamburger = function (e) {
    var t = e.size,
      n = e.activated;
    return r.createElement(
      Oe,
      { style: { fontSize: void 0 === t ? 20 : t }, onClick: e.onClick },
      r.createElement(Ce, {
        style: s(
          {},
          T({
            top: n ? "50%" : "25%",
            transform: n
              ? " translate(-50%, -50%) rotate(135deg)"
              : "translate(-50%, -50%) rotate(0deg)",
          })
        ),
      }),
      r.createElement(Ce, {
        style: s({}, T({ config: { duration: 100 }, opacity: n ? 0 : 1 })),
      }),
      r.createElement(Ce, {
        style: s(
          {},
          T({
            top: n ? "50%" : "75%",
            transform: n
              ? " translate(-50%, -50%) rotate(-135deg)"
              : "translate(-50%, -50%) rotate(0deg)",
          })
        ),
      })
    );
  }),
  (exports.MenuBar = function (e) {
    var t = e.MenuButton,
      n = e.Menu,
      i = e.MenuItemButton;
    return r.createElement(
      e.Bar,
      null,
      e.categories.map(function (e, o) {
        var a = e.category;
        return r.createElement(Ee, {
          key: "" + a + o,
          Button: function (e) {
            return r.createElement(t, { onClick: e.onClick }, a);
          },
          List: n,
          options: e.items.map(function (e) {
            var t = e.label,
              n = e.onClick;
            return function () {
              return r.createElement(i, { activated: !1, onClick: n }, t);
            };
          }),
        });
      })
    );
  }),
  (exports.Popup = function (e) {
    var n = e.open,
      i = e.close,
      o = e.children,
      a = t.useRef(null);
    return (
      we(a, function () {
        return !n && i();
      }),
      r.createElement(
        "div",
        { ref: a, style: { visibility: n ? "visible" : "hidden" } },
        o
      )
    );
  }),
  (exports.SearchBar = function (e) {
    var t = e.placeholder,
      n = e.value,
      i = e.onChange,
      o = e.onFocus;
    return r.createElement(
      e.Container,
      {
        showDeleteIcon: "" !== n,
        onDelete: function () {
          return i("");
        },
      },
      r.createElement(e.Input, {
        type: "text",
        value: n,
        placeholder: void 0 === t ? "Search" : t,
        "aria-label": e.ariaLabel,
        onChange: function (e) {
          return i(e.target.value);
        },
        onKeyDown: function (e) {
          "Enter" === e.key && e.target.blur();
        },
        onFocus: function () {
          o && o();
        },
      })
    );
  }),
  (exports.Sidebar = function (e) {
    var n,
      i = e.orientation,
      o = void 0 === i ? "left" : i,
      a = e.open,
      l = e.onClose,
      u = e.children,
      c = e.closeOnOutsideClick,
      d = void 0 === c || c,
      h = e.disableBodyScroll,
      f = void 0 === h || h,
      p = e.animate,
      m = void 0 === p || p,
      g = e.animatedProps,
      y = void 0 === g ? {} : g,
      v = "left" === o,
      b = t.useRef(),
      w = t.useCallback(function (e) {
        document.body.style.overflow = e ? "hidden" : "unset";
      }, []);
    return (
      t.useEffect(
        function () {
          f && w(a);
        },
        [a]
      ),
      we(b, function () {
        return setTimeout(function () {
          return d && a && l();
        }, 150);
      }),
      r.createElement(
        ce.div,
        {
          ref: b,
          style: s(
            s(
              {},
              T(
                s(
                  {
                    immediate: !m,
                    transform:
                      "translate3d(" +
                      (v ? "-" : "") +
                      (a ? 0 : 100) +
                      "%, 0, 0)",
                    boxShadow:
                      (v ? "" : "-") +
                      "10px 4px 12px -5px rgba(0, 0, 0, 0" +
                      (a ? ".1" : "") +
                      ")",
                  },
                  y
                )
              )
            ),
            {},
            ((n = { position: "fixed", top: 0 }), (n[o] = 0), n)
          ),
        },
        u
      )
    );
  }),
  (exports.Switch = Ae);
//# sourceMappingURL=reactor.js.map
