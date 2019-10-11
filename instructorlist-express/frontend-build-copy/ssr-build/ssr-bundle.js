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

/***/ "0YCM":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"well":"well__F80wH","wellIcon":"wellIcon__3pUbQ","wellMain":"wellMain__1jOyl","wellDescription":"wellDescription__3BENF","wellAction":"wellAction__12aEo"};

/***/ }),

/***/ "2KQM":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6fb06926b511453cc51459efd8b8342a.png";

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

/***/ "5D9O":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var ReactIs = require('react-is');

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("wVGV")();
}

/***/ }),

/***/ "6hN1":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"classDetailWrapper":"classDetailWrapper__2T8mX","heroImage":"heroImage__Qr4BU","back":"back__1aQJI","timeLabel":"timeLabel__1dmWn","main":"main__ieBPs","mainTitle":"mainTitle__3QRdT","address":"address__teZVQ","description":"description__25Gbt","section":"section__1vexu","title":"title__gjFEQ","instructorAvatar":"instructorAvatar__25zFg","well":"well__372E6","wellIcon":"wellIcon__3hDcb","wellMain":"wellMain__1JhNM","wellDescription":"wellDescription__1PEH9","wellAction":"wellAction__3j7JB","priceLabel":"priceLabel__3dyS3"};

/***/ }),

/***/ "7M+v":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9d609a9735179783ce1f896c4e8dc493.png";

/***/ }),

/***/ "89El":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;

/***/ }),

/***/ "97RM":
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "Asjh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "CBWn":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"paymentSuccessWrapper":"paymentSuccessWrapper__2RZe2","close":"close__2MK24","paymentSuccessMain":"paymentSuccessMain__pJize","paymentSuccessHeader":"paymentSuccessHeader__17UVM","back":"back__1LxL4","title":"title__2X-kw","heroImage":"heroImage__3yJVp","shader":"shader__3pujb","label":"label__2oUc4","main":"main__2onSq","mainTitle":"mainTitle__1LSxt","timeLabel":"timeLabel__3wp0x","address":"address__2TJ5s","bookingCodeContainer":"bookingCodeContainer__2F9b4","bookingReceived":"bookingReceived__33C71","bookingCode":"bookingCode__2nfDT"};

/***/ }),

/***/ "CrvO":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b98288aa067682318cf3e4fecb6a834d.png";

/***/ }),

/***/ "Dnk9":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"footer":"footer__YnoJr","hide":"hide__3aVn4","disabled":"disabled__gp8z1","button":"button__2PQ5O"};

/***/ }),

/***/ "Eaxy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return keyframes; });
/* unused harmony export injectGlobal */
/* unused harmony export isStyledComponent */
/* unused harmony export consolidateStreamedStyles */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemeProvider; });
/* unused harmony export withTheme */
/* unused harmony export ServerStyleSheet */
/* unused harmony export StyleSheetManager */
/* unused harmony export __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fbjs_lib_hyphenateStyleName__ = __webpack_require__("R6xY");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fbjs_lib_hyphenateStyleName___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fbjs_lib_hyphenateStyleName__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("eW0v");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_stylis__ = __webpack_require__("YOxv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_stylis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_stylis__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_stylis_rule_sheet__ = __webpack_require__("UYYs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_stylis_rule_sheet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_stylis_rule_sheet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types__ = __webpack_require__("5D9O");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_stream__ = __webpack_require__("97RM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hoist_non_react_statics__ = __webpack_require__("89El");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_is__ = __webpack_require__("H1RQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_is___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_is__);









var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

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

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// 
var isPlainObject = function isPlainObject(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x.constructor === Object;
};

// 


/**
 * Parse errors.md and turn it into a simple hash of code: message
 */
var ERRORS =  false ? {
  "1": "Cannot create styled-component for component: %s.\n\n",
  "2": "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n* Are you trying to reuse it across renders?\n* Are you accidentally calling collectStyles twice?\n\n",
  "3": "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",
  "4": "The `StyleSheetManager` expects a valid target or sheet prop!\n\n* Does this error occur on the client and is your target falsy?\n* Does this error occur on the server and is the sheet falsy?\n\n",
  "5": "The clone method cannot be used on the client!\n\n* Are you running in a client-like environment on the server?\n* Are you trying to run SSR on the client?\n\n",
  "6": "Trying to insert a new style tag, but the given Node is unmounted!\n\n* Are you using a custom target that isn't mounted?\n* Does your document not have a valid head element?\n* Have you accidentally removed a style tag manually?\n\n",
  "7": "ThemeProvider: Please return an object from your \"theme\" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n",
  "8": "ThemeProvider: Please make your \"theme\" prop an object.\n\n",
  "9": "Missing document `<head>`\n\n",
  "10": "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",
  "11": "A plain React class (%s) has been interpolated into styles, probably as a component selector (https://www.styled-components.com/docs/advanced#referring-to-other-components). Only styled-component classes can be targeted in this fashion."
} : {};

/**
 * super basic version of sprintf
 */
function format() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var a = args[0];
  var b = [];
  var c = void 0;

  for (c = 1; c < args.length; c += 1) {
    b.push(args[c]);
  }

  b.forEach(function (d) {
    a = a.replace(/%[a-z]/, d);
  });

  return a;
}

/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 */

var StyledComponentsError = function (_Error) {
  inherits(StyledComponentsError, _Error);

  function StyledComponentsError(code) {
    classCallCheck(this, StyledComponentsError);

    for (var _len2 = arguments.length, interpolations = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      interpolations[_key2 - 1] = arguments[_key2];
    }

    if (true) {
      var _this = possibleConstructorReturn(this, _Error.call(this, 'An error occurred. See https://github.com/styled-components/styled-components/blob/master/src/utils/errors.md#' + code + ' for more information. ' + (interpolations ? 'Additional arguments: ' + interpolations.join(', ') : '')));
    } else {
      var _this = possibleConstructorReturn(this, _Error.call(this, format.apply(undefined, [ERRORS[code]].concat(interpolations))));
    }
    return possibleConstructorReturn(_this);
  }

  return StyledComponentsError;
}(Error);

// 

var objToCss = function objToCss(obj, prevKey) {
  var css = Object.keys(obj).filter(function (key) {
    var chunk = obj[key];
    return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
  }).map(function (key) {
    if (isPlainObject(obj[key])) return objToCss(obj[key], key);
    return __WEBPACK_IMPORTED_MODULE_0_fbjs_lib_hyphenateStyleName___default()(key) + ': ' + obj[key] + ';';
  }).join(' ');
  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
};

var flatten = function flatten(chunks, executionContext) {
  return chunks.reduce(function (ruleSet, chunk) {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') {
      return ruleSet;
    }

    /* Flatten ruleSet */
    if (Array.isArray(chunk)) {
      ruleSet.push.apply(ruleSet, flatten(chunk, executionContext));
      return ruleSet;
    }

    /* Handle other components */
    if (chunk.hasOwnProperty('styledComponentId')) {
      // $FlowFixMe not sure how to make this pass
      ruleSet.push('.' + chunk.styledComponentId);
      return ruleSet;
    }

    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      if (executionContext) {
        var nextChunk = chunk(executionContext);
        /* Throw if a React Element was given styles */
        if (__WEBPACK_IMPORTED_MODULE_1_react__["d" /* default */].isValidElement(nextChunk)) {
          var elementName = chunk.displayName || chunk.name;
          throw new StyledComponentsError(11, elementName);
        }
        ruleSet.push.apply(ruleSet, flatten([nextChunk], executionContext));
      } else ruleSet.push(chunk);

      return ruleSet;
    }

    /* Handle objects */
    ruleSet.push(
    // $FlowFixMe have to add %checks somehow to isPlainObject
    isPlainObject(chunk) ? objToCss(chunk) : chunk.toString());

    return ruleSet;
  }, []);
};

// 

var COMMENT_REGEX = /^\s*\/\/.*$/gm;

// NOTE: This stylis instance is only used to split rules from SSR'd style tags
var stylisSplitter = new __WEBPACK_IMPORTED_MODULE_2_stylis___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: false,
  compress: false,
  semicolon: true
});

var stylis = new __WEBPACK_IMPORTED_MODULE_2_stylis___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: false // NOTE: This means "autocomplete missing semicolons"
});

// Wrap `insertRulePlugin to build a list of rules,
// and then make our own plugin to return the rules. This
// makes it easier to hook into the existing SSR architecture

var parsingRules = [];
// eslint-disable-next-line consistent-return
var returnRulesPlugin = function returnRulesPlugin(context) {
  if (context === -2) {
    var parsedRules = parsingRules;
    parsingRules = [];
    return parsedRules;
  }
};

var parseRulesPlugin = __WEBPACK_IMPORTED_MODULE_3_stylis_rule_sheet___default()(function (rule) {
  parsingRules.push(rule);
});

stylis.use([parseRulesPlugin, returnRulesPlugin]);
stylisSplitter.use([parseRulesPlugin, returnRulesPlugin]);

var stringifyRules = function stringifyRules(rules, selector, prefix) {
  var flatCSS = rules.join('').replace(COMMENT_REGEX, ''); // replace JS comments

  var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

  return stylis(prefix || !selector ? '' : selector, cssStr);
};

var splitByRules = function splitByRules(css) {
  return stylisSplitter('', css);
};

// 

function isStyledComponent(target) /* : %checks */{
  return (
    // $FlowFixMe TODO: flow for styledComponentId
    typeof target === 'function' && typeof target.styledComponentId === 'string'
  );
}

// 

/* This function is DEPRECATED and will be removed on the next major version release.
 * It was needed to rehydrate all style blocks prepended to chunks before React
 * tries to rehydrate its HTML stream. Since the master StyleSheet will now detect
 * the use of streamed style tags and will perform the rehydration earlier when needed
 * this function will not be needed anymore */
function consolidateStreamedStyles() {
  if (false) {
    // eslint-disable-next-line no-console
    console.warn('styled-components automatically does streaming SSR rehydration now.\n' + 'Calling consolidateStreamedStyles manually is no longer necessary and a noop now.\n' + '- Please remove the consolidateStreamedStyles call from your client.');
  }
}

// 
/* eslint-disable no-bitwise */

/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */
var charsLength = 52;

/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
var getAlphabeticChar = function getAlphabeticChar(code) {
  return String.fromCharCode(code + (code > 25 ? 39 : 97));
};

/* input a number, usually a hash and convert it to base-52 */
var generateAlphabeticName = function generateAlphabeticName(code) {
  var name = '';
  var x = void 0;

  /* get a char and divide by alphabet-length */
  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = getAlphabeticChar(x % charsLength) + name;
  }

  return getAlphabeticChar(x % charsLength) + name;
};

// 

var interleave = function interleave(strings, interpolations) {
  var result = [strings[0]];

  for (var i = 0, len = interpolations.length; i < len; i += 1) {
    result.push(interpolations[i], strings[i + 1]);
  }

  return result;
};

// 
var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});

// 

var css = function css(styles) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  if (typeof styles === 'function' || isPlainObject(styles)) {
    // $FlowFixMe
    return flatten(interleave(EMPTY_ARRAY, [styles].concat(interpolations)));
  }

  // $FlowFixMe
  return flatten(interleave(styles, interpolations));
};

// 


var SC_ATTR = typeof process !== 'undefined' && process.env.SC_ATTR || 'data-styled-components';
var SC_STREAM_ATTR = 'data-styled-streamed';
var CONTEXT_KEY = '__styled-components-stylesheet__';

var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;

var DISABLE_SPEEDY = typeof SC_DISABLE_SPEEDY === 'boolean' && SC_DISABLE_SPEEDY || "production" !== 'production';

// 
var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s*(\S+)\s+\*\//gm;

var extractComps = function extractComps(maybeCSS) {
  var css = '' + (maybeCSS || ''); // Definitely a string, and a clone
  var existingComponents = [];
  css.replace(SC_COMPONENT_ID, function (match, componentId, matchIndex) {
    existingComponents.push({ componentId: componentId, matchIndex: matchIndex });
    return match;
  });
  return existingComponents.map(function (_ref, i) {
    var componentId = _ref.componentId,
        matchIndex = _ref.matchIndex;

    var nextComp = existingComponents[i + 1];
    var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
    return { componentId: componentId, cssFromDOM: cssFromDOM };
  });
};

// 
/* eslint-disable camelcase, no-undef */

var getNonce = function getNonce() {
  return  true ? __webpack_require__.nc : null;
};

// 
// Helper to call a given function, only once
var once = function once(cb) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      cb();
    }
  };
};

// 
/* These are helpers for the StyleTags to keep track of the injected
 * rule names for each (component) ID that they're keeping track of.
 * They're crucial for detecting whether a name has already been
 * injected.
 * (This excludes rehydrated names) */

/* adds a new ID:name pairing to a names dictionary */
var addNameForId = function addNameForId(names, id, name) {
  if (name) {
    // eslint-disable-next-line no-param-reassign
    var namesForId = names[id] || (names[id] = Object.create(null));
    namesForId[name] = true;
  }
};

/* resets an ID entirely by overwriting it in the dictionary */
var resetIdNames = function resetIdNames(names, id) {
  // eslint-disable-next-line no-param-reassign
  names[id] = Object.create(null);
};

/* factory for a names dictionary checking the existance of an ID:name pairing */
var hasNameForId = function hasNameForId(names) {
  return function (id, name) {
    return names[id] !== undefined && names[id][name];
  };
};

/* stringifies names for the html/element output */
var stringifyNames = function stringifyNames(names) {
  var str = '';
  // eslint-disable-next-line guard-for-in
  for (var id in names) {
    str += Object.keys(names[id]).join(' ') + ' ';
  }
  return str.trim();
};

/* clones the nested names dictionary */
var cloneNames = function cloneNames(names) {
  var clone = Object.create(null);
  // eslint-disable-next-line guard-for-in
  for (var id in names) {
    clone[id] = _extends({}, names[id]);
  }
  return clone;
};

// 

/* These are helpers that deal with the insertRule (aka speedy) API
 * They are used in the StyleTags and specifically the speedy tag
 */

/* retrieve a sheet for a given style tag */
var sheetForTag = function sheetForTag(tag) {
  // $FlowFixMe
  if (tag.sheet) return tag.sheet;

  /* Firefox quirk requires us to step through all stylesheets to find one owned by the given tag */
  var size = document.styleSheets.length;
  for (var i = 0; i < size; i += 1) {
    var sheet = document.styleSheets[i];
    // $FlowFixMe
    if (sheet.ownerNode === tag) return sheet;
  }

  /* we should always be able to find a tag */
  throw new StyledComponentsError(10);
};

/* insert a rule safely and return whether it was actually injected */
var safeInsertRule = function safeInsertRule(sheet, cssRule, index) {
  /* abort early if cssRule string is falsy */
  if (!cssRule) return false;

  var maxIndex = sheet.cssRules.length;

  try {
    /* use insertRule and cap passed index with maxIndex (no of cssRules) */
    sheet.insertRule(cssRule, index <= maxIndex ? index : maxIndex);
  } catch (err) {
    /* any error indicates an invalid rule */
    return false;
  }

  return true;
};

/* deletes `size` rules starting from `removalIndex` */
var deleteRules = function deleteRules(sheet, removalIndex, size) {
  var lowerBound = removalIndex - size;
  for (var i = removalIndex; i > lowerBound; i -= 1) {
    sheet.deleteRule(i);
  }
};

// 

/* this marker separates component styles and is important for rehydration */
var makeTextMarker = function makeTextMarker(id) {
  return '\n/* sc-component-id: ' + id + ' */\n';
};

/* add up all numbers in array up until and including the index */
var addUpUntilIndex = function addUpUntilIndex(sizes, index) {
  var totalUpToIndex = 0;
  for (var i = 0; i <= index; i += 1) {
    totalUpToIndex += sizes[i];
  }

  return totalUpToIndex;
};

/* create a new style tag after lastEl */
var makeStyleTag = function makeStyleTag(target, tagEl, insertBefore) {
  var el = document.createElement('style');
  el.setAttribute(SC_ATTR, '');

  var nonce = getNonce();
  if (nonce) {
    el.setAttribute('nonce', nonce);
  }

  /* Work around insertRule quirk in EdgeHTML */
  el.appendChild(document.createTextNode(''));

  if (target && !tagEl) {
    /* Append to target when no previous element was passed */
    target.appendChild(el);
  } else {
    if (!tagEl || !target || !tagEl.parentNode) {
      throw new StyledComponentsError(6);
    }

    /* Insert new style tag after the previous one */
    tagEl.parentNode.insertBefore(el, insertBefore ? tagEl : tagEl.nextSibling);
  }

  return el;
};

/* takes a css factory function and outputs an html styled tag factory */
var wrapAsHtmlTag = function wrapAsHtmlTag(css, names) {
  return function (additionalAttrs) {
    var nonce = getNonce();
    var attrs = [nonce && 'nonce="' + nonce + '"', SC_ATTR + '="' + stringifyNames(names) + '"', additionalAttrs];

    var htmlAttr = attrs.filter(Boolean).join(' ');
    return '<style ' + htmlAttr + '>' + css() + '</style>';
  };
};

/* takes a css factory function and outputs an element factory */
var wrapAsElement = function wrapAsElement(css, names) {
  return function () {
    var _props;

    var props = (_props = {}, _props[SC_ATTR] = stringifyNames(names), _props);

    var nonce = getNonce();
    if (nonce) {
      // $FlowFixMe
      props.nonce = nonce;
    }

    // eslint-disable-next-line react/no-danger
    return __WEBPACK_IMPORTED_MODULE_1_react__["d" /* default */].createElement('style', _extends({}, props, { dangerouslySetInnerHTML: { __html: css() } }));
  };
};

var getIdsFromMarkersFactory = function getIdsFromMarkersFactory(markers) {
  return function () {
    return Object.keys(markers);
  };
};

/* speedy tags utilise insertRule */
var makeSpeedyTag = function makeSpeedyTag(el, getImportRuleTag) {
  var names = Object.create(null);
  var markers = Object.create(null);
  var sizes = [];

  var extractImport = getImportRuleTag !== undefined;
  /* indicates whther getImportRuleTag was called */
  var usedImportRuleTag = false;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];
    if (prev !== undefined) {
      return prev;
    }

    markers[id] = sizes.length;
    sizes.push(0);
    resetIdNames(names, id);

    return markers[id];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    var sheet = sheetForTag(el);
    var insertIndex = addUpUntilIndex(sizes, marker);

    var injectedRules = 0;
    var importRules = [];
    var cssRulesSize = cssRules.length;

    for (var i = 0; i < cssRulesSize; i += 1) {
      var cssRule = cssRules[i];
      var mayHaveImport = extractImport; /* @import rules are reordered to appear first */
      if (mayHaveImport && cssRule.indexOf('@import') !== -1) {
        importRules.push(cssRule);
      } else if (safeInsertRule(sheet, cssRule, insertIndex + injectedRules)) {
        mayHaveImport = false;
        injectedRules += 1;
      }
    }

    if (extractImport && importRules.length > 0) {
      usedImportRuleTag = true;
      // $FlowFixMe
      getImportRuleTag().insertRules(id + '-import', importRules);
    }

    sizes[marker] += injectedRules; /* add up no of injected rules */
    addNameForId(names, id, name);
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;

    var size = sizes[marker];
    var sheet = sheetForTag(el);
    var removalIndex = addUpUntilIndex(sizes, marker);
    deleteRules(sheet, removalIndex, size);
    sizes[marker] = 0;
    resetIdNames(names, id);

    if (extractImport && usedImportRuleTag) {
      // $FlowFixMe
      getImportRuleTag().removeRules(id + '-import');
    }
  };

  var css = function css() {
    var _sheetForTag = sheetForTag(el),
        cssRules = _sheetForTag.cssRules;

    var str = '';

    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      str += makeTextMarker(id);
      var marker = markers[id];
      var end = addUpUntilIndex(sizes, marker);
      var size = sizes[marker];
      for (var i = end - size; i < end; i += 1) {
        var rule = cssRules[i];
        if (rule !== undefined) {
          str += rule.cssText;
        }
      }
    }

    return str;
  };

  return {
    clone: function clone() {
      throw new StyledComponentsError(5);
    },

    css: css,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    sealed: false,
    styleTag: el,
    toElement: wrapAsElement(css, names),
    toHTML: wrapAsHtmlTag(css, names)
  };
};

var makeTextNode = function makeTextNode(id) {
  return document.createTextNode(makeTextMarker(id));
};

var makeBrowserTag = function makeBrowserTag(el, getImportRuleTag) {
  var names = Object.create(null);
  var markers = Object.create(null);

  var extractImport = getImportRuleTag !== undefined;

  /* indicates whther getImportRuleTag was called */
  var usedImportRuleTag = false;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];
    if (prev !== undefined) {
      return prev;
    }

    markers[id] = makeTextNode(id);
    el.appendChild(markers[id]);
    names[id] = Object.create(null);

    return markers[id];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    var importRules = [];
    var cssRulesSize = cssRules.length;

    for (var i = 0; i < cssRulesSize; i += 1) {
      var rule = cssRules[i];
      var mayHaveImport = extractImport;
      if (mayHaveImport && rule.indexOf('@import') !== -1) {
        importRules.push(rule);
      } else {
        mayHaveImport = false;
        var separator = i === cssRulesSize - 1 ? '' : ' ';
        marker.appendData('' + rule + separator);
      }
    }

    addNameForId(names, id, name);

    if (extractImport && importRules.length > 0) {
      usedImportRuleTag = true;
      // $FlowFixMe
      getImportRuleTag().insertRules(id + '-import', importRules);
    }
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;

    /* create new empty text node and replace the current one */
    var newMarker = makeTextNode(id);
    el.replaceChild(newMarker, marker);
    markers[id] = newMarker;
    resetIdNames(names, id);

    if (extractImport && usedImportRuleTag) {
      // $FlowFixMe
      getImportRuleTag().removeRules(id + '-import');
    }
  };

  var css = function css() {
    var str = '';
    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      str += markers[id].data;
    }
    return str;
  };

  return {
    clone: function clone() {
      throw new StyledComponentsError(5);
    },

    css: css,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    sealed: false,
    styleTag: el,
    toElement: wrapAsElement(css, names),
    toHTML: wrapAsHtmlTag(css, names)
  };
};

var makeServerTagInternal = function makeServerTagInternal(namesArg, markersArg) {
  var names = namesArg === undefined ? Object.create(null) : namesArg;
  var markers = markersArg === undefined ? Object.create(null) : markersArg;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];
    if (prev !== undefined) {
      return prev;
    }

    return markers[id] = [''];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    marker[0] += cssRules.join(' ');
    addNameForId(names, id, name);
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;
    marker[0] = '';
    resetIdNames(names, id);
  };

  var css = function css() {
    var str = '';
    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      var cssForId = markers[id][0];
      if (cssForId) {
        str += makeTextMarker(id) + cssForId;
      }
    }
    return str;
  };

  var clone = function clone() {
    var namesClone = cloneNames(names);
    var markersClone = Object.create(null);

    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      markersClone[id] = [markers[id][0]];
    }

    return makeServerTagInternal(namesClone, markersClone);
  };

  var tag = {
    clone: clone,
    css: css,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    sealed: false,
    styleTag: null,
    toElement: wrapAsElement(css, names),
    toHTML: wrapAsHtmlTag(css, names)
  };

  return tag;
};

var makeServerTag = function makeServerTag() {
  return makeServerTagInternal();
};

var makeTag = function makeTag(target, tagEl, forceServer, insertBefore, getImportRuleTag) {
  if (IS_BROWSER && !forceServer) {
    var el = makeStyleTag(target, tagEl, insertBefore);

    if (DISABLE_SPEEDY) {
      return makeBrowserTag(el, getImportRuleTag);
    } else {
      return makeSpeedyTag(el, getImportRuleTag);
    }
  }

  return makeServerTag();
};

/* wraps a given tag so that rehydration is performed once when necessary */
var makeRehydrationTag = function makeRehydrationTag(tag, els, extracted, immediateRehydration) {
  /* rehydration function that adds all rules to the new tag */
  var rehydrate = once(function () {
    /* add all extracted components to the new tag */
    for (var i = 0, len = extracted.length; i < len; i += 1) {
      var _extracted$i = extracted[i],
          componentId = _extracted$i.componentId,
          cssFromDOM = _extracted$i.cssFromDOM;

      var cssRules = splitByRules(cssFromDOM);
      tag.insertRules(componentId, cssRules);
    }

    /* remove old HTMLStyleElements, since they have been rehydrated */
    for (var _i = 0, _len = els.length; _i < _len; _i += 1) {
      var el = els[_i];
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  });

  if (immediateRehydration) rehydrate();

  return _extends({}, tag, {
    /* add rehydration hook to insertion methods */
    insertMarker: function insertMarker(id) {
      rehydrate();
      return tag.insertMarker(id);
    },
    insertRules: function insertRules(id, cssRules, name) {
      rehydrate();
      return tag.insertRules(id, cssRules, name);
    }
  });
};

// 

var SPLIT_REGEX = /\s+/;

/* determine the maximum number of components before tags are sharded */
var MAX_SIZE = void 0;
if (IS_BROWSER) {
  /* in speedy mode we can keep a lot more rules in a sheet before a slowdown can be expected */
  MAX_SIZE = DISABLE_SPEEDY ? 40 : 1000;
} else {
  /* for servers we do not need to shard at all */
  MAX_SIZE = -1;
}

var sheetRunningId = 0;
var master = void 0;

var StyleSheet = function () {
  /* a map from ids to tags */
  /* deferred rules for a given id */
  /* this is used for not reinjecting rules via hasNameForId() */
  /* when rules for an id are removed using remove() we have to ignore rehydratedNames for it */
  /* a list of tags belonging to this StyleSheet */
  /* a tag for import rules */
  /* current capacity until a new tag must be created */
  /* children (aka clones) of this StyleSheet inheriting all and future injections */

  function StyleSheet() {
    var _this = this;

    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : IS_BROWSER ? document.head : null;
    var forceServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    classCallCheck(this, StyleSheet);

    this.getImportRuleTag = function () {
      var importRuleTag = _this.importRuleTag;

      if (importRuleTag !== undefined) {
        return importRuleTag;
      }

      var firstTag = _this.tags[0];
      var insertBefore = true;

      return _this.importRuleTag = makeTag(_this.target, firstTag ? firstTag.styleTag : null, _this.forceServer, insertBefore);
    };

    sheetRunningId += 1;
    this.id = sheetRunningId;
    this.forceServer = forceServer;
    this.target = forceServer ? null : target;
    this.tagMap = {};
    this.deferred = {};
    this.rehydratedNames = {};
    this.ignoreRehydratedNames = {};
    this.tags = [];
    this.capacity = 1;
    this.clones = [];
  }

  /* rehydrate all SSR'd style tags */

  StyleSheet.prototype.rehydrate = function rehydrate() {
    if (!IS_BROWSER || this.forceServer) {
      return this;
    }

    var els = [];
    var extracted = [];
    var isStreamed = false;

    /* retrieve all of our SSR style elements from the DOM */
    var nodes = document.querySelectorAll('style[' + SC_ATTR + ']');
    var nodesSize = nodes.length;

    /* abort rehydration if no previous style tags were found */
    if (nodesSize === 0) {
      return this;
    }

    for (var i = 0; i < nodesSize; i += 1) {
      // $FlowFixMe: We can trust that all elements in this query are style elements
      var el = nodes[i];

      /* check if style tag is a streamed tag */
      if (!isStreamed) isStreamed = !!el.getAttribute(SC_STREAM_ATTR);

      /* retrieve all component names */
      var elNames = (el.getAttribute(SC_ATTR) || '').trim().split(SPLIT_REGEX);
      var elNamesSize = elNames.length;
      for (var j = 0; j < elNamesSize; j += 1) {
        var name = elNames[j];
        /* add rehydrated name to sheet to avoid readding styles */
        this.rehydratedNames[name] = true;
      }

      /* extract all components and their CSS */
      extracted.push.apply(extracted, extractComps(el.textContent));

      /* store original HTMLStyleElement */
      els.push(el);
    }

    /* abort rehydration if nothing was extracted */
    var extractedSize = extracted.length;
    if (extractedSize === 0) {
      return this;
    }

    /* create a tag to be used for rehydration */
    var tag = this.makeTag(null);
    var rehydrationTag = makeRehydrationTag(tag, els, extracted, isStreamed);

    /* reset capacity and adjust MAX_SIZE by the initial size of the rehydration */
    this.capacity = Math.max(1, MAX_SIZE - extractedSize);
    this.tags.push(rehydrationTag);

    /* retrieve all component ids */
    for (var _j = 0; _j < extractedSize; _j += 1) {
      this.tagMap[extracted[_j].componentId] = rehydrationTag;
    }

    return this;
  };

  /* retrieve a "master" instance of StyleSheet which is typically used when no other is available
   * The master StyleSheet is targeted by injectGlobal, keyframes, and components outside of any
    * StyleSheetManager's context */

  /* reset the internal "master" instance */
  StyleSheet.reset = function reset() {
    var forceServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    master = new StyleSheet(undefined, forceServer).rehydrate();
  };

  /* adds "children" to the StyleSheet that inherit all of the parents' rules
   * while their own rules do not affect the parent */

  StyleSheet.prototype.clone = function clone() {
    var sheet = new StyleSheet(this.target, this.forceServer);

    /* add to clone array */
    this.clones.push(sheet);

    /* clone all tags */
    sheet.tags = this.tags.map(function (tag) {
      var ids = tag.getIds();
      var newTag = tag.clone();

      /* reconstruct tagMap */
      for (var i = 0; i < ids.length; i += 1) {
        sheet.tagMap[ids[i]] = newTag;
      }

      return newTag;
    });

    /* clone other maps */
    sheet.rehydratedNames = _extends({}, this.rehydratedNames);
    sheet.deferred = _extends({}, this.deferred);

    return sheet;
  };

  /* force StyleSheet to create a new tag on the next injection */

  StyleSheet.prototype.sealAllTags = function sealAllTags() {
    this.capacity = 1;

    this.tags.forEach(function (tag) {
      // eslint-disable-next-line no-param-reassign
      tag.sealed = true;
    });
  };

  StyleSheet.prototype.makeTag = function makeTag$$1(tag) {
    var lastEl = tag ? tag.styleTag : null;
    var insertBefore = false;

    return makeTag(this.target, lastEl, this.forceServer, insertBefore, this.getImportRuleTag);
  };

  /* get a tag for a given componentId, assign the componentId to one, or shard */
  StyleSheet.prototype.getTagForId = function getTagForId(id) {
    /* simply return a tag, when the componentId was already assigned one */
    var prev = this.tagMap[id];
    if (prev !== undefined && !prev.sealed) {
      return prev;
    }

    var tag = this.tags[this.tags.length - 1];

    /* shard (create a new tag) if the tag is exhausted (See MAX_SIZE) */
    this.capacity -= 1;

    if (this.capacity === 0) {
      this.capacity = MAX_SIZE;
      tag = this.makeTag(tag);
      this.tags.push(tag);
    }

    return this.tagMap[id] = tag;
  };

  /* mainly for injectGlobal to check for its id */

  StyleSheet.prototype.hasId = function hasId(id) {
    return this.tagMap[id] !== undefined;
  };

  /* caching layer checking id+name to already have a corresponding tag and injected rules */

  StyleSheet.prototype.hasNameForId = function hasNameForId(id, name) {
    /* exception for rehydrated names which are checked separately */
    if (this.ignoreRehydratedNames[id] === undefined && this.rehydratedNames[name]) {
      return true;
    }

    var tag = this.tagMap[id];
    return tag !== undefined && tag.hasNameForId(id, name);
  };

  /* registers a componentId and registers it on its tag */

  StyleSheet.prototype.deferredInject = function deferredInject(id, cssRules) {
    /* don't inject when the id is already registered */
    if (this.tagMap[id] !== undefined) return;

    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].deferredInject(id, cssRules);
    }

    this.getTagForId(id).insertMarker(id);
    this.deferred[id] = cssRules;
  };

  /* injects rules for a given id with a name that will need to be cached */

  StyleSheet.prototype.inject = function inject(id, cssRules, name) {
    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].inject(id, cssRules, name);
    }

    var tag = this.getTagForId(id);

    /* add deferred rules for component */
    if (this.deferred[id] !== undefined) {
      // Combine passed cssRules with previously deferred CSS rules
      // NOTE: We cannot mutate the deferred array itself as all clones
      // do the same (see clones[i].inject)
      var rules = this.deferred[id].concat(cssRules);
      tag.insertRules(id, rules, name);

      this.deferred[id] = undefined;
    } else {
      tag.insertRules(id, cssRules, name);
    }
  };

  /* removes all rules for a given id, which doesn't remove its marker but resets it */

  StyleSheet.prototype.remove = function remove(id) {
    var tag = this.tagMap[id];
    if (tag === undefined) return;

    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].remove(id);
    }

    /* remove all rules from the tag */
    tag.removeRules(id);
    /* ignore possible rehydrated names */
    this.ignoreRehydratedNames[id] = true;
    /* delete possible deferred rules */
    this.deferred[id] = undefined;
  };

  StyleSheet.prototype.toHTML = function toHTML() {
    return this.tags.map(function (tag) {
      return tag.toHTML();
    }).join('');
  };

  StyleSheet.prototype.toReactElements = function toReactElements() {
    var id = this.id;

    return this.tags.map(function (tag, i) {
      var key = 'sc-' + id + '-' + i;
      return Object(__WEBPACK_IMPORTED_MODULE_1_react__["b" /* cloneElement */])(tag.toElement(), { key: key });
    });
  };

  createClass(StyleSheet, null, [{
    key: 'master',
    get: function get$$1() {
      return master || (master = new StyleSheet().rehydrate());
    }

    /* NOTE: This is just for backwards-compatibility with jest-styled-components */

  }, {
    key: 'instance',
    get: function get$$1() {
      return StyleSheet.master;
    }
  }]);
  return StyleSheet;
}();

var _StyleSheetManager$ch;

var StyleSheetManager = function (_Component) {
  inherits(StyleSheetManager, _Component);

  function StyleSheetManager() {
    classCallCheck(this, StyleSheetManager);
    return possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  StyleSheetManager.prototype.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[CONTEXT_KEY] = this.sheetInstance, _ref;
  };

  StyleSheetManager.prototype.componentWillMount = function componentWillMount() {
    if (this.props.sheet) {
      this.sheetInstance = this.props.sheet;
    } else if (this.props.target) {
      this.sheetInstance = new StyleSheet(this.props.target);
    } else {
      throw new StyledComponentsError(4);
    }
  };

  StyleSheetManager.prototype.render = function render() {
    /* eslint-disable react/prop-types */
    // Flow v0.43.1 will report an error accessing the `children` property,
    // but v0.47.0 will not. It is necessary to use a type cast instead of
    // a "fixme" comment to satisfy both Flow versions.
    return __WEBPACK_IMPORTED_MODULE_1_react__["d" /* default */].Children.only(this.props.children);
  };

  return StyleSheetManager;
}(__WEBPACK_IMPORTED_MODULE_1_react__["a" /* Component */]);

