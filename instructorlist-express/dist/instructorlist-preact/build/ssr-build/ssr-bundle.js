"use strict";
module.exports =
    /******/ (function (modules) {
        /******/ // The module cache
        /******/ var installedModules = {};
        /******/
        /******/ // The require function
        /******/ function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/ if (installedModules[moduleId]) {
                /******/ return installedModules[moduleId].exports;
                /******/ }
            /******/ // Create a new module (and put it into the cache)
            /******/ var module = installedModules[moduleId] = {
                /******/ i: moduleId,
                /******/ l: false,
                /******/ exports: {}
                /******/ 
            };
            /******/
            /******/ // Execute the module function
            /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ // Flag the module as loaded
            /******/ module.l = true;
            /******/
            /******/ // Return the exports of the module
            /******/ return module.exports;
            /******/ 
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/ __webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/ __webpack_require__.c = installedModules;
        /******/
        /******/ // define getter function for harmony exports
        /******/ __webpack_require__.d = function (exports, name, getter) {
            /******/ if (!__webpack_require__.o(exports, name)) {
                /******/ Object.defineProperty(exports, name, {
                    /******/ configurable: false,
                    /******/ enumerable: true,
                    /******/ get: getter
                    /******/ 
                });
                /******/ }
            /******/ 
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/ __webpack_require__.n = function (module) {
            /******/ var getter = module && module.__esModule ?
                /******/ function getDefault() { return module['default']; } :
                /******/ function getModuleExports() { return module; };
            /******/ __webpack_require__.d(getter, 'a', getter);
            /******/ return getter;
            /******/ 
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/ __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        /******/
        /******/ // __webpack_public_path__
        /******/ __webpack_require__.p = "/";
        /******/
        /******/ // Load entry module and return exports
        /******/ return __webpack_require__(__webpack_require__.s = "JkW7");
        /******/ 
    })({
        /***/ "/QC5": 
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function () { return subscribers; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function () { return getCurrentUrl; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function () { return route; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function () { return Router; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function () { return Route; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function () { return Link; });
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
            var EMPTY$1 = {};
            function assign(obj, props) {
                // eslint-disable-next-line guard-for-in
                for (var i in props) {
                    obj[i] = props[i];
                }
                return obj;
            }
            function exec(url, route, opts) {
                var reg = /(?:\?([^#]*))?(#.*)?$/, c = url.match(reg), matches = {}, ret;
                if (c && c[1]) {
                    var p = c[1].split('&');
                    for (var i = 0; i < p.length; i++) {
                        var r = p[i].split('=');
                        matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
                    }
                }
                url = segmentize(url.replace(reg, ''));
                route = segmentize(route || '');
                var max = Math.max(url.length, route.length);
                for (var i$1 = 0; i$1 < max; i$1++) {
                    if (route[i$1] && route[i$1].charAt(0) === ':') {
                        var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''), flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '', plus = ~flags.indexOf('+'), star = ~flags.indexOf('*'), val = url[i$1] || '';
                        if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
                            ret = false;
                            break;
                        }
                        matches[param] = decodeURIComponent(val);
                        if (plus || star) {
                            matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
                            break;
                        }
                    }
                    else if (route[i$1] !== url[i$1]) {
                        ret = false;
                        break;
                    }
                }
                if (opts.default !== true && ret === false) {
                    return false;
                }
                return matches;
            }
            function pathRankSort(a, b) {
                return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
            }
            // filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
            function prepareVNodeForRanking(vnode, index) {
                vnode.index = index;
                vnode.rank = rankChild(vnode);
                return vnode.attributes;
            }
            function segmentize(url) {
                return url.replace(/(^\/+|\/+$)/g, '').split('/');
            }
            function rankSegment(segment) {
                return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
            }
            function rank(path) {
                return segmentize(path).map(rankSegment).join('');
            }
            function rankChild(vnode) {
                return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
            }
            var customHistory = null;
            var ROUTERS = [];
            var subscribers = [];
            var EMPTY = {};
            function isPreactElement(node) {
                return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
            }
            function setUrl(url, type) {
                if (type === void 0)
                    type = 'push';
                if (customHistory && customHistory[type]) {
                    customHistory[type](url);
                }
                else if (typeof history !== 'undefined' && history[type + 'State']) {
                    history[type + 'State'](null, null, url);
                }
            }
            function getCurrentUrl() {
                var url;
                if (customHistory && customHistory.location) {
                    url = customHistory.location;
                }
                else if (customHistory && customHistory.getCurrentLocation) {
                    url = customHistory.getCurrentLocation();
                }
                else {
                    url = typeof location !== 'undefined' ? location : EMPTY;
                }
                return "" + (url.pathname || '') + (url.search || '');
            }
            function route(url, replace) {
                if (replace === void 0)
                    replace = false;
                if (typeof url !== 'string' && url.url) {
                    replace = url.replace;
                    url = url.url;
                }
                // only push URL into history if we can handle it
                if (canRoute(url)) {
                    setUrl(url, replace ? 'replace' : 'push');
                }
                return routeTo(url);
            }
            /** Check if the given URL can be handled by any router instances. */
            function canRoute(url) {
                for (var i = ROUTERS.length; i--;) {
                    if (ROUTERS[i].canRoute(url)) {
                        return true;
                    }
                }
                return false;
            }
            /** Tell all router instances to handle the given URL.  */
            function routeTo(url) {
                var didRoute = false;
                for (var i = 0; i < ROUTERS.length; i++) {
                    if (ROUTERS[i].routeTo(url) === true) {
                        didRoute = true;
                    }
                }
                for (var i$1 = subscribers.length; i$1--;) {
                    subscribers[i$1](url);
                }
                return didRoute;
            }
            function routeFromLink(node) {
                // only valid elements
                if (!node || !node.getAttribute) {
                    return;
                }
                var href = node.getAttribute('href'), target = node.getAttribute('target');
                // ignore links with targets and non-path URLs
                if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
                    return;
                }
                // attempt to route, if no match simply cede control to browser
                return route(href);
            }
            function handleLinkClick(e) {
                if (e.button == 0) {
                    routeFromLink(e.currentTarget || e.target || this);
                    return prevent(e);
                }
            }
            function prevent(e) {
                if (e) {
                    if (e.stopImmediatePropagation) {
                        e.stopImmediatePropagation();
                    }
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                    e.preventDefault();
                }
                return false;
            }
            function delegateLinkHandler(e) {
                // ignore events the browser takes care of already:
                if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
                    return;
                }
                var t = e.target;
                do {
                    if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
                        if (t.hasAttribute('native')) {
                            return;
                        }
                        // if link is handled by the router, prevent browser defaults
                        if (routeFromLink(t)) {
                            return prevent(e);
                        }
                    }
                } while (t = t.parentNode);
            }
            var eventListenersInitialized = false;
            function initEventListeners() {
                if (eventListenersInitialized) {
                    return;
                }
                if (typeof addEventListener === 'function') {
                    if (!customHistory) {
                        addEventListener('popstate', function () {
                            routeTo(getCurrentUrl());
                        });
                    }
                    addEventListener('click', delegateLinkHandler);
                }
                eventListenersInitialized = true;
            }
            var Router = function (Component$$1) {
                function Router(props) {
                    Component$$1.call(this, props);
                    if (props.history) {
                        customHistory = props.history;
                    }
                    this.state = {
                        url: props.url || getCurrentUrl()
                    };
                    initEventListeners();
                }
                if (Component$$1)
                    Router.__proto__ = Component$$1;
                Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
                Router.prototype.constructor = Router;
                Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
                    if (props.static !== true) {
                        return true;
                    }
                    return props.url !== this.props.url || props.onChange !== this.props.onChange;
                };
                /** Check if the given URL can be matched against any children */
                Router.prototype.canRoute = function canRoute(url) {
                    return this.getMatchingChildren(this.props.children, url, false).length > 0;
                };
                /** Re-render children with a new URL to match against. */
                Router.prototype.routeTo = function routeTo(url) {
                    this._didRoute = false;
                    this.setState({ url: url });
                    // if we're in the middle of an update, don't synchronously re-route.
                    if (this.updating) {
                        return this.canRoute(url);
                    }
                    this.forceUpdate();
                    return this._didRoute;
                };
                Router.prototype.componentWillMount = function componentWillMount() {
                    ROUTERS.push(this);
                    this.updating = true;
                };
                Router.prototype.componentDidMount = function componentDidMount() {
                    var this$1 = this;
                    if (customHistory) {
                        this.unlisten = customHistory.listen(function (location) {
                            this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
                        });
                    }
                    this.updating = false;
                };
                Router.prototype.componentWillUnmount = function componentWillUnmount() {
                    if (typeof this.unlisten === 'function') {
                        this.unlisten();
                    }
                    ROUTERS.splice(ROUTERS.indexOf(this), 1);
                };
                Router.prototype.componentWillUpdate = function componentWillUpdate() {
                    this.updating = true;
                };
                Router.prototype.componentDidUpdate = function componentDidUpdate() {
                    this.updating = false;
                };
                Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
                    return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
                        var matches = exec(url, vnode.attributes.path, vnode.attributes);
                        if (matches) {
                            if (invoke !== false) {
                                var newProps = { url: url, matches: matches };
                                assign(newProps, matches);
                                delete newProps.ref;
                                delete newProps.key;
                                return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
                            }
                            return vnode;
                        }
                    }).filter(Boolean);
                };
                Router.prototype.render = function render(ref, ref$1) {
                    var children = ref.children;
                    var onChange = ref.onChange;
                    var url = ref$1.url;
                    var active = this.getMatchingChildren(children, url, true);
                    var current = active[0] || null;
                    this._didRoute = !!current;
                    var previous = this.previousUrl;
                    if (url !== previous) {
                        this.previousUrl = url;
                        if (typeof onChange === 'function') {
                            onChange({
                                router: this,
                                url: url,
                                previous: previous,
                                active: active,
                                current: current
                            });
                        }
                    }
                    return current;
                };
                return Router;
            }(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);
            var Link = function Link(props) {
                return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
            };
            var Route = function Route(props) {
                return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
            };
            Router.subscribers = subscribers;
            Router.getCurrentUrl = getCurrentUrl;
            Router.route = route;
            Router.Router = Router;
            Router.Route = Route;
            Router.Link = Link;
            /* harmony default export */ __webpack_exports__["default"] = (Router);
            //# sourceMappingURL=preact-router.es.js.map
            /***/ 
        }),
        /***/ "/Umn": 
        /***/ (function (module, exports) {
            // removed by extract-text-webpack-plugin
            module.exports = { "header": "header__3IhT1", "active": "active__2kmrA", "menuIcon": "menuIcon__3xzM7" };
            /***/ 
        }),
        /***/ "3dZY": 
        /***/ (function (module, exports, __webpack_require__) {
            !function (t, n) {
                true ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t.dayjs = n();
            }(this, function () {
                "use strict";
                var t = "millisecond", n = "second", e = "minute", r = "hour", i = "day", s = "week", u = "month", o = "quarter", a = "year", h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/, f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, c = function c(t, n, e) {
                    var r = String(t);
                    return !r || r.length >= n ? t : "" + Array(n + 1 - r.length).join(e) + t;
                }, d = { s: c, z: function z(t) {
                        var n = -t.utcOffset(), e = Math.abs(n), r = Math.floor(e / 60), i = e % 60;
                        return (n <= 0 ? "+" : "-") + c(r, 2, "0") + ":" + c(i, 2, "0");
                    }, m: function m(t, n) {
                        var e = 12 * (n.year() - t.year()) + (n.month() - t.month()), r = t.clone().add(e, u), i = n - r < 0, s = t.clone().add(e + (i ? -1 : 1), u);
                        return Number(-(e + (n - r) / (i ? r - s : s - r)) || 0);
                    }, a: function a(t) {
                        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
                    }, p: function p(h) {
                        return { M: u, y: a, w: s, d: i, h: r, m: e, s: n, ms: t, Q: o }[h] || String(h || "").toLowerCase().replace(/s$/, "");
                    }, u: function u(t) {
                        return void 0 === t;
                    } }, $ = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, l = "en", m = {};
                m[l] = $;
                var y = function y(t) {
                    return t instanceof v;
                }, M = function M(t, n, e) {
                    var r;
                    if (!t)
                        return l;
                    if ("string" == typeof t)
                        m[t] && (r = t), n && (m[t] = n, r = t);
                    else {
                        var i = t.name;
                        m[i] = t, r = i;
                    }
                    return e || (l = r), r;
                }, g = function g(t, n, e) {
                    if (y(t))
                        return t.clone();
                    var r = n ? "string" == typeof n ? { format: n, pl: e } : n : {};
                    return r.date = t, new v(r);
                }, D = d;
                D.l = M, D.i = y, D.w = function (t, n) {
                    return g(t, { locale: n.$L, utc: n.$u });
                };
                var v = function () {
                    function c(t) {
                        this.$L = this.$L || M(t.locale, null, !0), this.parse(t);
                    }
                    var d = c.prototype;
                    return d.parse = function (t) {
                        this.$d = function (t) {
                            var n = t.date, e = t.utc;
                            if (null === n)
                                return new Date(NaN);
                            if (D.u(n))
                                return new Date();
                            if (n instanceof Date)
                                return new Date(n);
                            if ("string" == typeof n && !/Z$/i.test(n)) {
                                var r = n.match(h);
                                if (r)
                                    return e ? new Date(Date.UTC(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)) : new Date(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0);
                            }
                            return new Date(n);
                        }(t), this.init();
                    }, d.init = function () {
                        var t = this.$d;
                        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
                    }, d.$utils = function () {
                        return D;
                    }, d.isValid = function () {
                        return !("Invalid Date" === this.$d.toString());
                    }, d.isSame = function (t, n) {
                        var e = g(t);
                        return this.startOf(n) <= e && e <= this.endOf(n);
                    }, d.isAfter = function (t, n) {
                        return g(t) < this.startOf(n);
                    }, d.isBefore = function (t, n) {
                        return this.endOf(n) < g(t);
                    }, d.$g = function (t, n, e) {
                        return D.u(t) ? this[n] : this.set(e, t);
                    }, d.year = function (t) {
                        return this.$g(t, "$y", a);
                    }, d.month = function (t) {
                        return this.$g(t, "$M", u);
                    }, d.day = function (t) {
                        return this.$g(t, "$W", i);
                    }, d.date = function (t) {
                        return this.$g(t, "$D", "date");
                    }, d.hour = function (t) {
                        return this.$g(t, "$H", r);
                    }, d.minute = function (t) {
                        return this.$g(t, "$m", e);
                    }, d.second = function (t) {
                        return this.$g(t, "$s", n);
                    }, d.millisecond = function (n) {
                        return this.$g(n, "$ms", t);
                    }, d.unix = function () {
                        return Math.floor(this.valueOf() / 1e3);
                    }, d.valueOf = function () {
                        return this.$d.getTime();
                    }, d.startOf = function (t, o) {
                        var h = this, f = !!D.u(o) || o, c = D.p(t), d = function d(t, n) {
                            var e = D.w(h.$u ? Date.UTC(h.$y, n, t) : new Date(h.$y, n, t), h);
                            return f ? e : e.endOf(i);
                        }, $ = function $(t, n) {
                            return D.w(h.toDate()[t].apply(h.toDate(), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)), h);
                        }, l = this.$W, m = this.$M, y = this.$D, M = "set" + (this.$u ? "UTC" : "");
                        switch (c) {
                            case a:
                                return f ? d(1, 0) : d(31, 11);
                            case u:
                                return f ? d(1, m) : d(0, m + 1);
                            case s:
                                var g = this.$locale().weekStart || 0, v = (l < g ? l + 7 : l) - g;
                                return d(f ? y - v : y + (6 - v), m);
                            case i:
                            case "date":
                                return $(M + "Hours", 0);
                            case r:
                                return $(M + "Minutes", 1);
                            case e:
                                return $(M + "Seconds", 2);
                            case n:
                                return $(M + "Milliseconds", 3);
                            default:
                                return this.clone();
                        }
                    }, d.endOf = function (t) {
                        return this.startOf(t, !1);
                    }, d.$set = function (s, o) {
                        var h, f = D.p(s), c = "set" + (this.$u ? "UTC" : ""), d = (h = {}, h[i] = c + "Date", h.date = c + "Date", h[u] = c + "Month", h[a] = c + "FullYear", h[r] = c + "Hours", h[e] = c + "Minutes", h[n] = c + "Seconds", h[t] = c + "Milliseconds", h)[f], $ = f === i ? this.$D + (o - this.$W) : o;
                        if (f === u || f === a) {
                            var l = this.clone().set("date", 1);
                            l.$d[d]($), l.init(), this.$d = l.set("date", Math.min(this.$D, l.daysInMonth())).toDate();
                        }
                        else
                            d && this.$d[d]($);
                        return this.init(), this;
                    }, d.set = function (t, n) {
                        return this.clone().$set(t, n);
                    }, d.get = function (t) {
                        return this[D.p(t)]();
                    }, d.add = function (t, o) {
                        var h, f = this;
                        t = Number(t);
                        var c = D.p(o), d = function d(n) {
                            var e = g(f);
                            return D.w(e.date(e.date() + Math.round(n * t)), f);
                        };
                        if (c === u)
                            return this.set(u, this.$M + t);
                        if (c === a)
                            return this.set(a, this.$y + t);
                        if (c === i)
                            return d(1);
                        if (c === s)
                            return d(7);
                        var $ = (h = {}, h[e] = 6e4, h[r] = 36e5, h[n] = 1e3, h)[c] || 1, l = this.valueOf() + t * $;
                        return D.w(l, this);
                    }, d.subtract = function (t, n) {
                        return this.add(-1 * t, n);
                    }, d.format = function (t) {
                        var n = this;
                        if (!this.isValid())
                            return "Invalid Date";
                        var e = t || "YYYY-MM-DDTHH:mm:ssZ", r = D.z(this), i = this.$locale(), s = this.$H, u = this.$m, o = this.$M, a = i.weekdays, h = i.months, c = function c(t, r, i, s) {
                            return t && (t[r] || t(n, e)) || i[r].substr(0, s);
                        }, d = function d(t) {
                            return D.s(s % 12 || 12, t, "0");
                        }, $ = i.meridiem || function (t, n, e) {
                            var r = t < 12 ? "AM" : "PM";
                            return e ? r.toLowerCase() : r;
                        }, l = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: o + 1, MM: D.s(o + 1, 2, "0"), MMM: c(i.monthsShort, o, h, 3), MMMM: h[o] || h(this, e), D: this.$D, DD: D.s(this.$D, 2, "0"), d: String(this.$W), dd: c(i.weekdaysMin, this.$W, a, 2), ddd: c(i.weekdaysShort, this.$W, a, 3), dddd: a[this.$W], H: String(s), HH: D.s(s, 2, "0"), h: d(1), hh: d(2), a: $(s, u, !0), A: $(s, u, !1), m: String(u), mm: D.s(u, 2, "0"), s: String(this.$s), ss: D.s(this.$s, 2, "0"), SSS: D.s(this.$ms, 3, "0"), Z: r };
                        return e.replace(f, function (t, n) {
                            return n || l[t] || r.replace(":", "");
                        });
                    }, d.utcOffset = function () {
                        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                    }, d.diff = function (t, h, f) {
                        var c, d = D.p(h), $ = g(t), l = 6e4 * ($.utcOffset() - this.utcOffset()), m = this - $, y = D.m(this, $);
                        return y = (c = {}, c[a] = y / 12, c[u] = y, c[o] = y / 3, c[s] = (m - l) / 6048e5, c[i] = (m - l) / 864e5, c[r] = m / 36e5, c[e] = m / 6e4, c[n] = m / 1e3, c)[d] || m, f ? y : D.a(y);
                    }, d.daysInMonth = function () {
                        return this.endOf(u).$D;
                    }, d.$locale = function () {
                        return m[this.$L];
                    }, d.locale = function (t, n) {
                        if (!t)
                            return this.$L;
                        var e = this.clone();
                        return e.$L = M(t, n, !0), e;
                    }, d.clone = function () {
                        return D.w(this.toDate(), this);
                    }, d.toDate = function () {
                        return new Date(this.$d);
                    }, d.toJSON = function () {
                        return this.toISOString();
                    }, d.toISOString = function () {
                        return this.$d.toISOString();
                    }, d.toString = function () {
                        return this.$d.toUTCString();
                    }, c;
                }();
                return g.prototype = v.prototype, g.extend = function (t, n) {
                    return t(n, v, g), g;
                }, g.locale = M, g.isDayjs = y, g.unix = function (t) {
                    return g(1e3 * t);
                }, g.en = m[l], g.Ls = m, g;
            });
            /***/ 
        }),
        /***/ "492T": 
        /***/ (function (module, exports) {
            // removed by extract-text-webpack-plugin
            module.exports = { "search": "search__2fBVV" };
            /***/ 
        }),
        /***/ "J4GW": 
        /***/ (function (module, exports) {
            // removed by extract-text-webpack-plugin
            module.exports = { "search": "search__2-8Kz", "listItems": "listItems__16EqL", "listItemWrapper": "listItemWrapper__21eW2", "listItem": "listItem__29e2n", "listItemAction": "listItemAction__1tmWk", "listItemMain": "listItemMain__2KU1-", "listItemAside": "listItemAside__1m9LH", "itemActionLink": "itemActionLink__3B_OP", "startTime": "startTime__-cf_E", "price": "price__2Elbz", "tag": "tag__1Ebic", "title": "title__2iaYI", "venue": "venue__1vLQq", "instructor": "instructor__1SQ9m", "filtersButtonWrapper": "filtersButtonWrapper__3uNOD", "filtersButtonContainer": "filtersButtonContainer__2eD-l", "filtersButton": "filtersButton__2nkFI", "filterIcon": "filterIcon__IAjqJ", "mapIcon": "mapIcon__3PXt2", "dayWrapper": "dayWrapper__2wPmt", "leftArrow": "leftArrow__2fOMd", "rightArrow": "rightArrow__3gUuN" };
            /***/ 
        }),
        /***/ "JkW7": 
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
            // EXTERNAL MODULE: ./style/index.css
            var style = __webpack_require__("rq4c");
            var style_default = /*#__PURE__*/ __webpack_require__.n(style);
            // EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
            var preact_min = __webpack_require__("KM04");
            var preact_min_default = /*#__PURE__*/ __webpack_require__.n(preact_min);
            // EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
            var preact_router_es = __webpack_require__("/QC5");
            // EXTERNAL MODULE: ../node_modules/preact-router/match.js
            var match = __webpack_require__("sw5u");
            var match_default = /*#__PURE__*/ __webpack_require__.n(match);
            // EXTERNAL MODULE: ./components/header/style.scss
            var header_style = __webpack_require__("/Umn");
            var header_style_default = /*#__PURE__*/ __webpack_require__.n(header_style);
            // CONCATENATED MODULE: ./utils/is-ssr.js
            var isSSR = function isSSR() {
                return typeof window === 'undefined';
            };
            /* harmony default export */ var is_ssr = (isSSR);
            // CONCATENATED MODULE: ./components/header/index.js
            // const isSSR = () => true
            console.log('header');
            var header_Header = function Header() {
                return Object(preact_min["h"])('header', { className: header_style_default.a.header + ' ' }, Object(preact_min["h"])('h1', null, Object(preact_min["h"])(match["Link"], { activeClassName: header_style_default.a.active, href: '/' }, 'instructorlist ', is_ssr() && '⚡')), Object(preact_min["h"])('nav', null, Object(preact_min["h"])(match["Link"], {
                    className: header_style_default.a.menuIcon,
                    activeClassName: header_style_default.a.active,
                    href: '/menu'
                })));
            };
            /* harmony default export */ var header = (header_Header);
            // EXTERNAL MODULE: ./routes/home/style.css
            var home_style = __webpack_require__("ZAL5");
            var home_style_default = /*#__PURE__*/ __webpack_require__.n(home_style);
            // CONCATENATED MODULE: ./routes/home/index.js
            var home__ref = Object(preact_min["h"])('h1', null, 'Home');
            var home__ref2 = Object(preact_min["h"])('p', null, 'Go to ', Object(preact_min["h"])('a', { href: '/search/' }, 'search'), '.');
            var home_Home = function Home() {
                return Object(preact_min["h"])('div', { 'class': home_style_default.a.home }, home__ref, home__ref2);
            };
            home_Home.getInitialProps = function () {
                new Promsise(function (resolve) {
                    setTimeout(function () {
                        console.log('get some props');
                        resolve('rgeat');
                    }, 300);
                });
            };
            /* harmony default export */ var home = (home_Home);
            // EXTERNAL MODULE: ./routes/search/style.scss
            var search_style = __webpack_require__("492T");
            var search_style_default = /*#__PURE__*/ __webpack_require__.n(search_style);
            // EXTERNAL MODULE: ./components/search/style.scss
            var components_search_style = __webpack_require__("J4GW");
            var components_search_style_default = /*#__PURE__*/ __webpack_require__.n(components_search_style);
            // EXTERNAL MODULE: ../node_modules/dayjs/dayjs.min.js
            var dayjs_min = __webpack_require__("3dZY");
            var dayjs_min_default = /*#__PURE__*/ __webpack_require__.n(dayjs_min);
            // EXTERNAL MODULE: ./components/filters/style.scss
            var filters_style = __webpack_require__("ujxd");
            var filters_style_default = /*#__PURE__*/ __webpack_require__.n(filters_style);
            // CONCATENATED MODULE: ./components/filters/Filters.js
            var _class2, _temp, Filters__initialiseProps;
            function _objectDestructuringEmpty(obj) { if (obj == null)
                throw new TypeError("Cannot destructure undefined"); }
            function _possibleConstructorReturn(self, call) { if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass)
                Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            } }
            console.log('filters');
            // const isSSR = () => true
            function routeWithQuery(newPath) {
                if (history.pushState) {
                    var path = window.location.protocol + '//' + window.location.host + newPath;
                    window.history.pushState({ path: path }, '', path);
                }
            }
            var RouteNavigationListener = function RouteNavigationListener() {
                var _this = this;
                _classCallCheck(this, RouteNavigationListener);
                this.addListener = function (listener) {
                    _this.listeners[listener] = listener;
                };
                this.emit = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }
                    Object.values(_this.listeners).map(function (x) {
                        return x.apply(undefined, args);
                    });
                };
                this.removeListener = function (listener) {
                    delete _this.listeners[listener];
                };
                this.listeners = {};
                if (typeof addEventListener === 'function') {
                    addEventListener('popstate', function (x) {
                        _this.emit(x);
                    });
                    addEventListener('pushstate', function (x) {
                        _this.emit(x);
                    });
                }
            };
            function getUrlQueryParameters(url) {
                var question = url.indexOf('?');
                var hash = url.indexOf('#');
                if (hash === -1 && question === -1)
                    return {};
                if (hash === -1)
                    hash = url.length;
                var query = question === -1 || hash === question + 1 ? url.substring(hash) : url.substring(question + 1, hash);
                var result = {};
                query.split('&').forEach(function (part) {
                    if (!part)
                        return;
                    part = part.split('+').join(' '); // replace every + with space, regexp-free version
                    var eq = part.indexOf('=');
                    var key = eq > -1 ? part.substr(0, eq) : part;
                    var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
                    var from = key.indexOf('[');
                    if (from === -1)
                        result[decodeURIComponent(key)] = val;
                    else {
                        var to = key.indexOf(']', from);
                        var index = decodeURIComponent(key.substring(from + 1, to));
                        key = decodeURIComponent(key.substring(0, from));
                        if (!result[key])
                            result[key] = [];
                        if (!index)
                            result[key].push(val);
                        else
                            result[key][index] = val;
                    }
                });
                return result;
            }
            function getFiltersFromUrl(url) {
                var params = getUrlQueryParameters(url);
                var out = {};
                if (params.i) {
                    try {
                        out = JSON.parse(params.i);
                    }
                    catch (e) {
                        console.error('Failed to parse query filters');
                    }
                }
                return out;
            }
            var listener = new RouteNavigationListener();
            var Filters_Filters = (_temp = _class2 = function (_Component) {
                _inherits(Filters, _Component);
                function Filters(props) {
                    _classCallCheck(this, Filters);
                    var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));
                    Filters__initialiseProps.call(_this2);
                    listener.addListener(_this2.onRoute);
                    var activities = {
                        capoeira: {
                            name: 'capoeira',
                            label: 'Capoeira',
                            type: 'activity'
                        },
                        ballet: {
                            name: 'ballet',
                            label: 'Ballet',
                            type: 'activity'
                        },
                        hip_hop: {
                            name: 'hip_hop',
                            label: 'Hip Hop',
                            type: 'activity'
                        },
                        break_dance: {
                            name: 'break_dance',
                            label: 'Break Dance',
                            type: 'activity'
                        },
                        salsa: {
                            name: 'salsa',
                            label: 'Salsa',
                            type: 'activity'
                        },
                        tap: {
                            name: 'tap',
                            label: 'Tap',
                            type: 'activity'
                        }
                    };
                    var url = is_ssr() ? props.url : location.href;
                    var filters = getFiltersFromUrl(url);
                    console.log('filters', filters);
                    var simulateToggle = {};
                    for (var key in activities) {
                        simulateToggle[key] = _this2.simulateToggleUrl(activities[key], filters).path;
                    }
                    _this2.state = {
                        filters: filters,
                        simulateToggle: simulateToggle,
                        activities: activities,
                        times: [{
                                name: '06',
                                label: '6am to 9am',
                                type: 'time'
                            }, {
                                name: '09',
                                label: '9am to 12am',
                                type: 'time'
                            }, {
                                name: '12',
                                label: '12am to 3pm',
                                type: 'time'
                            }, {
                                name: '15',
                                label: '3pm to 6pm',
                                type: 'time'
                            }, {
                                name: '18',
                                label: '6pm to 9pm',
                                type: 'time'
                            }, {
                                name: '21',
                                label: '9pm to 12pm',
                                type: 'time'
                            }]
                    };
                    return _this2;
                }
                Filters.prototype.componentDidMount = function componentDidMount() { };
                Filters.prototype.render = function render(_ref, _ref2) {
                    var _this3 = this;
                    var filters = _ref2.filters, simulateToggle = _ref2.simulateToggle, activities = _ref2.activities;
                    _objectDestructuringEmpty(_ref);
                    return Object(preact_min["h"])('div', {
                        className: filters_style_default.a.filtersWrapper + ' ' + (this.props.active ? '' : filters_style_default.a.close)
                    }, Object(preact_min["h"])('div', { className: filters_style_default.a.filters }, Object(preact_min["h"])('div', { className: filters_style_default.a.header }, Object(preact_min["h"])('a', { href: '/search', className: filters_style_default.a.button }, 'Reset'), Object(preact_min["h"])('div', { className: filters_style_default.a.title }, 'FILTERS'), Object(preact_min["h"])('a', {
                        href: this.simulateBackToSearchUrl(),
                        onClick: this.onDone,
                        className: filters_style_default.a.button
                    }, 'Done')), Object(preact_min["h"])('div', { className: filters_style_default.a.section }, Object(preact_min["h"])('div', { className: filters_style_default.a.sectionHeader }, Object(preact_min["h"])('div', { className: filters_style_default.a.sectionTitle }, 'TIME')), Object(preact_min["h"])('div', { className: filters_style_default.a.checkBoxesContainer }, this.state.times.map(function (x) {
                        return Object(preact_min["h"])('div', {
                            onClick: _this3.toggle(x),
                            className: filters_style_default.a.checkBox + ' ' + (x.name in filters ? filters_style_default.a.active : '')
                        }, Object(preact_min["h"])('div', { className: filters_style_default.a.label }, x.label), Object(preact_min["h"])('div', { className: '' + filters_style_default.a.tick }));
                    }))), Object(preact_min["h"])('div', { className: filters_style_default.a.section }, Object(preact_min["h"])('div', { className: filters_style_default.a.sectionHeader }, Object(preact_min["h"])('div', { className: filters_style_default.a.sectionTitle }, 'ACTIVITIES')), Object(preact_min["h"])('div', { className: filters_style_default.a.checkBoxesContainer }, Object.values(activities).map(function (x) {
                        return Object(preact_min["h"])('a', {
                            href: '' + simulateToggle[x.name],
                            onClick: _this3.toggle(x),
                            className: filters_style_default.a.checkBox + ' ' + (x.name in filters ? filters_style_default.a.active : '')
                        }, Object(preact_min["h"])('div', { className: filters_style_default.a.label }, x.label, ' '), Object(preact_min["h"])('div', { className: '' + filters_style_default.a.tick }));
                    })))));
                };
                return Filters;
            }(preact_min["Component"]), Filters__initialiseProps = function _initialiseProps() {
                var _this4 = this;
                this.onRoute = function (event) {
                    console.log('event', event);
                };
                this.simulateToggleUrl = function (x, _filters) {
                    var filters = JSON.parse(JSON.stringify(_filters));
                    if (x.name in filters) {
                        delete filters[x.name];
                    }
                    else {
                        filters[x.name] = { type: x.type };
                    }
                    var params = Object.keys(filters).length ? '?i=' + JSON.stringify(filters) : '';
                    var path = '/search/filters' + params;
                    return { path: path, filters: filters };
                };
                this.toggle = function (x) {
                    return function (event) {
                        event.stopPropagation();
                        event.preventDefault();
                        var prevFilters = _this4.state.filters;
                        var _simulateToggleUrl = _this4.simulateToggleUrl(x, prevFilters), path = _simulateToggleUrl.path, filters = _simulateToggleUrl.filters;
                        _this4.setState({ filters: filters }, function () {
                            return routeWithQuery(path);
                        });
                    };
                };
                this.simulateBackToSearchUrl = function () {
                    if (is_ssr())
                        return _this4.props.url.replace('/filters', '');
                    return location.pathname.replace('/filters', '') + location.search;
                };
                this.onDone = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var path = _this4.simulateBackToSearchUrl();
                    console.log('path', path);
                    Object(preact_router_es["route"])(path);
                };
            }, _temp);
            // CONCATENATED MODULE: ./components/search/Search.js
            var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            } return target; };
            function Search__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            } }
            function Search__possibleConstructorReturn(self, call) { if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
            function Search__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass)
                Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
            console.log('search');
            var Search_Search = function (_Component) {
                Search__inherits(Search, _Component);
                function Search(props) {
                    Search__classCallCheck(this, Search);
                    var _this = Search__possibleConstructorReturn(this, _Component.call(this, props));
                    _this.state = {
                        now: dayjs_min_default()(),
                        classes: [{
                                id: 1,
                                instructor: {
                                    name: 'Alexander Smith',
                                    avatar: 'https://api.adorable.io/avatars/60/alexander@smith.png'
                                },
                                title: 'Introduction to Bachata',
                                price: 12,
                                tags: ['bachata'],
                                startTime: '07:30',
                                duration: 'Alexander Smith',
                                venue: {
                                    area: 'Covent Garden',
                                    name: 'Pineapple Dance Studios'
                                }
                            }, {
                                id: 2,
                                instructor: {
                                    name: 'Alexander Smith',
                                    avatar: 'https://api.adorable.io/avatars/60/alexander@smith.png'
                                },
                                title: 'Introduction to Bachata',
                                price: 12,
                                tags: ['bachata'],
                                startTime: '07:30',
                                duration: 'Alexander Smith',
                                venue: {
                                    area: 'Covent Garden',
                                    name: 'Pineapple Dance Studios'
                                }
                            }]
                    };
                    _this.simulateToFiltersUrl = function () {
                        if (is_ssr()) {
                            return _this.props.url.replace('/search', '/search/filters');
                        }
                        return location.pathname.replace('/search', '/search/filters') + location.search;
                    };
                    _this.routeToFilters = function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        Object(preact_router_es["route"])(_this.simulateToFiltersUrl());
                    };
                    console.log('props', props);
                    return _this;
                }
                Search.prototype.componentDidMount = function componentDidMount() {
                    this.setState({
                        now: dayjs_min_default()()
                    });
                };
                Search.prototype.render = function render() {
                    return Object(preact_min["h"])('div', { className: components_search_style_default.a.search }, Object(preact_min["h"])('div', { className: components_search_style_default.a.dayWrapper }, Object(preact_min["h"])('div', { className: components_search_style_default.a.leftArrow }), Object(preact_min["h"])('div', null, this.state.now.format('dddd D MMM').toUpperCase()), Object(preact_min["h"])('div', { className: components_search_style_default.a.rightArrow })), Object(preact_min["h"])('div', { className: components_search_style_default.a.listItems }, this.state.classes.map(function (item) {
                        return Object(preact_min["h"])('div', { className: components_search_style_default.a.listItemWrapper }, Object(preact_min["h"])('div', { className: components_search_style_default.a.listItem }, Object(preact_min["h"])('div', { className: components_search_style_default.a.listItemAside }, Object(preact_min["h"])('div', { className: components_search_style_default.a.startTime }, item.startTime), Object(preact_min["h"])('div', { className: components_search_style_default.a.price }, '\xA3', item.price)), Object(preact_min["h"])('div', { className: components_search_style_default.a.listItemMain }, Object(preact_min["h"])('div', { className: components_search_style_default.a.tags }, item.tags.map(function (x, i) {
                            return Object(preact_min["h"])('a', {
                                className: components_search_style_default.a.tag,
                                key: i,
                                href: '/search/tag/' + x
                            }, '#', x);
                        })), Object(preact_min["h"])('div', { className: components_search_style_default.a.title }, item.title), Object(preact_min["h"])('div', { className: components_search_style_default.a.venue }, Object(preact_min["h"])('div', null, item.venue.name), Object(preact_min["h"])('div', null, item.venue.area)), Object(preact_min["h"])('div', { className: components_search_style_default.a.instructor }, Object(preact_min["h"])('img', {
                            className: components_search_style_default.a.instructorAvatar,
                            alt: item.instructor.name,
                            src: item.instructor.avatar
                        }), Object(preact_min["h"])('div', { className: components_search_style_default.a.instructorName }, item.instructor.name))), Object(preact_min["h"])('div', { className: components_search_style_default.a.listItemAction }, Object(preact_min["h"])('a', {
                            className: components_search_style_default.a.itemActionLink,
                            href: '/classes/' + item.id
                        }, Object(preact_min["h"])('span', { className: components_search_style_default.a.rightArrow })))));
                    })), Object(preact_min["h"])(Filters_Filters, _extends({}, this.props, {
                        active: this.props.path === '/search/filters'
                    })), Object(preact_min["h"])('div', { className: components_search_style_default.a.filtersButtonWrapper }, Object(preact_min["h"])('div', { className: components_search_style_default.a.filtersButtonContainer }, Object(preact_min["h"])('a', {
                        href: this.simulateToFiltersUrl(),
                        onClick: this.routeToFilters,
                        className: components_search_style_default.a.filtersButton
                    }, Object(preact_min["h"])('div', { className: components_search_style_default.a.filterIcon }), 'Filters'), Object(preact_min["h"])('a', { href: '/search/map-view', className: components_search_style_default.a.filtersButton }, Object(preact_min["h"])('div', { className: components_search_style_default.a.filterIcon + ' ' + components_search_style_default.a.mapIcon }), 'Map View'))));
                };
                return Search;
            }(preact_min["Component"]);
            // CONCATENATED MODULE: ./routes/search/index.js
            var search_SearchPage = function SearchPage(props) {
                return Object(preact_min["h"])('div', { 'class': search_style_default.a.search }, Object(preact_min["h"])(Search_Search, props));
            };
            /* harmony default export */ var search = (search_SearchPage);
            // EXTERNAL MODULE: ./routes/profile/style.css
            var profile_style = __webpack_require__("Tv6c");
            var profile_style_default = /*#__PURE__*/ __webpack_require__.n(profile_style);
            // CONCATENATED MODULE: ./routes/profile/index.js
            function profile__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            } }
            function profile__possibleConstructorReturn(self, call) { if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
            function profile__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass)
                Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
            var _ref3 = Object(preact_min["h"])('amp-carousel', { width: '450', height: '300' }, Object(preact_min["h"])('amp-img', {
                src: 'https://picsum.photos/id/1/450/300',
                width: '450',
                height: '300'
            }, ''), Object(preact_min["h"])('amp-img', {
                src: 'https://picsum.photos/id/300/450/300',
                width: '450',
                height: '300'
            }, ''), Object(preact_min["h"])('amp-img', {
                src: 'https://picsum.photos/id/3/450/300',
                width: '450',
                height: '300'
            }, ''));
            var profile_Profile = function (_Component) {
                profile__inherits(Profile, _Component);
                function Profile() {
                    var _temp, _this, _ret;
                    profile__classCallCheck(this, Profile);
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }
                    return _ret = (_temp = (_this = profile__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
                        time: Date.now(),
                        count: 10
                        // update the current time
                    }, _this.updateTime = function () {
                        _this.setState({ time: Date.now() });
                    }, _this.increment = function () {
                        _this.setState({ count: _this.state.count + 1 });
                    }, _temp), profile__possibleConstructorReturn(_this, _ret);
                }
                // gets called when this route is navigated to
                Profile.prototype.componentDidMount = function componentDidMount() {
                    // start a timer for the clock:
                    this.timer = setInterval(this.updateTime, 1000);
                };
                // gets called just before navigating away from the route
                Profile.prototype.componentWillUnmount = function componentWillUnmount() {
                    clearInterval(this.timer);
                };
                // Note: `user` comes from the URL, courtesy of our router
                Profile.prototype.render = function render(_ref, _ref2) {
                    var user = _ref.user;
                    var time = _ref2.time, count = _ref2.count;
                    return Object(preact_min["h"])('div', { 'class': profile_style_default.a.profile }, Object(preact_min["h"])('h1', null, 'Profile: ', user), Object(preact_min["h"])('p', null, 'This is the user profile for a user named ', user, '.'), Object(preact_min["h"])('div', null, 'Current time: ', new Date(time).toLocaleString()), Object(preact_min["h"])('p', null, Object(preact_min["h"])('button', { onClick: this.increment }, 'Click Me'), ' Clicked ', count, ' ', 'times.'), _ref3);
                };
                return Profile;
            }(preact_min["Component"]);
            // CONCATENATED MODULE: ./components/app.js
            var app__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            } return target; };
            function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) {
                if (keys.indexOf(i) >= 0)
                    continue;
                if (!Object.prototype.hasOwnProperty.call(obj, i))
                    continue;
                target[i] = obj[i];
            } return target; }
            function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            } }
            function app__possibleConstructorReturn(self, call) { if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
            function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass)
                Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
            // Code-splitting is automated for routes
            // import { exec } from 'preact-router/src/util'
            var listen = function listen() {
                var _console;
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                return (_console = console).log.apply(_console, ['listen'].concat(args));
            };
            preact_router_es["subscribers"].push(listen);
            var pages = [{
                    component: home,
                    path: '/'
                }, {
                    component: search,
                    path: '/search/'
                }, {
                    component: search,
                    path: '/search/map/'
                }, {
                    component: search,
                    path: '/search/filters'
                }, {
                    component: profile_Profile,
                    path: '/profile/',
                    user: 'me'
                }, {
                    component: profile_Profile,
                    path: '/profile/:user'
                }];
            var app__ref2 = Object(preact_min["h"])(header, null);
            var app__ref3 = Object(preact_min["h"])('div', {
                style: 'justify-content: center; align-items: center; flex: 1; height: 100vh;',
                'default': true
            }, '404 Not Found');
            var _ref4 = Object(preact_min["h"])('pre', null, 'JSON.stringify(this.props.ssrData)');
            var app_App = function (_Component) {
                app__inherits(App, _Component);
                function App() {
                    var _temp, _this, _ret;
                    app__classCallCheck(this, App);
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                    }
                    return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
                        _this.currentUrl = e.url;
                    }, _temp), app__possibleConstructorReturn(_this, _ret);
                }
                /** Gets fired when the route changes.
                 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
                 *	@param {string} event.url	The newly routed URL
                 * /search
                 * /search/map
                 * /search/filters
                 */
                App.prototype.render = function render(_ref) {
                    var _this2 = this;
                    var url = _ref.url;
                    console.log('subscribers', preact_router_es["subscribers"]);
                    console.log('this.props app', this.props, is_ssr());
                    // window.exec = exec
                    // pages.map(x => {
                    //   console.log('exec', this.props)
                    //   if (!url) return
                    //   const { path, component, ...rest } = x
                    //   console.log('rest', rest, url)
                    //   const match = exec(url, x.path, rest)
                    //   console.log('path, match', path, match)
                    // })
                    return Object(preact_min["h"])('div', { id: 'app' }, app__ref2, Object(preact_min["h"])(preact_router_es["Router"], { url: this.props.url, onChange: this.handleRoute }, pages.map(function (x) {
                        var Component = x.component, rest = _objectWithoutProperties(x, ['component']);
                        return Object(preact_min["h"])(Component, app__extends({}, rest, _this2.props));
                    }), app__ref3), _ref4, Object(preact_min["h"])('pre', null, JSON.stringify(this.props.ssrData)));
                };
                return App;
            }(preact_min["Component"]);
            app_App.pages = pages;
            app_App.Router = preact_router_es["Router"];
            // CONCATENATED MODULE: ./index.js
            if (typeof window !== 'undefined') {
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', function () {
                        console.log('Request Register service worker');
                        navigator.serviceWorker.register('/service-worker.js');
                    });
                }
            }
            /* harmony default export */ var index = __webpack_exports__["default"] = (app_App);
            /***/ 
        }),
        /***/ "KM04": 
        /***/ (function (module, exports, __webpack_require__) {
            !function () {
                "use strict";
                function e(e, t) {
                    var n, o, r, i, l = W;
                    for (i = arguments.length; i-- > 2;) {
                        P.push(arguments[i]);
                    }
                    t && null != t.children && (P.length || P.push(t.children), delete t.children);
                    while (P.length) {
                        if ((o = P.pop()) && void 0 !== o.pop)
                            for (i = o.length; i--;) {
                                P.push(o[i]);
                            }
                        else
                            "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
                    }
                    var a = new T();
                    return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
                }
                function t(e, t) {
                    for (var n in t) {
                        e[n] = t[n];
                    }
                    return e;
                }
                function n(e, t) {
                    e && ("function" == typeof e ? e(t) : e.current = t);
                }
                function o(n, o) {
                    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
                }
                function r(e) {
                    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
                }
                function i() {
                    var e;
                    while (e = V.pop()) {
                        e.__d && x(e);
                    }
                }
                function l(e, t, n) {
                    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
                }
                function a(e, t) {
                    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
                }
                function u(e) {
                    var n = t({}, e.attributes);
                    n.children = e.children;
                    var o = e.nodeName.defaultProps;
                    if (void 0 !== o)
                        for (var r in o) {
                            void 0 === n[r] && (n[r] = o[r]);
                        }
                    return n;
                }
                function c(e, t) {
                    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);
                    return n.__n = e, n;
                }
                function p(e) {
                    var t = e.parentNode;
                    t && t.removeChild(e);
                }
                function s(e, t, o, r, i) {
                    if ("className" === t && (t = "class"), "key" === t)
                        ;
                    else if ("ref" === t)
                        n(o, null), n(r, e);
                    else if ("class" !== t || i) {
                        if ("style" === t) {
                            if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
                                if ("string" != typeof o)
                                    for (var l in o) {
                                        l in r || (e.style[l] = "");
                                    }
                                for (var l in r) {
                                    e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
                                }
                            }
                        }
                        else if ("dangerouslySetInnerHTML" === t)
                            r && (e.innerHTML = r.__html || "");
                        else if ("o" == t[0] && "n" == t[1]) {
                            var a = t !== (t = t.replace(/Capture$/, ""));
                            t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
                        }
                        else if ("list" !== t && "type" !== t && !i && t in e) {
                            try {
                                e[t] = null == r ? "" : r;
                            }
                            catch (e) { }
                            null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
                        }
                        else {
                            var u = i && t !== (t = t.replace(/^xlink:?/, ""));
                            null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
                        }
                    }
                    else
                        e.className = r || "";
                }
                function _(e) {
                    return this.__l[e.type](M.event && M.event(e) || e);
                }
                function f() {
                    var e;
                    while (e = A.shift()) {
                        M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
                    }
                }
                function d(e, t, n, o, r, i) {
                    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));
                    var l = h(e, t, n, o, i);
                    return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
                }
                function h(e, t, n, o, r) {
                    var i = e, l = R;
                    if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t)
                        return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;
                    var u = t.nodeName;
                    if ("function" == typeof u)
                        return N(e, t, n, o);
                    if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
                        while (e.firstChild) {
                            i.appendChild(e.firstChild);
                        }
                        e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
                    }
                    var p = i.firstChild, s = i.__preactattr_, _ = t.children;
                    if (null == s) {
                        s = i.__preactattr_ = {};
                        for (var f = i.attributes, d = f.length; d--;) {
                            s[f[d].name] = f[d].value;
                        }
                    }
                    return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
                }
                function m(e, t, n, o, r) {
                    var i, a, u, c, s, _ = e.childNodes, f = [], d = {}, m = 0, b = 0, y = _.length, g = 0, w = t ? t.length : 0;
                    if (0 !== y)
                        for (var C = 0; C < y; C++) {
                            var x = _[C], N = x.__preactattr_, k = w && N ? x._component ? x._component.__k : N.key : null;
                            null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
                        }
                    if (0 !== w)
                        for (var C = 0; C < w; C++) {
                            c = t[C], s = null;
                            var k = c.key;
                            if (null != k)
                                m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);
                            else if (b < g)
                                for (i = b; i < g; i++) {
                                    if (void 0 !== f[i] && l(a = f[i], c, r)) {
                                        s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;
                                        break;
                                    }
                                }
                            s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
                        }
                    if (m)
                        for (var C in d) {
                            void 0 !== d[C] && v(d[C], !1);
                        }
                    while (b <= g) {
                        void 0 !== (s = f[g--]) && v(s, !1);
                    }
                }
                function v(e, t) {
                    var o = e._component;
                    o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
                }
                function b(e) {
                    e = e.lastChild;
                    while (e) {
                        var t = e.previousSibling;
                        v(e, !0), e = t;
                    }
                }
                function y(e, t, n) {
                    var o;
                    for (o in n) {
                        t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
                    }
                    for (o in t) {
                        "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
                    }
                }
                function g(e, t, n) {
                    var o, r = F.length;
                    e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);
                    while (r--) {
                        if (F[r].constructor === e)
                            return o.__b = F[r].__b, F.splice(r, 1), o;
                    }
                    return o;
                }
                function w(e, t, n) {
                    return this.constructor(e, n);
                }
                function C(e, t, o, i, l) {
                    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
                }
                function x(e, n, o, r) {
                    if (!e.__x) {
                        var i, l, a, c = e.props, p = e.state, s = e.context, _ = e.__p || c, h = e.__s || p, m = e.__c || s, b = e.base, y = e.__b, w = b || y, N = e._component, U = !1, S = m;
                        if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
                            i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));
                            var L, T, P = i && i.nodeName;
                            if ("function" == typeof P) {
                                var W = u(i);
                                l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
                            }
                            else
                                a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));
                            if (w && T !== w && l !== N) {
                                var D = w.parentNode;
                                D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
                            }
                            if (L && k(L), e.base = T, T && !r) {
                                var E = e, V = e;
                                while (V = V.__u) {
                                    (E = V).base = T;
                                }
                                T._component = E, T._componentConstructor = E.constructor;
                            }
                        }
                        !b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));
                        while (e.__h.length) {
                            e.__h.pop().call(e);
                        }
                        H || r || f();
                    }
                }
                function N(e, t, n, o) {
                    var r = e && e._component, i = r, l = e, a = r && e._componentConstructor === t.nodeName, c = a, p = u(t);
                    while (r && !c && (r = r.__u)) {
                        c = r.constructor === t.nodeName;
                    }
                    return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
                }
                function k(e) {
                    M.beforeUnmount && M.beforeUnmount(e);
                    var t = e.base;
                    e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;
                    var o = e._component;
                    o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
                }
                function U(e, t) {
                    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
                }
                function S(e, t, n) {
                    return d(n, e, {}, !1, t, !1);
                }
                function L() {
                    return {};
                }
                var T = function T() { }, M = {}, P = [], W = [], D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout, E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i, V = [], A = [], H = 0, R = !1, B = !1, F = [];
                t(U.prototype, { setState: function setState(e, n) {
                        this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
                    }, forceUpdate: function forceUpdate(e) {
                        e && this.__h.push(e), x(this, 2);
                    }, render: function render() { } });
                var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M };
                true ? module.exports = j : self.preact = j;
            }();
            //# sourceMappingURL=preact.min.js.map
            /***/ 
        }),
        /***/ "Tv6c": 
        /***/ (function (module, exports) {
            // removed by extract-text-webpack-plugin
            module.exports = { "profile": "profile__t2Dqz" };
            /***/ 
        }),
        /***/ "ZAL5": 
        /***/ (function (module, exports) {
            // removed by extract-text-webpack-plugin
            module.exports = { "home": "home__MseGd" };
            /***/ 
        }),
        /***/ "rq4c": 
        /***/ (function (module, exports) {
            // removed by extract-text-webpack-plugin
            /***/ 
        }),
        /***/ "sw5u": 
        /***/ (function (module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Link = exports.Match = undefined;
            var _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
                return target;
            };
            var _preact = __webpack_require__("KM04");
            var _preactRouter = __webpack_require__("/QC5");
            function _objectWithoutProperties(obj, keys) {
                var target = {};
                for (var i in obj) {
                    if (keys.indexOf(i) >= 0)
                        continue;
                    if (!Object.prototype.hasOwnProperty.call(obj, i))
                        continue;
                    target[i] = obj[i];
                }
                return target;
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }
            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
                if (superClass)
                    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var Match = exports.Match = function (_Component) {
                _inherits(Match, _Component);
                function Match() {
                    var _temp, _this, _ret;
                    _classCallCheck(this, Match);
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }
                    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
                        _this.nextUrl = url;
                        _this.setState({});
                    }, _temp), _possibleConstructorReturn(_this, _ret);
                }
                Match.prototype.componentDidMount = function componentDidMount() {
                    _preactRouter.subscribers.push(this.update);
                };
                Match.prototype.componentWillUnmount = function componentWillUnmount() {
                    _preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
                };
                Match.prototype.render = function render(props) {
                    var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(), path = url.replace(/\?.+$/, '');
                    this.nextUrl = null;
                    return props.children[0] && props.children[0]({
                        url: url,
                        path: path,
                        matches: path === props.path
                    });
                };
                return Match;
            }(_preact.Component);
            var Link = function Link(_ref) {
                var activeClassName = _ref.activeClassName, path = _ref.path, props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);
                return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
                    var matches = _ref2.matches;
                    return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
                });
            };
            exports.Link = Link;
            exports.default = Match;
            Match.Link = Link;
            /***/ 
        }),
        /***/ "ujxd": 
        /***/ (function (module, exports) {
            // removed by extract-text-webpack-plugin
            module.exports = { "filtersWrapper": "filtersWrapper__3DXok", "close": "close__3YC_j", "filters": "filters__2Mi00", "header": "header__1Q-0o", "button": "button__2O3PH", "section": "section__2Vu0e", "sectionHeader": "sectionHeader__7zBDh", "sectionTitle": "sectionTitle__3OWFO", "checkBoxesContainer": "checkBoxesContainer__1pJev", "checkBox": "checkBox__2NH0p", "label": "label__1AZ7E", "tick": "tick__1DFlr", "active": "active__619x7" };
            /***/ 
        })
        /******/ 
    });
//# sourceMappingURL=ssr-bundle.js.map
