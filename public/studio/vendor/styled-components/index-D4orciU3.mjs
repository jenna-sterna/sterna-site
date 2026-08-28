import C, { createElement as vn } from "react";
var x = "-ms-", vt = "-moz-", S = "-webkit-", Je = "comm", kt = "rule", ye = "decl", On = "@import", An = "@namespace", Qe = "@keyframes", Rn = "@layer", Xe = Math.abs, be = String.fromCharCode, le = Object.assign;
function kn(t, e) {
  return j(t, 0) ^ 45 ? (((e << 2 ^ j(t, 0)) << 2 ^ j(t, 1)) << 2 ^ j(t, 2)) << 2 ^ j(t, 3) : 0;
}
function tn(t) {
  return t.trim();
}
function H(t, e) {
  return (t = e.exec(t)) ? t[0] : t;
}
function g(t, e, n) {
  return t.replace(e, n);
}
function jt(t, e, n) {
  return t.indexOf(e, n);
}
function j(t, e) {
  return t.charCodeAt(e) | 0;
}
function rt(t, e, n) {
  return t.slice(e, n);
}
function L(t) {
  return t.length;
}
function en(t) {
  return t.length;
}
function Pt(t, e) {
  return e.push(t), t;
}
function Nn(t, e) {
  return t.map(e).join("");
}
function je(t, e) {
  return t.filter(function(n) {
    return !H(n, e);
  });
}
var qt = 1, gt = 1, nn = 0, D = 0, k = 0, St = "";
function Yt(t, e, n, r, s, o, c, i) {
  return { value: t, root: e, parent: n, type: r, props: s, children: o, line: qt, column: gt, length: c, return: "", siblings: i };
}
function U(t, e) {
  return le(Yt("", null, null, "", null, null, 0, t.siblings), t, { length: -t.length }, e);
}
function ft(t) {
  for (; t.root; )
    t = U(t.root, { children: [t] });
  Pt(t, t.siblings);
}
function jn() {
  return k;
}
function _n() {
  return k = D > 0 ? j(St, --D) : 0, gt--, k === 10 && (gt = 1, qt--), k;
}
function V() {
  return k = D < nn ? j(St, D++) : 0, gt++, k === 10 && (gt = 1, qt++), k;
}
function K() {
  return j(St, D);
}
function _t() {
  return D;
}
function Ht(t, e) {
  return rt(St, t, e);
}
function Ot(t) {
  switch (t) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function En(t) {
  return qt = gt = 1, nn = L(St = t), D = 0, [];
}
function Tn(t) {
  return St = "", t;
}
function Xt(t) {
  return tn(Ht(D - 1, ue(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function Mn(t) {
  for (; (k = K()) && k < 33; )
    V();
  return Ot(t) > 2 || Ot(k) > 3 ? "" : " ";
}
function Fn(t, e) {
  for (; --e && V() && !(k < 48 || k > 102 || k > 57 && k < 65 || k > 70 && k < 97); )
    ;
  return Ht(t, _t() + (e < 6 && K() == 32 && V() == 32));
}
function ue(t) {
  for (; V(); )
    switch (k) {
      // ] ) " '
      case t:
        return D;
      // " '
      case 34:
      case 39:
        t !== 34 && t !== 39 && ue(k);
        break;
      // (
      case 40:
        t === 41 && ue(t);
        break;
      // \
      case 92:
        V();
        break;
    }
  return D;
}
function Gn(t, e) {
  for (; V() && t + k !== 57; )
    if (t + k === 84 && K() === 47)
      break;
  return "/*" + Ht(e, D - 1) + "*" + be(t === 47 ? t : V());
}
function zn(t) {
  for (; !Ot(K()); )
    V();
  return Ht(t, D);
}
function Dn(t) {
  return Tn(Et("", null, null, null, [""], t = En(t), 0, [0], t));
}
function Et(t, e, n, r, s, o, c, i, a) {
  for (var l = 0, f = 0, u = c, h = 0, y = 0, p = 0, w = 1, T = 1, v = 1, d = 0, F = "", W = s, P = o, _ = r, m = F; T; )
    switch (p = d, d = V()) {
      // (
      case 40:
        if (p != 108 && j(m, u - 1) == 58) {
          jt(m += g(Xt(d), "&", "&\f"), "&\f", Xe(l ? i[l - 1] : 0)) != -1 && (v = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        m += Xt(d);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        m += Mn(p);
        break;
      // \
      case 92:
        m += Fn(_t() - 1, 7);
        continue;
      // /
      case 47:
        switch (K()) {
          case 42:
          case 47:
            Pt(Wn(Gn(V(), _t()), e, n, a), a), (Ot(p || 1) == 5 || Ot(K() || 1) == 5) && L(m) && rt(m, -1, void 0) !== " " && (m += " ");
            break;
          default:
            m += "/";
        }
        break;
      // {
      case 123 * w:
        i[l++] = L(m) * v;
      // } ; \0
      case 125 * w:
      case 59:
      case 0:
        switch (d) {
          // \0 }
          case 0:
          case 125:
            T = 0;
          // ;
          case 59 + f:
            v == -1 && (m = g(m, /\f/g, "")), y > 0 && (L(m) - u || w === 0 && p === 47) && Pt(y > 32 ? Ee(m + ";", r, n, u - 1, a) : Ee(g(m, " ", "") + ";", r, n, u - 2, a), a);
            break;
          // @ ;
          case 59:
            m += ";";
          // { rule/at-rule
          default:
            if (Pt(_ = _e(m, e, n, l, f, s, i, F, W = [], P = [], u, o), o), d === 123)
              if (f === 0)
                Et(m, e, _, _, W, o, u, i, P);
              else {
                switch (h) {
                  // c(ontainer)
                  case 99:
                    if (j(m, 3) === 110) break;
                  // l(ayer)
                  case 108:
                    if (j(m, 2) === 97) break;
                  default:
                    f = 0;
                  // d(ocument) m(edia) s(upports)
                  case 100:
                  case 109:
                  case 115:
                }
                f ? Et(t, _, _, r && Pt(_e(t, _, _, 0, 0, s, i, F, s, W = [], u, P), P), s, P, u, i, r ? W : P) : Et(m, _, _, _, [""], P, 0, i, P);
              }
        }
        l = f = y = 0, w = v = 1, F = m = "", u = c;
        break;
      // :
      case 58:
        u = 1 + L(m), y = p;
      default:
        if (w < 1) {
          if (d == 123)
            --w;
          else if (d == 125 && w++ == 0 && _n() == 125)
            continue;
        }
        switch (m += be(d), d * w) {
          // &
          case 38:
            v = f > 0 ? 1 : (m += "\f", -1);
            break;
          // ,
          case 44:
            i[l++] = (L(m) - 1) * v, v = 1;
            break;
          // @
          case 64:
            K() === 45 && (m += Xt(V())), h = K(), f = u = L(F = m += zn(_t())), d++;
            break;
          // -
          case 45:
            p === 45 && L(m) == 2 && (w = 0);
        }
    }
  return o;
}
function _e(t, e, n, r, s, o, c, i, a, l, f, u) {
  for (var h = s - 1, y = s === 0 ? o : [""], p = en(y), w = 0, T = 0, v = 0; w < r; ++w)
    for (var d = 0, F = rt(t, h + 1, h = Xe(T = c[w])), W = t; d < p; ++d)
      (W = tn(T > 0 ? y[d] + " " + F : g(F, /&\f/g, y[d]))) && (a[v++] = W);
  return Yt(t, e, n, s === 0 ? kt : i, a, l, f, u);
}
function Wn(t, e, n, r) {
  return Yt(t, e, n, Je, be(jn()), rt(t, 2, -2), 0, r);
}
function Ee(t, e, n, r, s) {
  return Yt(t, e, n, ye, rt(t, 0, r), rt(t, r + 1, -1), r, s);
}
function rn(t, e, n) {
  switch (kn(t, e)) {
    // color-adjust
    case 5103:
      return S + "print-" + t + t;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
      return S + t + t;
    // mask-composite
    case 4855:
      return S + t.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + t;
    // tab-size
    case 4789:
      return vt + t + t;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return S + t + vt + t + x + t + t;
    // writing-mode
    case 5936:
      switch (j(t, e + 11)) {
        // vertical-l(r)
        case 114:
          return S + t + x + g(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
        // vertical-r(l)
        case 108:
          return S + t + x + g(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
        // horizontal(-)tb
        case 45:
          return S + t + x + g(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
      }
    // flex, flex-direction, scroll-snap-type, writing-mode
    case 6828:
    case 4268:
    case 2903:
      return S + t + x + t + t;
    // order
    case 6165:
      return S + t + x + "flex-" + t + t;
    // align-items
    case 5187:
      return S + t + g(t, /(\w+).+(:[^]+)/, S + "box-$1$2" + x + "flex-$1$2") + t;
    // align-self
    case 5443:
      return S + t + x + "flex-item-" + g(t, /flex-|-self/g, "") + (H(t, /flex-|baseline/) ? "" : x + "grid-row-" + g(t, /flex-|-self/g, "")) + t;
    // align-content
    case 4675:
      return S + t + x + "flex-line-pack" + g(t, /align-content|flex-|-self/g, "") + t;
    // flex-shrink
    case 5548:
      return S + t + x + g(t, "shrink", "negative") + t;
    // flex-basis
    case 5292:
      return S + t + x + g(t, "basis", "preferred-size") + t;
    // flex-grow
    case 6060:
      return S + "box-" + g(t, "-grow", "") + S + t + x + g(t, "grow", "positive") + t;
    // transition
    case 4554:
      return S + g(t, /([^-])(transform)/g, "$1" + S + "$2") + t;
    // cursor
    case 6187:
      return g(g(g(t, /(zoom-|grab)/, S + "$1"), /(image-set)/, S + "$1"), t, "") + t;
    // background, background-image
    case 5495:
    case 3959:
      return g(t, /(image-set\([^]*)/, S + "$1$`$1");
    // justify-content
    case 4968:
      return g(g(t, /(.+:)(flex-)?(.*)/, S + "box-pack:$3" + x + "flex-pack:$3"), /space-between/, "justify") + S + t + t;
    // justify-self
    case 4200:
      if (!H(t, /flex-|baseline/)) return x + "grid-column-align" + rt(t, e) + t;
      break;
    // grid-template-(columns|rows)
    case 2592:
    case 3360:
      return x + g(t, "template-", "") + t;
    // grid-(row|column)-start
    case 4384:
    case 3616:
      return n && n.some(function(r, s) {
        return e = s, H(r.props, /grid-\w+-end/);
      }) ? ~jt(t + (n = n[e].value), "span", 0) ? t : x + g(t, "-start", "") + t + x + "grid-row-span:" + (~jt(n, "span", 0) ? H(n, /\d+/) : +H(n, /\d+/) - +H(t, /\d+/)) + ";" : x + g(t, "-start", "") + t;
    // grid-(row|column)-end
    case 4896:
    case 4128:
      return n && n.some(function(r) {
        return H(r.props, /grid-\w+-start/);
      }) ? t : x + g(g(t, "-end", "-span"), "span ", "") + t;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return g(t, /(.+)-inline(.+)/, S + "$1$2") + t;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (L(t) - 1 - e > 6)
        switch (j(t, e + 1)) {
          // (m)ax-content, (m)in-content
          case 109:
            if (j(t, e + 4) !== 45)
              break;
          // (f)ill-available, (f)it-content
          case 102:
            return g(t, /(.+:)(.+)-([^]+)/, "$1" + S + "$2-$3$1" + vt + (j(t, e + 3) == 108 ? "$3" : "$2-$3")) + t;
          // (s)tretch
          case 115:
            return ~jt(t, "stretch", 0) ? rn(g(t, "stretch", "fill-available"), e, n) + t : t;
        }
      break;
    // grid-(column|row)
    case 5152:
    case 5920:
      return g(t, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(r, s, o, c, i, a, l) {
        return x + s + ":" + o + l + (c ? x + s + "-span:" + (i ? a : +a - +o) + l : "") + t;
      });
    // position: sticky
    case 4949:
      if (j(t, e + 6) === 121)
        return g(t, ":", ":" + S) + t;
      break;
    // display: (flex|inline-flex|grid|inline-grid)
    case 6444:
      switch (j(t, j(t, 14) === 45 ? 18 : 11)) {
        // (inline-)?fle(x)
        case 120:
          return g(t, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + S + (j(t, 14) === 45 ? "inline-" : "") + "box$3$1" + S + "$2$3$1" + x + "$2box$3") + t;
        // (inline-)?gri(d)
        case 100:
          return g(t, ":", ":" + x) + t;
      }
      break;
    // scroll-margin, scroll-margin-(top|right|bottom|left)
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return g(t, "scroll-", "scroll-snap-") + t;
  }
  return t;
}
function zt(t, e) {
  for (var n = "", r = 0; r < t.length; r++)
    n += e(t[r], r, t, e) || "";
  return n;
}
function Bn(t, e, n, r) {
  switch (t.type) {
    case Rn:
      if (t.children.length) break;
    case On:
    case An:
    case ye:
      return t.return = t.return || t.value;
    case Je:
      return "";
    case Qe:
      return t.return = t.value + "{" + zt(t.children, r) + "}";
    case kt:
      if (!L(t.value = t.props.join(","))) return "";
  }
  return L(n = zt(t.children, r)) ? t.return = t.value + "{" + n + "}" : "";
}
function Ln(t) {
  var e = en(t);
  return function(n, r, s, o) {
    for (var c = "", i = 0; i < e; i++)
      c += t[i](n, r, s, o) || "";
    return c;
  };
}
function Vn(t) {
  return function(e) {
    e.root || (e = e.return) && t(e);
  };
}
function qn(t, e, n, r) {
  if (t.length > -1 && !t.return)
    switch (t.type) {
      case ye:
        t.return = rn(t.value, t.length, n);
        return;
      case Qe:
        return zt([U(t, { value: g(t.value, "@", "@" + S) })], r);
      case kt:
        if (t.length)
          return Nn(n = t.props, function(s) {
            switch (H(s, r = /(::plac\w+|:read-\w+)/)) {
              // :read-(only|write)
              case ":read-only":
              case ":read-write":
                ft(U(t, { props: [g(s, /:(read-\w+)/, ":" + vt + "$1")] })), ft(U(t, { props: [s] })), le(t, { props: je(n, r) });
                break;
              // :placeholder
              case "::placeholder":
                ft(U(t, { props: [g(s, /:(plac\w+)/, ":" + S + "input-$1")] })), ft(U(t, { props: [g(s, /:(plac\w+)/, ":" + vt + "$1")] })), ft(U(t, { props: [g(s, /:(plac\w+)/, x + "input-$1")] })), ft(U(t, { props: [s] })), le(t, { props: je(n, r) });
                break;
            }
            return "";
          });
    }
}
var te, ee;
const q = typeof process < "u" && process.env !== void 0 && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", sn = "active", Dt = "data-styled-version", mt = "6.5.3", st = `/*!sc*/
`, dt = typeof window < "u" && typeof document < "u", A = C.createContext === void 0;
function Te(t) {
  if (typeof process < "u" && process.env !== void 0) {
    const e = process.env[t];
    if (e !== void 0 && e !== "") return e !== "false";
  }
}
const Yn = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : (ee = (te = Te("REACT_APP_SC_DISABLE_SPEEDY")) !== null && te !== void 0 ? te : Te("SC_DISABLE_SPEEDY")) !== null && ee !== void 0 ? ee : typeof process < "u" && process.env !== void 0 && !1), on = "sc-keyframes-", Hn = {};
function z(t, ...e) {
  return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${t} for more information.${e.length > 0 ? ` Args: ${e.join(", ")}` : ""}`);
}
let Tt = /* @__PURE__ */ new Map(), Wt = /* @__PURE__ */ new Map(), Mt = 1;
const et = (t) => {
  if (Tt.has(t)) return Tt.get(t);
  for (; Wt.has(Mt); ) Mt++;
  const e = Mt++;
  return Tt.set(t, e), Wt.set(e, t), e;
}, Un = (t) => Wt.get(t), Kn = (t, e) => {
  Mt = e + 1, Tt.set(t, e), Wt.set(e, t);
}, Se = Object.freeze([]), yt = Object.freeze({});
function we(t, e, n = yt) {
  return t.theme !== n.theme && t.theme || e || n.theme;
}
const Zn = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, Jn = /(^-|-$)/g;
function cn(t) {
  return t.replace(Zn, "-").replace(Jn, "");
}
const Qn = /(a)(d)/gi, Me = (t) => String.fromCharCode(t + (t > 25 ? 39 : 97));
function Ce(t) {
  let e, n = "";
  for (e = Math.abs(t); e > 52; e = e / 52 | 0) n = Me(e % 52) + n;
  return (Me(e % 52) + n).replace(Qn, "$1-$2");
}
const fe = 5381, nt = (t, e) => {
  let n = e.length;
  for (; n; ) t = 33 * t ^ e.charCodeAt(--n);
  return t;
}, an = (t) => nt(fe, t);
function xe(t) {
  return Ce(an(t) >>> 0);
}
function ln(t) {
  return t.displayName || t.name || "Component";
}
function he(t) {
  return typeof t == "string" && !0;
}
function Xn(t) {
  return he(t) ? `styled.${t}` : `Styled(${ln(t)})`;
}
const un = Symbol.for("react.memo"), tr = Symbol.for("react.forward_ref"), er = { contextType: !0, defaultProps: !0, displayName: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, propTypes: !0, type: !0 }, nr = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 }, fn = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 }, rr = { [tr]: { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 }, [un]: fn };
function Fe(t) {
  return ("type" in (e = t) && e.type.$$typeof) === un ? fn : "$$typeof" in t ? rr[t.$$typeof] : er;
  var e;
}
const sr = Object.defineProperty, or = Object.getOwnPropertyNames, ir = Object.getOwnPropertySymbols, cr = Object.getOwnPropertyDescriptor, ar = Object.getPrototypeOf, lr = Object.prototype;
function $e(t, e, n) {
  if (typeof e != "string") {
    const r = ar(e);
    r && r !== lr && $e(t, r, n);
    const s = or(e).concat(ir(e)), o = Fe(t), c = Fe(e);
    for (let i = 0; i < s.length; ++i) {
      const a = s[i];
      if (!(a in nr || n && n[a] || c && a in c || o && a in o)) {
        const l = cr(e, a);
        try {
          sr(t, a, l);
        } catch {
        }
      }
    }
  }
  return t;
}
function wt(t) {
  return typeof t == "function";
}
const ur = Symbol.for("react.forward_ref");
function Pe(t) {
  return t != null && (typeof t == "object" || typeof t == "function") && t.$$typeof === ur && "styledComponentId" in t;
}
function It(t, e) {
  return t && e ? t + " " + e : t || e || "";
}
function At(t, e) {
  return t.join(e || "");
}
function hn(t) {
  let e = "";
  for (let n = 0; n < t.length; n++) e += t[n] + st;
  return e;
}
function dn(t) {
  return t && t.replaceAll(st, "");
}
function Rt(t) {
  return t !== null && typeof t == "object" && t.constructor.name === Object.name && !("props" in t && t.$$typeof);
}
function de(t, e, n = !1) {
  if (!n && !Rt(t) && !Array.isArray(t)) return e;
  if (Array.isArray(e)) for (let r = 0; r < e.length; r++) t[r] = de(t[r], e[r]);
  else if (Rt(e)) for (const r in e) t[r] = de(t[r], e[r]);
  return t;
}
function pn(t) {
  if (!A) return null;
  const e = C.cache;
  return e ? e(t) : null;
}
function Ie(t, e) {
  Object.defineProperty(t, "toString", { value: e });
}
const fr = class {
  constructor(t) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = t, this._cGroup = 0, this._cIndex = 0;
  }
  indexOfGroup(t) {
    if (t === this._cGroup) return this._cIndex;
    let e = this._cIndex;
    if (t > this._cGroup) for (let n = this._cGroup; n < t; n++) e += this.groupSizes[n];
    else for (let n = this._cGroup - 1; n >= t; n--) e -= this.groupSizes[n];
    return this._cGroup = t, this._cIndex = e, e;
  }
  insertRules(t, e) {
    if (t >= this.groupSizes.length) {
      const s = this.groupSizes, o = s.length;
      let c = o;
      for (; t >= c; ) if (c <<= 1, c < 0) throw z(16, `${t}`);
      this.groupSizes = new Uint32Array(c), this.groupSizes.set(s), this.length = c;
      for (let i = o; i < c; i++) this.groupSizes[i] = 0;
    }
    let n = this.indexOfGroup(t + 1), r = 0;
    for (let s = 0, o = e.length; s < o; s++) this.tag.insertRule(n, e[s]) && (this.groupSizes[t]++, n++, r++);
    r > 0 && this._cGroup > t && (this._cIndex += r);
  }
  clearGroup(t) {
    if (t < this.length) {
      const e = this.groupSizes[t], n = this.indexOfGroup(t), r = n + e;
      this.groupSizes[t] = 0;
      for (let s = n; s < r; s++) this.tag.deleteRule(n);
      e > 0 && this._cGroup > t && (this._cIndex -= e);
    }
  }
  getGroup(t) {
    let e = "";
    if (t >= this.length || this.groupSizes[t] === 0) return e;
    const n = this.groupSizes[t], r = this.indexOfGroup(t), s = r + n;
    for (let o = r; o < s; o++) e += this.tag.getRule(o) + st;
    return e;
  }
}, hr = `style[${q}][${Dt}="${mt}"]`, dr = new RegExp(`^${q}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`), Ge = (t) => typeof ShadowRoot < "u" && t instanceof ShadowRoot || "host" in t && t.nodeType === 11, pe = (t) => {
  if (!t) return document;
  if (Ge(t)) return t;
  if ("getRootNode" in t) {
    const e = t.getRootNode();
    if (Ge(e)) return e;
  }
  return document;
}, pr = (t, e, n) => {
  const r = n.split(",");
  let s;
  for (let o = 0, c = r.length; o < c; o++) (s = r[o]) && t.registerName(e, s);
}, gr = (t, e) => {
  var n;
  const r = ((n = e.textContent) !== null && n !== void 0 ? n : "").split(st), s = [];
  for (let o = 0, c = r.length; o < c; o++) {
    const i = r[o].trim();
    if (!i) continue;
    const a = i.match(dr);
    if (a) {
      const l = 0 | parseInt(a[1], 10), f = a[2];
      l !== 0 && (Kn(f, l), pr(t, f, a[3]), t.getTag().insertRules(l, s)), s.length = 0;
    } else s.push(i);
  }
}, ne = (t) => {
  const e = pe(t.options.target).querySelectorAll(hr);
  for (let n = 0, r = e.length; n < r; n++) {
    const s = e[n];
    s && s.getAttribute(q) !== sn && (gr(t, s), s.parentNode && s.parentNode.removeChild(s));
  }
};
let xt = !1;
function ge() {
  if (xt !== !1) return xt;
  if (typeof document < "u") {
    const t = document.head.querySelector('meta[property="csp-nonce"]');
    if (t) return xt = t.nonce || t.getAttribute("content") || void 0;
    const e = document.head.querySelector('meta[name="sc-nonce"]');
    if (e) return xt = e.getAttribute("content") || void 0;
  }
  return xt = typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : void 0;
}
const gn = (t, e) => {
  const n = document.head, r = t || n, s = document.createElement("style"), o = ((a) => {
    const l = Array.from(a.querySelectorAll(`style[${q}]`));
    return l[l.length - 1];
  })(r), c = o !== void 0 ? o.nextSibling : null;
  s.setAttribute(q, sn), s.setAttribute(Dt, mt);
  const i = e || ge();
  return i && s.setAttribute("nonce", i), r.insertBefore(s, c), s;
}, mr = class {
  constructor(t, e) {
    this.element = gn(t, e), this.element.appendChild(document.createTextNode("")), this.sheet = ((n) => {
      var r;
      if (n.sheet) return n.sheet;
      const s = (r = n.getRootNode().styleSheets) !== null && r !== void 0 ? r : document.styleSheets;
      for (let o = 0, c = s.length; o < c; o++) {
        const i = s[o];
        if (i.ownerNode === n) return i;
      }
      throw z(17);
    })(this.element), this.length = 0;
  }
  insertRule(t, e) {
    try {
      return this.sheet.insertRule(e, t), this.length++, !0;
    } catch {
      return !1;
    }
  }
  deleteRule(t) {
    this.sheet.deleteRule(t), this.length--;
  }
  getRule(t) {
    const e = this.sheet.cssRules[t];
    return e && e.cssText ? e.cssText : "";
  }
}, yr = class {
  constructor(t, e) {
    this.element = gn(t, e), this.nodes = this.element.childNodes, this.length = 0;
  }
  insertRule(t, e) {
    if (t <= this.length && t >= 0) {
      const n = document.createTextNode(e);
      return this.element.insertBefore(n, this.nodes[t] || null), this.length++, !0;
    }
    return !1;
  }
  deleteRule(t) {
    this.element.removeChild(this.nodes[t]), this.length--;
  }
  getRule(t) {
    return t < this.length ? this.nodes[t].textContent : "";
  }
}, br = class {
  constructor(t) {
    this.rules = [], this.length = 0;
  }
  insertRule(t, e) {
    return t <= this.length && (t === this.length ? this.rules.push(e) : this.rules.splice(t, 0, e), this.length++, !0);
  }
  deleteRule(t) {
    this.rules.splice(t, 1), this.length--;
  }
  getRule(t) {
    return t < this.length ? this.rules[t] : "";
  }
};
let ze = dt;
const Sr = { isServer: !dt, useCSSOMInjection: !Yn };
class it {
  static registerId(e) {
    return et(e);
  }
  constructor(e = yt, n = {}, r) {
    this.options = Object.assign(Object.assign({}, Sr), e), this.gs = n, this.keyframeIds = /* @__PURE__ */ new Set(), this.names = new Map(r), this.server = !!e.isServer, !this.server && dt && ze && (ze = !1, ne(this)), Ie(this, () => ((s) => {
      const o = s.getTag(), { length: c } = o;
      let i = "";
      for (let a = 0; a < c; a++) {
        const l = Un(a);
        if (l === void 0) continue;
        const f = s.names.get(l);
        if (f === void 0 || !f.size) continue;
        const u = o.getGroup(a);
        if (u.length === 0) continue;
        const h = q + ".g" + a + '[id="' + l + '"]';
        let y = "";
        for (const p of f) p.length > 0 && (y += p + ",");
        i += u + h + '{content:"' + y + '"}' + st;
      }
      return i;
    })(this));
  }
  rehydrate() {
    !this.server && dt && ne(this);
  }
  reconstructWithOptions(e, n = !0) {
    const r = new it(Object.assign(Object.assign({}, this.options), e), this.gs, n && this.names || void 0);
    return r.keyframeIds = new Set(this.keyframeIds), !this.server && dt && e.target !== this.options.target && pe(this.options.target) !== pe(e.target) && ne(r), r;
  }
  allocateGSInstance(e) {
    return this.gs[e] = (this.gs[e] || 0) + 1;
  }
  getTag() {
    return this.tag || (this.tag = (e = (({ isServer: n, useCSSOMInjection: r, target: s, nonce: o }) => n ? new br(s) : r ? new mr(s, o) : new yr(s, o))(this.options), new fr(e)));
    var e;
  }
  hasNameForId(e, n) {
    var r, s;
    return (s = (r = this.names.get(e)) === null || r === void 0 ? void 0 : r.has(n)) !== null && s !== void 0 && s;
  }
  registerName(e, n) {
    et(e), e.startsWith(on) && this.keyframeIds.add(e);
    const r = this.names.get(e);
    r ? r.add(n) : this.names.set(e, /* @__PURE__ */ new Set([n]));
  }
  insertRules(e, n, r) {
    this.registerName(e, n), this.getTag().insertRules(et(e), r);
  }
  clearNames(e) {
    this.names.has(e) && this.names.get(e).clear();
  }
  clearRules(e) {
    this.getTag().clearGroup(et(e)), this.clearNames(e);
  }
  clearTag() {
    this.tag = void 0;
  }
}
const mn = /* @__PURE__ */ new WeakSet(), wr = { animationIterationCount: 1, aspectRatio: 1, borderImageOutset: 1, borderImageSlice: 1, borderImageWidth: 1, columnCount: 1, columns: 1, flex: 1, flexGrow: 1, flexShrink: 1, gridRow: 1, gridRowEnd: 1, gridRowSpan: 1, gridRowStart: 1, gridColumn: 1, gridColumnEnd: 1, gridColumnSpan: 1, gridColumnStart: 1, fontWeight: 1, lineHeight: 1, opacity: 1, order: 1, orphans: 1, scale: 1, tabSize: 1, widows: 1, zIndex: 1, zoom: 1, WebkitLineClamp: 1, fillOpacity: 1, floodOpacity: 1, stopOpacity: 1, strokeDasharray: 1, strokeDashoffset: 1, strokeMiterlimit: 1, strokeOpacity: 1, strokeWidth: 1 };
function Cr(t, e) {
  return e == null || typeof e == "boolean" || e === "" ? "" : typeof e != "number" || e === 0 || t in wr || t.startsWith("--") ? String(e).trim() : e + "px";
}
const X = 47;
function De(t) {
  if (t.charCodeAt(0) === 45 && t.charCodeAt(1) === 45) return t;
  let e = "";
  for (let n = 0; n < t.length; n++) {
    const r = t.charCodeAt(n);
    e += r >= 65 && r <= 90 ? "-" + String.fromCharCode(r + 32) : t[n];
  }
  return e.startsWith("ms-") ? "-" + e : e;
}
const yn = Symbol.for("sc-keyframes");
function xr(t) {
  return typeof t == "object" && t !== null && yn in t;
}
function bn(t) {
  return wt(t) && !(t.prototype && t.prototype.isReactComponent);
}
const Sn = (t) => t == null || t === !1 || t === "", $r = Symbol.for("react.client.reference");
function We(t) {
  return t.$$typeof === $r;
}
function wn(t, e) {
  for (const n in t) {
    const r = t[n];
    t.hasOwnProperty(n) && !Sn(r) && (Array.isArray(r) && mn.has(r) || wt(r) ? e.push(De(n) + ":", r, ";") : Rt(r) ? (e.push(n + " {"), wn(r, e), e.push("}")) : e.push(De(n) + ": " + Cr(n, r) + ";"));
  }
}
function Z(t, e, n, r, s = []) {
  if (Sn(t)) return s;
  const o = typeof t;
  if (o === "string") return s.push(t), s;
  if (o === "function") {
    if (We(t)) return s;
    if (bn(t) && e) {
      const c = t(e);
      return Z(c, e, n, r, s);
    }
    return s.push(t), s;
  }
  if (Array.isArray(t)) {
    for (let c = 0; c < t.length; c++) Z(t[c], e, n, r, s);
    return s;
  }
  return Pe(t) ? (s.push(`.${t.styledComponentId}`), s) : xr(t) ? (n ? (t.inject(n, r), s.push(t.getName(r))) : s.push(t), s) : We(t) ? s : Rt(t) ? t.toString !== Object.prototype.toString ? (s.push(t.toString()), s) : (wn(t, s), s) : (s.push(t.toString()), s);
}
const Pr = an(mt), tt = A ? /* @__PURE__ */ new WeakMap() : null;
function Ir(t, e) {
  if (!tt) return null;
  const n = tt.get(t);
  if (!n) return null;
  const r = e.names.get(t.componentId);
  if (!r) return null;
  let s = "";
  for (const o of r) {
    const c = n.get(o);
    if (!c) return null;
    s += c;
  }
  return s;
}
class vr {
  constructor(e, n, r) {
    this.rules = e, this.componentId = n, this.baseHash = nt(Pr, n), this.baseStyle = r, it.registerId(n);
  }
  generateAndInjectStyles(e, n, r) {
    let s = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e, n, r) : "";
    {
      let o = "";
      for (let c = 0; c < this.rules.length; c++) {
        const i = this.rules[c];
        if (typeof i == "string") o += i;
        else if (i) if (bn(i)) {
          const a = i(e);
          typeof a == "string" ? o += a : a != null && a !== !1 && (o += At(Z(a, e, n, r)));
        } else o += At(Z(i, e, n, r));
      }
      if (o) {
        this.dynamicNameCache || (this.dynamicNameCache = /* @__PURE__ */ new Map());
        const c = r.hash ? r.hash + o : o;
        let i = this.dynamicNameCache.get(c);
        if (!i) {
          if (i = Ce(nt(nt(this.baseHash, r.hash), o) >>> 0), this.dynamicNameCache.size >= 200) {
            const a = this.dynamicNameCache.keys().next().value;
            a !== void 0 && this.dynamicNameCache.delete(a);
          }
          this.dynamicNameCache.set(c, i);
        }
        if (!n.hasNameForId(this.componentId, i)) if (A && function(a, l) {
          var f, u;
          return (u = (f = tt == null ? void 0 : tt.get(a)) === null || f === void 0 ? void 0 : f.has(l)) !== null && u !== void 0 && u;
        }(this, i)) n.registerName(this.componentId, i);
        else {
          const a = r(o, "." + i, void 0, this.componentId);
          A && function(l, f, u) {
            if (!tt) return;
            let h = tt.get(l);
            h || (h = /* @__PURE__ */ new Map(), tt.set(l, h)), h.set(f, hn(u));
          }(this, i, a), n.insertRules(this.componentId, i, a);
        }
        s = It(s, i);
      }
    }
    return s;
  }
}
const Or = /&/g;
function ve(t, e) {
  let n = 0;
  for (; --e >= 0 && t.charCodeAt(e) === 92; ) n++;
  return !(1 & ~n);
}
function re(t) {
  const e = t.length;
  let n = "", r = 0, s = 0, o = 0, c = !1, i = !1;
  for (let a = 0; a < e; a++) {
    const l = t.charCodeAt(a);
    if (o !== 0 || c || l !== X || t.charCodeAt(a + 1) !== 42) if (c) l === 42 && t.charCodeAt(a + 1) === X && (c = !1, a++);
    else if (l !== 34 && l !== 39 || ve(t, a)) {
      if (o === 0) if (l === 123) s++;
      else if (l === 125) {
        if (s--, s < 0) {
          i = !0;
          let f = a + 1;
          for (; f < e; ) {
            const u = t.charCodeAt(f);
            if (u === 59 || u === 10) break;
            f++;
          }
          f < e && t.charCodeAt(f) === 59 && f++, s = 0, a = f - 1, r = f;
          continue;
        }
        s === 0 && (n += t.substring(r, a + 1), r = a + 1);
      } else l === 59 && s === 0 && (n += t.substring(r, a + 1), r = a + 1);
    } else o === 0 ? o = l : o === l && (o = 0);
    else c = !0, a++;
  }
  return i || s !== 0 || o !== 0 ? (r < e && s === 0 && o === 0 && (n += t.substring(r)), n) : t;
}
function Cn(t, e) {
  const n = e + " ", r = "," + n;
  for (let s = 0; s < t.length; s++) {
    const o = t[s];
    if (o.type === "rule") {
      o.value = (n + o.value).replaceAll(",", r);
      const c = o.props, i = [];
      for (let a = 0; a < c.length; a++) i[a] = n + c[a];
      o.props = i;
    }
    Array.isArray(o.children) && o.type !== "@keyframes" && Cn(o.children, e);
  }
  return t;
}
function Ft({ options: t = yt, plugins: e = Se } = yt) {
  let n, r, s;
  const o = (h, y, p) => p.startsWith(r) && p.endsWith(r) && p.replaceAll(r, "").length > 0 ? `.${n}` : h, c = e.slice();
  c.push((h) => {
    h.type === kt && h.value.includes("&") && (s || (s = new RegExp(`\\${r}\\b`, "g")), h.props[0] = h.props[0].replace(Or, r).replace(s, o));
  }), t.prefix && c.push(qn), c.push(Bn);
  let i = [];
  const a = Ln(c.concat(Vn((h) => i.push(h)))), l = (h, y = "", p = "", w = "&") => {
    n = w, r = y, s = void 0;
    const T = function(d) {
      const F = d.indexOf("//") !== -1, W = d.indexOf("}") !== -1;
      if (!F && !W) return d;
      if (!F) return re(d);
      const P = d.length;
      let _ = "", m = 0, b = 0, J = 0, ct = 0, M = 0, Ct = !1;
      for (; b < P; ) {
        const G = d.charCodeAt(b);
        if (G !== 34 && G !== 39 || ve(d, b)) if (J === 0) if (G === X && b + 1 < P && d.charCodeAt(b + 1) === 42) {
          for (b += 2; b + 1 < P && (d.charCodeAt(b) !== 42 || d.charCodeAt(b + 1) !== X); ) b++;
          b += 2;
        } else if (G !== 40) if (G !== 41) if (ct > 0) b++;
        else if (G === 42 && b + 1 < P && d.charCodeAt(b + 1) === X) _ += d.substring(m, b), b += 2, m = b, Ct = !0;
        else if (G === X && b + 1 < P && d.charCodeAt(b + 1) === X) {
          for (_ += d.substring(m, b); b < P && d.charCodeAt(b) !== 10; ) b++;
          m = b, Ct = !0;
        } else G === 123 ? M++ : G === 125 && M--, b++;
        else ct > 0 && ct--, b++;
        else ct++, b++;
        else b++;
        else J === 0 ? J = G : J === G && (J = 0), b++;
      }
      return Ct ? (m < P && (_ += d.substring(m)), M === 0 ? _ : re(_)) : M === 0 ? d : re(d);
    }(h);
    let v = Dn(p || y ? p + " " + y + " { " + T + " }" : T);
    return t.namespace && (v = Cn(v, t.namespace)), i = [], zt(v, a), i;
  }, f = t;
  let u = fe;
  for (let h = 0; h < e.length; h++) e[h].name || z(15), u = nt(u, e[h].name);
  return f != null && f.namespace && (u = nt(u, f.namespace)), f != null && f.prefix && (u = nt(u, "p")), l.hash = u !== fe ? u.toString() : "", l;
}
var Be, se, oe;
const pt = new it(), bt = Ft();
let Le, Bt = null, ie = bt;
const Lt = A && (oe = (se = (Be = C).cache) === null || se === void 0 ? void 0 : se.call(Be, () => {
  pt.names.clear(), pt.keyframeIds.clear(), pt.clearTag(), Bt = null;
})) !== null && oe !== void 0 ? oe : null, Vt = { shouldForwardProp: void 0, styleSheet: pt, stylis: bt, stylisPlugins: void 0 }, Oe = A ? { Provider: ({ children: t }) => t, Consumer: ({ children: t }) => t(Vt) } : C.createContext(Vt), Dr = Oe.Consumer;
function Ae() {
  return A ? (Lt && Lt(), Bt || Vt) : C.useContext(Oe);
}
function Ar(t) {
  var e, n, r;
  if (A) {
    Lt && Lt();
    const u = Bt || Vt, h = t.stylisPlugins !== void 0 || t.namespace !== void 0 || t.enableVendorPrefixes !== void 0;
    h && (t.stylisPlugins && t.stylisPlugins !== Le ? (Le = t.stylisPlugins, ie = Ft({ options: { namespace: t.namespace, prefix: t.enableVendorPrefixes }, plugins: t.stylisPlugins })) : t.namespace === void 0 && t.enableVendorPrefixes === void 0 || (ie = Ft({ options: { namespace: t.namespace, prefix: t.enableVendorPrefixes }, plugins: (e = t.stylisPlugins) !== null && e !== void 0 ? e : u.stylisPlugins })));
    const y = h ? t.stylisPlugins === void 0 || t.stylisPlugins.length ? ie : bt : u.stylis, p = "shouldForwardProp" in t ? t.shouldForwardProp : u.shouldForwardProp, w = (n = t.stylisPlugins) !== null && n !== void 0 ? n : u.stylisPlugins;
    return Bt = y !== bt || p ? { shouldForwardProp: p, styleSheet: pt, stylis: y, stylisPlugins: w } : null, t.children;
  }
  const s = Ae(), { styleSheet: o } = s, c = C.useMemo(() => {
    let u = o;
    return t.sheet ? u = t.sheet : t.target ? u = u.reconstructWithOptions(t.nonce !== void 0 ? { target: t.target, nonce: t.nonce } : { target: t.target }, !1) : t.nonce !== void 0 && (u = u.reconstructWithOptions({ nonce: t.nonce })), t.disableCSSOMInjection && (u = u.reconstructWithOptions({ useCSSOMInjection: !1 })), u;
  }, [t.disableCSSOMInjection, t.nonce, t.sheet, t.target, o]), i = C.useMemo(() => {
    var u;
    return t.stylisPlugins === void 0 && t.namespace === void 0 && t.enableVendorPrefixes === void 0 ? s.stylis : Ft({ options: { namespace: t.namespace, prefix: t.enableVendorPrefixes }, plugins: (u = t.stylisPlugins) !== null && u !== void 0 ? u : s.stylisPlugins });
  }, [t.enableVendorPrefixes, t.namespace, t.stylisPlugins, s.stylis, s.stylisPlugins]), a = "shouldForwardProp" in t ? t.shouldForwardProp : s.shouldForwardProp, l = (r = t.stylisPlugins) !== null && r !== void 0 ? r : s.stylisPlugins, f = C.useMemo(() => ({ shouldForwardProp: a, styleSheet: c, stylis: i, stylisPlugins: l }), [a, c, i, l]);
  return C.createElement(Oe.Provider, { value: f }, t.children);
}
const ot = A ? { Provider: ({ children: t }) => t, Consumer: ({ children: t }) => t(void 0) } : C.createContext(void 0), Wr = ot.Consumer;
function Br() {
  const t = A ? void 0 : C.useContext(ot);
  if (!t) throw z(18);
  return t;
}
function Lr(t) {
  if (A) return t.children;
  const e = C.useContext(ot), n = C.useMemo(() => function(r, s) {
    if (!r) throw z(14);
    if (wt(r))
      return r(s);
    if (Array.isArray(r) || typeof r != "object") throw z(8);
    return s ? Object.assign(Object.assign({}, s), r) : r;
  }(t.theme, e), [t.theme, e]);
  return t.children ? C.createElement(ot.Provider, { value: n }, t.children) : null;
}
const ce = {};
function Rr(t, e) {
  const n = typeof t != "string" ? "sc" : cn(t);
  ce[n] = (ce[n] || 0) + 1;
  const r = n + "-" + xe(mt + n + ce[n]);
  return e ? e + "-" + r : r;
}
const Ve = pn(() => /* @__PURE__ */ new Set()), qe = /* @__PURE__ */ new Map();
function xn(t) {
  let e = qe.get(t);
  return e || (e = new RegExp("\\." + t + "(?![a-zA-Z0-9_-])", "g"), qe.set(t, e)), e;
}
function Ye(t, e, n) {
  const r = n.names.get(e);
  if (r) for (const s of r) {
    const o = xn(s);
    o.lastIndex = 0, t = t.replace(o, ":where(." + s + ")");
  }
  return t;
}
function kr(t, e, n) {
  const r = Pe(t), s = t, o = !he(t), { attrs: c = Se, componentId: i = Rr(e.displayName, e.parentComponentId), displayName: a = Xn(t) } = e, l = e.displayName && e.componentId ? cn(e.displayName) + "-" + e.componentId : e.componentId || i, f = r && s.attrs ? s.attrs.concat(c).filter(Boolean) : c;
  let { shouldForwardProp: u } = e;
  if (r && s.shouldForwardProp) {
    const w = s.shouldForwardProp;
    if (e.shouldForwardProp) {
      const T = e.shouldForwardProp;
      u = (v, d) => w(v, d) && T(v, d);
    } else u = w;
  }
  const h = new vr(n, l, r ? s.componentStyle : void 0);
  function y(w, T) {
    return function(v, d, F) {
      const { attrs: W, componentStyle: P, defaultProps: _, foldedComponentIds: m, styledComponentId: b, target: J } = v, ct = A ? void 0 : C.useContext(ot), M = Ae(), Ct = v.shouldForwardProp || M.shouldForwardProp, G = we(d, ct, _) || (A ? void 0 : yt);
      let at, Ut;
      at = function(N, E, lt) {
        const $ = Object.assign(Object.assign({}, E), { className: void 0, theme: lt }), Y = N.length > 1;
        for (let R = 0; R < N.length; R++) {
          const ut = N[R], Q = wt(ut) ? ut(Y ? Object.assign({}, $) : $) : ut;
          for (const O in Q) O === "className" ? $.className = It($.className, Q[O]) : O === "style" ? $.style = Object.assign(Object.assign({}, $.style), Q[O]) : O in E && E[O] === void 0 || ($[O] = Q[O]);
        }
        return "className" in E && typeof E.className == "string" && ($.className = It($.className, E.className)), $;
      }(W, d, G), Ut = P.generateAndInjectStyles(at, M.styleSheet, M.stylis);
      const Nt = at.as || J, Kt = function(N, E, lt, $) {
        const Y = {};
        for (const R in N) N[R] === void 0 || R[0] === "$" || R === "as" || R === "theme" && N.theme === lt || (R === "forwardedAs" ? Y.as = N.forwardedAs : $ && !$(R, E) || (Y[R] = N[R]));
        return Y;
      }(at, Nt, G, Ct);
      let Zt = It(m, b);
      Ut && (Zt += " " + Ut), at.className && (Zt += " " + at.className), Kt[he(Nt) && Nt.includes("-") ? "class" : "className"] = Zt, F && (Kt.ref = F);
      const ke = vn(Nt, Kt);
      if (A) {
        const N = Ve ? Ve() : null;
        let E = null, lt = 0, $ = "", Y = !0, R = P;
        for (; R; ) {
          const O = M.styleSheet.names.get(R.componentId);
          if (O) {
            lt += O.size;
            for (const I of O) N && N.has(I) || (E || (E = []), E.push(I), N && N.add(I));
          }
          if (E && Y) {
            let I = Ir(R, M.styleSheet);
            I === null ? Y = !1 : (R !== P && (I = Ye(I, R.componentId, M.styleSheet)), $ = I + $);
          }
          R = R.baseStyle;
        }
        if (E && !Y) {
          $ = "";
          const O = M.styleSheet.getTag();
          let I = P;
          for (; I; ) {
            let B = O.getGroup(et(I.componentId));
            B && I !== P && (B = Ye(B, I.componentId, M.styleSheet)), $ = B + $, I = I.baseStyle;
          }
        }
        let ut = "";
        if (M.styleSheet.keyframeIds.size > 0) {
          const O = M.styleSheet.getTag();
          for (const I of M.styleSheet.keyframeIds) {
            if (N && N.has(I)) continue;
            const B = O.getGroup(et(I));
            B && (ut += B, N && N.add(I));
          }
        }
        if ($ && N && E && E.length < lt) {
          const O = $.split(st);
          let I = "";
          for (let B = 0; B < O.length; B++) {
            const Jt = O[B];
            if (Jt) for (let Qt = 0; Qt < E.length; Qt++) {
              const Ne = xn(E[Qt]);
              if (Ne.lastIndex = 0, Ne.test(Jt)) {
                I += Jt + st;
                break;
              }
            }
          }
          $ = I;
        }
        const Q = dn(ut + $);
        if (Q) {
          const O = C.createElement("style", { [q]: "", key: "sc-" + P.componentId, children: Q });
          return C.createElement(C.Fragment, null, O, ke);
        }
      }
      return ke;
    }(p, w, T);
  }
  y.displayName = a;
  let p = C.forwardRef(y);
  return p.attrs = f, p.componentStyle = h, p.displayName = a, p.shouldForwardProp = u, p.foldedComponentIds = r ? It(s.foldedComponentIds, s.styledComponentId) : "", p.styledComponentId = l, p.target = r ? s.target : t, Object.defineProperty(p, "defaultProps", { get() {
    return this._foldedDefaultProps;
  }, set(w) {
    this._foldedDefaultProps = r ? function(T, ...v) {
      for (const d of v) de(T, d, !0);
      return T;
    }({}, s.defaultProps, w) : w;
  } }), Ie(p, () => `.${p.styledComponentId}`), o && $e(p, t, { attrs: !0, componentStyle: !0, displayName: !0, foldedComponentIds: !0, shouldForwardProp: !0, styledComponentId: !0, target: !0 }), p;
}
var Nr = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "blockquote", "body", "button", "br", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "menu", "meter", "nav", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "slot", "small", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use"]);
function He(t, e) {
  const n = [t[0]];
  for (let r = 0, s = e.length; r < s; r += 1) n.push(e[r], t[r + 1]);
  return n;
}
const Ue = (t) => (mn.add(t), t);
function Re(t, ...e) {
  if (wt(t) || Rt(t)) return Ue(Z(He(Se, [t, ...e])));
  const n = t;
  return e.length === 0 && n.length === 1 && typeof n[0] == "string" ? Z(n) : Ue(Z(He(n, e)));
}
function me(t, e, n = yt) {
  if (!e) throw z(1, e);
  const r = (s, ...o) => t(e, n, Re(s, ...o));
  return r.attrs = (s) => me(t, e, Object.assign(Object.assign({}, n), { attrs: Array.prototype.concat(n.attrs, s).filter(Boolean) })), r.withConfig = (s) => me(t, e, Object.assign(Object.assign({}, n), s)), r;
}
const $n = (t) => me(kr, t), jr = $n;
Nr.forEach((t) => {
  jr[t] = $n(t);
});
class _r {
  constructor(e, n) {
    this.instanceRules = /* @__PURE__ */ new Map(), this.rules = e, this.componentId = n, this.isStatic = function(r) {
      for (let s = 0; s < r.length; s += 1) {
        const o = r[s];
        if (wt(o) && !Pe(o)) return !1;
      }
      return !0;
    }(e), it.registerId(this.componentId);
  }
  removeStyles(e, n) {
    this.instanceRules.delete(e), this.rebuildGroup(n);
  }
  renderStyles(e, n, r, s) {
    const o = this.componentId;
    if (this.isStatic) {
      if (r.hasNameForId(o, o + e)) this.instanceRules.has(e) || this.computeRules(e, n, r, s);
      else {
        const i = this.computeRules(e, n, r, s);
        r.insertRules(o, i.name, i.rules);
      }
      return;
    }
    const c = this.instanceRules.get(e);
    if (this.computeRules(e, n, r, s), !r.server && c) {
      const i = c.rules, a = this.instanceRules.get(e).rules;
      if (i.length === a.length) {
        let l = !0;
        for (let f = 0; f < i.length; f++) if (i[f] !== a[f]) {
          l = !1;
          break;
        }
        if (l) return;
      }
    }
    this.rebuildGroup(r);
  }
  computeRules(e, n, r, s) {
    const o = At(Z(this.rules, n, r, s)), c = { name: this.componentId + e, rules: s(o, "") };
    return this.instanceRules.set(e, c), c;
  }
  rebuildGroup(e) {
    const n = this.componentId;
    e.clearRules(n);
    for (const r of this.instanceRules.values()) e.insertRules(n, r.name, r.rules);
  }
}
const Ke = pn(() => /* @__PURE__ */ new Set());
function Er(t, ...e) {
  const n = Re(t, ...e), r = `sc-global-${xe(JSON.stringify(n))}`, s = new _r(n, r), o = (c) => {
    const i = Ae(), a = A ? void 0 : C.useContext(ot);
    let l;
    if (l = i.styleSheet.allocateGSInstance(r), (A || i.styleSheet.server) && function(f, u, h, y, p) {
      if (s.isStatic) s.renderStyles(f, Hn, h, p);
      else {
        const w = Object.assign(Object.assign({}, u), { theme: we(u, y, o.defaultProps) });
        s.renderStyles(f, w, h, p);
      }
    }(l, c, i.styleSheet, a, i.stylis), A) {
      const f = typeof window > "u" ? s.instanceRules.get(l) : void 0, u = f ? hn(f.rules) : "";
      if (u) {
        s.instanceRules.delete(l);
        const h = Ke ? Ke() : null;
        if (h) {
          const y = s.isStatic ? r + i.stylis.hash : u;
          if (h.has(y)) return null;
          h.add(y);
        }
        return C.createElement("style", { key: r + "-" + l, "data-styled-global": r, children: dn(u) });
      }
    }
    return s.instanceRules.delete(l), null;
  };
  return C.memo(o);
}
function Gt(t, e, n, r, s) {
  for (const o in t) {
    const c = t[o], i = s ? s + "-" + o : o;
    if (typeof c == "object" && c !== null) {
      const a = {};
      Gt(c, e, a, r, i), n[o] = a;
    } else n[o] = r(i, c, o);
  }
}
function Pn(t, e, n, r) {
  let s = "";
  for (const o in t) {
    const c = t[o], i = e[o], a = r ? r + "-" + o : o;
    typeof c == "object" && c !== null ? typeof i == "object" && i !== null && (s += Pn(c, i, n, a)) : i !== void 0 && typeof i != "function" && (s += "--" + n + a + ":" + i + ";");
  }
  return s;
}
function Vr(t, e) {
  var n, r;
  const s = ((n = e == null ? void 0 : e.prefix) !== null && n !== void 0 ? n : "sc") + "-", o = (r = e == null ? void 0 : e.selector) !== null && r !== void 0 ? r : ":root", c = function(l, f) {
    const u = {};
    return Gt(l, f, u, (h) => "--" + f + h), u;
  }(t, s), i = function(l, f) {
    const u = {};
    return Gt(l, f, u, (h, y) => "var(--" + f + h + ", " + y + ")"), u;
  }(t, s), a = Er`
    ${o} {
      ${(l) => Pn(t, l.theme, s)}
    }
  `;
  return Object.assign(i, { GlobalStyle: a, raw: t, vars: c, resolve(l) {
    if (!dt) throw new Error("createTheme.resolve() is client-only");
    const f = l ?? document.documentElement;
    return function(u, h, y) {
      const p = {};
      return Gt(u, h, p, (w, T) => y.getPropertyValue("--" + h + w).trim() || T), p;
    }(t, s, getComputedStyle(f));
  } });
}
var In;
const $t = A ? /* @__PURE__ */ new WeakMap() : null;
class Tr {
  constructor(e, n) {
    this[In] = !0, this.inject = (r, s = bt) => {
      var o;
      const c = this.getName(s);
      if (!r.hasNameForId(this.id, c)) {
        const i = s.hash || "", a = A ? (o = $t == null ? void 0 : $t.get(this)) === null || o === void 0 ? void 0 : o.get(i) : void 0;
        if (a) r.insertRules(this.id, c, a);
        else {
          const l = s(this.rules, c, "@keyframes");
          if (A && $t) {
            let f = $t.get(this);
            f || (f = /* @__PURE__ */ new Map(), $t.set(this, f)), f.set(i, l);
          }
          r.insertRules(this.id, c, l);
        }
      }
    }, this.name = e, this.id = on + e, this.rules = n, et(this.id), Ie(this, () => {
      throw z(12, String(this.name));
    });
  }
  getName(e = bt) {
    return e.hash ? this.name + Ce(+e.hash >>> 0) : this.name;
  }
}
function qr(t, ...e) {
  const n = At(Re(t, ...e)), r = xe(n);
  return new Tr(r, n);
}
function Yr(t) {
  const e = C.forwardRef((n, r) => {
    const s = we(n, A ? void 0 : C.useContext(ot), t.defaultProps);
    return C.createElement(t, Object.assign(Object.assign({}, n), { theme: s, ref: r }));
  });
  return e.displayName = `WithTheme(${ln(t)})`, $e(e, t);
}
In = yn;
const Mr = /^\s*<\/[a-z]/i;
class Hr {
  constructor({ nonce: e } = {}) {
    this._emitSheetCSS = () => {
      const n = this.instance.toString();
      if (!n) return "";
      const r = this.instance.options.nonce || ge();
      return `<style ${At([r && `nonce="${r}"`, `${q}="true"`, `${Dt}="${mt}"`].filter(Boolean), " ")}>${n}</style>`;
    }, this.getStyleTags = () => {
      if (this.sealed) throw z(2);
      return this._emitSheetCSS();
    }, this.getStyleElement = () => {
      if (this.sealed) throw z(2);
      const n = this.instance.toString();
      if (!n) return [];
      const r = { [q]: "", [Dt]: mt, dangerouslySetInnerHTML: { __html: n } }, s = this.instance.options.nonce || ge();
      return s && (r.nonce = s), [C.createElement("style", Object.assign({}, r, { key: "sc-0-0" }))];
    }, this.seal = () => {
      this.sealed = !0;
    }, this.instance = new it({ isServer: !0, nonce: e }), this.sealed = !1;
  }
  collectStyles(e) {
    if (this.sealed) throw z(2);
    return C.createElement(Ar, { sheet: this.instance }, e);
  }
  interleaveWithNodeStream(e) {
    if (this.sealed) throw z(2);
    this.seal();
    const { Transform: n } = require("stream"), { instance: r, _emitSheetCSS: s } = this, o = new n({ transform: function(c, i, a) {
      const l = c.toString(), f = s();
      if (r.clearTag(), Mr.test(l)) {
        const u = l.indexOf(">") + 1, h = l.slice(0, u), y = l.slice(u);
        this.push(h + f + y);
      } else this.push(f + l);
      a();
    } });
    if ("on" in e && typeof e.on == "function" && "pipe" in e) {
      const c = e;
      return c.on("error", (i) => {
        o.emit("error", i);
      }), c.pipe(o);
    }
    if ("pipe" in e && typeof e.pipe == "function") return e.pipe(o);
    throw new Error("Unsupported stream type");
  }
}
const Ur = { StyleSheet: it, mainSheet: pt }, Ze = /:(?:(first)-child|(last)-child|(only)-child|(nth-child)\(([^()]+)\)|(nth-last-child)\(([^()]+)\))/g, ht = `:not(style[${q}])`, ae = `style[${q}]`;
function Fr(t) {
  return t.indexOf("-child") === -1 ? t : (Ze.lastIndex = 0, t.replace(Ze, (e, n, r, s, o, c, i, a) => n ? `:nth-child(1 of ${ht})` : r ? `:nth-last-child(1 of ${ht})` : s ? `:nth-child(1 of ${ht}):nth-last-child(1 of ${ht})` : o ? c.indexOf(" of ") !== -1 ? e : `:nth-child(${c} of ${ht})` : a.indexOf(" of ") !== -1 ? e : `:nth-last-child(${a} of ${ht})`));
}
function Gr(t, e) {
  if (t.indexOf("+") === -1) return;
  let n = 0, r = 0;
  for (let s = 0; s < t.length; s++) {
    const o = t.charCodeAt(s);
    if (o === 40) n++;
    else if (o === 41) n--;
    else if (o === 91) r++;
    else if (o === 93) r--;
    else if (o === 43 && n === 0 && r === 0 && !ve(t, s)) {
      const c = t.substring(0, s), i = t.substring(s + 1);
      e.push(c + "+" + ae + "+" + i), e.push(c + "+" + ae + "+" + ae + "+" + i);
    }
  }
}
function Kr(t) {
  if (t.type === kt) {
    const e = t.props, n = [];
    for (let r = 0; r < e.length; r++) {
      const s = Fr(e[r]);
      n.push(s), Gr(s, n);
    }
    t.props = n;
  }
}
export {
  Hr as ServerStyleSheet,
  Dr as StyleSheetConsumer,
  Oe as StyleSheetContext,
  Ar as StyleSheetManager,
  Wr as ThemeConsumer,
  ot as ThemeContext,
  Lr as ThemeProvider,
  Ur as __PRIVATE__,
  Er as createGlobalStyle,
  Vr as createTheme,
  Re as css,
  jr as default,
  Pe as isStyledComponent,
  qr as keyframes,
  jr as styled,
  Kr as stylisPluginRSC,
  Br as useTheme,
  mt as version,
  Yr as withTheme
};