StyleSheetManager.childContextTypes = (_StyleSheetManager$ch = {}, _StyleSheetManager$ch[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.instanceOf(ServerStyleSheet)]).isRequired, _StyleSheetManager$ch);
 false ? StyleSheetManager.propTypes = {
  sheet: PropTypes.oneOfType([PropTypes.instanceOf(StyleSheet), PropTypes.instanceOf(ServerStyleSheet)]),
  target: PropTypes.shape({
    appendChild: PropTypes.func.isRequired
  })
} : void 0;

// 

var ServerStyleSheet = function () {
  function ServerStyleSheet() {
    classCallCheck(this, ServerStyleSheet);

    /* The master sheet might be reset, so keep a reference here */
    this.masterSheet = StyleSheet.master;
    this.instance = this.masterSheet.clone();
    this.closed = false;
  }

  ServerStyleSheet.prototype.complete = function complete() {
    if (!this.closed) {
      /* Remove closed StyleSheets from the master sheet */
      var index = this.masterSheet.clones.indexOf(this.instance);
      this.masterSheet.clones.splice(index, 1);
      this.closed = true;
    }
  };

  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
    if (this.closed) {
      throw new StyledComponentsError(2);
    }

    return __WEBPACK_IMPORTED_MODULE_1_react__["d" /* default */].createElement(StyleSheetManager, { sheet: this.instance }, children);
  };

  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
    this.complete();
    return this.instance.toHTML();
  };

  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
    this.complete();
    return this.instance.toReactElements();
  };

  ServerStyleSheet.prototype.interleaveWithNodeStream = function interleaveWithNodeStream(readableStream) {
    var _this = this;

    if (IS_BROWSER) {
      throw new StyledComponentsError(3);
    }

    /* the tag index keeps track of which tags have already been emitted */
    var instance = this.instance;

    var instanceTagIndex = 0;

    var streamAttr = SC_STREAM_ATTR + '="true"';

    var transformer = new __WEBPACK_IMPORTED_MODULE_5_stream___default.a.Transform({
      transform: function appendStyleChunks(chunk, /* encoding */_, callback) {
        var tags = instance.tags;

        var html = '';

        /* retrieve html for each new style tag */
        for (; instanceTagIndex < tags.length; instanceTagIndex += 1) {
          var tag = tags[instanceTagIndex];
          html += tag.toHTML(streamAttr);
        }

        /* force our StyleSheets to emit entirely new tags */
        instance.sealAllTags();

        /* prepend style html to chunk */
        this.push(html + chunk);
        callback();
      }
    });

    readableStream.on('end', function () {
      return _this.complete();
    });
    readableStream.on('error', function (err) {
      _this.complete();

      // forward the error to the transform stream
      transformer.emit('error', err);
    });

    return readableStream.pipe(transformer);
  };

  return ServerStyleSheet;
}();

// 

var LIMIT = 200;

var createWarnTooManyClasses = function createWarnTooManyClasses(displayName) {
  var generatedClasses = {};
  var warningSeen = false;

  return function (className) {
    if (!warningSeen) {
      generatedClasses[className] = true;
      if (Object.keys(generatedClasses).length >= LIMIT) {
        // Unable to find latestRule in test environment.
        /* eslint-disable no-console, prefer-template */
        console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs({\n' + '    style: ({ background }) => ({\n' + '      background,\n' + '    }),\n' + '  })`width: 100%;`\n\n' + '  <Component />');
        warningSeen = true;
        generatedClasses = {};
      }
    }
  };
};

// 

var determineTheme = function determineTheme(props, fallbackTheme, defaultProps) {
  // Props should take precedence over ThemeProvider, which should take precedence over
  // defaultProps, but React automatically puts defaultProps on props.

  /* eslint-disable react/prop-types */
  var isDefaultTheme = defaultProps && props.theme === defaultProps.theme;
  var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme;
  /* eslint-enable */

  return theme;
};

// 
var escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
var dashesAtEnds = /(^-|-$)/g;

/**
 * TODO: Explore using CSS.escape when it becomes more available
 * in evergreen browsers.
 */
function escape(str) {
  return str
  // Replace all possible CSS selectors
  .replace(escapeRegex, '-')

  // Remove extraneous hyphens at the start and end
  .replace(dashesAtEnds, '');
}

// 

function getComponentName(target) {
  return target.displayName || target.name || 'Component';
}

// 

function isTag(target) /* : %checks */{
  return typeof target === 'string';
}

// 

function generateDisplayName(target) {
  return isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')';
}

// 
/* eslint-disable max-len */
/**
 * Trying to avoid the unknown-prop errors on styled components by filtering by
 * React's attribute whitelist.
 *
 * To regenerate this regex:
 *
 * 1. `npm i -g regexgen` (https://github.com/devongovett/regexgen)
 * 2. Run `regexgen` with the list of space-separated words below as input
 * 3. Surround the emitted regex with this: `/^(GENERATED_REGEX)$/` -- this will ensure a full string match
 *    and no false positives from partials
 * */
/*
children dangerouslySetInnerHTML key ref autoFocus defaultValue valueLink defaultChecked checkedLink innerHTML suppressContentEditableWarning onFocusIn onFocusOut className onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown onKeyPress onKeyUp onFocus onBlur onChange onInput onInvalid onSubmit onReset onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onAnimationStart onAnimationEnd onAnimationIteration onTransitionEnd onCopyCapture onCutCapture onPasteCapture onCompositionEndCapture onCompositionStartCapture onCompositionUpdateCapture onKeyDownCapture onKeyPressCapture onKeyUpCapture onFocusCapture onBlurCapture onChangeCapture onInputCapture onSubmitCapture onResetCapture onClickCapture onContextMenuCapture onDoubleClickCapture onDragCapture onDragEndCapture onDragEnterCapture onDragExitCapture onDragLeaveCapture onDragOverCapture onDragStartCapture onDropCapture onMouseDownCapture onMouseEnterCapture onMouseLeaveCapture onMouseMoveCapture onMouseOutCapture onMouseOverCapture onMouseUpCapture onSelectCapture onTouchCancelCapture onTouchEndCapture onTouchMoveCapture onTouchStartCapture onScrollCapture onWheelCapture onAbortCapture onCanPlayCapture onCanPlayThroughCapture onDurationChangeCapture onEmptiedCapture onEncryptedCapture onEndedCapture onErrorCapture onLoadedDataCapture onLoadedMetadataCapture onLoadStartCapture onPauseCapture onPlayCapture onPlayingCapture onProgressCapture onRateChangeCapture onSeekedCapture onSeekingCapture onStalledCapture onSuspendCapture onTimeUpdateCapture onVolumeChangeCapture onWaitingCapture onLoadCapture onAnimationStartCapture onAnimationEndCapture onAnimationIterationCapture onTransitionEndCapture accept acceptCharset accessKey action allowFullScreen allowTransparency alt as async autoComplete autoPlay capture cellPadding cellSpacing charSet challenge checked cite classID className cols colSpan content contentEditable contextMenu controlsList controls coords crossOrigin data dateTime default defer dir disabled download draggable encType form formAction formEncType formMethod formNoValidate formTarget frameBorder headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media mediaGroup method min minLength multiple muted name nonce noValidate open optimum pattern placeholder playsInline poster preload profile radioGroup readOnly referrerPolicy rel required reversed role rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes span spellCheck src srcDoc srcLang srcSet start step style summary tabIndex target title type useMap value width wmode wrap about datatype inlist prefix property resource typeof vocab autoCapitalize autoCorrect autoSave color itemProp itemScope itemType itemID itemRef results security unselectable accentHeight accumulate additive alignmentBaseline allowReorder alphabetic amplitude arabicForm ascent attributeName attributeType autoReverse azimuth baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight clip clipPath clipRule clipPathUnits colorInterpolation colorInterpolationFilters colorProfile colorRendering contentScriptType contentStyleType cursor cx cy d decelerate descent diffuseConstant direction display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground end exponent externalResourcesRequired fill fillOpacity fillRule filter filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor limitingConeAngle local markerEnd markerMid markerStart markerHeight markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode numOctaves offset opacity operator order orient orientation origin overflow overlinePosition overlineThickness paintOrder panose1 pathLength patternContentUnits patternTransform patternUnits pointerEvents points pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions requiredFeatures restart result rotate rx ry scale seed shapeRendering slope spacing specularConstant specularExponent speed spreadMethod startOffset stdDeviation stemh stemv stitchTiles stopColor stopOpacity strikethroughPosition strikethroughThickness string stroke strokeDasharray strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor textDecoration textRendering textLength to transform u1 u2 underlinePosition underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic vHanging vIdeographic vMathematical values vectorEffect version vertAdvY vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing writingMode x xHeight x1 x2 xChannelSelector xlinkActuate xlinkArcrole xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlBase xmlns xmlnsXlink xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut class for autofocus allow allowUserMedia allowPaymentRequest
*/
/* eslint-enable max-len */

var ATTRIBUTE_REGEX = /^((?:s(?:uppressContentEditableWarn|croll|pac)|(?:shape|image|text)Render|(?:letter|word)Spac|vHang|hang)ing|(?:on(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:Animation|Touch|Load|Drag)Start|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|Lo(?:stPointer|ad)|TimeUpdate|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|GotPointer|MouseDown|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|KeyPress|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|P(?:rogress|laying)|DragEnd|Key(?:Down|Up)|(?:MouseU|Dro)p|(?:Wait|Seek)ing|Scroll|Focus|Paste|Abort|Drag|Play|Blur)Captur|alignmentBaselin|(?:limitingConeAng|xlink(?:(?:Arcr|R)o|Tit)|s(?:urfaceSca|ty|ca)|unselectab|baseProfi|fontSty|(?:focus|dragg)ab|multip|profi|tit)l|d(?:ominantBaselin|efaultValu)|onPointerLeav|a(?:uto(?:Capitaliz|Revers|Sav)|dditiv)|(?:(?:formNoValid|xlinkActu|noValid|accumul|rot)a|autoComple|decelera)t|(?:(?:attribute|item)T|datat)yp|onPointerMov|(?:attribute|glyph)Nam|playsInlin|(?:writing|input|edge)Mod|(?:formE|e)ncTyp|(?:amplitu|mo)d|(?:xlinkTy|itemSco|keyTy|slo)p|(?:xmlSpa|non)c|fillRul|(?:dateTi|na)m|r(?:esourc|ol)|xmlBas|wmod)e|(?:glyphOrientationHorizont|loc)al|(?:externalResourcesRequir|select|revers|mut)ed|c(?:o(?:lorInterpolationFilter|ord)s|o(?:lor(?:Interpolation)?|nt(?:rols|ent))|(?:ontentS(?:cript|tyle)Typ|o(?:ntentEditab|lorProfi)l|l(?:assNam|ipRul)|a(?:lcMod|ptur)|it)e|olorRendering|l(?:ipPathUnits|assID)|(?:ontrolsLis|apHeigh)t|h(?:eckedLink|a(?:llenge|rSet)|ildren|ecked)|ell(?:Spac|Padd)ing|o(?:ntextMenu|ls)|(?:rossOrigi|olSpa)n|l(?:ip(?:Path)?|ass)|ursor|[xy])|glyphOrientationVertical|d(?:angerouslySetInnerHTML|efaultChecked|ownload|isabled|isplay|[xy])|(?:s(?:trikethroughThickn|eaml)es|(?:und|ov)erlineThicknes|r(?:equiredExtension|adiu)|(?:requiredFeatur|tableValu|stitchTil|numOctav|filterR)e|key(?:(?:Splin|Tim)e|Param)|auto[Ff]ocu|header|bia)s|(?:(?:st(?:rikethroughPosi|dDevia)|(?:und|ov)erlinePosi|(?:textDecor|elev)a|orienta)tio|(?:strokeLinejo|orig)i|on(?:PointerDow|FocusI)|formActio|zoomAndPa|directio|(?:vers|act)io|rowSpa|begi|ico)n|o(?:n(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:Animation|Touch|Load|Drag)Start|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|TimeUpdate|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|MouseDown|P(?:rogress|laying)|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|KeyPress|DragEnd|Key(?:Down|Up)|(?:Wait|Seek)ing|(?:MouseU|Dro)p|Scroll|Paste|Focus|Abort|Drag|Play|Load|Blur)|rient)|p(?:reserveAspectRatio|ointsAt[X-Z]|anose1)|(?:(?:allowPaymentReque|(?:fontSize|length)Adju|manife)s|strokeMiterlimi|(?:(?:specularE|e)xpon|renderingInt|asc)en|(?:specularConsta|repeatCou|fontVaria)n|d(?:iffuseConsta|esce)n|baselineShif|vectorEffec|onPointerOu|(?:(?:mar(?:ker|gin)|x)H|accentH|fontW)eigh|markerStar|a(?:utoCorrec|bou)|onFocusOu|intercep|restar|forma|inlis|heigh|lis)t|(?:patternContent|ma(?:sk(?:Content)?|rker)|primitive|gradient|pattern|filter)Units|(?:(?:allowTranspar|baseFrequ)enc|re(?:ferrerPolic|adOnl)|(?:(?:st(?:roke|op)O|floodO|fillO|o)pac|integr|secur)it|visibilit|fontFamil|accessKe|propert|summar)y|(?:gradientT|patternT|t)ransform|(?:(?:st(?:rokeDasho|artO)|o)ffs|acceptChars|formTarg|viewTarg|srcS)et|(?:[xy]ChannelSelect|lightingCol|textAnch|floodCol|stopCol|operat|htmlF)or|(?:(?:enableBackgrou|markerE)n|s(?:p(?:readMetho|ee)|ee)|formMetho|(?:markerM|onInval)i|preloa|metho|kin)d|k(?:ernel(?:UnitLength|Matrix)|[1-4])|strokeDasharray|(?:onPointerCanc|lab)el|(?:allowFullScre|hidd)en|a(?:l(?:lowUserMedia|phabetic|t)|rabicForm|sync)|systemLanguage|(?:(?:o(?:nPointer(?:Ent|Ov)|rd)|allowReord|placehold|frameBord|paintOrd|post)e|repeatDu|d(?:efe|u))r|(?:pointerEve|keyPoi)nts|preserveAlpha|(?:strokeLineca|onPointerU|itemPro|useMa|wra|loo)p|v(?:Mathematical|ert(?:Origin[XY]|AdvY)|alues|ocab)|unicodeRange|h(?:oriz(?:Origin|Adv)X|ttpEquiv)|(?:vI|i)deographic|mathematical|u(?:nicodeBidi|[12])|(?:fontStretc|hig)h|vAlphabetic|(?:(?:mar(?:ker|gin)W|strokeW)id|azimu)th|(?:xmlnsXl|valueL)ink|mediaGroup|spellCheck|(?:text|m(?:in|ax))Length|(?:unitsPerE|optimu|fro)m|r(?:adioGroup|e(?:sults|f[XY]|l)|ows|[xy])|pathLength|(?:xlinkHr|glyphR)ef|innerHTML|xlinkShow|f(?:o(?:ntSize|rm?)|il(?:ter|l))|(?:tabInde|(?:sand|b)bo|viewBo)x|autoPlay|r(?:e(?:quired|sult|f))?|(?:(?:href|xml|src)La|kerni)ng|o(?:verflow|pen)|i(?:temRef|n2|s)|p(?:attern|oints)|unicode|d(?:efault|ata|ir)?|divisor|t(?:arget[XY]|o)|(?:stri|la)ng|(?:width|size)s|prefix|typeof|srcDoc|s(?:coped|te(?:m[hv]|p)|pan)|s(?:t(?:roke|art)|hape|cope|rc)|a(?:ccept|llow|s)|itemID|t(?:arget|ype)|m(?:edia|a(?:sk|x)|in)|value|width|x(?:mlns)?|size|href|k(?:ey)?|end|low|by|x[12]|y[12]|g[12]|i[dn]|f[xy]|[yz])$/;
/* From DOMProperty */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(x|data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var validAttr = function validAttr(name) {
  return ATTRIBUTE_REGEX.test(name) || isCustomAttribute(name.toLowerCase());
};

// 

function hasInInheritanceChain(child, parent) {
  var target = child;

  while (target) {
    target = Object.getPrototypeOf(target);

    if (target && target === parent) {
      return true;
    }
  }

  return false;
}

// 
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

var createBroadcast = function createBroadcast(initialState) {
  var listeners = {};
  var id = 0;
  var state = initialState;

  function publish(nextState) {
    state = nextState;

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in listeners) {
      var listener = listeners[key];
      if (listener === undefined) {
        // eslint-disable-next-line no-continue
        continue;
      }

      listener(state);
    }
  }

  function subscribe(listener) {
    var currentId = id;
    listeners[currentId] = listener;
    id += 1;
    listener(state);
    return currentId;
  }

  function unsubscribe(unsubID) {
    listeners[unsubID] = undefined;
  }

  return { publish: publish, subscribe: subscribe, unsubscribe: unsubscribe };
};

var _contextShape, _ThemeProvider$contex;

// NOTE: DO NOT CHANGE, changing this is a semver major change!
var CHANNEL = '__styled-components__';
var CHANNEL_NEXT = CHANNEL + 'next__';

var CONTEXT_CHANNEL_SHAPE = __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.shape({
  getTheme: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func,
  subscribe: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func,
  unsubscribe: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func
});

var contextShape = (_contextShape = {}, _contextShape[CHANNEL] = __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func, _contextShape[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _contextShape);

var warnChannelDeprecated = void 0;
if (false) {
  warnChannelDeprecated = once(function () {
    // eslint-disable-next-line no-console
    console.warn('Warning: Usage of `context.' + CHANNEL + '` as a function is deprecated. It will be replaced with the object on `.context.' + CHANNEL_NEXT + '` in a future version.');
  });
}

var isFunction = function isFunction(test) {
  return typeof test === 'function';
};

/**
 * Provide a theme to an entire react component tree via context and event listeners (have to do
 * both context and event emitter as pure components block context updates)
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    classCallCheck(this, ThemeProvider);

    var _this = possibleConstructorReturn(this, _Component.call(this));

    _this.unsubscribeToOuterId = -1;

    _this.getTheme = _this.getTheme.bind(_this);
    return _this;
  }

  ThemeProvider.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
    // with the outer theme
    var outerContext = this.context[CHANNEL_NEXT];
    if (outerContext !== undefined) {
      this.unsubscribeToOuterId = outerContext.subscribe(function (theme) {
        _this2.outerTheme = theme;

        if (_this2.broadcast !== undefined) {
          _this2.publish(_this2.props.theme);
        }
      });
    }

    this.broadcast = createBroadcast(this.getTheme());
  };

  ThemeProvider.prototype.getChildContext = function getChildContext() {
    var _this3 = this,
        _babelHelpers$extends;

    return _extends({}, this.context, (_babelHelpers$extends = {}, _babelHelpers$extends[CHANNEL_NEXT] = {
      getTheme: this.getTheme,
      subscribe: this.broadcast.subscribe,
      unsubscribe: this.broadcast.unsubscribe
    }, _babelHelpers$extends[CHANNEL] = function (subscriber) {
      if (false) {
        warnChannelDeprecated();
      }

      // Patch the old `subscribe` provide via `CHANNEL` for older clients.
      var unsubscribeId = _this3.broadcast.subscribe(subscriber);
      return function () {
        return _this3.broadcast.unsubscribe(unsubscribeId);
      };
    }, _babelHelpers$extends));
  };

  ThemeProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      this.publish(nextProps.theme);
    }
  };

  ThemeProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribeToOuterId !== -1) {
      this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeToOuterId);
    }
  };

  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation


  ThemeProvider.prototype.getTheme = function getTheme(passedTheme) {
    var theme = passedTheme || this.props.theme;

    if (isFunction(theme)) {
      var mergedTheme = theme(this.outerTheme);

      if (false) {
        throw new StyledComponentsError(7);
      }

      return mergedTheme;
    }

    if (theme === null || Array.isArray(theme) || (typeof theme === 'undefined' ? 'undefined' : _typeof(theme)) !== 'object') {
      throw new StyledComponentsError(8);
    }

    return _extends({}, this.outerTheme, theme);
  };

  ThemeProvider.prototype.publish = function publish(theme) {
    this.broadcast.publish(this.getTheme(theme));
  };

  ThemeProvider.prototype.render = function render() {
    if (!this.props.children) {
      return null;
    }

    return __WEBPACK_IMPORTED_MODULE_1_react__["d" /* default */].Children.only(this.props.children);
  };

  return ThemeProvider;
}(__WEBPACK_IMPORTED_MODULE_1_react__["a" /* Component */]);

ThemeProvider.childContextTypes = contextShape;
ThemeProvider.contextTypes = (_ThemeProvider$contex = {}, _ThemeProvider$contex[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$contex);

var _babelHelpers$extends;

// HACK for generating all static styles without needing to allocate
// an empty execution context every single time...
var STATIC_EXECUTION_CONTEXT = {};

var modifiedContextShape = _extends({}, contextShape, (_babelHelpers$extends = {}, _babelHelpers$extends[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.instanceOf(ServerStyleSheet)]), _babelHelpers$extends));

var identifiers = {};

/* We depend on components having unique IDs */
var generateId = function generateId(ComponentStyle, _displayName, parentComponentId) {
  var displayName = typeof _displayName !== 'string' ? 'sc' : escape(_displayName);

  /**
   * This ensures uniqueness if two components happen to share
   * the same displayName.
   */
  var nr = (identifiers[displayName] || 0) + 1;
  identifiers[displayName] = nr;

  var componentId = displayName + '-' + ComponentStyle.generateName(displayName + nr);

  return parentComponentId !== undefined ? parentComponentId + '-' + componentId : componentId;
};

var warnExtendDeprecated = function warnExtendDeprecated() {};
if (false) {
  warnExtendDeprecated = once(function () {
    // eslint-disable-next-line no-console
    console.warn('Warning: The "extend" API will be removed in the upcoming v4.0 release. Use styled(StyledComponent) instead. You can find more information here: https://github.com/styled-components/styled-components/issues/1546');
  });
}

// $FlowFixMe

var BaseStyledComponent = function (_Component) {
  inherits(BaseStyledComponent, _Component);

  function BaseStyledComponent() {
    var _temp, _this, _ret;

    classCallCheck(this, BaseStyledComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.attrs = {}, _this.state = {
      theme: null,
      generatedClassName: ''
    }, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
  }

  BaseStyledComponent.prototype.unsubscribeFromContext = function unsubscribeFromContext() {
    if (this.unsubscribeId !== -1) {
      this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
    }
  };

  BaseStyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props) {
    var attrs = this.constructor.attrs;

    var context = _extends({}, props, { theme: theme });
    if (attrs === undefined) {
      return context;
    }

    this.attrs = Object.keys(attrs).reduce(function (acc, key) {
      var attr = attrs[key];

      // eslint-disable-next-line no-param-reassign
      acc[key] = typeof attr === 'function' && !hasInInheritanceChain(attr, __WEBPACK_IMPORTED_MODULE_1_react__["a" /* Component */]) ? attr(context) : attr;
      return acc;
    }, {});

    return _extends({}, context, this.attrs);
  };

  BaseStyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
    var _constructor = this.constructor,
        attrs = _constructor.attrs,
        componentStyle = _constructor.componentStyle,
        warnTooManyClasses = _constructor.warnTooManyClasses;

    var styleSheet = this.context[CONTEXT_KEY] || StyleSheet.master;

    // statically styled-components don't need to build an execution context object,
    // and shouldn't be increasing the number of class names
    if (componentStyle.isStatic && attrs === undefined) {
      return componentStyle.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, styleSheet);
    } else {
      var executionContext = this.buildExecutionContext(theme, props);
      var className = componentStyle.generateAndInjectStyles(executionContext, styleSheet);

      if (false) {
        warnTooManyClasses(className);
      }

      return className;
    }
  };

  BaseStyledComponent.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var componentStyle = this.constructor.componentStyle;

    var styledContext = this.context[CHANNEL_NEXT];

    // If this is a statically-styled component, we don't need to the theme
    // to generate or build styles.
    if (componentStyle.isStatic) {
      var generatedClassName = this.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, this.props);
      this.setState({ generatedClassName: generatedClassName });
      // If there is a theme in the context, subscribe to the event emitter. This
      // is necessary due to pure components blocking context updates, this circumvents
      // that by updating when an event is emitted
    } else if (styledContext !== undefined) {
      var subscribe = styledContext.subscribe;

      this.unsubscribeId = subscribe(function (nextTheme) {
        // This will be called once immediately
        var theme = determineTheme(_this2.props, nextTheme, _this2.constructor.defaultProps);

        var generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props);

        _this2.setState({ theme: theme, generatedClassName: generatedClassName });
      });
    } else {
      // eslint-disable-next-line react/prop-types
      var theme = this.props.theme || EMPTY_OBJECT;
      var _generatedClassName = this.generateAndInjectStyles(theme, this.props);
      this.setState({ theme: theme, generatedClassName: _generatedClassName });
    }
  };

  BaseStyledComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    // If this is a statically-styled component, we don't need to listen to
    // props changes to update styles
    var componentStyle = this.constructor.componentStyle;

    if (componentStyle.isStatic) {
      return;
    }

    this.setState(function (prevState) {
      var theme = determineTheme(nextProps, prevState.theme, _this3.constructor.defaultProps);
      var generatedClassName = _this3.generateAndInjectStyles(theme, nextProps);

      return { theme: theme, generatedClassName: generatedClassName };
    });
  };

  BaseStyledComponent.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribeFromContext();
  };

  BaseStyledComponent.prototype.render = function render() {
    // eslint-disable-next-line react/prop-types
    var innerRef = this.props.innerRef;
    var generatedClassName = this.state.generatedClassName;
    var _constructor2 = this.constructor,
        styledComponentId = _constructor2.styledComponentId,
        target = _constructor2.target;

    var isTargetTag = isTag(target);

    var className = [
    // eslint-disable-next-line react/prop-types
    this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ');

    var baseProps = _extends({}, this.attrs, {
      className: className
    });

    if (isStyledComponent(target)) {
      baseProps.innerRef = innerRef;
    } else {
      baseProps.ref = innerRef;
    }

    var propsForElement = baseProps;
    var key = void 0;

    for (key in this.props) {
      // Don't pass through non HTML tags through to HTML elements
      // always omit innerRef
      if (key !== 'innerRef' && key !== 'className' && (!isTargetTag || validAttr(key))) {
        propsForElement[key] = key === 'style' && key in this.attrs ? _extends({}, this.attrs[key], this.props[key]) : this.props[key];
      }
    }

    return Object(__WEBPACK_IMPORTED_MODULE_1_react__["c" /* createElement */])(target, propsForElement);
  };

  return BaseStyledComponent;
}(__WEBPACK_IMPORTED_MODULE_1_react__["a" /* Component */]);

var _StyledComponent = function _StyledComponent(ComponentStyle, constructWithOptions) {
  var createStyledComponent = function createStyledComponent(target, options, rules) {
    var _options$isClass = options.isClass,
        isClass = _options$isClass === undefined ? !isTag(target) : _options$isClass,
        _options$displayName = options.displayName,
        displayName = _options$displayName === undefined ? generateDisplayName(target) : _options$displayName,
        _options$componentId = options.componentId,
        componentId = _options$componentId === undefined ? generateId(ComponentStyle, options.displayName, options.parentComponentId) : _options$componentId,
        _options$ParentCompon = options.ParentComponent,
        ParentComponent = _options$ParentCompon === undefined ? BaseStyledComponent : _options$ParentCompon,
        extendingRules = options.rules,
        attrs = options.attrs;

    var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + '-' + options.componentId : options.componentId || componentId;

    var componentStyle = new ComponentStyle(extendingRules === undefined ? rules : extendingRules.concat(rules), attrs, styledComponentId);

    var StyledComponent = function (_ParentComponent) {
      inherits(StyledComponent, _ParentComponent);

      function StyledComponent() {
        classCallCheck(this, StyledComponent);
        return possibleConstructorReturn(this, _ParentComponent.apply(this, arguments));
      }

      StyledComponent.withComponent = function withComponent(tag) {
        var previousComponentId = options.componentId,
            optionsToCopy = objectWithoutProperties(options, ['componentId']);

        var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : escape(getComponentName(tag)));

        var newOptions = _extends({}, optionsToCopy, {
          componentId: newComponentId,
          ParentComponent: StyledComponent
        });

        return createStyledComponent(tag, newOptions, rules);
      };

      createClass(StyledComponent, null, [{
        key: 'extend',
        get: function get$$1() {
          var rulesFromOptions = options.rules,
              parentComponentId = options.componentId,
              optionsToCopy = objectWithoutProperties(options, ['rules', 'componentId']);

          var newRules = rulesFromOptions === undefined ? rules : rulesFromOptions.concat(rules);

          var newOptions = _extends({}, optionsToCopy, {
            rules: newRules,
            parentComponentId: parentComponentId,
            ParentComponent: StyledComponent
          });

          warnExtendDeprecated();

          return constructWithOptions(createStyledComponent, target, newOptions);
        }
      }]);
      return StyledComponent;
    }(ParentComponent);

    StyledComponent.attrs = attrs;
    StyledComponent.componentStyle = componentStyle;
    StyledComponent.contextTypes = modifiedContextShape;
    StyledComponent.displayName = displayName;
    StyledComponent.styledComponentId = styledComponentId;
    StyledComponent.target = target;

    if (false) {
      StyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName);
    }

    if (isClass) {
      __WEBPACK_IMPORTED_MODULE_6_hoist_non_react_statics___default()(StyledComponent, target, {
        // all SC-specific things should not be hoisted
        attrs: true,
        componentStyle: true,
        displayName: true,
        extend: true,
        styledComponentId: true,
        target: true,
        warnTooManyClasses: true,
        withComponent: true
      });
    }

    return StyledComponent;
  };

  return createStyledComponent;
};

// Source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
function murmurhash(str) {
  var l = str.length | 0,
      h = l | 0,
      i = 0,
      k;

  while (l >= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;

    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    k ^= k >>> 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);

    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;

    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  h ^= h >>> 15;

  return h >>> 0;
}

// 

var areStylesCacheable = IS_BROWSER;

var isStaticRules = function isStaticRules(rules, attrs) {
  for (var i = 0, len = rules.length; i < len; i += 1) {
    var rule = rules[i];

    // recursive case
    if (Array.isArray(rule) && !isStaticRules(rule)) {
      return false;
    } else if (typeof rule === 'function' && !isStyledComponent(rule)) {
      // functions are allowed to be static if they're just being
      // used to get the classname of a nested styled component
      return false;
    }
  }

  if (attrs !== undefined) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in attrs) {
      if (typeof attrs[key] === 'function') {
        return false;
      }
    }
  }

  return true;
};

var isHMREnabled = typeof module !== 'undefined' && module.hot && "production" !== 'production';

/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */
var _ComponentStyle = function _ComponentStyle(nameGenerator, flatten, stringifyRules) {
  /* combines hashStr (murmurhash) and nameGenerator for convenience */
  var generateRuleHash = function generateRuleHash(str) {
    return nameGenerator(murmurhash(str));
  };

  var ComponentStyle = function () {
    function ComponentStyle(rules, attrs, componentId) {
      classCallCheck(this, ComponentStyle);

      this.rules = rules;
      this.isStatic = !isHMREnabled && isStaticRules(rules, attrs);
      this.componentId = componentId;

      if (!StyleSheet.master.hasId(componentId)) {
        var placeholder =  false ? ['.' + componentId + ' {}'] : [];

        StyleSheet.master.deferredInject(componentId, placeholder);
      }
    }

    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a .hash1234 {}
     * Returns the hash to be injected on render()
     * */

    ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
      var isStatic = this.isStatic,
          componentId = this.componentId,
          lastClassName = this.lastClassName;

      if (areStylesCacheable && isStatic && lastClassName !== undefined && styleSheet.hasNameForId(componentId, lastClassName)) {
        return lastClassName;
      }

      var flatCSS = flatten(this.rules, executionContext);
      var name = generateRuleHash(this.componentId + flatCSS.join(''));

      if (!styleSheet.hasNameForId(componentId, name)) {
        styleSheet.inject(this.componentId, stringifyRules(flatCSS, '.' + name), name);
      }

      this.lastClassName = name;
      return name;
    };

    ComponentStyle.generateName = function generateName(str) {
      return generateRuleHash(str);
    };

    return ComponentStyle;
  }();

  return ComponentStyle;
};

// 
// Thanks to ReactDOMFactories for this handy list!

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

// SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

// 

var _styled = function _styled(styledComponent, constructWithOptions) {
  var styled = function styled(tag) {
    return constructWithOptions(styledComponent, tag);
  };

  // Shorthands for all valid HTML Elements
  domElements.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });

  return styled;
};

// 

var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

var _keyframes = function _keyframes(nameGenerator, stringifyRules, css) {
  return function () {
    var styleSheet = StyleSheet.master;
    var rules = css.apply(undefined, arguments);
    var name = nameGenerator(murmurhash(replaceWhitespace(JSON.stringify(rules))));
    var id = 'sc-keyframes-' + name;

    if (!styleSheet.hasNameForId(id, name)) {
      styleSheet.inject(id, stringifyRules(rules, name, '@keyframes'), name);
    }

    return name;
  };
};

// 

var _injectGlobal = function _injectGlobal(stringifyRules, css) {
  var injectGlobal = function injectGlobal() {
    var styleSheet = StyleSheet.master;
    var rules = css.apply(undefined, arguments);
    var hash = murmurhash(JSON.stringify(rules));
    var id = 'sc-global-' + hash;

    if (!styleSheet.hasId(id)) {
      styleSheet.inject(id, stringifyRules(rules));
    }
  };

  return injectGlobal;
};

// 

var _constructWithOptions = function _constructWithOptions(css) {
  var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJECT;

    if (!Object(__WEBPACK_IMPORTED_MODULE_7_react_is__["isValidElementType"])(tag)) {
      throw new StyledComponentsError(1, String(tag));
    }

    /* This is callable directly as a template function */
    // $FlowFixMe: Not typed to avoid destructuring arguments
    var templateFunction = function templateFunction() {
      return componentConstructor(tag, options, css.apply(undefined, arguments));
    };

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: _extends({}, options.attrs || EMPTY_OBJECT, attrs)
      }));
    };

    return templateFunction;
  };

  return constructWithOptions;
};

// 

