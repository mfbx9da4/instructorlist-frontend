webpackJsonp([0],{"1uTM":function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=function(e){return Object.entries(e).filter(function(e){return e[1]}).map(function(e){return e[0]}).join(" ")};t.b=r},"6hN1":function(e){e.exports={classDetailWrapper:"classDetailWrapper__2T8mX",heroImage:"heroImage__Qr4BU",back:"back__1aQJI",timeLabel:"timeLabel__1dmWn",main:"main__ieBPs",mainTitle:"mainTitle__3QRdT",address:"address__teZVQ",description:"description__25Gbt",section:"section__1vexu",title:"title__gjFEQ",instructorAvatar:"instructorAvatar__25zFg",well:"well__372E6",wellIcon:"wellIcon__3hDcb",wellMain:"wellMain__1JhNM",wellDescription:"wellDescription__1PEH9",wellAction:"wellAction__3j7JB",priceLabel:"priceLabel__3dyS3"}},Dnk9:function(e){e.exports={footer:"footer__YnoJr",hide:"hide__3aVn4",disabled:"disabled__gp8z1",button:"button__2PQ5O"}},GjWG:function(e){e.exports={formContainer:"formContainer__1XJ08"}},"Kb/3":function(e,t,n){"use strict";function r(e){if(null==e)throw new TypeError("Cannot destructure undefined")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){if(null==e)throw new TypeError("Cannot destructure undefined")}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(){return new Promise(function(e,t){return Promise.resolve(new Promise(function(e){return D()("https://js.stripe.com/v3/",e)})).then(function(){try{return e()}catch(e){return t(e)}},t)})}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function m(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function d(e){if(null==e)throw new TypeError("Cannot destructure undefined")}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function y(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var v=n("KM04"),_=(n("vbq8"),n("/QC5")),g=n("6hN1"),j=n.n(g),O=n("Mmjd"),w=n.n(O),P=n("1uTM"),N=n("Dnk9"),S=n.n(N),C=function(e){function t(){for(var t,n,r,i=arguments.length,a=Array(i),s=0;s<i;s++)a[s]=arguments[s];return t=n=o(this,e.call.apply(e,[this].concat(a))),n.onClick=function(e){if(n.props.disabled)return e.preventDefault();n.props.onClick(e)},r=t,o(n,r)}return i(t,e),t.prototype.render=function(e,t){var n,o=e.children,i=e.disabled,a=e.hide;return r(t),Object(v.h)("div",{className:Object(P.b)((n={},n[S.a.footer]=!0,n[S.a.disabled]=i,n[S.a.hide]=a,n))},Object(v.h)("button",{className:S.a.button,onClick:this.onClick,type:"submit"},o))},t}(v.Component),k=(n("ngyr"),n("nMj1")),T={1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat",7:"Sun"},M=(Object(k.a)(),"pk_test_i0mT0MQhBYOTm3kcHw73xILH"),A=n("GjWG"),E=n.n(A),x=n("r4pm"),D=n.n(x),I=n("fitr"),B=Object(v.h)("div",{id:"cc-form"}),L=function(e){function t(){return s(this,t),c(this,e.apply(this,arguments))}return u(t,e),t.prototype.shouldComponentUpdate=function(){return!1},t.prototype.componentDidMount=function(){this.props.card.mount("#cc-form")},t.prototype.render=function(){return B},t}(v.Component),F=Object(v.h)("div",{id:"payment-request-button"}),W=(function(e){function t(){var n,r,o;s(this,t);for(var i=arguments.length,a=Array(i),u=0;u<i;u++)a[u]=arguments[u];return n=r=c(this,e.call.apply(e,[this].concat(a))),r.mount=function(){return new Promise(function(e,t){var n;return Promise.resolve(r.props.paymentRequest.canMakePayment()).then(function(o){try{return n=o,n?r.props.prButton.mount("#payment-request-button"):document.getElementById("payment-request-button").style.display="none",r.props.paymentRequest.on("paymentmethod",r.props.onPaymentMethod),e()}catch(e){return t(e)}},t)})},o=n,c(r,o)}u(t,e),t.prototype.componentDidMount=function(){this.mount()},t.prototype.shouldComponentUpdate=function(){return!1},t.prototype.render=function(){return F}}(v.Component),Object(v.h)("div",null,"Loading stripe")),J=function(e){function t(n){s(this,t);var r=c(this,e.call(this,n));return r.registerStripeElements=function(){return new Promise(function(e,t){function n(){return r.setState({loadingStripe:!1}),r.stripe=window.Stripe(M),r.elements=r.stripe.elements(),o=r.elements.create("card",{hidePostalCode:!0}),i=void 0,a=void 0,console.log("card",o),r.setState({card:o,prButton:i,paymentRequest:a}),e()}var o,i,a;return"Stripe"in window?n.call(this):(r.setState({loadingStripe:!0}),Promise.resolve(l()).then(function(){try{return n.call(this)}catch(e){return t(e)}}.bind(this),t))})},r.onSubmit=function(e){return new Promise(function(t){return console.log("onstripesubmit"),t(r.onSubmitCard(e))})},r.onSubmitCard=function(){return new Promise(function(e,t){var n,o,i;return Promise.resolve(r.stripe.createPaymentMethod("card",r.state.card)).then(function(a){try{return n=a,n.error?e(n):(o=n.billingDetails,r.setState({billingDetails:o}),Promise.resolve(r.confirm("method",{payment_method_id:n.paymentMethod.id,amount:r.getAmount()})).then(function(o){function a(){return e(n)}try{return i=o,i.requires_action?Promise.resolve(r.handleAction(i)).then(function(){try{return a.call(this)}catch(e){return t(e)}}.bind(this),t):a.call(this)}catch(e){return t(e)}}.bind(this),t))}catch(e){return t(e)}}.bind(this),t)})},r.handleAction=function(e){return new Promise(function(t,n){var o,i,a;return Promise.resolve(r.stripe.handleCardAction(e.payment_intent_client_secret)).then(function(e){try{return o=e,(console.log("actiionres",o),o.error)?(console.log("errorAction",o.error),t(o)):(i={payment_intent_id:o.paymentIntent.id,amount:r.getAmount()},Promise.resolve(r.confirm("intent",i)).then(function(e){try{return a=e,console.log("confirmationRes",a),t(o)}catch(e){return n(e)}},n))}catch(e){return n(e)}},n)})},r.confirm=function(e,t){return new Promise(function(n,r){var o,i;return console.log("body",t),Promise.resolve(fetch(I.a+"/api/payment-"+e+"/confirm/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).then(function(e){try{return o=e,Promise.resolve(o.json()).then(function(e){try{return i=e,console.log("confirmed",i),n(i)}catch(e){return r(e)}},r)}catch(e){return r(e)}},r)})},r.getAmount=function(){return 100*parseFloat(r.props.amount)},r.onError=function(e){r.props.onError(e)},r.getClientSecret=function(){return new Promise(function(e,t){var n;return Promise.resolve(fetch(I.a+"/api/intent/"+r.getAmount()+"/")).then(function(r){try{return n=r,(console.log("res",n),n.ok)?e(n.json()):(console.log("err",n),e(n))}catch(e){return t(e)}},t)})},r.onPaymentMethod=function(e){return new Promise(function(t,n){var o,i,a,s,c,u,l;return Promise.resolve(r.getClientSecret()).then(function(p){try{return o=p,i=o.client_secret,Promise.resolve(r.stripe.confirmPaymentIntent(i,{payment_method:e.paymentMethod.id})).then(function(o){function p(){return t()}try{return a=o,s=a.error,c=a.paymentIntent,s?(e.complete("fail"),p.call(this)):(e.complete("success"),Promise.resolve(r.stripe.handleCardPayment(i)).then(function(e){try{return u=e,l=u.error,l?console.log("The payment failed -- ask your customer for a new payment method."):console.log("The payment has succeeded."),p.call(this)}catch(e){return n(e)}}.bind(this),n))}catch(e){return n(e)}}.bind(this),n)}catch(e){return n(e)}}.bind(this),n)})},console.log("construct"),r.state={loadingStripe:!0,responses:[]},r.props.onSubmit(r.onSubmit),r}return u(t,e),t.prototype.componentDidUpdate=function(){console.log("did update")},t.prototype.shouldComponentUpdate=function(e,t){return!1===t.loadingStripe&&!0===this.state.loadingStripe},t.prototype.componentWillUnmount=function(){return new Promise(function(e){return console.log("willunmoutn"),this.state.card&&this.state.card.destroy(),e()}.bind(this))},t.prototype.componentDidMount=function(){return new Promise(function(e,t){return console.log("mount"),Promise.resolve(this.registerStripeElements()).then(function(){try{return e()}catch(e){return t(e)}},t)}.bind(this))},t.prototype.render=function(e,t){var n=t.res,r=t.loadingStripe;return a(e),console.log("rednder, loadingStripe",r),Object(v.h)("div",null,r?W:Object(v.h)("div",{key:"formContainer",className:E.a.formContainer},Object(v.h)(L,{key:"card",card:this.state.card}),Object(v.h)("pre",null,JSON.stringify(n,null,2))))},t}(v.Component),q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},R=Object(v.h)("div",null,"Class not found"),Q=Object(v.h)("div",null),U=Object(v.h)("div",{className:"hr"}),V=Object(v.h)("div",{className:"hr"}),H=Object(v.h)("div",{className:"hr"}),G=Object(v.h)("div",{className:"bottom"}),$=Object(v.h)("div",null,"Pay now"),z=function(e){function t(n){p(this,t);var r=h(this,e.call(this,n));return r.onChange=function(e){return function(t){var n;r.setState({values:(n={},n[e]=t.target.value,n)})}},r.validateValues=function(){var e=r.state.values;if(!("phone_number"in e))return{phone_number:"Phone is not valid"};var t=e.phone_number,n=t.split("+");if(n.length>1)return{phone_number:'Phone number must have only one "+"'};var o=n[0];return/^\d+$/.test(o)?o.length<8?{phone_number:"Phone number is too short"}:{}:{phone_number:"Phone number must be made only of numbers"}},r.onSubmit=function(e){return new Promise(function(t,n){function o(){return c=q({paymentMethod:r.state.paymentMethod,start_time:r.props.item.start_time,end_time:r.props.item.end_time,class_attended:r.props.item.id,venue:r.props.item.venue.id,email:r.state.values.phone_number+"@example.com"},r.state.values),console.log("data",c),Promise.resolve(r.postBooking(c)).then(function(e){try{return u=e,(console.log("res",u),u.error)?t(r.setState({isSubmitting:!1,error:u.error.message})):(alert(u.code),t(r.setState({isSubmitting:!1,success:!0,code:u.code})))}catch(e){return n(e)}},n)}var i,a,s,c,u;return e.preventDefault(),e.stopPropagation(),console.log("onsubmit"),r.setState({isSubmitting:!0}),r.setState({errors:{},error:!1}),i=r.validateValues(),a=i.phone,i.phone?t(r.setState({isSubmitting:!1,errors:i,error:a})):r.state.paymentMethod?o.call(this):Promise.resolve(r.stripeSubmit(e)).then(function(e){try{return s=e,(console.log("res2",s),s.error)?t(r.setState({isSubmitting:!1,error:s.error.message})):(r.setState({paymentMethod:s}),o.call(this))}catch(e){return n(e)}}.bind(this),n)})},r.postBooking=function(e){return new Promise(function(t,n){var r;return Promise.resolve(fetch(I.a+"/api/bookingsasdfad/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).then(function(e){try{return r=e,console.log("res",r),t(r.ok?r.json():{error:{message:"Issue making booking"}})}catch(e){return n(e)}},n)})},r.state={formIsValid:!1,paymentMethod:null,errors:{},values:{}},r}return m(t,e),t.prototype.render=function(e,t){var n,r=this,o=e.item,i=e.show,a=t.values;return console.log("show",i),o?Object(v.h)("div",null,Object(v.h)("form",{onSubmit:this.onSubmit,className:Object(P.b)((n={},n[w.a.paymentWrapper]=!0,n[w.a.close]=!i,n))},Object(v.h)("div",{className:w.a.paymentMain},Object(v.h)("div",{className:w.a.paymentHeader},Object(v.h)("div",{className:"leftArrow "+w.a.back,onClick:this.props.onClose}),Object(v.h)("div",{className:w.a.title},"Checkout"),Q),U,Object(v.h)("div",{className:w.a.section},Object(v.h)("div",{className:w.a.classTitle},o.title),Object(v.h)("div",{className:w.a.time},T[o.day]," ",o.start_time," - ",o.end_time),Object(v.h)("div",{className:w.a.location},o.venue.name," - ",o.venue.area)),V,Object(v.h)("div",{className:w.a.section},Object(v.h)("div",{className:w.a.titleContainer},Object(v.h)("div",{className:w.a.title},"Total"),Object(v.h)("div",{className:w.a.titleAside},"£",parseFloat(o.price).toFixed(2))),o.extra_fee&&Object(v.h)("div",{key:"extra_fee",className:w.a.extra},"Please note this studio will charge you an additional",Object(v.h)("div",{className:w.a.strong},"£",o.extra_fee," studio entry fee"),"upon arrival.")),H,Object(v.h)("div",{className:w.a.section},Object(v.h)("div",{className:w.a.titleContainer},Object(v.h)("div",{className:w.a.title},"Payment")),Object(v.h)("div",{className:"errorContainer "+(this.state.error||"hide")},Object(v.h)("div",{className:"errorContainer_message"},this.state.error)),Object(v.h)("div",{className:w.a.paymentForm},Object(v.h)("div",{column:!0,className:w.a.inputContainer},Object(v.h)("input",{type:"text",className:w.a.input,placeholder:"Phone number",name:"phone_number",key:"phone_number",value:a.phone_number,onChange:this.onChange("phone_number")})),Object(v.h)(J,{key:"StripeForm",amount:o.price,onSubmit:function(e){r.stripeSubmit=e}}))),G),Object(v.h)(C,{hide:!i,onClick:this.onSubmit},$))):R},t}(v.Component),K=Object(v.h)("div",{column:!0,flex:!0,jc:"center",ai:"center"},Object(v.h)("img",{width:"85",height:"119",src:"/assets/images/dancing.gif",alt:"loading"}),Object(v.h)("div",null,"Loading")),X=Object(v.h)("div",{className:"leftArrow"}),Y=Object(v.h)("div",{className:"directions"}),Z=Object(v.h)("div",{className:"rightArrow"}),ee=Object(v.h)("div",{className:"rightArrow"}),te=function(e){function t(n){f(this,t);var r=b(this,e.call(this,n));return r.onBack=function(e){if(e.preventDefault(),e.stopPropagation(),r.props.i)return window.history.back();Object(_.route)("/search/")},r.hidePayment=function(){r.setState({showPayment:!1})},r.state={item:r.props.data.state.classes[n.matches.id],showPayment:Object(k.a)()},r}return y(t,e),t.prototype.componentDidMount=function(){return new Promise(function(e,t){var n;return console.log("did mount"),Promise.resolve(this.props.data.getClass(this.props.matches.id)).then(function(r){try{return n=r,this.setState({item:n}),e()}catch(e){return t(e)}}.bind(this),t)}.bind(this))},t.prototype.render=function(e,t){var n=this,r=t.item,o=t.showPayment;if(d(e),!r)return K;var i=r.instructors[0],a=i.profile||{bio:""};return Object(v.h)("div",null,Object(v.h)(z,{show:o,onClose:this.hidePayment,item:r}),Object(v.h)("div",{className:j.a.classDetailWrapper},Object(v.h)("div",{className:j.a.classHero},Object(v.h)("div",{className:j.a.heroImage},Object(v.h)("img",{src:r.hero_image_url||"/assets/images/class.jpeg",alt:r.title}),Object(v.h)("a",{onClick:this.onBack,href:"/search",className:""+j.a.back},X),Object(v.h)("div",{className:j.a.timeLabel},T[r.day].toUpperCase()," ",r.start_time," -"," ",r.end_time))),Object(v.h)("div",{className:j.a.main},Object(v.h)("div",{className:j.a.mainTitle},r.title),Object(v.h)("div",{className:j.a.address},r.venue.name," ",r.venue.area),Object(v.h)("a",{href:r.venue.google_maps_url?r.venue.google_maps_url:"https://www.google.co.uk/maps/dir//"+r.venue.address_line_1+" "+r.venue.postcode,target:"_blank",className:j.a.well,style:{borderTop:"1px solid var(--off-white)"}},Object(v.h)("div",{className:j.a.wellIcon},Y),Object(v.h)("div",{className:j.a.wellMain},Object(v.h)("div",{className:j.a.wellName},r.venue.name),Object(v.h)("div",{className:j.a.wellDescription},r.venue.address_line_1,", ",r.venue.postcode)),Object(v.h)("div",{className:j.a.wellAction},Z)),Object(v.h)("a",{className:j.a.well,href:""+a.slug},Object(v.h)("div",{className:j.a.wellIcon},Object(v.h)("img",{className:j.a.instructorAvatar,src:a.profile_image_url||"https://api.adorable.io/avatars/60/"+i.email+".png",alt:i.name})),Object(v.h)("div",{className:j.a.wellMain},Object(v.h)("div",{className:j.a.wellName},i.name),Object(v.h)("div",{className:j.a.wellDescription},a.bio.substring(0,50))),Object(v.h)("div",{className:j.a.wellAction},ee)),r.description&&Object(v.h)("div",{className:j.a.section},Object(v.h)("div",{className:j.a.title},"About"),Object(v.h)("div",{className:j.a.description},r.description)))),Object(v.h)(C,{onClick:function(){return n.setState({showPayment:!0})}},Object(v.h)("div",null,"£",r.price," ",Object(v.h)("div",{className:j.a.priceLabel},"Book now"))))},t}(v.Component);te.getInitialProps=function(e){var t=e.id;return new Promise(function(e){fetch("https://instructorlist-django.herokuapp.com/api/classes/"+t).then(function(t){t.json().then(function(t){return e(t)})})})};t.default=te},Mmjd:function(e){e.exports={paymentWrapper:"paymentWrapper__1x25b",close:"close__1l-EC",paymentMain:"paymentMain__2L3VM",paymentHeader:"paymentHeader__3BZWN",back:"back__1GJnh",title:"title__1Os6k",section:"section__2SSUU",time:"time__IA1AL",classTitle:"classTitle__2boOm",titleContainer:"titleContainer__O_OAw",extra:"extra__ktVQ8",strong:"strong__ved2L",paymentForm:"paymentForm__TFqeV",inputContainer:"inputContainer__13SbB"}},r4pm:function(e,t){var n,r,o;!function(i,a){r=[],n=a,void 0!==(o="function"==typeof n?n.apply(t,r):n)&&(e.exports=o)}(0,function(){function e(e,t){e=e.push?e:[e];var n,r,o,i,a=[],s=e.length,l=s;for(n=function(e,n){n.length&&a.push(e),--l||t(a)};s--;)r=e[s],o=c[r],o?n(r,o):(i=u[r]=u[r]||[],i.push(n))}function t(e,t){if(e){var n=u[e];if(c[e]=t,n)for(;n.length;)n[0](e,t),n.splice(0,1)}}function n(e,t){e.call&&(e={success:e}),t.length?(e.error||a)(t):(e.success||a)(e)}function r(e,t,n,o){var i,s,c=document,u=n.async,l=(n.numRetries||0)+1,p=n.before||a,h=e.replace(/^(css|img)!/,"");o=o||0,/(^css!|\.css$)/.test(e)?(s=c.createElement("link"),s.rel="stylesheet",s.href=h,(i="hideFocus"in s)&&s.relList&&(i=0,s.rel="preload",s.as="style")):/(^img!|\.(png|gif|jpg|svg)$)/.test(e)?(s=c.createElement("img"),s.src=h):(s=c.createElement("script"),s.src=e,s.async=void 0===u||u),s.onload=s.onerror=s.onbeforeload=function(a){var c=a.type[0];if(i)try{s.sheet.cssText.length||(c="e")}catch(e){18!=e.code&&(c="e")}if("e"==c){if((o+=1)<l)return r(e,t,n,o)}else if("preload"==s.rel&&"style"==s.as)return s.rel="stylesheet";t(e,c,a.defaultPrevented)},!1!==p(e,s)&&c.head.appendChild(s)}function o(e,t,n){e=e.push?e:[e];var o,i,a=e.length,s=a,c=[];for(o=function(e,n,r){if("e"==n&&c.push(e),"b"==n){if(!r)return;c.push(e)}--a||t(c)},i=0;i<s;i++)r(e[i],o,n)}function i(e,r,i){function a(r,i){o(e,function(e){n(u,e),r&&n({success:r,error:i},e),t(c,e)},u)}var c,u;if(r&&r.trim&&(c=r),u=(c?i:r)||{},c){if(c in s)throw"LoadJS";s[c]=!0}if(u.returnPromise)return new Promise(a);a()}var a=function(){},s={},c={},u={};return i.ready=function(t,r){return e(t,function(e){n(r,e)}),i},i.done=function(e){t(e,[])},i.reset=function(){s={},c={},u={}},i.isDefined=function(e){return e in s},i})},vbq8:function(){}});
//# sourceMappingURL=route-class.page.chunk.7cd05.js.map