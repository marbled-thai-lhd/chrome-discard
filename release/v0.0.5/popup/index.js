!function(){var t={9662:function(t,e,n){var r=n(614),o=n(6330),i=TypeError;t.exports=function(t){if(r(t))return t;throw i(o(t)+" is not a function")}},9670:function(t,e,n){var r=n(111),o=String,i=TypeError;t.exports=function(t){if(r(t))return t;throw i(o(t)+" is not an object")}},1318:function(t,e,n){var r=n(5656),o=n(1400),i=n(6244),a=function(t){return function(e,n,a){var c,u=r(e),s=i(u),f=o(a,s);if(t&&n!=n){for(;s>f;)if((c=u[f++])!=c)return!0}else for(;s>f;f++)if((t||f in u)&&u[f]===n)return t||f||0;return!t&&-1}};t.exports={includes:a(!0),indexOf:a(!1)}},3658:function(t,e,n){"use strict";var r=n(9781),o=n(3157),i=TypeError,a=Object.getOwnPropertyDescriptor,c=r&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(t){return t instanceof TypeError}}();t.exports=c?function(t,e){if(o(t)&&!a(t,"length").writable)throw i("Cannot set read only .length");return t.length=e}:function(t,e){return t.length=e}},4326:function(t,e,n){var r=n(1702),o=r({}.toString),i=r("".slice);t.exports=function(t){return i(o(t),8,-1)}},9920:function(t,e,n){var r=n(2597),o=n(3887),i=n(1236),a=n(3070);t.exports=function(t,e,n){for(var c=o(e),u=a.f,s=i.f,f=0;f<c.length;f++){var l=c[f];r(t,l)||n&&r(n,l)||u(t,l,s(e,l))}}},8880:function(t,e,n){var r=n(9781),o=n(3070),i=n(9114);t.exports=r?function(t,e,n){return o.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},9114:function(t){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},8052:function(t,e,n){var r=n(614),o=n(3070),i=n(6339),a=n(3072);t.exports=function(t,e,n,c){c||(c={});var u=c.enumerable,s=void 0!==c.name?c.name:e;if(r(n)&&i(n,s,c),c.global)u?t[e]=n:a(e,n);else{try{c.unsafe?t[e]&&(u=!0):delete t[e]}catch(t){}u?t[e]=n:o.f(t,e,{value:n,enumerable:!1,configurable:!c.nonConfigurable,writable:!c.nonWritable})}return t}},3072:function(t,e,n){var r=n(7854),o=Object.defineProperty;t.exports=function(t,e){try{o(r,t,{value:e,configurable:!0,writable:!0})}catch(n){r[t]=e}return e}},9781:function(t,e,n){var r=n(7293);t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},4154:function(t){var e="object"==typeof document&&document.all,n=void 0===e&&void 0!==e;t.exports={all:e,IS_HTMLDDA:n}},317:function(t,e,n){var r=n(7854),o=n(111),i=r.document,a=o(i)&&o(i.createElement);t.exports=function(t){return a?i.createElement(t):{}}},7207:function(t){var e=TypeError;t.exports=function(t){if(t>9007199254740991)throw e("Maximum allowed index exceeded");return t}},8113:function(t){t.exports="undefined"!=typeof navigator&&String(navigator.userAgent)||""},7392:function(t,e,n){var r,o,i=n(7854),a=n(8113),c=i.process,u=i.Deno,s=c&&c.versions||u&&u.version,f=s&&s.v8;f&&(o=(r=f.split("."))[0]>0&&r[0]<4?1:+(r[0]+r[1])),!o&&a&&(!(r=a.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=a.match(/Chrome\/(\d+)/))&&(o=+r[1]),t.exports=o},748:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2109:function(t,e,n){var r=n(7854),o=n(1236).f,i=n(8880),a=n(8052),c=n(3072),u=n(9920),s=n(4705);t.exports=function(t,e){var n,f,l,p,d,h=t.target,v=t.global,y=t.stat;if(n=v?r:y?r[h]||c(h,{}):(r[h]||{}).prototype)for(f in e){if(p=e[f],l=t.dontCallGetSet?(d=o(n,f))&&d.value:n[f],!s(v?f:h+(y?".":"#")+f,t.forced)&&void 0!==l){if(typeof p==typeof l)continue;u(p,l)}(t.sham||l&&l.sham)&&i(p,"sham",!0),a(n,f,p,t)}}},7293:function(t){t.exports=function(t){try{return!!t()}catch(t){return!0}}},4374:function(t,e,n){var r=n(7293);t.exports=!r((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},6916:function(t,e,n){var r=n(4374),o=Function.prototype.call;t.exports=r?o.bind(o):function(){return o.apply(o,arguments)}},6530:function(t,e,n){var r=n(9781),o=n(2597),i=Function.prototype,a=r&&Object.getOwnPropertyDescriptor,c=o(i,"name"),u=c&&"something"===function(){}.name,s=c&&(!r||r&&a(i,"name").configurable);t.exports={EXISTS:c,PROPER:u,CONFIGURABLE:s}},1702:function(t,e,n){var r=n(4374),o=Function.prototype,i=o.call,a=r&&o.bind.bind(i,i);t.exports=r?a:function(t){return function(){return i.apply(t,arguments)}}},5005:function(t,e,n){var r=n(7854),o=n(614);t.exports=function(t,e){return arguments.length<2?(n=r[t],o(n)?n:void 0):r[t]&&r[t][e];var n}},8173:function(t,e,n){var r=n(9662),o=n(8554);t.exports=function(t,e){var n=t[e];return o(n)?void 0:r(n)}},7854:function(t,e,n){var r=function(t){return t&&t.Math==Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||function(){return this}()||this||Function("return this")()},2597:function(t,e,n){var r=n(1702),o=n(7908),i=r({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,e){return i(o(t),e)}},3501:function(t){t.exports={}},4664:function(t,e,n){var r=n(9781),o=n(7293),i=n(317);t.exports=!r&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},8361:function(t,e,n){var r=n(1702),o=n(7293),i=n(4326),a=Object,c=r("".split);t.exports=o((function(){return!a("z").propertyIsEnumerable(0)}))?function(t){return"String"==i(t)?c(t,""):a(t)}:a},2788:function(t,e,n){var r=n(1702),o=n(614),i=n(5465),a=r(Function.toString);o(i.inspectSource)||(i.inspectSource=function(t){return a(t)}),t.exports=i.inspectSource},9909:function(t,e,n){var r,o,i,a=n(4811),c=n(7854),u=n(111),s=n(8880),f=n(2597),l=n(5465),p=n(6200),d=n(3501),h="Object already initialized",v=c.TypeError,y=c.WeakMap;if(a||l.state){var g=l.state||(l.state=new y);g.get=g.get,g.has=g.has,g.set=g.set,r=function(t,e){if(g.has(t))throw v(h);return e.facade=t,g.set(t,e),e},o=function(t){return g.get(t)||{}},i=function(t){return g.has(t)}}else{var m=p("state");d[m]=!0,r=function(t,e){if(f(t,m))throw v(h);return e.facade=t,s(t,m,e),e},o=function(t){return f(t,m)?t[m]:{}},i=function(t){return f(t,m)}}t.exports={set:r,get:o,has:i,enforce:function(t){return i(t)?o(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!u(e)||(n=o(e)).type!==t)throw v("Incompatible receiver, "+t+" required");return n}}}},3157:function(t,e,n){var r=n(4326);t.exports=Array.isArray||function(t){return"Array"==r(t)}},614:function(t,e,n){var r=n(4154),o=r.all;t.exports=r.IS_HTMLDDA?function(t){return"function"==typeof t||t===o}:function(t){return"function"==typeof t}},4705:function(t,e,n){var r=n(7293),o=n(614),i=/#|\.prototype\./,a=function(t,e){var n=u[c(t)];return n==f||n!=s&&(o(e)?r(e):!!e)},c=a.normalize=function(t){return String(t).replace(i,".").toLowerCase()},u=a.data={},s=a.NATIVE="N",f=a.POLYFILL="P";t.exports=a},8554:function(t){t.exports=function(t){return null==t}},111:function(t,e,n){var r=n(614),o=n(4154),i=o.all;t.exports=o.IS_HTMLDDA?function(t){return"object"==typeof t?null!==t:r(t)||t===i}:function(t){return"object"==typeof t?null!==t:r(t)}},1913:function(t){t.exports=!1},2190:function(t,e,n){var r=n(5005),o=n(614),i=n(7976),a=n(3307),c=Object;t.exports=a?function(t){return"symbol"==typeof t}:function(t){var e=r("Symbol");return o(e)&&i(e.prototype,c(t))}},6244:function(t,e,n){var r=n(7466);t.exports=function(t){return r(t.length)}},6339:function(t,e,n){var r=n(1702),o=n(7293),i=n(614),a=n(2597),c=n(9781),u=n(6530).CONFIGURABLE,s=n(2788),f=n(9909),l=f.enforce,p=f.get,d=String,h=Object.defineProperty,v=r("".slice),y=r("".replace),g=r([].join),m=c&&!o((function(){return 8!==h((function(){}),"length",{value:8}).length})),b=String(String).split("String"),w=t.exports=function(t,e,n){"Symbol("===v(d(e),0,7)&&(e="["+y(d(e),/^Symbol\(([^)]*)\)/,"$1")+"]"),n&&n.getter&&(e="get "+e),n&&n.setter&&(e="set "+e),(!a(t,"name")||u&&t.name!==e)&&(c?h(t,"name",{value:e,configurable:!0}):t.name=e),m&&n&&a(n,"arity")&&t.length!==n.arity&&h(t,"length",{value:n.arity});try{n&&a(n,"constructor")&&n.constructor?c&&h(t,"prototype",{writable:!1}):t.prototype&&(t.prototype=void 0)}catch(t){}var r=l(t);return a(r,"source")||(r.source=g(b,"string"==typeof e?e:"")),t};Function.prototype.toString=w((function(){return i(this)&&p(this).source||s(this)}),"toString")},4758:function(t){var e=Math.ceil,n=Math.floor;t.exports=Math.trunc||function(t){var r=+t;return(r>0?n:e)(r)}},3070:function(t,e,n){var r=n(9781),o=n(4664),i=n(3353),a=n(9670),c=n(4948),u=TypeError,s=Object.defineProperty,f=Object.getOwnPropertyDescriptor,l="enumerable",p="configurable",d="writable";e.f=r?i?function(t,e,n){if(a(t),e=c(e),a(n),"function"==typeof t&&"prototype"===e&&"value"in n&&d in n&&!n[d]){var r=f(t,e);r&&r[d]&&(t[e]=n.value,n={configurable:p in n?n[p]:r[p],enumerable:l in n?n[l]:r[l],writable:!1})}return s(t,e,n)}:s:function(t,e,n){if(a(t),e=c(e),a(n),o)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw u("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},1236:function(t,e,n){var r=n(9781),o=n(6916),i=n(5296),a=n(9114),c=n(5656),u=n(4948),s=n(2597),f=n(4664),l=Object.getOwnPropertyDescriptor;e.f=r?l:function(t,e){if(t=c(t),e=u(e),f)try{return l(t,e)}catch(t){}if(s(t,e))return a(!o(i.f,t,e),t[e])}},8006:function(t,e,n){var r=n(6324),o=n(748).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},5181:function(t,e){e.f=Object.getOwnPropertySymbols},7976:function(t,e,n){var r=n(1702);t.exports=r({}.isPrototypeOf)},6324:function(t,e,n){var r=n(1702),o=n(2597),i=n(5656),a=n(1318).indexOf,c=n(3501),u=r([].push);t.exports=function(t,e){var n,r=i(t),s=0,f=[];for(n in r)!o(c,n)&&o(r,n)&&u(f,n);for(;e.length>s;)o(r,n=e[s++])&&(~a(f,n)||u(f,n));return f}},5296:function(t,e){"use strict";var n={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,o=r&&!n.call({1:2},1);e.f=o?function(t){var e=r(this,t);return!!e&&e.enumerable}:n},2140:function(t,e,n){var r=n(6916),o=n(614),i=n(111),a=TypeError;t.exports=function(t,e){var n,c;if("string"===e&&o(n=t.toString)&&!i(c=r(n,t)))return c;if(o(n=t.valueOf)&&!i(c=r(n,t)))return c;if("string"!==e&&o(n=t.toString)&&!i(c=r(n,t)))return c;throw a("Can't convert object to primitive value")}},3887:function(t,e,n){var r=n(5005),o=n(1702),i=n(8006),a=n(5181),c=n(9670),u=o([].concat);t.exports=r("Reflect","ownKeys")||function(t){var e=i.f(c(t)),n=a.f;return n?u(e,n(t)):e}},4488:function(t,e,n){var r=n(8554),o=TypeError;t.exports=function(t){if(r(t))throw o("Can't call method on "+t);return t}},6200:function(t,e,n){var r=n(2309),o=n(9711),i=r("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},5465:function(t,e,n){var r=n(7854),o=n(3072),i="__core-js_shared__",a=r[i]||o(i,{});t.exports=a},2309:function(t,e,n){var r=n(1913),o=n(5465);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.30.2",mode:r?"pure":"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.30.2/LICENSE",source:"https://github.com/zloirock/core-js"})},6293:function(t,e,n){var r=n(7392),o=n(7293),i=n(7854).String;t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol();return!i(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&r&&r<41}))},1400:function(t,e,n){var r=n(9303),o=Math.max,i=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):i(n,e)}},5656:function(t,e,n){var r=n(8361),o=n(4488);t.exports=function(t){return r(o(t))}},9303:function(t,e,n){var r=n(4758);t.exports=function(t){var e=+t;return e!=e||0===e?0:r(e)}},7466:function(t,e,n){var r=n(9303),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},7908:function(t,e,n){var r=n(4488),o=Object;t.exports=function(t){return o(r(t))}},7593:function(t,e,n){var r=n(6916),o=n(111),i=n(2190),a=n(8173),c=n(2140),u=n(5112),s=TypeError,f=u("toPrimitive");t.exports=function(t,e){if(!o(t)||i(t))return t;var n,u=a(t,f);if(u){if(void 0===e&&(e="default"),n=r(u,t,e),!o(n)||i(n))return n;throw s("Can't convert object to primitive value")}return void 0===e&&(e="number"),c(t,e)}},4948:function(t,e,n){var r=n(7593),o=n(2190);t.exports=function(t){var e=r(t,"string");return o(e)?e:e+""}},6330:function(t){var e=String;t.exports=function(t){try{return e(t)}catch(t){return"Object"}}},9711:function(t,e,n){var r=n(1702),o=0,i=Math.random(),a=r(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+a(++o+i,36)}},3307:function(t,e,n){var r=n(6293);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3353:function(t,e,n){var r=n(9781),o=n(7293);t.exports=r&&o((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},4811:function(t,e,n){var r=n(7854),o=n(614),i=r.WeakMap;t.exports=o(i)&&/native code/.test(String(i))},5112:function(t,e,n){var r=n(7854),o=n(2309),i=n(2597),a=n(9711),c=n(6293),u=n(3307),s=r.Symbol,f=o("wks"),l=u?s.for||s:s&&s.withoutSetter||a;t.exports=function(t){return i(f,t)||(f[t]=c&&i(s,t)?s[t]:l("Symbol."+t)),f[t]}},7658:function(t,e,n){"use strict";var r=n(2109),o=n(7908),i=n(6244),a=n(3658),c=n(7207);r({target:"Array",proto:!0,arity:1,forced:n(7293)((function(){return 4294967297!==[].push.call({length:4294967296},1)}))||!function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(t){return t instanceof TypeError}}()},{push:function(t){var e=o(this),n=i(e),r=arguments.length;c(n+r);for(var u=0;u<r;u++)e[n]=arguments[u],n++;return a(e,n),n}})}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),function(){"use strict";const t="activated",e="__timer__",r=async t=>{const e=i(t);return await o(e)},o=async t=>(await chrome.storage.local.get([t]))[t],i=t=>{let e=new URL(t);return`__except__${e.origin}${e.pathname}`},a=async()=>{const e=await(async()=>await o(t))();chrome.action.setIcon({path:c(e)})},c=t=>[16,32,64,128].reduce(((e,n)=>(e[n]=(t=>t?"/assets/icons/started-*.png":"/assets/icons/stopped-*.png")(t).replace("*",n),e)),{});n(7658);const u="screens",s=["id"],f="PK";var l=class{constructor(){this.db=null,this.initialized=!1,this.initializedPromise=null,this.open()}open(){const t=this;this.db&&this.db.close();const e=indexedDB.open("MagicChicken",2);e.onupgradeneeded=t=>{const e=t.target.result;e.objectStoreNames.contains(u)||e.createObjectStore(u,{keyPath:s}).createIndex(f,s,{unique:!0})},this.initializedPromise=new Promise(((n,r)=>{e.onsuccess=e=>{t.db=e.target.result,t.initialized=!0,n()},e.onerror=r}))}getTransaction(t){const e=this,n=(n,o,i=!0)=>{try{n(e.db.transaction([u],t))}catch(t){if("InvalidStateError"==t.name&&i)return e.open(),r(n,o,!1);throw o(),t}},r=(t,r,o=!0)=>{e.initializedPromise.then((()=>n(t,r,o)))};return this.db?new Promise(n):new Promise(r)}getAll(t,e=(()=>{})){this.getTransaction("readonly").then((n=>{const r=n.objectStore(u).openCursor(),o=[];r.onsuccess=e=>{const n=e.target.result;if(!n)return t(o);o.push(n.value),n.continue()},r.onerror=e}))}getByPrimaryIndex(t,e){this.getTransaction("readonly").then((n=>{const r=n.objectStore(u).index(f).get(IDBKeyRange.only(t));r.onsuccess=t=>e(t.target.result),r.onerror=()=>e()}))}delete(t){this.getTransaction("readwrite").then((e=>{const n=e.objectStore(u);n.index(f).get(IDBKeyRange.only(t)).onsuccess=t=>{const e=t.target.result;e&&n.delete([e.id])}}))}insertOrUpdate(t){this.getTransaction("readwrite").then((e=>e.objectStore(u).put(t)))}};const p=["chrome://"],d=async(t={})=>await chrome.tabs.query(t),h=async(t,e=!1,n=(()=>{}))=>{let o=!0;if(!e){const e=await chrome.tabs.get(t);(!e||e.discarded||await r(e.url))&&(o=!1)}return o&&await chrome.tabs.discard(t,(e=>{g({tabId:t});const r=new l;e&&r.getByPrimaryIndex([t],(o=>{o&&r.insertOrUpdate({id:e.id,snapshot:o.snapshot,updated_at:Date.now()}),r.delete([t]),n(t,e)}))}))},v=async t=>{setTimeout((()=>y(t)),400)},y=async t=>{const e=new l,n=await new Promise((n=>e.getByPrimaryIndex([t.tabId],(t=>n(t)))));if(n&&n.updated_at&&Date.now()-n.updated_at<1e3)return;const r=await chrome.tabs.get(t.tabId);if(p.filter((t=>r.url.startsWith(t))).length>0)return;if(!r.active)return;if(!r.status||"loading"==t.status)return;const o=await chrome.tabs.captureVisibleTab(t.windowId);e.insertOrUpdate({id:t.tabId,snapshot:o,updated_at:Date.now()})},g=async t=>{const n=`${e}${t.tabId}`;await chrome.alarms.clear(n)},m=async t=>{const n=t.name.replace(e,"");n&&"undefined"!=n&&h(Number(n))};let b=null;const w=async n=>{console.log("onActivated");const i=await o(t);a(),await g(n),b&&i&&(async t=>{if(!t.tabId)return;const n=`${e}${t.tabId}`;await chrome.alarms.clear(n);const r=await(async()=>6e4*(await o("ttl")||10))();chrome.alarms.create(n,{when:Date.now()+r})})(b),b=n,v(n),(async()=>{const t=Number(await o("max-running"))||10;let e=(await d()).filter((t=>!t.discarded)).filter((t=>0==p.filter((e=>t.url.startsWith(e))).length)).sort(((t,e)=>t.id-e.id));const n=e.map((t=>new Promise((async e=>{t.include=t.url&&!await r(t.url),e()}))));Promise.all(n).then((()=>{if(e=e.filter((t=>t.include)),!(e.length<=t)){console.log(e,t);for(let n=0;n<e.length-t;n++)h(e[n].id,!0)}}))})()},x=(t,e)=>{console.log("onUpdated",e.status),"complete"==e.status&&(a(),v({tabId:t}))},S=async t=>{console.log("onRemoved"),b&&b.tabId==t&&(b=void 0),await g({tabId:t}),a(),(()=>{const t=new l;t.getAll((async e=>{const n=(await d()).map((t=>t.id));e.forEach((e=>{n.includes(e.id)||t.delete([e.id])}))}))})()};document.getElementById("addExeptions").onclick=async()=>{const t=await(async()=>{const t=await d({active:!0});return 0==t.length?null:t[0]})();let e="";if(t){const n=new URL(t.url);e=n.origin+n.pathname}const n=prompt("Except url",e);n&&(async t=>{const e={};e[i(t)]=!0,await chrome.storage.local.set(e)})(n)},document.getElementById("initEvents").onclick=()=>(chrome.tabs.onUpdated.removeListener(),chrome.tabs.onUpdated.addListener(x),chrome.tabs.onReplaced.removeListener(),chrome.tabs.onReplaced.addListener(a),chrome.tabs.onActivated.removeListener(),chrome.tabs.onActivated.addListener(w),chrome.tabs.onRemoved.removeListener(),chrome.tabs.onRemoved.addListener(S),chrome.alarms.onAlarm.removeListener(),void chrome.alarms.onAlarm.addListener(m)&&initTimer()),document.getElementById("settingPage").onclick=()=>{window.open(chrome.runtime.getURL("setting/index.html"))}}()}();