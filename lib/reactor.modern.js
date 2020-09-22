import e, {
  useRef as t,
  useMemo as r,
  useImperativeHandle as n,
  useEffect as i,
  forwardRef as o,
  useCallback as a,
  useState as s,
  useLayoutEffect as l,
} from "react";
import u, { withTheme as c } from "styled-components";
function d(e, t, r) {
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
function h(e, t) {
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
function p(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? h(Object(r), !0).forEach(function (t) {
          d(e, t, r[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
      : h(Object(r)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
        });
  }
  return e;
}
function f() {
  return (f =
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
function m(e, t) {
  if (null == e) return {};
  var r,
    n,
    i = {},
    o = Object.keys(e);
  for (n = 0; n < o.length; n++) t.indexOf((r = o[n])) >= 0 || (i[r] = e[r]);
  return i;
}
const g = {
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
    if (g.str(e) || g.num(e)) return e === t;
    if (
      g.obj(e) &&
      g.obj(t) &&
      Object.keys(e).length + Object.keys(t).length === 0
    )
      return !0;
    let r;
    for (r in e) if (!(r in t)) return !1;
    for (r in t) if (e[r] !== t[r]) return !1;
    return !g.und(r) || e === t;
  },
};
function y(e, t) {
  return g.und(e) || g.nul(e) ? t : e;
}
function v(e) {
  return g.und(e) ? [] : g.arr(e) ? e : [e];
}
function b(e) {
  for (
    var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
    n < t;
    n++
  )
    r[n - 1] = arguments[n];
  return g.fun(e) ? e(...r) : e;
}
function w(e) {
  const t = (function (e) {
    return m(e, [
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
  if (g.und(t)) return f({ to: t }, e);
  const r = Object.keys(e).reduce(
    (r, n) => (g.und(t[n]) ? f({}, r, { [n]: e[n] }) : r),
    {}
  );
  return f({ to: t }, r);
}
class k {
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
class E extends k {
  constructor() {
    super(...arguments),
      (this.payload = []),
      (this.attach = () =>
        this.payload.forEach((e) => e instanceof k && e.addChild(this))),
      (this.detach = () =>
        this.payload.forEach((e) => e instanceof k && e.removeChild(this)));
  }
}
class O extends k {
  constructor() {
    super(...arguments),
      (this.payload = {}),
      (this.attach = () =>
        Object.values(this.payload).forEach(
          (e) => e instanceof k && e.addChild(this)
        )),
      (this.detach = () =>
        Object.values(this.payload).forEach(
          (e) => e instanceof k && e.removeChild(this)
        ));
  }
  getValue(e) {
    void 0 === e && (e = !1);
    const t = {};
    for (const r in this.payload) {
      const n = this.payload[r];
      (!e || n instanceof k) &&
        (t[r] = n instanceof k ? n[e ? "getAnimatedValue" : "getValue"]() : n);
    }
    return t;
  }
  getAnimatedValue() {
    return this.getValue(!0);
  }
}
let x,
  C,
  V,
  j,
  P = (e) =>
    "undefined" != typeof window ? window.requestAnimationFrame(e) : -1,
  A = () => Date.now();
class S extends O {
  constructor(e, t) {
    super(),
      (this.update = void 0),
      (this.payload = e.style ? f({}, e, { style: j(e.style) }) : e),
      (this.update = t),
      this.attach();
  }
}
let z = !1;
const q = new Set(),
  T = () => {
    if (!z) return !1;
    let e = A();
    for (let t of q) {
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
            c = l instanceof k,
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
        r || (q.delete(t), t.stop(!0));
    }
    return q.size ? P(T) : (z = !1), z;
  };
function L(e, t, r) {
  if ("function" == typeof e) return e;
  if (Array.isArray(e)) return L({ range: e, output: t, extrapolate: r });
  if (V && "string" == typeof e.output[0]) return V(e);
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
class F extends E {
  constructor(e, t, r, n) {
    super(),
      (this.calc = void 0),
      (this.payload =
        e instanceof E && !(e instanceof F)
          ? e.getPayload()
          : Array.isArray(e)
          ? e
          : [e]),
      (this.calc = L(t, r, n));
  }
  getValue() {
    return this.calc(...this.payload.map((e) => e.getValue()));
  }
  updateConfig(e, t, r) {
    this.calc = L(e, t, r);
  }
  interpolate(e, t, r) {
    return new F(this, e, t, r);
  }
}
class $ extends k {
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
    return new F(this, e, t, r);
  }
}
class M extends E {
  constructor(e) {
    super(), (this.payload = e.map((e) => new $(e)));
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
    return new F(this, e, t);
  }
}
let I = 0;
class R {
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
      (this.id = I++);
  }
  update(e) {
    if (!e) return this;
    const t = w(e),
      r = t.delay,
      n = void 0 === r ? 0 : r,
      i = t.to,
      o = m(t, ["delay", "to"]);
    if (g.arr(i) || g.fun(i)) this.queue.push(f({}, o, { delay: n, to: i }));
    else if (i) {
      let e = {};
      Object.entries(i).forEach((t) => {
        let r = t[0];
        const i = f({ to: { [r]: t[1] }, delay: b(n, r) }, o);
        e[i.delay] = f({}, e[i.delay], i, {
          to: f({}, e[i.delay] && e[i.delay].to, i.to),
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
            g.obj(r) && (this.merged = f({}, r, this.merged)),
              g.obj(i) && (this.merged = f({}, this.merged, i));
          });
      const t = (this.local = ++this.guid),
        r = (this.localQueue = this.queue);
      (this.queue = []),
        r.forEach((n, i) => {
          let o = n.delay,
            a = m(n, ["delay"]);
          const s = (n) => {
            i === r.length - 1 &&
              t === this.guid &&
              n &&
              ((this.idle = !0),
              this.props.onRest && this.props.onRest(this.merged)),
              e && e();
          };
          let l = g.arr(a.to) || g.fun(a.to);
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
      g.fun(e) && this.listeners.push(e),
        this.props.onStart && this.props.onStart(),
        q.has(this) || q.add(this),
        z || ((z = !0), P(T));
    return this;
  }
  stop(e) {
    return this.listeners.forEach((t) => t(e)), (this.listeners = []), this;
  }
  pause(e) {
    return this.stop(!0), e && q.has(this) && q.delete(this), this;
  }
  runAsync(e, t) {
    var r = this;
    let n = m(e, ["delay"]);
    const i = this.local;
    let o = Promise.resolve(void 0);
    if (g.arr(n.to))
      for (let e = 0; e < n.to.length; e++) {
        const t = e,
          r = f({}, n, w(n.to[t]));
        g.arr(r.config) && (r.config = r.config[t]),
          (o = o.then(() => {
            if (i === this.guid)
              return new Promise((e) => this.diff(r).start(e));
          }));
      }
    else if (g.fun(n.to)) {
      let e,
        t = 0;
      o = o.then(() =>
        n
          .to(
            (r) => {
              const o = f({}, n, w(r));
              if (
                (g.arr(o.config) && (o.config = o.config[t]),
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
    this.props = f({}, this.props, e);
    let t = this.props,
      r = t.from,
      n = void 0 === r ? {} : r,
      i = t.to,
      o = void 0 === i ? {} : i,
      a = t.config,
      s = void 0 === a ? {} : a,
      l = t.attach,
      u = t.reset,
      c = t.immediate;
    if (t.reverse) {
      var d = [o, n];
      (n = d[0]), (o = d[1]);
    }
    (this.merged = f({}, n, this.merged, o)), (this.hasChanged = !1);
    let h = l && l(this);
    if (
      ((this.animations = Object.entries(this.merged).reduce((e, t) => {
        let r = t[0],
          i = t[1],
          o = e[r] || {};
        const a = g.num(i),
          l = g.str(i) && !i.startsWith("#") && !/\d/.test(i) && !C[i],
          d = g.arr(i),
          p = !a && !d && !l;
        let m = g.und(n[r]) ? i : n[r],
          w = a || d || l ? i : 1,
          k = b(s, r);
        h && (w = h.animations[r].parent);
        let E,
          O = o.parent,
          x = o.interpolation,
          j = v(h ? w.getPayload() : w),
          P = i;
        p && (P = V({ range: [0, 1], output: [i, i] })(1));
        let S = x && x.getValue();
        const z = !g.und(O) && o.animatedValues.some((e) => !e.done),
          q = !g.equ(P, S),
          T = !g.equ(P, o.previous),
          L = !g.equ(k, o.config);
        if (u || (T && q) || L) {
          if (a || l) O = x = o.parent || new $(m);
          else if (d) O = x = o.parent || new M(m);
          else if (p) {
            let e = o.interpolation && o.interpolation.calc(o.parent.value);
            (e = void 0 === e || u ? m : e),
              o.parent ? ((O = o.parent), O.setValue(0, !1)) : (O = new $(0));
            const t = { output: [e, i] };
            o.interpolation
              ? ((x = o.interpolation), o.interpolation.updateConfig(t))
              : (x = O.interpolate(t));
          }
          return (
            (j = v(h ? w.getPayload() : w)),
            (E = v(O.getPayload())),
            u && !p && O.setValue(m, !1),
            (this.hasChanged = !0),
            E.forEach((e) => {
              (e.startPosition = e.value),
                (e.lastPosition = e.value),
                (e.lastVelocity = z ? e.lastVelocity : void 0),
                (e.lastTime = z ? e.lastTime : void 0),
                (e.startTime = A()),
                (e.done = !1),
                e.animatedStyles.clear();
            }),
            b(c, r) && O.setValue(p ? w : i, !1),
            f({}, e, {
              [r]: f({}, o, {
                name: r,
                parent: O,
                interpolation: x,
                animatedValues: E,
                toValues: j,
                previous: P,
                config: k,
                fromValues: v(O.getValue()),
                immediate: b(c, r),
                initialVelocity: y(k.velocity, 0),
                clamp: y(k.clamp, !1),
                precision: y(k.precision, 0.01),
                tension: y(k.tension, 170),
                friction: y(k.friction, 26),
                mass: y(k.mass, 1),
                duration: k.duration,
                easing: y(k.easing, (e) => e),
                decay: k.decay,
              }),
            })
          );
        }
        return q
          ? e
          : (p && (O.setValue(1, !1), x.updateConfig({ output: [P, P] })),
            (O.done = !0),
            (this.hasChanged = !0),
            f({}, e, { [r]: f({}, e[r], { previous: P }) }));
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
const D = (e) => {
  const o = g.fun(e),
    a = ((e, o) => {
      const a = t(!1),
        s = t(),
        l = g.fun(o),
        u = r(() => {
          let e;
          return (
            s.current &&
              (s.current.map((e) => e.destroy()), (s.current = void 0)),
            [
              new Array(1).fill().map((t, r) => {
                const n = new R(),
                  i = l ? b(o, r, n) : o[r];
                return 0 === r && (e = i.ref), n.update(i), e || n.start(), n;
              }),
              e,
            ]
          );
        }, [1]),
        c = u[1];
      (s.current = u[0]),
        n(c, () => ({
          start: () =>
            Promise.all(s.current.map((e) => new Promise((t) => e.start(t)))),
          stop: (e) => s.current.forEach((t) => t.stop(e)),
          get controllers() {
            return s.current;
          },
        }));
      const d = r(
        () => (e) =>
          s.current.map((t, r) => {
            t.update(l ? b(e, r, t) : e[r]), c || t.start();
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
class B extends O {
  constructor(e) {
    void 0 === e && (e = {}),
      super(),
      !e.transform || e.transform instanceof k || (e = x.transform(e)),
      (this.payload = e);
  }
}
const G = {
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
  N = "[-+]?\\d*\\.?\\d+";
function W() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const Q = new RegExp("rgb" + W(N, N, N)),
  Y = new RegExp("rgba" + W(N, N, N, N)),
  H = new RegExp("hsl" + W(N, "[-+]?\\d*\\.?\\d+%", "[-+]?\\d*\\.?\\d+%")),
  K = new RegExp("hsla" + W(N, "[-+]?\\d*\\.?\\d+%", "[-+]?\\d*\\.?\\d+%", N)),
  U = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  X = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  Z = /^#([0-9a-fA-F]{6})$/,
  J = /^#([0-9a-fA-F]{8})$/;
function _(e, t, r) {
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
function ee(e, t, r) {
  const n = r < 0.5 ? r * (1 + t) : r + t - r * t,
    i = 2 * r - n,
    o = _(i, n, e + 1 / 3),
    a = _(i, n, e),
    s = _(i, n, e - 1 / 3);
  return (
    (Math.round(255 * o) << 24) |
    (Math.round(255 * a) << 16) |
    (Math.round(255 * s) << 8)
  );
}
function te(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function re(e) {
  return (((parseFloat(e) % 360) + 360) % 360) / 360;
}
function ne(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(255 * t);
}
function ie(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function oe(e) {
  let t = (function (e) {
    let t;
    return "number" == typeof e
      ? e >>> 0 === e && e >= 0 && e <= 4294967295
        ? e
        : null
      : (t = Z.exec(e))
      ? parseInt(t[1] + "ff", 16) >>> 0
      : G.hasOwnProperty(e)
      ? G[e]
      : (t = Q.exec(e))
      ? ((te(t[1]) << 24) | (te(t[2]) << 16) | (te(t[3]) << 8) | 255) >>> 0
      : (t = Y.exec(e))
      ? ((te(t[1]) << 24) | (te(t[2]) << 16) | (te(t[3]) << 8) | ne(t[4])) >>> 0
      : (t = U.exec(e))
      ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>> 0
      : (t = J.exec(e))
      ? parseInt(t[1], 16) >>> 0
      : (t = X.exec(e))
      ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4], 16) >>>
        0
      : (t = H.exec(e))
      ? (255 | ee(re(t[1]), ie(t[2]), ie(t[3]))) >>> 0
      : (t = K.exec(e))
      ? (ee(re(t[1]), ie(t[2]), ie(t[3])) | ne(t[4])) >>> 0
      : null;
  })(e);
  return null === t
    ? e
    : ((t = t || 0),
      `rgba(${(4278190080 & t) >>> 24}, ${(16711680 & t) >>> 16}, ${
        (65280 & t) >>> 8
      }, ${(255 & t) / 255})`);
}
const ae = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  se = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
  le = new RegExp(`(${Object.keys(G).join("|")})`, "g");
let ue = {
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
const ce = ["Webkit", "Ms", "Moz", "O"];
function de(e, t, r) {
  return null == t || "boolean" == typeof t || "" === t
    ? ""
    : r || "number" != typeof t || 0 === t || (ue.hasOwnProperty(e) && ue[e])
    ? ("" + t).trim()
    : t + "px";
}
ue = Object.keys(ue).reduce(
  (e, t) => (
    ce.forEach(
      (r) =>
        (e[((e, t) => e + t.charAt(0).toUpperCase() + t.substring(1))(r, t)] =
          e[t])
    ),
    e
  ),
  ue
);
const he = {};
var pe, fe;
(j = (e) => new B(e)),
  (V = (e) => {
    const t = e.output
        .map((e) => e.replace(se, oe))
        .map((e) => e.replace(le, oe)),
      r = t[0].match(ae).map(() => []);
    t.forEach((e) => {
      e.match(ae).forEach((e, t) => r[t].push(+e));
    });
    const n = t[0].match(ae).map((t, n) => L(f({}, e, { output: r[n] })));
    return (e) => {
      let r = 0;
      return t[0]
        .replace(ae, () => n[r++](e))
        .replace(
          /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
          (e, t, r, n, i) =>
            `rgba(${Math.round(t)}, ${Math.round(r)}, ${Math.round(n)}, ${i})`
        );
    };
  }),
  (C = G),
  (x = {
    fn: (e, t) => {
      if (!e.nodeType || void 0 === e.setAttribute) return !1;
      {
        const i = t.style,
          o = t.children,
          a = t.scrollTop,
          s = t.scrollLeft,
          l = m(t, ["style", "children", "scrollTop", "scrollLeft"]),
          u =
            "filter" === e.nodeName ||
            (e.parentNode && "filter" === e.parentNode.nodeName);
        void 0 !== a && (e.scrollTop = a),
          void 0 !== s && (e.scrollLeft = s),
          void 0 !== o && (e.textContent = o);
        for (let t in i)
          if (i.hasOwnProperty(t)) {
            var r = 0 === t.indexOf("--"),
              n = de(t, i[t], r);
            "float" === t && (t = "cssFloat"),
              r ? e.style.setProperty(t, n) : (e.style[t] = n);
          }
        for (let t in l) {
          const r = u
            ? t
            : he[t] ||
              (he[t] = t.replace(/([A-Z])/g, (e) => "-" + e.toLowerCase()));
          void 0 !== e.getAttribute(r) && e.setAttribute(r, l[t]);
        }
      }
    },
    transform: (e) => e,
  });
const me = ((pe = (r) =>
  o((o, l) => {
    const u = (function () {
        const e = s(!1)[1];
        return a(() => e((e) => !e), []);
      })(),
      c = t(!0),
      d = t(null),
      h = t(null),
      p = a((e) => {
        const t = d.current;
        (d.current = new S(e, () => {
          let e = !1;
          h.current && (e = x.fn(h.current, d.current.getAnimatedValue())),
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
      n(l, () => ((e) => e.current)(h)),
      p(o);
    const y = m(d.current.getValue(), ["scrollTop", "scrollLeft"]),
      v =
        !g.fun((b = r)) || b.prototype instanceof e.Component
          ? (e) =>
              (h.current = (function (e, t) {
                return t && (g.fun(t) ? t(e) : g.obj(t) && (t.current = e)), e;
              })(e, l))
          : void 0;
    var b;
    return e.createElement(r, f({}, y, { ref: v }));
  })),
void 0 === (fe = !1) && (fe = !0),
(e) =>
  (g.arr(e) ? e : Object.keys(e)).reduce((e, t) => {
    const r = fe ? t[0].toLowerCase() + t.substring(1) : t;
    return (e[r] = pe(r)), e;
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
function ge(e, t, r) {
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
ge.debounce = ge;
var ye = ge;
function ve(
  { debounce: e, scroll: n, polyfill: o } = { debounce: 0, scroll: !1 }
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
    [p, f, m] = r(() => {
      const e = () => {
        if (!c.current.element) return;
        const {
            left: e,
            top: t,
            width: r,
            height: n,
            bottom: i,
            right: o,
            x: a,
            y: s,
          } = c.current.element.getBoundingClientRect(),
          l = {
            left: e,
            top: t,
            width: r,
            height: n,
            bottom: i,
            right: o,
            x: a,
            y: s,
          };
        Object.freeze(l),
          we(c.current.lastBounds, l) || u((c.current.lastBounds = l));
      };
      return [e, h ? ye.debounce(e, h) : e, d ? ye.debounce(e, d) : e];
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
      n &&
        c.current.scrollContainers &&
        c.current.scrollContainers.forEach((e) =>
          e.addEventListener("scroll", m, { capture: !0, passive: !0 })
        ));
  }
  var v, b, w;
  return (
    (v = m),
    (b = Boolean(n)),
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
    }, [(w = f)]),
    i(() => {
      g(), y();
    }, [n, m, f]),
    i(() => g, []),
    [
      (e) => {
        e &&
          e !== c.current.element &&
          (g(),
          (c.current.element = e),
          (c.current.scrollContainers = (function e(t) {
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
          y());
      },
      l,
      p,
    ]
  );
}
const be = ["x", "y", "top", "bottom", "left", "right", "width", "height"],
  we = (e, t) => be.every((r) => e[r] === t[r]);
"undefined" != typeof module &&
  Object.getOwnPropertyDescriptor &&
  Object.getOwnPropertyDescriptor(module, "exports").writable &&
  (module.exports = ve);
const ke = ({ open: t, children: r }) => {
  const [n, o] = s(0),
    [a, { height: l }] = ve(),
    u = D({ config: { friction: 10 }, height: t ? n : 0 });
  return (
    i(
      () => (
        o(l),
        window.addEventListener("resize", () => o(l)),
        () => {
          window.removeEventListener("resize", () => o(l));
        }
      ),
      [l]
    ),
    e.createElement(
      me.div,
      { style: p({ overflow: "hidden" }, u) },
      e.createElement("div", { ref: a }, r)
    )
  );
};
var Ee,
  Oe = l,
  xe = ["mousedown", "touchstart"],
  Ce = function (e) {
    if ("touchstart" === e)
      return (function () {
        if (void 0 !== Ee) return Ee;
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
          (Ee = e),
          e
        );
      })()
        ? { passive: !0 }
        : void 0;
  };
function Ve(e, r) {
  var n = (function (e) {
    var r = t(e);
    return (
      Oe(function () {
        r.current = e;
      }),
      r
    );
  })(r);
  i(
    function () {
      if (r) {
        var t = function (t) {
          e.current &&
            n.current &&
            !e.current.contains(t.target) &&
            n.current(t);
        };
        return (
          xe.forEach(function (e) {
            document.addEventListener(e, t, Ce(e));
          }),
          function () {
            xe.forEach(function (e) {
              document.removeEventListener(e, t, Ce(e));
            });
          }
        );
      }
    },
    [!r]
  );
}
const je = ({ Button: r, List: n, options: i }) => {
  const [o, a] = s(!1),
    l = t(null);
  return (
    Ve(l, () => a(!1)),
    e.createElement(
      "div",
      {
        style: { position: "relative" },
        onMouseEnter: () => {
          a(!0);
        },
        onMouseLeave: () => a(!1),
      },
      e.createElement(r, { activated: o, onClick: () => a(!o) }),
      e.createElement(
        "div",
        { ref: l, style: { visibility: o ? "visible" : "hidden" } },
        e.createElement(
          n,
          null,
          i.map((t, r) => e.createElement(t, { key: r }))
        )
      )
    )
  );
};
let Pe,
  Ae,
  Se = (e) => e;
const ze = ({ size: t = 20, activated: r, onClick: n }) =>
    e.createElement(
      qe,
      { style: { fontSize: t }, onClick: n },
      e.createElement(Te, {
        style: p(
          {},
          D({
            top: r ? "50%" : "25%",
            transform: r
              ? " translate(-50%, -50%) rotate(135deg)"
              : "translate(-50%, -50%) rotate(0deg)",
          })
        ),
      }),
      e.createElement(Te, {
        style: p({}, D({ config: { duration: 100 }, opacity: r ? 0 : 1 })),
      }),
      e.createElement(Te, {
        style: p(
          {},
          D({
            top: r ? "50%" : "75%",
            transform: r
              ? " translate(-50%, -50%) rotate(-135deg)"
              : "translate(-50%, -50%) rotate(0deg)",
          })
        ),
      })
    ),
  qe = u.div(
    Pe ||
      (Pe = Se`
  height: 2em;
  width: 2em;
  position: relative;
`)
  ),
  Te = u(me.span)(
    Ae ||
      (Ae = Se`
  position: absolute;
  width: 75%;
  height: 0.15em;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
`)
  ),
  Le = ({ categories: t, Bar: r, MenuButton: n, Menu: i, MenuItemButton: o }) =>
    e.createElement(
      r,
      null,
      t.map(({ category: t, items: r }, a) =>
        e.createElement(je, {
          key: `${t}${a}`,
          Button: ({ onClick: r }) => e.createElement(n, { onClick: r }, t),
          List: i,
          options: r.map(({ label: t, onClick: r }) => () =>
            e.createElement(o, { activated: !1, onClick: r }, t)
          ),
        })
      )
    ),
  Fe = ({ open: r, close: n, children: i }) => {
    const o = t(null);
    return (
      Ve(o, () => !r && n()),
      e.createElement(
        "div",
        { ref: o, style: { visibility: r ? "visible" : "hidden" } },
        i
      )
    );
  },
  $e = ({
    placeholder: t = "Search",
    value: r,
    ariaLabel: n,
    onChange: i,
    onFocus: o,
    Input: a,
    Container: s,
  }) =>
    e.createElement(
      s,
      { showDeleteIcon: "" !== r, onDelete: () => i("") },
      e.createElement(a, {
        type: "text",
        value: r,
        placeholder: t,
        "aria-label": n,
        onChange: (e) => i(e.target.value),
        onKeyDown: (e) => {
          "Enter" === e.key && e.target.blur();
        },
        onFocus: () => {
          o && o();
        },
      })
    ),
  Me = ({
    orientation: r = "left",
    open: n,
    onClose: o,
    children: s,
    closeOnOutsideClick: l = !0,
    disableBodyScroll: u = !0,
    animate: c = !0,
    animatedProps: d = {},
  }) => {
    const h = "left" === r,
      f = t(),
      [m] = [
        a((e) => {
          document.body.style.overflow = e ? "hidden" : "unset";
        }, []),
      ];
    return (
      i(() => {
        u && m(n);
      }, [n]),
      Ve(f, () => setTimeout(() => l && n && o(), 150)),
      e.createElement(
        me.div,
        {
          ref: f,
          style: p(
            p(
              {},
              D(
                p(
                  {
                    immediate: !c,
                    transform: `translate3d(${h ? "-" : ""}${
                      n ? 0 : 100
                    }%, 0, 0)`,
                    boxShadow: `${
                      h ? "" : "-"
                    }10px 4px 12px -5px rgba(0, 0, 0, 0${n ? ".1" : ""})`,
                  },
                  d
                )
              )
            ),
            {},
            { position: "fixed", top: 0, [r]: 0 }
          ),
        },
        s
      )
    );
  };
let Ie,
  Re,
  De = (e) => e;
const Be = u(me.div)(
    Ie ||
      (Ie = De`
  height: 3.2em;
  width: 6.8em;
  border: 0.19em solid ${0};
  border-radius: 2.5em;
  position: relative;
  cursor: pointer;
  ${0}
`),
    (e) => e.theme.switch.border,
    (e) => e.styles
  ),
  Ge = u(me.div)(
    Re ||
      (Re = De`
  position: absolute;
  height: 2.5em;
  width: 2.5em;
  border-radius: 50%;
  background-color: ${0};
  top: 50%;
  transform: translateY(-50%);
`),
    (e) => e.theme.switch.selector
  );
var Ne = c(
  ({
    size: t = 16,
    activated: r,
    onClick: n,
    style: i,
    styles: o,
    animatedProps: a,
    theme: s,
  }) => {
    var l, u, c;
    return e.createElement(
      Be,
      {
        onClick: n,
        styles: o,
        style: p(
          p(
            {
              fontSize:
                (null == s || null === (l = s.switch) || void 0 === l
                  ? void 0
                  : l.size) || t,
            },
            i
          ),
          D(
            p(
              {
                backgroundColor: r
                  ? (null == s || null === (u = s.switch) || void 0 === u
                      ? void 0
                      : u.selected) || "green"
                  : (null == s || null === (c = s.switch) || void 0 === c
                      ? void 0
                      : c.unselected) || "red",
              },
              a
            )
          )
        ),
      },
      e.createElement(Ge, { style: p({}, D({ left: r ? "4%" : "59%" })) })
    );
  }
);
export {
  ke as Accordion,
  je as DropdownMenu,
  ze as Hamburger,
  Le as MenuBar,
  Fe as Popup,
  $e as SearchBar,
  Me as Sidebar,
  Ne as Switch,
};
//# sourceMappingURL=reactor.modern.js.map