var withTheme = function withTheme(Component$$1) {
  var isStatelessFunctionalComponent = typeof Component$$1 === 'function' &&
  // $FlowFixMe TODO: flow for prototype
  !(Component$$1.prototype && 'isReactComponent' in Component$$1.prototype);

  // NOTE: We can't pass a ref to a stateless functional component
  var shouldSetInnerRef = isStyledComponent(Component$$1) || isStatelessFunctionalComponent;

  var WithTheme = function (_React$Component) {
    inherits(WithTheme, _React$Component);

    function WithTheme() {
      var _temp, _this, _ret;

      classCallCheck(this, WithTheme);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = EMPTY_OBJECT, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
    }

    // NOTE: This is so that isStyledComponent passes for the innerRef unwrapping


    WithTheme.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var defaultProps = this.constructor.defaultProps;

      var styledContext = this.context[CHANNEL_NEXT];
      var themeProp = determineTheme(this.props, undefined, defaultProps);
      if (styledContext === undefined && themeProp === undefined && "production" !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps');
      } else if (styledContext === undefined && themeProp !== undefined) {
        this.setState({ theme: themeProp });
      } else {
        var subscribe = styledContext.subscribe;

        this.unsubscribeId = subscribe(function (nextTheme) {
          var theme = determineTheme(_this2.props, nextTheme, defaultProps);
          _this2.setState({ theme: theme });
        });
      }
    };

    WithTheme.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var defaultProps = this.constructor.defaultProps;

      this.setState(function (oldState) {
        var theme = determineTheme(nextProps, oldState.theme, defaultProps);

        return { theme: theme };
      });
    };

    WithTheme.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
      }
    };

    WithTheme.prototype.render = function render() {
      var props = _extends({
        theme: this.state.theme
      }, this.props);

      if (!shouldSetInnerRef) {
        props.ref = props.innerRef;
        delete props.innerRef;
      }

      return __WEBPACK_IMPORTED_MODULE_1_react__["d" /* default */].createElement(Component$$1, props);
    };

    return WithTheme;
  }(__WEBPACK_IMPORTED_MODULE_1_react__["d" /* default */].Component);

  WithTheme.contextTypes = contextShape;
  WithTheme.displayName = 'WithTheme(' + getComponentName(Component$$1) + ')';
  WithTheme.styledComponentId = 'withTheme';

  return __WEBPACK_IMPORTED_MODULE_6_hoist_non_react_statics___default()(WithTheme, Component$$1);
};

// 

/* eslint-disable */
var __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS = {
  StyleSheet: StyleSheet
};

// 

/* Warning if you've imported this file on React Native */
if (false) {
  // eslint-disable-next-line no-console
  console.warn("It looks like you've imported 'styled-components' on React Native.\n" + "Perhaps you're looking to import 'styled-components/native'?\n" + 'Read more about this at https://www.styled-components.com/docs/basics#react-native');
}

/* Warning if there are several instances of styled-components */
if (false) {
  window['__styled-components-init__'] = window['__styled-components-init__'] || 0;

  if (window['__styled-components-init__'] === 1) {
    // eslint-disable-next-line no-console
    console.warn("It looks like there are several instances of 'styled-components' initialized in this application. " + 'This may cause dynamic styles not rendering properly, errors happening during rehydration process ' + 'and makes your application bigger without a good reason.\n\n' + 'See https://s-c.sh/2BAXzed for more info.');
  }

  window['__styled-components-init__'] += 1;
}

/* Instantiate singletons */
var ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules);
var constructWithOptions = _constructWithOptions(css);
var StyledComponent = _StyledComponent(ComponentStyle, constructWithOptions);

/* Instantiate exported singletons */
var keyframes = _keyframes(generateAlphabeticName, stringifyRules, css);
var injectGlobal = _injectGlobal(stringifyRules, css);
var styled = _styled(StyledComponent, constructWithOptions);

/* harmony default export */ __webpack_exports__["c"] = (styled);

//# sourceMappingURL=styled-components.esm.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("pv+l")(module)))

/***/ }),

/***/ "GNQB":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"ldsRing":"ldsRing__3x1W7"};

/***/ }),

/***/ "GjWG":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"formContainer":"formContainer__1XJ08"};

/***/ }),

/***/ "H1RQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__("RsE0");
} else {
  module.exports = require('./cjs/react-is.development.js');
}

/***/ }),

/***/ "J4GW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"search":"search__2-8Kz","listItems":"listItems__16EqL","infoWrapper":"infoWrapper__3cbB8","infoMessage":"infoMessage__9F7UF","infoIcon":"infoIcon__84nL1","title":"title__2iaYI","listItemWrapper":"listItemWrapper__21eW2","listItemLink":"listItemLink__3j4FE","listItem":"listItem__29e2n","listItemAction":"listItemAction__1tmWk","listItemMain":"listItemMain__2KU1-","listItemAside":"listItemAside__1m9LH","itemActionLink":"itemActionLink__3B_OP","startTime":"startTime__-cf_E","price":"price__2Elbz","category":"category__g6hkq","venue":"venue__1vLQq","instructor":"instructor__1SQ9m","filtersButtonWrapper":"filtersButtonWrapper__3uNOD","filtersButtonContainer":"filtersButtonContainer__2eD-l","filtersButton":"filtersButton__2nkFI","filterIcon":"filterIcon__IAjqJ","filterCount":"filterCount__2uHeF","mapIcon":"mapIcon__3PXt2","listIcon":"listIcon__1BJh3","dayWrapper":"dayWrapper__2wPmt"};

/***/ }),

/***/ "J4Nk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(_extends({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.scss
var style_0 = __webpack_require__("yY49");
var style_default = /*#__PURE__*/__webpack_require__.n(style_0);

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


// CONCATENATED MODULE: ./config.js
var config_config = {
  Version: 2
};

/* harmony default export */ var config_0 = (config_config);
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
          'small',
          { style: { position: 'fixed', right: 0, bottom: 0 } },
          config_config.Version
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

  this.onRoute = function (event) {};

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

// EXTERNAL MODULE: ./components/map/style.scss
var map_style = __webpack_require__("dabo");
var map_style_default = /*#__PURE__*/__webpack_require__.n(map_style);

// CONCATENATED MODULE: ./utils/classNames.js
var classNames = function classNames(obj) {
  return Object.entries(obj).filter(function (e) {
    return e[1];
  }).map(function (e) {
    return e[0];
  }).join(' ');
};

/* harmony default export */ var utils_classNames = (classNames);
// EXTERNAL MODULE: ../node_modules/loadjs/dist/loadjs.umd.js
var loadjs_umd = __webpack_require__("r4pm");
var loadjs_umd_default = /*#__PURE__*/__webpack_require__.n(loadjs_umd);

// CONCATENATED MODULE: ./lazyLoaders.js


var addLink = function addLink(url) {
  var link = document.createElement('link');
  link.src = url;
  link.rel = 'stylesheet';
  link.type = 'text/css'; // no need for HTML5
  document.getElementsByTagName('head')[0].appendChild(link); // for IE6
};

var loading = {
  mapbox: false
};

var loaded = {
  mapbox: false
};

function loadMapBox() {
  return new Promise(function ($return, $error) {
    if (!loading.mapbox && !loaded.mapbox) {
      addLink('https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.2/mapbox-gl.css');
      loading.mapbox = true;
      return Promise.resolve(loadjs_umd_default()('https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.2/mapbox-gl.js', { returnPromise: true })).then(function ($await_2) {
        try {
          loading.mapbox = false;
          loaded.mapbox = true;
          return $If_1.call(this);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }

    function $If_1() {
      return $return();
    }

    return $If_1.call(this);
  });
}
// CONCATENATED MODULE: ./components/map/Map.js


function Map__objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function Map__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Map__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Map__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var _ref3 = Object(preact_min["h"])('div', { className: 'mapboxgl-ctrl' });

var Map_Map = function (_Component) {
  Map__inherits(Map, _Component);

  function Map(props) {
    Map__classCallCheck(this, Map);

    var _this = Map__possibleConstructorReturn(this, _Component.call(this, props));

    _this.onDone = function (event) {};

    _this.onReset = function (event) {};

    _this.popupHTML = function (item) {
      var categories = item.categories.map(function (x, i) {
        return '<a class="popup-content--category"\n            href=\'\'\n        >\n          #' + x.name.toLowerCase() + '\n        </a>';
      }).join('');

      return '<div class="popup-content" >\n        <a class="popup-content--link" href=\'/classes/' + item.id + '?i=1\'></a>\n        <div class="popup-content--aside">\n          <div class="popup-content--startTime">' + item.start_time + '</div>\n          <div class="popup-content--price">\xA3' + item.price + '</div>\n        </div>\n        <div class="popup-content--main">\n          <div class="popup-content--categories">' + categories + '</div>\n          <div class="popup-content--title">' + item.title + '</div>\n          <div class="popup-content--venue">\n            <div>' + item.venue.name + '</div>\n            <div>' + item.venue.area + '</div>\n          </div>\n          <div class="popup-content--instructor">\n            <img\n              class="popup-content--instructor-avatar"\n              alt=\'' + item.instructors[0].name + '\'\n              src=\'' + (item.instructors[0].avatar || 'https://api.adorable.io/avatars/60/' + item.instructors[0].email + '.png') + '\'\n            />\n            <div class="popup-content--instructorName">\n              ' + item.instructors[0].name + '\n            </div>\n          </div>\n        </div>\n        <div class="popup-content--action">\n          <a class="popup-content--itemActionLink" href=\'/classes/' + item.id + '\'>\n            <span class="rightArrow" />\n          </a>\n        </div>\n      </div>';
    };

    _this.onLibLoaded = function () {
      return new Promise(function ($return, $error) {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWZieDlkIiwiYSI6ImNrMG8xd2NocTAzcDUzZ242bmJxemRhcmoifQ.-MmxtOUW0-Dz9rgGZTLTDw';
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v10?optimize=true',
          center: [-0.120624, 51.513322],
          zoom: 10
        });
        map.on('load', function () {
          var items = [{
            id: 1,
            instructors: [{
              name: 'Alexander Smith',
              avatar: 'https://api.adorable.io/avatars/60/alexander@smith.png'
            }],
            title: 'Introduction to Bachata',
            price: 12,
            categories: [{ name: 'bachata' }],
            start_time: '07:30',
            duration: 'Alexander Smith',
            venue: {
              area: 'Covent Garden',
              name: 'Pineapple Dance Studios',
              lat: 51.513322,
              lon: -0.120624
            }
          }];
          _this.props.items.forEach(function (item) {
            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';
            var lngLat = [item.venue.lon, item.venue.lat];
            console.log('lngLat', lngLat);
            new mapboxgl.Marker(el).setLngLat(lngLat).setPopup(new mapboxgl.Popup({ offset: 37, maxWidth: '316px' }).setHTML(_this.popupHTML(item))).addTo(map);
          });
        });
        return $return();
      });
    };

    _this.state = {
      libLoaded: false,
      libLoading: false
    };
    return _this;
  }

  Map.prototype.componentDidMount = function componentDidMount() {};

  Map.prototype.componentDidUpdate = function componentDidUpdate() {
    return new Promise(function ($return, $error) {
      if (!this.props.active) return $return();
      if (!this.state.libLoaded && !this.state.libLoading) {
        this.setState({ libLoading: true });
        return Promise.resolve(loadMapBox()).then(function ($await_2) {
          try {
            this.setState({ libLoading: false, libLoaded: true });
            return Promise.resolve(this.onLibLoaded()).then(function ($await_3) {
              try {
                return $If_1.call(this);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this), $error);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this), $error);
      }

      function $If_1() {
        return $return();
      }

      return $If_1.call(this);
    }.bind(this));
  };

  Map.prototype.render = function render(_ref, _ref2) {
    var _classNames;

    var active = _ref.active;

    Map__objectDestructuringEmpty(_ref2);

    return Object(preact_min["h"])(
      'div',
      {
        className: utils_classNames((_classNames = {}, _classNames[map_style_default.a.MapWrapper] = 1, _classNames[map_style_default.a.close] = !active, _classNames))
      },
      Object(preact_min["h"])(
        'div',
        { className: map_style_default.a.Map },
        Object(preact_min["h"])('div', { id: 'map', style: { width: '100%', height: '100%' } }),
        _ref3
      )
    );
  };

  return Map;
}(preact_min["Component"]);


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
      return dayjs_min_default()().set('date', date).set('month', month).set('year', year);
    }
  }
  return dayjs_min_default()();
}

var Search__ref3 = Object(preact_min["h"])('img', {
  width: '85',
  height: '119',
  src: '/assets/images/dancing.gif',
  alt: 'loading'
});

