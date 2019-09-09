module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
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
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
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
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
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
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

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

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

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

	if (Component$$1) Router.__proto__ = Component$$1;
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

/***/ }),

/***/ "/Umn":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__3IhT1","active":"active__2kmrA","menuIcon":"menuIcon__3xzM7"};

/***/ }),

/***/ "3dZY":
/***/ (function(module, exports, __webpack_require__) {

!function (t, n) {
   true ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t.dayjs = n();
}(this, function () {
  "use strict";
  var t = "millisecond",
      n = "second",
      e = "minute",
      r = "hour",
      i = "day",
      s = "week",
      u = "month",
      o = "quarter",
      a = "year",
      h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
      f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      c = function c(t, n, e) {
    var r = String(t);return !r || r.length >= n ? t : "" + Array(n + 1 - r.length).join(e) + t;
  },
      d = { s: c, z: function z(t) {
      var n = -t.utcOffset(),
          e = Math.abs(n),
          r = Math.floor(e / 60),
          i = e % 60;return (n <= 0 ? "+" : "-") + c(r, 2, "0") + ":" + c(i, 2, "0");
    }, m: function m(t, n) {
      var e = 12 * (n.year() - t.year()) + (n.month() - t.month()),
          r = t.clone().add(e, u),
          i = n - r < 0,
          s = t.clone().add(e + (i ? -1 : 1), u);return Number(-(e + (n - r) / (i ? r - s : s - r)) || 0);
    }, a: function a(t) {
      return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
    }, p: function p(h) {
      return { M: u, y: a, w: s, d: i, h: r, m: e, s: n, ms: t, Q: o }[h] || String(h || "").toLowerCase().replace(/s$/, "");
    }, u: function u(t) {
      return void 0 === t;
    } },
      $ = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") },
      l = "en",
      m = {};m[l] = $;var y = function y(t) {
    return t instanceof v;
  },
      M = function M(t, n, e) {
    var r;if (!t) return l;if ("string" == typeof t) m[t] && (r = t), n && (m[t] = n, r = t);else {
      var i = t.name;m[i] = t, r = i;
    }return e || (l = r), r;
  },
      g = function g(t, n, e) {
    if (y(t)) return t.clone();var r = n ? "string" == typeof n ? { format: n, pl: e } : n : {};return r.date = t, new v(r);
  },
      D = d;D.l = M, D.i = y, D.w = function (t, n) {
    return g(t, { locale: n.$L, utc: n.$u });
  };var v = function () {
    function c(t) {
      this.$L = this.$L || M(t.locale, null, !0), this.parse(t);
    }var d = c.prototype;return d.parse = function (t) {
      this.$d = function (t) {
        var n = t.date,
            e = t.utc;if (null === n) return new Date(NaN);if (D.u(n)) return new Date();if (n instanceof Date) return new Date(n);if ("string" == typeof n && !/Z$/i.test(n)) {
          var r = n.match(h);if (r) return e ? new Date(Date.UTC(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)) : new Date(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0);
        }return new Date(n);
      }(t), this.init();
    }, d.init = function () {
      var t = this.$d;this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
    }, d.$utils = function () {
      return D;
    }, d.isValid = function () {
      return !("Invalid Date" === this.$d.toString());
    }, d.isSame = function (t, n) {
      var e = g(t);return this.startOf(n) <= e && e <= this.endOf(n);
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
      var h = this,
          f = !!D.u(o) || o,
          c = D.p(t),
          d = function d(t, n) {
        var e = D.w(h.$u ? Date.UTC(h.$y, n, t) : new Date(h.$y, n, t), h);return f ? e : e.endOf(i);
      },
          $ = function $(t, n) {
        return D.w(h.toDate()[t].apply(h.toDate(), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)), h);
      },
          l = this.$W,
          m = this.$M,
          y = this.$D,
          M = "set" + (this.$u ? "UTC" : "");switch (c) {case a:
          return f ? d(1, 0) : d(31, 11);case u:
          return f ? d(1, m) : d(0, m + 1);case s:
          var g = this.$locale().weekStart || 0,
              v = (l < g ? l + 7 : l) - g;return d(f ? y - v : y + (6 - v), m);case i:case "date":
          return $(M + "Hours", 0);case r:
          return $(M + "Minutes", 1);case e:
          return $(M + "Seconds", 2);case n:
          return $(M + "Milliseconds", 3);default:
          return this.clone();}
    }, d.endOf = function (t) {
      return this.startOf(t, !1);
    }, d.$set = function (s, o) {
      var h,
          f = D.p(s),
          c = "set" + (this.$u ? "UTC" : ""),
          d = (h = {}, h[i] = c + "Date", h.date = c + "Date", h[u] = c + "Month", h[a] = c + "FullYear", h[r] = c + "Hours", h[e] = c + "Minutes", h[n] = c + "Seconds", h[t] = c + "Milliseconds", h)[f],
          $ = f === i ? this.$D + (o - this.$W) : o;if (f === u || f === a) {
        var l = this.clone().set("date", 1);l.$d[d]($), l.init(), this.$d = l.set("date", Math.min(this.$D, l.daysInMonth())).toDate();
      } else d && this.$d[d]($);return this.init(), this;
    }, d.set = function (t, n) {
      return this.clone().$set(t, n);
    }, d.get = function (t) {
      return this[D.p(t)]();
    }, d.add = function (t, o) {
      var h,
          f = this;t = Number(t);var c = D.p(o),
          d = function d(n) {
        var e = g(f);return D.w(e.date(e.date() + Math.round(n * t)), f);
      };if (c === u) return this.set(u, this.$M + t);if (c === a) return this.set(a, this.$y + t);if (c === i) return d(1);if (c === s) return d(7);var $ = (h = {}, h[e] = 6e4, h[r] = 36e5, h[n] = 1e3, h)[c] || 1,
          l = this.valueOf() + t * $;return D.w(l, this);
    }, d.subtract = function (t, n) {
      return this.add(-1 * t, n);
    }, d.format = function (t) {
      var n = this;if (!this.isValid()) return "Invalid Date";var e = t || "YYYY-MM-DDTHH:mm:ssZ",
          r = D.z(this),
          i = this.$locale(),
          s = this.$H,
          u = this.$m,
          o = this.$M,
          a = i.weekdays,
          h = i.months,
          c = function c(t, r, i, s) {
        return t && (t[r] || t(n, e)) || i[r].substr(0, s);
      },
          d = function d(t) {
        return D.s(s % 12 || 12, t, "0");
      },
          $ = i.meridiem || function (t, n, e) {
        var r = t < 12 ? "AM" : "PM";return e ? r.toLowerCase() : r;
      },
          l = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: o + 1, MM: D.s(o + 1, 2, "0"), MMM: c(i.monthsShort, o, h, 3), MMMM: h[o] || h(this, e), D: this.$D, DD: D.s(this.$D, 2, "0"), d: String(this.$W), dd: c(i.weekdaysMin, this.$W, a, 2), ddd: c(i.weekdaysShort, this.$W, a, 3), dddd: a[this.$W], H: String(s), HH: D.s(s, 2, "0"), h: d(1), hh: d(2), a: $(s, u, !0), A: $(s, u, !1), m: String(u), mm: D.s(u, 2, "0"), s: String(this.$s), ss: D.s(this.$s, 2, "0"), SSS: D.s(this.$ms, 3, "0"), Z: r };return e.replace(f, function (t, n) {
        return n || l[t] || r.replace(":", "");
      });
    }, d.utcOffset = function () {
      return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
    }, d.diff = function (t, h, f) {
      var c,
          d = D.p(h),
          $ = g(t),
          l = 6e4 * ($.utcOffset() - this.utcOffset()),
          m = this - $,
          y = D.m(this, $);return y = (c = {}, c[a] = y / 12, c[u] = y, c[o] = y / 3, c[s] = (m - l) / 6048e5, c[i] = (m - l) / 864e5, c[r] = m / 36e5, c[e] = m / 6e4, c[n] = m / 1e3, c)[d] || m, f ? y : D.a(y);
    }, d.daysInMonth = function () {
      return this.endOf(u).$D;
    }, d.$locale = function () {
      return m[this.$L];
    }, d.locale = function (t, n) {
      if (!t) return this.$L;var e = this.clone();return e.$L = M(t, n, !0), e;
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
  }();return g.prototype = v.prototype, g.extend = function (t, n) {
    return t(n, v, g), g;
  }, g.locale = M, g.isDayjs = y, g.unix = function (t) {
    return g(1e3 * t);
  }, g.en = m[l], g.Ls = m, g;
});

/***/ }),

/***/ "492T":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"search":"search__2fBVV"};

/***/ }),

/***/ "6hN1":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"classDetailWrapper":"classDetailWrapper__2T8mX","heroImage":"heroImage__Qr4BU","back":"back__1aQJI","timeLabel":"timeLabel__1dmWn","main":"main__ieBPs","mainTitle":"mainTitle__3QRdT","address":"address__teZVQ","description":"description__25Gbt","section":"section__1vexu","title":"title__gjFEQ","instructorAvatar":"instructorAvatar__25zFg","well":"well__372E6","wellIcon":"wellIcon__3hDcb","wellMain":"wellMain__1JhNM","wellDescription":"wellDescription__1PEH9","wellAction":"wellAction__3j7JB","priceLabel":"priceLabel__3dyS3"};

/***/ }),

/***/ "Dnk9":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"footer":"footer__YnoJr","hide":"hide__3aVn4","disabled":"disabled__gp8z1","button":"button__2PQ5O"};

/***/ }),

/***/ "GjWG":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"formContainer":"formContainer__1XJ08"};

/***/ }),

