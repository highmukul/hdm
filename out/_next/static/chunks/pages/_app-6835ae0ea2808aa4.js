(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2888],{4444:function(e,t,r){"use strict";r.d(t,{BH:function(){return w},G6:function(){return C},L:function(){return u},LL:function(){return N},L_:function(){return T},P0:function(){return m},Pz:function(){return v},Sg:function(){return _},ZR:function(){return O},aH:function(){return y},b$:function(){return S},eu:function(){return R},hl:function(){return k},m9:function(){return B},ne:function(){return F},pd:function(){return M},q4:function(){return g},ru:function(){return I},tV:function(){return h},uI:function(){return E},vZ:function(){return function e(t,r){if(t===r)return!0;let n=Object.keys(t),i=Object.keys(r);for(let s of n){if(!i.includes(s))return!1;let n=t[s],o=r[s];if(x(n)&&x(o)){if(!e(n,o))return!1}else if(n!==o)return!1}for(let e of i)if(!n.includes(e))return!1;return!0}},w1:function(){return A},xO:function(){return L},xb:function(){return D},z$:function(){return b},zd:function(){return U}});var n=r(3454);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let i=function(e){let t=[],r=0;for(let n=0;n<e.length;n++){let i=e.charCodeAt(n);i<128?t[r++]=i:(i<2048?t[r++]=i>>6|192:((64512&i)==55296&&n+1<e.length&&(64512&e.charCodeAt(n+1))==56320?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++n)),t[r++]=i>>18|240,t[r++]=i>>12&63|128):t[r++]=i>>12|224,t[r++]=i>>6&63|128),t[r++]=63&i|128)}return t},s=function(e){let t=[],r=0,n=0;for(;r<e.length;){let i=e[r++];if(i<128)t[n++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[r++];t[n++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){let s=((7&i)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536;t[n++]=String.fromCharCode(55296+(s>>10)),t[n++]=String.fromCharCode(56320+(1023&s))}else{let s=e[r++],o=e[r++];t[n++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let t=0;t<e.length;t+=3){let i=e[t],s=t+1<e.length,o=s?e[t+1]:0,a=t+2<e.length,l=a?e[t+2]:0,u=i>>2,h=(3&i)<<4|o>>4,c=(15&o)<<2|l>>6,d=63&l;a||(d=64,s||(c=64)),n.push(r[u],r[h],r[c],r[d])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(i(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):s(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let r=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let t=0;t<e.length;){let i=r[e.charAt(t++)],s=t<e.length?r[e.charAt(t)]:0,o=++t<e.length?r[e.charAt(t)]:64,l=++t<e.length?r[e.charAt(t)]:64;if(++t,null==i||null==s||null==o||null==l)throw new a;let u=i<<2|s>>4;if(n.push(u),64!==o){let e=s<<4&240|o>>2;if(n.push(e),64!==l){let e=o<<6&192|l;n.push(e)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class a extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}let l=function(e){let t=i(e);return o.encodeByteArray(t,!0)},u=function(e){return l(e).replace(/\./g,"")},h=function(e){try{return o.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null},c=()=>/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r.g)return r.g;throw Error("Unable to locate global object.")})().__FIREBASE_DEFAULTS__,d=()=>{if(void 0===n||void 0===n.env)return;let e=n.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},f=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let t=e&&h(e[1]);return t&&JSON.parse(t)},p=()=>{try{return c()||d()||f()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},g=e=>{var t,r;return null===(r=null===(t=p())||void 0===t?void 0:t.emulatorHosts)||void 0===r?void 0:r[e]},m=e=>{let t=g(e);if(!t)return;let r=t.lastIndexOf(":");if(r<=0||r+1===t.length)throw Error(`Invalid host ${t} with no separate hostname and port!`);let n=parseInt(t.substring(r+1),10);return"["===t[0]?[t.substring(1,r-1),n]:[t.substring(0,r),n]},y=()=>{var e;return null===(e=p())||void 0===e?void 0:e.config},v=e=>{var t;return null===(t=p())||void 0===t?void 0:t[`_${e}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(e,t){if(e.uid)throw Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let r=t||"demo-project",n=e.iat||0,i=e.sub||e.user_id;if(!i)throw Error("mockUserToken must contain 'sub' or 'user_id' field!");let s=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:n,exp:n+3600,auth_time:n,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[u(JSON.stringify({alg:"none",type:"JWT"})),u(JSON.stringify(s)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function E(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(b())}function T(){return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function I(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function S(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function A(){let e=b();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function C(){return!function(){var e;let t=null===(e=p())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(r.g.process)}catch(e){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function k(){try{return"object"==typeof indexedDB}catch(e){return!1}}function R(){return new Promise((e,t)=>{try{let r=!0,n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),r||self.indexedDB.deleteDatabase(n),e(!0)},i.onupgradeneeded=()=>{r=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})}class O extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,O.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,N.prototype.create)}}class N{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},n=`${this.service}/${e}`,i=this.errors[e],s=i?i.replace(P,(e,t)=>{let n=r[t];return null!=n?String(n):`<${t}?>`}):"Error",o=`${this.serviceName}: ${s} (${n}).`;return new O(n,o,r)}}let P=/\{\$([^}]+)}/g;function D(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function x(e){return null!==e&&"object"==typeof e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e){let t=[];for(let[r,n]of Object.entries(e))Array.isArray(n)?n.forEach(e=>{t.push(encodeURIComponent(r)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(r)+"="+encodeURIComponent(n));return t.length?"&"+t.join("&"):""}function U(e){let t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){let[r,n]=e.split("=");t[decodeURIComponent(r)]=decodeURIComponent(n)}}),t}function M(e){let t=e.indexOf("?");if(!t)return"";let r=e.indexOf("#",t);return e.substring(t,r>0?r:void 0)}function F(e,t){let r=new V(e,t);return r.subscribe.bind(r)}class V{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let n;if(void 0===e&&void 0===t&&void 0===r)throw Error("Missing Observer.");void 0===(n=!function(e,t){if("object"!=typeof e||null===e)return!1;for(let r of t)if(r in e&&"function"==typeof e[r])return!0;return!1}(e,["next","error","complete"])?{next:e,error:t,complete:r}:e).next&&(n.next=j),void 0===n.error&&(n.error=j),void 0===n.complete&&(n.complete=j);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?n.error(this.finalError):n.complete()}catch(e){}}),this.observers.push(n),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function j(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(e){return e&&e._delegate?e._delegate:e}},6262:function(e,t,r){"use strict";r.d(t,{H:function(){return w},a:function(){return _}});var n=r(7294),i=r(1517),s=r(109),o=r(670),a=r(1163),l=r(6501),u=r(5893);function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(){c=function(){return t};var e,t={},r=Object.prototype,n=r.hasOwnProperty,i=Object.defineProperty||function(e,t,r){e[t]=r.value},s="function"==typeof Symbol?Symbol:{},o=s.iterator||"@@iterator",a=s.asyncIterator||"@@asyncIterator",l=s.toStringTag||"@@toStringTag";function u(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,r){return e[t]=r}}function d(t,r,n,s){var o,a,l=Object.create((r&&r.prototype instanceof v?r:v).prototype);return i(l,"_invoke",{value:(o=new R(s||[]),a=p,function(r,i){if(a===g)throw Error("Generator is already running");if(a===m){if("throw"===r)throw i;return{value:e,done:!0}}for(o.method=r,o.arg=i;;){var s=o.delegate;if(s){var l=function t(r,n){var i=n.method,s=r.iterator[i];if(s===e)return n.delegate=null,"throw"===i&&r.iterator.return&&(n.method="return",n.arg=e,t(r,n),"throw"===n.method)||"return"!==i&&(n.method="throw",n.arg=TypeError("The iterator does not provide a '"+i+"' method")),y;var o=f(s,r.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,y;var a=o.arg;return a?a.done?(n[r.resultName]=a.value,n.next=r.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,y):a:(n.method="throw",n.arg=TypeError("iterator result is not an object"),n.delegate=null,y)}(s,o);if(l){if(l===y)continue;return l}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if(a===p)throw a=m,o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);a=g;var u=f(t,n,o);if("normal"===u.type){if(a=o.done?m:"suspendedYield",u.arg===y)continue;return{value:u.arg,done:o.done}}"throw"===u.type&&(a=m,o.method="throw",o.arg=u.arg)}})}),l}function f(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=d;var p="suspendedStart",g="executing",m="completed",y={};function v(){}function w(){}function _(){}var b={};u(b,o,function(){return this});var E=Object.getPrototypeOf,T=E&&E(E(O([])));T&&T!==r&&n.call(T,o)&&(b=T);var I=_.prototype=v.prototype=Object.create(b);function S(e){["next","throw","return"].forEach(function(t){u(e,t,function(e){return this._invoke(t,e)})})}function A(e,t){var r;i(this,"_invoke",{value:function(i,s){function o(){return new t(function(r,o){!function r(i,s,o,a){var l=f(e[i],e,s);if("throw"!==l.type){var u=l.arg,c=u.value;return c&&"object"==h(c)&&n.call(c,"__await")?t.resolve(c.__await).then(function(e){r("next",e,o,a)},function(e){r("throw",e,o,a)}):t.resolve(c).then(function(e){u.value=e,o(u)},function(e){return r("throw",e,o,a)})}a(l.arg)}(i,s,r,o)})}return r=r?r.then(o,o):o()}})}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function k(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function R(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function O(t){if(t||""===t){var r=t[o];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,s=function r(){for(;++i<t.length;)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return s.next=s}}throw TypeError(h(t)+" is not iterable")}return w.prototype=_,i(I,"constructor",{value:_,configurable:!0}),i(_,"constructor",{value:w,configurable:!0}),w.displayName=u(_,l,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===w||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,_):(e.__proto__=_,u(e,l,"GeneratorFunction")),e.prototype=Object.create(I),e},t.awrap=function(e){return{__await:e}},S(A.prototype),u(A.prototype,a,function(){return this}),t.AsyncIterator=A,t.async=function(e,r,n,i,s){void 0===s&&(s=Promise);var o=new A(d(e,r,n,i),s);return t.isGeneratorFunction(r)?o:o.next().then(function(e){return e.done?e.value:o.next()})},S(I),u(I,l,"Generator"),u(I,o,function(){return this}),u(I,"toString",function(){return"[object Generator]"}),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=O,R.prototype={constructor:R,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return a.type="throw",a.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var s=this.tryEntries.length-1;s>=0;--s){var o=this.tryEntries[s],a=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var l=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(l&&u){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(l){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var s=i;break}}s&&("break"===e||"continue"===e)&&s.tryLoc<=t&&t<=s.finallyLoc&&(s=null);var o=s?s.completion:{};return o.type=e,o.arg=t,s?(this.method="next",this.next=s.finallyLoc,y):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),y},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),k(r),y}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var i=n.arg;k(r)}return i}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:O(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},t}function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach(function(t){var n,i;n=t,i=r[t],(n=function(e){var t=function(e,t){if("object"!==h(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==h(n))return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===h(t)?t:String(t)}(n))in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function p(e,t,r,n,i,s,o){try{var a=e[s](o),l=a.value}catch(e){r(e);return}a.done?t(l):Promise.resolve(l).then(n,i)}function g(e){return function(){var t=this,r=arguments;return new Promise(function(n,i){var s=e.apply(t,r);function o(e){p(s,n,i,o,a,"next",e)}function a(e){p(s,n,i,o,a,"throw",e)}o(void 0)})}}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,s,o,a=[],l=!0,u=!1;try{if(s=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;l=!1}else for(;!(l=(n=s.call(r)).done)&&(a.push(n.value),a.length!==t);l=!0);}catch(e){u=!0,i=e}finally{try{if(!l&&null!=r.return&&(o=r.return(),Object(o)!==o))return}finally{if(u)throw i}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var v=(0,n.createContext)(),w=function(e){var t,r,h,d,p,y=e.children,w=m((0,n.useState)(null),2),_=w[0],b=w[1],E=m((0,n.useState)(!0),2),T=E[0],I=E[1],S=(0,a.useRouter)(),A=(t=g(c().mark(function e(t){var r,n,i,a,l,u;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=1;break}return b(null),I(!1),e.abrupt("return");case 1:return e.next=2,t.getIdTokenResult(!0);case 2:return r=e.sent,n=(0,s.JU)(o.db,"users",t.uid),e.next=3,(0,s.QT)(n);case 3:if(i=e.sent,a={},!i.exists()){e.next=4;break}a=i.data(),e.next=5;break;case 4:return a={name:t.displayName||"New User",email:t.email,role:"customer",createdAt:(0,s.Bt)()},e.next=5,(0,s.pl)(n,a);case 5:return l=r.claims.admin?"admin":a.role,b(u=f(f(f({},t),a),{},{role:l,isAdmin:!0===r.claims.admin})),I(!1),e.abrupt("return",u);case 6:case"end":return e.stop()}},e)})),function(e){return t.apply(this,arguments)});(0,n.useEffect)(function(){var e=(0,i.Aj)(o.I,A);return function(){return e()}},[]);var C=(r=g(c().mark(function e(t,r){var n,s,a;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=1,(0,i.e5)(o.I,t,r);case 1:return n=e.sent,e.next=2,A(n.user);case 2:s=e.sent,l.ZP.success("Welcome back!"),null!=s&&s.isAdmin?S.push("/admin/dashboard"):S.push("/store"),e.next=4;break;case 3:throw e.prev=3,a=e.catch(0),l.ZP.error(a.message),a;case 4:case"end":return e.stop()}},e,null,[[0,3]])})),function(e,t){return r.apply(this,arguments)}),k=(h=g(c().mark(function e(){var t,r,n,s=arguments;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s.length>0&&void 0!==s[0]&&s[0],e.prev=1,t=new i.hJ,e.next=2,(0,i.rh)(o.I,t);case 2:return r=e.sent,e.next=3,A(r.user);case 3:l.ZP.success("Signed in successfully!"),S.push("/store"),e.next=5;break;case 4:throw e.prev=4,n=e.catch(1),l.ZP.error("Google sign-in failed."),n;case 5:case"end":return e.stop()}},e,null,[[1,4]])})),function(){return h.apply(this,arguments)}),R=(d=g(c().mark(function e(t,r,n){var a,u,h;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=1,(0,i.Xb)(o.I,t,r);case 1:return a=e.sent,u=(0,s.JU)(o.db,"users",a.user.uid),e.next=2,(0,s.pl)(u,{name:n,email:t,role:"customer",createdAt:(0,s.Bt)()});case 2:return e.next=3,A(a.user);case 3:l.ZP.success("Account created!"),S.push("/store"),e.next=5;break;case 4:throw e.prev=4,h=e.catch(0),l.ZP.error(h.message),h;case 5:case"end":return e.stop()}},e,null,[[0,4]])})),function(e,t,r){return d.apply(this,arguments)}),O=(p=g(c().mark(function e(){return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=1,(0,i.w7)(o.I);case 1:b(null),S.push("/login");case 2:case"end":return e.stop()}},e)})),function(){return p.apply(this,arguments)});return(0,u.jsx)(v.Provider,{value:{user:_,loading:T,signup:R,login:C,signInWithGoogle:k,logout:O},children:!T&&y})},_=function(){return(0,n.useContext)(v)}},8702:function(e,t,r){"use strict";r.d(t,{Z:function(){return _},j:function(){return b}});var n=r(7294),i=r(670),s=r(109),o=r(6262),a=r(6501),l=r(5893);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach(function(t){d(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function d(e,t,r){var n;return(n=function(e,t){if("object"!==u(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==u(n))return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"),(t="symbol"===u(n)?n:String(n))in e)?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(){f=function(){return t};var e,t={},r=Object.prototype,n=r.hasOwnProperty,i=Object.defineProperty||function(e,t,r){e[t]=r.value},s="function"==typeof Symbol?Symbol:{},o=s.iterator||"@@iterator",a=s.asyncIterator||"@@asyncIterator",l=s.toStringTag||"@@toStringTag";function h(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{h({},"")}catch(e){h=function(e,t,r){return e[t]=r}}function c(t,r,n,s){var o,a,l=Object.create((r&&r.prototype instanceof v?r:v).prototype);return i(l,"_invoke",{value:(o=new R(s||[]),a=p,function(r,i){if(a===g)throw Error("Generator is already running");if(a===m){if("throw"===r)throw i;return{value:e,done:!0}}for(o.method=r,o.arg=i;;){var s=o.delegate;if(s){var l=function t(r,n){var i=n.method,s=r.iterator[i];if(s===e)return n.delegate=null,"throw"===i&&r.iterator.return&&(n.method="return",n.arg=e,t(r,n),"throw"===n.method)||"return"!==i&&(n.method="throw",n.arg=TypeError("The iterator does not provide a '"+i+"' method")),y;var o=d(s,r.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,y;var a=o.arg;return a?a.done?(n[r.resultName]=a.value,n.next=r.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,y):a:(n.method="throw",n.arg=TypeError("iterator result is not an object"),n.delegate=null,y)}(s,o);if(l){if(l===y)continue;return l}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if(a===p)throw a=m,o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);a=g;var u=d(t,n,o);if("normal"===u.type){if(a=o.done?m:"suspendedYield",u.arg===y)continue;return{value:u.arg,done:o.done}}"throw"===u.type&&(a=m,o.method="throw",o.arg=u.arg)}})}),l}function d(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=c;var p="suspendedStart",g="executing",m="completed",y={};function v(){}function w(){}function _(){}var b={};h(b,o,function(){return this});var E=Object.getPrototypeOf,T=E&&E(E(O([])));T&&T!==r&&n.call(T,o)&&(b=T);var I=_.prototype=v.prototype=Object.create(b);function S(e){["next","throw","return"].forEach(function(t){h(e,t,function(e){return this._invoke(t,e)})})}function A(e,t){var r;i(this,"_invoke",{value:function(i,s){function o(){return new t(function(r,o){!function r(i,s,o,a){var l=d(e[i],e,s);if("throw"!==l.type){var h=l.arg,c=h.value;return c&&"object"==u(c)&&n.call(c,"__await")?t.resolve(c.__await).then(function(e){r("next",e,o,a)},function(e){r("throw",e,o,a)}):t.resolve(c).then(function(e){h.value=e,o(h)},function(e){return r("throw",e,o,a)})}a(l.arg)}(i,s,r,o)})}return r=r?r.then(o,o):o()}})}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function k(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function R(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function O(t){if(t||""===t){var r=t[o];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,s=function r(){for(;++i<t.length;)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return s.next=s}}throw TypeError(u(t)+" is not iterable")}return w.prototype=_,i(I,"constructor",{value:_,configurable:!0}),i(_,"constructor",{value:w,configurable:!0}),w.displayName=h(_,l,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===w||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,_):(e.__proto__=_,h(e,l,"GeneratorFunction")),e.prototype=Object.create(I),e},t.awrap=function(e){return{__await:e}},S(A.prototype),h(A.prototype,a,function(){return this}),t.AsyncIterator=A,t.async=function(e,r,n,i,s){void 0===s&&(s=Promise);var o=new A(c(e,r,n,i),s);return t.isGeneratorFunction(r)?o:o.next().then(function(e){return e.done?e.value:o.next()})},S(I),h(I,l,"Generator"),h(I,o,function(){return this}),h(I,"toString",function(){return"[object Generator]"}),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=O,R.prototype={constructor:R,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return a.type="throw",a.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var s=this.tryEntries.length-1;s>=0;--s){var o=this.tryEntries[s],a=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var l=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(l&&u){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(l){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var s=i;break}}s&&("break"===e||"continue"===e)&&s.tryLoc<=t&&t<=s.finallyLoc&&(s=null);var o=s?s.completion:{};return o.type=e,o.arg=t,s?(this.method="next",this.next=s.finallyLoc,y):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),y},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),k(r),y}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var i=n.arg;k(r)}return i}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:O(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},t}function p(e,t,r,n,i,s,o){try{var a=e[s](o),l=a.value}catch(e){r(e);return}a.done?t(l):Promise.resolve(l).then(n,i)}function g(e){return function(){var t=this,r=arguments;return new Promise(function(n,i){var s=e.apply(t,r);function o(e){p(s,n,i,o,a,"next",e)}function a(e){p(s,n,i,o,a,"throw",e)}o(void 0)})}}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,s,o,a=[],l=!0,u=!1;try{if(s=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;l=!1}else for(;!(l=(n=s.call(r)).done)&&(a.push(n.value),a.length!==t);l=!0);}catch(e){u=!0,i=e}finally{try{if(!l&&null!=r.return&&(o=r.return(),Object(o)!==o))return}finally{if(u)throw i}}return a}}(e,t)||y(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){if(e){if("string"==typeof e)return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(e,t)}}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var w=(0,n.createContext)(),_=function(e){var t,r,u,h,p,_=e.children,b=(0,o.a)().user,E=m((0,n.useState)([]),2),T=E[0],I=E[1],S=m((0,n.useState)(!0),2),A=S[0],C=S[1];(0,n.useEffect)(function(){var e;(e=g(f().mark(function e(){var t,r;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!b){e.next=2;break}return t=(0,s.JU)(i.db,"carts",b.uid),e.next=1,(0,s.QT)(t);case 1:(r=e.sent).exists()&&I(Object.values(r.data()));case 2:C(!1);case 3:case"end":return e.stop()}},e)})),function(){return e.apply(this,arguments)})()},[b]);var k=(t=g(f().mark(function e(t){var r,n;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(b){e.next=1;break}return e.abrupt("return");case 1:return r=(0,s.JU)(i.db,"carts",b.uid),n=t.reduce(function(e,t){return e[t.id]=t,e},{}),e.next=2,(0,s.pl)(r,n);case 2:case"end":return e.stop()}},e)})),function(e){return t.apply(this,arguments)}),R=(r=g(f().mark(function e(t){var r,n,i,s=arguments;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=s.length>1&&void 0!==s[1]?s[1]:1,(i=(n=function(e){if(Array.isArray(e))return v(e)}(T)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(T)||y(T)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).findIndex(function(e){return e.id===t.id}))>-1?n[i].quantity+=r:n.push(c(c({},t),{},{quantity:r})),I(n),e.next=1,k(n);case 1:a.ZP.success("".concat(t.name," added to cart!"));case 2:case"end":return e.stop()}},e)})),function(e){return r.apply(this,arguments)}),O=(u=g(f().mark(function e(t,r){var n;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r<1)){e.next=1;break}return e.abrupt("return");case 1:return I(n=T.map(function(e){return e.id===t?c(c({},e),{},{quantity:r}):e})),e.next=2,k(n);case 2:case"end":return e.stop()}},e)})),function(e,t){return u.apply(this,arguments)}),N=(h=g(f().mark(function e(t){var r;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(I(T.filter(function(e){return e.id!==t})),!b){e.next=1;break}return r=(0,s.JU)(i.db,"carts",b.uid),e.next=1,(0,s.r7)(r,d({},t,(0,s.AK)()));case 1:a.ZP.error("Item removed from cart.");case 2:case"end":return e.stop()}},e)})),function(e){return h.apply(this,arguments)}),P=(p=g(f().mark(function e(){var t;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(I([]),!b){e.next=1;break}return t=(0,s.JU)(i.db,"carts",b.uid),e.next=1,(0,s.pl)(t,{});case 1:case"end":return e.stop()}},e)})),function(){return p.apply(this,arguments)}),D=(0,n.useMemo)(function(){return T.reduce(function(e,t){return e+t.quantity},0)},[T]),x=(0,n.useMemo)(function(){return T.reduce(function(e,t){return e+t.price*t.quantity},0)},[T]);return(0,l.jsx)(w.Provider,{value:{cartItems:T,loading:A,addToCart:R,updateQuantity:O,removeFromCart:N,clearCart:P,cartCount:D,cartTotal:x},children:_})},b=function(){return(0,n.useContext)(w)}},5121:function(e,t,r){"use strict";r.d(t,{F:function(){return l},f:function(){return a}});var n=r(7294),i=r(5893);function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var o=(0,n.createContext)(),a=function(e){var t,r=e.children,a=function(e){if(Array.isArray(e))return e}(t=(0,n.useState)("light"))||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,s,o,a=[],l=!0,u=!1;try{for(s=(r=r.call(e)).next;!(l=(n=s.call(r)).done)&&(a.push(n.value),2!==a.length);l=!0);}catch(e){u=!0,i=e}finally{try{if(!l&&null!=r.return&&(o=r.return(),Object(o)!==o))return}finally{if(u)throw i}}return a}}(t,2)||function(e,t){if(e){if("string"==typeof e)return s(e,2);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(e,2)}}(t,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),l=a[0],u=a[1];return(0,n.useEffect)(function(){var e=window.localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;e?u(e):t?u("dark"):u("light")},[]),(0,n.useEffect)(function(){var e=window.document.documentElement;e.classList.remove("dark"===l?"light":"dark"),e.classList.add(l),window.localStorage.setItem("theme",l)},[l]),(0,i.jsx)(o.Provider,{value:{theme:l,toggleTheme:function(){u(function(e){return"light"===e?"dark":"light"})}},children:r})},l=function(){return(0,n.useContext)(o)}},670:function(e,t,r){"use strict";r.d(t,{I:function(){return u},db:function(){return l},t:function(){return h}});var n=r(5816);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(0,n.KN)("firebase","10.14.1","app");var i=r(1517),s=r(109),o=r(6650),a=(0,n.C6)().length?(0,n.Mq)():(0,n.ZF)({apiKey:"AIzaSyAt4cNgOmO_TZfTaVgQ1AUpjU-MAiD7I20",authDomain:"hadoti-daily-mart-467808.firebaseapp.com",projectId:"hadoti-daily-mart-467808",storageBucket:"hadoti-daily-mart-467808.firebasestorage.app",messagingSenderId:"828017757103",appId:"1:828017757103:web:fd7809f69e8fb20e6a7d5a"}),l=(0,s.ad)(a),u=(0,i.v0)(a),h=(0,o.cF)(a)},2351:function(e,t,r){"use strict";r.r(t),r(317);var n=r(6262),i=r(8702),s=r(5121),o=r(6501),a=r(5893);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}t.default=function(e){var t=e.Component,r=e.pageProps;return(0,a.jsx)(n.H,{children:(0,a.jsx)(i.Z,{children:(0,a.jsxs)(s.f,{children:[(0,a.jsx)(t,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach(function(t){var n,i;n=t,i=r[t],(n=function(e){var t=function(e,t){if("object"!==l(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==l(n))return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===l(t)?t:String(t)}(n))in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},r)),(0,a.jsx)(o.x7,{position:"bottom-center",toastOptions:{style:{background:"#333",color:"#fff"}}})]})})})}},3454:function(e,t,r){"use strict";var n,i;e.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(i=r.g.process)?void 0:i.env)?r.g.process:r(7663)},1118:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(2351)}])},1876:function(e){!function(){var t={675:function(e,t){"use strict";t.byteLength=function(e){var t=l(e),r=t[0],n=t[1];return(r+n)*3/4-n},t.toByteArray=function(e){var t,r,s=l(e),o=s[0],a=s[1],u=new i((o+a)*3/4-a),h=0,c=a>0?o-4:o;for(r=0;r<c;r+=4)t=n[e.charCodeAt(r)]<<18|n[e.charCodeAt(r+1)]<<12|n[e.charCodeAt(r+2)]<<6|n[e.charCodeAt(r+3)],u[h++]=t>>16&255,u[h++]=t>>8&255,u[h++]=255&t;return 2===a&&(t=n[e.charCodeAt(r)]<<2|n[e.charCodeAt(r+1)]>>4,u[h++]=255&t),1===a&&(t=n[e.charCodeAt(r)]<<10|n[e.charCodeAt(r+1)]<<4|n[e.charCodeAt(r+2)]>>2,u[h++]=t>>8&255,u[h++]=255&t),u},t.fromByteArray=function(e){for(var t,n=e.length,i=n%3,s=[],o=0,a=n-i;o<a;o+=16383)s.push(function(e,t,n){for(var i,s=[],o=t;o<n;o+=3)s.push(r[(i=(e[o]<<16&16711680)+(e[o+1]<<8&65280)+(255&e[o+2]))>>18&63]+r[i>>12&63]+r[i>>6&63]+r[63&i]);return s.join("")}(e,o,o+16383>a?a:o+16383));return 1===i?s.push(r[(t=e[n-1])>>2]+r[t<<4&63]+"=="):2===i&&s.push(r[(t=(e[n-2]<<8)+e[n-1])>>10]+r[t>>4&63]+r[t<<2&63]+"="),s.join("")};for(var r=[],n=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=0,a=s.length;o<a;++o)r[o]=s[o],n[s.charCodeAt(o)]=o;function l(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");-1===r&&(r=t);var n=r===t?0:4-r%4;return[r,n]}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63},72:function(e,t,r){"use strict";/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var n=r(675),i=r(783),s="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function o(e){if(e>2147483647)throw RangeError('The value "'+e+'" is invalid for option "size"');var t=new Uint8Array(e);return Object.setPrototypeOf(t,a.prototype),t}function a(e,t,r){if("number"==typeof e){if("string"==typeof t)throw TypeError('The "string" argument must be of type string. Received type number');return h(e)}return l(e,t,r)}function l(e,t,r){if("string"==typeof e)return function(e,t){if(("string"!=typeof t||""===t)&&(t="utf8"),!a.isEncoding(t))throw TypeError("Unknown encoding: "+t);var r=0|f(e,t),n=o(r),i=n.write(e,t);return i!==r&&(n=n.slice(0,i)),n}(e,t);if(ArrayBuffer.isView(e))return c(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(R(e,ArrayBuffer)||e&&R(e.buffer,ArrayBuffer)||"undefined"!=typeof SharedArrayBuffer&&(R(e,SharedArrayBuffer)||e&&R(e.buffer,SharedArrayBuffer)))return function(e,t,r){var n;if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw RangeError('"length" is outside of buffer bounds');return Object.setPrototypeOf(n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),a.prototype),n}(e,t,r);if("number"==typeof e)throw TypeError('The "value" argument must not be of type number. Received type number');var n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return a.from(n,t,r);var i=function(e){if(a.isBuffer(e)){var t,r=0|d(e.length),n=o(r);return 0===n.length||e.copy(n,0,0,r),n}return void 0!==e.length?"number"!=typeof e.length||(t=e.length)!=t?o(0):c(e):"Buffer"===e.type&&Array.isArray(e.data)?c(e.data):void 0}(e);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return a.from(e[Symbol.toPrimitive]("string"),t,r);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function u(e){if("number"!=typeof e)throw TypeError('"size" argument must be of type number');if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function h(e){return u(e),o(e<0?0:0|d(e))}function c(e){for(var t=e.length<0?0:0|d(e.length),r=o(t),n=0;n<t;n+=1)r[n]=255&e[n];return r}function d(e){if(e>=2147483647)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|e}function f(e,t){if(a.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||R(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);var r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;for(var i=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return S(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return C(e).length;default:if(i)return n?-1:S(e).length;t=(""+t).toLowerCase(),i=!0}}function p(e,t,r){var i,s,o=!1;if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||(r>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var i="",s=t;s<r;++s)i+=O[e[s]];return i}(this,t,r);case"utf8":case"utf-8":return v(this,t,r);case"ascii":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(127&e[i]);return n}(this,t,r);case"latin1":case"binary":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(e[i]);return n}(this,t,r);case"base64":return i=t,s=r,0===i&&s===this.length?n.fromByteArray(this):n.fromByteArray(this.slice(i,s));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){for(var n=e.slice(t,r),i="",s=0;s<n.length;s+=2)i+=String.fromCharCode(n[s]+256*n[s+1]);return i}(this,t,r);default:if(o)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),o=!0}}function g(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function m(e,t,r,n,i){var s;if(0===e.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),(s=r=+r)!=s&&(r=i?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(i)return -1;r=e.length-1}else if(r<0){if(!i)return -1;r=0}if("string"==typeof t&&(t=a.from(t,n)),a.isBuffer(t))return 0===t.length?-1:y(e,t,r,n,i);if("number"==typeof t)return(t&=255,"function"==typeof Uint8Array.prototype.indexOf)?i?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):y(e,[t],r,n,i);throw TypeError("val must be string, number or Buffer")}function y(e,t,r,n,i){var s,o=1,a=e.length,l=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return -1;o=2,a/=2,l/=2,r/=2}function u(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}if(i){var h=-1;for(s=r;s<a;s++)if(u(e,s)===u(t,-1===h?0:s-h)){if(-1===h&&(h=s),s-h+1===l)return h*o}else -1!==h&&(s-=s-h),h=-1}else for(r+l>a&&(r=a-l),s=r;s>=0;s--){for(var c=!0,d=0;d<l;d++)if(u(e,s+d)!==u(t,d)){c=!1;break}if(c)return s}return -1}function v(e,t,r){r=Math.min(e.length,r);for(var n=[],i=t;i<r;){var s,o,a,l,u=e[i],h=null,c=u>239?4:u>223?3:u>191?2:1;if(i+c<=r)switch(c){case 1:u<128&&(h=u);break;case 2:(192&(s=e[i+1]))==128&&(l=(31&u)<<6|63&s)>127&&(h=l);break;case 3:s=e[i+1],o=e[i+2],(192&s)==128&&(192&o)==128&&(l=(15&u)<<12|(63&s)<<6|63&o)>2047&&(l<55296||l>57343)&&(h=l);break;case 4:s=e[i+1],o=e[i+2],a=e[i+3],(192&s)==128&&(192&o)==128&&(192&a)==128&&(l=(15&u)<<18|(63&s)<<12|(63&o)<<6|63&a)>65535&&l<1114112&&(h=l)}null===h?(h=65533,c=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),i+=c}return function(e){var t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e);for(var r="",n=0;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=4096));return r}(n)}function w(e,t,r){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>r)throw RangeError("Trying to access beyond buffer length")}function _(e,t,r,n,i,s){if(!a.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<s)throw RangeError('"value" argument is out of bounds');if(r+n>e.length)throw RangeError("Index out of range")}function b(e,t,r,n,i,s){if(r+n>e.length||r<0)throw RangeError("Index out of range")}function E(e,t,r,n,s){return t=+t,r>>>=0,s||b(e,t,r,4,34028234663852886e22,-34028234663852886e22),i.write(e,t,r,n,23,4),r+4}function T(e,t,r,n,s){return t=+t,r>>>=0,s||b(e,t,r,8,17976931348623157e292,-17976931348623157e292),i.write(e,t,r,n,52,8),r+8}t.Buffer=a,t.SlowBuffer=function(e){return+e!=e&&(e=0),a.alloc(+e)},t.INSPECT_MAX_BYTES=50,t.kMaxLength=2147483647,a.TYPED_ARRAY_SUPPORT=function(){try{var e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),a.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(a.prototype,"parent",{enumerable:!0,get:function(){if(a.isBuffer(this))return this.buffer}}),Object.defineProperty(a.prototype,"offset",{enumerable:!0,get:function(){if(a.isBuffer(this))return this.byteOffset}}),a.poolSize=8192,a.from=function(e,t,r){return l(e,t,r)},Object.setPrototypeOf(a.prototype,Uint8Array.prototype),Object.setPrototypeOf(a,Uint8Array),a.alloc=function(e,t,r){return(u(e),e<=0)?o(e):void 0!==t?"string"==typeof r?o(e).fill(t,r):o(e).fill(t):o(e)},a.allocUnsafe=function(e){return h(e)},a.allocUnsafeSlow=function(e){return h(e)},a.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==a.prototype},a.compare=function(e,t){if(R(e,Uint8Array)&&(e=a.from(e,e.offset,e.byteLength)),R(t,Uint8Array)&&(t=a.from(t,t.offset,t.byteLength)),!a.isBuffer(e)||!a.isBuffer(t))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;for(var r=e.length,n=t.length,i=0,s=Math.min(r,n);i<s;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0},a.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},a.concat=function(e,t){if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return a.alloc(0);if(void 0===t)for(r=0,t=0;r<e.length;++r)t+=e[r].length;var r,n=a.allocUnsafe(t),i=0;for(r=0;r<e.length;++r){var s=e[r];if(R(s,Uint8Array)&&(s=a.from(s)),!a.isBuffer(s))throw TypeError('"list" argument must be an Array of Buffers');s.copy(n,i),i+=s.length}return n},a.byteLength=f,a.prototype._isBuffer=!0,a.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)g(this,t,t+1);return this},a.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)g(this,t,t+3),g(this,t+1,t+2);return this},a.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)g(this,t,t+7),g(this,t+1,t+6),g(this,t+2,t+5),g(this,t+3,t+4);return this},a.prototype.toString=function(){var e=this.length;return 0===e?"":0==arguments.length?v(this,0,e):p.apply(this,arguments)},a.prototype.toLocaleString=a.prototype.toString,a.prototype.equals=function(e){if(!a.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===a.compare(this,e)},a.prototype.inspect=function(){var e="",r=t.INSPECT_MAX_BYTES;return e=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(e+=" ... "),"<Buffer "+e+">"},s&&(a.prototype[s]=a.prototype.inspect),a.prototype.compare=function(e,t,r,n,i){if(R(e,Uint8Array)&&(e=a.from(e,e.offset,e.byteLength)),!a.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),t<0||r>e.length||n<0||i>this.length)throw RangeError("out of range index");if(n>=i&&t>=r)return 0;if(n>=i)return -1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,i>>>=0,this===e)return 0;for(var s=i-n,o=r-t,l=Math.min(s,o),u=this.slice(n,i),h=e.slice(t,r),c=0;c<l;++c)if(u[c]!==h[c]){s=u[c],o=h[c];break}return s<o?-1:o<s?1:0},a.prototype.includes=function(e,t,r){return -1!==this.indexOf(e,t,r)},a.prototype.indexOf=function(e,t,r){return m(this,e,t,r,!0)},a.prototype.lastIndexOf=function(e,t,r){return m(this,e,t,r,!1)},a.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var i,s,o,a,l,u,h,c,d,f,p,g,m=this.length-t;if((void 0===r||r>m)&&(r=m),e.length>0&&(r<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var y=!1;;)switch(n){case"hex":return function(e,t,r,n){r=Number(r)||0;var i=e.length-r;n?(n=Number(n))>i&&(n=i):n=i;var s=t.length;n>s/2&&(n=s/2);for(var o=0;o<n;++o){var a=parseInt(t.substr(2*o,2),16);if(a!=a)break;e[r+o]=a}return o}(this,e,t,r);case"utf8":case"utf-8":return l=t,u=r,k(S(e,this.length-l),this,l,u);case"ascii":return h=t,c=r,k(A(e),this,h,c);case"latin1":case"binary":return i=this,s=e,o=t,a=r,k(A(s),i,o,a);case"base64":return d=t,f=r,k(C(e),this,d,f);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return p=t,g=r,k(function(e,t){for(var r,n,i=[],s=0;s<e.length&&!((t-=2)<0);++s)n=(r=e.charCodeAt(s))>>8,i.push(r%256),i.push(n);return i}(e,this.length-p),this,p,g);default:if(y)throw TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),y=!0}},a.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},a.prototype.slice=function(e,t){var r=this.length;e=~~e,t=void 0===t?r:~~t,e<0?(e+=r)<0&&(e=0):e>r&&(e=r),t<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);var n=this.subarray(e,t);return Object.setPrototypeOf(n,a.prototype),n},a.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=this[e],i=1,s=0;++s<t&&(i*=256);)n+=this[e+s]*i;return n},a.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=this[e+--t],i=1;t>0&&(i*=256);)n+=this[e+--t]*i;return n},a.prototype.readUInt8=function(e,t){return e>>>=0,t||w(e,1,this.length),this[e]},a.prototype.readUInt16LE=function(e,t){return e>>>=0,t||w(e,2,this.length),this[e]|this[e+1]<<8},a.prototype.readUInt16BE=function(e,t){return e>>>=0,t||w(e,2,this.length),this[e]<<8|this[e+1]},a.prototype.readUInt32LE=function(e,t){return e>>>=0,t||w(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},a.prototype.readUInt32BE=function(e,t){return e>>>=0,t||w(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},a.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=this[e],i=1,s=0;++s<t&&(i*=256);)n+=this[e+s]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*t)),n},a.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=t,i=1,s=this[e+--n];n>0&&(i*=256);)s+=this[e+--n]*i;return s>=(i*=128)&&(s-=Math.pow(2,8*t)),s},a.prototype.readInt8=function(e,t){return(e>>>=0,t||w(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},a.prototype.readInt16LE=function(e,t){e>>>=0,t||w(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},a.prototype.readInt16BE=function(e,t){e>>>=0,t||w(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},a.prototype.readInt32LE=function(e,t){return e>>>=0,t||w(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},a.prototype.readInt32BE=function(e,t){return e>>>=0,t||w(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},a.prototype.readFloatLE=function(e,t){return e>>>=0,t||w(e,4,this.length),i.read(this,e,!0,23,4)},a.prototype.readFloatBE=function(e,t){return e>>>=0,t||w(e,4,this.length),i.read(this,e,!1,23,4)},a.prototype.readDoubleLE=function(e,t){return e>>>=0,t||w(e,8,this.length),i.read(this,e,!0,52,8)},a.prototype.readDoubleBE=function(e,t){return e>>>=0,t||w(e,8,this.length),i.read(this,e,!1,52,8)},a.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){var i=Math.pow(2,8*r)-1;_(this,e,t,r,i,0)}var s=1,o=0;for(this[t]=255&e;++o<r&&(s*=256);)this[t+o]=e/s&255;return t+r},a.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){var i=Math.pow(2,8*r)-1;_(this,e,t,r,i,0)}var s=r-1,o=1;for(this[t+s]=255&e;--s>=0&&(o*=256);)this[t+s]=e/o&255;return t+r},a.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,1,255,0),this[t]=255&e,t+1},a.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},a.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},a.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},a.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},a.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var i=Math.pow(2,8*r-1);_(this,e,t,r,i-1,-i)}var s=0,o=1,a=0;for(this[t]=255&e;++s<r&&(o*=256);)e<0&&0===a&&0!==this[t+s-1]&&(a=1),this[t+s]=(e/o>>0)-a&255;return t+r},a.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var i=Math.pow(2,8*r-1);_(this,e,t,r,i-1,-i)}var s=r-1,o=1,a=0;for(this[t+s]=255&e;--s>=0&&(o*=256);)e<0&&0===a&&0!==this[t+s+1]&&(a=1),this[t+s]=(e/o>>0)-a&255;return t+r},a.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},a.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},a.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},a.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},a.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},a.prototype.writeFloatLE=function(e,t,r){return E(this,e,t,!0,r)},a.prototype.writeFloatBE=function(e,t,r){return E(this,e,t,!1,r)},a.prototype.writeDoubleLE=function(e,t,r){return T(this,e,t,!0,r)},a.prototype.writeDoubleBE=function(e,t,r){return T(this,e,t,!1,r)},a.prototype.copy=function(e,t,r,n){if(!a.isBuffer(e))throw TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r||0===e.length||0===this.length)return 0;if(t<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(n<0)throw RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var i=n-r;if(this===e&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(t,r,n);else if(this===e&&r<t&&t<n)for(var s=i-1;s>=0;--s)e[s+t]=this[s+r];else Uint8Array.prototype.set.call(e,this.subarray(r,n),t);return i},a.prototype.fill=function(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw TypeError("encoding must be a string");if("string"==typeof n&&!a.isEncoding(n))throw TypeError("Unknown encoding: "+n);if(1===e.length){var i,s=e.charCodeAt(0);("utf8"===n&&s<128||"latin1"===n)&&(e=s)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw RangeError("Out of range index");if(r<=t)return this;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(i=t;i<r;++i)this[i]=e;else{var o=a.isBuffer(e)?e:a.from(e,n),l=o.length;if(0===l)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-t;++i)this[i+t]=o[i%l]}return this};var I=/[^+/0-9A-Za-z-_]/g;function S(e,t){t=t||1/0;for(var r,n=e.length,i=null,s=[],o=0;o<n;++o){if((r=e.charCodeAt(o))>55295&&r<57344){if(!i){if(r>56319||o+1===n){(t-=3)>-1&&s.push(239,191,189);continue}i=r;continue}if(r<56320){(t-=3)>-1&&s.push(239,191,189),i=r;continue}r=(i-55296<<10|r-56320)+65536}else i&&(t-=3)>-1&&s.push(239,191,189);if(i=null,r<128){if((t-=1)<0)break;s.push(r)}else if(r<2048){if((t-=2)<0)break;s.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;s.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((t-=4)<0)break;s.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return s}function A(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}function C(e){return n.toByteArray(function(e){if((e=(e=e.split("=")[0]).trim().replace(I,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function k(e,t,r,n){for(var i=0;i<n&&!(i+r>=t.length)&&!(i>=e.length);++i)t[i+r]=e[i];return i}function R(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}var O=function(){for(var e="0123456789abcdef",t=Array(256),r=0;r<16;++r)for(var n=16*r,i=0;i<16;++i)t[n+i]=e[r]+e[i];return t}()},783:function(e,t){/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */t.read=function(e,t,r,n,i){var s,o,a=8*i-n-1,l=(1<<a)-1,u=l>>1,h=-7,c=r?i-1:0,d=r?-1:1,f=e[t+c];for(c+=d,s=f&(1<<-h)-1,f>>=-h,h+=a;h>0;s=256*s+e[t+c],c+=d,h-=8);for(o=s&(1<<-h)-1,s>>=-h,h+=n;h>0;o=256*o+e[t+c],c+=d,h-=8);if(0===s)s=1-u;else{if(s===l)return o?NaN:1/0*(f?-1:1);o+=Math.pow(2,n),s-=u}return(f?-1:1)*o*Math.pow(2,s-n)},t.write=function(e,t,r,n,i,s){var o,a,l,u=8*s-i-1,h=(1<<u)-1,c=h>>1,d=23===i?5960464477539062e-23:0,f=n?0:s-1,p=n?1:-1,g=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(a=isNaN(t)?1:0,o=h):(o=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-o))<1&&(o--,l*=2),o+c>=1?t+=d/l:t+=d*Math.pow(2,1-c),t*l>=2&&(o++,l/=2),o+c>=h?(a=0,o=h):o+c>=1?(a=(t*l-1)*Math.pow(2,i),o+=c):(a=t*Math.pow(2,c-1)*Math.pow(2,i),o=0));i>=8;e[r+f]=255&a,f+=p,a/=256,i-=8);for(o=o<<i|a,u+=i;u>0;e[r+f]=255&o,f+=p,o/=256,u-=8);e[r+f-p]|=128*g}}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var s=r[e]={exports:{}},o=!0;try{t[e](s,s.exports,n),o=!1}finally{o&&delete r[e]}return s.exports}n.ab="//";var i=n(72);e.exports=i}()},317:function(){},7663:function(e){!function(){var t={229:function(e){var t,r,n,i=e.exports={};function s(){throw Error("setTimeout has not been defined")}function o(){throw Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===s||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:s}catch(e){t=s}try{r="function"==typeof clearTimeout?clearTimeout:o}catch(e){r=o}}();var l=[],u=!1,h=-1;function c(){u&&n&&(u=!1,n.length?l=n.concat(l):h=-1,l.length&&d())}function d(){if(!u){var e=a(c);u=!0;for(var t=l.length;t;){for(n=l,l=[];++h<t;)n&&n[h].run();h=-1,t=l.length}n=null,u=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===o||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function p(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new f(e,t)),1!==l.length||u||a(d)},f.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=p,i.addListener=p,i.once=p,i.off=p,i.removeListener=p,i.removeAllListeners=p,i.emit=p,i.prependListener=p,i.prependOnceListener=p,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var s=r[e]={exports:{}},o=!0;try{t[e](s,s.exports,n),o=!1}finally{o&&delete r[e]}return s.exports}n.ab="//";var i=n(229);e.exports=i}()},1163:function(e,t,r){e.exports=r(9420)},5816:function(e,t,r){"use strict";let n,i,s;r.d(t,{Jn:function(){return M},qX:function(){return D},rh:function(){return x},Xd:function(){return P},Mq:function(){return V},C6:function(){return j},ZF:function(){return F},KN:function(){return B}});var o=r(8463),a=r(3333),l=r(4444);let u=(e,t)=>t.some(t=>e instanceof t),h=new WeakMap,c=new WeakMap,d=new WeakMap,f=new WeakMap,p=new WeakMap,g={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return c.get(e);if("objectStoreNames"===t)return e.objectStoreNames||d.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return m(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function m(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,r)=>{let n=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(m(e.result)),n()},s=()=>{r(e.error),n()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&h.set(t,e)}).catch(()=>{}),p.set(t,e),t}(e);if(f.has(e))return f.get(e);let r="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(y(this),e),m(h.get(this))}:function(...e){return m(t.apply(y(this),e))}:function(e,...r){let n=t.call(y(this),e,...r);return d.set(n,e.sort?e.sort():[e]),m(n)}:(t instanceof IDBTransaction&&function(e){if(c.has(e))return;let t=new Promise((t,r)=>{let n=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),n()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});c.set(e,t)}(t),u(t,n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,g):t;return r!==e&&(f.set(e,r),p.set(r,e)),r}let y=e=>p.get(e),v=["get","getKey","getAll","getAllKeys","count"],w=["put","add","delete","clear"],_=new Map;function b(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(_.get(t))return _.get(t);let r=t.replace(/FromIndex$/,""),n=t!==r,i=w.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(i||v.includes(r)))return;let s=async function(e,...t){let s=this.transaction(e,i?"readwrite":"readonly"),o=s.store;return n&&(o=o.index(t.shift())),(await Promise.all([o[r](...t),i&&s.done]))[0]};return _.set(t,s),s}g={...s=g,get:(e,t,r)=>b(e,t)||s.get(e,t,r),has:(e,t)=>!!b(e,t)||s.has(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}let T="@firebase/app",I="0.10.13",S=new a.Yd("@firebase/app"),A="[DEFAULT]",C={[T]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/data-connect":"fire-data-connect","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","@firebase/vertexai-preview":"fire-vertex","fire-js":"fire-js",firebase:"fire-js-all"},k=new Map,R=new Map,O=new Map;function N(e,t){try{e.container.addComponent(t)}catch(r){S.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,r)}}function P(e){let t=e.name;if(O.has(t))return S.debug(`There were multiple attempts to register component ${t}.`),!1;for(let r of(O.set(t,e),k.values()))N(r,e);for(let t of R.values())N(t,e);return!0}function D(e,t){let r=e.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),e.container.getProvider(t)}function x(e){return void 0!==e.settings}let L=new l.LL("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new o.wA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw L.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let M="10.14.1";function F(e,t={}){let r=e;"object"!=typeof t&&(t={name:t});let n=Object.assign({name:A,automaticDataCollectionEnabled:!1},t),i=n.name;if("string"!=typeof i||!i)throw L.create("bad-app-name",{appName:String(i)});if(r||(r=(0,l.aH)()),!r)throw L.create("no-options");let s=k.get(i);if(s){if((0,l.vZ)(r,s.options)&&(0,l.vZ)(n,s.config))return s;throw L.create("duplicate-app",{appName:i})}let a=new o.H0(i);for(let e of O.values())a.addComponent(e);let u=new U(r,n,a);return k.set(i,u),u}function V(e=A){let t=k.get(e);if(!t&&e===A&&(0,l.aH)())return F();if(!t)throw L.create("no-app",{appName:e});return t}function j(){return Array.from(k.values())}function B(e,t,r){var n;let i=null!==(n=C[e])&&void 0!==n?n:e;r&&(i+=`-${r}`);let s=i.match(/\s|\//),a=t.match(/\s|\//);if(s||a){let e=[`Unable to register library "${i}" with version "${t}":`];s&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&e.push("and"),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),S.warn(e.join(" "));return}P(new o.wA(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}let q="firebase-heartbeat-store",z=null;function $(){return z||(z=(function(e,t,{blocked:r,upgrade:n,blocking:i,terminated:s}={}){let o=indexedDB.open(e,1),a=m(o);return n&&o.addEventListener("upgradeneeded",e=>{n(m(o.result),e.oldVersion,e.newVersion,m(o.transaction),e)}),r&&o.addEventListener("blocked",e=>r(e.oldVersion,e.newVersion,e)),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a})("firebase-heartbeat-database",0,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(q)}catch(e){console.warn(e)}}}).catch(e=>{throw L.create("idb-open",{originalErrorMessage:e.message})})),z}async function H(e){try{let t=(await $()).transaction(q),r=await t.objectStore(q).get(K(e));return await t.done,r}catch(e){if(e instanceof l.ZR)S.warn(e.message);else{let t=L.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});S.warn(t.message)}}}async function G(e,t){try{let r=(await $()).transaction(q,"readwrite"),n=r.objectStore(q);await n.put(t,K(e)),await r.done}catch(e){if(e instanceof l.ZR)S.warn(e.message);else{let t=L.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});S.warn(t.message)}}}function K(e){return`${e.name}!${e.options.appId}`}class W{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new X(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{let r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=Q();if((null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(e=>e.date===n))return;return this._heartbeatsCache.heartbeats.push({date:n,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{let t=new Date(e.date).valueOf();return Date.now()-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache)}catch(e){S.warn(e)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)==null||0===this._heartbeatsCache.heartbeats.length)return"";let t=Q(),{heartbeatsToSend:r,unsentEntries:n}=function(e,t=1024){let r=[],n=e.slice();for(let i of e){let e=r.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),J(r)>t){e.dates.pop();break}}else if(r.push({agent:i.agent,dates:[i.date]}),J(r)>t){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}(this._heartbeatsCache.heartbeats),i=(0,l.L)(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return S.warn(e),""}}}function Q(){return new Date().toISOString().substring(0,10)}class X{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,l.hl)()&&(0,l.eu)().then(()=>!0).catch(()=>!1)}async read(){if(!await this._canUseIndexedDBPromise)return{heartbeats:[]};{let e=await H(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let r=await this.read();return G(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){let r=await this.read();return G(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}}}function J(e){return(0,l.L)(JSON.stringify({version:2,heartbeats:e})).length}P(new o.wA("platform-logger",e=>new E(e),"PRIVATE")),P(new o.wA("heartbeat",e=>new W(e),"PRIVATE")),B(T,I,""),B(T,I,"esm2017"),B("fire-js","")},8463:function(e,t,r){"use strict";r.d(t,{H0:function(){return a},wA:function(){return i}});var n=r(4444);class i{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new n.BH;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:t});r&&e.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(e){if(n)return null;throw e}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:s})}catch(e){}for(let[e,t]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:r});t.resolve(e)}catch(e){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let n=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[e,t]of this.instancesDeferred.entries())r===this.normalizeInstanceIdentifier(e)&&t.resolve(n);return n}onInit(e,t){var r;let n=this.normalizeInstanceIdentifier(t),i=null!==(r=this.onInitCallbacks.get(n))&&void 0!==r?r:new Set;i.add(e),this.onInitCallbacks.set(n,i);let s=this.instances.get(n);return s&&e(s,n),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let n of r)try{n(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:e===s?void 0:e,options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch(e){}return r||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},3333:function(e,t,r){"use strict";var n,i;r.d(t,{Yd:function(){return h},in:function(){return n}});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s=[];(i=n||(n={}))[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT";let o={debug:n.DEBUG,verbose:n.VERBOSE,info:n.INFO,warn:n.WARN,error:n.ERROR,silent:n.SILENT},a=n.INFO,l={[n.DEBUG]:"log",[n.VERBOSE]:"log",[n.INFO]:"info",[n.WARN]:"warn",[n.ERROR]:"error"},u=(e,t,...r)=>{if(t<e.logLevel)return;let n=new Date().toISOString(),i=l[t];if(i)console[i](`[${n}]  ${e.name}:`,...r);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class h{constructor(e){this.name=e,this._logLevel=a,this._logHandler=u,this._userLogHandler=null,s.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in n))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?o[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,n.DEBUG,...e),this._logHandler(this,n.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,n.VERBOSE,...e),this._logHandler(this,n.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,n.INFO,...e),this._logHandler(this,n.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,n.WARN,...e),this._logHandler(this,n.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,n.ERROR,...e),this._logHandler(this,n.ERROR,...e)}}},1517:function(e,t,r){"use strict";r.d(t,{hJ:function(){return eQ},Xb:function(){return e8},v0:function(){return ra},Aj:function(){return te},e5:function(){return e7},rh:function(){return tN},w7:function(){return tt}});var n,i=r(5816),s=r(4444),o=r(3333);function a(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)0>t.indexOf(n[i])&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]]);return r}"function"==typeof SuppressedError&&SuppressedError;var l=r(8463);function u(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}let h=new s.LL("auth","Firebase",u()),c=new o.Yd("@firebase/auth");function d(e,...t){c.logLevel<=o.in.ERROR&&c.error(`Auth (${i.Jn}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f(e,...t){throw y(e,...t)}function p(e,...t){return y(e,...t)}function g(e,t,r){let n=Object.assign(Object.assign({},u()),{[t]:r});return new s.LL("auth","Firebase",n).create(t,{appName:e.name})}function m(e){return g(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function y(e,...t){if("string"!=typeof e){let r=t[0],n=[...t.slice(1)];return n[0]&&(n[0].appName=e.name),e._errorFactory.create(r,...n)}return h.create(e,...t)}function v(e,t,...r){if(!e)throw y(t,...r)}function w(e){let t="INTERNAL ASSERTION FAILED: "+e;throw d(t),Error(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function b(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e,t){var r;this.shortDelay=e,this.longDelay=t,r="Short delay should be less than long delay!",t>e||w(r),this.isMobile=(0,s.uI)()||(0,s.b$)()}get(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&("http:"===b()||"https:"===b()||(0,s.ru)()||"connection"in navigator))||navigator.onLine?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(e,t){var r,n;r=e.emulator,n="Emulator should always be set here",r||w(n);let{url:i}=e.emulator;return t?`${i}${t.startsWith("/")?t.slice(1):t}`:i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void w("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void w("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void w("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let S={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},A=new E(3e4,6e4);function C(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function k(e,t,r,n,i={}){return R(e,i,async()=>{let i={},o={};n&&("GET"===t?o=n:i={body:JSON.stringify(n)});let a=(0,s.xO)(Object.assign({key:e.config.apiKey},o)).slice(1),l=await e._getAdditionalHeaders();l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode);let u=Object.assign({method:t,headers:l},i);return(0,s.L_)()||(u.referrerPolicy="no-referrer"),I.fetch()(N(e,e.config.apiHost,r,a),u)})}async function R(e,t,r){e._canInitEmulator=!1;let n=Object.assign(Object.assign({},S),t);try{let t=new P(e),i=await Promise.race([r(),t.promise]);t.clearNetworkTimeout();let s=await i.json();if("needConfirmation"in s)throw D(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{let[t,r]=(i.ok?s.errorMessage:s.error.message).split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===t)throw D(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===t)throw D(e,"email-already-in-use",s);if("USER_DISABLED"===t)throw D(e,"user-disabled",s);let o=n[t]||t.toLowerCase().replace(/[_\s]+/g,"-");if(r)throw g(e,o,r);f(e,o)}}catch(t){if(t instanceof s.ZR)throw t;f(e,"network-request-failed",{message:String(t)})}}async function O(e,t,r,n,i={}){let s=await k(e,t,r,n,i);return"mfaPendingCredential"in s&&f(e,"multi-factor-auth-required",{_serverResponse:s}),s}function N(e,t,r,n){let i=`${t}${r}?${n}`;return e.config.emulator?T(e.config,i):`${e.config.apiScheme}://${i}`}class P{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(p(this.auth,"network-request-failed")),A.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function D(e,t,r){let n={appName:e.name};r.email&&(n.email=r.email),r.phoneNumber&&(n.phoneNumber=r.phoneNumber);let i=p(e,t,n);return i.customData._tokenResponse=r,i}function x(e){return void 0!==e&&void 0!==e.enterprise}class L{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return function(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}}async function U(e,t){return k(e,"GET","/v2/recaptchaConfig",C(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function M(e,t){return k(e,"POST","/v1/accounts:delete",t)}async function F(e,t){return k(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}async function j(e,t=!1){let r=(0,s.m9)(e),n=await r.getIdToken(t),i=q(n);v(i&&i.exp&&i.auth_time&&i.iat,r.auth,"internal-error");let o="object"==typeof i.firebase?i.firebase:void 0,a=null==o?void 0:o.sign_in_provider;return{claims:i,token:n,authTime:V(B(i.auth_time)),issuedAtTime:V(B(i.iat)),expirationTime:V(B(i.exp)),signInProvider:a||null,signInSecondFactor:(null==o?void 0:o.sign_in_second_factor)||null}}function B(e){return 1e3*Number(e)}function q(e){let[t,r,n]=e.split(".");if(void 0===t||void 0===r||void 0===n)return d("JWT malformed, contained fewer than 3 sections"),null;try{let e=(0,s.tV)(r);if(!e)return d("Failed to decode base64 JWT payload"),null;return JSON.parse(e)}catch(e){return d("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}function z(e){let t=q(e);return v(t,"internal-error"),v(void 0!==t.exp,"internal-error"),v(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $(e,t,r=!1){if(r)return t;try{return await t}catch(t){throw t instanceof s.ZR&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(!e)return this.errorBackoff=3e4,Math.max(0,(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5);{let e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(null==e?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=V(this.lastLoginAt),this.creationTime=V(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K(e){var t;let r=e.auth,n=await e.getIdToken(),i=await $(e,F(r,{idToken:n}));v(null==i?void 0:i.users.length,r,"internal-error");let s=i.users[0];e._notifyReloadListener(s);let o=(null===(t=s.providerUserInfo)||void 0===t?void 0:t.length)?Q(s.providerUserInfo):[],a=[...e.providerData.filter(e=>!o.some(t=>t.providerId===e.providerId)),...o],l=e.isAnonymous,u=!(e.email&&s.passwordHash)&&!(null==a?void 0:a.length);Object.assign(e,{uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new G(s.createdAt,s.lastLoginAt),isAnonymous:!!l&&u})}async function W(e){let t=(0,s.m9)(e);await K(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Q(e){return e.map(e=>{var{providerId:t}=e,r=a(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X(e,t){let r=await R(e,{},async()=>{let r=(0,s.xO)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:n,apiKey:i}=e.config,o=N(e,n,"/v1/token",`key=${i}`),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",I.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:r.access_token,expiresIn:r.expires_in,refreshToken:r.refresh_token}}async function J(e,t){return k(e,"POST","/v2/accounts:revokeToken",C(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){v(e.idToken,"internal-error"),v(void 0!==e.idToken,"internal-error"),v(void 0!==e.refreshToken,"internal-error");let t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):z(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){v(0!==e.length,"internal-error");let t=z(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(v(this.refreshToken,e,"user-token-expired"),this.refreshToken)?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:n,expiresIn:i}=await X(e,t);this.updateTokensAndExpiration(r,n,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*r}static fromJSON(e,t){let{refreshToken:r,accessToken:n,expirationTime:i}=t,s=new Y;return r&&(v("string"==typeof r,"internal-error",{appName:e}),s.refreshToken=r),n&&(v("string"==typeof n,"internal-error",{appName:e}),s.accessToken=n),i&&(v("number"==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Y,this.toJSON())}_performRefresh(){return w("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(e,t){v("string"==typeof e||void 0===e,"internal-error",{appName:t})}class ee{constructor(e){var{uid:t,auth:r,stsTokenManager:n}=e,i=a(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new H(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new G(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){let t=await $(this,this.stsTokenManager.getToken(this.auth,e));return v(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return j(this,e)}reload(){return W(this)}_assign(e){this!==e&&(v(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new ee(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){v(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await K(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,i.rh)(this.auth.app))return Promise.reject(m(this.auth));let e=await this.getIdToken();return await $(this,M(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,n,i,s,o,a,l,u;let h=null!==(r=t.displayName)&&void 0!==r?r:void 0,c=null!==(n=t.email)&&void 0!==n?n:void 0,d=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,f=null!==(s=t.photoURL)&&void 0!==s?s:void 0,p=null!==(o=t.tenantId)&&void 0!==o?o:void 0,g=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,m=null!==(l=t.createdAt)&&void 0!==l?l:void 0,y=null!==(u=t.lastLoginAt)&&void 0!==u?u:void 0,{uid:w,emailVerified:_,isAnonymous:b,providerData:E,stsTokenManager:T}=t;v(w&&T,e,"internal-error");let I=Y.fromJSON(this.name,T);v("string"==typeof w,e,"internal-error"),Z(h,e.name),Z(c,e.name),v("boolean"==typeof _,e,"internal-error"),v("boolean"==typeof b,e,"internal-error"),Z(d,e.name),Z(f,e.name),Z(p,e.name),Z(g,e.name),Z(m,e.name),Z(y,e.name);let S=new ee({uid:w,auth:e,email:c,emailVerified:_,displayName:h,isAnonymous:b,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:I,createdAt:m,lastLoginAt:y});return E&&Array.isArray(E)&&(S.providerData=E.map(e=>Object.assign({},e))),g&&(S._redirectEventId=g),S}static async _fromIdTokenResponse(e,t,r=!1){let n=new Y;n.updateFromServerResponse(t);let i=new ee({uid:t.localId,auth:e,stsTokenManager:n,isAnonymous:r});return await K(i),i}static async _fromGetAccountInfoResponse(e,t,r){let n=t.users[0];v(void 0!==n.localId,"internal-error");let i=void 0!==n.providerUserInfo?Q(n.providerUserInfo):[],s=!(n.email&&n.passwordHash)&&!(null==i?void 0:i.length),o=new Y;o.updateFromIdToken(r);let a=new ee({uid:n.localId,auth:e,stsTokenManager:o,isAnonymous:s});return Object.assign(a,{uid:n.localId,displayName:n.displayName||null,photoURL:n.photoUrl||null,email:n.email||null,emailVerified:n.emailVerified||!1,phoneNumber:n.phoneNumber||null,tenantId:n.tenantId||null,providerData:i,metadata:new G(n.createdAt,n.lastLoginAt),isAnonymous:!(n.email&&n.passwordHash)&&!(null==i?void 0:i.length)}),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let et=new Map;function er(e){var t,r;t="Expected a class definition",e instanceof Function||w(t);let n=et.get(e);return n?(r="Instance stored in cache mismatched with class",n instanceof e||w(r)):(n=new e,et.set(e,n)),n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(e,t,r){return`firebase:${e}:${t}:${r}`}en.type="NONE";class es{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:n,name:i}=this.auth;this.fullUserKey=ei(this.userKey,n.apiKey,i),this.fullPersistenceKey=ei("persistence",n.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?ee._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new es(er(en),e,r);let n=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),i=n[0]||er(en),s=ei(r,e.config.apiKey,e.name),o=null;for(let r of t)try{let t=await r._get(s);if(t){let n=ee._fromJSON(e,t);r!==i&&(o=n),i=r;break}}catch(e){}let a=n.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length&&(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch(e){}}))),new es(i,e,r)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(e){let t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(eh(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";{if(t.includes("edge/"))return"Edge";if(ea(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ed(t))return"Blackberry";if(ef(t))return"Webos";if(el(t))return"Safari";if((t.includes("chrome/")||eu(t))&&!t.includes("edge/"))return"Chrome";if(ec(t))return"Android";let r=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if((null==r?void 0:r.length)===2)return r[1]}return"Other"}function ea(e=(0,s.z$)()){return/firefox\//i.test(e)}function el(e=(0,s.z$)()){let t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function eu(e=(0,s.z$)()){return/crios\//i.test(e)}function eh(e=(0,s.z$)()){return/iemobile/i.test(e)}function ec(e=(0,s.z$)()){return/android/i.test(e)}function ed(e=(0,s.z$)()){return/blackberry/i.test(e)}function ef(e=(0,s.z$)()){return/webos/i.test(e)}function ep(e=(0,s.z$)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function eg(e=(0,s.z$)()){return ep(e)||ec(e)||ef(e)||ed(e)||/windows phone/i.test(e)||eh(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(e,t=[]){let r;switch(e){case"Browser":r=eo((0,s.z$)());break;case"Worker":r=`${eo((0,s.z$)())}-${e}`;break;default:r=e}let n=t.length?t.join(","):"FirebaseCore-web";return`${r}/JsCore/${i.Jn}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=t=>new Promise((r,n)=>{try{let n=e(t);r(n)}catch(e){n(e)}});r.onAbort=t,this.queue.push(r);let n=this.queue.length-1;return()=>{this.queue[n]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(e){for(let e of(t.reverse(),t))try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ev(e,t={}){return k(e,"GET","/v2/passwordPolicy",C(e,t))}class ew{constructor(e){var t,r,n,i;let s=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!==(t=s.minPasswordLength)&&void 0!==t?t:6,s.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=s.maxPasswordLength),void 0!==s.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=s.containsLowercaseCharacter),void 0!==s.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=s.containsUppercaseCharacter),void 0!==s.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=s.containsNumericCharacter),void 0!==s.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=s.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!==(n=null===(r=e.allowedNonAlphanumericCharacters)||void 0===r?void 0:r.join(""))&&void 0!==n?n:"",this.forceUpgradeOnSignin=null!==(i=e.forceUpgradeOnSignin)&&void 0!==i&&i,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,n,i,s,o;let a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=null===(t=a.meetsMinPasswordLength)||void 0===t||t),a.isValid&&(a.isValid=null===(r=a.meetsMaxPasswordLength)||void 0===r||r),a.isValid&&(a.isValid=null===(n=a.containsLowercaseLetter)||void 0===n||n),a.isValid&&(a.isValid=null===(i=a.containsUppercaseLetter)||void 0===i||i),a.isValid&&(a.isValid=null===(s=a.containsNumericCharacter)||void 0===s||s),a.isValid&&(a.isValid=null===(o=a.containsNonAlphanumericCharacter)||void 0===o||o),a}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,n=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),n&&(t.meetsMaxPasswordLength=e.length<=n)}validatePasswordCharacterOptions(e,t){let r;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let n=0;n<e.length;n++)r=e.charAt(n),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,n,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=n)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,t,r,n){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new eE(this),this.idTokenSubscription=new eE(this),this.beforeStateQueue=new ey(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=h,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=er(t)),this._initializationPromise=this.queue(async()=>{var r,n;if(!this._deleted&&(this.persistenceManager=await es.create(this,e),!this._deleted)){if(null===(r=this._popupRedirectResolver)||void 0===r?void 0:r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(n=this.currentUser)||void 0===n?void 0:n.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(this.currentUser||e){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await F(this,{idToken:e}),r=await ee._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if((0,i.rh)(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),n=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let r=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,i=null==n?void 0:n._redirectEventId,o=await this.tryRedirectSignIn(e);(!r||r===i)&&(null==o?void 0:o.user)&&(n=o.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(e){n=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return(v(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId)?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await K(e)}catch(e){if((null==e?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,i.rh)(this.app))return Promise.reject(m(this));let t=e?(0,s.m9)(e):null;return t&&v(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&v(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(0,i.rh)(this.app)?Promise.reject(m(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,i.rh)(this.app)?Promise.reject(m(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(er(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=new ew(await ev(this));null===this.tenantId?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new s.LL("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await J(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return null===e?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&er(e)||this._popupRedirectResolver;v(t,this,"argument-error"),this.redirectPersistenceManager=await es.create(this,[er(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return(this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e)?this._currentUser:(null===(r=this.redirectUser)||void 0===r?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,n){if(this._deleted)return()=>{};let i="function"==typeof t?t:t.next.bind(t),s=!1,o=this._isInitialized?Promise.resolve():this._initializationPromise;if(v(o,this,"internal-error"),o.then(()=>{s||i(this.currentUser)}),"function"==typeof t){let i=e.addObserver(t,r,n);return()=>{s=!0,i()}}{let r=e.addObserver(t);return()=>{s=!0,r()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return v(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=em(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await (null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let n=await this._getAppCheckToken();return n&&(t["X-Firebase-AppCheck"]=n),t}async _getAppCheckToken(){var e;let t=await (null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){c.logLevel<=o.in.WARN&&c.warn(`Auth (${i.Jn}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function eb(e){return(0,s.m9)(e)}class eE{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,s.ne)(e=>this.observer=e)}get next(){return v(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eT={async loadJS(){throw Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function eI(e){return`__${e}${Math.floor(1e6*Math.random())}`}class eS{constructor(e){this.type="recaptcha-enterprise",this.auth=eb(e)}async verify(e="verify",t=!1){async function r(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,r)=>{U(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(n=>{if(void 0===n.recaptchaKey)r(Error("recaptcha Enterprise site key undefined"));else{let r=new L(n);return null==e.tenantId?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,t(r.siteKey)}}).catch(e=>{r(e)})})}function n(t,r,n){let i=window.grecaptcha;x(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{r(e)}).catch(()=>{r("NO_RECAPTCHA")})}):n(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((e,i)=>{r(this.auth).then(r=>{if(!t&&x(window.grecaptcha))n(r,e,i);else{var s;if("undefined"==typeof window){i(Error("RecaptchaVerifier is only supported in browser"));return}let t=eT.recaptchaEnterpriseScript;0!==t.length&&(t+=r),(s=t,eT.loadJS(s)).then(()=>{n(r,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function eA(e,t,r,n=!1){let i;let s=new eS(e);try{i=await s.verify(r)}catch(e){i=await s.verify(r,!0)}let o=Object.assign({},t);return n?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function eC(e,t,r,n){var i;if(null===(i=e._getRecaptchaConfig())||void 0===i||!i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER"))return n(e,t).catch(async i=>{if("auth/missing-recaptcha-token"!==i.code)return Promise.reject(i);{console.log(`${r} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let i=await eA(e,t,r,"getOobCode"===r);return n(e,i)}});{let i=await eA(e,t,r,"getOobCode"===r);return n(e,i)}}function ek(e){let t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function eR(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eO{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return w("not implemented")}_getIdTokenResponse(e){return w("not implemented")}_linkToIdToken(e,t){return w("not implemented")}_getReauthenticationResolver(e){return w("not implemented")}}async function eN(e,t){return k(e,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eP(e,t){return O(e,"POST","/v1/accounts:signInWithPassword",C(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eD(e,t){return O(e,"POST","/v1/accounts:signInWithEmailLink",C(e,t))}async function ex(e,t){return O(e,"POST","/v1/accounts:signInWithEmailLink",C(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eL extends eO{constructor(e,t,r,n=null){super("password",r),this._email=e,this._password=t,this._tenantId=n}static _fromEmailAndPassword(e,t){return new eL(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new eL(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return eC(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",eP);case"emailLink":return eD(e,{email:this._email,oobCode:this._password});default:f(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return eC(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",eN);case"emailLink":return ex(e,{idToken:t,email:this._email,oobCode:this._password});default:f(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eU(e,t){return O(e,"POST","/v1/accounts:signInWithIdp",C(e,t))}class eM extends eO{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new eM(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):f("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e,{providerId:r,signInMethod:n}=t,i=a(t,["providerId","signInMethod"]);if(!r||!n)return null;let s=new eM(r,n);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){return eU(e,this.buildRequest())}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,eU(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,eU(e,t)}buildRequest(){let e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,s.xO)(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eF(e,t){return k(e,"POST","/v1/accounts:sendVerificationCode",C(e,t))}async function eV(e,t){return O(e,"POST","/v1/accounts:signInWithPhoneNumber",C(e,t))}async function ej(e,t){let r=await O(e,"POST","/v1/accounts:signInWithPhoneNumber",C(e,t));if(r.temporaryProof)throw D(e,"account-exists-with-different-credential",r);return r}let eB={USER_NOT_FOUND:"user-not-found"};async function eq(e,t){return O(e,"POST","/v1/accounts:signInWithPhoneNumber",C(e,Object.assign(Object.assign({},t),{operation:"REAUTH"})),eB)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ez extends eO{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new ez({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new ez({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return eV(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return ej(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return eq(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:n}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:n}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:n,temporaryProof:i}=e;return r||t||n||i?new ez({verificationId:t,verificationCode:r,phoneNumber:n,temporaryProof:i}):null}}class e${constructor(e){var t,r,n,i,o,a;let l=(0,s.zd)((0,s.pd)(e)),u=null!==(t=l.apiKey)&&void 0!==t?t:null,h=null!==(r=l.oobCode)&&void 0!==r?r:null,c=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(n=l.mode)&&void 0!==n?n:null);v(u&&h&&c,"argument-error"),this.apiKey=u,this.operation=c,this.code=h,this.continueUrl=null!==(i=l.continueUrl)&&void 0!==i?i:null,this.languageCode=null!==(o=l.languageCode)&&void 0!==o?o:null,this.tenantId=null!==(a=l.tenantId)&&void 0!==a?a:null}static parseLink(e){let t=function(e){let t=(0,s.zd)((0,s.pd)(e)).link,r=t?(0,s.zd)((0,s.pd)(t)).deep_link_id:null,n=(0,s.zd)((0,s.pd)(e)).deep_link_id;return(n?(0,s.zd)((0,s.pd)(n)).link:null)||n||r||t||e}(e);try{return new e$(t)}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eH{constructor(){this.providerId=eH.PROVIDER_ID}static credential(e,t){return eL._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=e$.parseLink(t);return v(r,"argument-error"),eL._fromEmailAndCode(e,r.code,r.tenantId)}}eH.PROVIDER_ID="password",eH.EMAIL_PASSWORD_SIGN_IN_METHOD="password",eH.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eG{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eK extends eG{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eW extends eK{constructor(){super("facebook.com")}static credential(e){return eM._fromParams({providerId:eW.PROVIDER_ID,signInMethod:eW.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return eW.credentialFromTaggedObject(e)}static credentialFromError(e){return eW.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return eW.credential(e.oauthAccessToken)}catch(e){return null}}}eW.FACEBOOK_SIGN_IN_METHOD="facebook.com",eW.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eQ extends eK{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return eM._fromParams({providerId:eQ.PROVIDER_ID,signInMethod:eQ.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return eQ.credentialFromTaggedObject(e)}static credentialFromError(e){return eQ.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return eQ.credential(t,r)}catch(e){return null}}}eQ.GOOGLE_SIGN_IN_METHOD="google.com",eQ.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eX extends eK{constructor(){super("github.com")}static credential(e){return eM._fromParams({providerId:eX.PROVIDER_ID,signInMethod:eX.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return eX.credentialFromTaggedObject(e)}static credentialFromError(e){return eX.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return eX.credential(e.oauthAccessToken)}catch(e){return null}}}eX.GITHUB_SIGN_IN_METHOD="github.com",eX.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eJ extends eK{constructor(){super("twitter.com")}static credential(e,t){return eM._fromParams({providerId:eJ.PROVIDER_ID,signInMethod:eJ.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return eJ.credentialFromTaggedObject(e)}static credentialFromError(e){return eJ.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return eJ.credential(t,r)}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eY(e,t){return O(e,"POST","/v1/accounts:signUp",C(e,t))}eJ.TWITTER_SIGN_IN_METHOD="twitter.com",eJ.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eZ{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,n=!1){return new eZ({user:await ee._fromIdTokenResponse(e,r,n),providerId:e0(r),_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){return await e._updateTokensIfNecessary(r,!0),new eZ({user:e,providerId:e0(r),_tokenResponse:r,operationType:t})}}function e0(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e1 extends s.ZR{constructor(e,t,r,n){var i;super(t.code,t.message),this.operationType=r,this.user=n,Object.setPrototypeOf(this,e1.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,n){return new e1(e,t,r,n)}}function e2(e,t,r,n){return("reauthenticate"===t?r._getReauthenticationResolver(e):r._getIdTokenResponse(e)).catch(r=>{if("auth/multi-factor-auth-required"===r.code)throw e1._fromErrorAndOperation(e,r,t,n);throw r})}async function e4(e,t,r=!1){let n=await $(e,t._linkToIdToken(e.auth,await e.getIdToken()),r);return eZ._forOperation(e,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e9(e,t,r=!1){let{auth:n}=e;if((0,i.rh)(n.app))return Promise.reject(m(n));let s="reauthenticate";try{let i=await $(e,e2(n,s,t,e),r);v(i.idToken,n,"internal-error");let o=q(i.idToken);v(o,n,"internal-error");let{sub:a}=o;return v(e.uid===a,n,"user-mismatch"),eZ._forOperation(e,s,i)}catch(e){throw(null==e?void 0:e.code)==="auth/user-not-found"&&f(n,"user-mismatch"),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e6(e,t,r=!1){if((0,i.rh)(e.app))return Promise.reject(m(e));let n="signIn",s=await e2(e,n,t),o=await eZ._fromIdTokenResponse(e,n,s);return r||await e._updateCurrentUser(o.user),o}async function e5(e,t){return e6(eb(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e3(e){let t=eb(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function e8(e,t,r){if((0,i.rh)(e.app))return Promise.reject(m(e));let n=eb(e),s=eC(n,{returnSecureToken:!0,email:t,password:r,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",eY),o=await s.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&e3(e),t}),a=await eZ._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(a.user),a}function e7(e,t,r){return(0,i.rh)(e.app)?Promise.reject(m(e)):e5((0,s.m9)(e),eH.credential(t,r)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&e3(e),t})}function te(e,t,r,n){return(0,s.m9)(e).onAuthStateChanged(t,r,n)}function tt(e){return(0,s.m9)(e).signOut()}new WeakMap;let tr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{if(!this.storage)return Promise.resolve(!1);return this.storage.setItem(tr,"1"),this.storage.removeItem(tr),Promise.resolve(!0)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class ti extends tn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=eg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),n=this.localCache[t];r!==n&&e(t,n,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,r)=>{this.notifyListeners(e,r)});return}let r=e.key;t?this.detachListener():this.stopPolling();let n=()=>{let e=this.storage.getItem(r);(t||this.localCache[r]!==e)&&this.notifyListeners(r,e)},i=this.storage.getItem(r);(0,s.w1)()&&10===document.documentMode&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(n,10):n()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let e of Array.from(r))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ti.type="LOCAL";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts extends tn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ts.type="SESSION";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;let r=new to(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let{eventId:t,eventType:r,data:n}=e.data,i=this.handlersMap[r];if(!(null==i?void 0:i.size))return;e.ports[0].postMessage({status:"ack",eventId:t,eventType:r});let s=Array.from(i).map(async t=>t(e.origin,n)),o=await Promise.all(s.map(async e=>{try{let t=await e;return{fulfilled:!0,value:t}}catch(e){return{fulfilled:!1,reason:e}}}));e.ports[0].postMessage({status:"done",eventId:t,eventType:r,response:o})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ta(e="",t=10){let r="";for(let e=0;e<t;e++)r+=Math.floor(10*Math.random());return e+r}to.receivers=[];/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let n,i;let s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw Error("connection_unavailable");return new Promise((o,a)=>{let l=ta("",20);s.port1.start();let u=setTimeout(()=>{a(Error("unsupported_event"))},r);i={messageChannel:s,onMessage(e){if(e.data.eventId===l)switch(e.data.status){case"ack":clearTimeout(u),n=setTimeout(()=>{a(Error("timeout"))},3e3);break;case"done":clearTimeout(n),o(e.data.response);break;default:clearTimeout(u),clearTimeout(n),a(Error("invalid_response"))}}},this.handlers.add(i),s.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function th(){return void 0!==tu().WorkerGlobalScope&&"function"==typeof tu().importScripts}async function tc(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let td="firebaseLocalStorageDb",tf="firebaseLocalStorage",tp="fbase_key";class tg{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function tm(e,t){return e.transaction([tf],t?"readwrite":"readonly").objectStore(tf)}function ty(){let e=indexedDB.open(td,1);return new Promise((t,r)=>{e.addEventListener("error",()=>{r(e.error)}),e.addEventListener("upgradeneeded",()=>{let t=e.result;try{t.createObjectStore(tf,{keyPath:tp})}catch(e){r(e)}}),e.addEventListener("success",async()=>{let r=e.result;r.objectStoreNames.contains(tf)?t(r):(r.close(),await new tg(indexedDB.deleteDatabase(td)).toPromise(),t(await ty()))})})}async function tv(e,t,r){return new tg(tm(e,!0).put({[tp]:t,value:r})).toPromise()}async function tw(e,t){let r=tm(e,!1).get(t),n=await new tg(r).toPromise();return void 0===n?null:n.value}function t_(e,t){return new tg(tm(e,!0).delete(t)).toPromise()}class tb{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await ty()),this.db}async _withRetries(e){let t=0;for(;;)try{let t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return th()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=to._getInstance(th()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await tc(),!this.activeServiceWorker)return;this.sender=new tl(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&(null===(e=r[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=r[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null==navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await ty();return await tv(e,tr,"1"),await t_(e,tr),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>tv(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>tw(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>t_(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>new tg(tm(e,!1).getAll()).toPromise());if(!e||0!==this.pendingWrites)return[];let t=[],r=new Set;if(0!==e.length)for(let{fbase_key:n,value:i}of e)r.add(n),JSON.stringify(this.localCache[n])!==JSON.stringify(i)&&(this.notifyListeners(n,i),t.push(n));for(let e of Object.keys(this.localCache))this.localCache[e]&&!r.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let e of Array.from(r))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}async function tE(e,t,r){var n,i,s;let o=await r.verify();try{let a;if(v("string"==typeof o,e,"argument-error"),v("recaptcha"===r.type,e,"argument-error"),a="string"==typeof t?{phoneNumber:t}:t,"session"in a){let t=a.session;if("phoneNumber"in a)return v("enroll"===t.type,e,"internal-error"),(await (i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:a.phoneNumber,recaptchaToken:o}},k(e,"POST","/v2/accounts/mfaEnrollment:start",C(e,i)))).phoneSessionInfo.sessionInfo;{v("signin"===t.type,e,"internal-error");let r=(null===(n=a.multiFactorHint)||void 0===n?void 0:n.uid)||a.multiFactorUid;return v(r,e,"missing-multi-factor-info"),(await (s={mfaPendingCredential:t.credential,mfaEnrollmentId:r,phoneSignInInfo:{recaptchaToken:o}},k(e,"POST","/v2/accounts/mfaSignIn:start",C(e,s)))).phoneResponseInfo.sessionInfo}}{let{sessionInfo:t}=await eF(e,{phoneNumber:a.phoneNumber,recaptchaToken:o});return t}}finally{r._reset()}}tb.type="LOCAL",eI("rcb"),new E(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e){this.providerId=tT.PROVIDER_ID,this.auth=eb(e)}verifyPhoneNumber(e,t){return tE(this.auth,e,(0,s.m9)(t))}static credential(e,t){return ez._fromVerification(e,t)}static credentialFromResult(e){return tT.credentialFromTaggedObject(e)}static credentialFromError(e){return tT.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?ez._fromTokenResponse(t,r):null}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tI(e,t){return t?er(t):(v(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}tT.PROVIDER_ID="phone",tT.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS extends eO{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return eU(e,this._buildIdpRequest())}_linkToIdToken(e,t){return eU(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return eU(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function tA(e){return e6(e.auth,new tS(e),e.bypassAuthState)}function tC(e){let{auth:t,user:r}=e;return v(r,t,"internal-error"),e9(r,new tS(e),e.bypassAuthState)}async function tk(e){let{auth:t,user:r}=e;return v(r,t,"internal-error"),e4(r,new tS(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tR{constructor(e,t,r,n,i=!1){this.auth=e,this.resolver=r,this.user=n,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:n,tenantId:i,error:s,type:o}=e;if(s){this.reject(s);return}let a={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:n||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tA;case"linkViaPopup":case"linkViaRedirect":return tk;case"reauthViaPopup":case"reauthViaRedirect":return tC;default:f(this.auth,"internal-error")}}resolve(e){var t,r;t=this.pendingPromise,r="Pending promise was never set",t||w(r),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){var t,r;t=this.pendingPromise,r="Pending promise was never set",t||w(r),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tO=new E(2e3,1e4);async function tN(e,t,r){if((0,i.rh)(e.app))return Promise.reject(p(e,"operation-not-supported-in-this-environment"));let n=eb(e);!function(e,t,r){if(!(t instanceof r))throw r.name!==t.constructor.name&&f(e,"argument-error"),g(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}(e,t,eG);let s=tI(n,r);return new tP(n,"signInViaPopup",t,s).executeNotNull()}class tP extends tR{constructor(e,t,r,n,i){super(e,t,n,i),this.provider=r,this.authWindow=null,this.pollId=null,tP.currentPopupAction&&tP.currentPopupAction.cancel(),tP.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return v(e,this.auth,"internal-error"),e}async onExecution(){var e,t;e=1===this.filter.length,t="Popup operations only handle one event",e||w(t);let r=ta();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],r),this.authWindow.associatedEvent=r,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,tP.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(null===(r=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===r?void 0:r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,tO.get())};e()}}tP.currentPopupAction=null;let tD=new Map;class tx extends tR{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=tD.get(this.auth._key());if(!e){try{let t=await tL(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}tD.set(this.auth._key(),e)}return this.bypassAuthState||tD.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"===e.type){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tL(e,t){let r=ei("pendingRedirect",t.config.apiKey,t.name),n=er(e._redirectPersistence);if(!await n._isAvailable())return!1;let i=await n._get(r)==="true";return await n._remove(r),i}function tU(e,t){tD.set(e._key(),t)}async function tM(e,t,r=!1){if((0,i.rh)(e.app))return Promise.reject(m(e));let n=eb(e),s=tI(n,t),o=new tx(n,s,r),a=await o.execute();return a&&!r&&(delete a.user._redirectEventId,await n._persistUserIfCurrent(a.user),await n._setRedirectUser(null,t)),a}class tF{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tj(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!tj(e)){let n=(null===(r=e.error.code)||void 0===r?void 0:r.split("auth/")[1])||"internal-error";t.onError(p(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(tV(e))}saveEventToCache(e){this.cachedEventUids.add(tV(e)),this.lastProcessedEventTime=Date.now()}}function tV(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function tj({type:e,error:t}){return"unknown"===e&&(null==t?void 0:t.code)==="auth/no-auth-event"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tB(e,t={}){return k(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tq=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,tz=/^https?/;async function t$(e){if(e.config.emulator)return;let{authorizedDomains:t}=await tB(e);for(let e of t)try{if(function(e){let t=_(),{protocol:r,hostname:n}=new URL(t);if(e.startsWith("chrome-extension://")){let i=new URL(e);return""===i.hostname&&""===n?"chrome-extension:"===r&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===r&&i.hostname===n}if(!tz.test(r))return!1;if(tq.test(e))return n===e;let i=e.replace(/\./g,"\\.");return RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}(e))return}catch(e){}f(e,"unauthorized-domain")}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tH=new E(3e4,6e4);function tG(){let e=tu().___jsl;if(null==e?void 0:e.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}let tK=null,tW=new E(5e3,15e3),tQ={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},tX=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function tJ(e){let t=await (tK=tK||new Promise((t,r)=>{var n,i,s,o;function a(){tG(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{tG(),r(p(e,"network-request-failed"))},timeout:tH.get()})}if(null===(i=null===(n=tu().gapi)||void 0===n?void 0:n.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else if(null===(s=tu().gapi)||void 0===s?void 0:s.load)a();else{let t=eI("iframefcb");return tu()[t]=()=>{gapi.load?a():r(p(e,"network-request-failed"))},(o=`${eT.gapiScript}?onload=${t}`,eT.loadJS(o)).catch(e=>r(e))}}).catch(e=>{throw tK=null,e})),r=tu().gapi;return v(r,e,"internal-error"),t.open({where:document.body,url:function(e){let t=e.config;v(t.authDomain,e,"auth-domain-config-required");let r=t.emulator?T(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,n={apiKey:t.apiKey,appName:e.name,v:i.Jn},o=tX.get(e.config.apiHost);o&&(n.eid=o);let a=e._getFrameworks();return a.length&&(n.fw=a.join(",")),`${r}?${(0,s.xO)(n).slice(1)}`}(e),messageHandlersFilter:r.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:tQ,dontclear:!0},t=>new Promise(async(r,n)=>{await t.restyle({setHideOnLeave:!1});let i=p(e,"network-request-failed"),s=tu().setTimeout(()=>{n(i)},tW.get());function o(){tu().clearTimeout(s),r(t)}t.ping(o).then(o,()=>{n(i)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tY={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class tZ{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}let t0=encodeURIComponent("fac");async function t1(e,t,r,n,o,a){v(e.config.authDomain,e,"auth-domain-config-required"),v(e.config.apiKey,e,"invalid-api-key");let l={apiKey:e.config.apiKey,appName:e.name,authType:r,redirectUrl:n,v:i.Jn,eventId:o};if(t instanceof eG)for(let[r,n]of(t.setDefaultLanguage(e.languageCode),l.providerId=t.providerId||"",(0,s.xb)(t.getCustomParameters())||(l.customParameters=JSON.stringify(t.getCustomParameters())),Object.entries(a||{})))l[r]=n;if(t instanceof eK){let e=t.getScopes().filter(e=>""!==e);e.length>0&&(l.scopes=e.join(","))}for(let t of(e.tenantId&&(l.tid=e.tenantId),Object.keys(l)))void 0===l[t]&&delete l[t];let u=await e._getAppCheckToken(),h=u?`#${t0}=${encodeURIComponent(u)}`:"";return`${function({config:e}){return e.emulator?T(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}(e)}?${(0,s.xO)(l).slice(1)}${h}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t2="webStorageSupport";class t4{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ts,this._completeRedirectFn=tM,this._overrideRedirectResult=tU}async _openPopup(e,t,r,n){var i,o,a;o=null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,a="_initialize() not called before _openPopup()",o||w(a);let l=await t1(e,t,r,_(),n);return function(e,t,r,n=500,i=600){let o=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-n)/2,0).toString(),l="",u=Object.assign(Object.assign({},tY),{width:n.toString(),height:i.toString(),top:o,left:a}),h=(0,s.z$)().toLowerCase();r&&(l=eu(h)?"_blank":r),ea(h)&&(t=t||"http://localhost",u.scrollbars="yes");let c=Object.entries(u).reduce((e,[t,r])=>`${e}${t}=${r},`,"");if(function(e=(0,s.z$)()){var t;return ep(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(h)&&"_self"!==l)return function(e,t){let r=document.createElement("a");r.href=e,r.target=t;let n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),r.dispatchEvent(n)}(t||"",l),new tZ(null);let d=window.open(t||"",l,c);v(d,e,"popup-blocked");try{d.focus()}catch(e){}return new tZ(d)}(e,l,ta())}async _openRedirect(e,t,r,n){var i;return await this._originValidation(e),i=await t1(e,t,r,_(),n),tu().location.href=i,new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){var r;let{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(r="If manager is not set, promise should be",n||w(r),n)}let n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){let t=await tJ(e),r=new tF(e);return t.register("authEvent",t=>(v(null==t?void 0:t.authEvent,e,"invalid-auth-event"),{status:r.onEvent(t.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(t2,{type:t2},r=>{var n;let i=null===(n=null==r?void 0:r[0])||void 0===n?void 0:n[t2];void 0!==i&&t(!!i),f(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=t$(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return eg()||el()||ep()}}class t9{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return w("unexpected MultiFactorSessionType")}}}class t6 extends t9{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new t6(e)}_finalizeEnroll(e,t,r){return k(e,"POST","/v2/accounts/mfaEnrollment:finalize",C(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}_finalizeSignIn(e,t){return k(e,"POST","/v2/accounts/mfaSignIn:finalize",C(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}}class t5{constructor(){}static assertion(e){return t6._fromCredential(e)}}t5.FACTOR_ID="phone";class t3{static assertionForEnrollment(e,t){return t8._fromSecret(e,t)}static assertionForSignIn(e,t){return t8._fromEnrollmentId(e,t)}static async generateSecret(e){var t,r;v(void 0!==(null===(t=e.user)||void 0===t?void 0:t.auth),"internal-error");let n=await k(r=e.user.auth,"POST","/v2/accounts/mfaEnrollment:start",C(r,{idToken:e.credential,totpEnrollmentInfo:{}}));return t7._fromStartTotpMfaEnrollmentResponse(n,e.user.auth)}}t3.FACTOR_ID="totp";class t8 extends t9{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new t8(t,void 0,e)}static _fromEnrollmentId(e,t){return new t8(t,e)}async _finalizeEnroll(e,t,r){return v(void 0!==this.secret,e,"argument-error"),k(e,"POST","/v2/accounts/mfaEnrollment:finalize",C(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)}))}async _finalizeSignIn(e,t){v(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");let r={verificationCode:this.otp};return k(e,"POST","/v2/accounts/mfaSignIn:finalize",C(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r}))}}class t7{constructor(e,t,r,n,i,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=n,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new t7(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let n=!1;return(re(e)||re(t))&&(n=!0),n&&(re(e)&&(e=(null===(r=this.auth.currentUser)||void 0===r?void 0:r.email)||"unknownuser"),re(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function re(e){return void 0===e||(null==e?void 0:e.length)===0}var rt="@firebase/auth",rr="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){return(this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser)?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){v(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}let ri=(0,s.Pz)("authIdTokenMaxAge")||300,rs=null,ro=e=>async t=>{let r=t&&await t.getIdTokenResult(),n=r&&(new Date().getTime()-Date.parse(r.issuedAtTime))/1e3;if(n&&n>ri)return;let i=null==r?void 0:r.token;rs!==i&&(rs=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function ra(e=(0,i.Mq)()){let t=(0,i.qX)(e,"auth");if(t.isInitialized())return t.getImmediate();let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){let r=(0,i.qX)(e,"auth");if(r.isInitialized()){let e=r.getImmediate(),n=r.getOptions();if((0,s.vZ)(n,null!=t?t:{}))return e;f(e,"already-initialized")}return r.initialize({options:t})}(e,{popupRedirectResolver:t4,persistence:[tb,ti,ts]}),n=(0,s.Pz)("authTokenSyncURL");if(n&&"boolean"==typeof isSecureContext&&isSecureContext){let e=new URL(n,location.origin);if(location.origin===e.origin){var o,a;let t=ro(e.toString());o=()=>t(r.currentUser),(0,s.m9)(r).beforeAuthStateChanged(t,o),a=e=>t(e),(0,s.m9)(r).onIdTokenChanged(a,void 0,void 0)}}let l=(0,s.q4)("auth");return l&&function(e,t,r){let n=eb(e);v(n._canInitEmulator,n,"emulator-config-failed"),v(/^https?:\/\//.test(t),n,"invalid-emulator-scheme");let i=ek(t),{host:s,port:o}=function(e){let t=ek(e),r=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!r)return{host:"",port:null};let n=r[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){let e=i[1];return{host:e,port:eR(n.substr(e.length+1))}}{let[e,t]=n.split(":");return{host:e,port:eR(t)}}}(t),a=null===o?"":`:${o}`;n.config.emulator={url:`${i}//${s}${a}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:s,port:o,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:!1})}),function(){function e(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}(r,`http://${l}`),r}eT={loadJS:e=>new Promise((t,r)=>{var n,i;let s=document.createElement("script");s.setAttribute("src",e),s.onload=t,s.onerror=e=>{let t=p("internal-error");t.customData=e,r(t)},s.type="text/javascript",s.charset="UTF-8",(null!==(i=null===(n=document.getElementsByTagName("head"))||void 0===n?void 0:n[0])&&void 0!==i?i:document).appendChild(s)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},n="Browser",(0,i.Xd)(new l.wA("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;v(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let l=new e_(r,i,s,{apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:em(n)});return function(e,t){let r=(null==t?void 0:t.persistence)||[],n=(Array.isArray(r)?r:[r]).map(er);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(n,null==t?void 0:t.popupRedirectResolver)}(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),(0,i.Xd)(new l.wA("auth-internal",e=>new rn(eb(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),(0,i.KN)(rt,rr,/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(n)),(0,i.KN)(rt,rr,"esm2017")},109:function(e,t,r){"use strict";r.d(t,{ET:function(){return s$},hJ:function(){return iH},oe:function(){return sz},AK:function(){return sW},JU:function(){return iG},QT:function(){return sF},PL:function(){return sj},ad:function(){return iX},b9:function(){return sA},cf:function(){return sH},Xo:function(){return sI},IO:function(){return sw},Bt:function(){return sQ},pl:function(){return sB},TQ:function(){return sk},r7:function(){return sq},ar:function(){return sb}});var n,i,s,o,a,l,u,h,c,d,f,p,g,m,y=r(5816),v=r(8463),w=r(3333),_=r(4444),b="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},E={};(function(){function e(){this.blockSize=-1,this.blockSize=64,this.g=[,,,,],this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function t(e,t,r){r||(r=0);var n=Array(16);if("string"==typeof t)for(var i=0;16>i;++i)n[i]=t.charCodeAt(r++)|t.charCodeAt(r++)<<8|t.charCodeAt(r++)<<16|t.charCodeAt(r++)<<24;else for(i=0;16>i;++i)n[i]=t[r++]|t[r++]<<8|t[r++]<<16|t[r++]<<24;t=e.g[0],r=e.g[1],i=e.g[2];var s=e.g[3],o=t+(s^r&(i^s))+n[0]+3614090360&4294967295;o=s+(i^(t=r+(o<<7&4294967295|o>>>25))&(r^i))+n[1]+3905402710&4294967295,o=i+(r^(s=t+(o<<12&4294967295|o>>>20))&(t^r))+n[2]+606105819&4294967295,o=r+(t^(i=s+(o<<17&4294967295|o>>>15))&(s^t))+n[3]+3250441966&4294967295,o=t+(s^(r=i+(o<<22&4294967295|o>>>10))&(i^s))+n[4]+4118548399&4294967295,o=s+(i^(t=r+(o<<7&4294967295|o>>>25))&(r^i))+n[5]+1200080426&4294967295,o=i+(r^(s=t+(o<<12&4294967295|o>>>20))&(t^r))+n[6]+2821735955&4294967295,o=r+(t^(i=s+(o<<17&4294967295|o>>>15))&(s^t))+n[7]+4249261313&4294967295,o=t+(s^(r=i+(o<<22&4294967295|o>>>10))&(i^s))+n[8]+1770035416&4294967295,o=s+(i^(t=r+(o<<7&4294967295|o>>>25))&(r^i))+n[9]+2336552879&4294967295,o=i+(r^(s=t+(o<<12&4294967295|o>>>20))&(t^r))+n[10]+4294925233&4294967295,o=r+(t^(i=s+(o<<17&4294967295|o>>>15))&(s^t))+n[11]+2304563134&4294967295,o=t+(s^(r=i+(o<<22&4294967295|o>>>10))&(i^s))+n[12]+1804603682&4294967295,o=s+(i^(t=r+(o<<7&4294967295|o>>>25))&(r^i))+n[13]+4254626195&4294967295,o=i+(r^(s=t+(o<<12&4294967295|o>>>20))&(t^r))+n[14]+2792965006&4294967295,o=r+(t^(i=s+(o<<17&4294967295|o>>>15))&(s^t))+n[15]+1236535329&4294967295,r=i+(o<<22&4294967295|o>>>10),o=t+(i^s&(r^i))+n[1]+4129170786&4294967295,t=r+(o<<5&4294967295|o>>>27),o=s+(r^i&(t^r))+n[6]+3225465664&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^r&(s^t))+n[11]+643717713&4294967295,i=s+(o<<14&4294967295|o>>>18),o=r+(s^t&(i^s))+n[0]+3921069994&4294967295,r=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(r^i))+n[5]+3593408605&4294967295,t=r+(o<<5&4294967295|o>>>27),o=s+(r^i&(t^r))+n[10]+38016083&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^r&(s^t))+n[15]+3634488961&4294967295,i=s+(o<<14&4294967295|o>>>18),o=r+(s^t&(i^s))+n[4]+3889429448&4294967295,r=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(r^i))+n[9]+568446438&4294967295,t=r+(o<<5&4294967295|o>>>27),o=s+(r^i&(t^r))+n[14]+3275163606&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^r&(s^t))+n[3]+4107603335&4294967295,i=s+(o<<14&4294967295|o>>>18),o=r+(s^t&(i^s))+n[8]+1163531501&4294967295,r=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(r^i))+n[13]+2850285829&4294967295,t=r+(o<<5&4294967295|o>>>27),o=s+(r^i&(t^r))+n[2]+4243563512&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^r&(s^t))+n[7]+1735328473&4294967295,i=s+(o<<14&4294967295|o>>>18),o=r+(s^t&(i^s))+n[12]+2368359562&4294967295,o=t+((r=i+(o<<20&4294967295|o>>>12))^i^s)+n[5]+4294588738&4294967295,o=s+((t=r+(o<<4&4294967295|o>>>28))^r^i)+n[8]+2272392833&4294967295,o=i+((s=t+(o<<11&4294967295|o>>>21))^t^r)+n[11]+1839030562&4294967295,o=r+((i=s+(o<<16&4294967295|o>>>16))^s^t)+n[14]+4259657740&4294967295,o=t+((r=i+(o<<23&4294967295|o>>>9))^i^s)+n[1]+2763975236&4294967295,o=s+((t=r+(o<<4&4294967295|o>>>28))^r^i)+n[4]+1272893353&4294967295,o=i+((s=t+(o<<11&4294967295|o>>>21))^t^r)+n[7]+4139469664&4294967295,o=r+((i=s+(o<<16&4294967295|o>>>16))^s^t)+n[10]+3200236656&4294967295,o=t+((r=i+(o<<23&4294967295|o>>>9))^i^s)+n[13]+681279174&4294967295,o=s+((t=r+(o<<4&4294967295|o>>>28))^r^i)+n[0]+3936430074&4294967295,o=i+((s=t+(o<<11&4294967295|o>>>21))^t^r)+n[3]+3572445317&4294967295,o=r+((i=s+(o<<16&4294967295|o>>>16))^s^t)+n[6]+76029189&4294967295,o=t+((r=i+(o<<23&4294967295|o>>>9))^i^s)+n[9]+3654602809&4294967295,o=s+((t=r+(o<<4&4294967295|o>>>28))^r^i)+n[12]+3873151461&4294967295,o=i+((s=t+(o<<11&4294967295|o>>>21))^t^r)+n[15]+530742520&4294967295,o=r+((i=s+(o<<16&4294967295|o>>>16))^s^t)+n[2]+3299628645&4294967295,r=i+(o<<23&4294967295|o>>>9),o=t+(i^(r|~s))+n[0]+4096336452&4294967295,t=r+(o<<6&4294967295|o>>>26),o=s+(r^(t|~i))+n[7]+1126891415&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~r))+n[14]+2878612391&4294967295,i=s+(o<<15&4294967295|o>>>17),o=r+(s^(i|~t))+n[5]+4237533241&4294967295,r=i+(o<<21&4294967295|o>>>11),o=t+(i^(r|~s))+n[12]+1700485571&4294967295,t=r+(o<<6&4294967295|o>>>26),o=s+(r^(t|~i))+n[3]+2399980690&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~r))+n[10]+4293915773&4294967295,i=s+(o<<15&4294967295|o>>>17),o=r+(s^(i|~t))+n[1]+2240044497&4294967295,r=i+(o<<21&4294967295|o>>>11),o=t+(i^(r|~s))+n[8]+1873313359&4294967295,t=r+(o<<6&4294967295|o>>>26),o=s+(r^(t|~i))+n[15]+4264355552&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~r))+n[6]+2734768916&4294967295,i=s+(o<<15&4294967295|o>>>17),o=r+(s^(i|~t))+n[13]+1309151649&4294967295,r=i+(o<<21&4294967295|o>>>11),o=t+(i^(r|~s))+n[4]+4149444226&4294967295,t=r+(o<<6&4294967295|o>>>26),o=s+(r^(t|~i))+n[11]+3174756917&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~r))+n[2]+718787259&4294967295,i=s+(o<<15&4294967295|o>>>17),o=r+(s^(i|~t))+n[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+s&4294967295}function r(e,t){this.h=t;for(var r=[],n=!0,i=e.length-1;0<=i;i--){var s=0|e[i];n&&s==t||(r[i]=s,n=!1)}this.g=r}!function(e,t){function r(){}r.prototype=t.prototype,e.D=t.prototype,e.prototype=new r,e.prototype.constructor=e,e.C=function(e,r,n){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[r].apply(e,i)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(e,r){void 0===r&&(r=e.length);for(var n=r-this.blockSize,i=this.B,s=this.h,o=0;o<r;){if(0==s)for(;o<=n;)t(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<r;)if(i[s++]=e.charCodeAt(o++),s==this.blockSize){t(this,i),s=0;break}}else for(;o<r;)if(i[s++]=e[o++],s==this.blockSize){t(this,i),s=0;break}}this.h=s,this.o+=r},e.prototype.v=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var r=8*this.o;for(t=e.length-8;t<e.length;++t)e[t]=255&r,r/=256;for(this.u(e),e=Array(16),t=r=0;4>t;++t)for(var n=0;32>n;n+=8)e[r++]=this.g[t]>>>n&255;return e};var s,o={};function a(e){var t;return -128<=e&&128>e?(t=function(e){return new r([0|e],0>e?-1:0)},Object.prototype.hasOwnProperty.call(o,e)?o[e]:o[e]=t(e)):new r([0|e],0>e?-1:0)}function l(e){if(isNaN(e)||!isFinite(e))return u;if(0>e)return p(l(-e));for(var t=[],n=1,i=0;e>=n;i++)t[i]=e/n|0,n*=4294967296;return new r(t,0)}var u=a(0),h=a(1),c=a(16777216);function d(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function f(e){return -1==e.h}function p(e){for(var t=e.g.length,n=[],i=0;i<t;i++)n[i]=~e.g[i];return new r(n,~e.h).add(h)}function g(e,t){return e.add(p(t))}function m(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function y(e,t){this.g=e,this.h=t}function v(e,t){if(d(t))throw Error("division by zero");if(d(e))return new y(u,u);if(f(e))return t=v(p(e),t),new y(p(t.g),p(t.h));if(f(t))return t=v(e,p(t)),new y(p(t.g),t.h);if(30<e.g.length){if(f(e)||f(t))throw Error("slowDivide_ only works with positive integers.");for(var r=h,n=t;0>=n.l(e);)r=w(r),n=w(n);var i=_(r,1),s=_(n,1);for(n=_(n,2),r=_(r,2);!d(n);){var o=s.add(n);0>=o.l(e)&&(i=i.add(r),s=o),n=_(n,1),r=_(r,1)}return t=g(e,i.j(t)),new y(i,t)}for(i=u;0<=e.l(t);){for(n=48>=(n=Math.ceil(Math.log(r=Math.max(1,Math.floor(e.m()/t.m())))/Math.LN2))?1:Math.pow(2,n-48),o=(s=l(r)).j(t);f(o)||0<o.l(e);)r-=n,o=(s=l(r)).j(t);d(s)&&(s=h),i=i.add(s),e=g(e,o)}return new y(i,e)}function w(e){for(var t=e.g.length+1,n=[],i=0;i<t;i++)n[i]=e.i(i)<<1|e.i(i-1)>>>31;return new r(n,e.h)}function _(e,t){var n=t>>5;t%=32;for(var i=e.g.length-n,s=[],o=0;o<i;o++)s[o]=0<t?e.i(o+n)>>>t|e.i(o+n+1)<<32-t:e.i(o+n);return new r(s,e.h)}(s=r.prototype).m=function(){if(f(this))return-p(this).m();for(var e=0,t=1,r=0;r<this.g.length;r++){var n=this.i(r);e+=(0<=n?n:4294967296+n)*t,t*=4294967296}return e},s.toString=function(e){if(2>(e=e||10)||36<e)throw Error("radix out of range: "+e);if(d(this))return"0";if(f(this))return"-"+p(this).toString(e);for(var t=l(Math.pow(e,6)),r=this,n="";;){var i=v(r,t).g,s=((0<(r=g(r,i.j(t))).g.length?r.g[0]:r.h)>>>0).toString(e);if(d(r=i))return s+n;for(;6>s.length;)s="0"+s;n=s+n}},s.i=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},s.l=function(e){return f(e=g(this,e))?-1:d(e)?0:1},s.abs=function(){return f(this)?p(this):this},s.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0,s=0;s<=t;s++){var o=i+(65535&this.i(s))+(65535&e.i(s)),a=(o>>>16)+(this.i(s)>>>16)+(e.i(s)>>>16);i=a>>>16,o&=65535,a&=65535,n[s]=a<<16|o}return new r(n,-2147483648&n[n.length-1]?-1:0)},s.j=function(e){if(d(this)||d(e))return u;if(f(this))return f(e)?p(this).j(p(e)):p(p(this).j(e));if(f(e))return p(this.j(p(e)));if(0>this.l(c)&&0>e.l(c))return l(this.m()*e.m());for(var t=this.g.length+e.g.length,n=[],i=0;i<2*t;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(var s=0;s<e.g.length;s++){var o=this.i(i)>>>16,a=65535&this.i(i),h=e.i(s)>>>16,g=65535&e.i(s);n[2*i+2*s]+=a*g,m(n,2*i+2*s),n[2*i+2*s+1]+=o*g,m(n,2*i+2*s+1),n[2*i+2*s+1]+=a*h,m(n,2*i+2*s+1),n[2*i+2*s+2]+=o*h,m(n,2*i+2*s+2)}for(i=0;i<t;i++)n[i]=n[2*i+1]<<16|n[2*i];for(i=t;i<2*t;i++)n[i]=0;return new r(n,0)},s.A=function(e){return v(this,e).h},s.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)&e.i(i);return new r(n,this.h&e.h)},s.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)|e.i(i);return new r(n,this.h|e.h)},s.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)^e.i(i);return new r(n,this.h^e.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,i=E.Md5=e,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.A,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=l,r.fromString=function e(t,r){if(0==t.length)throw Error("number format error: empty string");if(2>(r=r||10)||36<r)throw Error("radix out of range: "+r);if("-"==t.charAt(0))return p(e(t.substring(1),r));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=l(Math.pow(r,8)),i=u,s=0;s<t.length;s+=8){var o=Math.min(8,t.length-s),a=parseInt(t.substring(s,s+o),r);8>o?(o=l(Math.pow(r,o)),i=i.j(o).add(l(a))):i=(i=i.j(n)).add(l(a))}return i},n=E.Integer=r}).apply(void 0!==b?b:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var T="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},I={};(function(){var e,t,r,n="function"==typeof Object.defineProperties?Object.defineProperty:function(e,t,r){return e==Array.prototype||e==Object.prototype||(e[t]=r.value),e},i=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof T&&T];for(var t=0;t<e.length;++t){var r=e[t];if(r&&r.Math==Math)return r}throw Error("Cannot find global object")}(this);!function(e,t){if(t)e:{var r=i;e=e.split(".");for(var s=0;s<e.length-1;s++){var o=e[s];if(!(o in r))break e;r=r[o]}(t=t(s=r[e=e[e.length-1]]))!=s&&null!=t&&n(r,e,{configurable:!0,writable:!0,value:t})}}("Array.prototype.values",function(e){return e||function(){var e,t,r,n,i;return e=this,t=function(e,t){return t},e instanceof String&&(e+=""),r=0,n=!1,(i={next:function(){if(!n&&r<e.length){var i=r++;return{value:t(i,e[i]),done:!1}}return n=!0,{done:!0,value:void 0}}})[Symbol.iterator]=function(){return i},i}});var f=f||{},p=this||self;function g(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function m(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function y(e,t,r){return e.call.apply(e.bind,arguments)}function v(e,t,r){if(!e)throw Error();if(2<arguments.length){var n=Array.prototype.slice.call(arguments,2);return function(){var r=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(r,n),e.apply(t,r)}}return function(){return e.apply(t,arguments)}}function w(e,t,r){return(w=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?y:v).apply(null,arguments)}function _(e,t){var r=Array.prototype.slice.call(arguments,1);return function(){var t=r.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function b(e,t){function r(){}r.prototype=t.prototype,e.aa=t.prototype,e.prototype=new r,e.prototype.constructor=e,e.Qb=function(e,r,n){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[r].apply(e,i)}}function E(e){let t=e.length;if(0<t){let r=Array(t);for(let n=0;n<t;n++)r[n]=e[n];return r}return[]}function S(e,t){for(let t=1;t<arguments.length;t++){let r=arguments[t];if(g(r)){let t=e.length||0,n=r.length||0;e.length=t+n;for(let i=0;i<n;i++)e[t+i]=r[i]}else e.push(r)}}class A{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function C(e){return/^[\s\xa0]*$/.test(e)}function k(){var e=p.navigator;return e&&(e=e.userAgent)?e:""}function R(e){return R[" "](e),e}R[" "]=function(){};var O=-1!=k().indexOf("Gecko")&&!(-1!=k().toLowerCase().indexOf("webkit")&&-1==k().indexOf("Edge"))&&!(-1!=k().indexOf("Trident")||-1!=k().indexOf("MSIE"))&&-1==k().indexOf("Edge");function N(e,t,r){for(let n in e)t.call(r,e[n],n,e)}function P(e){let t={};for(let r in e)t[r]=e[r];return t}let D="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function x(e,t){let r,n;for(let t=1;t<arguments.length;t++){for(r in n=arguments[t])e[r]=n[r];for(let t=0;t<D.length;t++)r=D[t],Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}}class L{constructor(){this.h=this.g=null}add(e,t){let r=U.get();r.set(e,t),this.h?this.h.next=r:this.g=r,this.h=r}}var U=new A(()=>new M,e=>e.reset());class M{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let F,V=!1,j=new L,B=()=>{let e=p.Promise.resolve(void 0);F=()=>{e.then(q)}};var q=()=>{let e;for(var t;e=null,j.g&&(e=j.g,j.g=j.g.next,j.g||(j.h=null),e.next=null),t=e;){try{t.h.call(t.g)}catch(e){!function(e){p.setTimeout(()=>{throw e},0)}(e)}U.j(t),100>U.h&&(U.h++,t.next=U.g,U.g=t)}V=!1};function z(){this.s=this.s,this.C=this.C}function $(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}z.prototype.s=!1,z.prototype.ma=function(){this.s||(this.s=!0,this.N())},z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},$.prototype.h=function(){this.defaultPrevented=!0};var H=function(){if(!p.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{let e=()=>{};p.addEventListener("test",e,t),p.removeEventListener("test",e,t)}catch(e){}return e}();function G(e,t){if($.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var r=this.type=e.type,n=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(O){e:{try{R(t.nodeName);var i=!0;break e}catch(e){}i=!1}i||(t=null)}}else"mouseover"==r?t=e.fromElement:"mouseout"==r&&(t=e.toElement);this.relatedTarget=t,n?(this.clientX=void 0!==n.clientX?n.clientX:n.pageX,this.clientY=void 0!==n.clientY?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:K[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&G.aa.h.call(this)}}b(G,$);var K={2:"touch",3:"pen",4:"mouse"};G.prototype.h=function(){G.aa.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var W="closure_listenable_"+(1e6*Math.random()|0),Q=0;function X(e,t,r,n,i){this.listener=e,this.proxy=null,this.src=t,this.type=r,this.capture=!!n,this.ha=i,this.key=++Q,this.da=this.fa=!1}function J(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function Y(e){this.src=e,this.g={},this.h=0}function Z(e,t){var r=t.type;if(r in e.g){var n,i=e.g[r],s=Array.prototype.indexOf.call(i,t,void 0);(n=0<=s)&&Array.prototype.splice.call(i,s,1),n&&(J(t),0==e.g[r].length&&(delete e.g[r],e.h--))}}function ee(e,t,r,n){for(var i=0;i<e.length;++i){var s=e[i];if(!s.da&&s.listener==t&&!!r==s.capture&&s.ha==n)return i}return -1}Y.prototype.add=function(e,t,r,n,i){var s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);var o=ee(e,t,n,i);return -1<o?(t=e[o],r||(t.fa=!1)):((t=new X(t,this.src,s,!!n,i)).fa=r,e.push(t)),t};var et="closure_lm_"+(1e6*Math.random()|0),er={};function en(e,t,r,n,i,s){if(!t)throw Error("Invalid event type");var o=m(i)?!!i.capture:!!i,a=ea(e);if(a||(e[et]=a=new Y(e)),(r=a.add(t,r,n,o,s)).proxy)return r;if(n=function e(t){return eo.call(e.src,e.listener,t)},r.proxy=n,n.src=e,n.listener=r,e.addEventListener)H||(i=o),void 0===i&&(i=!1),e.addEventListener(t.toString(),n,i);else if(e.attachEvent)e.attachEvent(es(t.toString()),n);else if(e.addListener&&e.removeListener)e.addListener(n);else throw Error("addEventListener and attachEvent are unavailable.");return r}function ei(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[W])Z(t.i,e);else{var r=e.type,n=e.proxy;t.removeEventListener?t.removeEventListener(r,n,e.capture):t.detachEvent?t.detachEvent(es(r),n):t.addListener&&t.removeListener&&t.removeListener(n),(r=ea(t))?(Z(r,e),0==r.h&&(r.src=null,t[et]=null)):J(e)}}}function es(e){return e in er?er[e]:er[e]="on"+e}function eo(e,t){if(e.da)e=!0;else{t=new G(t,this);var r=e.listener,n=e.ha||e.src;e.fa&&ei(e),e=r.call(n,t)}return e}function ea(e){return(e=e[et])instanceof Y?e:null}var el="__closure_events_fn_"+(1e9*Math.random()>>>0);function eu(e){return"function"==typeof e?e:(e[el]||(e[el]=function(t){return e.handleEvent(t)}),e[el])}function eh(){z.call(this),this.i=new Y(this),this.M=this,this.F=null}function ec(e,t){var r,n=e.F;if(n)for(r=[];n;n=n.F)r.push(n);if(e=e.M,n=t.type||t,"string"==typeof t)t=new $(t,e);else if(t instanceof $)t.target=t.target||e;else{var i=t;x(t=new $(n,e),i)}if(i=!0,r)for(var s=r.length-1;0<=s;s--){var o=t.g=r[s];i=ed(o,n,!0,t)&&i}if(i=ed(o=t.g=e,n,!0,t)&&i,i=ed(o,n,!1,t)&&i,r)for(s=0;s<r.length;s++)i=ed(o=t.g=r[s],n,!1,t)&&i}function ed(e,t,r,n){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var o=t[s];if(o&&!o.da&&o.capture==r){var a=o.listener,l=o.ha||o.src;o.fa&&Z(e.i,o),i=!1!==a.call(l,n)&&i}}return i&&!n.defaultPrevented}function ef(e,t,r){if("function"==typeof e)r&&(e=w(e,r));else if(e&&"function"==typeof e.handleEvent)e=w(e.handleEvent,e);else throw Error("Invalid listener argument");return 2147483647<Number(t)?-1:p.setTimeout(e,t||0)}b(eh,z),eh.prototype[W]=!0,eh.prototype.removeEventListener=function(e,t,r,n){!function e(t,r,n,i,s){if(Array.isArray(r))for(var o=0;o<r.length;o++)e(t,r[o],n,i,s);else(i=m(i)?!!i.capture:!!i,n=eu(n),t&&t[W])?(t=t.i,(r=String(r).toString())in t.g&&-1<(n=ee(o=t.g[r],n,i,s))&&(J(o[n]),Array.prototype.splice.call(o,n,1),0==o.length&&(delete t.g[r],t.h--))):t&&(t=ea(t))&&(r=t.g[r.toString()],t=-1,r&&(t=ee(r,n,i,s)),(n=-1<t?r[t]:null)&&ei(n))}(this,e,t,r,n)},eh.prototype.N=function(){if(eh.aa.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var r=t.g[e],n=0;n<r.length;n++)J(r[n]);delete t.g[e],t.h--}}this.F=null},eh.prototype.K=function(e,t,r,n){return this.i.add(String(e),t,!1,r,n)},eh.prototype.L=function(e,t,r,n){return this.i.add(String(e),t,!0,r,n)};class ep extends z{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:function e(t){t.g=ef(()=>{t.g=null,t.i&&(t.i=!1,e(t))},t.l);let r=t.h;t.h=null,t.m.apply(null,r)}(this)}N(){super.N(),this.g&&(p.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function eg(e){z.call(this),this.h=e,this.g={}}b(eg,z);var em=[];function ey(e){N(e.g,function(e,t){this.g.hasOwnProperty(t)&&ei(e)},e),e.g={}}eg.prototype.N=function(){eg.aa.N.call(this),ey(this)},eg.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ev=p.JSON.stringify,ew=p.JSON.parse,e_=class{stringify(e){return p.JSON.stringify(e,void 0)}parse(e){return p.JSON.parse(e,void 0)}};function eb(){}function eE(e){return e.h||(e.h=e.i())}function eT(){}eb.prototype.h=null;var eI={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function eS(){$.call(this,"d")}function eA(){$.call(this,"c")}b(eS,$),b(eA,$);var eC={},ek=null;function eR(){return ek=ek||new eh}function eO(e){$.call(this,eC.La,e)}function eN(e){let t=eR();ec(t,new eO(t))}function eP(e,t){$.call(this,eC.STAT_EVENT,e),this.stat=t}function eD(e){let t=eR();ec(t,new eP(t,e))}function ex(e,t){$.call(this,eC.Ma,e),this.size=t}function eL(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return p.setTimeout(function(){e()},t)}function eU(){this.g=!0}function eM(e,t,r,n){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var r=JSON.parse(t);if(r){for(e=0;e<r.length;e++)if(Array.isArray(r[e])){var n=r[e];if(!(2>n.length)){var i=n[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<i.length;o++)i[o]=""}}}}return ev(r)}catch(e){return t}}(e,r)+(n?" "+n:"")})}eC.La="serverreachability",b(eO,$),eC.STAT_EVENT="statevent",b(eP,$),eC.Ma="timingevent",b(ex,$),eU.prototype.xa=function(){this.g=!1},eU.prototype.info=function(){};var eF={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},eV={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function ej(){}function eB(e,t,r,n){this.j=e,this.i=t,this.l=r,this.R=n||1,this.U=new eg(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new eq}function eq(){this.i=null,this.g="",this.h=!1}b(ej,eb),ej.prototype.g=function(){return new XMLHttpRequest},ej.prototype.i=function(){return{}},t=new ej;var ez={},e$={};function eH(e,t,r){e.L=1,e.v=to(tt(t)),e.m=r,e.P=!0,eG(e,null)}function eG(e,t){e.F=Date.now(),eW(e),e.A=tt(e.v);var r=e.A,n=e.R;Array.isArray(n)||(n=[String(n)]),tw(r.i,"t",n),e.C=0,r=e.j.J,e.h=new eq,e.g=t6(e.j,r?t:null,!e.m),0<e.O&&(e.M=new ep(w(e.Y,e,e.g),e.O)),t=e.U,r=e.g,n=e.ca;var i="readystatechange";Array.isArray(i)||(i&&(em[0]=i.toString()),i=em);for(var s=0;s<i.length;s++){var o=function e(t,r,n,i,s){if(i&&i.once)return function e(t,r,n,i,s){if(Array.isArray(r)){for(var o=0;o<r.length;o++)e(t,r[o],n,i,s);return null}return n=eu(n),t&&t[W]?t.L(r,n,m(i)?!!i.capture:!!i,s):en(t,r,n,!0,i,s)}(t,r,n,i,s);if(Array.isArray(r)){for(var o=0;o<r.length;o++)e(t,r[o],n,i,s);return null}return n=eu(n),t&&t[W]?t.K(r,n,m(i)?!!i.capture:!!i,s):en(t,r,n,!1,i,s)}(r,i[s],n||t.handleEvent,!1,t.h||t);if(!o)break;t.g[o.key]=o}t=e.H?P(e.H):{},e.m?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.m,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),eN(),function(e,t,r,n,i,s){e.info(function(){if(e.g){if(s)for(var o="",a=s.split("&"),l=0;l<a.length;l++){var u=a[l].split("=");if(1<u.length){var h=u[0];u=u[1];var c=h.split("_");o=2<=c.length&&"type"==c[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null}else o=s;return"XMLHTTP REQ ("+n+") [attempt "+i+"]: "+t+"\n"+r+"\n"+o})}(e.i,e.u,e.A,e.l,e.R,e.m)}function eK(e){return!!e.g&&"GET"==e.u&&2!=e.L&&e.j.Ca}function eW(e){e.S=Date.now()+e.I,eQ(e,e.I)}function eQ(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=eL(w(e.ba,e),t)}function eX(e){e.B&&(p.clearTimeout(e.B),e.B=null)}function eJ(e){0==e.j.G||e.J||t0(e.j,e)}function eY(e){eX(e);var t=e.M;t&&"function"==typeof t.ma&&t.ma(),e.M=null,ey(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.ma())}function eZ(e,t){try{var r=e.j;if(0!=r.G&&(r.g==e||e9(r.h,e))){if(!e.K&&e9(r.h,e)&&3==r.G){try{var n=r.Da.g.parse(t)}catch(e){n=null}if(Array.isArray(n)&&3==n.length){var i=n;if(0==i[0]){e:if(!r.u){if(r.g){if(r.g.F+3e3<e.F)tZ(r),tz(r);else break e}tX(r),eD(18)}}else r.za=i[1],0<r.za-r.T&&37500>i[2]&&r.F&&0==r.v&&!r.C&&(r.C=eL(w(r.Za,r),6e3));if(1>=e4(r.h)&&r.ca){try{r.ca()}catch(e){}r.ca=void 0}}else t2(r,11)}else if((e.K||r.g==e)&&tZ(r),!C(t))for(i=r.Da.g.parse(t),t=0;t<i.length;t++){let a=i[t];if(r.T=a[0],a=a[1],2==r.G){if("c"==a[0]){r.K=a[1],r.ia=a[2];let t=a[3];null!=t&&(r.la=t,r.j.info("VER="+r.la));let i=a[4];null!=i&&(r.Aa=i,r.j.info("SVER="+r.Aa));let l=a[5];null!=l&&"number"==typeof l&&0<l&&(n=1.5*l,r.L=n,r.j.info("backChannelRequestTimeoutMs_="+n)),n=r;let u=e.g;if(u){let e=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=n.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(e6(s,s.h),s.h=null))}if(n.D){let e=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(n.ya=e,ts(n.I,n.D,e))}}if(r.G=3,r.l&&r.l.ua(),r.ba&&(r.R=Date.now()-e.F,r.j.info("Handshake RTT: "+r.R+"ms")),(n=r).qa=t9(n,n.J?n.ia:null,n.W),e.K){e5(n.h,e);var o=n.L;o&&(e.I=o),e.B&&(eX(e),eW(e)),n.g=e}else tQ(n);0<r.i.length&&tH(r)}else"stop"!=a[0]&&"close"!=a[0]||t2(r,7)}else 3==r.G&&("stop"==a[0]||"close"==a[0]?"stop"==a[0]?t2(r,7):tq(r):"noop"!=a[0]&&r.l&&r.l.ta(a),r.v=0)}}eN(4)}catch(e){}}eB.prototype.ca=function(e){e=e.target;let t=this.M;t&&3==tF(e)?t.j():this.Y(e)},eB.prototype.Y=function(e){try{if(e==this.g)e:{let c=tF(this.g);var t=this.g.Ba();let d=this.g.Z();if(!(3>c)&&(3!=c||this.g&&(this.h.h||this.g.oa()||tV(this.g)))){this.J||4!=c||7==t||(8==t||0>=d?eN(3):eN(2)),eX(this);var r=this.g.Z();this.X=r;t:if(eK(this)){var n=tV(this.g);e="";var i=n.length,s=4==tF(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){eY(this),eJ(this);var o="";break t}this.h.i=new p.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(n[t],{stream:!(s&&t==i-1)});n.length=0,this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.oa();if(this.o=200==r,function(e,t,r,n,i,s,o){e.info(function(){return"XMLHTTP RESP ("+n+") [ attempt "+i+"]: "+t+"\n"+r+"\n"+s+" "+o})}(this.i,this.u,this.A,this.l,this.R,c,r),this.o){if(this.T&&!this.K){t:{if(this.g){var a,l=this.g;if((a=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!C(a)){var u=a;break t}}u=null}if(r=u)eM(this.i,this.l,r,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,eZ(this,r);else{this.o=!1,this.s=3,eD(12),eY(this),eJ(this);break e}}if(this.P){let e;for(r=!0;!this.J&&this.C<o.length;)if((e=function(e,t){var r=e.C,n=t.indexOf("\n",r);return -1==n?e$:isNaN(r=Number(t.substring(r,n)))?ez:(n+=1)+r>t.length?e$:(t=t.slice(n,n+r),e.C=n+r,t)}(this,o))==e$){4==c&&(this.s=4,eD(14),r=!1),eM(this.i,this.l,null,"[Incomplete Response]");break}else if(e==ez){this.s=4,eD(15),eM(this.i,this.l,o,"[Invalid Chunk]"),r=!1;break}else eM(this.i,this.l,e,null),eZ(this,e);if(eK(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=c||0!=o.length||this.h.h||(this.s=1,eD(16),r=!1),this.o=this.o&&r,r){if(0<o.length&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.ba&&!h.M&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+o.length),tJ(h),h.M=!0,eD(11))}}else eM(this.i,this.l,o,"[Invalid Chunked Response]"),eY(this),eJ(this)}else eM(this.i,this.l,o,null),eZ(this,o);4==c&&eY(this),this.o&&!this.J&&(4==c?t0(this.j,this):(this.o=!1,eW(this)))}else(function(e){let t={};e=(e.g&&2<=tF(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let n=0;n<e.length;n++){if(C(e[n]))continue;var r=function(e){var t=1;e=e.split(":");let r=[];for(;0<t&&e.length;)r.push(e.shift()),t--;return e.length&&r.push(e.join(":")),r}(e[n]);let i=r[0];if("string"!=typeof(r=r[1]))continue;r=r.trim();let s=t[i]||[];t[i]=s,s.push(r)}!function(e,t){for(let r in e)t.call(void 0,e[r],r,e)}(t,function(e){return e.join(", ")})})(this.g),400==r&&0<o.indexOf("Unknown SID")?(this.s=3,eD(12)):(this.s=0,eD(13)),eY(this),eJ(this)}}}catch(e){}finally{}},eB.prototype.cancel=function(){this.J=!0,eY(this)},eB.prototype.ba=function(){this.B=null;let e=Date.now();0<=e-this.S?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.A),2!=this.L&&(eN(),eD(17)),eY(this),this.s=2,eJ(this)):eQ(this,this.S-e)};var e0=class{constructor(e,t){this.g=e,this.map=t}};function e1(e){this.l=e||10,e=p.PerformanceNavigationTiming?0<(e=p.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(p.chrome&&p.chrome.loadTimes&&p.chrome.loadTimes()&&p.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function e2(e){return!!e.h||!!e.g&&e.g.size>=e.j}function e4(e){return e.h?1:e.g?e.g.size:0}function e9(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function e6(e,t){e.g?e.g.add(t):e.h=t}function e5(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function e3(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(let r of e.g.values())t=t.concat(r.D);return t}return E(e.i)}function e8(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(g(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var r=function(e){if(e.na&&"function"==typeof e.na)return e.na();if(!e.V||"function"!=typeof e.V){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(g(e)||"string"==typeof e){var t=[];e=e.length;for(var r=0;r<e;r++)t.push(r);return t}for(let n in t=[],r=0,e)t[r++]=n;return t}}}(e),n=function(e){if(e.V&&"function"==typeof e.V)return e.V();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(g(e)){for(var t=[],r=e.length,n=0;n<r;n++)t.push(e[n]);return t}for(n in t=[],r=0,e)t[r++]=e[n];return t}(e),i=n.length,s=0;s<i;s++)t.call(void 0,n[s],r&&r[s],e)}e1.prototype.cancel=function(){if(this.i=e3(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(let e of this.g.values())e.cancel();this.g.clear()}};var e7=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function te(e){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,e instanceof te){this.h=e.h,tr(this,e.j),this.o=e.o,this.g=e.g,tn(this,e.s),this.l=e.l;var t=e.i,r=new tg;r.i=t.i,t.g&&(r.g=new Map(t.g),r.h=t.h),ti(this,r),this.m=e.m}else e&&(t=String(e).match(e7))?(this.h=!1,tr(this,t[1]||"",!0),this.o=ta(t[2]||""),this.g=ta(t[3]||"",!0),tn(this,t[4]),this.l=ta(t[5]||"",!0),ti(this,t[6]||"",!0),this.m=ta(t[7]||"")):(this.h=!1,this.i=new tg(null,this.h))}function tt(e){return new te(e)}function tr(e,t,r){e.j=r?ta(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function tn(e,t){if(t){if(isNaN(t=Number(t))||0>t)throw Error("Bad port number "+t);e.s=t}else e.s=null}function ti(e,t,r){var n,i;t instanceof tg?(e.i=t,n=e.i,(i=e.h)&&!n.j&&(tm(n),n.i=null,n.g.forEach(function(e,t){var r=t.toLowerCase();t!=r&&(ty(this,t),tw(this,r,e))},n)),n.j=i):(r||(t=tl(t,tf)),e.i=new tg(t,e.h))}function ts(e,t,r){e.i.set(t,r)}function to(e){return ts(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function ta(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function tl(e,t,r){return"string"==typeof e?(e=encodeURI(e).replace(t,tu),r&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function tu(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}te.prototype.toString=function(){var e=[],t=this.j;t&&e.push(tl(t,th,!0),":");var r=this.g;return(r||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(tl(t,th,!0),"@"),e.push(encodeURIComponent(String(r)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(r=this.s)&&e.push(":",String(r))),(r=this.l)&&(this.g&&"/"!=r.charAt(0)&&e.push("/"),e.push(tl(r,"/"==r.charAt(0)?td:tc,!0))),(r=this.i.toString())&&e.push("?",r),(r=this.m)&&e.push("#",tl(r,tp)),e.join("")};var th=/[#\/\?@]/g,tc=/[#\?:]/g,td=/[#\?]/g,tf=/[#\?@]/g,tp=/#/g;function tg(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function tm(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var r=0;r<e.length;r++){var n=e[r].indexOf("="),i=null;if(0<=n){var s=e[r].substring(0,n);i=e[r].substring(n+1)}else s=e[r];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,r){e.add(decodeURIComponent(t.replace(/\+/g," ")),r)}))}function ty(e,t){tm(e),t=t_(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function tv(e,t){return tm(e),t=t_(e,t),e.g.has(t)}function tw(e,t,r){ty(e,t),0<r.length&&(e.i=null,e.g.set(t_(e,t),E(r)),e.h+=r.length)}function t_(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function tb(e,t,r,n,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),n(r)}catch(e){}}function tE(){this.g=new e_}function tT(e){this.l=e.Ub||null,this.j=e.eb||!1}function tI(e,t){eh.call(this),this.D=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function tS(e){e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))}function tA(e){e.readyState=4,e.l=null,e.j=null,e.v=null,tC(e)}function tC(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function tk(e){let t="";return N(e,function(e,r){t+=r+":"+e+"\r\n"}),t}function tR(e,t,r){e:{for(n in r){var n=!1;break e}n=!0}n||(r=tk(r),"string"==typeof e?null!=r&&encodeURIComponent(String(r)):ts(e,t,r))}function tO(e){eh.call(this),this.headers=new Map,this.o=e||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(r=tg.prototype).add=function(e,t){tm(this),this.i=null,e=t_(this,e);var r=this.g.get(e);return r||this.g.set(e,r=[]),r.push(t),this.h+=1,this},r.forEach=function(e,t){tm(this),this.g.forEach(function(r,n){r.forEach(function(r){e.call(t,r,n,this)},this)},this)},r.na=function(){tm(this);let e=Array.from(this.g.values()),t=Array.from(this.g.keys()),r=[];for(let n=0;n<t.length;n++){let i=e[n];for(let e=0;e<i.length;e++)r.push(t[n])}return r},r.V=function(e){tm(this);let t=[];if("string"==typeof e)tv(this,e)&&(t=t.concat(this.g.get(t_(this,e))));else{e=Array.from(this.g.values());for(let r=0;r<e.length;r++)t=t.concat(e[r])}return t},r.set=function(e,t){return tm(this),this.i=null,tv(this,e=t_(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},r.get=function(e,t){return e&&0<(e=this.V(e)).length?String(e[0]):t},r.toString=function(){if(this.i)return this.i;if(!this.g)return"";let e=[],t=Array.from(this.g.keys());for(var r=0;r<t.length;r++){var n=t[r];let s=encodeURIComponent(String(n)),o=this.V(n);for(n=0;n<o.length;n++){var i=s;""!==o[n]&&(i+="="+encodeURIComponent(String(o[n]))),e.push(i)}}return this.i=e.join("&")},b(tT,eb),tT.prototype.g=function(){return new tI(this.l,this.j)},tT.prototype.i=(e={},function(){return e}),b(tI,eh),(r=tI.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=e,this.A=t,this.readyState=1,tC(this)},r.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;let t={headers:this.u,method:this.B,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||p).fetch(new Request(this.A,t)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,tA(this)),this.readyState=0},r.Sa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,tC(this)),this.g&&(this.readyState=3,tC(this),this.g))){if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==p.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;tS(this)}else e.text().then(this.Ra.bind(this),this.ga.bind(this))}},r.Pa=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.v.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?tA(this):tC(this),3==this.readyState&&tS(this)}},r.Ra=function(e){this.g&&(this.response=this.responseText=e,tA(this))},r.Qa=function(e){this.g&&(this.response=e,tA(this))},r.ga=function(){this.g&&tA(this)},r.setRequestHeader=function(e,t){this.u.append(e,t)},r.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";let e=[],t=this.h.entries();for(var r=t.next();!r.done;)e.push((r=r.value)[0]+": "+r[1]),r=t.next();return e.join("\r\n")},Object.defineProperty(tI.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),b(tO,eh);var tN=/^https?$/i,tP=["POST","PUT"];function tD(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.m=5,tx(e),tU(e)}function tx(e){e.A||(e.A=!0,ec(e,"complete"),ec(e,"error"))}function tL(e){if(e.h&&void 0!==f&&(!e.v[1]||4!=tF(e)||2!=e.Z())){if(e.u&&4==tF(e))ef(e.Ea,0,e);else if(ec(e,"readystatechange"),4==tF(e)){e.h=!1;try{let o=e.Z();switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t,r,n=!0;break;default:n=!1}if(!(t=n)){if(r=0===o){var i=String(e.D).match(e7)[1]||null;!i&&p.self&&p.self.location&&(i=p.self.location.protocol.slice(0,-1)),r=!tN.test(i?i.toLowerCase():"")}t=r}if(t)ec(e,"complete"),ec(e,"success");else{e.m=6;try{var s=2<tF(e)?e.g.statusText:""}catch(e){s=""}e.l=s+" ["+e.Z()+"]",tx(e)}}finally{tU(e)}}}}function tU(e,t){if(e.g){tM(e);let r=e.g,n=e.v[0]?()=>{}:null;e.g=null,e.v=null,t||ec(e,"ready");try{r.onreadystatechange=n}catch(e){}}}function tM(e){e.I&&(p.clearTimeout(e.I),e.I=null)}function tF(e){return e.g?e.g.readyState:0}function tV(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.H){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function tj(e,t,r){return r&&r.internalChannelParams&&r.internalChannelParams[e]||t}function tB(e){this.Aa=0,this.i=[],this.j=new eU,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=tj("failFast",!1,e),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=tj("baseRetryDelayMs",5e3,e),this.cb=tj("retryDelaySeedMs",1e4,e),this.Wa=tj("forwardChannelMaxRetries",2,e),this.wa=tj("forwardChannelRequestTimeoutMs",2e4,e),this.pa=e&&e.xmlHttpFactory||void 0,this.Xa=e&&e.Tb||void 0,this.Ca=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.h=new e1(e&&e.concurrentRequestLimit),this.Da=new tE,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=e&&e.Rb||!1,e&&e.xa&&this.j.xa(),e&&e.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&e&&e.detectBufferingProxy||!1,this.ja=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.ja=e.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function tq(e){if(t$(e),3==e.G){var t=e.U++,r=tt(e.I);if(ts(r,"SID",e.K),ts(r,"RID",t),ts(r,"TYPE","terminate"),tK(e,r),(t=new eB(e,e.j,t)).L=2,t.v=to(tt(r)),r=!1,p.navigator&&p.navigator.sendBeacon)try{r=p.navigator.sendBeacon(t.v.toString(),"")}catch(e){}!r&&p.Image&&((new Image).src=t.v,r=!0),r||(t.g=t6(t.j,null),t.g.ea(t.v)),t.F=Date.now(),eW(t)}t4(e)}function tz(e){e.g&&(tJ(e),e.g.cancel(),e.g=null)}function t$(e){tz(e),e.u&&(p.clearTimeout(e.u),e.u=null),tZ(e),e.h.cancel(),e.s&&("number"==typeof e.s&&p.clearTimeout(e.s),e.s=null)}function tH(e){if(!e2(e.h)&&!e.s){e.s=!0;var t=e.Ga;F||B(),V||(F(),V=!0),j.add(t,e),e.B=0}}function tG(e,t){var r;r=t?t.l:e.U++;let n=tt(e.I);ts(n,"SID",e.K),ts(n,"RID",r),ts(n,"AID",e.T),tK(e,n),e.m&&e.o&&tR(n,e.m,e.o),r=new eB(e,e.j,r,e.B+1),null===e.m&&(r.H=e.o),t&&(e.i=t.D.concat(e.i)),t=tW(e,r,1e3),r.I=Math.round(.5*e.wa)+Math.round(.5*e.wa*Math.random()),e6(e.h,r),eH(r,n,t)}function tK(e,t){e.H&&N(e.H,function(e,r){ts(t,r,e)}),e.l&&e8({},function(e,r){ts(t,r,e)})}function tW(e,t,r){r=Math.min(e.i.length,r);var n=e.l?w(e.l.Na,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){let e=["count="+r];-1==t?0<r?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let s=!0;for(let o=0;o<r;o++){let r=i[o].g,a=i[o].map;if(0>(r-=t))t=Math.max(0,i[o].g-100),s=!1;else try{!function(e,t,r){let n=r||"";try{e8(e,function(e,r){let i=e;m(e)&&(i=ev(e)),t.push(n+r+"="+encodeURIComponent(i))})}catch(e){throw t.push(n+"type="+encodeURIComponent("_badmap")),e}}(a,e,"req"+r+"_")}catch(e){n&&n(a)}}if(s){n=e.join("&");break e}}}return e=e.i.splice(0,r),t.D=e,n}function tQ(e){if(!e.g&&!e.u){e.Y=1;var t=e.Fa;F||B(),V||(F(),V=!0),j.add(t,e),e.v=0}}function tX(e){return!e.g&&!e.u&&!(3<=e.v)&&(e.Y++,e.u=eL(w(e.Fa,e),t1(e,e.v)),e.v++,!0)}function tJ(e){null!=e.A&&(p.clearTimeout(e.A),e.A=null)}function tY(e){e.g=new eB(e,e.j,"rpc",e.Y),null===e.m&&(e.g.H=e.o),e.g.O=0;var t=tt(e.qa);ts(t,"RID","rpc"),ts(t,"SID",e.K),ts(t,"AID",e.T),ts(t,"CI",e.F?"0":"1"),!e.F&&e.ja&&ts(t,"TO",e.ja),ts(t,"TYPE","xmlhttp"),tK(e,t),e.m&&e.o&&tR(t,e.m,e.o),e.L&&(e.g.I=e.L);var r=e.g;e=e.ia,r.L=1,r.v=to(tt(t)),r.m=null,r.P=!0,eG(r,e)}function tZ(e){null!=e.C&&(p.clearTimeout(e.C),e.C=null)}function t0(e,t){var r=null;if(e.g==t){tZ(e),tJ(e),e.g=null;var n=2}else{if(!e9(e.h,t))return;r=t.D,e5(e.h,t),n=1}if(0!=e.G){if(t.o){if(1==n){r=t.m?t.m.length:0,t=Date.now()-t.F;var i,s=e.B;ec(n=eR(),new ex(n,r)),tH(e)}else tQ(e)}else if(3==(s=t.s)||0==s&&0<t.X||!(1==n&&(i=t,!(e4(e.h)>=e.h.j-(e.s?1:0))&&(e.s?(e.i=i.D.concat(e.i),!0):1!=e.G&&2!=e.G&&!(e.B>=(e.Va?0:e.Wa))&&(e.s=eL(w(e.Ga,e,i),t1(e,e.B)),e.B++,!0)))||2==n&&tX(e)))switch(r&&0<r.length&&((t=e.h).i=t.i.concat(r)),s){case 1:t2(e,5);break;case 4:t2(e,10);break;case 3:t2(e,6);break;default:t2(e,2)}}}function t1(e,t){let r=e.Ta+Math.floor(Math.random()*e.cb);return e.isActive()||(r*=2),r*t}function t2(e,t){if(e.j.info("Error code "+t),2==t){var r=w(e.fb,e),n=e.Xa;let t=!n;n=new te(n||"//www.google.com/images/cleardot.gif"),p.location&&"http"==p.location.protocol||tr(n,"https"),to(n),t?function(e,t){let r=new eU;if(p.Image){let n=new Image;n.onload=_(tb,r,"TestLoadImage: loaded",!0,t,n),n.onerror=_(tb,r,"TestLoadImage: error",!1,t,n),n.onabort=_(tb,r,"TestLoadImage: abort",!1,t,n),n.ontimeout=_(tb,r,"TestLoadImage: timeout",!1,t,n),p.setTimeout(function(){n.ontimeout&&n.ontimeout()},1e4),n.src=e}else t(!1)}(n.toString(),r):function(e,t){let r=new eU,n=new AbortController,i=setTimeout(()=>{n.abort(),tb(r,"TestPingServer: timeout",!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(i),e.ok?tb(r,"TestPingServer: ok",!0,t):tb(r,"TestPingServer: server error",!1,t)}).catch(()=>{clearTimeout(i),tb(r,"TestPingServer: error",!1,t)})}(n.toString(),r)}else eD(2);e.G=0,e.l&&e.l.sa(t),t4(e),t$(e)}function t4(e){if(e.G=0,e.ka=[],e.l){let t=e3(e.h);(0!=t.length||0!=e.i.length)&&(S(e.ka,t),S(e.ka,e.i),e.h.i.length=0,E(e.i),e.i.length=0),e.l.ra()}}function t9(e,t,r){var n=r instanceof te?tt(r):new te(r);if(""!=n.g)t&&(n.g=t+"."+n.g),tn(n,n.s);else{var i=p.location;n=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var s=new te(null);n&&tr(s,n),t&&(s.g=t),i&&tn(s,i),r&&(s.l=r),n=s}return r=e.D,t=e.ya,r&&t&&ts(n,r,t),ts(n,"VER",e.la),tK(e,n),n}function t6(e,t,r){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return(t=new tO(e.Ca&&!e.pa?new tT({eb:r}):e.pa)).Ha(e.J),t}function t5(){}function t3(){}function t8(e,t){eh.call(this),this.g=new tB(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.va&&(e?e["X-WebChannel-Client-Profile"]=t.va:e={"X-WebChannel-Client-Profile":t.va}),this.g.S=e,(e=t&&t.Sb)&&!C(e)&&(this.g.m=e),this.v=t&&t.supportsCrossDomainXhr||!1,this.u=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!C(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new rt(this)}function t7(e){eS.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(let r in t){e=r;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function re(){eA.call(this),this.status=1}function rt(e){this.g=e}(r=tO.prototype).Ha=function(e){this.J=e},r.ea=function(e,r,n,i){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);r=r?r.toUpperCase():"GET",this.D=e,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():t.g(),this.v=this.o?eE(this.o):eE(t),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(r,String(e),!0),this.B=!1}catch(e){tD(this,e);return}if(e=n||"",n=new Map(this.headers),i){if(Object.getPrototypeOf(i)===Object.prototype)for(var s in i)n.set(s,i[s]);else if("function"==typeof i.keys&&"function"==typeof i.get)for(let e of i.keys())n.set(e,i.get(e));else throw Error("Unknown input type for opt_headers: "+String(i))}for(let[t,o]of(i=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=p.FormData&&e instanceof p.FormData,!(0<=Array.prototype.indexOf.call(tP,r,void 0))||i||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),n))this.g.setRequestHeader(t,o);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{tM(this),this.u=!0,this.g.send(e),this.u=!1}catch(e){tD(this,e)}},r.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=e||7,ec(this,"complete"),ec(this,"abort"),tU(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),tU(this,!0)),tO.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?tL(this):this.bb())},r.bb=function(){tL(this)},r.isActive=function(){return!!this.g},r.Z=function(){try{return 2<tF(this)?this.g.status:-1}catch(e){return -1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},r.Oa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),ew(t)}},r.Ba=function(){return this.m},r.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(r=tB.prototype).la=8,r.G=1,r.connect=function(e,t,r,n){eD(0),this.W=e,this.H=t||{},r&&void 0!==n&&(this.H.OSID=r,this.H.OAID=n),this.F=this.X,this.I=t9(this,null,this.W),tH(this)},r.Ga=function(e){if(this.s){if(this.s=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;let i=new eB(this,this.j,e),s=this.o;if(this.S&&(s?x(s=P(s),this.S):s=this.S),null!==this.m||this.O||(i.H=s,s=null),this.P)e:{for(var t=0,r=0;r<this.i.length;r++){t:{var n=this.i[r];if("__data__"in n.map&&"string"==typeof(n=n.map.__data__)){n=n.length;break t}n=void 0}if(void 0===n)break;if(4096<(t+=n)){t=r;break e}if(4096===t||r===this.i.length-1){t=r+1;break e}}t=1e3}else t=1e3;t=tW(this,i,t),ts(r=tt(this.I),"RID",e),ts(r,"CVER",22),this.D&&ts(r,"X-HTTP-Session-Id",this.D),tK(this,r),s&&(this.O?t="headers="+encodeURIComponent(String(tk(s)))+"&"+t:this.m&&tR(r,this.m,s)),e6(this.h,i),this.Ua&&ts(r,"TYPE","init"),this.P?(ts(r,"$req",t),ts(r,"SID","null"),i.T=!0,eH(i,r,null)):eH(i,r,t),this.G=2}}else 3==this.G&&(e?tG(this,e):0==this.i.length||e2(this.h)||tG(this))}},r.Fa=function(){if(this.u=null,tY(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var e=2*this.R;this.j.info("BP detection timer enabled: "+e),this.A=eL(w(this.ab,this),e)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,eD(10),tz(this),tY(this))},r.Za=function(){null!=this.C&&(this.C=null,tz(this),tX(this),eD(19))},r.fb=function(e){e?(this.j.info("Successfully pinged google.com"),eD(2)):(this.j.info("Failed to ping google.com"),eD(1))},r.isActive=function(){return!!this.l&&this.l.isActive(this)},(r=t5.prototype).ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){},t3.prototype.g=function(e,t){return new t8(e,t)},b(t8,eh),t8.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},t8.prototype.close=function(){tq(this.g)},t8.prototype.o=function(e){var t=this.g;if("string"==typeof e){var r={};r.__data__=e,e=r}else this.u&&((r={}).__data__=ev(e),e=r);t.i.push(new e0(t.Ya++,e)),3==t.G&&tH(t)},t8.prototype.N=function(){this.g.l=null,delete this.j,tq(this.g),delete this.g,t8.aa.N.call(this)},b(t7,eS),b(re,eA),b(rt,t5),rt.prototype.ua=function(){ec(this.g,"a")},rt.prototype.ta=function(e){ec(this.g,new t7(e))},rt.prototype.sa=function(e){ec(this.g,new re)},rt.prototype.ra=function(){ec(this.g,"b")},t3.prototype.createWebChannel=t3.prototype.g,t8.prototype.send=t8.prototype.o,t8.prototype.open=t8.prototype.m,t8.prototype.close=t8.prototype.close,d=I.createWebChannelTransport=function(){return new t3},c=I.getStatEventTarget=function(){return eR()},h=I.Event=eC,u=I.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},eF.NO_ERROR=0,eF.TIMEOUT=8,eF.HTTP_ERROR=6,l=I.ErrorCode=eF,eV.COMPLETE="complete",a=I.EventType=eV,eT.EventType=eI,eI.OPEN="a",eI.CLOSE="b",eI.ERROR="c",eI.MESSAGE="d",eh.prototype.listen=eh.prototype.K,o=I.WebChannel=eT,I.FetchXmlHttpFactory=tT,tO.prototype.listenOnce=tO.prototype.L,tO.prototype.getLastError=tO.prototype.Ka,tO.prototype.getLastErrorCode=tO.prototype.Ba,tO.prototype.getStatus=tO.prototype.Z,tO.prototype.getResponseJson=tO.prototype.Oa,tO.prototype.getResponseText=tO.prototype.oa,tO.prototype.send=tO.prototype.ea,tO.prototype.setWithCredentials=tO.prototype.Ha,s=I.XhrIo=tO}).apply(void 0!==T?T:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{}),r(3454);var S=r(1876).Buffer;let A="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}C.UNAUTHENTICATED=new C(null),C.GOOGLE_CREDENTIALS=new C("google-credentials-uid"),C.FIRST_PARTY=new C("first-party-uid"),C.MOCK_USER=new C("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let k="10.14.0",R=new w.Yd("@firebase/firestore");function O(){return R.logLevel}function N(e,...t){if(R.logLevel<=w.in.DEBUG){let r=t.map(x);R.debug(`Firestore (${k}): ${e}`,...r)}}function P(e,...t){if(R.logLevel<=w.in.ERROR){let r=t.map(x);R.error(`Firestore (${k}): ${e}`,...r)}}function D(e,...t){if(R.logLevel<=w.in.WARN){let r=t.map(x);R.warn(`Firestore (${k}): ${e}`,...r)}}function x(e){if("string"==typeof e)return e;try{/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e="Unexpected state"){let t=`FIRESTORE (${k}) INTERNAL ASSERTION FAILED: `+e;throw P(t),Error(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let U={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends _.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class j{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(C.UNAUTHENTICATED))}shutdown(){}}class B{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class q{constructor(e){this.t=e,this.currentUser=C.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){void 0===this.o||L();let r=this.i,n=e=>this.i!==r?(r=this.i,t(e)):Promise.resolve(),i=new F;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new F,e.enqueueRetryable(()=>n(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},o=e=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?o(e):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new F)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||L(),new V(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||L(),new C(e)}}class z{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=C.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class ${constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new z(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(C.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class H{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class G{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){void 0===this.o||L();let r=e=>{null!=e.error&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let r=e.token!==this.R;return this.R=e.token,N("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>r(t))};let n=e=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(e=>n(e)),setTimeout(()=>{if(!this.appCheck){let e=this.A.getImmediate({optional:!0});e?n(e):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?("string"==typeof e.token||L(),this.R=e.token,new H(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let n=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),r=new Uint8Array(40);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(r);else for(let e=0;e<40;e++)r[e]=Math.floor(256*Math.random());return r}(0);for(let i=0;i<n.length;++i)r.length<20&&n[i]<t&&(r+=e.charAt(n[i]%e.length))}return r}}function W(e,t){return e<t?-1:e>t?1:0}function Q(e,t,r){return e.length===t.length&&e.every((e,n)=>r(e,t[n]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new M(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new M(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return X.fromMillis(Date.now())}static fromDate(e){return X.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new X(t,Math.floor(1e6*(e-1e3*t)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?W(this.nanoseconds,e.nanoseconds):W(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.timestamp=e}static fromTimestamp(e){return new J(e)}static min(){return new J(new X(0,0))}static max(){return new J(new X(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e,t,r){void 0===t?t=0:t>e.length&&L(),void 0===r?r=e.length-t:r>e.length-t&&L(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return 0===Y.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof Y?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=e.get(n),i=t.get(n);if(r<i)return -1;if(r>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Z extends Y{construct(e,t,r){return new Z(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new M(U.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(e=>e.length>0))}return new Z(t)}static emptyPath(){return new Z([])}}let ee=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class et extends Y{construct(e,t,r){return new et(e,t,r)}static isValidIdentifier(e){return ee.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),et.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new et(["__name__"])}static fromServerFormat(e){let t=[],r="",n=0,i=()=>{if(0===r.length)throw new M(U.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},s=!1;for(;n<e.length;){let t=e[n];if("\\"===t){if(n+1===e.length)throw new M(U.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new M(U.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=t,n+=2}else"`"===t?s=!s:"."!==t||s?r+=t:i(),n++}if(i(),s)throw new M(U.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new et(t)}static emptyPath(){return new et([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e){this.path=e}static fromPath(e){return new er(Z.fromString(e))}static fromName(e){return new er(Z.fromString(e).popFirst(5))}static empty(){return new er(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===Z.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new er(new Z(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,t,r,n){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=n}}en.UNKNOWN_ID=-1;class ei{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new ei(J.min(),er.empty(),-1)}static max(){return new ei(J.max(),er.empty(),-1)}}class es{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eo(e){if(e.code!==U.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new ea((r,n)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(r,n)},this.catchCallback=e=>{this.wrapFailure(t,e).next(r,n)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof ea?t:ea.resolve(t)}catch(e){return ea.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):ea.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):ea.reject(t)}static resolve(e){return new ea((t,r)=>{t(e)})}static reject(e){return new ea((t,r)=>{r(e)})}static waitFor(e){return new ea((t,r)=>{let n=0,i=0,s=!1;e.forEach(e=>{++n,e.next(()=>{++i,s&&i===n&&t()},e=>r(e))}),s=!0,i===n&&t()})}static or(e){let t=ea.resolve(!1);for(let r of e)t=t.next(e=>e?ea.resolve(e):r());return t}static forEach(e,t){let r=[];return e.forEach((e,n)=>{r.push(t.call(this,e,n))}),this.waitFor(r)}static mapArray(e,t){return new ea((r,n)=>{let i=e.length,s=Array(i),o=0;for(let a=0;a<i;a++){let l=a;t(e[l]).next(e=>{s[l]=e,++o===i&&r(s)},e=>n(e))}})}static doWhile(e,t){return new ea((r,n)=>{let i=()=>{!0===e()?t().next(()=>{i()},n):r()};i()})}}function el(e){return"IndexedDbTransactionError"===e.name}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ie(e),this.se=e=>t.writeSequenceNumber(e))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}}function eh(e){return 0===e&&1/e==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(e){let t=0;for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t++;return t}function ed(e,t){for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t(r,e[r])}function ef(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}eu.oe=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,t){this.comparator=e,this.root=t||em.EMPTY}insert(e,t){return new ep(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,em.BLACK,null,null))}remove(e){return new ep(this.comparator,this.root.remove(e,this.comparator).copy(null,null,em.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(0===r)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let n=this.comparator(e,r.key);if(0===n)return t+r.left.size;n<0?r=r.left:(t+=r.left.size+1,r=r.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new eg(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new eg(this.root,e,this.comparator,!1)}getReverseIterator(){return new eg(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new eg(this.root,e,this.comparator,!0)}}class eg{constructor(e,t,r,n){this.isReverse=n,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&n&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class em{constructor(e,t,r,n,i){this.key=e,this.value=t,this.color=null!=r?r:em.RED,this.left=null!=n?n:em.EMPTY,this.right=null!=i?i:em.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,n,i){return new em(null!=e?e:this.key,null!=t?t:this.value,null!=r?r:this.color,null!=n?n:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let n=this,i=r(e,n.key);return(n=i<0?n.copy(null,null,null,n.left.insert(e,t,r),null):0===i?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,r))).fixUp()}removeMin(){if(this.left.isEmpty())return em.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let r,n=this;if(0>t(e,n.key))n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return em.EMPTY;r=n.right.min(),n=n.copy(r.key,r.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,em.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,em.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();let e=this.left.check();if(e!==this.right.check())throw L();return e+(this.isRed()?0:1)}}em.EMPTY=null,em.RED=!0,em.BLACK=!1,em.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(e,t,r,n,i){return this}insert(e,t,r){return new em(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e){this.comparator=e,this.data=new ep(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let n=r.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let r;for(r=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ev(this.data.getIterator())}getIteratorFrom(e){return new ev(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof ey)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new ey(this.comparator);return t.data=e,t}}class ev{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ew{constructor(e){this.fields=e,e.sort(et.comparator)}static empty(){return new ew([])}unionWith(e){let t=new ey(et.comparator);for(let e of this.fields)t=t.add(e);for(let r of e)t=t.add(r);return new ew(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Q(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(e){this.binaryString=e}static fromBase64String(e){return new eb(function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new e_("Invalid base64 string: "+e):e}}(e))}static fromUint8Array(e){return new eb(function(e){let t="";for(let r=0;r<e.length;++r)t+=String.fromCharCode(e[r]);return t}(e))}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return W(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}eb.EMPTY_BYTE_STRING=new eb("");let eE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function eT(e){if(e||L(),"string"==typeof e){let t=0,r=eE.exec(e);if(r||L(),r[1]){let e=r[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:eI(e.seconds),nanos:eI(e.nanos)}}function eI(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function eS(e){return"string"==typeof e?eb.fromBase64String(e):eb.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eA(e){var t,r;return"server_timestamp"===(null===(r=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===r?void 0:r.stringValue)}function eC(e){let t=e.mapValue.fields.__previous_value__;return eA(t)?eC(t):t}function ek(e){let t=eT(e.mapValue.fields.__local_write_time__.timestampValue);return new X(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eR{constructor(e,t,r,n,i,s,o,a,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=n,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=l}}class eO{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new eO("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof eO&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eN={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function eP(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?eA(e)?4:eK(e)?9007199254740991:eH(e)?10:11:L()}function eD(e,t){if(e===t)return!0;let r=eP(e);if(r!==eP(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return ek(e).isEqual(ek(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let r=eT(e.timestampValue),n=eT(t.timestampValue);return r.seconds===n.seconds&&r.nanos===n.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return eS(e.bytesValue).isEqual(eS(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return eI(e.geoPointValue.latitude)===eI(t.geoPointValue.latitude)&&eI(e.geoPointValue.longitude)===eI(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return eI(e.integerValue)===eI(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let r=eI(e.doubleValue),n=eI(t.doubleValue);return r===n?eh(r)===eh(n):isNaN(r)&&isNaN(n)}return!1}(e,t);case 9:return Q(e.arrayValue.values||[],t.arrayValue.values||[],eD);case 10:case 11:return function(e,t){let r=e.mapValue.fields||{},n=t.mapValue.fields||{};if(ec(r)!==ec(n))return!1;for(let e in r)if(r.hasOwnProperty(e)&&(void 0===n[e]||!eD(r[e],n[e])))return!1;return!0}(e,t);default:return L()}}function ex(e,t){return void 0!==(e.values||[]).find(e=>eD(e,t))}function eL(e,t){if(e===t)return 0;let r=eP(e),n=eP(t);if(r!==n)return W(r,n);switch(r){case 0:case 9007199254740991:return 0;case 1:return W(e.booleanValue,t.booleanValue);case 2:return function(e,t){let r=eI(e.integerValue||e.doubleValue),n=eI(t.integerValue||t.doubleValue);return r<n?-1:r>n?1:r===n?0:isNaN(r)?isNaN(n)?0:-1:1}(e,t);case 3:return eU(e.timestampValue,t.timestampValue);case 4:return eU(ek(e),ek(t));case 5:return W(e.stringValue,t.stringValue);case 6:return function(e,t){let r=eS(e),n=eS(t);return r.compareTo(n)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let r=e.split("/"),n=t.split("/");for(let e=0;e<r.length&&e<n.length;e++){let t=W(r[e],n[e]);if(0!==t)return t}return W(r.length,n.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let r=W(eI(e.latitude),eI(t.latitude));return 0!==r?r:W(eI(e.longitude),eI(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return eM(e.arrayValue,t.arrayValue);case 10:return function(e,t){var r,n,i,s;let o=e.fields||{},a=t.fields||{},l=null===(r=o.value)||void 0===r?void 0:r.arrayValue,u=null===(n=a.value)||void 0===n?void 0:n.arrayValue,h=W((null===(i=null==l?void 0:l.values)||void 0===i?void 0:i.length)||0,(null===(s=null==u?void 0:u.values)||void 0===s?void 0:s.length)||0);return 0!==h?h:eM(l,u)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===eN.mapValue&&t===eN.mapValue)return 0;if(e===eN.mapValue)return 1;if(t===eN.mapValue)return -1;let r=e.fields||{},n=Object.keys(r),i=t.fields||{},s=Object.keys(i);n.sort(),s.sort();for(let e=0;e<n.length&&e<s.length;++e){let t=W(n[e],s[e]);if(0!==t)return t;let o=eL(r[n[e]],i[s[e]]);if(0!==o)return o}return W(n.length,s.length)}(e.mapValue,t.mapValue);default:throw L()}}function eU(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return W(e,t);let r=eT(e),n=eT(t),i=W(r.seconds,n.seconds);return 0!==i?i:W(r.nanos,n.nanos)}function eM(e,t){let r=e.values||[],n=t.values||[];for(let e=0;e<r.length&&e<n.length;++e){let t=eL(r[e],n[e]);if(t)return t}return W(r.length,n.length)}function eF(e){var t,r;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=eT(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?eS(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,er.fromName(t).toString()):"geoPointValue"in e?(r=e.geoPointValue,`geo(${r.latitude},${r.longitude})`):"arrayValue"in e?function(e){let t="[",r=!0;for(let n of e.values||[])r?r=!1:t+=",",t+=eF(n);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),r="{",n=!0;for(let i of t)n?n=!1:r+=",",r+=`${i}:${eF(e.fields[i])}`;return r+"}"}(e.mapValue):L()}function eV(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function ej(e){return!!e&&"integerValue"in e}function eB(e){return!!e&&"arrayValue"in e}function eq(e){return!!e&&"nullValue"in e}function ez(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function e$(e){return!!e&&"mapValue"in e}function eH(e){var t,r;return"__vector__"===(null===(r=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===r?void 0:r.stringValue)}function eG(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return ed(e.mapValue.fields,(e,r)=>t.mapValue.fields[e]=eG(r)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)t.arrayValue.values[r]=eG(e.arrayValue.values[r]);return t}return Object.assign({},e)}function eK(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eW{constructor(e){this.value=e}static empty(){return new eW({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(!e$(t=(t.mapValue.fields||{})[e.get(r)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=eG(t)}setAll(e){let t=et.emptyPath(),r={},n=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,r,n),r={},n=[],t=i.popLast()}e?r[i.lastSegment()]=eG(e):n.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,r,n)}delete(e){let t=this.field(e.popLast());e$(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return eD(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let n=t.mapValue.fields[e.get(r)];e$(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,r){for(let n of(ed(t,(t,r)=>e[t]=r),r))delete e[n]}clone(){return new eW(eG(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eQ{constructor(e,t,r,n,i,s,o){this.key=e,this.documentType=t,this.version=r,this.readTime=n,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(e){return new eQ(e,0,J.min(),J.min(),J.min(),eW.empty(),0)}static newFoundDocument(e,t,r,n){return new eQ(e,1,t,J.min(),r,n,0)}static newNoDocument(e,t){return new eQ(e,2,t,J.min(),J.min(),eW.empty(),0)}static newUnknownDocument(e,t){return new eQ(e,3,t,J.min(),J.min(),eW.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(J.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=eW.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=eW.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof eQ&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new eQ(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eX{constructor(e,t){this.position=e,this.inclusive=t}}function eJ(e,t,r){let n=0;for(let i=0;i<e.position.length;i++){let s=t[i],o=e.position[i];if(n=s.field.isKeyField()?er.comparator(er.fromName(o.referenceValue),r.key):eL(o,r.data.field(s.field)),"desc"===s.dir&&(n*=-1),0!==n)break}return n}function eY(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let r=0;r<e.position.length;r++)if(!eD(e.position[r],t.position[r]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eZ{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e0{}class e1 extends e0{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,r):new e6(e,t,r):"array-contains"===t?new e7(e,r):"in"===t?new te(e,r):"not-in"===t?new tt(e,r):"array-contains-any"===t?new tr(e,r):new e1(e,t,r)}static createKeyFieldInFilter(e,t,r){return"in"===t?new e5(e,r):new e3(e,r)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(eL(t,this.value)):null!==t&&eP(this.value)===eP(t)&&this.matchesComparison(eL(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class e2 extends e0{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new e2(e,t)}matches(e){return e4(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.ae||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function e4(e){return"and"===e.op}function e9(e){for(let t of e.filters)if(t instanceof e2)return!1;return!0}class e6 extends e1{constructor(e,t,r){super(e,t,r),this.key=er.fromName(r.referenceValue)}matches(e){let t=er.comparator(e.key,this.key);return this.matchesComparison(t)}}class e5 extends e1{constructor(e,t){super(e,"in",t),this.keys=e8("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class e3 extends e1{constructor(e,t){super(e,"not-in",t),this.keys=e8("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function e8(e,t){var r;return((null===(r=t.arrayValue)||void 0===r?void 0:r.values)||[]).map(e=>er.fromName(e.referenceValue))}class e7 extends e1{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return eB(t)&&ex(t.arrayValue,this.value)}}class te extends e1{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&ex(this.value.arrayValue,t)}}class tt extends e1{constructor(e,t){super(e,"not-in",t)}matches(e){if(ex(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!ex(this.value.arrayValue,t)}}class tr extends e1{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!eB(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>ex(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e,t=null,r=[],n=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=n,this.limit=i,this.startAt=s,this.endAt=o,this.ue=null}}function ti(e,t=null,r=[],n=[],i=null,s=null,o=null){return new tn(e,t,r,n,i,s,o)}function ts(e){if(null===e.ue){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>(function e(t){if(t instanceof e1)return t.field.canonicalString()+t.op.toString()+eF(t.value);if(e9(t)&&e4(t))return t.filters.map(t=>e(t)).join(",");{let r=t.filters.map(t=>e(t)).join(",");return`${t.op}(${r})`}})(e)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==e.limit||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>eF(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>eF(e)).join(",")),e.ue=t}return e.ue}function to(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var r,n;if(r=e.orderBy[i],n=t.orderBy[i],!(r.dir===n.dir&&r.field.isEqual(n.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let r=0;r<e.filters.length;r++)if(!function e(t,r){return t instanceof e1?r instanceof e1&&t.op===r.op&&t.field.isEqual(r.field)&&eD(t.value,r.value):t instanceof e2?r instanceof e2&&t.op===r.op&&t.filters.length===r.filters.length&&t.filters.reduce((t,n,i)=>t&&e(n,r.filters[i]),!0):void L()}(e.filters[r],t.filters[r]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!eY(e.startAt,t.startAt)&&eY(e.endAt,t.endAt)}function ta(e){return er.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e,t=null,r=[],n=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=n,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function tu(e){return new tl(e)}function th(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function tc(e){return null!==e.collectionGroup}function td(e){if(null===e.ce){let t;e.ce=[];let r=new Set;for(let t of e.explicitOrderBy)e.ce.push(t),r.add(t.field.canonicalString());let n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(t=new ey(et.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t).forEach(t=>{r.has(t.canonicalString())||t.isKeyField()||e.ce.push(new eZ(t,n))}),r.has(et.keyField().canonicalString())||e.ce.push(new eZ(et.keyField(),n))}return e.ce}function tf(e){return e.le||(e.le=function(e,t){if("F"===e.limitType)return ti(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new eZ(e.field,t)});let r=e.endAt?new eX(e.endAt.position,e.endAt.inclusive):null,n=e.startAt?new eX(e.startAt.position,e.startAt.inclusive):null;return ti(e.path,e.collectionGroup,t,e.filters,e.limit,r,n)}}(e,td(e))),e.le}function tp(e,t){let r=e.filters.concat([t]);return new tl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),r,e.limit,e.limitType,e.startAt,e.endAt)}function tg(e,t,r){return new tl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,r,e.startAt,e.endAt)}function tm(e,t){return to(tf(e),tf(t))&&e.limitType===t.limitType}function ty(e){return`${ts(tf(e))}|lt:${e.limitType}`}function tv(e){var t;let r;return`Query(target=${r=(t=tf(e)).path.canonicalString(),null!==t.collectionGroup&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof e1?`${t.field.canonicalString()} ${t.op} ${eF(t.value)}`:t instanceof e2?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),null==t.limit||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(r+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>eF(e)).join(",")),t.endAt&&(r+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>eF(e)).join(",")),`Target(${r})`}; limitType=${e.limitType})`}function tw(e,t){return t.isFoundDocument()&&function(e,t){let r=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(r):er.isDocumentKey(e.path)?e.path.isEqual(r):e.path.isImmediateParentOf(r)}(e,t)&&function(e,t){for(let r of td(e))if(!r.field.isKeyField()&&null===t.data.field(r.field))return!1;return!0}(e,t)&&function(e,t){for(let r of e.filters)if(!r.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,r){let n=eJ(e,t,r);return e.inclusive?n<=0:n<0}(e.startAt,td(e),t))&&(!e.endAt||!!function(e,t,r){let n=eJ(e,t,r);return e.inclusive?n>=0:n>0}(e.endAt,td(e),t))}function t_(e){return(t,r)=>{let n=!1;for(let i of td(e)){let e=function(e,t,r){let n=e.field.isKeyField()?er.comparator(t.key,r.key):function(e,t,r){let n=t.data.field(e),i=r.data.field(e);return null!==n&&null!==i?eL(n,i):L()}(e.field,t,r);switch(e.dir){case"asc":return n;case"desc":return -1*n;default:return L()}}(i,t,r);if(0!==e)return e;n=n||i.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0!==r){for(let[t,n]of r)if(this.equalsFn(t,e))return n}}has(e){return void 0!==this.get(e)}set(e,t){let r=this.mapKeyFn(e),n=this.inner[r];if(void 0===n)return this.inner[r]=[[e,t]],void this.innerSize++;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return void(n[r]=[e,t]);n.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0===r)return!1;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return 1===r.length?delete this.inner[t]:r.splice(n,1),this.innerSize--,!0;return!1}forEach(e){ed(this.inner,(t,r)=>{for(let[t,n]of r)e(t,n)})}isEmpty(){return ef(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tE=new ep(er.comparator),tT=new ep(er.comparator);function tI(...e){let t=tT;for(let r of e)t=t.insert(r.key,r);return t}function tS(e){let t=tT;return e.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function tA(){return new tb(e=>e.toString(),(e,t)=>e.isEqual(t))}let tC=new ep(er.comparator),tk=new ey(er.comparator);function tR(...e){let t=tk;for(let r of e)t=t.add(r);return t}let tO=new ey(W);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tN(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:eh(t)?"-0":t}}function tP(e){return{integerValue:""+e}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tD{constructor(){this._=void 0}}function tx(e,t){return e instanceof tj?ej(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class tL extends tD{}class tU extends tD{constructor(e){super(),this.elements=e}}function tM(e,t){let r=tq(t);for(let t of e.elements)r.some(e=>eD(e,t))||r.push(t);return{arrayValue:{values:r}}}class tF extends tD{constructor(e){super(),this.elements=e}}function tV(e,t){let r=tq(t);for(let t of e.elements)r=r.filter(e=>!eD(e,t));return{arrayValue:{values:r}}}class tj extends tD{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function tB(e){return eI(e.integerValue||e.doubleValue)}function tq(e){return eB(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tz{constructor(e,t){this.field=e,this.transform=t}}class t${constructor(e,t){this.version=e,this.transformResults=t}}class tH{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new tH}static exists(e){return new tH(void 0,e)}static updateTime(e){return new tH(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function tG(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class tK{}function tW(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new t2(e.key,tH.none()):new tJ(e.key,e.data,tH.none());{let r=e.data,n=eW.empty(),i=new ey(et.comparator);for(let e of t.fields)if(!i.has(e)){let t=r.field(e);null===t&&e.length>1&&(e=e.popLast(),t=r.field(e)),null===t?n.delete(e):n.set(e,t),i=i.add(e)}return new tY(e.key,n,new ew(i.toArray()),tH.none())}}function tQ(e,t,r,n){return e instanceof tJ?function(e,t,r,n){if(!tG(e.precondition,t))return r;let i=e.value.clone(),s=t1(e.fieldTransforms,n,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,r,n):e instanceof tY?function(e,t,r,n){if(!tG(e.precondition,t))return r;let i=t1(e.fieldTransforms,n,t),s=t.data;return(s.setAll(tZ(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===r)?null:r.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,r,n):tG(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):r}function tX(e,t){var r,n;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(r=e.fieldTransforms,n=t.fieldTransforms,!!(void 0===r&&void 0===n||!(!r||!n)&&Q(r,n,(e,t)=>{var r,n;return e.field.isEqual(t.field)&&(r=e.transform,n=t.transform,r instanceof tU&&n instanceof tU||r instanceof tF&&n instanceof tF?Q(r.elements,n.elements,eD):r instanceof tj&&n instanceof tj?eD(r.Pe,n.Pe):r instanceof tL&&n instanceof tL)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class tJ extends tK{constructor(e,t,r,n=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=n,this.type=0}getFieldMask(){return null}}class tY extends tK{constructor(e,t,r,n,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=n,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function tZ(e){let t=new Map;return e.fieldMask.fields.forEach(r=>{if(!r.isEmpty()){let n=e.data.field(r);t.set(r,n)}}),t}function t0(e,t,r){var n;let i=new Map;e.length===r.length||L();for(let s=0;s<r.length;s++){let o=e[s],a=o.transform,l=t.data.field(o.field);i.set(o.field,(n=r[s],a instanceof tU?tM(a,l):a instanceof tF?tV(a,l):n))}return i}function t1(e,t,r){let n=new Map;for(let i of e){let e=i.transform,s=r.data.field(i.field);n.set(i.field,e instanceof tL?function(e,t){let r={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&eA(t)&&(t=eC(t)),t&&(r.fields.__previous_value__=t),{mapValue:r}}(t,s):e instanceof tU?tM(e,s):e instanceof tF?tV(e,s):function(e,t){let r=tx(e,t),n=tB(r)+tB(e.Pe);return ej(r)&&ej(e.Pe)?tP(n):tN(e.serializer,n)}(e,s))}return n}class t2 extends tK{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class t4 extends tK{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t9{constructor(e,t,r,n){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=n}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var n;n=r[t],i instanceof tJ?function(e,t,r){let n=e.value.clone(),i=t0(e.fieldTransforms,t,r.transformResults);n.setAll(i),t.convertToFoundDocument(r.version,n).setHasCommittedMutations()}(i,e,n):i instanceof tY?function(e,t,r){if(!tG(e.precondition,t))return void t.convertToUnknownDocument(r.version);let n=t0(e.fieldTransforms,t,r.transformResults),i=t.data;i.setAll(tZ(e)),i.setAll(n),t.convertToFoundDocument(r.version,i).setHasCommittedMutations()}(i,e,n):function(e,t,r){t.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=tQ(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=tQ(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=tA();return this.mutations.forEach(n=>{let i=e.get(n.key),s=i.overlayedDocument,o=this.applyToLocalView(s,i.mutatedFields),a=tW(s,o=t.has(n.key)?null:o);null!==a&&r.set(n.key,a),s.isValidDocument()||s.convertToNoDocument(J.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),tR())}isEqual(e){return this.batchId===e.batchId&&Q(this.mutations,e.mutations,(e,t)=>tX(e,t))&&Q(this.baseMutations,e.baseMutations,(e,t)=>tX(e,t))}}class t6{constructor(e,t,r,n){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=n}static from(e,t,r){e.mutations.length===r.length||L();let n=tC,i=e.mutations;for(let e=0;e<i.length;e++)n=n.insert(i[e].key,r[e].version);return new t6(e,t,r,n)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t5{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t3{constructor(e,t){this.count=e,this.unchangedNames=t}}function t8(e){if(void 0===e)return P("GRPC error has no .code"),U.UNKNOWN;switch(e){case f.OK:return U.OK;case f.CANCELLED:return U.CANCELLED;case f.UNKNOWN:return U.UNKNOWN;case f.DEADLINE_EXCEEDED:return U.DEADLINE_EXCEEDED;case f.RESOURCE_EXHAUSTED:return U.RESOURCE_EXHAUSTED;case f.INTERNAL:return U.INTERNAL;case f.UNAVAILABLE:return U.UNAVAILABLE;case f.UNAUTHENTICATED:return U.UNAUTHENTICATED;case f.INVALID_ARGUMENT:return U.INVALID_ARGUMENT;case f.NOT_FOUND:return U.NOT_FOUND;case f.ALREADY_EXISTS:return U.ALREADY_EXISTS;case f.PERMISSION_DENIED:return U.PERMISSION_DENIED;case f.FAILED_PRECONDITION:return U.FAILED_PRECONDITION;case f.ABORTED:return U.ABORTED;case f.OUT_OF_RANGE:return U.OUT_OF_RANGE;case f.UNIMPLEMENTED:return U.UNIMPLEMENTED;case f.DATA_LOSS:return U.DATA_LOSS;default:return L()}}(p=f||(f={}))[p.OK=0]="OK",p[p.CANCELLED=1]="CANCELLED",p[p.UNKNOWN=2]="UNKNOWN",p[p.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",p[p.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",p[p.NOT_FOUND=5]="NOT_FOUND",p[p.ALREADY_EXISTS=6]="ALREADY_EXISTS",p[p.PERMISSION_DENIED=7]="PERMISSION_DENIED",p[p.UNAUTHENTICATED=16]="UNAUTHENTICATED",p[p.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",p[p.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",p[p.ABORTED=10]="ABORTED",p[p.OUT_OF_RANGE=11]="OUT_OF_RANGE",p[p.UNIMPLEMENTED=12]="UNIMPLEMENTED",p[p.INTERNAL=13]="INTERNAL",p[p.UNAVAILABLE=14]="UNAVAILABLE",p[p.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t7=new n([4294967295,4294967295],0);function re(e){let t=(new TextEncoder).encode(e),r=new i;return r.update(t),new Uint8Array(r.digest())}function rt(e){let t=new DataView(e.buffer),r=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new n([r,i],0),new n([s,o],0)]}class rr{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new rn(`Invalid padding: ${t}`);if(r<0||e.length>0&&0===this.hashCount)throw new rn(`Invalid hash count: ${r}`);if(0===e.length&&0!==t)throw new rn(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=n.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(n.fromNumber(r)));return 1===i.compare(t7)&&(i=new n([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return 0!=(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.Ie)return!1;let[t,r]=rt(re(e));for(let e=0;e<this.hashCount;e++){let n=this.Ee(t,r,e);if(!this.de(n))return!1}return!0}static create(e,t,r){let n=new rr(new Uint8Array(Math.ceil(e/8)),e%8==0?0:8-e%8,t);return r.forEach(e=>n.insert(e)),n}insert(e){if(0===this.Ie)return;let[t,r]=rt(re(e));for(let e=0;e<this.hashCount;e++){let n=this.Ee(t,r,e);this.Ae(n)}}Ae(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class rn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,t,r,n,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=n,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let n=new Map;return n.set(e,rs.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ri(J.min(),n,new ep(W),tE,tR())}}class rs{constructor(e,t,r,n,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=n,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new rs(r,t,tR(),tR(),tR())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e,t,r,n){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=n}}class ra{constructor(e,t){this.targetId=e,this.me=t}}class rl{constructor(e,t,r=eb.EMPTY_BYTE_STRING,n=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=n}}class ru{constructor(){this.fe=0,this.ge=rd(),this.pe=eb.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return 0!==this.fe}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=tR(),t=tR(),r=tR();return this.ge.forEach((n,i)=>{switch(i){case 0:e=e.add(n);break;case 2:t=t.add(n);break;case 1:r=r.add(n);break;default:L()}}),new rs(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=rd()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,this.fe>=0||L()}Ne(){this.we=!0,this.ye=!0}}class rh{constructor(e){this.Le=e,this.Be=new Map,this.ke=tE,this.qe=rc(),this.Qe=new ep(W)}Ke(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{let r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:L()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((e,r)=>{this.ze(r)&&t(r)})}He(e){let t=e.targetId,r=e.me.count,n=this.Je(t);if(n){let i=n.target;if(ta(i)){if(0===r){let e=new er(i.path);this.Ue(t,e,eQ.newNoDocument(e,J.min()))}else 1===r||L()}else{let n=this.Ye(t);if(n!==r){let r=this.Ze(e),i=r?this.Xe(r,e,n):1;0!==i&&(this.je(t),this.Qe=this.Qe.insert(t,2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch"))}}}}Ze(e){let t,r;let n=e.me.unchangedNames;if(!n||!n.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:o=0}=n;try{t=eS(i).toUint8Array()}catch(e){if(e instanceof e_)return D("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{r=new rr(t,s,o)}catch(e){return D(e instanceof rn?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===r.Ie?null:r}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){let r=this.Le.getRemoteKeysForTarget(t),n=0;return r.forEach(r=>{let i=this.Le.tt(),s=`projects/${i.projectId}/databases/${i.database}/documents/${r.path.canonicalString()}`;e.mightContain(s)||(this.Ue(t,r,null),n++)}),n}rt(e){let t=new Map;this.Be.forEach((r,n)=>{let i=this.Je(n);if(i){if(r.current&&ta(i.target)){let t=new er(i.target.path);null!==this.ke.get(t)||this.it(n,t)||this.Ue(n,t,eQ.newNoDocument(t,e))}r.be&&(t.set(n,r.ve()),r.Ce())}});let r=tR();this.qe.forEach((e,t)=>{let n=!0;t.forEachWhile(e=>{let t=this.Je(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(n=!1,!1)}),n&&(r=r.add(e))}),this.ke.forEach((t,r)=>r.setReadTime(e));let n=new ri(e,t,this.Qe,this.ke,r);return this.ke=tE,this.qe=rc(),this.Qe=new ep(W),n}$e(e,t){if(!this.ze(e))return;let r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;let n=this.Ge(e);this.it(e,t)?n.Fe(t,1):n.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){let t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new ru,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ey(W),this.qe=this.qe.insert(e,t)),t}ze(e){let t=null!==this.Je(e);return t||N("WatchChangeAggregator","Detected inactive target",e),t}Je(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new ru),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function rc(){return new ep(er.comparator)}function rd(){return new ep(er.comparator)}let rf={asc:"ASCENDING",desc:"DESCENDING"},rp={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},rg={and:"AND",or:"OR"};class rm{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ry(e,t){return e.useProto3Json||null==t?t:{value:t}}function rv(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function rw(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function r_(e){return e||L(),J.fromTimestamp(function(e){let t=eT(e);return new X(t.seconds,t.nanos)}(e))}function rb(e,t){return rE(e,t).canonicalString()}function rE(e,t){let r=new Z(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?r:r.child(t)}function rT(e){let t=Z.fromString(e);return rP(t)||L(),t}function rI(e,t){return rb(e.databaseId,t.path)}function rS(e,t){let r=rT(t);if(r.get(1)!==e.databaseId.projectId)throw new M(U.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+e.databaseId.projectId);if(r.get(3)!==e.databaseId.database)throw new M(U.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+e.databaseId.database);return new er(rk(r))}function rA(e,t){return rb(e.databaseId,t)}function rC(e){return new Z(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function rk(e){return e.length>4&&"documents"===e.get(4)||L(),e.popFirst(5)}function rR(e,t,r){return{name:rI(e,t),fields:r.value.mapValue.fields}}function rO(e){return{fieldPath:e.canonicalString()}}function rN(e){return et.fromServerFormat(e.fieldPath)}function rP(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rD{constructor(e,t,r,n,i=J.min(),s=J.min(),o=eb.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=n,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new rD(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new rD(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new rD(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new rD(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rx{constructor(e){this.ct=e}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rL{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(eI(e.integerValue));else if("doubleValue"in e){let r=eI(e.doubleValue);isNaN(r)?this.dt(t,13):(this.dt(t,15),eh(r)?t.At(0):t.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(t,20),"string"==typeof r&&(r=eT(r)),t.Rt(`${r.seconds||""}`),t.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(eS(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.dt(t,45),t.At(r.latitude||0),t.At(r.longitude||0)}else"mapValue"in e?eK(e)?this.dt(t,Number.MAX_SAFE_INTEGER):eH(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):L()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){let r=e.fields||{};for(let e of(this.dt(t,55),Object.keys(r)))this.Vt(e,t),this.Tt(r[e],t)}wt(e,t){var r,n;let i=e.fields||{};this.dt(t,53);let s="value",o=(null===(n=null===(r=i[s].arrayValue)||void 0===r?void 0:r.values)||void 0===n?void 0:n.length)||0;this.dt(t,15),t.At(eI(o)),this.Vt(s,t),this.Tt(i[s],t)}bt(e,t){let r=e.values||[];for(let e of(this.dt(t,50),r))this.Tt(e,t)}yt(e,t){this.dt(t,37),er.fromName(e).path.forEach(e=>{this.dt(t,60),this.Dt(e,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}rL.vt=new rL;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rU{constructor(){this.un=new rM}addToCollectionParentIndex(e,t){return this.un.add(t),ea.resolve()}getCollectionParents(e,t){return ea.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return ea.resolve()}deleteFieldIndex(e,t){return ea.resolve()}deleteAllFieldIndexes(e){return ea.resolve()}createTargetIndexes(e,t){return ea.resolve()}getDocumentsMatchingTarget(e,t){return ea.resolve(null)}getIndexType(e,t){return ea.resolve(0)}getFieldIndexes(e,t){return ea.resolve([])}getNextCollectionGroupToUpdate(e){return ea.resolve(null)}getMinOffset(e,t){return ea.resolve(ei.min())}getMinOffsetFromCollectionGroup(e,t){return ea.resolve(ei.min())}updateCollectionGroup(e,t,r){return ea.resolve()}updateIndexEntries(e,t){return ea.resolve()}}class rM{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t]||new ey(Z.comparator),i=!n.has(r);return this.index[t]=n.add(r),i}has(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t];return n&&n.has(r)}getEntries(e){return(this.index[e]||new ey(Z.comparator)).toArray()}}new Uint8Array(0);class rF{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new rF(e,rF.DEFAULT_COLLECTION_PERCENTILE,rF.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */rF.DEFAULT_COLLECTION_PERCENTILE=10,rF.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,rF.DEFAULT=new rF(41943040,rF.DEFAULT_COLLECTION_PERCENTILE,rF.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),rF.DISABLED=new rF(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rV{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new rV(0)}static kn(){return new rV(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rj{constructor(){this.changes=new tb(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,eQ.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return void 0!==r?ea.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rB{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rq{constructor(e,t,r,n){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=n}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(n=>(r=n,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==r&&tQ(r.mutation,e,ew.empty(),X.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,tR()).next(()=>t))}getLocalViewOfDocuments(e,t,r=tR()){let n=tA();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,r).next(e=>{let t=tI();return e.forEach((e,r)=>{t=t.insert(e,r.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let r=tA();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,tR()))}populateOverlays(e,t,r){let n=[];return r.forEach(e=>{t.has(e)||n.push(e)}),this.documentOverlayCache.getOverlays(e,n).next(e=>{e.forEach((e,r)=>{t.set(e,r)})})}computeViews(e,t,r,n){let i=tE,s=tA(),o=tA();return t.forEach((e,t)=>{let o=r.get(t.key);n.has(t.key)&&(void 0===o||o.mutation instanceof tY)?i=i.insert(t.key,t):void 0!==o?(s.set(t.key,o.mutation.getFieldMask()),tQ(o.mutation,t,o.mutation.getFieldMask(),X.now())):s.set(t.key,ew.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var r;return o.set(e,new rB(t,null!==(r=s.get(e))&&void 0!==r?r:null))}),o))}recalculateAndSaveOverlays(e,t){let r=tA(),n=new ep((e,t)=>e-t),i=tR();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let o=r.get(e)||ew.empty();o=i.applyToLocalView(s,o),r.set(e,o);let a=(n.get(i.batchId)||tR()).add(e);n=n.insert(i.batchId,a)})}).next(()=>{let s=[],o=n.getReverseIterator();for(;o.hasNext();){let n=o.getNext(),a=n.key,l=n.value,u=tA();l.forEach(e=>{if(!i.has(e)){let n=tW(t.get(e),r.get(e));null!==n&&u.set(e,n),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,a,u))}return ea.waitFor(s)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,r,n){return er.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):tc(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,n):this.getDocumentsMatchingCollectionQuery(e,t,r,n)}getNextDocuments(e,t,r,n){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,n).next(i=>{let s=n-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,n-i.size):ea.resolve(tA()),o=-1,a=i;return s.next(t=>ea.forEach(t,(t,r)=>(o<r.largestBatchId&&(o=r.largestBatchId),i.get(t)?ea.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,tR())).next(e=>({batchId:o,changes:tS(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new er(t)).next(e=>{let t=tI();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,r,n){let i=t.collectionGroup,s=tI();return this.indexManager.getCollectionParents(e,i).next(o=>ea.forEach(o,o=>{let a=new tl(o.child(i),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,a,r,n).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,r,n){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,n))).next(e=>{i.forEach((t,r)=>{let n=r.getKey();null===e.get(n)&&(e=e.insert(n,eQ.newInvalidDocument(n)))});let r=tI();return e.forEach((e,n)=>{let s=i.get(e);void 0!==s&&tQ(s.mutation,n,ew.empty(),X.now()),tw(t,n)&&(r=r.insert(e,n))}),r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rz{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return ea.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,{id:t.id,version:t.version,createTime:r_(t.createTime)}),ea.resolve()}getNamedQuery(e,t){return ea.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,{name:t.name,query:function(e){let t=function(e){var t;let r,n=function(e){let t=rT(e);return 4===t.length?Z.emptyPath():rk(t)}(e.parent),i=e.structuredQuery,s=i.from?i.from.length:0,o=null;if(s>0){1===s||L();let e=i.from[0];e.allDescendants?o=e.collectionId:n=n.child(e.collectionId)}let a=[];i.where&&(a=function(e){var t;let r=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=rN(e.unaryFilter.field);return e1.create(t,"==",{doubleValue:NaN});case"IS_NULL":let r=rN(e.unaryFilter.field);return e1.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let n=rN(e.unaryFilter.field);return e1.create(n,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=rN(e.unaryFilter.field);return e1.create(i,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(t):void 0!==t.fieldFilter?e1.create(rN(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?e2.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return L()}}(t.compositeFilter.op)):L()}(e);return r instanceof e2&&e9(t=r)&&e4(t)?r.getFilters():[r]}(i.where));let l=[];i.orderBy&&(l=i.orderBy.map(e=>new eZ(rN(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let u=null;i.limit&&(u=null==(r="object"==typeof(t=i.limit)?t.value:t)?null:r);let h=null;i.startAt&&(h=function(e){let t=!!e.before;return new eX(e.values||[],t)}(i.startAt));let c=null;return i.endAt&&(c=function(e){let t=!e.before;return new eX(e.values||[],t)}(i.endAt)),new tl(n,o,l,a,u,"F",h,c)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?tg(t,t.limit,"L"):t}(t.bundledQuery),readTime:r_(t.readTime)}),ea.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r${constructor(){this.overlays=new ep(er.comparator),this.Ir=new Map}getOverlay(e,t){return ea.resolve(this.overlays.get(t))}getOverlays(e,t){let r=tA();return ea.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&r.set(t,e)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((r,n)=>{this.ht(e,t,n)}),ea.resolve()}removeOverlaysForBatchId(e,t,r){let n=this.Ir.get(r);return void 0!==n&&(n.forEach(e=>this.overlays=this.overlays.remove(e)),this.Ir.delete(r)),ea.resolve()}getOverlaysForCollection(e,t,r){let n=tA(),i=t.length+1,s=new er(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){let e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>r&&n.set(e.getKey(),e)}return ea.resolve(n)}getOverlaysForCollectionGroup(e,t,r,n){let i=new ep((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>r){let t=i.get(e.largestBatchId);null===t&&(t=tA(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let o=tA(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=n)););return ea.resolve(o)}ht(e,t,r){let n=this.overlays.get(r.key);if(null!==n){let e=this.Ir.get(n.largestBatchId).delete(r.key);this.Ir.set(n.largestBatchId,e)}this.overlays=this.overlays.insert(r.key,new t5(t,r));let i=this.Ir.get(t);void 0===i&&(i=tR(),this.Ir.set(t,i)),this.Ir.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rH{constructor(){this.sessionToken=eb.EMPTY_BYTE_STRING}getSessionToken(e){return ea.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,ea.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rG{constructor(){this.Tr=new ey(rK.Er),this.dr=new ey(rK.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){let r=new rK(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Vr(new rK(e,t))}mr(e,t){e.forEach(e=>this.removeReference(e,t))}gr(e){let t=new er(new Z([])),r=new rK(t,e),n=new rK(t,e+1),i=[];return this.dr.forEachInRange([r,n],e=>{this.Vr(e),i.push(e.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){let t=new er(new Z([])),r=new rK(t,e),n=new rK(t,e+1),i=tR();return this.dr.forEachInRange([r,n],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new rK(e,0),r=this.Tr.firstAfterOrEqual(t);return null!==r&&e.isEqual(r.key)}}class rK{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return er.comparator(e.key,t.key)||W(e.wr,t.wr)}static Ar(e,t){return W(e.wr,t.wr)||er.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rW{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ey(rK.Er)}checkEmpty(e){return ea.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,r,n){let i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new t9(i,t,r,n);for(let t of(this.mutationQueue.push(s),n))this.br=this.br.add(new rK(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return ea.resolve(s)}lookupMutationBatch(e,t){return ea.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){let r=this.vr(t+1),n=r<0?0:r;return ea.resolve(this.mutationQueue.length>n?this.mutationQueue[n]:null)}getHighestUnacknowledgedBatchId(){return ea.resolve(0===this.mutationQueue.length?-1:this.Sr-1)}getAllMutationBatches(e){return ea.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new rK(t,0),n=new rK(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,n],e=>{let t=this.Dr(e.wr);i.push(t)}),ea.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ey(W);return t.forEach(e=>{let t=new rK(e,0),n=new rK(e,Number.POSITIVE_INFINITY);this.br.forEachInRange([t,n],e=>{r=r.add(e.wr)})}),ea.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,n=r.length+1,i=r;er.isDocumentKey(i)||(i=i.child(""));let s=new rK(new er(i),0),o=new ey(W);return this.br.forEachWhile(e=>{let t=e.key.path;return!!r.isPrefixOf(t)&&(t.length===n&&(o=o.add(e.wr)),!0)},s),ea.resolve(this.Cr(o))}Cr(e){let t=[];return e.forEach(e=>{let r=this.Dr(e);null!==r&&t.push(r)}),t}removeMutationBatch(e,t){0===this.Fr(t.batchId,"removed")||L(),this.mutationQueue.shift();let r=this.br;return ea.forEach(t.mutations,n=>{let i=new rK(n.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){let r=new rK(t,0),n=this.br.firstAfterOrEqual(r);return ea.resolve(t.isEqual(n&&n.key))}performConsistencyCheck(e){return this.mutationQueue.length,ea.resolve()}Fr(e,t){return this.vr(e)}vr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Dr(e){let t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rQ{constructor(e){this.Mr=e,this.docs=new ep(er.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,n=this.docs.get(r),i=n?n.size:0,s=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return ea.resolve(r?r.document.mutableCopy():eQ.newInvalidDocument(t))}getEntries(e,t){let r=tE;return t.forEach(e=>{let t=this.docs.get(e);r=r.insert(e,t?t.document.mutableCopy():eQ.newInvalidDocument(e))}),ea.resolve(r)}getDocumentsMatchingQuery(e,t,r,n){let i=tE,s=t.path,o=new er(s.child("")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){let{key:e,value:{document:o}}=a.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=function(e,t){let r=e.readTime.compareTo(t.readTime);return 0!==r?r:0!==(r=er.comparator(e.documentKey,t.documentKey))?r:W(e.largestBatchId,t.largestBatchId)}(new ei(o.readTime,o.key,-1),r)||(n.has(o.key)||tw(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return ea.resolve(i)}getAllFromCollectionGroup(e,t,r,n){L()}Or(e,t){return ea.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new rX(this)}getSize(e){return ea.resolve(this.size)}}class rX extends rj{constructor(e){super(),this.cr=e}applyChanges(e){let t=[];return this.changes.forEach((r,n)=>{n.isValidDocument()?t.push(this.cr.addEntry(e,n)):this.cr.removeEntry(r)}),ea.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rJ{constructor(e){this.persistence=e,this.Nr=new tb(e=>ts(e),to),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.Lr=0,this.Br=new rG,this.targetCount=0,this.kr=rV.Bn()}forEachTarget(e,t){return this.Nr.forEach((e,r)=>t(r)),ea.resolve()}getLastRemoteSnapshotVersion(e){return ea.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return ea.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),ea.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),ea.resolve()}Kn(e){this.Nr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.kr=new rV(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,ea.resolve()}updateTargetData(e,t){return this.Kn(t),ea.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,ea.resolve()}removeTargets(e,t,r){let n=0,i=[];return this.Nr.forEach((s,o)=>{o.sequenceNumber<=t&&null===r.get(o.targetId)&&(this.Nr.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),n++)}),ea.waitFor(i).next(()=>n)}getTargetCount(e){return ea.resolve(this.targetCount)}getTargetData(e,t){let r=this.Nr.get(t)||null;return ea.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),ea.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);let n=this.persistence.referenceDelegate,i=[];return n&&t.forEach(t=>{i.push(n.markPotentiallyOrphaned(e,t))}),ea.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),ea.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Br.yr(t);return ea.resolve(r)}containsKey(e,t){return ea.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rY{constructor(e,t){this.qr={},this.overlays={},this.Qr=new eu(0),this.Kr=!1,this.Kr=!0,this.$r=new rH,this.referenceDelegate=e(this),this.Ur=new rJ(this),this.indexManager=new rU,this.remoteDocumentCache=new rQ(e=>this.referenceDelegate.Wr(e)),this.serializer=new rx(t),this.Gr=new rz(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new r$,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new rW(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){N("MemoryPersistence","Starting transaction:",e);let n=new rZ(this.Qr.next());return this.referenceDelegate.zr(),r(n).next(e=>this.referenceDelegate.jr(n).next(()=>e)).toPromise().then(e=>(n.raiseOnCommittedEvent(),e))}Hr(e,t){return ea.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class rZ extends es{constructor(e){super(),this.currentSequenceNumber=e}}class r0{constructor(e){this.persistence=e,this.Jr=new rG,this.Yr=null}static Zr(e){return new r0(e)}get Xr(){if(this.Yr)return this.Yr;throw L()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),ea.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),ea.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),ea.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(e=>this.Xr.add(e.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Xr.add(e.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return ea.forEach(this.Xr,r=>{let n=er.fromPath(r);return this.ei(e,n).next(e=>{e||t.removeEntry(n,J.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(e=>{e?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return ea.or([()=>ea.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r1{constructor(e,t,r,n){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=n}static Wi(e,t){let r=tR(),n=tR();for(let e of t.docChanges)switch(e.type){case 0:r=r.add(e.doc.key);break;case 1:n=n.add(e.doc.key)}return new r1(e,t.fromCache,r,n)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r2{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r4{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(0,_.G6)()?8:function(e){let t=e.match(/Android ([\d.]+)/i);return Number(t?t[1].split(".").slice(0,2).join("."):"-1")}((0,_.z$)())>0?6:4}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,n){let i={result:null};return this.Yi(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.Zi(e,t,n,r).next(e=>{i.result=e})}).next(()=>{if(i.result)return;let r=new r2;return this.Xi(e,t,r).next(n=>{if(i.result=n,this.zi)return this.es(e,t,r,n.size)})}).next(()=>i.result)}es(e,t,r,n){return r.documentReadCount<this.ji?(O()<=w.in.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",tv(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),ea.resolve()):(O()<=w.in.DEBUG&&N("QueryEngine","Query:",tv(t),"scans",r.documentReadCount,"local documents and returns",n,"documents as results."),r.documentReadCount>this.Hi*n?(O()<=w.in.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",tv(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tf(t))):ea.resolve())}Yi(e,t){if(th(t))return ea.resolve(null);let r=tf(t);return this.indexManager.getIndexType(e,r).next(n=>0===n?null:(null!==t.limit&&1===n&&(r=tf(t=tg(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,r).next(n=>{let i=tR(...n);return this.Ji.getDocuments(e,i).next(n=>this.indexManager.getMinOffset(e,r).next(r=>{let s=this.ts(t,n);return this.ns(t,s,i,r.readTime)?this.Yi(e,tg(t,null,"F")):this.rs(e,s,t,r)}))})))}Zi(e,t,r,n){return th(t)||n.isEqual(J.min())?ea.resolve(null):this.Ji.getDocuments(e,r).next(i=>{let s=this.ts(t,i);return this.ns(t,s,r,n)?ea.resolve(null):(O()<=w.in.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),tv(t)),this.rs(e,s,t,function(e,t){let r=e.toTimestamp().seconds,n=e.toTimestamp().nanoseconds+1;return new ei(J.fromTimestamp(1e9===n?new X(r+1,0):new X(r,n)),er.empty(),-1)}(n,0)).next(e=>e))})}ts(e,t){let r=new ey(t_(e));return t.forEach((t,n)=>{tw(e,n)&&(r=r.add(n))}),r}ns(e,t,r,n){if(null===e.limit)return!1;if(r.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(n)>0)}Xi(e,t,r){return O()<=w.in.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",tv(t)),this.Ji.getDocumentsMatchingQuery(e,t,ei.min(),r)}rs(e,t,r,n){return this.Ji.getDocumentsMatchingQuery(e,r,n).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r9{constructor(e,t,r,n){this.persistence=e,this.ss=t,this.serializer=n,this.os=new ep(W),this._s=new tb(e=>ts(e),to),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new rq(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}async function r6(e,t){return await e.persistence.runTransaction("Handle user change","readonly",r=>{let n;return e.mutationQueue.getAllMutationBatches(r).next(i=>(n=i,e.ls(t),e.mutationQueue.getAllMutationBatches(r))).next(t=>{let i=[],s=[],o=tR();for(let e of n)for(let t of(i.push(e.batchId),e.mutations))o=o.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))o=o.add(t.key);return e.localDocuments.getDocuments(r,o).next(e=>({hs:e,removedBatchIds:i,addedBatchIds:s}))})})}function r5(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}async function r3(e,t,r){let n=e.os.get(t);try{r||await e.persistence.runTransaction("Release target",r?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,n))}catch(e){if(!el(e))throw e;N("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}e.os=e.os.remove(t),e._s.delete(n.target)}function r8(e,t,r){let n=J.min(),i=tR();return e.persistence.runTransaction("Execute query","readwrite",s=>(function(e,t,r){let n=e._s.get(r);return void 0!==n?ea.resolve(e.os.get(n)):e.Ur.getTargetData(t,r)})(e,s,tf(t)).next(t=>{if(t)return n=t.lastLimboFreeSnapshotVersion,e.Ur.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.ss.getDocumentsMatchingQuery(s,t,r?n:J.min(),r?i:tR())).next(r=>{var n;let s;return n=t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2)),s=e.us.get(n)||J.min(),r.forEach((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)}),e.us.set(n,s),{documents:r,Ts:i}}))}class r7{constructor(){this.activeTargetIds=tO}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class ne{constructor(){this.so=new r7,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new r7,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){for(let e of(N("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.ho))e(0)}lo(){for(let e of(N("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.ho))e(1)}static D(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn=null;function ni(){return null===nn?nn=268435456+Math.round(2147483648*Math.random()):nn++,"0x"+nn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ns={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let na="WebChannelConnection";class nl extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),n=encodeURIComponent(this.databaseId.database);this.Do=t+"://"+e.host,this.vo=`projects/${r}/databases/${n}`,this.Co="(default)"===this.databaseId.database?`project_id=${r}`:`project_id=${r}&database_id=${n}`}get Fo(){return!1}Mo(e,t,r,n,i){let s=ni(),o=this.xo(e,t.toUriEncodedString());N("RestConnection",`Sending RPC '${e}' ${s}:`,o,r);let a={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(a,n,i),this.No(e,o,a,r).then(t=>(N("RestConnection",`Received RPC '${e}' ${s}: `,t),t),t=>{throw D("RestConnection",`RPC '${e}' ${s} failed with error: `,t,"url: ",o,"request:",r),t})}Lo(e,t,r,n,i,s){return this.Mo(e,t,r,n,i)}Oo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+k}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,r)=>e[r]=t),r&&r.headers.forEach((t,r)=>e[r]=t)}xo(e,t){let r=ns[e];return`${this.Do}/v1/${t}:${r}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,n){let i=ni();return new Promise((o,u)=>{let h=new s;h.setWithCredentials(!0),h.listenOnce(a.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case l.NO_ERROR:let t=h.getResponseJson();N(na,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),o(t);break;case l.TIMEOUT:N(na,`RPC '${e}' ${i} timed out`),u(new M(U.DEADLINE_EXCEEDED,"Request time out"));break;case l.HTTP_ERROR:let r=h.getStatus();if(N(na,`RPC '${e}' ${i} failed with status:`,r,"response text:",h.getResponseText()),r>0){let e=h.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=null==e?void 0:e.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(U).indexOf(t)>=0?t:U.UNKNOWN}(t.status);u(new M(e,t.message))}else u(new M(U.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new M(U.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{N(na,`RPC '${e}' ${i} completed.`)}});let c=JSON.stringify(n);N(na,`RPC '${e}' ${i} sending request:`,n),h.send(t,"POST",c,r,15)})}Bo(e,t,r){let n=ni(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=d(),a=c(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},p=this.longPollingOptions.timeoutSeconds;void 0!==p&&(l.longPollingTimeout=Math.round(1e3*p)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let g=i.join("");N(na,`Creating RPC '${e}' stream ${n}: ${g}`,l);let m=s.createWebChannel(g,l),y=!1,v=!1,w=new no({Io:t=>{v?N(na,`Not sending because RPC '${e}' stream ${n} is closed:`,t):(y||(N(na,`Opening RPC '${e}' stream ${n} transport.`),m.open(),y=!0),N(na,`RPC '${e}' stream ${n} sending:`,t),m.send(t))},To:()=>m.close()}),_=(e,t,r)=>{e.listen(t,e=>{try{r(e)}catch(e){setTimeout(()=>{throw e},0)}})};return _(m,o.EventType.OPEN,()=>{v||(N(na,`RPC '${e}' stream ${n} transport opened.`),w.yo())}),_(m,o.EventType.CLOSE,()=>{v||(v=!0,N(na,`RPC '${e}' stream ${n} transport closed`),w.So())}),_(m,o.EventType.ERROR,t=>{v||(v=!0,D(na,`RPC '${e}' stream ${n} transport errored:`,t),w.So(new M(U.UNAVAILABLE,"The operation could not be completed")))}),_(m,o.EventType.MESSAGE,t=>{var r;if(!v){let i=t.data[0];i||L();let s=i.error||(null===(r=i[0])||void 0===r?void 0:r.error);if(s){N(na,`RPC '${e}' stream ${n} received error:`,s);let t=s.status,r=function(e){let t=f[e];if(void 0!==t)return t8(t)}(t),i=s.message;void 0===r&&(r=U.INTERNAL,i="Unknown error status: "+t+" with message "+s.message),v=!0,w.So(new M(r,i)),m.close()}else N(na,`RPC '${e}' stream ${n} received:`,i),w.bo(i)}}),_(a,h.STAT_EVENT,t=>{t.stat===u.PROXY?N(na,`RPC '${e}' stream ${n} detected buffering proxy`):t.stat===u.NOPROXY&&N(na,`RPC '${e}' stream ${n} detected no buffering proxy`)}),setTimeout(()=>{w.wo()},0),w}}function nu(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nh(e){return new rm(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e,t,r=1e3,n=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=n,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();let t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),n=Math.max(0,t-r);n>0&&N("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,n,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){null!==this.$o&&(this.$o.skipDelay(),this.$o=null)}cancel(){null!==this.$o&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(e,t,r,n,i,s,o,a){this.ui=e,this.Ho=r,this.Jo=n,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new nc(e,t)}n_(){return 1===this.state||5===this.state||this.r_()}r_(){return 2===this.state||3===this.state}start(){this.e_=0,4!==this.state?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&null===this.Zo&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,4!==e?this.t_.reset():t&&t.code===U.RESOURCE_EXHAUSTED?(P(t.toString()),P("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===U.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;let e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,r])=>{this.Yo===t&&this.P_(e,r)},t=>{e(()=>{let e=new M(U.UNKNOWN,"Fetching auth token failed: "+t.message);return this.I_(e)})})}P_(e,t){let r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(e=>{r(()=>this.I_(e))}),this.stream.onMessage(e=>{r(()=>1==++this.e_?this.E_(e):this.onNext(e))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return N("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(N("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class nf extends nd{constructor(e,t,r,n,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();let t=function(e,t){let r;if("targetChange"in t){var n,i;t.targetChange;let s="NO_CHANGE"===(n=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===n?1:"REMOVE"===n?2:"CURRENT"===n?3:"RESET"===n?4:L(),o=t.targetChange.targetIds||[],a=(i=t.targetChange.resumeToken,e.useProto3Json?(void 0===i||"string"==typeof i||L(),eb.fromBase64String(i||"")):(void 0===i||i instanceof S||i instanceof Uint8Array||L(),eb.fromUint8Array(i||new Uint8Array))),l=t.targetChange.cause;r=new rl(s,o,a,l&&new M(void 0===l.code?U.UNKNOWN:t8(l.code),l.message||"")||null)}else if("documentChange"in t){t.documentChange;let n=t.documentChange;n.document,n.document.name,n.document.updateTime;let i=rS(e,n.document.name),s=r_(n.document.updateTime),o=n.document.createTime?r_(n.document.createTime):J.min(),a=new eW({mapValue:{fields:n.document.fields}}),l=eQ.newFoundDocument(i,s,o,a);r=new ro(n.targetIds||[],n.removedTargetIds||[],l.key,l)}else if("documentDelete"in t){t.documentDelete;let n=t.documentDelete;n.document;let i=rS(e,n.document),s=n.readTime?r_(n.readTime):J.min(),o=eQ.newNoDocument(i,s);r=new ro([],n.removedTargetIds||[],o.key,o)}else if("documentRemove"in t){t.documentRemove;let n=t.documentRemove;n.document;let i=rS(e,n.document);r=new ro([],n.removedTargetIds||[],i,null)}else{if(!("filter"in t))return L();{t.filter;let e=t.filter;e.targetId;let{count:n=0,unchangedNames:i}=e,s=new t3(n,i);r=new ra(e.targetId,s)}}return r}(this.serializer,e),r=function(e){if(!("targetChange"in e))return J.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?J.min():t.readTime?r_(t.readTime):J.min()}(e);return this.listener.d_(t,r)}A_(e){let t={};t.database=rC(this.serializer),t.addTarget=function(e,t){let r;let n=t.target;if((r=ta(n)?{documents:{documents:[rA(e,n.path)]}}:{query:function(e,t){var r,n;let i;let s={structuredQuery:{}},o=t.path;null!==t.collectionGroup?(i=o,s.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=o.popLast(),s.structuredQuery.from=[{collectionId:o.lastSegment()}]),s.parent=rA(e,i);let a=function(e){if(0!==e.length)return function e(t){return t instanceof e1?function(e){if("=="===e.op){if(ez(e.value))return{unaryFilter:{field:rO(e.field),op:"IS_NAN"}};if(eq(e.value))return{unaryFilter:{field:rO(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(ez(e.value))return{unaryFilter:{field:rO(e.field),op:"IS_NOT_NAN"}};if(eq(e.value))return{unaryFilter:{field:rO(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rO(e.field),op:rp[e.op],value:e.value}}}(t):t instanceof e2?function(t){let r=t.getFilters().map(t=>e(t));return 1===r.length?r[0]:{compositeFilter:{op:rg[t.op],filters:r}}}(t):L()}(e2.create(e,"and"))}(t.filters);a&&(s.structuredQuery.where=a);let l=function(e){if(0!==e.length)return e.map(e=>({field:rO(e.field),direction:rf[e.dir]}))}(t.orderBy);l&&(s.structuredQuery.orderBy=l);let u=ry(e,t.limit);return null!==u&&(s.structuredQuery.limit=u),t.startAt&&(s.structuredQuery.startAt={before:(r=t.startAt).inclusive,values:r.position}),t.endAt&&(s.structuredQuery.endAt={before:!(n=t.endAt).inclusive,values:n.position}),{_t:s,parent:i}}(e,n)._t}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){r.resumeToken=rw(e,t.resumeToken);let n=ry(e,t.expectedCount);null!==n&&(r.expectedCount=n)}else if(t.snapshotVersion.compareTo(J.min())>0){r.readTime=rv(e,t.snapshotVersion.toTimestamp());let n=ry(e,t.expectedCount);null!==n&&(r.expectedCount=n)}return r}(this.serializer,e);let r=function(e,t){let r=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(t.purpose);return null==r?null:{"goog-listen-tags":r}}(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){let t={};t.database=rC(this.serializer),t.removeTarget=e,this.a_(t)}}class np extends nd{constructor(e,t,r,n,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return e.streamToken||L(),this.lastStreamToken=e.streamToken,e.writeResults&&0!==e.writeResults.length&&L(),this.listener.f_()}onNext(e){var t,r;e.streamToken||L(),this.lastStreamToken=e.streamToken,this.t_.reset();let n=(t=e.writeResults,r=e.commitTime,t&&t.length>0?(void 0!==r||L(),t.map(e=>{let t;return(t=e.updateTime?r_(e.updateTime):r_(r)).isEqual(J.min())&&(t=r_(r)),new t$(t,e.transformResults||[])})):[]),i=r_(e.commitTime);return this.listener.g_(i,n)}p_(){let e={};e.database=rC(this.serializer),this.a_(e)}m_(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>(function(e,t){var r;let n;if(t instanceof tJ)n={update:rR(e,t.key,t.value)};else if(t instanceof t2)n={delete:rI(e,t.key)};else if(t instanceof tY)n={update:rR(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof t4))return L();n={verify:rI(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let r=t.transform;if(r instanceof tL)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(r instanceof tU)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:r.elements}};if(r instanceof tF)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:r.elements}};if(r instanceof tj)return{fieldPath:t.field.canonicalString(),increment:r.Pe};throw L()})(0,e))),t.precondition.isNone||(n.currentDocument=void 0!==(r=t.precondition).updateTime?{updateTime:rv(e,r.updateTime.toTimestamp())}:void 0!==r.exists?{exists:r.exists}:L()),n})(this.serializer,e))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng extends class{}{constructor(e,t,r,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=n,this.y_=!1}w_(){if(this.y_)throw new M(U.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,n){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Mo(e,rE(t,r),n,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new M(U.UNKNOWN,e.toString())})}Lo(e,t,r,n,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Lo(e,rE(t,r),n,s,o,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new M(U.UNKNOWN,e.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class nm{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){0===this.S_&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){"Online"===this.state?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,"Online"===e&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(P(t),this.D_=!1):N("OnlineStateTracker",t)}x_(){null!==this.b_&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e,t,r,n,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(e=>{r.enqueueAndForget(async()=>{nA(this)&&(N("RemoteStore","Restarting streams for network reachability change."),await async function(e){e.L_.add(4),await nw(e),e.q_.set("Unknown"),e.L_.delete(4),await nv(e)}(this))})}),this.q_=new nm(r,n)}}async function nv(e){if(nA(e))for(let t of e.B_)await t(!0)}async function nw(e){for(let t of e.B_)await t(!1)}function n_(e,t){e.N_.has(t.targetId)||(e.N_.set(t.targetId,t),nS(e)?nI(e):nq(e).r_()&&nE(e,t))}function nb(e,t){let r=nq(e);e.N_.delete(t),r.r_()&&nT(e,t),0===e.N_.size&&(r.r_()?r.o_():nA(e)&&e.q_.set("Unknown"))}function nE(e,t){if(e.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(J.min())>0){let r=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(r)}nq(e).A_(t)}function nT(e,t){e.Q_.xe(t),nq(e).R_(t)}function nI(e){e.Q_=new rh({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>e.N_.get(t)||null,tt:()=>e.datastore.serializer.databaseId}),nq(e).start(),e.q_.v_()}function nS(e){return nA(e)&&!nq(e).n_()&&e.N_.size>0}function nA(e){return 0===e.L_.size}async function nC(e){e.q_.set("Online")}async function nk(e){e.N_.forEach((t,r)=>{nE(e,t)})}async function nR(e,t){e.Q_=void 0,nS(e)?(e.q_.M_(t),nI(e)):e.q_.set("Unknown")}async function nO(e,t,r){if(e.q_.set("Online"),t instanceof rl&&2===t.state&&t.cause)try{await async function(e,t){let r=t.cause;for(let n of t.targetIds)e.N_.has(n)&&(await e.remoteSyncer.rejectListen(n,r),e.N_.delete(n),e.Q_.removeTarget(n))}(e,t)}catch(r){N("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await nN(e,r)}else if(t instanceof ro?e.Q_.Ke(t):t instanceof ra?e.Q_.He(t):e.Q_.We(t),!r.isEqual(J.min()))try{let t=await r5(e.localStore);r.compareTo(t)>=0&&await function(e,t){let r=e.Q_.rt(t);return r.targetChanges.forEach((r,n)=>{if(r.resumeToken.approximateByteSize()>0){let i=e.N_.get(n);i&&e.N_.set(n,i.withResumeToken(r.resumeToken,t))}}),r.targetMismatches.forEach((t,r)=>{let n=e.N_.get(t);if(!n)return;e.N_.set(t,n.withResumeToken(eb.EMPTY_BYTE_STRING,n.snapshotVersion)),nT(e,t);let i=new rD(n.target,t,r,n.sequenceNumber);nE(e,i)}),e.remoteSyncer.applyRemoteEvent(r)}(e,r)}catch(t){N("RemoteStore","Failed to raise snapshot:",t),await nN(e,t)}}async function nN(e,t,r){if(!el(t))throw t;e.L_.add(1),await nw(e),e.q_.set("Offline"),r||(r=()=>r5(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{N("RemoteStore","Retrying IndexedDB access"),await r(),e.L_.delete(1),await nv(e)})}function nP(e,t){return t().catch(r=>nN(e,r,t))}async function nD(e){let t=nz(e),r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;nA(e)&&e.O_.length<10;)try{let n=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}(e.localStore,r);if(null===n){0===e.O_.length&&t.o_();break}r=n.batchId,function(e,t){e.O_.push(t);let r=nz(e);r.r_()&&r.V_&&r.m_(t.mutations)}(e,n)}catch(t){await nN(e,t)}nx(e)&&nL(e)}function nx(e){return nA(e)&&!nz(e).n_()&&e.O_.length>0}function nL(e){nz(e).start()}async function nU(e){nz(e).p_()}async function nM(e){let t=nz(e);for(let r of e.O_)t.m_(r.mutations)}async function nF(e,t,r){let n=e.O_.shift(),i=t6.from(n,t,r);await nP(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await nD(e)}async function nV(e,t){t&&nz(e).V_&&await async function(e,t){var r;if(function(e){switch(e){default:return L();case U.CANCELLED:case U.UNKNOWN:case U.DEADLINE_EXCEEDED:case U.RESOURCE_EXHAUSTED:case U.INTERNAL:case U.UNAVAILABLE:case U.UNAUTHENTICATED:return!1;case U.INVALID_ARGUMENT:case U.NOT_FOUND:case U.ALREADY_EXISTS:case U.PERMISSION_DENIED:case U.FAILED_PRECONDITION:case U.ABORTED:case U.OUT_OF_RANGE:case U.UNIMPLEMENTED:case U.DATA_LOSS:return!0}}(r=t.code)&&r!==U.ABORTED){let r=e.O_.shift();nz(e).s_(),await nP(e,()=>e.remoteSyncer.rejectFailedWrite(r.batchId,t)),await nD(e)}}(e,t),nx(e)&&nL(e)}async function nj(e,t){e.asyncQueue.verifyOperationInProgress(),N("RemoteStore","RemoteStore received new credentials");let r=nA(e);e.L_.add(3),await nw(e),r&&e.q_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.L_.delete(3),await nv(e)}async function nB(e,t){t?(e.L_.delete(2),await nv(e)):t||(e.L_.add(2),await nw(e),e.q_.set("Unknown"))}function nq(e){var t,r,n;return e.K_||(e.K_=(t=e.datastore,r=e.asyncQueue,n={Eo:nC.bind(null,e),Ro:nk.bind(null,e),mo:nR.bind(null,e),d_:nO.bind(null,e)},t.w_(),new nf(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.B_.push(async t=>{t?(e.K_.s_(),nS(e)?nI(e):e.q_.set("Unknown")):(await e.K_.stop(),e.Q_=void 0)})),e.K_}function nz(e){var t,r,n;return e.U_||(e.U_=(t=e.datastore,r=e.asyncQueue,n={Eo:()=>Promise.resolve(),Ro:nU.bind(null,e),mo:nV.bind(null,e),f_:nM.bind(null,e),g_:nF.bind(null,e)},t.w_(),new np(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.B_.push(async t=>{t?(e.U_.s_(),await nD(e)):(await e.U_.stop(),e.O_.length>0&&(N("RemoteStore",`Stopping write stream with ${e.O_.length} pending writes`),e.O_=[]))})),e.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n${constructor(e,t,r,n,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=n,this.removalCallback=i,this.deferred=new F,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,n,i){let s=new n$(e,t,Date.now()+r,n,i);return s.start(r),s}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new M(U.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function nH(e,t){if(P("AsyncQueue",`${t}: ${e}`),el(e))return new M(U.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nG{constructor(e){this.comparator=e?(t,r)=>e(t,r)||er.comparator(t.key,r.key):(e,t)=>er.comparator(e.key,t.key),this.keyedMap=tI(),this.sortedSet=new ep(this.comparator)}static emptySet(e){return new nG(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof nG)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(!e.isEqual(n))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let r=new nG;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nK{constructor(){this.W_=new ep(er.comparator)}track(e){let t=e.doc.key,r=this.W_.get(t);r?0!==e.type&&3===r.type?this.W_=this.W_.insert(t,e):3===e.type&&1!==r.type?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):2===e.type&&2===r.type?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):2===e.type&&0===r.type?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):1===e.type&&0===r.type?this.W_=this.W_.remove(t):1===e.type&&2===r.type?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):0===e.type&&1===r.type?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):L():this.W_=this.W_.insert(t,e)}G_(){let e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class nW{constructor(e,t,r,n,i,s,o,a,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=n,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,n,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new nW(e,t,nG.emptySet(t),s,r,n,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&tm(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==r[e].type||!t[e].doc.isEqual(r[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nQ{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class nX{constructor(){this.queries=nJ(),this.onlineState="Unknown",this.Y_=new Set}terminate(){!function(e,t){let r=e.queries;e.queries=nJ(),r.forEach((e,r)=>{for(let e of r.j_)e.onError(t)})}(this,new M(U.ABORTED,"Firestore shutting down"))}}function nJ(){return new tb(e=>ty(e),tm)}async function nY(e,t){let r=3,n=t.query,i=e.queries.get(n);i?!i.H_()&&t.J_()&&(r=2):(i=new nQ,r=t.J_()?0:1);try{switch(r){case 0:i.z_=await e.onListen(n,!0);break;case 1:i.z_=await e.onListen(n,!1);break;case 2:await e.onFirstRemoteStoreListen(n)}}catch(r){let e=nH(r,`Initialization of query '${tv(t.query)}' failed`);return void t.onError(e)}e.queries.set(n,i),i.j_.push(t),t.Z_(e.onlineState),i.z_&&t.X_(i.z_)&&n2(e)}async function nZ(e,t){let r=t.query,n=3,i=e.queries.get(r);if(i){let e=i.j_.indexOf(t);e>=0&&(i.j_.splice(e,1),0===i.j_.length?n=t.J_()?0:1:!i.H_()&&t.J_()&&(n=2))}switch(n){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function n0(e,t){let r=!1;for(let n of t){let t=n.query,i=e.queries.get(t);if(i){for(let e of i.j_)e.X_(n)&&(r=!0);i.z_=n}}r&&n2(e)}function n1(e,t,r){let n=e.queries.get(t);if(n)for(let e of n.j_)e.onError(r);e.queries.delete(t)}function n2(e){e.Y_.forEach(e=>{e.next()})}(m=g||(g={})).ea="default",m.Cache="cache";class n4{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){let t=[];for(let r of e.docChanges)3!==r.type&&t.push(r);e=new nW(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){return!(e.fromCache&&this.J_())||(!this.options._a||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}ia(e){if(e.docChanges.length>0)return!0;let t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}oa(e){e=nW.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==g.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n9{constructor(e){this.key=e}}class n6{constructor(e){this.key=e}}class n5{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=tR(),this.mutatedKeys=tR(),this.Aa=t_(e),this.Ra=new nG(this.Aa)}get Va(){return this.Ta}ma(e,t){let r=t?t.fa:new nK,n=t?t.Ra:this.Ra,i=t?t.mutatedKeys:this.mutatedKeys,s=n,o=!1,a="F"===this.query.limitType&&n.size===this.query.limit?n.last():null,l="L"===this.query.limitType&&n.size===this.query.limit?n.first():null;if(e.inorderTraversal((e,t)=>{let u=n.get(e),h=tw(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(r.track({type:3,doc:h}),f=!0):this.ga(u,h)||(r.track({type:2,doc:h}),f=!0,(a&&this.Aa(h,a)>0||l&&0>this.Aa(h,l))&&(o=!0)):!u&&h?(r.track({type:0,doc:h}),f=!0):u&&!h&&(r.track({type:1,doc:u}),f=!0,(a||l)&&(o=!0)),f&&(h?(s=s.add(h),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),r.track({type:1,doc:e})}return{Ra:s,fa:r,ns:o,mutatedKeys:i}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,n){let i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;let s=e.fa.G_();s.sort((e,t)=>(function(e,t){let r=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return r(e)-r(t)})(e.type,t.type)||this.Aa(e.doc,t.doc)),this.pa(r),n=null!=n&&n;let o=t&&!n?this.ya():[],a=0===this.da.size&&this.current&&!n?1:0,l=a!==this.Ea;return(this.Ea=a,0!==s.length||l)?{snapshot:new nW(this.query,e.Ra,i,s,e.mutatedKeys,0===a,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:o}:{wa:o}}Z_(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new nK,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(e=>this.Ta=this.Ta.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ta=this.Ta.delete(e)),this.current=e.current)}ya(){if(!this.current)return[];let e=this.da;this.da=tR(),this.Ra.forEach(e=>{this.Sa(e.key)&&(this.da=this.da.add(e.key))});let t=[];return e.forEach(e=>{this.da.has(e)||t.push(new n6(e))}),this.da.forEach(r=>{e.has(r)||t.push(new n9(r))}),t}ba(e){this.Ta=e.Ts,this.da=tR();let t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return nW.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,0===this.Ea,this.hasCachedResults)}}class n3{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class n8{constructor(e){this.key=e,this.va=!1}}class n7{constructor(e,t,r,n,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=n,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Ca={},this.Fa=new tb(e=>ty(e),tm),this.Ma=new Map,this.xa=new Set,this.Oa=new ep(er.comparator),this.Na=new Map,this.La=new rG,this.Ba={},this.ka=new Map,this.qa=rV.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return!0===this.Qa}}async function ie(e,t,r=!0){let n;let i=iT(e),s=i.Fa.get(t);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),n=s.view.Da()):n=await ir(i,t,r,!0),n}async function it(e,t){let r=iT(e);await ir(r,t,!0,!1)}async function ir(e,t,r,n){var i,s;let o;let a=await (i=e.localStore,s=tf(t),i.persistence.runTransaction("Allocate target","readwrite",e=>{let t;return i.Ur.getTargetData(e,s).next(r=>r?(t=r,ea.resolve(t)):i.Ur.allocateTargetId(e).next(r=>(t=new rD(s,r,"TargetPurposeListen",e.currentSequenceNumber),i.Ur.addTargetData(e,t).next(()=>t))))}).then(e=>{let t=i.os.get(e.targetId);return(null===t||e.snapshotVersion.compareTo(t.snapshotVersion)>0)&&(i.os=i.os.insert(e.targetId,e),i._s.set(s,e.targetId)),e})),l=a.targetId,u=e.sharedClientState.addLocalQueryTarget(l,r);return n&&(o=await ii(e,t,l,"current"===u,a.resumeToken)),e.isPrimaryClient&&r&&n_(e.remoteStore,a),o}async function ii(e,t,r,n,i){e.Ka=(t,r,n)=>(async function(e,t,r,n){let i=t.view.ma(r);i.ns&&(i=await r8(e.localStore,t.query,!1).then(({documents:e})=>t.view.ma(e,i)));let s=n&&n.targetChanges.get(t.targetId),o=n&&null!=n.targetMismatches.get(t.targetId),a=t.view.applyChanges(i,e.isPrimaryClient,s,o);return iv(e,t.targetId,a.wa),a.snapshot})(e,t,r,n);let s=await r8(e.localStore,t,!0),o=new n5(t,s.Ts),a=o.ma(s.documents),l=rs.createSynthesizedTargetChangeForCurrentChange(r,n&&"Offline"!==e.onlineState,i),u=o.applyChanges(a,e.isPrimaryClient,l);iv(e,r,u.wa);let h=new n3(t,r,o);return e.Fa.set(t,h),e.Ma.has(r)?e.Ma.get(r).push(t):e.Ma.set(r,[t]),u.snapshot}async function is(e,t,r){let n=e.Fa.get(t),i=e.Ma.get(n.targetId);if(i.length>1)return e.Ma.set(n.targetId,i.filter(e=>!tm(e,t))),void e.Fa.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(n.targetId),e.sharedClientState.isActiveQueryTarget(n.targetId)||await r3(e.localStore,n.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(n.targetId),r&&nb(e.remoteStore,n.targetId),im(e,n.targetId)}).catch(eo)):(im(e,n.targetId),await r3(e.localStore,n.targetId,!0))}async function io(e,t){let r=e.Fa.get(t),n=e.Ma.get(r.targetId);e.isPrimaryClient&&1===n.length&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),nb(e.remoteStore,r.targetId))}async function ia(e,t,r){var n;let i=(e.remoteStore.remoteSyncer.applySuccessfulWrite=ic.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=id.bind(null,e),e);try{let e;let s=await function(e,t){let r,n;let i=X.now(),s=t.reduce((e,t)=>e.add(t.key),tR());return e.persistence.runTransaction("Locally write mutations","readwrite",o=>{let a=tE,l=tR();return e.cs.getEntries(o,s).next(e=>{(a=e).forEach((e,t)=>{t.isValidDocument()||(l=l.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(o,a)).next(n=>{r=n;let s=[];for(let e of t){let t=function(e,t){let r=null;for(let n of e.fieldTransforms){let e=t.data.field(n.field),i=tx(n.transform,e||null);null!=i&&(null===r&&(r=eW.empty()),r.set(n.field,i))}return r||null}(e,r.get(e.key).overlayedDocument);null!=t&&s.push(new tY(e.key,t,function e(t){let r=[];return ed(t.fields,(t,n)=>{let i=new et([t]);if(e$(n)){let t=e(n.mapValue).fields;if(0===t.length)r.push(i);else for(let e of t)r.push(i.child(e))}else r.push(i)}),new ew(r)}(t.value.mapValue),tH.exists(!0)))}return e.mutationQueue.addMutationBatch(o,i,s,t)}).next(t=>{n=t;let i=t.applyToLocalDocumentSet(r,l);return e.documentOverlayCache.saveOverlays(o,t.batchId,i)})}).then(()=>({batchId:n.batchId,changes:tS(r)}))}(i.localStore,t);i.sharedClientState.addPendingMutation(s.batchId),n=s.batchId,(e=i.Ba[i.currentUser.toKey()])||(e=new ep(W)),e=e.insert(n,r),i.Ba[i.currentUser.toKey()]=e,await i_(i,s.changes),await nD(i.remoteStore)}catch(t){let e=nH(t,"Failed to persist write");r.reject(e)}}async function il(e,t){try{let r=await function(e,t){let r=t.snapshotVersion,n=e.os;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{var s;let o,a;let l=e.cs.newChangeBuffer({trackRemovals:!0});n=e.os;let u=[];t.targetChanges.forEach((s,o)=>{var a;let l=n.get(o);if(!l)return;u.push(e.Ur.removeMatchingKeys(i,s.removedDocuments,o).next(()=>e.Ur.addMatchingKeys(i,s.addedDocuments,o)));let h=l.withSequenceNumber(i.currentSequenceNumber);null!==t.targetMismatches.get(o)?h=h.withResumeToken(eb.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):s.resumeToken.approximateByteSize()>0&&(h=h.withResumeToken(s.resumeToken,r)),n=n.insert(o,h),a=h,(0===l.resumeToken.approximateByteSize()||a.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size>0)&&u.push(e.Ur.updateTargetData(i,h))});let h=tE,c=tR();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,r))}),u.push((s=t.documentUpdates,o=tR(),a=tR(),s.forEach(e=>o=o.add(e)),l.getEntries(i,o).next(e=>{let t=tE;return s.forEach((r,n)=>{let i=e.get(r);n.isFoundDocument()!==i.isFoundDocument()&&(a=a.add(r)),n.isNoDocument()&&n.version.isEqual(J.min())?(l.removeEntry(r,n.readTime),t=t.insert(r,n)):!i.isValidDocument()||n.version.compareTo(i.version)>0||0===n.version.compareTo(i.version)&&i.hasPendingWrites?(l.addEntry(n),t=t.insert(r,n)):N("LocalStore","Ignoring outdated watch update for ",r,". Current version:",i.version," Watch version:",n.version)}),{Ps:t,Is:a}})).next(e=>{h=e.Ps,c=e.Is})),!r.isEqual(J.min())){let t=e.Ur.getLastRemoteSnapshotVersion(i).next(t=>e.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));u.push(t)}return ea.waitFor(u).next(()=>l.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,h,c)).next(()=>h)}).then(t=>(e.os=n,t))}(e.localStore,t);t.targetChanges.forEach((t,r)=>{let n=e.Na.get(r);n&&(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1||L(),t.addedDocuments.size>0?n.va=!0:t.modifiedDocuments.size>0?n.va||L():t.removedDocuments.size>0&&(n.va||L(),n.va=!1))}),await i_(e,r,t)}catch(e){await eo(e)}}function iu(e,t,r){var n;if(e.isPrimaryClient&&0===r||!e.isPrimaryClient&&1===r){let r;let i=[];e.Fa.forEach((e,r)=>{let n=r.view.Z_(t);n.snapshot&&i.push(n.snapshot)}),(n=e.eventManager).onlineState=t,r=!1,n.queries.forEach((e,n)=>{for(let e of n.j_)e.Z_(t)&&(r=!0)}),r&&n2(n),i.length&&e.Ca.d_(i),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function ih(e,t,r){e.sharedClientState.updateQueryState(t,"rejected",r);let n=e.Na.get(t),i=n&&n.key;if(i){let r=new ep(er.comparator);r=r.insert(i,eQ.newNoDocument(i,J.min()));let n=tR().add(i),s=new ri(J.min(),new Map,new ep(W),r,n);await il(e,s),e.Oa=e.Oa.remove(i),e.Na.delete(t),iw(e)}else await r3(e.localStore,t,!1).then(()=>im(e,t,r)).catch(eo)}async function ic(e,t){var r;let n=t.batch.batchId;try{let i=await (r=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let n=t.batch.keys(),i=r.cs.newChangeBuffer({trackRemovals:!0});return(function(e,t,r,n){let i=r.batch,s=i.keys(),o=ea.resolve();return s.forEach(e=>{o=o.next(()=>n.getEntry(t,e)).next(t=>{let s=r.docVersions.get(e);null!==s||L(),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,r),t.isValidDocument()&&(t.setReadTime(r.commitVersion),n.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(r,e,t,i).next(()=>i.apply(e)).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t.batch.batchId)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=tR();for(let r=0;r<e.mutationResults.length;++r)e.mutationResults[r].transformResults.length>0&&(t=t.add(e.batch.mutations[r].key));return t}(t))).next(()=>r.localDocuments.getDocuments(e,n))});ig(e,n,null),ip(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await i_(e,i)}catch(e){await eo(e)}}async function id(e,t,r){var n;try{let i=await (n=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(null!==t||L(),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))});ig(e,t,r),ip(e,t),e.sharedClientState.updateMutationState(t,"rejected",r),await i_(e,i)}catch(e){await eo(e)}}function ip(e,t){(e.ka.get(t)||[]).forEach(e=>{e.resolve()}),e.ka.delete(t)}function ig(e,t,r){let n=e.Ba[e.currentUser.toKey()];if(n){let i=n.get(t);i&&(r?i.reject(r):i.resolve(),n=n.remove(t)),e.Ba[e.currentUser.toKey()]=n}}function im(e,t,r=null){for(let n of(e.sharedClientState.removeLocalQueryTarget(t),e.Ma.get(t)))e.Fa.delete(n),r&&e.Ca.$a(n,r);e.Ma.delete(t),e.isPrimaryClient&&e.La.gr(t).forEach(t=>{e.La.containsKey(t)||iy(e,t)})}function iy(e,t){e.xa.delete(t.path.canonicalString());let r=e.Oa.get(t);null!==r&&(nb(e.remoteStore,r),e.Oa=e.Oa.remove(t),e.Na.delete(r),iw(e))}function iv(e,t,r){for(let n of r)n instanceof n9?(e.La.addReference(n.key,t),function(e,t){let r=t.key,n=r.path.canonicalString();e.Oa.get(r)||e.xa.has(n)||(N("SyncEngine","New document in limbo: "+r),e.xa.add(n),iw(e))}(e,n)):n instanceof n6?(N("SyncEngine","Document no longer in limbo: "+n.key),e.La.removeReference(n.key,t),e.La.containsKey(n.key)||iy(e,n.key)):L()}function iw(e){for(;e.xa.size>0&&e.Oa.size<e.maxConcurrentLimboResolutions;){let t=e.xa.values().next().value;e.xa.delete(t);let r=new er(Z.fromString(t)),n=e.qa.next();e.Na.set(n,new n8(r)),e.Oa=e.Oa.insert(r,n),n_(e.remoteStore,new rD(tf(tu(r.path)),n,"TargetPurposeLimboResolution",eu.oe))}}async function i_(e,t,r){let n=[],i=[],s=[];e.Fa.isEmpty()||(e.Fa.forEach((o,a)=>{s.push(e.Ka(a,t,r).then(t=>{var s;if((t||r)&&e.isPrimaryClient){let n=t?!t.fromCache:null===(s=null==r?void 0:r.targetChanges.get(a.targetId))||void 0===s?void 0:s.current;e.sharedClientState.updateQueryState(a.targetId,n?"current":"not-current")}if(t){n.push(t);let e=r1.Wi(a.targetId,t);i.push(e)}}))}),await Promise.all(s),e.Ca.d_(n),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",r=>ea.forEach(t,t=>ea.forEach(t.$i,n=>e.persistence.referenceDelegate.addReference(r,t.targetId,n)).next(()=>ea.forEach(t.Ui,n=>e.persistence.referenceDelegate.removeReference(r,t.targetId,n)))))}catch(e){if(!el(e))throw e;N("LocalStore","Failed to update sequence numbers: "+e)}for(let r of t){let t=r.targetId;if(!r.fromCache){let r=e.os.get(t),n=r.snapshotVersion,i=r.withLastLimboFreeSnapshotVersion(n);e.os=e.os.insert(t,i)}}}(e.localStore,i))}async function ib(e,t){var r;if(!e.currentUser.isEqual(t)){N("SyncEngine","User change. New user:",t.toKey());let n=await r6(e.localStore,t);e.currentUser=t,r="'waitForPendingWrites' promise is rejected due to a user change.",e.ka.forEach(e=>{e.forEach(e=>{e.reject(new M(U.CANCELLED,r))})}),e.ka.clear(),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await i_(e,n.hs)}}function iE(e,t){let r=e.Na.get(t);if(r&&r.va)return tR().add(r.key);{let r=tR(),n=e.Ma.get(t);if(!n)return r;for(let t of n){let n=e.Fa.get(t);r=r.unionWith(n.view.Va)}return r}}function iT(e){return e.remoteStore.remoteSyncer.applyRemoteEvent=il.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=iE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ih.bind(null,e),e.Ca.d_=n0.bind(null,e.eventManager),e.Ca.$a=n1.bind(null,e.eventManager),e}class iI{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=nh(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){var t;return t=this.persistence,new r9(t,new r4,e.initialUser,this.serializer)}Ga(e){return new rY(r0.Zr,this.serializer)}Wa(e){return new ne}async terminate(){var e,t;null===(e=this.gcScheduler)||void 0===e||e.stop(),null===(t=this.indexBackfillerScheduler)||void 0===t||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}iI.provider={build:()=>new iI};class iS{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>iu(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=ib.bind(null,this.syncEngine),await nB(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new nX}createDatastore(e){let t=nh(e.databaseInfo.databaseId),r=new nl(e.databaseInfo);return new ng(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){var t;return t=this.localStore,new ny(t,this.datastore,e.asyncQueue,e=>iu(this.syncEngine,e,0),nr.D()?new nr:new nt)}createSyncEngine(e,t){return function(e,t,r,n,i,s,o){let a=new n7(e,t,r,n,i,s);return o&&(a.Qa=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(e){N("RemoteStore","RemoteStore shutting down."),e.L_.add(5),await nw(e),e.k_.shutdown(),e.q_.set("Unknown")}(this.remoteStore),null===(e=this.datastore)||void 0===e||e.terminate(),null===(t=this.eventManager)||void 0===t||t.terminate()}}iS.provider={build:()=>new iS};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iA{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):P("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iC{constructor(e,t,r,n,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=n,this.user=C.UNAUTHENTICATED,this.clientId=K.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async e=>{N("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(r,e=>(N("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new F;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(r){let t=nH(r,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function ik(e,t){e.asyncQueue.verifyOperationInProgress(),N("FirestoreClient","Initializing OfflineComponentProvider");let r=e.configuration;await t.initialize(r);let n=r.initialUser;e.setCredentialChangeListener(async e=>{n.isEqual(e)||(await r6(t.localStore,e),n=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function iR(e,t){e.asyncQueue.verifyOperationInProgress();let r=await iO(e);N("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(r,e.configuration),e.setCredentialChangeListener(e=>nj(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,r)=>nj(t.remoteStore,r)),e._onlineComponents=t}async function iO(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){N("FirestoreClient","Using user provided OfflineComponentProvider");try{await ik(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!("FirebaseError"===t.name?t.code===U.FAILED_PRECONDITION||t.code===U.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw t;D("Error using user provided cache. Falling back to memory cache: "+t),await ik(e,new iI)}}else N("FirestoreClient","Using default OfflineComponentProvider"),await ik(e,new iI)}return e._offlineComponents}async function iN(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(N("FirestoreClient","Using user provided OnlineComponentProvider"),await iR(e,e._uninitializedComponentsProvider._online)):(N("FirestoreClient","Using default OnlineComponentProvider"),await iR(e,new iS))),e._onlineComponents}async function iP(e){let t=await iN(e),r=t.eventManager;return r.onListen=ie.bind(null,t.syncEngine),r.onUnlisten=is.bind(null,t.syncEngine),r.onFirstRemoteStoreListen=it.bind(null,t.syncEngine),r.onLastRemoteStoreUnlisten=io.bind(null,t.syncEngine),r}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iD(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ix=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iL(e,t,r){if(!r)throw new M(U.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function iU(e){if(!er.isDocumentKey(e))throw new M(U.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function iM(e){if(er.isDocumentKey(e))throw new M(U.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function iF(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let r=(t=e).constructor?t.constructor.name:null;return r?`a custom ${r} object`:"an object"}}return"function"==typeof e?"a function":L()}function iV(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new M(U.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let r=iF(e);throw new M(U.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${r}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ij{constructor(e){var t,r;if(void 0===e.host){if(void 0!==e.ssl)throw new M(U.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new M(U.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,r,n){if(!0===t&&!0===n)throw new M(U.INVALID_ARGUMENT,`${e} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=iD(null!==(r=e.experimentalLongPollingOptions)&&void 0!==r?r:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new M(U.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new M(U.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new M(U.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,r;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,t.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class iB{constructor(e,t,r,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ij({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(U.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new M(U.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ij(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new j;switch(e.type){case"firstParty":return new $(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new M(U.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=ix.get(e);t&&(N("ComponentProvider","Removing Datastore"),ix.delete(e),t.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iq{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new iq(this.firestore,e,this._query)}}class iz{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new i$(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new iz(this.firestore,e,this._key)}}class i$ extends iq{constructor(e,t,r){super(e,t,tu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new iz(this.firestore,null,new er(e))}withConverter(e){return new i$(this.firestore,e,this._path)}}function iH(e,t,...r){if(e=(0,_.m9)(e),iL("collection","path",t),e instanceof iB){let n=Z.fromString(t,...r);return iM(n),new i$(e,null,n)}{if(!(e instanceof iz||e instanceof i$))throw new M(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(Z.fromString(t,...r));return iM(n),new i$(e.firestore,null,n)}}function iG(e,t,...r){if(e=(0,_.m9)(e),1==arguments.length&&(t=K.newId()),iL("doc","path",t),e instanceof iB){let n=Z.fromString(t,...r);return iU(n),new iz(e,null,new er(n))}{if(!(e instanceof iz||e instanceof i$))throw new M(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(Z.fromString(t,...r));return iU(n),new iz(e.firestore,e instanceof i$?e.converter:null,new er(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iK{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new nc(this,"async_queue_retry"),this.Vu=()=>{let e=nu();e&&N("AsyncQueue","Visibility state changed to "+e.visibilityState),this.t_.jo()},this.mu=e;let t=nu();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;let t=nu();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});let t=new F;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(0!==this.Pu.length){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!el(e))throw e;N("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){let t=this.mu.then(()=>(this.du=!0,e().catch(e=>{let t;throw this.Eu=e,this.du=!1,P("INTERNAL UNHANDLED ERROR: ",(t=e.message||"",e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t)),e}).then(e=>(this.du=!1,e))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);let n=n$.createAndSchedule(this,e,t,r,e=>this.yu(e));return this.Tu.push(n),n}fu(){this.Eu&&L()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(let t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{for(let t of(this.Tu.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.Tu))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){let t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function iW(e){return function(e,t){if("object"!=typeof e||null===e)return!1;for(let r of t)if(r in e&&"function"==typeof e[r])return!0;return!1}(e,["next","error","complete"])}class iQ extends iB{constructor(e,t,r,n){super(e,t,r,n),this.type="firestore",this._queue=new iK,this._persistenceKey=(null==n?void 0:n.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new iK(e),this._firestoreClient=void 0,await e}}}function iX(e,t){let r="object"==typeof e?e:(0,y.Mq)(),n=(0,y.qX)(r,"firestore").getImmediate({identifier:"string"==typeof e?e:t||"(default)"});if(!n._initialized){let e=(0,_.P0)("firestore");e&&function(e,t,r,n={}){var i;let s=(e=iV(e,iB))._getSettings(),o=`${t}:${r}`;if("firestore.googleapis.com"!==s.host&&s.host!==o&&D("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),n.mockUserToken){let t,r;if("string"==typeof n.mockUserToken)t=n.mockUserToken,r=C.MOCK_USER;else{t=(0,_.Sg)(n.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);let s=n.mockUserToken.sub||n.mockUserToken.user_id;if(!s)throw new M(U.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new C(s)}e._authCredentials=new B(new V(t,r))}}(n,...e)}return n}function iJ(e){if(e._terminated)throw new M(U.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){var t,r,n,i;let s=e._freezeSettings(),o=(i=e._databaseId,new eR(i,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,iD(s.experimentalLongPollingOptions),s.useFetchStreams));e._componentsProvider||(null===(r=s.localCache)||void 0===r?void 0:r._offlineComponentProvider)&&(null===(n=s.localCache)||void 0===n?void 0:n._onlineComponentProvider)&&(e._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),e._firestoreClient=new iC(e._authCredentials,e._appCheckCredentials,e._queue,o,e._componentsProvider&&function(e){let t=null==e?void 0:e._online.build();return{_offline:null==e?void 0:e._offline.build(t),_online:t}}(e._componentsProvider))}(e),e._firestoreClient}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iY{constructor(e){this._byteString=e}static fromBase64String(e){try{return new iY(eb.fromBase64String(e))}catch(e){throw new M(U.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new iY(eb.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iZ{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new M(U.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new et(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i1{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(U.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(U.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return W(this._lat,e._lat)||W(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i2{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;++r)if(e[r]!==t[r])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let i4=/^__.*__$/;class i9{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return null!==this.fieldMask?new tY(e,this.data,this.fieldMask,t,this.fieldTransforms):new tJ(e,this.data,t,this.fieldTransforms)}}class i6{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new tY(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function i5(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}class i3{constructor(e,t,r,n,i,s){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=n,void 0===i&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new i3(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;let r=null===(t=this.path)||void 0===t?void 0:t.child(e),n=this.Fu({path:r,xu:!1});return n.Ou(e),n}Nu(e){var t;let r=null===(t=this.path)||void 0===t?void 0:t.child(e),n=this.Fu({path:r,xu:!1});return n.vu(),n}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return sc(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(0===e.length)throw this.Bu("Document fields must not be empty");if(i5(this.Cu)&&i4.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class i8{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||nh(e)}Qu(e,t,r,n=!1){return new i3({Cu:e,methodName:t,qu:r,path:et.emptyPath(),xu:!1,ku:n},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function i7(e){let t=e._freezeSettings(),r=nh(e._databaseId);return new i8(e._databaseId,!!t.ignoreUndefinedProperties,r)}function se(e,t,r,n,i,s={}){let o,a;let l=e.Qu(s.merge||s.mergeFields?2:0,t,r,i);sa("Data must be an object, but it was:",l,n);let u=ss(n,l);if(s.merge)o=new ew(l.fieldMask),a=l.fieldTransforms;else if(s.mergeFields){let e=[];for(let n of s.mergeFields){let i=sl(t,n,r);if(!l.contains(i))throw new M(U.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);sd(e,i)||e.push(i)}o=new ew(e),a=l.fieldTransforms.filter(e=>o.covers(e.field))}else o=null,a=l.fieldTransforms;return new i9(new eW(u),o,a)}class st extends i0{_toFieldTransform(e){if(2!==e.Cu)throw 1===e.Cu?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof st}}class sr extends i0{_toFieldTransform(e){return new tz(e.path,new tL)}isEqual(e){return e instanceof sr}}function sn(e,t,r,n=!1){return si(r,e.Qu(n?4:3,t))}function si(e,t){if(so(e=(0,_.m9)(e)))return sa("Unsupported field value:",t,e),ss(e,t);if(e instanceof i0)return function(e,t){if(!i5(t.Cu))throw t.Bu(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Bu(`${e._methodName}() is not currently supported inside arrays`);let r=e._toFieldTransform(t);r&&t.fieldTransforms.push(r)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.xu&&4!==t.Cu)throw t.Bu("Nested arrays are not supported");return function(e,t){let r=[],n=0;for(let i of e){let e=si(i,t.Lu(n));null==e&&(e={nullValue:"NULL_VALUE"}),r.push(e),n++}return{arrayValue:{values:r}}}(e,t)}return function(e,t){var r,n,i;if(null===(e=(0,_.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return r=t.serializer,"number"==typeof(i=n=e)&&Number.isInteger(i)&&!eh(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER?tP(n):tN(r,n);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let r=X.fromDate(e);return{timestampValue:rv(t.serializer,r)}}if(e instanceof X){let r=new X(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:rv(t.serializer,r)}}if(e instanceof i1)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof iY)return{bytesValue:rw(t.serializer,e._byteString)};if(e instanceof iz){let r=t.databaseId,n=e.firestore._databaseId;if(!n.isEqual(r))throw t.Bu(`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:rb(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof i2)return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:e.toArray().map(e=>{if("number"!=typeof e)throw t.Bu("VectorValues must only contain numeric values.");return tN(t.serializer,e)})}}}}};throw t.Bu(`Unsupported field value: ${iF(e)}`)}(e,t)}function ss(e,t){let r={};return ef(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ed(e,(e,n)=>{let i=si(n,t.Mu(e));null!=i&&(r[e]=i)}),{mapValue:{fields:r}}}function so(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof X||e instanceof i1||e instanceof iY||e instanceof iz||e instanceof i0||e instanceof i2)}function sa(e,t,r){if(!so(r)||!("object"==typeof r&&null!==r&&(Object.getPrototypeOf(r)===Object.prototype||null===Object.getPrototypeOf(r)))){let n=iF(r);throw"an object"===n?t.Bu(e+" a custom object"):t.Bu(e+" "+n)}}function sl(e,t,r){if((t=(0,_.m9)(t))instanceof iZ)return t._internalPath;if("string"==typeof t)return sh(e,t);throw sc("Field path arguments must be of type string or ",e,!1,void 0,r)}let su=RegExp("[~\\*/\\[\\]]");function sh(e,t,r){if(t.search(su)>=0)throw sc(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,r);try{return new iZ(...t.split("."))._internalPath}catch(n){throw sc(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,r)}}function sc(e,t,r,n,i){let s=n&&!n.isEmpty(),o=void 0!==i,a=`Function ${t}() called with invalid data`;r&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${n}`),o&&(l+=` in document ${i}`),l+=")"),new M(U.INVALID_ARGUMENT,a+e+l)}function sd(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t,r,n,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=n,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new iz(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new sp(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(sg("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class sp extends sf{data(){return super.data()}}function sg(e,t){return"string"==typeof t?sh(e,t):t instanceof iZ?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sm(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new M(U.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class sy{}class sv extends sy{}function sw(e,t,...r){let n=[];for(let i of(t instanceof sy&&n.push(t),function(e){let t=e.filter(e=>e instanceof sE).length,r=e.filter(e=>e instanceof s_).length;if(t>1||t>0&&r>0)throw new M(U.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n=n.concat(r)),n))e=i._apply(e);return e}class s_ extends sv{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new s_(e,t,r)}_apply(e){let t=this._parse(e);return sN(e._query,t),new iq(e.firestore,e.converter,tp(e._query,t))}_parse(e){let t=i7(e.firestore);return function(e,t,r,n,i,s,o){let a;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new M(U.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){sO(o,s);let t=[];for(let r of o)t.push(sR(n,e,r));a={arrayValue:{values:t}}}else a=sR(n,e,o)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||sO(o,s),a=sn(r,t,o,"in"===s||"not-in"===s);return e1.create(i,s,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function sb(e,t,r){let n=sg("where",e);return s_._create(n,t,r)}class sE extends sy{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new sE(e,t)}_parse(e){let t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:e2.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let r=e;for(let e of t.getFlattenedFilters())sN(r,e),r=tp(r,e)}(e._query,t),new iq(e.firestore,e.converter,tp(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class sT extends sv{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new sT(e,t)}_apply(e){let t=function(e,t,r){if(null!==e.startAt)throw new M(U.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new M(U.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new eZ(t,r)}(e._query,this._field,this._direction);return new iq(e.firestore,e.converter,function(e,t){let r=e.explicitOrderBy.concat([t]);return new tl(e.path,e.collectionGroup,r,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function sI(e,t="asc"){let r=sg("orderBy",e);return sT._create(r,t)}class sS extends sv{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new sS(e,t,r)}_apply(e){return new iq(e.firestore,e.converter,tg(e._query,this._limit,this._limitType))}}function sA(e){return function(e,t){if(t<=0)throw new M(U.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}("limit",e),sS._create("limit",e,"F")}class sC extends sv{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new sC(e,t,r)}_apply(e){var t;let r=function(e,t,r,n){if(r[0]=(0,_.m9)(r[0]),r[0]instanceof sf)return function(e,t,r,n,i){if(!n)throw new M(U.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${r}().`);let s=[];for(let r of td(e))if(r.field.isKeyField())s.push(eV(t,n.key));else{let e=n.data.field(r.field);if(eA(e))throw new M(U.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+r.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){let e=r.field.canonicalString();throw new M(U.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}s.push(e)}return new eX(s,i)}(e._query,e.firestore._databaseId,t,r[0]._document,n);{let i=i7(e.firestore);return function(e,t,r,n,i,s){let o=e.explicitOrderBy;if(i.length>o.length)throw new M(U.INVALID_ARGUMENT,`Too many arguments provided to ${n}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);let a=[];for(let s=0;s<i.length;s++){let l=i[s];if(o[s].field.isKeyField()){if("string"!=typeof l)throw new M(U.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${n}(), but got a ${typeof l}`);if(!tc(e)&&-1!==l.indexOf("/"))throw new M(U.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${n}() must be a plain document ID, but '${l}' contains a slash.`);let r=e.path.child(Z.fromString(l));if(!er.isDocumentKey(r))throw new M(U.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${n}() must result in a valid document path, but '${r}' is not because it contains an odd number of segments.`);let i=new er(r);a.push(eV(t,i))}else{let e=sn(r,n,l);a.push(e)}}return new eX(a,s)}(e._query,e.firestore._databaseId,i,t,r,n)}}(e,this.type,this._docOrFields,this._inclusive);return new iq(e.firestore,e.converter,new tl((t=e._query).path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,r,t.endAt))}}function sk(...e){return sC._create("startAfter",e,!1)}function sR(e,t,r){if("string"==typeof(r=(0,_.m9)(r))){if(""===r)throw new M(U.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!tc(t)&&-1!==r.indexOf("/"))throw new M(U.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${r}' contains a '/' character.`);let n=t.path.child(Z.fromString(r));if(!er.isDocumentKey(n))throw new M(U.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return eV(e,new er(n))}if(r instanceof iz)return eV(e,r._key);throw new M(U.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${iF(r)}.`)}function sO(e,t){if(!Array.isArray(e)||0===e.length)throw new M(U.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function sN(e,t){let r=function(e,t){for(let r of e)for(let e of r.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==r)throw r===t.op?new M(U.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new M(U.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`)}class sP{convertValue(e,t="none"){switch(eP(e)){case 0:return null;case 1:return e.booleanValue;case 2:return eI(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(eS(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return ed(e,(e,n)=>{r[e]=this.convertValue(n,t)}),r}convertVectorValue(e){var t,r,n;return new i2(null===(n=null===(r=null===(t=e.fields)||void 0===t?void 0:t.value.arrayValue)||void 0===r?void 0:r.values)||void 0===n?void 0:n.map(e=>eI(e.doubleValue)))}convertGeoPoint(e){return new i1(eI(e.latitude),eI(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=eC(e);return null==r?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ek(e));default:return null}}convertTimestamp(e){let t=eT(e);return new X(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=Z.fromString(e);rP(r)||L();let n=new eO(r.get(1),r.get(3)),i=new er(r.popFirst(5));return n.isEqual(t)||P(`Document ${i} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sD(e,t,r){return e?r&&(r.merge||r.mergeFields)?e.toFirestore(t,r):e.toFirestore(t):t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sx{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class sL extends sf{constructor(e,t,r,n,i,s){super(e,t,r,n,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new sU(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(sg("DocumentSnapshot.get",e));if(null!==r)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class sU extends sL{data(e={}){return super.data(e)}}class sM{constructor(e,t,r,n){this._firestore=e,this._userDataWriter=t,this._snapshot=n,this.metadata=new sx(n.hasPendingWrites,n.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new sU(this._firestore,this._userDataWriter,r.key,r,new sx(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(U.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(r=>{let n=new sU(e._firestore,e._userDataWriter,r.doc.key,r.doc,new sx(e._snapshot.mutatedKeys.has(r.doc.key),e._snapshot.fromCache),e.query.converter);return r.doc,{type:"added",doc:n,oldIndex:-1,newIndex:t++}})}{let r=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let n=new sU(e._firestore,e._userDataWriter,t.doc.key,t.doc,new sx(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,s=-1;return 0!==t.type&&(i=r.indexOf(t.doc.key),r=r.delete(t.doc.key)),1!==t.type&&(s=(r=r.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}(t.type),doc:n,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sF(e){e=iV(e,iz);let t=iV(e.firestore,iQ);return(function(e,t,r={}){let n=new F;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){let s=new iA({next:a=>{s.Za(),t.enqueueAndForget(()=>nZ(e,o));let l=a.docs.has(r);!l&&a.fromCache?i.reject(new M(U.UNAVAILABLE,"Failed to get document because the client is offline.")):l&&a.fromCache&&n&&"server"===n.source?i.reject(new M(U.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(a)},error:e=>i.reject(e)}),o=new n4(tu(r.path),s,{includeMetadataChanges:!0,_a:!0});return nY(e,o)})(await iP(e),e.asyncQueue,t,r,n)),n.promise})(iJ(t),e._key).then(r=>sK(t,e,r))}class sV extends sP{constructor(e){super(),this.firestore=e}convertBytes(e){return new iY(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new iz(this.firestore,null,t)}}function sj(e){e=iV(e,iq);let t=iV(e.firestore,iQ),r=iJ(t),n=new sV(t);return sm(e._query),(function(e,t,r={}){let n=new F;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){let s=new iA({next:r=>{s.Za(),t.enqueueAndForget(()=>nZ(e,o)),r.fromCache&&"server"===n.source?i.reject(new M(U.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(r)},error:e=>i.reject(e)}),o=new n4(r,s,{includeMetadataChanges:!0,_a:!0});return nY(e,o)})(await iP(e),e.asyncQueue,t,r,n)),n.promise})(r,e._query).then(r=>new sM(t,n,e,r))}function sB(e,t,r){e=iV(e,iz);let n=iV(e.firestore,iQ),i=sD(e.converter,t,r);return sG(n,[se(i7(n),"setDoc",e._key,i,null!==e.converter,r).toMutation(e._key,tH.none())])}function sq(e,t,r,...n){e=iV(e,iz);let i=iV(e.firestore,iQ),s=i7(i);return sG(i,[("string"==typeof(t=(0,_.m9)(t))||t instanceof iZ?function(e,t,r,n,i,s){let o=e.Qu(1,t,r),a=[sl(t,n,r)],l=[i];if(s.length%2!=0)throw new M(U.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<s.length;e+=2)a.push(sl(t,s[e])),l.push(s[e+1]);let u=[],h=eW.empty();for(let e=a.length-1;e>=0;--e)if(!sd(u,a[e])){let t=a[e],r=l[e];r=(0,_.m9)(r);let n=o.Nu(t);if(r instanceof st)u.push(t);else{let e=si(r,n);null!=e&&(u.push(t),h.set(t,e))}}return new i6(h,new ew(u),o.fieldTransforms)}(s,"updateDoc",e._key,t,r,n):function(e,t,r,n){let i=e.Qu(1,t,r);sa("Data must be an object, but it was:",i,n);let s=[],o=eW.empty();return ed(n,(e,n)=>{let a=sh(t,e,r);n=(0,_.m9)(n);let l=i.Nu(a);if(n instanceof st)s.push(a);else{let e=si(n,l);null!=e&&(s.push(a),o.set(a,e))}}),new i6(o,new ew(s),i.fieldTransforms)}(s,"updateDoc",e._key,t)).toMutation(e._key,tH.exists(!0))])}function sz(e){return sG(iV(e.firestore,iQ),[new t2(e._key,tH.none())])}function s$(e,t){let r=iV(e.firestore,iQ),n=iG(e),i=sD(e.converter,t);return sG(r,[se(i7(e.firestore),"addDoc",n._key,i,null!==e.converter,{}).toMutation(n._key,tH.exists(!1))]).then(()=>n)}function sH(e,...t){var r,n,i;let s,o,a;e=(0,_.m9)(e);let l={includeMetadataChanges:!1,source:"default"},u=0;"object"!=typeof t[0]||iW(t[u])||(l=t[u],u++);let h={includeMetadataChanges:l.includeMetadataChanges,source:l.source};if(iW(t[u])){let e=t[u];t[u]=null===(r=e.next)||void 0===r?void 0:r.bind(e),t[u+1]=null===(n=e.error)||void 0===n?void 0:n.bind(e),t[u+2]=null===(i=e.complete)||void 0===i?void 0:i.bind(e)}if(e instanceof iz)o=iV(e.firestore,iQ),a=tu(e._key.path),s={next:r=>{t[u]&&t[u](sK(o,e,r))},error:t[u+1],complete:t[u+2]};else{let r=iV(e,iq);o=iV(r.firestore,iQ),a=r._query;let n=new sV(o);s={next:e=>{t[u]&&t[u](new sM(o,n,r,e))},error:t[u+1],complete:t[u+2]},sm(e._query)}return function(e,t,r,n){let i=new iA(n),s=new n4(t,i,r);return e.asyncQueue.enqueueAndForget(async()=>nY(await iP(e),s)),()=>{i.Za(),e.asyncQueue.enqueueAndForget(async()=>nZ(await iP(e),s))}}(iJ(o),a,h,s)}function sG(e,t){return function(e,t){let r=new F;return e.asyncQueue.enqueueAndForget(async()=>ia(await iN(e).then(e=>e.syncEngine),t,r)),r.promise}(iJ(e),t)}function sK(e,t,r){let n=r.docs.get(t._key),i=new sV(e);return new sL(e,i,t._key,n,new sx(r.hasPendingWrites,r.fromCache),t.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sW(){return new st("deleteField")}function sQ(){return new sr("serverTimestamp")}new WeakMap,function(e=!0){k=y.Jn,(0,y.Xd)(new v.wA("firestore",(t,{instanceIdentifier:r,options:n})=>{let i=t.getProvider("app").getImmediate(),s=new iQ(new q(t.getProvider("auth-internal")),new G(t.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new M(U.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new eO(e.options.projectId,t)}(i,r),i);return n=Object.assign({useFetchStreams:e},n),s._setSettings(n),s},"PUBLIC").setMultipleInstances(!0)),(0,y.KN)(A,"4.7.3",void 0),(0,y.KN)(A,"4.7.3","esm2017")}()},6650:function(e,t,r){"use strict";r.d(t,{oq:function(){return eC},Jt:function(){return eA},cF:function(){return eR},aF:function(){return eS},iH:function(){return ek},KV:function(){return eE},B0:function(){return eI},sf:function(){return eT}});var n,i,s,o,a=r(5816),l=r(4444),u=r(8463);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let h="firebasestorage.googleapis.com",c="storageBucket";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d extends l.ZR{constructor(e,t,r=0){super(f(e),`Firebase Storage: ${t} (${f(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,d.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return f(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function f(e){return"storage/"+e}function p(){return new d(s.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function g(){return new d(s.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function m(){return new d(s.CANCELED,"User canceled the upload/download.")}function y(){return new d(s.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function v(e){return new d(s.INVALID_ARGUMENT,e)}function w(){return new d(s.APP_DELETED,"The Firebase app was deleted.")}function _(e,t){return new d(s.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function b(e){throw new d(s.INTERNAL_ERROR,"Internal error: "+e)}(n=s||(s={})).UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=E.makeFromUrl(e,t)}catch(t){return new E(e,"")}if(""===r.path)return r;throw new d(s.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let r=null,n="([A-Za-z0-9.\\-_]+)",i=RegExp("^gs://"+n+"(/(.*))?$","i");function o(e){e.path_=decodeURIComponent(e.path)}let a=t.replace(/[.]/g,"\\."),l=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${n}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:o},{regex:RegExp(`^https?://${t===h?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${n}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:o}];for(let t=0;t<l.length;t++){let n=l[t],i=n.regex.exec(e);if(i){let e=i[n.indices.bucket],t=i[n.indices.path];t||(t=""),r=new E(e,t),n.postModify(r);break}}if(null==r)throw new d(s.INVALID_URL,"Invalid URL '"+e+"'.");return r}}class T{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function I(e){return"string"==typeof e||e instanceof String}function S(e){return A()&&e instanceof Blob}function A(){return"undefined"!=typeof Blob}function C(e,t,r,n){if(n<t)throw v(`Invalid value for '${e}'. Expected ${t} or greater.`);if(n>r)throw v(`Invalid value for '${e}'. Expected ${r} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(e,t,r){let n=t;return null==r&&(n=`https://${t}`),`${r}://${n}/v0${e}`}function R(e){let t=encodeURIComponent,r="?";for(let n in e)e.hasOwnProperty(n)&&(r=r+(t(n)+"=")+t(e[n])+"&");return r.slice(0,-1)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(e,t){let r=e>=500&&e<600,n=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return r||n||i}(i=o||(o={}))[i.NO_ERROR=0]="NO_ERROR",i[i.NETWORK_ERROR=1]="NETWORK_ERROR",i[i.ABORT=2]="ABORT";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e,t,r,n,i,s,o,a,l,u,h,c=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=n,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=o,this.errorCallback_=a,this.timeout_=l,this.progressCallback_=u,this.connectionFactory_=h,this.retry=c,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{let r=this.resolve_,n=this.reject_,i=t.connection;if(t.wasSuccessCode)try{let e=this.callback_(i,i.getResponse());void 0!==e?r(e):r()}catch(e){n(e)}else if(null!==i){let e=p();e.serverResponse=i.getErrorText(),n(this.errorCallback_?this.errorCallback_(i,e):e)}else n(t.canceled?this.appDelete_?w():m():g())};this.canceled_?e(!1,new P(!1,null,!0)):this.backoffId_=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t,r){let n=1,i=null,s=null,o=!1,a=0,l=!1;function u(...e){l||(l=!0,t.apply(null,e))}function h(t){i=setTimeout(()=>{i=null,e(d,2===a)},t)}function c(){s&&clearTimeout(s)}function d(e,...t){let r;if(l){c();return}if(e||2===a||o){c(),u.call(null,e,...t);return}n<64&&(n*=2),1===a?(a=2,r=0):r=(n+Math.random())*1e3,h(r)}let f=!1;function p(e){!f&&(f=!0,c(),!l&&(null!==i?(e||(a=2),clearTimeout(i),h(0)):e||(a=1)))}return h(0),s=setTimeout(()=>{o=!0,p(!0)},r),p}((e,t)=>{if(t){e(!1,new P(!1,null,!0));return}let r=this.connectionFactory_();this.pendingConnection_=r;let n=e=>{let t=e.loaded,r=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,r)};null!==this.progressCallback_&&r.addUploadProgressListener(n),r.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&r.removeUploadProgressListener(n),this.pendingConnection_=null;let t=r.getErrorCode()===o.NO_ERROR,i=r.getStatus();if(!t||O(i,this.additionalRetryCodes_)&&this.retry){e(!1,new P(!1,null,r.getErrorCode()===o.ABORT));return}e(!0,new P(-1!==this.successCodes_.indexOf(i),r))})},e,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class P{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function D(...e){let t="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==t){let r=new t;for(let t=0;t<e.length;t++)r.append(e[t]);return r.getBlob()}if(A())return new Blob(e);throw new d(s.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let x={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class L{constructor(e,t){this.data=e,this.contentType=t||null}}function U(e,t){switch(e){case x.RAW:return new L(M(t));case x.BASE64:case x.BASE64URL:return new L(F(e,t));case x.DATA_URL:return new L(function(e){let t=new V(e);return t.base64?F(x.BASE64,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw _(x.DATA_URL,"Malformed data URL.")}return M(t)}(t.rest)}(t),new V(t).contentType)}throw p()}function M(e){let t=[];for(let r=0;r<e.length;r++){let n=e.charCodeAt(r);n<=127?t.push(n):n<=2047?t.push(192|n>>6,128|63&n):(64512&n)==55296?r<e.length-1&&(64512&e.charCodeAt(r+1))==56320?(n=65536|(1023&n)<<10|1023&e.charCodeAt(++r),t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n)):t.push(239,191,189):(64512&n)==56320?t.push(239,191,189):t.push(224|n>>12,128|n>>6&63,128|63&n)}return new Uint8Array(t)}function F(e,t){let r;switch(e){case x.BASE64:{let r=-1!==t.indexOf("-"),n=-1!==t.indexOf("_");if(r||n)throw _(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case x.BASE64URL:{let r=-1!==t.indexOf("+"),n=-1!==t.indexOf("/");if(r||n)throw _(e,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}}try{r=/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("undefined"==typeof atob)throw new d(s.UNSUPPORTED_ENVIRONMENT,"base-64 is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.");return atob(e)}(t)}catch(t){if(t.message.includes("polyfill"))throw t;throw _(e,"Invalid character found")}let n=new Uint8Array(r.length);for(let e=0;e<r.length;e++)n[e]=r.charCodeAt(e);return n}class V{constructor(e){var t;this.base64=!1,this.contentType=null;let r=e.match(/^data:([^,]+)?,/);if(null===r)throw _(x.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");let n=r[1]||null;null!=n&&(this.base64=(t=";base64",n.length>=t.length&&n.substring(n.length-t.length)===t),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,t){let r=0,n="";S(e)?(this.data_=e,r=e.size,n=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=n}size(){return this.size_}type(){return this.type_}slice(e,t){if(!S(this.data_))return new j(new Uint8Array(this.data_.buffer,e,t-e),!0);{var r;let n=(r=this.data_).webkitSlice?r.webkitSlice(e,t):r.mozSlice?r.mozSlice(e,t):r.slice?r.slice(e,t):null;return null===n?null:new j(n)}}static getBlob(...e){if(A()){let t=e.map(e=>e instanceof j?e.data_:e);return new j(D.apply(null,t))}{let t=e.map(e=>I(e)?U(x.RAW,e).data:e.data_),r=0;t.forEach(e=>{r+=e.byteLength});let n=new Uint8Array(r),i=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)n[i++]=e[t]}),new j(n,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(e){var t;let r;try{r=JSON.parse(e)}catch(e){return null}return"object"!=typeof(t=r)||Array.isArray(t)?null:r}function q(e){let t=e.lastIndexOf("/",e.length-2);return -1===t?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(e,t){return t}class ${constructor(e,t,r,n){this.server=e,this.local=t||e,this.writable=!!r,this.xform=n||z}}let H=null;function G(){if(H)return H;let e=[];e.push(new $("bucket")),e.push(new $("generation")),e.push(new $("metageneration")),e.push(new $("name","fullPath",!0));let t=new $("name");t.xform=function(e,t){return!I(t)||t.length<2?t:q(t)},e.push(t);let r=new $("size");return r.xform=function(e,t){return void 0!==t?Number(t):t},e.push(r),e.push(new $("timeCreated")),e.push(new $("updated")),e.push(new $("md5Hash",null,!0)),e.push(new $("cacheControl",null,!0)),e.push(new $("contentDisposition",null,!0)),e.push(new $("contentEncoding",null,!0)),e.push(new $("contentLanguage",null,!0)),e.push(new $("contentType",null,!0)),e.push(new $("metadata","customMetadata",!0)),H=e}function K(e,t,r){let n=B(t);return null===n?null:function(e,t,r){let n={};n.type="file";let i=r.length;for(let e=0;e<i;e++){let i=r[e];n[i.local]=i.xform(n,t[i.server])}return Object.defineProperty(n,"ref",{get:function(){let t=new E(n.bucket,n.fullPath);return e._makeStorageReference(t)}}),n}(e,n,r)}function W(e,t){let r={},n=t.length;for(let i=0;i<n;i++){let n=t[i];n.writable&&(r[n.server]=e[n.local])}return JSON.stringify(r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Q="prefixes",X="items";class J{constructor(e,t,r,n){this.url=e,this.method=t,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(e){if(!e)throw p()}function Z(e,t){return function(r,n){let i=K(e,n,t);return Y(null!==i),i}}function ee(e){return function(t,r){var n,i;let o;return 401===t.getStatus()?o=t.getErrorText().includes("Firebase App Check token is invalid")?new d(s.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new d(s.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(n=e.bucket,o=new d(s.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(i=e.path,o=new d(s.UNAUTHORIZED,"User does not have permission to access '"+i+"'.")):o=r,o.status=t.getStatus(),o.serverResponse=r.serverResponse,o}}function et(e){let t=ee(e);return function(r,n){let i=t(r,n);if(404===r.getStatus()){var o;o=e.path,i=new d(s.OBJECT_NOT_FOUND,"Object '"+o+"' does not exist.")}return i.serverResponse=n.serverResponse,i}}function er(e,t,r){let n=Object.assign({},r);return n.fullPath=e.path,n.size=t.size(),!n.contentType&&(n.contentType=t&&t.type()||"application/octet-stream"),n}function en(e,t,r,n,i){let s=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"},a=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();o["Content-Type"]="multipart/related; boundary="+a;let l=er(t,n,i),u="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+W(l,r)+"\r\n--"+a+"\r\nContent-Type: "+l.contentType+"\r\n\r\n",h=j.getBlob(u,n,"\r\n--"+a+"--");if(null===h)throw y();let c={name:l.fullPath},d=k(s,e.host,e._protocol),f=e.maxUploadRetryTime,p=new J(d,"POST",Z(e,r),f);return p.urlParams=c,p.headers=o,p.body=h.uploadData(),p.errorHandler=ee(t),p}class ei{constructor(e,t,r,n){this.current=e,this.total=t,this.finalized=!!r,this.metadata=n||null}}function es(e,t){let r=null;try{r=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){Y(!1)}return Y(!!r&&-1!==(t||["active"]).indexOf(r)),r}let eo={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function ea(e){switch(e){case"running":case"pausing":case"canceling":return eo.RUNNING;case"paused":return eo.PAUSED;case"success":return eo.SUCCESS;case"canceled":return eo.CANCELED;default:return eo.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,t,r){"function"==typeof e||null!=t||null!=r?(this.next=e,this.error=null!=t?t:void 0,this.complete=null!=r?r:void 0):(this.next=e.next,this.error=e.error,this.complete=e.complete)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(e){return(...t)=>{Promise.resolve().then(()=>e(...t))}}class eh{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=o.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=o.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=o.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,n){if(this.sent_)throw b("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==n)for(let e in n)n.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,n[e].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw b("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw b("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return -1}}getResponse(){if(!this.sent_)throw b("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw b("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class ec extends eh{initXhr(){this.xhr_.responseType="text"}}function ed(){return new ec}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=G(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{if(this._request=void 0,this._chunkMultiplier=1,e._codeEquals(s.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{let t=this.isExponentialBackoffExpired();if(O(e.status,[])){if(t)e=g();else{this.sleepTime=Math.max(2*this.sleepTime,1e3),this._needToFetchStatus=!0,this.completeTransitions_();return}}this._error=e,this._transition("error")}},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals(s.CANCELED)?this.completeTransitions_():(this._error=e,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((e,t)=>{this._resolve=e,this._reject=t,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){let e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused")}})}_createResumable(){this._resolveToken((e,t)=>{let r=function(e,t,r,n,i){let s=t.bucketOnlyServerUrl(),o=er(t,n,i),a={name:o.fullPath},l=k(s,e.host,e._protocol),u={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${n.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},h=W(o,r),c=new J(l,"POST",function(e){let t;es(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){Y(!1)}return Y(I(t)),t},e.maxUploadRetryTime);return c.urlParams=a,c.headers=u,c.body=h,c.errorHandler=ee(t),c}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),n=this._ref.storage._makeRequest(r,ed,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){let e=this._uploadUrl;this._resolveToken((t,r)=>{let n=function(e,t,r,n){let i=new J(r,"POST",function(e){let t=es(e,["active","final"]),r=null;try{r=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){Y(!1)}r||Y(!1);let i=Number(r);return Y(!isNaN(i)),new ei(i,n.size(),"final"===t)},e.maxUploadRetryTime);return i.headers={"X-Goog-Upload-Command":"query"},i.errorHandler=ee(t),i}(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(n,ed,t,r);this._request=i,i.getPromise().then(e=>{this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){let e=262144*this._chunkMultiplier,t=new ei(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((n,i)=>{let o;try{o=function(e,t,r,n,i,o,a,l){let u=new ei(0,0);if(a?(u.current=a.current,u.total=a.total):(u.current=0,u.total=n.size()),n.size()!==u.total)throw new d(s.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.");let h=u.total-u.current,c=h;i>0&&(c=Math.min(c,i));let f=u.current,p=f+c,g={"X-Goog-Upload-Command":0===c?"finalize":h===c?"upload, finalize":"upload","X-Goog-Upload-Offset":`${u.current}`},m=n.slice(f,p);if(null===m)throw y();let v=new J(r,"POST",function(e,r){let i;let s=es(e,["active","final"]),a=u.current+c,l=n.size();return i="final"===s?Z(t,o)(e,r):null,new ei(a,l,"final"===s,i)},t.maxUploadRetryTime);return v.headers=g,v.body=m.uploadData(),v.progressCallback=l||null,v.errorHandler=ee(e),v}(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(e){this._error=e,this._transition("error");return}let a=this._ref.storage._makeRequest(o,ed,n,i,!1);this._request=a,a.getPromise().then(e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){262144*this._chunkMultiplier*2<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{let r=function(e,t,r){let n=k(t.fullServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,s=new J(n,"GET",Z(e,r),i);return s.errorHandler=et(t),s}(this._ref.storage,this._ref._location,this._mappings),n=this._ref.storage._makeRequest(r,ed,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{let r=en(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),n=this._ref.storage._makeRequest(r,ed,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){let t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":let t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=m(),this._state=e,this._notifyObservers()}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}}get snapshot(){let e=ea(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,n){let i=new el(t||void 0,r||void 0,n||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){let t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(e=>{this._notifyObserver(e)})}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(ea(this._state)){case eo.SUCCESS:eu(this._resolve.bind(null,this.snapshot))();break;case eo.CANCELED:case eo.ERROR:eu(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(ea(this._state)){case eo.RUNNING:case eo.PAUSED:e.next&&eu(e.next.bind(e,this.snapshot))();break;case eo.SUCCESS:e.complete&&eu(e.complete.bind(e))();break;case eo.CANCELED:case eo.ERROR:default:e.error&&eu(e.error.bind(e,this._error))()}}resume(){let e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){let e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){let e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,t){this._service=e,t instanceof E?this._location=t:this._location=E.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new ep(e,t)}get root(){let e=new E(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return q(this._location.path)}get storage(){return this._service}get parent(){let e=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(0===e.length)return null;let t=e.lastIndexOf("/");return -1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;let t=new E(this._location.bucket,e);return new ep(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw new d(s.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}}function eg(e,t,r){e._throwIfRoot("uploadBytes");let n=en(e.storage,e._location,G(),new j(t,!0),r);return e.storage.makeRequestWithTokens(n,ed).then(t=>({metadata:t,ref:e}))}async function em(e,t,r){let n=await function(e,t){null!=t&&"number"==typeof t.maxResults&&C("options.maxResults",1,1e3,t.maxResults);let r=t||{},n=function(e,t,r,n,i){var s;let o={};t.isRoot?o.prefix="":o.prefix=t.path+"/",o.delimiter="/",n&&(o.pageToken=n),i&&(o.maxResults=i);let a=k(t.bucketOnlyServerUrl(),e.host,e._protocol),l=e.maxOperationRetryTime,u=new J(a,"GET",(s=t.bucket,function(t,r){let n=function(e,t,r){let n=B(r);return null===n?null:function(e,t,r){let n={prefixes:[],items:[],nextPageToken:r.nextPageToken};if(r[Q])for(let i of r[Q]){let r=i.replace(/\/$/,""),s=e._makeStorageReference(new E(t,r));n.prefixes.push(s)}if(r[X])for(let i of r[X]){let r=e._makeStorageReference(new E(t,i.name));n.items.push(r)}return n}(e,t,n)}(e,s,r);return Y(null!==n),n}),l);return u.urlParams=o,u.errorHandler=ee(t),u}(e.storage,e._location,"/",r.pageToken,r.maxResults);return e.storage.makeRequestWithTokens(n,ed)}(e,{pageToken:r});t.prefixes.push(...n.prefixes),t.items.push(...n.items),null!=n.nextPageToken&&await em(e,t,n.nextPageToken)}function ey(e,t){let r=null==t?void 0:t[c];return null==r?null:E.makeFromBucketSpec(r,e)}class ev{constructor(e,t,r,n,i){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=n,this._firebaseVersion=i,this._bucket=null,this._host=h,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,null!=n?this._bucket=E.makeFromBucketSpec(n,this._host):this._bucket=ey(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=E.makeFromBucketSpec(this._url,e):this._bucket=ey(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){C("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){C("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){let e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new ep(this,e)}_makeRequest(e,t,r,n,i=!0){if(this._deleted)return new T(w());{let s=function(e,t,r,n,i,s,o=!0){let a=R(e.urlParams),l=e.url+a,u=Object.assign({},e.headers);return t&&(u["X-Firebase-GMPID"]=t),null!==r&&r.length>0&&(u.Authorization="Firebase "+r),u["X-Firebase-Storage-Version"]="webjs/"+(null!=s?s:"AppManager"),null!==n&&(u["X-Firebase-AppCheck"]=n),new N(l,e.method,u,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o)}(e,this._appId,r,n,t,this._firebaseVersion,i);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(e,t){let[r,n]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,n).getPromise()}}let ew="@firebase/storage",e_="0.13.2",eb="storage";function eE(e,t,r){return eg(e=(0,l.m9)(e),t,r)}function eT(e,t,r,n){return function(e,t,r=x.RAW,n){e._throwIfRoot("uploadString");let i=U(r,t),s=Object.assign({},n);return null==s.contentType&&null!=i.contentType&&(s.contentType=i.contentType),eg(e,i.data,s)}(e=(0,l.m9)(e),t,r,n)}function eI(e,t,r){var n;return(n=e=(0,l.m9)(e))._throwIfRoot("uploadBytesResumable"),new ef(n,new j(t),r)}function eS(e){return function(e){let t={prefixes:[],items:[]};return em(e,t).then(()=>t)}(e=(0,l.m9)(e))}function eA(e){return function(e){e._throwIfRoot("getDownloadURL");let t=function(e,t,r){let n=new J(k(t.fullServerUrl(),e.host,e._protocol),"GET",function(t,n){let i=K(e,n,r);return Y(null!==i),function(e,t,r,n){let i=B(t);if(null===i||!I(i.downloadTokens))return null;let s=i.downloadTokens;if(0===s.length)return null;let o=encodeURIComponent;return s.split(",").map(t=>{let i=e.bucket,s=e.fullPath;return k("/b/"+o(i)+"/o/"+o(s),r,n)+R({alt:"media",token:t})})[0]}(i,n,e.host,e._protocol)},e.maxOperationRetryTime);return n.errorHandler=et(t),n}(e.storage,e._location,G());return e.storage.makeRequestWithTokens(t,ed).then(e=>{if(null===e)throw new d(s.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}(e=(0,l.m9)(e))}function eC(e){return function(e){e._throwIfRoot("deleteObject");let t=function(e,t){let r=new J(k(t.fullServerUrl(),e.host,e._protocol),"DELETE",function(e,t){},e.maxOperationRetryTime);return r.successCodes=[200,204],r.errorHandler=et(t),r}(e.storage,e._location);return e.storage.makeRequestWithTokens(t,ed)}(e=(0,l.m9)(e))}function ek(e,t){return function(e,t){if(!(t&&/^[A-Za-z]+:\/\//.test(t)))return function e(t,r){if(t instanceof ev){if(null==t._bucket)throw new d(s.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+c+"' property when initializing the app?");let n=new ep(t,t._bucket);return null!=r?e(n,r):n}return void 0!==r?function(e,t){let r=function(e,t){let r=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?r:e+"/"+r}(e._location.path,t),n=new E(e._location.bucket,r);return new ep(e.storage,n)}(t,r):t}(e,t);if(e instanceof ev)return new ep(e,t);throw v("To use ref(service, url), the first argument must be a Storage instance.")}(e=(0,l.m9)(e),t)}function eR(e=(0,a.Mq)(),t){e=(0,l.m9)(e);let r=(0,a.qX)(e,eb).getImmediate({identifier:t}),n=(0,l.P0)("storage");return n&&function(e,t,r,n={}){!function(e,t,r,n={}){e.host=`${t}:${r}`,e._protocol="http";let{mockUserToken:i}=n;i&&(e._overrideAuthToken="string"==typeof i?i:(0,l.Sg)(i,e.app.options.projectId))}(e,t,r,n)}(r,...n),r}(0,a.Xd)(new u.wA(eb,function(e,{instanceIdentifier:t}){return new ev(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),t,a.Jn)},"PUBLIC").setMultipleInstances(!0)),(0,a.KN)(ew,e_,""),(0,a.KN)(ew,e_,"esm2017")},6501:function(e,t,r){"use strict";let n,i;r.d(t,{x7:function(){return ec},ZP:function(){return ed}});var s,o=r(7294);let a={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||a,u=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let r="",n="",i="";for(let s in e){let o=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+o+";":n+="f"==s[1]?d(o,s):s+"{"+d(o,"k"==s[1]?"":t)+"}":"object"==typeof o?n+=d(o,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=o&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=d.p?d.p(s,o):s+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+n},f={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},g=(e,t,r,n,i)=>{var s;let o=p(e),a=f[o]||(f[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!f[a]){let t=o!==e?e:(e=>{let t,r,n=[{}];for(;t=u.exec(e.replace(h,""));)t[4]?n.shift():t[3]?(r=t[3].replace(c," ").trim(),n.unshift(n[0][r]=n[0][r]||{})):n[0][t[1]]=t[2].replace(c," ").trim();return n[0]})(e);f[a]=d(i?{["@keyframes "+a]:t}:t,r?"":"."+a)}let l=r&&f.g?f.g:null;return r&&(f.g=f[a]),s=f[a],l?t.data=t.data.replace(l,s):-1===t.data.indexOf(s)&&(t.data=n?s+t.data:t.data+s),a},m=(e,t,r)=>e.reduce((e,n,i)=>{let s=t[i];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+n+(null==s?"":s)},"");function y(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?m(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let v,w,_,b=y.bind({k:1});function E(e,t){let r=this||{};return function(){let n=arguments;function i(s,o){let a=Object.assign({},s),l=a.className||i.className;r.p=Object.assign({theme:w&&w()},a),r.o=/ *go\d+/.test(l),a.className=y.apply(r,n)+(l?" "+l:""),t&&(a.ref=o);let u=e;return e[0]&&(u=a.as||e,delete a.as),_&&u[0]&&_(a),v(u,a)}return t?t(i):i}}var T=e=>"function"==typeof e,I=(e,t)=>T(e)?e(t):e,S=(n=0,()=>(++n).toString()),A=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},C=new Map,k=e=>{if(C.has(e))return;let t=setTimeout(()=>{C.delete(e),D({type:4,toastId:e})},1e3);C.set(e,t)},R=e=>{let t=C.get(e);t&&clearTimeout(t)},O=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&R(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return e.toasts.find(e=>e.id===r.id)?O(e,{type:1,toast:r}):O(e,{type:0,toast:r});case 3:let{toastId:n}=t;return n?k(n):e.toasts.forEach(e=>{k(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===n||void 0===n?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],P={toasts:[],pausedAt:void 0},D=e=>{P=O(P,e),N.forEach(e=>{e(P)})},x={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},L=(e={})=>{let[t,r]=(0,o.useState)(P);(0,o.useEffect)(()=>(N.push(r),()=>{let e=N.indexOf(r);e>-1&&N.splice(e,1)}),[t]);let n=t.toasts.map(t=>{var r,n;return{...e,...e[t.type],...t,duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||x[t.type],style:{...e.style,...null==(n=e[t.type])?void 0:n.style,...t.style}}});return{...t,toasts:n}},U=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||S()}),M=e=>(t,r)=>{let n=U(t,e,r);return D({type:2,toast:n}),n.id},F=(e,t)=>M("blank")(e,t);F.error=M("error"),F.success=M("success"),F.loading=M("loading"),F.custom=M("custom"),F.dismiss=e=>{D({type:3,toastId:e})},F.remove=e=>D({type:4,toastId:e}),F.promise=(e,t,r)=>{let n=F.loading(t.loading,{...r,...null==r?void 0:r.loading});return e.then(e=>(F.success(I(t.success,e),{id:n,...r,...null==r?void 0:r.success}),e)).catch(e=>{F.error(I(t.error,e),{id:n,...r,...null==r?void 0:r.error})}),e};var V=(e,t)=>{D({type:1,toast:{id:e,height:t}})},j=()=>{D({type:5,time:Date.now()})},B=e=>{let{toasts:t,pausedAt:r}=L(e);(0,o.useEffect)(()=>{if(r)return;let e=Date.now(),n=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&F.dismiss(t.id);return}return setTimeout(()=>F.dismiss(t.id),r)});return()=>{n.forEach(e=>e&&clearTimeout(e))}},[t,r]);let n=(0,o.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),i=(0,o.useCallback)((e,r)=>{let{reverseOrder:n=!1,gutter:i=8,defaultPosition:s}=r||{},o=t.filter(t=>(t.position||s)===(e.position||s)&&t.height),a=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<a&&e.visible).length;return o.filter(e=>e.visible).slice(...n?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return{toasts:t,handlers:{updateHeight:V,startPause:j,endPause:n,calculateOffset:i}}},q=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,$=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,H=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${$} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,G=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,K=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,W=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Q=b`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,X=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Q} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,J=E("div")`
  position: absolute;
`,Y=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Z=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Z} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:n}=e;return void 0!==t?"string"==typeof t?o.createElement(ee,null,t):t:"blank"===r?null:o.createElement(Y,null,o.createElement(K,{...n}),"loading"!==r&&o.createElement(J,null,"error"===r?o.createElement(H,{...n}):o.createElement(X,{...n})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,en=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=E("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,es=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let r=e.includes("top")?1:-1,[n,i]=A()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),en(r)];return{animation:t?`${b(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ea=o.memo(({toast:e,position:t,style:r,children:n})=>{let i=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},s=o.createElement(et,{toast:e}),a=o.createElement(es,{...e.ariaProps},I(e.message,e));return o.createElement(ei,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof n?n({icon:s,message:a}):o.createElement(o.Fragment,null,s,a))});s=o.createElement,d.p=void 0,v=s,w=void 0,_=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:n,children:i})=>{let s=o.useCallback(t=>{if(t){let r=()=>{n(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return o.createElement("div",{ref:s,className:t,style:r},i)},eu=(e,t)=>{let r=e.includes("top"),n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:A()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...n}},eh=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:n,children:i,containerStyle:s,containerClassName:a})=>{let{toasts:l,handlers:u}=B(r);return o.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:a,onMouseEnter:u.startPause,onMouseLeave:u.endPause},l.map(r=>{let s=r.position||t,a=eu(s,u.calculateOffset(r,{reverseOrder:e,gutter:n,defaultPosition:t}));return o.createElement(el,{id:r.id,key:r.id,onHeightUpdate:u.updateHeight,className:r.visible?eh:"",style:a},"custom"===r.type?I(r.message,r):i?i(r):o.createElement(ea,{toast:r,position:s}))}))},ed=F}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[9774,179],function(){return t(1118),t(9420)}),_N_E=e.O()}]);