var Search__ref4 = Object(preact_min["h"])(
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

    var filters = getFiltersFromUrl(props.url || location.href) || {};
    var filterCount = _this.getFilterCount(filters);
    // || dayjs().format('YYYY-MM-DD')
    var day = parseDate(props.date);
    var allClasses = props.data.state.classes;
    _this.state = {
      day: day,
      filters: filters,
      filterCount: filterCount,
      allClasses: allClasses,
      isOffline: false,
      classes: _this.doLocalSearch(allClasses, day)
    };
    return _this;
  }

  Search.prototype.componentDidMount = function componentDidMount() {
    return new Promise(function ($return, $error) {
      return Promise.resolve(this.doSearch()).then(function ($await_2) {
        try {
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    }.bind(this));
  };

  /*
     RGX to replace
     https://instructorlist.org/search/2019-09-23/?i={}
     to become
     https://instructorlist.org/search/2019-09-23/filters?i={}
     And keeping the search part of the url
  */


  Search.prototype.render = function render(_ref, _ref2) {
    var _classNames,
        _classNames2,
        _classNames3,
        _classNames4,
        _this2 = this,
        _h;

    var day = _ref2.day,
        filters = _ref2.filters,
        filterCount = _ref2.filterCount,
        classes = _ref2.classes;

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
          this.formatCurrentDay()
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
          className: classNames((_classNames = {}, _classNames[components_search_style_default.a.infoWrapper] = true, _classNames.hide = this.state.isLoading || classes.length !== 0 || this.state.isOffline, _classNames))
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
          className: classNames((_classNames2 = {}, _classNames2[components_search_style_default.a.infoWrapper] = true, _classNames2.hide = !this.state.isOffline, _classNames2))
        },
        Object(preact_min["h"])(
          'div',
          { className: components_search_style_default.a.infoMessage },
          Object(preact_min["h"])('div', { className: 'shrug ' + components_search_style_default.a.infoIcon }),
          Object(preact_min["h"])(
            'div',
            { className: components_search_style_default.a.title },
            'You are offline'
          )
        )
      ),
      Object(preact_min["h"])(
        'div',
        {
          className: classNames((_classNames3 = {}, _classNames3[components_search_style_default.a.infoWrapper] = true, _classNames3.hide = !this.state.isLoading || classes.length !== 0, _classNames3))
        },
        Search__ref3,
        Search__ref4
      ),
      Object(preact_min["h"])(Map_Map, { items: classes, onDone: this.onDone, active: this.isMapView() }),
      Object(preact_min["h"])(
        'div',
        {
          style: { display: this.isMapView() ? 'none' : 'flex' },
          className: classNames((_classNames4 = {}, _classNames4[components_search_style_default.a.listItems] = true, _classNames4))
        },
        classes && classes.map(function (item) {
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
                        href: '/search/category/' + x.normalized_name
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
              href: this.simulateToUrl('/filters'),
              onClick: this.toggleFilters,
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
            (_h = {
              onClick: function onClick() {
                return Object(preact_router_es["route"])(_this2.simulateToUrl('/map'));
              },
              className: components_search_style_default.a.filtersButton
            }, _h['onClick'] = this.toggleMapView, _h),
            Object(preact_min["h"])('div', {
              className: components_search_style_default.a.filterIcon + ' ' + (this.isMapView() ? components_search_style_default.a.listIcon : components_search_style_default.a.mapIcon)
            }),
            this.isMapView() ? 'List View' : 'Map View'
          )
        )
      )
    );
  };

  return Search;
}(preact_min["Component"]), Search__initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getFilterCount = function (filters) {
    return typeof filters === 'object' ? Object.keys(filters).filter(function (key) {
      return key !== 'day';
    }).length : 0;
  };

  this.doSearch = function () {
    return new Promise(function ($return, $error) {
      var _state, filters, day, res;

      _state = _this3.state, filters = _state.filters, day = _state.day;
      return Promise.resolve(_this3.setState({ isLoading: true })).then(function ($await_3) {
        try {
          res = void 0;
          var $Try_1_Post = function () {
            try {
              _this3.setState({ isLoading: false });
              _this3.setState({
                day: day || parseDate(_this3.props.date),
                allClasses: res.results
              }, function () {
                return res.results && _this3.doLocalSearch();
              });
              return $return();
            } catch ($boundEx) {
              return $error($boundEx);
            }
          };var $Try_1_Catch = function (err) {
            try {
              _this3.setState({ isOffline: true });
              return $Try_1_Post();
            } catch ($boundEx) {
              return $error($boundEx);
            }
          };try {
            return Promise.resolve(_this3.props.data.getSearch(filters)).then(function ($await_4) {
              try {
                res = $await_4;
                return $Try_1_Post();
              } catch ($boundEx) {
                return $Try_1_Catch($boundEx);
              }
            }, $Try_1_Catch);
          } catch (err) {
            $Try_1_Catch(err)
          }
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  };

  this.doLocalSearch = function () {
    var allClasses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.state.allClasses;
    var day = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this3.state.day;

    if (!day.isValid()) console.error('Invalid Date');
    var dayFilter = day.day();
    var classes = [];
    if (allClasses) {
      classes = Object.values(allClasses).filter(function (item) {
        if (item.day !== dayFilter) return false;
        var matchedACategory = false;
        var hasCategories = false;
        var hasTimes = false;

        // Basic search
        for (var key in _this3.state.filters) {
          if (_this3.state.filters.hasOwnProperty(key)) {
            var filter = _this3.state.filters[key];
            if (filter.type === 'time') {
              hasTimes = true;
              var start = timeToMinutes(item.start_time);
              var fStart = parseInt(key) * 60;
              var filterDuration = 3 * 60;
              var fEnd = fStart + filterDuration;
              if (start >= fStart && start <= fEnd) return true;
            } else if (filter.type === 'category' && !matchedACategory) {
              hasCategories = true;
              for (var i = 0; i < item.categories.length; i++) {
                var category = item.categories[i];
                if (category.name.toLowerCase() === key.toLowerCase()) {
                  return true;
                }
              }
            }
          }
        }

        if (hasTimes || hasCategories) return false;
        return true;
      });
    }
    _this3.setState({ classes: classes });
    return classes;
  };

  this.simulateToUrl = function (to) {
    // 'https://instructorlist.org/search/2019-09-23/?i={}'.replace(
    //   new RegExp(`(\/search\/?(${day})?)\/?`),
    //   `/search/2019-09-08/filters`,
    // )
    var day = _this3.state.day.format('YYYY-MM-DD');
    var rgx = new RegExp('(/search/?(' + day + ')?)/?');
    var newPath = '/search/' + day + to;
    if (is_ssr()) {
      return _this3.props.url.replace(rgx, newPath);
    }
    return location.pathname.replace(rgx, newPath) + location.search;
  };

  this.onDone = function (filters) {
    _this3.setState({
      filters: filters,
      filterCount: _this3.getFilterCount(filters)
    }, _this3.doLocalSearch);
  };

  this.isFilterView = function () {
    return _this3.props.path.indexOf('/search/:date/filters') === 0;
  };

  this.toggleMapView = function () {
    console.log('this.props.url', _this3.props.url);
    event.preventDefault();
    event.stopPropagation();
    if (_this3.isMapView()) {
      return Object(preact_router_es["route"])(_this3.props.url.replace('/map', ''));
    } else if (_this3.isFilterView()) {
      return Object(preact_router_es["route"])(_this3.props.url.replace('/filters', ''));
    }
    return Object(preact_router_es["route"])(_this3.simulateToUrl('/map'));
  };

  this.toggleFilters = function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (_this3.isMapView()) {
      return Object(preact_router_es["route"])(_this3.props.url.replace('/map', ''));
    } else if (_this3.isFilterView()) {
      return Object(preact_router_es["route"])(_this3.props.url.replace('/filters', ''));
    }
    return Object(preact_router_es["route"])(_this3.simulateToUrl('/filters'));
  };

  this.routeToFilters = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return Object(preact_router_es["route"])(_this3.simulateToUrl('/filters'));
  };

  this.addDay = function (x) {
    return function (e) {
      e.preventDefault();
      e.stopPropagation();
      var _state2 = _this3.state,
          _day = _state2.day,
          _filters = _state2.filters;

      var _simulateAddDayUrl = _this3.simulateAddDayUrl(x, _day, _filters),
          day = _simulateAddDayUrl.day,
          filters = _simulateAddDayUrl.filters,
          url = _simulateAddDayUrl.url;

      _this3.setState({ day: day, filters: filters }, _this3.doLocalSearch);
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

  this.formatCurrentDay = function () {
    var day = _this3.state.day;

    var now = dayjs_min_default()().set('hour', day.hour()).set('minute', day.minute()).set('second', day.second()).set('millisecond', day.millisecond());
    var diff = day.diff(now, 'day');
    if (diff === 0) {
      return 'TODAY';
    } else if (diff === 1) {
      return 'TOMORROW';
    } else if (diff === -1) {
      return 'YESTERDAY';
    }
    return day.format('dddd D MMM').toUpperCase();
  };

  this.isMapView = function () {
    return _this3.props.path.indexOf('/search/:date/map') === 0;
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

// CONCATENATED MODULE: ./utils/convertArrayToObject.js
function convertArrayToObject(array, key) {
  if (!Array.isArray(array)) throw new Error('First argument must be array');
  return array.reduce(function (acc, cur) {
    acc[cur[key]] = cur;
    return acc;
  }, {});
}
// CONCATENATED MODULE: ./DataService.js
function DataService__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




// ? 'http://localhost:8000'
var BASE_URL = is_dev() ? 'https://instructorlist-django.herokuapp.com' : 'https://instructorlist-django.herokuapp.com';

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

var DataService_DataService = function DataService(initialState) {
  var _this = this;

  DataService__classCallCheck(this, DataService);

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

  // TODO: include flag for is this prerendered data or not
  // add data fetch time
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
          _this3.setState({ card: card, prButton: prButton, paymentRequest: paymentRequest });
          return $return();
        }

        return $If_1.call(this);
      });
    };

    _this3.onSubmit = function (e) {
      return new Promise(function ($return, $error) {
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

            if (res.error) {
              // Show error from Stripe.js in payment form
              return $return(res);
            }
            body = {
              payment_intent_id: res.paymentIntent.id,
              amount: _this3.getAmount()
            };
            return Promise.resolve(_this3.confirm('intent', body)).then(function ($await_11) {
              try {
                confirmationRes = $await_11;
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
            if (res.ok) {
              return $return(res.json());
            }
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
                      } else {
                          // The payment has succeeded.
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

    _this3.state = {
      loadingStripe: true,
      responses: []
    };
    _this3.props.onSubmit(_this3.onSubmit);
    return _this3;
  }

  StripeForm.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    // Important so that Stripe elements can be found by stripe Lib
    return nextState.loadingStripe === false && this.state.loadingStripe === true;
  };

  StripeForm.prototype.componentWillUnmount = function componentWillUnmount() {
    return new Promise(function ($return, $error) {
      if (this.state.card) {
        this.state.card.destroy();
      }
      return $return();
    }.bind(this));
  };

  StripeForm.prototype.componentDidMount = function componentDidMount() {
    return new Promise(function ($return, $error) {
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


// EXTERNAL MODULE: ./components/paymentsuccess/style.scss
var paymentsuccess_style = __webpack_require__("CBWn");
var paymentsuccess_style_default = /*#__PURE__*/__webpack_require__.n(paymentsuccess_style);

// EXTERNAL MODULE: ./components/directions/style.scss
var directions_style = __webpack_require__("0YCM");
var directions_style_default = /*#__PURE__*/__webpack_require__.n(directions_style);

// CONCATENATED MODULE: ./components/directions/Directions.js


function Directions__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Directions__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Directions__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Directions__ref2 = Object(preact_min["h"])('div', { className: 'directions' });

var Directions__ref3 = Object(preact_min["h"])('div', { className: 'rightArrow' });

var Directions_Directions = function (_Component) {
  Directions__inherits(Directions, _Component);

  function Directions() {
    Directions__classCallCheck(this, Directions);

    return Directions__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Directions.prototype.render = function render(_ref) {
    var venue = _ref.venue;

    return Object(preact_min["h"])(
      'a',
      {
        href: venue.google_maps_url ? venue.google_maps_url : 'https://www.google.co.uk/maps/dir//' + venue.address_line_1 + ' ' + venue.postcode,
        target: '_blank',
        className: directions_style_default.a.well,
        style: { borderTop: '1px solid var(--off-white)' }
      },
      Object(preact_min["h"])(
        'div',
        { className: directions_style_default.a.wellIcon },
        Directions__ref2
      ),
      Object(preact_min["h"])(
        'div',
        { className: directions_style_default.a.wellMain },
        Object(preact_min["h"])(
          'div',
          { className: directions_style_default.a.wellName },
          venue.name
        ),
        Object(preact_min["h"])(
          'div',
          { className: directions_style_default.a.wellDescription },
          venue.address_line_1,
          ', ',
          venue.postcode
        )
      ),
      Object(preact_min["h"])(
        'div',
        { className: directions_style_default.a.wellAction },
        Directions__ref3
      )
    );
  };

  return Directions;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./components/loading/style.scss
var loading_style = __webpack_require__("GNQB");
var loading_style_default = /*#__PURE__*/__webpack_require__.n(loading_style);

// CONCATENATED MODULE: ./components/loading/Loading.js


function Loading__objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function Loading__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Loading__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Loading__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Loading__ref3 = Object(preact_min["h"])('div', null);

var Loading__ref4 = Object(preact_min["h"])('div', null);

var Loading__ref5 = Object(preact_min["h"])('div', null);

var Loading__ref6 = Object(preact_min["h"])('div', null);

var Loading_Loading = function (_Component) {
  Loading__inherits(Loading, _Component);

  function Loading() {
    Loading__classCallCheck(this, Loading);

    return Loading__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Loading.prototype.render = function render(_ref, _ref2) {
    Loading__objectDestructuringEmpty(_ref2);

    Loading__objectDestructuringEmpty(_ref);

    return Object(preact_min["h"])(
      'div',
      { 'class': loading_style_default.a.ldsRing },
      Loading__ref3,
      Loading__ref4,
      Loading__ref5,
      Loading__ref6
    );
  };

  return Loading;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/paymentsuccess/PaymentSuccess.js
var PaymentSuccess__class, PaymentSuccess__temp;



function PaymentSuccess__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PaymentSuccess__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function PaymentSuccess__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var PaymentSuccess__ref2 = Object(preact_min["h"])('div', { className: 'leftArrow' });

var PaymentSuccess__ref3 = Object(preact_min["h"])('div', { className: 'hr' });

var PaymentSuccess_PaymentSuccess = (PaymentSuccess__temp = PaymentSuccess__class = function (_Component) {
  PaymentSuccess__inherits(PaymentSuccess, _Component);

  function PaymentSuccess(props) {
    PaymentSuccess__classCallCheck(this, PaymentSuccess);

    var _this = PaymentSuccess__possibleConstructorReturn(this, _Component.call(this, props));

    _this.formatDay = function (day) {
      return '' + dayToDayString[day][0].toUpperCase() + dayToDayString[day].substr(1).toLowerCase();
    };

    _this.mainCategory = function (categories) {
      if (categories.length === 0) return 'Dance';
      var cat = categories[0].name;
      return '' + cat[0].toUpperCase() + cat.substr(1).toLowerCase();
    };

    _this.state = {};
    return _this;
  }

  PaymentSuccess.prototype.render = function render(_ref) {
    var _classNames;

    var booking = _ref.booking,
        show = _ref.show,
        onClose = _ref.onClose;
    var item = booking.class_attended;

    return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(
        'div',
        {
          className: utils_classNames((_classNames = {}, _classNames[paymentsuccess_style_default.a.paymentSuccessWrapper] = true, _classNames[paymentsuccess_style_default.a.close] = !show, _classNames))
        },
        Object(preact_min["h"])(
          'div',
          { className: paymentsuccess_style_default.a.paymentSuccessMain },
          Object(preact_min["h"])(
            'div',
            { className: paymentsuccess_style_default.a.paymentSuccessHeader },
            Object(preact_min["h"])('div', {
              className: 'leftArrow ' + paymentsuccess_style_default.a.back,
              onClick: this.props.onClose
            }),
            Object(preact_min["h"])(
              'div',
              { className: paymentsuccess_style_default.a.title },
              'Booking confirmed'
            ),
            Object(preact_min["h"])('div', { style: { width: '1rem', height: '1rem' } })
          ),
          Object(preact_min["h"])(
            'div',
            { className: paymentsuccess_style_default.a.classHero },
            Object(preact_min["h"])(
              'div',
              { className: paymentsuccess_style_default.a.heroImage },
              Object(preact_min["h"])('img', {
                src: item.hero_image_url || '/assets/images/class.jpeg',
                alt: item.title
              }),
              Object(preact_min["h"])(
                'a',
                { onClick: onClose, href: '/search', className: '' + paymentsuccess_style_default.a.back },
                PaymentSuccess__ref2
              ),
              Object(preact_min["h"])('div', { className: paymentsuccess_style_default.a.shader }),
              Object(preact_min["h"])(
                'div',
                { className: paymentsuccess_style_default.a.label },
                'Let\'s do some',
                Object(preact_min["h"])(
                  'div',
                  { className: paymentsuccess_style_default.a.title },
                  this.mainCategory(item.categories)
                )
              )
            )
          ),
          Object(preact_min["h"])(
            'div',
            { className: paymentsuccess_style_default.a.main },
            Object(preact_min["h"])(Directions_Directions, { venue: item.venue }),
            Object(preact_min["h"])(
              'div',
              { className: paymentsuccess_style_default.a.mainTitle },
              item.title
            ),
            Object(preact_min["h"])(
              'div',
              { className: paymentsuccess_style_default.a.timeLabel },
              this.formatDay(item.day),
              ' ',
              item.start_time,
              ' - ',
              item.end_time
            ),
            Object(preact_min["h"])(
              'div',
              { className: paymentsuccess_style_default.a.address },
              item.venue.name,
              ' ',
              item.venue.area
            ),
            PaymentSuccess__ref3,
            Object(preact_min["h"])(
              'div',
              { className: paymentsuccess_style_default.a.bookingCodeContainer },
              Object(preact_min["h"])(
                'div',
                { className: paymentsuccess_style_default.a.bookingReceived },
                'I didn\'t receive the confirmation message.'
              ),
              Object(preact_min["h"])(
                'div',
                { className: paymentsuccess_style_default.a.bookingCode },
                'Booking ID: ',
                Object(preact_min["h"])(
                  'strong',
                  null,
                  booking.code
                )
              )
            )
          )
        )
      )
    );
  };

  return PaymentSuccess;
}(preact_min["Component"]), PaymentSuccess__class.defaultProps = {
  booking: {
    id: 34,
    code: 'GAKWL3',
    venue: {
      id: 1,
      name: 'Pineapple Studios',
      address_line_1: '7 Langley Street',
      area: 'Covent Gardem',
      postcode: 'WC2H 9JA'
    },
    class_attended: {
      id: 5,
      venue: {
        id: 1,
        name: 'Pineapple Studios',
        address_line_1: '7 Langley Street',
        area: 'Covent Gardem',
        postcode: 'WC2H 9JA'
      },
      day: 5,
      price: 13,
      start_time: '09:06',
      end_time: '11:00',
      title: 'Salsa',
      instructors: [{
        id: 3,
        profile: {
          bio: 'This is my bio. I am a great teacher.',
          instagram_url: '',
          facebook_url: '',
          youtube_url: '',
          website_url: ''
        },
        full_name: 'New Teacher Surname',
        name: 'New Teacher Surname',
        email: 'adf@gmail.com',
        phone_number: '07476996601',
        is_student: false,
        is_teacher: true
      }],
      categories: [{
        id: 7,
        name: 'Salsa'
      }]
    },
    start_time: '09:06',
    end_time: '11:00',
    created: '2019-09-15T11:37:26.985220Z',
    modified: '2019-09-15T11:37:26.985328Z'
  }
}, PaymentSuccess__temp);

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

var Payment__ref4 = Object(preact_min["h"])('div', { className: 'hr' });

var Payment__ref5 = Object(preact_min["h"])('div', { className: 'hr' });

var Payment__ref6 = Object(preact_min["h"])('div', { className: 'hr' });

var Payment__ref7 = Object(preact_min["h"])('div', { className: 'tick' });

var Payment__ref8 = Object(preact_min["h"])('div', { className: 'bottom' });

var _ref9 = Object(preact_min["h"])(Loading_Loading, null);

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
        }, function () {
          var errors = _this.validateValues();
          var error = errors.phone_number;
          if (errors.phone_number) return _this.setState({ errors: errors, error: error });
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
      var rest = split[0];
      if (split.length > 1) {
        rest = split[1];
        if (split.length > 2) {
          return { phone_number: 'Phone number must have only one "+"' };
        }
      }
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
        _this.setState({ isSubmitting: true });
        _this.setState({ errors: {}, error: false });

        errors = _this.validateValues();
        error = errors.phone_number;
        if (errors.phone_number) return $return(_this.setState({ isSubmitting: false, errors: errors, error: error }));

        if (!_this.state.paymentMethod) {
          return Promise.resolve(_this.stripeSubmit(e)).then(function ($await_2) {
            try {
              _res = $await_2;
              if (_res.error) {
                return $return(_this.setState({ isSubmitting: false, error: _res.error.message }));
              }
              _this.setState({ paymentMethod: _res.paymentMethod });
              return $If_1.call(this);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }.bind(this), $error);
        }

        function $If_1() {
          data = Payment__extends({
            payment_method_id: _this.state.paymentMethod.id,
            date: _this.state.date.format('YYYY-MM-DD'),
            start_time: _this.props.item.start_time,
            end_time: _this.props.item.end_time,
            class_attended: _this.props.item.id,
            venue: _this.props.item.venue.id,
            email: _this.state.values.phone_number + '@example.com'
          }, _this.state.values);
          return Promise.resolve(_this.postBooking(data)).then(function ($await_3) {
            try {
              res = $await_3;
              if (res.error) {
                return $return(_this.setState({
                  isSubmitting: false,
                  error: res.error.message || 'Issue making booking'
                }));
              }
              return $return(_this.setState({ isSubmitting: false, success: true, booking: res }));
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
        return Promise.resolve(fetch(BASE_URL + '/api/bookings/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })).then(function ($await_4) {
          try {
            res = $await_4;
            return $return(res.json());
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      });
    };

    _this.state = {
      success: false,
      formIsValid: false,
      paymentMethod: null,
      errors: {},
      values: {}
    };
    return _this;
  }

  Payment.prototype.componentDidMount = function componentDidMount() {
    this.setState({ date: dayjs_min_default()() });
  };

  Payment.prototype.render = function render(_ref, _ref2) {
    var _classNames,
        _this2 = this;

    var item = _ref.item,
        show = _ref.show,
        onClose = _ref.onClose;
    var error = _ref2.error,
        values = _ref2.values,
        booking = _ref2.booking,
        isSubmitting = _ref2.isSubmitting,
        paymentMethod = _ref2.paymentMethod,
        success = _ref2.success;

    if (!item) return Payment__ref3;
    if (success) return Object(preact_min["h"])(PaymentSuccess_PaymentSuccess, {
      onClose: onClose,
      show: show && success,
      booking: booking
    });
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
              onClick: onClose
            }),
            Object(preact_min["h"])(
              'div',
              { className: payment_style_default.a.title },
              'Checkout'
            ),
            Object(preact_min["h"])('div', { style: { width: '1rem', height: '1rem' } })
          ),
          Payment__ref4,
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
          Payment__ref5,
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
                'Payment'
              )
            ),
            Object(preact_min["h"])(
              'div',
              { className: 'errorContainer ' + (error || 'hide') },
              Object(preact_min["h"])(
                'div',
                { className: 'errorContainer_message' },
                error
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
              Object(preact_min["h"])(
                'div',
                {
                  key: 'paid',
                  style: {
                    margin: paymentMethod ? '1rem 0' : 0,
                    height: paymentMethod ? 'auto' : 0
                  }
                },
                Payment__ref7,
                ' Paid!'
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
          Object(preact_min["h"])(
            'div',
            null,
            isSubmitting ? _ref9 : 'Confirm booking'
          )
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

var ClassDetail__ref5 = Object(preact_min["h"])('div', { className: 'rightArrow' });

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
      showPayment: false
    };
    return _this;
  }

  ClassDetail.prototype.componentDidMount = function componentDidMount() {
    return new Promise(function ($return, $error) {
      var res;
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
    var day = dayToDayString[item.day] && dayToDayString[item.day].toUpperCase();
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
              day,
              ' ',
              item.start_time,
              ' - ',
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
          Object(preact_min["h"])(Directions_Directions, { venue: item.venue }),
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
              ClassDetail__ref5
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
  return new Promise(function ($return, $error) {
    var _classes, id, res, response;

    id = _ref.id;
    return Promise.resolve(fetch('https://instructorlist-django.herokuapp.com/api/classes/' + id)).then(function ($await_1) {
      try {
        res = $await_1;
        return Promise.resolve(res.json()).then(function ($await_2) {
          try {
            response = $await_2;
            return $return({
              classes: (_classes = {}, _classes[id] = response, _classes)
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


// CONCATENATED MODULE: ./components/redirect/Redirect.js
function Redirect__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Redirect__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Redirect__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Redirect_Redirect = function (_Component) {
  Redirect__inherits(Redirect, _Component);

  function Redirect() {
    Redirect__classCallCheck(this, Redirect);

    return Redirect__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Redirect.prototype.componentWillMount = function componentWillMount() {
    Object(preact_router_es["route"])(this.props.to, true);
  };

  Redirect.prototype.render = function render() {
    return null;
  };

  return Redirect;
}(preact_min["Component"]);


// EXTERNAL MODULE: ../node_modules/preact-compat/dist/preact-compat.es.js + 3 modules
var preact_compat_es = __webpack_require__("eW0v");

// EXTERNAL MODULE: ../node_modules/styled-components/dist/styled-components.esm.js
var styled_components_esm = __webpack_require__("Eaxy");

// CONCATENATED MODULE: ../node_modules/styled-components-breakpoint/dist/esm/core.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _templateObject = _taggedTemplateLiteral(['@media (', ': ', 'em) {\n      ', '\n    }'], ['@media (', ': ', 'em) {\n      ', '\n    }']),
    _templateObject2 = _taggedTemplateLiteral(['@media (min-width: ', 'em) and (max-width: ', 'em) {\n      ', '\n    }'], ['@media (min-width: ', 'em) and (max-width: ', 'em) {\n      ', '\n    }']);

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

/* global process */


// eslint-disable-line no-undef

function convertPxToEm(pixels) {
  // @media is always calculated off 16px regardless of whether the root font size is the default or not
  return pixels / 16;
}

function getValueFromName(breakpoints, name) {
  var value = breakpoints[name];
  if (false) {
    console.error('A breakpoint named "' + name + '" does not exist.'); // eslint-disable-line no-console
    return 0;
  }
  return value;
}

function withSingleCriteria(breakpoints, name, operator) {
  var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var value = getValueFromName(breakpoints, name);

  // special case for 0 to avoid wrapping styles in an unnecessary @media block
  // FIXME: typings
  // if (operator === 'max-width' && value === 0) {
  //   return () => '';
  // }

  // special case for 0 to avoid wrapping styles in an unnecessary @media block
  if (operator === 'min-width' && value === 0) {
    return function (strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      return styled_components_esm["b" /* css */].apply(undefined, [strings].concat(_toConsumableArray(interpolations)));
    };
  }

  return function (strings) {
    for (var _len2 = arguments.length, interpolations = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      interpolations[_key2 - 1] = arguments[_key2];
    }

    return Object(styled_components_esm["b" /* css */])(_templateObject, operator, convertPxToEm(value + offset), styled_components_esm["b" /* css */].apply(undefined, [strings].concat(_toConsumableArray(interpolations))));
  };
}

function _gt(breakpoints, name) {
  return withSingleCriteria(breakpoints, name, 'min-width', +1);
}

function _gte(breakpoints, name) {
  return withSingleCriteria(breakpoints, name, 'min-width');
}

function _lt(breakpoints, name) {
  return withSingleCriteria(breakpoints, name, 'max-width', -1);
}

function _lte(breakpoints, name) {
  return withSingleCriteria(breakpoints, name, 'max-width');
}

function _between(breakpoints, gte, lt) {
  var gteValue = getValueFromName(breakpoints, gte);
  var ltValue = getValueFromName(breakpoints, lt);
  return function (strings) {
    for (var _len3 = arguments.length, interpolations = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      interpolations[_key3 - 1] = arguments[_key3];
    }

    return Object(styled_components_esm["b" /* css */])(_templateObject2, convertPxToEm(gteValue), convertPxToEm(ltValue - 1), styled_components_esm["b" /* css */].apply(undefined, [strings].concat(_toConsumableArray(interpolations))));
  };
}

function _breakpoint(breakpoints, gte, lt) {
  if (typeof lt === 'undefined') {
    return _gte(breakpoints, gte);
  } else {
    return _between(breakpoints, gte, lt);
  }
};

// TODO: allow the operator to be customised
function _map(breakpoints, value, mapValueToCSS) {
  var values = value;

  if (values === null || (typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== 'object') {
    return mapValueToCSS(values);
  }

  return [
  // eslint-disable-next-line no-undefined
  mapValueToCSS(undefined)].concat(_toConsumableArray(Object.keys(values).map(function (name) {
    var tag = _gte(breakpoints, name);
    var val = values[name];
    var styles = tag([], [].concat(mapValueToCSS(val)));
    return styles;
  })));
};
// CONCATENATED MODULE: ../node_modules/styled-components-breakpoint/dist/esm/index.js
function esm__toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}



var defaultBreakpoints = {
  mobile: 0, // targeting all devices
  tablet: 737, // targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode)
  desktop: 1025 // targeting devices that are LARGER than the iPad (which is 1024px in landscape mode)
};

function esm_breakpoint(gte, lt) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    return function (_ref) {
      var _ref$theme = _ref.theme,
          theme = _ref$theme === undefined ? {} : _ref$theme;

      return _breakpoint(theme.breakpoints || defaultBreakpoints, gte, lt).apply(undefined, [strings].concat(esm__toConsumableArray(interpolations)));
    };
  };
}

function esm_map(value, mapValueToCSS) {
  return function (_ref2) {
    var _ref2$theme = _ref2.theme,
        theme = _ref2$theme === undefined ? {} : _ref2$theme;

    return _map(theme.breakpoints || defaultBreakpoints, value, mapValueToCSS);
  };
}

function createStatic() {
  var breakpoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultBreakpoints;

  return Object.keys(breakpoints).reduce(function (accum, name) {
    accum[name] = _breakpoint(breakpoints, name);
    return accum;
  }, {
    breakpoint: function breakpoint(gte, lt) {
      return _breakpoint(breakpoints, gte, lt);
    },
    map: function map(value, mapValueToCSS) {
      return _map(breakpoints, value, mapValueToCSS);
    }
  });
}

/* harmony default export */ var esm = (esm_breakpoint);
// CONCATENATED MODULE: ./landing-page/components/globalStyles/styles.js
var styles__templateObject = _taggedTemplateLiteralLoose(["\n\n  font-size: 30px;\n  line-height: 1.3;\n  font-weight: 900;\n  color: ", ";\n  ", ";\n"], ["\n\n  font-size: 30px;\n  line-height: 1.3;\n  font-weight: 900;\n  color: ", ";\n  ", ";\n"]),
    styles__templateObject2 = _taggedTemplateLiteralLoose(["\n      font-size: 45px;\n  "], ["\n      font-size: 45px;\n  "]),
    _templateObject3 = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]),
    _templateObject4 = _taggedTemplateLiteralLoose(["\n  display: none;\n  ", ";\n"], ["\n  display: none;\n  ", ";\n"]),
    _templateObject5 = _taggedTemplateLiteralLoose(["\n      display: flex;\n      align-items: center;\n      justify-content: center;\n  "], ["\n      display: flex;\n      align-items: center;\n      justify-content: center;\n  "]),
    _templateObject6 = _taggedTemplateLiteralLoose(["\n  margin-left: 15px;\n  margin-right: 15px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n"], ["\n  margin-left: 15px;\n  margin-right: 15px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n"]),
    _templateObject7 = _taggedTemplateLiteralLoose(["\n\n  font-weight: ", ";\n  text-transform: ", ";\n  letter-spacing: ", ";\n  font-size: ", ";\n  line-height: 1.5;\n  color: ", ";\n  margin-right: ", ";\n"], ["\n\n  font-weight: ", ";\n  text-transform: ", ";\n  letter-spacing: ", ";\n  font-size: ", ";\n  line-height: 1.5;\n  color: ", ";\n  margin-right: ", ";\n"]),
    _templateObject8 = _taggedTemplateLiteralLoose(["\n  padding-bottom: 2rem;\n  margin-top: 5rem;\n  padding-top: ", ";\n  ", ";\n"], ["\n  padding-bottom: 2rem;\n  margin-top: 5rem;\n  padding-top: ", ";\n  ", ";\n"]),
    _templateObject9 = _taggedTemplateLiteralLoose(["\n      margin-top: ", ";\n      padding-bottom: ", ";\n  "], ["\n      margin-top: ", ";\n      padding-bottom: ", ";\n  "]),
    _templateObject10 = _taggedTemplateLiteralLoose(["\n  padding-bottom: 4rem;\n  padding-top: 8rem;\n"], ["\n  padding-bottom: 4rem;\n  padding-top: 8rem;\n"]),
    _templateObject11 = _taggedTemplateLiteralLoose(["\n  color: ", ";\n"], ["\n  color: ", ";\n"]);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }




var SectionHeader = styled_components_esm["c" /* default */].h1(styles__templateObject, function (props) {
  return props.secundary ? "white" : "black";
}, esm("lg")(styles__templateObject2));

var Span = styled_components_esm["c" /* default */].span(_templateObject3);

var LogoSpan = styled_components_esm["c" /* default */].span(_templateObject4, esm("sm")(_templateObject5));

var PaddingContainer = styled_components_esm["c" /* default */].div(_templateObject6);

var StyledText = styled_components_esm["c" /* default */].p(_templateObject7, function (props) {
  return props.secundary ? "600" : "300";
}, function (props) {
  return props.uppercase ? "uppercase" : "";
}, function (props) {
  return props.spacing ? "1.49px" : "0.8px";
}, function (props) {
  return props.margin ? "14px" : "16px";
}, function (props) {
  return props.secundary ? "white" : "black";
}, function (props) {
  return props.margin ? "10px" : "0";
});

var SectionMargin = styled_components_esm["c" /* default */].div(_templateObject8, function (props) {
  return props.footer ? "6rem" : "0";
}, esm("md")(_templateObject9, function (props) {
  return props.margin ? "10rem" : "5rem";
}, function (props) {
  return props.footer ? "2rem" : "5rem";
}));

var SectionMarginTop = styled_components_esm["c" /* default */].div(_templateObject10);

var StyledSpan = styled_components_esm["c" /* default */].span(_templateObject11, function (props) {
  return props.theme.accent;
});
// EXTERNAL MODULE: ../node_modules/prop-types/index.js
var prop_types = __webpack_require__("5D9O");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./landing-page/components/seo.js
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */



// import Helmet from 'react-helmet'

function SEO(_ref) {
  var description = _ref.description,
      lang = _ref.lang,
      meta = _ref.meta,
      keywords = _ref.keywords,
      title = _ref.title;
  var _ref2 = {},
      site = _ref2.site;


  return null;
  // return (
  //   <Helmet
  //     htmlAttributes={{
  //       lang,
  //     }}
  //     title={title}
  //     titleTemplate={`%s | ${site.siteMetadata.title}`}
  //     meta={[
  //       {
  //         name: `description`,
  //         content: metaDescription,
  //       },
  //       {
  //         property: `og:title`,
  //         content: title,
  //       },
  //       {
  //         property: `og:description`,
  //         content: metaDescription,
  //       },
  //       {
  //         property: `og:type`,
  //         content: `website`,
  //       },
  //       {
  //         name: `twitter:card`,
  //         content: `summary`,
  //       },
  //       {
  //         name: `twitter:creator`,
  //         content: site.siteMetadata.author,
  //       },
  //       {
  //         name: `twitter:title`,
  //         content: title,
  //       },
  //       {
  //         name: `twitter:description`,
  //         content: metaDescription,
  //       },
  //     ]
  //       .concat(
  //         keywords.length > 0
  //           ? {
  //               name: `keywords`,
  //               content: keywords.join(`, `),
  //             }
  //           : [],
  //       )
  //       .concat(meta)}
  //   />
  // )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  description: ''
};

SEO.propTypes = {
  description: prop_types_default.a.string,
  lang: prop_types_default.a.string,
  meta: prop_types_default.a.arrayOf(prop_types_default.a.object),
  keywords: prop_types_default.a.arrayOf(prop_types_default.a.string),
  title: prop_types_default.a.string.isRequired
};

/* harmony default export */ var seo = (SEO);
// EXTERNAL MODULE: ../node_modules/object-assign/index.js
var object_assign = __webpack_require__("J4Nk");
var object_assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ../node_modules/@styled-system/core/dist/index.esm.js

var index_esm_merge = function merge(a, b) {
  var result = object_assign_default()({}, a, b);

  for (var key in a) {
    var _assign;

    if (!a[key] || typeof b[key] !== 'object') continue;
    object_assign_default()(result, (_assign = {}, _assign[key] = object_assign_default()(a[key], b[key]), _assign));
  }

  return result;
}; // sort object-value responsive styles

var sort = function sort(obj) {
  var next = {};
  Object.keys(obj).sort(function (a, b) {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  }).forEach(function (key) {
    next[key] = obj[key];
  });
  return next;
};

var defaults = {
  breakpoints: [40, 52, 64].map(function (n) {
    return n + 'em';
  })
};

var createMediaQuery = function createMediaQuery(n) {
  return "@media screen and (min-width: " + n + ")";
};

var getValue = function getValue(n, scale) {
  return get(scale, n, n);
};

var get = function get(obj, key, def, p, undef) {
  key = key && key.split ? key.split('.') : [key];

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }

  return obj === undef ? def : obj;
};
var index_esm_createParser = function createParser(config) {
  var cache = {};

  var parse = function parse(props) {
    var styles = {};
    var shouldSort = false;
    var isCacheDisabled = props.theme && props.theme.disableStyledSystemCache;

    for (var key in props) {
      if (!config[key]) continue;
      var sx = config[key];
      var raw = props[key];
      var scale = get(props.theme, sx.scale, sx.defaults);

      if (typeof raw === 'object') {
        cache.breakpoints = !isCacheDisabled && cache.breakpoints || get(props.theme, 'breakpoints', defaults.breakpoints);

        if (Array.isArray(raw)) {
          cache.media = !isCacheDisabled && cache.media || [null].concat(cache.breakpoints.map(createMediaQuery));
          styles = index_esm_merge(styles, index_esm_parseResponsiveStyle(cache.media, sx, scale, raw, props));
          continue;
        }

        if (raw !== null) {
          styles = index_esm_merge(styles, index_esm_parseResponsiveObject(cache.breakpoints, sx, scale, raw, props));
          shouldSort = true;
        }

        continue;
      }

      object_assign_default()(styles, sx(raw, scale, props));
    } // sort object-based responsive styles


    if (shouldSort) {
      styles = sort(styles);
    }

    return styles;
  };

  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;
  var keys = Object.keys(config).filter(function (k) {
    return k !== 'config';
  });

  if (keys.length > 1) {
    keys.forEach(function (key) {
      var _createParser;

      parse[key] = createParser((_createParser = {}, _createParser[key] = config[key], _createParser));
    });
  }

  return parse;
};

var index_esm_parseResponsiveStyle = function parseResponsiveStyle(mediaQueries, sx, scale, raw, _props) {
  var styles = {};
  raw.slice(0, mediaQueries.length).forEach(function (value, i) {
    var media = mediaQueries[i];
    var style = sx(value, scale, _props);

    if (!media) {
      object_assign_default()(styles, style);
    } else {
      var _assign2;

      object_assign_default()(styles, (_assign2 = {}, _assign2[media] = object_assign_default()({}, styles[media], style), _assign2));
    }
  });
  return styles;
};

var index_esm_parseResponsiveObject = function parseResponsiveObject(breakpoints, sx, scale, raw, _props) {
  var styles = {};

  for (var key in raw) {
    var breakpoint = breakpoints[key];
    var value = raw[key];
    var style = sx(value, scale, _props);

    if (!breakpoint) {
      object_assign_default()(styles, style);
    } else {
      var _assign3;

      var media = createMediaQuery(breakpoint);
      object_assign_default()(styles, (_assign3 = {}, _assign3[media] = object_assign_default()({}, styles[media], style), _assign3));
    }
  }

  return styles;
};

var createStyleFunction = function createStyleFunction(_ref) {
  var properties = _ref.properties,
      property = _ref.property,
      scale = _ref.scale,
      _ref$transform = _ref.transform,
      transform = _ref$transform === void 0 ? getValue : _ref$transform,
      defaultScale = _ref.defaultScale;
  properties = properties || [property];

  var sx = function sx(value, scale, _props) {
    var result = {};
    var n = transform(value, scale, _props);
    if (n === null) return;
    properties.forEach(function (prop) {
      result[prop] = n;
    });
    return result;
  };

  sx.scale = scale;
  sx.defaults = defaultScale;
  return sx;
}; // new v5 API

var system = function system(args) {
  if (args === void 0) {
    args = {};
  }

  var config = {};
  Object.keys(args).forEach(function (key) {
    var conf = args[key];

    if (conf === true) {
      // shortcut definition
      config[key] = createStyleFunction({
        property: key,
        scale: key
      });
      return;
    }

    if (typeof conf === 'function') {
      config[key] = conf;
      return;
    }

    config[key] = createStyleFunction(conf);
  });
  var parser = index_esm_createParser(config);
  return parser;
};
var index_esm_compose = function compose() {
  var config = {};

  for (var _len = arguments.length, parsers = new Array(_len), _key = 0; _key < _len; _key++) {
    parsers[_key] = arguments[_key];
  }

  parsers.forEach(function (parser) {
    if (!parser || !parser.config) return;
    object_assign_default()(config, parser.config);
  });
  var parser = index_esm_createParser(config);
  return parser;
};
// CONCATENATED MODULE: ../node_modules/@styled-system/layout/dist/index.esm.js


var isNumber = function isNumber(n) {
  return typeof n === 'number' && !isNaN(n);
};

var index_esm_getWidth = function getWidth(n, scale) {
  return get(scale, n, !isNumber(n) || n > 1 ? n : n * 100 + '%');
};

var index_esm_config = {
  width: {
    property: 'width',
    scale: 'sizes',
    transform: index_esm_getWidth
  },
  height: {
    property: 'height',
    scale: 'sizes'
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes'
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes'
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes'
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes'
  },
  size: {
    properties: ['width', 'height'],
    scale: 'sizes'
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true
};
var layout = system(index_esm_config);
/* harmony default export */ var index_esm = (layout);
// CONCATENATED MODULE: ../node_modules/@styled-system/color/dist/index.esm.js

var dist_index_esm_config = {
  color: {
    property: 'color',
    scale: 'colors'
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors'
  },
  opacity: true
};
dist_index_esm_config.bg = dist_index_esm_config.backgroundColor;
var color = system(dist_index_esm_config);
/* harmony default export */ var dist_index_esm = (color);
// CONCATENATED MODULE: ../node_modules/@styled-system/typography/dist/index.esm.js

var index_esm_defaults = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72]
};
var typography_dist_index_esm_config = {
  fontFamily: {
    property: 'fontFamily',
    scale: 'fonts'
  },
  fontSize: {
    property: 'fontSize',
    scale: 'fontSizes',
    defaultScale: index_esm_defaults.fontSizes
  },
  fontWeight: {
    property: 'fontWeight',
    scale: 'fontWeights'
  },
  lineHeight: {
    property: 'lineHeight',
    scale: 'lineHeights'
  },
  letterSpacing: {
    property: 'letterSpacing',
    scale: 'letterSpacings'
  },
  textAlign: true,
  fontStyle: true
};
var typography = system(typography_dist_index_esm_config);
/* harmony default export */ var typography_dist_index_esm = (typography);
// CONCATENATED MODULE: ../node_modules/@styled-system/flexbox/dist/index.esm.js

var flexbox_dist_index_esm_config = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  // item
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true
};
var flexbox = system(flexbox_dist_index_esm_config);
/* harmony default export */ var flexbox_dist_index_esm = (flexbox);
// CONCATENATED MODULE: ../node_modules/@styled-system/grid/dist/index.esm.js

var dist_index_esm_defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
};
var grid_dist_index_esm_config = {
  gridGap: {
    property: 'gridGap',
    scale: 'space',
    defaultScale: dist_index_esm_defaults.space
  },
  gridColumnGap: {
    property: 'gridColumnGap',
    scale: 'space',
    defaultScale: dist_index_esm_defaults.space
  },
  gridRowGap: {
    property: 'gridRowGap',
    scale: 'space',
    defaultScale: dist_index_esm_defaults.space
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true
};
var grid = system(grid_dist_index_esm_config);
/* harmony default export */ var grid_dist_index_esm = (grid);
// CONCATENATED MODULE: ../node_modules/@styled-system/border/dist/index.esm.js
var index_esm__config;


var border_dist_index_esm_config = (index_esm__config = {
  border: {
    property: 'border',
    scale: 'borders'
  },
  borderWidth: {
    property: 'borderWidth',
    scale: 'borderWidths'
  },
  borderStyle: {
    property: 'borderStyle',
    scale: 'borderStyles'
  },
  borderColor: {
    property: 'borderColor',
    scale: 'colors'
  },
  borderRadius: {
    property: 'borderRadius',
    scale: 'radii'
  },
  borderTop: {
    property: 'borderTop',
    scale: 'borders'
  },
  borderTopLeftRadius: {
    property: 'borderTopLeftRadius',
    scale: 'radii'
  },
  borderTopRightRadius: {
    property: 'borderTopRightRadius',
    scale: 'radii'
  },
  borderRight: {
    property: 'borderRight',
    scale: 'borders'
  },
  borderBottom: {
    property: 'borderBottom',
    scale: 'borders'
  },
  borderBottomLeftRadius: {
    property: 'borderBottomLeftRadius',
    scale: 'radii'
  },
  borderBottomRightRadius: {
    property: 'borderBottomRightRadius',
    scale: 'radii'
  },
  borderLeft: {
    property: 'borderLeft',
    scale: 'borders'
  },
  borderX: {
    properties: ['borderLeft', 'borderRight'],
    scale: 'borders'
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders'
  },
  borderTopWidth: {
    property: 'borderTopWidth',
    scale: 'borderWidths'
  },
  borderTopColor: {
    property: 'borderTopColor',
    scale: 'colors'
  },
  borderTopStyle: {
    property: 'borderTopStyle',
    scale: 'borderStyles'
  }
}, index_esm__config["borderTopLeftRadius"] = {
  property: 'borderTopLeftRadius',
  scale: 'radii'
}, index_esm__config["borderTopRightRadius"] = {
  property: 'borderTopRightRadius',
  scale: 'radii'
}, index_esm__config.borderBottomWidth = {
  property: 'borderBottomWidth',
  scale: 'borderWidths'
}, index_esm__config.borderBottomColor = {
  property: 'borderBottomColor',
  scale: 'colors'
}, index_esm__config.borderBottomStyle = {
  property: 'borderBottomStyle',
  scale: 'borderStyles'
}, index_esm__config["borderBottomLeftRadius"] = {
  property: 'borderBottomLeftRadius',
  scale: 'radii'
}, index_esm__config["borderBottomRightRadius"] = {
  property: 'borderBottomRightRadius',
  scale: 'radii'
}, index_esm__config.borderLeftWidth = {
  property: 'borderLeftWidth',
  scale: 'borderWidths'
}, index_esm__config.borderLeftColor = {
  property: 'borderLeftColor',
  scale: 'colors'
}, index_esm__config.borderLeftStyle = {
  property: 'borderLeftStyle',
  scale: 'borderStyles'
}, index_esm__config.borderRightWidth = {
  property: 'borderRightWidth',
  scale: 'borderWidths'
}, index_esm__config.borderRightColor = {
  property: 'borderRightColor',
  scale: 'colors'
}, index_esm__config.borderRightStyle = {
  property: 'borderRightStyle',
  scale: 'borderStyles'
}, index_esm__config);
var border = system(border_dist_index_esm_config);
/* harmony default export */ var border_dist_index_esm = (border);
// CONCATENATED MODULE: ../node_modules/@styled-system/background/dist/index.esm.js

var background_dist_index_esm_config = {
  background: true,
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true
};
background_dist_index_esm_config.bgImage = background_dist_index_esm_config.backgroundImage;
background_dist_index_esm_config.bgSize = background_dist_index_esm_config.backgroundSize;
background_dist_index_esm_config.bgPosition = background_dist_index_esm_config.backgroundPosition;
background_dist_index_esm_config.bgRepeat = background_dist_index_esm_config.backgroundRepeat;
var background = system(background_dist_index_esm_config);
/* harmony default export */ var background_dist_index_esm = (background);
// CONCATENATED MODULE: ../node_modules/@styled-system/position/dist/index.esm.js

var position_dist_index_esm_defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
};
var position_dist_index_esm_config = {
  position: true,
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices'
  },
  top: {
    property: 'top',
    scale: 'space',
    defaultScale: position_dist_index_esm_defaults.space
  },
  right: {
    property: 'right',
    scale: 'space',
    defaultScale: position_dist_index_esm_defaults.space
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
    defaultScale: position_dist_index_esm_defaults.space
  },
  left: {
    property: 'left',
    scale: 'space',
    defaultScale: position_dist_index_esm_defaults.space
  }
};
var position = system(position_dist_index_esm_config);
/* harmony default export */ var position_dist_index_esm = (position);
// CONCATENATED MODULE: ../node_modules/@styled-system/space/dist/index.esm.js

var space_dist_index_esm_defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
};

var index_esm_isNumber = function isNumber(n) {
  return typeof n === 'number' && !isNaN(n);
};

var index_esm_getMargin = function getMargin(n, scale) {
  if (!index_esm_isNumber(n)) {
    return get(scale, n, n);
  }

  var isNegative = n < 0;
  var absolute = Math.abs(n);
  var value = get(scale, absolute, absolute);

  if (!index_esm_isNumber(value)) {
    return isNegative ? '-' + value : value;
  }

  return value * (isNegative ? -1 : 1);
};

var configs = {};
configs.margin = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: index_esm_getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transform: index_esm_getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transform: index_esm_getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: index_esm_getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transform: index_esm_getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transform: index_esm_getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transform: index_esm_getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  }
};
configs.margin.m = configs.margin.margin;
configs.margin.mt = configs.margin.marginTop;
configs.margin.mr = configs.margin.marginRight;
configs.margin.mb = configs.margin.marginBottom;
configs.margin.ml = configs.margin.marginLeft;
configs.margin.mx = configs.margin.marginX;
configs.margin.my = configs.margin.marginY;
configs.padding = {
  padding: {
    property: 'padding',
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  }
};
configs.padding.p = configs.padding.padding;
configs.padding.pt = configs.padding.paddingTop;
configs.padding.pr = configs.padding.paddingRight;
configs.padding.pb = configs.padding.paddingBottom;
configs.padding.pl = configs.padding.paddingLeft;
configs.padding.px = configs.padding.paddingX;
configs.padding.py = configs.padding.paddingY;
var margin = system(configs.margin);
var padding = system(configs.padding);
var space = index_esm_compose(margin, padding);
/* harmony default export */ var space_dist_index_esm = (space);
// CONCATENATED MODULE: ../node_modules/@styled-system/shadow/dist/index.esm.js

var shadow = system({
  boxShadow: {
    property: 'boxShadow',
    scale: 'shadows'
  },
  textShadow: {
    property: 'textShadow',
    scale: 'shadows'
  }
});
/* harmony default export */ var shadow_dist_index_esm = (shadow);
// CONCATENATED MODULE: ../node_modules/@styled-system/css/dist/index.esm.js
var _scales;

function index_esm__extends() {
  index_esm__extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };return index_esm__extends.apply(this, arguments);
}

// based on https://github.com/developit/dlv
var index_esm_get = function get(obj, key, def, p, undef) {
  key = key && key.split ? key.split('.') : [key];

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }

  return obj === undef ? def : obj;
};
var index_esm_defaultBreakpoints = [40, 52, 64].map(function (n) {
  return n + 'em';
});
var defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72]
};
var aliases = {
  bg: 'backgroundColor',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY'
};
var multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height']
};
var scales = (_scales = {
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles'
}, _scales["borderTopLeftRadius"] = 'radii', _scales["borderTopRightRadius"] = 'radii', _scales.borderBottomWidth = 'borderWidths', _scales.borderBottomColor = 'colors', _scales.borderBottomStyle = 'borderStyles', _scales["borderBottomLeftRadius"] = 'radii', _scales["borderBottomRightRadius"] = 'radii', _scales.borderLeftWidth = 'borderWidths', _scales.borderLeftColor = 'colors', _scales.borderLeftStyle = 'borderStyles', _scales.borderRightWidth = 'borderWidths', _scales.borderRightColor = 'colors', _scales.borderRightStyle = 'borderStyles', _scales.boxShadow = 'shadows', _scales.textShadow = 'shadows', _scales.zIndex = 'zIndices', _scales.width = 'sizes', _scales.minWidth = 'sizes', _scales.maxWidth = 'sizes', _scales.height = 'sizes', _scales.minHeight = 'sizes', _scales.maxHeight = 'sizes', _scales.flexBasis = 'sizes', _scales.size = 'sizes', _scales.fill = 'colors', _scales.stroke = 'colors', _scales);

var positiveOrNegative = function positiveOrNegative(scale, value) {
  if (typeof value !== 'number' || value >= 0) {
    return index_esm_get(scale, value, value);
  }

  var absolute = Math.abs(value);
  var n = index_esm_get(scale, absolute, absolute);
  if (typeof n === 'string') return '-' + n;
  return n * -1;
};

var transforms = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'top', 'bottom', 'left', 'right'].reduce(function (acc, curr) {
  var _extends2;

  return index_esm__extends({}, acc, (_extends2 = {}, _extends2[curr] = positiveOrNegative, _extends2));
}, {});
var responsive = function responsive(styles) {
  return function (theme) {
    var next = {};
    var breakpoints = index_esm_get(theme, 'breakpoints', index_esm_defaultBreakpoints);
    var mediaQueries = [null].concat(breakpoints.map(function (n) {
      return "@media screen and (min-width: " + n + ")";
    }));

    for (var key in styles) {
      var value = typeof styles[key] === 'function' ? styles[key](theme) : styles[key];
      if (value == null) continue;

      if (!Array.isArray(value)) {
        next[key] = value;
        continue;
      }

      for (var i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
        var media = mediaQueries[i];
        if (value[i] == null) continue;

        if (!media) {
          next[key] = value[i];
          continue;
        }

        next[media] = next[media] || {};
        next[media][key] = value[i];
      }
    }

    return next;
  };
};
var css = function css(args) {
  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = index_esm__extends({}, defaultTheme, {}, props.theme || props);

    var result = {};
    var obj = typeof args === 'function' ? args(theme) : args;
    var styles = responsive(obj)(theme);

    for (var key in styles) {
      var x = styles[key];
      var val = typeof x === 'function' ? x(theme) : x;

      if (key === 'variant') {
        var variant = css(index_esm_get(theme, val))(theme);
        result = index_esm__extends({}, result, {}, variant);
        continue;
      }

      if (val && typeof val === 'object') {
        result[key] = css(val)(theme);
        continue;
      }

      var prop = index_esm_get(aliases, key, key);
      var scaleName = index_esm_get(scales, prop);
      var scale = index_esm_get(theme, scaleName, index_esm_get(theme, prop, {}));
      var transform = index_esm_get(transforms, prop, index_esm_get);
      var value = transform(scale, val, val);

      if (multiples[prop]) {
        var dirs = multiples[prop];

        for (var i = 0; i < dirs.length; i++) {
          result[dirs[i]] = value;
        }
      } else {
        result[prop] = value;
      }
    }

    return result;
  };
};
/* harmony default export */ var css_dist_index_esm = (css);
// CONCATENATED MODULE: ../node_modules/@styled-system/variant/dist/index.esm.js


var index_esm_variant = function variant(_ref) {
  var _config;

  var scale = _ref.scale,
      _ref$prop = _ref.prop,
      prop = _ref$prop === void 0 ? 'variant' : _ref$prop,
      _ref$variants = _ref.variants,
      variants = _ref$variants === void 0 ? {} : _ref$variants,
      key = _ref.key;
  var sx;

  if (Object.keys(variants).length) {
    sx = function sx(value, scale, props) {
      return css_dist_index_esm(get(scale, value, null))(props.theme);
    };
  } else {
    sx = function sx(value, scale) {
      return get(scale, value, null);
    };
  }

  sx.scale = scale || key;
  sx.defaults = variants;
  var config = (_config = {}, _config[prop] = sx, _config);
  var parser = index_esm_createParser(config);
  return parser;
};
/* harmony default export */ var variant_dist_index_esm = (index_esm_variant);
var buttonStyle = index_esm_variant({
  key: 'buttons'
});
var textStyle = index_esm_variant({
  key: 'textStyles',
  prop: 'textStyle'
});
var colorStyle = index_esm_variant({
  key: 'colorStyles',
  prop: 'colors'
});
// CONCATENATED MODULE: ../node_modules/styled-system/dist/index.esm.js
 // v4 api shims






















var width = index_esm.width,
    height = index_esm.height,
    minWidth = index_esm.minWidth,
    minHeight = index_esm.minHeight,
    maxWidth = index_esm.maxWidth,
    maxHeight = index_esm.maxHeight,
    size = index_esm.size,
    verticalAlign = index_esm.verticalAlign,
    display = index_esm.display,
    overflow = index_esm.overflow,
    overflowX = index_esm.overflowX,
    overflowY = index_esm.overflowY;
var opacity = dist_index_esm.opacity;
var fontSize = typography_dist_index_esm.fontSize,
    fontFamily = typography_dist_index_esm.fontFamily,
    fontWeight = typography_dist_index_esm.fontWeight,
    lineHeight = typography_dist_index_esm.lineHeight,
    textAlign = typography_dist_index_esm.textAlign,
    fontStyle = typography_dist_index_esm.fontStyle,
    letterSpacing = typography_dist_index_esm.letterSpacing;
var alignItems = flexbox_dist_index_esm.alignItems,
    alignContent = flexbox_dist_index_esm.alignContent,
    justifyItems = flexbox_dist_index_esm.justifyItems,
    justifyContent = flexbox_dist_index_esm.justifyContent,
    flexWrap = flexbox_dist_index_esm.flexWrap,
    flexDirection = flexbox_dist_index_esm.flexDirection,
    flex = flexbox_dist_index_esm.flex,
    flexGrow = flexbox_dist_index_esm.flexGrow,
    flexShrink = flexbox_dist_index_esm.flexShrink,
    flexBasis = flexbox_dist_index_esm.flexBasis,
    justifySelf = flexbox_dist_index_esm.justifySelf,
    alignSelf = flexbox_dist_index_esm.alignSelf,
    order = flexbox_dist_index_esm.order;
var gridGap = grid_dist_index_esm.gridGap,
    gridColumnGap = grid_dist_index_esm.gridColumnGap,
    gridRowGap = grid_dist_index_esm.gridRowGap,
    gridColumn = grid_dist_index_esm.gridColumn,
    gridRow = grid_dist_index_esm.gridRow,
    gridAutoFlow = grid_dist_index_esm.gridAutoFlow,
    gridAutoColumns = grid_dist_index_esm.gridAutoColumns,
    gridAutoRows = grid_dist_index_esm.gridAutoRows,
    gridTemplateColumns = grid_dist_index_esm.gridTemplateColumns,
    gridTemplateRows = grid_dist_index_esm.gridTemplateRows,
    gridTemplateAreas = grid_dist_index_esm.gridTemplateAreas,
    gridArea = grid_dist_index_esm.gridArea;
var borderWidth = border_dist_index_esm.borderWidth,
    borderStyle = border_dist_index_esm.borderStyle,
    borderColor = border_dist_index_esm.borderColor,
    borderTop = border_dist_index_esm.borderTop,
    borderRight = border_dist_index_esm.borderRight,
    borderBottom = border_dist_index_esm.borderBottom,
    borderLeft = border_dist_index_esm.borderLeft,
    borderRadius = border_dist_index_esm.borderRadius;
var backgroundImage = background_dist_index_esm.backgroundImage,
    backgroundSize = background_dist_index_esm.backgroundSize,
    backgroundPosition = background_dist_index_esm.backgroundPosition,
    backgroundRepeat = background_dist_index_esm.backgroundRepeat;
var zIndex = position_dist_index_esm.zIndex,
    index_esm_top = position_dist_index_esm.top,
    right = position_dist_index_esm.right,
    bottom = position_dist_index_esm.bottom,
    left = position_dist_index_esm.left;

 // v4 style API shim

var index_esm_style = function style(_ref) {
    var prop = _ref.prop,
        cssProperty = _ref.cssProperty,
        alias = _ref.alias,
        key = _ref.key,
        transformValue = _ref.transformValue,
        scale = _ref.scale,
        properties = _ref.properties;
    var config = {};
    config[prop] = createStyleFunction({
        properties: properties,
        property: cssProperty || prop,
        scale: key,
        defaultScale: scale,
        transform: transformValue
    });
    if (alias) config[alias] = config[prop];
    var parse = index_esm_createParser(config);
    return parse;
};
// CONCATENATED MODULE: ./landing-page/components/grid/index.js
var grid__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var grid__templateObject = grid__taggedTemplateLiteralLoose([""], [""]),
    grid__templateObject2 = grid__taggedTemplateLiteralLoose(["\n  background: #fff;\n  border: 1px solid #e1e1e1;\n  border-radius: 3px;\n  margin-bottom: 2rem;\n  padding: 2rem;\n"], ["\n  background: #fff;\n  border: 1px solid #e1e1e1;\n  border-radius: 3px;\n  margin-bottom: 2rem;\n  padding: 2rem;\n"]),
    grid__templateObject3 = grid__taggedTemplateLiteralLoose(["\n  border: 0;\n  border-top: 1px solid #e6e8eb;\n  border-color: #edefed;\n  margin: 2rem 0;\n"], ["\n  border: 0;\n  border-top: 1px solid #e6e8eb;\n  border-color: #edefed;\n  margin: 2rem 0;\n"]);

function grid__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }




var Box = Object(styled_components_esm["c" /* default */])("div")({
  boxSizing: "border-box"
}, space, color, width, fontSize, flex, order, alignSelf, display, function (props) {
  return props.css;
});

Box.displayName = "Box";

Box.propTypes = grid__extends({}, space.propTypes, color.propTypes, width.propTypes, fontSize.propTypes);

var Flex = Object(styled_components_esm["c" /* default */])(Box)({
  display: "flex"
}, flexWrap, flexDirection, alignItems, justifyContent, space);

Flex.displayName = "Flex";

Flex.propTypes = grid__extends({}, flexWrap.propTypes, flexDirection.propTypes, alignItems.propTypes, space.propTypes, justifyContent.propTypes);

var Container = Object(styled_components_esm["c" /* default */])(Box).attrs({
  boxSizing: "border-box",
  width: {
    xs: "100%",
    sm: "100%",
    md: "750px",
    lg: "960px",
    xl: "1200px"
  },
  space: space
})(grid__templateObject);

Container.defaultProps = {
  mx: "auto"
};

var Panel = Object(styled_components_esm["c" /* default */])(Box)(grid__templateObject2);

var Hr = styled_components_esm["c" /* default */].hr(grid__templateObject3);

// Layout engine
var Row = Object(styled_components_esm["c" /* default */])(Flex).attrs({
  mx: -15,
  flexWrap: "wrap",
  space: space
})(grid__templateObject);

var Col = Object(styled_components_esm["c" /* default */])(Box).attrs({
  px: 15,
  display: display
})(grid__templateObject);
// CONCATENATED MODULE: ./landing-page/blocks/navigation/styles.js
var navigation_styles__templateObject = styles__taggedTemplateLiteralLoose(['\n  display: none;\n'], ['\n  display: none;\n']),
    navigation_styles__templateObject2 = styles__taggedTemplateLiteralLoose(['\n  position: fixed;\n  z-index: 99;\n  background-color: white;\n  width: 100%;\n'], ['\n  position: fixed;\n  z-index: 99;\n  background-color: white;\n  width: 100%;\n']),
    styles__templateObject3 = styles__taggedTemplateLiteralLoose(['\n  color: ', ';\n\n  font-size: 35px;\n  letter-spacing: 0.7px;\n  font-weight: bold;\n  text-decoration: none;\n  display: flex;\n  ', ';\n  ', ';\n'], ['\n  color: ', ';\n\n  font-size: 35px;\n  letter-spacing: 0.7px;\n  font-weight: bold;\n  text-decoration: none;\n  display: flex;\n  ', ';\n  ', ';\n']),
    styles__templateObject4 = styles__taggedTemplateLiteralLoose(['\n      font-size: 22px;\n  '], ['\n      font-size: 22px;\n  ']),
    styles__templateObject5 = styles__taggedTemplateLiteralLoose(['\n      font-size: 30px;\n  '], ['\n      font-size: 30px;\n  ']),
    styles__templateObject6 = styles__taggedTemplateLiteralLoose(['\n  color: ', ';\n  background-color: ', ';\n  border: 1px solid ', ';\n  margin-right: ', ';\n  border-radius: 5rem;\n  padding: 0.6rem 1.3rem;\n\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  outline: none;\n  display: ', ';\n  transition: transform 0.3s ease-in-out;\n  ', ';\n  :hover {\n    transform: scale(1.06);\n    cursor: pointer;\n  }\n  a {\n    text-decoration: none;\n    color: ', ';\n  }\n'], ['\n  color: ', ';\n  background-color: ', ';\n  border: 1px solid ', ';\n  margin-right: ', ';\n  border-radius: 5rem;\n  padding: 0.6rem 1.3rem;\n\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  outline: none;\n  display: ', ';\n  transition: transform 0.3s ease-in-out;\n  ', ';\n  :hover {\n    transform: scale(1.06);\n    cursor: pointer;\n  }\n  a {\n    text-decoration: none;\n    color: ', ';\n  }\n']),
    styles__templateObject7 = styles__taggedTemplateLiteralLoose(['\n      display: flex;\n      flex-flow: row;\n      padding: 0.6rem 2.3rem;\n  '], ['\n      display: flex;\n      flex-flow: row;\n      padding: 0.6rem 2.3rem;\n  ']);

function styles__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }





var styles_SectionHeader = styled_components_esm["c" /* default */].h1(navigation_styles__templateObject);

var StickyDiv = styled_components_esm["c" /* default */].div(navigation_styles__templateObject2);

var StyledLink = Object(styled_components_esm["c" /* default */])(match["Link"])(styles__templateObject3, function (props) {
  return props.theme.accent;
}, esm('sm')(styles__templateObject4), esm('md')(styles__templateObject5));

var StyledButton = styled_components_esm["c" /* default */].button(styles__templateObject6, function (props) {
  return props.primary ? '#1848FF' : 'white';
}, function (props) {
  return props.primary ? 'white' : '#1848FF';
}, function (props) {
  return props.primary ? '#1848FF' : 'white';
}, function (props) {
  return props.primary ? '10px' : '15px';
}, function (props) {
  return props.primary ? 'none' : 'flex';
}, esm('sm')(styles__templateObject7), function (props) {
  return props.primary ? '#1848FF' : 'white';
});
// CONCATENATED MODULE: ./landing-page/blocks/navigation/navigation.js









var ColBreakPoints = {
  xs: 1 / 2,
  sm: 3 / 4,
  md: 1 / 2,
  lg: 1 / 2,
  xl: 1 / 2
};

var ColBreakPoints2 = {
  xs: 1 / 2,
  sm: 1 / 4,
  md: 1 / 2,
  lg: 1 / 2,
  xl: 1 / 2
};

var Padding = {
  xs: '20px',
  sm: '20px',
  md: '40px',
  lg: '40px',
  xl: '40px'
};

var navigation__ref = Object(preact_min["h"])(
  styles_SectionHeader,
  null,
  'Navigation'
);

var navigation_Navigation = function Navigation(props) {
  var logo = props.logo,
      primaryButton = props.primaryButton,
      secundaryButton = props.secundaryButton;

  return Object(preact_min["h"])(
    StickyDiv,
    null,
    Object(preact_min["h"])(
      Container,
      null,
      navigation__ref,
      Object(preact_min["h"])(
        PaddingContainer,
        null,
        Object(preact_min["h"])(
          Row,
          { pt: '40px', pb: Padding, justifyContent: 'center' },
          Object(preact_min["h"])(
            Col,
            {
              width: ColBreakPoints2,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex'
            },
            Object(preact_min["h"])(
              StyledLink,
              { to: '/' },
              logo
            )
          ),
          Object(preact_min["h"])(
            Col,
            { width: ColBreakPoints },
            Object(preact_min["h"])(
              Row,
              { justifyContent: 'flex-end' },
              Object(preact_min["h"])(
                StyledButton,
                { primary: true },
                Object(preact_min["h"])(
                  'a',
                  { href: 'mailto:instructors@instructorlist.org?Subject=I\'m%20a%20teacher' },
                  primaryButton
                )
              ),
              Object(preact_min["h"])(
                StyledButton,
                null,
                secundaryButton
              )
            )
          )
        )
      )
    )
  );
};

navigation_Navigation.defaultProps = {
  logo: 'instructorlist',
  primaryButton: 'I&#39;m a teacher',
  secundaryButton: 'Get a free class'
};

/* harmony default export */ var navigation = (navigation_Navigation);
// CONCATENATED MODULE: ./landing-page/components/imageComponents/headerImage.js



/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `StaticQuery`: https://gatsby.dev/staticquery
 */

var headerImage__ref = Object(preact_min["h"])("img", { src: "/assets/images/landing-page/header-image.png" });

var HeaderImage = function HeaderImage() {
  return headerImage__ref;
};
/* harmony default export */ var headerImage = (HeaderImage);
// CONCATENATED MODULE: ./landing-page/blocks/header/styles.js
var header_styles__templateObject = header_styles__taggedTemplateLiteralLoose(["\n  color: ", ";\n  letter-spacing: 1.6px;\n\n  font-size: 14px;\n  font-weight: 600;\n  text-transform: uppercase;\n  /* ", "; */\n"], ["\n  color: ", ";\n  letter-spacing: 1.6px;\n\n  font-size: 14px;\n  font-weight: 600;\n  text-transform: uppercase;\n  /* ", "; */\n"]),
    header_styles__templateObject2 = header_styles__taggedTemplateLiteralLoose(["\n      display: none;\n  "], ["\n      display: none;\n  "]),
    header_styles__templateObject3 = header_styles__taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-left: 10px;\n  width: 95%;\n  ", ";\n  ", ";\n  ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-left: 10px;\n  width: 95%;\n  ", ";\n  ", ";\n  ", ";\n"]),
    header_styles__templateObject4 = header_styles__taggedTemplateLiteralLoose(["\n      flex-direction: column;\n      width: 100%;\n  "], ["\n      flex-direction: column;\n      width: 100%;\n  "]),
    header_styles__templateObject5 = header_styles__taggedTemplateLiteralLoose(["\n      flex-direction: column;\n  "], ["\n      flex-direction: column;\n  "]),
    header_styles__templateObject6 = header_styles__taggedTemplateLiteralLoose(["\n      flex-direction: row;\n      margin-left: -30px;\n  "], ["\n      flex-direction: row;\n      margin-left: -30px;\n  "]),
    header_styles__templateObject7 = header_styles__taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: ", ";\n  border: 1px solid ", ";\n  margin-right: ", ";\n  border-radius: 5rem;\n  padding: 0.6rem 1.3rem;\n\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  ", ";\n  ", ";\n  transition: transform 0.3s ease-in-out;\n  :hover {\n    transform: scale(1.06);\n    cursor: pointer;\n  }\n  a {\n    text-decoration: none;\n    color: ", ";\n  }\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: ", ";\n  border: 1px solid ", ";\n  margin-right: ", ";\n  border-radius: 5rem;\n  padding: 0.6rem 1.3rem;\n\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  ", ";\n  ", ";\n  transition: transform 0.3s ease-in-out;\n  :hover {\n    transform: scale(1.06);\n    cursor: pointer;\n  }\n  a {\n    text-decoration: none;\n    color: ", ";\n  }\n  }\n"]),
    styles__templateObject8 = header_styles__taggedTemplateLiteralLoose(["\n      width: 100%;\n  "], ["\n      width: 100%;\n  "]),
    styles__templateObject9 = header_styles__taggedTemplateLiteralLoose(["\n  color: ", ";\n  background-color: ", ";\n  border: 1px solid ", ";\n  margin-right: ", ";\n  border-radius: 5rem;\n  padding: 0.6rem 1.3rem;\n\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  outline: none;\n  ", ";\n  ", ";\n  transition: transform 0.3s ease-in-out;\n  :hover {\n    transform: scale(1.06);\n    cursor: pointer;\n  }\n"], ["\n  color: ", ";\n  background-color: ", ";\n  border: 1px solid ", ";\n  margin-right: ", ";\n  border-radius: 5rem;\n  padding: 0.6rem 1.3rem;\n\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  outline: none;\n  ", ";\n  ", ";\n  transition: transform 0.3s ease-in-out;\n  :hover {\n    transform: scale(1.06);\n    cursor: pointer;\n  }\n"]),
    styles__templateObject10 = header_styles__taggedTemplateLiteralLoose(["\n      padding: 0.6rem 2.3rem;\n      width: 11rem;\n      margin-top: 0;\n  "], ["\n      padding: 0.6rem 2.3rem;\n      width: 11rem;\n      margin-top: 0;\n  "]),
    styles__templateObject11 = header_styles__taggedTemplateLiteralLoose(["\n      width: 100%;\n      margin-top: 10px;\n  "], ["\n      width: 100%;\n      margin-top: 10px;\n  "]),
    _templateObject12 = header_styles__taggedTemplateLiteralLoose(["\n  border-radius: 5rem;\n  text-align: center;\n  border: 1px solid #cfcdcd;\n  padding: 0.5rem 1rem;\n\n  font-size: 13px;\n  font-weight: 300;\n  letter-spacing: 0.8px;\n  outline: none;\n  margin-right: 0.5rem;\n  ", ";\n  ", ";\n"], ["\n  border-radius: 5rem;\n  text-align: center;\n  border: 1px solid #cfcdcd;\n  padding: 0.5rem 1rem;\n\n  font-size: 13px;\n  font-weight: 300;\n  letter-spacing: 0.8px;\n  outline: none;\n  margin-right: 0.5rem;\n  ", ";\n  ", ";\n"]),
    _templateObject13 = header_styles__taggedTemplateLiteralLoose(["\n      padding: 0.5rem 3rem;\n      width: 16rem;\n      margin-top: 0;\n      text-align: left;\n\n  "], ["\n      padding: 0.5rem 3rem;\n      width: 16rem;\n      margin-top: 0;\n      text-align: left;\n\n  "]),
    _templateObject14 = header_styles__taggedTemplateLiteralLoose([""], [""]);

function header_styles__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }





var StyledAlert = styled_components_esm["c" /* default */].p(header_styles__templateObject, function (props) {
    return props.theme.accent;
}, esm("sm")(header_styles__templateObject2));

var StyledForm = styled_components_esm["c" /* default */].form(header_styles__templateObject3, esm("sm")(header_styles__templateObject4), esm("md")(header_styles__templateObject5), esm("lg")(header_styles__templateObject6));

var StyledDiv = styled_components_esm["c" /* default */].div(header_styles__templateObject7, function (props) {
    return props.primary ? "white" : "#1848FF";
}, function (props) {
    return props.primary ? "#1848FF" : "white";
}, function (props) {
    return props.primary ? "10px" : "0";
}, esm("xs")(styles__templateObject8), esm("sm")(header_styles__templateObject2), function (props) {
    return props.primary ? "#1848FF" : "white";
});

var styles_StyledButton = styled_components_esm["c" /* default */].button(styles__templateObject9, function (props) {
    return props.primary ? "#1848FF" : "white";
}, function (props) {
    return props.primary ? "white" : "#1848FF";
}, function (props) {
    return props.primary ? "#1848FF" : "white";
}, function (props) {
    return props.primary ? "10px" : "0";
}, esm("sm")(styles__templateObject10), esm("xs")(styles__templateObject11));

var StyledInput = styled_components_esm["c" /* default */].input(_templateObject12, esm("xs")(styles__templateObject11), esm("sm")(_templateObject13));

var StyledImage = Object(styled_components_esm["c" /* default */])(headerImage)(_templateObject14);
// CONCATENATED MODULE: ./landing-page/blocks/header/header.js










var header_ColBreakPoints = {
  xs: 1,
  sm: 1,
  md: 1 / 2,
  lg: 1 / 2,
  xl: 1 / 2
};

var header_Padding = {
  xs: "40px",
  sm: "40px",
  md: "0",
  lg: "0",
  xl: "0"
};

var header__ref = Object(preact_min["h"])(
  Col,
  { width: header_ColBreakPoints, order: -2 },
  Object(preact_min["h"])(StyledImage, { scr: "Header-image.png" })
);

var header__ref2 = Object(preact_min["h"])(StyledInput, {
  type: "email",
  id: "mce-EMAIL",
  name: "EMAIL",
  placeholder: "name@email.com"
});

var header__ref3 = Object(preact_min["h"])("input", {
  type: "text",
  name: "b_0e7b5839a8abe9d0d2de31711_f7e48cf5c0",
  value: ""
});

var header__ref4 = Object(preact_min["h"])(
  styles_StyledButton,
  {
    type: "submit",
    value: "Subscribe",
    name: "subscribe",
    id: "id=",
    "mc-embedded-subscribe": true
  },
  "Get a free class"
);

var header__ref5 = Object(preact_min["h"])(
  "a",
  { href: "mailto:instructors@davidalbertoadler.com?Subject=I%20want%20to%20sign%20up%20as%20a%20teacher" },
  Object(preact_min["h"])(
    StyledDiv,
    { primary: true },
    "I'm a teacher"
  )
);

var header_header_Header = function Header(props) {
  var alert = props.alert,
      title = props.title,
      subtext = props.subtext;

  return Object(preact_min["h"])(
    Container,
    null,
    Object(preact_min["h"])(
      SectionMarginTop,
      null,
      Object(preact_min["h"])(
        Row,
        { justifyContent: "space-between", alignItems: "center" },
        header__ref,
        Object(preact_min["h"])(
          Col,
          { width: header_ColBreakPoints, pt: header_Padding },
          Object(preact_min["h"])(
            PaddingContainer,
            null,
            Object(preact_min["h"])(
              StyledAlert,
              null,
              alert
            ),
            Object(preact_min["h"])(
              SectionHeader,
              null,
              title
            ),
            Object(preact_min["h"])(
              StyledText,
              null,
              subtext
            ),
            Object(preact_min["h"])(
              Row,
              null,
              Object(preact_min["h"])(
                StyledForm,
                {
                  action: "https://gmail.us20.list-manage.com/subscribe/post?u=0e7b5839a8abe9d0d2de31711&id=f7e48cf5c0",
                  method: "post",
                  id: "mc-embedded-subscribe-form",
                  name: "mc-embedded-subscribe-form",
                  target: "_blank"
                },
                header__ref2,
                Object(preact_min["h"])(
                  "div",
                  { id: "mce-responses" },
                  Object(preact_min["h"])("div", { id: "mce-error-response", style: { display: "none" } }),
                  Object(preact_min["h"])("div", {
                    id: "mce-success-response",
                    style: { display: "none" }
                  })
                ),
                Object(preact_min["h"])(
                  "div",
                  {
                    style: { position: "absolute", left: "-5000px" },
                    "aria-hidden": "true"
                  },
                  header__ref3
                ),
                header__ref4
              )
            ),
            header__ref5
          )
        )
      )
    )
  );
};

header_header_Header.defaultProps = {
  alert: "We&#39;re launching soon!",
  title: "The Best Dance Teachers Across London.Handpicked.",
  subtext: "Attend hundreds of dance classes from the best teachers across London with a single membership."
};

/* harmony default export */ var header_header = (header_header_Header);
// EXTERNAL MODULE: ./landing-page/images/left.png
var images_left = __webpack_require__("2KQM");
var left_default = /*#__PURE__*/__webpack_require__.n(images_left);

// EXTERNAL MODULE: ./landing-page/images/right.png
var images_right = __webpack_require__("pv+V");
var right_default = /*#__PURE__*/__webpack_require__.n(images_right);

// CONCATENATED MODULE: ./landing-page/blocks/carousel/item/itemStyle.js
var itemStyle__templateObject = itemStyle__taggedTemplateLiteralLoose(["\n  font-weight: 300;\n"], ["\n  font-weight: 300;\n"]),
    itemStyle__templateObject2 = itemStyle__taggedTemplateLiteralLoose(["\n  display: flex;\n  justify-content: space-between;\n  /* width: 100%; */\n  /* RESET WIDTH TO 100% FOR DYNAMIC CAROUSEL */\n  width: 15rem;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  /* width: 100%; */\n  /* RESET WIDTH TO 100% FOR DYNAMIC CAROUSEL */\n  width: 15rem;\n"]),
    itemStyle__templateObject3 = itemStyle__taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-flow: column;\n  /* width: 100%; */\n  /* RESET WIDTH TO 100% FOR DYNAMIC CAROUSEL */\n  width: 15rem;\n"], ["\n  display: flex;\n  flex-flow: column;\n  /* width: 100%; */\n  /* RESET WIDTH TO 100% FOR DYNAMIC CAROUSEL */\n  width: 15rem;\n"]),
    itemStyle__templateObject4 = itemStyle__taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-flow: column;\n  text-align: center;\n  align-items: center;\n  justify-content: center;\n  width: 15rem;\n  height: 15rem;\n  border: 5px dashed white;\n  border-radius: 1rem;\n  padding: 1rem;\n"], ["\n  display: flex;\n  flex-flow: column;\n  text-align: center;\n  align-items: center;\n  justify-content: center;\n  width: 15rem;\n  height: 15rem;\n  border: 5px dashed white;\n  border-radius: 1rem;\n  padding: 1rem;\n"]),
    itemStyle__templateObject5 = itemStyle__taggedTemplateLiteralLoose(["\n  color: white;\n\n  font-size: 24px;\n  font-weight: 500;\n"], ["\n  color: white;\n\n  font-size: 24px;\n  font-weight: 500;\n"]),
    itemStyle__templateObject6 = itemStyle__taggedTemplateLiteralLoose(["\n  font-size: 30px;\n"], ["\n  font-size: 30px;\n"]);

function itemStyle__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }




var ExtraStyledText = Object(styled_components_esm["c" /* default */])(StyledText)(itemStyle__templateObject);

var itemStyle_StyledDiv = styled_components_esm["c" /* default */].div(itemStyle__templateObject2);

var StyledBlock = styled_components_esm["c" /* default */].div(itemStyle__templateObject3);

var DottedBlock = styled_components_esm["c" /* default */].div(itemStyle__templateObject4);

var StyledTitle = styled_components_esm["c" /* default */].h2(itemStyle__templateObject5);

var StyledFlag = styled_components_esm["c" /* default */].p(itemStyle__templateObject6);
// CONCATENATED MODULE: ./landing-page/blocks/carousel/item/item.js



// import HiphopImage from "../../../components/imageComponents/hiphopImage"
// import BalletImage from "../../../components/imageComponents/balletImage"
// import CapImage from "../../../components/imageComponents/capImage"



var item_itemStyle = function itemStyle(props) {
  var flag = props.flag,
      image = props.image,
      title = props.title,
      description = props.description;

  return Object(preact_min["h"])(
    StyledBlock,
    null,
    Object(preact_min["h"])("img", { src: image, width: "400", height: "auto", alt: "people dancing" }),
    Object(preact_min["h"])(
      "div",
      null,
      Object(preact_min["h"])(
        itemStyle_StyledDiv,
        null,
        Object(preact_min["h"])(
          StyledTitle,
          null,
          title
        ),
        Object(preact_min["h"])(
          StyledFlag,
          null,
          flag
        )
      ),
      Object(preact_min["h"])(
        ExtraStyledText,
        { secundary: true, weight: true },
        description
      )
    )
  );
};

item_itemStyle.defaultProps = {
  flag: "\uD83C\uDDFA\uD83C\uDDF8",
  image: "dancer-1",
  title: "Hip Hop",
  description: "Hip-hop is characterized by a high level of playfulness and exploration through \"move-meant\" concepts and techniques."
};

/* harmony default export */ var item_item = (item_itemStyle);
// CONCATENATED MODULE: ./landing-page/blocks/carousel/item/info.js






var info_info = function info(props) {
  var flags = props.flags,
      title = props.title,
      description = props.description;

  return Object(preact_min["h"])(
    DottedBlock,
    null,
    Object(preact_min["h"])(
      StyledFlag,
      null,
      flags
    ),
    Object(preact_min["h"])(
      StyledTitle,
      null,
      title
    ),
    Object(preact_min["h"])(
      ExtraStyledText,
      { secundary: true, weight: true },
      description
    )
  );
};

info_info.defaultProps = {
  flags: "\uD83C\uDDFA\uD83C\uDDF8",
  title: "Hundreds more...",
  description: "Salsa, Bachata, Commercial, Gwoka, Indian dance, African dance, Tap,\u2026"
};

/* harmony default export */ var item_info = (info_info);
// EXTERNAL MODULE: ./landing-page/images/dancer-1.png
var dancer_1 = __webpack_require__("Ps2U");
var dancer_1_default = /*#__PURE__*/__webpack_require__.n(dancer_1);

// EXTERNAL MODULE: ./landing-page/images/dancer-2.png
var dancer_2 = __webpack_require__("lZeb");
var dancer_2_default = /*#__PURE__*/__webpack_require__.n(dancer_2);

// EXTERNAL MODULE: ./landing-page/images/dancer-3.png
var dancer_3 = __webpack_require__("j7p4");
var dancer_3_default = /*#__PURE__*/__webpack_require__.n(dancer_3);

// CONCATENATED MODULE: ./landing-page/blocks/carouselStatic/styles.js
var carouselStatic_styles__templateObject = carouselStatic_styles__taggedTemplateLiteralLoose(["\n  background-color: ", ";\n"], ["\n  background-color: ", ";\n"]),
    carouselStatic_styles__templateObject2 = carouselStatic_styles__taggedTemplateLiteralLoose(["\n  border-radius: 5rem;\n  width: 6.5rem;\n  height: 2.8rem;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n"], ["\n  border-radius: 5rem;\n  width: 6.5rem;\n  height: 2.8rem;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n"]),
    carouselStatic_styles__templateObject3 = carouselStatic_styles__taggedTemplateLiteralLoose(["\n  width: 23px;\n  height: 15px;\n  transition: transform 0.3s ease-in-out;\n  opacity: 0.6;\n  :hover {\n    transform: scale(1.1);\n    opacity: 1;\n    cursor: pointer;\n  }\n"], ["\n  width: 23px;\n  height: 15px;\n  transition: transform 0.3s ease-in-out;\n  opacity: 0.6;\n  :hover {\n    transform: scale(1.1);\n    opacity: 1;\n    cursor: pointer;\n  }\n"]),
    carouselStatic_styles__templateObject4 = carouselStatic_styles__taggedTemplateLiteralLoose(["\n  width: 20px;\n  height: 15px;\n  transition: transform 0.3s ease-in-out;\n  opacity: 0.6;\n  :hover {\n    transform: scale(1.1);\n    opacity: 1;\n    cursor: pointer;\n  }\n"], ["\n  width: 20px;\n  height: 15px;\n  transition: transform 0.3s ease-in-out;\n  opacity: 0.6;\n  :hover {\n    transform: scale(1.1);\n    opacity: 1;\n    cursor: pointer;\n  }\n"]);

function carouselStatic_styles__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }



var StyledSection = styled_components_esm["c" /* default */].section(carouselStatic_styles__templateObject, function (props) {
  return props.theme.accent;
});
var styles_StyledDiv = styled_components_esm["c" /* default */].div(carouselStatic_styles__templateObject2);

var StyledButtonPrev = styled_components_esm["c" /* default */].div(carouselStatic_styles__templateObject3);

var StyledButtonNext = styled_components_esm["c" /* default */].div(carouselStatic_styles__templateObject4);
// CONCATENATED MODULE: ./landing-page/blocks/carouselStatic/carousel.js

















var carousel__ref = Object(preact_min["h"])(
  Row,
  { justifyContent: "space-around", pb: "60px" },
  Object(preact_min["h"])(item_item, {
    image: dancer_1_default.a,
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    title: "Hip Hop",
    description: "Hip-hop is characterized by a high level of playfulness and exploration through `move-meant` concepts and techniques."
  }),
  Object(preact_min["h"])(item_item, {
    image: dancer_2_default.a,
    flag: "\uD83C\uDDEE\uD83C\uDDF9\uD83C\uDDEB\uD83C\uDDF7",
    title: "Ballet",
    description: "Ballet uses precise and highly formalized set steps and gestures, characterized by light, graceful movements."
  }),
  Object(preact_min["h"])(item_item, {
    image: dancer_3_default.a,
    flag: "\uD83C\uDDE7\uD83C\uDDF7",
    title: "Capoeira",
    description: "A movement discipline combining martial art and dance, which originated among African slaves in 19th-century Brazil"
  }),
  Object(preact_min["h"])(item_info, {
    flags: "\uD83C\uDDEA\uD83C\uDDEC\uD83C\uDDEC\uD83C\uDDF7\uD83C\uDDF2\uD83C\uDDFD\uD83C\uDDE6\uD83C\uDDF7\uD83C\uDDEA\uD83C\uDDF8",
    title: "Hundreds more\u2026",
    description: "Salsa, Bachata, Commercial, Gwoka,  Indian dance, African dance, Tap,\u2026"
  })
);

var carousel_CarouselStatic = function CarouselStatic(props) {
  var title = props.title;

  return Object(preact_min["h"])(
    "div",
    null,
    Object(preact_min["h"])(
      StyledSection,
      null,
      Object(preact_min["h"])(
        SectionMargin,
        null,
        Object(preact_min["h"])(
          PaddingContainer,
          null,
          Object(preact_min["h"])(
            Container,
            null,
            Object(preact_min["h"])(
              Row,
              { justifyContent: "center", pt: "100px", pb: "60px", px: "20px" },
              Object(preact_min["h"])(
                SectionHeader,
                { secundary: true },
                title
              )
            ),
            carousel__ref
          )
        )
      )
    )
  );
};

carousel_CarouselStatic.defaultProps = {
  title: "Learn from different cultures"
};

/* harmony default export */ var carousel = (carousel_CarouselStatic);
// EXTERNAL MODULE: ./landing-page/components/layout.css
var components_layout = __webpack_require__("L8c7");
var layout_default = /*#__PURE__*/__webpack_require__.n(components_layout);

// CONCATENATED MODULE: ./landing-page/theme.js
var theme_theme = {
  // font: 'Mark Simonson - Proxima Nova Regular', 'Helvetica Neue', arial,
  font: 'sans-serif',
  fontFamily: 'sans-serif',
  accent: '#1848FF',
  grey: '#F9F9F9',
  grey2: '#C0C0C0',
  inputBlue: '#7473FF',
  space: ['0rem', '0.6rem', '1.2rem', '1.8rem', '2.4rem'],
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },
  paddingsm: '2rem 0',
  paddingmd: '4rem 0',
  paddinglg: '8rem 0'
};

/* harmony default export */ var landing_page_theme = (theme_theme);
// CONCATENATED MODULE: ./landing-page/components/layout.js










var layout_Layout = function Layout(_ref) {
  var children = _ref.children;
  return Object(preact_min["h"])(
    styled_components_esm["a" /* ThemeProvider */],
    { theme: landing_page_theme },
    Object(preact_min["h"])(
      'div',
      null,
      children
    )
  );
};

// export default withTheme(Layout)
/* harmony default export */ var landing_page_components_layout = (layout_Layout);
// CONCATENATED MODULE: ./landing-page/components/imageComponents/mapImage.js



var mapImage__ref = Object(preact_min["h"])("img", { src: "map.png" });

var MapImage = function MapImage() {
  return mapImage__ref;
};
/* harmony default export */ var mapImage = (MapImage);
// CONCATENATED MODULE: ./landing-page/blocks/mapsection/mapsection.js











var mapsection_ColBreakPoints = {
  xs: 1,
  sm: 1,
  md: 1 / 2,
  lg: 1 / 2,
  xl: 1 / 2
};

var mapsection__ref = Object(preact_min["h"])(
  Col,
  { width: mapsection_ColBreakPoints },
  Object(preact_min["h"])(mapImage, { scr: '/assets/images/landing-page/map.png' })
);

var mapsection_Mapsection = function Mapsection(props) {
  var title = props.title,
      subtext = props.subtext;

  return Object(preact_min["h"])(
    SectionMargin,
    null,
    Object(preact_min["h"])(
      Container,
      null,
      Object(preact_min["h"])(
        Row,
        { justifyContent: 'center', alignItems: 'center' },
        Object(preact_min["h"])(
          Col,
          { width: mapsection_ColBreakPoints },
          Object(preact_min["h"])(
            PaddingContainer,
            null,
            Object(preact_min["h"])(
              SectionHeader,
              null,
              title
            ),
            Object(preact_min["h"])(
              StyledText,
              null,
              subtext
            )
          )
        ),
        mapsection__ref
      )
    )
  );
};

mapsection_Mapsection.defaultProps = {
  title: 'Discover new classes all over the city',
  subtext: 'Our instructors have classes in locations all over the city. It\u2019s up to you where you decide to attend.'
};

/* harmony default export */ var mapsection = (mapsection_Mapsection);
// CONCATENATED MODULE: ./landing-page/blocks/testimonial/styles.js
var testimonial_styles__templateObject = testimonial_styles__taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-flow: column;\n  justify-content: center;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-flow: column;\n  justify-content: center;\n  align-items: center;\n"]),
    testimonial_styles__templateObject2 = testimonial_styles__taggedTemplateLiteralLoose(["\n\n  font-size: 17px;\n  letter-spacing: 1.29px;\n  font-weight: 300;\n  color: ", ";\n  text-transform: uppercase;\n"], ["\n\n  font-size: 17px;\n  letter-spacing: 1.29px;\n  font-weight: 300;\n  color: ", ";\n  text-transform: uppercase;\n"]),
    testimonial_styles__templateObject3 = testimonial_styles__taggedTemplateLiteralLoose(["\n\n  font-size: 40px;\n  line-height: 1.5;\n  font-weight: 300;\n  ", ";\n  ", ";\n"], ["\n\n  font-size: 40px;\n  line-height: 1.5;\n  font-weight: 300;\n  ", ";\n  ", ";\n"]),
    testimonial_styles__templateObject4 = testimonial_styles__taggedTemplateLiteralLoose(["\n      font-size: 20px;\n  "], ["\n      font-size: 20px;\n  "]),
    testimonial_styles__templateObject5 = testimonial_styles__taggedTemplateLiteralLoose(["\n      font-size: 40px;\n  "], ["\n      font-size: 40px;\n  "]),
    testimonial_styles__templateObject6 = testimonial_styles__taggedTemplateLiteralLoose(["\n\n  font-size: 14px;\n  letter-spacing: 1.9px;\n  font-weight: 700;\n  text-transform: uppercase;\n  ", ";\n  ", ";\n"], ["\n\n  font-size: 14px;\n  letter-spacing: 1.9px;\n  font-weight: 700;\n  text-transform: uppercase;\n  ", ";\n  ", ";\n"]),
    testimonial_styles__templateObject7 = testimonial_styles__taggedTemplateLiteralLoose(["\n    font-size: 11px;\n  "], ["\n    font-size: 11px;\n  "]),
    testimonial_styles__templateObject8 = testimonial_styles__taggedTemplateLiteralLoose(["\n    font-size: 14px;\n  "], ["\n    font-size: 14px;\n  "]),
    testimonial_styles__templateObject9 = testimonial_styles__taggedTemplateLiteralLoose(["\n\n  font-size: 15px;\n  letter-spacing: 0.75px;\n  font-weight: 300;\n"], ["\n\n  font-size: 15px;\n  letter-spacing: 0.75px;\n  font-weight: 300;\n"]),
    testimonial_styles__templateObject10 = testimonial_styles__taggedTemplateLiteralLoose(["\n  margin-top: 1rem;\n  border: 0;\n  height: 0;\n  border-top: 1px solid #e7e7e7;\n  border-bottom: 1px solid #e7e7e7;\n"], ["\n  margin-top: 1rem;\n  border: 0;\n  height: 0;\n  border-top: 1px solid #e7e7e7;\n  border-bottom: 1px solid #e7e7e7;\n"]);

function testimonial_styles__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }





