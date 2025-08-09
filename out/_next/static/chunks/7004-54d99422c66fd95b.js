"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7004],{7004:function(e,t,n){n.d(t,{$C:function(){return T},V1:function(){return N}});var i,r=n(5816),a=n(4444),s=n(8463);function o(e,t){let n={};for(let i in e)e.hasOwnProperty(i)&&(n[i]=t(e[i]));return n}function u(e){if(null==e)return e;if(e["@type"])switch(e["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":{let t=Number(e.value);if(isNaN(t))throw Error("Data cannot be decoded from JSON: "+e);return t}default:throw Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(e=>u(e)):"function"==typeof e||"object"==typeof e?o(e,e=>u(e)):e}/**
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
 */let c="functions",l={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class h extends a.ZR{constructor(e,t,n){super(`${c}/${e}`,t||""),this.details=n}}/**
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
 */class d{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then(e=>this.auth=e,()=>{}),this.messaging||t.get().then(e=>this.messaging=e,()=>{}),this.appCheck||n.get().then(e=>this.appCheck=e,()=>{})}async getAuthToken(){if(this.auth)try{let e=await this.auth.getToken();return null==e?void 0:e.accessToken}catch(e){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return await this.messaging.getToken()}catch(e){return}}async getAppCheckToken(e){if(this.appCheck){let t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){return{authToken:await this.getAuthToken(),messagingToken:await this.getMessagingToken(),appCheckToken:await this.getAppCheckToken(e)}}}/**
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
 */let p="us-central1";class g{constructor(e,t,n,i,r=p,a){this.app=e,this.fetchImpl=a,this.emulatorOrigin=null,this.contextProvider=new d(t,n,i),this.cancelAllRequests=new Promise(e=>{this.deleteService=()=>Promise.resolve(e())});try{let e=new URL(r);this.customDomain=e.origin+("/"===e.pathname?"":e.pathname),this.region=p}catch(e){this.customDomain=null,this.region=r}}_delete(){return this.deleteService()}_url(e){let t=this.app.options.projectId;if(null!==this.emulatorOrigin){let n=this.emulatorOrigin;return`${n}/${t}/${this.region}/${e}`}return null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}async function f(e,t,n,i){let r;n["Content-Type"]="application/json";try{r=await i(e,{method:"POST",body:JSON.stringify(t),headers:n})}catch(e){return{status:0,json:null}}let a=null;try{a=await r.json()}catch(e){}return{status:r.status,json:a}}async function m(e,t,n,i){var r;let a;let s={data:n=function e(t){if(null==t)return null;if(t instanceof Number&&(t=t.valueOf()),"number"==typeof t&&isFinite(t)||!0===t||!1===t||"[object String]"===Object.prototype.toString.call(t))return t;if(t instanceof Date)return t.toISOString();if(Array.isArray(t))return t.map(t=>e(t));if("function"==typeof t||"object"==typeof t)return o(t,t=>e(t));throw Error("Data cannot be encoded in JSON: "+t)}(n)},c={},d=await e.contextProvider.getContext(i.limitedUseAppCheckTokens);d.authToken&&(c.Authorization="Bearer "+d.authToken),d.messagingToken&&(c["Firebase-Instance-ID-Token"]=d.messagingToken),null!==d.appCheckToken&&(c["X-Firebase-AppCheck"]=d.appCheckToken);let p=(r=i.timeout||7e4,a=null,{promise:new Promise((e,t)=>{a=setTimeout(()=>{t(new h("deadline-exceeded","deadline-exceeded"))},r)}),cancel:()=>{a&&clearTimeout(a)}}),g=await Promise.race([f(t,s,c,e.fetchImpl),p.promise,e.cancelAllRequests]);if(p.cancel(),!g)throw new h("cancelled","Firebase Functions instance was deleted.");let m=function(e,t){let n,i=function(e){if(e>=200&&e<300)return"ok";switch(e){case 0:case 500:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),r=i;try{let e=t&&t.error;if(e){let t=e.status;if("string"==typeof t){if(!l[t])return new h("internal","internal");i=l[t],r=t}let a=e.message;"string"==typeof a&&(r=a),n=e.details,void 0!==n&&(n=u(n))}}catch(e){}return"ok"===i?null:new h(i,r,n)}(g.status,g.json);if(m)throw m;if(!g.json)throw new h("internal","Response is not valid JSON object.");let k=g.json.data;if(void 0===k&&(k=g.json.result),void 0===k)throw new h("internal","Response is missing data field.");return{data:u(k)}}let k="@firebase/functions",w="0.11.8";/**
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
 */function T(e=(0,r.Mq)(),t=p){let n=(0,r.qX)((0,a.m9)(e),c).getImmediate({identifier:t}),i=(0,a.P0)("functions");return i&&function(e,t,n){(0,a.m9)(e).emulatorOrigin=`http://${t}:${n}`}(n,...i),n}function N(e,t,n){var i;return i=(0,a.m9)(e),e=>(function(e,t,n,i){let r=e._url(t);return m(e,r,n,i)})(i,t,e,n||{})}i=fetch.bind(self),(0,r.Xd)(new s.wA(c,(e,{instanceIdentifier:t})=>{let n=e.getProvider("app").getImmediate();return new g(n,e.getProvider("auth-internal"),e.getProvider("messaging-internal"),e.getProvider("app-check-internal"),t,i)},"PUBLIC").setMultipleInstances(!0)),(0,r.KN)(k,w,void 0),(0,r.KN)(k,w,"esm2017")}}]);