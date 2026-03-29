var _content = function() {
    "use strict";
    var qw = Object.defineProperty;
    var Sh = lt => {
        throw TypeError(lt)
    }
    ;
    var Dw = (lt, Qe, ct) => Qe in lt ? qw(lt, Qe, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: ct
    }) : lt[Qe] = ct;
    var vt = (lt, Qe, ct) => Dw(lt, typeof Qe != "symbol" ? Qe + "" : Qe, ct)
      , rc = (lt, Qe, ct) => Qe.has(lt) || Sh("Cannot " + ct);
    var fs = (lt, Qe, ct) => (rc(lt, Qe, "read from private field"),
    ct ? ct.call(lt) : Qe.get(lt))
      , ds = (lt, Qe, ct) => Qe.has(lt) ? Sh("Cannot add the same private member more than once") : Qe instanceof WeakSet ? Qe.add(lt) : Qe.set(lt, ct)
      , Ah = (lt, Qe, ct, hs) => (rc(lt, Qe, "write to private field"),
    hs ? hs.call(lt, ct) : Qe.set(lt, ct),
    ct)
      , ic = (lt, Qe, ct) => (rc(lt, Qe, "access private method"),
    ct);
    var ni, Pr, Ks, Li, zs, Pi, _h, kh;
    function lt(r) {
        return r
    }
    var Qe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
    function ct(r) {
        return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r
    }
    function hs(r) {
        if (r.__esModule)
            return r;
        var o = r.default;
        if (typeof o == "function") {
            var a = function c() {
                return this instanceof c ? Reflect.construct(o, arguments, this.constructor) : o.apply(this, arguments)
            };
            a.prototype = o.prototype
        } else
            a = {};
        return Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        Object.keys(r).forEach(function(c) {
            var h = Object.getOwnPropertyDescriptor(r, c);
            Object.defineProperty(a, c, h.get ? h : {
                enumerable: !0,
                get: function() {
                    return r[c]
                }
            })
        }),
        a
    }
    var ps = {
        exports: {}
    };
    /**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
    ps.exports,
    function(r, o) {
        (function() {
            var a, c = "4.17.21", h = 200, y = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", b = "Expected a function", k = "Invalid `variable` option passed into `_.template`", _ = "__lodash_hash_undefined__", O = 500, Z = "__lodash_placeholder__", ue = 1, pe = 2, G = 4, W = 1, D = 2, he = 1, J = 2, Oe = 4, Te = 8, Re = 16, Ie = 32, me = 64, l = 128, R = 256, j = 512, Y = 30, z = "...", de = 800, N = 16, V = 1, q = 2, K = 3, te = 1 / 0, ae = 9007199254740991, re = 17976931348623157e292, ce = NaN, _e = 4294967295, He = _e - 1, Ze = _e >>> 1, tt = [["ary", l], ["bind", he], ["bindKey", J], ["curry", Te], ["curryRight", Re], ["flip", j], ["partial", Ie], ["partialRight", me], ["rearg", R]], ot = "[object Arguments]", un = "[object Array]", On = "[object AsyncFunction]", ln = "[object Boolean]", Lt = "[object Date]", at = "[object DOMException]", Dt = "[object Error]", Et = "[object Function]", Sn = "[object GeneratorFunction]", Gt = "[object Map]", ri = "[object Number]", xo = "[object Null]", Yt = "[object Object]", An = "[object Promise]", Hu = "[object Proxy]", ii = "[object RegExp]", cn = "[object Set]", Pt = "[object String]", Yn = "[object Symbol]", oi = "[object Undefined]", ke = "[object WeakMap]", Mt = "[object WeakSet]", si = "[object ArrayBuffer]", Mr = "[object DataView]", To = "[object Float32Array]", Mi = "[object Float64Array]", Oi = "[object Int8Array]", fr = "[object Int16Array]", fn = "[object Int32Array]", Rn = "[object Uint8Array]", Xn = "[object Uint8ClampedArray]", Io = "[object Uint16Array]", Or = "[object Uint32Array]", Gs = /\b__p \+= '';/g, Ys = /\b(__p \+=) '' \+/g, Fu = /(__e\(.*?\)|\b__t\)) \+\n'';/g, dr = /&(?:amp|lt|gt|quot|#39);/g, Rr = /[&<>"']/g, Xs = RegExp(dr.source), Zs = RegExp(Rr.source), Xt = /<%-([\s\S]+?)%>/g, Ot = /<%([\s\S]+?)%>/g, Ri = /<%=([\s\S]+?)%>/g, Wu = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Qs = /^\w*$/, Js = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Zn = /[\\^$.*+?()[\]{}|]/g, Nr = RegExp(Zn.source), ai = /^\s+/, Ni = /\s/, Uu = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Vu = /\{\n\/\* \[wrapped with (.+)\] \*/, ju = /,? & /, ea = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ku = /[()=,{}\[\]\/\s]/, zu = /\\(\\)?/g, ta = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, na = /\w*$/, $r = /^[-+]0x[0-9a-f]+$/i, ra = /^0b[01]+$/i, Bo = /^\[object .+?Constructor\]$/, Lo = /^0o[0-7]+$/i, $i = /^(?:0|[1-9]\d*)$/, ia = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, qi = /($^)/, ui = /['\n\r\u2028\u2029\\]/g, li = "\\ud800-\\udfff", oa = "\\u0300-\\u036f", sa = "\\ufe20-\\ufe2f", aa = "\\u20d0-\\u20ff", ua = oa + sa + aa, Di = "\\u2700-\\u27bf", la = "a-z\\xdf-\\xf6\\xf8-\\xff", Gu = "\\xac\\xb1\\xd7\\xf7", ca = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", fa = "\\u2000-\\u206f", Po = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Mo = "A-Z\\xc0-\\xd6\\xd8-\\xde", xt = "\\ufe0e\\ufe0f", hr = Gu + ca + fa + Po, qr = "['’]", Yu = "[" + li + "]", da = "[" + hr + "]", Dr = "[" + ua + "]", Oo = "\\d+", Hi = "[" + Di + "]", Ro = "[" + la + "]", ha = "[^" + li + hr + Oo + Di + la + Mo + "]", No = "\\ud83c[\\udffb-\\udfff]", dn = "(?:" + Dr + "|" + No + ")", $o = "[^" + li + "]", pr = "(?:\\ud83c[\\udde6-\\uddff]){2}", qo = "[\\ud800-\\udbff][\\udc00-\\udfff]", Hr = "[" + Mo + "]", Qn = "\\u200d", Jn = "(?:" + Ro + "|" + ha + ")", Do = "(?:" + Hr + "|" + ha + ")", pa = "(?:" + qr + "(?:d|ll|m|re|s|t|ve))?", Fr = "(?:" + qr + "(?:D|LL|M|RE|S|T|VE))?", Ho = dn + "?", Fi = "[" + xt + "]?", ga = "(?:" + Qn + "(?:" + [$o, pr, qo].join("|") + ")" + Fi + Ho + ")*", ya = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Xu = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Fo = Fi + Ho + ga, Zu = "(?:" + [Hi, pr, qo].join("|") + ")" + Fo, Qu = "(?:" + [$o + Dr + "?", Dr, pr, qo, Yu].join("|") + ")", Wo = RegExp(qr, "g"), Ju = RegExp(Dr, "g"), Uo = RegExp(No + "(?=" + No + ")|" + Qu + Fo, "g"), el = RegExp([Hr + "?" + Ro + "+" + pa + "(?=" + [da, Hr, "$"].join("|") + ")", Do + "+" + Fr + "(?=" + [da, Hr + Jn, "$"].join("|") + ")", Hr + "?" + Jn + "+" + pa, Hr + "+" + Fr, Xu, ya, Oo, Zu].join("|"), "g"), tl = RegExp("[" + Qn + li + ua + xt + "]"), nl = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, rl = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], il = -1, st = {};
            st[To] = st[Mi] = st[Oi] = st[fr] = st[fn] = st[Rn] = st[Xn] = st[Io] = st[Or] = !0,
            st[ot] = st[un] = st[si] = st[ln] = st[Mr] = st[Lt] = st[Dt] = st[Et] = st[Gt] = st[ri] = st[Yt] = st[ii] = st[cn] = st[Pt] = st[ke] = !1;
            var nt = {};
            nt[ot] = nt[un] = nt[si] = nt[Mr] = nt[ln] = nt[Lt] = nt[To] = nt[Mi] = nt[Oi] = nt[fr] = nt[fn] = nt[Gt] = nt[ri] = nt[Yt] = nt[ii] = nt[cn] = nt[Pt] = nt[Yn] = nt[Rn] = nt[Xn] = nt[Io] = nt[Or] = !0,
            nt[Dt] = nt[Et] = nt[ke] = !1;
            var ma = {
                À: "A",
                Á: "A",
                Â: "A",
                Ã: "A",
                Ä: "A",
                Å: "A",
                à: "a",
                á: "a",
                â: "a",
                ã: "a",
                ä: "a",
                å: "a",
                Ç: "C",
                ç: "c",
                Ð: "D",
                ð: "d",
                È: "E",
                É: "E",
                Ê: "E",
                Ë: "E",
                è: "e",
                é: "e",
                ê: "e",
                ë: "e",
                Ì: "I",
                Í: "I",
                Î: "I",
                Ï: "I",
                ì: "i",
                í: "i",
                î: "i",
                ï: "i",
                Ñ: "N",
                ñ: "n",
                Ò: "O",
                Ó: "O",
                Ô: "O",
                Õ: "O",
                Ö: "O",
                Ø: "O",
                ò: "o",
                ó: "o",
                ô: "o",
                õ: "o",
                ö: "o",
                ø: "o",
                Ù: "U",
                Ú: "U",
                Û: "U",
                Ü: "U",
                ù: "u",
                ú: "u",
                û: "u",
                ü: "u",
                Ý: "Y",
                ý: "y",
                ÿ: "y",
                Æ: "Ae",
                æ: "ae",
                Þ: "Th",
                þ: "th",
                ß: "ss",
                Ā: "A",
                Ă: "A",
                Ą: "A",
                ā: "a",
                ă: "a",
                ą: "a",
                Ć: "C",
                Ĉ: "C",
                Ċ: "C",
                Č: "C",
                ć: "c",
                ĉ: "c",
                ċ: "c",
                č: "c",
                Ď: "D",
                Đ: "D",
                ď: "d",
                đ: "d",
                Ē: "E",
                Ĕ: "E",
                Ė: "E",
                Ę: "E",
                Ě: "E",
                ē: "e",
                ĕ: "e",
                ė: "e",
                ę: "e",
                ě: "e",
                Ĝ: "G",
                Ğ: "G",
                Ġ: "G",
                Ģ: "G",
                ĝ: "g",
                ğ: "g",
                ġ: "g",
                ģ: "g",
                Ĥ: "H",
                Ħ: "H",
                ĥ: "h",
                ħ: "h",
                Ĩ: "I",
                Ī: "I",
                Ĭ: "I",
                Į: "I",
                İ: "I",
                ĩ: "i",
                ī: "i",
                ĭ: "i",
                į: "i",
                ı: "i",
                Ĵ: "J",
                ĵ: "j",
                Ķ: "K",
                ķ: "k",
                ĸ: "k",
                Ĺ: "L",
                Ļ: "L",
                Ľ: "L",
                Ŀ: "L",
                Ł: "L",
                ĺ: "l",
                ļ: "l",
                ľ: "l",
                ŀ: "l",
                ł: "l",
                Ń: "N",
                Ņ: "N",
                Ň: "N",
                Ŋ: "N",
                ń: "n",
                ņ: "n",
                ň: "n",
                ŋ: "n",
                Ō: "O",
                Ŏ: "O",
                Ő: "O",
                ō: "o",
                ŏ: "o",
                ő: "o",
                Ŕ: "R",
                Ŗ: "R",
                Ř: "R",
                ŕ: "r",
                ŗ: "r",
                ř: "r",
                Ś: "S",
                Ŝ: "S",
                Ş: "S",
                Š: "S",
                ś: "s",
                ŝ: "s",
                ş: "s",
                š: "s",
                Ţ: "T",
                Ť: "T",
                Ŧ: "T",
                ţ: "t",
                ť: "t",
                ŧ: "t",
                Ũ: "U",
                Ū: "U",
                Ŭ: "U",
                Ů: "U",
                Ű: "U",
                Ų: "U",
                ũ: "u",
                ū: "u",
                ŭ: "u",
                ů: "u",
                ű: "u",
                ų: "u",
                Ŵ: "W",
                ŵ: "w",
                Ŷ: "Y",
                ŷ: "y",
                Ÿ: "Y",
                Ź: "Z",
                Ż: "Z",
                Ž: "Z",
                ź: "z",
                ż: "z",
                ž: "z",
                Ĳ: "IJ",
                ĳ: "ij",
                Œ: "Oe",
                œ: "oe",
                ŉ: "'n",
                ſ: "s"
            }
              , Vo = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }
              , va = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"',
                "&#39;": "'"
            }
              , ba = {
                "\\": "\\",
                "'": "'",
                "\n": "n",
                "\r": "r",
                "\u2028": "u2028",
                "\u2029": "u2029"
            }
              , jo = parseFloat
              , ol = parseInt
              , wa = typeof Qe == "object" && Qe && Qe.Object === Object && Qe
              , sl = typeof self == "object" && self && self.Object === Object && self
              , ft = wa || sl || Function("return this")()
              , Wi = o && !o.nodeType && o
              , Nn = Wi && !0 && r && !r.nodeType && r
              , Ca = Nn && Nn.exports === Wi
              , Ko = Ca && wa.process
              , Zt = function() {
                try {
                    var S = Nn && Nn.require && Nn.require("util").types;
                    return S || Ko && Ko.binding && Ko.binding("util")
                } catch {}
            }()
              , n = Zt && Zt.isArrayBuffer
              , s = Zt && Zt.isDate
              , u = Zt && Zt.isMap
              , d = Zt && Zt.isRegExp
              , p = Zt && Zt.isSet
              , g = Zt && Zt.isTypedArray;
            function v(S, B, I) {
                switch (I.length) {
                case 0:
                    return S.call(B);
                case 1:
                    return S.call(B, I[0]);
                case 2:
                    return S.call(B, I[0], I[1]);
                case 3:
                    return S.call(B, I[0], I[1], I[2])
                }
                return S.apply(B, I)
            }
            function T(S, B, I, ne) {
                for (var ie = -1, Ce = S == null ? 0 : S.length; ++ie < Ce; ) {
                    var Se = S[ie];
                    B(ne, Se, I(Se), S)
                }
                return ne
            }
            function E(S, B) {
                for (var I = -1, ne = S == null ? 0 : S.length; ++I < ne && B(S[I], I, S) !== !1; )
                    ;
                return S
            }
            function M(S, B) {
                for (var I = S == null ? 0 : S.length; I-- && B(S[I], I, S) !== !1; )
                    ;
                return S
            }
            function X(S, B) {
                for (var I = -1, ne = S == null ? 0 : S.length; ++I < ne; )
                    if (!B(S[I], I, S))
                        return !1;
                return !0
            }
            function ee(S, B) {
                for (var I = -1, ne = S == null ? 0 : S.length, ie = 0, Ce = []; ++I < ne; ) {
                    var Se = S[I];
                    B(Se, I, S) && (Ce[ie++] = Se)
                }
                return Ce
            }
            function F(S, B) {
                var I = S == null ? 0 : S.length;
                return !!I && it(S, B, 0) > -1
            }
            function fe(S, B, I) {
                for (var ne = -1, ie = S == null ? 0 : S.length; ++ne < ie; )
                    if (I(B, S[ne]))
                        return !0;
                return !1
            }
            function we(S, B) {
                for (var I = -1, ne = S == null ? 0 : S.length, ie = Array(ne); ++I < ne; )
                    ie[I] = B(S[I], I, S);
                return ie
            }
            function qe(S, B) {
                for (var I = -1, ne = B.length, ie = S.length; ++I < ne; )
                    S[ie + I] = B[I];
                return S
            }
            function $e(S, B, I, ne) {
                var ie = -1
                  , Ce = S == null ? 0 : S.length;
                for (ne && Ce && (I = S[++ie]); ++ie < Ce; )
                    I = B(I, S[ie], ie, S);
                return I
            }
            function bt(S, B, I, ne) {
                var ie = S == null ? 0 : S.length;
                for (ne && ie && (I = S[--ie]); ie--; )
                    I = B(I, S[ie], ie, S);
                return I
            }
            function dt(S, B) {
                for (var I = -1, ne = S == null ? 0 : S.length; ++I < ne; )
                    if (B(S[I], I, S))
                        return !0;
                return !1
            }
            var _n = gr("length");
            function kn(S) {
                return S.split("")
            }
            function Ke(S) {
                return S.match(ea) || []
            }
            function er(S, B, I) {
                var ne;
                return I(S, function(ie, Ce, Se) {
                    if (B(ie, Ce, Se))
                        return ne = Ce,
                        !1
                }),
                ne
            }
            function ze(S, B, I, ne) {
                for (var ie = S.length, Ce = I + (ne ? 1 : -1); ne ? Ce-- : ++Ce < ie; )
                    if (B(S[Ce], Ce, S))
                        return Ce;
                return -1
            }
            function it(S, B, I) {
                return B === B ? ll(S, B, I) : ze(S, Ui, I)
            }
            function ci(S, B, I, ne) {
                for (var ie = I - 1, Ce = S.length; ++ie < Ce; )
                    if (ne(S[ie], B))
                        return ie;
                return -1
            }
            function Ui(S) {
                return S !== S
            }
            function hn(S, B) {
                var I = S == null ? 0 : S.length;
                return I ? Rt(S, B) / I : ce
            }
            function gr(S) {
                return function(B) {
                    return B == null ? a : B[S]
                }
            }
            function Qt(S) {
                return function(B) {
                    return S == null ? a : S[B]
                }
            }
            function $n(S, B, I, ne, ie) {
                return ie(S, function(Ce, Se, ve) {
                    I = ne ? (ne = !1,
                    Ce) : B(I, Ce, Se, ve)
                }),
                I
            }
            function tr(S, B) {
                var I = S.length;
                for (S.sort(B); I--; )
                    S[I] = S[I].value;
                return S
            }
            function Rt(S, B) {
                for (var I, ne = -1, ie = S.length; ++ne < ie; ) {
                    var Ce = B(S[ne]);
                    Ce !== a && (I = I === a ? Ce : I + Ce)
                }
                return I
            }
            function fi(S, B) {
                for (var I = -1, ne = Array(S); ++I < S; )
                    ne[I] = B(I);
                return ne
            }
            function qn(S, B) {
                return we(B, function(I) {
                    return [I, S[I]]
                })
            }
            function En(S) {
                return S && S.slice(0, Aa(S) + 1).replace(ai, "")
            }
            function Ht(S) {
                return function(B) {
                    return S(B)
                }
            }
            function zo(S, B) {
                return we(B, function(I) {
                    return S[I]
                })
            }
            function di(S, B) {
                return S.has(B)
            }
            function Je(S, B) {
                for (var I = -1, ne = S.length; ++I < ne && it(B, S[I], 0) > -1; )
                    ;
                return I
            }
            function hi(S, B) {
                for (var I = S.length; I-- && it(B, S[I], 0) > -1; )
                    ;
                return I
            }
            function pn(S, B) {
                for (var I = S.length, ne = 0; I--; )
                    S[I] === B && ++ne;
                return ne
            }
            var Wr = Qt(ma)
              , al = Qt(Vo);
            function ul(S) {
                return "\\" + ba[S]
            }
            function Sa(S, B) {
                return S == null ? a : S[B]
            }
            function Jt(S) {
                return tl.test(S)
            }
            function Go(S) {
                return nl.test(S)
            }
            function nr(S) {
                for (var B, I = []; !(B = S.next()).done; )
                    I.push(B.value);
                return I
            }
            function Vi(S) {
                var B = -1
                  , I = Array(S.size);
                return S.forEach(function(ne, ie) {
                    I[++B] = [ie, ne]
                }),
                I
            }
            function Ur(S, B) {
                return function(I) {
                    return S(B(I))
                }
            }
            function gn(S, B) {
                for (var I = -1, ne = S.length, ie = 0, Ce = []; ++I < ne; ) {
                    var Se = S[I];
                    (Se === B || Se === Z) && (S[I] = Z,
                    Ce[ie++] = I)
                }
                return Ce
            }
            function yr(S) {
                var B = -1
                  , I = Array(S.size);
                return S.forEach(function(ne) {
                    I[++B] = ne
                }),
                I
            }
            function Yo(S) {
                var B = -1
                  , I = Array(S.size);
                return S.forEach(function(ne) {
                    I[++B] = [ne, ne]
                }),
                I
            }
            function ll(S, B, I) {
                for (var ne = I - 1, ie = S.length; ++ne < ie; )
                    if (S[ne] === B)
                        return ne;
                return -1
            }
            function ji(S, B, I) {
                for (var ne = I + 1; ne--; )
                    if (S[ne] === B)
                        return ne;
                return ne
            }
            function rr(S) {
                return Jt(S) ? _a(S) : _n(S)
            }
            function Ft(S) {
                return Jt(S) ? A(S) : kn(S)
            }
            function Aa(S) {
                for (var B = S.length; B-- && Ni.test(S.charAt(B)); )
                    ;
                return B
            }
            var Xo = Qt(va);
            function _a(S) {
                for (var B = Uo.lastIndex = 0; Uo.test(S); )
                    ++B;
                return B
            }
            function A(S) {
                return S.match(Uo) || []
            }
            function P(S) {
                return S.match(el) || []
            }
            var H = function S(B) {
                B = B == null ? ft : U.defaults(ft.Object(), B, U.pick(ft, rl));
                var I = B.Array
                  , ne = B.Date
                  , ie = B.Error
                  , Ce = B.Function
                  , Se = B.Math
                  , ve = B.Object
                  , Fe = B.RegExp
                  , Be = B.String
                  , Ve = B.TypeError
                  , wt = I.prototype
                  , _t = Ce.prototype
                  , Ct = ve.prototype
                  , Wt = B["__core-js_shared__"]
                  , Dn = _t.toString
                  , Ne = Ct.hasOwnProperty
                  , Mg = 0
                  , Mf = function() {
                    var e = /[^.]+$/.exec(Wt && Wt.keys && Wt.keys.IE_PROTO || "");
                    return e ? "Symbol(src)_1." + e : ""
                }()
                  , ka = Ct.toString
                  , Og = Dn.call(ve)
                  , Rg = ft._
                  , Ng = Fe("^" + Dn.call(Ne).replace(Zn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
                  , Ea = Ca ? B.Buffer : a
                  , Vr = B.Symbol
                  , xa = B.Uint8Array
                  , Of = Ea ? Ea.allocUnsafe : a
                  , Ta = Ur(ve.getPrototypeOf, ve)
                  , Rf = ve.create
                  , Nf = Ct.propertyIsEnumerable
                  , Ia = wt.splice
                  , $f = Vr ? Vr.isConcatSpreadable : a
                  , Zo = Vr ? Vr.iterator : a
                  , pi = Vr ? Vr.toStringTag : a
                  , Ba = function() {
                    try {
                        var e = bi(ve, "defineProperty");
                        return e({}, "", {}),
                        e
                    } catch {}
                }()
                  , $g = B.clearTimeout !== ft.clearTimeout && B.clearTimeout
                  , qg = ne && ne.now !== ft.Date.now && ne.now
                  , Dg = B.setTimeout !== ft.setTimeout && B.setTimeout
                  , La = Se.ceil
                  , Pa = Se.floor
                  , cl = ve.getOwnPropertySymbols
                  , Hg = Ea ? Ea.isBuffer : a
                  , qf = B.isFinite
                  , Fg = wt.join
                  , Wg = Ur(ve.keys, ve)
                  , St = Se.max
                  , Nt = Se.min
                  , Ug = ne.now
                  , Vg = B.parseInt
                  , Df = Se.random
                  , jg = wt.reverse
                  , fl = bi(B, "DataView")
                  , Qo = bi(B, "Map")
                  , dl = bi(B, "Promise")
                  , Ki = bi(B, "Set")
                  , Jo = bi(B, "WeakMap")
                  , es = bi(ve, "create")
                  , Ma = Jo && new Jo
                  , zi = {}
                  , Kg = wi(fl)
                  , zg = wi(Qo)
                  , Gg = wi(dl)
                  , Yg = wi(Ki)
                  , Xg = wi(Jo)
                  , Oa = Vr ? Vr.prototype : a
                  , ts = Oa ? Oa.valueOf : a
                  , Hf = Oa ? Oa.toString : a;
                function w(e) {
                    if (pt(e) && !De(e) && !(e instanceof Ye)) {
                        if (e instanceof xn)
                            return e;
                        if (Ne.call(e, "__wrapped__"))
                            return Fd(e)
                    }
                    return new xn(e)
                }
                var Gi = function() {
                    function e() {}
                    return function(t) {
                        if (!ht(t))
                            return {};
                        if (Rf)
                            return Rf(t);
                        e.prototype = t;
                        var i = new e;
                        return e.prototype = a,
                        i
                    }
                }();
                function Ra() {}
                function xn(e, t) {
                    this.__wrapped__ = e,
                    this.__actions__ = [],
                    this.__chain__ = !!t,
                    this.__index__ = 0,
                    this.__values__ = a
                }
                w.templateSettings = {
                    escape: Xt,
                    evaluate: Ot,
                    interpolate: Ri,
                    variable: "",
                    imports: {
                        _: w
                    }
                },
                w.prototype = Ra.prototype,
                w.prototype.constructor = w,
                xn.prototype = Gi(Ra.prototype),
                xn.prototype.constructor = xn;
                function Ye(e) {
                    this.__wrapped__ = e,
                    this.__actions__ = [],
                    this.__dir__ = 1,
                    this.__filtered__ = !1,
                    this.__iteratees__ = [],
                    this.__takeCount__ = _e,
                    this.__views__ = []
                }
                function Zg() {
                    var e = new Ye(this.__wrapped__);
                    return e.__actions__ = en(this.__actions__),
                    e.__dir__ = this.__dir__,
                    e.__filtered__ = this.__filtered__,
                    e.__iteratees__ = en(this.__iteratees__),
                    e.__takeCount__ = this.__takeCount__,
                    e.__views__ = en(this.__views__),
                    e
                }
                function Qg() {
                    if (this.__filtered__) {
                        var e = new Ye(this);
                        e.__dir__ = -1,
                        e.__filtered__ = !0
                    } else
                        e = this.clone(),
                        e.__dir__ *= -1;
                    return e
                }
                function Jg() {
                    var e = this.__wrapped__.value()
                      , t = this.__dir__
                      , i = De(e)
                      , f = t < 0
                      , m = i ? e.length : 0
                      , C = fm(0, m, this.__views__)
                      , x = C.start
                      , L = C.end
                      , $ = L - x
                      , oe = f ? L : x - 1
                      , se = this.__iteratees__
                      , le = se.length
                      , ye = 0
                      , Ee = Nt($, this.__takeCount__);
                    if (!i || !f && m == $ && Ee == $)
                        return cd(e, this.__actions__);
                    var Pe = [];
                    e: for (; $-- && ye < Ee; ) {
                        oe += t;
                        for (var Ue = -1, Me = e[oe]; ++Ue < le; ) {
                            var Ge = se[Ue]
                              , Xe = Ge.iteratee
                              , vn = Ge.type
                              , jt = Xe(Me);
                            if (vn == q)
                                Me = jt;
                            else if (!jt) {
                                if (vn == V)
                                    continue e;
                                break e
                            }
                        }
                        Pe[ye++] = Me
                    }
                    return Pe
                }
                Ye.prototype = Gi(Ra.prototype),
                Ye.prototype.constructor = Ye;
                function gi(e) {
                    var t = -1
                      , i = e == null ? 0 : e.length;
                    for (this.clear(); ++t < i; ) {
                        var f = e[t];
                        this.set(f[0], f[1])
                    }
                }
                function ey() {
                    this.__data__ = es ? es(null) : {},
                    this.size = 0
                }
                function ty(e) {
                    var t = this.has(e) && delete this.__data__[e];
                    return this.size -= t ? 1 : 0,
                    t
                }
                function ny(e) {
                    var t = this.__data__;
                    if (es) {
                        var i = t[e];
                        return i === _ ? a : i
                    }
                    return Ne.call(t, e) ? t[e] : a
                }
                function ry(e) {
                    var t = this.__data__;
                    return es ? t[e] !== a : Ne.call(t, e)
                }
                function iy(e, t) {
                    var i = this.__data__;
                    return this.size += this.has(e) ? 0 : 1,
                    i[e] = es && t === a ? _ : t,
                    this
                }
                gi.prototype.clear = ey,
                gi.prototype.delete = ty,
                gi.prototype.get = ny,
                gi.prototype.has = ry,
                gi.prototype.set = iy;
                function mr(e) {
                    var t = -1
                      , i = e == null ? 0 : e.length;
                    for (this.clear(); ++t < i; ) {
                        var f = e[t];
                        this.set(f[0], f[1])
                    }
                }
                function oy() {
                    this.__data__ = [],
                    this.size = 0
                }
                function sy(e) {
                    var t = this.__data__
                      , i = Na(t, e);
                    if (i < 0)
                        return !1;
                    var f = t.length - 1;
                    return i == f ? t.pop() : Ia.call(t, i, 1),
                    --this.size,
                    !0
                }
                function ay(e) {
                    var t = this.__data__
                      , i = Na(t, e);
                    return i < 0 ? a : t[i][1]
                }
                function uy(e) {
                    return Na(this.__data__, e) > -1
                }
                function ly(e, t) {
                    var i = this.__data__
                      , f = Na(i, e);
                    return f < 0 ? (++this.size,
                    i.push([e, t])) : i[f][1] = t,
                    this
                }
                mr.prototype.clear = oy,
                mr.prototype.delete = sy,
                mr.prototype.get = ay,
                mr.prototype.has = uy,
                mr.prototype.set = ly;
                function vr(e) {
                    var t = -1
                      , i = e == null ? 0 : e.length;
                    for (this.clear(); ++t < i; ) {
                        var f = e[t];
                        this.set(f[0], f[1])
                    }
                }
                function cy() {
                    this.size = 0,
                    this.__data__ = {
                        hash: new gi,
                        map: new (Qo || mr),
                        string: new gi
                    }
                }
                function fy(e) {
                    var t = Ga(this, e).delete(e);
                    return this.size -= t ? 1 : 0,
                    t
                }
                function dy(e) {
                    return Ga(this, e).get(e)
                }
                function hy(e) {
                    return Ga(this, e).has(e)
                }
                function py(e, t) {
                    var i = Ga(this, e)
                      , f = i.size;
                    return i.set(e, t),
                    this.size += i.size == f ? 0 : 1,
                    this
                }
                vr.prototype.clear = cy,
                vr.prototype.delete = fy,
                vr.prototype.get = dy,
                vr.prototype.has = hy,
                vr.prototype.set = py;
                function yi(e) {
                    var t = -1
                      , i = e == null ? 0 : e.length;
                    for (this.__data__ = new vr; ++t < i; )
                        this.add(e[t])
                }
                function gy(e) {
                    return this.__data__.set(e, _),
                    this
                }
                function yy(e) {
                    return this.__data__.has(e)
                }
                yi.prototype.add = yi.prototype.push = gy,
                yi.prototype.has = yy;
                function Hn(e) {
                    var t = this.__data__ = new mr(e);
                    this.size = t.size
                }
                function my() {
                    this.__data__ = new mr,
                    this.size = 0
                }
                function vy(e) {
                    var t = this.__data__
                      , i = t.delete(e);
                    return this.size = t.size,
                    i
                }
                function by(e) {
                    return this.__data__.get(e)
                }
                function wy(e) {
                    return this.__data__.has(e)
                }
                function Cy(e, t) {
                    var i = this.__data__;
                    if (i instanceof mr) {
                        var f = i.__data__;
                        if (!Qo || f.length < h - 1)
                            return f.push([e, t]),
                            this.size = ++i.size,
                            this;
                        i = this.__data__ = new vr(f)
                    }
                    return i.set(e, t),
                    this.size = i.size,
                    this
                }
                Hn.prototype.clear = my,
                Hn.prototype.delete = vy,
                Hn.prototype.get = by,
                Hn.prototype.has = wy,
                Hn.prototype.set = Cy;
                function Ff(e, t) {
                    var i = De(e)
                      , f = !i && Ci(e)
                      , m = !i && !f && Yr(e)
                      , C = !i && !f && !m && Qi(e)
                      , x = i || f || m || C
                      , L = x ? fi(e.length, Be) : []
                      , $ = L.length;
                    for (var oe in e)
                        (t || Ne.call(e, oe)) && !(x && (oe == "length" || m && (oe == "offset" || oe == "parent") || C && (oe == "buffer" || oe == "byteLength" || oe == "byteOffset") || Sr(oe, $))) && L.push(oe);
                    return L
                }
                function Wf(e) {
                    var t = e.length;
                    return t ? e[Al(0, t - 1)] : a
                }
                function Sy(e, t) {
                    return Ya(en(e), mi(t, 0, e.length))
                }
                function Ay(e) {
                    return Ya(en(e))
                }
                function hl(e, t, i) {
                    (i !== a && !Fn(e[t], i) || i === a && !(t in e)) && br(e, t, i)
                }
                function ns(e, t, i) {
                    var f = e[t];
                    (!(Ne.call(e, t) && Fn(f, i)) || i === a && !(t in e)) && br(e, t, i)
                }
                function Na(e, t) {
                    for (var i = e.length; i--; )
                        if (Fn(e[i][0], t))
                            return i;
                    return -1
                }
                function _y(e, t, i, f) {
                    return jr(e, function(m, C, x) {
                        t(f, m, i(m), x)
                    }),
                    f
                }
                function Uf(e, t) {
                    return e && or(t, kt(t), e)
                }
                function ky(e, t) {
                    return e && or(t, nn(t), e)
                }
                function br(e, t, i) {
                    t == "__proto__" && Ba ? Ba(e, t, {
                        configurable: !0,
                        enumerable: !0,
                        value: i,
                        writable: !0
                    }) : e[t] = i
                }
                function pl(e, t) {
                    for (var i = -1, f = t.length, m = I(f), C = e == null; ++i < f; )
                        m[i] = C ? a : Gl(e, t[i]);
                    return m
                }
                function mi(e, t, i) {
                    return e === e && (i !== a && (e = e <= i ? e : i),
                    t !== a && (e = e >= t ? e : t)),
                    e
                }
                function Tn(e, t, i, f, m, C) {
                    var x, L = t & ue, $ = t & pe, oe = t & G;
                    if (i && (x = m ? i(e, f, m, C) : i(e)),
                    x !== a)
                        return x;
                    if (!ht(e))
                        return e;
                    var se = De(e);
                    if (se) {
                        if (x = hm(e),
                        !L)
                            return en(e, x)
                    } else {
                        var le = $t(e)
                          , ye = le == Et || le == Sn;
                        if (Yr(e))
                            return hd(e, L);
                        if (le == Yt || le == ot || ye && !m) {
                            if (x = $ || ye ? {} : Pd(e),
                            !L)
                                return $ ? nm(e, ky(x, e)) : tm(e, Uf(x, e))
                        } else {
                            if (!nt[le])
                                return m ? e : {};
                            x = pm(e, le, L)
                        }
                    }
                    C || (C = new Hn);
                    var Ee = C.get(e);
                    if (Ee)
                        return Ee;
                    C.set(e, x),
                    ah(e) ? e.forEach(function(Me) {
                        x.add(Tn(Me, t, i, Me, e, C))
                    }) : oh(e) && e.forEach(function(Me, Ge) {
                        x.set(Ge, Tn(Me, t, i, Ge, e, C))
                    });
                    var Pe = oe ? $ ? Ol : Ml : $ ? nn : kt
                      , Ue = se ? a : Pe(e);
                    return E(Ue || e, function(Me, Ge) {
                        Ue && (Ge = Me,
                        Me = e[Ge]),
                        ns(x, Ge, Tn(Me, t, i, Ge, e, C))
                    }),
                    x
                }
                function Ey(e) {
                    var t = kt(e);
                    return function(i) {
                        return Vf(i, e, t)
                    }
                }
                function Vf(e, t, i) {
                    var f = i.length;
                    if (e == null)
                        return !f;
                    for (e = ve(e); f--; ) {
                        var m = i[f]
                          , C = t[m]
                          , x = e[m];
                        if (x === a && !(m in e) || !C(x))
                            return !1
                    }
                    return !0
                }
                function jf(e, t, i) {
                    if (typeof e != "function")
                        throw new Ve(b);
                    return ls(function() {
                        e.apply(a, i)
                    }, t)
                }
                function rs(e, t, i, f) {
                    var m = -1
                      , C = F
                      , x = !0
                      , L = e.length
                      , $ = []
                      , oe = t.length;
                    if (!L)
                        return $;
                    i && (t = we(t, Ht(i))),
                    f ? (C = fe,
                    x = !1) : t.length >= h && (C = di,
                    x = !1,
                    t = new yi(t));
                    e: for (; ++m < L; ) {
                        var se = e[m]
                          , le = i == null ? se : i(se);
                        if (se = f || se !== 0 ? se : 0,
                        x && le === le) {
                            for (var ye = oe; ye--; )
                                if (t[ye] === le)
                                    continue e;
                            $.push(se)
                        } else
                            C(t, le, f) || $.push(se)
                    }
                    return $
                }
                var jr = vd(ir)
                  , Kf = vd(yl, !0);
                function xy(e, t) {
                    var i = !0;
                    return jr(e, function(f, m, C) {
                        return i = !!t(f, m, C),
                        i
                    }),
                    i
                }
                function $a(e, t, i) {
                    for (var f = -1, m = e.length; ++f < m; ) {
                        var C = e[f]
                          , x = t(C);
                        if (x != null && (L === a ? x === x && !mn(x) : i(x, L)))
                            var L = x
                              , $ = C
                    }
                    return $
                }
                function Ty(e, t, i, f) {
                    var m = e.length;
                    for (i = We(i),
                    i < 0 && (i = -i > m ? 0 : m + i),
                    f = f === a || f > m ? m : We(f),
                    f < 0 && (f += m),
                    f = i > f ? 0 : lh(f); i < f; )
                        e[i++] = t;
                    return e
                }
                function zf(e, t) {
                    var i = [];
                    return jr(e, function(f, m, C) {
                        t(f, m, C) && i.push(f)
                    }),
                    i
                }
                function Tt(e, t, i, f, m) {
                    var C = -1
                      , x = e.length;
                    for (i || (i = ym),
                    m || (m = []); ++C < x; ) {
                        var L = e[C];
                        t > 0 && i(L) ? t > 1 ? Tt(L, t - 1, i, f, m) : qe(m, L) : f || (m[m.length] = L)
                    }
                    return m
                }
                var gl = bd()
                  , Gf = bd(!0);
                function ir(e, t) {
                    return e && gl(e, t, kt)
                }
                function yl(e, t) {
                    return e && Gf(e, t, kt)
                }
                function qa(e, t) {
                    return ee(t, function(i) {
                        return Ar(e[i])
                    })
                }
                function vi(e, t) {
                    t = zr(t, e);
                    for (var i = 0, f = t.length; e != null && i < f; )
                        e = e[sr(t[i++])];
                    return i && i == f ? e : a
                }
                function Yf(e, t, i) {
                    var f = t(e);
                    return De(e) ? f : qe(f, i(e))
                }
                function Ut(e) {
                    return e == null ? e === a ? oi : xo : pi && pi in ve(e) ? cm(e) : Am(e)
                }
                function ml(e, t) {
                    return e > t
                }
                function Iy(e, t) {
                    return e != null && Ne.call(e, t)
                }
                function By(e, t) {
                    return e != null && t in ve(e)
                }
                function Ly(e, t, i) {
                    return e >= Nt(t, i) && e < St(t, i)
                }
                function vl(e, t, i) {
                    for (var f = i ? fe : F, m = e[0].length, C = e.length, x = C, L = I(C), $ = 1 / 0, oe = []; x--; ) {
                        var se = e[x];
                        x && t && (se = we(se, Ht(t))),
                        $ = Nt(se.length, $),
                        L[x] = !i && (t || m >= 120 && se.length >= 120) ? new yi(x && se) : a
                    }
                    se = e[0];
                    var le = -1
                      , ye = L[0];
                    e: for (; ++le < m && oe.length < $; ) {
                        var Ee = se[le]
                          , Pe = t ? t(Ee) : Ee;
                        if (Ee = i || Ee !== 0 ? Ee : 0,
                        !(ye ? di(ye, Pe) : f(oe, Pe, i))) {
                            for (x = C; --x; ) {
                                var Ue = L[x];
                                if (!(Ue ? di(Ue, Pe) : f(e[x], Pe, i)))
                                    continue e
                            }
                            ye && ye.push(Pe),
                            oe.push(Ee)
                        }
                    }
                    return oe
                }
                function Py(e, t, i, f) {
                    return ir(e, function(m, C, x) {
                        t(f, i(m), C, x)
                    }),
                    f
                }
                function is(e, t, i) {
                    t = zr(t, e),
                    e = Nd(e, t);
                    var f = e == null ? e : e[sr(Bn(t))];
                    return f == null ? a : v(f, e, i)
                }
                function Xf(e) {
                    return pt(e) && Ut(e) == ot
                }
                function My(e) {
                    return pt(e) && Ut(e) == si
                }
                function Oy(e) {
                    return pt(e) && Ut(e) == Lt
                }
                function os(e, t, i, f, m) {
                    return e === t ? !0 : e == null || t == null || !pt(e) && !pt(t) ? e !== e && t !== t : Ry(e, t, i, f, os, m)
                }
                function Ry(e, t, i, f, m, C) {
                    var x = De(e)
                      , L = De(t)
                      , $ = x ? un : $t(e)
                      , oe = L ? un : $t(t);
                    $ = $ == ot ? Yt : $,
                    oe = oe == ot ? Yt : oe;
                    var se = $ == Yt
                      , le = oe == Yt
                      , ye = $ == oe;
                    if (ye && Yr(e)) {
                        if (!Yr(t))
                            return !1;
                        x = !0,
                        se = !1
                    }
                    if (ye && !se)
                        return C || (C = new Hn),
                        x || Qi(e) ? Id(e, t, i, f, m, C) : um(e, t, $, i, f, m, C);
                    if (!(i & W)) {
                        var Ee = se && Ne.call(e, "__wrapped__")
                          , Pe = le && Ne.call(t, "__wrapped__");
                        if (Ee || Pe) {
                            var Ue = Ee ? e.value() : e
                              , Me = Pe ? t.value() : t;
                            return C || (C = new Hn),
                            m(Ue, Me, i, f, C)
                        }
                    }
                    return ye ? (C || (C = new Hn),
                    lm(e, t, i, f, m, C)) : !1
                }
                function Ny(e) {
                    return pt(e) && $t(e) == Gt
                }
                function bl(e, t, i, f) {
                    var m = i.length
                      , C = m
                      , x = !f;
                    if (e == null)
                        return !C;
                    for (e = ve(e); m--; ) {
                        var L = i[m];
                        if (x && L[2] ? L[1] !== e[L[0]] : !(L[0]in e))
                            return !1
                    }
                    for (; ++m < C; ) {
                        L = i[m];
                        var $ = L[0]
                          , oe = e[$]
                          , se = L[1];
                        if (x && L[2]) {
                            if (oe === a && !($ in e))
                                return !1
                        } else {
                            var le = new Hn;
                            if (f)
                                var ye = f(oe, se, $, e, t, le);
                            if (!(ye === a ? os(se, oe, W | D, f, le) : ye))
                                return !1
                        }
                    }
                    return !0
                }
                function Zf(e) {
                    if (!ht(e) || vm(e))
                        return !1;
                    var t = Ar(e) ? Ng : Bo;
                    return t.test(wi(e))
                }
                function $y(e) {
                    return pt(e) && Ut(e) == ii
                }
                function qy(e) {
                    return pt(e) && $t(e) == cn
                }
                function Dy(e) {
                    return pt(e) && tu(e.length) && !!st[Ut(e)]
                }
                function Qf(e) {
                    return typeof e == "function" ? e : e == null ? rn : typeof e == "object" ? De(e) ? td(e[0], e[1]) : ed(e) : wh(e)
                }
                function wl(e) {
                    if (!us(e))
                        return Wg(e);
                    var t = [];
                    for (var i in ve(e))
                        Ne.call(e, i) && i != "constructor" && t.push(i);
                    return t
                }
                function Hy(e) {
                    if (!ht(e))
                        return Sm(e);
                    var t = us(e)
                      , i = [];
                    for (var f in e)
                        f == "constructor" && (t || !Ne.call(e, f)) || i.push(f);
                    return i
                }
                function Cl(e, t) {
                    return e < t
                }
                function Jf(e, t) {
                    var i = -1
                      , f = tn(e) ? I(e.length) : [];
                    return jr(e, function(m, C, x) {
                        f[++i] = t(m, C, x)
                    }),
                    f
                }
                function ed(e) {
                    var t = Nl(e);
                    return t.length == 1 && t[0][2] ? Od(t[0][0], t[0][1]) : function(i) {
                        return i === e || bl(i, e, t)
                    }
                }
                function td(e, t) {
                    return ql(e) && Md(t) ? Od(sr(e), t) : function(i) {
                        var f = Gl(i, e);
                        return f === a && f === t ? Yl(i, e) : os(t, f, W | D)
                    }
                }
                function Da(e, t, i, f, m) {
                    e !== t && gl(t, function(C, x) {
                        if (m || (m = new Hn),
                        ht(C))
                            Fy(e, t, x, i, Da, f, m);
                        else {
                            var L = f ? f(Hl(e, x), C, x + "", e, t, m) : a;
                            L === a && (L = C),
                            hl(e, x, L)
                        }
                    }, nn)
                }
                function Fy(e, t, i, f, m, C, x) {
                    var L = Hl(e, i)
                      , $ = Hl(t, i)
                      , oe = x.get($);
                    if (oe) {
                        hl(e, i, oe);
                        return
                    }
                    var se = C ? C(L, $, i + "", e, t, x) : a
                      , le = se === a;
                    if (le) {
                        var ye = De($)
                          , Ee = !ye && Yr($)
                          , Pe = !ye && !Ee && Qi($);
                        se = $,
                        ye || Ee || Pe ? De(L) ? se = L : yt(L) ? se = en(L) : Ee ? (le = !1,
                        se = hd($, !0)) : Pe ? (le = !1,
                        se = pd($, !0)) : se = [] : cs($) || Ci($) ? (se = L,
                        Ci(L) ? se = ch(L) : (!ht(L) || Ar(L)) && (se = Pd($))) : le = !1
                    }
                    le && (x.set($, se),
                    m(se, $, f, C, x),
                    x.delete($)),
                    hl(e, i, se)
                }
                function nd(e, t) {
                    var i = e.length;
                    if (i)
                        return t += t < 0 ? i : 0,
                        Sr(t, i) ? e[t] : a
                }
                function rd(e, t, i) {
                    t.length ? t = we(t, function(C) {
                        return De(C) ? function(x) {
                            return vi(x, C.length === 1 ? C[0] : C)
                        }
                        : C
                    }) : t = [rn];
                    var f = -1;
                    t = we(t, Ht(Le()));
                    var m = Jf(e, function(C, x, L) {
                        var $ = we(t, function(oe) {
                            return oe(C)
                        });
                        return {
                            criteria: $,
                            index: ++f,
                            value: C
                        }
                    });
                    return tr(m, function(C, x) {
                        return em(C, x, i)
                    })
                }
                function Wy(e, t) {
                    return id(e, t, function(i, f) {
                        return Yl(e, f)
                    })
                }
                function id(e, t, i) {
                    for (var f = -1, m = t.length, C = {}; ++f < m; ) {
                        var x = t[f]
                          , L = vi(e, x);
                        i(L, x) && ss(C, zr(x, e), L)
                    }
                    return C
                }
                function Uy(e) {
                    return function(t) {
                        return vi(t, e)
                    }
                }
                function Sl(e, t, i, f) {
                    var m = f ? ci : it
                      , C = -1
                      , x = t.length
                      , L = e;
                    for (e === t && (t = en(t)),
                    i && (L = we(e, Ht(i))); ++C < x; )
                        for (var $ = 0, oe = t[C], se = i ? i(oe) : oe; ($ = m(L, se, $, f)) > -1; )
                            L !== e && Ia.call(L, $, 1),
                            Ia.call(e, $, 1);
                    return e
                }
                function od(e, t) {
                    for (var i = e ? t.length : 0, f = i - 1; i--; ) {
                        var m = t[i];
                        if (i == f || m !== C) {
                            var C = m;
                            Sr(m) ? Ia.call(e, m, 1) : El(e, m)
                        }
                    }
                    return e
                }
                function Al(e, t) {
                    return e + Pa(Df() * (t - e + 1))
                }
                function Vy(e, t, i, f) {
                    for (var m = -1, C = St(La((t - e) / (i || 1)), 0), x = I(C); C--; )
                        x[f ? C : ++m] = e,
                        e += i;
                    return x
                }
                function _l(e, t) {
                    var i = "";
                    if (!e || t < 1 || t > ae)
                        return i;
                    do
                        t % 2 && (i += e),
                        t = Pa(t / 2),
                        t && (e += e);
                    while (t);
                    return i
                }
                function je(e, t) {
                    return Fl(Rd(e, t, rn), e + "")
                }
                function jy(e) {
                    return Wf(Ji(e))
                }
                function Ky(e, t) {
                    var i = Ji(e);
                    return Ya(i, mi(t, 0, i.length))
                }
                function ss(e, t, i, f) {
                    if (!ht(e))
                        return e;
                    t = zr(t, e);
                    for (var m = -1, C = t.length, x = C - 1, L = e; L != null && ++m < C; ) {
                        var $ = sr(t[m])
                          , oe = i;
                        if ($ === "__proto__" || $ === "constructor" || $ === "prototype")
                            return e;
                        if (m != x) {
                            var se = L[$];
                            oe = f ? f(se, $, L) : a,
                            oe === a && (oe = ht(se) ? se : Sr(t[m + 1]) ? [] : {})
                        }
                        ns(L, $, oe),
                        L = L[$]
                    }
                    return e
                }
                var sd = Ma ? function(e, t) {
                    return Ma.set(e, t),
                    e
                }
                : rn
                  , zy = Ba ? function(e, t) {
                    return Ba(e, "toString", {
                        configurable: !0,
                        enumerable: !1,
                        value: Zl(t),
                        writable: !0
                    })
                }
                : rn;
                function Gy(e) {
                    return Ya(Ji(e))
                }
                function In(e, t, i) {
                    var f = -1
                      , m = e.length;
                    t < 0 && (t = -t > m ? 0 : m + t),
                    i = i > m ? m : i,
                    i < 0 && (i += m),
                    m = t > i ? 0 : i - t >>> 0,
                    t >>>= 0;
                    for (var C = I(m); ++f < m; )
                        C[f] = e[f + t];
                    return C
                }
                function Yy(e, t) {
                    var i;
                    return jr(e, function(f, m, C) {
                        return i = t(f, m, C),
                        !i
                    }),
                    !!i
                }
                function Ha(e, t, i) {
                    var f = 0
                      , m = e == null ? f : e.length;
                    if (typeof t == "number" && t === t && m <= Ze) {
                        for (; f < m; ) {
                            var C = f + m >>> 1
                              , x = e[C];
                            x !== null && !mn(x) && (i ? x <= t : x < t) ? f = C + 1 : m = C
                        }
                        return m
                    }
                    return kl(e, t, rn, i)
                }
                function kl(e, t, i, f) {
                    var m = 0
                      , C = e == null ? 0 : e.length;
                    if (C === 0)
                        return 0;
                    t = i(t);
                    for (var x = t !== t, L = t === null, $ = mn(t), oe = t === a; m < C; ) {
                        var se = Pa((m + C) / 2)
                          , le = i(e[se])
                          , ye = le !== a
                          , Ee = le === null
                          , Pe = le === le
                          , Ue = mn(le);
                        if (x)
                            var Me = f || Pe;
                        else
                            oe ? Me = Pe && (f || ye) : L ? Me = Pe && ye && (f || !Ee) : $ ? Me = Pe && ye && !Ee && (f || !Ue) : Ee || Ue ? Me = !1 : Me = f ? le <= t : le < t;
                        Me ? m = se + 1 : C = se
                    }
                    return Nt(C, He)
                }
                function ad(e, t) {
                    for (var i = -1, f = e.length, m = 0, C = []; ++i < f; ) {
                        var x = e[i]
                          , L = t ? t(x) : x;
                        if (!i || !Fn(L, $)) {
                            var $ = L;
                            C[m++] = x === 0 ? 0 : x
                        }
                    }
                    return C
                }
                function ud(e) {
                    return typeof e == "number" ? e : mn(e) ? ce : +e
                }
                function yn(e) {
                    if (typeof e == "string")
                        return e;
                    if (De(e))
                        return we(e, yn) + "";
                    if (mn(e))
                        return Hf ? Hf.call(e) : "";
                    var t = e + "";
                    return t == "0" && 1 / e == -te ? "-0" : t
                }
                function Kr(e, t, i) {
                    var f = -1
                      , m = F
                      , C = e.length
                      , x = !0
                      , L = []
                      , $ = L;
                    if (i)
                        x = !1,
                        m = fe;
                    else if (C >= h) {
                        var oe = t ? null : sm(e);
                        if (oe)
                            return yr(oe);
                        x = !1,
                        m = di,
                        $ = new yi
                    } else
                        $ = t ? [] : L;
                    e: for (; ++f < C; ) {
                        var se = e[f]
                          , le = t ? t(se) : se;
                        if (se = i || se !== 0 ? se : 0,
                        x && le === le) {
                            for (var ye = $.length; ye--; )
                                if ($[ye] === le)
                                    continue e;
                            t && $.push(le),
                            L.push(se)
                        } else
                            m($, le, i) || ($ !== L && $.push(le),
                            L.push(se))
                    }
                    return L
                }
                function El(e, t) {
                    return t = zr(t, e),
                    e = Nd(e, t),
                    e == null || delete e[sr(Bn(t))]
                }
                function ld(e, t, i, f) {
                    return ss(e, t, i(vi(e, t)), f)
                }
                function Fa(e, t, i, f) {
                    for (var m = e.length, C = f ? m : -1; (f ? C-- : ++C < m) && t(e[C], C, e); )
                        ;
                    return i ? In(e, f ? 0 : C, f ? C + 1 : m) : In(e, f ? C + 1 : 0, f ? m : C)
                }
                function cd(e, t) {
                    var i = e;
                    return i instanceof Ye && (i = i.value()),
                    $e(t, function(f, m) {
                        return m.func.apply(m.thisArg, qe([f], m.args))
                    }, i)
                }
                function xl(e, t, i) {
                    var f = e.length;
                    if (f < 2)
                        return f ? Kr(e[0]) : [];
                    for (var m = -1, C = I(f); ++m < f; )
                        for (var x = e[m], L = -1; ++L < f; )
                            L != m && (C[m] = rs(C[m] || x, e[L], t, i));
                    return Kr(Tt(C, 1), t, i)
                }
                function fd(e, t, i) {
                    for (var f = -1, m = e.length, C = t.length, x = {}; ++f < m; ) {
                        var L = f < C ? t[f] : a;
                        i(x, e[f], L)
                    }
                    return x
                }
                function Tl(e) {
                    return yt(e) ? e : []
                }
                function Il(e) {
                    return typeof e == "function" ? e : rn
                }
                function zr(e, t) {
                    return De(e) ? e : ql(e, t) ? [e] : Hd(rt(e))
                }
                var Xy = je;
                function Gr(e, t, i) {
                    var f = e.length;
                    return i = i === a ? f : i,
                    !t && i >= f ? e : In(e, t, i)
                }
                var dd = $g || function(e) {
                    return ft.clearTimeout(e)
                }
                ;
                function hd(e, t) {
                    if (t)
                        return e.slice();
                    var i = e.length
                      , f = Of ? Of(i) : new e.constructor(i);
                    return e.copy(f),
                    f
                }
                function Bl(e) {
                    var t = new e.constructor(e.byteLength);
                    return new xa(t).set(new xa(e)),
                    t
                }
                function Zy(e, t) {
                    var i = t ? Bl(e.buffer) : e.buffer;
                    return new e.constructor(i,e.byteOffset,e.byteLength)
                }
                function Qy(e) {
                    var t = new e.constructor(e.source,na.exec(e));
                    return t.lastIndex = e.lastIndex,
                    t
                }
                function Jy(e) {
                    return ts ? ve(ts.call(e)) : {}
                }
                function pd(e, t) {
                    var i = t ? Bl(e.buffer) : e.buffer;
                    return new e.constructor(i,e.byteOffset,e.length)
                }
                function gd(e, t) {
                    if (e !== t) {
                        var i = e !== a
                          , f = e === null
                          , m = e === e
                          , C = mn(e)
                          , x = t !== a
                          , L = t === null
                          , $ = t === t
                          , oe = mn(t);
                        if (!L && !oe && !C && e > t || C && x && $ && !L && !oe || f && x && $ || !i && $ || !m)
                            return 1;
                        if (!f && !C && !oe && e < t || oe && i && m && !f && !C || L && i && m || !x && m || !$)
                            return -1
                    }
                    return 0
                }
                function em(e, t, i) {
                    for (var f = -1, m = e.criteria, C = t.criteria, x = m.length, L = i.length; ++f < x; ) {
                        var $ = gd(m[f], C[f]);
                        if ($) {
                            if (f >= L)
                                return $;
                            var oe = i[f];
                            return $ * (oe == "desc" ? -1 : 1)
                        }
                    }
                    return e.index - t.index
                }
                function yd(e, t, i, f) {
                    for (var m = -1, C = e.length, x = i.length, L = -1, $ = t.length, oe = St(C - x, 0), se = I($ + oe), le = !f; ++L < $; )
                        se[L] = t[L];
                    for (; ++m < x; )
                        (le || m < C) && (se[i[m]] = e[m]);
                    for (; oe--; )
                        se[L++] = e[m++];
                    return se
                }
                function md(e, t, i, f) {
                    for (var m = -1, C = e.length, x = -1, L = i.length, $ = -1, oe = t.length, se = St(C - L, 0), le = I(se + oe), ye = !f; ++m < se; )
                        le[m] = e[m];
                    for (var Ee = m; ++$ < oe; )
                        le[Ee + $] = t[$];
                    for (; ++x < L; )
                        (ye || m < C) && (le[Ee + i[x]] = e[m++]);
                    return le
                }
                function en(e, t) {
                    var i = -1
                      , f = e.length;
                    for (t || (t = I(f)); ++i < f; )
                        t[i] = e[i];
                    return t
                }
                function or(e, t, i, f) {
                    var m = !i;
                    i || (i = {});
                    for (var C = -1, x = t.length; ++C < x; ) {
                        var L = t[C]
                          , $ = f ? f(i[L], e[L], L, i, e) : a;
                        $ === a && ($ = e[L]),
                        m ? br(i, L, $) : ns(i, L, $)
                    }
                    return i
                }
                function tm(e, t) {
                    return or(e, $l(e), t)
                }
                function nm(e, t) {
                    return or(e, Bd(e), t)
                }
                function Wa(e, t) {
                    return function(i, f) {
                        var m = De(i) ? T : _y
                          , C = t ? t() : {};
                        return m(i, e, Le(f, 2), C)
                    }
                }
                function Yi(e) {
                    return je(function(t, i) {
                        var f = -1
                          , m = i.length
                          , C = m > 1 ? i[m - 1] : a
                          , x = m > 2 ? i[2] : a;
                        for (C = e.length > 3 && typeof C == "function" ? (m--,
                        C) : a,
                        x && Vt(i[0], i[1], x) && (C = m < 3 ? a : C,
                        m = 1),
                        t = ve(t); ++f < m; ) {
                            var L = i[f];
                            L && e(t, L, f, C)
                        }
                        return t
                    })
                }
                function vd(e, t) {
                    return function(i, f) {
                        if (i == null)
                            return i;
                        if (!tn(i))
                            return e(i, f);
                        for (var m = i.length, C = t ? m : -1, x = ve(i); (t ? C-- : ++C < m) && f(x[C], C, x) !== !1; )
                            ;
                        return i
                    }
                }
                function bd(e) {
                    return function(t, i, f) {
                        for (var m = -1, C = ve(t), x = f(t), L = x.length; L--; ) {
                            var $ = x[e ? L : ++m];
                            if (i(C[$], $, C) === !1)
                                break
                        }
                        return t
                    }
                }
                function rm(e, t, i) {
                    var f = t & he
                      , m = as(e);
                    function C() {
                        var x = this && this !== ft && this instanceof C ? m : e;
                        return x.apply(f ? i : this, arguments)
                    }
                    return C
                }
                function wd(e) {
                    return function(t) {
                        t = rt(t);
                        var i = Jt(t) ? Ft(t) : a
                          , f = i ? i[0] : t.charAt(0)
                          , m = i ? Gr(i, 1).join("") : t.slice(1);
                        return f[e]() + m
                    }
                }
                function Xi(e) {
                    return function(t) {
                        return $e(vh(mh(t).replace(Wo, "")), e, "")
                    }
                }
                function as(e) {
                    return function() {
                        var t = arguments;
                        switch (t.length) {
                        case 0:
                            return new e;
                        case 1:
                            return new e(t[0]);
                        case 2:
                            return new e(t[0],t[1]);
                        case 3:
                            return new e(t[0],t[1],t[2]);
                        case 4:
                            return new e(t[0],t[1],t[2],t[3]);
                        case 5:
                            return new e(t[0],t[1],t[2],t[3],t[4]);
                        case 6:
                            return new e(t[0],t[1],t[2],t[3],t[4],t[5]);
                        case 7:
                            return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])
                        }
                        var i = Gi(e.prototype)
                          , f = e.apply(i, t);
                        return ht(f) ? f : i
                    }
                }
                function im(e, t, i) {
                    var f = as(e);
                    function m() {
                        for (var C = arguments.length, x = I(C), L = C, $ = Zi(m); L--; )
                            x[L] = arguments[L];
                        var oe = C < 3 && x[0] !== $ && x[C - 1] !== $ ? [] : gn(x, $);
                        if (C -= oe.length,
                        C < i)
                            return kd(e, t, Ua, m.placeholder, a, x, oe, a, a, i - C);
                        var se = this && this !== ft && this instanceof m ? f : e;
                        return v(se, this, x)
                    }
                    return m
                }
                function Cd(e) {
                    return function(t, i, f) {
                        var m = ve(t);
                        if (!tn(t)) {
                            var C = Le(i, 3);
                            t = kt(t),
                            i = function(L) {
                                return C(m[L], L, m)
                            }
                        }
                        var x = e(t, i, f);
                        return x > -1 ? m[C ? t[x] : x] : a
                    }
                }
                function Sd(e) {
                    return Cr(function(t) {
                        var i = t.length
                          , f = i
                          , m = xn.prototype.thru;
                        for (e && t.reverse(); f--; ) {
                            var C = t[f];
                            if (typeof C != "function")
                                throw new Ve(b);
                            if (m && !x && za(C) == "wrapper")
                                var x = new xn([],!0)
                        }
                        for (f = x ? f : i; ++f < i; ) {
                            C = t[f];
                            var L = za(C)
                              , $ = L == "wrapper" ? Rl(C) : a;
                            $ && Dl($[0]) && $[1] == (l | Te | Ie | R) && !$[4].length && $[9] == 1 ? x = x[za($[0])].apply(x, $[3]) : x = C.length == 1 && Dl(C) ? x[L]() : x.thru(C)
                        }
                        return function() {
                            var oe = arguments
                              , se = oe[0];
                            if (x && oe.length == 1 && De(se))
                                return x.plant(se).value();
                            for (var le = 0, ye = i ? t[le].apply(this, oe) : se; ++le < i; )
                                ye = t[le].call(this, ye);
                            return ye
                        }
                    })
                }
                function Ua(e, t, i, f, m, C, x, L, $, oe) {
                    var se = t & l
                      , le = t & he
                      , ye = t & J
                      , Ee = t & (Te | Re)
                      , Pe = t & j
                      , Ue = ye ? a : as(e);
                    function Me() {
                        for (var Ge = arguments.length, Xe = I(Ge), vn = Ge; vn--; )
                            Xe[vn] = arguments[vn];
                        if (Ee)
                            var jt = Zi(Me)
                              , bn = pn(Xe, jt);
                        if (f && (Xe = yd(Xe, f, m, Ee)),
                        C && (Xe = md(Xe, C, x, Ee)),
                        Ge -= bn,
                        Ee && Ge < oe) {
                            var mt = gn(Xe, jt);
                            return kd(e, t, Ua, Me.placeholder, i, Xe, mt, L, $, oe - Ge)
                        }
                        var Wn = le ? i : this
                          , kr = ye ? Wn[e] : e;
                        return Ge = Xe.length,
                        L ? Xe = _m(Xe, L) : Pe && Ge > 1 && Xe.reverse(),
                        se && $ < Ge && (Xe.length = $),
                        this && this !== ft && this instanceof Me && (kr = Ue || as(kr)),
                        kr.apply(Wn, Xe)
                    }
                    return Me
                }
                function Ad(e, t) {
                    return function(i, f) {
                        return Py(i, e, t(f), {})
                    }
                }
                function Va(e, t) {
                    return function(i, f) {
                        var m;
                        if (i === a && f === a)
                            return t;
                        if (i !== a && (m = i),
                        f !== a) {
                            if (m === a)
                                return f;
                            typeof i == "string" || typeof f == "string" ? (i = yn(i),
                            f = yn(f)) : (i = ud(i),
                            f = ud(f)),
                            m = e(i, f)
                        }
                        return m
                    }
                }
                function Ll(e) {
                    return Cr(function(t) {
                        return t = we(t, Ht(Le())),
                        je(function(i) {
                            var f = this;
                            return e(t, function(m) {
                                return v(m, f, i)
                            })
                        })
                    })
                }
                function ja(e, t) {
                    t = t === a ? " " : yn(t);
                    var i = t.length;
                    if (i < 2)
                        return i ? _l(t, e) : t;
                    var f = _l(t, La(e / rr(t)));
                    return Jt(t) ? Gr(Ft(f), 0, e).join("") : f.slice(0, e)
                }
                function om(e, t, i, f) {
                    var m = t & he
                      , C = as(e);
                    function x() {
                        for (var L = -1, $ = arguments.length, oe = -1, se = f.length, le = I(se + $), ye = this && this !== ft && this instanceof x ? C : e; ++oe < se; )
                            le[oe] = f[oe];
                        for (; $--; )
                            le[oe++] = arguments[++L];
                        return v(ye, m ? i : this, le)
                    }
                    return x
                }
                function _d(e) {
                    return function(t, i, f) {
                        return f && typeof f != "number" && Vt(t, i, f) && (i = f = a),
                        t = _r(t),
                        i === a ? (i = t,
                        t = 0) : i = _r(i),
                        f = f === a ? t < i ? 1 : -1 : _r(f),
                        Vy(t, i, f, e)
                    }
                }
                function Ka(e) {
                    return function(t, i) {
                        return typeof t == "string" && typeof i == "string" || (t = Ln(t),
                        i = Ln(i)),
                        e(t, i)
                    }
                }
                function kd(e, t, i, f, m, C, x, L, $, oe) {
                    var se = t & Te
                      , le = se ? x : a
                      , ye = se ? a : x
                      , Ee = se ? C : a
                      , Pe = se ? a : C;
                    t |= se ? Ie : me,
                    t &= ~(se ? me : Ie),
                    t & Oe || (t &= ~(he | J));
                    var Ue = [e, t, m, Ee, le, Pe, ye, L, $, oe]
                      , Me = i.apply(a, Ue);
                    return Dl(e) && $d(Me, Ue),
                    Me.placeholder = f,
                    qd(Me, e, t)
                }
                function Pl(e) {
                    var t = Se[e];
                    return function(i, f) {
                        if (i = Ln(i),
                        f = f == null ? 0 : Nt(We(f), 292),
                        f && qf(i)) {
                            var m = (rt(i) + "e").split("e")
                              , C = t(m[0] + "e" + (+m[1] + f));
                            return m = (rt(C) + "e").split("e"),
                            +(m[0] + "e" + (+m[1] - f))
                        }
                        return t(i)
                    }
                }
                var sm = Ki && 1 / yr(new Ki([, -0]))[1] == te ? function(e) {
                    return new Ki(e)
                }
                : ec;
                function Ed(e) {
                    return function(t) {
                        var i = $t(t);
                        return i == Gt ? Vi(t) : i == cn ? Yo(t) : qn(t, e(t))
                    }
                }
                function wr(e, t, i, f, m, C, x, L) {
                    var $ = t & J;
                    if (!$ && typeof e != "function")
                        throw new Ve(b);
                    var oe = f ? f.length : 0;
                    if (oe || (t &= ~(Ie | me),
                    f = m = a),
                    x = x === a ? x : St(We(x), 0),
                    L = L === a ? L : We(L),
                    oe -= m ? m.length : 0,
                    t & me) {
                        var se = f
                          , le = m;
                        f = m = a
                    }
                    var ye = $ ? a : Rl(e)
                      , Ee = [e, t, i, f, m, se, le, C, x, L];
                    if (ye && Cm(Ee, ye),
                    e = Ee[0],
                    t = Ee[1],
                    i = Ee[2],
                    f = Ee[3],
                    m = Ee[4],
                    L = Ee[9] = Ee[9] === a ? $ ? 0 : e.length : St(Ee[9] - oe, 0),
                    !L && t & (Te | Re) && (t &= ~(Te | Re)),
                    !t || t == he)
                        var Pe = rm(e, t, i);
                    else
                        t == Te || t == Re ? Pe = im(e, t, L) : (t == Ie || t == (he | Ie)) && !m.length ? Pe = om(e, t, i, f) : Pe = Ua.apply(a, Ee);
                    var Ue = ye ? sd : $d;
                    return qd(Ue(Pe, Ee), e, t)
                }
                function xd(e, t, i, f) {
                    return e === a || Fn(e, Ct[i]) && !Ne.call(f, i) ? t : e
                }
                function Td(e, t, i, f, m, C) {
                    return ht(e) && ht(t) && (C.set(t, e),
                    Da(e, t, a, Td, C),
                    C.delete(t)),
                    e
                }
                function am(e) {
                    return cs(e) ? a : e
                }
                function Id(e, t, i, f, m, C) {
                    var x = i & W
                      , L = e.length
                      , $ = t.length;
                    if (L != $ && !(x && $ > L))
                        return !1;
                    var oe = C.get(e)
                      , se = C.get(t);
                    if (oe && se)
                        return oe == t && se == e;
                    var le = -1
                      , ye = !0
                      , Ee = i & D ? new yi : a;
                    for (C.set(e, t),
                    C.set(t, e); ++le < L; ) {
                        var Pe = e[le]
                          , Ue = t[le];
                        if (f)
                            var Me = x ? f(Ue, Pe, le, t, e, C) : f(Pe, Ue, le, e, t, C);
                        if (Me !== a) {
                            if (Me)
                                continue;
                            ye = !1;
                            break
                        }
                        if (Ee) {
                            if (!dt(t, function(Ge, Xe) {
                                if (!di(Ee, Xe) && (Pe === Ge || m(Pe, Ge, i, f, C)))
                                    return Ee.push(Xe)
                            })) {
                                ye = !1;
                                break
                            }
                        } else if (!(Pe === Ue || m(Pe, Ue, i, f, C))) {
                            ye = !1;
                            break
                        }
                    }
                    return C.delete(e),
                    C.delete(t),
                    ye
                }
                function um(e, t, i, f, m, C, x) {
                    switch (i) {
                    case Mr:
                        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                            return !1;
                        e = e.buffer,
                        t = t.buffer;
                    case si:
                        return !(e.byteLength != t.byteLength || !C(new xa(e), new xa(t)));
                    case ln:
                    case Lt:
                    case ri:
                        return Fn(+e, +t);
                    case Dt:
                        return e.name == t.name && e.message == t.message;
                    case ii:
                    case Pt:
                        return e == t + "";
                    case Gt:
                        var L = Vi;
                    case cn:
                        var $ = f & W;
                        if (L || (L = yr),
                        e.size != t.size && !$)
                            return !1;
                        var oe = x.get(e);
                        if (oe)
                            return oe == t;
                        f |= D,
                        x.set(e, t);
                        var se = Id(L(e), L(t), f, m, C, x);
                        return x.delete(e),
                        se;
                    case Yn:
                        if (ts)
                            return ts.call(e) == ts.call(t)
                    }
                    return !1
                }
                function lm(e, t, i, f, m, C) {
                    var x = i & W
                      , L = Ml(e)
                      , $ = L.length
                      , oe = Ml(t)
                      , se = oe.length;
                    if ($ != se && !x)
                        return !1;
                    for (var le = $; le--; ) {
                        var ye = L[le];
                        if (!(x ? ye in t : Ne.call(t, ye)))
                            return !1
                    }
                    var Ee = C.get(e)
                      , Pe = C.get(t);
                    if (Ee && Pe)
                        return Ee == t && Pe == e;
                    var Ue = !0;
                    C.set(e, t),
                    C.set(t, e);
                    for (var Me = x; ++le < $; ) {
                        ye = L[le];
                        var Ge = e[ye]
                          , Xe = t[ye];
                        if (f)
                            var vn = x ? f(Xe, Ge, ye, t, e, C) : f(Ge, Xe, ye, e, t, C);
                        if (!(vn === a ? Ge === Xe || m(Ge, Xe, i, f, C) : vn)) {
                            Ue = !1;
                            break
                        }
                        Me || (Me = ye == "constructor")
                    }
                    if (Ue && !Me) {
                        var jt = e.constructor
                          , bn = t.constructor;
                        jt != bn && "constructor"in e && "constructor"in t && !(typeof jt == "function" && jt instanceof jt && typeof bn == "function" && bn instanceof bn) && (Ue = !1)
                    }
                    return C.delete(e),
                    C.delete(t),
                    Ue
                }
                function Cr(e) {
                    return Fl(Rd(e, a, Vd), e + "")
                }
                function Ml(e) {
                    return Yf(e, kt, $l)
                }
                function Ol(e) {
                    return Yf(e, nn, Bd)
                }
                var Rl = Ma ? function(e) {
                    return Ma.get(e)
                }
                : ec;
                function za(e) {
                    for (var t = e.name + "", i = zi[t], f = Ne.call(zi, t) ? i.length : 0; f--; ) {
                        var m = i[f]
                          , C = m.func;
                        if (C == null || C == e)
                            return m.name
                    }
                    return t
                }
                function Zi(e) {
                    var t = Ne.call(w, "placeholder") ? w : e;
                    return t.placeholder
                }
                function Le() {
                    var e = w.iteratee || Ql;
                    return e = e === Ql ? Qf : e,
                    arguments.length ? e(arguments[0], arguments[1]) : e
                }
                function Ga(e, t) {
                    var i = e.__data__;
                    return mm(t) ? i[typeof t == "string" ? "string" : "hash"] : i.map
                }
                function Nl(e) {
                    for (var t = kt(e), i = t.length; i--; ) {
                        var f = t[i]
                          , m = e[f];
                        t[i] = [f, m, Md(m)]
                    }
                    return t
                }
                function bi(e, t) {
                    var i = Sa(e, t);
                    return Zf(i) ? i : a
                }
                function cm(e) {
                    var t = Ne.call(e, pi)
                      , i = e[pi];
                    try {
                        e[pi] = a;
                        var f = !0
                    } catch {}
                    var m = ka.call(e);
                    return f && (t ? e[pi] = i : delete e[pi]),
                    m
                }
                var $l = cl ? function(e) {
                    return e == null ? [] : (e = ve(e),
                    ee(cl(e), function(t) {
                        return Nf.call(e, t)
                    }))
                }
                : tc
                  , Bd = cl ? function(e) {
                    for (var t = []; e; )
                        qe(t, $l(e)),
                        e = Ta(e);
                    return t
                }
                : tc
                  , $t = Ut;
                (fl && $t(new fl(new ArrayBuffer(1))) != Mr || Qo && $t(new Qo) != Gt || dl && $t(dl.resolve()) != An || Ki && $t(new Ki) != cn || Jo && $t(new Jo) != ke) && ($t = function(e) {
                    var t = Ut(e)
                      , i = t == Yt ? e.constructor : a
                      , f = i ? wi(i) : "";
                    if (f)
                        switch (f) {
                        case Kg:
                            return Mr;
                        case zg:
                            return Gt;
                        case Gg:
                            return An;
                        case Yg:
                            return cn;
                        case Xg:
                            return ke
                        }
                    return t
                }
                );
                function fm(e, t, i) {
                    for (var f = -1, m = i.length; ++f < m; ) {
                        var C = i[f]
                          , x = C.size;
                        switch (C.type) {
                        case "drop":
                            e += x;
                            break;
                        case "dropRight":
                            t -= x;
                            break;
                        case "take":
                            t = Nt(t, e + x);
                            break;
                        case "takeRight":
                            e = St(e, t - x);
                            break
                        }
                    }
                    return {
                        start: e,
                        end: t
                    }
                }
                function dm(e) {
                    var t = e.match(Vu);
                    return t ? t[1].split(ju) : []
                }
                function Ld(e, t, i) {
                    t = zr(t, e);
                    for (var f = -1, m = t.length, C = !1; ++f < m; ) {
                        var x = sr(t[f]);
                        if (!(C = e != null && i(e, x)))
                            break;
                        e = e[x]
                    }
                    return C || ++f != m ? C : (m = e == null ? 0 : e.length,
                    !!m && tu(m) && Sr(x, m) && (De(e) || Ci(e)))
                }
                function hm(e) {
                    var t = e.length
                      , i = new e.constructor(t);
                    return t && typeof e[0] == "string" && Ne.call(e, "index") && (i.index = e.index,
                    i.input = e.input),
                    i
                }
                function Pd(e) {
                    return typeof e.constructor == "function" && !us(e) ? Gi(Ta(e)) : {}
                }
                function pm(e, t, i) {
                    var f = e.constructor;
                    switch (t) {
                    case si:
                        return Bl(e);
                    case ln:
                    case Lt:
                        return new f(+e);
                    case Mr:
                        return Zy(e, i);
                    case To:
                    case Mi:
                    case Oi:
                    case fr:
                    case fn:
                    case Rn:
                    case Xn:
                    case Io:
                    case Or:
                        return pd(e, i);
                    case Gt:
                        return new f;
                    case ri:
                    case Pt:
                        return new f(e);
                    case ii:
                        return Qy(e);
                    case cn:
                        return new f;
                    case Yn:
                        return Jy(e)
                    }
                }
                function gm(e, t) {
                    var i = t.length;
                    if (!i)
                        return e;
                    var f = i - 1;
                    return t[f] = (i > 1 ? "& " : "") + t[f],
                    t = t.join(i > 2 ? ", " : " "),
                    e.replace(Uu, `{
/* [wrapped with ` + t + `] */
`)
                }
                function ym(e) {
                    return De(e) || Ci(e) || !!($f && e && e[$f])
                }
                function Sr(e, t) {
                    var i = typeof e;
                    return t = t ?? ae,
                    !!t && (i == "number" || i != "symbol" && $i.test(e)) && e > -1 && e % 1 == 0 && e < t
                }
                function Vt(e, t, i) {
                    if (!ht(i))
                        return !1;
                    var f = typeof t;
                    return (f == "number" ? tn(i) && Sr(t, i.length) : f == "string" && t in i) ? Fn(i[t], e) : !1
                }
                function ql(e, t) {
                    if (De(e))
                        return !1;
                    var i = typeof e;
                    return i == "number" || i == "symbol" || i == "boolean" || e == null || mn(e) ? !0 : Qs.test(e) || !Wu.test(e) || t != null && e in ve(t)
                }
                function mm(e) {
                    var t = typeof e;
                    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
                }
                function Dl(e) {
                    var t = za(e)
                      , i = w[t];
                    if (typeof i != "function" || !(t in Ye.prototype))
                        return !1;
                    if (e === i)
                        return !0;
                    var f = Rl(i);
                    return !!f && e === f[0]
                }
                function vm(e) {
                    return !!Mf && Mf in e
                }
                var bm = Wt ? Ar : nc;
                function us(e) {
                    var t = e && e.constructor
                      , i = typeof t == "function" && t.prototype || Ct;
                    return e === i
                }
                function Md(e) {
                    return e === e && !ht(e)
                }
                function Od(e, t) {
                    return function(i) {
                        return i == null ? !1 : i[e] === t && (t !== a || e in ve(i))
                    }
                }
                function wm(e) {
                    var t = Ja(e, function(f) {
                        return i.size === O && i.clear(),
                        f
                    })
                      , i = t.cache;
                    return t
                }
                function Cm(e, t) {
                    var i = e[1]
                      , f = t[1]
                      , m = i | f
                      , C = m < (he | J | l)
                      , x = f == l && i == Te || f == l && i == R && e[7].length <= t[8] || f == (l | R) && t[7].length <= t[8] && i == Te;
                    if (!(C || x))
                        return e;
                    f & he && (e[2] = t[2],
                    m |= i & he ? 0 : Oe);
                    var L = t[3];
                    if (L) {
                        var $ = e[3];
                        e[3] = $ ? yd($, L, t[4]) : L,
                        e[4] = $ ? gn(e[3], Z) : t[4]
                    }
                    return L = t[5],
                    L && ($ = e[5],
                    e[5] = $ ? md($, L, t[6]) : L,
                    e[6] = $ ? gn(e[5], Z) : t[6]),
                    L = t[7],
                    L && (e[7] = L),
                    f & l && (e[8] = e[8] == null ? t[8] : Nt(e[8], t[8])),
                    e[9] == null && (e[9] = t[9]),
                    e[0] = t[0],
                    e[1] = m,
                    e
                }
                function Sm(e) {
                    var t = [];
                    if (e != null)
                        for (var i in ve(e))
                            t.push(i);
                    return t
                }
                function Am(e) {
                    return ka.call(e)
                }
                function Rd(e, t, i) {
                    return t = St(t === a ? e.length - 1 : t, 0),
                    function() {
                        for (var f = arguments, m = -1, C = St(f.length - t, 0), x = I(C); ++m < C; )
                            x[m] = f[t + m];
                        m = -1;
                        for (var L = I(t + 1); ++m < t; )
                            L[m] = f[m];
                        return L[t] = i(x),
                        v(e, this, L)
                    }
                }
                function Nd(e, t) {
                    return t.length < 2 ? e : vi(e, In(t, 0, -1))
                }
                function _m(e, t) {
                    for (var i = e.length, f = Nt(t.length, i), m = en(e); f--; ) {
                        var C = t[f];
                        e[f] = Sr(C, i) ? m[C] : a
                    }
                    return e
                }
                function Hl(e, t) {
                    if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
                        return e[t]
                }
                var $d = Dd(sd)
                  , ls = Dg || function(e, t) {
                    return ft.setTimeout(e, t)
                }
                  , Fl = Dd(zy);
                function qd(e, t, i) {
                    var f = t + "";
                    return Fl(e, gm(f, km(dm(f), i)))
                }
                function Dd(e) {
                    var t = 0
                      , i = 0;
                    return function() {
                        var f = Ug()
                          , m = N - (f - i);
                        if (i = f,
                        m > 0) {
                            if (++t >= de)
                                return arguments[0]
                        } else
                            t = 0;
                        return e.apply(a, arguments)
                    }
                }
                function Ya(e, t) {
                    var i = -1
                      , f = e.length
                      , m = f - 1;
                    for (t = t === a ? f : t; ++i < t; ) {
                        var C = Al(i, m)
                          , x = e[C];
                        e[C] = e[i],
                        e[i] = x
                    }
                    return e.length = t,
                    e
                }
                var Hd = wm(function(e) {
                    var t = [];
                    return e.charCodeAt(0) === 46 && t.push(""),
                    e.replace(Js, function(i, f, m, C) {
                        t.push(m ? C.replace(zu, "$1") : f || i)
                    }),
                    t
                });
                function sr(e) {
                    if (typeof e == "string" || mn(e))
                        return e;
                    var t = e + "";
                    return t == "0" && 1 / e == -te ? "-0" : t
                }
                function wi(e) {
                    if (e != null) {
                        try {
                            return Dn.call(e)
                        } catch {}
                        try {
                            return e + ""
                        } catch {}
                    }
                    return ""
                }
                function km(e, t) {
                    return E(tt, function(i) {
                        var f = "_." + i[0];
                        t & i[1] && !F(e, f) && e.push(f)
                    }),
                    e.sort()
                }
                function Fd(e) {
                    if (e instanceof Ye)
                        return e.clone();
                    var t = new xn(e.__wrapped__,e.__chain__);
                    return t.__actions__ = en(e.__actions__),
                    t.__index__ = e.__index__,
                    t.__values__ = e.__values__,
                    t
                }
                function Em(e, t, i) {
                    (i ? Vt(e, t, i) : t === a) ? t = 1 : t = St(We(t), 0);
                    var f = e == null ? 0 : e.length;
                    if (!f || t < 1)
                        return [];
                    for (var m = 0, C = 0, x = I(La(f / t)); m < f; )
                        x[C++] = In(e, m, m += t);
                    return x
                }
                function xm(e) {
                    for (var t = -1, i = e == null ? 0 : e.length, f = 0, m = []; ++t < i; ) {
                        var C = e[t];
                        C && (m[f++] = C)
                    }
                    return m
                }
                function Tm() {
                    var e = arguments.length;
                    if (!e)
                        return [];
                    for (var t = I(e - 1), i = arguments[0], f = e; f--; )
                        t[f - 1] = arguments[f];
                    return qe(De(i) ? en(i) : [i], Tt(t, 1))
                }
                var Im = je(function(e, t) {
                    return yt(e) ? rs(e, Tt(t, 1, yt, !0)) : []
                })
                  , Bm = je(function(e, t) {
                    var i = Bn(t);
                    return yt(i) && (i = a),
                    yt(e) ? rs(e, Tt(t, 1, yt, !0), Le(i, 2)) : []
                })
                  , Lm = je(function(e, t) {
                    var i = Bn(t);
                    return yt(i) && (i = a),
                    yt(e) ? rs(e, Tt(t, 1, yt, !0), a, i) : []
                });
                function Pm(e, t, i) {
                    var f = e == null ? 0 : e.length;
                    return f ? (t = i || t === a ? 1 : We(t),
                    In(e, t < 0 ? 0 : t, f)) : []
                }
                function Mm(e, t, i) {
                    var f = e == null ? 0 : e.length;
                    return f ? (t = i || t === a ? 1 : We(t),
                    t = f - t,
                    In(e, 0, t < 0 ? 0 : t)) : []
                }
                function Om(e, t) {
                    return e && e.length ? Fa(e, Le(t, 3), !0, !0) : []
                }
                function Rm(e, t) {
                    return e && e.length ? Fa(e, Le(t, 3), !0) : []
                }
                function Nm(e, t, i, f) {
                    var m = e == null ? 0 : e.length;
                    return m ? (i && typeof i != "number" && Vt(e, t, i) && (i = 0,
                    f = m),
                    Ty(e, t, i, f)) : []
                }
                function Wd(e, t, i) {
                    var f = e == null ? 0 : e.length;
                    if (!f)
                        return -1;
                    var m = i == null ? 0 : We(i);
                    return m < 0 && (m = St(f + m, 0)),
                    ze(e, Le(t, 3), m)
                }
                function Ud(e, t, i) {
                    var f = e == null ? 0 : e.length;
                    if (!f)
                        return -1;
                    var m = f - 1;
                    return i !== a && (m = We(i),
                    m = i < 0 ? St(f + m, 0) : Nt(m, f - 1)),
                    ze(e, Le(t, 3), m, !0)
                }
                function Vd(e) {
                    var t = e == null ? 0 : e.length;
                    return t ? Tt(e, 1) : []
                }
                function $m(e) {
                    var t = e == null ? 0 : e.length;
                    return t ? Tt(e, te) : []
                }
                function qm(e, t) {
                    var i = e == null ? 0 : e.length;
                    return i ? (t = t === a ? 1 : We(t),
                    Tt(e, t)) : []
                }
                function Dm(e) {
                    for (var t = -1, i = e == null ? 0 : e.length, f = {}; ++t < i; ) {
                        var m = e[t];
                        f[m[0]] = m[1]
                    }
                    return f
                }
                function jd(e) {
                    return e && e.length ? e[0] : a
                }
                function Hm(e, t, i) {
                    var f = e == null ? 0 : e.length;
                    if (!f)
                        return -1;
                    var m = i == null ? 0 : We(i);
                    return m < 0 && (m = St(f + m, 0)),
                    it(e, t, m)
                }
                function Fm(e) {
                    var t = e == null ? 0 : e.length;
                    return t ? In(e, 0, -1) : []
                }
                var Wm = je(function(e) {
                    var t = we(e, Tl);
                    return t.length && t[0] === e[0] ? vl(t) : []
                })
                  , Um = je(function(e) {
                    var t = Bn(e)
                      , i = we(e, Tl);
                    return t === Bn(i) ? t = a : i.pop(),
                    i.length && i[0] === e[0] ? vl(i, Le(t, 2)) : []
                })
                  , Vm = je(function(e) {
                    var t = Bn(e)
                      , i = we(e, Tl);
                    return t = typeof t == "function" ? t : a,
                    t && i.pop(),
                    i.length && i[0] === e[0] ? vl(i, a, t) : []
                });
                function jm(e, t) {
                    return e == null ? "" : Fg.call(e, t)
                }
                function Bn(e) {
                    var t = e == null ? 0 : e.length;
                    return t ? e[t - 1] : a
                }
                function Km(e, t, i) {
                    var f = e == null ? 0 : e.length;
                    if (!f)
                        return -1;
                    var m = f;
                    return i !== a && (m = We(i),
                    m = m < 0 ? St(f + m, 0) : Nt(m, f - 1)),
                    t === t ? ji(e, t, m) : ze(e, Ui, m, !0)
                }
                function zm(e, t) {
                    return e && e.length ? nd(e, We(t)) : a
                }
                var Gm = je(Kd);
                function Kd(e, t) {
                    return e && e.length && t && t.length ? Sl(e, t) : e
                }
                function Ym(e, t, i) {
                    return e && e.length && t && t.length ? Sl(e, t, Le(i, 2)) : e
                }
                function Xm(e, t, i) {
                    return e && e.length && t && t.length ? Sl(e, t, a, i) : e
                }
                var Zm = Cr(function(e, t) {
                    var i = e == null ? 0 : e.length
                      , f = pl(e, t);
                    return od(e, we(t, function(m) {
                        return Sr(m, i) ? +m : m
                    }).sort(gd)),
                    f
                });
                function Qm(e, t) {
                    var i = [];
                    if (!(e && e.length))
                        return i;
                    var f = -1
                      , m = []
                      , C = e.length;
                    for (t = Le(t, 3); ++f < C; ) {
                        var x = e[f];
                        t(x, f, e) && (i.push(x),
                        m.push(f))
                    }
                    return od(e, m),
                    i
                }
                function Wl(e) {
                    return e == null ? e : jg.call(e)
                }
                function Jm(e, t, i) {
                    var f = e == null ? 0 : e.length;
                    return f ? (i && typeof i != "number" && Vt(e, t, i) ? (t = 0,
                    i = f) : (t = t == null ? 0 : We(t),
                    i = i === a ? f : We(i)),
                    In(e, t, i)) : []
                }
                function ev(e, t) {
                    return Ha(e, t)
                }
                function tv(e, t, i) {
                    return kl(e, t, Le(i, 2))
                }
                function nv(e, t) {
                    var i = e == null ? 0 : e.length;
                    if (i) {
                        var f = Ha(e, t);
                        if (f < i && Fn(e[f], t))
                            return f
                    }
                    return -1
                }
                function rv(e, t) {
                    return Ha(e, t, !0)
                }
                function iv(e, t, i) {
                    return kl(e, t, Le(i, 2), !0)
                }
                function ov(e, t) {
                    var i = e == null ? 0 : e.length;
                    if (i) {
                        var f = Ha(e, t, !0) - 1;
                        if (Fn(e[f], t))
                            return f
                    }
                    return -1
                }
                function sv(e) {
                    return e && e.length ? ad(e) : []
                }
                function av(e, t) {
                    return e && e.length ? ad(e, Le(t, 2)) : []
                }
                function uv(e) {
                    var t = e == null ? 0 : e.length;
                    return t ? In(e, 1, t) : []
                }
                function lv(e, t, i) {
                    return e && e.length ? (t = i || t === a ? 1 : We(t),
                    In(e, 0, t < 0 ? 0 : t)) : []
                }
                function cv(e, t, i) {
                    var f = e == null ? 0 : e.length;
                    return f ? (t = i || t === a ? 1 : We(t),
                    t = f - t,
                    In(e, t < 0 ? 0 : t, f)) : []
                }
                function fv(e, t) {
                    return e && e.length ? Fa(e, Le(t, 3), !1, !0) : []
                }
                function dv(e, t) {
                    return e && e.length ? Fa(e, Le(t, 3)) : []
                }
                var hv = je(function(e) {
                    return Kr(Tt(e, 1, yt, !0))
                })
                  , pv = je(function(e) {
                    var t = Bn(e);
                    return yt(t) && (t = a),
                    Kr(Tt(e, 1, yt, !0), Le(t, 2))
                })
                  , gv = je(function(e) {
                    var t = Bn(e);
                    return t = typeof t == "function" ? t : a,
                    Kr(Tt(e, 1, yt, !0), a, t)
                });
                function yv(e) {
                    return e && e.length ? Kr(e) : []
                }
                function mv(e, t) {
                    return e && e.length ? Kr(e, Le(t, 2)) : []
                }
                function vv(e, t) {
                    return t = typeof t == "function" ? t : a,
                    e && e.length ? Kr(e, a, t) : []
                }
                function Ul(e) {
                    if (!(e && e.length))
                        return [];
                    var t = 0;
                    return e = ee(e, function(i) {
                        if (yt(i))
                            return t = St(i.length, t),
                            !0
                    }),
                    fi(t, function(i) {
                        return we(e, gr(i))
                    })
                }
                function zd(e, t) {
                    if (!(e && e.length))
                        return [];
                    var i = Ul(e);
                    return t == null ? i : we(i, function(f) {
                        return v(t, a, f)
                    })
                }
                var bv = je(function(e, t) {
                    return yt(e) ? rs(e, t) : []
                })
                  , wv = je(function(e) {
                    return xl(ee(e, yt))
                })
                  , Cv = je(function(e) {
                    var t = Bn(e);
                    return yt(t) && (t = a),
                    xl(ee(e, yt), Le(t, 2))
                })
                  , Sv = je(function(e) {
                    var t = Bn(e);
                    return t = typeof t == "function" ? t : a,
                    xl(ee(e, yt), a, t)
                })
                  , Av = je(Ul);
                function _v(e, t) {
                    return fd(e || [], t || [], ns)
                }
                function kv(e, t) {
                    return fd(e || [], t || [], ss)
                }
                var Ev = je(function(e) {
                    var t = e.length
                      , i = t > 1 ? e[t - 1] : a;
                    return i = typeof i == "function" ? (e.pop(),
                    i) : a,
                    zd(e, i)
                });
                function Gd(e) {
                    var t = w(e);
                    return t.__chain__ = !0,
                    t
                }
                function xv(e, t) {
                    return t(e),
                    e
                }
                function Xa(e, t) {
                    return t(e)
                }
                var Tv = Cr(function(e) {
                    var t = e.length
                      , i = t ? e[0] : 0
                      , f = this.__wrapped__
                      , m = function(C) {
                        return pl(C, e)
                    };
                    return t > 1 || this.__actions__.length || !(f instanceof Ye) || !Sr(i) ? this.thru(m) : (f = f.slice(i, +i + (t ? 1 : 0)),
                    f.__actions__.push({
                        func: Xa,
                        args: [m],
                        thisArg: a
                    }),
                    new xn(f,this.__chain__).thru(function(C) {
                        return t && !C.length && C.push(a),
                        C
                    }))
                });
                function Iv() {
                    return Gd(this)
                }
                function Bv() {
                    return new xn(this.value(),this.__chain__)
                }
                function Lv() {
                    this.__values__ === a && (this.__values__ = uh(this.value()));
                    var e = this.__index__ >= this.__values__.length
                      , t = e ? a : this.__values__[this.__index__++];
                    return {
                        done: e,
                        value: t
                    }
                }
                function Pv() {
                    return this
                }
                function Mv(e) {
                    for (var t, i = this; i instanceof Ra; ) {
                        var f = Fd(i);
                        f.__index__ = 0,
                        f.__values__ = a,
                        t ? m.__wrapped__ = f : t = f;
                        var m = f;
                        i = i.__wrapped__
                    }
                    return m.__wrapped__ = e,
                    t
                }
                function Ov() {
                    var e = this.__wrapped__;
                    if (e instanceof Ye) {
                        var t = e;
                        return this.__actions__.length && (t = new Ye(this)),
                        t = t.reverse(),
                        t.__actions__.push({
                            func: Xa,
                            args: [Wl],
                            thisArg: a
                        }),
                        new xn(t,this.__chain__)
                    }
                    return this.thru(Wl)
                }
                function Rv() {
                    return cd(this.__wrapped__, this.__actions__)
                }
                var Nv = Wa(function(e, t, i) {
                    Ne.call(e, i) ? ++e[i] : br(e, i, 1)
                });
                function $v(e, t, i) {
                    var f = De(e) ? X : xy;
                    return i && Vt(e, t, i) && (t = a),
                    f(e, Le(t, 3))
                }
                function qv(e, t) {
                    var i = De(e) ? ee : zf;
                    return i(e, Le(t, 3))
                }
                var Dv = Cd(Wd)
                  , Hv = Cd(Ud);
                function Fv(e, t) {
                    return Tt(Za(e, t), 1)
                }
                function Wv(e, t) {
                    return Tt(Za(e, t), te)
                }
                function Uv(e, t, i) {
                    return i = i === a ? 1 : We(i),
                    Tt(Za(e, t), i)
                }
                function Yd(e, t) {
                    var i = De(e) ? E : jr;
                    return i(e, Le(t, 3))
                }
                function Xd(e, t) {
                    var i = De(e) ? M : Kf;
                    return i(e, Le(t, 3))
                }
                var Vv = Wa(function(e, t, i) {
                    Ne.call(e, i) ? e[i].push(t) : br(e, i, [t])
                });
                function jv(e, t, i, f) {
                    e = tn(e) ? e : Ji(e),
                    i = i && !f ? We(i) : 0;
                    var m = e.length;
                    return i < 0 && (i = St(m + i, 0)),
                    nu(e) ? i <= m && e.indexOf(t, i) > -1 : !!m && it(e, t, i) > -1
                }
                var Kv = je(function(e, t, i) {
                    var f = -1
                      , m = typeof t == "function"
                      , C = tn(e) ? I(e.length) : [];
                    return jr(e, function(x) {
                        C[++f] = m ? v(t, x, i) : is(x, t, i)
                    }),
                    C
                })
                  , zv = Wa(function(e, t, i) {
                    br(e, i, t)
                });
                function Za(e, t) {
                    var i = De(e) ? we : Jf;
                    return i(e, Le(t, 3))
                }
                function Gv(e, t, i, f) {
                    return e == null ? [] : (De(t) || (t = t == null ? [] : [t]),
                    i = f ? a : i,
                    De(i) || (i = i == null ? [] : [i]),
                    rd(e, t, i))
                }
                var Yv = Wa(function(e, t, i) {
                    e[i ? 0 : 1].push(t)
                }, function() {
                    return [[], []]
                });
                function Xv(e, t, i) {
                    var f = De(e) ? $e : $n
                      , m = arguments.length < 3;
                    return f(e, Le(t, 4), i, m, jr)
                }
                function Zv(e, t, i) {
                    var f = De(e) ? bt : $n
                      , m = arguments.length < 3;
                    return f(e, Le(t, 4), i, m, Kf)
                }
                function Qv(e, t) {
                    var i = De(e) ? ee : zf;
                    return i(e, eu(Le(t, 3)))
                }
                function Jv(e) {
                    var t = De(e) ? Wf : jy;
                    return t(e)
                }
                function eb(e, t, i) {
                    (i ? Vt(e, t, i) : t === a) ? t = 1 : t = We(t);
                    var f = De(e) ? Sy : Ky;
                    return f(e, t)
                }
                function tb(e) {
                    var t = De(e) ? Ay : Gy;
                    return t(e)
                }
                function nb(e) {
                    if (e == null)
                        return 0;
                    if (tn(e))
                        return nu(e) ? rr(e) : e.length;
                    var t = $t(e);
                    return t == Gt || t == cn ? e.size : wl(e).length
                }
                function rb(e, t, i) {
                    var f = De(e) ? dt : Yy;
                    return i && Vt(e, t, i) && (t = a),
                    f(e, Le(t, 3))
                }
                var ib = je(function(e, t) {
                    if (e == null)
                        return [];
                    var i = t.length;
                    return i > 1 && Vt(e, t[0], t[1]) ? t = [] : i > 2 && Vt(t[0], t[1], t[2]) && (t = [t[0]]),
                    rd(e, Tt(t, 1), [])
                })
                  , Qa = qg || function() {
                    return ft.Date.now()
                }
                ;
                function ob(e, t) {
                    if (typeof t != "function")
                        throw new Ve(b);
                    return e = We(e),
                    function() {
                        if (--e < 1)
                            return t.apply(this, arguments)
                    }
                }
                function Zd(e, t, i) {
                    return t = i ? a : t,
                    t = e && t == null ? e.length : t,
                    wr(e, l, a, a, a, a, t)
                }
                function Qd(e, t) {
                    var i;
                    if (typeof t != "function")
                        throw new Ve(b);
                    return e = We(e),
                    function() {
                        return --e > 0 && (i = t.apply(this, arguments)),
                        e <= 1 && (t = a),
                        i
                    }
                }
                var Vl = je(function(e, t, i) {
                    var f = he;
                    if (i.length) {
                        var m = gn(i, Zi(Vl));
                        f |= Ie
                    }
                    return wr(e, f, t, i, m)
                })
                  , Jd = je(function(e, t, i) {
                    var f = he | J;
                    if (i.length) {
                        var m = gn(i, Zi(Jd));
                        f |= Ie
                    }
                    return wr(t, f, e, i, m)
                });
                function eh(e, t, i) {
                    t = i ? a : t;
                    var f = wr(e, Te, a, a, a, a, a, t);
                    return f.placeholder = eh.placeholder,
                    f
                }
                function th(e, t, i) {
                    t = i ? a : t;
                    var f = wr(e, Re, a, a, a, a, a, t);
                    return f.placeholder = th.placeholder,
                    f
                }
                function nh(e, t, i) {
                    var f, m, C, x, L, $, oe = 0, se = !1, le = !1, ye = !0;
                    if (typeof e != "function")
                        throw new Ve(b);
                    t = Ln(t) || 0,
                    ht(i) && (se = !!i.leading,
                    le = "maxWait"in i,
                    C = le ? St(Ln(i.maxWait) || 0, t) : C,
                    ye = "trailing"in i ? !!i.trailing : ye);
                    function Ee(mt) {
                        var Wn = f
                          , kr = m;
                        return f = m = a,
                        oe = mt,
                        x = e.apply(kr, Wn),
                        x
                    }
                    function Pe(mt) {
                        return oe = mt,
                        L = ls(Ge, t),
                        se ? Ee(mt) : x
                    }
                    function Ue(mt) {
                        var Wn = mt - $
                          , kr = mt - oe
                          , Ch = t - Wn;
                        return le ? Nt(Ch, C - kr) : Ch
                    }
                    function Me(mt) {
                        var Wn = mt - $
                          , kr = mt - oe;
                        return $ === a || Wn >= t || Wn < 0 || le && kr >= C
                    }
                    function Ge() {
                        var mt = Qa();
                        if (Me(mt))
                            return Xe(mt);
                        L = ls(Ge, Ue(mt))
                    }
                    function Xe(mt) {
                        return L = a,
                        ye && f ? Ee(mt) : (f = m = a,
                        x)
                    }
                    function vn() {
                        L !== a && dd(L),
                        oe = 0,
                        f = $ = m = L = a
                    }
                    function jt() {
                        return L === a ? x : Xe(Qa())
                    }
                    function bn() {
                        var mt = Qa()
                          , Wn = Me(mt);
                        if (f = arguments,
                        m = this,
                        $ = mt,
                        Wn) {
                            if (L === a)
                                return Pe($);
                            if (le)
                                return dd(L),
                                L = ls(Ge, t),
                                Ee($)
                        }
                        return L === a && (L = ls(Ge, t)),
                        x
                    }
                    return bn.cancel = vn,
                    bn.flush = jt,
                    bn
                }
                var sb = je(function(e, t) {
                    return jf(e, 1, t)
                })
                  , ab = je(function(e, t, i) {
                    return jf(e, Ln(t) || 0, i)
                });
                function ub(e) {
                    return wr(e, j)
                }
                function Ja(e, t) {
                    if (typeof e != "function" || t != null && typeof t != "function")
                        throw new Ve(b);
                    var i = function() {
                        var f = arguments
                          , m = t ? t.apply(this, f) : f[0]
                          , C = i.cache;
                        if (C.has(m))
                            return C.get(m);
                        var x = e.apply(this, f);
                        return i.cache = C.set(m, x) || C,
                        x
                    };
                    return i.cache = new (Ja.Cache || vr),
                    i
                }
                Ja.Cache = vr;
                function eu(e) {
                    if (typeof e != "function")
                        throw new Ve(b);
                    return function() {
                        var t = arguments;
                        switch (t.length) {
                        case 0:
                            return !e.call(this);
                        case 1:
                            return !e.call(this, t[0]);
                        case 2:
                            return !e.call(this, t[0], t[1]);
                        case 3:
                            return !e.call(this, t[0], t[1], t[2])
                        }
                        return !e.apply(this, t)
                    }
                }
                function lb(e) {
                    return Qd(2, e)
                }
                var cb = Xy(function(e, t) {
                    t = t.length == 1 && De(t[0]) ? we(t[0], Ht(Le())) : we(Tt(t, 1), Ht(Le()));
                    var i = t.length;
                    return je(function(f) {
                        for (var m = -1, C = Nt(f.length, i); ++m < C; )
                            f[m] = t[m].call(this, f[m]);
                        return v(e, this, f)
                    })
                })
                  , jl = je(function(e, t) {
                    var i = gn(t, Zi(jl));
                    return wr(e, Ie, a, t, i)
                })
                  , rh = je(function(e, t) {
                    var i = gn(t, Zi(rh));
                    return wr(e, me, a, t, i)
                })
                  , fb = Cr(function(e, t) {
                    return wr(e, R, a, a, a, t)
                });
                function db(e, t) {
                    if (typeof e != "function")
                        throw new Ve(b);
                    return t = t === a ? t : We(t),
                    je(e, t)
                }
                function hb(e, t) {
                    if (typeof e != "function")
                        throw new Ve(b);
                    return t = t == null ? 0 : St(We(t), 0),
                    je(function(i) {
                        var f = i[t]
                          , m = Gr(i, 0, t);
                        return f && qe(m, f),
                        v(e, this, m)
                    })
                }
                function pb(e, t, i) {
                    var f = !0
                      , m = !0;
                    if (typeof e != "function")
                        throw new Ve(b);
                    return ht(i) && (f = "leading"in i ? !!i.leading : f,
                    m = "trailing"in i ? !!i.trailing : m),
                    nh(e, t, {
                        leading: f,
                        maxWait: t,
                        trailing: m
                    })
                }
                function gb(e) {
                    return Zd(e, 1)
                }
                function yb(e, t) {
                    return jl(Il(t), e)
                }
                function mb() {
                    if (!arguments.length)
                        return [];
                    var e = arguments[0];
                    return De(e) ? e : [e]
                }
                function vb(e) {
                    return Tn(e, G)
                }
                function bb(e, t) {
                    return t = typeof t == "function" ? t : a,
                    Tn(e, G, t)
                }
                function wb(e) {
                    return Tn(e, ue | G)
                }
                function Cb(e, t) {
                    return t = typeof t == "function" ? t : a,
                    Tn(e, ue | G, t)
                }
                function Sb(e, t) {
                    return t == null || Vf(e, t, kt(t))
                }
                function Fn(e, t) {
                    return e === t || e !== e && t !== t
                }
                var Ab = Ka(ml)
                  , _b = Ka(function(e, t) {
                    return e >= t
                })
                  , Ci = Xf(function() {
                    return arguments
                }()) ? Xf : function(e) {
                    return pt(e) && Ne.call(e, "callee") && !Nf.call(e, "callee")
                }
                  , De = I.isArray
                  , kb = n ? Ht(n) : My;
                function tn(e) {
                    return e != null && tu(e.length) && !Ar(e)
                }
                function yt(e) {
                    return pt(e) && tn(e)
                }
                function Eb(e) {
                    return e === !0 || e === !1 || pt(e) && Ut(e) == ln
                }
                var Yr = Hg || nc
                  , xb = s ? Ht(s) : Oy;
                function Tb(e) {
                    return pt(e) && e.nodeType === 1 && !cs(e)
                }
                function Ib(e) {
                    if (e == null)
                        return !0;
                    if (tn(e) && (De(e) || typeof e == "string" || typeof e.splice == "function" || Yr(e) || Qi(e) || Ci(e)))
                        return !e.length;
                    var t = $t(e);
                    if (t == Gt || t == cn)
                        return !e.size;
                    if (us(e))
                        return !wl(e).length;
                    for (var i in e)
                        if (Ne.call(e, i))
                            return !1;
                    return !0
                }
                function Bb(e, t) {
                    return os(e, t)
                }
                function Lb(e, t, i) {
                    i = typeof i == "function" ? i : a;
                    var f = i ? i(e, t) : a;
                    return f === a ? os(e, t, a, i) : !!f
                }
                function Kl(e) {
                    if (!pt(e))
                        return !1;
                    var t = Ut(e);
                    return t == Dt || t == at || typeof e.message == "string" && typeof e.name == "string" && !cs(e)
                }
                function Pb(e) {
                    return typeof e == "number" && qf(e)
                }
                function Ar(e) {
                    if (!ht(e))
                        return !1;
                    var t = Ut(e);
                    return t == Et || t == Sn || t == On || t == Hu
                }
                function ih(e) {
                    return typeof e == "number" && e == We(e)
                }
                function tu(e) {
                    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ae
                }
                function ht(e) {
                    var t = typeof e;
                    return e != null && (t == "object" || t == "function")
                }
                function pt(e) {
                    return e != null && typeof e == "object"
                }
                var oh = u ? Ht(u) : Ny;
                function Mb(e, t) {
                    return e === t || bl(e, t, Nl(t))
                }
                function Ob(e, t, i) {
                    return i = typeof i == "function" ? i : a,
                    bl(e, t, Nl(t), i)
                }
                function Rb(e) {
                    return sh(e) && e != +e
                }
                function Nb(e) {
                    if (bm(e))
                        throw new ie(y);
                    return Zf(e)
                }
                function $b(e) {
                    return e === null
                }
                function qb(e) {
                    return e == null
                }
                function sh(e) {
                    return typeof e == "number" || pt(e) && Ut(e) == ri
                }
                function cs(e) {
                    if (!pt(e) || Ut(e) != Yt)
                        return !1;
                    var t = Ta(e);
                    if (t === null)
                        return !0;
                    var i = Ne.call(t, "constructor") && t.constructor;
                    return typeof i == "function" && i instanceof i && Dn.call(i) == Og
                }
                var zl = d ? Ht(d) : $y;
                function Db(e) {
                    return ih(e) && e >= -ae && e <= ae
                }
                var ah = p ? Ht(p) : qy;
                function nu(e) {
                    return typeof e == "string" || !De(e) && pt(e) && Ut(e) == Pt
                }
                function mn(e) {
                    return typeof e == "symbol" || pt(e) && Ut(e) == Yn
                }
                var Qi = g ? Ht(g) : Dy;
                function Hb(e) {
                    return e === a
                }
                function Fb(e) {
                    return pt(e) && $t(e) == ke
                }
                function Wb(e) {
                    return pt(e) && Ut(e) == Mt
                }
                var Ub = Ka(Cl)
                  , Vb = Ka(function(e, t) {
                    return e <= t
                });
                function uh(e) {
                    if (!e)
                        return [];
                    if (tn(e))
                        return nu(e) ? Ft(e) : en(e);
                    if (Zo && e[Zo])
                        return nr(e[Zo]());
                    var t = $t(e)
                      , i = t == Gt ? Vi : t == cn ? yr : Ji;
                    return i(e)
                }
                function _r(e) {
                    if (!e)
                        return e === 0 ? e : 0;
                    if (e = Ln(e),
                    e === te || e === -te) {
                        var t = e < 0 ? -1 : 1;
                        return t * re
                    }
                    return e === e ? e : 0
                }
                function We(e) {
                    var t = _r(e)
                      , i = t % 1;
                    return t === t ? i ? t - i : t : 0
                }
                function lh(e) {
                    return e ? mi(We(e), 0, _e) : 0
                }
                function Ln(e) {
                    if (typeof e == "number")
                        return e;
                    if (mn(e))
                        return ce;
                    if (ht(e)) {
                        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
                        e = ht(t) ? t + "" : t
                    }
                    if (typeof e != "string")
                        return e === 0 ? e : +e;
                    e = En(e);
                    var i = ra.test(e);
                    return i || Lo.test(e) ? ol(e.slice(2), i ? 2 : 8) : $r.test(e) ? ce : +e
                }
                function ch(e) {
                    return or(e, nn(e))
                }
                function jb(e) {
                    return e ? mi(We(e), -ae, ae) : e === 0 ? e : 0
                }
                function rt(e) {
                    return e == null ? "" : yn(e)
                }
                var Kb = Yi(function(e, t) {
                    if (us(t) || tn(t)) {
                        or(t, kt(t), e);
                        return
                    }
                    for (var i in t)
                        Ne.call(t, i) && ns(e, i, t[i])
                })
                  , fh = Yi(function(e, t) {
                    or(t, nn(t), e)
                })
                  , ru = Yi(function(e, t, i, f) {
                    or(t, nn(t), e, f)
                })
                  , zb = Yi(function(e, t, i, f) {
                    or(t, kt(t), e, f)
                })
                  , Gb = Cr(pl);
                function Yb(e, t) {
                    var i = Gi(e);
                    return t == null ? i : Uf(i, t)
                }
                var Xb = je(function(e, t) {
                    e = ve(e);
                    var i = -1
                      , f = t.length
                      , m = f > 2 ? t[2] : a;
                    for (m && Vt(t[0], t[1], m) && (f = 1); ++i < f; )
                        for (var C = t[i], x = nn(C), L = -1, $ = x.length; ++L < $; ) {
                            var oe = x[L]
                              , se = e[oe];
                            (se === a || Fn(se, Ct[oe]) && !Ne.call(e, oe)) && (e[oe] = C[oe])
                        }
                    return e
                })
                  , Zb = je(function(e) {
                    return e.push(a, Td),
                    v(dh, a, e)
                });
                function Qb(e, t) {
                    return er(e, Le(t, 3), ir)
                }
                function Jb(e, t) {
                    return er(e, Le(t, 3), yl)
                }
                function e0(e, t) {
                    return e == null ? e : gl(e, Le(t, 3), nn)
                }
                function t0(e, t) {
                    return e == null ? e : Gf(e, Le(t, 3), nn)
                }
                function n0(e, t) {
                    return e && ir(e, Le(t, 3))
                }
                function r0(e, t) {
                    return e && yl(e, Le(t, 3))
                }
                function i0(e) {
                    return e == null ? [] : qa(e, kt(e))
                }
                function o0(e) {
                    return e == null ? [] : qa(e, nn(e))
                }
                function Gl(e, t, i) {
                    var f = e == null ? a : vi(e, t);
                    return f === a ? i : f
                }
                function s0(e, t) {
                    return e != null && Ld(e, t, Iy)
                }
                function Yl(e, t) {
                    return e != null && Ld(e, t, By)
                }
                var a0 = Ad(function(e, t, i) {
                    t != null && typeof t.toString != "function" && (t = ka.call(t)),
                    e[t] = i
                }, Zl(rn))
                  , u0 = Ad(function(e, t, i) {
                    t != null && typeof t.toString != "function" && (t = ka.call(t)),
                    Ne.call(e, t) ? e[t].push(i) : e[t] = [i]
                }, Le)
                  , l0 = je(is);
                function kt(e) {
                    return tn(e) ? Ff(e) : wl(e)
                }
                function nn(e) {
                    return tn(e) ? Ff(e, !0) : Hy(e)
                }
                function c0(e, t) {
                    var i = {};
                    return t = Le(t, 3),
                    ir(e, function(f, m, C) {
                        br(i, t(f, m, C), f)
                    }),
                    i
                }
                function f0(e, t) {
                    var i = {};
                    return t = Le(t, 3),
                    ir(e, function(f, m, C) {
                        br(i, m, t(f, m, C))
                    }),
                    i
                }
                var d0 = Yi(function(e, t, i) {
                    Da(e, t, i)
                })
                  , dh = Yi(function(e, t, i, f) {
                    Da(e, t, i, f)
                })
                  , h0 = Cr(function(e, t) {
                    var i = {};
                    if (e == null)
                        return i;
                    var f = !1;
                    t = we(t, function(C) {
                        return C = zr(C, e),
                        f || (f = C.length > 1),
                        C
                    }),
                    or(e, Ol(e), i),
                    f && (i = Tn(i, ue | pe | G, am));
                    for (var m = t.length; m--; )
                        El(i, t[m]);
                    return i
                });
                function p0(e, t) {
                    return hh(e, eu(Le(t)))
                }
                var g0 = Cr(function(e, t) {
                    return e == null ? {} : Wy(e, t)
                });
                function hh(e, t) {
                    if (e == null)
                        return {};
                    var i = we(Ol(e), function(f) {
                        return [f]
                    });
                    return t = Le(t),
                    id(e, i, function(f, m) {
                        return t(f, m[0])
                    })
                }
                function y0(e, t, i) {
                    t = zr(t, e);
                    var f = -1
                      , m = t.length;
                    for (m || (m = 1,
                    e = a); ++f < m; ) {
                        var C = e == null ? a : e[sr(t[f])];
                        C === a && (f = m,
                        C = i),
                        e = Ar(C) ? C.call(e) : C
                    }
                    return e
                }
                function m0(e, t, i) {
                    return e == null ? e : ss(e, t, i)
                }
                function v0(e, t, i, f) {
                    return f = typeof f == "function" ? f : a,
                    e == null ? e : ss(e, t, i, f)
                }
                var ph = Ed(kt)
                  , gh = Ed(nn);
                function b0(e, t, i) {
                    var f = De(e)
                      , m = f || Yr(e) || Qi(e);
                    if (t = Le(t, 4),
                    i == null) {
                        var C = e && e.constructor;
                        m ? i = f ? new C : [] : ht(e) ? i = Ar(C) ? Gi(Ta(e)) : {} : i = {}
                    }
                    return (m ? E : ir)(e, function(x, L, $) {
                        return t(i, x, L, $)
                    }),
                    i
                }
                function w0(e, t) {
                    return e == null ? !0 : El(e, t)
                }
                function C0(e, t, i) {
                    return e == null ? e : ld(e, t, Il(i))
                }
                function S0(e, t, i, f) {
                    return f = typeof f == "function" ? f : a,
                    e == null ? e : ld(e, t, Il(i), f)
                }
                function Ji(e) {
                    return e == null ? [] : zo(e, kt(e))
                }
                function A0(e) {
                    return e == null ? [] : zo(e, nn(e))
                }
                function _0(e, t, i) {
                    return i === a && (i = t,
                    t = a),
                    i !== a && (i = Ln(i),
                    i = i === i ? i : 0),
                    t !== a && (t = Ln(t),
                    t = t === t ? t : 0),
                    mi(Ln(e), t, i)
                }
                function k0(e, t, i) {
                    return t = _r(t),
                    i === a ? (i = t,
                    t = 0) : i = _r(i),
                    e = Ln(e),
                    Ly(e, t, i)
                }
                function E0(e, t, i) {
                    if (i && typeof i != "boolean" && Vt(e, t, i) && (t = i = a),
                    i === a && (typeof t == "boolean" ? (i = t,
                    t = a) : typeof e == "boolean" && (i = e,
                    e = a)),
                    e === a && t === a ? (e = 0,
                    t = 1) : (e = _r(e),
                    t === a ? (t = e,
                    e = 0) : t = _r(t)),
                    e > t) {
                        var f = e;
                        e = t,
                        t = f
                    }
                    if (i || e % 1 || t % 1) {
                        var m = Df();
                        return Nt(e + m * (t - e + jo("1e-" + ((m + "").length - 1))), t)
                    }
                    return Al(e, t)
                }
                var x0 = Xi(function(e, t, i) {
                    return t = t.toLowerCase(),
                    e + (i ? yh(t) : t)
                });
                function yh(e) {
                    return Xl(rt(e).toLowerCase())
                }
                function mh(e) {
                    return e = rt(e),
                    e && e.replace(ia, Wr).replace(Ju, "")
                }
                function T0(e, t, i) {
                    e = rt(e),
                    t = yn(t);
                    var f = e.length;
                    i = i === a ? f : mi(We(i), 0, f);
                    var m = i;
                    return i -= t.length,
                    i >= 0 && e.slice(i, m) == t
                }
                function I0(e) {
                    return e = rt(e),
                    e && Zs.test(e) ? e.replace(Rr, al) : e
                }
                function B0(e) {
                    return e = rt(e),
                    e && Nr.test(e) ? e.replace(Zn, "\\$&") : e
                }
                var L0 = Xi(function(e, t, i) {
                    return e + (i ? "-" : "") + t.toLowerCase()
                })
                  , P0 = Xi(function(e, t, i) {
                    return e + (i ? " " : "") + t.toLowerCase()
                })
                  , M0 = wd("toLowerCase");
                function O0(e, t, i) {
                    e = rt(e),
                    t = We(t);
                    var f = t ? rr(e) : 0;
                    if (!t || f >= t)
                        return e;
                    var m = (t - f) / 2;
                    return ja(Pa(m), i) + e + ja(La(m), i)
                }
                function R0(e, t, i) {
                    e = rt(e),
                    t = We(t);
                    var f = t ? rr(e) : 0;
                    return t && f < t ? e + ja(t - f, i) : e
                }
                function N0(e, t, i) {
                    e = rt(e),
                    t = We(t);
                    var f = t ? rr(e) : 0;
                    return t && f < t ? ja(t - f, i) + e : e
                }
                function $0(e, t, i) {
                    return i || t == null ? t = 0 : t && (t = +t),
                    Vg(rt(e).replace(ai, ""), t || 0)
                }
                function q0(e, t, i) {
                    return (i ? Vt(e, t, i) : t === a) ? t = 1 : t = We(t),
                    _l(rt(e), t)
                }
                function D0() {
                    var e = arguments
                      , t = rt(e[0]);
                    return e.length < 3 ? t : t.replace(e[1], e[2])
                }
                var H0 = Xi(function(e, t, i) {
                    return e + (i ? "_" : "") + t.toLowerCase()
                });
                function F0(e, t, i) {
                    return i && typeof i != "number" && Vt(e, t, i) && (t = i = a),
                    i = i === a ? _e : i >>> 0,
                    i ? (e = rt(e),
                    e && (typeof t == "string" || t != null && !zl(t)) && (t = yn(t),
                    !t && Jt(e)) ? Gr(Ft(e), 0, i) : e.split(t, i)) : []
                }
                var W0 = Xi(function(e, t, i) {
                    return e + (i ? " " : "") + Xl(t)
                });
                function U0(e, t, i) {
                    return e = rt(e),
                    i = i == null ? 0 : mi(We(i), 0, e.length),
                    t = yn(t),
                    e.slice(i, i + t.length) == t
                }
                function V0(e, t, i) {
                    var f = w.templateSettings;
                    i && Vt(e, t, i) && (t = a),
                    e = rt(e),
                    t = ru({}, t, f, xd);
                    var m = ru({}, t.imports, f.imports, xd), C = kt(m), x = zo(m, C), L, $, oe = 0, se = t.interpolate || qi, le = "__p += '", ye = Fe((t.escape || qi).source + "|" + se.source + "|" + (se === Ri ? ta : qi).source + "|" + (t.evaluate || qi).source + "|$", "g"), Ee = "//# sourceURL=" + (Ne.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++il + "]") + `
`;
                    e.replace(ye, function(Me, Ge, Xe, vn, jt, bn) {
                        return Xe || (Xe = vn),
                        le += e.slice(oe, bn).replace(ui, ul),
                        Ge && (L = !0,
                        le += `' +
__e(` + Ge + `) +
'`),
                        jt && ($ = !0,
                        le += `';
` + jt + `;
__p += '`),
                        Xe && (le += `' +
((__t = (` + Xe + `)) == null ? '' : __t) +
'`),
                        oe = bn + Me.length,
                        Me
                    }),
                    le += `';
`;
                    var Pe = Ne.call(t, "variable") && t.variable;
                    if (!Pe)
                        le = `with (obj) {
` + le + `
}
`;
                    else if (Ku.test(Pe))
                        throw new ie(k);
                    le = ($ ? le.replace(Gs, "") : le).replace(Ys, "$1").replace(Fu, "$1;"),
                    le = "function(" + (Pe || "obj") + `) {
` + (Pe ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (L ? ", __e = _.escape" : "") + ($ ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + le + `return __p
}`;
                    var Ue = bh(function() {
                        return Ce(C, Ee + "return " + le).apply(a, x)
                    });
                    if (Ue.source = le,
                    Kl(Ue))
                        throw Ue;
                    return Ue
                }
                function j0(e) {
                    return rt(e).toLowerCase()
                }
                function K0(e) {
                    return rt(e).toUpperCase()
                }
                function z0(e, t, i) {
                    if (e = rt(e),
                    e && (i || t === a))
                        return En(e);
                    if (!e || !(t = yn(t)))
                        return e;
                    var f = Ft(e)
                      , m = Ft(t)
                      , C = Je(f, m)
                      , x = hi(f, m) + 1;
                    return Gr(f, C, x).join("")
                }
                function G0(e, t, i) {
                    if (e = rt(e),
                    e && (i || t === a))
                        return e.slice(0, Aa(e) + 1);
                    if (!e || !(t = yn(t)))
                        return e;
                    var f = Ft(e)
                      , m = hi(f, Ft(t)) + 1;
                    return Gr(f, 0, m).join("")
                }
                function Y0(e, t, i) {
                    if (e = rt(e),
                    e && (i || t === a))
                        return e.replace(ai, "");
                    if (!e || !(t = yn(t)))
                        return e;
                    var f = Ft(e)
                      , m = Je(f, Ft(t));
                    return Gr(f, m).join("")
                }
                function X0(e, t) {
                    var i = Y
                      , f = z;
                    if (ht(t)) {
                        var m = "separator"in t ? t.separator : m;
                        i = "length"in t ? We(t.length) : i,
                        f = "omission"in t ? yn(t.omission) : f
                    }
                    e = rt(e);
                    var C = e.length;
                    if (Jt(e)) {
                        var x = Ft(e);
                        C = x.length
                    }
                    if (i >= C)
                        return e;
                    var L = i - rr(f);
                    if (L < 1)
                        return f;
                    var $ = x ? Gr(x, 0, L).join("") : e.slice(0, L);
                    if (m === a)
                        return $ + f;
                    if (x && (L += $.length - L),
                    zl(m)) {
                        if (e.slice(L).search(m)) {
                            var oe, se = $;
                            for (m.global || (m = Fe(m.source, rt(na.exec(m)) + "g")),
                            m.lastIndex = 0; oe = m.exec(se); )
                                var le = oe.index;
                            $ = $.slice(0, le === a ? L : le)
                        }
                    } else if (e.indexOf(yn(m), L) != L) {
                        var ye = $.lastIndexOf(m);
                        ye > -1 && ($ = $.slice(0, ye))
                    }
                    return $ + f
                }
                function Z0(e) {
                    return e = rt(e),
                    e && Xs.test(e) ? e.replace(dr, Xo) : e
                }
                var Q0 = Xi(function(e, t, i) {
                    return e + (i ? " " : "") + t.toUpperCase()
                })
                  , Xl = wd("toUpperCase");
                function vh(e, t, i) {
                    return e = rt(e),
                    t = i ? a : t,
                    t === a ? Go(e) ? P(e) : Ke(e) : e.match(t) || []
                }
                var bh = je(function(e, t) {
                    try {
                        return v(e, a, t)
                    } catch (i) {
                        return Kl(i) ? i : new ie(i)
                    }
                })
                  , J0 = Cr(function(e, t) {
                    return E(t, function(i) {
                        i = sr(i),
                        br(e, i, Vl(e[i], e))
                    }),
                    e
                });
                function ew(e) {
                    var t = e == null ? 0 : e.length
                      , i = Le();
                    return e = t ? we(e, function(f) {
                        if (typeof f[1] != "function")
                            throw new Ve(b);
                        return [i(f[0]), f[1]]
                    }) : [],
                    je(function(f) {
                        for (var m = -1; ++m < t; ) {
                            var C = e[m];
                            if (v(C[0], this, f))
                                return v(C[1], this, f)
                        }
                    })
                }
                function tw(e) {
                    return Ey(Tn(e, ue))
                }
                function Zl(e) {
                    return function() {
                        return e
                    }
                }
                function nw(e, t) {
                    return e == null || e !== e ? t : e
                }
                var rw = Sd()
                  , iw = Sd(!0);
                function rn(e) {
                    return e
                }
                function Ql(e) {
                    return Qf(typeof e == "function" ? e : Tn(e, ue))
                }
                function ow(e) {
                    return ed(Tn(e, ue))
                }
                function sw(e, t) {
                    return td(e, Tn(t, ue))
                }
                var aw = je(function(e, t) {
                    return function(i) {
                        return is(i, e, t)
                    }
                })
                  , uw = je(function(e, t) {
                    return function(i) {
                        return is(e, i, t)
                    }
                });
                function Jl(e, t, i) {
                    var f = kt(t)
                      , m = qa(t, f);
                    i == null && !(ht(t) && (m.length || !f.length)) && (i = t,
                    t = e,
                    e = this,
                    m = qa(t, kt(t)));
                    var C = !(ht(i) && "chain"in i) || !!i.chain
                      , x = Ar(e);
                    return E(m, function(L) {
                        var $ = t[L];
                        e[L] = $,
                        x && (e.prototype[L] = function() {
                            var oe = this.__chain__;
                            if (C || oe) {
                                var se = e(this.__wrapped__)
                                  , le = se.__actions__ = en(this.__actions__);
                                return le.push({
                                    func: $,
                                    args: arguments,
                                    thisArg: e
                                }),
                                se.__chain__ = oe,
                                se
                            }
                            return $.apply(e, qe([this.value()], arguments))
                        }
                        )
                    }),
                    e
                }
                function lw() {
                    return ft._ === this && (ft._ = Rg),
                    this
                }
                function ec() {}
                function cw(e) {
                    return e = We(e),
                    je(function(t) {
                        return nd(t, e)
                    })
                }
                var fw = Ll(we)
                  , dw = Ll(X)
                  , hw = Ll(dt);
                function wh(e) {
                    return ql(e) ? gr(sr(e)) : Uy(e)
                }
                function pw(e) {
                    return function(t) {
                        return e == null ? a : vi(e, t)
                    }
                }
                var gw = _d()
                  , yw = _d(!0);
                function tc() {
                    return []
                }
                function nc() {
                    return !1
                }
                function mw() {
                    return {}
                }
                function vw() {
                    return ""
                }
                function bw() {
                    return !0
                }
                function ww(e, t) {
                    if (e = We(e),
                    e < 1 || e > ae)
                        return [];
                    var i = _e
                      , f = Nt(e, _e);
                    t = Le(t),
                    e -= _e;
                    for (var m = fi(f, t); ++i < e; )
                        t(i);
                    return m
                }
                function Cw(e) {
                    return De(e) ? we(e, sr) : mn(e) ? [e] : en(Hd(rt(e)))
                }
                function Sw(e) {
                    var t = ++Mg;
                    return rt(e) + t
                }
                var Aw = Va(function(e, t) {
                    return e + t
                }, 0)
                  , _w = Pl("ceil")
                  , kw = Va(function(e, t) {
                    return e / t
                }, 1)
                  , Ew = Pl("floor");
                function xw(e) {
                    return e && e.length ? $a(e, rn, ml) : a
                }
                function Tw(e, t) {
                    return e && e.length ? $a(e, Le(t, 2), ml) : a
                }
                function Iw(e) {
                    return hn(e, rn)
                }
                function Bw(e, t) {
                    return hn(e, Le(t, 2))
                }
                function Lw(e) {
                    return e && e.length ? $a(e, rn, Cl) : a
                }
                function Pw(e, t) {
                    return e && e.length ? $a(e, Le(t, 2), Cl) : a
                }
                var Mw = Va(function(e, t) {
                    return e * t
                }, 1)
                  , Ow = Pl("round")
                  , Rw = Va(function(e, t) {
                    return e - t
                }, 0);
                function Nw(e) {
                    return e && e.length ? Rt(e, rn) : 0
                }
                function $w(e, t) {
                    return e && e.length ? Rt(e, Le(t, 2)) : 0
                }
                return w.after = ob,
                w.ary = Zd,
                w.assign = Kb,
                w.assignIn = fh,
                w.assignInWith = ru,
                w.assignWith = zb,
                w.at = Gb,
                w.before = Qd,
                w.bind = Vl,
                w.bindAll = J0,
                w.bindKey = Jd,
                w.castArray = mb,
                w.chain = Gd,
                w.chunk = Em,
                w.compact = xm,
                w.concat = Tm,
                w.cond = ew,
                w.conforms = tw,
                w.constant = Zl,
                w.countBy = Nv,
                w.create = Yb,
                w.curry = eh,
                w.curryRight = th,
                w.debounce = nh,
                w.defaults = Xb,
                w.defaultsDeep = Zb,
                w.defer = sb,
                w.delay = ab,
                w.difference = Im,
                w.differenceBy = Bm,
                w.differenceWith = Lm,
                w.drop = Pm,
                w.dropRight = Mm,
                w.dropRightWhile = Om,
                w.dropWhile = Rm,
                w.fill = Nm,
                w.filter = qv,
                w.flatMap = Fv,
                w.flatMapDeep = Wv,
                w.flatMapDepth = Uv,
                w.flatten = Vd,
                w.flattenDeep = $m,
                w.flattenDepth = qm,
                w.flip = ub,
                w.flow = rw,
                w.flowRight = iw,
                w.fromPairs = Dm,
                w.functions = i0,
                w.functionsIn = o0,
                w.groupBy = Vv,
                w.initial = Fm,
                w.intersection = Wm,
                w.intersectionBy = Um,
                w.intersectionWith = Vm,
                w.invert = a0,
                w.invertBy = u0,
                w.invokeMap = Kv,
                w.iteratee = Ql,
                w.keyBy = zv,
                w.keys = kt,
                w.keysIn = nn,
                w.map = Za,
                w.mapKeys = c0,
                w.mapValues = f0,
                w.matches = ow,
                w.matchesProperty = sw,
                w.memoize = Ja,
                w.merge = d0,
                w.mergeWith = dh,
                w.method = aw,
                w.methodOf = uw,
                w.mixin = Jl,
                w.negate = eu,
                w.nthArg = cw,
                w.omit = h0,
                w.omitBy = p0,
                w.once = lb,
                w.orderBy = Gv,
                w.over = fw,
                w.overArgs = cb,
                w.overEvery = dw,
                w.overSome = hw,
                w.partial = jl,
                w.partialRight = rh,
                w.partition = Yv,
                w.pick = g0,
                w.pickBy = hh,
                w.property = wh,
                w.propertyOf = pw,
                w.pull = Gm,
                w.pullAll = Kd,
                w.pullAllBy = Ym,
                w.pullAllWith = Xm,
                w.pullAt = Zm,
                w.range = gw,
                w.rangeRight = yw,
                w.rearg = fb,
                w.reject = Qv,
                w.remove = Qm,
                w.rest = db,
                w.reverse = Wl,
                w.sampleSize = eb,
                w.set = m0,
                w.setWith = v0,
                w.shuffle = tb,
                w.slice = Jm,
                w.sortBy = ib,
                w.sortedUniq = sv,
                w.sortedUniqBy = av,
                w.split = F0,
                w.spread = hb,
                w.tail = uv,
                w.take = lv,
                w.takeRight = cv,
                w.takeRightWhile = fv,
                w.takeWhile = dv,
                w.tap = xv,
                w.throttle = pb,
                w.thru = Xa,
                w.toArray = uh,
                w.toPairs = ph,
                w.toPairsIn = gh,
                w.toPath = Cw,
                w.toPlainObject = ch,
                w.transform = b0,
                w.unary = gb,
                w.union = hv,
                w.unionBy = pv,
                w.unionWith = gv,
                w.uniq = yv,
                w.uniqBy = mv,
                w.uniqWith = vv,
                w.unset = w0,
                w.unzip = Ul,
                w.unzipWith = zd,
                w.update = C0,
                w.updateWith = S0,
                w.values = Ji,
                w.valuesIn = A0,
                w.without = bv,
                w.words = vh,
                w.wrap = yb,
                w.xor = wv,
                w.xorBy = Cv,
                w.xorWith = Sv,
                w.zip = Av,
                w.zipObject = _v,
                w.zipObjectDeep = kv,
                w.zipWith = Ev,
                w.entries = ph,
                w.entriesIn = gh,
                w.extend = fh,
                w.extendWith = ru,
                Jl(w, w),
                w.add = Aw,
                w.attempt = bh,
                w.camelCase = x0,
                w.capitalize = yh,
                w.ceil = _w,
                w.clamp = _0,
                w.clone = vb,
                w.cloneDeep = wb,
                w.cloneDeepWith = Cb,
                w.cloneWith = bb,
                w.conformsTo = Sb,
                w.deburr = mh,
                w.defaultTo = nw,
                w.divide = kw,
                w.endsWith = T0,
                w.eq = Fn,
                w.escape = I0,
                w.escapeRegExp = B0,
                w.every = $v,
                w.find = Dv,
                w.findIndex = Wd,
                w.findKey = Qb,
                w.findLast = Hv,
                w.findLastIndex = Ud,
                w.findLastKey = Jb,
                w.floor = Ew,
                w.forEach = Yd,
                w.forEachRight = Xd,
                w.forIn = e0,
                w.forInRight = t0,
                w.forOwn = n0,
                w.forOwnRight = r0,
                w.get = Gl,
                w.gt = Ab,
                w.gte = _b,
                w.has = s0,
                w.hasIn = Yl,
                w.head = jd,
                w.identity = rn,
                w.includes = jv,
                w.indexOf = Hm,
                w.inRange = k0,
                w.invoke = l0,
                w.isArguments = Ci,
                w.isArray = De,
                w.isArrayBuffer = kb,
                w.isArrayLike = tn,
                w.isArrayLikeObject = yt,
                w.isBoolean = Eb,
                w.isBuffer = Yr,
                w.isDate = xb,
                w.isElement = Tb,
                w.isEmpty = Ib,
                w.isEqual = Bb,
                w.isEqualWith = Lb,
                w.isError = Kl,
                w.isFinite = Pb,
                w.isFunction = Ar,
                w.isInteger = ih,
                w.isLength = tu,
                w.isMap = oh,
                w.isMatch = Mb,
                w.isMatchWith = Ob,
                w.isNaN = Rb,
                w.isNative = Nb,
                w.isNil = qb,
                w.isNull = $b,
                w.isNumber = sh,
                w.isObject = ht,
                w.isObjectLike = pt,
                w.isPlainObject = cs,
                w.isRegExp = zl,
                w.isSafeInteger = Db,
                w.isSet = ah,
                w.isString = nu,
                w.isSymbol = mn,
                w.isTypedArray = Qi,
                w.isUndefined = Hb,
                w.isWeakMap = Fb,
                w.isWeakSet = Wb,
                w.join = jm,
                w.kebabCase = L0,
                w.last = Bn,
                w.lastIndexOf = Km,
                w.lowerCase = P0,
                w.lowerFirst = M0,
                w.lt = Ub,
                w.lte = Vb,
                w.max = xw,
                w.maxBy = Tw,
                w.mean = Iw,
                w.meanBy = Bw,
                w.min = Lw,
                w.minBy = Pw,
                w.stubArray = tc,
                w.stubFalse = nc,
                w.stubObject = mw,
                w.stubString = vw,
                w.stubTrue = bw,
                w.multiply = Mw,
                w.nth = zm,
                w.noConflict = lw,
                w.noop = ec,
                w.now = Qa,
                w.pad = O0,
                w.padEnd = R0,
                w.padStart = N0,
                w.parseInt = $0,
                w.random = E0,
                w.reduce = Xv,
                w.reduceRight = Zv,
                w.repeat = q0,
                w.replace = D0,
                w.result = y0,
                w.round = Ow,
                w.runInContext = S,
                w.sample = Jv,
                w.size = nb,
                w.snakeCase = H0,
                w.some = rb,
                w.sortedIndex = ev,
                w.sortedIndexBy = tv,
                w.sortedIndexOf = nv,
                w.sortedLastIndex = rv,
                w.sortedLastIndexBy = iv,
                w.sortedLastIndexOf = ov,
                w.startCase = W0,
                w.startsWith = U0,
                w.subtract = Rw,
                w.sum = Nw,
                w.sumBy = $w,
                w.template = V0,
                w.times = ww,
                w.toFinite = _r,
                w.toInteger = We,
                w.toLength = lh,
                w.toLower = j0,
                w.toNumber = Ln,
                w.toSafeInteger = jb,
                w.toString = rt,
                w.toUpper = K0,
                w.trim = z0,
                w.trimEnd = G0,
                w.trimStart = Y0,
                w.truncate = X0,
                w.unescape = Z0,
                w.uniqueId = Sw,
                w.upperCase = Q0,
                w.upperFirst = Xl,
                w.each = Yd,
                w.eachRight = Xd,
                w.first = jd,
                Jl(w, function() {
                    var e = {};
                    return ir(w, function(t, i) {
                        Ne.call(w.prototype, i) || (e[i] = t)
                    }),
                    e
                }(), {
                    chain: !1
                }),
                w.VERSION = c,
                E(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
                    w[e].placeholder = w
                }),
                E(["drop", "take"], function(e, t) {
                    Ye.prototype[e] = function(i) {
                        i = i === a ? 1 : St(We(i), 0);
                        var f = this.__filtered__ && !t ? new Ye(this) : this.clone();
                        return f.__filtered__ ? f.__takeCount__ = Nt(i, f.__takeCount__) : f.__views__.push({
                            size: Nt(i, _e),
                            type: e + (f.__dir__ < 0 ? "Right" : "")
                        }),
                        f
                    }
                    ,
                    Ye.prototype[e + "Right"] = function(i) {
                        return this.reverse()[e](i).reverse()
                    }
                }),
                E(["filter", "map", "takeWhile"], function(e, t) {
                    var i = t + 1
                      , f = i == V || i == K;
                    Ye.prototype[e] = function(m) {
                        var C = this.clone();
                        return C.__iteratees__.push({
                            iteratee: Le(m, 3),
                            type: i
                        }),
                        C.__filtered__ = C.__filtered__ || f,
                        C
                    }
                }),
                E(["head", "last"], function(e, t) {
                    var i = "take" + (t ? "Right" : "");
                    Ye.prototype[e] = function() {
                        return this[i](1).value()[0]
                    }
                }),
                E(["initial", "tail"], function(e, t) {
                    var i = "drop" + (t ? "" : "Right");
                    Ye.prototype[e] = function() {
                        return this.__filtered__ ? new Ye(this) : this[i](1)
                    }
                }),
                Ye.prototype.compact = function() {
                    return this.filter(rn)
                }
                ,
                Ye.prototype.find = function(e) {
                    return this.filter(e).head()
                }
                ,
                Ye.prototype.findLast = function(e) {
                    return this.reverse().find(e)
                }
                ,
                Ye.prototype.invokeMap = je(function(e, t) {
                    return typeof e == "function" ? new Ye(this) : this.map(function(i) {
                        return is(i, e, t)
                    })
                }),
                Ye.prototype.reject = function(e) {
                    return this.filter(eu(Le(e)))
                }
                ,
                Ye.prototype.slice = function(e, t) {
                    e = We(e);
                    var i = this;
                    return i.__filtered__ && (e > 0 || t < 0) ? new Ye(i) : (e < 0 ? i = i.takeRight(-e) : e && (i = i.drop(e)),
                    t !== a && (t = We(t),
                    i = t < 0 ? i.dropRight(-t) : i.take(t - e)),
                    i)
                }
                ,
                Ye.prototype.takeRightWhile = function(e) {
                    return this.reverse().takeWhile(e).reverse()
                }
                ,
                Ye.prototype.toArray = function() {
                    return this.take(_e)
                }
                ,
                ir(Ye.prototype, function(e, t) {
                    var i = /^(?:filter|find|map|reject)|While$/.test(t)
                      , f = /^(?:head|last)$/.test(t)
                      , m = w[f ? "take" + (t == "last" ? "Right" : "") : t]
                      , C = f || /^find/.test(t);
                    m && (w.prototype[t] = function() {
                        var x = this.__wrapped__
                          , L = f ? [1] : arguments
                          , $ = x instanceof Ye
                          , oe = L[0]
                          , se = $ || De(x)
                          , le = function(Ge) {
                            var Xe = m.apply(w, qe([Ge], L));
                            return f && ye ? Xe[0] : Xe
                        };
                        se && i && typeof oe == "function" && oe.length != 1 && ($ = se = !1);
                        var ye = this.__chain__
                          , Ee = !!this.__actions__.length
                          , Pe = C && !ye
                          , Ue = $ && !Ee;
                        if (!C && se) {
                            x = Ue ? x : new Ye(this);
                            var Me = e.apply(x, L);
                            return Me.__actions__.push({
                                func: Xa,
                                args: [le],
                                thisArg: a
                            }),
                            new xn(Me,ye)
                        }
                        return Pe && Ue ? e.apply(this, L) : (Me = this.thru(le),
                        Pe ? f ? Me.value()[0] : Me.value() : Me)
                    }
                    )
                }),
                E(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
                    var t = wt[e]
                      , i = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru"
                      , f = /^(?:pop|shift)$/.test(e);
                    w.prototype[e] = function() {
                        var m = arguments;
                        if (f && !this.__chain__) {
                            var C = this.value();
                            return t.apply(De(C) ? C : [], m)
                        }
                        return this[i](function(x) {
                            return t.apply(De(x) ? x : [], m)
                        })
                    }
                }),
                ir(Ye.prototype, function(e, t) {
                    var i = w[t];
                    if (i) {
                        var f = i.name + "";
                        Ne.call(zi, f) || (zi[f] = []),
                        zi[f].push({
                            name: t,
                            func: i
                        })
                    }
                }),
                zi[Ua(a, J).name] = [{
                    name: "wrapper",
                    func: a
                }],
                Ye.prototype.clone = Zg,
                Ye.prototype.reverse = Qg,
                Ye.prototype.value = Jg,
                w.prototype.at = Tv,
                w.prototype.chain = Iv,
                w.prototype.commit = Bv,
                w.prototype.next = Lv,
                w.prototype.plant = Mv,
                w.prototype.reverse = Ov,
                w.prototype.toJSON = w.prototype.valueOf = w.prototype.value = Rv,
                w.prototype.first = w.prototype.head,
                Zo && (w.prototype[Zo] = Pv),
                w
            }
              , U = H();
            Nn ? ((Nn.exports = U)._ = U,
            Wi._ = U) : ft._ = U
        }
        ).call(Qe)
    }(ps, ps.exports);
    var Eh = ps.exports;
    const Er = ct(Eh);
    var oc = {
        exports: {}
    };
    /*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
    (function(r) {
        (function(o, a) {
            r.exports = o.document ? a(o, !0) : function(c) {
                if (!c.document)
                    throw new Error("jQuery requires a window with a document");
                return a(c)
            }
        }
        )(typeof window < "u" ? window : Qe, function(o, a) {
            var c = []
              , h = Object.getPrototypeOf
              , y = c.slice
              , b = c.flat ? function(n) {
                return c.flat.call(n)
            }
            : function(n) {
                return c.concat.apply([], n)
            }
              , k = c.push
              , _ = c.indexOf
              , O = {}
              , Z = O.toString
              , ue = O.hasOwnProperty
              , pe = ue.toString
              , G = pe.call(Object)
              , W = {}
              , D = function(s) {
                return typeof s == "function" && typeof s.nodeType != "number" && typeof s.item != "function"
            }
              , he = function(s) {
                return s != null && s === s.window
            }
              , J = o.document
              , Oe = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };
            function Te(n, s, u) {
                u = u || J;
                var d, p, g = u.createElement("script");
                if (g.text = n,
                s)
                    for (d in Oe)
                        p = s[d] || s.getAttribute && s.getAttribute(d),
                        p && g.setAttribute(d, p);
                u.head.appendChild(g).parentNode.removeChild(g)
            }
            function Re(n) {
                return n == null ? n + "" : typeof n == "object" || typeof n == "function" ? O[Z.call(n)] || "object" : typeof n
            }
            var Ie = "3.7.1"
              , me = /HTML$/i
              , l = function(n, s) {
                return new l.fn.init(n,s)
            };
            l.fn = l.prototype = {
                jquery: Ie,
                constructor: l,
                length: 0,
                toArray: function() {
                    return y.call(this)
                },
                get: function(n) {
                    return n == null ? y.call(this) : n < 0 ? this[n + this.length] : this[n]
                },
                pushStack: function(n) {
                    var s = l.merge(this.constructor(), n);
                    return s.prevObject = this,
                    s
                },
                each: function(n) {
                    return l.each(this, n)
                },
                map: function(n) {
                    return this.pushStack(l.map(this, function(s, u) {
                        return n.call(s, u, s)
                    }))
                },
                slice: function() {
                    return this.pushStack(y.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                even: function() {
                    return this.pushStack(l.grep(this, function(n, s) {
                        return (s + 1) % 2
                    }))
                },
                odd: function() {
                    return this.pushStack(l.grep(this, function(n, s) {
                        return s % 2
                    }))
                },
                eq: function(n) {
                    var s = this.length
                      , u = +n + (n < 0 ? s : 0);
                    return this.pushStack(u >= 0 && u < s ? [this[u]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: k,
                sort: c.sort,
                splice: c.splice
            },
            l.extend = l.fn.extend = function() {
                var n, s, u, d, p, g, v = arguments[0] || {}, T = 1, E = arguments.length, M = !1;
                for (typeof v == "boolean" && (M = v,
                v = arguments[T] || {},
                T++),
                typeof v != "object" && !D(v) && (v = {}),
                T === E && (v = this,
                T--); T < E; T++)
                    if ((n = arguments[T]) != null)
                        for (s in n)
                            d = n[s],
                            !(s === "__proto__" || v === d) && (M && d && (l.isPlainObject(d) || (p = Array.isArray(d))) ? (u = v[s],
                            p && !Array.isArray(u) ? g = [] : !p && !l.isPlainObject(u) ? g = {} : g = u,
                            p = !1,
                            v[s] = l.extend(M, g, d)) : d !== void 0 && (v[s] = d));
                return v
            }
            ,
            l.extend({
                expando: "jQuery" + (Ie + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(n) {
                    throw new Error(n)
                },
                noop: function() {},
                isPlainObject: function(n) {
                    var s, u;
                    return !n || Z.call(n) !== "[object Object]" ? !1 : (s = h(n),
                    s ? (u = ue.call(s, "constructor") && s.constructor,
                    typeof u == "function" && pe.call(u) === G) : !0)
                },
                isEmptyObject: function(n) {
                    var s;
                    for (s in n)
                        return !1;
                    return !0
                },
                globalEval: function(n, s, u) {
                    Te(n, {
                        nonce: s && s.nonce
                    }, u)
                },
                each: function(n, s) {
                    var u, d = 0;
                    if (R(n))
                        for (u = n.length; d < u && s.call(n[d], d, n[d]) !== !1; d++)
                            ;
                    else
                        for (d in n)
                            if (s.call(n[d], d, n[d]) === !1)
                                break;
                    return n
                },
                text: function(n) {
                    var s, u = "", d = 0, p = n.nodeType;
                    if (!p)
                        for (; s = n[d++]; )
                            u += l.text(s);
                    return p === 1 || p === 11 ? n.textContent : p === 9 ? n.documentElement.textContent : p === 3 || p === 4 ? n.nodeValue : u
                },
                makeArray: function(n, s) {
                    var u = s || [];
                    return n != null && (R(Object(n)) ? l.merge(u, typeof n == "string" ? [n] : n) : k.call(u, n)),
                    u
                },
                inArray: function(n, s, u) {
                    return s == null ? -1 : _.call(s, n, u)
                },
                isXMLDoc: function(n) {
                    var s = n && n.namespaceURI
                      , u = n && (n.ownerDocument || n).documentElement;
                    return !me.test(s || u && u.nodeName || "HTML")
                },
                merge: function(n, s) {
                    for (var u = +s.length, d = 0, p = n.length; d < u; d++)
                        n[p++] = s[d];
                    return n.length = p,
                    n
                },
                grep: function(n, s, u) {
                    for (var d, p = [], g = 0, v = n.length, T = !u; g < v; g++)
                        d = !s(n[g], g),
                        d !== T && p.push(n[g]);
                    return p
                },
                map: function(n, s, u) {
                    var d, p, g = 0, v = [];
                    if (R(n))
                        for (d = n.length; g < d; g++)
                            p = s(n[g], g, u),
                            p != null && v.push(p);
                    else
                        for (g in n)
                            p = s(n[g], g, u),
                            p != null && v.push(p);
                    return b(v)
                },
                guid: 1,
                support: W
            }),
            typeof Symbol == "function" && (l.fn[Symbol.iterator] = c[Symbol.iterator]),
            l.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(n, s) {
                O["[object " + s + "]"] = s.toLowerCase()
            });
            function R(n) {
                var s = !!n && "length"in n && n.length
                  , u = Re(n);
                return D(n) || he(n) ? !1 : u === "array" || s === 0 || typeof s == "number" && s > 0 && s - 1 in n
            }
            function j(n, s) {
                return n.nodeName && n.nodeName.toLowerCase() === s.toLowerCase()
            }
            var Y = c.pop
              , z = c.sort
              , de = c.splice
              , N = "[\\x20\\t\\r\\n\\f]"
              , V = new RegExp("^" + N + "+|((?:^|[^\\\\])(?:\\\\.)*)" + N + "+$","g");
            l.contains = function(n, s) {
                var u = s && s.parentNode;
                return n === u || !!(u && u.nodeType === 1 && (n.contains ? n.contains(u) : n.compareDocumentPosition && n.compareDocumentPosition(u) & 16))
            }
            ;
            var q = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
            function K(n, s) {
                return s ? n === "\0" ? "�" : n.slice(0, -1) + "\\" + n.charCodeAt(n.length - 1).toString(16) + " " : "\\" + n
            }
            l.escapeSelector = function(n) {
                return (n + "").replace(q, K)
            }
            ;
            var te = J
              , ae = k;
            (function() {
                var n, s, u, d, p, g = ae, v, T, E, M, X, ee = l.expando, F = 0, fe = 0, we = hi(), qe = hi(), $e = hi(), bt = hi(), dt = function(A, P) {
                    return A === P && (p = !0),
                    0
                }, _n = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", kn = "(?:\\\\[\\da-fA-F]{1,6}" + N + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", Ke = "\\[" + N + "*(" + kn + ")(?:" + N + "*([*^$|!~]?=)" + N + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + kn + "))|)" + N + "*\\]", er = ":(" + kn + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + Ke + ")*)|.*)\\)|)", ze = new RegExp(N + "+","g"), it = new RegExp("^" + N + "*," + N + "*"), ci = new RegExp("^" + N + "*([>+~]|" + N + ")" + N + "*"), Ui = new RegExp(N + "|>"), hn = new RegExp(er), gr = new RegExp("^" + kn + "$"), Qt = {
                    ID: new RegExp("^#(" + kn + ")"),
                    CLASS: new RegExp("^\\.(" + kn + ")"),
                    TAG: new RegExp("^(" + kn + "|[*])"),
                    ATTR: new RegExp("^" + Ke),
                    PSEUDO: new RegExp("^" + er),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + N + "*(even|odd|(([+-]|)(\\d*)n|)" + N + "*(?:([+-]|)" + N + "*(\\d+)|))" + N + "*\\)|)","i"),
                    bool: new RegExp("^(?:" + _n + ")$","i"),
                    needsContext: new RegExp("^" + N + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + N + "*((?:-\\d)?\\d*)" + N + "*\\)|)(?=[^-]|$)","i")
                }, $n = /^(?:input|select|textarea|button)$/i, tr = /^h\d$/i, Rt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, fi = /[+~]/, qn = new RegExp("\\\\[\\da-fA-F]{1,6}" + N + "?|\\\\([^\\r\\n\\f])","g"), En = function(A, P) {
                    var H = "0x" + A.slice(1) - 65536;
                    return P || (H < 0 ? String.fromCharCode(H + 65536) : String.fromCharCode(H >> 10 | 55296, H & 1023 | 56320))
                }, Ht = function() {
                    nr()
                }, zo = yr(function(A) {
                    return A.disabled === !0 && j(A, "fieldset")
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
                function di() {
                    try {
                        return v.activeElement
                    } catch {}
                }
                try {
                    g.apply(c = y.call(te.childNodes), te.childNodes),
                    c[te.childNodes.length].nodeType
                } catch {
                    g = {
                        apply: function(P, H) {
                            ae.apply(P, y.call(H))
                        },
                        call: function(P) {
                            ae.apply(P, y.call(arguments, 1))
                        }
                    }
                }
                function Je(A, P, H, U) {
                    var S, B, I, ne, ie, Ce, Se, ve = P && P.ownerDocument, Fe = P ? P.nodeType : 9;
                    if (H = H || [],
                    typeof A != "string" || !A || Fe !== 1 && Fe !== 9 && Fe !== 11)
                        return H;
                    if (!U && (nr(P),
                    P = P || v,
                    E)) {
                        if (Fe !== 11 && (ie = Rt.exec(A)))
                            if (S = ie[1]) {
                                if (Fe === 9)
                                    if (I = P.getElementById(S)) {
                                        if (I.id === S)
                                            return g.call(H, I),
                                            H
                                    } else
                                        return H;
                                else if (ve && (I = ve.getElementById(S)) && Je.contains(P, I) && I.id === S)
                                    return g.call(H, I),
                                    H
                            } else {
                                if (ie[2])
                                    return g.apply(H, P.getElementsByTagName(A)),
                                    H;
                                if ((S = ie[3]) && P.getElementsByClassName)
                                    return g.apply(H, P.getElementsByClassName(S)),
                                    H
                            }
                        if (!bt[A + " "] && (!M || !M.test(A))) {
                            if (Se = A,
                            ve = P,
                            Fe === 1 && (Ui.test(A) || ci.test(A))) {
                                for (ve = fi.test(A) && Go(P.parentNode) || P,
                                (ve != P || !W.scope) && ((ne = P.getAttribute("id")) ? ne = l.escapeSelector(ne) : P.setAttribute("id", ne = ee)),
                                Ce = Ur(A),
                                B = Ce.length; B--; )
                                    Ce[B] = (ne ? "#" + ne : ":scope") + " " + gn(Ce[B]);
                                Se = Ce.join(",")
                            }
                            try {
                                return g.apply(H, ve.querySelectorAll(Se)),
                                H
                            } catch {
                                bt(A, !0)
                            } finally {
                                ne === ee && P.removeAttribute("id")
                            }
                        }
                    }
                    return _a(A.replace(V, "$1"), P, H, U)
                }
                function hi() {
                    var A = [];
                    function P(H, U) {
                        return A.push(H + " ") > s.cacheLength && delete P[A.shift()],
                        P[H + " "] = U
                    }
                    return P
                }
                function pn(A) {
                    return A[ee] = !0,
                    A
                }
                function Wr(A) {
                    var P = v.createElement("fieldset");
                    try {
                        return !!A(P)
                    } catch {
                        return !1
                    } finally {
                        P.parentNode && P.parentNode.removeChild(P),
                        P = null
                    }
                }
                function al(A) {
                    return function(P) {
                        return j(P, "input") && P.type === A
                    }
                }
                function ul(A) {
                    return function(P) {
                        return (j(P, "input") || j(P, "button")) && P.type === A
                    }
                }
                function Sa(A) {
                    return function(P) {
                        return "form"in P ? P.parentNode && P.disabled === !1 ? "label"in P ? "label"in P.parentNode ? P.parentNode.disabled === A : P.disabled === A : P.isDisabled === A || P.isDisabled !== !A && zo(P) === A : P.disabled === A : "label"in P ? P.disabled === A : !1
                    }
                }
                function Jt(A) {
                    return pn(function(P) {
                        return P = +P,
                        pn(function(H, U) {
                            for (var S, B = A([], H.length, P), I = B.length; I--; )
                                H[S = B[I]] && (H[S] = !(U[S] = H[S]))
                        })
                    })
                }
                function Go(A) {
                    return A && typeof A.getElementsByTagName < "u" && A
                }
                function nr(A) {
                    var P, H = A ? A.ownerDocument || A : te;
                    return H == v || H.nodeType !== 9 || !H.documentElement || (v = H,
                    T = v.documentElement,
                    E = !l.isXMLDoc(v),
                    X = T.matches || T.webkitMatchesSelector || T.msMatchesSelector,
                    T.msMatchesSelector && te != v && (P = v.defaultView) && P.top !== P && P.addEventListener("unload", Ht),
                    W.getById = Wr(function(U) {
                        return T.appendChild(U).id = l.expando,
                        !v.getElementsByName || !v.getElementsByName(l.expando).length
                    }),
                    W.disconnectedMatch = Wr(function(U) {
                        return X.call(U, "*")
                    }),
                    W.scope = Wr(function() {
                        return v.querySelectorAll(":scope")
                    }),
                    W.cssHas = Wr(function() {
                        try {
                            return v.querySelector(":has(*,:jqfake)"),
                            !1
                        } catch {
                            return !0
                        }
                    }),
                    W.getById ? (s.filter.ID = function(U) {
                        var S = U.replace(qn, En);
                        return function(B) {
                            return B.getAttribute("id") === S
                        }
                    }
                    ,
                    s.find.ID = function(U, S) {
                        if (typeof S.getElementById < "u" && E) {
                            var B = S.getElementById(U);
                            return B ? [B] : []
                        }
                    }
                    ) : (s.filter.ID = function(U) {
                        var S = U.replace(qn, En);
                        return function(B) {
                            var I = typeof B.getAttributeNode < "u" && B.getAttributeNode("id");
                            return I && I.value === S
                        }
                    }
                    ,
                    s.find.ID = function(U, S) {
                        if (typeof S.getElementById < "u" && E) {
                            var B, I, ne, ie = S.getElementById(U);
                            if (ie) {
                                if (B = ie.getAttributeNode("id"),
                                B && B.value === U)
                                    return [ie];
                                for (ne = S.getElementsByName(U),
                                I = 0; ie = ne[I++]; )
                                    if (B = ie.getAttributeNode("id"),
                                    B && B.value === U)
                                        return [ie]
                            }
                            return []
                        }
                    }
                    ),
                    s.find.TAG = function(U, S) {
                        return typeof S.getElementsByTagName < "u" ? S.getElementsByTagName(U) : S.querySelectorAll(U)
                    }
                    ,
                    s.find.CLASS = function(U, S) {
                        if (typeof S.getElementsByClassName < "u" && E)
                            return S.getElementsByClassName(U)
                    }
                    ,
                    M = [],
                    Wr(function(U) {
                        var S;
                        T.appendChild(U).innerHTML = "<a id='" + ee + "' href='' disabled='disabled'></a><select id='" + ee + "-\r\\' disabled='disabled'><option selected=''></option></select>",
                        U.querySelectorAll("[selected]").length || M.push("\\[" + N + "*(?:value|" + _n + ")"),
                        U.querySelectorAll("[id~=" + ee + "-]").length || M.push("~="),
                        U.querySelectorAll("a#" + ee + "+*").length || M.push(".#.+[+~]"),
                        U.querySelectorAll(":checked").length || M.push(":checked"),
                        S = v.createElement("input"),
                        S.setAttribute("type", "hidden"),
                        U.appendChild(S).setAttribute("name", "D"),
                        T.appendChild(U).disabled = !0,
                        U.querySelectorAll(":disabled").length !== 2 && M.push(":enabled", ":disabled"),
                        S = v.createElement("input"),
                        S.setAttribute("name", ""),
                        U.appendChild(S),
                        U.querySelectorAll("[name='']").length || M.push("\\[" + N + "*name" + N + "*=" + N + `*(?:''|"")`)
                    }),
                    W.cssHas || M.push(":has"),
                    M = M.length && new RegExp(M.join("|")),
                    dt = function(U, S) {
                        if (U === S)
                            return p = !0,
                            0;
                        var B = !U.compareDocumentPosition - !S.compareDocumentPosition;
                        return B || (B = (U.ownerDocument || U) == (S.ownerDocument || S) ? U.compareDocumentPosition(S) : 1,
                        B & 1 || !W.sortDetached && S.compareDocumentPosition(U) === B ? U === v || U.ownerDocument == te && Je.contains(te, U) ? -1 : S === v || S.ownerDocument == te && Je.contains(te, S) ? 1 : d ? _.call(d, U) - _.call(d, S) : 0 : B & 4 ? -1 : 1)
                    }
                    ),
                    v
                }
                Je.matches = function(A, P) {
                    return Je(A, null, null, P)
                }
                ,
                Je.matchesSelector = function(A, P) {
                    if (nr(A),
                    E && !bt[P + " "] && (!M || !M.test(P)))
                        try {
                            var H = X.call(A, P);
                            if (H || W.disconnectedMatch || A.document && A.document.nodeType !== 11)
                                return H
                        } catch {
                            bt(P, !0)
                        }
                    return Je(P, v, null, [A]).length > 0
                }
                ,
                Je.contains = function(A, P) {
                    return (A.ownerDocument || A) != v && nr(A),
                    l.contains(A, P)
                }
                ,
                Je.attr = function(A, P) {
                    (A.ownerDocument || A) != v && nr(A);
                    var H = s.attrHandle[P.toLowerCase()]
                      , U = H && ue.call(s.attrHandle, P.toLowerCase()) ? H(A, P, !E) : void 0;
                    return U !== void 0 ? U : A.getAttribute(P)
                }
                ,
                Je.error = function(A) {
                    throw new Error("Syntax error, unrecognized expression: " + A)
                }
                ,
                l.uniqueSort = function(A) {
                    var P, H = [], U = 0, S = 0;
                    if (p = !W.sortStable,
                    d = !W.sortStable && y.call(A, 0),
                    z.call(A, dt),
                    p) {
                        for (; P = A[S++]; )
                            P === A[S] && (U = H.push(S));
                        for (; U--; )
                            de.call(A, H[U], 1)
                    }
                    return d = null,
                    A
                }
                ,
                l.fn.uniqueSort = function() {
                    return this.pushStack(l.uniqueSort(y.apply(this)))
                }
                ,
                s = l.expr = {
                    cacheLength: 50,
                    createPseudo: pn,
                    match: Qt,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(A) {
                            return A[1] = A[1].replace(qn, En),
                            A[3] = (A[3] || A[4] || A[5] || "").replace(qn, En),
                            A[2] === "~=" && (A[3] = " " + A[3] + " "),
                            A.slice(0, 4)
                        },
                        CHILD: function(A) {
                            return A[1] = A[1].toLowerCase(),
                            A[1].slice(0, 3) === "nth" ? (A[3] || Je.error(A[0]),
                            A[4] = +(A[4] ? A[5] + (A[6] || 1) : 2 * (A[3] === "even" || A[3] === "odd")),
                            A[5] = +(A[7] + A[8] || A[3] === "odd")) : A[3] && Je.error(A[0]),
                            A
                        },
                        PSEUDO: function(A) {
                            var P, H = !A[6] && A[2];
                            return Qt.CHILD.test(A[0]) ? null : (A[3] ? A[2] = A[4] || A[5] || "" : H && hn.test(H) && (P = Ur(H, !0)) && (P = H.indexOf(")", H.length - P) - H.length) && (A[0] = A[0].slice(0, P),
                            A[2] = H.slice(0, P)),
                            A.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(A) {
                            var P = A.replace(qn, En).toLowerCase();
                            return A === "*" ? function() {
                                return !0
                            }
                            : function(H) {
                                return j(H, P)
                            }
                        },
                        CLASS: function(A) {
                            var P = we[A + " "];
                            return P || (P = new RegExp("(^|" + N + ")" + A + "(" + N + "|$)")) && we(A, function(H) {
                                return P.test(typeof H.className == "string" && H.className || typeof H.getAttribute < "u" && H.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(A, P, H) {
                            return function(U) {
                                var S = Je.attr(U, A);
                                return S == null ? P === "!=" : P ? (S += "",
                                P === "=" ? S === H : P === "!=" ? S !== H : P === "^=" ? H && S.indexOf(H) === 0 : P === "*=" ? H && S.indexOf(H) > -1 : P === "$=" ? H && S.slice(-H.length) === H : P === "~=" ? (" " + S.replace(ze, " ") + " ").indexOf(H) > -1 : P === "|=" ? S === H || S.slice(0, H.length + 1) === H + "-" : !1) : !0
                            }
                        },
                        CHILD: function(A, P, H, U, S) {
                            var B = A.slice(0, 3) !== "nth"
                              , I = A.slice(-4) !== "last"
                              , ne = P === "of-type";
                            return U === 1 && S === 0 ? function(ie) {
                                return !!ie.parentNode
                            }
                            : function(ie, Ce, Se) {
                                var ve, Fe, Be, Ve, wt, _t = B !== I ? "nextSibling" : "previousSibling", Ct = ie.parentNode, Wt = ne && ie.nodeName.toLowerCase(), Dn = !Se && !ne, Ne = !1;
                                if (Ct) {
                                    if (B) {
                                        for (; _t; ) {
                                            for (Be = ie; Be = Be[_t]; )
                                                if (ne ? j(Be, Wt) : Be.nodeType === 1)
                                                    return !1;
                                            wt = _t = A === "only" && !wt && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (wt = [I ? Ct.firstChild : Ct.lastChild],
                                    I && Dn) {
                                        for (Fe = Ct[ee] || (Ct[ee] = {}),
                                        ve = Fe[A] || [],
                                        Ve = ve[0] === F && ve[1],
                                        Ne = Ve && ve[2],
                                        Be = Ve && Ct.childNodes[Ve]; Be = ++Ve && Be && Be[_t] || (Ne = Ve = 0) || wt.pop(); )
                                            if (Be.nodeType === 1 && ++Ne && Be === ie) {
                                                Fe[A] = [F, Ve, Ne];
                                                break
                                            }
                                    } else if (Dn && (Fe = ie[ee] || (ie[ee] = {}),
                                    ve = Fe[A] || [],
                                    Ve = ve[0] === F && ve[1],
                                    Ne = Ve),
                                    Ne === !1)
                                        for (; (Be = ++Ve && Be && Be[_t] || (Ne = Ve = 0) || wt.pop()) && !((ne ? j(Be, Wt) : Be.nodeType === 1) && ++Ne && (Dn && (Fe = Be[ee] || (Be[ee] = {}),
                                        Fe[A] = [F, Ne]),
                                        Be === ie)); )
                                            ;
                                    return Ne -= S,
                                    Ne === U || Ne % U === 0 && Ne / U >= 0
                                }
                            }
                        },
                        PSEUDO: function(A, P) {
                            var H, U = s.pseudos[A] || s.setFilters[A.toLowerCase()] || Je.error("unsupported pseudo: " + A);
                            return U[ee] ? U(P) : U.length > 1 ? (H = [A, A, "", P],
                            s.setFilters.hasOwnProperty(A.toLowerCase()) ? pn(function(S, B) {
                                for (var I, ne = U(S, P), ie = ne.length; ie--; )
                                    I = _.call(S, ne[ie]),
                                    S[I] = !(B[I] = ne[ie])
                            }) : function(S) {
                                return U(S, 0, H)
                            }
                            ) : U
                        }
                    },
                    pseudos: {
                        not: pn(function(A) {
                            var P = []
                              , H = []
                              , U = Xo(A.replace(V, "$1"));
                            return U[ee] ? pn(function(S, B, I, ne) {
                                for (var ie, Ce = U(S, null, ne, []), Se = S.length; Se--; )
                                    (ie = Ce[Se]) && (S[Se] = !(B[Se] = ie))
                            }) : function(S, B, I) {
                                return P[0] = S,
                                U(P, null, I, H),
                                P[0] = null,
                                !H.pop()
                            }
                        }),
                        has: pn(function(A) {
                            return function(P) {
                                return Je(A, P).length > 0
                            }
                        }),
                        contains: pn(function(A) {
                            return A = A.replace(qn, En),
                            function(P) {
                                return (P.textContent || l.text(P)).indexOf(A) > -1
                            }
                        }),
                        lang: pn(function(A) {
                            return gr.test(A || "") || Je.error("unsupported lang: " + A),
                            A = A.replace(qn, En).toLowerCase(),
                            function(P) {
                                var H;
                                do
                                    if (H = E ? P.lang : P.getAttribute("xml:lang") || P.getAttribute("lang"))
                                        return H = H.toLowerCase(),
                                        H === A || H.indexOf(A + "-") === 0;
                                while ((P = P.parentNode) && P.nodeType === 1);
                                return !1
                            }
                        }),
                        target: function(A) {
                            var P = o.location && o.location.hash;
                            return P && P.slice(1) === A.id
                        },
                        root: function(A) {
                            return A === T
                        },
                        focus: function(A) {
                            return A === di() && v.hasFocus() && !!(A.type || A.href || ~A.tabIndex)
                        },
                        enabled: Sa(!1),
                        disabled: Sa(!0),
                        checked: function(A) {
                            return j(A, "input") && !!A.checked || j(A, "option") && !!A.selected
                        },
                        selected: function(A) {
                            return A.parentNode && A.parentNode.selectedIndex,
                            A.selected === !0
                        },
                        empty: function(A) {
                            for (A = A.firstChild; A; A = A.nextSibling)
                                if (A.nodeType < 6)
                                    return !1;
                            return !0
                        },
                        parent: function(A) {
                            return !s.pseudos.empty(A)
                        },
                        header: function(A) {
                            return tr.test(A.nodeName)
                        },
                        input: function(A) {
                            return $n.test(A.nodeName)
                        },
                        button: function(A) {
                            return j(A, "input") && A.type === "button" || j(A, "button")
                        },
                        text: function(A) {
                            var P;
                            return j(A, "input") && A.type === "text" && ((P = A.getAttribute("type")) == null || P.toLowerCase() === "text")
                        },
                        first: Jt(function() {
                            return [0]
                        }),
                        last: Jt(function(A, P) {
                            return [P - 1]
                        }),
                        eq: Jt(function(A, P, H) {
                            return [H < 0 ? H + P : H]
                        }),
                        even: Jt(function(A, P) {
                            for (var H = 0; H < P; H += 2)
                                A.push(H);
                            return A
                        }),
                        odd: Jt(function(A, P) {
                            for (var H = 1; H < P; H += 2)
                                A.push(H);
                            return A
                        }),
                        lt: Jt(function(A, P, H) {
                            var U;
                            for (H < 0 ? U = H + P : H > P ? U = P : U = H; --U >= 0; )
                                A.push(U);
                            return A
                        }),
                        gt: Jt(function(A, P, H) {
                            for (var U = H < 0 ? H + P : H; ++U < P; )
                                A.push(U);
                            return A
                        })
                    }
                },
                s.pseudos.nth = s.pseudos.eq;
                for (n in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                })
                    s.pseudos[n] = al(n);
                for (n in {
                    submit: !0,
                    reset: !0
                })
                    s.pseudos[n] = ul(n);
                function Vi() {}
                Vi.prototype = s.filters = s.pseudos,
                s.setFilters = new Vi;
                function Ur(A, P) {
                    var H, U, S, B, I, ne, ie, Ce = qe[A + " "];
                    if (Ce)
                        return P ? 0 : Ce.slice(0);
                    for (I = A,
                    ne = [],
                    ie = s.preFilter; I; ) {
                        (!H || (U = it.exec(I))) && (U && (I = I.slice(U[0].length) || I),
                        ne.push(S = [])),
                        H = !1,
                        (U = ci.exec(I)) && (H = U.shift(),
                        S.push({
                            value: H,
                            type: U[0].replace(V, " ")
                        }),
                        I = I.slice(H.length));
                        for (B in s.filter)
                            (U = Qt[B].exec(I)) && (!ie[B] || (U = ie[B](U))) && (H = U.shift(),
                            S.push({
                                value: H,
                                type: B,
                                matches: U
                            }),
                            I = I.slice(H.length));
                        if (!H)
                            break
                    }
                    return P ? I.length : I ? Je.error(A) : qe(A, ne).slice(0)
                }
                function gn(A) {
                    for (var P = 0, H = A.length, U = ""; P < H; P++)
                        U += A[P].value;
                    return U
                }
                function yr(A, P, H) {
                    var U = P.dir
                      , S = P.next
                      , B = S || U
                      , I = H && B === "parentNode"
                      , ne = fe++;
                    return P.first ? function(ie, Ce, Se) {
                        for (; ie = ie[U]; )
                            if (ie.nodeType === 1 || I)
                                return A(ie, Ce, Se);
                        return !1
                    }
                    : function(ie, Ce, Se) {
                        var ve, Fe, Be = [F, ne];
                        if (Se) {
                            for (; ie = ie[U]; )
                                if ((ie.nodeType === 1 || I) && A(ie, Ce, Se))
                                    return !0
                        } else
                            for (; ie = ie[U]; )
                                if (ie.nodeType === 1 || I)
                                    if (Fe = ie[ee] || (ie[ee] = {}),
                                    S && j(ie, S))
                                        ie = ie[U] || ie;
                                    else {
                                        if ((ve = Fe[B]) && ve[0] === F && ve[1] === ne)
                                            return Be[2] = ve[2];
                                        if (Fe[B] = Be,
                                        Be[2] = A(ie, Ce, Se))
                                            return !0
                                    }
                        return !1
                    }
                }
                function Yo(A) {
                    return A.length > 1 ? function(P, H, U) {
                        for (var S = A.length; S--; )
                            if (!A[S](P, H, U))
                                return !1;
                        return !0
                    }
                    : A[0]
                }
                function ll(A, P, H) {
                    for (var U = 0, S = P.length; U < S; U++)
                        Je(A, P[U], H);
                    return H
                }
                function ji(A, P, H, U, S) {
                    for (var B, I = [], ne = 0, ie = A.length, Ce = P != null; ne < ie; ne++)
                        (B = A[ne]) && (!H || H(B, U, S)) && (I.push(B),
                        Ce && P.push(ne));
                    return I
                }
                function rr(A, P, H, U, S, B) {
                    return U && !U[ee] && (U = rr(U)),
                    S && !S[ee] && (S = rr(S, B)),
                    pn(function(I, ne, ie, Ce) {
                        var Se, ve, Fe, Be, Ve = [], wt = [], _t = ne.length, Ct = I || ll(P || "*", ie.nodeType ? [ie] : ie, []), Wt = A && (I || !P) ? ji(Ct, Ve, A, ie, Ce) : Ct;
                        if (H ? (Be = S || (I ? A : _t || U) ? [] : ne,
                        H(Wt, Be, ie, Ce)) : Be = Wt,
                        U)
                            for (Se = ji(Be, wt),
                            U(Se, [], ie, Ce),
                            ve = Se.length; ve--; )
                                (Fe = Se[ve]) && (Be[wt[ve]] = !(Wt[wt[ve]] = Fe));
                        if (I) {
                            if (S || A) {
                                if (S) {
                                    for (Se = [],
                                    ve = Be.length; ve--; )
                                        (Fe = Be[ve]) && Se.push(Wt[ve] = Fe);
                                    S(null, Be = [], Se, Ce)
                                }
                                for (ve = Be.length; ve--; )
                                    (Fe = Be[ve]) && (Se = S ? _.call(I, Fe) : Ve[ve]) > -1 && (I[Se] = !(ne[Se] = Fe))
                            }
                        } else
                            Be = ji(Be === ne ? Be.splice(_t, Be.length) : Be),
                            S ? S(null, ne, Be, Ce) : g.apply(ne, Be)
                    })
                }
                function Ft(A) {
                    for (var P, H, U, S = A.length, B = s.relative[A[0].type], I = B || s.relative[" "], ne = B ? 1 : 0, ie = yr(function(ve) {
                        return ve === P
                    }, I, !0), Ce = yr(function(ve) {
                        return _.call(P, ve) > -1
                    }, I, !0), Se = [function(ve, Fe, Be) {
                        var Ve = !B && (Be || Fe != u) || ((P = Fe).nodeType ? ie(ve, Fe, Be) : Ce(ve, Fe, Be));
                        return P = null,
                        Ve
                    }
                    ]; ne < S; ne++)
                        if (H = s.relative[A[ne].type])
                            Se = [yr(Yo(Se), H)];
                        else {
                            if (H = s.filter[A[ne].type].apply(null, A[ne].matches),
                            H[ee]) {
                                for (U = ++ne; U < S && !s.relative[A[U].type]; U++)
                                    ;
                                return rr(ne > 1 && Yo(Se), ne > 1 && gn(A.slice(0, ne - 1).concat({
                                    value: A[ne - 2].type === " " ? "*" : ""
                                })).replace(V, "$1"), H, ne < U && Ft(A.slice(ne, U)), U < S && Ft(A = A.slice(U)), U < S && gn(A))
                            }
                            Se.push(H)
                        }
                    return Yo(Se)
                }
                function Aa(A, P) {
                    var H = P.length > 0
                      , U = A.length > 0
                      , S = function(B, I, ne, ie, Ce) {
                        var Se, ve, Fe, Be = 0, Ve = "0", wt = B && [], _t = [], Ct = u, Wt = B || U && s.find.TAG("*", Ce), Dn = F += Ct == null ? 1 : Math.random() || .1, Ne = Wt.length;
                        for (Ce && (u = I == v || I || Ce); Ve !== Ne && (Se = Wt[Ve]) != null; Ve++) {
                            if (U && Se) {
                                for (ve = 0,
                                !I && Se.ownerDocument != v && (nr(Se),
                                ne = !E); Fe = A[ve++]; )
                                    if (Fe(Se, I || v, ne)) {
                                        g.call(ie, Se);
                                        break
                                    }
                                Ce && (F = Dn)
                            }
                            H && ((Se = !Fe && Se) && Be--,
                            B && wt.push(Se))
                        }
                        if (Be += Ve,
                        H && Ve !== Be) {
                            for (ve = 0; Fe = P[ve++]; )
                                Fe(wt, _t, I, ne);
                            if (B) {
                                if (Be > 0)
                                    for (; Ve--; )
                                        wt[Ve] || _t[Ve] || (_t[Ve] = Y.call(ie));
                                _t = ji(_t)
                            }
                            g.apply(ie, _t),
                            Ce && !B && _t.length > 0 && Be + P.length > 1 && l.uniqueSort(ie)
                        }
                        return Ce && (F = Dn,
                        u = Ct),
                        wt
                    };
                    return H ? pn(S) : S
                }
                function Xo(A, P) {
                    var H, U = [], S = [], B = $e[A + " "];
                    if (!B) {
                        for (P || (P = Ur(A)),
                        H = P.length; H--; )
                            B = Ft(P[H]),
                            B[ee] ? U.push(B) : S.push(B);
                        B = $e(A, Aa(S, U)),
                        B.selector = A
                    }
                    return B
                }
                function _a(A, P, H, U) {
                    var S, B, I, ne, ie, Ce = typeof A == "function" && A, Se = !U && Ur(A = Ce.selector || A);
                    if (H = H || [],
                    Se.length === 1) {
                        if (B = Se[0] = Se[0].slice(0),
                        B.length > 2 && (I = B[0]).type === "ID" && P.nodeType === 9 && E && s.relative[B[1].type]) {
                            if (P = (s.find.ID(I.matches[0].replace(qn, En), P) || [])[0],
                            P)
                                Ce && (P = P.parentNode);
                            else
                                return H;
                            A = A.slice(B.shift().value.length)
                        }
                        for (S = Qt.needsContext.test(A) ? 0 : B.length; S-- && (I = B[S],
                        !s.relative[ne = I.type]); )
                            if ((ie = s.find[ne]) && (U = ie(I.matches[0].replace(qn, En), fi.test(B[0].type) && Go(P.parentNode) || P))) {
                                if (B.splice(S, 1),
                                A = U.length && gn(B),
                                !A)
                                    return g.apply(H, U),
                                    H;
                                break
                            }
                    }
                    return (Ce || Xo(A, Se))(U, P, !E, H, !P || fi.test(A) && Go(P.parentNode) || P),
                    H
                }
                W.sortStable = ee.split("").sort(dt).join("") === ee,
                nr(),
                W.sortDetached = Wr(function(A) {
                    return A.compareDocumentPosition(v.createElement("fieldset")) & 1
                }),
                l.find = Je,
                l.expr[":"] = l.expr.pseudos,
                l.unique = l.uniqueSort,
                Je.compile = Xo,
                Je.select = _a,
                Je.setDocument = nr,
                Je.tokenize = Ur,
                Je.escape = l.escapeSelector,
                Je.getText = l.text,
                Je.isXML = l.isXMLDoc,
                Je.selectors = l.expr,
                Je.support = l.support,
                Je.uniqueSort = l.uniqueSort
            }
            )();
            var re = function(n, s, u) {
                for (var d = [], p = u !== void 0; (n = n[s]) && n.nodeType !== 9; )
                    if (n.nodeType === 1) {
                        if (p && l(n).is(u))
                            break;
                        d.push(n)
                    }
                return d
            }
              , ce = function(n, s) {
                for (var u = []; n; n = n.nextSibling)
                    n.nodeType === 1 && n !== s && u.push(n);
                return u
            }
              , _e = l.expr.match.needsContext
              , He = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
            function Ze(n, s, u) {
                return D(s) ? l.grep(n, function(d, p) {
                    return !!s.call(d, p, d) !== u
                }) : s.nodeType ? l.grep(n, function(d) {
                    return d === s !== u
                }) : typeof s != "string" ? l.grep(n, function(d) {
                    return _.call(s, d) > -1 !== u
                }) : l.filter(s, n, u)
            }
            l.filter = function(n, s, u) {
                var d = s[0];
                return u && (n = ":not(" + n + ")"),
                s.length === 1 && d.nodeType === 1 ? l.find.matchesSelector(d, n) ? [d] : [] : l.find.matches(n, l.grep(s, function(p) {
                    return p.nodeType === 1
                }))
            }
            ,
            l.fn.extend({
                find: function(n) {
                    var s, u, d = this.length, p = this;
                    if (typeof n != "string")
                        return this.pushStack(l(n).filter(function() {
                            for (s = 0; s < d; s++)
                                if (l.contains(p[s], this))
                                    return !0
                        }));
                    for (u = this.pushStack([]),
                    s = 0; s < d; s++)
                        l.find(n, p[s], u);
                    return d > 1 ? l.uniqueSort(u) : u
                },
                filter: function(n) {
                    return this.pushStack(Ze(this, n || [], !1))
                },
                not: function(n) {
                    return this.pushStack(Ze(this, n || [], !0))
                },
                is: function(n) {
                    return !!Ze(this, typeof n == "string" && _e.test(n) ? l(n) : n || [], !1).length
                }
            });
            var tt, ot = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, un = l.fn.init = function(n, s, u) {
                var d, p;
                if (!n)
                    return this;
                if (u = u || tt,
                typeof n == "string")
                    if (n[0] === "<" && n[n.length - 1] === ">" && n.length >= 3 ? d = [null, n, null] : d = ot.exec(n),
                    d && (d[1] || !s))
                        if (d[1]) {
                            if (s = s instanceof l ? s[0] : s,
                            l.merge(this, l.parseHTML(d[1], s && s.nodeType ? s.ownerDocument || s : J, !0)),
                            He.test(d[1]) && l.isPlainObject(s))
                                for (d in s)
                                    D(this[d]) ? this[d](s[d]) : this.attr(d, s[d]);
                            return this
                        } else
                            return p = J.getElementById(d[2]),
                            p && (this[0] = p,
                            this.length = 1),
                            this;
                    else
                        return !s || s.jquery ? (s || u).find(n) : this.constructor(s).find(n);
                else {
                    if (n.nodeType)
                        return this[0] = n,
                        this.length = 1,
                        this;
                    if (D(n))
                        return u.ready !== void 0 ? u.ready(n) : n(l)
                }
                return l.makeArray(n, this)
            }
            ;
            un.prototype = l.fn,
            tt = l(J);
            var On = /^(?:parents|prev(?:Until|All))/
              , ln = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            l.fn.extend({
                has: function(n) {
                    var s = l(n, this)
                      , u = s.length;
                    return this.filter(function() {
                        for (var d = 0; d < u; d++)
                            if (l.contains(this, s[d]))
                                return !0
                    })
                },
                closest: function(n, s) {
                    var u, d = 0, p = this.length, g = [], v = typeof n != "string" && l(n);
                    if (!_e.test(n)) {
                        for (; d < p; d++)
                            for (u = this[d]; u && u !== s; u = u.parentNode)
                                if (u.nodeType < 11 && (v ? v.index(u) > -1 : u.nodeType === 1 && l.find.matchesSelector(u, n))) {
                                    g.push(u);
                                    break
                                }
                    }
                    return this.pushStack(g.length > 1 ? l.uniqueSort(g) : g)
                },
                index: function(n) {
                    return n ? typeof n == "string" ? _.call(l(n), this[0]) : _.call(this, n.jquery ? n[0] : n) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(n, s) {
                    return this.pushStack(l.uniqueSort(l.merge(this.get(), l(n, s))))
                },
                addBack: function(n) {
                    return this.add(n == null ? this.prevObject : this.prevObject.filter(n))
                }
            });
            function Lt(n, s) {
                for (; (n = n[s]) && n.nodeType !== 1; )
                    ;
                return n
            }
            l.each({
                parent: function(n) {
                    var s = n.parentNode;
                    return s && s.nodeType !== 11 ? s : null
                },
                parents: function(n) {
                    return re(n, "parentNode")
                },
                parentsUntil: function(n, s, u) {
                    return re(n, "parentNode", u)
                },
                next: function(n) {
                    return Lt(n, "nextSibling")
                },
                prev: function(n) {
                    return Lt(n, "previousSibling")
                },
                nextAll: function(n) {
                    return re(n, "nextSibling")
                },
                prevAll: function(n) {
                    return re(n, "previousSibling")
                },
                nextUntil: function(n, s, u) {
                    return re(n, "nextSibling", u)
                },
                prevUntil: function(n, s, u) {
                    return re(n, "previousSibling", u)
                },
                siblings: function(n) {
                    return ce((n.parentNode || {}).firstChild, n)
                },
                children: function(n) {
                    return ce(n.firstChild)
                },
                contents: function(n) {
                    return n.contentDocument != null && h(n.contentDocument) ? n.contentDocument : (j(n, "template") && (n = n.content || n),
                    l.merge([], n.childNodes))
                }
            }, function(n, s) {
                l.fn[n] = function(u, d) {
                    var p = l.map(this, s, u);
                    return n.slice(-5) !== "Until" && (d = u),
                    d && typeof d == "string" && (p = l.filter(d, p)),
                    this.length > 1 && (ln[n] || l.uniqueSort(p),
                    On.test(n) && p.reverse()),
                    this.pushStack(p)
                }
            });
            var at = /[^\x20\t\r\n\f]+/g;
            function Dt(n) {
                var s = {};
                return l.each(n.match(at) || [], function(u, d) {
                    s[d] = !0
                }),
                s
            }
            l.Callbacks = function(n) {
                n = typeof n == "string" ? Dt(n) : l.extend({}, n);
                var s, u, d, p, g = [], v = [], T = -1, E = function() {
                    for (p = p || n.once,
                    d = s = !0; v.length; T = -1)
                        for (u = v.shift(); ++T < g.length; )
                            g[T].apply(u[0], u[1]) === !1 && n.stopOnFalse && (T = g.length,
                            u = !1);
                    n.memory || (u = !1),
                    s = !1,
                    p && (u ? g = [] : g = "")
                }, M = {
                    add: function() {
                        return g && (u && !s && (T = g.length - 1,
                        v.push(u)),
                        function X(ee) {
                            l.each(ee, function(F, fe) {
                                D(fe) ? (!n.unique || !M.has(fe)) && g.push(fe) : fe && fe.length && Re(fe) !== "string" && X(fe)
                            })
                        }(arguments),
                        u && !s && E()),
                        this
                    },
                    remove: function() {
                        return l.each(arguments, function(X, ee) {
                            for (var F; (F = l.inArray(ee, g, F)) > -1; )
                                g.splice(F, 1),
                                F <= T && T--
                        }),
                        this
                    },
                    has: function(X) {
                        return X ? l.inArray(X, g) > -1 : g.length > 0
                    },
                    empty: function() {
                        return g && (g = []),
                        this
                    },
                    disable: function() {
                        return p = v = [],
                        g = u = "",
                        this
                    },
                    disabled: function() {
                        return !g
                    },
                    lock: function() {
                        return p = v = [],
                        !u && !s && (g = u = ""),
                        this
                    },
                    locked: function() {
                        return !!p
                    },
                    fireWith: function(X, ee) {
                        return p || (ee = ee || [],
                        ee = [X, ee.slice ? ee.slice() : ee],
                        v.push(ee),
                        s || E()),
                        this
                    },
                    fire: function() {
                        return M.fireWith(this, arguments),
                        this
                    },
                    fired: function() {
                        return !!d
                    }
                };
                return M
            }
            ;
            function Et(n) {
                return n
            }
            function Sn(n) {
                throw n
            }
            function Gt(n, s, u, d) {
                var p;
                try {
                    n && D(p = n.promise) ? p.call(n).done(s).fail(u) : n && D(p = n.then) ? p.call(n, s, u) : s.apply(void 0, [n].slice(d))
                } catch (g) {
                    u.apply(void 0, [g])
                }
            }
            l.extend({
                Deferred: function(n) {
                    var s = [["notify", "progress", l.Callbacks("memory"), l.Callbacks("memory"), 2], ["resolve", "done", l.Callbacks("once memory"), l.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", l.Callbacks("once memory"), l.Callbacks("once memory"), 1, "rejected"]]
                      , u = "pending"
                      , d = {
                        state: function() {
                            return u
                        },
                        always: function() {
                            return p.done(arguments).fail(arguments),
                            this
                        },
                        catch: function(g) {
                            return d.then(null, g)
                        },
                        pipe: function() {
                            var g = arguments;
                            return l.Deferred(function(v) {
                                l.each(s, function(T, E) {
                                    var M = D(g[E[4]]) && g[E[4]];
                                    p[E[1]](function() {
                                        var X = M && M.apply(this, arguments);
                                        X && D(X.promise) ? X.promise().progress(v.notify).done(v.resolve).fail(v.reject) : v[E[0] + "With"](this, M ? [X] : arguments)
                                    })
                                }),
                                g = null
                            }).promise()
                        },
                        then: function(g, v, T) {
                            var E = 0;
                            function M(X, ee, F, fe) {
                                return function() {
                                    var we = this
                                      , qe = arguments
                                      , $e = function() {
                                        var dt, _n;
                                        if (!(X < E)) {
                                            if (dt = F.apply(we, qe),
                                            dt === ee.promise())
                                                throw new TypeError("Thenable self-resolution");
                                            _n = dt && (typeof dt == "object" || typeof dt == "function") && dt.then,
                                            D(_n) ? fe ? _n.call(dt, M(E, ee, Et, fe), M(E, ee, Sn, fe)) : (E++,
                                            _n.call(dt, M(E, ee, Et, fe), M(E, ee, Sn, fe), M(E, ee, Et, ee.notifyWith))) : (F !== Et && (we = void 0,
                                            qe = [dt]),
                                            (fe || ee.resolveWith)(we, qe))
                                        }
                                    }
                                      , bt = fe ? $e : function() {
                                        try {
                                            $e()
                                        } catch (dt) {
                                            l.Deferred.exceptionHook && l.Deferred.exceptionHook(dt, bt.error),
                                            X + 1 >= E && (F !== Sn && (we = void 0,
                                            qe = [dt]),
                                            ee.rejectWith(we, qe))
                                        }
                                    }
                                    ;
                                    X ? bt() : (l.Deferred.getErrorHook ? bt.error = l.Deferred.getErrorHook() : l.Deferred.getStackHook && (bt.error = l.Deferred.getStackHook()),
                                    o.setTimeout(bt))
                                }
                            }
                            return l.Deferred(function(X) {
                                s[0][3].add(M(0, X, D(T) ? T : Et, X.notifyWith)),
                                s[1][3].add(M(0, X, D(g) ? g : Et)),
                                s[2][3].add(M(0, X, D(v) ? v : Sn))
                            }).promise()
                        },
                        promise: function(g) {
                            return g != null ? l.extend(g, d) : d
                        }
                    }
                      , p = {};
                    return l.each(s, function(g, v) {
                        var T = v[2]
                          , E = v[5];
                        d[v[1]] = T.add,
                        E && T.add(function() {
                            u = E
                        }, s[3 - g][2].disable, s[3 - g][3].disable, s[0][2].lock, s[0][3].lock),
                        T.add(v[3].fire),
                        p[v[0]] = function() {
                            return p[v[0] + "With"](this === p ? void 0 : this, arguments),
                            this
                        }
                        ,
                        p[v[0] + "With"] = T.fireWith
                    }),
                    d.promise(p),
                    n && n.call(p, p),
                    p
                },
                when: function(n) {
                    var s = arguments.length
                      , u = s
                      , d = Array(u)
                      , p = y.call(arguments)
                      , g = l.Deferred()
                      , v = function(T) {
                        return function(E) {
                            d[T] = this,
                            p[T] = arguments.length > 1 ? y.call(arguments) : E,
                            --s || g.resolveWith(d, p)
                        }
                    };
                    if (s <= 1 && (Gt(n, g.done(v(u)).resolve, g.reject, !s),
                    g.state() === "pending" || D(p[u] && p[u].then)))
                        return g.then();
                    for (; u--; )
                        Gt(p[u], v(u), g.reject);
                    return g.promise()
                }
            });
            var ri = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            l.Deferred.exceptionHook = function(n, s) {
                o.console && o.console.warn && n && ri.test(n.name) && o.console.warn("jQuery.Deferred exception: " + n.message, n.stack, s)
            }
            ,
            l.readyException = function(n) {
                o.setTimeout(function() {
                    throw n
                })
            }
            ;
            var xo = l.Deferred();
            l.fn.ready = function(n) {
                return xo.then(n).catch(function(s) {
                    l.readyException(s)
                }),
                this
            }
            ,
            l.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(n) {
                    (n === !0 ? --l.readyWait : l.isReady) || (l.isReady = !0,
                    !(n !== !0 && --l.readyWait > 0) && xo.resolveWith(J, [l]))
                }
            }),
            l.ready.then = xo.then;
            function Yt() {
                J.removeEventListener("DOMContentLoaded", Yt),
                o.removeEventListener("load", Yt),
                l.ready()
            }
            J.readyState === "complete" || J.readyState !== "loading" && !J.documentElement.doScroll ? o.setTimeout(l.ready) : (J.addEventListener("DOMContentLoaded", Yt),
            o.addEventListener("load", Yt));
            var An = function(n, s, u, d, p, g, v) {
                var T = 0
                  , E = n.length
                  , M = u == null;
                if (Re(u) === "object") {
                    p = !0;
                    for (T in u)
                        An(n, s, T, u[T], !0, g, v)
                } else if (d !== void 0 && (p = !0,
                D(d) || (v = !0),
                M && (v ? (s.call(n, d),
                s = null) : (M = s,
                s = function(X, ee, F) {
                    return M.call(l(X), F)
                }
                )),
                s))
                    for (; T < E; T++)
                        s(n[T], u, v ? d : d.call(n[T], T, s(n[T], u)));
                return p ? n : M ? s.call(n) : E ? s(n[0], u) : g
            }
              , Hu = /^-ms-/
              , ii = /-([a-z])/g;
            function cn(n, s) {
                return s.toUpperCase()
            }
            function Pt(n) {
                return n.replace(Hu, "ms-").replace(ii, cn)
            }
            var Yn = function(n) {
                return n.nodeType === 1 || n.nodeType === 9 || !+n.nodeType
            };
            function oi() {
                this.expando = l.expando + oi.uid++
            }
            oi.uid = 1,
            oi.prototype = {
                cache: function(n) {
                    var s = n[this.expando];
                    return s || (s = {},
                    Yn(n) && (n.nodeType ? n[this.expando] = s : Object.defineProperty(n, this.expando, {
                        value: s,
                        configurable: !0
                    }))),
                    s
                },
                set: function(n, s, u) {
                    var d, p = this.cache(n);
                    if (typeof s == "string")
                        p[Pt(s)] = u;
                    else
                        for (d in s)
                            p[Pt(d)] = s[d];
                    return p
                },
                get: function(n, s) {
                    return s === void 0 ? this.cache(n) : n[this.expando] && n[this.expando][Pt(s)]
                },
                access: function(n, s, u) {
                    return s === void 0 || s && typeof s == "string" && u === void 0 ? this.get(n, s) : (this.set(n, s, u),
                    u !== void 0 ? u : s)
                },
                remove: function(n, s) {
                    var u, d = n[this.expando];
                    if (d !== void 0) {
                        if (s !== void 0)
                            for (Array.isArray(s) ? s = s.map(Pt) : (s = Pt(s),
                            s = s in d ? [s] : s.match(at) || []),
                            u = s.length; u--; )
                                delete d[s[u]];
                        (s === void 0 || l.isEmptyObject(d)) && (n.nodeType ? n[this.expando] = void 0 : delete n[this.expando])
                    }
                },
                hasData: function(n) {
                    var s = n[this.expando];
                    return s !== void 0 && !l.isEmptyObject(s)
                }
            };
            var ke = new oi
              , Mt = new oi
              , si = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
              , Mr = /[A-Z]/g;
            function To(n) {
                return n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : n === +n + "" ? +n : si.test(n) ? JSON.parse(n) : n
            }
            function Mi(n, s, u) {
                var d;
                if (u === void 0 && n.nodeType === 1)
                    if (d = "data-" + s.replace(Mr, "-$&").toLowerCase(),
                    u = n.getAttribute(d),
                    typeof u == "string") {
                        try {
                            u = To(u)
                        } catch {}
                        Mt.set(n, s, u)
                    } else
                        u = void 0;
                return u
            }
            l.extend({
                hasData: function(n) {
                    return Mt.hasData(n) || ke.hasData(n)
                },
                data: function(n, s, u) {
                    return Mt.access(n, s, u)
                },
                removeData: function(n, s) {
                    Mt.remove(n, s)
                },
                _data: function(n, s, u) {
                    return ke.access(n, s, u)
                },
                _removeData: function(n, s) {
                    ke.remove(n, s)
                }
            }),
            l.fn.extend({
                data: function(n, s) {
                    var u, d, p, g = this[0], v = g && g.attributes;
                    if (n === void 0) {
                        if (this.length && (p = Mt.get(g),
                        g.nodeType === 1 && !ke.get(g, "hasDataAttrs"))) {
                            for (u = v.length; u--; )
                                v[u] && (d = v[u].name,
                                d.indexOf("data-") === 0 && (d = Pt(d.slice(5)),
                                Mi(g, d, p[d])));
                            ke.set(g, "hasDataAttrs", !0)
                        }
                        return p
                    }
                    return typeof n == "object" ? this.each(function() {
                        Mt.set(this, n)
                    }) : An(this, function(T) {
                        var E;
                        if (g && T === void 0)
                            return E = Mt.get(g, n),
                            E !== void 0 || (E = Mi(g, n),
                            E !== void 0) ? E : void 0;
                        this.each(function() {
                            Mt.set(this, n, T)
                        })
                    }, null, s, arguments.length > 1, null, !0)
                },
                removeData: function(n) {
                    return this.each(function() {
                        Mt.remove(this, n)
                    })
                }
            }),
            l.extend({
                queue: function(n, s, u) {
                    var d;
                    if (n)
                        return s = (s || "fx") + "queue",
                        d = ke.get(n, s),
                        u && (!d || Array.isArray(u) ? d = ke.access(n, s, l.makeArray(u)) : d.push(u)),
                        d || []
                },
                dequeue: function(n, s) {
                    s = s || "fx";
                    var u = l.queue(n, s)
                      , d = u.length
                      , p = u.shift()
                      , g = l._queueHooks(n, s)
                      , v = function() {
                        l.dequeue(n, s)
                    };
                    p === "inprogress" && (p = u.shift(),
                    d--),
                    p && (s === "fx" && u.unshift("inprogress"),
                    delete g.stop,
                    p.call(n, v, g)),
                    !d && g && g.empty.fire()
                },
                _queueHooks: function(n, s) {
                    var u = s + "queueHooks";
                    return ke.get(n, u) || ke.access(n, u, {
                        empty: l.Callbacks("once memory").add(function() {
                            ke.remove(n, [s + "queue", u])
                        })
                    })
                }
            }),
            l.fn.extend({
                queue: function(n, s) {
                    var u = 2;
                    return typeof n != "string" && (s = n,
                    n = "fx",
                    u--),
                    arguments.length < u ? l.queue(this[0], n) : s === void 0 ? this : this.each(function() {
                        var d = l.queue(this, n, s);
                        l._queueHooks(this, n),
                        n === "fx" && d[0] !== "inprogress" && l.dequeue(this, n)
                    })
                },
                dequeue: function(n) {
                    return this.each(function() {
                        l.dequeue(this, n)
                    })
                },
                clearQueue: function(n) {
                    return this.queue(n || "fx", [])
                },
                promise: function(n, s) {
                    var u, d = 1, p = l.Deferred(), g = this, v = this.length, T = function() {
                        --d || p.resolveWith(g, [g])
                    };
                    for (typeof n != "string" && (s = n,
                    n = void 0),
                    n = n || "fx"; v--; )
                        u = ke.get(g[v], n + "queueHooks"),
                        u && u.empty && (d++,
                        u.empty.add(T));
                    return T(),
                    p.promise(s)
                }
            });
            var Oi = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
              , fr = new RegExp("^(?:([+-])=|)(" + Oi + ")([a-z%]*)$","i")
              , fn = ["Top", "Right", "Bottom", "Left"]
              , Rn = J.documentElement
              , Xn = function(n) {
                return l.contains(n.ownerDocument, n)
            }
              , Io = {
                composed: !0
            };
            Rn.getRootNode && (Xn = function(n) {
                return l.contains(n.ownerDocument, n) || n.getRootNode(Io) === n.ownerDocument
            }
            );
            var Or = function(n, s) {
                return n = s || n,
                n.style.display === "none" || n.style.display === "" && Xn(n) && l.css(n, "display") === "none"
            };
            function Gs(n, s, u, d) {
                var p, g, v = 20, T = d ? function() {
                    return d.cur()
                }
                : function() {
                    return l.css(n, s, "")
                }
                , E = T(), M = u && u[3] || (l.cssNumber[s] ? "" : "px"), X = n.nodeType && (l.cssNumber[s] || M !== "px" && +E) && fr.exec(l.css(n, s));
                if (X && X[3] !== M) {
                    for (E = E / 2,
                    M = M || X[3],
                    X = +E || 1; v--; )
                        l.style(n, s, X + M),
                        (1 - g) * (1 - (g = T() / E || .5)) <= 0 && (v = 0),
                        X = X / g;
                    X = X * 2,
                    l.style(n, s, X + M),
                    u = u || []
                }
                return u && (X = +X || +E || 0,
                p = u[1] ? X + (u[1] + 1) * u[2] : +u[2],
                d && (d.unit = M,
                d.start = X,
                d.end = p)),
                p
            }
            var Ys = {};
            function Fu(n) {
                var s, u = n.ownerDocument, d = n.nodeName, p = Ys[d];
                return p || (s = u.body.appendChild(u.createElement(d)),
                p = l.css(s, "display"),
                s.parentNode.removeChild(s),
                p === "none" && (p = "block"),
                Ys[d] = p,
                p)
            }
            function dr(n, s) {
                for (var u, d, p = [], g = 0, v = n.length; g < v; g++)
                    d = n[g],
                    d.style && (u = d.style.display,
                    s ? (u === "none" && (p[g] = ke.get(d, "display") || null,
                    p[g] || (d.style.display = "")),
                    d.style.display === "" && Or(d) && (p[g] = Fu(d))) : u !== "none" && (p[g] = "none",
                    ke.set(d, "display", u)));
                for (g = 0; g < v; g++)
                    p[g] != null && (n[g].style.display = p[g]);
                return n
            }
            l.fn.extend({
                show: function() {
                    return dr(this, !0)
                },
                hide: function() {
                    return dr(this)
                },
                toggle: function(n) {
                    return typeof n == "boolean" ? n ? this.show() : this.hide() : this.each(function() {
                        Or(this) ? l(this).show() : l(this).hide()
                    })
                }
            });
            var Rr = /^(?:checkbox|radio)$/i
              , Xs = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
              , Zs = /^$|^module$|\/(?:java|ecma)script/i;
            (function() {
                var n = J.createDocumentFragment()
                  , s = n.appendChild(J.createElement("div"))
                  , u = J.createElement("input");
                u.setAttribute("type", "radio"),
                u.setAttribute("checked", "checked"),
                u.setAttribute("name", "t"),
                s.appendChild(u),
                W.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked,
                s.innerHTML = "<textarea>x</textarea>",
                W.noCloneChecked = !!s.cloneNode(!0).lastChild.defaultValue,
                s.innerHTML = "<option></option>",
                W.option = !!s.lastChild
            }
            )();
            var Xt = {
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
            Xt.tbody = Xt.tfoot = Xt.colgroup = Xt.caption = Xt.thead,
            Xt.th = Xt.td,
            W.option || (Xt.optgroup = Xt.option = [1, "<select multiple='multiple'>", "</select>"]);
            function Ot(n, s) {
                var u;
                return typeof n.getElementsByTagName < "u" ? u = n.getElementsByTagName(s || "*") : typeof n.querySelectorAll < "u" ? u = n.querySelectorAll(s || "*") : u = [],
                s === void 0 || s && j(n, s) ? l.merge([n], u) : u
            }
            function Ri(n, s) {
                for (var u = 0, d = n.length; u < d; u++)
                    ke.set(n[u], "globalEval", !s || ke.get(s[u], "globalEval"))
            }
            var Wu = /<|&#?\w+;/;
            function Qs(n, s, u, d, p) {
                for (var g, v, T, E, M, X, ee = s.createDocumentFragment(), F = [], fe = 0, we = n.length; fe < we; fe++)
                    if (g = n[fe],
                    g || g === 0)
                        if (Re(g) === "object")
                            l.merge(F, g.nodeType ? [g] : g);
                        else if (!Wu.test(g))
                            F.push(s.createTextNode(g));
                        else {
                            for (v = v || ee.appendChild(s.createElement("div")),
                            T = (Xs.exec(g) || ["", ""])[1].toLowerCase(),
                            E = Xt[T] || Xt._default,
                            v.innerHTML = E[1] + l.htmlPrefilter(g) + E[2],
                            X = E[0]; X--; )
                                v = v.lastChild;
                            l.merge(F, v.childNodes),
                            v = ee.firstChild,
                            v.textContent = ""
                        }
                for (ee.textContent = "",
                fe = 0; g = F[fe++]; ) {
                    if (d && l.inArray(g, d) > -1) {
                        p && p.push(g);
                        continue
                    }
                    if (M = Xn(g),
                    v = Ot(ee.appendChild(g), "script"),
                    M && Ri(v),
                    u)
                        for (X = 0; g = v[X++]; )
                            Zs.test(g.type || "") && u.push(g)
                }
                return ee
            }
            var Js = /^([^.]*)(?:\.(.+)|)/;
            function Zn() {
                return !0
            }
            function Nr() {
                return !1
            }
            function ai(n, s, u, d, p, g) {
                var v, T;
                if (typeof s == "object") {
                    typeof u != "string" && (d = d || u,
                    u = void 0);
                    for (T in s)
                        ai(n, T, u, d, s[T], g);
                    return n
                }
                if (d == null && p == null ? (p = u,
                d = u = void 0) : p == null && (typeof u == "string" ? (p = d,
                d = void 0) : (p = d,
                d = u,
                u = void 0)),
                p === !1)
                    p = Nr;
                else if (!p)
                    return n;
                return g === 1 && (v = p,
                p = function(E) {
                    return l().off(E),
                    v.apply(this, arguments)
                }
                ,
                p.guid = v.guid || (v.guid = l.guid++)),
                n.each(function() {
                    l.event.add(this, s, p, d, u)
                })
            }
            l.event = {
                global: {},
                add: function(n, s, u, d, p) {
                    var g, v, T, E, M, X, ee, F, fe, we, qe, $e = ke.get(n);
                    if (Yn(n))
                        for (u.handler && (g = u,
                        u = g.handler,
                        p = g.selector),
                        p && l.find.matchesSelector(Rn, p),
                        u.guid || (u.guid = l.guid++),
                        (E = $e.events) || (E = $e.events = Object.create(null)),
                        (v = $e.handle) || (v = $e.handle = function(bt) {
                            return typeof l < "u" && l.event.triggered !== bt.type ? l.event.dispatch.apply(n, arguments) : void 0
                        }
                        ),
                        s = (s || "").match(at) || [""],
                        M = s.length; M--; )
                            T = Js.exec(s[M]) || [],
                            fe = qe = T[1],
                            we = (T[2] || "").split(".").sort(),
                            fe && (ee = l.event.special[fe] || {},
                            fe = (p ? ee.delegateType : ee.bindType) || fe,
                            ee = l.event.special[fe] || {},
                            X = l.extend({
                                type: fe,
                                origType: qe,
                                data: d,
                                handler: u,
                                guid: u.guid,
                                selector: p,
                                needsContext: p && l.expr.match.needsContext.test(p),
                                namespace: we.join(".")
                            }, g),
                            (F = E[fe]) || (F = E[fe] = [],
                            F.delegateCount = 0,
                            (!ee.setup || ee.setup.call(n, d, we, v) === !1) && n.addEventListener && n.addEventListener(fe, v)),
                            ee.add && (ee.add.call(n, X),
                            X.handler.guid || (X.handler.guid = u.guid)),
                            p ? F.splice(F.delegateCount++, 0, X) : F.push(X),
                            l.event.global[fe] = !0)
                },
                remove: function(n, s, u, d, p) {
                    var g, v, T, E, M, X, ee, F, fe, we, qe, $e = ke.hasData(n) && ke.get(n);
                    if (!(!$e || !(E = $e.events))) {
                        for (s = (s || "").match(at) || [""],
                        M = s.length; M--; ) {
                            if (T = Js.exec(s[M]) || [],
                            fe = qe = T[1],
                            we = (T[2] || "").split(".").sort(),
                            !fe) {
                                for (fe in E)
                                    l.event.remove(n, fe + s[M], u, d, !0);
                                continue
                            }
                            for (ee = l.event.special[fe] || {},
                            fe = (d ? ee.delegateType : ee.bindType) || fe,
                            F = E[fe] || [],
                            T = T[2] && new RegExp("(^|\\.)" + we.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                            v = g = F.length; g--; )
                                X = F[g],
                                (p || qe === X.origType) && (!u || u.guid === X.guid) && (!T || T.test(X.namespace)) && (!d || d === X.selector || d === "**" && X.selector) && (F.splice(g, 1),
                                X.selector && F.delegateCount--,
                                ee.remove && ee.remove.call(n, X));
                            v && !F.length && ((!ee.teardown || ee.teardown.call(n, we, $e.handle) === !1) && l.removeEvent(n, fe, $e.handle),
                            delete E[fe])
                        }
                        l.isEmptyObject(E) && ke.remove(n, "handle events")
                    }
                },
                dispatch: function(n) {
                    var s, u, d, p, g, v, T = new Array(arguments.length), E = l.event.fix(n), M = (ke.get(this, "events") || Object.create(null))[E.type] || [], X = l.event.special[E.type] || {};
                    for (T[0] = E,
                    s = 1; s < arguments.length; s++)
                        T[s] = arguments[s];
                    if (E.delegateTarget = this,
                    !(X.preDispatch && X.preDispatch.call(this, E) === !1)) {
                        for (v = l.event.handlers.call(this, E, M),
                        s = 0; (p = v[s++]) && !E.isPropagationStopped(); )
                            for (E.currentTarget = p.elem,
                            u = 0; (g = p.handlers[u++]) && !E.isImmediatePropagationStopped(); )
                                (!E.rnamespace || g.namespace === !1 || E.rnamespace.test(g.namespace)) && (E.handleObj = g,
                                E.data = g.data,
                                d = ((l.event.special[g.origType] || {}).handle || g.handler).apply(p.elem, T),
                                d !== void 0 && (E.result = d) === !1 && (E.preventDefault(),
                                E.stopPropagation()));
                        return X.postDispatch && X.postDispatch.call(this, E),
                        E.result
                    }
                },
                handlers: function(n, s) {
                    var u, d, p, g, v, T = [], E = s.delegateCount, M = n.target;
                    if (E && M.nodeType && !(n.type === "click" && n.button >= 1)) {
                        for (; M !== this; M = M.parentNode || this)
                            if (M.nodeType === 1 && !(n.type === "click" && M.disabled === !0)) {
                                for (g = [],
                                v = {},
                                u = 0; u < E; u++)
                                    d = s[u],
                                    p = d.selector + " ",
                                    v[p] === void 0 && (v[p] = d.needsContext ? l(p, this).index(M) > -1 : l.find(p, this, null, [M]).length),
                                    v[p] && g.push(d);
                                g.length && T.push({
                                    elem: M,
                                    handlers: g
                                })
                            }
                    }
                    return M = this,
                    E < s.length && T.push({
                        elem: M,
                        handlers: s.slice(E)
                    }),
                    T
                },
                addProp: function(n, s) {
                    Object.defineProperty(l.Event.prototype, n, {
                        enumerable: !0,
                        configurable: !0,
                        get: D(s) ? function() {
                            if (this.originalEvent)
                                return s(this.originalEvent)
                        }
                        : function() {
                            if (this.originalEvent)
                                return this.originalEvent[n]
                        }
                        ,
                        set: function(u) {
                            Object.defineProperty(this, n, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: u
                            })
                        }
                    })
                },
                fix: function(n) {
                    return n[l.expando] ? n : new l.Event(n)
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    click: {
                        setup: function(n) {
                            var s = this || n;
                            return Rr.test(s.type) && s.click && j(s, "input") && Ni(s, "click", !0),
                            !1
                        },
                        trigger: function(n) {
                            var s = this || n;
                            return Rr.test(s.type) && s.click && j(s, "input") && Ni(s, "click"),
                            !0
                        },
                        _default: function(n) {
                            var s = n.target;
                            return Rr.test(s.type) && s.click && j(s, "input") && ke.get(s, "click") || j(s, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(n) {
                            n.result !== void 0 && n.originalEvent && (n.originalEvent.returnValue = n.result)
                        }
                    }
                }
            };
            function Ni(n, s, u) {
                if (!u) {
                    ke.get(n, s) === void 0 && l.event.add(n, s, Zn);
                    return
                }
                ke.set(n, s, !1),
                l.event.add(n, s, {
                    namespace: !1,
                    handler: function(d) {
                        var p, g = ke.get(this, s);
                        if (d.isTrigger & 1 && this[s]) {
                            if (g)
                                (l.event.special[s] || {}).delegateType && d.stopPropagation();
                            else if (g = y.call(arguments),
                            ke.set(this, s, g),
                            this[s](),
                            p = ke.get(this, s),
                            ke.set(this, s, !1),
                            g !== p)
                                return d.stopImmediatePropagation(),
                                d.preventDefault(),
                                p
                        } else
                            g && (ke.set(this, s, l.event.trigger(g[0], g.slice(1), this)),
                            d.stopPropagation(),
                            d.isImmediatePropagationStopped = Zn)
                    }
                })
            }
            l.removeEvent = function(n, s, u) {
                n.removeEventListener && n.removeEventListener(s, u)
            }
            ,
            l.Event = function(n, s) {
                if (!(this instanceof l.Event))
                    return new l.Event(n,s);
                n && n.type ? (this.originalEvent = n,
                this.type = n.type,
                this.isDefaultPrevented = n.defaultPrevented || n.defaultPrevented === void 0 && n.returnValue === !1 ? Zn : Nr,
                this.target = n.target && n.target.nodeType === 3 ? n.target.parentNode : n.target,
                this.currentTarget = n.currentTarget,
                this.relatedTarget = n.relatedTarget) : this.type = n,
                s && l.extend(this, s),
                this.timeStamp = n && n.timeStamp || Date.now(),
                this[l.expando] = !0
            }
            ,
            l.Event.prototype = {
                constructor: l.Event,
                isDefaultPrevented: Nr,
                isPropagationStopped: Nr,
                isImmediatePropagationStopped: Nr,
                isSimulated: !1,
                preventDefault: function() {
                    var n = this.originalEvent;
                    this.isDefaultPrevented = Zn,
                    n && !this.isSimulated && n.preventDefault()
                },
                stopPropagation: function() {
                    var n = this.originalEvent;
                    this.isPropagationStopped = Zn,
                    n && !this.isSimulated && n.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var n = this.originalEvent;
                    this.isImmediatePropagationStopped = Zn,
                    n && !this.isSimulated && n.stopImmediatePropagation(),
                    this.stopPropagation()
                }
            },
            l.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0
            }, l.event.addProp),
            l.each({
                focus: "focusin",
                blur: "focusout"
            }, function(n, s) {
                function u(d) {
                    if (J.documentMode) {
                        var p = ke.get(this, "handle")
                          , g = l.event.fix(d);
                        g.type = d.type === "focusin" ? "focus" : "blur",
                        g.isSimulated = !0,
                        p(d),
                        g.target === g.currentTarget && p(g)
                    } else
                        l.event.simulate(s, d.target, l.event.fix(d))
                }
                l.event.special[n] = {
                    setup: function() {
                        var d;
                        if (Ni(this, n, !0),
                        J.documentMode)
                            d = ke.get(this, s),
                            d || this.addEventListener(s, u),
                            ke.set(this, s, (d || 0) + 1);
                        else
                            return !1
                    },
                    trigger: function() {
                        return Ni(this, n),
                        !0
                    },
                    teardown: function() {
                        var d;
                        if (J.documentMode)
                            d = ke.get(this, s) - 1,
                            d ? ke.set(this, s, d) : (this.removeEventListener(s, u),
                            ke.remove(this, s));
                        else
                            return !1
                    },
                    _default: function(d) {
                        return ke.get(d.target, n)
                    },
                    delegateType: s
                },
                l.event.special[s] = {
                    setup: function() {
                        var d = this.ownerDocument || this.document || this
                          , p = J.documentMode ? this : d
                          , g = ke.get(p, s);
                        g || (J.documentMode ? this.addEventListener(s, u) : d.addEventListener(n, u, !0)),
                        ke.set(p, s, (g || 0) + 1)
                    },
                    teardown: function() {
                        var d = this.ownerDocument || this.document || this
                          , p = J.documentMode ? this : d
                          , g = ke.get(p, s) - 1;
                        g ? ke.set(p, s, g) : (J.documentMode ? this.removeEventListener(s, u) : d.removeEventListener(n, u, !0),
                        ke.remove(p, s))
                    }
                }
            }),
            l.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(n, s) {
                l.event.special[n] = {
                    delegateType: s,
                    bindType: s,
                    handle: function(u) {
                        var d, p = this, g = u.relatedTarget, v = u.handleObj;
                        return (!g || g !== p && !l.contains(p, g)) && (u.type = v.origType,
                        d = v.handler.apply(this, arguments),
                        u.type = s),
                        d
                    }
                }
            }),
            l.fn.extend({
                on: function(n, s, u, d) {
                    return ai(this, n, s, u, d)
                },
                one: function(n, s, u, d) {
                    return ai(this, n, s, u, d, 1)
                },
                off: function(n, s, u) {
                    var d, p;
                    if (n && n.preventDefault && n.handleObj)
                        return d = n.handleObj,
                        l(n.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler),
                        this;
                    if (typeof n == "object") {
                        for (p in n)
                            this.off(p, s, n[p]);
                        return this
                    }
                    return (s === !1 || typeof s == "function") && (u = s,
                    s = void 0),
                    u === !1 && (u = Nr),
                    this.each(function() {
                        l.event.remove(this, n, u, s)
                    })
                }
            });
            var Uu = /<script|<style|<link/i
              , Vu = /checked\s*(?:[^=]|=\s*.checked.)/i
              , ju = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
            function ea(n, s) {
                return j(n, "table") && j(s.nodeType !== 11 ? s : s.firstChild, "tr") && l(n).children("tbody")[0] || n
            }
            function Ku(n) {
                return n.type = (n.getAttribute("type") !== null) + "/" + n.type,
                n
            }
            function zu(n) {
                return (n.type || "").slice(0, 5) === "true/" ? n.type = n.type.slice(5) : n.removeAttribute("type"),
                n
            }
            function ta(n, s) {
                var u, d, p, g, v, T, E;
                if (s.nodeType === 1) {
                    if (ke.hasData(n) && (g = ke.get(n),
                    E = g.events,
                    E)) {
                        ke.remove(s, "handle events");
                        for (p in E)
                            for (u = 0,
                            d = E[p].length; u < d; u++)
                                l.event.add(s, p, E[p][u])
                    }
                    Mt.hasData(n) && (v = Mt.access(n),
                    T = l.extend({}, v),
                    Mt.set(s, T))
                }
            }
            function na(n, s) {
                var u = s.nodeName.toLowerCase();
                u === "input" && Rr.test(n.type) ? s.checked = n.checked : (u === "input" || u === "textarea") && (s.defaultValue = n.defaultValue)
            }
            function $r(n, s, u, d) {
                s = b(s);
                var p, g, v, T, E, M, X = 0, ee = n.length, F = ee - 1, fe = s[0], we = D(fe);
                if (we || ee > 1 && typeof fe == "string" && !W.checkClone && Vu.test(fe))
                    return n.each(function(qe) {
                        var $e = n.eq(qe);
                        we && (s[0] = fe.call(this, qe, $e.html())),
                        $r($e, s, u, d)
                    });
                if (ee && (p = Qs(s, n[0].ownerDocument, !1, n, d),
                g = p.firstChild,
                p.childNodes.length === 1 && (p = g),
                g || d)) {
                    for (v = l.map(Ot(p, "script"), Ku),
                    T = v.length; X < ee; X++)
                        E = p,
                        X !== F && (E = l.clone(E, !0, !0),
                        T && l.merge(v, Ot(E, "script"))),
                        u.call(n[X], E, X);
                    if (T)
                        for (M = v[v.length - 1].ownerDocument,
                        l.map(v, zu),
                        X = 0; X < T; X++)
                            E = v[X],
                            Zs.test(E.type || "") && !ke.access(E, "globalEval") && l.contains(M, E) && (E.src && (E.type || "").toLowerCase() !== "module" ? l._evalUrl && !E.noModule && l._evalUrl(E.src, {
                                nonce: E.nonce || E.getAttribute("nonce")
                            }, M) : Te(E.textContent.replace(ju, ""), E, M))
                }
                return n
            }
            function ra(n, s, u) {
                for (var d, p = s ? l.filter(s, n) : n, g = 0; (d = p[g]) != null; g++)
                    !u && d.nodeType === 1 && l.cleanData(Ot(d)),
                    d.parentNode && (u && Xn(d) && Ri(Ot(d, "script")),
                    d.parentNode.removeChild(d));
                return n
            }
            l.extend({
                htmlPrefilter: function(n) {
                    return n
                },
                clone: function(n, s, u) {
                    var d, p, g, v, T = n.cloneNode(!0), E = Xn(n);
                    if (!W.noCloneChecked && (n.nodeType === 1 || n.nodeType === 11) && !l.isXMLDoc(n))
                        for (v = Ot(T),
                        g = Ot(n),
                        d = 0,
                        p = g.length; d < p; d++)
                            na(g[d], v[d]);
                    if (s)
                        if (u)
                            for (g = g || Ot(n),
                            v = v || Ot(T),
                            d = 0,
                            p = g.length; d < p; d++)
                                ta(g[d], v[d]);
                        else
                            ta(n, T);
                    return v = Ot(T, "script"),
                    v.length > 0 && Ri(v, !E && Ot(n, "script")),
                    T
                },
                cleanData: function(n) {
                    for (var s, u, d, p = l.event.special, g = 0; (u = n[g]) !== void 0; g++)
                        if (Yn(u)) {
                            if (s = u[ke.expando]) {
                                if (s.events)
                                    for (d in s.events)
                                        p[d] ? l.event.remove(u, d) : l.removeEvent(u, d, s.handle);
                                u[ke.expando] = void 0
                            }
                            u[Mt.expando] && (u[Mt.expando] = void 0)
                        }
                }
            }),
            l.fn.extend({
                detach: function(n) {
                    return ra(this, n, !0)
                },
                remove: function(n) {
                    return ra(this, n)
                },
                text: function(n) {
                    return An(this, function(s) {
                        return s === void 0 ? l.text(this) : this.empty().each(function() {
                            (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = s)
                        })
                    }, null, n, arguments.length)
                },
                append: function() {
                    return $r(this, arguments, function(n) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var s = ea(this, n);
                            s.appendChild(n)
                        }
                    })
                },
                prepend: function() {
                    return $r(this, arguments, function(n) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var s = ea(this, n);
                            s.insertBefore(n, s.firstChild)
                        }
                    })
                },
                before: function() {
                    return $r(this, arguments, function(n) {
                        this.parentNode && this.parentNode.insertBefore(n, this)
                    })
                },
                after: function() {
                    return $r(this, arguments, function(n) {
                        this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var n, s = 0; (n = this[s]) != null; s++)
                        n.nodeType === 1 && (l.cleanData(Ot(n, !1)),
                        n.textContent = "");
                    return this
                },
                clone: function(n, s) {
                    return n = n ?? !1,
                    s = s ?? n,
                    this.map(function() {
                        return l.clone(this, n, s)
                    })
                },
                html: function(n) {
                    return An(this, function(s) {
                        var u = this[0] || {}
                          , d = 0
                          , p = this.length;
                        if (s === void 0 && u.nodeType === 1)
                            return u.innerHTML;
                        if (typeof s == "string" && !Uu.test(s) && !Xt[(Xs.exec(s) || ["", ""])[1].toLowerCase()]) {
                            s = l.htmlPrefilter(s);
                            try {
                                for (; d < p; d++)
                                    u = this[d] || {},
                                    u.nodeType === 1 && (l.cleanData(Ot(u, !1)),
                                    u.innerHTML = s);
                                u = 0
                            } catch {}
                        }
                        u && this.empty().append(s)
                    }, null, n, arguments.length)
                },
                replaceWith: function() {
                    var n = [];
                    return $r(this, arguments, function(s) {
                        var u = this.parentNode;
                        l.inArray(this, n) < 0 && (l.cleanData(Ot(this)),
                        u && u.replaceChild(s, this))
                    }, n)
                }
            }),
            l.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(n, s) {
                l.fn[n] = function(u) {
                    for (var d, p = [], g = l(u), v = g.length - 1, T = 0; T <= v; T++)
                        d = T === v ? this : this.clone(!0),
                        l(g[T])[s](d),
                        k.apply(p, d.get());
                    return this.pushStack(p)
                }
            });
            var Bo = new RegExp("^(" + Oi + ")(?!px)[a-z%]+$","i")
              , Lo = /^--/
              , $i = function(n) {
                var s = n.ownerDocument.defaultView;
                return (!s || !s.opener) && (s = o),
                s.getComputedStyle(n)
            }
              , ia = function(n, s, u) {
                var d, p, g = {};
                for (p in s)
                    g[p] = n.style[p],
                    n.style[p] = s[p];
                d = u.call(n);
                for (p in s)
                    n.style[p] = g[p];
                return d
            }
              , qi = new RegExp(fn.join("|"),"i");
            (function() {
                function n() {
                    if (M) {
                        E.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                        M.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                        Rn.appendChild(E).appendChild(M);
                        var X = o.getComputedStyle(M);
                        u = X.top !== "1%",
                        T = s(X.marginLeft) === 12,
                        M.style.right = "60%",
                        g = s(X.right) === 36,
                        d = s(X.width) === 36,
                        M.style.position = "absolute",
                        p = s(M.offsetWidth / 3) === 12,
                        Rn.removeChild(E),
                        M = null
                    }
                }
                function s(X) {
                    return Math.round(parseFloat(X))
                }
                var u, d, p, g, v, T, E = J.createElement("div"), M = J.createElement("div");
                M.style && (M.style.backgroundClip = "content-box",
                M.cloneNode(!0).style.backgroundClip = "",
                W.clearCloneStyle = M.style.backgroundClip === "content-box",
                l.extend(W, {
                    boxSizingReliable: function() {
                        return n(),
                        d
                    },
                    pixelBoxStyles: function() {
                        return n(),
                        g
                    },
                    pixelPosition: function() {
                        return n(),
                        u
                    },
                    reliableMarginLeft: function() {
                        return n(),
                        T
                    },
                    scrollboxSize: function() {
                        return n(),
                        p
                    },
                    reliableTrDimensions: function() {
                        var X, ee, F, fe;
                        return v == null && (X = J.createElement("table"),
                        ee = J.createElement("tr"),
                        F = J.createElement("div"),
                        X.style.cssText = "position:absolute;left:-11111px;border-collapse:separate",
                        ee.style.cssText = "box-sizing:content-box;border:1px solid",
                        ee.style.height = "1px",
                        F.style.height = "9px",
                        F.style.display = "block",
                        Rn.appendChild(X).appendChild(ee).appendChild(F),
                        fe = o.getComputedStyle(ee),
                        v = parseInt(fe.height, 10) + parseInt(fe.borderTopWidth, 10) + parseInt(fe.borderBottomWidth, 10) === ee.offsetHeight,
                        Rn.removeChild(X)),
                        v
                    }
                }))
            }
            )();
            function ui(n, s, u) {
                var d, p, g, v, T = Lo.test(s), E = n.style;
                return u = u || $i(n),
                u && (v = u.getPropertyValue(s) || u[s],
                T && v && (v = v.replace(V, "$1") || void 0),
                v === "" && !Xn(n) && (v = l.style(n, s)),
                !W.pixelBoxStyles() && Bo.test(v) && qi.test(s) && (d = E.width,
                p = E.minWidth,
                g = E.maxWidth,
                E.minWidth = E.maxWidth = E.width = v,
                v = u.width,
                E.width = d,
                E.minWidth = p,
                E.maxWidth = g)),
                v !== void 0 ? v + "" : v
            }
            function li(n, s) {
                return {
                    get: function() {
                        if (n()) {
                            delete this.get;
                            return
                        }
                        return (this.get = s).apply(this, arguments)
                    }
                }
            }
            var oa = ["Webkit", "Moz", "ms"]
              , sa = J.createElement("div").style
              , aa = {};
            function ua(n) {
                for (var s = n[0].toUpperCase() + n.slice(1), u = oa.length; u--; )
                    if (n = oa[u] + s,
                    n in sa)
                        return n
            }
            function Di(n) {
                var s = l.cssProps[n] || aa[n];
                return s || (n in sa ? n : aa[n] = ua(n) || n)
            }
            var la = /^(none|table(?!-c[ea]).+)/
              , Gu = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }
              , ca = {
                letterSpacing: "0",
                fontWeight: "400"
            };
            function fa(n, s, u) {
                var d = fr.exec(s);
                return d ? Math.max(0, d[2] - (u || 0)) + (d[3] || "px") : s
            }
            function Po(n, s, u, d, p, g) {
                var v = s === "width" ? 1 : 0
                  , T = 0
                  , E = 0
                  , M = 0;
                if (u === (d ? "border" : "content"))
                    return 0;
                for (; v < 4; v += 2)
                    u === "margin" && (M += l.css(n, u + fn[v], !0, p)),
                    d ? (u === "content" && (E -= l.css(n, "padding" + fn[v], !0, p)),
                    u !== "margin" && (E -= l.css(n, "border" + fn[v] + "Width", !0, p))) : (E += l.css(n, "padding" + fn[v], !0, p),
                    u !== "padding" ? E += l.css(n, "border" + fn[v] + "Width", !0, p) : T += l.css(n, "border" + fn[v] + "Width", !0, p));
                return !d && g >= 0 && (E += Math.max(0, Math.ceil(n["offset" + s[0].toUpperCase() + s.slice(1)] - g - E - T - .5)) || 0),
                E + M
            }
            function Mo(n, s, u) {
                var d = $i(n)
                  , p = !W.boxSizingReliable() || u
                  , g = p && l.css(n, "boxSizing", !1, d) === "border-box"
                  , v = g
                  , T = ui(n, s, d)
                  , E = "offset" + s[0].toUpperCase() + s.slice(1);
                if (Bo.test(T)) {
                    if (!u)
                        return T;
                    T = "auto"
                }
                return (!W.boxSizingReliable() && g || !W.reliableTrDimensions() && j(n, "tr") || T === "auto" || !parseFloat(T) && l.css(n, "display", !1, d) === "inline") && n.getClientRects().length && (g = l.css(n, "boxSizing", !1, d) === "border-box",
                v = E in n,
                v && (T = n[E])),
                T = parseFloat(T) || 0,
                T + Po(n, s, u || (g ? "border" : "content"), v, d, T) + "px"
            }
            l.extend({
                cssHooks: {
                    opacity: {
                        get: function(n, s) {
                            if (s) {
                                var u = ui(n, "opacity");
                                return u === "" ? "1" : u
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    aspectRatio: !0,
                    borderImageSlice: !0,
                    columnCount: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    gridArea: !0,
                    gridColumn: !0,
                    gridColumnEnd: !0,
                    gridColumnStart: !0,
                    gridRow: !0,
                    gridRowEnd: !0,
                    gridRowStart: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    scale: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0,
                    fillOpacity: !0,
                    floodOpacity: !0,
                    stopOpacity: !0,
                    strokeMiterlimit: !0,
                    strokeOpacity: !0
                },
                cssProps: {},
                style: function(n, s, u, d) {
                    if (!(!n || n.nodeType === 3 || n.nodeType === 8 || !n.style)) {
                        var p, g, v, T = Pt(s), E = Lo.test(s), M = n.style;
                        if (E || (s = Di(T)),
                        v = l.cssHooks[s] || l.cssHooks[T],
                        u !== void 0) {
                            if (g = typeof u,
                            g === "string" && (p = fr.exec(u)) && p[1] && (u = Gs(n, s, p),
                            g = "number"),
                            u == null || u !== u)
                                return;
                            g === "number" && !E && (u += p && p[3] || (l.cssNumber[T] ? "" : "px")),
                            !W.clearCloneStyle && u === "" && s.indexOf("background") === 0 && (M[s] = "inherit"),
                            (!v || !("set"in v) || (u = v.set(n, u, d)) !== void 0) && (E ? M.setProperty(s, u) : M[s] = u)
                        } else
                            return v && "get"in v && (p = v.get(n, !1, d)) !== void 0 ? p : M[s]
                    }
                },
                css: function(n, s, u, d) {
                    var p, g, v, T = Pt(s), E = Lo.test(s);
                    return E || (s = Di(T)),
                    v = l.cssHooks[s] || l.cssHooks[T],
                    v && "get"in v && (p = v.get(n, !0, u)),
                    p === void 0 && (p = ui(n, s, d)),
                    p === "normal" && s in ca && (p = ca[s]),
                    u === "" || u ? (g = parseFloat(p),
                    u === !0 || isFinite(g) ? g || 0 : p) : p
                }
            }),
            l.each(["height", "width"], function(n, s) {
                l.cssHooks[s] = {
                    get: function(u, d, p) {
                        if (d)
                            return la.test(l.css(u, "display")) && (!u.getClientRects().length || !u.getBoundingClientRect().width) ? ia(u, Gu, function() {
                                return Mo(u, s, p)
                            }) : Mo(u, s, p)
                    },
                    set: function(u, d, p) {
                        var g, v = $i(u), T = !W.scrollboxSize() && v.position === "absolute", E = T || p, M = E && l.css(u, "boxSizing", !1, v) === "border-box", X = p ? Po(u, s, p, M, v) : 0;
                        return M && T && (X -= Math.ceil(u["offset" + s[0].toUpperCase() + s.slice(1)] - parseFloat(v[s]) - Po(u, s, "border", !1, v) - .5)),
                        X && (g = fr.exec(d)) && (g[3] || "px") !== "px" && (u.style[s] = d,
                        d = l.css(u, s)),
                        fa(u, d, X)
                    }
                }
            }),
            l.cssHooks.marginLeft = li(W.reliableMarginLeft, function(n, s) {
                if (s)
                    return (parseFloat(ui(n, "marginLeft")) || n.getBoundingClientRect().left - ia(n, {
                        marginLeft: 0
                    }, function() {
                        return n.getBoundingClientRect().left
                    })) + "px"
            }),
            l.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(n, s) {
                l.cssHooks[n + s] = {
                    expand: function(u) {
                        for (var d = 0, p = {}, g = typeof u == "string" ? u.split(" ") : [u]; d < 4; d++)
                            p[n + fn[d] + s] = g[d] || g[d - 2] || g[0];
                        return p
                    }
                },
                n !== "margin" && (l.cssHooks[n + s].set = fa)
            }),
            l.fn.extend({
                css: function(n, s) {
                    return An(this, function(u, d, p) {
                        var g, v, T = {}, E = 0;
                        if (Array.isArray(d)) {
                            for (g = $i(u),
                            v = d.length; E < v; E++)
                                T[d[E]] = l.css(u, d[E], !1, g);
                            return T
                        }
                        return p !== void 0 ? l.style(u, d, p) : l.css(u, d)
                    }, n, s, arguments.length > 1)
                }
            });
            function xt(n, s, u, d, p) {
                return new xt.prototype.init(n,s,u,d,p)
            }
            l.Tween = xt,
            xt.prototype = {
                constructor: xt,
                init: function(n, s, u, d, p, g) {
                    this.elem = n,
                    this.prop = u,
                    this.easing = p || l.easing._default,
                    this.options = s,
                    this.start = this.now = this.cur(),
                    this.end = d,
                    this.unit = g || (l.cssNumber[u] ? "" : "px")
                },
                cur: function() {
                    var n = xt.propHooks[this.prop];
                    return n && n.get ? n.get(this) : xt.propHooks._default.get(this)
                },
                run: function(n) {
                    var s, u = xt.propHooks[this.prop];
                    return this.options.duration ? this.pos = s = l.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : this.pos = s = n,
                    this.now = (this.end - this.start) * s + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    u && u.set ? u.set(this) : xt.propHooks._default.set(this),
                    this
                }
            },
            xt.prototype.init.prototype = xt.prototype,
            xt.propHooks = {
                _default: {
                    get: function(n) {
                        var s;
                        return n.elem.nodeType !== 1 || n.elem[n.prop] != null && n.elem.style[n.prop] == null ? n.elem[n.prop] : (s = l.css(n.elem, n.prop, ""),
                        !s || s === "auto" ? 0 : s)
                    },
                    set: function(n) {
                        l.fx.step[n.prop] ? l.fx.step[n.prop](n) : n.elem.nodeType === 1 && (l.cssHooks[n.prop] || n.elem.style[Di(n.prop)] != null) ? l.style(n.elem, n.prop, n.now + n.unit) : n.elem[n.prop] = n.now
                    }
                }
            },
            xt.propHooks.scrollTop = xt.propHooks.scrollLeft = {
                set: function(n) {
                    n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
                }
            },
            l.easing = {
                linear: function(n) {
                    return n
                },
                swing: function(n) {
                    return .5 - Math.cos(n * Math.PI) / 2
                },
                _default: "swing"
            },
            l.fx = xt.prototype.init,
            l.fx.step = {};
            var hr, qr, Yu = /^(?:toggle|show|hide)$/, da = /queueHooks$/;
            function Dr() {
                qr && (J.hidden === !1 && o.requestAnimationFrame ? o.requestAnimationFrame(Dr) : o.setTimeout(Dr, l.fx.interval),
                l.fx.tick())
            }
            function Oo() {
                return o.setTimeout(function() {
                    hr = void 0
                }),
                hr = Date.now()
            }
            function Hi(n, s) {
                var u, d = 0, p = {
                    height: n
                };
                for (s = s ? 1 : 0; d < 4; d += 2 - s)
                    u = fn[d],
                    p["margin" + u] = p["padding" + u] = n;
                return s && (p.opacity = p.width = n),
                p
            }
            function Ro(n, s, u) {
                for (var d, p = (dn.tweeners[s] || []).concat(dn.tweeners["*"]), g = 0, v = p.length; g < v; g++)
                    if (d = p[g].call(u, s, n))
                        return d
            }
            function ha(n, s, u) {
                var d, p, g, v, T, E, M, X, ee = "width"in s || "height"in s, F = this, fe = {}, we = n.style, qe = n.nodeType && Or(n), $e = ke.get(n, "fxshow");
                u.queue || (v = l._queueHooks(n, "fx"),
                v.unqueued == null && (v.unqueued = 0,
                T = v.empty.fire,
                v.empty.fire = function() {
                    v.unqueued || T()
                }
                ),
                v.unqueued++,
                F.always(function() {
                    F.always(function() {
                        v.unqueued--,
                        l.queue(n, "fx").length || v.empty.fire()
                    })
                }));
                for (d in s)
                    if (p = s[d],
                    Yu.test(p)) {
                        if (delete s[d],
                        g = g || p === "toggle",
                        p === (qe ? "hide" : "show"))
                            if (p === "show" && $e && $e[d] !== void 0)
                                qe = !0;
                            else
                                continue;
                        fe[d] = $e && $e[d] || l.style(n, d)
                    }
                if (E = !l.isEmptyObject(s),
                !(!E && l.isEmptyObject(fe))) {
                    ee && n.nodeType === 1 && (u.overflow = [we.overflow, we.overflowX, we.overflowY],
                    M = $e && $e.display,
                    M == null && (M = ke.get(n, "display")),
                    X = l.css(n, "display"),
                    X === "none" && (M ? X = M : (dr([n], !0),
                    M = n.style.display || M,
                    X = l.css(n, "display"),
                    dr([n]))),
                    (X === "inline" || X === "inline-block" && M != null) && l.css(n, "float") === "none" && (E || (F.done(function() {
                        we.display = M
                    }),
                    M == null && (X = we.display,
                    M = X === "none" ? "" : X)),
                    we.display = "inline-block")),
                    u.overflow && (we.overflow = "hidden",
                    F.always(function() {
                        we.overflow = u.overflow[0],
                        we.overflowX = u.overflow[1],
                        we.overflowY = u.overflow[2]
                    })),
                    E = !1;
                    for (d in fe)
                        E || ($e ? "hidden"in $e && (qe = $e.hidden) : $e = ke.access(n, "fxshow", {
                            display: M
                        }),
                        g && ($e.hidden = !qe),
                        qe && dr([n], !0),
                        F.done(function() {
                            qe || dr([n]),
                            ke.remove(n, "fxshow");
                            for (d in fe)
                                l.style(n, d, fe[d])
                        })),
                        E = Ro(qe ? $e[d] : 0, d, F),
                        d in $e || ($e[d] = E.start,
                        qe && (E.end = E.start,
                        E.start = 0))
                }
            }
            function No(n, s) {
                var u, d, p, g, v;
                for (u in n)
                    if (d = Pt(u),
                    p = s[d],
                    g = n[u],
                    Array.isArray(g) && (p = g[1],
                    g = n[u] = g[0]),
                    u !== d && (n[d] = g,
                    delete n[u]),
                    v = l.cssHooks[d],
                    v && "expand"in v) {
                        g = v.expand(g),
                        delete n[d];
                        for (u in g)
                            u in n || (n[u] = g[u],
                            s[u] = p)
                    } else
                        s[d] = p
            }
            function dn(n, s, u) {
                var d, p, g = 0, v = dn.prefilters.length, T = l.Deferred().always(function() {
                    delete E.elem
                }), E = function() {
                    if (p)
                        return !1;
                    for (var ee = hr || Oo(), F = Math.max(0, M.startTime + M.duration - ee), fe = F / M.duration || 0, we = 1 - fe, qe = 0, $e = M.tweens.length; qe < $e; qe++)
                        M.tweens[qe].run(we);
                    return T.notifyWith(n, [M, we, F]),
                    we < 1 && $e ? F : ($e || T.notifyWith(n, [M, 1, 0]),
                    T.resolveWith(n, [M]),
                    !1)
                }, M = T.promise({
                    elem: n,
                    props: l.extend({}, s),
                    opts: l.extend(!0, {
                        specialEasing: {},
                        easing: l.easing._default
                    }, u),
                    originalProperties: s,
                    originalOptions: u,
                    startTime: hr || Oo(),
                    duration: u.duration,
                    tweens: [],
                    createTween: function(ee, F) {
                        var fe = l.Tween(n, M.opts, ee, F, M.opts.specialEasing[ee] || M.opts.easing);
                        return M.tweens.push(fe),
                        fe
                    },
                    stop: function(ee) {
                        var F = 0
                          , fe = ee ? M.tweens.length : 0;
                        if (p)
                            return this;
                        for (p = !0; F < fe; F++)
                            M.tweens[F].run(1);
                        return ee ? (T.notifyWith(n, [M, 1, 0]),
                        T.resolveWith(n, [M, ee])) : T.rejectWith(n, [M, ee]),
                        this
                    }
                }), X = M.props;
                for (No(X, M.opts.specialEasing); g < v; g++)
                    if (d = dn.prefilters[g].call(M, n, X, M.opts),
                    d)
                        return D(d.stop) && (l._queueHooks(M.elem, M.opts.queue).stop = d.stop.bind(d)),
                        d;
                return l.map(X, Ro, M),
                D(M.opts.start) && M.opts.start.call(n, M),
                M.progress(M.opts.progress).done(M.opts.done, M.opts.complete).fail(M.opts.fail).always(M.opts.always),
                l.fx.timer(l.extend(E, {
                    elem: n,
                    anim: M,
                    queue: M.opts.queue
                })),
                M
            }
            l.Animation = l.extend(dn, {
                tweeners: {
                    "*": [function(n, s) {
                        var u = this.createTween(n, s);
                        return Gs(u.elem, n, fr.exec(s), u),
                        u
                    }
                    ]
                },
                tweener: function(n, s) {
                    D(n) ? (s = n,
                    n = ["*"]) : n = n.match(at);
                    for (var u, d = 0, p = n.length; d < p; d++)
                        u = n[d],
                        dn.tweeners[u] = dn.tweeners[u] || [],
                        dn.tweeners[u].unshift(s)
                },
                prefilters: [ha],
                prefilter: function(n, s) {
                    s ? dn.prefilters.unshift(n) : dn.prefilters.push(n)
                }
            }),
            l.speed = function(n, s, u) {
                var d = n && typeof n == "object" ? l.extend({}, n) : {
                    complete: u || !u && s || D(n) && n,
                    duration: n,
                    easing: u && s || s && !D(s) && s
                };
                return l.fx.off ? d.duration = 0 : typeof d.duration != "number" && (d.duration in l.fx.speeds ? d.duration = l.fx.speeds[d.duration] : d.duration = l.fx.speeds._default),
                (d.queue == null || d.queue === !0) && (d.queue = "fx"),
                d.old = d.complete,
                d.complete = function() {
                    D(d.old) && d.old.call(this),
                    d.queue && l.dequeue(this, d.queue)
                }
                ,
                d
            }
            ,
            l.fn.extend({
                fadeTo: function(n, s, u, d) {
                    return this.filter(Or).css("opacity", 0).show().end().animate({
                        opacity: s
                    }, n, u, d)
                },
                animate: function(n, s, u, d) {
                    var p = l.isEmptyObject(n)
                      , g = l.speed(s, u, d)
                      , v = function() {
                        var T = dn(this, l.extend({}, n), g);
                        (p || ke.get(this, "finish")) && T.stop(!0)
                    };
                    return v.finish = v,
                    p || g.queue === !1 ? this.each(v) : this.queue(g.queue, v)
                },
                stop: function(n, s, u) {
                    var d = function(p) {
                        var g = p.stop;
                        delete p.stop,
                        g(u)
                    };
                    return typeof n != "string" && (u = s,
                    s = n,
                    n = void 0),
                    s && this.queue(n || "fx", []),
                    this.each(function() {
                        var p = !0
                          , g = n != null && n + "queueHooks"
                          , v = l.timers
                          , T = ke.get(this);
                        if (g)
                            T[g] && T[g].stop && d(T[g]);
                        else
                            for (g in T)
                                T[g] && T[g].stop && da.test(g) && d(T[g]);
                        for (g = v.length; g--; )
                            v[g].elem === this && (n == null || v[g].queue === n) && (v[g].anim.stop(u),
                            p = !1,
                            v.splice(g, 1));
                        (p || !u) && l.dequeue(this, n)
                    })
                },
                finish: function(n) {
                    return n !== !1 && (n = n || "fx"),
                    this.each(function() {
                        var s, u = ke.get(this), d = u[n + "queue"], p = u[n + "queueHooks"], g = l.timers, v = d ? d.length : 0;
                        for (u.finish = !0,
                        l.queue(this, n, []),
                        p && p.stop && p.stop.call(this, !0),
                        s = g.length; s--; )
                            g[s].elem === this && g[s].queue === n && (g[s].anim.stop(!0),
                            g.splice(s, 1));
                        for (s = 0; s < v; s++)
                            d[s] && d[s].finish && d[s].finish.call(this);
                        delete u.finish
                    })
                }
            }),
            l.each(["toggle", "show", "hide"], function(n, s) {
                var u = l.fn[s];
                l.fn[s] = function(d, p, g) {
                    return d == null || typeof d == "boolean" ? u.apply(this, arguments) : this.animate(Hi(s, !0), d, p, g)
                }
            }),
            l.each({
                slideDown: Hi("show"),
                slideUp: Hi("hide"),
                slideToggle: Hi("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(n, s) {
                l.fn[n] = function(u, d, p) {
                    return this.animate(s, u, d, p)
                }
            }),
            l.timers = [],
            l.fx.tick = function() {
                var n, s = 0, u = l.timers;
                for (hr = Date.now(); s < u.length; s++)
                    n = u[s],
                    !n() && u[s] === n && u.splice(s--, 1);
                u.length || l.fx.stop(),
                hr = void 0
            }
            ,
            l.fx.timer = function(n) {
                l.timers.push(n),
                l.fx.start()
            }
            ,
            l.fx.interval = 13,
            l.fx.start = function() {
                qr || (qr = !0,
                Dr())
            }
            ,
            l.fx.stop = function() {
                qr = null
            }
            ,
            l.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            l.fn.delay = function(n, s) {
                return n = l.fx && l.fx.speeds[n] || n,
                s = s || "fx",
                this.queue(s, function(u, d) {
                    var p = o.setTimeout(u, n);
                    d.stop = function() {
                        o.clearTimeout(p)
                    }
                })
            }
            ,
            function() {
                var n = J.createElement("input")
                  , s = J.createElement("select")
                  , u = s.appendChild(J.createElement("option"));
                n.type = "checkbox",
                W.checkOn = n.value !== "",
                W.optSelected = u.selected,
                n = J.createElement("input"),
                n.value = "t",
                n.type = "radio",
                W.radioValue = n.value === "t"
            }();
            var $o, pr = l.expr.attrHandle;
            l.fn.extend({
                attr: function(n, s) {
                    return An(this, l.attr, n, s, arguments.length > 1)
                },
                removeAttr: function(n) {
                    return this.each(function() {
                        l.removeAttr(this, n)
                    })
                }
            }),
            l.extend({
                attr: function(n, s, u) {
                    var d, p, g = n.nodeType;
                    if (!(g === 3 || g === 8 || g === 2)) {
                        if (typeof n.getAttribute > "u")
                            return l.prop(n, s, u);
                        if ((g !== 1 || !l.isXMLDoc(n)) && (p = l.attrHooks[s.toLowerCase()] || (l.expr.match.bool.test(s) ? $o : void 0)),
                        u !== void 0) {
                            if (u === null) {
                                l.removeAttr(n, s);
                                return
                            }
                            return p && "set"in p && (d = p.set(n, u, s)) !== void 0 ? d : (n.setAttribute(s, u + ""),
                            u)
                        }
                        return p && "get"in p && (d = p.get(n, s)) !== null ? d : (d = l.find.attr(n, s),
                        d ?? void 0)
                    }
                },
                attrHooks: {
                    type: {
                        set: function(n, s) {
                            if (!W.radioValue && s === "radio" && j(n, "input")) {
                                var u = n.value;
                                return n.setAttribute("type", s),
                                u && (n.value = u),
                                s
                            }
                        }
                    }
                },
                removeAttr: function(n, s) {
                    var u, d = 0, p = s && s.match(at);
                    if (p && n.nodeType === 1)
                        for (; u = p[d++]; )
                            n.removeAttribute(u)
                }
            }),
            $o = {
                set: function(n, s, u) {
                    return s === !1 ? l.removeAttr(n, u) : n.setAttribute(u, u),
                    u
                }
            },
            l.each(l.expr.match.bool.source.match(/\w+/g), function(n, s) {
                var u = pr[s] || l.find.attr;
                pr[s] = function(d, p, g) {
                    var v, T, E = p.toLowerCase();
                    return g || (T = pr[E],
                    pr[E] = v,
                    v = u(d, p, g) != null ? E : null,
                    pr[E] = T),
                    v
                }
            });
            var qo = /^(?:input|select|textarea|button)$/i
              , Hr = /^(?:a|area)$/i;
            l.fn.extend({
                prop: function(n, s) {
                    return An(this, l.prop, n, s, arguments.length > 1)
                },
                removeProp: function(n) {
                    return this.each(function() {
                        delete this[l.propFix[n] || n]
                    })
                }
            }),
            l.extend({
                prop: function(n, s, u) {
                    var d, p, g = n.nodeType;
                    if (!(g === 3 || g === 8 || g === 2))
                        return (g !== 1 || !l.isXMLDoc(n)) && (s = l.propFix[s] || s,
                        p = l.propHooks[s]),
                        u !== void 0 ? p && "set"in p && (d = p.set(n, u, s)) !== void 0 ? d : n[s] = u : p && "get"in p && (d = p.get(n, s)) !== null ? d : n[s]
                },
                propHooks: {
                    tabIndex: {
                        get: function(n) {
                            var s = l.find.attr(n, "tabindex");
                            return s ? parseInt(s, 10) : qo.test(n.nodeName) || Hr.test(n.nodeName) && n.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }),
            W.optSelected || (l.propHooks.selected = {
                get: function(n) {
                    var s = n.parentNode;
                    return s && s.parentNode && s.parentNode.selectedIndex,
                    null
                },
                set: function(n) {
                    var s = n.parentNode;
                    s && (s.selectedIndex,
                    s.parentNode && s.parentNode.selectedIndex)
                }
            }),
            l.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                l.propFix[this.toLowerCase()] = this
            });
            function Qn(n) {
                var s = n.match(at) || [];
                return s.join(" ")
            }
            function Jn(n) {
                return n.getAttribute && n.getAttribute("class") || ""
            }
            function Do(n) {
                return Array.isArray(n) ? n : typeof n == "string" ? n.match(at) || [] : []
            }
            l.fn.extend({
                addClass: function(n) {
                    var s, u, d, p, g, v;
                    return D(n) ? this.each(function(T) {
                        l(this).addClass(n.call(this, T, Jn(this)))
                    }) : (s = Do(n),
                    s.length ? this.each(function() {
                        if (d = Jn(this),
                        u = this.nodeType === 1 && " " + Qn(d) + " ",
                        u) {
                            for (g = 0; g < s.length; g++)
                                p = s[g],
                                u.indexOf(" " + p + " ") < 0 && (u += p + " ");
                            v = Qn(u),
                            d !== v && this.setAttribute("class", v)
                        }
                    }) : this)
                },
                removeClass: function(n) {
                    var s, u, d, p, g, v;
                    return D(n) ? this.each(function(T) {
                        l(this).removeClass(n.call(this, T, Jn(this)))
                    }) : arguments.length ? (s = Do(n),
                    s.length ? this.each(function() {
                        if (d = Jn(this),
                        u = this.nodeType === 1 && " " + Qn(d) + " ",
                        u) {
                            for (g = 0; g < s.length; g++)
                                for (p = s[g]; u.indexOf(" " + p + " ") > -1; )
                                    u = u.replace(" " + p + " ", " ");
                            v = Qn(u),
                            d !== v && this.setAttribute("class", v)
                        }
                    }) : this) : this.attr("class", "")
                },
                toggleClass: function(n, s) {
                    var u, d, p, g, v = typeof n, T = v === "string" || Array.isArray(n);
                    return D(n) ? this.each(function(E) {
                        l(this).toggleClass(n.call(this, E, Jn(this), s), s)
                    }) : typeof s == "boolean" && T ? s ? this.addClass(n) : this.removeClass(n) : (u = Do(n),
                    this.each(function() {
                        if (T)
                            for (g = l(this),
                            p = 0; p < u.length; p++)
                                d = u[p],
                                g.hasClass(d) ? g.removeClass(d) : g.addClass(d);
                        else
                            (n === void 0 || v === "boolean") && (d = Jn(this),
                            d && ke.set(this, "__className__", d),
                            this.setAttribute && this.setAttribute("class", d || n === !1 ? "" : ke.get(this, "__className__") || ""))
                    }))
                },
                hasClass: function(n) {
                    var s, u, d = 0;
                    for (s = " " + n + " "; u = this[d++]; )
                        if (u.nodeType === 1 && (" " + Qn(Jn(u)) + " ").indexOf(s) > -1)
                            return !0;
                    return !1
                }
            });
            var pa = /\r/g;
            l.fn.extend({
                val: function(n) {
                    var s, u, d, p = this[0];
                    return arguments.length ? (d = D(n),
                    this.each(function(g) {
                        var v;
                        this.nodeType === 1 && (d ? v = n.call(this, g, l(this).val()) : v = n,
                        v == null ? v = "" : typeof v == "number" ? v += "" : Array.isArray(v) && (v = l.map(v, function(T) {
                            return T == null ? "" : T + ""
                        })),
                        s = l.valHooks[this.type] || l.valHooks[this.nodeName.toLowerCase()],
                        (!s || !("set"in s) || s.set(this, v, "value") === void 0) && (this.value = v))
                    })) : p ? (s = l.valHooks[p.type] || l.valHooks[p.nodeName.toLowerCase()],
                    s && "get"in s && (u = s.get(p, "value")) !== void 0 ? u : (u = p.value,
                    typeof u == "string" ? u.replace(pa, "") : u ?? "")) : void 0
                }
            }),
            l.extend({
                valHooks: {
                    option: {
                        get: function(n) {
                            var s = l.find.attr(n, "value");
                            return s ?? Qn(l.text(n))
                        }
                    },
                    select: {
                        get: function(n) {
                            var s, u, d, p = n.options, g = n.selectedIndex, v = n.type === "select-one", T = v ? null : [], E = v ? g + 1 : p.length;
                            for (g < 0 ? d = E : d = v ? g : 0; d < E; d++)
                                if (u = p[d],
                                (u.selected || d === g) && !u.disabled && (!u.parentNode.disabled || !j(u.parentNode, "optgroup"))) {
                                    if (s = l(u).val(),
                                    v)
                                        return s;
                                    T.push(s)
                                }
                            return T
                        },
                        set: function(n, s) {
                            for (var u, d, p = n.options, g = l.makeArray(s), v = p.length; v--; )
                                d = p[v],
                                (d.selected = l.inArray(l.valHooks.option.get(d), g) > -1) && (u = !0);
                            return u || (n.selectedIndex = -1),
                            g
                        }
                    }
                }
            }),
            l.each(["radio", "checkbox"], function() {
                l.valHooks[this] = {
                    set: function(n, s) {
                        if (Array.isArray(s))
                            return n.checked = l.inArray(l(n).val(), s) > -1
                    }
                },
                W.checkOn || (l.valHooks[this].get = function(n) {
                    return n.getAttribute("value") === null ? "on" : n.value
                }
                )
            });
            var Fr = o.location
              , Ho = {
                guid: Date.now()
            }
              , Fi = /\?/;
            l.parseXML = function(n) {
                var s, u;
                if (!n || typeof n != "string")
                    return null;
                try {
                    s = new o.DOMParser().parseFromString(n, "text/xml")
                } catch {}
                return u = s && s.getElementsByTagName("parsererror")[0],
                (!s || u) && l.error("Invalid XML: " + (u ? l.map(u.childNodes, function(d) {
                    return d.textContent
                }).join(`
`) : n)),
                s
            }
            ;
            var ga = /^(?:focusinfocus|focusoutblur)$/
              , ya = function(n) {
                n.stopPropagation()
            };
            l.extend(l.event, {
                trigger: function(n, s, u, d) {
                    var p, g, v, T, E, M, X, ee, F = [u || J], fe = ue.call(n, "type") ? n.type : n, we = ue.call(n, "namespace") ? n.namespace.split(".") : [];
                    if (g = ee = v = u = u || J,
                    !(u.nodeType === 3 || u.nodeType === 8) && !ga.test(fe + l.event.triggered) && (fe.indexOf(".") > -1 && (we = fe.split("."),
                    fe = we.shift(),
                    we.sort()),
                    E = fe.indexOf(":") < 0 && "on" + fe,
                    n = n[l.expando] ? n : new l.Event(fe,typeof n == "object" && n),
                    n.isTrigger = d ? 2 : 3,
                    n.namespace = we.join("."),
                    n.rnamespace = n.namespace ? new RegExp("(^|\\.)" + we.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                    n.result = void 0,
                    n.target || (n.target = u),
                    s = s == null ? [n] : l.makeArray(s, [n]),
                    X = l.event.special[fe] || {},
                    !(!d && X.trigger && X.trigger.apply(u, s) === !1))) {
                        if (!d && !X.noBubble && !he(u)) {
                            for (T = X.delegateType || fe,
                            ga.test(T + fe) || (g = g.parentNode); g; g = g.parentNode)
                                F.push(g),
                                v = g;
                            v === (u.ownerDocument || J) && F.push(v.defaultView || v.parentWindow || o)
                        }
                        for (p = 0; (g = F[p++]) && !n.isPropagationStopped(); )
                            ee = g,
                            n.type = p > 1 ? T : X.bindType || fe,
                            M = (ke.get(g, "events") || Object.create(null))[n.type] && ke.get(g, "handle"),
                            M && M.apply(g, s),
                            M = E && g[E],
                            M && M.apply && Yn(g) && (n.result = M.apply(g, s),
                            n.result === !1 && n.preventDefault());
                        return n.type = fe,
                        !d && !n.isDefaultPrevented() && (!X._default || X._default.apply(F.pop(), s) === !1) && Yn(u) && E && D(u[fe]) && !he(u) && (v = u[E],
                        v && (u[E] = null),
                        l.event.triggered = fe,
                        n.isPropagationStopped() && ee.addEventListener(fe, ya),
                        u[fe](),
                        n.isPropagationStopped() && ee.removeEventListener(fe, ya),
                        l.event.triggered = void 0,
                        v && (u[E] = v)),
                        n.result
                    }
                },
                simulate: function(n, s, u) {
                    var d = l.extend(new l.Event, u, {
                        type: n,
                        isSimulated: !0
                    });
                    l.event.trigger(d, null, s)
                }
            }),
            l.fn.extend({
                trigger: function(n, s) {
                    return this.each(function() {
                        l.event.trigger(n, s, this)
                    })
                },
                triggerHandler: function(n, s) {
                    var u = this[0];
                    if (u)
                        return l.event.trigger(n, s, u, !0)
                }
            });
            var Xu = /\[\]$/
              , Fo = /\r?\n/g
              , Zu = /^(?:submit|button|image|reset|file)$/i
              , Qu = /^(?:input|select|textarea|keygen)/i;
            function Wo(n, s, u, d) {
                var p;
                if (Array.isArray(s))
                    l.each(s, function(g, v) {
                        u || Xu.test(n) ? d(n, v) : Wo(n + "[" + (typeof v == "object" && v != null ? g : "") + "]", v, u, d)
                    });
                else if (!u && Re(s) === "object")
                    for (p in s)
                        Wo(n + "[" + p + "]", s[p], u, d);
                else
                    d(n, s)
            }
            l.param = function(n, s) {
                var u, d = [], p = function(g, v) {
                    var T = D(v) ? v() : v;
                    d[d.length] = encodeURIComponent(g) + "=" + encodeURIComponent(T ?? "")
                };
                if (n == null)
                    return "";
                if (Array.isArray(n) || n.jquery && !l.isPlainObject(n))
                    l.each(n, function() {
                        p(this.name, this.value)
                    });
                else
                    for (u in n)
                        Wo(u, n[u], s, p);
                return d.join("&")
            }
            ,
            l.fn.extend({
                serialize: function() {
                    return l.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var n = l.prop(this, "elements");
                        return n ? l.makeArray(n) : this
                    }).filter(function() {
                        var n = this.type;
                        return this.name && !l(this).is(":disabled") && Qu.test(this.nodeName) && !Zu.test(n) && (this.checked || !Rr.test(n))
                    }).map(function(n, s) {
                        var u = l(this).val();
                        return u == null ? null : Array.isArray(u) ? l.map(u, function(d) {
                            return {
                                name: s.name,
                                value: d.replace(Fo, `\r
`)
                            }
                        }) : {
                            name: s.name,
                            value: u.replace(Fo, `\r
`)
                        }
                    }).get()
                }
            });
            var Ju = /%20/g
              , Uo = /#.*$/
              , el = /([?&])_=[^&]*/
              , tl = /^(.*?):[ \t]*([^\r\n]*)$/mg
              , nl = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
              , rl = /^(?:GET|HEAD)$/
              , il = /^\/\//
              , st = {}
              , nt = {}
              , ma = "*/".concat("*")
              , Vo = J.createElement("a");
            Vo.href = Fr.href;
            function va(n) {
                return function(s, u) {
                    typeof s != "string" && (u = s,
                    s = "*");
                    var d, p = 0, g = s.toLowerCase().match(at) || [];
                    if (D(u))
                        for (; d = g[p++]; )
                            d[0] === "+" ? (d = d.slice(1) || "*",
                            (n[d] = n[d] || []).unshift(u)) : (n[d] = n[d] || []).push(u)
                }
            }
            function ba(n, s, u, d) {
                var p = {}
                  , g = n === nt;
                function v(T) {
                    var E;
                    return p[T] = !0,
                    l.each(n[T] || [], function(M, X) {
                        var ee = X(s, u, d);
                        if (typeof ee == "string" && !g && !p[ee])
                            return s.dataTypes.unshift(ee),
                            v(ee),
                            !1;
                        if (g)
                            return !(E = ee)
                    }),
                    E
                }
                return v(s.dataTypes[0]) || !p["*"] && v("*")
            }
            function jo(n, s) {
                var u, d, p = l.ajaxSettings.flatOptions || {};
                for (u in s)
                    s[u] !== void 0 && ((p[u] ? n : d || (d = {}))[u] = s[u]);
                return d && l.extend(!0, n, d),
                n
            }
            function ol(n, s, u) {
                for (var d, p, g, v, T = n.contents, E = n.dataTypes; E[0] === "*"; )
                    E.shift(),
                    d === void 0 && (d = n.mimeType || s.getResponseHeader("Content-Type"));
                if (d) {
                    for (p in T)
                        if (T[p] && T[p].test(d)) {
                            E.unshift(p);
                            break
                        }
                }
                if (E[0]in u)
                    g = E[0];
                else {
                    for (p in u) {
                        if (!E[0] || n.converters[p + " " + E[0]]) {
                            g = p;
                            break
                        }
                        v || (v = p)
                    }
                    g = g || v
                }
                if (g)
                    return g !== E[0] && E.unshift(g),
                    u[g]
            }
            function wa(n, s, u, d) {
                var p, g, v, T, E, M = {}, X = n.dataTypes.slice();
                if (X[1])
                    for (v in n.converters)
                        M[v.toLowerCase()] = n.converters[v];
                for (g = X.shift(); g; )
                    if (n.responseFields[g] && (u[n.responseFields[g]] = s),
                    !E && d && n.dataFilter && (s = n.dataFilter(s, n.dataType)),
                    E = g,
                    g = X.shift(),
                    g) {
                        if (g === "*")
                            g = E;
                        else if (E !== "*" && E !== g) {
                            if (v = M[E + " " + g] || M["* " + g],
                            !v) {
                                for (p in M)
                                    if (T = p.split(" "),
                                    T[1] === g && (v = M[E + " " + T[0]] || M["* " + T[0]],
                                    v)) {
                                        v === !0 ? v = M[p] : M[p] !== !0 && (g = T[0],
                                        X.unshift(T[1]));
                                        break
                                    }
                            }
                            if (v !== !0)
                                if (v && n.throws)
                                    s = v(s);
                                else
                                    try {
                                        s = v(s)
                                    } catch (ee) {
                                        return {
                                            state: "parsererror",
                                            error: v ? ee : "No conversion from " + E + " to " + g
                                        }
                                    }
                        }
                    }
                return {
                    state: "success",
                    data: s
                }
            }
            l.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: Fr.href,
                    type: "GET",
                    isLocal: nl.test(Fr.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": ma,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": l.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(n, s) {
                    return s ? jo(jo(n, l.ajaxSettings), s) : jo(l.ajaxSettings, n)
                },
                ajaxPrefilter: va(st),
                ajaxTransport: va(nt),
                ajax: function(n, s) {
                    typeof n == "object" && (s = n,
                    n = void 0),
                    s = s || {};
                    var u, d, p, g, v, T, E, M, X, ee, F = l.ajaxSetup({}, s), fe = F.context || F, we = F.context && (fe.nodeType || fe.jquery) ? l(fe) : l.event, qe = l.Deferred(), $e = l.Callbacks("once memory"), bt = F.statusCode || {}, dt = {}, _n = {}, kn = "canceled", Ke = {
                        readyState: 0,
                        getResponseHeader: function(ze) {
                            var it;
                            if (E) {
                                if (!g)
                                    for (g = {}; it = tl.exec(p); )
                                        g[it[1].toLowerCase() + " "] = (g[it[1].toLowerCase() + " "] || []).concat(it[2]);
                                it = g[ze.toLowerCase() + " "]
                            }
                            return it == null ? null : it.join(", ")
                        },
                        getAllResponseHeaders: function() {
                            return E ? p : null
                        },
                        setRequestHeader: function(ze, it) {
                            return E == null && (ze = _n[ze.toLowerCase()] = _n[ze.toLowerCase()] || ze,
                            dt[ze] = it),
                            this
                        },
                        overrideMimeType: function(ze) {
                            return E == null && (F.mimeType = ze),
                            this
                        },
                        statusCode: function(ze) {
                            var it;
                            if (ze)
                                if (E)
                                    Ke.always(ze[Ke.status]);
                                else
                                    for (it in ze)
                                        bt[it] = [bt[it], ze[it]];
                            return this
                        },
                        abort: function(ze) {
                            var it = ze || kn;
                            return u && u.abort(it),
                            er(0, it),
                            this
                        }
                    };
                    if (qe.promise(Ke),
                    F.url = ((n || F.url || Fr.href) + "").replace(il, Fr.protocol + "//"),
                    F.type = s.method || s.type || F.method || F.type,
                    F.dataTypes = (F.dataType || "*").toLowerCase().match(at) || [""],
                    F.crossDomain == null) {
                        T = J.createElement("a");
                        try {
                            T.href = F.url,
                            T.href = T.href,
                            F.crossDomain = Vo.protocol + "//" + Vo.host != T.protocol + "//" + T.host
                        } catch {
                            F.crossDomain = !0
                        }
                    }
                    if (F.data && F.processData && typeof F.data != "string" && (F.data = l.param(F.data, F.traditional)),
                    ba(st, F, s, Ke),
                    E)
                        return Ke;
                    M = l.event && F.global,
                    M && l.active++ === 0 && l.event.trigger("ajaxStart"),
                    F.type = F.type.toUpperCase(),
                    F.hasContent = !rl.test(F.type),
                    d = F.url.replace(Uo, ""),
                    F.hasContent ? F.data && F.processData && (F.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (F.data = F.data.replace(Ju, "+")) : (ee = F.url.slice(d.length),
                    F.data && (F.processData || typeof F.data == "string") && (d += (Fi.test(d) ? "&" : "?") + F.data,
                    delete F.data),
                    F.cache === !1 && (d = d.replace(el, "$1"),
                    ee = (Fi.test(d) ? "&" : "?") + "_=" + Ho.guid++ + ee),
                    F.url = d + ee),
                    F.ifModified && (l.lastModified[d] && Ke.setRequestHeader("If-Modified-Since", l.lastModified[d]),
                    l.etag[d] && Ke.setRequestHeader("If-None-Match", l.etag[d])),
                    (F.data && F.hasContent && F.contentType !== !1 || s.contentType) && Ke.setRequestHeader("Content-Type", F.contentType),
                    Ke.setRequestHeader("Accept", F.dataTypes[0] && F.accepts[F.dataTypes[0]] ? F.accepts[F.dataTypes[0]] + (F.dataTypes[0] !== "*" ? ", " + ma + "; q=0.01" : "") : F.accepts["*"]);
                    for (X in F.headers)
                        Ke.setRequestHeader(X, F.headers[X]);
                    if (F.beforeSend && (F.beforeSend.call(fe, Ke, F) === !1 || E))
                        return Ke.abort();
                    if (kn = "abort",
                    $e.add(F.complete),
                    Ke.done(F.success),
                    Ke.fail(F.error),
                    u = ba(nt, F, s, Ke),
                    !u)
                        er(-1, "No Transport");
                    else {
                        if (Ke.readyState = 1,
                        M && we.trigger("ajaxSend", [Ke, F]),
                        E)
                            return Ke;
                        F.async && F.timeout > 0 && (v = o.setTimeout(function() {
                            Ke.abort("timeout")
                        }, F.timeout));
                        try {
                            E = !1,
                            u.send(dt, er)
                        } catch (ze) {
                            if (E)
                                throw ze;
                            er(-1, ze)
                        }
                    }
                    function er(ze, it, ci, Ui) {
                        var hn, gr, Qt, $n, tr, Rt = it;
                        E || (E = !0,
                        v && o.clearTimeout(v),
                        u = void 0,
                        p = Ui || "",
                        Ke.readyState = ze > 0 ? 4 : 0,
                        hn = ze >= 200 && ze < 300 || ze === 304,
                        ci && ($n = ol(F, Ke, ci)),
                        !hn && l.inArray("script", F.dataTypes) > -1 && l.inArray("json", F.dataTypes) < 0 && (F.converters["text script"] = function() {}
                        ),
                        $n = wa(F, $n, Ke, hn),
                        hn ? (F.ifModified && (tr = Ke.getResponseHeader("Last-Modified"),
                        tr && (l.lastModified[d] = tr),
                        tr = Ke.getResponseHeader("etag"),
                        tr && (l.etag[d] = tr)),
                        ze === 204 || F.type === "HEAD" ? Rt = "nocontent" : ze === 304 ? Rt = "notmodified" : (Rt = $n.state,
                        gr = $n.data,
                        Qt = $n.error,
                        hn = !Qt)) : (Qt = Rt,
                        (ze || !Rt) && (Rt = "error",
                        ze < 0 && (ze = 0))),
                        Ke.status = ze,
                        Ke.statusText = (it || Rt) + "",
                        hn ? qe.resolveWith(fe, [gr, Rt, Ke]) : qe.rejectWith(fe, [Ke, Rt, Qt]),
                        Ke.statusCode(bt),
                        bt = void 0,
                        M && we.trigger(hn ? "ajaxSuccess" : "ajaxError", [Ke, F, hn ? gr : Qt]),
                        $e.fireWith(fe, [Ke, Rt]),
                        M && (we.trigger("ajaxComplete", [Ke, F]),
                        --l.active || l.event.trigger("ajaxStop")))
                    }
                    return Ke
                },
                getJSON: function(n, s, u) {
                    return l.get(n, s, u, "json")
                },
                getScript: function(n, s) {
                    return l.get(n, void 0, s, "script")
                }
            }),
            l.each(["get", "post"], function(n, s) {
                l[s] = function(u, d, p, g) {
                    return D(d) && (g = g || p,
                    p = d,
                    d = void 0),
                    l.ajax(l.extend({
                        url: u,
                        type: s,
                        dataType: g,
                        data: d,
                        success: p
                    }, l.isPlainObject(u) && u))
                }
            }),
            l.ajaxPrefilter(function(n) {
                var s;
                for (s in n.headers)
                    s.toLowerCase() === "content-type" && (n.contentType = n.headers[s] || "")
            }),
            l._evalUrl = function(n, s, u) {
                return l.ajax({
                    url: n,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: {
                        "text script": function() {}
                    },
                    dataFilter: function(d) {
                        l.globalEval(d, s, u)
                    }
                })
            }
            ,
            l.fn.extend({
                wrapAll: function(n) {
                    var s;
                    return this[0] && (D(n) && (n = n.call(this[0])),
                    s = l(n, this[0].ownerDocument).eq(0).clone(!0),
                    this[0].parentNode && s.insertBefore(this[0]),
                    s.map(function() {
                        for (var u = this; u.firstElementChild; )
                            u = u.firstElementChild;
                        return u
                    }).append(this)),
                    this
                },
                wrapInner: function(n) {
                    return D(n) ? this.each(function(s) {
                        l(this).wrapInner(n.call(this, s))
                    }) : this.each(function() {
                        var s = l(this)
                          , u = s.contents();
                        u.length ? u.wrapAll(n) : s.append(n)
                    })
                },
                wrap: function(n) {
                    var s = D(n);
                    return this.each(function(u) {
                        l(this).wrapAll(s ? n.call(this, u) : n)
                    })
                },
                unwrap: function(n) {
                    return this.parent(n).not("body").each(function() {
                        l(this).replaceWith(this.childNodes)
                    }),
                    this
                }
            }),
            l.expr.pseudos.hidden = function(n) {
                return !l.expr.pseudos.visible(n)
            }
            ,
            l.expr.pseudos.visible = function(n) {
                return !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length)
            }
            ,
            l.ajaxSettings.xhr = function() {
                try {
                    return new o.XMLHttpRequest
                } catch {}
            }
            ;
            var sl = {
                0: 200,
                1223: 204
            }
              , ft = l.ajaxSettings.xhr();
            W.cors = !!ft && "withCredentials"in ft,
            W.ajax = ft = !!ft,
            l.ajaxTransport(function(n) {
                var s, u;
                if (W.cors || ft && !n.crossDomain)
                    return {
                        send: function(d, p) {
                            var g, v = n.xhr();
                            if (v.open(n.type, n.url, n.async, n.username, n.password),
                            n.xhrFields)
                                for (g in n.xhrFields)
                                    v[g] = n.xhrFields[g];
                            n.mimeType && v.overrideMimeType && v.overrideMimeType(n.mimeType),
                            !n.crossDomain && !d["X-Requested-With"] && (d["X-Requested-With"] = "XMLHttpRequest");
                            for (g in d)
                                v.setRequestHeader(g, d[g]);
                            s = function(T) {
                                return function() {
                                    s && (s = u = v.onload = v.onerror = v.onabort = v.ontimeout = v.onreadystatechange = null,
                                    T === "abort" ? v.abort() : T === "error" ? typeof v.status != "number" ? p(0, "error") : p(v.status, v.statusText) : p(sl[v.status] || v.status, v.statusText, (v.responseType || "text") !== "text" || typeof v.responseText != "string" ? {
                                        binary: v.response
                                    } : {
                                        text: v.responseText
                                    }, v.getAllResponseHeaders()))
                                }
                            }
                            ,
                            v.onload = s(),
                            u = v.onerror = v.ontimeout = s("error"),
                            v.onabort !== void 0 ? v.onabort = u : v.onreadystatechange = function() {
                                v.readyState === 4 && o.setTimeout(function() {
                                    s && u()
                                })
                            }
                            ,
                            s = s("abort");
                            try {
                                v.send(n.hasContent && n.data || null)
                            } catch (T) {
                                if (s)
                                    throw T
                            }
                        },
                        abort: function() {
                            s && s()
                        }
                    }
            }),
            l.ajaxPrefilter(function(n) {
                n.crossDomain && (n.contents.script = !1)
            }),
            l.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(n) {
                        return l.globalEval(n),
                        n
                    }
                }
            }),
            l.ajaxPrefilter("script", function(n) {
                n.cache === void 0 && (n.cache = !1),
                n.crossDomain && (n.type = "GET")
            }),
            l.ajaxTransport("script", function(n) {
                if (n.crossDomain || n.scriptAttrs) {
                    var s, u;
                    return {
                        send: function(d, p) {
                            s = l("<script>").attr(n.scriptAttrs || {}).prop({
                                charset: n.scriptCharset,
                                src: n.url
                            }).on("load error", u = function(g) {
                                s.remove(),
                                u = null,
                                g && p(g.type === "error" ? 404 : 200, g.type)
                            }
                            ),
                            J.head.appendChild(s[0])
                        },
                        abort: function() {
                            u && u()
                        }
                    }
                }
            });
            var Wi = []
              , Nn = /(=)\?(?=&|$)|\?\?/;
            l.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var n = Wi.pop() || l.expando + "_" + Ho.guid++;
                    return this[n] = !0,
                    n
                }
            }),
            l.ajaxPrefilter("json jsonp", function(n, s, u) {
                var d, p, g, v = n.jsonp !== !1 && (Nn.test(n.url) ? "url" : typeof n.data == "string" && (n.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && Nn.test(n.data) && "data");
                if (v || n.dataTypes[0] === "jsonp")
                    return d = n.jsonpCallback = D(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback,
                    v ? n[v] = n[v].replace(Nn, "$1" + d) : n.jsonp !== !1 && (n.url += (Fi.test(n.url) ? "&" : "?") + n.jsonp + "=" + d),
                    n.converters["script json"] = function() {
                        return g || l.error(d + " was not called"),
                        g[0]
                    }
                    ,
                    n.dataTypes[0] = "json",
                    p = o[d],
                    o[d] = function() {
                        g = arguments
                    }
                    ,
                    u.always(function() {
                        p === void 0 ? l(o).removeProp(d) : o[d] = p,
                        n[d] && (n.jsonpCallback = s.jsonpCallback,
                        Wi.push(d)),
                        g && D(p) && p(g[0]),
                        g = p = void 0
                    }),
                    "script"
            }),
            W.createHTMLDocument = function() {
                var n = J.implementation.createHTMLDocument("").body;
                return n.innerHTML = "<form></form><form></form>",
                n.childNodes.length === 2
            }(),
            l.parseHTML = function(n, s, u) {
                if (typeof n != "string")
                    return [];
                typeof s == "boolean" && (u = s,
                s = !1);
                var d, p, g;
                return s || (W.createHTMLDocument ? (s = J.implementation.createHTMLDocument(""),
                d = s.createElement("base"),
                d.href = J.location.href,
                s.head.appendChild(d)) : s = J),
                p = He.exec(n),
                g = !u && [],
                p ? [s.createElement(p[1])] : (p = Qs([n], s, g),
                g && g.length && l(g).remove(),
                l.merge([], p.childNodes))
            }
            ,
            l.fn.load = function(n, s, u) {
                var d, p, g, v = this, T = n.indexOf(" ");
                return T > -1 && (d = Qn(n.slice(T)),
                n = n.slice(0, T)),
                D(s) ? (u = s,
                s = void 0) : s && typeof s == "object" && (p = "POST"),
                v.length > 0 && l.ajax({
                    url: n,
                    type: p || "GET",
                    dataType: "html",
                    data: s
                }).done(function(E) {
                    g = arguments,
                    v.html(d ? l("<div>").append(l.parseHTML(E)).find(d) : E)
                }).always(u && function(E, M) {
                    v.each(function() {
                        u.apply(this, g || [E.responseText, M, E])
                    })
                }
                ),
                this
            }
            ,
            l.expr.pseudos.animated = function(n) {
                return l.grep(l.timers, function(s) {
                    return n === s.elem
                }).length
            }
            ,
            l.offset = {
                setOffset: function(n, s, u) {
                    var d, p, g, v, T, E, M, X = l.css(n, "position"), ee = l(n), F = {};
                    X === "static" && (n.style.position = "relative"),
                    T = ee.offset(),
                    g = l.css(n, "top"),
                    E = l.css(n, "left"),
                    M = (X === "absolute" || X === "fixed") && (g + E).indexOf("auto") > -1,
                    M ? (d = ee.position(),
                    v = d.top,
                    p = d.left) : (v = parseFloat(g) || 0,
                    p = parseFloat(E) || 0),
                    D(s) && (s = s.call(n, u, l.extend({}, T))),
                    s.top != null && (F.top = s.top - T.top + v),
                    s.left != null && (F.left = s.left - T.left + p),
                    "using"in s ? s.using.call(n, F) : ee.css(F)
                }
            },
            l.fn.extend({
                offset: function(n) {
                    if (arguments.length)
                        return n === void 0 ? this : this.each(function(p) {
                            l.offset.setOffset(this, n, p)
                        });
                    var s, u, d = this[0];
                    if (d)
                        return d.getClientRects().length ? (s = d.getBoundingClientRect(),
                        u = d.ownerDocument.defaultView,
                        {
                            top: s.top + u.pageYOffset,
                            left: s.left + u.pageXOffset
                        }) : {
                            top: 0,
                            left: 0
                        }
                },
                position: function() {
                    if (this[0]) {
                        var n, s, u, d = this[0], p = {
                            top: 0,
                            left: 0
                        };
                        if (l.css(d, "position") === "fixed")
                            s = d.getBoundingClientRect();
                        else {
                            for (s = this.offset(),
                            u = d.ownerDocument,
                            n = d.offsetParent || u.documentElement; n && (n === u.body || n === u.documentElement) && l.css(n, "position") === "static"; )
                                n = n.parentNode;
                            n && n !== d && n.nodeType === 1 && (p = l(n).offset(),
                            p.top += l.css(n, "borderTopWidth", !0),
                            p.left += l.css(n, "borderLeftWidth", !0))
                        }
                        return {
                            top: s.top - p.top - l.css(d, "marginTop", !0),
                            left: s.left - p.left - l.css(d, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var n = this.offsetParent; n && l.css(n, "position") === "static"; )
                            n = n.offsetParent;
                        return n || Rn
                    })
                }
            }),
            l.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(n, s) {
                var u = s === "pageYOffset";
                l.fn[n] = function(d) {
                    return An(this, function(p, g, v) {
                        var T;
                        if (he(p) ? T = p : p.nodeType === 9 && (T = p.defaultView),
                        v === void 0)
                            return T ? T[s] : p[g];
                        T ? T.scrollTo(u ? T.pageXOffset : v, u ? v : T.pageYOffset) : p[g] = v
                    }, n, d, arguments.length)
                }
            }),
            l.each(["top", "left"], function(n, s) {
                l.cssHooks[s] = li(W.pixelPosition, function(u, d) {
                    if (d)
                        return d = ui(u, s),
                        Bo.test(d) ? l(u).position()[s] + "px" : d
                })
            }),
            l.each({
                Height: "height",
                Width: "width"
            }, function(n, s) {
                l.each({
                    padding: "inner" + n,
                    content: s,
                    "": "outer" + n
                }, function(u, d) {
                    l.fn[d] = function(p, g) {
                        var v = arguments.length && (u || typeof p != "boolean")
                          , T = u || (p === !0 || g === !0 ? "margin" : "border");
                        return An(this, function(E, M, X) {
                            var ee;
                            return he(E) ? d.indexOf("outer") === 0 ? E["inner" + n] : E.document.documentElement["client" + n] : E.nodeType === 9 ? (ee = E.documentElement,
                            Math.max(E.body["scroll" + n], ee["scroll" + n], E.body["offset" + n], ee["offset" + n], ee["client" + n])) : X === void 0 ? l.css(E, M, T) : l.style(E, M, X, T)
                        }, s, v ? p : void 0, v)
                    }
                })
            }),
            l.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(n, s) {
                l.fn[s] = function(u) {
                    return this.on(s, u)
                }
            }),
            l.fn.extend({
                bind: function(n, s, u) {
                    return this.on(n, null, s, u)
                },
                unbind: function(n, s) {
                    return this.off(n, null, s)
                },
                delegate: function(n, s, u, d) {
                    return this.on(s, n, u, d)
                },
                undelegate: function(n, s, u) {
                    return arguments.length === 1 ? this.off(n, "**") : this.off(s, n || "**", u)
                },
                hover: function(n, s) {
                    return this.on("mouseenter", n).on("mouseleave", s || n)
                }
            }),
            l.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(n, s) {
                l.fn[s] = function(u, d) {
                    return arguments.length > 0 ? this.on(s, null, u, d) : this.trigger(s)
                }
            });
            var Ca = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
            l.proxy = function(n, s) {
                var u, d, p;
                if (typeof s == "string" && (u = n[s],
                s = n,
                n = u),
                !!D(n))
                    return d = y.call(arguments, 2),
                    p = function() {
                        return n.apply(s || this, d.concat(y.call(arguments)))
                    }
                    ,
                    p.guid = n.guid = n.guid || l.guid++,
                    p
            }
            ,
            l.holdReady = function(n) {
                n ? l.readyWait++ : l.ready(!0)
            }
            ,
            l.isArray = Array.isArray,
            l.parseJSON = JSON.parse,
            l.nodeName = j,
            l.isFunction = D,
            l.isWindow = he,
            l.camelCase = Pt,
            l.type = Re,
            l.now = Date.now,
            l.isNumeric = function(n) {
                var s = l.type(n);
                return (s === "number" || s === "string") && !isNaN(n - parseFloat(n))
            }
            ,
            l.trim = function(n) {
                return n == null ? "" : (n + "").replace(Ca, "$1")
            }
            ;
            var Ko = o.jQuery
              , Zt = o.$;
            return l.noConflict = function(n) {
                return o.$ === l && (o.$ = Zt),
                n && o.jQuery === l && (o.jQuery = Ko),
                l
            }
            ,
            typeof a > "u" && (o.jQuery = o.$ = l),
            l
        })
    }
    )(oc);
    var xh = oc.exports;
    const Pn = ct(xh)
      , Q = {
        elementId: "ytb-element-id",
        contentType: "ytb-content-type",
        blocked: "ytb-blocked",
        overlayHidden: "ytb-overlay-hidden",
        watchVideoId: "ytb-watch-video-id",
        miniplayerVideo: "ytb-miniplayer-video",
        miniplayerOverlay: "ytb-miniplayer-overlay",
        dropdownButton: "ytb-dropdown-button",
        dropdownVisible: "ytb-dropdown-visible",
        dropdownContent: "ytb-content-dropdown",
        hasChannelBlockButton: "ytb-has-channel-block-button",
        alwaysShowChannelBlockButton: "ytb-always-show-channel-block",
        biggerChannelBlockButton: "ytb-bigger",
        injected: "ytb-injected",
        devBackgroundColor: "ytb-has-dev-bg-color",
        devOutlineColor: "ytb-has-dev-bg-color"
    }
      , ge = {
        hide: "ytb-hide",
        overlay: "ytb-overlay",
        revealButton: "ytb-reveal-button",
        dropdownButton: "ytb-dropdown-button",
        channelBlockButton: "ytb-channel-block-button",
        relative: "ytb-relative"
    }
      , gs = {
        contentBlockIdButton: "ytb_block_id",
        contentBlockChannelButton: "ytb_block_channel"
    }
      , ys = {
        2: "Autos & Vehicles",
        1: "Film & Animation",
        10: "Music",
        15: "Pets & Animals",
        17: "Sports",
        18: "Short Movies",
        19: "Travel & Events",
        20: "Gaming",
        21: "Videoblogging",
        22: "People & Blogs",
        23: "Comedy",
        24: "Entertainment",
        25: "News & Politics",
        26: "Howto & Style",
        27: "Education",
        28: "Science & Technology",
        29: "Nonprofits & Activism",
        30: "Movies",
        31: "Anime/Animation",
        32: "Action/Adventure",
        33: "Classics",
        34: "Movie/Comedy",
        35: "Documentary",
        36: "Drama",
        37: "Family",
        38: "Foreign",
        39: "Horror",
        40: "Sci-Fi/Fantasy",
        41: "Thriller",
        42: "Shorts",
        43: "Shows",
        44: "Trailers"
    }
      , Th = new Map(Object.entries(ys).map( ([r,o]) => [o, r]));
    function Ih(r) {
        throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')
    }
    var eo = {
        exports: {}
    };
    const Bh = hs(Object.freeze(Object.defineProperty({
        __proto__: null,
        default: {}
    }, Symbol.toStringTag, {
        value: "Module"
    })));
    var sc = typeof process < "u" && process.pid ? process.pid.toString(36) : ""
      , ac = "";
    if (typeof __webpack_require__ != "function" && typeof Ih < "u") {
        var iu = ""
          , uc = Bh;
        if (uc.networkInterfaces)
            var ou = uc.networkInterfaces();
        if (ou) {
            e: for (let r in ou) {
                const o = ou[r]
                  , a = o.length;
                for (var Si = 0; Si < a; Si++)
                    if (o[Si] !== void 0 && o[Si].mac && o[Si].mac != "00:00:00:00:00:00") {
                        iu = o[Si].mac;
                        break e
                    }
            }
            ac = iu ? parseInt(iu.replace(/\:|\D+/gi, "")).toString(36) : ""
        }
    }
    eo.exports = eo.exports.default = function(r, o) {
        return (r || "") + ac + sc + to().toString(36) + (o || "")
    }
    ,
    eo.exports.process = function(r, o) {
        return (r || "") + sc + to().toString(36) + (o || "")
    }
    ,
    eo.exports.time = function(r, o) {
        return (r || "") + to().toString(36) + (o || "")
    }
    ;
    function to() {
        var r = Date.now()
          , o = to.last || r;
        return to.last = r > o ? r : o + 1
    }
    var Lh = eo.exports;
    const Ai = ct(Lh);
    var lc = {
        exports: {}
    };
    (function(r, o) {
        (function(a, c) {
            c(r)
        }
        )(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : Qe, function(a) {
            var c, h;
            if (!((h = (c = globalThis.chrome) == null ? void 0 : c.runtime) != null && h.id))
                throw new Error("This script should only be loaded in a browser extension.");
            if (typeof globalThis.browser > "u" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
                const y = "The message port closed before a response was received."
                  , b = k => {
                    const _ = {
                        alarms: {
                            clear: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            clearAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            get: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        bookmarks: {
                            create: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getChildren: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getRecent: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getSubTree: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getTree: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            move: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeTree: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            search: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        },
                        browserAction: {
                            disable: {
                                minArgs: 0,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            enable: {
                                minArgs: 0,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            getBadgeBackgroundColor: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getBadgeText: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getPopup: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getTitle: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            openPopup: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            setBadgeBackgroundColor: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            setBadgeText: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            setIcon: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            setPopup: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            setTitle: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            }
                        },
                        browsingData: {
                            remove: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            removeCache: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeCookies: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeDownloads: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeFormData: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeHistory: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeLocalStorage: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removePasswords: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removePluginData: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            settings: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        commands: {
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        contextMenus: {
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        },
                        cookies: {
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAllCookieStores: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            set: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        devtools: {
                            inspectedWindow: {
                                eval: {
                                    minArgs: 1,
                                    maxArgs: 2,
                                    singleCallbackArg: !1
                                }
                            },
                            panels: {
                                create: {
                                    minArgs: 3,
                                    maxArgs: 3,
                                    singleCallbackArg: !0
                                },
                                elements: {
                                    createSidebarPane: {
                                        minArgs: 1,
                                        maxArgs: 1
                                    }
                                }
                            }
                        },
                        downloads: {
                            cancel: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            download: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            erase: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getFileIcon: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            open: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            pause: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeFile: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            resume: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            search: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            show: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            }
                        },
                        extension: {
                            isAllowedFileSchemeAccess: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            isAllowedIncognitoAccess: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        history: {
                            addUrl: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            deleteAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            deleteRange: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            deleteUrl: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getVisits: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            search: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        i18n: {
                            detectLanguage: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAcceptLanguages: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        identity: {
                            launchWebAuthFlow: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        idle: {
                            queryState: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        management: {
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getSelf: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            setEnabled: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            uninstallSelf: {
                                minArgs: 0,
                                maxArgs: 1
                            }
                        },
                        notifications: {
                            clear: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            create: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getPermissionLevel: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        },
                        pageAction: {
                            getPopup: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getTitle: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            hide: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            setIcon: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            setPopup: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            setTitle: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            show: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            }
                        },
                        permissions: {
                            contains: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            request: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        runtime: {
                            getBackgroundPage: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getPlatformInfo: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            openOptionsPage: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            requestUpdateCheck: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            sendMessage: {
                                minArgs: 1,
                                maxArgs: 3
                            },
                            sendNativeMessage: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            setUninstallURL: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        sessions: {
                            getDevices: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getRecentlyClosed: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            restore: {
                                minArgs: 0,
                                maxArgs: 1
                            }
                        },
                        storage: {
                            local: {
                                clear: {
                                    minArgs: 0,
                                    maxArgs: 0
                                },
                                get: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                getBytesInUse: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                remove: {
                                    minArgs: 1,
                                    maxArgs: 1
                                },
                                set: {
                                    minArgs: 1,
                                    maxArgs: 1
                                }
                            },
                            managed: {
                                get: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                getBytesInUse: {
                                    minArgs: 0,
                                    maxArgs: 1
                                }
                            },
                            sync: {
                                clear: {
                                    minArgs: 0,
                                    maxArgs: 0
                                },
                                get: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                getBytesInUse: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                remove: {
                                    minArgs: 1,
                                    maxArgs: 1
                                },
                                set: {
                                    minArgs: 1,
                                    maxArgs: 1
                                }
                            }
                        },
                        tabs: {
                            captureVisibleTab: {
                                minArgs: 0,
                                maxArgs: 2
                            },
                            create: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            detectLanguage: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            discard: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            duplicate: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            executeScript: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getCurrent: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getZoom: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getZoomSettings: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            goBack: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            goForward: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            highlight: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            insertCSS: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            move: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            query: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            reload: {
                                minArgs: 0,
                                maxArgs: 2
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeCSS: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            sendMessage: {
                                minArgs: 2,
                                maxArgs: 3
                            },
                            setZoom: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            setZoomSettings: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            update: {
                                minArgs: 1,
                                maxArgs: 2
                            }
                        },
                        topSites: {
                            get: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        webNavigation: {
                            getAllFrames: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getFrame: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        webRequest: {
                            handlerBehaviorChanged: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        windows: {
                            create: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            get: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getCurrent: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getLastFocused: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        }
                    };
                    if (Object.keys(_).length === 0)
                        throw new Error("api-metadata.json has not been included in browser-polyfill");
                    class O extends WeakMap {
                        constructor(j, Y=void 0) {
                            super(Y),
                            this.createItem = j
                        }
                        get(j) {
                            return this.has(j) || this.set(j, this.createItem(j)),
                            super.get(j)
                        }
                    }
                    const Z = R => R && typeof R == "object" && typeof R.then == "function"
                      , ue = (R, j) => (...Y) => {
                        k.runtime.lastError ? R.reject(new Error(k.runtime.lastError.message)) : j.singleCallbackArg || Y.length <= 1 && j.singleCallbackArg !== !1 ? R.resolve(Y[0]) : R.resolve(Y)
                    }
                      , pe = R => R == 1 ? "argument" : "arguments"
                      , G = (R, j) => function(z, ...de) {
                        if (de.length < j.minArgs)
                            throw new Error(`Expected at least ${j.minArgs} ${pe(j.minArgs)} for ${R}(), got ${de.length}`);
                        if (de.length > j.maxArgs)
                            throw new Error(`Expected at most ${j.maxArgs} ${pe(j.maxArgs)} for ${R}(), got ${de.length}`);
                        return new Promise( (N, V) => {
                            if (j.fallbackToNoCallback)
                                try {
                                    z[R](...de, ue({
                                        resolve: N,
                                        reject: V
                                    }, j))
                                } catch (q) {
                                    console.warn(`${R} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, q),
                                    z[R](...de),
                                    j.fallbackToNoCallback = !1,
                                    j.noCallback = !0,
                                    N()
                                }
                            else
                                j.noCallback ? (z[R](...de),
                                N()) : z[R](...de, ue({
                                    resolve: N,
                                    reject: V
                                }, j))
                        }
                        )
                    }
                      , W = (R, j, Y) => new Proxy(j,{
                        apply(z, de, N) {
                            return Y.call(de, R, ...N)
                        }
                    });
                    let D = Function.call.bind(Object.prototype.hasOwnProperty);
                    const he = (R, j={}, Y={}) => {
                        let z = Object.create(null)
                          , de = {
                            has(V, q) {
                                return q in R || q in z
                            },
                            get(V, q, K) {
                                if (q in z)
                                    return z[q];
                                if (!(q in R))
                                    return;
                                let te = R[q];
                                if (typeof te == "function")
                                    if (typeof j[q] == "function")
                                        te = W(R, R[q], j[q]);
                                    else if (D(Y, q)) {
                                        let ae = G(q, Y[q]);
                                        te = W(R, R[q], ae)
                                    } else
                                        te = te.bind(R);
                                else if (typeof te == "object" && te !== null && (D(j, q) || D(Y, q)))
                                    te = he(te, j[q], Y[q]);
                                else if (D(Y, "*"))
                                    te = he(te, j[q], Y["*"]);
                                else
                                    return Object.defineProperty(z, q, {
                                        configurable: !0,
                                        enumerable: !0,
                                        get() {
                                            return R[q]
                                        },
                                        set(ae) {
                                            R[q] = ae
                                        }
                                    }),
                                    te;
                                return z[q] = te,
                                te
                            },
                            set(V, q, K, te) {
                                return q in z ? z[q] = K : R[q] = K,
                                !0
                            },
                            defineProperty(V, q, K) {
                                return Reflect.defineProperty(z, q, K)
                            },
                            deleteProperty(V, q) {
                                return Reflect.deleteProperty(z, q)
                            }
                        }
                          , N = Object.create(R);
                        return new Proxy(N,de)
                    }
                      , J = R => ({
                        addListener(j, Y, ...z) {
                            j.addListener(R.get(Y), ...z)
                        },
                        hasListener(j, Y) {
                            return j.hasListener(R.get(Y))
                        },
                        removeListener(j, Y) {
                            j.removeListener(R.get(Y))
                        }
                    })
                      , Oe = new O(R => typeof R != "function" ? R : function(Y) {
                        const z = he(Y, {}, {
                            getContent: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        });
                        R(z)
                    }
                    )
                      , Te = new O(R => typeof R != "function" ? R : function(Y, z, de) {
                        let N = !1, V, q = new Promise(re => {
                            V = function(ce) {
                                N = !0,
                                re(ce)
                            }
                        }
                        ), K;
                        try {
                            K = R(Y, z, V)
                        } catch (re) {
                            K = Promise.reject(re)
                        }
                        const te = K !== !0 && Z(K);
                        if (K !== !0 && !te && !N)
                            return !1;
                        const ae = re => {
                            re.then(ce => {
                                de(ce)
                            }
                            , ce => {
                                let _e;
                                ce && (ce instanceof Error || typeof ce.message == "string") ? _e = ce.message : _e = "An unexpected error occurred",
                                de({
                                    __mozWebExtensionPolyfillReject__: !0,
                                    message: _e
                                })
                            }
                            ).catch(ce => {
                                console.error("Failed to send onMessage rejected reply", ce)
                            }
                            )
                        }
                        ;
                        return ae(te ? K : q),
                        !0
                    }
                    )
                      , Re = ({reject: R, resolve: j}, Y) => {
                        k.runtime.lastError ? k.runtime.lastError.message === y ? j() : R(new Error(k.runtime.lastError.message)) : Y && Y.__mozWebExtensionPolyfillReject__ ? R(new Error(Y.message)) : j(Y)
                    }
                      , Ie = (R, j, Y, ...z) => {
                        if (z.length < j.minArgs)
                            throw new Error(`Expected at least ${j.minArgs} ${pe(j.minArgs)} for ${R}(), got ${z.length}`);
                        if (z.length > j.maxArgs)
                            throw new Error(`Expected at most ${j.maxArgs} ${pe(j.maxArgs)} for ${R}(), got ${z.length}`);
                        return new Promise( (de, N) => {
                            const V = Re.bind(null, {
                                resolve: de,
                                reject: N
                            });
                            z.push(V),
                            Y.sendMessage(...z)
                        }
                        )
                    }
                      , me = {
                        devtools: {
                            network: {
                                onRequestFinished: J(Oe)
                            }
                        },
                        runtime: {
                            onMessage: J(Te),
                            onMessageExternal: J(Te),
                            sendMessage: Ie.bind(null, "sendMessage", {
                                minArgs: 1,
                                maxArgs: 3
                            })
                        },
                        tabs: {
                            sendMessage: Ie.bind(null, "sendMessage", {
                                minArgs: 2,
                                maxArgs: 3
                            })
                        }
                    }
                      , l = {
                        clear: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        get: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        set: {
                            minArgs: 1,
                            maxArgs: 1
                        }
                    };
                    return _.privacy = {
                        network: {
                            "*": l
                        },
                        services: {
                            "*": l
                        },
                        websites: {
                            "*": l
                        }
                    },
                    he(k, me, _)
                }
                ;
                a.exports = b(chrome)
            } else
                a.exports = globalThis.browser
        })
    }
    )(lc);
    var Ph = lc.exports;
    const ms = ct(Ph);
    var gt = ms;
    const Ae = {
        convertToKeywordArray(r, o={}) {
            o = Er.merge({
                separator: ",",
                separateNewLines: !0,
                trim: !0,
                ignoreEmpty: !0,
                disableRegex: !1,
                modifiers: []
            }, o);
            const a = new Map;
            o.modifiers || (o.modifiers = []),
            o.modifiers.forEach(k => {
                a.set(k.name, k),
                k.aliases && k.aliases.forEach(_ => {
                    a.set(_, k)
                }
                )
            }
            );
            const c = [];
            o.separator && c.push(o.separator),
            o.separateNewLines && c.push(`
`);
            const h = new RegExp(`(?<!\\\\)[${c.join("")}]`,"g")
              , y = new RegExp(`\\\\([${c.join("")}])`,"g");
            let b = r.split(h);
            return o.trim && (b = b.map(k => k.trim())),
            r.match(y) && (b = b.map(k => k.replace(y, "$1"))),
            b = b.map(k => {
                const _ = {
                    str: k,
                    keywords: []
                };
                let O = k.split(new RegExp("(?<!\\\\)\\$&","g"));
                return k.match(/\\\$&/) && (O = O.map(Z => Z.replace(/\\\$&/g, "$&"))),
                O = O.map(Z => {
                    const ue = {
                        str: "",
                        regex: void 0,
                        wordBoundRegexSensitive: void 0,
                        wordBoundRegex: void 0,
                        negative: !1,
                        invalid: !1,
                        modifiers: []
                    };
                    for (; ; ) {
                        const he = /(?:^\s*\${([^}]*)}|\${([^}]*)}\s*$)/
                          , J = Z.match(he);
                        if (!J)
                            break;
                        Z = Z.replace(he, "");
                        const Te = (J[1] || J[2]).match(/^\s*([^:]+)\s*(?::\s*(.+)\s*)?$/);
                        if (!Te)
                            continue;
                        let Re = Te[1];
                        const Ie = Te[2] || ""
                          , me = Re.startsWith("!");
                        me && (Re = Re.replace("!", ""));
                        let l = a.get(Re.toLowerCase().trim());
                        l && (l = {
                            ...l
                        },
                        l.value = Ie,
                        l.negative = me,
                        ue.modifiers.push(l))
                    }
                    const pe = new RegExp("(?<=^\\s*)(\\\\?)!")
                      , G = Z.match(pe);
                    G && (G[1] ? Z = Z.replace(pe, "!") : (ue.negative = !0,
                    Z = Z.replace(pe, "")));
                    const W = /^\/(.*)\/([a-z]*)?$/
                      , D = Z.trim().match(W);
                    if (D && !o.disableRegex)
                        try {
                            const he = new RegExp(D[1],D[2] || "");
                            ue.regex = he
                        } catch {
                            ue.invalid = !0
                        }
                    else
                        o.trim && (Z = Z.trim()),
                        ue.str = Z,
                        ue.wordBoundRegex = new RegExp(`\\b${Er.escapeRegExp(Z)}\\b`,"i"),
                        ue.wordBoundRegexSensitive = new RegExp(`\\b${Er.escapeRegExp(Z)}\\b`);
                    return ue
                }
                ),
                _.keywords = O,
                _
            }
            ),
            o.ignoreEmpty && (b = b.filter(k => !(!k.str || k.keywords.some(_ => _.invalid || !_.str && !_.regex)))),
            b
        },
        match(r, o, a, c, h) {
            Array.isArray(r) || (r = [r]);
            let y = r;
            h || (h = {
                caseSensitive: !1,
                exactMatch: !1,
                wordBoundary: !1
            });
            for (let b = 0; b < c.length; b++) {
                const k = c[b];
                if (k.keywords.every(O => {
                    if (h.customMatch)
                        return h.customMatch(y, O);
                    let Z = {
                        ...h
                    };
                    for (let pe of O.modifiers) {
                        const G = pe.check({
                            info: o,
                            contentType: a,
                            value: pe.value,
                            options: Z,
                            negative: pe.negative
                        });
                        if (!pe.optionChanger && (pe.negative && G || !pe.negative && !G))
                            return !1
                    }
                    let ue = !1;
                    return O.regex ? ue = y.some(pe => {
                        var G;
                        return (G = O.regex) == null ? void 0 : G.test(pe)
                    }
                    ) : ue = y.some(pe => {
                        if (Z.wordBoundary) {
                            const G = Z.caseSensitive ? O.wordBoundRegexSensitive : O.wordBoundRegex;
                            return G == null ? void 0 : G.test(pe)
                        } else {
                            let G = O.str;
                            return Z.caseSensitive || (G = G.toLowerCase(),
                            pe = pe.toLowerCase()),
                            Z.exactMatch ? pe === G : pe.trim().match(/^https?:\/\/.+$/) ? !1 : pe.includes(G)
                        }
                    }
                    ),
                    O.negative ? !ue : ue
                }
                ))
                    return k.str
            }
            return ""
        }
    }
      , At = [{
        name: "casesensitive",
        aliases: ["case", "cs"],
        optionChanger: !0,
        check({options: r, negative: o}) {
            return r.caseSensitive = !o,
            !0
        }
    }, {
        name: "exact",
        aliases: ["em", "exactmatch"],
        optionChanger: !0,
        check({options: r, negative: o}) {
            return r.exactMatch = !o,
            !0
        }
    }, {
        name: "bound",
        aliases: ["wb", "word", "boundary", "wordboundaru", "wordbound"],
        optionChanger: !0,
        check({options: r, negative: o}) {
            return r.wordBoundary = !o,
            !0
        }
    }, {
        name: "isplaylistvideo",
        aliases: ["pv", "fromplaylist"],
        forContentType: ["video"],
        check({info: r}) {
            return !!r.playlistId
        }
    }, {
        name: "shorts",
        aliases: ["short"],
        forContentType: ["video"],
        check({info: r}) {
            return r.shorts
        }
    }, {
        name: "live",
        aliases: ["lives", "is-live", "islive"],
        forContentType: ["video"],
        check({info: r}) {
            return r.live
        }
    }, {
        name: "premiere",
        aliases: ["ispremiere", "is-premiere", "upcoming", "is-upcoming"],
        forContentType: ["video"],
        check({info: r}) {
            return r.premiere
        }
    }, {
        name: "member",
        aliases: ["members", "member-only", "members-only"],
        forContentType: ["video"],
        check({info: r}) {
            return r.membersOnly
        }
    }, {
        name: "duration",
        aliases: ["length", "leng", "greater"],
        forContentType: ["video"],
        check({info: r, value: o}) {
            if (!o)
                return !1;
            const a = parseInt(o);
            return isNaN(a) || a > 60 && r.shorts || !r.duration ? !1 : Xc(r.duration, a)
        }
    }, {
        name: "minduration",
        aliases: ["minlength", "minleng", "shorter"],
        forContentType: ["video"],
        check({info: r, value: o}) {
            if (!o)
                return !1;
            const a = parseInt(o);
            return isNaN(a) ? !1 : a >= 60 && r.shorts ? !0 : r.duration ? Zc(r.duration, a) : !1
        }
    }, {
        name: "older",
        aliases: ["old"],
        forContentType: ["video"],
        check({info: r, value: o}) {
            if (!r.publishedAt || !o)
                return !1;
            const a = parseInt(o);
            return isNaN(a) || a < 0 ? !1 : Qc(r.publishedAt, a)
        }
    }, {
        name: "newer",
        aliases: ["new"],
        forContentType: ["video"],
        check({info: r, value: o}) {
            if (!r.publishedAt || !o)
                return !1;
            const a = parseInt(o);
            return isNaN(a) || a < 0 ? !1 : Jc(r.publishedAt, a)
        }
    }, {
        name: "description",
        aliases: ["desc"],
        forContentType: ["video"],
        check({info: r, contentType: o, value: a}) {
            if (!a || !r.description)
                return !1;
            const c = Ae.convertToKeywordArray(a, {
                modifiers: At
            });
            return !!Ae.match(r.description, r, o, c, {
                caseSensitive: !1,
                exactMatch: !1,
                wordBoundary: !1
            })
        }
    }, {
        name: "tag",
        aliases: ["tags"],
        forContentType: ["video"],
        check({info: r, contentType: o, value: a}) {
            if (!a || r.tags.length === 0)
                return !1;
            const c = Ae.convertToKeywordArray(a, {
                modifiers: At
            });
            return !!Ae.match(r.tags, r, o, c, {
                caseSensitive: !1,
                exactMatch: !0,
                wordBoundary: !1
            })
        }
    }, {
        name: "channel",
        aliases: ["ch", "user"],
        check({info: r, contentType: o, value: a}) {
            if (!a)
                return !1;
            const c = [r.channel.name, r.channel.url, r.channel.handle, r.channel.id].filter(y => y);
            a = a.trim();
            const h = Ae.convertToKeywordArray(a, {
                separator: "",
                separateNewLines: !0
            });
            return !!Ae.match(c, r, o, h, {
                caseSensitive: !1,
                exactMatch: !0,
                wordBoundary: !1
            })
        }
    }, {
        name: "content",
        aliases: ["text", "ctn", "title", "tt"],
        check({info: r, contentType: o, value: a}) {
            if (!a)
                return !1;
            if (o === "video" || o === "playlist") {
                const c = r;
                if (!c.title)
                    return !1;
                const h = Ae.convertToKeywordArray(a, {
                    modifiers: At
                });
                return !!Ae.match(c.title, c, o, h, {
                    caseSensitive: !1,
                    exactMatch: !1,
                    wordBoundary: !1
                })
            }
            if (o === "comment" || o === "post") {
                const c = r;
                if (!c.content)
                    return !1;
                const h = Ae.convertToKeywordArray(a, {
                    modifiers: At
                });
                return !!Ae.match(c.content, c, o, h, {
                    caseSensitive: !1,
                    exactMatch: !1,
                    wordBoundary: !1
                })
            }
            return !1
        }
    }, {
        name: "video",
        aliases: ["isvideo"],
        check({contentType: r}) {
            return r === "video"
        }
    }, {
        name: "comment",
        aliases: ["iscomment"],
        check({contentType: r}) {
            return r === "comment"
        }
    }, {
        name: "post",
        aliases: ["ispost"],
        check({contentType: r}) {
            return r === "post"
        }
    }, {
        name: "playlist",
        aliases: ["isplaylist"],
        check({contentType: r}) {
            return r === "playlist"
        }
    }, {
        name: "page",
        aliases: ["p"],
        check({info: r, value: o}) {
            if (!o || !r.page)
                return !1;
            const a = o.toLowerCase().split(/[,\s]+/).map(h => h.trim()).filter(Boolean);
            if (a.length === 0)
                return !1;
            const c = h => h === "subs" || h === "sub" || h === "subscription" ? "subscriptions" : h === "play" || h === "list" ? "playlist" : h === "trend" ? "trending" : h === "short" ? "shorts" : h === "ch" || h === "user" || h === "channel" ? "channels" : h;
            for (const h of a)
                if (c(h) === r.page)
                    return !0;
            return !1
        }
    }, {
        name: "restricted",
        aliases: ["age", "age-restricted", "agerestricted"],
        forContentType: ["video"],
        check({info: r}) {
            return r.ageRestricted
        }
    }]
      , xe = {
        contents: [],
        whitelistContents: [],
        titles: [],
        descriptions: [],
        videoChannels: [],
        tags: [],
        videos: [],
        channels: [],
        whitelistChannels: [],
        commentContents: [],
        commentUsers: [],
        comments: [],
        postContents: [],
        postChannels: [],
        posts: [],
        playlistTitles: [],
        playlistChannels: [],
        playlists: [],
        apiIgnoredPages: []
    };
    function cc(r) {
        xe.contents = Ae.convertToKeywordArray(r.blockedContentKeywords, {
            modifiers: At
        }),
        xe.whitelistContents = Ae.convertToKeywordArray(r.whitelistedContentKeywords, {
            modifiers: At
        }),
        xe.titles = Ae.convertToKeywordArray(r.blockedTitles, {
            modifiers: At
        }),
        xe.videoChannels = Ae.convertToKeywordArray(r.blockedVideoChannels, {
            modifiers: At,
            separator: "",
            separateNewLines: !0
        }),
        xe.descriptions = Ae.convertToKeywordArray(r.blockedDescriptions, {
            modifiers: At
        }),
        xe.tags = Ae.convertToKeywordArray(r.blockedTags, {
            modifiers: At
        }),
        xe.videos = Ae.convertToKeywordArray(r.blockedVideos, {
            separator: "",
            separateNewLines: !0,
            disableRegex: !0
        }),
        xe.channels = Ae.convertToKeywordArray(r.blockedChannels, {
            modifiers: At,
            separator: "",
            separateNewLines: !0
        }),
        xe.whitelistChannels = Ae.convertToKeywordArray(r.whitelistChannels, {
            modifiers: At,
            separator: "",
            separateNewLines: !0
        }),
        xe.commentContents = Ae.convertToKeywordArray(r.blockedCommentContents, {
            modifiers: At
        }),
        xe.commentUsers = Ae.convertToKeywordArray(r.blockedCommentUsers, {
            modifiers: At,
            separator: "",
            separateNewLines: !0
        }),
        xe.comments = Ae.convertToKeywordArray(r.blockedComments, {
            separator: "",
            separateNewLines: !0,
            disableRegex: !0
        }),
        xe.postContents = Ae.convertToKeywordArray(r.blockedPostContents, {
            modifiers: At
        }),
        xe.postChannels = Ae.convertToKeywordArray(r.blockedPostChannels, {
            modifiers: At,
            separator: "",
            separateNewLines: !0
        }),
        xe.posts = Ae.convertToKeywordArray(r.blockedPosts, {
            separator: "",
            separateNewLines: !0,
            disableRegex: !0
        }),
        xe.playlistTitles = Ae.convertToKeywordArray(r.blockedPlaylistTitles, {
            modifiers: At
        }),
        xe.playlistChannels = Ae.convertToKeywordArray(r.blockedPlaylistChannels, {
            modifiers: At,
            separator: "",
            separateNewLines: !0
        }),
        xe.playlists = Ae.convertToKeywordArray(r.blockedPlaylists, {
            separator: "",
            separateNewLines: !0,
            disableRegex: !0
        }),
        xe.apiIgnoredPages = Ae.convertToKeywordArray(r.APIBlacklistPages, {
            separator: "",
            separateNewLines: !0
        })
    }
    function be(r, ...o) {
        let a = gt.i18n.getMessage(r);
        return a.includes("{") && (a = a.replace(/\{\s*(\d+)\s*}/g, (c, h) => {
            const y = parseInt(h)
              , b = o[y];
            return b == null ? c : b.toString()
        }
        ),
        a = a.replace(/\{ *\^ *(\d+) *: ?([^;}]+) ?; ?([^;}]+) ?(?:; ?([^;}]+))?\}/g, (c, h, y, b, k) => {
            const _ = parseInt(h)
              , O = o[_];
            if (O == null || typeof O == "string")
                return c;
            const Z = k ? y : void 0
              , ue = k ? b : y
              , pe = k || b;
            let G = "";
            return O === 0 ? G = Z || pe : O === 1 || O === -1 ? G = ue : G = pe,
            G = G.replace(/ $/, ""),
            G
        }
        )),
        a
    }
    function no(r, o) {
        gt.runtime.id && gt.runtime.onMessage.addListener( (a, c, h) => {
            const y = a;
            y.__handled && y.messageId === r && o(y.message, c, h)
        }
        )
    }
    async function Kt(r, o) {
        if (!gt.runtime.id)
            throw new Error("Context Invalidated");
        return gt.runtime.sendMessage({
            __handled: !0,
            messageId: r,
            message: o
        })
    }
    function _i(r=!1) {
        const o = document.createElement("button");
        return o.className = ge.channelBlockButton,
        r && o.setAttribute(Q.biggerChannelBlockButton, "true"),
        o.innerHTML = `
        <i class="fa fa-close"></i>
    `,
        o.title = be("ChannelBlockButtonTooltip", "YTBlock"),
        o
    }
    function ki(r, o, a=!1) {
        r.preventDefault(),
        r.stopPropagation(),
        (a ? confirm(be("ChannelBlockButtonConfirmationPrompt", o.name || o.handle)) : !0) && Kt("blockChannel", o)
    }
    function Mh() {
        document.querySelectorAll(`[${Q.alwaysShowChannelBlockButton}], [${Q.hasChannelBlockButton}]`).forEach(r => {
            r.removeAttribute(Q.alwaysShowChannelBlockButton),
            r.removeAttribute(Q.hasChannelBlockButton)
        }
        ),
        document.querySelectorAll(`.${ge.channelBlockButton}`).forEach(r => {
            r.remove()
        }
        )
    }
    function Oh(r) {
        document.querySelectorAll(`[${Q.hasChannelBlockButton}]`).forEach(o => {
            r ? o.setAttribute(Q.alwaysShowChannelBlockButton, "true") : o.removeAttribute(Q.alwaysShowChannelBlockButton)
        }
        )
    }
    function Rh(r) {
        document.querySelectorAll(`.${ge.channelBlockButton}`).forEach(o => {
            r ? o.setAttribute(Q.biggerChannelBlockButton, "true") : o.removeAttribute(Q.biggerChannelBlockButton)
        }
        )
    }
    const fc = ["ytd-channel-renderer", "ytm-compact-channel-renderer"]
      , dc = new Map;
    function Nh(r) {
        const o = () => {
            document.querySelectorAll(fc.join(", ")).forEach(a => {
                hc(a, r)
            }
            )
        }
        ;
        o(),
        r.onNodeAdded( (a, c) => {
            c && c.matches(fc.join(", ")) && hc(c, r)
        }
        ),
        r.onStorageChange(o),
        r.onPageChange(o),
        r.onIntervalChange(o)
    }
    function hc(r, o) {
        let a = r.getAttribute(Q.elementId) || "";
        a || (a = Ai(),
        r.setAttribute(Q.elementId, a),
        dc.set(a, {
            id: a,
            element: r,
            blocked: !1,
            blockedReason: "",
            blockedId: "",
            info: Jr()
        }));
        const c = dc.get(a)
          , h = $h(r, o);
        c.info = h,
        ( () => {
            if (!o.localExtStorage.addBlockChannelButton || !o.localExtStorage.extensionEnabled)
                return;
            const b = r.querySelector("ytd-channel-name");
            if (!b || b.hasAttribute(Q.hasChannelBlockButton))
                return;
            const k = _i(o.localExtStorage.biggerChannelBlockButton);
            b.insertAdjacentElement("beforeend", k),
            b.setAttribute(Q.hasChannelBlockButton, "true"),
            o.localExtStorage.showBlockChannelButtonOnHover ? b.removeAttribute(Q.alwaysShowChannelBlockButton) : b.setAttribute(Q.alwaysShowChannelBlockButton, "true"),
            k.addEventListener("click", _ => {
                et() || ki(_, c.info, o.localExtStorage.askConfirmationOnChannelBlockButton)
            }
            )
        }
        )();
        const y = qh(h, o.localExtStorage);
        if (!!y !== c.blocked) {
            if (y) {
                c.blocked = !0,
                c.blockedReason = y.reason,
                r.setAttribute(Q.blocked, ""),
                r.classList.add(ge.hide);
                return
            }
            c.blocked = !1,
            c.blockedReason = "",
            r.removeAttribute(Q.blocked),
            r.classList.remove(ge.hide)
        }
    }
    function $h(r, o) {
        var k, _;
        const a = ((_ = (k = r.querySelector("ytd-channel-name yt-formatted-string, .compact-media-item-headline span")) == null ? void 0 : k.textContent) == null ? void 0 : _.trim()) || ""
          , c = ( () => {
            const O = r.querySelector("a#main-link, a.compact-media-item-metadata-content");
            return O && O.href || ""
        }
        )()
          , h = xr(c)
          , y = Xr(c)
          , b = ( () => {
            const O = r.querySelector("ytd-channel-name ytd-badge-supported-renderer");
            return !(!O || O.hasAttribute("hidden"))
        }
        )();
        return {
            name: a,
            handle: y,
            url: c,
            id: h,
            verified: b,
            page: o == null ? void 0 : o.activePageId
        }
    }
    function qh(r, o) {
        if (!o.extensionEnabled)
            return;
        const a = ro(r);
        if (Ae.match(a, r, "channel", xe.whitelistChannels, {
            caseSensitive: o.whitelistChannelsCaseSensitive,
            exactMatch: o.whitelistChannelsExactMatch
        }))
            return;
        const h = Ae.match(a, r, "channel", xe.videoChannels, {
            caseSensitive: o.blockedVideoChannelsCaseSensitive,
            exactMatch: o.blockedVideoChannelsExactMatch
        });
        if (h)
            return {
                optionId: "block_video_channels",
                reason: be("BlockReasonVideoChannel") + " " + r.name + (h !== r.name ? ` (${h})` : ""),
                channel: a.some(b => b.toLowerCase() === h.toLowerCase()) ? r : void 0
            };
        const y = Ae.match(a, r, "channel", xe.channels, {
            caseSensitive: o.blockedChannelsCaseSensitive,
            exactMatch: o.blockedChannelsExactMatch
        });
        if (y)
            return {
                optionId: "block_channels",
                reason: be("BlockReasonChannel") + " " + r.name + (y !== r.name ? ` (${y})` : ""),
                channel: a.some(b => b.toLowerCase() === y.toLowerCase()) ? r : void 0
            }
    }
    function ro(r) {
        return [r.name, r.handle, r.url, r.id].filter(o => !!o)
    }
    function Xr(r) {
        if (!r)
            return "";
        r = decodeURI(r);
        const o = r.match(/https?:\/\/(?:(?:www|m)\.)?youtube\.com\/(@[^?/]+)\/?/);
        return o ? o[1] : ""
    }
    function xr(r) {
        if (!r)
            return "";
        r = decodeURI(r);
        const o = r.match(/^https?:\/\/(?:(?:www|m)\.)?youtube\.com\/(?:channel|c)?\/(.+)(\/|\?.*|$)/);
        return !o || !o[1] || o[1].startsWith("@") ? "" : o[1]
    }
    function Dh(r) {
        if (!r)
            return "";
        r = decodeURI(r);
        const o = r.match(/^https?:\/\/(?:(?:www|m)\.)?youtube\.com\/(?:channel|c)?\/(.+)(\/|\?.*|$)/) || r.match(/^https?:\/\/(?:(?:www|m)\.)?youtube\.com\/user\/(.+)(\/|\?.*|$)/) || r.match(/^https?:\/\/(?:(?:www|m)\.)?youtube\.com\/(@[^\s/?]+)(\/|\?.*|$)/);
        return o ? o[1] : ""
    }
    function Hh(r, o) {
        return o ? o.split(`
`).some(a => {
            const c = a.toLowerCase()
              , {name: h, handle: y, url: b, id: k} = r;
            switch (!0) {
            case (h && c === h.toLowerCase()):
            case (y && c === y.toLowerCase()):
            case (y && c === y.toLowerCase()):
            case (b && a === b):
            case (a.trim() && b && (b.startsWith(a) || a.startsWith(b))):
            case (k && c === k.toLowerCase()):
                return !0;
            default:
                return !1
            }
        }
        ) : !1
    }
    function Fh() {
        return {
            id: "",
            url: "",
            content: "",
            channel: Jr(),
            page: void 0
        }
    }
    const pc = ["ytd-post-renderer", "ytd-backstage-post-thread-renderer"]
      , wn = "post";
    function Wh(r) {
        const o = () => {
            document.querySelectorAll(pc.join(", ")).forEach(a => {
                su(a, r)
            }
            )
        }
        ;
        o(),
        r.onNodeAdded( (a, c) => {
            c && pc.some(h => c.matches(h)) && su(c, r)
        }
        ),
        r.onNodeChange( (a, c, h) => {
            if (!h || c.attributeName !== "href" || !h.parentElement || !h.parentElement.matches(".published-time-text, #published-time-text"))
                return;
            const b = Pn(a).parents(`[${Q.elementId}][${Q.contentType}="${wn}"]`)[0];
            b && su(b, r)
        }
        ),
        r.onStorageChange(a => {
            o()
        }
        ),
        r.onPageChange(a => {
            o()
        }
        ),
        r.onIntervalChange( () => {
            o()
        }
        )
    }
    function su(r, o) {
        let a = r.getAttribute(Q.elementId) || "";
        a || (a = Ai(),
        r.setAttribute(Q.elementId, a),
        r.setAttribute(Q.contentType, wn),
        o.posts.elements.set(a, {
            id: a,
            element: r,
            blocked: !1,
            blockedReason: "",
            blockedId: "",
            overlay: null,
            revealButton: null,
            info: Fh()
        }));
        const c = o.posts.elements.get(a);
        c.info = Uh(r, o),
        c.info.id && o.posts.byId.set(c.info.id, c.info);
        const h = Vh(c.info, o.localExtStorage)
          , y = c.overlay
          , b = c.revealButton
          , k = ( () => {
            var _;
            return !r.matches("ytd-post-renderer") || !r.parentElement || !r.parentElement.matches("#content") || !((_ = r.parentElement.parentElement) != null && _.matches("ytd-rich-item-renderer")) ? r : r.parentElement.parentElement
        }
        )();
        if (h) {
            r.setAttribute(Q.blocked, ""),
            c.blocked = !0;
            const _ = h.reason !== c.blockedReason;
            c.blockedReason = h.reason;
            const O = c.blockedId !== c.info.id;
            if (c.blockedId = c.info.id,
            o.addToBlockList(c.info.id, c.info, wn),
            o.localExtStorage.showOverlays && o.localExtStorage.showOverlaysForPosts)
                if (k.classList.remove(ge.hide),
                r.classList.remove(ge.hide),
                y)
                    jn(y, h, o),
                    y.getAttribute(Q.overlayHidden) === "true" && (_ || O) && b.click();
                else {
                    const Z = so(r, h, o, "grid");
                    c.overlay = Z.overlay,
                    c.revealButton = Z.revealButton
                }
            else
                k.classList.add(ge.hide),
                r.classList.add(ge.hide)
        } else
            c.blocked && (r.removeAttribute(Q.blocked),
            c.blocked = !1,
            c.blockedReason = "",
            c.blockedId = "",
            c.overlay = null,
            c.revealButton = null,
            o.removeFromBlockList(c.info.id, wn),
            k.classList.remove(ge.hide),
            r.classList.remove(ge.hide),
            y == null || y.remove(),
            b == null || b.remove())
    }
    function Uh(r, o) {
        var pe, G;
        const a = r.querySelector("#post-text #home-content-text, #content #content-text")
          , c = r.querySelector("#author a, #header-author a")
          , h = r.querySelector("#published-time-text a")
          , y = (h == null ? void 0 : h.href) || ""
          , b = au(y)
          , k = ((pe = a == null ? void 0 : a.textContent) == null ? void 0 : pe.trim()) || ""
          , _ = ((G = c == null ? void 0 : c.textContent) == null ? void 0 : G.replace(/[\r\n]/g, " ").trim()) || ""
          , O = (c == null ? void 0 : c.href) || ""
          , Z = Xr(O) || ""
          , ue = xr(O);
        return {
            id: b,
            url: y,
            content: k,
            channel: {
                name: _,
                handle: Z,
                url: O,
                id: ue,
                verified: !1
            },
            page: o == null ? void 0 : o.activePageId
        }
    }
    function Vh(r, o) {
        if (!o.extensionEnabled)
            return;
        let a = "";
        const c = ro(r.channel);
        if (a = Ae.match(c, r, wn, xe.whitelistChannels, {
            caseSensitive: o.whitelistChannelsCaseSensitive,
            exactMatch: o.whitelistChannelsExactMatch
        }),
        !a && !(r.content && (a = Ae.match(r.content, r, wn, xe.whitelistContents, {
            caseSensitive: o.whitelistedContentKeywordCaseSensitive,
            wordBoundary: o.whitelistedContentKeywordWordBound
        }),
        a))) {
            if (a = Ae.match(c, r, wn, xe.postChannels, {
                caseSensitive: o.blockedPostChannelsCaseSensitive,
                exactMatch: o.blockedPostChannelsExactMatch
            }),
            a)
                return {
                    optionId: "block_post_channels",
                    reason: `${be("BlockReasonPostChannel")} ` + a,
                    channel: c.some(h => h.toLowerCase() === a.toLowerCase()) ? r.channel : void 0
                };
            if (a = Ae.match(c, r, wn, xe.channels, {
                caseSensitive: o.blockedChannelsCaseSensitive,
                exactMatch: o.blockedChannelsExactMatch
            }),
            a)
                return {
                    optionId: "block_channels",
                    reason: `${be("BlockReasonChannel")} ` + r.channel.name + (a !== r.channel.name ? ` (${a})` : ""),
                    channel: c.some(h => h.toLowerCase() === a.toLowerCase()) ? r.channel : void 0
                };
            if (r.id && (a = Ae.match(r.id, r, wn, xe.posts, {
                customMatch: (h, y) => (au(y.str || "") || y.str) === r.id ? y.str : ""
            })),
            a)
                return {
                    optionId: "block_posts",
                    reason: `${be("BlockReasonSpecificPost")} ` + r.id + (r.id !== a ? ` (${a})` : ""),
                    content: {
                        id: r.id,
                        type: wn
                    }
                };
            if (r.content && (a = Ae.match(r.content, r, wn, xe.postContents, {
                caseSensitive: o.blockedPostContentsCaseSensitive,
                wordBoundary: o.blockedPostContentsWordBound
            })),
            a)
                return {
                    optionId: "block_post_contents",
                    reason: `${be("BlockReasonPostContent")} ` + a
                };
            if (r.content && (a = Ae.match(r.content, r, wn, xe.contents, {
                caseSensitive: o.blockedContentKeywordCaseSensitive,
                wordBoundary: o.blockedContentKeywordWordBound
            })),
            a)
                return {
                    optionId: "block_content",
                    reason: `${be("BlockReasonPostContent")} ` + a
                }
        }
    }
    function au(r) {
        if (!r)
            return "";
        r = decodeURI(r);
        const o = r.match(/https?:\/\/(?:(?:www|m)\.)?youtube\.com\/post\/([A-Za-z0-9_-]+)(\?|$)/);
        return o ? o[1] : ""
    }
    const Un = "playlist"
      , Ei = "yt-lockup-view-model"
      , gc = ["ytd-rich-grid-media", "ytd-grid-playlist-renderer", "ytd-grid-radio-renderer", "ytd-radio-renderer", "ytd-playlist-renderer", "ytd-compact-playlist-renderer", "ytd-compact-radio-renderer"]
      , yc = "badge-shape-wiz__icon"
      , jh = "badge-shape-wiz__text"
      , Kh = "m5 4 3 2-3 2V4Z";
    function zh(r) {
        const o = () => {
            document.querySelectorAll([...gc, Ei].join(", ")).forEach(a => {
                xi(a, r)
            }
            )
        }
        ;
        o(),
        r.onNodeAdded( (a, c) => {
            if (c) {
                if (gc.some(h => c.matches(h))) {
                    xi(c, r);
                    return
                }
                if (Qh(c)) {
                    xi(c, r);
                    return
                }
                if (Jh(c)) {
                    xi(c, r);
                    return
                }
            }
        }
        ),
        r.onNodeChange( (a, c, h) => {
            if (!h)
                return;
            if (h.matches("yt-lockup-view-model") && c.type === "childList" && c.addedNodes.length > 0 && c.addedNodes[0]instanceof HTMLElement && c.addedNodes[0].matches(".yt-lockup-view-model-wiz")) {
                xi(h, r);
                return
            }
            if (!( () => {
                var _;
                return !!(c.attributeName === "href" && h.matches("a#video-title-link, a#video-title, a#title, a.yt-lockup-metadata-view-model__title") || c.attributeName === "hidden" && h.matches("ytd-playlist-thumbnail") || c.attributeName === "class" && h.matches(".yt-icon-shape") && ((_ = h.parentElement) != null && _.classList.contains(yc)))
            }
            )())
                return;
            const k = Pn(h).parents(`[${Q.elementId}][${Q.contentType}="${Un}"]`)[0];
            k && xi(k, r)
        }
        ),
        r.onStorageChange(o),
        r.onPageChange(o),
        r.onIntervalChange(o)
    }
    function xi(r, o) {
        var pe, G;
        let a = r.getAttribute(Q.elementId) || "";
        const c = r.matches("ytd-rich-grid-media") && !!r.querySelector("ytd-playlist-thumbnail[hidden]");
        if (c) {
            if (r.getAttribute(Q.contentType) === "playlist" && (r.removeAttribute(Q.elementId),
            r.removeAttribute(Q.contentType),
            a)) {
                const W = o.playlists.elements.get(a);
                (pe = W == null ? void 0 : W.overlay) == null || pe.remove(),
                (G = W == null ? void 0 : W.revealButton) == null || G.remove(),
                o.playlists.elements.delete(a)
            }
            return
        }
        if (!a) {
            if (c)
                return;
            a = Ai(),
            r.setAttribute(Q.elementId, a),
            r.setAttribute(Q.contentType, Un),
            o.playlists.elements.set(a, {
                id: a,
                element: r,
                blocked: !1,
                blockedReason: "",
                blockedId: "",
                overlay: null,
                revealButton: null,
                info: Xh()
            })
        }
        const h = o.playlists.elements.get(a);
        if (!h)
            return;
        const y = Yh(r, o);
        h.info = y;
        const b = Gh(y, o.localExtStorage);
        if (!(!!b != !!h.blockedReason || (b == null ? void 0 : b.reason) !== h.blockedReason || y.id !== h.blockedId || r.classList.contains(ge.hide) === (o.localExtStorage.showOverlays && o.localExtStorage.showOverlaysForPlaylists)))
            return;
        const _ = h.overlay
          , O = h.revealButton;
        if (!b) {
            r.removeAttribute(Q.blocked),
            h.blocked = !1,
            h.blockedReason = "",
            h.blockedId = "",
            h.overlay = null,
            h.revealButton = null,
            o.removeFromBlockList(h.info.id, "playlist"),
            r.classList.remove(ge.hide),
            _ == null || _.remove(),
            O == null || O.remove();
            return
        }
        r.setAttribute(Q.blocked, ""),
        h.blocked = !0;
        const Z = b.reason !== h.blockedReason;
        h.blockedReason = b.reason;
        const ue = h.blockedId !== h.info.id;
        if (h.blockedId = h.info.id,
        o.addToBlockList(h.info.id, h.info, "playlist"),
        o.localExtStorage.showOverlays && o.localExtStorage.showOverlaysForPlaylists)
            if (r.classList.remove(ge.hide),
            mc(r, !1),
            _)
                jn(_, b, o),
                _.getAttribute(Q.overlayHidden) === "true" && (Z || ue) && O.click();
            else {
                const W = so(r, b, o, lu(r));
                h.overlay = W.overlay,
                h.revealButton = W.revealButton
            }
        else
            r.classList.add(ge.hide),
            mc(r, !0)
    }
    function Gh(r, o) {
        if (!o.extensionEnabled)
            return;
        if (o.blockMIX && r.mix)
            return {
                reason: be("PlaylistBlockReasonMix"),
                optionId: "block_mix"
            };
        const a = ro(r.channel);
        if (Ae.match(a, r, Un, xe.whitelistChannels, {
            caseSensitive: o.whitelistChannelsCaseSensitive,
            exactMatch: o.whitelistChannelsExactMatch
        }) || r.title && Ae.match(r.title, r, Un, xe.whitelistContents, {
            caseSensitive: o.whitelistedContentKeywordCaseSensitive,
            wordBoundary: o.whitelistedContentKeywordWordBound
        }))
            return;
        const h = Ae.match(a, r, Un, xe.playlistChannels, {
            caseSensitive: o.blockedPlaylistChannelsCaseSensitive,
            exactMatch: o.blockedPlaylistChannelsExactMatch
        });
        if (h)
            return {
                optionId: "block_playlist_channels",
                reason: be("PlaylistBlockReasonChannel") + " " + r.channel.name + (h !== r.channel.name ? ` (${h})` : ""),
                channel: a.some(b => b.toLowerCase() === h.toLowerCase()) ? r.channel : void 0
            };
        const y = Ae.match(a, r, Un, xe.channels, {
            caseSensitive: o.blockedChannelsCaseSensitive,
            exactMatch: o.blockedChannelsExactMatch
        });
        if (y)
            return {
                optionId: "block_channels",
                reason: be("BlockReasonChannel") + " " + r.channel.name + (y !== r.channel.name ? ` (${y})` : ""),
                channel: a.some(b => b.toLowerCase() === y.toLowerCase()) ? r.channel : void 0
            };
        if (r.id) {
            const b = Ae.match(r.id, r, Un, xe.playlists, {
                customMatch: (k, _) => {
                    const O = _.str ? Zr(_.str) || _.str : "";
                    return r.id === O ? _.str : ""
                }
            });
            if (b)
                return {
                    optionId: "block_playlists",
                    reason: be("PlaylistBlockReasonSpecific") + " " + r.id + (r.id !== b ? ` (${b})` : ""),
                    content: {
                        id: r.id,
                        type: Un
                    }
                }
        }
        if (r.title) {
            const b = Ae.match(r.title, r, Un, xe.playlistTitles, {
                caseSensitive: o.blockedPlaylistTitlesCaseSensitive,
                wordBoundary: o.blockedPlaylistTitlesWordBound
            });
            if (b)
                return {
                    optionId: "block_playlist_titles",
                    reason: `${be("BlockReasonTitle")} ` + b
                }
        }
        if (r.title) {
            const b = Ae.match(r.title, r, Un, xe.contents, {
                caseSensitive: o.blockedContentKeywordCaseSensitive,
                wordBoundary: o.blockedContentKeywordWordBound
            });
            if (b)
                return {
                    optionId: "block_content",
                    reason: `${be("ContentBlockReason")} ` + b
                }
        }
    }
    function Yh(r, o) {
        var ue;
        const a = !!document.querySelector(`ytd-browse[page-subtype="channels"][role="main"] [${Q.elementId}="${r.getAttribute(Q.elementId)}"]`)
          , c = r.querySelector("a#video-title-link") || r.querySelector("a.yt-simple-endpoint") || r.querySelector(".yt-lockup-view-model-wiz a") || [...r.querySelectorAll("a")].find(pe => Zr(pe.href)) || null
          , h = (c == null ? void 0 : c.href) || ""
          , y = Zr(h)
          , b = h.includes("&start_radio")
          , k = b ? "" : Zh(y)
          , _ = r.querySelector("#video-title-link yt-formatted-string, #video-title, .yt-lockup-metadata-view-model-wiz__title, a.yt-lockup-metadata-view-model__title")
          , O = ((ue = _ == null ? void 0 : _.textContent) == null ? void 0 : ue.replace(/  /g, " ").trim()) || ""
          , Z = Jr();
        if (!b) {
            const pe = r.querySelector("ytd-channel-name a") || r.querySelector("yt-content-metadata-view-model a") || null
              , G = ( () => {
                let D = !!r.querySelector("ytd-channel-name ytd-badge-supported-renderer:not([hidden])");
                return !D && a && (D = !!document.querySelector("#channel-header-container ytd-badge-supported-renderer:not([hidden])")),
                D
            }
            )()
              , W = ( () => {
                let D = ((pe == null ? void 0 : pe.href) ?? "") || "";
                return !D && a && (D = location.href.replace(/(\/@[^?/]+|\/(channel|c)\/.+)\/.+/, "$1")),
                D || ""
            }
            )();
            Z.name = ( () => {
                var J, Oe, Te;
                const D = pe || r.querySelector("ytd-channel-name span.yt-formatted-string");
                let he = ((J = D == null ? void 0 : D.textContent) == null ? void 0 : J.trim()) || "";
                return !he && a && (he = ((Te = (Oe = document.querySelector("#channel-header-container ytd-channel-name yt-formatted-string")) == null ? void 0 : Oe.textContent) == null ? void 0 : Te.trim()) || ""),
                he
            }
            )().replace(/[\r\n]/g, " ").trim(),
            Z.url = W,
            Z.handle = ( () => {
                var he, J;
                let D = Xr(W);
                return !D && a && (D = ((J = (he = document.querySelector("#channel-header-container #channel-handle")) == null ? void 0 : he.textContent) == null ? void 0 : J.trim()) || ""),
                D
            }
            )(),
            Z.id = xr(W),
            Z.verified = G
        }
        return {
            id: y,
            title: O,
            mix: b,
            url: k,
            channel: Z,
            page: o == null ? void 0 : o.activePageId
        }
    }
    function Xh() {
        return {
            channel: Jr(),
            id: "",
            mix: !1,
            title: "",
            url: "",
            page: void 0
        }
    }
    function Zr(r) {
        if (!r)
            return "";
        const o = r.match(/(?:\?|&)list=([A-Za-z0-9_-]+)(?:&|$)/);
        return o ? o[1] : ""
    }
    function Zh(r, o=!1) {
        return r ? o ? `https://youtube.com/playlist?list=${r}` : `https://www.youtube.com/playlist?list=${r}` : ""
    }
    function Qh(r) {
        if (r.tagName.toLowerCase() !== Ei)
            return !1;
        if (r.querySelector("yt-collection-thumbnail-view-model"))
            return !0;
        const o = r.querySelector(`yt-thumbnail-overlay-badge-view-model .${jh} svg path`);
        if (o && o.textContent === "Mix")
            return !0;
        const a = r.querySelector(`yt-thumbnail-overlay-badge-view-model .${yc} svg path`);
        return !!(a && a.getAttribute("d") === Kh)
    }
    function Jh(r) {
        return r.tagName.toLowerCase() === Ei && [...r.querySelectorAll("yt-content-metadata-view-model a")].some(o => Zr(o.href))
    }
    function mc(r, o) {
        var a;
        r.tagName.toLowerCase() === Ei && ((a = r.parentElement) == null ? void 0 : a.id) === "content" && ar(r.parentElement.parentElement, o)
    }
    function et() {
        var r;
        return !((r = gt == null ? void 0 : gt.runtime) != null && r.id)
    }
    function ep(r, o) {
        const a = [Cn, uu, au, Zr]
          , c = [o.blockedVideos, o.blockedComments, o.blockedPosts, o.blockedPlaylists];
        for (let h = 0; h < c.length; h++) {
            const y = c[h]
              , b = a[h];
            if (y.split(`
`).some(_ => (_ = _.trim(),
            _ === r || b(_) === r)))
                return !0
        }
        return !1
    }
    function ar(r, o) {
        r && (o ? r.classList.add(ge.hide) : r.classList.remove(ge.hide))
    }
    function tp() {
        return {
            id: "",
            url: "",
            content: "",
            hearted: !1,
            madeByCreator: !1,
            respondedByCreator: !1,
            channel: Jr(),
            page: void 0
        }
    }
    const vs = ["ytd-comment-renderer", "ytd-comment-view-model"]
      , vc = "ytb-comment-content-span"
      , Vn = "comment";
    function np(r) {
        const o = () => {
            document.querySelectorAll(vs.join(", ")).forEach(a => {
                bs(a, r)
            }
            )
        }
        ;
        o(),
        r.onNodeAdded( (a, c) => {
            c && (vs.some(h => c.matches(h)) && bs(c, r),
            c.id === "comment-container" && c.querySelectorAll(vs.join(", ")).forEach(h => {
                bs(h, r)
            }
            ))
        }
        ),
        r.onNodeChange( (a, c, h) => {
            if (!h || !(h.hasAttribute(vc) && c.type === "childList" || h.matches("ytd-creator-heart-renderer, #author-comment-badge") || h.matches(".ytCoreImageHost.yt-core-attributed-string__image-element") || Array.from(c.removedNodes).some(_ => _ instanceof HTMLElement ? _.matches("ytd-creator-heart-renderer, yt-icon.ytd-author-comment-badge-renderer") : !1) ? !0 : c.attributeName !== "href" ? !1 : h.matches("a.ytd-comment-view-model") ? !0 : !(!h.parentElement || !h.parentElement.matches(".published-time-text"))))
                return;
            const k = Pn(a).parents(`[${Q.elementId}][${Q.contentType}="${Vn}"]`)[0];
            k && bs(k, r)
        }
        ),
        r.onStorageChange(o),
        r.onPageChange(o),
        r.onIntervalChange(o)
    }
    function bs(r, o) {
        let a = r.getAttribute(Q.elementId) || "";
        a || (a = Ai(),
        r.setAttribute(Q.elementId, a),
        r.setAttribute(Q.contentType, Vn),
        o.comments.elements.set(a, {
            id: a,
            element: r,
            blocked: !1,
            blockedReason: "",
            blockedId: "",
            overlay: null,
            revealButton: null,
            info: tp()
        }));
        const c = o.comments.elements.get(a);
        c.info = rp(r, o),
        ( () => {
            if (!o.localExtStorage.addBlockChannelButton || !o.localExtStorage.extensionEnabled)
                return;
            const _ = r.hasAttribute("has-author-badge") ? r.querySelector("#author-comment-badge") : r.querySelector("#header-author a#author-text");
            if (!_ || _.hasAttribute(Q.hasChannelBlockButton) && _.querySelector(`.${ge.channelBlockButton}`))
                return;
            const O = _i(o.localExtStorage.biggerChannelBlockButton);
            _.insertAdjacentElement("beforeend", O),
            _.setAttribute(Q.hasChannelBlockButton, "true"),
            o.localExtStorage.showBlockChannelButtonOnHover ? _.removeAttribute(Q.alwaysShowChannelBlockButton) : _.setAttribute(Q.alwaysShowChannelBlockButton, "true"),
            O.addEventListener("click", Z => {
                et() || ki(Z, c.info.channel, o.localExtStorage.askConfirmationOnChannelBlockButton)
            }
            )
        }
        )(),
        c.info.id && o.comments.byId.set(c.info.id, c.info);
        const h = ws(r)
          , y = ip(c.info, o.localExtStorage)
          , b = c.overlay
          , k = c.revealButton;
        if (y) {
            r.setAttribute(Q.blocked, ""),
            c.blocked = !0;
            const _ = y.reason !== c.blockedReason;
            c.blockedReason = y.reason;
            const O = c.blockedId !== c.info.id;
            if (c.blockedId = c.info.id,
            o.addToBlockList(c.info.id, c.info, "comment"),
            o.localExtStorage.showOverlays && o.localExtStorage.showOverlaysForComments)
                if (r.classList.remove(ge.hide),
                b)
                    jn(b, y, o),
                    b.getAttribute(Q.overlayHidden) === "true" && (_ || O) && k.click();
                else {
                    const Z = so(r, y, o, "horizontal");
                    c.overlay = Z.overlay,
                    c.revealButton = Z.revealButton,
                    h && io(r, !1)
                }
            else
                r.classList.add(ge.hide),
                h && io(r, !1)
        } else
            c.blocked && (r.removeAttribute(Q.blocked),
            c.blocked = !1,
            c.blockedReason = "",
            c.blockedId = "",
            c.overlay = null,
            c.revealButton = null,
            o.removeFromBlockList(c.info.id, "comment"),
            h && io(r, !0),
            r.classList.remove(ge.hide),
            b == null || b.remove(),
            k == null || k.remove())
    }
    function rp(r, o) {
        const a = r.querySelector("#body #content #content-text")
          , c = r.querySelector("#header-author a#author-text")
          , h = r.querySelector("#published-time-text a");
        a && a.querySelectorAll("span").forEach(Oe => {
            Oe.setAttribute(vc, "")
        }
        );
        const y = uu((h == null ? void 0 : h.href) || "")
          , b = decodeURI((h == null ? void 0 : h.href) || "")
          , k = ( () => {
            var Oe;
            if (!a)
                return "";
            if (!a.querySelector(".small-emoji, .ytCoreImageHost"))
                return ((Oe = a.textContent) == null ? void 0 : Oe.trim()) || "";
            const J = Te => {
                let Re = "";
                return Te.childNodes.forEach(Ie => {
                    if (Ie.nodeType === Node.TEXT_NODE)
                        Re += Ie.textContent;
                    else if (Ie.nodeType === Node.ELEMENT_NODE) {
                        const me = Ie;
                        me.tagName.toLowerCase() === "img" && me.hasAttribute("alt") ? Re += me.getAttribute("alt") : Re += J(me)
                    }
                }
                ),
                Re
            }
            ;
            return J(a)
        }
        )()
          , _ = !!r.querySelector("ytd-author-comment-badge-renderer[creator]")
          , O = ( () => {
            if (!ws(r))
                return !1;
            const J = r.parentElement;
            return Array.from(J.querySelectorAll("ytd-comment-replies-renderer #creator-thumbnail")).some(Te => Te.style.display !== "none")
        }
        )()
          , Z = !!r.querySelector("ytd-creator-heart-renderer")
          , ue = r.querySelector("ytd-author-comment-badge-renderer > yt-icon")
          , pe = !!(ue && !ue.hasAttribute("hidden"))
          , G = ( () => {
            var Oe;
            const J = ((Oe = c == null ? void 0 : c.textContent) == null ? void 0 : Oe.replace(/[\r\n]/g, " ").trim()) || "";
            return J.startsWith("@") ? "" : J
        }
        )()
          , W = (c == null ? void 0 : c.href) || ""
          , D = ( () => {
            var Oe;
            const J = ((Oe = c == null ? void 0 : c.textContent) == null ? void 0 : Oe.trim()) || "";
            return J.startsWith("@") ? J : Xr(W)
        }
        )()
          , he = xr(W);
        return {
            id: y,
            content: k,
            url: b,
            madeByCreator: _,
            respondedByCreator: O,
            hearted: Z,
            channel: {
                name: G,
                url: W,
                handle: D,
                id: he,
                verified: pe
            },
            page: o == null ? void 0 : o.activePageId
        }
    }
    function ip(r, o) {
        if (!o.extensionEnabled)
            return;
        let a = "";
        const c = ro(r.channel);
        if (a = Ae.match(c, r, Vn, xe.whitelistChannels, {
            caseSensitive: o.whitelistChannelsCaseSensitive,
            exactMatch: o.whitelistChannelsExactMatch
        }),
        !a && !(r.content && (a = Ae.match(r.content, r, Vn, xe.whitelistContents, {
            caseSensitive: o.whitelistedContentKeywordCaseSensitive,
            wordBoundary: o.whitelistedContentKeywordWordBound
        }),
        a))) {
            if (a = Ae.match(c, r, Vn, xe.commentUsers, {
                caseSensitive: o.blockedCommentUsersCaseSensitive,
                exactMatch: o.blockedCommentUsersExactMatch
            }),
            a)
                return {
                    optionId: "block_comments_users",
                    reason: `${be("BlockReasonCommentUser")}  ` + r.channel.handle + (a !== r.channel.handle ? ` (${a})` : ""),
                    channel: c.some(h => h.toLowerCase() === a.toLowerCase()) ? r.channel : void 0
                };
            if (a = Ae.match(c, r, Vn, xe.channels, {
                caseSensitive: o.blockedChannelsCaseSensitive,
                exactMatch: o.blockedChannelsExactMatch
            }),
            a)
                return {
                    optionId: "block_channels",
                    reason: `${be("BlockReasonChannel")} ` + r.channel.handle + (a !== r.channel.handle ? ` (${a})` : ""),
                    channel: c.some(h => h.toLowerCase() === a.toLowerCase()) ? r.channel : void 0
                };
            if (r.id && (a = Ae.match(r.id, r, Vn, xe.comments, {
                customMatch: (h, y) => {
                    const b = uu(y.str || "") || y.str;
                    return r.id === b ? y.str : ""
                }
            })),
            a)
                return {
                    optionId: "block_comments",
                    reason: `${be("BlockReasonSpecificComment")} ` + r.id + (r.id !== a ? ` (${a})` : ""),
                    content: {
                        id: r.id,
                        type: Vn
                    }
                };
            if (r.content && (a = Ae.match(r.content, r, Vn, xe.commentContents, {
                caseSensitive: o.blockedCommentContentsCaseSensitive,
                wordBoundary: o.blockedCommentContentsWordBound
            })),
            a)
                return {
                    optionId: "block_comment_contents",
                    reason: `${be("BlockReasonCommentContent")} ` + a
                };
            if (r.content && (a = Ae.match(r.content, r, Vn, xe.contents, {
                caseSensitive: o.blockedContentKeywordCaseSensitive,
                wordBoundary: o.blockedContentKeywordWordBound
            })),
            a)
                return {
                    optionId: "block_content",
                    reason: `${be("BlockReasonCommentContent")} ` + a
                }
        }
    }
    function ws(r) {
        return !r.matches(vs.join(", ")) || !r.parentElement ? !1 : r.parentElement.id === "comment-container" || r.parentElement.tagName.toLowerCase() === "ytd-comment-thread-renderer"
    }
    function io(r, o) {
        var c, h, y;
        const a = ((c = r.parentElement) == null ? void 0 : c.id) === "comment-container" ? r.parentElement.parentElement : r.parentElement;
        o ? (h = a == null ? void 0 : a.querySelector("#replies")) == null || h.classList.remove(ge.hide) : (y = a == null ? void 0 : a.querySelector("#replies")) == null || y.classList.add(ge.hide)
    }
    function uu(r) {
        if (!r)
            return "";
        r = decodeURI(r);
        const o = r.match(/https?:\/\/(?:(?:www|m)\.)?youtube\.com\/post\/.*?lc=([A-Za-z0-9-_.]+)(&|$)/) || r.match(/https?:\/\/(?:(?:www|m)\.)?youtube\.com\/watch\?.*&lc=([A-Za-z0-9-_.]+)(&|$)/) || r.match(/https?:\/\/(?:(?:www|m)\.)?youtube\.com\/channel\/.+\/community\?lc=([A-Za-z0-9-_.]+)(&|$)/);
        return o ? o[1] : ""
    }
    const Cs = "data:image/svg+xml,%3csvg%20viewBox='145%20145%20210%20210'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%3e%3crect%20x='145'%20y='145'%20width='210'%20height='210'%20style='paint-order:%20fill;%20fill-rule:%20nonzero;%20fill:%20rgb(237,%2028,%2036);%20pointer-events:%20none;'%20rx='50.525'%20ry='50.525'/%3e%3cpath%20d='M%20329.536%20250%20C%20329.537%20293.927%20293.927%20329.537%20250%20329.537%20C%20206.073%20329.537%20170.463%20293.927%20170.463%20250%20C%20170.463%20206.073%20206.073%20170.463%20250%20170.463%20C%20293.927%20170.463%20329.536%20206.073%20329.536%20250%20Z%20M%20250%20186.099%20C%20214.708%20186.099%20186.099%20214.707%20186.099%20250.001%20C%20186.099%20264.735%20191.086%20278.305%20199.464%20289.114%20L%20289.114%20199.464%20C%20278.305%20191.087%20264.735%20186.099%20250%20186.099%20Z%20M%20250%20313.901%20C%20285.292%20313.9%20313.901%20285.292%20313.901%20250%20C%20313.901%20235.265%20308.914%20221.695%20300.536%20210.886%20L%20210.886%20300.536%20C%20221.695%20308.914%20235.265%20313.901%20250%20313.901%20Z'%20style='fill:%20rgb(255,%20255,%20255);'/%3e%3c/g%3e%3c/svg%3e"
      , bc = new Map
      , wc = new Map
      , oo = new Map;
    function so(r, o, a, c="grid") {
        const h = document.createElement("div");
        h.setAttribute("type", c),
        h.setAttribute(Q.overlayHidden, "false"),
        h.classList.add(ge.overlay);
        const y = be("ExtFullName")
          , b = be("Blocked").toUpperCase()
          , k = o.channel ? be("UnblockChannel") : be("Unblock")
          , _ = be("Options");
        c === "grid" ? h.innerHTML = `
			<img src="${Cs}" alt="${y}">
			<h2>${b}</h2>
			<div id="reason">${o.reason}</div>
			<div id="buttons">
				<a id="unblock" tabindex="0">${k}</a>
				<a id="options" tabindex="0">${_}</a>
			</div>
		` : h.innerHTML = `
			<img src="${Cs}" alt="${y}">
			<div class="details">
				<h2>${b}</h2>
				<div id="reason">${o.reason}</div>
				<div id="buttons">
					<a id="unblock" tabindex="0">${k}</a>
					<a id="options" tabindex="0">${_}</a>
				</div>
			</div>
		`;
        const O = document.createElement("button");
        O.classList.add(ge.revealButton),
        O.setAttribute("type", c),
        O.setAttribute("active", "false"),
        O.innerHTML = `
		<span class="fa fa-eye"></span>
	`;
        let Z = !1;
        return O.addEventListener("click", ue => {
            et() || (Z = !Z,
            O.setAttribute("active", Z.toString()),
            Z ? (h.setAttribute(Q.overlayHidden, "true"),
            O.querySelector(".fa").classList.replace("fa-eye", "fa-eye-slash"),
            ws(r) && io(r, !0)) : (h.setAttribute(Q.overlayHidden, "false"),
            O.querySelector(".fa").classList.replace("fa-eye-slash", "fa-eye"),
            ws(r) && io(r, !1)))
        }
        ),
        jn(h, o, a, O),
        r.insertAdjacentElement("afterbegin", O),
        r.insertAdjacentElement("afterbegin", h),
        oo.set(h, {
            overlayElement: h,
            blockInfo: o,
            overlayType: c,
            revealButton: O
        }),
        {
            overlay: h,
            revealButton: O
        }
    }
    function Cc(r, o, a) {
        const c = "watch"
          , h = document.createElement("div");
        h.setAttribute("type", c),
        h.setAttribute(Q.overlayHidden, "false"),
        h.classList.add(ge.overlay);
        const y = gt.runtime.getURL("/icon/128.png")
          , b = be("ExtFullName")
          , k = be("Blocked").toUpperCase()
          , _ = o.channel ? be("UnblockChannel") : be("Unblock")
          , O = be("Options")
          , Z = be("WatchAnyway");
        return h.innerHTML = `
		<div class="miniplayer-buttons ${ge.hide}">
			<button class="expand">${ap()}</button>
			<button class="close">${up()}</button>
			<button class="prev-video">${lp()}</button>
			<button class="next-video">${cp()}</button>
		</div>
		<img src="${y}" alt="${b}">
		<h2>${k}</h2>
		<div id="reason">${o.reason}</div>
		<a id="revealButton" tabindex="0">${Z}</a>
		<div id="buttons">
			<a id="unblock" tabindex="0">${_}</a>
			<a id="options" tabindex="0">${O}</a>
		</div>
	`,
        jn(h, o, a),
        h.querySelector("#revealButton").addEventListener("click", pe => {
            et() || h.setAttribute(Q.overlayHidden, "true")
        }
        ),
        oo.set(h, {
            overlayElement: h,
            blockInfo: o,
            overlayType: c
        }),
        r.insertAdjacentElement("afterbegin", h),
        h
    }
    function jn(r, o, a, c) {
        oo.set(r, {
            ...oo.get(r),
            blockInfo: o,
            revealButton: c
        }),
        ( () => {
            const h = r.querySelector("#reason");
            h && (h.textContent = o.reason,
            a.localExtStorage.removeBlockReason ? h.classList.add(ge.hide) : h.classList.remove(ge.hide))
        }
        )(),
        ( () => {
            const h = r.querySelector("#revealButton");
            h && (a.localExtStorage.removeWatchAnyway ? h.classList.add(ge.hide) : h.classList.remove(ge.hide))
        }
        )(),
        c && (a.localExtStorage.removeRevealButton ? (c.classList.add(ge.hide),
        r.getAttribute(Q.overlayHidden) === "true" && c.click()) : c.classList.remove(ge.hide)),
        ( () => {
            const h = r.querySelector("#unblock");
            if (!h) {
                console.error("unblock button not found");
                return
            }
            if (!o.content && !o.channel || a.localExtStorage.removeUnblockButton) {
                h.classList.add(ge.hide);
                return
            }
            h.classList.remove(ge.hide);
            const y = o.channel ? be("UnblockChannel") : be("Unblock");
            h.textContent = y;
            const b = bc.get(h);
            b && h.removeEventListener("click", b);
            const k = _ => {
                et() || op(_, o, a)
            }
            ;
            h.addEventListener("click", k),
            bc.set(h, k)
        }
        )(),
        ( () => {
            const h = r.querySelector("#options");
            if (!h) {
                console.error("options button not found");
                return
            }
            if (!o.optionId || a.localExtStorage.removeOptionsButton) {
                o.optionId || console.log("no optionId in blockInfo", o),
                h.classList.add(ge.hide);
                return
            }
            h.classList.remove(ge.hide);
            const y = wc.get(h);
            y && h.removeEventListener("click", y);
            const b = k => {
                sp(k, o)
            }
            ;
            h.addEventListener("click", b),
            wc.set(h, b)
        }
        )()
    }
    function op(r, o, a) {
        a.askPassword().then( () => {
            if (o.channel)
                return Kt("unblockChannel", o.channel);
            if (o.content)
                return Kt("unblockContent", {
                    contentId: o.content.id,
                    contentType: o.content.type
                })
        }
        ).catch(c => {}
        )
    }
    function sp(r, o) {
        Kt("openOptionsPage", {
            focusElement: o.optionId
        })
    }
    function lu(r) {
        if (!r.tagName)
            return "grid";
        if (r.tagName.toLowerCase() === Ei && (r.classList.contains("ytd-item-section-renderer") || r.querySelector(".yt-lockup-view-model-wiz--compact")))
            return "horizontal";
        switch (r.tagName.toLowerCase()) {
        case "ytd-video-renderer":
        case "ytd-comment-renderer":
        case "ytd-comment-view-model":
        case "ytd-compact-video-renderer":
        case "ytd-playlist-video-renderer":
        case "ytd-playlist-panel-video-renderer":
        case "ytd-playlist-renderer":
        case "ytd-radio-renderer":
        case "ytd-compact-playlist-renderer":
        case "ytd-compact-radio-renderer":
            return "horizontal";
        default:
            return "grid"
        }
    }
    function ap() {
        return '<svg height="25px" version="1.1" viewBox="0 0 24 24" width="25px"><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "><path d="M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z" fill="#fff" fill-rule="nonzero"></path></g></g></svg>'
    }
    function up() {
        return '<svg height="25px" viewBox="0 0 24 24" width="25px"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#fff"></path></svg>'
    }
    function lp() {
        return '<svg height="50px" version="1.1" viewBox="0 0 36 36" width="50px"><use class="ytp-svg-shadow" xlink:href="#ytp-id-132"></use><path class="ytp-svg-fill" d="m 12,12 h 2 v 12 h -2 z m 3.5,6 8.5,6 V 12 z" id="ytp-id-132"></path></svg>'
    }
    function cp() {
        return '<svg height="50px" version="1.1" viewBox="0 0 36 36" width="50px"><use class="ytp-svg-shadow" xlink:href="#ytp-id-134"></use><path class="ytp-svg-fill" d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z" id="ytp-id-134"></path></svg>'
    }
    var Sc = {
        exports: {}
    };
    (function(r, o) {
        (function(a, c) {
            r.exports = c()
        }
        )(Qe, function() {
            var a = 1e3
              , c = 6e4
              , h = 36e5
              , y = "millisecond"
              , b = "second"
              , k = "minute"
              , _ = "hour"
              , O = "day"
              , Z = "week"
              , ue = "month"
              , pe = "quarter"
              , G = "year"
              , W = "date"
              , D = "Invalid Date"
              , he = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
              , J = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
              , Oe = {
                name: "en",
                weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                ordinal: function(V) {
                    var q = ["th", "st", "nd", "rd"]
                      , K = V % 100;
                    return "[" + V + (q[(K - 20) % 10] || q[K] || q[0]) + "]"
                }
            }
              , Te = function(V, q, K) {
                var te = String(V);
                return !te || te.length >= q ? V : "" + Array(q + 1 - te.length).join(K) + V
            }
              , Re = {
                s: Te,
                z: function(V) {
                    var q = -V.utcOffset()
                      , K = Math.abs(q)
                      , te = Math.floor(K / 60)
                      , ae = K % 60;
                    return (q <= 0 ? "+" : "-") + Te(te, 2, "0") + ":" + Te(ae, 2, "0")
                },
                m: function V(q, K) {
                    if (q.date() < K.date())
                        return -V(K, q);
                    var te = 12 * (K.year() - q.year()) + (K.month() - q.month())
                      , ae = q.clone().add(te, ue)
                      , re = K - ae < 0
                      , ce = q.clone().add(te + (re ? -1 : 1), ue);
                    return +(-(te + (K - ae) / (re ? ae - ce : ce - ae)) || 0)
                },
                a: function(V) {
                    return V < 0 ? Math.ceil(V) || 0 : Math.floor(V)
                },
                p: function(V) {
                    return {
                        M: ue,
                        y: G,
                        w: Z,
                        d: O,
                        D: W,
                        h: _,
                        m: k,
                        s: b,
                        ms: y,
                        Q: pe
                    }[V] || String(V || "").toLowerCase().replace(/s$/, "")
                },
                u: function(V) {
                    return V === void 0
                }
            }
              , Ie = "en"
              , me = {};
            me[Ie] = Oe;
            var l = "$isDayjsObject"
              , R = function(V) {
                return V instanceof de || !(!V || !V[l])
            }
              , j = function V(q, K, te) {
                var ae;
                if (!q)
                    return Ie;
                if (typeof q == "string") {
                    var re = q.toLowerCase();
                    me[re] && (ae = re),
                    K && (me[re] = K,
                    ae = re);
                    var ce = q.split("-");
                    if (!ae && ce.length > 1)
                        return V(ce[0])
                } else {
                    var _e = q.name;
                    me[_e] = q,
                    ae = _e
                }
                return !te && ae && (Ie = ae),
                ae || !te && Ie
            }
              , Y = function(V, q) {
                if (R(V))
                    return V.clone();
                var K = typeof q == "object" ? q : {};
                return K.date = V,
                K.args = arguments,
                new de(K)
            }
              , z = Re;
            z.l = j,
            z.i = R,
            z.w = function(V, q) {
                return Y(V, {
                    locale: q.$L,
                    utc: q.$u,
                    x: q.$x,
                    $offset: q.$offset
                })
            }
            ;
            var de = function() {
                function V(K) {
                    this.$L = j(K.locale, null, !0),
                    this.parse(K),
                    this.$x = this.$x || K.x || {},
                    this[l] = !0
                }
                var q = V.prototype;
                return q.parse = function(K) {
                    this.$d = function(te) {
                        var ae = te.date
                          , re = te.utc;
                        if (ae === null)
                            return new Date(NaN);
                        if (z.u(ae))
                            return new Date;
                        if (ae instanceof Date)
                            return new Date(ae);
                        if (typeof ae == "string" && !/Z$/i.test(ae)) {
                            var ce = ae.match(he);
                            if (ce) {
                                var _e = ce[2] - 1 || 0
                                  , He = (ce[7] || "0").substring(0, 3);
                                return re ? new Date(Date.UTC(ce[1], _e, ce[3] || 1, ce[4] || 0, ce[5] || 0, ce[6] || 0, He)) : new Date(ce[1],_e,ce[3] || 1,ce[4] || 0,ce[5] || 0,ce[6] || 0,He)
                            }
                        }
                        return new Date(ae)
                    }(K),
                    this.init()
                }
                ,
                q.init = function() {
                    var K = this.$d;
                    this.$y = K.getFullYear(),
                    this.$M = K.getMonth(),
                    this.$D = K.getDate(),
                    this.$W = K.getDay(),
                    this.$H = K.getHours(),
                    this.$m = K.getMinutes(),
                    this.$s = K.getSeconds(),
                    this.$ms = K.getMilliseconds()
                }
                ,
                q.$utils = function() {
                    return z
                }
                ,
                q.isValid = function() {
                    return this.$d.toString() !== D
                }
                ,
                q.isSame = function(K, te) {
                    var ae = Y(K);
                    return this.startOf(te) <= ae && ae <= this.endOf(te)
                }
                ,
                q.isAfter = function(K, te) {
                    return Y(K) < this.startOf(te)
                }
                ,
                q.isBefore = function(K, te) {
                    return this.endOf(te) < Y(K)
                }
                ,
                q.$g = function(K, te, ae) {
                    return z.u(K) ? this[te] : this.set(ae, K)
                }
                ,
                q.unix = function() {
                    return Math.floor(this.valueOf() / 1e3)
                }
                ,
                q.valueOf = function() {
                    return this.$d.getTime()
                }
                ,
                q.startOf = function(K, te) {
                    var ae = this
                      , re = !!z.u(te) || te
                      , ce = z.p(K)
                      , _e = function(Lt, at) {
                        var Dt = z.w(ae.$u ? Date.UTC(ae.$y, at, Lt) : new Date(ae.$y,at,Lt), ae);
                        return re ? Dt : Dt.endOf(O)
                    }
                      , He = function(Lt, at) {
                        return z.w(ae.toDate()[Lt].apply(ae.toDate("s"), (re ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(at)), ae)
                    }
                      , Ze = this.$W
                      , tt = this.$M
                      , ot = this.$D
                      , un = "set" + (this.$u ? "UTC" : "");
                    switch (ce) {
                    case G:
                        return re ? _e(1, 0) : _e(31, 11);
                    case ue:
                        return re ? _e(1, tt) : _e(0, tt + 1);
                    case Z:
                        var On = this.$locale().weekStart || 0
                          , ln = (Ze < On ? Ze + 7 : Ze) - On;
                        return _e(re ? ot - ln : ot + (6 - ln), tt);
                    case O:
                    case W:
                        return He(un + "Hours", 0);
                    case _:
                        return He(un + "Minutes", 1);
                    case k:
                        return He(un + "Seconds", 2);
                    case b:
                        return He(un + "Milliseconds", 3);
                    default:
                        return this.clone()
                    }
                }
                ,
                q.endOf = function(K) {
                    return this.startOf(K, !1)
                }
                ,
                q.$set = function(K, te) {
                    var ae, re = z.p(K), ce = "set" + (this.$u ? "UTC" : ""), _e = (ae = {},
                    ae[O] = ce + "Date",
                    ae[W] = ce + "Date",
                    ae[ue] = ce + "Month",
                    ae[G] = ce + "FullYear",
                    ae[_] = ce + "Hours",
                    ae[k] = ce + "Minutes",
                    ae[b] = ce + "Seconds",
                    ae[y] = ce + "Milliseconds",
                    ae)[re], He = re === O ? this.$D + (te - this.$W) : te;
                    if (re === ue || re === G) {
                        var Ze = this.clone().set(W, 1);
                        Ze.$d[_e](He),
                        Ze.init(),
                        this.$d = Ze.set(W, Math.min(this.$D, Ze.daysInMonth())).$d
                    } else
                        _e && this.$d[_e](He);
                    return this.init(),
                    this
                }
                ,
                q.set = function(K, te) {
                    return this.clone().$set(K, te)
                }
                ,
                q.get = function(K) {
                    return this[z.p(K)]()
                }
                ,
                q.add = function(K, te) {
                    var ae, re = this;
                    K = Number(K);
                    var ce = z.p(te)
                      , _e = function(tt) {
                        var ot = Y(re);
                        return z.w(ot.date(ot.date() + Math.round(tt * K)), re)
                    };
                    if (ce === ue)
                        return this.set(ue, this.$M + K);
                    if (ce === G)
                        return this.set(G, this.$y + K);
                    if (ce === O)
                        return _e(1);
                    if (ce === Z)
                        return _e(7);
                    var He = (ae = {},
                    ae[k] = c,
                    ae[_] = h,
                    ae[b] = a,
                    ae)[ce] || 1
                      , Ze = this.$d.getTime() + K * He;
                    return z.w(Ze, this)
                }
                ,
                q.subtract = function(K, te) {
                    return this.add(-1 * K, te)
                }
                ,
                q.format = function(K) {
                    var te = this
                      , ae = this.$locale();
                    if (!this.isValid())
                        return ae.invalidDate || D;
                    var re = K || "YYYY-MM-DDTHH:mm:ssZ"
                      , ce = z.z(this)
                      , _e = this.$H
                      , He = this.$m
                      , Ze = this.$M
                      , tt = ae.weekdays
                      , ot = ae.months
                      , un = ae.meridiem
                      , On = function(at, Dt, Et, Sn) {
                        return at && (at[Dt] || at(te, re)) || Et[Dt].slice(0, Sn)
                    }
                      , ln = function(at) {
                        return z.s(_e % 12 || 12, at, "0")
                    }
                      , Lt = un || function(at, Dt, Et) {
                        var Sn = at < 12 ? "AM" : "PM";
                        return Et ? Sn.toLowerCase() : Sn
                    }
                    ;
                    return re.replace(J, function(at, Dt) {
                        return Dt || function(Et) {
                            switch (Et) {
                            case "YY":
                                return String(te.$y).slice(-2);
                            case "YYYY":
                                return z.s(te.$y, 4, "0");
                            case "M":
                                return Ze + 1;
                            case "MM":
                                return z.s(Ze + 1, 2, "0");
                            case "MMM":
                                return On(ae.monthsShort, Ze, ot, 3);
                            case "MMMM":
                                return On(ot, Ze);
                            case "D":
                                return te.$D;
                            case "DD":
                                return z.s(te.$D, 2, "0");
                            case "d":
                                return String(te.$W);
                            case "dd":
                                return On(ae.weekdaysMin, te.$W, tt, 2);
                            case "ddd":
                                return On(ae.weekdaysShort, te.$W, tt, 3);
                            case "dddd":
                                return tt[te.$W];
                            case "H":
                                return String(_e);
                            case "HH":
                                return z.s(_e, 2, "0");
                            case "h":
                                return ln(1);
                            case "hh":
                                return ln(2);
                            case "a":
                                return Lt(_e, He, !0);
                            case "A":
                                return Lt(_e, He, !1);
                            case "m":
                                return String(He);
                            case "mm":
                                return z.s(He, 2, "0");
                            case "s":
                                return String(te.$s);
                            case "ss":
                                return z.s(te.$s, 2, "0");
                            case "SSS":
                                return z.s(te.$ms, 3, "0");
                            case "Z":
                                return ce
                            }
                            return null
                        }(at) || ce.replace(":", "")
                    })
                }
                ,
                q.utcOffset = function() {
                    return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                }
                ,
                q.diff = function(K, te, ae) {
                    var re, ce = this, _e = z.p(te), He = Y(K), Ze = (He.utcOffset() - this.utcOffset()) * c, tt = this - He, ot = function() {
                        return z.m(ce, He)
                    };
                    switch (_e) {
                    case G:
                        re = ot() / 12;
                        break;
                    case ue:
                        re = ot();
                        break;
                    case pe:
                        re = ot() / 3;
                        break;
                    case Z:
                        re = (tt - Ze) / 6048e5;
                        break;
                    case O:
                        re = (tt - Ze) / 864e5;
                        break;
                    case _:
                        re = tt / h;
                        break;
                    case k:
                        re = tt / c;
                        break;
                    case b:
                        re = tt / a;
                        break;
                    default:
                        re = tt
                    }
                    return ae ? re : z.a(re)
                }
                ,
                q.daysInMonth = function() {
                    return this.endOf(ue).$D
                }
                ,
                q.$locale = function() {
                    return me[this.$L]
                }
                ,
                q.locale = function(K, te) {
                    if (!K)
                        return this.$L;
                    var ae = this.clone()
                      , re = j(K, te, !0);
                    return re && (ae.$L = re),
                    ae
                }
                ,
                q.clone = function() {
                    return z.w(this.$d, this)
                }
                ,
                q.toDate = function() {
                    return new Date(this.valueOf())
                }
                ,
                q.toJSON = function() {
                    return this.isValid() ? this.toISOString() : null
                }
                ,
                q.toISOString = function() {
                    return this.$d.toISOString()
                }
                ,
                q.toString = function() {
                    return this.$d.toUTCString()
                }
                ,
                V
            }()
              , N = de.prototype;
            return Y.prototype = N,
            [["$ms", y], ["$s", b], ["$m", k], ["$H", _], ["$W", O], ["$M", ue], ["$y", G], ["$D", W]].forEach(function(V) {
                N[V[1]] = function(q) {
                    return this.$g(q, V[0], V[1])
                }
            }),
            Y.extend = function(V, q) {
                return V.$i || (V(q, de, Y),
                V.$i = !0),
                Y
            }
            ,
            Y.locale = j,
            Y.isDayjs = R,
            Y.unix = function(V) {
                return Y(1e3 * V)
            }
            ,
            Y.en = me[Ie],
            Y.Ls = me,
            Y.p = {},
            Y
        })
    }
    )(Sc);
    var fp = Sc.exports;
    const Tr = ct(fp);
    var Ac = {
        exports: {}
    };
    (function(r, o) {
        (function(a, c) {
            r.exports = c()
        }
        )(Qe, function() {
            var a, c, h = 1e3, y = 6e4, b = 36e5, k = 864e5, _ = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, O = 31536e6, Z = 2628e6, ue = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, pe = {
                years: O,
                months: Z,
                days: k,
                hours: b,
                minutes: y,
                seconds: h,
                milliseconds: 1,
                weeks: 6048e5
            }, G = function(me) {
                return me instanceof Re
            }, W = function(me, l, R) {
                return new Re(me,R,l.$l)
            }, D = function(me) {
                return c.p(me) + "s"
            }, he = function(me) {
                return me < 0
            }, J = function(me) {
                return he(me) ? Math.ceil(me) : Math.floor(me)
            }, Oe = function(me) {
                return Math.abs(me)
            }, Te = function(me, l) {
                return me ? he(me) ? {
                    negative: !0,
                    format: "" + Oe(me) + l
                } : {
                    negative: !1,
                    format: "" + me + l
                } : {
                    negative: !1,
                    format: ""
                }
            }, Re = function() {
                function me(R, j, Y) {
                    var z = this;
                    if (this.$d = {},
                    this.$l = Y,
                    R === void 0 && (this.$ms = 0,
                    this.parseFromMilliseconds()),
                    j)
                        return W(R * pe[D(j)], this);
                    if (typeof R == "number")
                        return this.$ms = R,
                        this.parseFromMilliseconds(),
                        this;
                    if (typeof R == "object")
                        return Object.keys(R).forEach(function(V) {
                            z.$d[D(V)] = R[V]
                        }),
                        this.calMilliseconds(),
                        this;
                    if (typeof R == "string") {
                        var de = R.match(ue);
                        if (de) {
                            var N = de.slice(2).map(function(V) {
                                return V != null ? Number(V) : 0
                            });
                            return this.$d.years = N[0],
                            this.$d.months = N[1],
                            this.$d.weeks = N[2],
                            this.$d.days = N[3],
                            this.$d.hours = N[4],
                            this.$d.minutes = N[5],
                            this.$d.seconds = N[6],
                            this.calMilliseconds(),
                            this
                        }
                    }
                    return this
                }
                var l = me.prototype;
                return l.calMilliseconds = function() {
                    var R = this;
                    this.$ms = Object.keys(this.$d).reduce(function(j, Y) {
                        return j + (R.$d[Y] || 0) * pe[Y]
                    }, 0)
                }
                ,
                l.parseFromMilliseconds = function() {
                    var R = this.$ms;
                    this.$d.years = J(R / O),
                    R %= O,
                    this.$d.months = J(R / Z),
                    R %= Z,
                    this.$d.days = J(R / k),
                    R %= k,
                    this.$d.hours = J(R / b),
                    R %= b,
                    this.$d.minutes = J(R / y),
                    R %= y,
                    this.$d.seconds = J(R / h),
                    R %= h,
                    this.$d.milliseconds = R
                }
                ,
                l.toISOString = function() {
                    var R = Te(this.$d.years, "Y")
                      , j = Te(this.$d.months, "M")
                      , Y = +this.$d.days || 0;
                    this.$d.weeks && (Y += 7 * this.$d.weeks);
                    var z = Te(Y, "D")
                      , de = Te(this.$d.hours, "H")
                      , N = Te(this.$d.minutes, "M")
                      , V = this.$d.seconds || 0;
                    this.$d.milliseconds && (V += this.$d.milliseconds / 1e3,
                    V = Math.round(1e3 * V) / 1e3);
                    var q = Te(V, "S")
                      , K = R.negative || j.negative || z.negative || de.negative || N.negative || q.negative
                      , te = de.format || N.format || q.format ? "T" : ""
                      , ae = (K ? "-" : "") + "P" + R.format + j.format + z.format + te + de.format + N.format + q.format;
                    return ae === "P" || ae === "-P" ? "P0D" : ae
                }
                ,
                l.toJSON = function() {
                    return this.toISOString()
                }
                ,
                l.format = function(R) {
                    var j = R || "YYYY-MM-DDTHH:mm:ss"
                      , Y = {
                        Y: this.$d.years,
                        YY: c.s(this.$d.years, 2, "0"),
                        YYYY: c.s(this.$d.years, 4, "0"),
                        M: this.$d.months,
                        MM: c.s(this.$d.months, 2, "0"),
                        D: this.$d.days,
                        DD: c.s(this.$d.days, 2, "0"),
                        H: this.$d.hours,
                        HH: c.s(this.$d.hours, 2, "0"),
                        m: this.$d.minutes,
                        mm: c.s(this.$d.minutes, 2, "0"),
                        s: this.$d.seconds,
                        ss: c.s(this.$d.seconds, 2, "0"),
                        SSS: c.s(this.$d.milliseconds, 3, "0")
                    };
                    return j.replace(_, function(z, de) {
                        return de || String(Y[z])
                    })
                }
                ,
                l.as = function(R) {
                    return this.$ms / pe[D(R)]
                }
                ,
                l.get = function(R) {
                    var j = this.$ms
                      , Y = D(R);
                    return Y === "milliseconds" ? j %= 1e3 : j = Y === "weeks" ? J(j / pe[Y]) : this.$d[Y],
                    j || 0
                }
                ,
                l.add = function(R, j, Y) {
                    var z;
                    return z = j ? R * pe[D(j)] : G(R) ? R.$ms : W(R, this).$ms,
                    W(this.$ms + z * (Y ? -1 : 1), this)
                }
                ,
                l.subtract = function(R, j) {
                    return this.add(R, j, !0)
                }
                ,
                l.locale = function(R) {
                    var j = this.clone();
                    return j.$l = R,
                    j
                }
                ,
                l.clone = function() {
                    return W(this.$ms, this)
                }
                ,
                l.humanize = function(R) {
                    return a().add(this.$ms, "ms").locale(this.$l).fromNow(!R)
                }
                ,
                l.valueOf = function() {
                    return this.asMilliseconds()
                }
                ,
                l.milliseconds = function() {
                    return this.get("milliseconds")
                }
                ,
                l.asMilliseconds = function() {
                    return this.as("milliseconds")
                }
                ,
                l.seconds = function() {
                    return this.get("seconds")
                }
                ,
                l.asSeconds = function() {
                    return this.as("seconds")
                }
                ,
                l.minutes = function() {
                    return this.get("minutes")
                }
                ,
                l.asMinutes = function() {
                    return this.as("minutes")
                }
                ,
                l.hours = function() {
                    return this.get("hours")
                }
                ,
                l.asHours = function() {
                    return this.as("hours")
                }
                ,
                l.days = function() {
                    return this.get("days")
                }
                ,
                l.asDays = function() {
                    return this.as("days")
                }
                ,
                l.weeks = function() {
                    return this.get("weeks")
                }
                ,
                l.asWeeks = function() {
                    return this.as("weeks")
                }
                ,
                l.months = function() {
                    return this.get("months")
                }
                ,
                l.asMonths = function() {
                    return this.as("months")
                }
                ,
                l.years = function() {
                    return this.get("years")
                }
                ,
                l.asYears = function() {
                    return this.as("years")
                }
                ,
                me
            }(), Ie = function(me, l, R) {
                return me.add(l.years() * R, "y").add(l.months() * R, "M").add(l.days() * R, "d").add(l.hours() * R, "h").add(l.minutes() * R, "m").add(l.seconds() * R, "s").add(l.milliseconds() * R, "ms")
            };
            return function(me, l, R) {
                a = R,
                c = R().$utils(),
                R.duration = function(z, de) {
                    var N = R.locale();
                    return W(z, {
                        $l: N
                    }, de)
                }
                ,
                R.isDuration = G;
                var j = l.prototype.add
                  , Y = l.prototype.subtract;
                l.prototype.add = function(z, de) {
                    return G(z) ? Ie(this, z, 1) : j.bind(this)(z, de)
                }
                ,
                l.prototype.subtract = function(z, de) {
                    return G(z) ? Ie(this, z, -1) : Y.bind(this)(z, de)
                }
            }
        })
    }
    )(Ac);
    var dp = Ac.exports;
    const Ti = ct(dp)
      , cu = new Set
      , _c = new Set
      , Ss = {};
    async function kc(r, o, a) {
        if (Ss[r])
            return Ss[r];
        if (cu.has(r) || _c.has(r))
            return;
        cu.add(r);
        const c = await Ec(r, a).catch(h => {
            throw _c.add(r),
            cu.delete(r),
            h
        }
        );
        return Ss[r] = c,
        o && o(c),
        c
    }
    function As(r) {
        return Ss[r]
    }
    async function Ec(r, o) {
        var pe, G, W, D, he, J, Oe, Te, Re, Ie, me;
        const c = await (await fetch("https://www.youtube.com/youtubei/v1/player", {
            body: JSON.stringify({
                context: {
                    client: {
                        clientName: "WEB",
                        clientVersion: "2.20230327.07.00"
                    }
                },
                videoId: r
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })).json();
        if (!c.videoDetails) {
            if (!o)
                throw new Error(`could not get data for video id ${r}.`);
            const {currentAttempt: l=0, maxAttempt: R, delayPerAttemptInMs: j} = o;
            if (l >= R)
                throw new Error(`could not get data for video id ${r} in ${l} attempts.`);
            const Y = Array.isArray(j) ? j[Math.min(l - 1, j.length - 1)] : j;
            return Y && await new Promise(z => setTimeout(z, Y)),
            Ec(r, {
                currentAttempt: l + 1,
                maxAttempt: R,
                delayPerAttemptInMs: j
            })
        }
        const h = ( () => {
            var R, j;
            if (!((R = c.videoDetails) != null && R.lengthSeconds))
                return;
            const l = parseInt((j = c.videoDetails) == null ? void 0 : j.lengthSeconds);
            return isNaN(l) ? void 0 : l
        }
        )()
          , y = (G = (pe = c.microformat) == null ? void 0 : pe.playerMicroformatRenderer) == null ? void 0 : G.category
          , b = ( () => {
            if (y)
                return Th.get(y)
        }
        )()
          , k = (D = (W = c.microformat) == null ? void 0 : W.playerMicroformatRenderer) == null ? void 0 : D.publishDate
          , _ = ( () => {
            if (k)
                return new Date(k).getTime()
        }
        )()
          , O = ( () => {
            var R, j;
            const l = (j = (R = c.microformat) == null ? void 0 : R.playerMicroformatRenderer) == null ? void 0 : j.isFamilySafe;
            if (l)
                return !l
        }
        )()
          , Z = ( () => {
            var j;
            const l = (j = c.videoDetails) == null ? void 0 : j.viewCount;
            if (!l)
                return;
            const R = parseInt(l);
            return isNaN(R) ? void 0 : R
        }
        )()
          , ue = ( () => {
            var j, Y;
            const l = (Y = (j = c.captions) == null ? void 0 : j.playerCaptionsTracklistRenderer) == null ? void 0 : Y.captionTracks;
            if (!l || l.length === 0)
                return;
            const R = l.find(z => {
                var de;
                return (de = z.vssId) == null ? void 0 : de.startsWith("a.")
            }
            );
            if (R)
                return R.languageCode
        }
        )();
        return {
            id: r,
            title: ((he = c.videoDetails) == null ? void 0 : he.title) || void 0,
            durationInSeconds: h,
            tags: ((J = c.videoDetails) == null ? void 0 : J.keywords) || void 0,
            description: ((Oe = c.videoDetails) == null ? void 0 : Oe.shortDescription) || void 0,
            author: ((Te = c.videoDetails) == null ? void 0 : Te.author) || void 0,
            channelId: ((Re = c.videoDetails) == null ? void 0 : Re.channelId) || void 0,
            categoryName: y,
            categoryId: b,
            publishedTimestamp: _,
            publishedDate: k,
            isAgeRestricted: O,
            viewCount: Z,
            isLive: (Ie = c.videoDetails) == null ? void 0 : Ie.isLiveContent,
            isPremiere: (me = c.videoDetails) == null ? void 0 : me.isPremiere,
            languageCode: ue
        }
    }
    const hp = new Intl.DisplayNames(be("LanguageCode"),{
        type: "language",
        languageDisplay: "standard"
    });
    function pp(r, o=!0) {
        const a = hp.of(r);
        return a ? o ? a.charAt(0).toUpperCase() + a.slice(1) : a : r
    }
    let xc = new Set;
    function Tc(r) {
        xc = new Set(r)
    }
    function gp(r) {
        return r.find(o => xc.has(o))
    }
    Tr.extend(Ti);
    let It = lo()
      , Ic = ""
      , Ii = !1
      , fu = ""
      , _s = ""
      , ur = !1;
    const ks = ["ytd-playlist-panel-renderer#playlist.ytd-watch-flexy", "ytd-playlist-panel-renderer#playlist.ytd-watch-grid"];
    let du = !1
      , Qr = null
      , Bc = !1;
    const Lc = "#player ytd-player, #full-bleed-container ytd-player"
      , Pc = "#player ytd-player video, #full-bleed-container ytd-player video"
      , yp = "#movie_player .ytp-chrome-bottom a.ytp-next-button"
      , hu = "video-id"
      , Mc = "ytd-watch-metadata"
      , Es = ["ytd-watch-flexy", "ytd-watch-grid"];
    function mp(r) {
        ur = gu(),
        no("urlChange", o => {
            ur = gu(o),
            ur && (lr(r),
            ao(r))
        }
        ),
        lr(r),
        ao(r),
        r.onNodeAdded( (o, a) => {
            a && ur && (a.matches([Mc, ...Es].join(", ")) && lr(r),
            a.matches("#movie_player") && a.querySelector(Pc) && lr(r),
            a.matches('script[type="application/ld+json"]') && lr(r),
            a.matches(".ytp-time-display") && Oc(r),
            a.matches(ks.join(", ")) && ao(r))
        }
        ),
        r.onNodeChange( (o, a, c) => {
            ur && c && (c.matches(Es.join(", ")) && a.attributeName === hu && lr(r),
            c.matches(".ytp-time-display") && Oc(r),
            c.matches(ks.join(", ")) && a.attributeName === "hidden" && ao(r))
        }
        ),
        r.onStorageChange(o => {
            ur && (lr(r),
            ao(r))
        }
        )
    }
    function ao(r) {
        const o = document.querySelector(`#columns ${ks}`)
          , a = du
          , c = !!o && !o.hasAttribute("hidden");
        du = c,
        c && c !== a && vp(r)
    }
    function Oc(r) {
        const o = document.querySelector(".ytp-chrome-controls .ytp-time-display")
          , a = !!(o != null && o.classList.contains("ytp-live"));
        Bc !== a && (Bc = a,
        lr(r))
    }
    function vp(r) {
        Ii && Rc(r)
    }
    function pu(r) {
        if (!Ii || !r.localExtStorage.autoSkipBlockedVideos || !du || !ur)
            return !1;
        const o = ( () => {
            const c = document.querySelector(".ytp-chrome-bottom .ytp-autonav-toggle-button");
            return (c == null ? void 0 : c.getAttribute("aria-checked")) === "true"
        }
        )();
        return !(( () => {
            var y;
            const c = document.querySelector(ks.join(", "));
            return c ? ((y = Array.from(c.querySelectorAll("#items ytd-playlist-panel-video-renderer")).at(-1)) == null ? void 0 : y.hasAttribute("selected")) ?? !1 : (console.error("playlist is active but could not find playlist element"),
            !1)
        }
        )() && !o)
    }
    function Rc(r) {
        pu(r) && (Qr && (clearTimeout(Qr),
        Qr = null),
        Qr = setTimeout( () => {
            if (!pu(r))
                return;
            const o = document.querySelector(Lc)
              , a = o == null ? void 0 : o.querySelector(`.${ge.overlay}`);
            if ((a == null ? void 0 : a.getAttribute(Q.overlayHidden)) === "true")
                return;
            const h = document.querySelector(yp);
            h && h.click()
        }
        , 5e3))
    }
    function bp(r) {
        Qr && (clearTimeout(Qr),
        Qr = null)
    }
    function lr(r) {
        if (!ur)
            return;
        const o = document.querySelector(Mc)
          , a = document.querySelector(Lc)
          , c = document.querySelector(Pc);
        if (!o)
            return;
        const h = Nc();
        if (!h)
            return;
        r.localExtStorage.DEV_skipCacheFetch || kc(h, _ => {
            et() || lr(r)
        }
        , {
            maxAttempt: 3,
            delayPerAttemptInMs: [0, 500]
        }).catch(_ => {
            console.log("error fetching for main video data:", h, o, _)
        }
        ),
        Ic = h,
        c && !c.hasAttribute(Q.watchVideoId) && (c.addEventListener("play", _ => {
            if (et() || !ur)
                return;
            const O = (a == null ? void 0 : a.querySelector(`.${ge.overlay}`)) || null;
            Cn(location.href) === Ic && Ii && (O && O.getAttribute(Q.overlayHidden) === "true" || c.pause())
        }
        ),
        Ii && c.pause()),
        c && c.setAttribute(Q.watchVideoId, h);
        const y = wp(o, r);
        Er.isEqual(It, y),
        ( () => {
            if (!r.localExtStorage.addBlockChannelButton || !r.localExtStorage.extensionEnabled)
                return;
            const _ = o.querySelector("ytd-channel-name");
            if (!_ || _.hasAttribute(Q.hasChannelBlockButton))
                return;
            const O = _i(r.localExtStorage.biggerChannelBlockButton);
            _.insertAdjacentElement("beforeend", O),
            _.setAttribute(Q.hasChannelBlockButton, "true"),
            r.localExtStorage.showBlockChannelButtonOnHover ? _.removeAttribute(Q.alwaysShowChannelBlockButton) : _.setAttribute(Q.alwaysShowChannelBlockButton, "true"),
            O.addEventListener("click", Z => {
                et() || ki(Z, It.channel, r.localExtStorage.askConfirmationOnChannelBlockButton)
            }
            )
        }
        )(),
        It = y,
        It.id && (r.addVideoToAPIQueue(It.id),
        r.videos.byId.set(It.id, It)),
        It.title && r.videos.byTitle.set(It.title, It);
        const b = r.localExtStorage.blockOpenedVideos ? fo(It, r.localExtStorage) : null;
        if (!_s && !b || b && b.reason === _s && fu === It.id)
            return;
        const k = a == null ? void 0 : a.querySelector(`.${ge.overlay}`);
        if (!b) {
            Ii = !1,
            _s = "",
            fu = "",
            k == null || k.remove(),
            bp(),
            r.removeFromBlockList(It.id, "video");
            return
        }
        Ii = !0,
        _s = b.reason,
        fu = It.id,
        c == null || c.pause(),
        r.addToBlockList(It.id, It, "video"),
        k ? (k.setAttribute(Q.overlayHidden, "false"),
        jn(k, b, r)) : a && Cc(a, b, r),
        pu(r) && Rc(r)
    }
    function wp(r, o) {
        var q, K, te, ae;
        const a = document.querySelector('player-microformat-renderer script[type="application/ld+json"]')
          , c = a != null && a.textContent ? JSON.parse(a.textContent) : null
          , h = (q = document.querySelector("ytd-page-manager")) == null ? void 0 : q.querySelector(Es.join(", "))
          , y = ( () => {
            const re = h == null ? void 0 : h.getAttribute(hu);
            return re || (c ? Cp(c) : "")
        }
        )()
          , b = o == null ? void 0 : o.videos.apiDatas.get(y)
          , k = o == null ? void 0 : o.videos.byId.get(y)
          , _ = As(y)
          , O = Cn(location.href)
          , Z = O !== y ? "" : Zr(location.href)
          , ue = ( () => {
            if (c) {
                const re = Object.keys(ys).find(ce => ys[ce] === c.genre);
                if (re)
                    return re
            }
            return _ != null && _.categoryId ? _.categoryId : k != null && k.categoryId ? k.categoryId : b != null && b.categoryId ? b.categoryId : ""
        }
        )()
          , pe = ho(y)
          , G = r.querySelector("#title yt-formatted-string")
          , W = ((K = G == null ? void 0 : G.textContent) == null ? void 0 : K.trim()) || (_ == null ? void 0 : _.title) || (b == null ? void 0 : b.title) || (k == null ? void 0 : k.title) || ""
          , D = ( () => {
            const re = h == null ? void 0 : h.querySelector(".ytp-time-display .ytp-time-duration");
            if (!re || !re.textContent)
                return (k == null ? void 0 : k.duration) || (_ == null ? void 0 : _.durationInSeconds) || (b == null ? void 0 : b.duration) || 0;
            const ce = re.textContent.trim();
            return Ps(ce) || (_ == null ? void 0 : _.durationInSeconds) || (b == null ? void 0 : b.duration) || (k == null ? void 0 : k.duration) || 0
        }
        )()
          , he = r.querySelector("ytd-channel-name a")
          , J = (((te = he == null ? void 0 : he.textContent) == null ? void 0 : te.trim()) || (_ == null ? void 0 : _.author) || (b == null ? void 0 : b.channelTitle) || (k == null ? void 0 : k.channel.name) || "").replace(/[\r\n]/g, " ").trim()
          , Oe = (he == null ? void 0 : he.href) || (k == null ? void 0 : k.channel.url) || ""
          , Te = Xr(Oe) || (k == null ? void 0 : k.channel.handle) || ""
          , Re = ( () => {
            var ce;
            if (_ != null && _.channelId)
                return _.channelId;
            if (b != null && b.channelId)
                return b.channelId;
            if ((ce = k == null ? void 0 : k.channel) != null && ce.id)
                return k.channel.id;
            const re = xr(Oe);
            return re || ""
        }
        )()
          , Ie = !!r.querySelector("ytd-channel-name ytd-badge-supported-renderer:not([hidden])")
          , me = (c == null ? void 0 : c.description) || (_ == null ? void 0 : _.description) || (b == null ? void 0 : b.description) || (k == null ? void 0 : k.description) || ""
          , l = !!((ae = document.querySelector(".ytp-chrome-controls .ytp-time-display")) != null && ae.classList.contains("ytp-live")) || (_ == null ? void 0 : _.isLive) || !1
          , R = !!r.querySelector(".badge.badge-style-type-members-only:not([hidden])")
          , j = _ != null && _.isAgeRestricted ? !0 : b && "ageRestricted"in b && b.ageRestricted ? b.ageRestricted : !1
          , Y = _ != null && _.viewCount ? _.viewCount : b && "viewCount"in b && b.viewCount ? b.viewCount : null
          , z = _ != null && _.publishedTimestamp ? _.publishedTimestamp : k != null && k.publishedAt ? k.publishedAt : b && "publishedAt"in b && b.publishedAt ? b.publishedAt : 0
          , de = !!(document.querySelector(".ytp-offline-slate-buttons button") || _ != null && _.isPremiere)
          , N = _ != null && _.tags ? _.tags : b != null && b.tags ? b.tags : k != null && k.tags ? k.tags : [];
        let V = [(b == null ? void 0 : b.defaultLanguage) || "", (b == null ? void 0 : b.defaultAudioLanguage) || "", (_ == null ? void 0 : _.languageCode) || ""].filter(Boolean);
        return k != null && k.languages && k.languages.length > V.length && (V = k.languages),
        {
            id: y,
            title: W,
            url: pe,
            description: me,
            duration: D,
            live: l,
            publishedAt: z,
            tags: N,
            categoryId: ue,
            playlistId: Z,
            premiere: de,
            shorts: !1,
            ageRestricted: j,
            viewCount: Y,
            membersOnly: R,
            languages: V,
            channel: {
                name: J,
                handle: Te,
                url: Oe,
                id: Re,
                verified: Ie
            },
            page: "watch",
            progress: null
        }
    }
    function gu(r="") {
        return r || (r = location.href),
        location.href.includes("/watch?v=")
    }
    function Cp(r) {
        const o = r.embedUrl.match(/\/embed\/(.+)(\/|\?|$)/);
        return o ? o[1] : ""
    }
    function Nc() {
        var o;
        const r = (o = document.querySelector("ytd-page-manager")) == null ? void 0 : o.querySelector(Es.join(", "));
        return r == null ? void 0 : r.getAttribute(hu)
    }
    const yu = "tp-yt-iron-dropdown"
      , $c = "ytm-shorts-lockup-view-model"
      , qc = "ShortsLockupViewModelHostOutsideMetadataMenu"
      , Dc = "button.yt-spec-button-shape-next"
      , Sp = `${$c} .${qc} ${Dc}`
      , Hc = ".yt-lockup-metadata-view-model-wiz__menu-button .ytSpecButtonViewModelHost button"
      , Fc = "#button.dropdown-trigger"
      , Ap = "ytd-reel-video-renderer #actions #menu-button"
      , Wc = "ytd-watch-metadata #actions #menu yt-button-shape#button-shape"
      , Uc = [Fc, Hc, Ap, Wc, Sp, "ytm-shorts-lockup-view-model .shortsLockupViewModelHostOutsideMetadataMenu button"].join(", ")
      , _p = 1e3;
    let mu = !1
      , Vc = null
      , vu = null
      , ut = null
      , Bi = null
      , xs = null
      , Ts = null;
    function kp(r) {
        document.querySelectorAll(yu).forEach(a => {
            a.style.display !== "none" && bu(a, r)
        }
        ),
        r.onNodeAdded( (o, a) => {
            if (!a)
                return;
            if (a.matches(yu) && a.style.display !== "none") {
                bu(a, r);
                return
            }
            const c = ( () => {
                var h, y;
                if (a.id === "button" && a.classList.contains("dropdown-trigger"))
                    return a;
                if (a.classList.contains("yt-lockup-view-model-wiz")) {
                    const b = a.querySelector(Hc);
                    return b || null
                }
                if (a.tagName === $c.toUpperCase()) {
                    const b = a.querySelector(`.${qc} ${Dc}`);
                    return b || null
                }
                if (a.tagName === "ytd-reel-player-overlay-renderer".toUpperCase()) {
                    const b = a.querySelector("#menu-button");
                    return b || null
                }
                if (a.id === "button-shape" && a.tagName === "yt-button-shape".toUpperCase() && ((h = a.parentElement) == null ? void 0 : h.tagName) === "ytd-menu-renderer".toUpperCase() && ((y = a.parentElement) != null && y.classList.contains("ytd-watch-metadata")))
                    return a;
                if (a.tagName === "ytd-comment-view-model".toUpperCase()) {
                    const b = a.querySelector(Fc);
                    return b || null
                }
                return null
            }
            )();
            c && uo(c, r)
        }
        ),
        r.onNodeChange( (o, a, c) => {
            if (c && c.matches(yu) && a.attributeName === "style") {
                const h = c.getAttribute(Q.dropdownVisible) === "true"
                  , y = c.style.display !== "none";
                c.setAttribute(Q.dropdownVisible, y.toString()),
                !h && y && bu(c, r);
                return
            }
        }
        ),
        document.querySelectorAll(Uc).forEach(o => {
            uo(o, r)
        }
        ),
        r.onIntervalChange( () => {
            document.querySelectorAll(Uc).forEach(o => {
                uo(o, r)
            }
            )
        }
        )
    }
    function bu(r, o) {
        if (!r)
            return console.warn("[dropdown] triggered dropdown visible but the dropdown does not exist");
        if (!vu)
            return console.warn("[dropdown] dropdown is visible but has no content selected");
        mu || (r.hasAttribute(Q.dropdownContent) || r.setAttribute(Q.dropdownContent, ""),
        Ep(r, o.localExtStorage.extensionEnabled, o))
    }
    function Ep(r, o=!0, a) {
        var k;
        if (!r || !ut)
            return;
        if (!o || !a.localExtStorage.showBlockOptionOnThreeDotsDropdown) {
            r.querySelectorAll(`.${ge.dropdownButton}`).forEach(_ => {
                _.remove()
            }
            );
            return
        }
        console.log("[dropdown] content dropdown", r);
        const c = r.querySelector("#items, .ytContextualSheetLayoutContentContainer yt-list-view-model")
          , h = r.querySelector("ytd-menu-popup-renderer");
        if (console.log("[dropdown] list", c, h),
        !c || (( () => {
            const _ = Z => {
                ut.id ? Z.classList.remove(ge.hide) : Z.classList.add(ge.hide)
            }
            ;
            let O = c.querySelector(`#${gs.contentBlockIdButton}`);
            if (O)
                return _(O);
            O = document.createElement("button"),
            O.classList.add(ge.dropdownButton),
            O.id = gs.contentBlockIdButton,
            O.innerHTML = `
			<img src="${gt.runtime.getURL("/icon/128.png")}">
			<span>${be("BlockUnblockContent")}</span>
		`,
            O.addEventListener("click", Z => {
                et() || (document.body.click(),
                xp(a))
            }
            ),
            _(O),
            c.insertAdjacentElement("beforeend", O),
            xs = O
        }
        )(),
        ( () => {
            const _ = Z => {
                ut.channel && (ut.channel.name || ut.channel.handle) ? Z.classList.remove(ge.hide) : Z.classList.add(ge.hide)
            }
            ;
            let O = c.querySelector(`#${gs.contentBlockChannelButton}`);
            if (O)
                return _(O);
            O = document.createElement("button"),
            O.classList.add(ge.dropdownButton),
            O.id = gs.contentBlockChannelButton,
            O.innerHTML = `
			<img src="${gt.runtime.getURL("/icon/128.png")}">
			<span>${be("BlockUnblockChannel")}</span>
		`,
            O.addEventListener("click", Z => {
                et() || (document.body.click(),
                Tp(a))
            }
            ),
            _(O),
            c.insertAdjacentElement("beforeend", O),
            Ts = O
        }
        )(),
        !h))
            return;
        const y = parseInt(((k = h.style.maxHeight.match(/(\d+)px/)) == null ? void 0 : k.at(1)) || "") || 0
          , b = c.getBoundingClientRect().height;
        b > y && (h.style.maxHeight = `${b}px`)
    }
    function xp(r) {
        if (!(ut != null && ut.id) || !Bi)
            return alert(be("SomethingWentWrong"));
        if (!ep(ut.id, r.localExtStorage)) {
            const o = "shorts"in ut && ut.shorts;
            Kt("blockContent", {
                contentId: ut.id,
                contentType: Bi,
                isShorts: o
            });
            return
        }
        r.askPassword().then( () => {
            !(ut != null && ut.id) || !Bi || Kt("unblockContent", {
                contentId: ut.id,
                contentType: Bi
            })
        }
        ).catch(o => {}
        )
    }
    function Tp(r) {
        const o = () => ut ? !!(ut.channel.name || ut.channel.handle) : !1;
        if (!o())
            return alert(be("SomethingWentWrong"));
        const a = c => {
            const h = [r.localExtStorage.blockedChannels, r.localExtStorage.blockedVideoChannels, r.localExtStorage.blockedCommentUsers, r.localExtStorage.blockedPostChannels, r.localExtStorage.blockedPlaylistChannels];
            return Hh(c, h.filter(y => !!y).join(`
`))
        }
        ;
        if (!a(ut.channel)) {
            Kt("blockChannel", ut.channel);
            return
        }
        r.askPassword().then( () => {
            o() && (a(ut.channel) || Kt("unblockChannel", ut.channel))
        }
        ).catch(c => {}
        )
    }
    function uo(r, o) {
        if (r.hasAttribute(Q.dropdownButton))
            return;
        r.setAttribute(Q.dropdownButton, "");
        const c = document.querySelector(Wc) === r;
        r.addEventListener("click", h => {
            if (et())
                return;
            const y = c ? document.querySelector("ytd-watch-metadata") : Pn(r).parents(`[${Q.elementId}]`)[0];
            if (!y) {
                vu = null,
                ut = null,
                Bi = null,
                xs == null || xs.remove(),
                Ts == null || Ts.remove();
                return
            }
            const b = ( () => {
                if (c)
                    return;
                const _ = y.getAttribute(Q.elementId);
                return o.videos.elements.get(_) || o.comments.elements.get(_) || o.posts.elements.get(_)
            }
            )()
              , k = ( () => {
                if (c) {
                    const _ = Nc();
                    return _ && o.videos.byId.get(_) || null
                }
                return (b == null ? void 0 : b.info) || null
            }
            )();
            vu = y,
            ut = k,
            Bi = c ? "video" : y.getAttribute(Q.contentType),
            mu = !1,
            clearTimeout(Vc),
            Vc = setTimeout( () => {
                mu = !0
            }
            , _p)
        }
        )
    }
    const Ip = "M6 .5a5.5 5.5 0 100 11 5.5 5.5 0 000-11Zm.27 2.045.906 1.837 2.027.295a.3.3 0 01.166.511l-1.467 1.43.346 2.019a.3.3 0 01-.435.316L6 8l-1.813.953a.3.3 0 01-.435-.316l.346-2.019-1.467-1.43a.3.3 0 01.166-.511l2.027-.295.907-1.837a.3.3 0 01.539 0Z";
    Tr.extend(Ti);
    function lo() {
        return {
            id: "",
            title: "",
            url: "",
            description: "",
            tags: [],
            playlistId: "",
            publishedAt: 0,
            categoryId: "",
            duration: 0,
            viewCount: null,
            live: !1,
            premiere: !1,
            shorts: !1,
            ageRestricted: !1,
            membersOnly: !1,
            languages: [],
            channel: Jr(),
            page: void 0,
            progress: null
        }
    }
    function Jr() {
        return {
            name: "",
            handle: "",
            url: "",
            id: "",
            verified: !1
        }
    }
    const Is = ".ytp-videowall-still"
      , wu = ".ytp-ce-video"
      , Cu = ["ytd-rich-grid-slim-media", "ytd-reel-item-renderer", "ytm-shorts-lockup-view-model"]
      , jc = ["ytd-rich-grid-media", "ytd-video-renderer", "ytd-compact-video-renderer", "ytd-grid-video-renderer", Is, wu, ...Cu, "yt-lockup-view-model", "ytd-playlist-video-renderer", "ytd-playlist-panel-video-renderer"]
      , Kc = "yt-badge-span"
      , on = "video";
    let co = null
      , Su = !1;
    const Bp = "div.yt-lockup-view-model__metadata"
      , zc = "yt-lockup-metadata-view-model"
      , Au = "ytb-missing-metadata-reference-id";
    function Lp(r) {
        const o = () => {
            document.querySelectorAll(jc.join(", ")).forEach(a => {
                Kn(a, r)
            }
            )
        }
        ;
        o(),
        r.onNodeAdded( (a, c) => {
            var h;
            if (c) {
                if (c.matches("yt-thumbnail-badge-view-model")) {
                    const b = Pn(c).parents(`[${Q.elementId}][${Q.contentType}="${on}"]`)[0];
                    if (!b)
                        return;
                    Kn(b, r)
                }
                if (c.matches("video")) {
                    Gc();
                    return
                }
                if (jc.some(y => c.matches(y))) {
                    Kn(c, r);
                    return
                }
                if ((c.classList.contains("yt-lockup-view-model--vertical") || c.classList.contains("yt-lockup-view-model--horizontal")) && ((h = c.parentElement) == null ? void 0 : h.tagName.toLowerCase()) === Ei) {
                    Kn(c.parentElement, r);
                    return
                }
                if (c.matches("grid-shelf-view-model, .ytGridShelfViewModelGridShelfRow, .ytGridShelfViewModelGridShelfItem")) {
                    const y = c.querySelectorAll("ytm-shorts-lockup-view-model");
                    y.length && y.forEach(b => Kn(b, r))
                }
            }
        }
        ),
        r.onNodeChange( (a, c, h) => {
            if (!h)
                return;
            if (h.hasAttribute(Au) && c.type === "childList" && c.addedNodes.length > 0 && c.addedNodes[0]instanceof HTMLElement && c.addedNodes[0].matches(zc)) {
                const Z = h.getAttribute(Au)
                  , ue = r.videos.elements.get(Z);
                ue != null && ue.element && Kn(ue == null ? void 0 : ue.element, r);
                return
            }
            if (h.matches("yt-lockup-view-model") && c.type === "childList" && c.addedNodes.length > 0 && c.addedNodes[0]instanceof HTMLElement && c.addedNodes[0].matches(".yt-lockup-view-model-wiz")) {
                Kn(h, r);
                return
            }
            if (h.matches(Is) && c.attributeName === "aria-label") {
                Kn(h, r);
                return
            }
            const y = () => h.matches("ytd-thumbnail-overlay-time-status-renderer") ? !0 : !(c.attributeName !== "href" || !h.matches("a#video-title-link, a.yt-lockup-metadata-view-model-wiz__title, a#video-title, a.ytd-reel-item-renderer, a.ytd-compact-video-renderer, a.ytd-playlist-panel-video-renderer"))
              , b = () => h.matches(".cbCustomTitle") ? !0 : c.attributeName !== "style" ? !1 : h.matches("#video-title")
              , k = () => !(!h.hasAttribute(Kc) || c.type !== "childList" || !h.querySelector("svg"));
            if (!y() && !b() && !k())
                return;
            const O = Pn(h).parents(`[${Q.elementId}][${Q.contentType}="${on}"]`)[0];
            O && Kn(O, r)
        }
        ),
        r.onStorageChange(o),
        r.onIntervalChange( () => {
            Gc(),
            o()
        }
        ),
        r.onVideoAPIDataChange(o),
        r.onPageChange(o)
    }
    function Gc() {
        if (co)
            return;
        const r = document.querySelector("ytd-video-preview video");
        r && (co = r,
        Bs(),
        co.addEventListener("play", o => {
            et() || Bs()
        }
        ))
    }
    function Bs() {
        var r, o;
        co && (Su ? (co.pause(),
        (r = document.querySelector("ytd-video-preview")) == null || r.classList.add(ge.hide)) : (o = document.querySelector("ytd-video-preview")) == null || o.classList.remove(ge.hide))
    }
    function Kn(r, o) {
        var W, D, he, J, Oe, Te, Re, Ie, me;
        if (r.matches("ytd-playlist-panel-video-renderer.dragging"))
            return;
        let c = r.getAttribute(Q.elementId) || "";
        if (r.matches("ytd-rich-grid-media") && !!r.querySelector("ytd-playlist-thumbnail:not([hidden])") || r.querySelector("yt-collection-thumbnail-view-model")) {
            if (r.getAttribute(Q.contentType) === "video") {
                r.removeAttribute(Q.elementId),
                r.removeAttribute(Q.contentType);
                const l = [...r.querySelectorAll(`.${ge.channelBlockButton}`)].filter(R => !!R);
                for (const R of l)
                    if (R == null || R.remove(),
                    (W = r.querySelector(`[${Q.hasChannelBlockButton}]`)) == null || W.removeAttribute(Q.hasChannelBlockButton),
                    c) {
                        const j = o.videos.elements.get(c);
                        (D = j == null ? void 0 : j.overlay) == null || D.remove(),
                        (he = j == null ? void 0 : j.revealButton) == null || he.remove(),
                        o.videos.elements.delete(c)
                    }
            }
            return
        }
        if (!c) {
            c = Ai(),
            r.setAttribute(Q.elementId, c),
            r.setAttribute(Q.contentType, on),
            o.videos.elements.set(c, {
                id: c,
                element: r,
                blocked: !1,
                blockedReason: "",
                blockedId: "",
                overlay: null,
                revealButton: null,
                info: lo()
            });
            const l = () => {
                const R = o.videos.elements.get(c);
                return !(!R || !R.blocked || !R.overlay)
            }
            ;
            r.addEventListener("mouseenter", R => {
                et() || o.videos.elements.has(c) && l() && (Su = !0,
                Bs())
            }
            ),
            r.addEventListener("mouseleave", R => {
                et() || o.videos.elements.has(c) && l() && (Su = !1,
                Bs())
            }
            ),
            r.querySelector(zc) || (J = r.querySelector(Bp)) == null || J.setAttribute(Au, c)
        }
        const y = o.videos.elements.get(c);
        if (r.tagName.toLowerCase() === "ytm-shorts-lockup-view-model" || r.tagName.toLowerCase() === "yt-lockup-view-model" && (((Oe = r.parentElement) == null ? void 0 : Oe.id) === "content" || ((Te = r.parentElement) == null ? void 0 : Te.id) === "contents")) {
            const l = r.querySelector("yt-lockup-metadata-view-model .yt-lockup-metadata-view-model__menu-button button, .shortsLockupViewModelHostOutsideMetadataMenu button");
            l && uo(l, o)
        }
        if (!y)
            return;
        y.info = Yc(r, o);
        const b = r.matches(Is)
          , k = r.matches(wu);
        ( () => {
            if (!o.localExtStorage.addBlockChannelButton || !o.localExtStorage.extensionEnabled)
                return;
            const l = [...r.querySelectorAll("#channel-info ytd-channel-name"), ...r.querySelectorAll("ytd-channel-name")].filter(R => !!R);
            if (r.matches("yt-lockup-view-model")) {
                let R = r.querySelector("yt-content-metadata-view-model .yt-content-metadata-view-model-wiz__metadata-row, yt-content-metadata-view-model .yt-content-metadata-view-model__metadata-row");
                R && l.push(R)
            }
            if (l.length)
                for (const R of l) {
                    if (R.hasAttribute(Q.hasChannelBlockButton))
                        return;
                    const j = _i(o.localExtStorage.biggerChannelBlockButton);
                    R.insertAdjacentElement("beforeend", j),
                    R.setAttribute(Q.hasChannelBlockButton, "true"),
                    o.localExtStorage.showBlockChannelButtonOnHover ? R.removeAttribute(Q.alwaysShowChannelBlockButton) : R.setAttribute(Q.alwaysShowChannelBlockButton, "true"),
                    j.addEventListener("click", Y => {
                        et() || ki(Y, y.info.channel, o.localExtStorage.askConfirmationOnChannelBlockButton)
                    }
                    )
                }
        }
        )(),
        y.info.id && (o.addVideoToAPIQueue(y.info.id),
        o.videos.byId.set(y.info.id, y.info),
        o.localExtStorage.DEV_skipCacheFetch || kc(y.info.id, l => {
            et() || Kn(r, o)
        }
        , {
            maxAttempt: 3,
            delayPerAttemptInMs: [0, 500]
        }).catch(l => {
            console.log("error fetching video data:", y.info.id, y, r, l)
        }
        )),
        y.info.title && o.videos.byTitle.set(y.info.title, y.info);
        const _ = fo(y.info, o.localExtStorage);
        if (!( () => {
            var l;
            return !!_ != !!y.blockedReason || (_ == null ? void 0 : _.reason) !== y.blockedReason || y.info.id !== y.blockedId || ((l = Ls(r)) == null ? void 0 : l.classList.contains(ge.hide)) === (o.localExtStorage.showOverlays && o.localExtStorage.showOverlaysForVideos)
        }
        )())
            return;
        const Z = y.overlay
          , ue = y.revealButton;
        if (!_) {
            r.removeAttribute(Q.blocked),
            y.blocked = !1,
            y.blockedReason = "",
            y.blockedId = "",
            y.overlay = null,
            y.revealButton = null,
            (Re = Ls(r)) == null || Re.classList.remove(ge.hide),
            Z == null || Z.remove(),
            ue == null || ue.remove(),
            o.removeFromBlockList(y.info.id, "video");
            return
        }
        r.setAttribute(Q.blocked, ""),
        y.blocked = !0;
        const pe = _.reason !== y.blockedReason;
        y.blockedReason = _.reason;
        const G = y.blockedId !== y.info.id;
        if (y.blockedId = y.info.id,
        o.addToBlockList(y.info.id, y.info, "video"),
        o.localExtStorage.showOverlays && o.localExtStorage.showOverlaysForVideos && !b && !k)
            if ((Ie = Ls(r)) == null || Ie.classList.remove(ge.hide),
            Z)
                jn(Z, _, o),
                Z.getAttribute(Q.overlayHidden) === "true" && (pe || G) && ue.click();
            else {
                const l = so(r, _, o, lu(r));
                y.overlay = l.overlay,
                y.revealButton = l.revealButton
            }
        else
            (me = Ls(r)) == null || me.classList.add(ge.hide)
    }
    function Yc(r, o) {
        const a = !!document.querySelector(`ytd-browse[page-subtype="channels"][role="main"] [${Q.elementId}="${r.getAttribute(Q.elementId)}"]`)
          , c = r.matches(Cu.join(", "))
          , h = r.matches("ytd-playlist-panel-video-renderer")
          , y = r.matches(Is)
          , b = r.matches(wu)
          , k = c ? r.querySelector("#details a, a.ShortsLockupViewModelHostEndpoint, a.shortsLockupViewModelHostEndpoint") : y ? r : b ? r.querySelector("a") : r.querySelector("a#video-title-link, a#video-title, a#wc-endpoint, .metadata a, a.yt-lockup-metadata-view-model-wiz__title, a.yt-lockup-metadata-view-model__title")
          , _ = [...r.querySelectorAll(["#video-title", 'a.yt-lockup-metadata-view-model-wiz__title span[role="text"]', "#meta span#video-title", ".ytp-videowall-still-info-title", ".ytp-ce-video-title", 'a.ShortsLockupViewModelHostEndpoint span[role="text"]', 'a.shortsLockupViewModelHostEndpoint span[role="text"]', "a.yt-lockup-metadata-view-model__title"].join(", "))]
          , O = a ? null : h ? r.querySelector("#meta #byline-container #byline") : r.querySelector(".ytd-channel-name a, yt-content-metadata-view-model a") || r.querySelector('div.yt-content-metadata-view-model-wiz__metadata-row span[role="text"], div.yt-content-metadata-view-model__metadata-row span[role="text"]') || r.querySelector(".ytd-channel-name yt-formatted-string")
          , Z = (k == null ? void 0 : k.href) || ""
          , ue = Cn(Z)
          , pe = Zr(Z)
          , G = o == null ? void 0 : o.videos.apiDatas.get(ue)
          , W = o == null ? void 0 : o.videos.byId.get(ue)
          , D = As(ue)
          , he = ( () => {
            var ce;
            let re = "";
            for (const _e of _)
                if (_e.style.display !== "none" && (re = ((ce = _e.textContent) == null ? void 0 : ce.trim()) || "",
                re))
                    break;
            return re = re.replace(/  /g, " ").trim(),
            re || (D == null ? void 0 : D.title) || (G == null ? void 0 : G.title) || (W == null ? void 0 : W.title) || ""
        }
        )()
          , J = !!(c || r.querySelector('[overlay-style="SHORTS"]') || Z.includes("/shorts/"))
          , Oe = !!r.querySelector("ytd-thumbnail[is-live-video], .badge-shape-wiz--thumbnail-live, badge-shape.yt-badge-shape--thumbnail-live") || !!(D != null && D.isLive)
          , Te = ( () => {
            if (J)
                return 0;
            const re = r.querySelector("ytd-thumbnail-overlay-time-status-renderer #time-status #text, .ytp-ce-video-duration, yt-thumbnail-badge-view-model badge-shape, yt-thumbnail-overlay-badge-view-model badge-shape");
            if (!re || !re.textContent)
                return 0;
            const ce = re.textContent.trim();
            return Ps(ce)
        }
        )() || (D == null ? void 0 : D.durationInSeconds) || (G == null ? void 0 : G.duration) || (W == null ? void 0 : W.duration) || 0
          , Re = !!r.querySelector('[overlay-style="UPCOMING"]') || !!r.querySelector("lockup-attachments-view-model toggle-button-view-model") || !!(D != null && D.isPremiere) || !!(G != null && G.isPremiere) && Te === 0
          , Ie = ( () => {
            var _e, He, Ze, tt;
            if (D != null && D.description)
                return D.description;
            if (G != null && G.description)
                return G.description;
            const re = W == null ? void 0 : W.description
              , ce = ((He = (_e = r.querySelector(".metadata-snippet-text")) == null ? void 0 : _e.textContent) == null ? void 0 : He.trim()) || ((tt = (Ze = r.querySelector("#description-text")) == null ? void 0 : Ze.textContent) == null ? void 0 : tt.trim()) || "";
            return re && re.length > ce.length ? re : ce
        }
        )()
          , me = ( () => {
            var ce, _e, He, Ze, tt;
            if (D != null && D.author)
                return D.author;
            let re = "";
            if (a)
                re = ((_e = (ce = document.querySelector("#channel-header-container ytd-channel-name yt-formatted-string")) == null ? void 0 : ce.textContent) == null ? void 0 : _e.trim()) || "";
            else if (y) {
                const ot = r.querySelector(".ytp-videowall-still-info-author");
                re = ((He = ot == null ? void 0 : ot.textContent) == null ? void 0 : He.split(" • ")[0]) || ""
            } else
                re = ((Ze = O == null ? void 0 : O.textContent) == null ? void 0 : Ze.trim()) || "";
            return re || (G == null ? void 0 : G.channelTitle) || ((tt = W == null ? void 0 : W.channel) == null ? void 0 : tt.name) || ""
        }
        )().replace(/[\r\n]/g, " ").trim()
          , l = ( () => {
            var ce;
            let re = ((O == null ? void 0 : O.href) ?? "") || "";
            return !re && a && (re = location.href.replace(/(\/@[^?/]+|\/(channel|c)\/.+)\/.+/, "$1")),
            re || ((ce = W == null ? void 0 : W.channel) == null ? void 0 : ce.url) || ""
        }
        )()
          , R = ( () => {
            var ce, _e, He;
            let re = Xr(l) || "";
            return !re && a && (re = ((_e = (ce = document.querySelector("#channel-header-container #channel-handle")) == null ? void 0 : ce.textContent) == null ? void 0 : _e.trim()) || ""),
            re || ((He = W == null ? void 0 : W.channel) == null ? void 0 : He.handle) || (o == null ? void 0 : o.channels.handleByName.get(me)) || ""
        }
        )();
        o && me && R && !o.channels.handleByName.has(me) && o.channels.handleByName.set(me, R);
        const j = ( () => {
            var ce;
            if (G != null && G.channelId)
                return G.channelId;
            if (D != null && D.channelId)
                return D.channelId;
            if ((ce = W == null ? void 0 : W.channel) != null && ce.id)
                return W.channel.id;
            const re = xr(l);
            return re || ""
        }
        )()
          , Y = ( () => {
            let re = r.querySelector("ytd-channel-name ytd-badge-supported-renderer");
            return !re && a && (re = document.querySelector("#channel-header-container ytd-badge-supported-renderer")),
            !!(re && !re.hasAttribute("hidden"))
        }
        )()
          , z = ( () => {
            if (!!r.querySelector(".badge.badge-style-type-members-only, badge-shape.yt-badge-shape--membership"))
                return !0;
            const ce = r.querySelectorAll("yt-content-metadata-view-model badge-shape");
            return !ce || !ce.length ? !1 : [...ce].some(_e => {
                var ot;
                const He = _e.querySelector("span");
                if (He && He.setAttribute(Kc, ""),
                _e.hasAttribute("hidden") || (ot = _e.parentElement) != null && ot.hasAttribute("hidden"))
                    return !1;
                const Ze = _e.querySelector("svg path");
                if (!Ze)
                    return !1;
                const tt = Ze.getAttribute("d");
                return tt && tt === Ip ? (r.setAttribute("ytb-members-only", ""),
                !0) : !1
            }
            )
        }
        )()
          , de = D != null && D.isAgeRestricted ? !0 : G && "ageRestricted"in G && G.ageRestricted ? G.ageRestricted : !1
          , N = D != null && D.viewCount ? D.viewCount : G && "viewCount"in G && G.viewCount ? G.viewCount : null
          , V = D != null && D.publishedTimestamp ? D.publishedTimestamp : W != null && W.publishedAt ? W.publishedAt : G && "publishedAt"in G && G.publishedAt ? G.publishedAt : 0
          , q = D != null && D.categoryId ? D.categoryId : G != null && G.categoryId ? G.categoryId : W != null && W.categoryId ? W.categoryId : ""
          , K = D != null && D.tags ? D.tags : G != null && G.tags ? G.tags : W != null && W.tags ? W.tags : [];
        let te = [(G == null ? void 0 : G.defaultLanguage) || "", (G == null ? void 0 : G.defaultAudioLanguage) || "", (D == null ? void 0 : D.languageCode) || ""].filter(Boolean);
        W != null && W.languages && W.languages.length > te.length && (te = W.languages);
        const ae = ( () => {
            const re = r.querySelector("#progress, .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment");
            if (!re)
                return null;
            const ce = re.style.width;
            if (!ce)
                return null;
            const _e = ce.replace("%", "")
              , He = parseFloat(_e);
            return isNaN(He) ? null : He / 100
        }
        )();
        return {
            id: ue,
            title: he,
            url: ho(ue, J),
            description: Ie,
            shorts: J,
            tags: K,
            playlistId: pe,
            publishedAt: V,
            categoryId: q,
            live: Oe,
            premiere: Re,
            ageRestricted: de,
            duration: Te,
            membersOnly: z,
            progress: ae,
            viewCount: N,
            languages: te,
            channel: {
                name: me,
                handle: R,
                url: l,
                id: j,
                verified: Y
            },
            page: o == null ? void 0 : o.activePageId
        }
    }
    function fo(r, o) {
        if (!o.extensionEnabled || o.ignorePlaylistVideos && r.playlistId || o.ignoreWatchLaterPlaylist && r.playlistId === "WL")
            return;
        let a = "";
        const c = ro(r.channel);
        if (a = Ae.match(c, r, on, xe.whitelistChannels, {
            caseSensitive: o.whitelistChannelsCaseSensitive,
            exactMatch: o.whitelistChannelsExactMatch
        }),
        !a && !(r.title && (a = Ae.match(r.title, r, on, xe.whitelistContents, {
            caseSensitive: o.whitelistedContentKeywordCaseSensitive,
            wordBoundary: o.whitelistedContentKeywordWordBound
        }),
        a))) {
            if (r.progress && o.blockedVideoWatchProgressPercent && r.progress >= o.blockedVideoWatchProgressPercent)
                return {
                    optionId: "block_watch_progress",
                    reason: be("BlockReasonVideoWatchProgress")
                };
            if (r.publishedAt && o.blockedDateRanges.length)
                for (let h = 0; h < o.blockedDateRanges.length; h++) {
                    const [y,b] = o.blockedDateRanges[h]
                      , k = y || 0
                      , _ = b ? b + 86399999 : Date.now();
                    if (r.publishedAt >= k && r.publishedAt <= _) {
                        let O = !1;
                        const Z = !y && b ? (O = !0,
                        be("BlockReasonBlockedDateRangeToEnd", new Date(b).toLocaleDateString())) : y && !b ? be("BlockReasonBlockedDateRangeFromStart", new Date(y).toLocaleDateString()) : be("BlockReasonBlockedDateRangeBetween", new Date(y).toLocaleDateString(), new Date(b).toLocaleDateString());
                        return {
                            optionId: "block_date_range_" + h + (O ? "_end" : ""),
                            reason: Z
                        }
                    }
                }
            if (r.languages.length) {
                const h = gp(r.languages);
                if (h)
                    return {
                        optionId: "block_languages",
                        reason: `Blocked language: ${pp(h)}`
                    }
            }
            if (o.blockAgeRestrictedVideos && r.ageRestricted)
                return {
                    optionId: "block_age_restricted_videos",
                    reason: be("BlockReasonAgeRestricted")
                };
            if (o.blockMembersOnlyVideos && r.membersOnly)
                return {
                    optionId: "block_members_only_videos",
                    reason: be("BlockReasonMembersOnly")
                };
            if (a = Ae.match(c, r, on, xe.videoChannels, {
                caseSensitive: o.blockedVideoChannelsCaseSensitive,
                exactMatch: o.blockedVideoChannelsExactMatch
            }),
            a)
                return {
                    optionId: "block_video_channels",
                    reason: be("BlockReasonVideoChannel") + " " + r.channel.name + (a !== r.channel.name ? ` (${a})` : ""),
                    channel: c.some(h => h.toLowerCase() === a.toLowerCase()) ? r.channel : void 0
                };
            if (a = Ae.match(c, r, on, xe.channels, {
                caseSensitive: o.blockedChannelsCaseSensitive,
                exactMatch: o.blockedChannelsExactMatch
            }),
            a)
                return {
                    optionId: "block_channels",
                    reason: be("BlockReasonChannel") + " " + r.channel.name + (a !== r.channel.name ? ` (${a})` : ""),
                    channel: c.some(h => h.toLowerCase() === a.toLowerCase()) ? r.channel : void 0
                };
            if (r.id && (a = Ae.match(r.id, r, on, xe.videos, {
                customMatch: (h, y) => {
                    const b = Cn(y.str || "") || y.str;
                    return r.id === b ? y.str : ""
                }
            })),
            a)
                return {
                    optionId: "block_videos",
                    reason: be("BlockReasonSpecificVideo") + " " + r.id + (r.id !== a ? ` (${a})` : ""),
                    content: {
                        id: r.id,
                        type: on,
                        isShortsVideo: r.shorts
                    }
                };
            if (r.shorts && o.blockShorts)
                return {
                    optionId: "block_shorts",
                    reason: be("BlockReasonShorts")
                };
            if (r.live && o.blockLive)
                return {
                    optionId: "block_live",
                    reason: be("BlockReasonLive")
                };
            if (r.premiere && o.blockPremiere)
                return {
                    optionId: "block_premiere",
                    reason: be("BlockReasonPremiere")
                };
            if (r.categoryId && o.blockedCategories.includes(r.categoryId))
                return {
                    optionId: "categories",
                    reason: `${be("BlockReasonCategory")} ${be(`Category${r.categoryId}`) || ys[r.categoryId]}`
                };
            if (Xc(r.duration, o.blockedVideoDuration))
                return {
                    optionId: "video_max_duration",
                    reason: be("BlockReasonDuration", o.blockedVideoDuration)
                };
            if (Zc(r.duration, o.blockedVideoMinDuration, r.shorts))
                return {
                    optionId: "video_min_duration",
                    reason: be("BlockReasonMinDuration", o.blockedVideoMinDuration)
                };
            if (Qc(r.publishedAt, o.blockedVideoMaxOlder))
                return {
                    optionId: "video_max_older",
                    reason: be("BlockReasonVideoOlder", o.blockedVideoMaxOlder)
                };
            if (Jc(r.publishedAt, o.blockedVideoMaxNewer))
                return {
                    optionId: "video_max_newer",
                    reason: be("BlockReasonVideoNewer", o.blockedVideoMaxNewer)
                };
            if (r.viewCount !== null && o.blockedVideoMaxViews && r.viewCount >= o.blockedVideoMaxViews)
                return {
                    optionId: "video_max_view_count",
                    reason: be("BlockReasonVideoMaxViews", o.blockedVideoMaxViews, new Intl.NumberFormat().format(o.blockedVideoMaxViews))
                };
            if (r.viewCount !== null && o.blockedVideoMinViews && r.viewCount <= o.blockedVideoMinViews)
                return {
                    optionId: "video_min_view_count",
                    reason: be("BlockReasonVideoMinViews", o.blockedVideoMinViews, new Intl.NumberFormat().format(o.blockedVideoMinViews))
                };
            if (r.title && (a = Ae.match(r.title, r, on, xe.titles, {
                caseSensitive: o.blockedTitlesCaseSensitive,
                wordBoundary: o.blockedTitlesWordBound
            })),
            a)
                return {
                    optionId: "block_titles",
                    reason: `${be("BlockReasonTitle")} ` + a
                };
            if (r.title && (a = Ae.match(r.title, r, on, xe.contents, {
                caseSensitive: o.blockedContentKeywordCaseSensitive,
                wordBoundary: o.blockedContentKeywordWordBound
            })),
            a)
                return {
                    optionId: "block_content",
                    reason: `${be("BlockReasonTitle")} ` + a
                };
            if (r.description && (a = Ae.match(r.description, r, on, xe.descriptions, {
                caseSensitive: o.blockedDescriptionsCaseSensitive,
                wordBoundary: o.blockedDescriptionsWordBound
            })),
            a)
                return {
                    optionId: "block_descriptions",
                    reason: `${be("BlockReasonDescription")} ` + a
                };
            if (r.tags && r.tags.length && (a = Ae.match(r.tags, r, on, xe.tags, {
                exactMatch: !0
            })),
            a)
                return {
                    optionId: "block_tags",
                    reason: `${be("BlockReasonTag")} ` + a
                }
        }
    }
    function Ls(r) {
        var a, c, h, y, b, k;
        if (r.matches(Cu.join(", "))) {
            const _ = (a = r.parentElement) == null ? void 0 : a.parentElement;
            return _ && _.classList.contains("ytGridShelfViewModelGridShelfItem") ? _ : _ && _.id === "items" ? r.parentElement : (h = (c = r.parentElement) == null ? void 0 : c.parentElement) == null ? void 0 : h.parentElement
        }
        const o = r.tagName.toLowerCase();
        if (o === "ytd-video-renderer" && r.classList.contains("ytd-expanded-shelf-contents-renderer")) {
            const _ = Pn(r).parents("ytd-item-section-renderer")[0];
            if (!_.querySelector("#top-level-buttons-computed"))
                return _
        }
        return o === "ytd-rich-grid-media" ? (y = r.parentElement) == null ? void 0 : y.parentElement : o === "yt-lockup-view-model" && ((b = r.parentElement) == null ? void 0 : b.id) === "content" ? (k = r.parentElement) == null ? void 0 : k.parentElement : r
    }
    function Pp(r) {
        return r.replace(/&.+/, "")
    }
    function ho(r, o=!1) {
        return r ? o ? `https://www.youtube.com/shorts/${r}` : `https://www.youtube.com/watch?v=${r}` : ""
    }
    function Cn(r) {
        if (!r)
            return "";
        r = decodeURI(r);
        const o = r.match(/^https?:\/\/(?:(?:www|m)\.)?youtube\.com\/shorts\/([A-Za-z0-9_-]{11})(?:\?.*|$)/) || r.match(/^https?:\/\/(?:(?:www|m)\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})(?:&.*|$)/) || r.match(/^https?:\/\/youtube\.be\/([A-Za-z0-9_-]{11})(?:\?.*|$)/);
        return o ? o[1] : ""
    }
    function Ps(r) {
        if (!r)
            return 0;
        const o = r.trim().match(/^(?:(\d+):)?(\d+):(\d+)$/);
        if (!o)
            return 0;
        const a = o[1] ? parseInt(o[1]) : 0
          , c = parseInt(o[2])
          , h = parseInt(o[3]);
        return a * 3600 + c * 60 + h
    }
    function Xc(r, o) {
        return !r || !o || o < 0 ? !1 : r > o
    }
    function Zc(r, o, a=!1) {
        return !o || o < 0 ? !1 : a && o >= 180 ? !0 : r ? r < o : !1
    }
    function Qc(r, o) {
        if (!r || !o || o <= 0)
            return !1;
        const a = new Date;
        return a.setDate(a.getDate() - o),
        r < a.getTime()
    }
    function Jc(r, o) {
        if (!r || !o || o <= 0)
            return !1;
        const a = new Date;
        return a.setDate(a.getDate() - o),
        r > a.getTime()
    }
    Tr.extend(Ti);
    const qt = "ytd-miniplayer"
      , ef = "active"
      , tf = "has-playlist-data"
      , Mp = "data-tooltip-text"
      , nf = "data-preview"
      , _u = "a.ytp-next-button";
    let Ms = null, rf = {}, po = null, ei = !1, go = !1, yo = !1, mo = !1, vo = "", Os = "", Ir = "", zn, ku = "", Eu = "", bo = null;
    const Op = 5e3;
    function Rp(r) {
        no("urlChange", o => {
            if (!gu(o))
                return;
            const a = Cn(o);
            a && (Ir = a)
        }
        ),
        ( () => {
            const o = document.querySelector(qt);
            o && Rs(o, r)
        }
        )(),
        r.onNodeAdded( (o, a) => {
            var c;
            if (a && (a.matches(qt) && Rs(a, r),
            a.matches(_u) && af(a, r),
            a.matches("ytd-player") && ((c = a.parentElement) != null && c.matches(".ytd-miniplayer")))) {
                zn && Tu(a, zn, r);
                const h = a.querySelector("video");
                h && Hp(h)
            }
        }
        ),
        r.onNodeChange( (o, a, c) => {
            if (!c)
                return;
            if (!(!c.matches(qt) || !a.attributeName || ![ef, tf].includes(a.attributeName)) && Rs(c, r),
            !(!c.matches(_u) || !a.attributeName || a.attributeName !== nf) && af(c, r),
            c.matches(".miniplayer-title") && a.attributeName === "title") {
                const _ = document.querySelector(qt);
                _ && Rs(_, r)
            }
            const b = !!Pn(c).parents(qt)[0]
              , k = Pn(c).parents("ytd-playlist-panel-video-renderer")[0];
            c.matches("#action-buttons") && a.attributeName === "hidden" && !c.hasAttribute("hidden") && b && k && Dp(k, r)
        }
        ),
        r.onStorageChange(o => {
            po && Ns(r, po)
        }
        ),
        r.onVideoAPIDataChange( () => {
            po && Ns(r, po)
        }
        )
    }
    function Np() {
        if (!go)
            return !1;
        const o = Array.from(document.querySelectorAll(`${qt} ytd-playlist-panel-video-renderer`)).at(-1);
        return !(!o || !o.querySelector("#action-buttons:not([hidden])"))
    }
    function of(r) {
        sf(r) && (bo && $p(),
        bo = setTimeout( () => {
            if (!sf(r))
                return;
            const o = document.querySelector(`${qt} ${_u}`);
            if (!o) {
                console.log("could not find next button to skip video.");
                return
            }
            o.click()
        }
        , Op))
    }
    function $p() {
        bo && (clearTimeout(bo),
        bo = null)
    }
    function sf(r) {
        return !(!ei || !go || !zn || Np() || !r.localExtStorage.autoSkipBlockedVideos)
    }
    function Rs(r, o) {
        var _;
        go = r.hasAttribute(tf);
        const a = r.hasAttribute(ef)
          , c = ei !== a;
        if (c) {
            ei = a;
            const O = document.querySelector(`${qt} ytd-player .${ge.overlay}, #player ytd-player .${ge.overlay}, #full-bleed-container ytd-player .${ge.overlay}`);
            O && zn && Tu(O.parentElement, zn, o)
        }
        const h = ((_ = r.querySelector(".miniplayer-title")) == null ? void 0 : _.getAttribute("title")) || ""
          , y = vo !== h;
        if (y) {
            const O = vo;
            vo = h,
            qp(O, o)
        }
        const b = !!r.querySelector(".ytp-offline-slate-buttons button")
          , k = !!r.querySelector(".ytp-time-display.ytp-live") && !b;
        (yo !== k || mo !== b) && (yo = k,
        mo = b,
        xu(o)),
        !y && c && ei && xu(o),
        ei || (Os = ""),
        of(o)
    }
    function qp(r, o) {
        go || xu(o)
    }
    function xu(r) {
        var k;
        let o = lo();
        const a = r.videos.byId.get(Ir)
          , c = r.videos.apiDatas.get(Ir)
          , h = As(Ir)
          , y = ((k = document.querySelector(`${qt} .ytp-time-duration`)) == null ? void 0 : k.textContent) || ""
          , b = () => yo || mo ? 0 : Ps(y);
        if (a || c) {
            const _ = ( () => {
                const Z = [(c == null ? void 0 : c.defaultLanguage) || "", (c == null ? void 0 : c.defaultAudioLanguage) || "", (h == null ? void 0 : h.languageCode) || ""].filter(Boolean);
                return a != null && a.languages && a.languages.length > Z.length ? a.languages : Z
            }
            )();
            o = {
                id: Ir,
                url: ho(Ir),
                title: (c == null ? void 0 : c.title) || (a == null ? void 0 : a.title) || "",
                description: (c == null ? void 0 : c.description) || (a == null ? void 0 : a.description) || "",
                duration: b() || (c == null ? void 0 : c.duration) || (a == null ? void 0 : a.duration) || 0,
                tags: (c == null ? void 0 : c.tags) || (a == null ? void 0 : a.tags) || [],
                categoryId: (c == null ? void 0 : c.categoryId) || (a == null ? void 0 : a.categoryId) || "",
                live: yo,
                premiere: mo,
                playlistId: "",
                publishedAt: (c == null ? void 0 : c.publishedAt) || (a == null ? void 0 : a.publishedAt) || 0,
                shorts: !1,
                membersOnly: !1,
                ageRestricted: (c == null ? void 0 : c.v) === 3 ? c.ageRestricted : !1,
                viewCount: (c == null ? void 0 : c.v) === 4 ? c.viewCount : null,
                languages: _,
                channel: {
                    name: ((c == null ? void 0 : c.channelTitle) || (a == null ? void 0 : a.channel.name) || "").replace(/[\r\n]/g, " ").trim(),
                    handle: (a == null ? void 0 : a.channel.name) || "",
                    url: (a == null ? void 0 : a.channel.url) || "",
                    id: (a == null ? void 0 : a.channel.id) || "",
                    verified: (a == null ? void 0 : a.channel.verified) || !1
                },
                page: r.activePageId,
                progress: null
            }
        } else {
            const _ = rf[vo] || {
                title: vo
            };
            o = {
                ...o,
                ..._,
                live: yo,
                premiere: mo
            }
        }
        Ir = "",
        Ns(r, o)
    }
    function Dp(r, o) {
        if (!go)
            return;
        Ir = "";
        const a = Yc(r, o);
        Ns(o, a)
    }
    function af(r, o) {
        var b;
        const c = ((b = (r.getAttribute(nf) || "").match(/\/vi\/(.+)\//)) == null ? void 0 : b.at(1)) || ""
          , h = r.getAttribute(Mp) || ""
          , y = ho(c);
        c && (Ms && Ms.id === c || (Ms = {
            id: c,
            url: y,
            title: h
        },
        o.addVideoToAPIQueue(c),
        rf[h] = Ms))
    }
    function Hp(r, o) {
        r.hasAttribute(Q.miniplayerVideo) || (r.setAttribute(Q.miniplayerVideo, ""),
        Os = r.src,
        r.addEventListener("play", a => {
            if (et())
                return;
            const c = Os !== r.src;
            if (Os = r.src,
            !ei || c || !zn)
                return;
            const h = document.querySelector(`${qt} ytd-player .${ge.overlay}`);
            h && h.getAttribute(Q.overlayHidden) === "false" && r.pause()
        }
        ))
    }
    function Tu(r, o, a) {
        let c = r.querySelector(`.${ge.overlay}`);
        r.classList.add(ge.relative),
        c ? (jn(c, o, a),
        c.setAttribute(Q.overlayHidden, "false")) : c = Cc(r, o, a),
        ei ? c.querySelector(".miniplayer-buttons").classList.remove(ge.hide) : c.querySelector(".miniplayer-buttons").classList.add(ge.hide),
        c.hasAttribute(Q.miniplayerOverlay) || (c.setAttribute(Q.miniplayerOverlay, ""),
        c.querySelector(".expand").addEventListener("click", h => {
            if (et())
                return;
            const y = document.querySelector(`${qt} button.ytp-miniplayer-expand-watch-page-button`);
            y && y.click()
        }
        ),
        c.querySelector(".close").addEventListener("click", h => {
            if (et())
                return;
            const y = document.querySelector(`${qt} button.ytp-miniplayer-close-button`);
            y && y.click()
        }
        ),
        c.querySelector(".prev-video").addEventListener("click", h => {
            if (et())
                return;
            const y = document.querySelector(`${qt} a.ytp-prev-button`);
            y && y.click()
        }
        ),
        c.querySelector(".next-video").addEventListener("click", h => {
            if (et())
                return;
            const y = document.querySelector(`${qt} a.ytp-next-button`);
            y && y.click()
        }
        ))
    }
    function Ns(r, o) {
        const a = document.querySelector(qt)
          , c = (a == null ? void 0 : a.querySelector("ytd-player")) || null;
        if (po = o,
        !a)
            return;
        const h = fo(o, r.localExtStorage);
        if (h && zn && h.reason === zn.reason && (ku === o.id || Eu === o.title))
            return;
        const y = c == null ? void 0 : c.querySelector(`.${ge.overlay}`);
        if (!h) {
            zn = void 0,
            Eu = "",
            ku = "",
            y == null || y.remove(),
            r.removeFromBlockList(o.id, "video");
            return
        }
        zn = h,
        Eu = o.title,
        ku = o.id;
        const b = (a == null ? void 0 : a.querySelector("video")) || null;
        b == null || b.pause(),
        r.addToBlockList(o.id, o, "video"),
        c && Tu(c, h, r),
        of(r)
    }
    Tr.extend(Ti);
    const uf = 6
      , sn = new Map
      , Fp = 50
      , Wp = 1e3
      , wo = new Set
      , lf = new Set;
    let Co = null
      , Iu = "";
    function Up(r, o, a=!0, c=!0, h) {
        if (r && !(sn.has(r) && sn.get(r).v === uf) && !wo.has(r) && !(c && Iu === o)) {
            if (Co && clearTimeout(Co),
            wo.add(r),
            wo.size >= Fp) {
                cf(o, a);
                return
            }
            Co = setTimeout( () => {
                c && Iu === o || cf(o, a)
            }
            , Wp)
        }
    }
    function Vp(r) {
        lf.add(r)
    }
    function cf(r, o) {
        Co && clearTimeout(Co);
        const a = Array.from(wo);
        wo.clear(),
        ff(r, a).then(c => {
            for (const y of lf)
                y(c);
            if (!o)
                return;
            const h = Date.now();
            for (const y of c)
                sn.set(y.id, {
                    ...y,
                    cacheDate: h
                })
        }
        ).catch(c => {
            console.log("Error getting data from videos:", a, c),
            Iu = r
        }
        )
    }
    function ff(r, o, a) {
        return fetch(`https://www.googleapis.com/youtube/v3/videos?id=${o}&key=${r}&part=snippet,contentDetails,statistics`).then(c => c.json()).then(c => {
            if (!c || !c.items)
                throw new Error("No data items");
            const h = c.items
              , y = k => ({
                id: k.id,
                title: k.snippet.title || "",
                categoryId: k.snippet.categoryId || "",
                description: k.snippet.description || "",
                channelId: k.snippet.channelId || "",
                channelTitle: k.snippet.channelTitle || "",
                tags: k.snippet.tags || [],
                duration: Tr.duration(k.contentDetails.duration).asSeconds(),
                publishedAt: Tr(k.snippet.publishedAt).unix() * 1e3,
                ageRestricted: k.contentDetails.contentRating.ytRating === "ytAgeRestricted",
                viewCount: parseInt(k.statistics.viewCount),
                isPremiere: k.snippet.liveBroadcastContent === "upcoming",
                defaultLanguage: k.snippet.defaultLanguage || void 0,
                defaultAudioLanguage: k.snippet.defaultAudioLanguage || void 0,
                v: uf
            })
              , b = h.map(y);
            if (a) {
                const k = Date.now();
                for (const _ of b)
                    sn.set(_.id, {
                        ..._,
                        cacheDate: k
                    })
            }
            return b
        }
        )
    }
    const So = "reel-video-in-sequence-new"
      , df = "reel-video-in-sequence-thumbnail"
      , Bu = "ytd-reel-video-renderer"
      , jp = `.${So} ${Bu}`
      , Kp = "ytd-expandable-video-description-body-renderer #snippet-text"
      , zp = 100
      , Gp = 4e3;
    let $s = null;
    const qs = new Map
      , Lu = new Map;
    let an = {
        id: "",
        title: "",
        description: "",
        channelHandle: "",
        channelUrl: ""
    }
      , Pu = null
      , Mu = "";
    const Yp = "yt-shorts-video-title-view-model"
      , hf = "yt-reel-channel-bar-view-model a";
    let pf = "";
    function Xp(r, o) {
        const a = () => {
            const Y = [...document.querySelectorAll(`.${So}`)]
              , z = [];
            for (const de of Y) {
                const N = de.querySelector(`.${df}`)
                  , q = (N ? gf(N) : void 0) ?? Cn(location.href);
                if (!q) {
                    console.warn("Reel element found but no video id was possible to get from it.", de, N);
                    continue
                }
                if (qs.has(de.id))
                    continue;
                const K = {
                    element: de,
                    elementId: de.id,
                    videoId: q,
                    videoInfo: {
                        id: q
                    }
                };
                qs.set(de.id, K),
                Lu.set(q, K),
                sn.has(q) || z.push(q),
                r != null && r.shortsVideoAdded && r.shortsVideoAdded(K.videoInfo, de, sn.get(q))
            }
            o && o !== pf && z.length > 0 && (r != null && r.shortsVideoChanged) && ff(o, z, !0).then(de => {
                for (const N of de) {
                    const V = N.id
                      , q = Lu.get(V);
                    q && r != null && r.shortsVideoChanged && r.shortsVideoChanged(q.videoInfo, q.element, N)
                }
            }
            ).catch(de => {
                console.log("error fetching videos data:", z, de),
                pf = o || ""
            }
            )
        }
          , c = Y => (Y ?? "").replace(/\s+/g, " ").trim();
        let h = 0
          , y = null
          , b = null;
        const k = () => {
            h += 1,
            y && clearInterval(y),
            b && clearTimeout(b),
            y = null,
            b = null
        }
          , _ = () => {
            const Y = document.querySelector(`${jp} ${Yp}`)
              , z = Y == null ? void 0 : Y.closest(`.${So}`);
            if (!Y || !z)
                return null;
            const de = z.querySelector(hf)
              , N = c(Y.textContent)
              , V = c(de == null ? void 0 : de.textContent)
              , q = z.querySelector(`.${df}`)
              , K = q ? gf(q) : void 0;
            return {
                reelElement: z,
                titleElement: Y,
                channelElement: de,
                title: N,
                channelHandle: V,
                videoIdFromThumbnail: K
            }
        }
          , O = () => {
            const Y = document.querySelector(Kp);
            if (!Y)
                return "";
            let z = "";
            for (let de = 0; de < Y.childNodes.length; de++) {
                const N = Y.childNodes[de];
                if (N.nodeType === Node.ELEMENT_NODE && N.hasAttribute("hidden"))
                    continue;
                const V = N.textContent ?? "";
                V && (z += `
` + V)
            }
            return z.trim()
        }
        ;
        let Z = !1
          , ue = 0
          , pe = null
          , G = null
          , W = "";
        const D = () => {
            ue += 1,
            pe && clearInterval(pe),
            G && clearTimeout(G),
            pe = null,
            G = null
        }
          , he = Y => {
            var de;
            if (!Pu)
                return;
            const z = an.id;
            if (z) {
                if (Z) {
                    Mu = Y;
                    return
                }
                Z = !0,
                an.description !== Y && (an.description = Y,
                (de = r.shortsVideoChanged) == null || de.call(r, {
                    ...an
                }, Pu, sn.get(z)))
            }
        }
          , J = () => {
            const Y = O();
            if (W = Y,
            !Z) {
                if (an.description) {
                    Y === an.description && (Z = !0);
                    return
                }
                Y && he(Y)
            }
        }
          , Oe = Y => {
            if (!Y || !location.href.includes("shorts"))
                return;
            D();
            const z = ue;
            J(),
            pe = setInterval( () => {
                if (z !== ue)
                    return;
                if (!location.href.includes("shorts")) {
                    D();
                    return
                }
                if ((Cn(location.href) || "") !== Y) {
                    D();
                    return
                }
                const V = O();
                V !== W && (W = V,
                he(V))
            }
            , zp),
            G = setTimeout( () => {
                z === ue && (Z || (Z = !0),
                D())
            }
            , Gp)
        }
          , Te = (Y, z, de, N) => {
            var V, q;
            location.href.includes("shorts") && (Pu = z,
            Z = !1,
            an = {
                id: Y,
                title: c(de.textContent),
                description: Mu || "",
                channelHandle: c(N.textContent),
                channelUrl: N.href || "",
                duration: 0
            },
            Mu = "",
            (V = r.shortsVideoChanged) == null || V.call(r, {
                ...an
            }, z, sn.get(Y)),
            (q = r.newActiveShort) == null || q.call(r, z, {
                ...an
            }),
            Oe(Y))
        }
          , Re = Y => {
            k();
            const z = h
              , de = an.title || ""
              , N = an.channelHandle || ""
              , V = () => {
                if (z !== h)
                    return;
                if (!location.href.includes("shorts")) {
                    k();
                    return
                }
                const K = Cn(location.href) || "";
                if (!K)
                    return;
                if (K !== Y) {
                    Re(K);
                    return
                }
                const te = _();
                if (!te || !te.title || !te.channelHandle || !te.channelElement || te.videoIdFromThumbnail && te.videoIdFromThumbnail !== Y)
                    return;
                const ae = te.title !== de
                  , re = te.channelHandle !== N;
                !ae && !re || (k(),
                Te(Y, te.reelElement, te.titleElement, te.channelElement))
            }
              , q = 2500;
            V(),
            y && clearInterval(y),
            y = setInterval( () => {
                V()
            }
            , 100),
            b = setTimeout( () => {
                z === h && k()
            }
            , q)
        }
        ;
        let Ie = "";
        const me = () => {
            const Y = Cn(location.href) || "";
            location.href.includes("shorts") && Y && Ie !== Y && (Ie = Y,
            Re(Y))
        }
          , l = () => {
            var de;
            const Y = document.querySelector(`${Bu} ${hf}`);
            if (!Y)
                return;
            const z = Y.parentElement;
            z && ((de = r.channelNameElementFound) == null || de.call(r, z))
        }
        ;
        return a(),
        me(),
        l(),
        no("urlChange", () => {
            if (!location.href.includes("shorts")) {
                k(),
                D();
                return
            }
            me()
        }
        ),
        {
            onNodeAdded: (Y, z) => {
                var de;
                z && (z.matches(Bu) && ($s || ($s = z.querySelector("video"),
                $s && ((de = r.videoPlayerFound) == null || de.call(r, $s)))),
                z.id === "snippet" && z.classList.contains("ytd-text-inline-expander") && an.id && Oe(an.id),
                z.classList.contains(So) && a(),
                r.channelNameElementFound && z.classList.contains("ytReelMetapanelViewModelMetapanelItem") && z.querySelector("yt-reel-channel-bar-view-model span") && l())
            }
            ,
            onNodeChange: (Y, z, de) => {
                if (de && (r.channelNameElementFound && de.matches("span.ytReelChannelBarViewModelChannelName") && z.type === "childList" && z.addedNodes.length && z.addedNodes[0].nodeType === Node.ELEMENT_NODE && z.addedNodes[0].className !== ge.channelBlockButton && r.channelNameElementFound(de),
                de.id === "shorts-inner-container" && z.type === "childList" && z.removedNodes.length))
                    for (const N of z.removedNodes) {
                        const V = N;
                        if (V instanceof HTMLElement && V.classList.contains(So)) {
                            const q = qs.get(V.id)
                              , K = q == null ? void 0 : q.videoId;
                            if (!K)
                                continue;
                            Ie === K && (Ie = "",
                            k(),
                            D()),
                            r != null && r.shortsVideoRemoved && r.shortsVideoRemoved(q.videoInfo, V, sn.get(K)),
                            qs.delete(V.id),
                            Lu.delete(K)
                        }
                    }
            }
            ,
            setApiKey: Y => {
                o = Y
            }
        }
    }
    function gf(r) {
        var c;
        const o = r.style.backgroundImage;
        return o ? (c = o.match(/\/vi\/([a-zA-Z0-9_-]+)\//)) == null ? void 0 : c[1] : void 0
    }
    class Zp {
        constructor(o, a, c) {
            vt(this, "element");
            vt(this, "blockInfo");
            vt(this, "overlayElement", null);
            vt(this, "overlayId");
            vt(this, "skipCountDownInterval", null);
            vt(this, "skipCountdownCancelled", !1);
            vt(this, "hidden", !1);
            vt(this, "options");
            vt(this, "dismissContainer", null);
            vt(this, "dismissButton", null);
            vt(this, "unblockButton", null);
            vt(this, "optionsButton", null);
            vt(this, "skipCountDownContainer", null);
            vt(this, "reasonElement", null);
            vt(this, "contentInfoElement", null);
            vt(this, "contentInfoTitleElement", null);
            vt(this, "contentInfoChannelElement", null);
            this.element = o,
            this.blockInfo = a,
            this.overlayId = "ytb-shorts-block-overlay-" + Math.random().toString(36).substring(2, 11),
            this.options = c,
            this.createOverlay(a)
        }
        createOverlay(o) {
            this.overlayElement = document.createElement("div"),
            this.overlayElement.id = this.overlayId,
            this.overlayElement.className = "ytb-shorts-overlay",
            this.createOverlayInnerHTML(),
            this.addEventListenersToOverlay(),
            this.updateOverlay(),
            this.element.appendChild(this.overlayElement)
        }
        createOverlayInnerHTML() {
            var k, _, O, Z, ue, pe, G, W, D;
            if (!this.overlayElement)
                return console.warn("overlay must be created first before updating innerHTML");
            const o = this.blockInfo
              , a = be("ExtFullName")
              , c = be("Blocked").toUpperCase()
              , h = o.channel ? be("UnblockChannel") : be("Unblock")
              , y = be("WatchAnyway")
              , b = be("Options");
            this.overlayElement.innerHTML = `
			<img src="${Cs}" alt="${a}">
			<div class="details">
				<h2>${c}</h2>
				<p id="reason">${o.reason}</p>
        <div id="skip_countdown" style="display: flex; flex-direction: column; align-items: center; gap: 0.3em;">
          <svg id="skip_countdown_circle" width="32" height="32" viewBox="0 0 32 32" style="margin-bottom: 0.2em;">
            <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="3" />
            <circle id="skip_countdown_progress" cx="16" cy="16" r="14" fill="none" stroke="#ccc" stroke-width="3" stroke-linecap="round" />
          </svg>
          <span style="display: flex; align-items: center; gap: 0.5em;">
            Skipping in <span id="skip_countdown_time">5</span> seconds...
          </span>
          <button id="cancel_skip_countdown" style="margin-top: 0.5em;">Cancel</button>
        </div>
        <div id="dismiss_container">
          <a id="dismiss" class="link" tabindex="0">${y}</a>
        </div>
        <div class="grow"></div>
        <div id="content_info" >
          <p id="title"></p>
          <p id="channel"></p>
        </div>
				<div id="buttons">
					<a id="unblock" class="link" tabindex="0">${h}</a>
					<a id="options" class="link" tabindex="0">${b}</a>
				</div>
			</div>
    `,
            this.dismissContainer = (k = this.overlayElement) == null ? void 0 : k.querySelector("#dismiss_container"),
            this.dismissButton = (_ = this.overlayElement) == null ? void 0 : _.querySelector("#dismiss"),
            this.unblockButton = (O = this.overlayElement) == null ? void 0 : O.querySelector("#unblock"),
            this.optionsButton = (Z = this.overlayElement) == null ? void 0 : Z.querySelector("#options"),
            this.skipCountDownContainer = (ue = this.overlayElement) == null ? void 0 : ue.querySelector("#skip_countdown"),
            this.reasonElement = (pe = this.overlayElement) == null ? void 0 : pe.querySelector("#reason"),
            this.contentInfoElement = (G = this.overlayElement) == null ? void 0 : G.querySelector("#content_info"),
            this.contentInfoTitleElement = (W = this.overlayElement) == null ? void 0 : W.querySelector("#title"),
            this.contentInfoChannelElement = (D = this.overlayElement) == null ? void 0 : D.querySelector("#channel")
        }
        addEventListenersToOverlay() {
            var a, c, h, y;
            const o = (a = this.overlayElement) == null ? void 0 : a.querySelector("#cancel_skip_countdown");
            o == null || o.addEventListener("click", () => {
                this.cancelSkipCountdown()
            }
            ),
            (c = this.dismissButton) == null || c.addEventListener("click", () => {
                var b;
                (b = this.options) != null && b.hideDismissButton || this.hide()
            }
            ),
            (h = this.unblockButton) == null || h.addEventListener("click", b => {
                var k, _;
                yf(this.blockInfo, this.options) || (_ = (k = this.options) == null ? void 0 : k.onUnblockButtonClick) == null || _.call(k, b, this.blockInfo)
            }
            ),
            (y = this.optionsButton) == null || y.addEventListener("click", b => {
                var k, _, O;
                (k = this.options) != null && k.hideOptionsButton || (O = (_ = this.options) == null ? void 0 : _.onOptionsButtonClick) == null || O.call(_, b, this.blockInfo)
            }
            )
        }
        updateOverlay() {
            const o = this.options;
            ar(this.dismissButton, o == null ? void 0 : o.hideDismissButton),
            ar(this.unblockButton, yf(this.blockInfo, o)),
            ar(this.optionsButton, o == null ? void 0 : o.hideOptionsButton),
            ar(this.skipCountDownContainer, !0),
            this.reasonElement && (this.reasonElement.textContent = this.blockInfo.reason,
            ar(this.reasonElement, o == null ? void 0 : o.hideBlockReason)),
            this.contentInfoElement && (ar(this.contentInfoElement, !0),
            this.contentInfoTitleElement.textContent = o != null && o.contentTitle ? be("OverlayContentInfoTitle", o.contentTitle) : "",
            ar(this.contentInfoTitleElement, !(o != null && o.contentTitle)),
            this.contentInfoChannelElement.textContent = o != null && o.contentChannelName ? be("OverlayContentInfoChannel", o.contentChannelName) : "",
            ar(this.contentInfoChannelElement, !(o != null && o.contentChannelName)))
        }
        updateBlockInfo(o) {
            this.blockInfo = o,
            this.updateOverlay()
        }
        cancelSkipCountdown() {
            if (this.skipCountdownCancelled = !0,
            !this.skipCountDownContainer)
                return console.warn("could not cancel skip countdown because #skip_countdown was not found");
            this.skipCountDownContainer.classList.add(ge.hide),
            this.skipCountDownInterval && (cancelAnimationFrame(this.skipCountDownInterval),
            this.skipCountDownInterval = null)
        }
        startSkipCountdown(o, a) {
            var ue, pe;
            if (this.hidden)
                return;
            this.skipCountdownCancelled = !1;
            const c = (ue = this.overlayElement) == null ? void 0 : ue.querySelector("#skip_countdown_time")
              , h = (pe = this.overlayElement) == null ? void 0 : pe.querySelector("#skip_countdown_progress");
            if (!c || !this.skipCountDownContainer || !h)
                return console.warn("trying to start skip countdown but necessary elements was not found");
            const y = o
              , k = 2 * Math.PI * 14;
            h.style.strokeDasharray = `${k}`,
            h.style.strokeDashoffset = "0",
            c.textContent = o.toString(),
            this.skipCountDownContainer.classList.remove(ge.hide);
            let _ = null
              , O = o;
            const Z = G => {
                if (this.skipCountdownCancelled)
                    return;
                _ || (_ = G);
                const W = (G - _) / 1e3
                  , D = Math.max(0, y - W)
                  , he = D / y;
                h.style.strokeDashoffset = `${k * (1 - he)}`;
                const J = Math.ceil(D);
                J !== O && (c.textContent = J.toString(),
                O = J),
                D > 0 ? this.skipCountDownInterval = requestAnimationFrame(Z) : (c.textContent = "0",
                a(),
                this.skipCountDownInterval = null)
            }
            ;
            this.skipCountDownInterval = requestAnimationFrame(Z)
        }
        remove() {
            var o;
            this.cancelSkipCountdown(),
            (o = this.overlayElement) == null || o.remove()
        }
        hide() {
            this.overlayElement && (this.cancelSkipCountdown(),
            this.overlayElement.style.display = "none",
            this.hidden = !0)
        }
        show() {
            this.overlayElement && (this.overlayElement.style.display = "flex",
            this.hidden = !1)
        }
    }
    function yf(r, o) {
        return !!(o != null && o.hideUnblockButton || !r.content && !r.channel)
    }
    Tr.extend(Ti);
    const Ds = new Map
      , Mn = new Map;
    let Ao = null
      , zt = ""
      , Br = null;
    const Gn = {
        hideDismissButton: !1,
        hideUnblockButton: !1,
        hideOptionsButton: !1,
        hideBlockReason: !1,
        hideContentInfo: !1
    };
    let Ou = !1
      , _o = !1
      , mf = null;
    function Qp(r) {
        _o = r.localExtStorage.addBlockChannelButton,
        Ou = r.localExtStorage.autoSkipBlockedShorts,
        Sf(r.localExtStorage, !1);
        const {onNodeAdded: o, onNodeChange: a, setApiKey: c} = Xp({
            shortsVideoAdded: (h, y, b) => {
                console.log("[shorts] shorts video added", y, h, b),
                Ru(y, h, r, b)
            }
            ,
            shortsVideoChanged: (h, y, b) => {
                console.log("[shorts] shorts video changed", y, h, b),
                Ru(y, h, r, b)
            }
            ,
            shortsVideoRemoved: (h, y, b) => {
                console.log("[shorts] shorts video removed", y, h, b),
                h.id === zt && (zt = ""),
                Ds.delete(h.id);
                const k = Mn.get(h.id);
                k == null || k.overlay.cancelSkipCountdown(),
                (Br == null ? void 0 : Br.overlayId) === (k == null ? void 0 : k.overlay.overlayId) && (Br = null),
                Mn.delete(h.id)
            }
            ,
            videoPlayerFound: h => {
                Ao = h
            }
            ,
            newActiveShort: (h, y) => {
                console.log("[shorts] active shorts changed", h, y),
                zt = y.id,
                wf(),
                Cf();
                const b = Mn.get(zt);
                b && b.overlay.hidden && b.overlay.show(),
                r.localExtStorage.autoSkipBlockedShorts && Nu();
                const k = h.querySelector("#actions #menu-button yt-button-shape button");
                k && uo(k, r)
            }
            ,
            channelNameElementFound: h => {
                mf = h,
                r.localExtStorage.addBlockChannelButton && vf(r)
            }
        }, _f(r.localExtStorage));
        r.onNodeAdded(o),
        r.onNodeChange(a),
        r.onStorageChange(h => {
            c(_f(h)),
            Ou !== h.autoSkipBlockedShorts && (( () => {
                if (!zt)
                    return;
                const y = Mn.get(zt);
                y && (h.autoSkipBlockedShorts ? Nu() : y.overlay.cancelSkipCountdown())
            }
            )(),
            Ou = h.autoSkipBlockedShorts),
            _o !== h.addBlockChannelButton && (_o = h.addBlockChannelButton,
            _o && vf(r));
            for (const y of Ds.values())
                Ru(y.reelElement, y.videoInfo, r, y.videoApiData);
            Sf(h, !0)
        }
        )
    }
    function vf(r) {
        if (!_o)
            return;
        const o = mf;
        if (!o)
            return;
        const a = _i(r.localExtStorage.biggerChannelBlockButton);
        a.addEventListener("click", c => {
            if (et())
                return;
            const h = Ds.get(zt);
            if (!h)
                return console.error("Could not get information about the active reel.", zt, h),
                alert(be("SomethingWentWrong"));
            const y = {
                ...Jr(),
                handle: h.videoInfo.channelHandle || "",
                url: h.videoInfo.channelUrl || ""
            };
            if (!y.handle && !y.url && !y.name)
                return console.error("Could not get information about the channel on the active reel.", h, y),
                alert(be("SomethingWentWrong"));
            ki(c, y, r.localExtStorage.askConfirmationOnChannelBlockButton)
        }
        ),
        o.setAttribute(Q.hasChannelBlockButton, "true"),
        r.localExtStorage.showBlockChannelButtonOnHover ? o.removeAttribute(Q.alwaysShowChannelBlockButton) : o.setAttribute(Q.alwaysShowChannelBlockButton, "true"),
        o.insertAdjacentElement("beforeend", a)
    }
    function Ru(r, o, a, c) {
        var pe, G, W;
        const h = o.id
          , y = {
            videoId: h,
            reelElement: r,
            videoInfo: o,
            videoApiData: c
        };
        r.setAttribute(Q.elementId, h),
        r.setAttribute(Q.contentType, "video"),
        Ds.set(h, y);
        const b = {
            ...lo(),
            id: o.id,
            url: ho(o.id, !0),
            title: o.title || (c == null ? void 0 : c.title) || "",
            description: o.description || (c == null ? void 0 : c.description) || "",
            channel: {
                handle: o.channelHandle || "",
                name: (c == null ? void 0 : c.channelTitle.replace(/[\r\n]/g, " ").trim()) || "",
                id: xr(o.channelUrl || "") || "",
                url: o.channelUrl || "",
                verified: !1
            },
            ageRestricted: (c == null ? void 0 : c.ageRestricted) || !1,
            duration: o.duration || (c == null ? void 0 : c.duration) || 0,
            publishedAt: (c == null ? void 0 : c.publishedAt) || 0,
            shorts: !0,
            tags: (c == null ? void 0 : c.tags) || [],
            viewCount: (c == null ? void 0 : c.viewCount) || 0,
            categoryId: (c == null ? void 0 : c.categoryId) || "",
            languages: c != null && c.defaultLanguage ? [c == null ? void 0 : c.defaultLanguage] : c != null && c.defaultAudioLanguage ? [c == null ? void 0 : c.defaultAudioLanguage] : [],
            page: "shorts"
        }
          , k = fo(b, a.localExtStorage)
          , _ = Mn.get(h)
          , O = _ == null ? void 0 : _.blockInfo
          , Z = a.localExtStorage.showVideoTitleOnOverlay ? b.title : ""
          , ue = a.localExtStorage.showChannelNameOnOverlay ? b.channel.handle || b.channel.name : "";
        if (a.videos.elements.set(h, {
            id: h,
            element: r,
            blocked: !!k,
            blockedReason: (k == null ? void 0 : k.reason) || "",
            blockedId: ((pe = k == null ? void 0 : k.content) == null ? void 0 : pe.id) || "",
            overlay: (_ == null ? void 0 : _.overlay.overlayElement) || null,
            revealButton: (_ == null ? void 0 : _.overlay.dismissButton) || null,
            info: b
        }),
        k) {
            if (O) {
                const D = ((G = _.overlay.options) == null ? void 0 : G.contentTitle) || ""
                  , he = ((W = _.overlay.options) == null ? void 0 : W.contentChannelName) || "";
                if (k.reason === O.reason && Z === D && ue === he)
                    return;
                tg(_, {
                    newBlockInfo: k,
                    newVideoTitle: Z,
                    newChannelName: ue
                }, a.localExtStorage.autoSkipBlockedShorts);
                return
            }
            Jp(y, k, a, Z, ue),
            zt === h && (wf(),
            Cf(),
            a.localExtStorage.autoSkipBlockedShorts && Nu());
            return
        }
        if (O)
            return eg(_)
    }
    function Jp(r, o, a, c, h) {
        const {reelElement: y, videoId: b} = r;
        y.setAttribute(Q.blocked, "");
        const k = new Zp(y,o,{
            contentTitle: c,
            contentChannelName: h,
            onOptionsButtonClick: (_, O) => {
                et() || rg(O)
            }
            ,
            onUnblockButtonClick: (_, O) => {
                et() || ng(O, a)
            }
            ,
            ...Gn
        });
        Mn.set(b, {
            ...r,
            overlay: k,
            blockInfo: {
                ...o
            }
        }),
        console.log("[shorts] blocked", b, o, y)
    }
    function eg(r) {
        r.reelElement.removeAttribute(Q.blocked),
        r.overlay.remove(),
        Mn.delete(r.videoId),
        console.log("[shorts] unblocked", r.videoId, r.reelElement)
    }
    function tg(r, o, a) {
        const {newBlockInfo: c, newVideoTitle: h, newChannelName: y} = o
          , {overlay: b} = r
          , k = c && c.reason !== r.blockInfo.reason;
        c && (r.blockInfo = {
            ...c
        },
        b.blockInfo = {
            ...c
        });
        const _ = typeof h == "string"
          , O = typeof y == "string";
        (_ || O) && (b.options || (b.options = {}),
        _ && (b.options.contentTitle = h),
        O && (b.options.contentChannelName = y)),
        b.updateOverlay(),
        a && k && bf(r) && b.startSkipCountdown(5, () => {
            const Z = Mn.get(r.videoId);
            !Z || !bf(Z) || Af()
        }
        ),
        console.log("[shorts] updated", r.videoId, c, r.reelElement)
    }
    function bf(r) {
        return zt === r.videoId
    }
    function wf() {
        if (!zt)
            return;
        const r = Mn.get(zt);
        r && (!Ao && (Ao = r.reelElement.querySelector("video"),
        !Ao) || Ao.pause())
    }
    function Nu() {
        if (!zt)
            return;
        const r = Mn.get(zt);
        r && (Br = r.overlay,
        r.overlay.startSkipCountdown(5, () => {
            Br = null,
            Af()
        }
        ))
    }
    function Cf() {
        Br && Br.cancelSkipCountdown()
    }
    function Sf(r, o) {
        if ((Gn.hideBlockReason !== r.removeBlockReason || Gn.hideDismissButton !== r.removeWatchAnyway || Gn.hideUnblockButton !== r.removeUnblockButton || Gn.hideOptionsButton !== r.removeOptionsButton) && (Gn.hideBlockReason = r.removeBlockReason,
        Gn.hideDismissButton = r.removeWatchAnyway,
        Gn.hideUnblockButton = r.removeUnblockButton,
        Gn.hideOptionsButton = r.removeOptionsButton,
        !!o))
            for (const c of Mn.values()) {
                const h = c.overlay;
                h.options = {
                    ...h.options,
                    ...Gn
                },
                h.updateOverlay()
            }
    }
    function Af() {
        const r = document.querySelector("ytd-shorts #navigation-button-down ytd-button-renderer");
        if (!r)
            return console.warn("could not find next button to auto skip short...");
        r.click()
    }
    function _f(r) {
        return !r.enabledAPI || !r.apiKey || r.preventAPIpages && (r.APIBlacklistShortsPage || r.APIBlacklistPages && (Ae.match([location.href], null, "video", xe.apiIgnoredPages) || r.APIBlacklistPages.includes(location.href))) ? "" : r.apiKey
    }
    function ng(r, o) {
        o.askPassword().then( () => {
            if (r.channel)
                return Kt("unblockChannel", r.channel);
            if (r.content)
                return Kt("unblockContent", {
                    contentId: r.content.id,
                    contentType: r.content.type
                })
        }
        ).catch(a => {}
        )
    }
    function rg(r) {
        Kt("openOptionsPage", {
            focusElement: r.optionId
        })
    }
    const ig = {
        password: "",
        passwordConfig: {
            keepUnlockedEnabled: !0,
            unlockTime: 300,
            unlockDate: 0,
            unlockCustomTimeEnabled: !1,
            unlockCustomHours: 0,
            unlockCustomMinutes: 0
        }
    }
      , og = {
        storageVersion: 5,
        autoSave: !1,
        allowNotifications: !1,
        logoRedirectToSubs: !1,
        harderToDisable: !1,
        harderToDisableAmount: 25,
        showBlockOptionOnThreeDotsDropdown: !0,
        lastInstalledVersion: "",
        blockedContentKeywords: "",
        blockedContentKeywordCaseSensitive: !1,
        blockedContentKeywordWordBound: !1,
        whitelistedContentKeywords: "",
        whitelistedContentKeywordCaseSensitive: !1,
        whitelistedContentKeywordWordBound: !1,
        extensionInstallDate: 0,
        donationRemindDate: 0,
        donationSelectedTime: 0,
        donationShouldNeverRemind: !1,
        contentFilter: "",
        extensionEnabled: !0,
        extensionEnableDate: 0,
        extensionEnableLastSliderValue: 0,
        totalBlocks: {},
        local_blockedContents: {},
        debug_tabToReload: 0,
        DEV_reloadTabId: ""
    }
      , sg = {
        blockedTitles: "",
        blockedTitlesCaseSensitive: !1,
        blockedTitlesWordBound: !1,
        blockedVideoChannels: "",
        blockedVideoChannelsCaseSensitive: !1,
        blockedVideoChannelsExactMatch: !0,
        blockedTags: "",
        blockedVideos: "",
        blockSearchSuggestions: !1,
        blockedDescriptions: "",
        blockedDescriptionsCaseSensitive: !1,
        blockedDescriptionsWordBound: !1,
        blockShorts: !1,
        autoSkipBlockedShorts: !0,
        blockLive: !1,
        blockPremiere: !1,
        blockMembersOnlyVideos: !1,
        ignorePlaylistVideos: !1,
        ignoreWatchLaterPlaylist: !1,
        blockOpenedVideos: !0,
        autoSkipBlockedVideos: !0,
        removeWatchAnyway: !1,
        blockAgeRestrictedVideos: !1,
        blockedLanguages: [],
        blockedDateRanges: [],
        blockedVideoDuration: 0,
        blockedVideoMinDuration: 0,
        blockedVideoWatchProgressPercent: 0,
        blockedVideoMaxOlder: 0,
        blockedVideoMaxNewer: 0,
        blockedVideoMinViews: 0,
        blockedVideoMaxViews: 0,
        blockedCategories: []
    }
      , ag = {
        blockedChannels: "",
        blockedChannelsCaseSensitive: !1,
        blockedChannelsExactMatch: !0,
        addBlockChannelButton: !1,
        showBlockChannelButtonOnHover: !0,
        askConfirmationOnChannelBlockButton: !1,
        biggerChannelBlockButton: !1,
        whitelistChannels: "",
        whitelistChannelsCaseSensitive: !1,
        whitelistChannelsExactMatch: !0
    }
      , ug = {
        blockedCommentContents: "",
        blockedCommentContentsCaseSensitive: !1,
        blockedCommentContentsWordBound: !1,
        blockedCommentUsers: "",
        blockedCommentUsersCaseSensitive: !1,
        blockedCommentUsersExactMatch: !0,
        blockedComments: ""
    }
      , lg = {
        blockedPostContents: "",
        blockedPostContentsCaseSensitive: !1,
        blockedPostContentsWordBound: !1,
        blockedPostChannels: "",
        blockedPostChannelsCaseSensitive: !1,
        blockedPostChannelsExactMatch: !0,
        blockedPosts: ""
    }
      , cg = {
        blockMIX: !1,
        blockedPlaylistTitles: "",
        blockedPlaylistTitlesCaseSensitive: !1,
        blockedPlaylistTitlesWordBound: !1,
        blockedPlaylistChannels: "",
        blockedPlaylistChannelsCaseSensitive: !1,
        blockedPlaylistChannelsExactMatch: !0,
        blockedPlaylists: ""
    }
      , fg = {
        enabledAPI: !1,
        apiKey: "",
        enableCacheAPI: !0,
        clearCacheAPIPeriod: 30 * 24 * 60 * 60 * 1e3,
        clearCacheAPICustomPeriodEnabled: !1,
        clearCacheAPICustomPeriod: 0,
        clearCacheAPIAfterSession: !1,
        preventAPIpages: !1,
        APIBlacklistSubsPage: !0,
        APIBlacklistHomePage: !1,
        APIBlacklistWatchPage: !1,
        APIBlacklistSearchPage: !1,
        APIBlacklistChannelPage: !1,
        APIBlacklistPlaylistPage: !1,
        APIBlacklistTrendingPage: !1,
        APIBlacklistShortsPage: !1,
        APIBlacklistPages: "",
        local_APIdatas: {}
    }
      , $u = {
        ...og,
        ...ig,
        ...{
            presets: {
                default: {
                    id: "default",
                    name: "Default",
                    settings: {}
                }
            },
            activePreset: "default",
            presetsOrder: ["default"],
            showPresetSelectionOnPopup: !0,
            lastActivePresetChangeWasSchedule: !1
        },
        ...sg,
        ...ag,
        ...ug,
        ...lg,
        ...cg,
        ...fg,
        ...{
            showOverlays: !1,
            showOverlaysForVideos: !0,
            showOverlaysForComments: !0,
            showOverlaysForPosts: !0,
            showOverlaysForPlaylists: !0,
            removeRevealButton: !1,
            removeUnblockButton: !1,
            removeBlockReason: !1,
            removeOptionsButton: !1,
            showChannelNameOnOverlay: !1,
            showVideoTitleOnOverlay: !1
        },
        ...{
            DEV_addColorToElements: !0,
            DEV_showInfoOverlay: !0,
            DEV_addMutationAttributes: !1,
            DEV_skipCacheFetch: !1
        }
    }
      , dg = {
        apiCacheStartOfSession: !0
    };
    function kf(r, o) {
        return {
            get: a => {
                if (!a)
                    return gt.storage[o].get(r);
                if (typeof a != "string" && !Array.isArray(a))
                    return gt.storage[o].get(a);
                Array.isArray(a) || (a = [a]);
                let c = {};
                for (const h of a)
                    c[h] = r[h];
                return gt.storage[o].get(c)
            }
            ,
            set: a => gt.storage[o].set(a),
            clear: () => gt.storage[o].clear(),
            remove: a => gt.storage[o].remove(a),
            onChanged: {
                addListener: a => {
                    gt.storage[o].onChanged.addListener(a)
                }
                ,
                removeListener: a => {
                    gt.storage[o].onChanged.removeListener(a)
                }
            }
        }
    }
    const ti = {
        local: kf($u, "local"),
        session: kf(dg, "session")
    };
    function hg() {
        var a;
        document.querySelectorAll(`.${ge.overlay}`).forEach(c => c.remove()),
        document.querySelectorAll(`.${ge.revealButton}`).forEach(c => c.remove()),
        document.querySelectorAll(`.${ge.channelBlockButton}`).forEach(c => c.remove()),
        document.querySelectorAll(`.${ge.dropdownButton}`).forEach(c => c.remove());
        const r = [ge.hide, ge.relative];
        for (const c of r)
            document.querySelectorAll(`.${c}`).forEach(h => h.classList.remove(c));
        document.querySelectorAll("." + r.join(", .")).forEach(c => c.classList.remove(...r));
        let o = Object.values(Q);
        o = o.filter(c => c !== Q.watchVideoId && c !== Q.injected);
        for (const c of o)
            document.querySelectorAll(`[${c}]`).forEach(h => h.removeAttribute(c));
        (a = document.querySelector(".ytb-password-modal")) == null || a.remove()
    }
    class pg {
        constructor() {
            this.APP_SHORT_NAME = "YTB",
            this.IS_DEV = !("update_url"in ms.runtime.getManifest())
        }
        isYoutubeUrl(o) {
            return o ? !!(o.match(/^https?:\/\/(?:(?:www|m)\.)?youtube\.com(\/|$)/) || o.match(/^https?:\/\/youtube\.be(\/|$)/)) : !1
        }
        devLog(...o) {
            this.IS_DEV && console.log(`[${this.APP_SHORT_NAME}]`, ...o)
        }
        devLogWarn(...o) {
            this.IS_DEV && console.warn(`[${this.APP_SHORT_NAME} warn]`, ...o)
        }
        devLogError(...o) {
            this.IS_DEV && console.error(`[${this.APP_SHORT_NAME} error]`, ...o)
        }
        log(...o) {
            console.log(`[${this.APP_SHORT_NAME}]`, ...o)
        }
        logWarn(...o) {
            console.warn(`[${this.APP_SHORT_NAME} warn]`, ...o)
        }
        logError(...o) {
            console.error(`[${this.APP_SHORT_NAME} error]`, ...o)
        }
        waitCallback(o, a=50, c) {
            return new Promise( (h, y) => {
                const b = {
                    stop: !1
                }
                  , k = o(b);
                if (k || b.stop || !a)
                    return h(k);
                const _ = setInterval( () => {
                    const O = o(b);
                    if (O || b.stop)
                        return clearInterval(_),
                        h(O)
                }
                , a);
                c && setTimeout( () => {
                    clearInterval(_),
                    h()
                }
                , c)
            }
            )
        }
        watchElementChange(o, a, c=!0, h=!0, y=!1) {
            new MutationObserver( () => {
                a()
            }
            ).observe(o, {
                childList: c,
                subtree: h,
                attributes: y
            })
        }
        difference(o, a) {
            function c(h, y) {
                return Er.transform(h, function(b, k, _) {
                    Er.isEqual(k, y[_]) || (b[_] = Er.isObject(k) && Er.isObject(y[_]) ? c(k, y[_]) : k)
                })
            }
            return c(o, a)
        }
        dateStrToNumber(o) {
            return o ? Date.parse(o) : 0
        }
        i18n(o) {
            return o ? ms.i18n.getMessage(o) : ""
        }
        i18nFormat(o, ...a) {
            if (!o)
                return "";
            let c = ms.i18n.getMessage(o);
            for (let y = 0; y < a.length; y++) {
                let b = a[y];
                typeof b == "function" && (b = b(!1));
                const k = new RegExp("\\{" + y + "\\}","g");
                c = c.replace(k, b)
            }
            const h = /\{\^(\d+):([^;]+);([^}]+)\}/g;
            return c = c.replace(h, (y, b, k, _) => {
                let O = a[Number(b)];
                return typeof O == "function" && (O = O(!0)),
                O === 1 ? k : _
            }
            ),
            c
        }
        removeQueriesFromUrl(o) {
            return o ? o.replace(/\?.+/, "") : ""
        }
        cleanString(o, a=!0, c=!0, h=!1) {
            return o ? (a && (o = o.trim()),
            c && (o = o.replace(/\u034F/g, "")),
            h && (o = o.replace(/ {2}/g, " ")),
            o) : ""
        }
        onClick(o, a) {
            Pn(o).on("click keydown", c => {
                c.type !== "click" && c.key !== "Enter" && c.key !== " " || a(c)
            }
            )
        }
        secToMs(o) {
            return o * 1e3
        }
        minToMs(o) {
            return o * 60 * 1e3
        }
        hoursToMs(o) {
            return o * 60 * 60 * 1e3
        }
        daysToMs(o) {
            return o * 24 * 60 * 60 * 1e3
        }
        msToSec(o) {
            return o / 1e3
        }
        msToMin(o) {
            return o / 60 / 1e3
        }
        msToHours(o) {
            return o / 60 / 60 / 1e3
        }
        msToDays(o) {
            return o / 24 / 60 / 60 / 1e3
        }
        msToHMS(o) {
            return new Date(o).toISOString().slice(11, 19)
        }
        escapeRegExp(o) {
            return o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        }
    }
    const Bt = new pg
      , cr = Object.freeze({
        overlayContainer: "ytb-overlay-container",
        revealButton: "ytb-reveal-button",
        hide: "ytb-hide",
        dropdownButton: "ytb-dropdown-button",
        dropdownContainer: "ytb-dropdown-container",
        fill: "ytb-fill",
        channelBlockButton: "ytb-channel-block-button"
    });
    class ko {
        constructor(o="") {
            this.password = o,
            this.modal = null,
            this.preventCancel = !1,
            this.pendingRequests = []
        }
        setPassword(o) {
            this.password = o
        }
        createPasswordModal() {
            if (this.modal)
                return Bt.devLogWarn("attempt to create a modal even thought it is already created.");
            const o = document.createElement("dialog");
            o.classList.add("ytb-password-modal"),
            o.innerHTML = `
			<button id="close">x</button>

			<img src="${Cs}" alt="${Bt.i18n("ExtFullName")}">

			<div>
				<h2>${Bt.i18n("PasswordModalTitle")}</h2>
				<p>${Bt.i18n("PasswordModalDescription")}</p>
			</div>

			<div class="password-input-container">
				<input id="ytb_modal_password" type="password" placeholder="${Bt.i18n("PasswordInputPlaceholder")}">
				<button id="password_toggle">
					<i class="fa fa-eye"></i>
				</button>
			</div>

			<div id="password_fail_message" class="${cr.hide} hidden"></div>

			<div id="keep_unlocked_container">
				<label class="checkbox-container">
					<input id="keep_unlocked" type="checkbox">
					<span class="checkmark"><span></span></span>
					<span id="keep_unlocked_label">${Bt.i18n("KeepUnlockedCheckbox")}</span>
				</label>
			</div>

			<menu>
				<button id="cancel">${Bt.i18n("Cancel")}</button>
				<button id="continue">${Bt.i18n("Continue")}</button>
			</menu>
		`,
            document.body.insertAdjacentElement("afterbegin", o),
            this.setPasswordModal(o)
        }
        setPasswordModal(o) {
            this.modal = o;
            let a = !1;
            o.addEventListener("mousedown", h => {
                const y = o.getBoundingClientRect();
                a = y.top <= h.clientY && h.clientY <= y.top + y.height && y.left <= h.clientX && h.clientX <= y.left + y.width
            }
            ),
            o.addEventListener("mouseup", h => {
                const y = o.getBoundingClientRect();
                !(y.top <= h.clientY && h.clientY <= y.top + y.height && y.left <= h.clientX && h.clientX <= y.left + y.width) && !a && !this.preventCancel && o.close()
            }
            ),
            o.addEventListener("close", h => {
                this.onModalClose()
            }
            ),
            o.querySelector("button#close").addEventListener("click", h => {
                this.modal.close()
            }
            ),
            o.querySelector("button#cancel").addEventListener("click", h => {
                this.modal.close()
            }
            ),
            o.querySelector("button#continue").addEventListener("click", h => {
                this.onModalContinue()
            }
            );
            const c = o.querySelector("input#ytb_modal_password");
            c.addEventListener("keydown", h => {
                h.key === "Enter" && this.onModalContinue()
            }
            ),
            c.addEventListener("input", h => {
                this.setInvalidErrorMessage()
            }
            ),
            o.querySelector("#password_toggle").addEventListener("click", h => {
                c.getAttribute("type") === "password" ? (c.setAttribute("type", "text"),
                this.modal.querySelector("#password_toggle i").classList.replace("fa-eye", "fa-eye-slash")) : (c.setAttribute("type", "password"),
                this.modal.querySelector("#password_toggle i").classList.replace("fa-eye-slash", "fa-eye"))
            }
            )
        }
        async requestPassword(o={}) {
            return o.removeCancelation ? (this.modal.querySelector("button#cancel").classList.add(cr.hide, "hidden"),
            this.modal.querySelector("button#close").classList.add(cr.hide, "hidden"),
            this.preventCancel = !0) : (this.modal.querySelector("button#cancel").classList.remove(cr.hide, "hidden"),
            this.modal.querySelector("button#close").classList.remove(cr.hide, "hidden"),
            this.preventCancel = !1),
            o.removeKeepUnlockedCheckbox ? this.modal.querySelector("#keep_unlocked_container").classList.add(cr.hide, "hidden") : this.modal.querySelector("#keep_unlocked_container").classList.remove(cr.hide, "hidden"),
            this.modal.querySelector("#keep_unlocked").checked = !!o.keepUnlockedChecked,
            new Promise( (a, c) => {
                if (!this.password || o.unlockDate && Date.now() < o.unlockDate)
                    return a({
                        keptUnlocked: this.modal.querySelector("#keep_unlocked").checked,
                        wasOpen: !1
                    });
                if (!this.modal)
                    return c("a modal must be created first");
                this.modal.open || this.showModal(o.unlockTime),
                this.pendingRequests.push({
                    resolve: a,
                    reject: c
                })
            }
            )
        }
        showModal(o) {
            if (!this.modal)
                return Bt.devLogWarn("calling showModal without creating a modal first.");
            this.setInvalidErrorMessage();
            const a = this.modal.querySelector("input#ytb_modal_password");
            a.setAttribute("type", "password"),
            a.value = "",
            this.modal.querySelector("#password_toggle i").classList.replace("fa-eye-slash", "fa-eye"),
            this.updateUnlockTimeLabel(o),
            this.modal.showModal(),
            this.modal.querySelector("#ytb_modal_password").focus()
        }
        updateUnlockTimeLabel(o) {
            if (!this.modal.querySelector("#keep_unlocked_label"))
                return console.warn("could not find label to update unlock time");
            this.modal.querySelector("#keep_unlocked_label").textContent = ko.ComposeUnlockTimeText(o)
        }
        static ComposeUnlockTimeText(o) {
            return o ? o > 86400 ? Bt.i18nFormat("PasswordProtectionKeepUnlockedCheckboxDays", Math.floor(o / 86400)) : o >= 3600 ? Bt.i18nFormat("PasswordProtectionKeepUnlockedCheckboxHours", Math.floor(o / 3600)) : o >= 60 ? Bt.i18nFormat("PasswordProtectionKeepUnlockedCheckboxMinutes", Math.floor(o / 60)) : o >= 1 ? Bt.i18nFormat("PasswordProtectionKeepUnlockedCheckboxSeconds", Math.floor(o)) : Bt.i18n("KeepUnlockedCheckbox") : Bt.i18n("KeepUnlockedCheckbox")
        }
        static GetUnlockTimeFromStorage(o) {
            if (!o)
                return;
            const {unlockTime: a, unlockCustomTimeEnabled: c, unlockCustomHours: h, unlockCustomMinutes: y} = o.passwordConfig;
            return c ? h * 3600 + y * 60 : a
        }
        onModalContinue() {
            if (this.modal.querySelector("#ytb_modal_password").value !== this.password)
                return this.modal.querySelector("input#ytb_modal_password").focus(),
                this.setInvalidErrorMessage(Bt.i18n("InvalidPassword"));
            this.pendingRequests.forEach( ({resolve: a, reject: c}) => {
                a({
                    keptUnlocked: this.modal.querySelector("#keep_unlocked").checked,
                    wasOpen: this.modal.open
                })
            }
            ),
            this.pendingRequests = [],
            this.modal.close()
        }
        onModalClose() {
            this.pendingRequests.forEach( ({resolve: o, reject: a}) => {
                a("cancelled")
            }
            )
        }
        setInvalidErrorMessage(o="") {
            const a = this.modal.querySelector("#password_fail_message");
            o ? (a.textContent = o,
            a.classList.remove(cr.hide),
            a.classList.remove("hidden"),
            a.classList.remove("move"),
            setTimeout( () => {
                a.classList.add("move")
            }
            , 100)) : (a.classList.add(cr.hide),
            a.classList.add("hidden"))
        }
    }
    Tr.extend(Ti);
    const Ef = ["ytm-media-item", "ytm-reel-item-renderer"]
      , xf = "video"
      , Tf = "ytm-video-preview"
      , qu = "a.YtmVideoPreviewNavigationEndpoint";
    let Lr = null
      , Hs = "";
    function gg(r) {
        const o = () => {
            document.querySelectorAll(Ef.join(", ")).forEach(c => {
                Du(c, r)
            }
            )
        }
          , a = () => {
            o()
        }
        ;
        Eo(a),
        o(),
        r.onNodeAdded( (c, h) => {
            if (h) {
                if (Ef.some(y => h.matches(y))) {
                    Du(h, r);
                    return
                }
                if (h.matches(Tf)) {
                    Eo(a);
                    return
                }
                if (h.matches(qu)) {
                    Eo(a);
                    return
                }
            }
        }
        ),
        r.onNodeChange( (c, h, y) => {
            if (!y || (y.matches(qu) && h.attributeName === "href" && Eo(a),
            !(y.matches("ytd-thumbnail-overlay-time-status-renderer") ? !0 : !(h.attributeName !== "href" || !y.matches("a#video-title-link, a#video-title, a.ytd-reel-item-renderer, a.ytd-compact-video-renderer, a.ytd-playlist-panel-video-renderer")))))
                return;
            const _ = Pn(y).parents(`[${Q.elementId}][${Q.contentType}="${xf}"]`)[0];
            _ && Du(_, r)
        }
        ),
        r.onStorageChange(o),
        r.onIntervalChange( () => {
            Eo(a),
            o()
        }
        ),
        r.onVideoAPIDataChange(o)
    }
    function Eo(r) {
        if (Lr = document.querySelector(Tf),
        !Lr)
            return;
        const o = Lr.querySelector(qu);
        if (!o)
            return;
        let a = Hs;
        const c = Cn(o.href);
        a !== c && (Hs = c,
        r && r())
    }
    function Du(r, o) {
        var pe, G, W, D;
        if (r.matches("ytd-playlist-panel-video-renderer.dragging"))
            return;
        let c = r.getAttribute(Q.elementId) || "";
        if (r.matches("ytd-rich-grid-media") && !!r.querySelector("ytd-playlist-thumbnail:not([hidden])")) {
            if (r.getAttribute(Q.contentType) === "video") {
                r.removeAttribute(Q.elementId),
                r.removeAttribute(Q.contentType);
                const he = r.querySelector(`.${ge.channelBlockButton}`);
                if (he == null || he.remove(),
                (pe = r.querySelector(`[${Q.hasChannelBlockButton}]`)) == null || pe.removeAttribute(Q.hasChannelBlockButton),
                c) {
                    const J = o.videos.elements.get(c);
                    (G = J == null ? void 0 : J.overlay) == null || G.remove(),
                    (W = J == null ? void 0 : J.revealButton) == null || W.remove(),
                    o.videos.elements.delete(c)
                }
            }
            return
        }
        c || (c = Ai(),
        r.setAttribute(Q.elementId, c),
        r.setAttribute(Q.contentType, xf),
        o.videos.elements.set(c, {
            id: c,
            element: r,
            blocked: !1,
            blockedReason: "",
            blockedId: "",
            overlay: null,
            revealButton: null,
            info: lo()
        }));
        const y = o.videos.elements.get(c);
        if (!y)
            return;
        y.info = yg(r, o),
        ( () => {
            if (!o.localExtStorage.addBlockChannelButton || !o.localExtStorage.extensionEnabled)
                return;
            const he = r.querySelector("#channel-info ytd-channel-name") || r.querySelector("ytd-channel-name");
            if (!he || he.hasAttribute(Q.hasChannelBlockButton))
                return;
            const J = _i(o.localExtStorage.biggerChannelBlockButton);
            he.insertAdjacentElement("beforeend", J),
            he.setAttribute(Q.hasChannelBlockButton, "true"),
            o.localExtStorage.showBlockChannelButtonOnHover ? he.removeAttribute(Q.alwaysShowChannelBlockButton) : he.setAttribute(Q.alwaysShowChannelBlockButton, "true"),
            J.addEventListener("click", Oe => {
                et() || ki(Oe, y.info.channel, o.localExtStorage.askConfirmationOnChannelBlockButton)
            }
            )
        }
        )(),
        y.info.id && (o.addVideoToAPIQueue(y.info.id),
        o.videos.byId.set(y.info.id, y.info)),
        y.info.title && o.videos.byTitle.set(y.info.title, y.info);
        const b = fo(y.info, o.localExtStorage);
        if (y.overlay = r.querySelector(`.${ge.overlay}`),
        y.revealButton = r.querySelector(`.${ge.revealButton}`),
        b && Hs && y.info.id && y.info.id === Hs && Lr ? (Lr.classList.add(ge.hide),
        (D = Lr.querySelector("video")) == null || D.pause()) : Lr && Lr.classList.remove(ge.hide),
        !!!(!!b != !!y.blockedReason || (b == null ? void 0 : b.reason) !== y.blockedReason || y.info.id !== y.blockedId || r.classList.contains(ge.hide) === (o.localExtStorage.showOverlays && o.localExtStorage.showOverlaysForVideos) || !r.classList.contains(ge.hide) && !y.overlay && o.localExtStorage.showOverlays && o.localExtStorage.showOverlaysForVideos))
            return;
        const _ = y.overlay
          , O = y.revealButton;
        if (!b) {
            r.removeAttribute(Q.blocked),
            y.blocked = !1,
            y.blockedReason = "",
            y.blockedId = "",
            y.overlay = null,
            y.revealButton = null,
            o.removeFromBlockList(y.info.id, "video"),
            r.classList.remove(ge.hide),
            _ == null || _.remove(),
            O == null || O.remove();
            return
        }
        r.setAttribute(Q.blocked, ""),
        y.blocked = !0;
        const Z = b.reason !== y.blockedReason;
        y.blockedReason = b.reason;
        const ue = y.blockedId !== y.info.id;
        if (y.blockedId = y.info.id,
        o.addToBlockList(y.info.id, y.info, "video"),
        o.localExtStorage.showOverlays && o.localExtStorage.showOverlaysForVideos)
            if (r.classList.remove(ge.hide),
            _)
                jn(_, b, o),
                _.getAttribute(Q.overlayHidden) === "true" && (Z || ue) && O.click();
            else {
                const he = so(r, b, o, lu(r));
                y.overlay = he.overlay,
                y.revealButton = he.revealButton
            }
        else
            r.classList.add(ge.hide)
    }
    function yg(r, o) {
        var me, l, R;
        const a = r.querySelector(".media-item-metadata a, a.reel-item-endpoint")
          , c = Pp((a == null ? void 0 : a.href) || "")
          , h = Cn(c)
          , y = o == null ? void 0 : o.videos.apiDatas.get(h)
          , b = o == null ? void 0 : o.videos.byId.get(h)
          , k = As(h)
          , _ = r.querySelector(".media-item-headline span, .reel-item-metadata span")
          , O = ((me = _ == null ? void 0 : _.textContent) == null ? void 0 : me.trim()) || ""
          , Z = !!r.querySelector('ytm-thumbnail-overlay-time-status-renderer[data-style="UPCOMING"]')
          , ue = !!r.querySelector('ytm-thumbnail-overlay-time-status-renderer[data-style="LIVE"]')
          , pe = ( () => {
            var N;
            if (Z || ue)
                return 0;
            const j = r.querySelector("ytm-thumbnail-overlay-time-status-renderer")
              , Y = j == null ? void 0 : j.querySelector("div");
            if (!Y)
                return 0;
            const z = (N = Y.textContent) == null ? void 0 : N.trim();
            return z ? Ps(z) : 0
        }
        )() || (y == null ? void 0 : y.duration) || (b == null ? void 0 : b.duration) || 0
          , G = r.querySelector(".ytm-badge-and-byline-item-byline span")
          , W = ((l = G == null ? void 0 : G.textContent) == null ? void 0 : l.replace(/[\r\n]/g, " ").trim()) || ""
          , D = r.querySelector("ytm-channel-thumbnail-with-link-renderer a")
          , he = (D == null ? void 0 : D.href) || ""
          , J = xr(he)
          , Oe = Xr(he)
          , Te = r.matches("ytm-reel-item-renderer")
          , Re = !!r.querySelector('ytm-badge[data-type="BADGE_STYLE_TYPE_MEMBERS_ONLY"]');
        let Ie = [(y == null ? void 0 : y.defaultLanguage) || "", (y == null ? void 0 : y.defaultAudioLanguage) || "", (k == null ? void 0 : k.languageCode) || ""].filter(Boolean);
        return b != null && b.languages && b.languages.length > Ie.length && (Ie = b.languages),
        {
            id: h,
            url: c,
            title: O,
            description: (y == null ? void 0 : y.description) || "",
            categoryId: (y == null ? void 0 : y.categoryId) || "",
            duration: pe,
            live: ue,
            premiere: Z,
            playlistId: "",
            publishedAt: (y == null ? void 0 : y.publishedAt) || (b == null ? void 0 : b.publishedAt) || 0,
            ageRestricted: (y == null ? void 0 : y.v) === 3 ? y.ageRestricted : !1,
            viewCount: (y == null ? void 0 : y.v) === 4 ? y.viewCount : null,
            shorts: Te,
            membersOnly: Re,
            tags: (y == null ? void 0 : y.tags) || (b == null ? void 0 : b.tags) || [],
            languages: Ie,
            channel: {
                name: W,
                url: he,
                id: J || (y == null ? void 0 : y.id) || ((R = b == null ? void 0 : b.channel) == null ? void 0 : R.id) || "",
                handle: Oe,
                verified: !1
            },
            page: o == null ? void 0 : o.activePageId,
            progress: null
        }
    }
    const If = "div.gstl_50.sbdd_a"
      , mg = "sbsb_a"
      , vg = 'ul[role="listbox"].sbsb_b'
      , Fs = 'li[role="presentation"].sbsb_c'
      , bg = "sbsb_d";
    let Ws = !1;
    function wg(r) {
        ti.local.onChanged.addListener(o => {
            if (o.blockSearchSuggestions && !o.blockSearchSuggestions.newValue) {
                Us(!0);
                const a = document.querySelectorAll(Fs);
                for (const c of a)
                    Lf(c)
            }
        }
        ),
        r.onNodeAdded( (o, a) => {
            if (!r.localExtStorage.blockSearchSuggestions || !a)
                return;
            if (a.matches(If) && (Ws = a.style.display !== "none"),
            a.matches(Fs) && (Us(!0),
            Bf(a)),
            ( () => {
                if (!a.matches(`.${mg}`))
                    return !1;
                const h = a.firstChild;
                return h ? h.matches(vg) : !1
            }
            )()) {
                const h = a.querySelectorAll(Fs);
                for (const y of h)
                    Bf(y)
            }
        }
        ),
        r.onNodeChange( (o, a, c) => {
            r.localExtStorage.blockSearchSuggestions && c && (( () => {
                if (!c.matches(If))
                    return;
                const h = Ws;
                Ws = c.style.display !== "none",
                !Ws && h && Us(!0)
            }
            )(),
            ( () => {
                var k;
                if (a.attributeName !== "class" || !c.matches(Fs) || !c.classList.contains(bg))
                    return;
                const h = document.querySelector("input.ytd-searchbox");
                if (!h)
                    return;
                const y = ((k = c.textContent) == null ? void 0 : k.trim()) || ""
                  , b = h.value;
                y === b && Us(!c.hasAttribute(Q.blocked))
            }
            )())
        }
        )
    }
    function Bf(r) {
        var b, k;
        const o = r.querySelector('.sbse[role="option"]');
        if (!o || !((b = o.textContent) == null ? void 0 : b.trim()))
            return;
        const c = r.querySelector(".sbqs_c")
          , h = ((k = c.textContent) == null ? void 0 : k.trim()) || "";
        Sg(h) ? Cg(r, c) : Lf(r, c)
    }
    function Cg(r, o) {
        r.setAttribute(Q.blocked, ""),
        o || (o = r.querySelector(".sbqs_c")),
        o.style.color = "transparent"
    }
    function Lf(r, o) {
        r.removeAttribute(Q.blocked),
        o || (o = r.querySelector(".sbqs_c")),
        o.style.color = ""
    }
    function Us(r) {
        const o = document.querySelector("input.ytd-searchbox");
        o && (o.type = r ? "text" : "password")
    }
    function Sg(r) {
        return !!Ae.match(r, null, "video", [...xe.titles, ...xe.descriptions, ...xe.contents])
    }
    const Ag = ["presets", "activePreset", "presetsOrder", "extensionEnabled", "extensionEnableDate", "extensionEnableLastSliderValue", "harderToDisable", "harderToDisableAmount", "lastInstalledVersion", "totalBlocks", "local_APIdatas", "local_blockedContents", "extensionInstallDate", "donationRemindDate", "donationSelectedTime", "donationShouldNeverRemind", "autoSave", "allowNotifications", "password", "passwordConfig", "showPresetSelectionOnPopup"];
    new Set(Ag);
    const _g = {
        matches: ["*://*.youtube.com/*"],
        main() {
            const r = location.href.startsWith("https://m.youtube.com/");
            if (r) {
                document.documentElement.setAttribute("ytb-mobile", "");
                const h = !!document.head.querySelector('#theme-meta[content="rgb(255, 255, 255)"]');
                document.documentElement.setAttribute("ytb-mobile-theme", h ? "light" : "dark")
            }
            document.documentElement.hasAttribute(Q.injected) && hg(),
            document.documentElement.setAttribute(Q.injected, ""),
            ( () => {
                if (!document.querySelector("link.ytb-font-awesome")) {
                    var h = document.createElement("link");
                    h.rel = "stylesheet",
                    h.type = "text/css",
                    h.className = "ytb-font-awesome",
                    h.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
                    document.head.appendChild(h)
                }
            }
            )();
            let o = !1;
            const a = {
                video: new Map,
                comment: new Map,
                playlist: new Map,
                post: new Map
            }
              , c = () => {
                const h = {};
                return Object.keys(a).forEach(y => {
                    const b = y
                      , k = a[b].size;
                    h[b] = k
                }
                ),
                h
            }
            ;
            no("alert", h => {
                alert(h)
            }
            ),
            no("requestCounter", (h, y, b) => {
                b(c())
            }
            ),
            Kt("counter", c()),
            ti.local.get().then(h => {
                const y = new ko(h.password);
                y.createPasswordModal(),
                h.enableCacheAPI && Ie(),
                Tc(h.blockedLanguages),
                cc(h),
                z(h.logoRedirectToSubs);
                const b = new Set
                  , k = new Set
                  , _ = new Set
                  , O = new Set
                  , Z = new Set
                  , ue = new Set
                  , pe = new Set;
                function G(N) {
                    if (!N || N.hasAttribute("hidden"))
                        return;
                    switch (N.tagName.toLowerCase()) {
                    case "ytd-watch-flexy":
                        return "watch";
                    case "ytd-browse":
                        return N.getAttribute("page-subtype") || "other";
                    case "ytd-search":
                        return "search";
                    case "ytd-shorts":
                        return "shorts";
                    default:
                        return
                    }
                }
                function W(N) {
                    J.activePageId !== N && (J.activePageId = N,
                    pe.forEach(V => {
                        V(N)
                    }
                    ))
                }
                function D(N) {
                    const V = G(N);
                    V && W(V)
                }
                let he = null;
                const J = {
                    onNodeAdded(N) {
                        O.add(N)
                    },
                    onNodeRemoved(N) {
                        O.add(N)
                    },
                    onNodeChange(N) {
                        ue.add(N)
                    },
                    onIntervalChange(N) {
                        k.add(N)
                    },
                    onStorageChange(N) {
                        b.add(N)
                    },
                    onVideoAPIDataChange(N) {
                        _.add(N)
                    },
                    addVideoToAPIQueue(N) {
                        !h.apiKey || !h.enabledAPI || h.extensionEnabled && (j() || Up(N, h.apiKey))
                    },
                    async askPassword() {
                        return y.requestPassword({
                            keepUnlockedChecked: h.passwordConfig.keepUnlockedEnabled,
                            unlockDate: h.passwordConfig.unlockDate,
                            unlockTime: ko.GetUnlockTimeFromStorage(h)
                        }).then(N => {
                            if (N.wasOpen && N.keptUnlocked) {
                                if (h.passwordConfig.keepUnlockedEnabled = !0,
                                h.passwordConfig.unlockCustomTimeEnabled) {
                                    const V = h.passwordConfig.unlockCustomHours
                                      , q = h.passwordConfig.unlockCustomMinutes;
                                    h.passwordConfig.unlockDate = Date.now() + V * 36e5 + q * 6e4
                                } else
                                    h.passwordConfig.unlockDate = Date.now() + h.passwordConfig.unlockTime * 1e3;
                                ti.local.set({
                                    passwordConfig: h.passwordConfig
                                })
                            } else
                                N.wasOpen && !N.keptUnlocked && h.passwordConfig.keepUnlockedEnabled && (h.passwordConfig.keepUnlockedEnabled = !1,
                                ti.local.set({
                                    passwordConfig: h.passwordConfig
                                }))
                        }
                        ).catch(N => {
                            throw N !== "cancelled" && console.error(N),
                            N
                        }
                        )
                    },
                    localExtStorage: h,
                    videos: {
                        byId: new Map,
                        byTitle: new Map,
                        elements: new Map,
                        apiDatas: sn
                    },
                    comments: {
                        byId: new Map,
                        elements: new Map
                    },
                    posts: {
                        byId: new Map,
                        elements: new Map
                    },
                    playlists: {
                        byId: new Map,
                        elements: new Map
                    },
                    channels: {
                        handleByName: new Map
                    },
                    isMobile: r,
                    addToBlockList(N, V, q) {
                        ( () => {
                            const K = a[q].has(N);
                            a[q].set(N, V),
                            !K && l()
                        }
                        )(),
                        h.local_blockedContents[q] && h.local_blockedContents[q][N] || (h.local_blockedContents[q] || (h.local_blockedContents[q] = {}),
                        h.local_blockedContents[q][N] = !0,
                        R())
                    },
                    removeFromBlockList(N, V) {
                        a[V].has(N) && (a[V].delete(N),
                        l()),
                        h.local_blockedContents[V] && h.local_blockedContents[V][N] && (delete h.local_blockedContents[V][N],
                        R())
                    },
                    activePageId: ( () => {
                        const N = document.querySelector("ytd-watch-flexy:not([hidden]), ytd-browse:not([hidden]), ytd-search:not([hidden]), ytd-shorts:not([hidden])");
                        return G(N) || "other"
                    }
                    )(),
                    onPageChange(N) {
                        pe.add(N)
                    }
                };
                let Oe = null;
                const Te = 1e3;
                Vp(N => {
                    for (const V of _)
                        V();
                    Oe && clearTimeout(Oe),
                    Oe = setTimeout( () => {
                        h.enableCacheAPI && me()
                    }
                    , Te)
                }
                ),
                r ? gg(J) : (Lp(J),
                zh(J),
                np(J),
                Wh(J),
                mp(J),
                Rp(J),
                Qp(J),
                kp(J),
                wg(J)),
                Nh(J);
                const Re = new MutationObserver(N => {
                    var V;
                    for (let q = 0; q < N.length; q++) {
                        if (et()) {
                            Re.disconnect();
                            return
                        }
                        const K = N[q];
                        for (let te = 0; te < K.addedNodes.length; te++) {
                            const ae = K.addedNodes[te]
                              , re = ae instanceof HTMLElement ? ae : void 0;
                            re && D(re);
                            for (const ce of O)
                                ce(ae, re)
                        }
                        for (let te = 0; te < K.removedNodes.length; te++) {
                            const ae = K.removedNodes[te]
                              , re = ae instanceof HTMLElement ? ae : void 0;
                            for (const ce of Z)
                                ce(ae, re)
                        }
                        for (const te of ue) {
                            const ae = K.target
                              , re = ae instanceof HTMLElement ? ae : void 0;
                            re && K.type === "attributes" && K.attributeName === "hidden" && D(re),
                            re && !1 && re.setAttribute("node-modified", ""),
                            !(K.type === "attributes" && ((V = K.attributeName) != null && V.startsWith("ytb-") || K.attributeName === "node-modified" || K.attributeName === "node-added")) && te(ae, K, re)
                        }
                    }
                }
                );
                setInterval( () => {}
                , 1e3),
                Re.observe(document.body, {
                    childList: !0,
                    subtree: !0,
                    attributes: !0
                }),
                ti.local.onChanged.addListener(N => {
                    let V = !1;
                    for (let q in N) {
                        const K = q
                          , te = N[K].newValue
                          , ae = N[K].oldValue
                          , re = te === void 0 ? $u[K] : te;
                        switch (h.hasOwnProperty(K) && (h[K] = te),
                        K) {
                        case "removeBlockReason":
                        case "removeOptionsButton":
                        case "removeRevealButton":
                        case "removeUnblockButton":
                        case "removeWatchAnyway":
                            oo.forEach(ce => {
                                jn(ce.overlayElement, ce.blockInfo, J, ce.revealButton)
                            }
                            );
                            break
                        }
                        (K === "addBlockChannelButton" && !te || K === "extensionEnabled" && !te) && Mh(),
                        K === "showBlockChannelButtonOnHover" && Oh(!re),
                        K === "biggerChannelBlockButton" && Rh(re),
                        K === "password" && y.setPassword(N.password.newValue),
                        V = !!(K === "enableCacheAPI" && !ae && te)
                    }
                    if (Tc(h.blockedLanguages),
                    cc(h),
                    N.logoRedirectToSubs) {
                        const K = N.logoRedirectToSubs.newValue ?? $u.logoRedirectToSubs;
                        z(K)
                    }
                    J.localExtStorage = h;
                    for (const q of b)
                        q(h);
                    if (V) {
                        Ie(),
                        me();
                        for (const q of _)
                            q()
                    }
                    N.passwordConfig && y.updateUnlockTimeLabel(ko.GetUnlockTimeFromStorage(h))
                }
                );
                function Ie() {
                    for (const N of Object.values(h.local_APIdatas))
                        sn.has(N.id) || sn.set(N.id, N)
                }
                function me() {
                    ti.local.set({
                        local_APIdatas: Object.fromEntries(sn.entries())
                    }).then( () => {}
                    )
                }
                function l() {
                    if (et())
                        return;
                    const N = c()
                      , V = Object.values(N).reduce( (q, K) => q + K);
                    Kt("counter", N),
                    Kt("badgeCounter", V)
                }
                function R() {
                    et() || (he && (clearTimeout(he),
                    he = null),
                    he = setTimeout( () => {
                        et() || (he = null,
                        ti.local.set({
                            local_blockedContents: h.local_blockedContents
                        }).then( () => {}
                        ))
                    }
                    , 1e3))
                }
                function j(N) {
                    if (!h.preventAPIpages)
                        return !1;
                    N || (N = location.href);
                    const V = Y(N);
                    return !!(h.APIBlacklistSubsPage && V === "subscriptions" || h.APIBlacklistHomePage && V == "home" || h.APIBlacklistWatchPage && V == "watch" || h.APIBlacklistSearchPage && V == "search" || h.APIBlacklistChannelPage && V == "channels" || h.APIBlacklistPlaylistPage && V == "playlist" || h.APIBlacklistTrendingPage && V == "trending" || h.APIBlacklistShortsPage && V == "shorts" || h.APIBlacklistPages && Ae.match([location.href], null, "video", xe.apiIgnoredPages))
                }
                function Y(N) {
                    if (N || (N = location.href),
                    /^https?:\/\/((?:www|m)\.)?youtube\.com\/feed\/subscriptions\/?(\?.+)?$/.test(N))
                        return "subscriptions";
                    if (/^https?:\/\/((?:www|m)\.)?youtube\.com\/?(\?.+)?$/.test(N))
                        return "home";
                    if (/^https?:\/\/((?:www|m)\.)?youtube.com\/results\?search_query=.+/.test(N))
                        return "search";
                    if (/^https?:\/\/((?:www|m)\.)?youtube\.com\/watch\?v=.+$/.test(N))
                        return "watch";
                    if (Dh(N))
                        return "channels";
                    if (/^https?:\/\/((?:www|m)\.)?youtube\.com\/playlist\?list=.+$/.test(N))
                        return "playlist";
                    if (/^https?:\/\/((?:www|m)\.)?youtube\.com\/feed\/trending\/?(\?.+)?$/.test(N))
                        return "trending";
                    if (/^httpshttps?:\/\/((?:www|m)\.)?youtube\.com\/shorts\/.*(\?.+)?$/.test(N))
                        return "shorts"
                }
                function z(N) {
                    const V = document.querySelector("a#logo");
                    V && (N ? (o || V.addEventListener("click", de),
                    o = !0,
                    V.href = "https://www.youtube.com/feed/subscriptions") : (o && V.removeEventListener("click", de),
                    o = !1,
                    V.href = "https://www.youtube.com/"))
                }
                function de(N) {
                    if (et())
                        return;
                    N.preventDefault(),
                    N.stopPropagation();
                    const q = Array.from(document.querySelectorAll("a#endpoint")).find(K => K.href.includes("/feed/subscriptions"));
                    if (q)
                        return q.click();
                    window.open("https://www.youtube.com/feed/subscriptions", "_self")
                }
            }
            )
        }
    };
    var kg = {
        VITE_CJS_IGNORE_WARNING: "true",
        BASE_URL: "/",
        MODE: "production",
        DEV: !1,
        PROD: !0,
        SSR: !1,
        MANIFEST_VERSION: 3,
        BROWSER: "chrome",
        CHROME: !0,
        FIREFOX: !1,
        SAFARI: !1,
        EDGE: !1,
        OPERA: !1,
        COMMAND: "build",
        ENTRYPOINT: "content"
    };
    function Vs(r, ...o) {}
    var Eg = {
        debug: (...r) => Vs(console.debug, ...r),
        log: (...r) => Vs(console.log, ...r),
        warn: (...r) => Vs(console.warn, ...r),
        error: (...r) => Vs(console.error, ...r)
    }
      , xg = (ni = class extends Event {
        constructor(o, a) {
            super(ni.EVENT_NAME, {}),
            this.newUrl = o,
            this.oldUrl = a
        }
    }
    ,
    vt(ni, "EVENT_NAME", Pf("wxt:locationchange")),
    ni);
    function Pf(r) {
        const o = typeof kg > "u" ? "build" : "content";
        return `${gt.runtime.id}:${o}:${r}`
    }
    function Tg(r) {
        let o, a;
        return {
            run() {
                o == null && (a = new URL(location.href),
                o = r.setInterval( () => {
                    let c = new URL(location.href);
                    c.href !== a.href && (window.dispatchEvent(new xg(c,a)),
                    a = c)
                }
                , 1e3))
            }
        }
    }
    var Ig = (Pr = class {
        constructor(o, a) {
            ds(this, Pi);
            ds(this, Ks, window.self === window.top);
            ds(this, Li);
            ds(this, zs, Tg(this));
            this.contentScriptName = o,
            this.options = a,
            Ah(this, Li, new AbortController),
            fs(this, Ks) && ic(this, Pi, _h).call(this),
            this.setTimeout( () => {
                ic(this, Pi, kh).call(this)
            }
            )
        }
        get signal() {
            return fs(this, Li).signal
        }
        abort(o) {
            return fs(this, Li).abort(o)
        }
        get isInvalid() {
            return gt.runtime.id == null && this.notifyInvalidated(),
            this.signal.aborted
        }
        get isValid() {
            return !this.isInvalid
        }
        onInvalidated(o) {
            return this.signal.addEventListener("abort", o),
            () => this.signal.removeEventListener("abort", o)
        }
        block() {
            return new Promise( () => {}
            )
        }
        setInterval(o, a) {
            const c = setInterval( () => {
                this.isValid && o()
            }
            , a);
            return this.onInvalidated( () => clearInterval(c)),
            c
        }
        setTimeout(o, a) {
            const c = setTimeout( () => {
                this.isValid && o()
            }
            , a);
            return this.onInvalidated( () => clearTimeout(c)),
            c
        }
        requestAnimationFrame(o) {
            const a = requestAnimationFrame( (...c) => {
                this.isValid && o(...c)
            }
            );
            return this.onInvalidated( () => cancelAnimationFrame(a)),
            a
        }
        requestIdleCallback(o, a) {
            const c = requestIdleCallback( (...h) => {
                this.signal.aborted || o(...h)
            }
            , a);
            return this.onInvalidated( () => cancelIdleCallback(c)),
            c
        }
        addEventListener(o, a, c, h) {
            var y;
            a === "wxt:locationchange" && this.isValid && fs(this, zs).run(),
            (y = o.addEventListener) == null || y.call(o, a.startsWith("wxt:") ? Pf(a) : a, c, {
                ...h,
                signal: this.signal
            })
        }
        notifyInvalidated() {
            this.abort("Content script context invalidated"),
            Eg.debug(`Content script "${this.contentScriptName}" context invalidated`)
        }
    }
    ,
    Ks = new WeakMap,
    Li = new WeakMap,
    zs = new WeakMap,
    Pi = new WeakSet,
    _h = function() {
        window.postMessage({
            type: Pr.SCRIPT_STARTED_MESSAGE_TYPE,
            contentScriptName: this.contentScriptName
        }, "*")
    }
    ,
    kh = function() {
        const o = a => {
            var c, h;
            ((c = a.data) == null ? void 0 : c.type) === Pr.SCRIPT_STARTED_MESSAGE_TYPE && ((h = a.data) == null ? void 0 : h.contentScriptName) === this.contentScriptName && this.notifyInvalidated()
        }
        ;
        addEventListener("message", o),
        this.onInvalidated( () => removeEventListener("message", o))
    }
    ,
    vt(Pr, "SCRIPT_STARTED_MESSAGE_TYPE", "wxt:content-script-started"),
    Pr);
    function Gw() {}
    function js(r, ...o) {}
    var Bg = {
        debug: (...r) => js(console.debug, ...r),
        log: (...r) => js(console.log, ...r),
        warn: (...r) => js(console.warn, ...r),
        error: (...r) => js(console.error, ...r)
    }
      , Lg = (async () => {
        try {
            const {main: r, ...o} = _g
              , a = new Ig("content",o);
            return await r(a)
        } catch (r) {
            throw Bg.error('The content script "content" crashed on startup!', r),
            r
        }
    }
    )()
      , Pg = Lg;
    return Pg
}();
_content;
