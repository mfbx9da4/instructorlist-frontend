(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{BM80:function(t,e,n){"use strict";function i(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.r(e),n.d(e,"default",(function(){return s}));var r=n("hosL"),c=n("NWYn"),u=n.n(c),s=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return o(i(e=t.call.apply(t,[this].concat(r))||this),"state",{time:Date.now(),count:10}),o(i(e),"updateTime",(function(){e.setState({time:Date.now()})})),o(i(e),"increment",(function(){e.setState({count:e.state.count+1})})),e}var n,c;c=t,(n=e).prototype=Object.create(c.prototype),n.prototype.constructor=n,n.__proto__=c;var s=e.prototype;return s.componentDidMount=function(){this.timer=setInterval(this.updateTime,1e3)},s.componentWillUnmount=function(){clearInterval(this.timer)},s.render=function(t,e){var n=t.user,i=e.time,o=e.count;return Object(r.h)("div",{class:u.a.profile},Object(r.h)("h1",null,"Profile: ",n),Object(r.h)("p",null,"This is the user profile for a user named ",n,"."),Object(r.h)("div",null,"Current time: ",new Date(i).toLocaleString()),Object(r.h)("p",null,Object(r.h)("button",{onClick:this.increment},"Click Me")," Clicked ",o," ","times."),Object(r.h)("amp-carousel",{width:"450",height:"300"},Object(r.h)("amp-img",{src:"https://picsum.photos/id/1/450/300",width:"450",height:"300"},""),Object(r.h)("amp-img",{src:"https://picsum.photos/id/300/450/300",width:"450",height:"300"},""),Object(r.h)("amp-img",{src:"https://picsum.photos/id/3/450/300",width:"450",height:"300"},"")))},e}(r.Component)},NWYn:function(t){t.exports={profile:"profile__t2Dqz"}}}]);
//# sourceMappingURL=route-profile.chunk.f7522.js.map