/***/ "J4GW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"search":"search__2-8Kz","listItems":"listItems__16EqL","infoWrapper":"infoWrapper__3cbB8","infoMessage":"infoMessage__9F7UF","infoIcon":"infoIcon__84nL1","title":"title__2iaYI","listItemWrapper":"listItemWrapper__21eW2","listItemLink":"listItemLink__3j4FE","listItem":"listItem__29e2n","listItemAction":"listItemAction__1tmWk","listItemMain":"listItemMain__2KU1-","listItemAside":"listItemAside__1m9LH","itemActionLink":"itemActionLink__3B_OP","startTime":"startTime__-cf_E","price":"price__2Elbz","category":"category__g6hkq","venue":"venue__1vLQq","instructor":"instructor__1SQ9m","filtersButtonWrapper":"filtersButtonWrapper__3uNOD","filtersButtonContainer":"filtersButtonContainer__2eD-l","filtersButton":"filtersButton__2nkFI","filterIcon":"filterIcon__IAjqJ","filterCount":"filterCount__2uHeF","mapIcon":"mapIcon__3PXt2","dayWrapper":"dayWrapper__2wPmt"};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ./components/header/style.scss
var header_style = __webpack_require__("/Umn");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./utils/is-ssr.js
var isSSR = function isSSR() {
  return typeof window === 'undefined';
};
/* harmony default export */ var is_ssr = (isSSR);
// EXTERNAL MODULE: ./components/menu/style.scss
var menu_style = __webpack_require__("ygVF");
var menu_style_default = /*#__PURE__*/__webpack_require__.n(menu_style);

// CONCATENATED MODULE: ./components/menu/Menu.js


function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Menu_Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Menu.prototype.render = function render(_ref, _ref2) {
    var active = _ref.active,
        onClose = _ref.onClose;

    _objectDestructuringEmpty(_ref2);

    return Object(preact_min["h"])(
      'div',
      { className: menu_style_default.a.menuWrapper + ' ' + (active ? '' : menu_style_default.a.close) },
      Object(preact_min["h"])(
        'div',
        { className: menu_style_default.a.menu },
        Object(preact_min["h"])(
          'div',
          { className: menu_style_default.a.header },
          Object(preact_min["h"])(
            'div',
            { className: menu_style_default.a.button, onClick: onClose },
            'Close'
          )
        ),
        Object(preact_min["h"])(
          'div',
          { className: menu_style_default.a.section },
          Object(preact_min["h"])(
            'div',
            { className: menu_style_default.a.sectionHeader },
            Object(preact_min["h"])(
              'a',
              { className: menu_style_default.a.sectionTitle, onClick: onClose, href: '/' },
              'HOME'
            )
          ),
          Object(preact_min["h"])(
            'div',
            { className: menu_style_default.a.sectionHeader },
            Object(preact_min["h"])(
              'a',
              {
                className: menu_style_default.a.sectionTitle,
                onClick: onClose,
                href: '/search'
              },
              'CLASSES'
            )
          )
        )
      )
    );
  };

  return Menu;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/header/index.js


function header__objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function header__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function header__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function header__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var header_Header = function (_Component) {
  header__inherits(Header, _Component);

  function Header() {
    var _temp, _this, _ret;

    header__classCallCheck(this, Header);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = header__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.toggleMenu = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    }, _this.render = function (_ref, _ref2) {
      var isOpen = _ref2.isOpen;

      header__objectDestructuringEmpty(_ref);

      return Object(preact_min["h"])(
        'header',
        { className: header_style_default.a.header + ' ' },
        Object(preact_min["h"])(
          'h1',
          null,
          Object(preact_min["h"])(
            match["Link"],
            { activeClassName: header_style_default.a.active, href: '/' },
            'instructorlist ',
            is_ssr() && '⚡'
          )
        ),
        Object(preact_min["h"])(
          'nav',
          null,
          Object(preact_min["h"])(match["Link"], {
            onClick: _this.toggleMenu,
            className: header_style_default.a.menuIcon,
            activeClassName: header_style_default.a.active
          })
        ),
        Object(preact_min["h"])(Menu_Menu, { onClose: _this.toggleMenu, active: isOpen })
      );
    }, _temp), header__possibleConstructorReturn(_this, _ret);
  }

  return Header;
}(preact_min["Component"]);

/* harmony default export */ var header = (header_Header);
// EXTERNAL MODULE: ./routes/home/style.css
var home_style = __webpack_require__("ZAL5");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// CONCATENATED MODULE: ./routes/home/index.js




var home__ref = Object(preact_min["h"])(
  'h1',
  null,
  'Home'
);

var home__ref2 = Object(preact_min["h"])(
  'p',
  null,
  'Go to ',
  Object(preact_min["h"])(
    'a',
    { href: '/search/' },
    'search'
  ),
  '.'
);

var home_Home = function Home() {
  return Object(preact_min["h"])(
    'div',
    { 'class': home_style_default.a.home },
    home__ref,
    home__ref2
  );
};

home_Home.getInitialProps = function () {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ rgeat: 1 });
    }, 300);
  });
};

/* harmony default export */ var home = (home_Home);
// EXTERNAL MODULE: ./routes/search/style.scss
var search_style = __webpack_require__("492T");
var search_style_default = /*#__PURE__*/__webpack_require__.n(search_style);

// EXTERNAL MODULE: ./components/search/style.scss
var components_search_style = __webpack_require__("J4GW");
var components_search_style_default = /*#__PURE__*/__webpack_require__.n(components_search_style);

// EXTERNAL MODULE: ../node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__("3dZY");
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);

// EXTERNAL MODULE: ./components/filters/style.scss
var filters_style = __webpack_require__("ujxd");
var filters_style_default = /*#__PURE__*/__webpack_require__.n(filters_style);

// CONCATENATED MODULE: ./utils/getUrlQueryParameters.js
function getUrlQueryParameters(url) {
  var question = url.indexOf('?');
  var hash = url.indexOf('#');
  if (hash === -1 && question === -1) return {};
  if (hash === -1) hash = url.length;
  var query = question === -1 || hash === question + 1 ? url.substring(hash) : url.substring(question + 1, hash);
  var result = {};
  query.split('&').forEach(function (part) {
    if (!part) return;
    part = part.split('+').join(' '); // replace every + with space, regexp-free version
    var eq = part.indexOf('=');
    var key = eq > -1 ? part.substr(0, eq) : part;
    var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
    var from = key.indexOf('[');
    if (from === -1) result[decodeURIComponent(key)] = val;else {
      var to = key.indexOf(']', from);
      var index = decodeURIComponent(key.substring(from + 1, to));
      key = decodeURIComponent(key.substring(0, from));
      if (!result[key]) result[key] = [];
      if (!index) result[key].push(val);else result[key][index] = val;
    }
  });
  return result;
}
// CONCATENATED MODULE: ./utils/getFiltersFromUrl.js


function getFiltersFromUrl(url) {
  var params = getUrlQueryParameters(url);
  var out = {};
  if (params.i) {
    try {
      out = JSON.parse(params.i);
    } catch (e) {
      console.error('Failed to parse query filters');
    }
  }
  return out;
}
// CONCATENATED MODULE: ./utils/routeWithQuery.js
function routeWithQuery(newPath) {
  if (history.pushState) {
    var path = window.location.protocol + '//' + window.location.host + newPath;
    window.history.pushState({ path: path }, '', path);
  }
}
// CONCATENATED MODULE: ./components/filters/Filters.js
var _class, Filters__temp, Filters__initialiseProps;



function Filters__objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function Filters__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Filters__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Filters__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var Filters_activities = {
  capoeira: {
    name: 'capoeira',
    label: 'Capoeira',
    type: 'category'
  },
  ballet: {
    name: 'ballet',
    label: 'Ballet',
    type: 'category'
  },
  hip_hop: {
    name: 'hip_hop',
    label: 'Hip Hop',
    type: 'category'
  },
  break_dance: {
    name: 'break_dance',
    label: 'Break Dance',
    type: 'category'
  },
  salsa: {
    name: 'salsa',
    label: 'Salsa',
    type: 'category'
  },
  tap: {
    name: 'tap',
    label: 'Tap',
    type: 'category'
  }

  // TODO: fix day
  // Needs to redirect correctly - add as param to routing
  // Remove day from filters
  // On done just replace filters
  // Search doesn't update filters?
  // What about Location? - shared state between all three components
  // Keep filters state in search - update from any other
  //

};var Filters_Filters = (Filters__temp = _class = function (_Component) {
  Filters__inherits(Filters, _Component);

  function Filters(props) {
    Filters__classCallCheck(this, Filters);

    var _this = Filters__possibleConstructorReturn(this, _Component.call(this, props));

    Filters__initialiseProps.call(_this);

    var url = is_ssr() ? props.url : location.href;
    var filters = getFiltersFromUrl(url);

    var simulateToggle = {};
    for (var key in Filters_activities) {
      simulateToggle[key] = _this.simulateToggleUrl(Filters_activities[key], filters).path;
    }

    _this.state = {
      filters: filters,
      simulateToggle: simulateToggle,
      activities: Filters_activities,
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
    return _this;
  }

  Filters.prototype.componentDidMount = function componentDidMount() {};

  Filters.prototype.render = function render(_ref, _ref2) {
    var _this2 = this;

    var filters = _ref2.filters,
        simulateToggle = _ref2.simulateToggle,
        activities = _ref2.activities;

    Filters__objectDestructuringEmpty(_ref);

    return Object(preact_min["h"])(
      'div',
      {
        className: filters_style_default.a.filtersWrapper + ' ' + (this.props.active ? '' : filters_style_default.a.close)
      },
      Object(preact_min["h"])(
        'div',
        { className: filters_style_default.a.filters },
        Object(preact_min["h"])(
          'div',
          { className: filters_style_default.a.header },
          Object(preact_min["h"])(
            'a',
            { href: '/search', onClick: this.onReset, className: filters_style_default.a.button },
            'Reset'
          ),
          Object(preact_min["h"])(
            'div',
            { className: filters_style_default.a.title },
            'FILTERS'
          ),
          Object(preact_min["h"])(
            'a',
            {
              href: this.simulateBackToSearchUrl(),
              onClick: this.onDone,
              className: filters_style_default.a.button
            },
            'Done'
          )
        ),
        Object(preact_min["h"])(
          'div',
          { className: filters_style_default.a.section },
          Object(preact_min["h"])(
            'div',
            { className: filters_style_default.a.sectionHeader },
            Object(preact_min["h"])(
              'div',
              { className: filters_style_default.a.sectionTitle },
              'TIME'
            )
          ),
          Object(preact_min["h"])(
            'div',
            { className: filters_style_default.a.checkBoxesContainer },
            this.state.times.map(function (x) {
              return Object(preact_min["h"])(
                'div',
                {
                  onClick: _this2.toggle(x),
                  className: filters_style_default.a.checkBox + ' ' + (x.name in filters ? filters_style_default.a.active : '')
                },
                Object(preact_min["h"])(
                  'div',
                  { className: filters_style_default.a.label },
                  x.label
                ),
                Object(preact_min["h"])('div', { className: '' + filters_style_default.a.tick })
              );
            })
          )
        ),
        Object(preact_min["h"])(
          'div',
          { className: filters_style_default.a.section },
          Object(preact_min["h"])(
            'pre',
            null,
            JSON.stringify(filters, null, 2)
          ),
          Object(preact_min["h"])(
            'div',
            { className: filters_style_default.a.sectionHeader },
            Object(preact_min["h"])(
              'div',
              { className: filters_style_default.a.sectionTitle },
              'ACTIVITIES'
            )
          ),
          Object(preact_min["h"])(
            'div',
            { className: filters_style_default.a.checkBoxesContainer },
            Object.values(activities).map(function (x) {
              return Object(preact_min["h"])(
                'a',
                {
                  href: '' + simulateToggle[x.name],
                  onClick: _this2.toggle(x),
                  className: filters_style_default.a.checkBox + ' ' + (x.name in filters ? filters_style_default.a.active : '')
                },
                Object(preact_min["h"])(
                  'div',
                  { className: filters_style_default.a.label },
                  x.label,
                  ' '
                ),
                Object(preact_min["h"])('div', { className: '' + filters_style_default.a.tick })
              );
            })
          )
        )
      )
    );
  };

  return Filters;
}(preact_min["Component"]), Filters__initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onRoute = function (event) {
    console.log('event', event);
  };

  this.simulateToggleUrl = function (x, _filters) {
    var filters = JSON.parse(JSON.stringify(_filters));
    if (x.name in filters) {
      delete filters[x.name];
    } else {
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
      var prevFilters = _this3.state.filters;

      console.log('prevFilters', prevFilters);

      var _simulateToggleUrl = _this3.simulateToggleUrl(x, prevFilters),
          path = _simulateToggleUrl.path,
          filters = _simulateToggleUrl.filters;

      _this3.setState({ filters: filters }, function () {
        return routeWithQuery(path);
      });
    };
  };

  this.simulateBackToSearchUrl = function () {
    if (is_ssr()) return _this3.props.url.replace('/filters', '');
    return location.pathname.replace('/filters', '') + location.search;
  };

  this.onDone = function (event) {
    event.preventDefault();
    event.stopPropagation();
    var path = _this3.simulateBackToSearchUrl();
    console.log('path', path);
    if (_this3.props.onDone) {
      _this3.props.onDone(_this3.state.filters);
    }
    Object(preact_router_es["route"])(path);
  };

  this.onReset = function (event) {
    event.preventDefault();
    event.stopPropagation();
    var path = '/search';
    _this3.setState({ filters: {} });
    if (_this3.props.onDone) {
      _this3.props.onDone({});
    }
    Object(preact_router_es["route"])(path);
  };
}, Filters__temp);