var styles_StyledSection = styled_components_esm["c" /* default */].div(testimonial_styles__templateObject);

var StyledTeacher = styled_components_esm["c" /* default */].p(testimonial_styles__templateObject2, function (props) {
  return props.theme.accent;
});

var StyledQuote = styled_components_esm["c" /* default */].p(testimonial_styles__templateObject3, esm("sm")(testimonial_styles__templateObject4), esm("lg")(testimonial_styles__templateObject5));

var StyledDt = Object(styled_components_esm["c" /* default */])(Col)(testimonial_styles__templateObject6, esm("sm")(testimonial_styles__templateObject7), esm("xl")(testimonial_styles__templateObject8));

var StyledDd = Object(styled_components_esm["c" /* default */])(Col)(testimonial_styles__templateObject9);
var StyledHr = styled_components_esm["c" /* default */].hr(testimonial_styles__templateObject10);
// CONCATENATED MODULE: ./landing-page/components/imageComponents/teacherImage.js



var teacherImage__ref = Object(preact_min["h"])("img", { src: "teacher-image.png" });

var TeacherImage = function TeacherImage() {
  return teacherImage__ref;
};
/* harmony default export */ var teacherImage = (TeacherImage);
// CONCATENATED MODULE: ./landing-page/blocks/testimonial/testimonial.js











