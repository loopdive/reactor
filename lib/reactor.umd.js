!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports, require("react"), require("styled-components"))
    : "function" == typeof define && define.amd
    ? define(["exports", "react", "styled-components"], t)
    : t(((e = e || self).reactor = {}), e.react, e.styledComponents);
})(this, function (e, t, n) {
  var r = "default" in t ? t.default : t,
    i = "default" in n ? n.default : n;
  function o(e, t, n) {
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
  function a(e, t) {
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
  function s(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? a(Object(n), !0).forEach(function (t) {
            o(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : a(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
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
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }).apply(this, arguments);
  }
  function c(e, t) {
    if (null == e) return {};
    var n,
      r,
      i = {},
      o = Object.keys(e);
    for (r = 0; r < o.length; r++) t.indexOf((n = o[r])) >= 0 || (i[n] = e[n]);
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
      let n;
      for (n in e) if (!(n in t)) return !1;
      for (n in t) if (e[n] !== t[n]) return !1;
      return !d.und(n) || e === t;
    },
  };
  function f(e, t) {
    return d.und(e) || d.nul(e) ? t : e;
  }
  function h(e) {
    return d.und(e) ? [] : d.arr(e) ? e : [e];
  }
  function p(e) {
    for (
      var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
      r < t;
      r++
    )
      n[r - 1] = arguments[r];
    return d.fun(e) ? e(...n) : e;
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
    const n = Object.keys(e).reduce(
      (n, r) => (d.und(t[r]) ? u({}, n, { [r]: e[r] }) : n),
      {}
    );
    return u({ to: t }, n);
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
      for (const n in this.payload) {
        const r = this.payload[n];
        (!e || r instanceof g) &&
          (t[n] =
            r instanceof g ? r[e ? "getAnimatedValue" : "getValue"]() : r);
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
    O = (e) =>
      "undefined" != typeof window ? window.requestAnimationFrame(e) : -1,
    x = () => Date.now();
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
      let e = x();
      for (let t of j) {
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
              c = l instanceof g,
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
                let n =
                    !(!a.clamp || 0 === a.tension) && (s < l ? u > l : u < l),
                  c = Math.abs(d) <= a.precision,
                  f = 0 === a.tension || Math.abs(l - u) <= a.precision;
                (i = n || (c && f)), (r.lastVelocity = d), (r.lastTime = e);
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
          n || (j.delete(t), t.stop(!0));
      }
      return j.size ? O(P) : (V = !1), V;
    };
  function S(e, t, n) {
    if ("function" == typeof e) return e;
    if (Array.isArray(e)) return S({ range: e, output: t, extrapolate: n });
    if (E && "string" == typeof e.output[0]) return E(e);
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
  class A extends y {
    constructor(e, t, n, r) {
      super(),
        (this.calc = void 0),
        (this.payload =
          e instanceof y && !(e instanceof A)
            ? e.getPayload()
            : Array.isArray(e)
            ? e
            : [e]),
        (this.calc = S(t, n, r));
    }
    getValue() {
      return this.calc(...this.payload.map((e) => e.getValue()));
    }
    updateConfig(e, t, n) {
      this.calc = S(e, t, n);
    }
    interpolate(e, t, n) {
      return new A(this, e, t, n);
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
      return new A(this, e, t, n);
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
            e.forEach((e, n) => this.payload[n].setValue(e, t))
          : this.payload.forEach((n) => n.setValue(e, t));
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
        n = t.delay,
        r = void 0 === n ? 0 : n,
        i = t.to,
        o = c(t, ["delay", "to"]);
      if (d.arr(i) || d.fun(i)) this.queue.push(u({}, o, { delay: r, to: i }));
      else if (i) {
        let e = {};
        Object.entries(i).forEach((t) => {
          let n = t[0];
          const i = u({ to: { [n]: t[1] }, delay: p(r, n) }, o);
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
                n = void 0 === t ? {} : t,
                r = e.to,
                i = void 0 === r ? {} : r;
              d.obj(n) && (this.merged = u({}, n, this.merged)),
                d.obj(i) && (this.merged = u({}, this.merged, i));
            });
        const t = (this.local = ++this.guid),
          n = (this.localQueue = this.queue);
        (this.queue = []),
          n.forEach((r, i) => {
            let o = r.delay,
              a = c(r, ["delay"]);
            const s = (r) => {
              i === n.length - 1 &&
                t === this.guid &&
                r &&
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
      } else d.fun(e) && this.listeners.push(e), this.props.onStart && this.props.onStart(), j.has(this) || j.add(this), V || ((V = !0), O(P));
      return this;
    }
    stop(e) {
      return this.listeners.forEach((t) => t(e)), (this.listeners = []), this;
    }
    pause(e) {
      return this.stop(!0), e && j.has(this) && j.delete(this), this;
    }
    runAsync(e, t) {
      var n = this;
      let r = c(e, ["delay"]);
      const i = this.local;
      let o = Promise.resolve(void 0);
      if (d.arr(r.to))
        for (let e = 0; e < r.to.length; e++) {
          const t = e,
            n = u({}, r, m(r.to[t]));
          d.arr(n.config) && (n.config = n.config[t]),
            (o = o.then(() => {
              if (i === this.guid)
                return new Promise((e) => this.diff(n).start(e));
            }));
        }
      else if (d.fun(r.to)) {
        let e,
          t = 0;
        o = o.then(() =>
          r
            .to(
              (n) => {
                const o = u({}, r, m(n));
                if (
                  (d.arr(o.config) && (o.config = o.config[t]),
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
      this.props = u({}, this.props, e);
      let t = this.props,
        n = t.from,
        r = void 0 === n ? {} : n,
        i = t.to,
        o = void 0 === i ? {} : i,
        a = t.config,
        s = void 0 === a ? {} : a,
        l = t.attach,
        c = t.reset,
        m = t.immediate;
      if (t.reverse) {
        var g = [o, r];
        (r = g[0]), (o = g[1]);
      }
      (this.merged = u({}, r, this.merged, o)), (this.hasChanged = !1);
      let y = l && l(this);
      if (
        ((this.animations = Object.entries(this.merged).reduce((e, t) => {
          let n = t[0],
            i = t[1],
            o = e[n] || {};
          const a = d.num(i),
            l = d.str(i) && !i.startsWith("#") && !/\d/.test(i) && !w[i],
            g = d.arr(i),
            v = !a && !g && !l;
          let b = d.und(r[n]) ? i : r[n],
            k = a || g || l ? i : 1,
            O = p(s, n);
          y && (k = y.animations[n].parent);
          let C,
            V = o.parent,
            j = o.interpolation,
            P = h(y ? k.getPayload() : k),
            S = i;
          v && (S = E({ range: [0, 1], output: [i, i] })(1));
          let A = j && j.getValue();
          const q = !d.und(V) && o.animatedValues.some((e) => !e.done),
            M = !d.equ(S, A),
            T = !d.equ(S, o.previous),
            L = !d.equ(O, o.config);
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
              (P = h(y ? k.getPayload() : k)),
              (C = h(V.getPayload())),
              c && !v && V.setValue(b, !1),
              (this.hasChanged = !0),
              C.forEach((e) => {
                (e.startPosition = e.value),
                  (e.lastPosition = e.value),
                  (e.lastVelocity = q ? e.lastVelocity : void 0),
                  (e.lastTime = q ? e.lastTime : void 0),
                  (e.startTime = x()),
                  (e.done = !1),
                  e.animatedStyles.clear();
              }),
              p(m, n) && V.setValue(v ? k : i, !1),
              u({}, e, {
                [n]: u({}, o, {
                  name: n,
                  parent: V,
                  interpolation: j,
                  animatedValues: C,
                  toValues: P,
                  previous: S,
                  config: O,
                  fromValues: h(V.getValue()),
                  immediate: p(m, n),
                  initialVelocity: f(O.velocity, 0),
                  clamp: f(O.clamp, !1),
                  precision: f(O.precision, 0.01),
                  tension: f(O.tension, 170),
                  friction: f(O.friction, 26),
                  mass: f(O.mass, 1),
                  duration: O.duration,
                  easing: f(O.easing, (e) => e),
                  decay: O.decay,
                }),
              })
            );
          }
          return M
            ? e
            : (v && (V.setValue(1, !1), j.updateConfig({ output: [S, S] })),
              (V.done = !0),
              (this.hasChanged = !0),
              u({}, e, { [n]: u({}, e[n], { previous: S }) }));
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
    const n = d.fun(e),
      r = ((e, n) => {
        const r = t.useRef(!1),
          i = t.useRef(),
          o = d.fun(n),
          a = t.useMemo(() => {
            let e;
            return (
              i.current &&
                (i.current.map((e) => e.destroy()), (i.current = void 0)),
              [
                new Array(1).fill().map((t, r) => {
                  const i = new M(),
                    a = o ? p(n, r, i) : n[r];
                  return 0 === r && (e = a.ref), i.update(a), e || i.start(), i;
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
            i.current.map((t, n) => {
              t.update(o ? p(e, n, t) : e[n]), s || t.start();
            }),
          [1]
        );
        t.useEffect(() => {
          r.current ? o || l(n) : s || i.current.forEach((e) => e.start());
        }),
          t.useEffect(
            () => (
              (r.current = !0), () => i.current.forEach((e) => e.destroy())
            ),
            []
          );
        const u = i.current.map((e) => e.getValues());
        return o ? [u, l, (e) => i.current.forEach((t) => t.pause(e))] : u;
      })(0, n ? e : [e]),
      i = r[0];
    return n ? [i[0], r[1], r[2]] : i;
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
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
  }
  const B = new RegExp("rgb" + D(I, I, I)),
    $ = new RegExp("rgba" + D(I, I, I, I)),
    G = new RegExp("hsl" + D(I, "[-+]?\\d*\\.?\\d+%", "[-+]?\\d*\\.?\\d+%")),
    N = new RegExp(
      "hsla" + D(I, "[-+]?\\d*\\.?\\d+%", "[-+]?\\d*\\.?\\d+%", I)
    ),
    W = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    H = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    Q = /^#([0-9a-fA-F]{6})$/,
    Y = /^#([0-9a-fA-F]{8})$/;
  function K(e, t, n) {
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
  function U(e, t, n) {
    const r = n < 0.5 ? n * (1 + t) : n + t - n * t,
      i = 2 * n - r,
      o = K(i, r, e + 1 / 3),
      a = K(i, r, e),
      s = K(i, r, e - 1 / 3);
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
        ? parseInt(
            t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4],
            16
          ) >>> 0
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
    ne = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
    re = new RegExp(`(${Object.keys(F).join("|")})`, "g");
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
  function ae(e, t, n) {
    return null == t || "boolean" == typeof t || "" === t
      ? ""
      : n || "number" != typeof t || 0 === t || (ie.hasOwnProperty(e) && ie[e])
      ? ("" + t).trim()
      : t + "px";
  }
  ie = Object.keys(ie).reduce(
    (e, t) => (
      oe.forEach(
        (n) =>
          (e[((e, t) => e + t.charAt(0).toUpperCase() + t.substring(1))(n, t)] =
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
          .map((e) => e.replace(ne, ee))
          .map((e) => e.replace(re, ee)),
        n = t[0].match(te).map(() => []);
      t.forEach((e) => {
        e.match(te).forEach((e, t) => n[t].push(+e));
      });
      const r = t[0].match(te).map((t, r) => S(u({}, e, { output: n[r] })));
      return (e) => {
        let n = 0;
        return t[0]
          .replace(te, () => r[n++](e))
          .replace(
            /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
            (e, t, n, r, i) =>
              `rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`
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
              var n = 0 === t.indexOf("--"),
                r = ae(t, i[t], n);
              "float" === t && (t = "cssFloat"),
                n ? e.style.setProperty(t, r) : (e.style[t] = r);
            }
          for (let t in l) {
            const n = u
              ? t
              : se[t] ||
                (se[t] = t.replace(/([A-Z])/g, (e) => "-" + e.toLowerCase()));
            void 0 !== e.getAttribute(n) && e.setAttribute(n, l[t]);
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
        f = t.useCallback((e) => {
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
        f(n);
      const h = c(s.current.getValue(), ["scrollTop", "scrollLeft"]),
        p =
          !d.fun((m = e)) || m.prototype instanceof r.Component
            ? (e) =>
                (l.current = (function (e, t) {
                  return (
                    t && (d.fun(t) ? t(e) : d.obj(t) && (t.current = e)), e
                  );
                })(e, i))
            : void 0;
      var m;
      return r.createElement(e, u({}, h, { ref: p }));
    })),
  void 0 === (ue = !1) && (ue = !0),
  (e) =>
    (d.arr(e) ? e : Object.keys(e)).reduce((e, t) => {
      const n = ue ? t[0].toLowerCase() + t.substring(1) : t;
      return (e[n] = le(n)), e;
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
  function de(e, t, n) {
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
        r || (r = setTimeout(l, t)),
        u && ((s = e.apply(o, i)), (o = i = null)),
        s
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
  de.debounce = de;
  var fe = de;
  function he(
    { debounce: e, scroll: n, polyfill: r } = { debounce: 0, scroll: !1 }
  ) {
    const i =
      r || ("undefined" == typeof window ? class {} : window.ResizeObserver);
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
      [c, d, f] = t.useMemo(() => {
        const e = () => {
          if (!s.current.element) return;
          const {
              left: e,
              top: t,
              width: n,
              height: r,
              bottom: i,
              right: o,
              x: l,
              y: u,
            } = s.current.element.getBoundingClientRect(),
            c = {
              left: e,
              top: t,
              width: n,
              height: r,
              bottom: i,
              right: o,
              x: l,
              y: u,
            };
          Object.freeze(c),
            me(s.current.lastBounds, c) || a((s.current.lastBounds = c));
        };
        return [e, u ? fe.debounce(e, u) : e, l ? fe.debounce(e, l) : e];
      }, [a, l, u]);
    function h() {
      s.current.scrollContainers &&
        (s.current.scrollContainers.forEach((e) =>
          e.removeEventListener("scroll", f, !0)
        ),
        (s.current.scrollContainers = null)),
        s.current.resizeObserver &&
          (s.current.resizeObserver.disconnect(),
          (s.current.resizeObserver = null));
    }
    function p() {
      s.current.element &&
        ((s.current.resizeObserver = new i(f)),
        s.current.resizeObserver.observe(s.current.element),
        n &&
          s.current.scrollContainers &&
          s.current.scrollContainers.forEach((e) =>
            e.addEventListener("scroll", f, { capture: !0, passive: !0 })
          ));
    }
    var m, g, y;
    return (
      (m = f),
      (g = Boolean(n)),
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
        h(), p();
      }, [n, f, d]),
      t.useEffect(() => h, []),
      [
        (e) => {
          e &&
            e !== s.current.element &&
            (h(),
            (s.current.element = e),
            (s.current.scrollContainers = (function e(t) {
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
            p());
        },
        o,
        c,
      ]
    );
  }
  const pe = ["x", "y", "top", "bottom", "left", "right", "width", "height"],
    me = (e, t) => pe.every((n) => e[n] === t[n]);
  var ge;
  "undefined" != typeof module &&
    Object.getOwnPropertyDescriptor &&
    Object.getOwnPropertyDescriptor(module, "exports").writable &&
    (module.exports = he);
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
            n = function () {};
          return (
            window.addEventListener("t", n, t),
            window.removeEventListener("t", n, t),
            (ge = e),
            e
          );
        })()
          ? { passive: !0 }
          : void 0;
    };
  function we(e, n) {
    var r = (function (e) {
      var n = t.useRef(e);
      return (
        ye(function () {
          n.current = e;
        }),
        n
      );
    })(n);
    t.useEffect(
      function () {
        if (n) {
          var t = function (t) {
            e.current &&
              r.current &&
              !e.current.contains(t.target) &&
              r.current(t);
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
      [!n]
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
  function Oe() {
    var e = l(["\n  height: 2em;\n  width: 2em;\n  position: relative;\n"]);
    return (
      (Oe = function () {
        return e;
      }),
      e
    );
  }
  var xe = i.div(Oe()),
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
  (e.Accordion = function (e) {
    var n = e.open,
      i = e.children,
      o = t.useState(0),
      a = o[0],
      l = o[1],
      u = he(),
      c = u[0],
      d = u[1].height,
      f = T({ config: { friction: 10 }, height: n ? a : 0 });
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
        { style: s({ overflow: "hidden" }, f) },
        r.createElement("div", { ref: c }, i)
      )
    );
  }),
    (e.DropdownMenu = Ee),
    (e.Hamburger = function (e) {
      var t = e.size,
        n = e.activated;
      return r.createElement(
        xe,
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
    (e.MenuBar = function (e) {
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
    (e.Popup = function (e) {
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
    (e.SearchBar = function (e) {
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
    (e.Sidebar = function (e) {
      var n,
        i = e.orientation,
        o = void 0 === i ? "left" : i,
        a = e.open,
        l = e.onClose,
        u = e.children,
        c = e.closeOnOutsideClick,
        d = void 0 === c || c,
        f = e.disableBodyScroll,
        h = void 0 === f || f,
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
            h && w(a);
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
    (e.Switch = Ae);
});
//# sourceMappingURL=reactor.umd.js.map