// CONCATENATED MODULE: ./utils/classNames.js
var classNames = function classNames(obj) {
  return Object.entries(obj).filter(function (e) {
    return e[1];
  }).map(function (e) {
    return e[0];
  }).join(' ');
};

/* harmony default export */ var utils_classNames = (classNames);
// CONCATENATED MODULE: ./components/search/Search.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Search__class, Search__temp, Search__initialiseProps;



function Search__objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function Search__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Search__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Search__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var timeToMinutes = function timeToMinutes(time) {
  var _time$split = time.split(':'),
      a = _time$split[0],
      b = _time$split[1];

  return parseInt(a) * 60 + parseInt(b);
};

if (!is_ssr()) window.dayjs = dayjs_min_default.a;

function parseDate(day) {
  // Required as parsing date is different on server
  if (day && day.length) {
    var split = day.split('-');
    if (split.length === 3) {
      var year = parseInt(split[0]);
      var month = parseInt(split[1]) - 1;
      var date = parseInt(split[2]);
      console.log('year, month, date', year, month, date);
      return dayjs_min_default()().set('date', date).set('month', month).set('year', year);
    }
  }
  return dayjs_min_default()();
}

var _ref3 = Object(preact_min["h"])('img', {
  width: '85',
  height: '119',
  src: '/assets/images/dancing.gif',
  alt: 'loading'
});

var _ref4 = Object(preact_min["h"])(
  'div',
  null,
  'Loading'
);

var _ref5 = Object(preact_min["h"])('span', { className: 'rightArrow' });