var testimonial_ColBreakPoints = {
  xs: 1,
  sm: 1,
  md: 1 / 2,
  lg: 1 / 2,
  xl: 1 / 2
};

var DtBreakPoints = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1 / 4,
  xl: 1 / 4
};

var DdBreakPoints = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 3 / 4,
  xl: 3 / 4
};

var testimonial__ref = Object(preact_min["h"])(
  Col,
  { width: testimonial_ColBreakPoints },
  Object(preact_min["h"])(
    PaddingContainer,
    null,
    Object(preact_min["h"])(teacherImage, null)
  )
);

var testimonial__ref2 = Object(preact_min["h"])(StyledHr, null);

var testimonial__ref3 = Object(preact_min["h"])(StyledHr, null);

var testimonial__ref4 = Object(preact_min["h"])(StyledHr, null);

var testimonial_Testimonial = function Testimonial(props) {
  var title = props.title,
      subtext = props.subtext,
      teacher = props.teacher,
      quote = props.quote,
      dt1 = props.dt1,
      dd1 = props.dd1,
      dt2 = props.dt2,
      dd2 = props.dd2,
      dt3 = props.dt3,
      dd3 = props.dd3,
      dt4 = props.dt4,
      dd4 = props.dd4;

  return Object(preact_min["h"])(
    SectionMargin,
    null,
    Object(preact_min["h"])(
      PaddingContainer,
      null,
      Object(preact_min["h"])(
        Container,
        null,
        Object(preact_min["h"])(
          styles_StyledSection,
          null,
          Object(preact_min["h"])(
            SectionHeader,
            null,
            title
          ),
          Object(preact_min["h"])(
            StyledText,
            null,
            subtext
          ),
          Object(preact_min["h"])(
            Row,
            { pt: "80px", justifyContent: "space-around", alignItems: "center" },
            testimonial__ref,
            Object(preact_min["h"])(
              Col,
              { width: testimonial_ColBreakPoints },
              Object(preact_min["h"])(
                "div",
                null,
                Object(preact_min["h"])(
                  StyledTeacher,
                  null,
                  teacher
                ),
                Object(preact_min["h"])(
                  StyledQuote,
                  null,
                  quote
                ),
                Object(preact_min["h"])(
                  "div",
                  null,
                  Object(preact_min["h"])(
                    Row,
                    null,
                    Object(preact_min["h"])(
                      StyledDt,
                      { width: DtBreakPoints },
                      dt1
                    ),
                    Object(preact_min["h"])(
                      StyledDd,
                      { width: DdBreakPoints },
                      dd1
                    )
                  ),
                  testimonial__ref2,
                  Object(preact_min["h"])(
                    Row,
                    null,
                    Object(preact_min["h"])(
                      StyledDt,
                      { width: DtBreakPoints },
                      dt2
                    ),
                    Object(preact_min["h"])(
                      StyledDd,
                      { width: DdBreakPoints },
                      dd2
                    )
                  ),
                  testimonial__ref3,
                  Object(preact_min["h"])(
                    Row,
                    null,
                    Object(preact_min["h"])(
                      StyledDt,
                      { width: DtBreakPoints },
                      dt3
                    ),
                    Object(preact_min["h"])(
                      StyledDd,
                      { width: DdBreakPoints },
                      dd3
                    )
                  ),
                  testimonial__ref4,
                  Object(preact_min["h"])(
                    Row,
                    null,
                    Object(preact_min["h"])(
                      StyledDt,
                      { width: DtBreakPoints },
                      dt4
                    ),
                    Object(preact_min["h"])(
                      StyledDd,
                      { width: DdBreakPoints },
                      dd4
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};

testimonial_Testimonial.defaultProps = {
  title: "Learn from the best",
  subtext: "Learn from passionate individuals about their art form",
  teacher: "Oliver V",
  quote: "\u201CNobody cares if you can\u2019t dance well. Just get up and dance.\u201D",
  dt1: "Teaches",
  dd1: "Modern Dance, Contemporary, Hip Hop",
  dt2: "Experience",
  dd2: "11+ years",
  dt3: "Location",
  dd3: "Independent studio, Shoreditch",
  dt4: "About",
  dd4: "Attend hundreds of dance classes from the best teachers across\n  London with a single membership. Attend hundreds of dance\n  classes from the best teachers across London with a single\n  membership."
};

/* harmony default export */ var testimonial = (testimonial_Testimonial);
// CONCATENATED MODULE: ./landing-page/blocks/howitworks/styles.js
var howitworks_styles__templateObject = howitworks_styles__taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"], ["\n  background-color: ", ";\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]),
    howitworks_styles__templateObject2 = howitworks_styles__taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]),
    howitworks_styles__templateObject3 = howitworks_styles__taggedTemplateLiteralLoose(["\n  padding-bottom: 4rem;\n"], ["\n  padding-bottom: 4rem;\n"]);

function howitworks_styles__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }




var howitworks_styles_StyledSection = styled_components_esm["c" /* default */].section(howitworks_styles__templateObject, function (props) {
  return props.theme.grey;
});

var howitworks_styles_StyledDiv = styled_components_esm["c" /* default */].div(howitworks_styles__templateObject2);

var StyledSectionHeader = Object(styled_components_esm["c" /* default */])(SectionHeader)(howitworks_styles__templateObject3);
// EXTERNAL MODULE: ./landing-page/images/CounterFigure.svg
var CounterFigure = __webpack_require__("eGuX");
var CounterFigure_default = /*#__PURE__*/__webpack_require__.n(CounterFigure);

// CONCATENATED MODULE: ./landing-page/blocks/howitworks/bullet/bulletStyle.js
var bulletStyle__templateObject = bulletStyle__taggedTemplateLiteralLoose(['\n  font-weight: 700;\n  color: ', ';\n  letter-spacing: 1.6px;\n  text-transform: uppercase;\n  font-size: 21px;\n'], ['\n  font-weight: 700;\n  color: ', ';\n  letter-spacing: 1.6px;\n  text-transform: uppercase;\n  font-size: 21px;\n']),
    bulletStyle__templateObject2 = bulletStyle__taggedTemplateLiteralLoose(['\n  margin-top: 1.3rem;\n'], ['\n  margin-top: 1.3rem;\n']),
    bulletStyle__templateObject3 = bulletStyle__taggedTemplateLiteralLoose(['\n  display: flex;\n  flex-flow: column;\n  justify-content: center;\n  align-items: center;\n  background-color: white;\n  border-radius: 12px;\n  width: 18rem;\n  height: 19rem;\n  text-align: center;\n'], ['\n  display: flex;\n  flex-flow: column;\n  justify-content: center;\n  align-items: center;\n  background-color: white;\n  border-radius: 12px;\n  width: 18rem;\n  height: 19rem;\n  text-align: center;\n']),
    bulletStyle__templateObject4 = bulletStyle__taggedTemplateLiteralLoose(['\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  top: 0;\n'], ['\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  top: 0;\n']),
    bulletStyle__templateObject5 = bulletStyle__taggedTemplateLiteralLoose(['\n  position: absolute;\n  background: url(', ');\n'], ['\n  position: absolute;\n  background: url(', ');\n']),
    bulletStyle__templateObject6 = bulletStyle__taggedTemplateLiteralLoose(['\n  position: relative;\n  color: white;\n  font-weight: 700;\n  font-size: 20px;\n\n  padding-top: 22px;\n'], ['\n  position: relative;\n  color: white;\n  font-weight: 700;\n  font-size: 20px;\n\n  padding-top: 22px;\n']);

function bulletStyle__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }





var BulletTitle = styled_components_esm["c" /* default */].h2(bulletStyle__templateObject, function (props) {
  return props.theme.accent;
});
var StyledImg = styled_components_esm["c" /* default */].img(bulletStyle__templateObject2);

var bulletStyle_StyledBlock = styled_components_esm["c" /* default */].div(bulletStyle__templateObject3);

var bulletStyle_StyledDiv = styled_components_esm["c" /* default */].div(bulletStyle__templateObject4);

var StyledCounterNumber = styled_components_esm["c" /* default */].div(bulletStyle__templateObject5, CounterFigure_default.a);

var StyledNumber = styled_components_esm["c" /* default */].p(bulletStyle__templateObject6);
// CONCATENATED MODULE: ./landing-page/blocks/howitworks/bullet/bullet.js







var bullet__ref = Object(preact_min["h"])(StyledCounterNumber, null);

var bullet_Bullet = function Bullet(props) {
  var number = props.number,
      image = props.image,
      title = props.title,
      description = props.description;

  return Object(preact_min["h"])(
    bulletStyle_StyledBlock,
    null,
    Object(preact_min["h"])(
      bulletStyle_StyledDiv,
      null,
      bullet__ref,
      Object(preact_min["h"])(
        StyledNumber,
        null,
        number
      )
    ),
    Object(preact_min["h"])(StyledImg, { src: image, width: '150', height: '117', alt: 'icon' }),
    Object(preact_min["h"])(
      BulletTitle,
      null,
      title
    ),
    Object(preact_min["h"])(
      StyledText,
      null,
      description
    )
  );
};

bullet_Bullet.defaultProps = {
  number: 'How It Works',
  image: 'How It Works',
  title: 'How It Works',
  description: 'How It Works'
};

/* harmony default export */ var bullet = (bullet_Bullet);
// EXTERNAL MODULE: ./landing-page/images/icon-1.png
var icon_1 = __webpack_require__("CrvO");
var icon_1_default = /*#__PURE__*/__webpack_require__.n(icon_1);

// EXTERNAL MODULE: ./landing-page/images/icon-2.png
var icon_2 = __webpack_require__("a5Pq");
var icon_2_default = /*#__PURE__*/__webpack_require__.n(icon_2);

// EXTERNAL MODULE: ./landing-page/images/icon3.png
var icon3 = __webpack_require__("7M+v");
var icon3_default = /*#__PURE__*/__webpack_require__.n(icon3);

// CONCATENATED MODULE: ./landing-page/blocks/howitworks/howitworks.js















var justifyPlacement = {
  xs: 'center',
  sm: 'center',
  md: 'flex-start',
  lg: 'center',
  xl: 'center'
};

var howitworks__ref = Object(preact_min["h"])(
  Col,
  { pt: '10px', pb: '10px' },
  Object(preact_min["h"])(bullet, {
    number: '01',
    image: icon_1_default.a,
    title: 'Discover',
    description: 'Browse videos of teachers and classes in your area.'
  })
);

var howitworks_Howitworks = function Howitworks(props) {
  var title = props.title;

  return Object(preact_min["h"])(
    howitworks_styles_StyledSection,
    null,
    Object(preact_min["h"])(
      SectionMargin,
      null,
      Object(preact_min["h"])(
        Container,
        null,
        Object(preact_min["h"])(
          howitworks_styles_StyledDiv,
          null,
          Object(preact_min["h"])(
            StyledSectionHeader,
            null,
            title
          ),
          Object(preact_min["h"])(
            Row,
            { justifyContent: justifyPlacement, alignItems: 'center' },
            howitworks__ref
          )
        )
      )
    )
  );
};

howitworks_Howitworks.defaultProps = {
  title: 'How It Works'
};

/* harmony default export */ var howitworks = (howitworks_Howitworks);
// CONCATENATED MODULE: ./landing-page/blocks/faq/questions/questionStyle.js
var questionStyle__templateObject = questionStyle__taggedTemplateLiteralLoose(["\n\n  font-weight: 700;\n  font-size: 16px;\n  ", ";\n"], ["\n\n  font-weight: 700;\n  font-size: 16px;\n  ", ";\n"]),
    questionStyle__templateObject2 = questionStyle__taggedTemplateLiteralLoose(["\n      font-size: 22px;\n  "], ["\n      font-size: 22px;\n  "]),
    questionStyle__templateObject3 = questionStyle__taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n"]),
    questionStyle__templateObject4 = questionStyle__taggedTemplateLiteralLoose(["\n\n  font-weight: 700;\n  font-size: 30px;\n  color: ", ";\n  transition: transform 0.4s ease-in-out;\n  :hover {\n    transform: rotate(45deg);\n    cursor: pointer;\n  }\n"], ["\n\n  font-weight: 700;\n  font-size: 30px;\n  color: ", ";\n  transition: transform 0.4s ease-in-out;\n  :hover {\n    transform: rotate(45deg);\n    cursor: pointer;\n  }\n"]),
    questionStyle__templateObject5 = questionStyle__taggedTemplateLiteralLoose(["\n  display: ", ";\n  animation: ", ";\n"], ["\n  display: ", ";\n  animation: ", ";\n"]),
    questionStyle__templateObject6 = questionStyle__taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n\t\ttransform: translate(0px, -20px);\n  }\n\n  to {\n    opacity: 1;\n\t\ttransform: translate(0px, 0px);\n  }\n"], ["\n  from {\n    opacity: 0;\n\t\ttransform: translate(0px, -20px);\n  }\n\n  to {\n    opacity: 1;\n\t\ttransform: translate(0px, 0px);\n  }\n"]);

function questionStyle__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }




var QuestionTitle = styled_components_esm["c" /* default */].h2(questionStyle__templateObject, esm("sm")(questionStyle__templateObject2));

var StyledContainer = styled_components_esm["c" /* default */].div(questionStyle__templateObject3);

var PlusSign = styled_components_esm["c" /* default */].p(questionStyle__templateObject4, function (props) {
  return props.theme.grey2;
});

var ToggleState = styled_components_esm["c" /* default */].div(questionStyle__templateObject5, function (props) {
  return props.toggle ? "flex" : "none";
}, function (props) {
  return props.toggle ? "(${fade}0.5s ease-in-out)" : "none";
});

var fade = Object(styled_components_esm["d" /* keyframes */])(questionStyle__templateObject6);
// CONCATENATED MODULE: ./landing-page/blocks/faq/questions/question.js


function question__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function question__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function question__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var question__ref = Object(preact_min["h"])(
  PlusSign,
  null,
  "+"
);

var question_Question = function (_React$Component) {
  question__inherits(Question, _React$Component);

  function Question(props) {
    question__classCallCheck(this, Question);

    var _this = question__possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleAnswerToggle = function (event) {
      _this.setState(function (state) {
        return {
          toggle: !state.toggle
        };
      });
    };

    _this.state = {
      toggle: false
      // this.handleAnswerToggle = this.handleAnswerToggle.bind(this)
    };return _this;
  }

  Question.prototype.render = function render() {
    var _props = this.props,
        question = _props.question,
        answer = _props.answer;

    return Object(preact_min["h"])(
      StyledContainer,
      null,
      Object(preact_min["h"])(
        Row,
        { justifyContent: "space-between", onClick: this.handleAnswerToggle },
        Object(preact_min["h"])(
          Col,
          { width: 1 / 2 },
          Object(preact_min["h"])(
            QuestionTitle,
            null,
            question
          )
        ),
        Object(preact_min["h"])(
          Col,
          { width: 1 / 2 },
          Object(preact_min["h"])(
            Row,
            {
              justifyContent: "flex-end",
              toggle: this.state.toggle ? true : false
            },
            question__ref
          )
        )
      ),
      Object(preact_min["h"])(
        Row,
        null,
        Object(preact_min["h"])(
          Col,
          null,
          Object(preact_min["h"])(
            ToggleState,
            { toggle: this.state.toggle ? true : false },
            Object(preact_min["h"])(
              StyledText,
              null,
              answer
            )
          )
        )
      )
    );
  };

  return Question;
}(preact_compat_es["d" /* default */].Component);

question_Question.defaultProps = {
  question: "About",
  answer: "We are founded by a group of dancers and dance instructors passionate about improving the quality of life of individuals in London. We recognize that instructors are the backbone of a great class. We are committed to recognizing, supporting and celebrating these great instructors. Living in a big city can sometimes be overwhelming but there is a strong culture of dance and fun. We\u2019re here to support that culture and connect people who would like to be part of it."
};

/* harmony default export */ var questions_question = (question_Question);
// CONCATENATED MODULE: ./landing-page/blocks/faq/styles.js
var faq_styles__templateObject = faq_styles__taggedTemplateLiteralLoose(["\n  margin-top: 1rem;\n  border: 0;\n  height: 0;\n  border-top: 1px solid #e7e7e7;\n  border-bottom: 1px solid #e7e7e7;\n"], ["\n  margin-top: 1rem;\n  border: 0;\n  height: 0;\n  border-top: 1px solid #e7e7e7;\n  border-bottom: 1px solid #e7e7e7;\n"]),
    faq_styles__templateObject2 = faq_styles__taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n"]);

function faq_styles__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }




var styles_StyledHr = styled_components_esm["c" /* default */].hr(faq_styles__templateObject);
var StyledQuestion = Object(styled_components_esm["c" /* default */])(questions_question)(faq_styles__templateObject2);
// CONCATENATED MODULE: ./landing-page/blocks/faq/faq.js








var faq__ref = Object(preact_min["h"])(StyledQuestion, {
  question: "About",
  answer: "We are founded by a group of dancers and dance instructors passionate about improving the quality of life of individuals in London. We recognize that instructors are the backbone of a great class. We are committed to recognizing, supporting and celebrating these great instructors. Living in a big city can sometimes be overwhelming but there is a strong culture of dance and fun. We\u2019re here to support that culture and connect people who would like to be part of it."
});

var faq__ref2 = Object(preact_min["h"])(styles_StyledHr, null);

var faq__ref3 = Object(preact_min["h"])(StyledQuestion, {
  question: "How can I sign up as an instructor?",
  answer: "instructors@davidalbertoadler.com"
});

var faq__ref4 = Object(preact_min["h"])(styles_StyledHr, null);

var faq__ref5 = Object(preact_min["h"])(StyledQuestion, {
  question: "Why not just pay the teacher directly?",
  answer: "We negotiate fair discounts with instructors so that it works out cheaper to come through us."
});

var faq__ref6 = Object(preact_min["h"])(styles_StyledHr, null);

var faq__ref7 = Object(preact_min["h"])(StyledQuestion, {
  question: "How do we make money?",
  answer: "We take a fixed and fair fee on the class price so that instructors end up with more compared to other platforms. "
});

var faq_Faq = function Faq(props) {
  var title = props.title;

  return Object(preact_min["h"])(
    Container,
    null,
    Object(preact_min["h"])(
      SectionMargin,
      null,
      Object(preact_min["h"])(
        PaddingContainer,
        { faq: true },
        Object(preact_min["h"])(
          SectionHeader,
          null,
          title
        ),
        faq__ref,
        faq__ref2,
        faq__ref3,
        faq__ref4,
        faq__ref5,
        faq__ref6,
        faq__ref7
      )
    )
  );
};

faq_Faq.defaultProps = {
  title: "Frequently Asked Questions"
};

/* harmony default export */ var faq = (faq_Faq);
// CONCATENATED MODULE: ./landing-page/blocks/footer/styles.js
var footer_styles__templateObject = footer_styles__taggedTemplateLiteralLoose(["\n  display: none;\n\n"], ["\n  display: none;\n\n"]),
    footer_styles__templateObject2 = footer_styles__taggedTemplateLiteralLoose(["\n  width: 100%;\n  height: 4rem;\n  ", ";\n"], ["\n  width: 100%;\n  height: 4rem;\n  ", ";\n"]),
    footer_styles__templateObject3 = footer_styles__taggedTemplateLiteralLoose(["\n      height: 10rem;\n  "], ["\n      height: 10rem;\n  "]),
    footer_styles__templateObject4 = footer_styles__taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]),
    footer_styles__templateObject5 = footer_styles__taggedTemplateLiteralLoose(["\n  background-color: ", ";\n"], ["\n  background-color: ", ";\n"]),
    footer_styles__templateObject6 = footer_styles__taggedTemplateLiteralLoose(["\n  margin-top: 1rem;\n  display: flex;\n  flex-direction: column;\n  ", ";\n  ", ";\n  ", ";\n"], ["\n  margin-top: 1rem;\n  display: flex;\n  flex-direction: column;\n  ", ";\n  ", ";\n  ", ";\n"]),
    footer_styles__templateObject7 = footer_styles__taggedTemplateLiteralLoose(["\n      flex-direction: column;\n      width: 100%;\n  "], ["\n      flex-direction: column;\n      width: 100%;\n  "]),
    footer_styles__templateObject8 = footer_styles__taggedTemplateLiteralLoose(["\n      flex-direction: column;\n  "], ["\n      flex-direction: column;\n  "]),
    footer_styles__templateObject9 = footer_styles__taggedTemplateLiteralLoose(["\n      flex-direction: row;\n  "], ["\n      flex-direction: row;\n  "]),
    footer_styles__templateObject10 = footer_styles__taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n"]),
    footer_styles__templateObject11 = footer_styles__taggedTemplateLiteralLoose(["\n  color: ", ";\n  background-color: white;\n  border: none;\n  margin-left: 5px;\n  border-radius: 5rem;\n  padding: 0.6rem 2rem;\n\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  outline: none;\n  ", ";\n  ", ";\n  transition: transform 0.3s ease-in-out;\n  :hover {\n    transform: scale(1.06);\n    cursor: pointer;\n  }\n"], ["\n  color: ", ";\n  background-color: white;\n  border: none;\n  margin-left: 5px;\n  border-radius: 5rem;\n  padding: 0.6rem 2rem;\n\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  outline: none;\n  ", ";\n  ", ";\n  transition: transform 0.3s ease-in-out;\n  :hover {\n    transform: scale(1.06);\n    cursor: pointer;\n  }\n"]),
    styles__templateObject12 = footer_styles__taggedTemplateLiteralLoose(["\n      padding: 0.6rem 2rem;\n      width: 11rem;\n      margin-top: 0;\n  "], ["\n      padding: 0.6rem 2rem;\n      width: 11rem;\n      margin-top: 0;\n  "]),
    styles__templateObject13 = footer_styles__taggedTemplateLiteralLoose(["\n      width: 100%;\n      margin-top: 10px;\n  "], ["\n      width: 100%;\n      margin-top: 10px;\n  "]),
    styles__templateObject14 = footer_styles__taggedTemplateLiteralLoose(["\n  border-radius: 5rem;\n  border: 1px solid ", ";\n  background-color: ", ";\n  color: white;\n  padding: 0.5rem 4rem;\n\n  font-size: 16px;\n  font-weight: 300;\n  letter-spacing: 0.8px;\n  outline: none;\n  margin-right: 0.5rem;\n  text-align: center;\n  ", ";\n  ", ";\n"], ["\n  border-radius: 5rem;\n  border: 1px solid ", ";\n  background-color: ", ";\n  color: white;\n  padding: 0.5rem 4rem;\n\n  font-size: 16px;\n  font-weight: 300;\n  letter-spacing: 0.8px;\n  outline: none;\n  margin-right: 0.5rem;\n  text-align: center;\n  ", ";\n  ", ";\n"]),
    _templateObject15 = footer_styles__taggedTemplateLiteralLoose(["\n      padding: 0.5rem 3rem;\n      width: 16rem;\n      margin-top: 0;\n      text-align: left;\n\n  "], ["\n      padding: 0.5rem 3rem;\n      width: 16rem;\n      margin-top: 0;\n      text-align: left;\n\n  "]),
    _templateObject16 = footer_styles__taggedTemplateLiteralLoose(["\n  margin-right: 10px;\n  transition: transform 0.3s ease-in-out;\n  :hover {\n    transform: translate(0px, -5px);\n    cursor: pointer;\n  }\n"], ["\n  margin-right: 10px;\n  transition: transform 0.3s ease-in-out;\n  :hover {\n    transform: translate(0px, -5px);\n    cursor: pointer;\n  }\n"]);

function footer_styles__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }





var footer_styles_SectionHeader = styled_components_esm["c" /* default */].h1(footer_styles__templateObject);

var PaddingBetween = styled_components_esm["c" /* default */].div(footer_styles__templateObject2, esm("md")(footer_styles__templateObject3));

var StyledCol = Object(styled_components_esm["c" /* default */])(Col)(footer_styles__templateObject4);

var footer_styles_StyledSection = styled_components_esm["c" /* default */].section(footer_styles__templateObject5, function (props) {
  return props.theme.accent;
});
var styles_StyledForm = styled_components_esm["c" /* default */].form(footer_styles__templateObject6, esm("sm")(footer_styles__templateObject7), esm("md")(footer_styles__templateObject8), esm("lg")(footer_styles__templateObject9));

var footer_styles_StyledDiv = styled_components_esm["c" /* default */].div(footer_styles__templateObject10);

var footer_styles_StyledButton = styled_components_esm["c" /* default */].button(footer_styles__templateObject11, function (props) {
  return props.theme.accent;
}, esm("sm")(styles__templateObject12), esm("xs")(styles__templateObject13));

var styles_StyledInput = styled_components_esm["c" /* default */].input(styles__templateObject14, function (props) {
  return props.theme.inputBlue;
}, function (props) {
  return props.theme.inputBlue;
}, esm("xs")(styles__templateObject13), esm("sm")(_templateObject15));

var styles_StyledImg = styled_components_esm["c" /* default */].img(_templateObject16);
// EXTERNAL MODULE: ./landing-page/images/instagram.png
var instagram = __webpack_require__("W3Gh");
var instagram_default = /*#__PURE__*/__webpack_require__.n(instagram);

// CONCATENATED MODULE: ./landing-page/blocks/footer/footer.js







// import Twitter from "../../images/twitter.png"

// import Facebook from "../../images/facebook.png"



var footer__ref = Object(preact_min["h"])(styles_StyledInput, {
  type: "email",
  id: "mce-EMAIL",
  name: "EMAIL",
  placeholder: "name@email.com"
});

var footer__ref2 = Object(preact_min["h"])("input", {
  type: "text",
  name: "b_0e7b5839a8abe9d0d2de31711_f7e48cf5c0",
  value: ""
});

var footer__ref3 = Object(preact_min["h"])(
  footer_styles_StyledButton,
  {
    type: "submit",
    value: "Subscribe",
    name: "subscribe",
    id: "id=",
    "mc-embedded-subscribe": true
  },
  "Get a free class"
);

var footer__ref4 = Object(preact_min["h"])(PaddingBetween, null);

var footer__ref5 = Object(preact_min["h"])(
  StyledText,
  { secundary: true, uppercase: true, spacing: true, margin: true },
  "Follow Us"
);

var footer__ref6 = Object(preact_min["h"])(
  "a",
  { href: "https://www.instagram.com/instructorlist/" },
  Object(preact_min["h"])(styles_StyledImg, {
    src: instagram_default.a,
    width: "16",
    height: "16",
    alt: "instagramlogo"
  })
);

var footer_Footer = function Footer(props) {
  var title = props.title,
      copyright = props.copyright,
      email = props.email;

  return Object(preact_min["h"])(
    footer_styles_StyledSection,
    { id: "section1" },
    Object(preact_min["h"])(
      SectionMargin,
      { footer: true },
      Object(preact_min["h"])(
        Container,
        null,
        Object(preact_min["h"])(
          PaddingContainer,
          null,
          Object(preact_min["h"])(
            footer_styles_StyledDiv,
            null,
            Object(preact_min["h"])(
              Row,
              { justifyContent: "center", alignItems: "center" },
              Object(preact_min["h"])(
                StyledCol,
                null,
                Object(preact_min["h"])(
                  SectionHeader,
                  { secundary: true },
                  title
                ),
                Object(preact_min["h"])(
                  styles_StyledForm,
                  {
                    action: "https://gmail.us20.list-manage.com/subscribe/post?u=0e7b5839a8abe9d0d2de31711&id=f7e48cf5c0",
                    method: "post",
                    id: "mc-embedded-subscribe-form",
                    name: "mc-embedded-subscribe-form",
                    target: "_blank"
                  },
                  footer__ref,
                  Object(preact_min["h"])(
                    "div",
                    { id: "mce-responses" },
                    Object(preact_min["h"])("div", {
                      id: "mce-error-response",
                      style: { display: "none" }
                    }),
                    Object(preact_min["h"])("div", {
                      id: "mce-success-response",
                      style: { display: "none" }
                    })
                  ),
                  Object(preact_min["h"])(
                    "div",
                    {
                      style: { position: "absolute", left: "-5000px" },
                      "aria-hidden": "true"
                    },
                    footer__ref2
                  ),
                  footer__ref3
                )
              )
            ),
            footer__ref4,
            Object(preact_min["h"])(
              Row,
              { justifyContent: "space-around", alignItems: "center" },
              Object(preact_min["h"])(
                Col,
                null,
                Object(preact_min["h"])(
                  StyledText,
                  { secundary: true },
                  "\xA9 ",
                  new Date().getFullYear(),
                  ", ",
                  Object(preact_min["h"])(
                    "span",
                    null,
                    copyright
                  )
                )
              ),
              Object(preact_min["h"])(
                Col,
                null,
                Object(preact_min["h"])(
                  StyledText,
                  { secundary: true },
                  email
                )
              ),
              Object(preact_min["h"])(
                Col,
                null,
                Object(preact_min["h"])(
                  Row,
                  { alignItems: "center" },
                  footer__ref5,
                  footer__ref6
                )
              )
            )
          )
        )
      )
    )
  );
};

footer_Footer.defaultProps = {
  title: "Sign up for a free class",
  copyright: "instructorlist",
  email: "instructors@davidalbertoadler.com"
};

/* harmony default export */ var footer = (footer_Footer);
// CONCATENATED MODULE: ./landing-page/pages/index.js

















var pages__ref = Object(preact_min["h"])(navigation, {
  logo: Object(preact_min["h"])(
    Span,
    null,
    'i',
    Object(preact_min["h"])(
      LogoSpan,
      null,
      'nstructor'
    ),
    'l',
    Object(preact_min["h"])(
      LogoSpan,
      null,
      'ist'
    )
  ),
  primaryButton: 'I\'m a teacher',
  secundaryButton: 'Get a free class'
});

var pages__ref2 = Object(preact_min["h"])(header_header, {
  alert: 'We\'re launching very soon!',
  title: Object(preact_min["h"])(
    'span',
    null,
    'The Best Dance Teachers',
    Object(preact_min["h"])('br', null),
    'Across London.',
    Object(preact_min["h"])('br', null),
    Object(preact_min["h"])(
      StyledSpan,
      null,
      Object(preact_min["h"])(
        match["Link"],
        { href: '/search' },
        'Handpicked.'
      )
    )
  ),
  subtext: 'Attend hundreds of dance classes from the best teachers across London with a single membership.'
});

var pages__ref3 = Object(preact_min["h"])(carousel, null);

var pages__ref4 = Object(preact_min["h"])(mapsection, {
  title: 'Discover new classes all over the city.',
  subtext: 'Our instructors have classes in locations all over the city. It\u2019s up to you where you decide to attend.'
});

var pages__ref5 = Object(preact_min["h"])(testimonial, {
  title: 'Learn from the best',
  subtext: 'Learn from passionate individuals about their art form',
  teacher: 'Oliver V',
  quote: '\u201CNobody cares if you can\u2019t dance well. Just get up and dance.\u201D',
  dt1: 'Teaches',
  dd1: 'Commercial and Hip Hop Dance',
  dt2: 'Experience',
  dd2: '11+ years',
  dt3: 'Location',
  dd3: 'Independent studio, Shoreditch',
  dt4: 'About',
  dd4: 'Oliver is a London native who got into contact with dancing at a very young age. His constant need for improvement has allowed him to turn his passion into a career. He has worked with brands such as Channel4, D&G and BBC and started teaching 11 years ago as a way to give back to the community and train the next generation of dancers.'
});

