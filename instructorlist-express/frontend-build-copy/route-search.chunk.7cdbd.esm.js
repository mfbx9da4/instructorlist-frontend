(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"5xue":function(t){t.exports={search:"search__2-8Kz",listItems:"listItems__16EqL",infoWrapper:"infoWrapper__3cbB8",infoMessage:"infoMessage__9F7UF",infoIcon:"infoIcon__84nL1",title:"title__2iaYI",listItemWrapper:"listItemWrapper__21eW2",listItemLink:"listItemLink__3j4FE",listItem:"listItem__29e2n",listItemAction:"listItemAction__1tmWk",listItemMain:"listItemMain__2KU1-",listItemAside:"listItemAside__1m9LH",itemActionLink:"itemActionLink__3B_OP",startTime:"startTime__-cf_E",price:"price__2Elbz",category:"category__g6hkq",venue:"venue__1vLQq",instructor:"instructor__1SQ9m",filtersButtonWrapper:"filtersButtonWrapper__3uNOD",filtersButtonContainer:"filtersButtonContainer__2eD-l",filtersButton:"filtersButton__2nkFI",filterIcon:"filterIcon__IAjqJ",filterCount:"filterCount__2uHeF",mapIcon:"mapIcon__3PXt2",listIcon:"listIcon__1BJh3",dayWrapper:"dayWrapper__2wPmt"}},"BIG+":function(t){t.exports={filtersWrapper:"filtersWrapper__3DXok",close:"close__3YC_j",filters:"filters__2Mi00",header:"header__1Q-0o",button:"button__2O3PH",section:"section__2Vu0e",sectionHeader:"sectionHeader__7zBDh",sectionTitle:"sectionTitle__3OWFO",checkBoxesContainer:"checkBoxesContainer__1pJev",checkBox:"checkBox__2NH0p",label:"label__1AZ7E",tick:"tick__1DFlr",active:"active__619x7"}},Pk41:function(t){t.exports={search:"search__2fBVV"}},jTUD:function(t){t.exports=function(){"use strict";var t="millisecond",e="second",a="minute",s="hour",i="day",r="week",n="month",o="quarter",c="year",l=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,h=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,u=function(t,e,a){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(a)+t},f={s:u,z:function(t){var e=-t.utcOffset(),a=Math.abs(e),s=Math.floor(a/60),i=a%60;return(e<=0?"+":"-")+u(s,2,"0")+":"+u(i,2,"0")},m:function(t,e){var a=12*(e.year()-t.year())+(e.month()-t.month()),s=t.clone().add(a,n),i=e-s<0,r=t.clone().add(a+(i?-1:1),n);return Number(-(a+(e-s)/(i?s-r:r-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(l){return{M:n,y:c,w:r,d:i,h:s,m:a,s:e,ms:t,Q:o}[l]||String(l||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},p="en",m={};m[p]=d;var v=function(t){return t instanceof y},b=function(t,e,a){var s;if(!t)return p;if("string"==typeof t)m[t]&&(s=t),e&&(m[t]=e,s=t);else{var i=t.name;m[i]=t,s=i}return a||(p=s),s},O=function(t,e,a){if(v(t))return t.clone();var s=e?"string"==typeof e?{format:e,pl:a}:e:{};return s.date=t,new y(s)},g=f;g.l=b,g.i=v,g.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u})};var y=function(){function u(t){this.$L=this.$L||b(t.locale,null,!0),this.parse(t)}var f=u.prototype;return f.parse=function(t){this.$d=function(t){var e=t.date,a=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(l);if(s)return a?new Date(Date.UTC(s[1],s[2]-1,s[3]||1,s[4]||0,s[5]||0,s[6]||0,s[7]||0)):new Date(s[1],s[2]-1,s[3]||1,s[4]||0,s[5]||0,s[6]||0,s[7]||0)}return new Date(e)}(t),this.init()},f.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},f.$utils=function(){return g},f.isValid=function(){return!("Invalid Date"===this.$d.toString())},f.isSame=function(t,e){var a=O(t);return this.startOf(e)<=a&&a<=this.endOf(e)},f.isAfter=function(t,e){return O(t)<this.startOf(e)},f.isBefore=function(t,e){return this.endOf(e)<O(t)},f.$g=function(t,e,a){return g.u(t)?this[e]:this.set(a,t)},f.year=function(t){return this.$g(t,"$y",c)},f.month=function(t){return this.$g(t,"$M",n)},f.day=function(t){return this.$g(t,"$W",i)},f.date=function(t){return this.$g(t,"$D","date")},f.hour=function(t){return this.$g(t,"$H",s)},f.minute=function(t){return this.$g(t,"$m",a)},f.second=function(t){return this.$g(t,"$s",e)},f.millisecond=function(e){return this.$g(e,"$ms",t)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(t,o){var l=this,h=!!g.u(o)||o,u=g.p(t),f=function(t,e){var a=g.w(l.$u?Date.UTC(l.$y,e,t):new Date(l.$y,e,t),l);return h?a:a.endOf(i)},d=function(t,e){return g.w(l.toDate()[t].apply(l.toDate(),(h?[0,0,0,0]:[23,59,59,999]).slice(e)),l)},p=this.$W,m=this.$M,v=this.$D,b="set"+(this.$u?"UTC":"");switch(u){case c:return h?f(1,0):f(31,11);case n:return h?f(1,m):f(0,m+1);case r:var O=this.$locale().weekStart||0,y=(p<O?p+7:p)-O;return f(h?v-y:v+(6-y),m);case i:case"date":return d(b+"Hours",0);case s:return d(b+"Minutes",1);case a:return d(b+"Seconds",2);case e:return d(b+"Milliseconds",3);default:return this.clone()}},f.endOf=function(t){return this.startOf(t,!1)},f.$set=function(r,o){var l,h=g.p(r),u="set"+(this.$u?"UTC":""),f=(l={},l[i]=u+"Date",l.date=u+"Date",l[n]=u+"Month",l[c]=u+"FullYear",l[s]=u+"Hours",l[a]=u+"Minutes",l[e]=u+"Seconds",l[t]=u+"Milliseconds",l)[h],d=h===i?this.$D+(o-this.$W):o;if(h===n||h===c){var p=this.clone().set("date",1);p.$d[f](d),p.init(),this.$d=p.set("date",Math.min(this.$D,p.daysInMonth())).toDate()}else f&&this.$d[f](d);return this.init(),this},f.set=function(t,e){return this.clone().$set(t,e)},f.get=function(t){return this[g.p(t)]()},f.add=function(t,o){var l,h=this;t=Number(t);var u=g.p(o),f=function(e){var a=O(h);return g.w(a.date(a.date()+Math.round(e*t)),h)};if(u===n)return this.set(n,this.$M+t);if(u===c)return this.set(c,this.$y+t);if(u===i)return f(1);if(u===r)return f(7);var d=(l={},l[a]=6e4,l[s]=36e5,l[e]=1e3,l)[u]||1,p=this.valueOf()+t*d;return g.w(p,this)},f.subtract=function(t,e){return this.add(-1*t,e)},f.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var a=t||"YYYY-MM-DDTHH:mm:ssZ",s=g.z(this),i=this.$locale(),r=this.$H,n=this.$m,o=this.$M,c=i.weekdays,l=i.months,u=function(t,s,i,r){return t&&(t[s]||t(e,a))||i[s].substr(0,r)},f=function(t){return g.s(r%12||12,t,"0")},d=i.meridiem||function(t,e,a){var s=t<12?"AM":"PM";return a?s.toLowerCase():s},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:g.s(o+1,2,"0"),MMM:u(i.monthsShort,o,l,3),MMMM:l[o]||l(this,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:u(i.weekdaysMin,this.$W,c,2),ddd:u(i.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(r),HH:g.s(r,2,"0"),h:f(1),hh:f(2),a:d(r,n,!0),A:d(r,n,!1),m:String(n),mm:g.s(n,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:s};return a.replace(h,(function(t,e){return e||p[t]||s.replace(":","")}))},f.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},f.diff=function(t,l,h){var u,f=g.p(l),d=O(t),p=6e4*(d.utcOffset()-this.utcOffset()),m=this-d,v=g.m(this,d);return v=(u={},u[c]=v/12,u[n]=v,u[o]=v/3,u[r]=(m-p)/6048e5,u[i]=(m-p)/864e5,u[s]=m/36e5,u[a]=m/6e4,u[e]=m/1e3,u)[f]||m,h?v:g.a(v)},f.daysInMonth=function(){return this.endOf(n).$D},f.$locale=function(){return m[this.$L]},f.locale=function(t,e){if(!t)return this.$L;var a=this.clone();return a.$L=b(t,e,!0),a},f.clone=function(){return g.w(this.toDate(),this)},f.toDate=function(){return new Date(this.$d)},f.toJSON=function(){return this.isValid()?this.toISOString():null},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},u}();return O.prototype=y.prototype,O.extend=function(t,e){return t(e,y,O),O},O.locale=b,O.isDayjs=v,O.unix=function(t){return O(1e3*t)},O.en=m[p],O.Ls=m,O}()},zc1A:function(t,e,a){"use strict";function s(t){var e=function(t){var e=t.indexOf("?"),a=t.indexOf("#");if(-1===a&&-1===e)return{};-1===a&&(a=t.length);var s=-1===e||a===e+1?t.substring(a):t.substring(e+1,a),i={};return s.split("&").forEach((function(t){if(t){var e=(t=t.split("+").join(" ")).indexOf("="),a=e>-1?t.substr(0,e):t,s=e>-1?decodeURIComponent(t.substr(e+1)):"",r=a.indexOf("[");if(-1===r)i[decodeURIComponent(a)]=s;else{var n=a.indexOf("]",r),o=decodeURIComponent(a.substring(r+1,n));a=decodeURIComponent(a.substring(0,r)),i[a]||(i[a]=[]),o?i[a][o]=s:i[a].push(s)}}})),i}(t),a={};if(e.i)try{a=JSON.parse(e.i)}catch(t){console.error("Failed to parse query filters")}return a}function i(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s])}return t}).apply(this,arguments)}function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function o(t){if(t&&t.length){var e=t.split("-");if(3===e.length){var a=parseInt(e[0]),s=parseInt(e[1])-1,i=parseInt(e[2]);return p()().set("date",i).set("month",s).set("year",a)}}return p()()}a.r(e);var c=a("hosL"),l=a("Pk41"),h=a.n(l),u=a("5xue"),f=a.n(u),d=a("jTUD"),p=a.n(d),m=a("Y3FI"),v=a("BIG+"),b=a.n(v),O=a("KYDX"),g={capoeira:{name:"capoeira",label:"Capoeira",type:"category"},ballet:{name:"ballet",label:"Ballet",type:"category"},hip_hop:{name:"hip_hop",label:"Hip Hop",type:"category"},break_dance:{name:"break_dance",label:"Break Dance",type:"category"},salsa:{name:"salsa",label:"Salsa",type:"category"},tap:{name:"tap",label:"Tap",type:"category"}};class y extends c.Component{constructor(t){super(t),i(this,"onRoute",()=>{}),i(this,"simulateToggleUrl",(t,e)=>{var a=JSON.parse(JSON.stringify(e));return t.name in a?delete a[t.name]:a[t.name]={type:t.type},{path:"/search/filters"+(Object.keys(a).length?"?i="+JSON.stringify(a):""),filters:a}}),i(this,"toggle",t=>e=>{e.stopPropagation(),e.preventDefault();var{filters:a}=this.state,{path:s,filters:i}=this.simulateToggleUrl(t,a);this.setState({filters:i},()=>(function(t){if(history.pushState){var e=window.location.protocol+"//"+window.location.host+t;window.history.pushState({path:e},"",e)}})(s))}),i(this,"simulateBackToSearchUrl",()=>Object(O.a)()?this.props.url.replace("/filters",""):location.pathname.replace("/filters","")+location.search),i(this,"onDone",t=>{t.preventDefault(),t.stopPropagation();var e=this.simulateBackToSearchUrl();this.props.onDone&&this.props.onDone(this.state.filters),Object(m.route)(e)}),i(this,"onReset",t=>{t.preventDefault(),t.stopPropagation();this.setState({filters:{}}),this.props.onDone&&this.props.onDone({}),Object(m.route)("/search")});var e=s(Object(O.a)()?t.url:location.href),a={};for(var r in g)a[r]=this.simulateToggleUrl(g[r],e).path;this.state={filters:e,simulateToggle:a,activities:g,times:[{name:"06",label:"6am to 9am",type:"time"},{name:"09",label:"9am to 12am",type:"time"},{name:"12",label:"12am to 3pm",type:"time"},{name:"15",label:"3pm to 6pm",type:"time"},{name:"18",label:"6pm to 9pm",type:"time"},{name:"21",label:"9pm to 12pm",type:"time"}]}}componentDidMount(){}render(t,e){var{filters:a,simulateToggle:s,activities:i}=e;return Object(c.h)("div",{className:b.a.filtersWrapper+" "+(this.props.active?"":b.a.close)},Object(c.h)("div",{className:b.a.filters},Object(c.h)("div",{className:b.a.header},Object(c.h)("a",{href:"/search",onClick:this.onReset,className:b.a.button},"Reset"),Object(c.h)("div",{className:b.a.title},"FILTERS"),Object(c.h)("a",{href:this.simulateBackToSearchUrl(),onClick:this.onDone,className:b.a.button},"Done")),Object(c.h)("div",{className:b.a.section},Object(c.h)("div",{className:b.a.sectionHeader},Object(c.h)("div",{className:b.a.sectionTitle},"TIME")),Object(c.h)("div",{className:b.a.checkBoxesContainer},this.state.times.map(t=>Object(c.h)("div",{onClick:this.toggle(t),className:b.a.checkBox+" "+(t.name in a?b.a.active:"")},Object(c.h)("div",{className:b.a.label},t.label),Object(c.h)("div",{className:""+b.a.tick}))))),Object(c.h)("div",{className:b.a.section},Object(c.h)("div",{className:b.a.sectionHeader},Object(c.h)("div",{className:b.a.sectionTitle},"ACTIVITIES")),Object(c.h)("div",{className:b.a.checkBoxesContainer},Object.values(i).map(t=>Object(c.h)("a",{href:""+s[t.name],onClick:this.toggle(t),className:b.a.checkBox+" "+(t.name in a?b.a.active:"")},Object(c.h)("div",{className:b.a.label},t.label," "),Object(c.h)("div",{className:""+b.a.tick})))))))}}var _=a("2vwG"),j=a("js4v"),D=a("HDkH");Object(O.a)()||setTimeout(D.a,6e3);var $=t=>{var[e,a]=t.split(":");return 60*parseInt(e)+parseInt(a)};Object(O.a)()||(window.dayjs=p.a);class N extends c.Component{constructor(t){super(t),n(this,"getFilterCount",t=>"object"==typeof t?Object.keys(t).filter(t=>"day"!==t).length:0),n(this,"doSearch",async()=>{var t,{filters:e,day:a}=this.state;await this.setState({isLoading:!0});try{t=await this.props.data.getSearch(e)}catch(t){this.setState({isOffline:!0})}this.setState({isLoading:!1,day:a||o(this.props.date),allClasses:t.results},()=>t.results&&this.doLocalSearch())}),n(this,"doLocalSearchInner",(t,e,a)=>{e.isValid()||console.error("Invalid Date");var s=e.day(),i=[];return t&&(i=Object.values(t).filter(t=>{if(t.day!==s)return!1;var e=!1,i=!1;for(var r in a)if(a.hasOwnProperty(r)){var n=a[r];if("time"===n.type){i=!0;var o=$(t.start_time),c=60*parseInt(r);if(o>=c&&o<=c+180)return!0}else if("category"===n.type){e=!0;for(var l=0;l<t.categories.length;l++){if(t.categories[l].name.toLowerCase()===r.toLowerCase())return!0}}}return!i&&!e})),i}),n(this,"doLocalSearch",()=>{var t=this.doLocalSearchInner(this.state.allClasses,this.state.day,this.state.filters);return this.setState({classes:t}),t}),n(this,"simulateToUrl",t=>{var e=this.state.day.format("YYYY-MM-DD"),a=new RegExp("(/search/?("+e+")?)/?"),s="/search/"+e+t;return Object(O.a)()?this.props.url.replace(a,s):location.pathname.replace(a,s)+location.search}),n(this,"onDone",t=>{this.setState({filters:t,filterCount:this.getFilterCount(t)},this.doLocalSearch)}),n(this,"isFilterView",()=>0===this.props.path.indexOf("/search/:date/filters")),n(this,"toggleMapView",()=>{console.log("this.props.url",this.props.url),event.preventDefault(),event.stopPropagation(),this.setState({isMapView:!this.state.isMapView})}),n(this,"toggleFilters",t=>(t.preventDefault(),t.stopPropagation(),this.isFilterView()?Object(m.route)(this.props.url.replace("/filters","")):Object(m.route)(this.simulateToUrl("/filters")))),n(this,"routeToFilters",t=>(t.preventDefault(),t.stopPropagation(),Object(m.route)(this.simulateToUrl("/filters")))),n(this,"addDay",t=>e=>{e.preventDefault(),e.stopPropagation();var{day:a,filters:s}=this.state,{day:i,filters:r,url:n}=this.simulateAddDayUrl(t,a,s);this.setState({day:i,filters:r},this.doLocalSearch),Object(m.route)(n)}),n(this,"simulateAddDayUrl",(function(t,e,a){return void 0===a&&(a={}),{day:e=p()(e).add(t,"day"),filters:a,url:"/search/"+p()(e).format("YYYY-MM-DD")+"/?i="+JSON.stringify(a)}})),n(this,"formatCurrentDay",()=>{var{day:t}=this.state,e=p()().set("hour",t.hour()).set("minute",t.minute()).set("second",t.second()).set("millisecond",t.millisecond()),a=t.diff(e,"day");return 0===a?"TODAY":1===a?"TOMORROW":-1===a?"YESTERDAY":t.format("dddd D MMM").toUpperCase()});var e=s(t.url||location.href)||{},a=this.getFilterCount(e),i=o(t.date),r=t.data.state.classes,c={day:i,filters:e,filterCount:a,allClasses:r,isOffline:!1,classes:this.doLocalSearchInner(r,i,e)};this.state=c}async componentDidMount(){await this.doSearch()}render(t,e){var{day:a,filters:s,filterCount:i,classes:n}=e;return Object(c.h)("div",{className:f.a.search},Object(c.h)("div",{className:f.a.dayWrapper},Object(c.h)("a",{href:this.simulateAddDayUrl(-1,a,s).url,onClick:this.addDay(-1),className:"leftArrow"}),Object(c.h)("div",null,this.formatCurrentDay()),Object(c.h)("a",{href:(this.simulateAddDayUrl(1),s).url,onClick:this.addDay(1),className:"rightArrow"})),Object(c.h)("div",{className:Object(j.a)({[f.a.infoWrapper]:!0,hide:this.state.isLoading||0!==n.length||this.state.isOffline})},Object(c.h)("div",{className:f.a.infoMessage},Object(c.h)("div",{className:"shrug "+f.a.infoIcon}),Object(c.h)("div",{className:f.a.title},"No classes found"))),Object(c.h)("div",{className:Object(j.a)({[f.a.infoWrapper]:!0,hide:!this.state.isOffline})},Object(c.h)("div",{className:f.a.infoMessage},Object(c.h)("div",{className:"shrug "+f.a.infoIcon}),Object(c.h)("div",{className:f.a.title},"You are offline"))),Object(c.h)("div",{className:Object(j.a)({[f.a.infoWrapper]:!0,hide:!this.state.isLoading||0!==n.length})},Object(c.h)("img",{width:"85",height:"119",src:"/assets/images/dancing.gif",alt:"loading"}),Object(c.h)("div",null,"Loading")),Object(c.h)(_.a,{key:"Map",items:n,onDone:this.onDone,active:this.state.isMapView}),Object(c.h)("div",{style:{display:this.state.isMapView?"none":"flex"},className:Object(j.a)({[f.a.listItems]:!0})},n&&n.map(t=>Object(c.h)("div",{onClick:()=>Object(m.route)("/classes/"+t.id+"?i=1"),className:f.a.listItemWrapper},Object(O.a)()&&Object(c.h)("a",{className:f.a.listItemLink,href:"/classes/"+t.id+"?i=1"}),Object(c.h)("div",{className:f.a.listItem},Object(c.h)("div",{className:f.a.listItemAside},Object(c.h)("div",{className:f.a.startTime},t.start_time),Object(c.h)("div",{className:f.a.price},"£",t.price)),Object(c.h)("div",{className:f.a.listItemMain},Object(c.h)("div",{className:f.a.categories},t.categories.map((t,e)=>Object(c.h)("a",{className:f.a.category,key:e,href:"/search/category/"+t.normalized_name},"#",t.name.toLowerCase()))),Object(c.h)("div",{className:f.a.title},t.title),Object(c.h)("div",{className:f.a.venue},Object(c.h)("div",null,t.venue.name),Object(c.h)("div",null,t.venue.area)),t.instructors[0]&&Object(c.h)("div",{className:f.a.instructor},Object(c.h)("img",{className:f.a.instructorAvatar,alt:t.instructors[0].name,src:t.instructors[0].profile.profile_image_url||"https://api.adorable.io/avatars/60/"+t.instructors[0].email+".png"}),Object(c.h)("div",{className:f.a.instructorName},t.instructors[0].name))),Object(c.h)("div",{className:f.a.listItemAction},Object(c.h)("a",{className:f.a.itemActionLink,href:"/classes/"+t.id},Object(c.h)("span",{className:"rightArrow"}))))))),Object(c.h)(y,r({},this.props,{onDone:this.onDone,active:0===this.props.path.indexOf("/search/:date/filters")})),Object(c.h)("div",{className:f.a.filtersButtonWrapper},Object(c.h)("div",{className:f.a.filtersButtonContainer},Object(c.h)("a",{href:this.simulateToUrl("/filters"),onClick:this.toggleFilters,className:f.a.filtersButton},Object(c.h)("div",{className:f.a.filterIcon}),"Filters",i>0&&Object(c.h)("div",{className:f.a.filterCount},i)),Object(c.h)("a",{onClick:()=>Object(m.route)(this.simulateToUrl("/map")),className:f.a.filtersButton,onClick:this.toggleMapView},Object(c.h)("div",{className:f.a.filterIcon+" "+(this.state.isMapView?f.a.listIcon:f.a.mapIcon)}),this.state.isMapView?"List View":"Map View"))))}}var M=t=>Object(c.h)("div",{class:h.a.search},Object(c.h)(N,t));e.default=M;M.getInitialProps=async()=>{var t=await fetch("https://instructorlist-django.herokuapp.com/api/classes");return{classes:await t.json()}}}}]);
//# sourceMappingURL=route-search.chunk.7cdbd.esm.js.map