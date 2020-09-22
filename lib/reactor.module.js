import e, {
  useRef as t,
  useMemo as n,
  useImperativeHandle as r,
  useEffect as i,
  forwardRef as o,
  useCallback as a,
  useState as s,
  useLayoutEffect as l,
} from "react";
import u, { withTheme as c } from "styled-components";
function d(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function h(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function f(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? h(Object(n), !0).forEach(function (t) {
          d(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : h(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
  }
  return e;
}
function p(e, t) {
  return t || (t = e.slice(0)), (e.raw = t), e;
}
function m() {
  return (m =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    }).apply(this, arguments);
}
function g(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = {},
    o = Object.keys(e);
  for (r = 0; r < o.length; r++) t.indexOf((n = o[r])) >= 0 || (i[n] = e[n]);
  return i;
}
const y = {
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
    if (y.str(e) || y.num(e)) return e === t;
    if (
      y.obj(e) &&
      y.obj(t) &&
      Object.keys(e).length + Object.keys(t).length === 0
    )
      return !0;
    let n;
    for (n in e) if (!(n in t)) return !1;
    for (n in t) if (e[n] !== t[n]) return !1;
    return !y.und(n) || e === t;
  },
};
function v(e, t) {
  return y.und(e) || y.nul(e) ? t : e;
}
function b(e) {
  return y.und(e) ? [] : y.arr(e) ? e : [e];
}
function w(e) {
  for (
    var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
    r < t;
    r++
  )
    n[r - 1] = arguments[r];
  return y.fun(e) ? e(...n) : e;
}
function k(e) {
  const t = (function (e) {
    return g(e, [
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
  if (y.und(t)) return m({ to: t }, e);
  const n = Object.keys(e).reduce(
    (n, r) => (y.und(t[r]) ? m({}, n, { [r]: e[r] }) : n),
    {}
  );
  return m({ to: t }, n);
}
class E {
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
class O extends E {
  constructor() {
    super(...arguments),
      (this.payload = []),
      (this.attach = () =>
        this.payload.forEach((e) => e instanceof E && e.addChild(this))),
      (this.detach = () =>
        this.payload.forEach((e) => e instanceof E && e.removeChild(this)));
  }
}
class x extends E {
  constructor() {
    super(...arguments),
      (this.payload = {}),
      (this.attach = () =>
        Object.values(this.payload).forEach(
          (e) => e instanceof E && e.addChild(this)
        )),
      (this.detach = () =>
        Object.values(this.payload).forEach(
          (e) => e instanceof E && e.removeChild(this)
        ));
  }
  getValue(e) {
    void 0 === e && (e = !1);
    const t = {};
    for (const n in this.payload) {
      const r = this.payload[n];
      (!e || r instanceof E) &&
        (t[n] = r instanceof E ? r[e ? "getAnimatedValue" : "getValue"]() : r);
    }
    return t;
  }
  getAnimatedValue() {
    return this.getValue(!0);
  }
}
let C,
  V,
  j,
  P,
  A = (e) =>
    "undefined" != typeof window ? window.requestAnimationFrame(e) : -1,
  S = () => Date.now();
class z extends x {
  constructor(e, t) {
    super(),
      (this.update = void 0),
      (this.payload = e.style ? m({}, e, { style: P(e.style) }) : e),
      (this.update = t),
      this.attach();
  }
}
let q = !1;
const T = new Set(),
  L = () => {
    if (!q) return !1;
    let e = S();
    for (let t of T) {
      let n = !1;
      for (let r = 0; r < t.configs.length; r++) {
        let i,
          o,
          a = t.configs[r];
        for (let t = 0; t < a.animatedValues.length; t++) {
          let r = a.animatedValues[t];
          if (r.done) continue;
          let s = a.fromValues[t],
            l = a.toValues[t],
            u = r.lastPosition,
            c = l instanceof E,
            d = Array.isArray(a.initialVelocity)
              ? a.initialVelocity[t]
              : a.initialVelocity;
          if ((c && (l = l.getValue()), a.immediate))
            r.setValue(l), (r.done = !0);
          else if ("string" != typeof s && "string" != typeof l) {
            if (void 0 !== a.duration)
              (u = s + a.easing((e - r.startTime) / a.duration) * (l - s)),
                (i = e >= r.startTime + a.duration);
            else if (a.decay)
              (u =
                s +
                (d / (1 - 0.998)) *
                  (1 - Math.exp(-(1 - 0.998) * (e - r.startTime)))),
                (i = Math.abs(r.lastPosition - u) < 0.1),
                i && (l = u);
            else {
              (o = void 0 !== r.lastTime ? r.lastTime : e),
                (d =
                  void 0 !== r.lastVelocity
                    ? r.lastVelocity
                    : a.initialVelocity),
                e > o + 64 && (o = e);
              let t = Math.floor(e - o);
              for (let e = 0; e < t; ++e)
                (d +=
                  (((-a.tension * (u - l) + -a.friction * d) / a.mass) * 1) /
                  1e3),
                  (u += (1 * d) / 1e3);
              let n = !(!a.clamp || 0 === a.tension) && (s < l ? u > l : u < l),
                c = Math.abs(d) <= a.precision,
                h = 0 === a.tension || Math.abs(l - u) <= a.precision;
              (i = n || (c && h)), (r.lastVelocity = d), (r.lastTime = e);
            }
            c && !a.toValues[t].done && (i = !1),
              i ? (r.value !== l && (u = l), (r.done = !0)) : (n = !0),
              r.setValue(u),
              (r.lastPosition = u);
          } else r.setValue(l), (r.done = !0);
        }
        t.props.onFrame && (t.values[a.name] = a.interpolation.getValue());
      }
      t.props.onFrame && t.props.onFrame(t.values),
        n || (T.delete(t), t.stop(!0));
    }
    return T.size ? A(L) : (q = !1), q;
  };
function F(e, t, n) {
  if ("function" == typeof e) return e;
  if (Array.isArray(e)) return F({ range: e, output: t, extrapolate: n });
  if (j && "string" == typeof e.output[0]) return j(e);
  const r = e,
    i = r.output,
    o = r.range || [0, 1],
    a = r.extrapolateLeft || r.extrapolate || "extend",
    s = r.extrapolateRight || r.extrapolate || "extend",
    l = r.easing || ((e) => e);
  return (e) => {
    const t = (function (e, t) {
      for (var n = 1; n < t.length - 1 && !(t[n] >= e); ++n);
      return n - 1;
    })(e, o);
    return (function (e, t, n, r, i, o, a, s, l) {
      let u = l ? l(e) : e;
      if (u < t) {
        if ("identity" === a) return u;
        "clamp" === a && (u = t);
      }
      if (u > n) {
        if ("identity" === s) return u;
        "clamp" === s && (u = n);
      }
      return r === i
        ? r
        : t === n
        ? e <= t
          ? r
          : i
        : (-Infinity === t
            ? (u = -u)
            : Infinity === n
            ? (u -= t)
            : (u = (u - t) / (n - t)),
          (u = o(u)),
          -Infinity === r
            ? (u = -u)
            : Infinity === i
            ? (u += r)
            : (u = u * (i - r) + r),
          u);
    })(e, o[t], o[t + 1], i[t], i[t + 1], l, a, s, r.map);
  };
}
class M extends O {
  constructor(e, t, n, r) {
    super(),
      (this.calc = void 0),
      (this.payload =
        e instanceof O && !(e instanceof M)
          ? e.getPayload()
          : Array.isArray(e)
          ? e
          : [e]),
      (this.calc = F(t, n, r));
  }
  getValue() {
    return this.calc(...this.payload.map((e) => e.getValue()));
  }
  updateConfig(e, t, n) {
    this.calc = F(e, t, n);
  }
  interpolate(e, t, n) {
    return new M(this, e, t, n);
  }
}
class I extends E {
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
      (this.setValue = function (e, n) {
        void 0 === n && (n = !0), (t.value = e), n && t.flush();
      }),
      (this.value = e),
      (this.startPosition = e),
      (this.lastPosition = e);
  }
  flush() {
    0 === this.animatedStyles.size &&
      (function e(t, n) {
        "update" in t ? n.add(t) : t.getChildren().forEach((t) => e(t, n));
      })(this, this.animatedStyles),
      this.animatedStyles.forEach((e) => e.update());
  }
  clearStyles() {
    this.animatedStyles.clear();
  }
  getValue() {
    return this.value;
  }
  interpolate(e, t, n) {
    return new M(this, e, t, n);
  }
}
class R extends O {
  constructor(e) {
    super(), (this.payload = e.map((e) => new I(e)));
  }
  setValue(e, t) {
    void 0 === t && (t = !0),
      Array.isArray(e)
        ? e.length === this.payload.length &&
          e.forEach((e, n) => this.payload[n].setValue(e, t))
        : this.payload.forEach((n) => n.setValue(e, t));
  }
  getValue() {
    return this.payload.map((e) => e.getValue());
  }
  interpolate(e, t) {
    return new M(this, e, t);
  }
}
let D = 0;
class $ {
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
      (this.id = D++);
  }
  update(e) {
    if (!e) return this;
    const t = k(e),
      n = t.delay,
      r = void 0 === n ? 0 : n,
      i = t.to,
      o = g(t, ["delay", "to"]);
    if (y.arr(i) || y.fun(i)) this.queue.push(m({}, o, { delay: r, to: i }));
    else if (i) {
      let e = {};
      Object.entries(i).forEach((t) => {
        let n = t[0];
        const i = m({ to: { [n]: t[1] }, delay: w(r, n) }, o);
        e[i.delay] = m({}, e[i.delay], i, {
          to: m({}, e[i.delay] && e[i.delay].to, i.to),
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
              n = void 0 === t ? {} : t,
              r = e.to,
              i = void 0 === r ? {} : r;
            y.obj(n) && (this.merged = m({}, n, this.merged)),
              y.obj(i) && (this.merged = m({}, this.merged, i));
          });
      const t = (this.local = ++this.guid),
        n = (this.localQueue = this.queue);
      (this.queue = []),
        n.forEach((r, i) => {
          let o = r.delay,
            a = g(r, ["delay"]);
          const s = (r) => {
            i === n.length - 1 &&
              t === this.guid &&
              r &&
              ((this.idle = !0),
              this.props.onRest && this.props.onRest(this.merged)),
              e && e();
          };
          let l = y.arr(a.to) || y.fun(a.to);
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
      y.fun(e) && this.listeners.push(e),
        this.props.onStart && this.props.onStart(),
        T.has(this) || T.add(this),
        q || ((q = !0), A(L));
    return this;
  }
  stop(e) {
    return this.listeners.forEach((t) => t(e)), (this.listeners = []), this;
  }
  pause(e) {
    return this.stop(!0), e && T.has(this) && T.delete(this), this;
  }
  runAsync(e, t) {
    var n = this;
    let r = g(e, ["delay"]);
    const i = this.local;
    let o = Promise.resolve(void 0);
    if (y.arr(r.to))
      for (let e = 0; e < r.to.length; e++) {
        const t = e,
          n = m({}, r, k(r.to[t]));
        y.arr(n.config) && (n.config = n.config[t]),
          (o = o.then(() => {
            if (i === this.guid)
              return new Promise((e) => this.diff(n).start(e));
          }));
      }
    else if (y.fun(r.to)) {
      let e,
        t = 0;
      o = o.then(() =>
        r
          .to(
            (n) => {
              const o = m({}, r, k(n));
              if (
                (y.arr(o.config) && (o.config = o.config[t]),
                t++,
                i === this.guid)
              )
                return (e = new Promise((e) => this.diff(o).start(e)));
            },
            function (e) {
              return void 0 === e && (e = !0), n.stop(e);
            }
          )
          .then(() => e)
      );
    }
    o.then(t);
  }
  diff(e) {
    this.props = m({}, this.props, e);
    let t = this.props,
      n = t.from,
      r = void 0 === n ? {} : n,
      i = t.to,
      o = void 0 === i ? {} : i,
      a = t.config,
      s = void 0 === a ? {} : a,
      l = t.attach,
      u = t.reset,
      c = t.immediate;
    if (t.reverse) {
      var d = [o, r];
      (r = d[0]), (o = d[1]);
    }
    (this.merged = m({}, r, this.merged, o)), (this.hasChanged = !1);
    let h = l && l(this);
    if (
      ((this.animations = Object.entries(this.merged).reduce((e, t) => {
        let n = t[0],
          i = t[1],
          o = e[n] || {};
        const a = y.num(i),
          l = y.str(i) && !i.startsWith("#") && !/\d/.test(i) && !V[i],
          d = y.arr(i),
          f = !a && !d && !l;
        let p = y.und(r[n]) ? i : r[n],
          g = a || d || l ? i : 1,
          k = w(s, n);
        h && (g = h.animations[n].parent);
        let E,
          O = o.parent,
          x = o.interpolation,
          C = b(h ? g.getPayload() : g),
          P = i;
        f && (P = j({ range: [0, 1], output: [i, i] })(1));
        let A = x && x.getValue();
        const z = !y.und(O) && o.animatedValues.some((e) => !e.done),
          q = !y.equ(P, A),
          T = !y.equ(P, o.previous),
          L = !y.equ(k, o.config);
        if (u || (T && q) || L) {
          if (a || l) O = x = o.parent || new I(p);
          else if (d) O = x = o.parent || new R(p);
          else if (f) {
            let e = o.interpolation && o.interpolation.calc(o.parent.value);
            (e = void 0 === e || u ? p : e),
              o.parent ? ((O = o.parent), O.setValue(0, !1)) : (O = new I(0));
            const t = { output: [e, i] };
            o.interpolation
              ? ((x = o.interpolation), o.interpolation.updateConfig(t))
              : (x = O.interpolate(t));
          }
          return (
            (C = b(h ? g.getPayload() : g)),
            (E = b(O.getPayload())),
            u && !f && O.setValue(p, !1),
            (this.hasChanged = !0),
            E.forEach((e) => {
              (e.startPosition = e.value),
                (e.lastPosition = e.value),
                (e.lastVelocity = z ? e.lastVelocity : void 0),
                (e.lastTime = z ? e.lastTime : void 0),
                (e.startTime = S()),
                (e.done = !1),
                e.animatedStyles.clear();
            }),
            w(c, n) && O.setValue(f ? g : i, !1),
            m({}, e, {
              [n]: m({}, o, {
                name: n,
                parent: O,
                interpolation: x,
                animatedValues: E,
                toValues: C,
                previous: P,
                config: k,
                fromValues: b(O.getValue()),
                immediate: w(c, n),
                initialVelocity: v(k.velocity, 0),
                clamp: v(k.clamp, !1),
                precision: v(k.precision, 0.01),
                tension: v(k.tension, 170),
                friction: v(k.friction, 26),
                mass: v(k.mass, 1),
                duration: k.duration,
                easing: v(k.easing, (e) => e),
                decay: k.decay,
              }),
            })
          );
        }
        return q
          ? e
          : (f && (O.setValue(1, !1), x.updateConfig({ output: [P, P] })),
            (O.done = !0),
            (this.hasChanged = !0),
            m({}, e, { [n]: m({}, e[n], { previous: P }) }));
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
const B = (e) => {
  const o = y.fun(e),
    a = ((e, o) => {
      const a = t(!1),
        s = t(),
        l = y.fun(o),
        u = n(() => {
          let e;
          return (
            s.current &&
              (s.current.map((e) => e.destroy()), (s.current = void 0)),
            [
              new Array(1).fill().map((t, n) => {
                const r = new $(),
                  i = l ? w(o, n, r) : o[n];
                return 0 === n && (e = i.ref), r.update(i), e || r.start(), r;
              }),
              e,
            ]
          );
        }, [1]),
        c = u[1];
      (s.current = u[0]),
        r(c, () => ({
          start: () =>
            Promise.all(s.current.map((e) => new Promise((t) => e.start(t)))),
          stop: (e) => s.current.forEach((t) => t.stop(e)),
          get controllers() {
            return s.current;
          },
        }));
      const d = n(
        () => (e) =>
          s.current.map((t, n) => {
            t.update(l ? w(e, n, t) : e[n]), c || t.start();
          }),
        [1]
      );
      i(() => {
        a.current ? l || d(o) : c || s.current.forEach((e) => e.start());
      }),
        i(
          () => ((a.current = !0), () => s.current.forEach((e) => e.destroy())),
          []
        );
      const h = s.current.map((e) => e.getValues());
      return l ? [h, d, (e) => s.current.forEach((t) => t.pause(e))] : h;
    })(0, o ? e : [e]),
    s = a[0];
  return o ? [s[0], a[1], a[2]] : s;
};
class G extends x {
  constructor(e) {
    void 0 === e && (e = {}),
      super(),
      !e.transform || e.transform instanceof E || (e = C.transform(e)),
      (this.payload = e);
  }
}
const N = {
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
  W = "[-+]?\\d*\\.?\\d+";
function Q() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const Y = new RegExp("rgb" + Q(W, W, W)),
  H = new RegExp("rgba" + Q(W, W, W, W)),
  K = new RegExp("hsl" + Q(W, "[-+]?\\d*\\.?\\d+%", "[-+]?\\d*\\.?\\d+%")),
  U = new RegExp("hsla" + Q(W, "[-+]?\\d*\\.?\\d+%", "[-+]?\\d*\\.?\\d+%", W)),
  X = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  Z = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  J = /^#([0-9a-fA-F]{6})$/,
  _ = /^#([0-9a-fA-F]{8})$/;
function ee(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + 6 * (t - e) * n
      : n < 0.5
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function te(e, t, n) {
  const r = n < 0.5 ? n * (1 + t) : n + t - n * t,
    i = 2 * n - r,
    o = ee(i, r, e + 1 / 3),
    a = ee(i, r, e),
    s = ee(i, r, e - 1 / 3);
  return (
    (Math.round(255 * o) << 24) |
    (Math.round(255 * a) << 16) |
    (Math.round(255 * s) << 8)
  );
}
function ne(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function re(e) {
  return (((parseFloat(e) % 360) + 360) % 360) / 360;
}
function ie(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(255 * t);
}
function oe(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function ae(e) {
  let t = (function (e) {
    let t;
    return "number" == typeof e
      ? e >>> 0 === e && e >= 0 && e <= 4294967295
        ? e
        : null
      : (t = J.exec(e))
      ? parseInt(t[1] + "ff", 16) >>> 0
      : N.hasOwnProperty(e)
      ? N[e]
      : (t = Y.exec(e))
      ? ((ne(t[1]) << 24) | (ne(t[2]) << 16) | (ne(t[3]) << 8) | 255) >>> 0
      : (t = H.exec(e))
      ? ((ne(t[1]) << 24) | (ne(t[2]) << 16) | (ne(t[3]) << 8) | ie(t[4])) >>> 0
      : (t = X.exec(e))
      ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>> 0
      : (t = _.exec(e))
      ? parseInt(t[1], 16) >>> 0
      : (t = Z.exec(e))
      ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4], 16) >>>
        0
      : (t = K.exec(e))
      ? (255 | te(re(t[1]), oe(t[2]), oe(t[3]))) >>> 0
      : (t = U.exec(e))
      ? (te(re(t[1]), oe(t[2]), oe(t[3])) | ie(t[4])) >>> 0
      : null;
  })(e);
  return null === t
    ? e
    : ((t = t || 0),
      `rgba(${(4278190080 & t) >>> 24}, ${(16711680 & t) >>> 16}, ${
        (65280 & t) >>> 8
      }, ${(255 & t) / 255})`);
}
const se = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  le = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
  ue = new RegExp(`(${Object.keys(N).join("|")})`, "g");
let ce = {
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
const de = ["Webkit", "Ms", "Moz", "O"];
function he(e, t, n) {
  return null == t || "boolean" == typeof t || "" === t
    ? ""
    : n || "number" != typeof t || 0 === t || (ce.hasOwnProperty(e) && ce[e])
    ? ("" + t).trim()
    : t + "px";
}
ce = Object.keys(ce).reduce(
  (e, t) => (
    de.forEach(
      (n) =>
        (e[((e, t) => e + t.charAt(0).toUpperCase() + t.substring(1))(n, t)] =
          e[t])
    ),
    e
  ),
  ce
);
const fe = {};
var pe, me;
(P = (e) => new G(e)),
  (j = (e) => {
    const t = e.output
        .map((e) => e.replace(le, ae))
        .map((e) => e.replace(ue, ae)),
      n = t[0].match(se).map(() => []);
    t.forEach((e) => {
      e.match(se).forEach((e, t) => n[t].push(+e));
    });
    const r = t[0].match(se).map((t, r) => F(m({}, e, { output: n[r] })));
    return (e) => {
      let n = 0;
      return t[0]
        .replace(se, () => r[n++](e))
        .replace(
          /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
          (e, t, n, r, i) =>
            `rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`
        );
    };
  }),
  (V = N),
  (C = {
    fn: (e, t) => {
      if (!e.nodeType || void 0 === e.setAttribute) return !1;
      {
        const i = t.style,
          o = t.children,
          a = t.scrollTop,
          s = t.scrollLeft,
          l = g(t, ["style", "children", "scrollTop", "scrollLeft"]),
          u =
            "filter" === e.nodeName ||
            (e.parentNode && "filter" === e.parentNode.nodeName);
        void 0 !== a && (e.scrollTop = a),
          void 0 !== s && (e.scrollLeft = s),
          void 0 !== o && (e.textContent = o);
        for (let t in i)
          if (i.hasOwnProperty(t)) {
            var n = 0 === t.indexOf("--"),
              r = he(t, i[t], n);
            "float" === t && (t = "cssFloat"),
              n ? e.style.setProperty(t, r) : (e.style[t] = r);
          }
        for (let t in l) {
          const n = u
            ? t
            : fe[t] ||
              (fe[t] = t.replace(/([A-Z])/g, (e) => "-" + e.toLowerCase()));
          void 0 !== e.getAttribute(n) && e.setAttribute(n, l[t]);
        }
      }
    },
    transform: (e) => e,
  });
const ge = ((pe = (n) =>
  o((o, l) => {
    const u = (function () {
        const e = s(!1)[1];
        return a(() => e((e) => !e), []);
      })(),
      c = t(!0),
      d = t(null),
      h = t(null),
      f = a((e) => {
        const t = d.current;
        (d.current = new z(e, () => {
          let e = !1;
          h.current && (e = C.fn(h.current, d.current.getAnimatedValue())),
            (h.current && !1 !== e) || u();
        })),
          t && t.detach();
      }, []);
    i(
      () => () => {
        (c.current = !1), d.current && d.current.detach();
      },
      []
    ),
      r(l, () => ((e) => e.current)(h)),
      f(o);
    const p = g(d.current.getValue(), ["scrollTop", "scrollLeft"]),
      v =
        !y.fun((b = n)) || b.prototype instanceof e.Component
          ? (e) =>
              (h.current = (function (e, t) {
                return t && (y.fun(t) ? t(e) : y.obj(t) && (t.current = e)), e;
              })(e, l))
          : void 0;
    var b;
    return e.createElement(n, m({}, p, { ref: v }));
  })),
void 0 === (me = !1) && (me = !0),
(e) =>
  (y.arr(e) ? e : Object.keys(e)).reduce((e, t) => {
    const n = me ? t[0].toLowerCase() + t.substring(1) : t;
    return (e[n] = pe(n)), e;
  }, pe))([
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
function ye(e, t, n) {
  var r, i, o, a, s;
  function l() {
    var u = Date.now() - a;
    u < t && u >= 0
      ? (r = setTimeout(l, t - u))
      : ((r = null), n || ((s = e.apply(o, i)), (o = i = null)));
  }
  null == t && (t = 100);
  var u = function () {
    (o = this), (i = arguments), (a = Date.now());
    var u = n && !r;
    return (
      r || (r = setTimeout(l, t)), u && ((s = e.apply(o, i)), (o = i = null)), s
    );
  };
  return (
    (u.clear = function () {
      r && (clearTimeout(r), (r = null));
    }),
    (u.flush = function () {
      r && ((s = e.apply(o, i)), (o = i = null), clearTimeout(r), (r = null));
    }),
    u
  );
}
ye.debounce = ye;
var ve = ye;
function be(
  { debounce: e, scroll: r, polyfill: o } = { debounce: 0, scroll: !1 }
) {
  const a =
    o || ("undefined" == typeof window ? class {} : window.ResizeObserver);
  if (!a)
    throw new Error(
      "This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills"
    );
  const [l, u] = s({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
    }),
    c = t({
      element: null,
      scrollContainers: null,
      resizeObserver: null,
      lastBounds: l,
    }),
    d = e ? ("number" == typeof e ? e : e.scroll) : null,
    h = e ? ("number" == typeof e ? e : e.resize) : null,
    [f, p, m] = n(() => {
      const e = () => {
        if (!c.current.element) return;
        const {
            left: e,
            top: t,
            width: n,
            height: r,
            bottom: i,
            right: o,
            x: a,
            y: s,
          } = c.current.element.getBoundingClientRect(),
          l = {
            left: e,
            top: t,
            width: n,
            height: r,
            bottom: i,
            right: o,
            x: a,
            y: s,
          };
        Object.freeze(l),
          ke(c.current.lastBounds, l) || u((c.current.lastBounds = l));
      };
      return [e, h ? ve.debounce(e, h) : e, d ? ve.debounce(e, d) : e];
    }, [u, d, h]);
  function g() {
    c.current.scrollContainers &&
      (c.current.scrollContainers.forEach((e) =>
        e.removeEventListener("scroll", m, !0)
      ),
      (c.current.scrollContainers = null)),
      c.current.resizeObserver &&
        (c.current.resizeObserver.disconnect(),
        (c.current.resizeObserver = null));
  }
  function y() {
    c.current.element &&
      ((c.current.resizeObserver = new a(m)),
      c.current.resizeObserver.observe(c.current.element),
      r &&
        c.current.scrollContainers &&
        c.current.scrollContainers.forEach((e) =>
          e.addEventListener("scroll", m, { capture: !0, passive: !0 })
        ));
  }
  var v, b, w;
  return (
    (v = m),
    (b = Boolean(r)),
    i(() => {
      if (b) {
        const e = v;
        return (
          window.addEventListener("scroll", e, { capture: !0, passive: !0 }),
          () => {
            window.removeEventListener("scroll", e, !0);
          }
        );
      }
    }, [v, b]),
    i(() => {
      const e = w;
      return (
        window.addEventListener("resize", e),
        () => {
          window.removeEventListener("resize", e);
        }
      );
    }, [(w = p)]),
    i(() => {
      g(), y();
    }, [r, m, p]),
    i(() => g, []),
    [
      (e) => {
        e &&
          e !== c.current.element &&
          (g(),
          (c.current.element = e),
          (c.current.scrollContainers = (function e(t) {
            const n = [];
            if (!t || t === document.body) return n;
            const {
              overflow: r,
              overflowX: i,
              overflowY: o,
            } = window.getComputedStyle(t);
            return (
              [r, i, o].some((e) => "auto" === e || "scroll" === e) &&
                n.push(t),
              [...n, ...e(t.parentElement)]
            );
          })(e)),
          y());
      },
      l,
      f,
    ]
  );
}
const we = ["x", "y", "top", "bottom", "left", "right", "width", "height"],
  ke = (e, t) => we.every((n) => e[n] === t[n]);
"undefined" != typeof module &&
  Object.getOwnPropertyDescriptor &&
  Object.getOwnPropertyDescriptor(module, "exports").writable &&
  (module.exports = be);
var Ee,
  Oe = function (t) {
    var n = t.open,
      r = t.children,
      o = s(0),
      a = o[0],
      l = o[1],
      u = be(),
      c = u[0],
      d = u[1].height,
      h = B({ config: { friction: 10 }, height: n ? a : 0 });
    return (
      i(
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
      e.createElement(
        ge.div,
        { style: f({ overflow: "hidden" }, h) },
        e.createElement("div", { ref: c }, r)
      )
    );
  },
  xe = l,
  Ce = ["mousedown", "touchstart"],
  Ve = function (e) {
    if ("touchstart" === e)
      return (function () {
        if (void 0 !== Ee) return Ee;
        var e = !1,
          t = {
            get passive() {
              e = !0;
            },
          },
          n = function () {};
        return (
          window.addEventListener("t", n, t),
          window.removeEventListener("t", n, t),
          (Ee = e),
          e
        );
      })()
        ? { passive: !0 }
        : void 0;
  };
function je(e, n) {
  var r = (function (e) {
    var n = t(e);
    return (
      xe(function () {
        n.current = e;
      }),
      n
    );
  })(n);
  i(
    function () {
      if (n) {
        var t = function (t) {
          e.current &&
            r.current &&
            !e.current.contains(t.target) &&
            r.current(t);
        };
        return (
          Ce.forEach(function (e) {
            document.addEventListener(e, t, Ve(e));
          }),
          function () {
            Ce.forEach(function (e) {
              document.removeEventListener(e, t, Ve(e));
            });
          }
        );
      }
    },
    [!n]
  );
}
var Pe = function (n) {
  var r = n.Button,
    i = n.List,
    o = n.options,
    a = s(!1),
    l = a[0],
    u = a[1],
    c = t(null);
  return (
    je(c, function () {
      return u(!1);
    }),
    e.createElement(
      "div",
      {
        style: { position: "relative" },
        onMouseEnter: function () {
          u(!0);
        },
        onMouseLeave: function () {
          return u(!1);
        },
      },
      e.createElement(r, {
        activated: l,
        onClick: function () {
          return u(!l);
        },
      }),
      e.createElement(
        "div",
        { ref: c, style: { visibility: l ? "visible" : "hidden" } },
        e.createElement(
          i,
          null,
          o.map(function (t, n) {
            return e.createElement(t, { key: n });
          })
        )
      )
    )
  );
};
function Ae() {
  var e = p([
    "\n  position: absolute;\n  width: 75%;\n  height: 0.15em;\n  background-color: white;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) rotate(0deg);\n",
  ]);
  return (
    (Ae = function () {
      return e;
    }),
    e
  );
}
function Se() {
  var e = p(["\n  height: 2em;\n  width: 2em;\n  position: relative;\n"]);
  return (
    (Se = function () {
      return e;
    }),
    e
  );
}
var ze = function (t) {
    var n = t.size,
      r = t.activated;
    return e.createElement(
      qe,
      { style: { fontSize: void 0 === n ? 20 : n }, onClick: t.onClick },
      e.createElement(Te, {
        style: f(
          {},
          B({
            top: r ? "50%" : "25%",
            transform: r
              ? " translate(-50%, -50%) rotate(135deg)"
              : "translate(-50%, -50%) rotate(0deg)",
          })
        ),
      }),
      e.createElement(Te, {
        style: f({}, B({ config: { duration: 100 }, opacity: r ? 0 : 1 })),
      }),
      e.createElement(Te, {
        style: f(
          {},
          B({
            top: r ? "50%" : "75%",
            transform: r
              ? " translate(-50%, -50%) rotate(-135deg)"
              : "translate(-50%, -50%) rotate(0deg)",
          })
        ),
      })
    );
  },
  qe = u.div(Se()),
  Te = u(ge.span)(Ae()),
  Le = function (t) {
    var n = t.MenuButton,
      r = t.Menu,
      i = t.MenuItemButton;
    return e.createElement(
      t.Bar,
      null,
      t.categories.map(function (t, o) {
        var a = t.category;
        return e.createElement(Pe, {
          key: "" + a + o,
          Button: function (t) {
            return e.createElement(n, { onClick: t.onClick }, a);
          },
          List: r,
          options: t.items.map(function (t) {
            var n = t.label,
              r = t.onClick;
            return function () {
              return e.createElement(i, { activated: !1, onClick: r }, n);
            };
          }),
        });
      })
    );
  },
  Fe = function (n) {
    var r = n.open,
      i = n.close,
      o = n.children,
      a = t(null);
    return (
      je(a, function () {
        return !r && i();
      }),
      e.createElement(
        "div",
        { ref: a, style: { visibility: r ? "visible" : "hidden" } },
        o
      )
    );
  },
  Me = function (t) {
    var n = t.placeholder,
      r = t.value,
      i = t.onChange,
      o = t.onFocus;
    return e.createElement(
      t.Container,
      {
        showDeleteIcon: "" !== r,
        onDelete: function () {
          return i("");
        },
      },
      e.createElement(t.Input, {
        type: "text",
        value: r,
        placeholder: void 0 === n ? "Search" : n,
        "aria-label": t.ariaLabel,
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
  },
  Ie = function (n) {
    var r,
      o = n.orientation,
      s = void 0 === o ? "left" : o,
      l = n.open,
      u = n.onClose,
      c = n.children,
      d = n.closeOnOutsideClick,
      h = void 0 === d || d,
      p = n.disableBodyScroll,
      m = void 0 === p || p,
      g = n.animate,
      y = void 0 === g || g,
      v = n.animatedProps,
      b = void 0 === v ? {} : v,
      w = "left" === s,
      k = t(),
      E = a(function (e) {
        document.body.style.overflow = e ? "hidden" : "unset";
      }, []);
    return (
      i(
        function () {
          m && E(l);
        },
        [l]
      ),
      je(k, function () {
        return setTimeout(function () {
          return h && l && u();
        }, 150);
      }),
      e.createElement(
        ge.div,
        {
          ref: k,
          style: f(
            f(
              {},
              B(
                f(
                  {
                    immediate: !y,
                    transform:
                      "translate3d(" +
                      (w ? "-" : "") +
                      (l ? 0 : 100) +
                      "%, 0, 0)",
                    boxShadow:
                      (w ? "" : "-") +
                      "10px 4px 12px -5px rgba(0, 0, 0, 0" +
                      (l ? ".1" : "") +
                      ")",
                  },
                  b
                )
              )
            ),
            {},
            ((r = { position: "fixed", top: 0 }), (r[s] = 0), r)
          ),
        },
        c
      )
    );
  };
function Re() {
  var e = p([
    "\n  position: absolute;\n  height: 2.5em;\n  width: 2.5em;\n  border-radius: 50%;\n  background-color: ",
    ";\n  top: 50%;\n  transform: translateY(-50%);\n",
  ]);
  return (
    (Re = function () {
      return e;
    }),
    e
  );
}
function De() {
  var e = p([
    "\n  height: 3.2em;\n  width: 6.8em;\n  border: 0.19em solid ",
    ";\n  border-radius: 2.5em;\n  position: relative;\n  cursor: pointer;\n  ",
    "\n",
  ]);
  return (
    (De = function () {
      return e;
    }),
    e
  );
}
var $e = u(ge.div)(
    De(),
    function (e) {
      return e.theme.switch.border;
    },
    function (e) {
      return e.styles;
    }
  ),
  Be = u(ge.div)(Re(), function (e) {
    return e.theme.switch.selector;
  }),
  Ge = c(function (t) {
    var n,
      r,
      i,
      o = t.size,
      a = t.activated,
      s = t.animatedProps,
      l = t.theme;
    return e.createElement(
      $e,
      {
        onClick: t.onClick,
        styles: t.styles,
        style: f(
          f(
            {
              fontSize:
                (null == l || null === (n = l.switch) || void 0 === n
                  ? void 0
                  : n.size) || (void 0 === o ? 16 : o),
            },
            t.style
          ),
          B(
            f(
              {
                backgroundColor: a
                  ? (null == l || null === (r = l.switch) || void 0 === r
                      ? void 0
                      : r.selected) || "green"
                  : (null == l || null === (i = l.switch) || void 0 === i
                      ? void 0
                      : i.unselected) || "red",
              },
              s
            )
          )
        ),
      },
      e.createElement(Be, { style: f({}, B({ left: a ? "4%" : "59%" })) })
    );
  });
export {
  Oe as Accordion,
  Pe as DropdownMenu,
  ze as Hamburger,
  Le as MenuBar,
  Fe as Popup,
  Me as SearchBar,
  Ie as Sidebar,
  Ge as Switch,
};
//# sourceMappingURL=reactor.module.js.map