var pages__ref6 = Object(preact_min["h"])(howitworks, { title: 'How It Works' });

var pages__ref7 = Object(preact_min["h"])(faq, { title: 'Frequently Asked Questions' });

var pages__ref8 = Object(preact_min["h"])(footer, {
  title: 'Sign up for a free class',
  copyright: 'instructorlist',
  email: 'instructors@instructorlist.org'
});

var pages_IndexPage = function IndexPage() {
  return Object(preact_min["h"])(
    landing_page_components_layout,
    null,
    Object(preact_min["h"])(seo, {
      title: 'Instructorlist',
      keywords: ['instructorlist', 'dance teachers', 'london']
    }),
    pages__ref,
    pages__ref2,
    pages__ref3,
    pages__ref4,
    pages__ref5,
    pages__ref6,
    pages__ref7,
    pages__ref8
  );
};

/* harmony default export */ var pages = (pages_IndexPage);
// CONCATENATED MODULE: ./components/TestHome.js
var TestHome__templateObject = TestHome__taggedTemplateLiteralLoose(['\n  background: red;\n  color: white;\n  font-weight: 700;\n  font-size: 16px;\n  ', ';\n'], ['\n  background: red;\n  color: white;\n  font-weight: 700;\n  font-size: 16px;\n  ', ';\n']),
    TestHome__templateObject2 = TestHome__taggedTemplateLiteralLoose(['\n      font-size: 22px;\n  '], ['\n      font-size: 22px;\n  ']);



function TestHome__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TestHome__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function TestHome__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function TestHome__taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }






var TestHome_StyledDiv = styled_components_esm["c" /* default */].div(TestHome__templateObject, esm('sm')(TestHome__templateObject2));
var TestHome_Box = Object(styled_components_esm["c" /* default */])('div')({
  boxSizing: 'border-box'
}, space, function (props) {
  return props.css;
});

var TestHome_theme = {
  space: [0, 6, '12rem', 18, 24],
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },
  paddingsm: '2rem 0',
  paddingmd: '4rem 0',
  paddinglg: '8rem 0'
};

var TestHome__ref = Object(preact_min["h"])(
  'div',
  null,
  'somethrin Hey there'
);

var TestHome__ref2 = Object(preact_min["h"])(
  TestHome_Box,
  { mt: 2 },
  Object(preact_min["h"])(
    TestHome_StyledDiv,
    null,
    'somethrin Hey there'
  )
);

var TestHome_Home = function (_Component) {
  TestHome__inherits(Home, _Component);

  function Home() {
    TestHome__classCallCheck(this, Home);

    return TestHome__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Home.prototype.render = function render() {
    return Object(preact_min["h"])(
      styled_components_esm["a" /* ThemeProvider */],
      { theme: TestHome_theme },
      Object(preact_min["h"])(
        'div',
        { style: { padding: '300px' } },
        TestHome__ref,
        TestHome__ref2
      )
    );
  };

  return Home;
}(preact_min["Component"]);

// export default withTheme(Home)


/* harmony default export */ var TestHome = (function () {
  return null;
});
// CONCATENATED MODULE: ./components/app.js
var app__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// Code-splitting is automated for routes









var app__ref = Object(preact_min["h"])(header, null);

var app__ref2 = Object(preact_min["h"])(
  'div',
  {
    style: 'justify-content: center; align-items: center; flex: 1; height: 100vh;',
    'default': true
  },
  '404 Not Found'
);

var app__ref3 = Object(preact_min["h"])(
  'summary',
  null,
  'ssrData'
);

var app_withMainTemplate = function withMainTemplate(Page) {
  return function (props) {
    return Object(preact_min["h"])(
      'div',
      { className: 'main-app' },
      app__ref,
      Object(preact_min["h"])(Page, app__extends({ data: props.data }, props)),
      app__ref2,
      is_ssr() && Object(preact_min["h"])(
        'div',
        null,
        Object(preact_min["h"])(
          'details',
          { style: { padding: '2rem' } },
          app__ref3,
          Object(preact_min["h"])(
            'pre',
            { style: { whiteSpace: 'pre-wrap' } },
            JSON.stringify(props.ssrData, null, 2)
          )
        )
      )
    );
  };
};

var app_withLandingPageTemplate = function withLandingPageTemplate(Page) {
  return function (props) {
    return Object(preact_min["h"])(
      'div',
      { className: 'landing-page' },
      Object(preact_min["h"])(Page, props)
    );
  };
};

var app_pages = [{
  component: app_withLandingPageTemplate(pages),
  path: '/'
}, {
  component: app_withMainTemplate(TestHome),
  path: '/blah'
}, {
  component: app_withMainTemplate(search),
  path: '/search'
}, {
  component: app_withMainTemplate(search),
  path: '/search/:date/map/'
}, {
  component: app_withMainTemplate(search),
  path: '/search/:date/filters/'
}, {
  component: app_withMainTemplate(search),
  path: '/search/:date/'
}, {
  component: app_withMainTemplate(class_page),
  path: '/classes/:id'
}, {
  component: app_withMainTemplate(profile_Profile),
  path: '/profile/',
  user: 'me'
}, {
  component: app_withMainTemplate(profile_Profile),
  path: '/profile/:user'
}];

var app_App = function (_Component) {
  app__inherits(App, _Component);

  function App(props) {
    app__classCallCheck(this, App);

    var _this = app__possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleRoute = function (e) {
      _this.currentUrl = e.url;
    };

    _this.state = {
      data: new DataService_DataService(props.ssrData)
    };
    return _this;
  }

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */


  App.prototype.render = function render(_ref4) {
    var _this2 = this;

    var url = _ref4.url;

    return Object(preact_min["h"])(
      preact_router_es["Router"],
      { url: url, onChange: this.handleRoute },
      app_pages.map(function (x) {
        var Component = x.component,
            rest = _objectWithoutProperties(x, ['component']);

        return Object(preact_min["h"])(Component, app__extends({
          data: _this2.state.data,
          ssrData: _this2.props.ssrData
        }, rest, _this2.props));
      })
    );
  };

  return App;
}(preact_min["Component"]);




app_App.pages = app_pages;
// CONCATENATED MODULE: ./index.js



if (typeof window !== 'undefined') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js');
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

/***/ "L8c7":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Mmjd":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"paymentWrapper":"paymentWrapper__1x25b","close":"close__1l-EC","paymentMain":"paymentMain__2L3VM","paymentHeader":"paymentHeader__3BZWN","back":"back__1GJnh","title":"title__1Os6k","section":"section__2SSUU","time":"time__IA1AL","classTitle":"classTitle__2boOm","titleContainer":"titleContainer__O_OAw","extra":"extra__ktVQ8","strong":"strong__ved2L","paymentForm":"paymentForm__TFqeV","inputContainer":"inputContainer__13SbB"};

/***/ }),

/***/ "Ps2U":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "84946d1d6009e193b72896a56ed10044.png";

/***/ }),

/***/ "Q40o":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),

/***/ "R6xY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__("Q40o");

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),

/***/ "RsE0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.10.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


Object.defineProperty(exports, "__esModule", { value: !0 });
var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.fundamental") : 60117,
    w = b ? Symbol.for("react.responder") : 60118,
    x = b ? Symbol.for("react.scope") : 60119;function y(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;switch (u) {case c:
        switch (a = a.type, a) {case l:case m:case e:case g:case f:case p:
            return a;default:
            switch (a = a && a.$$typeof, a) {case k:case n:case h:
                return a;default:
                return u;}}case t:case r:case d:
        return u;}
  }
}function z(a) {
  return y(a) === m;
}
exports.typeOf = y;exports.AsyncMode = l;exports.ConcurrentMode = m;exports.ContextConsumer = k;exports.ContextProvider = h;exports.Element = c;exports.ForwardRef = n;exports.Fragment = e;exports.Lazy = t;exports.Memo = r;exports.Portal = d;exports.Profiler = g;exports.StrictMode = f;exports.Suspense = p;
exports.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === v || a.$$typeof === w || a.$$typeof === x);
};exports.isAsyncMode = function (a) {
  return z(a) || y(a) === l;
};exports.isConcurrentMode = z;exports.isContextConsumer = function (a) {
  return y(a) === k;
};exports.isContextProvider = function (a) {
  return y(a) === h;
};
exports.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};exports.isForwardRef = function (a) {
  return y(a) === n;
};exports.isFragment = function (a) {
  return y(a) === e;
};exports.isLazy = function (a) {
  return y(a) === t;
};exports.isMemo = function (a) {
  return y(a) === r;
};exports.isPortal = function (a) {
  return y(a) === d;
};exports.isProfiler = function (a) {
  return y(a) === g;
};exports.isStrictMode = function (a) {
  return y(a) === f;
};exports.isSuspense = function (a) {
  return y(a) === p;
};

/***/ }),

/***/ "Tv6c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"profile":"profile__t2Dqz"};

/***/ }),

/***/ "UYYs":
/***/ (function(module, exports, __webpack_require__) {

(function (factory) {
	 true ? module['exports'] = factory() : typeof define === 'function' && define['amd'] ? define(factory()) : window['stylisRuleSheet'] = factory();
})(function () {

	'use strict';

	return function (insertRule) {
		var delimiter = '/*|*/';
		var needle = delimiter + '}';

		function toSheet(block) {
			if (block) try {
				insertRule(block + '}');
			} catch (e) {}
		}

		return function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
			switch (context) {
				// property
				case 1:
					// @import
					if (depth === 0 && content.charCodeAt(0) === 64) return insertRule(content + ';'), '';
					break;
				// selector
				case 2:
					if (ns === 0) return content + delimiter;
					break;
				// at-rule
				case 3:
					switch (ns) {
						// @font-face, @page
						case 102:
						case 112:
							return insertRule(selectors[0] + content), '';
						default:
							return content + (at === 0 ? delimiter : '');
					}
				case -2:
					content.split(needle).forEach(toSheet);
			}
		};
	};
});

/***/ }),

/***/ "W3Gh":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "044b7d8a4b9f46cdcd9efec7cbf0ce3b.png";

/***/ }),

/***/ "YOxv":
/***/ (function(module, exports, __webpack_require__) {

/*
 *          __        ___
 *    _____/ /___  __/ (_)____
 *   / ___/ __/ / / / / / ___/
 *  (__  ) /_/ /_/ / / (__  )
 * /____/\__/\__, /_/_/____/
 *          /____/
 *
 * light - weight css preprocessor @licence MIT
 */
(function (factory) {
	/* eslint-disable */
	 true ? module['exports'] = factory(null) : typeof define === 'function' && define['amd'] ? define(factory(null)) : window['stylis'] = factory(null);
})( /** @param {*=} options */function factory(options) {
	/* eslint-disable */

	'use strict';

	/**
  * Notes
  *
  * The ['<method name>'] pattern is used to support closure compiler
  * the jsdoc signatures are also used to the same effect
  *
  * ----
  *
  * int + int + int === n4 [faster]
  *
  * vs
  *
  * int === n1 && int === n2 && int === n3
  *
  * ----
  *
  * switch (int) { case ints...} [faster]
  *
  * vs
  *
  * if (int == 1 && int === 2 ...)
  *
  * ----
  *
  * The (first*n1 + second*n2 + third*n3) format used in the property parser
  * is a simple way to hash the sequence of characters
  * taking into account the index they occur in
  * since any number of 3 character sequences could produce duplicates.
  *
  * On the other hand sequences that are directly tied to the index of the character
  * resolve a far more accurate measure, it's also faster
  * to evaluate one condition in a switch statement
  * than three in an if statement regardless of the added math.
  *
  * This allows the vendor prefixer to be both small and fast.
  */

	var nullptn = /^\0+/g; /* matches leading null characters */
	var formatptn = /[\0\r\f]/g; /* matches new line, null and formfeed characters */
	var colonptn = /: */g; /* splits animation rules */
	var cursorptn = /zoo|gra/; /* assert cursor varient */
	var transformptn = /([,: ])(transform)/g; /* vendor prefix transform, older webkit */
	var animationptn = /,+\s*(?![^(]*[)])/g; /* splits multiple shorthand notation animations */
	var propertiesptn = / +\s*(?![^(]*[)])/g; /* animation properties */
	var elementptn = / *[\0] */g; /* selector elements */
	var selectorptn = /,\r+?/g; /* splits selectors */
	var andptn = /([\t\r\n ])*\f?&/g; /* match & */
	var escapeptn = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g; /* matches :global(.*) */
	var invalidptn = /\W+/g; /* removes invalid characters from keyframes */
	var keyframeptn = /@(k\w+)\s*(\S*)\s*/; /* matches @keyframes $1 */
	var plcholdrptn = /::(place)/g; /* match ::placeholder varient */
	var readonlyptn = /:(read-only)/g; /* match :read-only varient */
	var beforeptn = /\s+(?=[{\];=:>])/g; /* matches \s before ] ; = : */
	var afterptn = /([[}=:>])\s+/g; /* matches \s after characters [ } = : */
	var tailptn = /(\{[^{]+?);(?=\})/g; /* matches tail semi-colons ;} */
	var whiteptn = /\s{2,}/g; /* matches repeating whitespace */
	var pseudoptn = /([^\(])(:+) */g; /* pseudo element */
	var writingptn = /[svh]\w+-[tblr]{2}/; /* match writing mode property values */
	var gradientptn = /([\w-]+t\()/g; /* match *gradient property */
	var supportsptn = /\(\s*(.*)\s*\)/g; /* match supports (groups) */
	var propertyptn = /([\s\S]*?);/g; /* match properties leading semicolon */
	var selfptn = /-self|flex-/g; /* match flex- and -self in align-self: flex-*; */
	var pseudofmt = /[^]*?(:[rp][el]a[\w-]+)[^]*/; /* extrats :readonly or :placholder from selector */
	var trimptn = /[ \t]+$/; /* match tail whitspace */
	var dimensionptn = /stretch|:\s*\w+\-(?:conte|avail)/; /* match max/min/fit-content, fill-available */
	var imgsrcptn = /([^-])(image-set\()/;

	/* vendors */
	var webkit = '-webkit-';
	var moz = '-moz-';
	var ms = '-ms-';

	/* character codes */
	var SEMICOLON = 59; /* ; */
	var CLOSEBRACES = 125; /* } */
	var OPENBRACES = 123; /* { */
	var OPENPARENTHESES = 40; /* ( */
	var CLOSEPARENTHESES = 41; /* ) */
	var OPENBRACKET = 91; /* [ */
	var CLOSEBRACKET = 93; /* ] */
	var NEWLINE = 10; /* \n */
	var CARRIAGE = 13; /* \r */
	var TAB = 9; /* \t */
	var AT = 64; /* @ */
	var SPACE = 32; /*   */
	var AND = 38; /* & */
	var DASH = 45; /* - */
	var UNDERSCORE = 95; /* _ */
	var STAR = 42; /* * */
	var COMMA = 44; /* , */
	var COLON = 58; /* : */
	var SINGLEQUOTE = 39; /* ' */
	var DOUBLEQUOTE = 34; /* " */
	var FOWARDSLASH = 47; /* / */
	var GREATERTHAN = 62; /* > */
	var PLUS = 43; /* + */
	var TILDE = 126; /* ~ */
	var NULL = 0; /* \0 */
	var FORMFEED = 12; /* \f */
	var VERTICALTAB = 11; /* \v */

	/* special identifiers */
	var KEYFRAME = 107; /* k */
	var MEDIA = 109; /* m */
	var SUPPORTS = 115; /* s */
	var PLACEHOLDER = 112; /* p */
	var READONLY = 111; /* o */
	var IMPORT = 105; /* <at>i */
	var CHARSET = 99; /* <at>c */
	var DOCUMENT = 100; /* <at>d */
	var PAGE = 112; /* <at>p */

	var column = 1; /* current column */
	var line = 1; /* current line numebr */
	var pattern = 0; /* :pattern */

	var cascade = 1; /* #id h1 h2 vs h1#id h2#id  */
	var prefix = 1; /* vendor prefix */
	var escape = 1; /* escape :global() pattern */
	var compress = 0; /* compress output */
	var semicolon = 0; /* no/semicolon option */
	var preserve = 0; /* preserve empty selectors */

	/* empty reference */
	var array = [];

	/* plugins */
	var plugins = [];
	var plugged = 0;
	var should = null;

	/* plugin context */
	var POSTS = -2;
	var PREPS = -1;
	var UNKWN = 0;
	var PROPS = 1;
	var BLCKS = 2;
	var ATRUL = 3;

	/* plugin newline context */
	var unkwn = 0;

	/* keyframe animation */
	var keyed = 1;
	var key = '';

	/* selector namespace */
	var nscopealt = '';
	var nscope = '';

	/**
  * Compile
  *
  * @param {Array<string>} parent
  * @param {Array<string>} current
  * @param {string} body
  * @param {number} id
  * @param {number} depth
  * @return {string}
  */
	function compile(parent, current, body, id, depth) {
		var bracket = 0; /* brackets [] */
		var comment = 0; /* comments /* // or /* */
		var parentheses = 0; /* functions () */
		var quote = 0; /* quotes '', "" */

		var first = 0; /* first character code */
		var second = 0; /* second character code */
		var code = 0; /* current character code */
		var tail = 0; /* previous character code */
		var trail = 0; /* character before previous code */
		var peak = 0; /* previous non-whitespace code */

		var counter = 0; /* count sequence termination */
		var context = 0; /* track current context */
		var atrule = 0; /* track @at-rule context */
		var pseudo = 0; /* track pseudo token index */
		var caret = 0; /* current character index */
		var format = 0; /* control character formating context */
		var insert = 0; /* auto semicolon insertion */
		var invert = 0; /* inverted selector pattern */
		var length = 0; /* generic length address */
		var eof = body.length; /* end of file(length) */
		var eol = eof - 1; /* end of file(characters) */

		var char = ''; /* current character */
		var chars = ''; /* current buffer of characters */
		var child = ''; /* next buffer of characters */
		var out = ''; /* compiled body */
		var children = ''; /* compiled children */
		var flat = ''; /* compiled leafs */
		var selector; /* generic selector address */
		var result; /* generic address */

		// ...build body
		while (caret < eof) {
			code = body.charCodeAt(caret);

			// eof varient
			if (caret === eol) {
				// last character + noop context, add synthetic padding for noop context to terminate
				if (comment + quote + parentheses + bracket !== 0) {
					if (comment !== 0) {
						code = comment === FOWARDSLASH ? NEWLINE : FOWARDSLASH;
					}

					quote = parentheses = bracket = 0;
					eof++;
					eol++;
				}
			}

			if (comment + quote + parentheses + bracket === 0) {
				// eof varient
				if (caret === eol) {
					if (format > 0) {
						chars = chars.replace(formatptn, '');
					}

					if (chars.trim().length > 0) {
						switch (code) {
							case SPACE:
							case TAB:
							case SEMICOLON:
							case CARRIAGE:
							case NEWLINE:
								{
									break;
								}
							default:
								{
									chars += body.charAt(caret);
								}
						}

						code = SEMICOLON;
					}
				}

				// auto semicolon insertion
				if (insert === 1) {
					switch (code) {
						// false flags
						case OPENBRACES:
						case CLOSEBRACES:
						case SEMICOLON:
						case DOUBLEQUOTE:
						case SINGLEQUOTE:
						case OPENPARENTHESES:
						case CLOSEPARENTHESES:
						case COMMA:
							{
								insert = 0;
							}
						// ignore
						case TAB:
						case CARRIAGE:
						case NEWLINE:
						case SPACE:
							{
								break;
							}
						// valid
						default:
							{
								insert = 0;
								length = caret;
								first = code;
								caret--;
								code = SEMICOLON;

								while (length < eof) {
									switch (body.charCodeAt(length++)) {
										case NEWLINE:
										case CARRIAGE:
										case SEMICOLON:
											{
												++caret;
												code = first;
												length = eof;
												break;
											}
										case COLON:
											{
												if (format > 0) {
													++caret;
													code = first;
												}
											}
										case OPENBRACES:
											{
												length = eof;
											}
									}
								}
							}
					}
				}

				// token varient
				switch (code) {
					case OPENBRACES:
						{
							chars = chars.trim();
							first = chars.charCodeAt(0);
							counter = 1;
							length = ++caret;

							while (caret < eof) {
								switch (code = body.charCodeAt(caret)) {
									case OPENBRACES:
										{
											counter++;
											break;
										}
									case CLOSEBRACES:
										{
											counter--;
											break;
										}
									case FOWARDSLASH:
										{
											switch (second = body.charCodeAt(caret + 1)) {
												// /*, //
												case STAR:
												case FOWARDSLASH:
													{
														caret = delimited(second, caret, eol, body);
													}
											}
											break;
										}
									// given "[" === 91 & "]" === 93 hence forth 91 + 1 + 1 === 93
									case OPENBRACKET:
										{
											code++;
										}
									// given "(" === 40 & ")" === 41 hence forth 40 + 1 === 41
									case OPENPARENTHESES:
										{
											code++;
										}
									// quote tail delimiter is identical to the head delimiter hence noop,
									// fallthrough clauses have been shifted to the correct tail delimiter
									case DOUBLEQUOTE:
									case SINGLEQUOTE:
										{
											while (caret++ < eol) {
												if (body.charCodeAt(caret) === code) {
													break;
												}
											}
										}
								}

								if (counter === 0) {
									break;
								}

								caret++;
							}

							child = body.substring(length, caret);

							if (first === NULL) {
								first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0);
							}

							switch (first) {
								// @at-rule
								case AT:
									{
										if (format > 0) {
											chars = chars.replace(formatptn, '');
										}

										second = chars.charCodeAt(1);

										switch (second) {
											case DOCUMENT:
											case MEDIA:
											case SUPPORTS:
											case DASH:
												{
													selector = current;
													break;
												}
											default:
												{
													selector = array;
												}
										}

										child = compile(current, selector, child, second, depth + 1);
										length = child.length;

										// preserve empty @at-rule
										if (preserve > 0 && length === 0) {
											length = chars.length;
										}

										// execute plugins, @at-rule context
										if (plugged > 0) {
											selector = select(array, chars, invert);
											result = proxy(ATRUL, child, selector, current, line, column, length, second, depth, id);
											chars = selector.join('');

											if (result !== void 0) {
												if ((length = (child = result.trim()).length) === 0) {
													second = 0;
													child = '';
												}
											}
										}

										if (length > 0) {
											switch (second) {
												case SUPPORTS:
													{
														chars = chars.replace(supportsptn, supports);
													}
												case DOCUMENT:
												case MEDIA:
												case DASH:
													{
														child = chars + '{' + child + '}';
														break;
													}
												case KEYFRAME:
													{
														chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''));
														child = chars + '{' + child + '}';

														if (prefix === 1 || prefix === 2 && vendor('@' + child, 3)) {
															child = '@' + webkit + child + '@' + child;
														} else {
															child = '@' + child;
														}
														break;
													}
												default:
													{
														child = chars + child;

														if (id === PAGE) {
															child = (out += child, '');
														}
													}
											}
										} else {
											child = '';
										}

										break;
									}
								// selector
								default:
									{
										child = compile(current, select(current, chars, invert), child, id, depth + 1);
									}
							}

							children += child;

							// reset
							context = 0;
							insert = 0;
							pseudo = 0;
							format = 0;
							invert = 0;
							atrule = 0;
							chars = '';
							child = '';
							code = body.charCodeAt(++caret);
							break;
						}
					case CLOSEBRACES:
					case SEMICOLON:
						{
							chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim();

							if ((length = chars.length) > 1) {
								// monkey-patch missing colon
								if (pseudo === 0) {
									first = chars.charCodeAt(0);

									// first character is a letter or dash, buffer has a space character
									if (first === DASH || first > 96 && first < 123) {
										length = (chars = chars.replace(' ', ':')).length;
									}
								}

								// execute plugins, property context
								if (plugged > 0) {
									if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id, depth, id)) !== void 0) {
										if ((length = (chars = result.trim()).length) === 0) {
											chars = '\0\0';
										}
									}
								}

								first = chars.charCodeAt(0);
								second = chars.charCodeAt(1);

								switch (first) {
									case NULL:
										{
											break;
										}
									case AT:
										{
											if (second === IMPORT || second === CHARSET) {
												flat += chars + body.charAt(caret);
												break;
											}
										}
									default:
										{
											if (chars.charCodeAt(length - 1) === COLON) {
												break;
											}

											out += property(chars, first, second, chars.charCodeAt(2));
										}
								}
							}

							// reset
							context = 0;
							insert = 0;
							pseudo = 0;
							format = 0;
							invert = 0;
							chars = '';
							code = body.charCodeAt(++caret);
							break;
						}
				}
			}

			// parse characters
			switch (code) {
				case CARRIAGE:
				case NEWLINE:
					{
						// auto insert semicolon
						if (comment + quote + parentheses + bracket + semicolon === 0) {
							// valid non-whitespace characters that
							// may precede a newline
							switch (peak) {
								case CLOSEPARENTHESES:
								case SINGLEQUOTE:
								case DOUBLEQUOTE:
								case AT:
								case TILDE:
								case GREATERTHAN:
								case STAR:
								case PLUS:
								case FOWARDSLASH:
								case DASH:
								case COLON:
								case COMMA:
								case SEMICOLON:
								case OPENBRACES:
								case CLOSEBRACES:
									{
										break;
									}
								default:
									{
										// current buffer has a colon
										if (pseudo > 0) {
											insert = 1;
										}
									}
							}
						}

						// terminate line comment
						if (comment === FOWARDSLASH) {
							comment = 0;
						} else if (cascade + context === 0 && id !== KEYFRAME && chars.length > 0) {
							format = 1;
							chars += '\0';
						}

						// execute plugins, newline context
						if (plugged * unkwn > 0) {
							proxy(UNKWN, chars, current, parent, line, column, out.length, id, depth, id);
						}

						// next line, reset column position
						column = 1;
						line++;
						break;
					}
				case SEMICOLON:
				case CLOSEBRACES:
					{
						if (comment + quote + parentheses + bracket === 0) {
							column++;
							break;
						}
					}
				default:
					{
						// increment column position
						column++;

						// current character
						char = body.charAt(caret);

						// remove comments, escape functions, strings, attributes and prepare selectors
						switch (code) {
							case TAB:
							case SPACE:
								{
									if (quote + bracket + comment === 0) {
										switch (tail) {
											case COMMA:
											case COLON:
											case TAB:
											case SPACE:
												{
													char = '';
													break;
												}
											default:
												{
													if (code !== SPACE) {
														char = ' ';
													}
												}
										}
									}
									break;
								}
							// escape breaking control characters
							case NULL:
								{
									char = '\\0';
									break;
								}
							case FORMFEED:
								{
									char = '\\f';
									break;
								}
							case VERTICALTAB:
								{
									char = '\\v';
									break;
								}
							// &
							case AND:
								{
									// inverted selector pattern i.e html &
									if (quote + comment + bracket === 0 && cascade > 0) {
										invert = 1;
										format = 1;
										char = '\f' + char;
									}
									break;
								}
							// ::p<l>aceholder, l
							// :read-on<l>y, l
							case 108:
								{
									if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
										switch (caret - pseudo) {
											// ::placeholder
											case 2:
												{
													if (tail === PLACEHOLDER && body.charCodeAt(caret - 3) === COLON) {
														pattern = tail;
													}
												}
											// :read-only
											case 8:
												{
													if (trail === READONLY) {
														pattern = trail;
													}
												}
										}
									}
									break;
								}
							// :<pattern>
							case COLON:
								{
									if (quote + comment + bracket === 0) {
										pseudo = caret;
									}
									break;
								}
							// selectors
							case COMMA:
								{
									if (comment + parentheses + quote + bracket === 0) {
										format = 1;
										char += '\r';
									}
									break;
								}
							// quotes
							case DOUBLEQUOTE:
							case SINGLEQUOTE:
								{
									if (comment === 0) {
										quote = quote === code ? 0 : quote === 0 ? code : quote;
									}
									break;
								}
							// attributes
							case OPENBRACKET:
								{
									if (quote + comment + parentheses === 0) {
										bracket++;
									}
									break;
								}
							case CLOSEBRACKET:
								{
									if (quote + comment + parentheses === 0) {
										bracket--;
									}
									break;
								}
							// functions
							case CLOSEPARENTHESES:
								{
									if (quote + comment + bracket === 0) {
										parentheses--;
									}
									break;
								}
							case OPENPARENTHESES:
								{
									if (quote + comment + bracket === 0) {
										if (context === 0) {
											switch (tail * 2 + trail * 3) {
												// :matches
												case 533:
													{
														break;
													}
												// :global, :not, :nth-child etc...
												default:
													{
														counter = 0;
														context = 1;
													}
											}
										}

										parentheses++;
									}
									break;
								}
							case AT:
								{
									if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
										atrule = 1;
									}
									break;
								}
							// block/line comments
							case STAR:
							case FOWARDSLASH:
								{
									if (quote + bracket + parentheses > 0) {
										break;
									}

									switch (comment) {
										// initialize line/block comment context
										case 0:
											{
												switch (code * 2 + body.charCodeAt(caret + 1) * 3) {
													// //
													case 235:
														{
															comment = FOWARDSLASH;
															break;
														}
													// /*
													case 220:
														{
															length = caret;
															comment = STAR;
															break;
														}
												}
												break;
											}
										// end block comment context
										case STAR:
											{
												if (code === FOWARDSLASH && tail === STAR && length + 2 !== caret) {
													// /*<!> ... */, !
													if (body.charCodeAt(length + 2) === 33) {
														out += body.substring(length, caret + 1);
													}
													char = '';
													comment = 0;
												}
											}
									}
								}
						}

						// ignore comment blocks
						if (comment === 0) {
							// aggressive isolation mode, divide each individual selector
							// including selectors in :not function but excluding selectors in :global function
							if (cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON) {
								switch (code) {
									case COMMA:
									case TILDE:
									case GREATERTHAN:
									case PLUS:
									case CLOSEPARENTHESES:
									case OPENPARENTHESES:
										{
											if (context === 0) {
												// outside of an isolated context i.e nth-child(<...>)
												switch (tail) {
													case TAB:
													case SPACE:
													case NEWLINE:
													case CARRIAGE:
														{
															char = char + '\0';
															break;
														}
													default:
														{
															char = '\0' + char + (code === COMMA ? '' : '\0');
														}
												}
												format = 1;
											} else {
												// within an isolated context, sleep untill it's terminated
												switch (code) {
													case OPENPARENTHESES:
														{
															// :globa<l>(
															if (pseudo + 7 === caret && tail === 108) {
																pseudo = 0;
															}
															context = ++counter;
															break;
														}
													case CLOSEPARENTHESES:
														{
															if ((context = --counter) === 0) {
																format = 1;
																char += '\0';
															}
															break;
														}
												}
											}
											break;
										}
									case TAB:
									case SPACE:
										{
											switch (tail) {
												case NULL:
												case OPENBRACES:
												case CLOSEBRACES:
												case SEMICOLON:
												case COMMA:
												case FORMFEED:
												case TAB:
												case SPACE:
												case NEWLINE:
												case CARRIAGE:
													{
														break;
													}
												default:
													{
														// ignore in isolated contexts
														if (context === 0) {
															format = 1;
															char += '\0';
														}
													}
											}
										}
								}
							}

							// concat buffer of characters
							chars += char;

							// previous non-whitespace character code
							if (code !== SPACE && code !== TAB) {
								peak = code;
							}
						}
					}
			}

			// tail character codes
			trail = tail;
			tail = code;

			// visit every character
			caret++;
		}

		length = out.length;

		// preserve empty selector
		if (preserve > 0) {
			if (length === 0 && children.length === 0 && current[0].length === 0 === false) {
				if (id !== MEDIA || current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0]) {
					length = current.join(',').length + 2;
				}
			}
		}

		if (length > 0) {
			// cascade isolation mode?
			selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current;

			// execute plugins, block context
			if (plugged > 0) {
				result = proxy(BLCKS, out, selector, parent, line, column, length, id, depth, id);

				if (result !== void 0 && (out = result).length === 0) {
					return flat + out + children;
				}
			}

			out = selector.join(',') + '{' + out + '}';

			if (prefix * pattern !== 0) {
				if (prefix === 2 && !vendor(out, 2)) pattern = 0;

				switch (pattern) {
					// ::read-only
					case READONLY:
						{
							out = out.replace(readonlyptn, ':' + moz + '$1') + out;
							break;
						}
					// ::placeholder
					case PLACEHOLDER:
						{
							out = out.replace(plcholdrptn, '::' + webkit + 'input-$1') + out.replace(plcholdrptn, '::' + moz + '$1') + out.replace(plcholdrptn, ':' + ms + 'input-$1') + out;
							break;
						}
				}

				pattern = 0;
			}
		}

		return flat + out + children;
	}

	/**
  * Select
  *
  * @param {Array<string>} parent
  * @param {string} current
  * @param {number} invert
  * @return {Array<string>}
  */
	function select(parent, current, invert) {
		var selectors = current.trim().split(selectorptn);
		var out = selectors;

		var length = selectors.length;
		var l = parent.length;

		switch (l) {
			// 0-1 parent selectors
			case 0:
			case 1:
				{
					for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
						out[i] = scope(selector, out[i], invert, l).trim();
					}
					break;
				}
			// >2 parent selectors, nested
			default:
				{
					for (var i = 0, j = 0, out = []; i < length; ++i) {
						for (var k = 0; k < l; ++k) {
							out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim();
						}
					}
				}
		}

		return out;
	}

	/**
  * Scope
  *
  * @param {string} parent
  * @param {string} current
  * @param {number} invert
  * @param {number} level
  * @return {string}
  */
	function scope(parent, current, invert, level) {
		var selector = current;
		var code = selector.charCodeAt(0);

		// trim leading whitespace
		if (code < 33) {
			code = (selector = selector.trim()).charCodeAt(0);
		}

		switch (code) {
			// &
			case AND:
				{
					switch (cascade + level) {
						case 0:
						case 1:
							{
								if (parent.trim().length === 0) {
									break;
								}
							}
						default:
							{
								return selector.replace(andptn, '$1' + parent.trim());
							}
					}
					break;
				}
			// :
			case COLON:
				{
					switch (selector.charCodeAt(1)) {
						// g in :global
						case 103:
							{
								if (escape > 0 && cascade > 0) {
									return selector.replace(escapeptn, '$1').replace(andptn, '$1' + nscope);
								}
								break;
							}
						default:
							{
								// :hover
								return parent.trim() + selector.replace(andptn, '$1' + parent.trim());
							}
					}
				}
			default:
				{
					// html &
					if (invert * cascade > 0 && selector.indexOf('\f') > 0) {
						return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1') + parent.trim());
					}
				}
		}

		return parent + selector;
	}

	/**
  * Property
  *
  * @param {string} input
  * @param {number} first
  * @param {number} second
  * @param {number} third
  * @return {string}
  */
	function property(input, first, second, third) {
		var index = 0;
		var out = input + ';';
		var hash = first * 2 + second * 3 + third * 4;
		var cache;

		// animation: a, n, i characters
		if (hash === 944) {
			return animation(out);
		} else if (prefix === 0 || prefix === 2 && !vendor(out, 1)) {
			return out;
		}

		// vendor prefix
		switch (hash) {
			// text-decoration/text-size-adjust/text-shadow/text-align/text-transform: t, e, x
			case 1015:
				{
					// text-shadow/text-align/text-transform, a
					return out.charCodeAt(10) === 97 ? webkit + out + out : out;
				}
			// filter/fill f, i, l
			case 951:
				{
					// filter, t
					return out.charCodeAt(3) === 116 ? webkit + out + out : out;
				}
			// color/column, c, o, l
			case 963:
				{
					// column, n
					return out.charCodeAt(5) === 110 ? webkit + out + out : out;
				}
			// box-decoration-break, b, o, x
			case 1009:
				{
					if (out.charCodeAt(4) !== 100) {
						break;
					}
				}
			// mask, m, a, s
			// clip-path, c, l, i
			case 969:
			case 942:
				{
					return webkit + out + out;
				}
			// appearance: a, p, p
			case 978:
				{
					return webkit + out + moz + out + out;
				}
			// hyphens: h, y, p
			// user-select: u, s, e
			case 1019:
			case 983:
				{
					return webkit + out + moz + out + ms + out + out;
				}
			// background/backface-visibility, b, a, c
			case 883:
				{
					// backface-visibility, -
					if (out.charCodeAt(8) === DASH) {
						return webkit + out + out;
					}

					// image-set(...)
					if (out.indexOf('image-set(', 11) > 0) {
						return out.replace(imgsrcptn, '$1' + webkit + '$2') + out;
					}

					return out;
				}
			// flex: f, l, e
			case 932:
				{
					if (out.charCodeAt(4) === DASH) {
						switch (out.charCodeAt(5)) {
							// flex-grow, g
							case 103:
								{
									return webkit + 'box-' + out.replace('-grow', '') + webkit + out + ms + out.replace('grow', 'positive') + out;
								}
							// flex-shrink, s
							case 115:
								{
									return webkit + out + ms + out.replace('shrink', 'negative') + out;
								}
							// flex-basis, b
							case 98:
								{
									return webkit + out + ms + out.replace('basis', 'preferred-size') + out;
								}
						}
					}

					return webkit + out + ms + out + out;
				}
			// order: o, r, d
			case 964:
				{
					return webkit + out + ms + 'flex' + '-' + out + out;
				}
			// justify-items/justify-content, j, u, s
			case 1023:
				{
					// justify-content, c
					if (out.charCodeAt(8) !== 99) {
						break;
					}

					cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
					return webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out;
				}
			// cursor, c, u, r
			case 1005:
				{
					return cursorptn.test(out) ? out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out : out;
				}
			// writing-mode, w, r, i
			case 1000:
				{
					cache = out.substring(13).trim();
					index = cache.indexOf('-') + 1;

					switch (cache.charCodeAt(0) + cache.charCodeAt(index)) {
						// vertical-lr
						case 226:
							{
								cache = out.replace(writingptn, 'tb');
								break;
							}
						// vertical-rl
						case 232:
							{
								cache = out.replace(writingptn, 'tb-rl');
								break;
							}
						// horizontal-tb
						case 220:
							{
								cache = out.replace(writingptn, 'lr');
								break;
							}
						default:
							{
								return out;
							}
					}

					return webkit + out + ms + cache + out;
				}
			// position: sticky
			case 1017:
				{
					if (out.indexOf('sticky', 9) === -1) {
						return out;
					}
				}
			// display(flex/inline-flex/inline-box): d, i, s
			case 975:
				{
					index = (out = input).length - 10;
					cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim();

					switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7) | 0)) {
						// inline-
						case 203:
							{
								// inline-box
								if (cache.charCodeAt(8) < 111) {
									break;
								}
							}
						// inline-box/sticky
						case 115:
							{
								out = out.replace(cache, webkit + cache) + ';' + out;
								break;
							}
						// inline-flex
						// flex
						case 207:
						case 102:
							{
								out = out.replace(cache, webkit + (hash > 102 ? 'inline-' : '') + 'box') + ';' + out.replace(cache, webkit + cache) + ';' + out.replace(cache, ms + cache + 'box') + ';' + out;
							}
					}

					return out + ';';
				}
			// align-items, align-center, align-self: a, l, i, -
			case 938:
				{
					if (out.charCodeAt(5) === DASH) {
						switch (out.charCodeAt(6)) {
							// align-items, i
							case 105:
								{
									cache = out.replace('-items', '');
									return webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out;
								}
							// align-self, s
							case 115:
								{
									return webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out;
								}
							// align-content
							default:
								{
									return webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '').replace(selfptn, '') + out;
								}
						}
					}
					break;
				}
			// min/max
			case 973:
			case 989:
				{
					// min-/max- height/width/block-size/inline-size
					if (out.charCodeAt(3) !== DASH || out.charCodeAt(4) === 122) {
						break;
					}
				}
			// height/width: min-content / width: max-content
			case 931:
			case 953:
				{
					if (dimensionptn.test(input) === true) {
						// stretch
						if ((cache = input.substring(input.indexOf(':') + 1)).charCodeAt(0) === 115) return property(input.replace('stretch', 'fill-available'), first, second, third).replace(':fill-available', ':stretch');else return out.replace(cache, webkit + cache) + out.replace(cache, moz + cache.replace('fill-', '')) + out;
					}
					break;
				}
			// transform, transition: t, r, a
			case 962:
				{
					out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out;

					// transitions
					if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
						return out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out;
					}

					break;
				}
		}

		return out;
	}

	/**
  * Vendor
  *
  * @param {string} content
  * @param {number} context
  * @return {boolean}
  */
	function vendor(content, context) {
		var index = content.indexOf(context === 1 ? ':' : '{');
		var key = content.substring(0, context !== 3 ? index : 10);
		var value = content.substring(index + 1, content.length - 1);

		return should(context !== 2 ? key : key.replace(pseudofmt, '$1'), value, context);
	}

	/**
  * Supports
  *
  * @param {string} match
  * @param {string} group
  * @return {string}
  */
	function supports(match, group) {
		var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2));

		return out !== group + ';' ? out.replace(propertyptn, ' or ($1)').substring(4) : '(' + group + ')';
	}

	/**
  * Animation
  *
  * @param {string} input
  * @return {string}
  */
	function animation(input) {
		var length = input.length;
		var index = input.indexOf(':', 9) + 1;
		var declare = input.substring(0, index).trim();
		var out = input.substring(index, length - 1).trim();

		switch (input.charCodeAt(9) * keyed) {
			case 0:
				{
					break;
				}
			// animation-*, -
			case DASH:
				{
					// animation-name, n
					if (input.charCodeAt(10) !== 110) {
						break;
					}
				}
			// animation/animation-name
			default:
				{
					// split in case of multiple animations
					var list = out.split((out = '', animationptn));

					for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
						var value = list[i];
						var items = value.split(propertiesptn);

						while (value = items[index]) {
							var peak = value.charCodeAt(0);

							if (keyed === 1 && (
							// letters
							peak > AT && peak < 90 || peak > 96 && peak < 123 || peak === UNDERSCORE ||
							// dash but not in sequence i.e --
							peak === DASH && value.charCodeAt(1) !== DASH)) {
								// not a number/function
								switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
									case 1:
										{
											switch (value) {
												// not a valid reserved keyword
												case 'infinite':case 'alternate':case 'backwards':case 'running':
												case 'normal':case 'forwards':case 'both':case 'none':case 'linear':
												case 'ease':case 'ease-in':case 'ease-out':case 'ease-in-out':
												case 'paused':case 'reverse':case 'alternate-reverse':case 'inherit':
												case 'initial':case 'unset':case 'step-start':case 'step-end':
													{
														break;
													}
												default:
													{
														value += key;
													}
											}
										}
								}
							}

							items[index++] = value;
						}

						out += (i === 0 ? '' : ',') + items.join(' ');
					}
				}
		}

		out = declare + out + ';';

		if (prefix === 1 || prefix === 2 && vendor(out, 1)) return webkit + out + out;

		return out;
	}

	/**
  * Isolate
  *
  * @param {Array<string>} current
  */
	function isolate(current) {
		for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
			// split individual elements in a selector i.e h1 h2 === [h1, h2]
			var elements = current[i].split(elementptn);
			var out = '';

			for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
				// empty element
				if ((size = (element = elements[j]).length) === 0 && l > 1) {
					continue;
				}

				tail = out.charCodeAt(out.length - 1);
				code = element.charCodeAt(0);
				padding = '';

				if (j !== 0) {
					// determine if we need padding
					switch (tail) {
						case STAR:
						case TILDE:
						case GREATERTHAN:
						case PLUS:
						case SPACE:
						case OPENPARENTHESES:
							{
								break;
							}
						default:
							{
								padding = ' ';
							}
					}
				}

				switch (code) {
					case AND:
						{
							element = padding + nscopealt;
						}
					case TILDE:
					case GREATERTHAN:
					case PLUS:
					case SPACE:
					case CLOSEPARENTHESES:
					case OPENPARENTHESES:
						{
							break;
						}
					case OPENBRACKET:
						{
							element = padding + element + nscopealt;
							break;
						}
					case COLON:
						{
							switch (element.charCodeAt(1) * 2 + element.charCodeAt(2) * 3) {
								// :global
								case 530:
									{
										if (escape > 0) {
											element = padding + element.substring(8, size - 1);
											break;
										}
									}
								// :hover, :nth-child(), ...
								default:
									{
										if (j < 1 || elements[j - 1].length < 1) {
											element = padding + nscopealt + element;
										}
									}
							}
							break;
						}
					case COMMA:
						{
							padding = '';
						}
					default:
						{
							if (size > 1 && element.indexOf(':') > 0) {
								element = padding + element.replace(pseudoptn, '$1' + nscopealt + '$2');
							} else {
								element = padding + element + nscopealt;
							}
						}
				}

				out += element;
			}

			selector[i] = out.replace(formatptn, '').trim();
		}

		return selector;
	}

	/**
  * Proxy
  *
  * @param {number} context
  * @param {string} content
  * @param {Array<string>} selectors
  * @param {Array<string>} parents
  * @param {number} line
  * @param {number} column
  * @param {number} length
  * @param {number} id
  * @param {number} depth
  * @param {number} at
  * @return {(string|void|*)}
  */
	function proxy(context, content, selectors, parents, line, column, length, id, depth, at) {
		for (var i = 0, out = content, next; i < plugged; ++i) {
			switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id, depth, at)) {
				case void 0:
				case false:
				case true:
				case null:
					{
						break;
					}
				default:
					{
						out = next;
					}
			}
		}
		if (out !== content) {
			return out;
		}
	}

	/**
  * @param {number} code
  * @param {number} index
  * @param {number} length
  * @param {string} body
  * @return {number}
  */
	function delimited(code, index, length, body) {
		for (var i = index + 1; i < length; ++i) {
			switch (body.charCodeAt(i)) {
				// /*
				case FOWARDSLASH:
					{
						if (code === STAR) {
							if (body.charCodeAt(i - 1) === STAR && index + 2 !== i) {
								return i + 1;
							}
						}
						break;
					}
				// //
				case NEWLINE:
					{
						if (code === FOWARDSLASH) {
							return i + 1;
						}
					}
			}
		}

		return i;
	}

	/**
  * @param {number} type
  * @param {number} index
  * @param {number} length
  * @param {number} find
  * @param {string} body
  * @return {number}
  */
	function match(type, index, length, body) {
		for (var i = index + 1; i < length; ++i) {
			switch (body.charCodeAt(i)) {
				case type:
					{
						return i;
					}
			}
		}

		return i;
	}

	/**
  * Minify
  *
  * @param {(string|*)} output
  * @return {string}
  */
	function minify(output) {
		return output.replace(formatptn, '').replace(beforeptn, '').replace(afterptn, '$1').replace(tailptn, '$1').replace(whiteptn, ' ');
	}

	/**
  * Use
  *
  * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
  */
	function use(plugin) {
		switch (plugin) {
			case void 0:
			case null:
				{
					plugged = plugins.length = 0;
					break;
				}
			default:
				{
					if (typeof plugin === 'function') {
						plugins[plugged++] = plugin;
					} else if (typeof plugin === 'object') {
						for (var i = 0, length = plugin.length; i < length; ++i) {
							use(plugin[i]);
						}
					} else {
						unkwn = !!plugin | 0;
					}
				}
		}

		return use;
	}

	/**
  * Set
  *
  * @param {*} options
  */
	function set(options) {
		for (var name in options) {
			var value = options[name];
			switch (name) {
				case 'keyframe':
					keyed = value | 0;break;
				case 'global':
					escape = value | 0;break;
				case 'cascade':
					cascade = value | 0;break;
				case 'compress':
					compress = value | 0;break;
				case 'semicolon':
					semicolon = value | 0;break;
				case 'preserve':
					preserve = value | 0;break;
				case 'prefix':
					should = null;

					if (!value) {
						prefix = 0;
					} else if (typeof value !== 'function') {
						prefix = 1;
					} else {
						prefix = 2;
						should = value;
					}
			}
		}

		return set;
	}

	/**
  * Stylis
  *
  * @param {string} selector
  * @param {string} input
  * @return {*}
  */
	function stylis(selector, input) {
		if (this !== void 0 && this.constructor === stylis) {
			return factory(selector);
		}

		// setup
		var ns = selector;
		var code = ns.charCodeAt(0);

		// trim leading whitespace
		if (code < 33) {
			code = (ns = ns.trim()).charCodeAt(0);
		}

		// keyframe/animation namespace
		if (keyed > 0) {
			key = ns.replace(invalidptn, code === OPENBRACKET ? '' : '-');
		}

		// reset, used to assert if a plugin is moneky-patching the return value
		code = 1;

		// cascade/isolate
		if (cascade === 1) {
			nscope = ns;
		} else {
			nscopealt = ns;
		}

		var selectors = [nscope];
		var result;

		// execute plugins, pre-process context
		if (plugged > 0) {
			result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0, 0, 0);

			if (result !== void 0 && typeof result === 'string') {
				input = result;
			}
		}

		// build
		var output = compile(array, selectors, input, 0, 0);

		// execute plugins, post-process context
		if (plugged > 0) {
			result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0, 0, 0);

			// bypass minification
			if (result !== void 0 && typeof (output = result) !== 'string') {
				code = 0;
			}
		}

		// reset
		key = '';
		nscope = '';
		nscopealt = '';
		pattern = 0;
		line = 1;
		column = 1;

		return compress * code === 0 ? output : minify(output);
	}

	stylis['use'] = use;
	stylis['set'] = set;

	if (options !== void 0) {
		set(options);
	}

	return stylis;
});