var Search_Search = (Search__temp = Search__class = function (_Component) {
  Search__inherits(Search, _Component);

  function Search(props) {
    Search__classCallCheck(this, Search);

    var _this = Search__possibleConstructorReturn(this, _Component.call(this, props));

    Search__initialiseProps.call(_this);

    console.log('constructor_props', props.date);
    var filters = getFiltersFromUrl(props.url || location.href) || {};
    var filterCount = _this.getFilterCount(filters);
    // || dayjs().format('YYYY-MM-DD')
    var day = parseDate(props.date);
    console.log('url day', props.date, day.format('dddd D MMM'));
    var allClasses = props.data.state.classes;
    console.log('constructed with filters', filters);
    _this.state = {
      day: day,
      filters: filters,
      filterCount: filterCount,
      allClasses: allClasses,
      classes: _this.doLocalSearch(allClasses, day)
    };
    return _this;
  }

  Search.prototype.componentDidMount = function componentDidMount() {
    return new Promise(function ($return, $error) {
      return Promise.resolve(this.doSearch()).then(function ($await_1) {
        try {
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    }.bind(this));
  };

  Search.prototype.render = function render(_ref, _ref2) {
    var _classNames, _classNames2;

    var day = _ref2.day,
        filters = _ref2.filters,
        filterCount = _ref2.filterCount;

    Search__objectDestructuringEmpty(_ref);

    return Object(preact_min["h"])(
      'div',
      { className: components_search_style_default.a.search },
      Object(preact_min["h"])(
        'div',
        { className: components_search_style_default.a.dayWrapper },
        Object(preact_min["h"])('a', {
          href: this.simulateAddDayUrl(-1, day, filters).url,
          onClick: this.addDay(-1),
          className: 'leftArrow'
        }),
        Object(preact_min["h"])(
          'div',
          null,
          this.state.day.format('dddd D MMM').toUpperCase()
        ),
        Object(preact_min["h"])('a', {
          href: (this.simulateAddDayUrl(1), day, filters).url,
          onClick: this.addDay(1),
          className: 'rightArrow'
        })
      ),
      Object(preact_min["h"])(
        'div',
        {
          className: classNames((_classNames = {}, _classNames[components_search_style_default.a.infoWrapper] = true, _classNames.hide = this.state.isLoading || this.state.classes.length !== 0, _classNames))
        },
        Object(preact_min["h"])(
          'div',
          { className: components_search_style_default.a.infoMessage },
          Object(preact_min["h"])('div', { className: 'shrug ' + components_search_style_default.a.infoIcon }),
          Object(preact_min["h"])(
            'div',
            { className: components_search_style_default.a.title },
            'No classes found'
          )
        )
      ),
      Object(preact_min["h"])(
        'div',
        {
          className: classNames((_classNames2 = {}, _classNames2[components_search_style_default.a.infoWrapper] = true, _classNames2.hide = !this.state.isLoading || this.state.classes.length !== 0, _classNames2))
        },
        _ref3,
        _ref4
      ),
      Object(preact_min["h"])(
        'div',
        { className: components_search_style_default.a.listItems },
        this.state.classes && this.state.classes.map(function (item) {
          return Object(preact_min["h"])(
            'div',
            {
              onClick: function onClick() {
                return Object(preact_router_es["route"])('/classes/' + item.id + '?i=1');
              },
              className: components_search_style_default.a.listItemWrapper
            },
            is_ssr() && Object(preact_min["h"])('a', {
              className: components_search_style_default.a.listItemLink,
              href: '/classes/' + item.id + '?i=1'
            }),
            Object(preact_min["h"])(
              'div',
              { className: components_search_style_default.a.listItem },
              Object(preact_min["h"])(
                'div',
                { className: components_search_style_default.a.listItemAside },
                Object(preact_min["h"])(
                  'div',
                  { className: components_search_style_default.a.startTime },
                  item.start_time
                ),
                Object(preact_min["h"])(
                  'div',
                  { className: components_search_style_default.a.price },
                  '\xA3',
                  item.price
                )
              ),
              Object(preact_min["h"])(
                'div',
                { className: components_search_style_default.a.listItemMain },
                Object(preact_min["h"])(
                  'div',
                  { className: components_search_style_default.a.categories },
                  item.categories.map(function (x, i) {
                    return Object(preact_min["h"])(
                      'a',
                      {
                        className: components_search_style_default.a.category,
                        key: i,
                        href: '/search/category/' + x
                      },
                      '#',
                      x.name.toLowerCase()
                    );
                  })
                ),
                Object(preact_min["h"])(
                  'div',
                  { className: components_search_style_default.a.title },
                  item.title
                ),
                Object(preact_min["h"])(
                  'div',
                  { className: components_search_style_default.a.venue },
                  Object(preact_min["h"])(
                    'div',
                    null,
                    item.venue.name
                  ),
                  Object(preact_min["h"])(
                    'div',
                    null,
                    item.venue.area
                  )
                ),
                item.instructors[0] && Object(preact_min["h"])(
                  'div',
                  { className: components_search_style_default.a.instructor },
                  Object(preact_min["h"])('img', {
                    className: components_search_style_default.a.instructorAvatar,
                    alt: item.instructors[0].name,
                    src: item.instructors[0].avatar || 'https://api.adorable.io/avatars/60/' + item.instructors[0].email + '.png'
                  }),
                  Object(preact_min["h"])(
                    'div',
                    { className: components_search_style_default.a.instructorName },
                    item.instructors[0].name
                  )
                )
              ),
              Object(preact_min["h"])(
                'div',
                { className: components_search_style_default.a.listItemAction },
                Object(preact_min["h"])(
                  'a',
                  {
                    className: components_search_style_default.a.itemActionLink,
                    href: '/classes/' + item.id
                  },
                  _ref5
                )
              )
            )
          );
        })
      ),
      Object(preact_min["h"])(Filters_Filters, _extends({}, this.props, {
        onDone: this.onDone,
        active: this.props.path.indexOf('/search/:date/filters') === 0
      })),
      Object(preact_min["h"])(
        'div',
        { className: components_search_style_default.a.filtersButtonWrapper },
        Object(preact_min["h"])(
          'div',
          { className: components_search_style_default.a.filtersButtonContainer },
          Object(preact_min["h"])(
            'a',
            {
              href: this.simulateToFiltersUrl(),
              onClick: this.routeToFilters,
              className: components_search_style_default.a.filtersButton
            },
            Object(preact_min["h"])('div', { className: components_search_style_default.a.filterIcon }),
            'Filters',
            filterCount > 0 && Object(preact_min["h"])(
              'div',
              { className: components_search_style_default.a.filterCount },
              filterCount
            )
          ),
          Object(preact_min["h"])(
            'a',
            { href: '/search/map-view', className: components_search_style_default.a.filtersButton },
            Object(preact_min["h"])('div', { className: components_search_style_default.a.filterIcon + ' ' + components_search_style_default.a.mapIcon }),
            'Map View'
          )
        )
      )
    );
  };

  return Search;
}(preact_min["Component"]), Search__initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getFilterCount = function (filters) {
    return typeof filters === 'object' ? Object.keys(filters).filter(function (key) {
      return key !== 'day';
    }).length : 0;
  };

  this.doSearch = function () {
    return new Promise(function ($return, $error) {
      var _state, filters, day, res;

      console.log('do searc');
      _state = _this2.state, filters = _state.filters, day = _state.day;
      return Promise.resolve(_this2.setState({ isLoading: true })).then(function ($await_2) {
        try {
          return Promise.resolve(_this2.props.data.getSearch(filters)).then(function ($await_3) {
            try {
              res = $await_3;
              return Promise.resolve(_this2.setState({ isLoading: false })).then(function ($await_4) {
                try {
                  console.log('gotSearch', res.results);
                  _this2.setState({
                    day: day || parseDate(_this2.props.date),
                    allClasses: res.results
                  }, _this2.doLocalSearch);
                  return $return();
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }, $error);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }, $error);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  };

  this.doLocalSearch = function () {
    var allClasses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.state.allClasses;
    var day = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this2.state.day;

    if (!day.isValid()) console.error('Invalid Date');
    var dayFilter = day.day();
    var classes = Object.values(allClasses).filter(function (item) {
      if (item.day !== dayFilter) return false;
      var matchedACategory = false;
      var hasCategories = false;

      // Basic search
      for (var key in _this2.state.filters) {
        if (_this2.state.filters.hasOwnProperty(key)) {
          var filter = _this2.state.filters[key];
          if (filter.type === 'time') {
            var start = timeToMinutes(item.start_time);
            var fStart = parseInt(key) * 60;
            var filterDuration = 3 * 60;
            var fEnd = fStart + filterDuration;
            console.log('start, fStart, fEnd', start, fStart, fEnd);
            if (start < fStart || start > fEnd) return false;
          } else if (filter.type === 'category' && !matchedACategory) {
            hasCategories = true;
            for (var i = 0; i < item.categories.length; i++) {
              var category = item.categories[i];
              console.log('category', category, filter);
              if (category.name.toLowerCase() === key.toLowerCase()) {
                matchedACategory = true;
              }
            }
          }
        }
      }

      console.log('matchedACategory , hasCategories', matchedACategory, hasCategories);
      if (!matchedACategory && hasCategories) return false;
      return true;
    });
    console.log('classes', classes);
    _this2.setState({ classes: classes });
    return classes;
  };

  this.simulateToFiltersUrl = function () {
    // a = '/search/8392-23-4/'
    // const split = a.split('/')
    // if (split.length)
    // a = '/search?'
    // a = '/search'

    // "/search".replace(new RegExp(`(\/search\/?(${day})?)`), `/search/2019-09-08/filters`)

    // https://localhost:8080/search/2019-09-23/?i={}
    var day = _this2.state.day.format('YYYY-MM-DD');
    var rgx = new RegExp('(/search/?(' + day + ')?)/?');
    'https://localhost:8080/search/2019-09-23/?i={}'.replace(new RegExp('(/search/?(' + day + ')?)/?'), '/search/2019-09-08/filters');
    var newPath = '/search/' + day + '/filters';
    if (is_ssr()) {
      return _this2.props.url.replace(rgx, newPath);
    }
    console.log('location.pathname.replace(rgx, newPath) + location.search', location.pathname, newPath, location.pathname.replace(rgx, newPath) + location.search);
    return location.pathname.replace(rgx, newPath) + location.search;
  };

  this.onDone = function (filters) {
    _this2.setState({
      filters: filters,
      filterCount: _this2.getFilterCount(filters)
    }, _this2.doLocalSearch);
  };

  this.routeToFilters = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return Object(preact_router_es["route"])(_this2.simulateToFiltersUrl());
  };

  this.addDay = function (x) {
    return function (e) {
      e.preventDefault();
      e.stopPropagation();
      var _state2 = _this2.state,
          _day = _state2.day,
          _filters = _state2.filters;

      var _simulateAddDayUrl = _this2.simulateAddDayUrl(x, _day, _filters),
          day = _simulateAddDayUrl.day,
          filters = _simulateAddDayUrl.filters,
          url = _simulateAddDayUrl.url;

      _this2.setState({ day: day, filters: filters }, _this2.doLocalSearch);
      Object(preact_router_es["route"])(url);
    };
  };

  this.simulateAddDayUrl = function (x, day) {
    var filters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    day = dayjs_min_default()(day).add(x, 'day');
    var dayString = dayjs_min_default()(day).format('YYYY-MM-DD');
    var url = '/search/' + dayString + '/?i=' + JSON.stringify(filters);
    return { day: day, filters: filters, url: url };
  };
}, Search__temp);

// CONCATENATED MODULE: ./routes/search/index.js





var search_SearchPage = function SearchPage(props) {
  return Object(preact_min["h"])(
    'div',
    { 'class': search_style_default.a.search },
    Object(preact_min["h"])(Search_Search, props)
  );
};

/* harmony default export */ var search = (search_SearchPage);

search_SearchPage.getInitialProps = function () {
  return new Promise(function ($return, $error) {
    var res, result;
    return Promise.resolve(fetch('https://instructorlist-django.herokuapp.com/api/classes')).then(function ($await_1) {
      try {
        res = $await_1;
        return Promise.resolve(res.json()).then(function ($await_2) {
          try {
            result = $await_2;
            console.log('result', result);
            return $return({
              classes: result
            });
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
};
// EXTERNAL MODULE: ./routes/class.page/style.css
var class_page_style = __webpack_require__("vbq8");
var class_page_style_default = /*#__PURE__*/__webpack_require__.n(class_page_style);

// EXTERNAL MODULE: ./components/classdetail/style.scss
var classdetail_style = __webpack_require__("6hN1");
var classdetail_style_default = /*#__PURE__*/__webpack_require__.n(classdetail_style);

// EXTERNAL MODULE: ./components/payment/style.scss
var payment_style = __webpack_require__("Mmjd");
var payment_style_default = /*#__PURE__*/__webpack_require__.n(payment_style);

// EXTERNAL MODULE: ./components/footerbutton/style.scss
var footerbutton_style = __webpack_require__("Dnk9");
var footerbutton_style_default = /*#__PURE__*/__webpack_require__.n(footerbutton_style);

// CONCATENATED MODULE: ./components/footerbutton/FooterButton.js


function FooterButton__objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function FooterButton__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function FooterButton__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function FooterButton__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var FooterButton_FooterButton = function (_Component) {
  FooterButton__inherits(FooterButton, _Component);

  function FooterButton() {
    var _temp, _this, _ret;

    FooterButton__classCallCheck(this, FooterButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = FooterButton__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onClick = function (e) {
      if (_this.props.disabled) {
        return e.preventDefault();
      }
      _this.props.onClick(e);
    }, _temp), FooterButton__possibleConstructorReturn(_this, _ret);
  }

  FooterButton.prototype.render = function render(_ref, _ref2) {
    var _classNames;

    var children = _ref.children,
        disabled = _ref.disabled,
        hide = _ref.hide;

    FooterButton__objectDestructuringEmpty(_ref2);

    return Object(preact_min["h"])(
      'div',
      {
        className: utils_classNames((_classNames = {}, _classNames[footerbutton_style_default.a.footer] = true, _classNames[footerbutton_style_default.a.disabled] = disabled, _classNames[footerbutton_style_default.a.hide] = hide, _classNames))
      },
      Object(preact_min["h"])(
        'button',
        { className: footerbutton_style_default.a.button, onClick: this.onClick, type: 'submit' },
        children
      )
    );
  };

  return FooterButton;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./utils/is-dev.js
var isDev = function isDev() {
  return typeof window !== 'undefined' && location.href.indexOf('localhost') > -1;
};
/* harmony default export */ var is_dev = (isDev);
// CONCATENATED MODULE: ./constants.js



var dayToDayString = {
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
  7: 'Sun'
};

var STRIPE_KEY = is_dev() ? 'pk_test_i0mT0MQhBYOTm3kcHw73xILH' : 'pk_test_i0mT0MQhBYOTm3kcHw73xILH';
// EXTERNAL MODULE: ./components/stripeform/style.scss
var stripeform_style = __webpack_require__("GjWG");
var stripeform_style_default = /*#__PURE__*/__webpack_require__.n(stripeform_style);

// EXTERNAL MODULE: ../node_modules/loadjs/dist/loadjs.umd.js
var loadjs_umd = __webpack_require__("r4pm");
var loadjs_umd_default = /*#__PURE__*/__webpack_require__.n(loadjs_umd);

// CONCATENATED MODULE: ./utils/convertArrayToObject.js
function convertArrayToObject(array, key) {
  if (!Array.isArray(array)) throw new Error('First argument must be array');
  return array.reduce(function (prev, acc) {
    acc[prev[key]] = prev;
    return acc;
  });
}
// CONCATENATED MODULE: ./api.js
function api__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var BASE_URL = is_dev() ? 'http://localhost:8000' : 'https://instructorlist-django.herokuapp.com';

var defaultClass = {
  id: 1,
  instructors: [{
    full_name: 'Alexander Smith',
    avatar: 'https://api.adorable.io/avatars/60/alexander@smith.png'
  }],
  title: 'Introduction to Bachata',
  price: 12,
  categories: [{ name: 'bachata' }],
  start_time: '07:30',
  duration: 'Alexander Smith',
  venue: {
    area: 'Covent Garden',
    name: 'Pineapple Dance Studios'
  }
};

var prerenderState = {
  classes: { 1: defaultClass }
};

var api_DataService = function DataService(initialState) {
  var _this = this;

  api__classCallCheck(this, DataService);

  this.getAllClasses = function () {
    return new Promise(function ($return, $error) {
      var classes;
      classes = _this.state.classes;

      if (classes) return $return(classes);
      return Promise.resolve(_this.getSearch()).then(function ($await_4) {
        try {
          return $return(_this.state.classes);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  };

  this.getSearch = function () {
    var $args = arguments;return new Promise(function ($return, $error) {
      var filters, url, res, json;
      filters = $args.length > 0 && $args[0] !== undefined ? $args[0] : {};

      if (!_this.hasPrerenderData || _this.state.search) return $return(_this.state.search);
      url = BASE_URL + '/api/search/?i=' + JSON.stringify(filters);
      res = void 0;
      var $Try_1_Post = function () {
        try {
          if (res.ok) {
            return Promise.resolve(res.json()).then(function ($await_5) {
              try {
                json = $await_5;
                _this.state.search = json;
                _this.state.classes = convertArrayToObject(json.results, 'id');
                _this.state.categories = json.categories;
                _this.state.venues = json.venues;
                _this.hasPrerenderData = false;
                return $return(json);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }, $error);
          }
          return $return(res);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      };var $Try_1_Catch = function (e) {
        try {
          res = {
            ok: false,
            data: { message: 'You are offline' }
          };
          return $Try_1_Post();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      };try {
        return Promise.resolve(fetch(url)).then(function ($await_6) {
          try {
            res = $await_6;
            return $Try_1_Post();
          } catch ($boundEx) {
            return $Try_1_Catch($boundEx);
          }
        }, $Try_1_Catch);
      } catch (e) {
        $Try_1_Catch(e)
      }
    });
  };

  this.getClass = function (id) {
    return new Promise(function ($return, $error) {
      var res, json;

      if (id in _this.state.classes && !_this.hasPrerenderData) {
        return $return(_this.state.classes[id]);
      }
      return Promise.resolve(fetch(BASE_URL + '/api/classes/' + id)).then(function ($await_7) {
        try {
          res = $await_7;
          if (res.ok) {
            return Promise.resolve(res.json()).then(function ($await_8) {
              try {
                json = $await_8;
                _this.state.classes[id] = json;
                return $return(json);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }, $error);
          }
          return $return(res);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    });
  };

  if (initialState) {
    this.state = initialState;
  } else {
    this.hasPrerenderData = true;
    this.state = prerenderState;
  }
};


// CONCATENATED MODULE: ./components/stripeform/StripeForm.js


function StripeForm__objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function StripeForm__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function StripeForm__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function StripeForm__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










function loadStripe() {
  return new Promise(function ($return, $error) {
    return Promise.resolve(new Promise(function (resolve) {
      return loadjs_umd_default()('https://js.stripe.com/v3/', resolve);
    })).then(function ($await_4) {
      try {
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}

var StripeForm__ref = Object(preact_min["h"])('div', { id: 'cc-form' });

var StripeElement = function (_Component) {
  StripeForm__inherits(StripeElement, _Component);

  function StripeElement() {
    StripeForm__classCallCheck(this, StripeElement);

    return StripeForm__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  StripeElement.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    // Important so that Stripe elements can be found by stripe Lib
    return false;
  };

  StripeElement.prototype.componentDidMount = function componentDidMount() {
    this.props.card.mount('#cc-form');
  };

  StripeElement.prototype.render = function render() {
    return StripeForm__ref;
  };

  return StripeElement;
}(preact_min["Component"]);

var StripeForm__ref2 = Object(preact_min["h"])('div', { id: 'payment-request-button' });

var StripePaymentRequestButton = function (_Component2) {
  StripeForm__inherits(StripePaymentRequestButton, _Component2);

  function StripePaymentRequestButton() {
    var _temp, _this2, _ret;

    StripeForm__classCallCheck(this, StripePaymentRequestButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = StripeForm__possibleConstructorReturn(this, _Component2.call.apply(_Component2, [this].concat(args))), _this2), _this2.mount = function () {
      return new Promise(function ($return, $error) {
        var result;
        return Promise.resolve(_this2.props.paymentRequest.canMakePayment()).then(function ($await_5) {
          try {
            result = $await_5;
            if (result) {
              _this2.props.prButton.mount('#payment-request-button');
            } else {
              document.getElementById('payment-request-button').style.display = 'none';
            }
            _this2.props.paymentRequest.on('paymentmethod', _this2.props.onPaymentMethod);
            return $return();
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      });
    }, _temp), StripeForm__possibleConstructorReturn(_this2, _ret);
  }

  StripePaymentRequestButton.prototype.componentDidMount = function componentDidMount() {
    this.mount();
  };

  StripePaymentRequestButton.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    // Important so that Stripe elements can be found by stripe Lib
    return false;
  };

  StripePaymentRequestButton.prototype.render = function render() {
    return StripeForm__ref2;
  };

  return StripePaymentRequestButton;
}(preact_min["Component"]);

var _ref8 = Object(preact_min["h"])(
  'div',
  null,
  'Loading stripe'
);

var StripeForm_StripeForm = function (_Component3) {
  StripeForm__inherits(StripeForm, _Component3);

  function StripeForm(props) {
    StripeForm__classCallCheck(this, StripeForm);

    var _this3 = StripeForm__possibleConstructorReturn(this, _Component3.call(this, props));

    _this3.registerStripeElements = function () {
      return new Promise(function ($return, $error) {
        var card, prButton, paymentRequest;

        if (!('Stripe' in window)) {
          _this3.setState({ loadingStripe: true });
          return Promise.resolve(loadStripe()).then(function ($await_6) {
            try {
              return $If_1.call(this);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }.bind(this), $error);
        }

        function $If_1() {
          _this3.setState({ loadingStripe: false });
          // TODO: get from env
          _this3.stripe = window.Stripe(STRIPE_KEY);
          _this3.elements = _this3.stripe.elements();
          card = _this3.elements.create('card', { hidePostalCode: true });
          prButton = void 0, paymentRequest = void 0;
          // const paymentRequest = this.stripe.paymentRequest({
          //   country: 'GB',
          //   currency: 'gbp',
          //   total: {
          //     label: 'Class price',
          //     amount: this.getAmount(),
          //   },
          //   requestPayerName: true,
          //   requestPayerEmail: true,
          // })
          // const prButton = this.elements.create('paymentRequestButton', {
          //   paymentRequest,
          // })
          console.log('card', card);
          _this3.setState({ card: card, prButton: prButton, paymentRequest: paymentRequest });
          return $return();
        }

        return $If_1.call(this);
      });
    };

    _this3.onSubmit = function (e) {
      return new Promise(function ($return, $error) {
        console.log('onstripesubmit');
        return $return(_this3.onSubmitCard(e));
      });
    };

    _this3.onSubmitCard = function (e) {
      return new Promise(function ($return, $error) {
        var res, billingDetails, response;
        return Promise.resolve(_this3.stripe.createPaymentMethod('card', _this3.state.card)).then(function ($await_7) {
          try {
            res = $await_7;
            if (res.error) return $return(res);
            billingDetails = res.billingDetails;

            _this3.setState({ billingDetails: billingDetails });
            return Promise.resolve(_this3.confirm('method', {
              payment_method_id: res.paymentMethod.id,
              amount: _this3.getAmount()
            })).then(function ($await_8) {
              try {
                response = $await_8;

                if (response.requires_action) {
                  return Promise.resolve(_this3.handleAction(response)).then(function ($await_9) {
                    try {
                      return $If_2.call(this);
                    } catch ($boundEx) {
                      return $error($boundEx);
                    }
                  }.bind(this), $error);
                }

                function $If_2() {
                  return $return(res);
                }

                return $If_2.call(this);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this), $error);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this), $error);
      });
    };

    _this3.handleAction = function (response) {
      return new Promise(function ($return, $error) {
        var res, body, confirmationRes;
        return Promise.resolve(_this3.stripe.handleCardAction(response.payment_intent_client_secret)).then(function ($await_10) {
          try {
            res = $await_10;

            console.log('actiionres', res);

            if (res.error) {
              // Show error from Stripe.js in payment form
              console.log('errorAction', res.error);
              return $return(res);
            }
            body = {
              payment_intent_id: res.paymentIntent.id,
              amount: _this3.getAmount()
            };
            return Promise.resolve(_this3.confirm('intent', body)).then(function ($await_11) {
              try {
                confirmationRes = $await_11;
                console.log('confirmationRes', confirmationRes);
                return $return(res);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }, $error);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      });
    };

    _this3.confirm = function (type, body) {
      return new Promise(function ($return, $error) {
        var response, confirmed;

        console.log('body', body);
        return Promise.resolve(fetch(BASE_URL + '/api/payment-' + type + '/confirm/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })).then(function ($await_12) {
          try {
            response = $await_12;

            return Promise.resolve(response.json()).then(function ($await_13) {
              try {
                confirmed = $await_13;
                console.log('confirmed', confirmed);
                return $return(confirmed);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }, $error);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      });
    };

    _this3.getAmount = function () {
      return parseFloat(_this3.props.amount) * 100;
    };

    _this3.onError = function (err) {
      _this3.props.onError(err);
    };

    _this3.getClientSecret = function () {
      return new Promise(function ($return, $error) {
        var res;
        return Promise.resolve(fetch(BASE_URL + '/api/intent/' + _this3.getAmount() + '/')).then(function ($await_14) {
          try {
            res = $await_14;
            console.log('res', res);
            if (res.ok) {
              return $return(res.json());
            }
            console.log('err', res);
            return $return(res);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      });
    };

    _this3.onPaymentMethod = function (ev) {
      return new Promise(function ($return, $error) {
        var _ref3, client_secret, _ref4, confirmError, paymentIntent, _ref5, error;

        return Promise.resolve(_this3.getClientSecret()).then(function ($await_15) {
          try {
            _ref3 = $await_15, client_secret = _ref3.client_secret;
            return Promise.resolve(_this3.stripe.confirmPaymentIntent(client_secret, {
              payment_method: ev.paymentMethod.id
            })).then(function ($await_16) {
              try {
                _ref4 = $await_16, confirmError = _ref4.error, paymentIntent = _ref4.paymentIntent;


                if (confirmError) {
                  // Report to the browser that the payment failed, prompting it to
                  // re-show the payment interface, or show an error message and close
                  // the payment interface.
                  ev.complete('fail');
                  return $If_3.call(this);
                } else {
                  // Report to the browser that the confirmation was successful, prompting
                  // it to close the browser payment method collection interface.
                  ev.complete('success');
                  // Let Stripe.js handle the rest of the payment flow.
                  return Promise.resolve(_this3.stripe.handleCardPayment(client_secret)).then(function ($await_17) {
                    try {
                      _ref5 = $await_17, error = _ref5.error;

                      if (error) {
                        // The payment failed -- ask your customer for a new payment method.
                        console.log('The payment failed -- ask your customer for a new payment method.');
                      } else {
                        // The payment has succeeded.
                        console.log('The payment has succeeded.');
                      }
                      return $If_3.call(this);
                    } catch ($boundEx) {
                      return $error($boundEx);
                    }
                  }.bind(this), $error);
                }

                function $If_3() {
                  return $return();
                }
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this), $error);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this), $error);
      });
    };

    console.log('construct');
    _this3.state = {
      loadingStripe: true,
      responses: []
    };
    _this3.props.onSubmit(_this3.onSubmit);
    return _this3;
  }

  StripeForm.prototype.componentDidUpdate = function componentDidUpdate() {
    console.log('did update');
  };

  StripeForm.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    // Important so that Stripe elements can be found by stripe Lib
    return nextState.loadingStripe === false && this.state.loadingStripe === true;
  };

  StripeForm.prototype.componentWillUnmount = function componentWillUnmount() {
    return new Promise(function ($return, $error) {
      console.log('willunmoutn');
      if (this.state.card) {
        this.state.card.destroy();
      }
      return $return();
    }.bind(this));
  };

  StripeForm.prototype.componentDidMount = function componentDidMount() {
    return new Promise(function ($return, $error) {
      console.log('mount');
      return Promise.resolve(this.registerStripeElements()).then(function ($await_18) {
        try {
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    }.bind(this));
  };

  StripeForm.prototype.render = function render(_ref6, _ref7) {
    var res = _ref7.res,
        loadingStripe = _ref7.loadingStripe;

    StripeForm__objectDestructuringEmpty(_ref6);

    console.log('rednder, loadingStripe', loadingStripe);
    return Object(preact_min["h"])(
      'div',
      null,
      loadingStripe ? _ref8 : Object(preact_min["h"])(
        'div',
        { key: 'formContainer', className: stripeform_style_default.a.formContainer },
        Object(preact_min["h"])(StripeElement, { key: 'card', card: this.state.card }),
        Object(preact_min["h"])(
          'pre',
          null,
          JSON.stringify(res, null, 2)
        )
      )
    );
  };

  return StripeForm;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/payment/Payment.js
var Payment__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function Payment__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Payment__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Payment__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var Payment__ref3 = Object(preact_min["h"])(
  'div',
  null,
  'Class not found'
);

var Payment__ref4 = Object(preact_min["h"])('div', null);

var Payment__ref5 = Object(preact_min["h"])('div', { className: 'hr' });

var Payment__ref6 = Object(preact_min["h"])('div', { className: 'hr' });

var Payment__ref7 = Object(preact_min["h"])('div', { className: 'hr' });

var Payment__ref8 = Object(preact_min["h"])('div', { className: 'bottom' });

var _ref9 = Object(preact_min["h"])(
  'div',
  null,
  'Pay now'
);

var Payment_Payment = function (_Component) {
  Payment__inherits(Payment, _Component);

  function Payment(props) {
    Payment__classCallCheck(this, Payment);

    var _this = Payment__possibleConstructorReturn(this, _Component.call(this, props));

    _this.onChange = function (name) {
      return function (e) {
        var _values;

        _this.setState({
          values: (_values = {}, _values[name] = e.target.value, _values)
        });
      };
    };

    _this.validateValues = function () {
      var values = _this.state.values;

      if (!('phone_number' in values)) {
        return { phone_number: 'Phone is not valid' };
      }
      var phone = values['phone_number'];
      var split = phone.split('+');
      if (split.length > 1) {
        return { phone_number: 'Phone number must have only one "+"' };
      }
      var rest = split[0];
      var isOnlyNumbers = /^\d+$/.test(rest);
      if (!isOnlyNumbers) {
        return { phone_number: 'Phone number must be made only of numbers' };
      }
      if (rest.length < 8) {
        return { phone_number: 'Phone number is too short' };
      }
      return {};
    };

    _this.onSubmit = function (e) {
      return new Promise(function ($return, $error) {
        var errors, error, _res, data, res;

        e.preventDefault();
        e.stopPropagation();
        console.log('onsubmit');
        _this.setState({ isSubmitting: true });
        _this.setState({ errors: {}, error: false });

        errors = _this.validateValues();
        error = errors.phone;
        if (errors.phone) return $return(_this.setState({ isSubmitting: false, errors: errors, error: error }));

        if (!_this.state.paymentMethod) {
          return Promise.resolve(_this.stripeSubmit(e)).then(function ($await_2) {
            try {
              _res = $await_2;
              console.log('res2', _res);
              if (_res.error) {
                return $return(_this.setState({ isSubmitting: false, error: _res.error.message }));
              }
              _this.setState({ paymentMethod: _res });
              return $If_1.call(this);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }.bind(this), $error);
        }

        function $If_1() {
          data = Payment__extends({
            paymentMethod: _this.state.paymentMethod,
            start_time: _this.props.item.start_time,
            end_time: _this.props.item.end_time,
            class_attended: _this.props.item.id,
            venue: _this.props.item.venue.id,
            email: _this.state.values.phone_number + '@example.com'
          }, _this.state.values);
          console.log('data', data);
          return Promise.resolve(_this.postBooking(data)).then(function ($await_3) {
            try {
              res = $await_3;
              console.log('res', res);
              if (res.error) {
                return $return(_this.setState({
                  isSubmitting: false,
                  error: res.error.message
                }));
              }
              alert(res.code);
              return $return(_this.setState({ isSubmitting: false, success: true, code: res.code }));
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }, $error);
        }

        return $If_1.call(this);
      });
    };

    _this.postBooking = function (data) {
      return new Promise(function ($return, $error) {
        var res;
        return Promise.resolve(fetch(BASE_URL + '/api/bookingsasdfad/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })).then(function ($await_4) {
          try {
            res = $await_4;
            console.log('res', res);
            if (!res.ok) {
              return $return({ error: { message: 'Issue making booking' } });
            }
            return $return(res.json());
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      });
    };

    _this.state = {
      formIsValid: false,
      paymentMethod: null,
      errors: {},
      values: {}
    };
    return _this;
  }

  Payment.prototype.render = function render(_ref, _ref2) {
    var _classNames,
        _this2 = this;

    var item = _ref.item,
        show = _ref.show;
    var errors = _ref2.errors,
        values = _ref2.values;

    console.log('show', show);
    if (!item) return Payment__ref3;
    return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(
        'form',
        {
          onSubmit: this.onSubmit,
          className: utils_classNames((_classNames = {}, _classNames[payment_style_default.a.paymentWrapper] = true, _classNames[payment_style_default.a.close] = !show, _classNames))
        },
        Object(preact_min["h"])(
          'div',
          { className: payment_style_default.a.paymentMain },
          Object(preact_min["h"])(
            'div',
            { className: payment_style_default.a.paymentHeader },
            Object(preact_min["h"])('div', {
              className: 'leftArrow ' + payment_style_default.a.back,
              onClick: this.props.onClose
            }),
            Object(preact_min["h"])(
              'div',
              { className: payment_style_default.a.title },
              'Checkout'
            ),
            Payment__ref4
          ),
          Payment__ref5,
          Object(preact_min["h"])(
            'div',
            { className: payment_style_default.a.section },
            Object(preact_min["h"])(
              'div',
              { className: payment_style_default.a.classTitle },
              item.title
            ),
            Object(preact_min["h"])(
              'div',
              { className: payment_style_default.a.time },
              dayToDayString[item.day],
              ' ',
              item.start_time,
              ' - ',
              item.end_time
            ),
            Object(preact_min["h"])(
              'div',
              { className: payment_style_default.a.location },
              item.venue.name,
              ' - ',
              item.venue.area
            )
          ),
          Payment__ref6,
          Object(preact_min["h"])(
            'div',
            { className: payment_style_default.a.section },
            Object(preact_min["h"])(
              'div',
              { className: payment_style_default.a.titleContainer },
              Object(preact_min["h"])(
                'div',
                { className: payment_style_default.a.title },
                'Total'
              ),
              Object(preact_min["h"])(
                'div',
                { className: payment_style_default.a.titleAside },
                '\xA3',
                parseFloat(item.price).toFixed(2)
              )
            ),
            item.extra_fee && Object(preact_min["h"])(
              'div',
              { key: 'extra_fee', className: payment_style_default.a.extra },
              'Please note this studio will charge you an additional',
              Object(preact_min["h"])(
                'div',
                { className: payment_style_default.a.strong },
                '\xA3',
                item.extra_fee,
                ' studio entry fee'
              ),
              'upon arrival.'
            )
          ),
          Payment__ref7,
          Object(preact_min["h"])(
            'div',
            { className: payment_style_default.a.section },
            Object(preact_min["h"])(
              'div',
              { className: payment_style_default.a.titleContainer },
              Object(preact_min["h"])(
                'div',
                { className: payment_style_default.a.title },
                'Payment'
              )
            ),
            Object(preact_min["h"])(
              'div',
              { className: 'errorContainer ' + (this.state.error || 'hide') },
              Object(preact_min["h"])(
                'div',
                { className: 'errorContainer_message' },
                this.state.error
              )
            ),
            Object(preact_min["h"])(
              'div',
              { className: payment_style_default.a.paymentForm },
              Object(preact_min["h"])(
                'div',
                { column: true, className: payment_style_default.a.inputContainer },
                Object(preact_min["h"])('input', {
                  type: 'text',
                  className: payment_style_default.a.input,
                  placeholder: 'Phone number',
                  name: 'phone_number',
                  key: 'phone_number',
                  value: values['phone_number'],
                  onChange: this.onChange('phone_number')
                })
              ),
              Object(preact_min["h"])(StripeForm_StripeForm, {
                key: 'StripeForm',
                amount: item.price,
                onSubmit: function onSubmit(onStripeSubmit) {
                  _this2.stripeSubmit = onStripeSubmit;
                }
              })
            )
          ),
          Payment__ref8
        ),
        Object(preact_min["h"])(
          FooterButton_FooterButton,
          {
            hide: !show
            // disabled={!this.state.formIsValid}
            , onClick: this.onSubmit
          },
          _ref9
        )
      )
    );
  };

  return Payment;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/classdetail/ClassDetail.js


function ClassDetail__objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function ClassDetail__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ClassDetail__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function ClassDetail__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var ClassDetail__ref3 = Object(preact_min["h"])(
  'div',
  { column: true, flex: true, jc: 'center', ai: 'center' },
  Object(preact_min["h"])('img', {
    width: '85',
    height: '119',
    src: '/assets/images/dancing.gif',
    alt: 'loading'
  }),
  Object(preact_min["h"])(
    'div',
    null,
    'Loading'
  )
);

var ClassDetail__ref4 = Object(preact_min["h"])('div', { className: 'leftArrow' });

var ClassDetail__ref5 = Object(preact_min["h"])('div', { className: 'directions' });

var ClassDetail__ref6 = Object(preact_min["h"])('div', { className: 'rightArrow' });

var ClassDetail__ref7 = Object(preact_min["h"])('div', { className: 'rightArrow' });

var ClassDetail_ClassDetail = function (_Component) {
  ClassDetail__inherits(ClassDetail, _Component);

  function ClassDetail(props) {
    ClassDetail__classCallCheck(this, ClassDetail);

    var _this = ClassDetail__possibleConstructorReturn(this, _Component.call(this, props));

    _this.onBack = function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (_this.props.i) {
        return window.history.back();
      }
      Object(preact_router_es["route"])('/search/');
    };

    _this.hidePayment = function (e) {
      _this.setState({ showPayment: false });
    };

    _this.state = {
      item: _this.props.data.state.classes[props.matches.id],
      showPayment: is_dev()
    };
    return _this;
  }

  ClassDetail.prototype.componentDidMount = function componentDidMount() {
    return new Promise(function ($return, $error) {
      var res;

      console.log('did mount');
      return Promise.resolve(this.props.data.getClass(this.props.matches.id)).then(function ($await_1) {
        try {
          res = $await_1;
          this.setState({
            item: res
          });
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }.bind(this));
  };

  ClassDetail.prototype.render = function render(_ref, _ref2) {
    var _this2 = this;

    var item = _ref2.item,
        showPayment = _ref2.showPayment;

    ClassDetail__objectDestructuringEmpty(_ref);

    if (!item) return ClassDetail__ref3;
    var instructor = item.instructors[0];
    var profile = instructor.profile || { bio: '' };
    return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(Payment_Payment, {
        show: showPayment,
        onClose: this.hidePayment,
        item: item
      }),
      Object(preact_min["h"])(
        'div',
        { className: classdetail_style_default.a.classDetailWrapper },
        Object(preact_min["h"])(
          'div',
          { className: classdetail_style_default.a.classHero },
          Object(preact_min["h"])(
            'div',
            { className: classdetail_style_default.a.heroImage },
            Object(preact_min["h"])('img', {
              src: item.hero_image_url || '/assets/images/class.jpeg',
              alt: item.title
            }),
            Object(preact_min["h"])(
              'a',
              {
                onClick: this.onBack,
                href: '/search',
                className: '' + classdetail_style_default.a.back
              },
              ClassDetail__ref4
            ),
            Object(preact_min["h"])(
              'div',
              { className: classdetail_style_default.a.timeLabel },
              dayToDayString[item.day].toUpperCase(),
              ' ',
              item.start_time,
              ' -',
              ' ',
              item.end_time
            )
          )
        ),
        Object(preact_min["h"])(
          'div',
          { className: classdetail_style_default.a.main },
          Object(preact_min["h"])(
            'div',
            { className: classdetail_style_default.a.mainTitle },
            item.title
          ),
          Object(preact_min["h"])(
            'div',
            { className: classdetail_style_default.a.address },
            item.venue.name,
            ' ',
            item.venue.area
          ),
          Object(preact_min["h"])(
            'a',
            {
              href: item.venue.google_maps_url ? item.venue.google_maps_url : 'https://www.google.co.uk/maps/dir//' + item.venue.address_line_1 + ' ' + item.venue.postcode,
              target: '_blank',
              className: classdetail_style_default.a.well,
              style: { borderTop: '1px solid var(--off-white)' }
            },
            Object(preact_min["h"])(
              'div',
              { className: classdetail_style_default.a.wellIcon },
              ClassDetail__ref5
            ),
            Object(preact_min["h"])(
              'div',
              { className: classdetail_style_default.a.wellMain },
              Object(preact_min["h"])(
                'div',
                { className: classdetail_style_default.a.wellName },
                item.venue.name
              ),
              Object(preact_min["h"])(
                'div',
                { className: classdetail_style_default.a.wellDescription },
                item.venue.address_line_1,
                ', ',
                item.venue.postcode
              )
            ),
            Object(preact_min["h"])(
              'div',
              { className: classdetail_style_default.a.wellAction },
              ClassDetail__ref6
            )
          ),
          Object(preact_min["h"])(
            'a',
            { className: classdetail_style_default.a.well, href: '' + profile.slug },
            Object(preact_min["h"])(
              'div',
              { className: classdetail_style_default.a.wellIcon },
              Object(preact_min["h"])('img', {
                className: classdetail_style_default.a.instructorAvatar,
                src: profile.profile_image_url || 'https://api.adorable.io/avatars/60/' + instructor.email + '.png',
                alt: instructor.name
              })
            ),
            Object(preact_min["h"])(
              'div',
              { className: classdetail_style_default.a.wellMain },
              Object(preact_min["h"])(
                'div',
                { className: classdetail_style_default.a.wellName },
                instructor.name
              ),
              Object(preact_min["h"])(
                'div',
                { className: classdetail_style_default.a.wellDescription },
                profile.bio.substring(0, 50)
              )
            ),
            Object(preact_min["h"])(
              'div',
              { className: classdetail_style_default.a.wellAction },
              ClassDetail__ref7
            )
          ),
          item.description && Object(preact_min["h"])(
            'div',
            { className: classdetail_style_default.a.section },
            Object(preact_min["h"])(
              'div',
              { className: classdetail_style_default.a.title },
              'About'
            ),
            Object(preact_min["h"])(
              'div',
              { className: classdetail_style_default.a.description },
              item.description
            )
          )
        )
      ),
      Object(preact_min["h"])(
        FooterButton_FooterButton,
        { onClick: function onClick() {
            return _this2.setState({ showPayment: true });
          } },
        Object(preact_min["h"])(
          'div',
          null,
          '\xA3',
          item.price,
          ' ',
          Object(preact_min["h"])(
            'div',
            { className: classdetail_style_default.a.priceLabel },
            'Book now'
          )
        )
      )
    );
  };

  return ClassDetail;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/class.page/index.js




ClassDetail_ClassDetail.getInitialProps = function (_ref) {
  var id = _ref.id;

  return new Promise(function (resolve) {
    fetch('https://instructorlist-django.herokuapp.com/api/classes/' + id).then(function (res) {
      res.json().then(function (json) {
        return resolve(json);
      });
    });
  });
};

/* harmony default export */ var class_page = (ClassDetail_ClassDetail);
// EXTERNAL MODULE: ./routes/profile/style.css
var profile_style = __webpack_require__("Tv6c");
var profile_style_default = /*#__PURE__*/__webpack_require__.n(profile_style);

// CONCATENATED MODULE: ./routes/profile/index.js


function profile__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function profile__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function profile__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var profile__ref3 = Object(preact_min["h"])(
  'amp-carousel',
  { width: '450', height: '300' },
  Object(preact_min["h"])(
    'amp-img',
    {
      src: 'https://picsum.photos/id/1/450/300',
      width: '450',
      height: '300'
    },
    ''
  ),
  Object(preact_min["h"])(
    'amp-img',
    {
      src: 'https://picsum.photos/id/300/450/300',
      width: '450',
      height: '300'
    },
    ''
  ),
  Object(preact_min["h"])(
    'amp-img',
    {
      src: 'https://picsum.photos/id/3/450/300',
      width: '450',
      height: '300'
    },
    ''
  )
);

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
    var time = _ref2.time,
        count = _ref2.count;

    return Object(preact_min["h"])(
      'div',
      { 'class': profile_style_default.a.profile },
      Object(preact_min["h"])(
        'h1',
        null,
        'Profile: ',
        user
      ),
      Object(preact_min["h"])(
        'p',
        null,
        'This is the user profile for a user named ',
        user,
        '.'
      ),
      Object(preact_min["h"])(
        'div',
        null,
        'Current time: ',
        new Date(time).toLocaleString()
      ),
      Object(preact_min["h"])(
        'p',
        null,
        Object(preact_min["h"])(
          'button',
          { onClick: this.increment },
          'Click Me'
        ),
        ' Clicked ',
        count,
        ' ',
        'times.'
      ),
      profile__ref3
    );
  };

  return Profile;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js
var app__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// Code-splitting is automated for routes







var pages = [{
  component: home,
  path: '/'
}, {
  component: search,
  path: '/search'
}, {
  component: search,
  path: '/search/:date/map/'
}, {
  component: search,
  path: '/search/:date/filters/'
}, {
  component: search,
  path: '/search/:date/'
}, {
  component: class_page,
  path: '/classes/:id'
}, {
  component: profile_Profile,
  path: '/profile/',
  user: 'me'
}, {
  component: profile_Profile,
  path: '/profile/:user'
}];

var app__ref2 = Object(preact_min["h"])(header, null);

var app__ref3 = Object(preact_min["h"])(
  'div',
  {
    style: 'justify-content: center; align-items: center; flex: 1; height: 100vh;',
    'default': true
  },
  '404 Not Found'
);

var app__ref4 = Object(preact_min["h"])(
  'summary',
  null,
  'ssrData'
);

var app_App = function (_Component) {
  app__inherits(App, _Component);

  function App(props) {
    app__classCallCheck(this, App);

    var _this = app__possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleRoute = function (e) {
      _this.currentUrl = e.url;
    };

    _this.state = {
      data: new api_DataService(props.ssrData)
    };
    return _this;
  }

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */


  App.prototype.render = function render(_ref) {
    var _this2 = this;

    var url = _ref.url;

    return Object(preact_min["h"])(
      'div',
      { id: 'app' },
      app__ref2,
      Object(preact_min["h"])(
        preact_router_es["Router"],
        { url: url, onChange: this.handleRoute },
        pages.map(function (x) {
          var Component = x.component,
              rest = _objectWithoutProperties(x, ['component']);

          return Object(preact_min["h"])(Component, app__extends({ data: _this2.state.data }, rest, _this2.props));
        }),
        app__ref3
      ),
      is_ssr() && Object(preact_min["h"])(
        'div',
        null,
        Object(preact_min["h"])(
          'details',
          { style: { padding: '2rem' } },
          app__ref4,
          Object(preact_min["h"])(
            'pre',
            { style: { whiteSpace: 'pre-wrap' } },
            JSON.stringify(this.props.ssrData, null, 2)
          )
        )
      )
    );
  };

  return App;
}(preact_min["Component"]);




app_App.pages = pages;
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

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "Mmjd":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"paymentWrapper":"paymentWrapper__1x25b","close":"close__1l-EC","paymentMain":"paymentMain__2L3VM","paymentHeader":"paymentHeader__3BZWN","back":"back__1GJnh","title":"title__1Os6k","section":"section__2SSUU","time":"time__IA1AL","classTitle":"classTitle__2boOm","titleContainer":"titleContainer__O_OAw","extra":"extra__ktVQ8","strong":"strong__ved2L","paymentForm":"paymentForm__TFqeV","inputContainer":"inputContainer__13SbB"};

/***/ }),

/***/ "Tv6c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"profile":"profile__t2Dqz"};

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__MseGd"};

/***/ }),

/***/ "r4pm":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.loadjs = factory();
  }
})(this, function () {
  /**
   * Global dependencies.
   * @global {Object} document - DOM
   */

  var devnull = function devnull() {},
      bundleIdCache = {},
      bundleResultCache = {},
      bundleCallbackQueue = {};

  /**
   * Subscribe to bundle load event.
   * @param {string[]} bundleIds - Bundle ids
   * @param {Function} callbackFn - The callback function
   */
  function subscribe(bundleIds, callbackFn) {
    // listify
    bundleIds = bundleIds.push ? bundleIds : [bundleIds];

    var depsNotFound = [],
        i = bundleIds.length,
        numWaiting = i,
        fn,
        bundleId,
        r,
        q;

    // define callback function
    fn = function fn(bundleId, pathsNotFound) {
      if (pathsNotFound.length) depsNotFound.push(bundleId);

      numWaiting--;
      if (!numWaiting) callbackFn(depsNotFound);
    };

    // register callback
    while (i--) {
      bundleId = bundleIds[i];

      // execute callback if in result cache
      r = bundleResultCache[bundleId];
      if (r) {
        fn(bundleId, r);
        continue;
      }

      // add to callback queue
      q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
      q.push(fn);
    }
  }

  /**
   * Publish bundle load event.
   * @param {string} bundleId - Bundle id
   * @param {string[]} pathsNotFound - List of files not found
   */
  function publish(bundleId, pathsNotFound) {
    // exit if id isn't defined
    if (!bundleId) return;

    var q = bundleCallbackQueue[bundleId];

    // cache result
    bundleResultCache[bundleId] = pathsNotFound;

    // exit if queue is empty
    if (!q) return;

    // empty callback queue
    while (q.length) {
      q[0](bundleId, pathsNotFound);
      q.splice(0, 1);
    }
  }

  /**
   * Execute callbacks.
   * @param {Object or Function} args - The callback args
   * @param {string[]} depsNotFound - List of dependencies not found
   */
  function executeCallbacks(args, depsNotFound) {
    // accept function as argument
    if (args.call) args = { success: args };

    // success and error callbacks
    if (depsNotFound.length) (args.error || devnull)(depsNotFound);else (args.success || devnull)(args);
  }

  /**
   * Load individual file.
   * @param {string} path - The file path
   * @param {Function} callbackFn - The callback function
   */
  function loadFile(path, callbackFn, args, numTries) {
    var doc = document,
        async = args.async,
        maxTries = (args.numRetries || 0) + 1,
        beforeCallbackFn = args.before || devnull,
        pathStripped = path.replace(/^(css|img)!/, ''),
        isLegacyIECss,
        e;

    numTries = numTries || 0;

    if (/(^css!|\.css$)/.test(path)) {
      // css
      e = doc.createElement('link');
      e.rel = 'stylesheet';
      e.href = pathStripped;

      // tag IE9+
      isLegacyIECss = 'hideFocus' in e;

      // use preload in IE Edge (to detect load errors)
      if (isLegacyIECss && e.relList) {
        isLegacyIECss = 0;
        e.rel = 'preload';
        e.as = 'style';
      }
    } else if (/(^img!|\.(png|gif|jpg|svg)$)/.test(path)) {
      // image
      e = doc.createElement('img');
      e.src = pathStripped;
    } else {
      // javascript
      e = doc.createElement('script');
      e.src = path;
      e.async = async === undefined ? true : async;
    }

    e.onload = e.onerror = e.onbeforeload = function (ev) {
      var result = ev.type[0];

      // treat empty stylesheets as failures to get around lack of onerror
      // support in IE9-11
      if (isLegacyIECss) {
        try {
          if (!e.sheet.cssText.length) result = 'e';
        } catch (x) {
          // sheets objects created from load errors don't allow access to
          // `cssText` (unless error is Code:18 SecurityError)
          if (x.code != 18) result = 'e';
        }
      }

      // handle retries in case of load failure
      if (result == 'e') {
        // increment counter
        numTries += 1;

        // exit function and try again
        if (numTries < maxTries) {
          return loadFile(path, callbackFn, args, numTries);
        }
      } else if (e.rel == 'preload' && e.as == 'style') {
        // activate preloaded stylesheets
        return e.rel = 'stylesheet'; // jshint ignore:line
      }

      // execute callback
      callbackFn(path, result, ev.defaultPrevented);
    };

    // add to document (unless callback returns `false`)
    if (beforeCallbackFn(path, e) !== false) doc.head.appendChild(e);
  }

  /**
   * Load multiple files.
   * @param {string[]} paths - The file paths
   * @param {Function} callbackFn - The callback function
   */
  function loadFiles(paths, callbackFn, args) {
    // listify paths
    paths = paths.push ? paths : [paths];

    var numWaiting = paths.length,
        x = numWaiting,
        pathsNotFound = [],
        fn,
        i;

    // define callback function
    fn = function fn(path, result, defaultPrevented) {
      // handle error
      if (result == 'e') pathsNotFound.push(path);

      // handle beforeload event. If defaultPrevented then that means the load
      // will be blocked (ex. Ghostery/ABP on Safari)
      if (result == 'b') {
        if (defaultPrevented) pathsNotFound.push(path);else return;
      }

      numWaiting--;
      if (!numWaiting) callbackFn(pathsNotFound);
    };

    // load scripts
    for (i = 0; i < x; i++) {
      loadFile(paths[i], fn, args);
    }
  }

  /**
   * Initiate script load and register bundle.
   * @param {(string|string[])} paths - The file paths
   * @param {(string|Function|Object)} [arg1] - The (1) bundleId or (2) success
   *   callback or (3) object literal with success/error arguments, numRetries,
   *   etc.
   * @param {(Function|Object)} [arg2] - The (1) success callback or (2) object
   *   literal with success/error arguments, numRetries, etc.
   */
  function loadjs(paths, arg1, arg2) {
    var bundleId, args;

    // bundleId (if string)
    if (arg1 && arg1.trim) bundleId = arg1;

    // args (default is {})
    args = (bundleId ? arg2 : arg1) || {};

    // throw error if bundle is already defined
    if (bundleId) {
      if (bundleId in bundleIdCache) {
        throw "LoadJS";
      } else {
        bundleIdCache[bundleId] = true;
      }
    }

    function loadFn(resolve, reject) {
      loadFiles(paths, function (pathsNotFound) {
        // execute callbacks
        executeCallbacks(args, pathsNotFound);

        // resolve Promise
        if (resolve) {
          executeCallbacks({ success: resolve, error: reject }, pathsNotFound);
        }

        // publish bundle load event
        publish(bundleId, pathsNotFound);
      }, args);
    }

    if (args.returnPromise) return new Promise(loadFn);else loadFn();
  }

  /**
   * Execute callbacks when dependencies have been satisfied.
   * @param {(string|string[])} deps - List of bundle ids
   * @param {Object} args - success/error arguments
   */
  loadjs.ready = function ready(deps, args) {
    // subscribe to bundle load event
    subscribe(deps, function (depsNotFound) {
      // execute callbacks
      executeCallbacks(args, depsNotFound);
    });

    return loadjs;
  };

  /**
   * Manually satisfy bundle dependencies.
   * @param {string} bundleId - The bundle id
   */
  loadjs.done = function done(bundleId) {
    publish(bundleId, []);
  };

  /**
   * Reset loadjs dependencies statuses
   */
  loadjs.reset = function reset() {
    bundleIdCache = {};
    bundleResultCache = {};
    bundleCallbackQueue = {};
  };

  /**
   * Determine if bundle has already been defined
   * @param String} bundleId - The bundle id
   */
  loadjs.isDefined = function isDefined(bundleId) {
    return bundleId in bundleIdCache;
  };

  // export
  return loadjs;
});

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
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
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
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
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "ujxd":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"filtersWrapper":"filtersWrapper__3DXok","close":"close__3YC_j","filters":"filters__2Mi00","header":"header__1Q-0o","button":"button__2O3PH","section":"section__2Vu0e","sectionHeader":"sectionHeader__7zBDh","sectionTitle":"sectionTitle__3OWFO","checkBoxesContainer":"checkBoxesContainer__1pJev","checkBox":"checkBox__2NH0p","label":"label__1AZ7E","tick":"tick__1DFlr","active":"active__619x7"};

/***/ }),

/***/ "vbq8":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "ygVF":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"menuWrapper":"menuWrapper__3xhag","close":"close__3XDZe","menu":"menu__36jxW","header":"header__3NRhb","button":"button__1DvDQ","section":"section__1ZTwC","sectionHeader":"sectionHeader__1_PRQ","sectionTitle":"sectionTitle__2FLzg"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map