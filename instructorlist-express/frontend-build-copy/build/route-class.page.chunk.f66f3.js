webpackJsonp([0],{"1uTM":function(t,e,n){"use strict";n.d(e,"a",function(){return r});var r=function(t){return Object.entries(t).filter(function(t){return t[1]}).map(function(t){return t[0]}).join(" ")};e.b=r},"3dZY":function(t){!function(e,n){t.exports=n()}(0,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",o="day",i="week",s="month",a="quarter",c="year",u=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,l=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},f={s:h,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),o=n%60;return(e<=0?"+":"-")+h(r,2,"0")+":"+h(o,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,s),o=e-r<0,i=t.clone().add(n+(o?-1:1),s);return Number(-(n+(e-r)/(o?r-i:i-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(u){return{M:s,y:c,w:i,d:o,h:r,m:n,s:e,ms:t,Q:a}[u]||String(u||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m="en",p={};p[m]=d;var b=function(t){return t instanceof _},y=function(t,e,n){var r;if(!t)return m;if("string"==typeof t)p[t]&&(r=t),e&&(p[t]=e,r=t);else{var o=t.name;p[o]=t,r=o}return n||(m=r),r},v=function(t,e,n){if(b(t))return t.clone();var r=e?"string"==typeof e?{format:e,pl:n}:e:{};return r.date=t,new _(r)},g=f;g.l=y,g.i=b,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u})};var _=function(){function h(t){this.$L=this.$L||y(t.locale,null,!0),this.parse(t)}var f=h.prototype;return f.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(u);if(r)return n?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(e)}(t),this.init()},f.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},f.$utils=function(){return g},f.isValid=function(){return!("Invalid Date"===this.$d.toString())},f.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},f.isAfter=function(t,e){return v(t)<this.startOf(e)},f.isBefore=function(t,e){return this.endOf(e)<v(t)},f.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},f.year=function(t){return this.$g(t,"$y",c)},f.month=function(t){return this.$g(t,"$M",s)},f.day=function(t){return this.$g(t,"$W",o)},f.date=function(t){return this.$g(t,"$D","date")},f.hour=function(t){return this.$g(t,"$H",r)},f.minute=function(t){return this.$g(t,"$m",n)},f.second=function(t){return this.$g(t,"$s",e)},f.millisecond=function(e){return this.$g(e,"$ms",t)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(t,a){var u=this,l=!!g.u(a)||a,h=g.p(t),f=function(t,e){var n=g.w(u.$u?Date.UTC(u.$y,e,t):new Date(u.$y,e,t),u);return l?n:n.endOf(o)},d=function(t,e){return g.w(u.toDate()[t].apply(u.toDate(),(l?[0,0,0,0]:[23,59,59,999]).slice(e)),u)},m=this.$W,p=this.$M,b=this.$D,y="set"+(this.$u?"UTC":"");switch(h){case c:return l?f(1,0):f(31,11);case s:return l?f(1,p):f(0,p+1);case i:var v=this.$locale().weekStart||0,_=(m<v?m+7:m)-v;return f(l?b-_:b+(6-_),p);case o:case"date":return d(y+"Hours",0);case r:return d(y+"Minutes",1);case n:return d(y+"Seconds",2);case e:return d(y+"Milliseconds",3);default:return this.clone()}},f.endOf=function(t){return this.startOf(t,!1)},f.$set=function(i,a){var u,l=g.p(i),h="set"+(this.$u?"UTC":""),f=(u={},u[o]=h+"Date",u.date=h+"Date",u[s]=h+"Month",u[c]=h+"FullYear",u[r]=h+"Hours",u[n]=h+"Minutes",u[e]=h+"Seconds",u[t]=h+"Milliseconds",u)[l],d=l===o?this.$D+(a-this.$W):a;if(l===s||l===c){var m=this.clone().set("date",1);m.$d[f](d),m.init(),this.$d=m.set("date",Math.min(this.$D,m.daysInMonth())).toDate()}else f&&this.$d[f](d);return this.init(),this},f.set=function(t,e){return this.clone().$set(t,e)},f.get=function(t){return this[g.p(t)]()},f.add=function(t,a){var u,l=this;t=Number(t);var h=g.p(a),f=function(e){var n=v(l);return g.w(n.date(n.date()+Math.round(e*t)),l)};if(h===s)return this.set(s,this.$M+t);if(h===c)return this.set(c,this.$y+t);if(h===o)return f(1);if(h===i)return f(7);var d=(u={},u[n]=6e4,u[r]=36e5,u[e]=1e3,u)[h]||1,m=this.valueOf()+t*d;return g.w(m,this)},f.subtract=function(t,e){return this.add(-1*t,e)},f.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),o=this.$locale(),i=this.$H,s=this.$m,a=this.$M,c=o.weekdays,u=o.months,h=function(t,r,o,i){return t&&(t[r]||t(e,n))||o[r].substr(0,i)},f=function(t){return g.s(i%12||12,t,"0")},d=o.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(o.monthsShort,a,u,3),MMMM:u[a]||u(this,n),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(o.weekdaysMin,this.$W,c,2),ddd:h(o.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(i),HH:g.s(i,2,"0"),h:f(1),hh:f(2),a:d(i,s,!0),A:d(i,s,!1),m:String(s),mm:g.s(s,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(l,function(t,e){return e||m[t]||r.replace(":","")})},f.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},f.diff=function(t,u,l){var h,f=g.p(u),d=v(t),m=6e4*(d.utcOffset()-this.utcOffset()),p=this-d,b=g.m(this,d);return b=(h={},h[c]=b/12,h[s]=b,h[a]=b/3,h[i]=(p-m)/6048e5,h[o]=(p-m)/864e5,h[r]=p/36e5,h[n]=p/6e4,h[e]=p/1e3,h)[f]||p,l?b:g.a(b)},f.daysInMonth=function(){return this.endOf(s).$D},f.$locale=function(){return p[this.$L]},f.locale=function(t,e){if(!t)return this.$L;var n=this.clone();return n.$L=y(t,e,!0),n},f.clone=function(){return g.w(this.toDate(),this)},f.toDate=function(){return new Date(this.$d)},f.toJSON=function(){return this.toISOString()},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},h}();return v.prototype=_.prototype,v.extend=function(t,e){return t(e,_,v),v},v.locale=y,v.isDayjs=b,v.unix=function(t){return v(1e3*t)},v.en=p[m],v.Ls=p,v})},"6hN1":function(t){t.exports={classDetailWrapper:"classDetailWrapper__2T8mX",heroImage:"heroImage__Qr4BU",back:"back__1aQJI",timeLabel:"timeLabel__1dmWn",main:"main__ieBPs",mainTitle:"mainTitle__3QRdT",address:"address__teZVQ",description:"description__25Gbt",section:"section__1vexu",title:"title__gjFEQ",instructorAvatar:"instructorAvatar__25zFg",well:"well__372E6",wellIcon:"wellIcon__3hDcb",wellMain:"wellMain__1JhNM",wellDescription:"wellDescription__1PEH9",wellAction:"wellAction__3j7JB",priceLabel:"priceLabel__3dyS3"}},Dnk9:function(t){t.exports={footer:"footer__YnoJr",hide:"hide__3aVn4",disabled:"disabled__gp8z1",button:"button__2PQ5O"}},GjWG:function(t){t.exports={formContainer:"formContainer__1XJ08"}},"Kb/3":function(t,e,n){"use strict";function r(t){if(null==t)throw new TypeError("Cannot destructure undefined")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t){if(null==t)throw new TypeError("Cannot destructure undefined")}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function l(){return new Promise(function(t,e){return Promise.resolve(new Promise(function(t){return x()("https://js.stripe.com/v3/",t)})).then(function(){try{return t()}catch(t){return e(t)}},e)})}function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function d(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function m(t){if(null==t)throw new TypeError("Cannot destructure undefined")}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function b(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function y(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var v=n("KM04"),g=(n("vbq8"),n("/QC5")),_=n("6hN1"),O=n.n(_),w=n("Mmjd"),j=n.n(w),S=n("1uTM"),$=n("Dnk9"),M=n.n($),P=function(t){function e(){for(var e,n,r,i=arguments.length,s=Array(i),a=0;a<i;a++)s[a]=arguments[a];return e=n=o(this,t.call.apply(t,[this].concat(s))),n.onClick=function(t){if(n.props.disabled)return t.preventDefault();n.props.onClick(t)},r=e,o(n,r)}return i(e,t),e.prototype.render=function(t,e){var n,o=t.children,i=t.disabled,s=t.hide;return r(e),Object(v.h)("div",{className:Object(S.b)((n={},n[M.a.footer]=!0,n[M.a.disabled]=i,n[M.a.hide]=s,n))},Object(v.h)("button",{className:M.a.button,onClick:this.onClick,type:"submit"},o))},e}(v.Component),N=(n("ngyr"),n("nMj1")),C={1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat",7:"Sun"},D=(Object(N.a)(),"pk_test_i0mT0MQhBYOTm3kcHw73xILH"),k=n("GjWG"),T=n.n(k),A=n("r4pm"),x=n.n(A),E=n("fitr"),I=Object(v.h)("div",{id:"cc-form"}),L=function(t){function e(){return a(this,e),c(this,t.apply(this,arguments))}return u(e,t),e.prototype.shouldComponentUpdate=function(){return!1},e.prototype.componentDidMount=function(){this.props.card.mount("#cc-form")},e.prototype.render=function(){return I},e}(v.Component),W=Object(v.h)("div",{id:"payment-request-button"}),Y=(function(t){function e(){var n,r,o;a(this,e);for(var i=arguments.length,s=Array(i),u=0;u<i;u++)s[u]=arguments[u];return n=r=c(this,t.call.apply(t,[this].concat(s))),r.mount=function(){return new Promise(function(t,e){var n;return Promise.resolve(r.props.paymentRequest.canMakePayment()).then(function(o){try{return n=o,n?r.props.prButton.mount("#payment-request-button"):document.getElementById("payment-request-button").style.display="none",r.props.paymentRequest.on("paymentmethod",r.props.onPaymentMethod),t()}catch(t){return e(t)}},e)})},o=n,c(r,o)}u(e,t),e.prototype.componentDidMount=function(){this.mount()},e.prototype.shouldComponentUpdate=function(){return!1},e.prototype.render=function(){return W}}(v.Component),Object(v.h)("div",null,"Loading stripe")),H=function(t){function e(n){a(this,e);var r=c(this,t.call(this,n));return r.registerStripeElements=function(){return new Promise(function(t,e){function n(){return r.setState({loadingStripe:!1}),r.stripe=window.Stripe(D),r.elements=r.stripe.elements(),o=r.elements.create("card",{hidePostalCode:!0}),i=void 0,s=void 0,console.log("card",o),r.setState({card:o,prButton:i,paymentRequest:s}),t()}var o,i,s;return"Stripe"in window?n.call(this):(r.setState({loadingStripe:!0}),Promise.resolve(l()).then(function(){try{return n.call(this)}catch(t){return e(t)}}.bind(this),e))})},r.onSubmit=function(t){return new Promise(function(e){return console.log("onstripesubmit"),e(r.onSubmitCard(t))})},r.onSubmitCard=function(){return new Promise(function(t,e){var n,o,i;return Promise.resolve(r.stripe.createPaymentMethod("card",r.state.card)).then(function(s){try{return n=s,n.error?t(n):(o=n.billingDetails,r.setState({billingDetails:o}),Promise.resolve(r.confirm("method",{payment_method_id:n.paymentMethod.id,amount:r.getAmount()})).then(function(o){function s(){return t(n)}try{return i=o,i.requires_action?Promise.resolve(r.handleAction(i)).then(function(){try{return s.call(this)}catch(t){return e(t)}}.bind(this),e):s.call(this)}catch(t){return e(t)}}.bind(this),e))}catch(t){return e(t)}}.bind(this),e)})},r.handleAction=function(t){return new Promise(function(e,n){var o,i,s;return Promise.resolve(r.stripe.handleCardAction(t.payment_intent_client_secret)).then(function(t){try{return o=t,(console.log("actiionres",o),o.error)?(console.log("errorAction",o.error),e(o)):(i={payment_intent_id:o.paymentIntent.id,amount:r.getAmount()},Promise.resolve(r.confirm("intent",i)).then(function(t){try{return s=t,console.log("confirmationRes",s),e(o)}catch(t){return n(t)}},n))}catch(t){return n(t)}},n)})},r.confirm=function(t,e){return new Promise(function(n,r){var o,i;return console.log("body",e),Promise.resolve(fetch(E.a+"/api/payment-"+t+"/confirm/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).then(function(t){try{return o=t,Promise.resolve(o.json()).then(function(t){try{return i=t,console.log("confirmed",i),n(i)}catch(t){return r(t)}},r)}catch(t){return r(t)}},r)})},r.getAmount=function(){return 100*parseFloat(r.props.amount)},r.onError=function(t){r.props.onError(t)},r.getClientSecret=function(){return new Promise(function(t,e){var n;return Promise.resolve(fetch(E.a+"/api/intent/"+r.getAmount()+"/")).then(function(r){try{return n=r,(console.log("res",n),n.ok)?t(n.json()):(console.log("err",n),t(n))}catch(t){return e(t)}},e)})},r.onPaymentMethod=function(t){return new Promise(function(e,n){var o,i,s,a,c,u,l;return Promise.resolve(r.getClientSecret()).then(function(h){try{return o=h,i=o.client_secret,Promise.resolve(r.stripe.confirmPaymentIntent(i,{payment_method:t.paymentMethod.id})).then(function(o){function h(){return e()}try{return s=o,a=s.error,c=s.paymentIntent,a?(t.complete("fail"),h.call(this)):(t.complete("success"),Promise.resolve(r.stripe.handleCardPayment(i)).then(function(t){try{return u=t,l=u.error,l?console.log("The payment failed -- ask your customer for a new payment method."):console.log("The payment has succeeded."),h.call(this)}catch(t){return n(t)}}.bind(this),n))}catch(t){return n(t)}}.bind(this),n)}catch(t){return n(t)}}.bind(this),n)})},console.log("construct"),r.state={loadingStripe:!0,responses:[]},r.props.onSubmit(r.onSubmit),r}return u(e,t),e.prototype.componentDidUpdate=function(){console.log("did update")},e.prototype.shouldComponentUpdate=function(t,e){return!1===e.loadingStripe&&!0===this.state.loadingStripe},e.prototype.componentWillUnmount=function(){return new Promise(function(t){return console.log("willunmoutn"),this.state.card&&this.state.card.destroy(),t()}.bind(this))},e.prototype.componentDidMount=function(){return new Promise(function(t,e){return console.log("mount"),Promise.resolve(this.registerStripeElements()).then(function(){try{return t()}catch(t){return e(t)}},e)}.bind(this))},e.prototype.render=function(t,e){var n=e.res,r=e.loadingStripe;return s(t),console.log("rednder, loadingStripe",r),Object(v.h)("div",null,r?Y:Object(v.h)("div",{key:"formContainer",className:T.a.formContainer},Object(v.h)(L,{key:"card",card:this.state.card}),Object(v.h)("pre",null,JSON.stringify(n,null,2))))},e}(v.Component),F=n("3dZY"),B=n.n(F),J=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},U=Object(v.h)("div",null,"Class not found"),q=Object(v.h)("div",null),Q=Object(v.h)("div",{className:"hr"}),R=Object(v.h)("div",{className:"hr"}),V=Object(v.h)("div",{className:"hr"}),Z=Object(v.h)("div",{className:"bottom"}),G=Object(v.h)("div",null,"Pay now"),z=function(t){function e(n){h(this,e);var r=f(this,t.call(this,n));return r.onChange=function(t){return function(e){var n;r.setState({values:(n={},n[t]=e.target.value,n)})}},r.validateValues=function(){var t=r.state.values;if(!("phone_number"in t))return{phone_number:"Phone is not valid"};var e=t.phone_number,n=e.split("+");if(n.length>1)return{phone_number:'Phone number must have only one "+"'};var o=n[0];return/^\d+$/.test(o)?o.length<8?{phone_number:"Phone number is too short"}:{}:{phone_number:"Phone number must be made only of numbers"}},r.onSubmit=function(t){return new Promise(function(e,n){function o(){return c=J({payment_method_id:r.state.paymentMethod.id,date:r.state.date.format("YYYY-MM-DD"),start_time:r.props.item.start_time,end_time:r.props.item.end_time,class_attended:r.props.item.id,venue:r.props.item.venue.id,email:r.state.values.phone_number+"@example.com"},r.state.values),console.log("data",c),Promise.resolve(r.postBooking(c)).then(function(t){try{return u=t,(console.log("res",u),u.error)?e(r.setState({isSubmitting:!1,error:u.error.message||"Issue making booking"})):(alert(u.code),e(r.setState({isSubmitting:!1,success:!0,code:u.code})))}catch(t){return n(t)}},n)}var i,s,a,c,u;return t.preventDefault(),t.stopPropagation(),console.log("onsubmit"),r.setState({isSubmitting:!0}),r.setState({errors:{},error:!1}),i=r.validateValues(),s=i.phone,i.phone?e(r.setState({isSubmitting:!1,errors:i,error:s})):r.state.paymentMethod?o.call(this):Promise.resolve(r.stripeSubmit(t)).then(function(t){try{return a=t,(console.log("res2",a),a.error)?e(r.setState({isSubmitting:!1,error:a.error.message})):(r.setState({paymentMethod:a.paymentMethod}),o.call(this))}catch(t){return n(t)}}.bind(this),n)})},r.postBooking=function(t){return new Promise(function(e,n){var r;return Promise.resolve(fetch(E.a+"/api/bookings/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).then(function(t){try{return r=t,e(r.json())}catch(t){return n(t)}},n)})},r.state={formIsValid:!1,paymentMethod:null,errors:{},values:{}},r}return d(e,t),e.prototype.componentDidMount=function(){this.setState({date:B()()})},e.prototype.render=function(t,e){var n,r=this,o=t.item,i=t.show,s=e.values;return o?Object(v.h)("div",null,Object(v.h)("form",{onSubmit:this.onSubmit,className:Object(S.b)((n={},n[j.a.paymentWrapper]=!0,n[j.a.close]=!i,n))},Object(v.h)("div",{className:j.a.paymentMain},Object(v.h)("div",{className:j.a.paymentHeader},Object(v.h)("div",{className:"leftArrow "+j.a.back,onClick:this.props.onClose}),Object(v.h)("div",{className:j.a.title},"Checkout"),q),Q,Object(v.h)("div",{className:j.a.section},Object(v.h)("div",{className:j.a.classTitle},o.title),Object(v.h)("div",{className:j.a.time},C[o.day]," ",o.start_time," - ",o.end_time),Object(v.h)("div",{className:j.a.location},o.venue.name," - ",o.venue.area)),R,Object(v.h)("div",{className:j.a.section},Object(v.h)("div",{className:j.a.titleContainer},Object(v.h)("div",{className:j.a.title},"Total"),Object(v.h)("div",{className:j.a.titleAside},"£",parseFloat(o.price).toFixed(2))),o.extra_fee&&Object(v.h)("div",{key:"extra_fee",className:j.a.extra},"Please note this studio will charge you an additional",Object(v.h)("div",{className:j.a.strong},"£",o.extra_fee," studio entry fee"),"upon arrival.")),V,Object(v.h)("div",{className:j.a.section},Object(v.h)("div",{className:j.a.titleContainer},Object(v.h)("div",{className:j.a.title},"Payment")),Object(v.h)("div",{className:"errorContainer "+(this.state.error||"hide")},Object(v.h)("div",{className:"errorContainer_message"},this.state.error)),Object(v.h)("div",{className:j.a.paymentForm},Object(v.h)("div",{column:!0,className:j.a.inputContainer},Object(v.h)("input",{type:"text",className:j.a.input,placeholder:"Phone number",name:"phone_number",key:"phone_number",value:s.phone_number,onChange:this.onChange("phone_number")})),Object(v.h)(H,{key:"StripeForm",amount:o.price,onSubmit:function(t){r.stripeSubmit=t}}))),Z),Object(v.h)(P,{hide:!i,onClick:this.onSubmit},G))):U},e}(v.Component),K=Object(v.h)("div",{column:!0,flex:!0,jc:"center",ai:"center"},Object(v.h)("img",{width:"85",height:"119",src:"/assets/images/dancing.gif",alt:"loading"}),Object(v.h)("div",null,"Loading")),X=Object(v.h)("div",{className:"leftArrow"}),tt=Object(v.h)("div",{className:"directions"}),et=Object(v.h)("div",{className:"rightArrow"}),nt=Object(v.h)("div",{className:"rightArrow"}),rt=function(t){function e(n){p(this,e);var r=b(this,t.call(this,n));return r.onBack=function(t){if(t.preventDefault(),t.stopPropagation(),r.props.i)return window.history.back();Object(g.route)("/search/")},r.hidePayment=function(){r.setState({showPayment:!1})},r.state={item:r.props.data.state.classes[n.matches.id],showPayment:Object(N.a)()},r}return y(e,t),e.prototype.componentDidMount=function(){return new Promise(function(t,e){var n;return console.log("did mount"),Promise.resolve(this.props.data.getClass(this.props.matches.id)).then(function(r){try{return n=r,this.setState({item:n}),t()}catch(t){return e(t)}}.bind(this),e)}.bind(this))},e.prototype.render=function(t,e){var n=this,r=e.item,o=e.showPayment;if(m(t),!r)return K;var i=r.instructors[0],s=i.profile||{bio:""};return Object(v.h)("div",null,Object(v.h)(z,{show:o,onClose:this.hidePayment,item:r}),Object(v.h)("div",{className:O.a.classDetailWrapper},Object(v.h)("div",{className:O.a.classHero},Object(v.h)("div",{className:O.a.heroImage},Object(v.h)("img",{src:r.hero_image_url||"/assets/images/class.jpeg",alt:r.title}),Object(v.h)("a",{onClick:this.onBack,href:"/search",className:""+O.a.back},X),Object(v.h)("div",{className:O.a.timeLabel},C[r.day].toUpperCase()," ",r.start_time," -"," ",r.end_time))),Object(v.h)("div",{className:O.a.main},Object(v.h)("div",{className:O.a.mainTitle},r.title),Object(v.h)("div",{className:O.a.address},r.venue.name," ",r.venue.area),Object(v.h)("a",{href:r.venue.google_maps_url?r.venue.google_maps_url:"https://www.google.co.uk/maps/dir//"+r.venue.address_line_1+" "+r.venue.postcode,target:"_blank",className:O.a.well,style:{borderTop:"1px solid var(--off-white)"}},Object(v.h)("div",{className:O.a.wellIcon},tt),Object(v.h)("div",{className:O.a.wellMain},Object(v.h)("div",{className:O.a.wellName},r.venue.name),Object(v.h)("div",{className:O.a.wellDescription},r.venue.address_line_1,", ",r.venue.postcode)),Object(v.h)("div",{className:O.a.wellAction},et)),Object(v.h)("a",{className:O.a.well,href:""+s.slug},Object(v.h)("div",{className:O.a.wellIcon},Object(v.h)("img",{className:O.a.instructorAvatar,src:s.profile_image_url||"https://api.adorable.io/avatars/60/"+i.email+".png",alt:i.name})),Object(v.h)("div",{className:O.a.wellMain},Object(v.h)("div",{className:O.a.wellName},i.name),Object(v.h)("div",{className:O.a.wellDescription},s.bio.substring(0,50))),Object(v.h)("div",{className:O.a.wellAction},nt)),r.description&&Object(v.h)("div",{className:O.a.section},Object(v.h)("div",{className:O.a.title},"About"),Object(v.h)("div",{className:O.a.description},r.description)))),Object(v.h)(P,{onClick:function(){return n.setState({showPayment:!0})}},Object(v.h)("div",null,"£",r.price," ",Object(v.h)("div",{className:O.a.priceLabel},"Book now"))))},e}(v.Component);rt.getInitialProps=function(t){var e=t.id;return new Promise(function(t){fetch("https://instructorlist-django.herokuapp.com/api/classes/"+e).then(function(e){e.json().then(function(e){return t(e)})})})};e.default=rt},Mmjd:function(t){t.exports={paymentWrapper:"paymentWrapper__1x25b",close:"close__1l-EC",paymentMain:"paymentMain__2L3VM",paymentHeader:"paymentHeader__3BZWN",back:"back__1GJnh",title:"title__1Os6k",section:"section__2SSUU",time:"time__IA1AL",classTitle:"classTitle__2boOm",titleContainer:"titleContainer__O_OAw",extra:"extra__ktVQ8",strong:"strong__ved2L",paymentForm:"paymentForm__TFqeV",inputContainer:"inputContainer__13SbB"}},r4pm:function(t,e){var n,r,o;!function(i,s){r=[],n=s,void 0!==(o="function"==typeof n?n.apply(e,r):n)&&(t.exports=o)}(0,function(){function t(t,e){t=t.push?t:[t];var n,r,o,i,s=[],a=t.length,l=a;for(n=function(t,n){n.length&&s.push(t),--l||e(s)};a--;)r=t[a],o=c[r],o?n(r,o):(i=u[r]=u[r]||[],i.push(n))}function e(t,e){if(t){var n=u[t];if(c[t]=e,n)for(;n.length;)n[0](t,e),n.splice(0,1)}}function n(t,e){t.call&&(t={success:t}),e.length?(t.error||s)(e):(t.success||s)(t)}function r(t,e,n,o){var i,a,c=document,u=n.async,l=(n.numRetries||0)+1,h=n.before||s,f=t.replace(/^(css|img)!/,"");o=o||0,/(^css!|\.css$)/.test(t)?(a=c.createElement("link"),a.rel="stylesheet",a.href=f,(i="hideFocus"in a)&&a.relList&&(i=0,a.rel="preload",a.as="style")):/(^img!|\.(png|gif|jpg|svg)$)/.test(t)?(a=c.createElement("img"),a.src=f):(a=c.createElement("script"),a.src=t,a.async=void 0===u||u),a.onload=a.onerror=a.onbeforeload=function(s){var c=s.type[0];if(i)try{a.sheet.cssText.length||(c="e")}catch(t){18!=t.code&&(c="e")}if("e"==c){if((o+=1)<l)return r(t,e,n,o)}else if("preload"==a.rel&&"style"==a.as)return a.rel="stylesheet";e(t,c,s.defaultPrevented)},!1!==h(t,a)&&c.head.appendChild(a)}function o(t,e,n){t=t.push?t:[t];var o,i,s=t.length,a=s,c=[];for(o=function(t,n,r){if("e"==n&&c.push(t),"b"==n){if(!r)return;c.push(t)}--s||e(c)},i=0;i<a;i++)r(t[i],o,n)}function i(t,r,i){function s(r,i){o(t,function(t){n(u,t),r&&n({success:r,error:i},t),e(c,t)},u)}var c,u;if(r&&r.trim&&(c=r),u=(c?i:r)||{},c){if(c in a)throw"LoadJS";a[c]=!0}if(u.returnPromise)return new Promise(s);s()}var s=function(){},a={},c={},u={};return i.ready=function(e,r){return t(e,function(t){n(r,t)}),i},i.done=function(t){e(t,[])},i.reset=function(){a={},c={},u={}},i.isDefined=function(t){return t in a},i})},vbq8:function(){}});
//# sourceMappingURL=route-class.page.chunk.f66f3.js.map