/***/ }),

/***/ "a5Pq":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ecbe6deaaaef40d480cfa8e7952c2b4a.png";

/***/ }),

/***/ "dabo":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"MapWrapper":"MapWrapper__3gG48","close":"close__2p9k9","Map":"Map__lNODB"};

/***/ }),

/***/ "eGuX":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "74ba314e88cf1ea8c585b1d36e042287.svg";

/***/ }),

/***/ "eW0v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ../node_modules/prop-types/index.js
var prop_types = __webpack_require__("5D9O");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// CONCATENATED MODULE: ../node_modules/preact-context/dist/esm/context-value-emitter.js
function createEmitter(initialValue, bitmaskFactory) {
    var registeredUpdaters = [];
    var value = initialValue;
    var diff = function diff(newValue) {
        return bitmaskFactory(value, newValue) | 0;
    };
    return {
        register: function register(updater) {
            registeredUpdaters.push(updater);
            updater(value, diff(value));
        },
        unregister: function unregister(updater) {
            registeredUpdaters = registeredUpdaters.filter(function (i) {
                return i !== updater;
            });
        },
        val: function val(newValue) {
            if (newValue === undefined || newValue == value) {
                return value;
            }
            var bitmask = diff(newValue);
            value = newValue;
            registeredUpdaters.forEach(function (up) {
                return up(newValue, bitmask);
            });
            return value;
        }
    };
}
var noopEmitter = {
    register: function register(_) {
        console.warn("Consumer used without a Provider");
    },
    unregister: function unregister(_) {
        // do nothing
    },
    val: function val(_) {
        //do nothing;
    }
};
// CONCATENATED MODULE: ../node_modules/preact-context/dist/esm/utils.js
/*
 * Extracts the children from the props and returns an object containing the
 * only element of the given array (preact always passes children as an array)
 * or null otherwise. The result contains always a reference to the original
 * array of children
 *
 * @param {RenderableProps<*>} props - the component's properties
 * @return {{ child: JSX.Element | null, children: JSX.Element[]}}
 */
function getOnlyChildAndChildren(props) {
  var children = props.children;
  var child = children.length === 1 ? children[0] : null;
  return { child: child, children: children };
}
// CONCATENATED MODULE: ../node_modules/preact-context/dist/esm/context.js
var __extends = this && this.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();



function getRenderer(props) {
    var child = getOnlyChildAndChildren(props).child;
    // TODO: "render" in props check is only done to make TS happy
    return child || "render" in props && props.render;
}
var MAX_SIGNED_31_BIT_INT = 1073741823;
var defaultBitmaskFactory = function defaultBitmaskFactory() {
    return MAX_SIGNED_31_BIT_INT;
};
var ids = 0;
function _createContext(value, bitmaskFactory) {
    var key = "_preactContextProvider-" + ids++;
    var Provider = /** @class */function (_super) {
        __extends(Provider, _super);
        function Provider(props) {
            var _this = _super.call(this, props) || this;
            _this._emitter = createEmitter(props.value, bitmaskFactory || defaultBitmaskFactory);
            return _this;
        }
        Provider.prototype.getChildContext = function () {
            var _a;
            return _a = {}, _a[key] = this._emitter, _a;
        };
        Provider.prototype.componentDidUpdate = function () {
            this._emitter.val(this.props.value);
        };
        Provider.prototype.render = function () {
            var _a = getOnlyChildAndChildren(this.props),
                child = _a.child,
                children = _a.children;
            if (child) {
                return child;
            }
            // preact does not support fragments,
            // therefore we wrap the children in a span
            return Object(preact_min["h"])("span", null, children);
        };
        return Provider;
    }(preact_min["Component"]);
    var Consumer = /** @class */function (_super) {
        __extends(Consumer, _super);
        function Consumer(props, ctx) {
            var _this = _super.call(this, props, ctx) || this;
            _this._updateContext = function (value, bitmask) {
                var unstable_observedBits = _this.props.unstable_observedBits;
                var observed = unstable_observedBits === undefined || unstable_observedBits === null ? MAX_SIGNED_31_BIT_INT : unstable_observedBits;
                observed = observed | 0;
                if ((observed & bitmask) === 0) {
                    return;
                }
                _this.setState({ value: value });
            };
            _this.state = { value: _this._getEmitter().val() || value };
            return _this;
        }
        Consumer.prototype.componentDidMount = function () {
            this._getEmitter().register(this._updateContext);
        };
        Consumer.prototype.shouldComponentUpdate = function (nextProps, nextState) {
            return this.state.value !== nextState.value || getRenderer(this.props) !== getRenderer(nextProps);
        };
        Consumer.prototype.componentWillUnmount = function () {
            this._getEmitter().unregister(this._updateContext);
        };
        Consumer.prototype.componentDidUpdate = function (_, __, prevCtx) {
            var previousProvider = prevCtx[key];
            if (previousProvider === this.context[key]) {
                return;
            }
            (previousProvider || noopEmitter).unregister(this._updateContext);
            this.componentDidMount();
        };
        Consumer.prototype.render = function () {
            // TODO: "render" in props check is only done to make TS happy
            var render = "render" in this.props && this.props.render;
            var r = getRenderer(this.props);
            if (render && render !== r) {
                console.warn("Both children and a render function are defined. Children will be used");
            }
            if (typeof r === "function") {
                return r(this.state.value);
            }
            console.warn("Consumer is expecting a function as one and only child but didn't find any");
        };
        Consumer.prototype._getEmitter = function () {
            return this.context[key] || noopEmitter;
        };
        return Consumer;
    }(preact_min["Component"]);
    return {
        Provider: Provider,
        Consumer: Consumer
    };
}
// named and default export in order to have less problems with bundlers
/* harmony default export */ var esm_context = (_createContext);
var createContext = _createContext;
// CONCATENATED MODULE: ../node_modules/preact-compat/dist/preact-compat.es.js
/* unused harmony export version */
/* unused harmony export DOM */
/* unused harmony export Children */
/* unused harmony export render */
/* unused harmony export hydrate */
/* unused harmony export createClass */
/* unused harmony export createPortal */
/* unused harmony export createFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return cloneElement$1; });
/* unused harmony export isValidElement */
/* unused harmony export findDOMNode */
/* unused harmony export unmountComponentAtNode */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Component$1; });
/* unused harmony export PureComponent */
/* unused harmony export unstable_renderSubtreeIntoContainer */
/* unused harmony export unstable_batchedUpdates */
/* unused harmony export __spread */
/* unused concated harmony import PropTypes */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return prop_types_default.a; });
/* unused concated harmony import createRef */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return preact_min["createRef"]; });
/* unused concated harmony import createContext */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return createContext; });







var version = '15.1.0'; // trick libraries to think we are react

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = typeof Symbol !== 'undefined' && Symbol.for && Symbol.for('react.element') || 0xeac7;

var COMPONENT_WRAPPER_KEY = typeof Symbol !== 'undefined' && Symbol.for ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};

var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/;

var BYPASS_HOOK = {};

/*global process*/
var DEV = false;
try {
	DEV = "production" !== 'production';
} catch (e) {}

// a component that renders nothing. Used to replace components for unmountComponentAtNode.
function EmptyComponent() {
	return null;
}

// make react think we're react.
var VNode = Object(preact_min["h"])('a', null).constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
VNode.prototype.preactCompatUpgraded = false;
VNode.prototype.preactCompatNormalized = false;

Object.defineProperty(VNode.prototype, 'type', {
	get: function get() {
		return this.nodeName;
	},
	set: function set(v) {
		this.nodeName = v;
	},
	configurable: true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function get() {
		return this.attributes;
	},
	set: function set(v) {
		this.attributes = v;
	},
	configurable: true
});

var oldEventHook = preact_min["options"].event;
preact_min["options"].event = function (e) {
	if (oldEventHook) {
		e = oldEventHook(e);
	}
	e.persist = Object;
	e.nativeEvent = e;
	return e;
};

var oldVnodeHook = preact_min["options"].vnode;
preact_min["options"].vnode = function (vnode) {
	if (!vnode.preactCompatUpgraded) {
		vnode.preactCompatUpgraded = true;

		var tag = vnode.nodeName,
		    attrs = vnode.attributes = vnode.attributes == null ? {} : extend({}, vnode.attributes);

		if (typeof tag === 'function') {
			if (tag[COMPONENT_WRAPPER_KEY] === true || tag.prototype && 'isReactComponent' in tag.prototype) {
				if (vnode.children && String(vnode.children) === '') {
					vnode.children = undefined;
				}
				if (vnode.children) {
					attrs.children = vnode.children;
				}

				if (!vnode.preactCompatNormalized) {
					normalizeVNode(vnode);
				}
				handleComponentVNode(vnode);
			}
		} else {
			if (vnode.children && String(vnode.children) === '') {
				vnode.children = undefined;
			}
			if (vnode.children) {
				attrs.children = vnode.children;
			}

			if (attrs.defaultValue) {
				if (!attrs.value && attrs.value !== 0) {
					attrs.value = attrs.defaultValue;
				}
				delete attrs.defaultValue;
			}

			handleElementVNode(vnode, attrs);
		}
	}

	if (oldVnodeHook) {
		oldVnodeHook(vnode);
	}
};

function handleComponentVNode(vnode) {
	var tag = vnode.nodeName,
	    a = vnode.attributes;

	vnode.attributes = {};
	if (tag.defaultProps) {
		extend(vnode.attributes, tag.defaultProps);
	}
	if (a) {
		extend(vnode.attributes, a);
	}
}

function handleElementVNode(vnode, a) {
	var shouldSanitize, attrs, i;
	if (a) {
		for (i in a) {
			if (shouldSanitize = CAMEL_PROPS.test(i)) {
				break;
			}
		}
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i] = a[i];
				}
			}
		}
	}
}

// proxy render() since React returns a Component reference.
function render$1(vnode, parent, callback) {
	var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

	// ignore impossible previous renders
	if (prev && prev.parentNode !== parent) {
		prev = null;
	}

	// default to first Element child
	if (!prev && parent) {
		prev = parent.firstElementChild;
	}

	// remove unaffected siblings
	for (var i = parent.childNodes.length; i--;) {
		if (parent.childNodes[i] !== prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = Object(preact_min["render"])(vnode, parent, prev);
	if (parent) {
		parent._preactCompatRendered = out && (out._component || { base: out });
	}
	if (typeof callback === 'function') {
		callback();
	}
	return out && out._component || out;
}

var ContextProvider = function ContextProvider() {};

ContextProvider.prototype.getChildContext = function () {
	return this.props.context;
};
ContextProvider.prototype.render = function (props) {
	return props.children[0];
};

function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	var wrap = Object(preact_min["h"])(ContextProvider, { context: parentComponent.context }, vnode);
	var renderContainer = render$1(wrap, container);
	var component = renderContainer._component || renderContainer.base;
	if (callback) {
		callback.call(component, renderContainer);
	}
	return component;
}

function Portal(props) {
	renderSubtreeIntoContainer(this, props.vnode, props.container);
}

function createPortal(vnode, container) {
	return Object(preact_min["h"])(Portal, { vnode: vnode, container: container });
}

function unmountComponentAtNode(container) {
	var existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode === container) {
		Object(preact_min["render"])(Object(preact_min["h"])(EmptyComponent), container, existing);
		return true;
	}
	return false;
}

var ARR = [];

// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
	map: function map(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		return children.map(fn);
	},
	forEach: function forEach(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		children.forEach(fn);
	},
	count: function count(children) {
		return children && children.length || 0;
	},
	only: function only(children) {
		children = Children.toArray(children);
		if (children.length !== 1) {
			throw new Error('Children.only() expects only one child.');
		}
		return children[0];
	},
	toArray: function toArray(children) {
		if (children == null) {
			return [];
		}
		return ARR.concat(children);
	}
};

/** Track current render() component for ref assignment */
var currentComponent;

function createFactory(type) {
	return createElement.bind(null, type);
}

var DOM = {};
for (var preact_compat_es_i = ELEMENTS.length; preact_compat_es_i--;) {
	DOM[ELEMENTS[preact_compat_es_i]] = createFactory(ELEMENTS[preact_compat_es_i]);
}

function upgradeToVNodes(arr, offset) {
	for (var i = offset || 0; i < arr.length; i++) {
		var obj = arr[i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		} else if (obj && typeof obj === 'object' && !isValidElement(obj) && (obj.props && obj.type || obj.attributes && obj.nodeName || obj.children)) {
			arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c === 'function' && !(c.prototype && c.prototype.render);
}

// wraps stateless functional components in a PropTypes validator
function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render: function render() {
			return WrappedComponent(this.props, this.context);
		}
	});
}

function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) {
		return Wrapped === true ? Ctor : Wrapped;
	}

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable: true, value: true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable: true, value: Wrapped });

	return Wrapped;
}

function createElement() {
	var args = [],
	    len = arguments.length;
	while (len--) {
		args[len] = arguments[len];
	}upgradeToVNodes(args, 2);
	return normalizeVNode(preact_min["h"].apply(void 0, args));
}

function normalizeVNode(vnode) {
	vnode.preactCompatNormalized = true;

	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes.ref,
	    type = ref && typeof ref;
	if (currentComponent && (type === 'string' || type === 'number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}

function cloneElement$1(element, props) {
	var children = [],
	    len = arguments.length - 2;
	while (len-- > 0) {
		children[len] = arguments[len + 2];
	}if (!isValidElement(element)) {
		return element;
	}
	var elementProps = element.attributes || element.props;
	var node = Object(preact_min["h"])(element.nodeName || element.type, extend({}, elementProps), element.children || elementProps && elementProps.children);
	// Only provide the 3rd argument if needed.
	// Arguments 3+ overwrite element.children in preactCloneElement
	var cloneArgs = [node, props];
	if (children && children.length) {
		cloneArgs.push(children);
	} else if (props && props.children) {
		cloneArgs.push(props.children);
	}
	return normalizeVNode(preact_min["cloneElement"].apply(void 0, cloneArgs));
}

function isValidElement(element) {
	return element && (element instanceof VNode || element.$$typeof === REACT_ELEMENT_TYPE);
}

function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved === null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}

function applyEventNormalization(ref) {
	var nodeName = ref.nodeName;
	var attributes = ref.attributes;

	if (!attributes || typeof nodeName !== 'string') {
		return;
	}
	var props = {};
	for (var i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (props.onchange && (nodeName === 'textarea' || nodeName.toLowerCase() === 'input' && !/^fil|che|rad/i.test(attributes.type))) {
		var normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}

function applyClassName(vnode) {
	var a = vnode.attributes || (vnode.attributes = {});
	classNameDescriptor.enumerable = 'className' in a;
	if (a.className) {
		a.class = a.className;
	}
	Object.defineProperty(a, 'className', classNameDescriptor);
}

var classNameDescriptor = {
	configurable: true,
	get: function get() {
		return this.class;
	},
	set: function set(v) {
		this.class = v;
	}
};

function extend(base, props) {
	var arguments$1 = arguments;

	for (var i = 1, obj = void 0; i < arguments.length; i++) {
		if (obj = arguments$1[i]) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					base[key] = obj[key];
				}
			}
		}
	}
	return base;
}

function shallowDiffers(a, b) {
	for (var i in a) {
		if (!(i in b)) {
			return true;
		}
	}
	for (var i$1 in b) {
		if (a[i$1] !== b[i$1]) {
			return true;
		}
	}
	return false;
}

function findDOMNode(component) {
	return component && (component.base || component.nodeType === 1 && component) || null;
}

function F() {}

function createClass(obj) {
	function cl(props, context) {
		bindAll(this);
		Component$1.call(this, props, context, BYPASS_HOOK);
		newComponentHook.call(this, props, context);
	}

	obj = extend({ constructor: cl }, obj);

	// We need to apply mixins here so that getDefaultProps is correctly mixed
	if (obj.mixins) {
		applyMixins(obj, collateMixins(obj.mixins));
	}
	if (obj.statics) {
		extend(cl, obj.statics);
	}
	if (obj.propTypes) {
		cl.propTypes = obj.propTypes;
	}
	if (obj.defaultProps) {
		cl.defaultProps = obj.defaultProps;
	}
	if (obj.getDefaultProps) {
		cl.defaultProps = obj.getDefaultProps.call(cl);
	}

	F.prototype = Component$1.prototype;
	cl.prototype = extend(new F(), obj);

	cl.displayName = obj.displayName || 'Component';

	return cl;
}

// Flatten an Array of mixins to a map of method name to mixin implementations
function collateMixins(mixins) {
	var keyed = {};
	for (var i = 0; i < mixins.length; i++) {
		var mixin = mixins[i];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
				(keyed[key] || (keyed[key] = [])).push(mixin[key]);
			}
		}
	}
	return keyed;
}

// apply a mapping of Arrays of mixin methods to a component prototype
function applyMixins(proto, mixins) {
	for (var key in mixins) {
		if (mixins.hasOwnProperty(key)) {
			proto[key] = multihook(mixins[key].concat(proto[key] || ARR), key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext');
		}
	}
}

function bindAll(ctx) {
	for (var i in ctx) {
		var v = ctx[i];
		if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
			(ctx[i] = v.bind(ctx)).__bound = true;
		}
	}
}

function callMethod(ctx, m, args) {
	if (typeof m === 'string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m === 'function') {
		return m.apply(ctx, args);
	}
}

function multihook(hooks, skipDuplicates) {
	return function () {
		var arguments$1 = arguments;
		var this$1 = this;

		var ret;
		for (var i = 0; i < hooks.length; i++) {
			var r = callMethod(this$1, hooks[i], arguments$1);

			if (skipDuplicates && r != null) {
				if (!ret) {
					ret = {};
				}
				for (var key in r) {
					if (r.hasOwnProperty(key)) {
						ret[key] = r[key];
					}
				}
			} else if (typeof r !== 'undefined') {
				ret = r;
			}
		}
		return ret;
	};
}

function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}

function propsHook(props, context) {
	if (!props) {
		return;
	}

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	var c = props.children;
	if (c && Array.isArray(c) && c.length === 1 && (typeof c[0] === 'string' || typeof c[0] === 'function' || c[0] instanceof VNode)) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children === 'object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		var ctor = typeof this === 'function' ? this : this.constructor,
		    propTypes = this.propTypes || ctor.propTypes;
		var displayName = this.displayName || ctor.name;

		if (propTypes) {
			prop_types_default.a.checkPropTypes(propTypes, props, 'prop', displayName);
		}
	}
}

function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent === this) {
		currentComponent = null;
	}
}

function Component$1(props, context, opts) {
	preact_min["Component"].call(this, props, context);
	this.state = this.getInitialState ? this.getInitialState() : {};
	this.refs = {};
	this._refProxies = {};
	if (opts !== BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
extend(Component$1.prototype = new preact_min["Component"](), {
	constructor: Component$1,

	isReactComponent: {},

	replaceState: function replaceState(state, callback) {
		var this$1 = this;

		this.setState(state, callback);
		for (var i in this$1.state) {
			if (!(i in state)) {
				delete this$1.state[i];
			}
		}
	},

	getDOMNode: function getDOMNode() {
		return this.base;
	},

	isMounted: function isMounted() {
		return !!this.base;
	}
});

function PureComponent(props, context) {
	Component$1.call(this, props, context);
}
F.prototype = Component$1.prototype;
PureComponent.prototype = new F();
PureComponent.prototype.isPureReactComponent = true;
PureComponent.prototype.shouldComponentUpdate = function (props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};

function unstable_batchedUpdates(callback) {
	callback();
}

var index = {
	version: version,
	DOM: DOM,
	PropTypes: prop_types_default.a,
	Children: Children,
	render: render$1,
	hydrate: render$1,
	createClass: createClass,
	createContext: createContext,
	createPortal: createPortal,
	createFactory: createFactory,
	createElement: createElement,
	cloneElement: cloneElement$1,
	createRef: preact_min["createRef"],
	isValidElement: isValidElement,
	findDOMNode: findDOMNode,
	unmountComponentAtNode: unmountComponentAtNode,
	Component: Component$1,
	PureComponent: PureComponent,
	unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
	unstable_batchedUpdates: unstable_batchedUpdates,
	__spread: extend
};

/* harmony default export */ var preact_compat_es = __webpack_exports__["d"] = (index);

//# sourceMappingURL=preact-compat.es.js.map

/***/ }),

/***/ "j7p4":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9be0c68fb5c6926bbb14310d97411ba1.png";

/***/ }),

/***/ "lZeb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c5f181ff955afaea332f1ceeb52a5440.png";

/***/ }),

/***/ "pv+V":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "384154096739132becf9e203e7c95bdd.png";

/***/ }),

/***/ "pv+l":
/***/ (function(module, exports) {

module.exports = function (originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

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

/***/ "wVGV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__("Asjh");

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),

/***/ "yY49":
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