(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wh="183",Zc=0,Xh=1,$c=2,Qr=1,ic=2,ur=3,ls=0,Qi=1,Dn=2,$n=0,Hs=1,qh=2,Yh=3,jh=4,Jc=5,_s=100,Qc=101,tu=102,eu=103,iu=104,nu=200,su=201,ru=202,au=203,lo=204,co=205,ou=206,hu=207,lu=208,cu=209,uu=210,fu=211,du=212,pu=213,mu=214,uo=0,fo=1,po=2,Xs=3,mo=4,xo=5,go=6,vo=7,nc=0,xu=1,gu=2,Fn=0,sc=1,rc=2,ac=3,oc=4,hc=5,lc=6,cc=7,uc=300,Es=301,qs=302,Ta=303,wa=304,pa=306,_o=1e3,Kn=1001,yo=1002,Pi=1003,vu=1004,Er=1005,zi=1006,Aa=1007,Ms=1008,an=1009,fc=1010,dc=1011,mr=1012,Ah=1013,Bn=1014,Un=1015,Qn=1016,Rh=1017,Ch=1018,xr=1020,pc=35902,mc=35899,xc=1021,gc=1022,_n=1023,ts=1026,Ss=1027,vc=1028,Ph=1029,Ys=1030,Nh=1031,Ih=1033,ta=33776,ea=33777,ia=33778,na=33779,Mo=35840,So=35841,bo=35842,Eo=35843,To=36196,wo=37492,Ao=37496,Ro=37488,Co=37489,Po=37490,No=37491,Io=37808,Lo=37809,Do=37810,Uo=37811,zo=37812,Fo=37813,Oo=37814,Bo=37815,ko=37816,Vo=37817,Go=37818,Ho=37819,Wo=37820,Xo=37821,qo=36492,Yo=36494,jo=36495,Ko=36283,Zo=36284,$o=36285,Jo=36286,_u=3200,_c=0,yu=1,os="",sn="srgb",js="srgb-linear",ra="linear",Ge="srgb",As=7680,Kh=519,Mu=512,Su=513,bu=514,Lh=515,Eu=516,Tu=517,Dh=518,wu=519,Zh=35044,$h="300 es",zn=2e3,gr=2001;function Au(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function aa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ru(){const n=aa("canvas");return n.style.display="block",n}const Jh={};function Qh(...n){const t="THREE."+n.shift();console.log(t,...n)}function yc(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function ge(...n){n=yc(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function ze(...n){n=yc(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function oa(...n){const t=n.join(" ");t in Jh||(Jh[t]=!0,ge(...n))}function Cu(n,t,e){return new Promise(function(s,r){function a(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:s()}}setTimeout(a,e)})}const Pu={[uo]:fo,[po]:go,[mo]:vo,[Xs]:xo,[fo]:uo,[go]:po,[vo]:mo,[xo]:Xs};class Zs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(e)===-1&&s[t].push(e)}hasEventListener(t,e){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(e)!==-1}removeEventListener(t,e){const s=this._listeners;if(s===void 0)return;const r=s[t];if(r!==void 0){const a=r.indexOf(e);a!==-1&&r.splice(a,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const s=e[t.type];if(s!==void 0){t.target=this;const r=s.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,t);t.target=null}}}const Di=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ra=Math.PI/180,Qo=180/Math.PI;function _r(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Di[n&255]+Di[n>>8&255]+Di[n>>16&255]+Di[n>>24&255]+"-"+Di[t&255]+Di[t>>8&255]+"-"+Di[t>>16&15|64]+Di[t>>24&255]+"-"+Di[e&63|128]+Di[e>>8&255]+"-"+Di[e>>16&255]+Di[e>>24&255]+Di[s&255]+Di[s>>8&255]+Di[s>>16&255]+Di[s>>24&255]).toLowerCase()}function Pe(n,t,e){return Math.max(t,Math.min(e,n))}function Nu(n,t){return(n%t+t)%t}function Ca(n,t,e){return(1-e)*n+e*t}function nr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ji(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Fe{constructor(t=0,e=0){Fe.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,s=this.y,r=t.elements;return this.x=r[0]*e+r[3]*s+r[6],this.y=r[1]*e+r[4]*s+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Pe(this.x,t.x,e.x),this.y=Pe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Pe(this.x,t,e),this.y=Pe(this.y,t,e),this}clampLength(t,e){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Pe(s,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const s=this.dot(t)/e;return Math.acos(Pe(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,s=this.y-t.y;return e*e+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,s){return this.x=t.x+(e.x-t.x)*s,this.y=t.y+(e.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const s=Math.cos(e),r=Math.sin(e),a=this.x-t.x,o=this.y-t.y;return this.x=a*s-o*r+t.x,this.y=a*r+o*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $s{constructor(t=0,e=0,s=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=s,this._w=r}static slerpFlat(t,e,s,r,a,o,h){let l=s[r+0],c=s[r+1],u=s[r+2],f=s[r+3],d=a[o+0],x=a[o+1],g=a[o+2],v=a[o+3];if(f!==v||l!==d||c!==x||u!==g){let p=l*d+c*x+u*g+f*v;p<0&&(d=-d,x=-x,g=-g,v=-v,p=-p);let m=1-h;if(p<.9995){const S=Math.acos(p),M=Math.sin(S);m=Math.sin(m*S)/M,h=Math.sin(h*S)/M,l=l*m+d*h,c=c*m+x*h,u=u*m+g*h,f=f*m+v*h}else{l=l*m+d*h,c=c*m+x*h,u=u*m+g*h,f=f*m+v*h;const S=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=S,c*=S,u*=S,f*=S}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,s,r,a,o){const h=s[r],l=s[r+1],c=s[r+2],u=s[r+3],f=a[o],d=a[o+1],x=a[o+2],g=a[o+3];return t[e]=h*g+u*f+l*x-c*d,t[e+1]=l*g+u*d+c*f-h*x,t[e+2]=c*g+u*x+h*d-l*f,t[e+3]=u*g-h*f-l*d-c*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,s,r){return this._x=t,this._y=e,this._z=s,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const s=t._x,r=t._y,a=t._z,o=t._order,h=Math.cos,l=Math.sin,c=h(s/2),u=h(r/2),f=h(a/2),d=l(s/2),x=l(r/2),g=l(a/2);switch(o){case"XYZ":this._x=d*u*f+c*x*g,this._y=c*x*f-d*u*g,this._z=c*u*g+d*x*f,this._w=c*u*f-d*x*g;break;case"YXZ":this._x=d*u*f+c*x*g,this._y=c*x*f-d*u*g,this._z=c*u*g-d*x*f,this._w=c*u*f+d*x*g;break;case"ZXY":this._x=d*u*f-c*x*g,this._y=c*x*f+d*u*g,this._z=c*u*g+d*x*f,this._w=c*u*f-d*x*g;break;case"ZYX":this._x=d*u*f-c*x*g,this._y=c*x*f+d*u*g,this._z=c*u*g-d*x*f,this._w=c*u*f+d*x*g;break;case"YZX":this._x=d*u*f+c*x*g,this._y=c*x*f+d*u*g,this._z=c*u*g-d*x*f,this._w=c*u*f-d*x*g;break;case"XZY":this._x=d*u*f-c*x*g,this._y=c*x*f-d*u*g,this._z=c*u*g+d*x*f,this._w=c*u*f+d*x*g;break;default:ge("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const s=e/2,r=Math.sin(s);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,s=e[0],r=e[4],a=e[8],o=e[1],h=e[5],l=e[9],c=e[2],u=e[6],f=e[10],d=s+h+f;if(d>0){const x=.5/Math.sqrt(d+1);this._w=.25/x,this._x=(u-l)*x,this._y=(a-c)*x,this._z=(o-r)*x}else if(s>h&&s>f){const x=2*Math.sqrt(1+s-h-f);this._w=(u-l)/x,this._x=.25*x,this._y=(r+o)/x,this._z=(a+c)/x}else if(h>f){const x=2*Math.sqrt(1+h-s-f);this._w=(a-c)/x,this._x=(r+o)/x,this._y=.25*x,this._z=(l+u)/x}else{const x=2*Math.sqrt(1+f-s-h);this._w=(o-r)/x,this._x=(a+c)/x,this._y=(l+u)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let s=t.dot(e)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Pe(this.dot(t),-1,1)))}rotateTowards(t,e){const s=this.angleTo(t);if(s===0)return this;const r=Math.min(1,e/s);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const s=t._x,r=t._y,a=t._z,o=t._w,h=e._x,l=e._y,c=e._z,u=e._w;return this._x=s*u+o*h+r*c-a*l,this._y=r*u+o*l+a*h-s*c,this._z=a*u+o*c+s*l-r*h,this._w=o*u-s*h-r*l-a*c,this._onChangeCallback(),this}slerp(t,e){let s=t._x,r=t._y,a=t._z,o=t._w,h=this.dot(t);h<0&&(s=-s,r=-r,a=-a,o=-o,h=-h);let l=1-e;if(h<.9995){const c=Math.acos(h),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+s*e,this._y=this._y*l+r*e,this._z=this._z*l+a*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+s*e,this._y=this._y*l+r*e,this._z=this._z*l+a*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,s){return this.copy(t).slerp(e,s)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),s=Math.random(),r=Math.sqrt(1-s),a=Math.sqrt(s);return this.set(r*Math.sin(t),r*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class it{constructor(t=0,e=0,s=0){it.prototype.isVector3=!0,this.x=t,this.y=e,this.z=s}set(t,e,s){return s===void 0&&(s=this.z),this.x=t,this.y=e,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(tl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(tl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,s=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[3]*s+a[6]*r,this.y=a[1]*e+a[4]*s+a[7]*r,this.z=a[2]*e+a[5]*s+a[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,s=this.y,r=this.z,a=t.elements,o=1/(a[3]*e+a[7]*s+a[11]*r+a[15]);return this.x=(a[0]*e+a[4]*s+a[8]*r+a[12])*o,this.y=(a[1]*e+a[5]*s+a[9]*r+a[13])*o,this.z=(a[2]*e+a[6]*s+a[10]*r+a[14])*o,this}applyQuaternion(t){const e=this.x,s=this.y,r=this.z,a=t.x,o=t.y,h=t.z,l=t.w,c=2*(o*r-h*s),u=2*(h*e-a*r),f=2*(a*s-o*e);return this.x=e+l*c+o*f-h*u,this.y=s+l*u+h*c-a*f,this.z=r+l*f+a*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,s=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[4]*s+a[8]*r,this.y=a[1]*e+a[5]*s+a[9]*r,this.z=a[2]*e+a[6]*s+a[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Pe(this.x,t.x,e.x),this.y=Pe(this.y,t.y,e.y),this.z=Pe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Pe(this.x,t,e),this.y=Pe(this.y,t,e),this.z=Pe(this.z,t,e),this}clampLength(t,e){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Pe(s,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,s){return this.x=t.x+(e.x-t.x)*s,this.y=t.y+(e.y-t.y)*s,this.z=t.z+(e.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const s=t.x,r=t.y,a=t.z,o=e.x,h=e.y,l=e.z;return this.x=r*l-a*h,this.y=a*o-s*l,this.z=s*h-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const s=t.dot(this)/e;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Pa.copy(this).projectOnVector(t),this.sub(Pa)}reflect(t){return this.sub(Pa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const s=this.dot(t)/e;return Math.acos(Pe(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,s=this.y-t.y,r=this.z-t.z;return e*e+s*s+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,s){const r=Math.sin(e)*t;return this.x=r*Math.sin(s),this.y=Math.cos(e)*t,this.z=r*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,s){return this.x=t*Math.sin(e),this.y=s,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=s,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,s=Math.sqrt(1-e*e);return this.x=s*Math.cos(t),this.y=e,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pa=new it,tl=new $s;class Me{constructor(t,e,s,r,a,o,h,l,c){Me.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,s,r,a,o,h,l,c)}set(t,e,s,r,a,o,h,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=h,u[3]=e,u[4]=a,u[5]=l,u[6]=s,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,s=t.elements;return e[0]=s[0],e[1]=s[1],e[2]=s[2],e[3]=s[3],e[4]=s[4],e[5]=s[5],e[6]=s[6],e[7]=s[7],e[8]=s[8],this}extractBasis(t,e,s){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const s=t.elements,r=e.elements,a=this.elements,o=s[0],h=s[3],l=s[6],c=s[1],u=s[4],f=s[7],d=s[2],x=s[5],g=s[8],v=r[0],p=r[3],m=r[6],S=r[1],M=r[4],E=r[7],A=r[2],R=r[5],C=r[8];return a[0]=o*v+h*S+l*A,a[3]=o*p+h*M+l*R,a[6]=o*m+h*E+l*C,a[1]=c*v+u*S+f*A,a[4]=c*p+u*M+f*R,a[7]=c*m+u*E+f*C,a[2]=d*v+x*S+g*A,a[5]=d*p+x*M+g*R,a[8]=d*m+x*E+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],s=t[1],r=t[2],a=t[3],o=t[4],h=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*h*c-s*a*u+s*h*l+r*a*c-r*o*l}invert(){const t=this.elements,e=t[0],s=t[1],r=t[2],a=t[3],o=t[4],h=t[5],l=t[6],c=t[7],u=t[8],f=u*o-h*c,d=h*l-u*a,x=c*a-o*l,g=e*f+s*d+r*x;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=f*v,t[1]=(r*c-u*s)*v,t[2]=(h*s-r*o)*v,t[3]=d*v,t[4]=(u*e-r*l)*v,t[5]=(r*a-h*e)*v,t[6]=x*v,t[7]=(s*l-c*e)*v,t[8]=(o*e-s*a)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,s,r,a,o,h){const l=Math.cos(a),c=Math.sin(a);return this.set(s*l,s*c,-s*(l*o+c*h)+o+t,-r*c,r*l,-r*(-c*o+l*h)+h+e,0,0,1),this}scale(t,e){return this.premultiply(Na.makeScale(t,e)),this}rotate(t){return this.premultiply(Na.makeRotation(-t)),this}translate(t,e){return this.premultiply(Na.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),s=Math.sin(t);return this.set(e,-s,0,s,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,s=t.elements;for(let r=0;r<9;r++)if(e[r]!==s[r])return!1;return!0}fromArray(t,e=0){for(let s=0;s<9;s++)this.elements[s]=t[s+e];return this}toArray(t=[],e=0){const s=this.elements;return t[e]=s[0],t[e+1]=s[1],t[e+2]=s[2],t[e+3]=s[3],t[e+4]=s[4],t[e+5]=s[5],t[e+6]=s[6],t[e+7]=s[7],t[e+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Na=new Me,el=new Me().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),il=new Me().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Iu(){const n={enabled:!0,workingColorSpace:js,spaces:{},convert:function(r,a,o){return this.enabled===!1||a===o||!a||!o||(this.spaces[a].transfer===Ge&&(r.r=Jn(r.r),r.g=Jn(r.g),r.b=Jn(r.b)),this.spaces[a].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ge&&(r.r=Ws(r.r),r.g=Ws(r.g),r.b=Ws(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===os?ra:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,o){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return oa("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return oa("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],s=[.3127,.329];return n.define({[js]:{primaries:t,whitePoint:s,transfer:ra,toXYZ:el,fromXYZ:il,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:t,whitePoint:s,transfer:Ge,toXYZ:el,fromXYZ:il,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}}),n}const Ue=Iu();function Jn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ws(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Rs;class Lu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{Rs===void 0&&(Rs=aa("canvas")),Rs.width=t.width,Rs.height=t.height;const r=Rs.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),s=Rs}return s.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=aa("canvas");e.width=t.width,e.height=t.height;const s=e.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const r=s.getImageData(0,0,t.width,t.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=Jn(a[o]/255)*255;return s.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let s=0;s<e.length;s++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[s]=Math.floor(Jn(e[s]/255)*255):e[s]=Jn(e[s]);return{data:e,width:t.width,height:t.height}}else return ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Du=0;class Uh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=_r(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,h=r.length;o<h;o++)r[o].isDataTexture?a.push(Ia(r[o].image)):a.push(Ia(r[o]))}else a=Ia(r);s.url=a}return e||(t.images[this.uuid]=s),s}}function Ia(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Lu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(ge("Texture: Unable to serialize Texture."),{})}let Uu=0;const La=new it;class Wi extends Zs{constructor(t=Wi.DEFAULT_IMAGE,e=Wi.DEFAULT_MAPPING,s=Kn,r=Kn,a=zi,o=Ms,h=_n,l=an,c=Wi.DEFAULT_ANISOTROPY,u=os){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=_r(),this.name="",this.source=new Uh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=s,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=h,this.internalFormat=null,this.type=l,this.offset=new Fe(0,0),this.repeat=new Fe(1,1),this.center=new Fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Me,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(La).x}get height(){return this.source.getSize(La).y}get depth(){return this.source.getSize(La).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const s=t[e];if(s===void 0){ge(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){ge(`Texture.setValues(): property '${e}' does not exist.`);continue}r&&s&&r.isVector2&&s.isVector2||r&&s&&r.isVector3&&s.isVector3||r&&s&&r.isMatrix3&&s.isMatrix3?r.copy(s):this[e]=s}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),e||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==uc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _o:t.x=t.x-Math.floor(t.x);break;case Kn:t.x=t.x<0?0:1;break;case yo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _o:t.y=t.y-Math.floor(t.y);break;case Kn:t.y=t.y<0?0:1;break;case yo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Wi.DEFAULT_IMAGE=null;Wi.DEFAULT_MAPPING=uc;Wi.DEFAULT_ANISOTROPY=1;class fi{constructor(t=0,e=0,s=0,r=1){fi.prototype.isVector4=!0,this.x=t,this.y=e,this.z=s,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,s,r){return this.x=t,this.y=e,this.z=s,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,s=this.y,r=this.z,a=this.w,o=t.elements;return this.x=o[0]*e+o[4]*s+o[8]*r+o[12]*a,this.y=o[1]*e+o[5]*s+o[9]*r+o[13]*a,this.z=o[2]*e+o[6]*s+o[10]*r+o[14]*a,this.w=o[3]*e+o[7]*s+o[11]*r+o[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,s,r,a;const l=t.elements,c=l[0],u=l[4],f=l[8],d=l[1],x=l[5],g=l[9],v=l[2],p=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+x+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,E=(x+1)/2,A=(m+1)/2,R=(u+d)/4,C=(f+v)/4,y=(g+p)/4;return M>E&&M>A?M<.01?(s=0,r=.707106781,a=.707106781):(s=Math.sqrt(M),r=R/s,a=C/s):E>A?E<.01?(s=.707106781,r=0,a=.707106781):(r=Math.sqrt(E),s=R/r,a=y/r):A<.01?(s=.707106781,r=.707106781,a=0):(a=Math.sqrt(A),s=C/a,r=y/a),this.set(s,r,a,e),this}let S=Math.sqrt((p-g)*(p-g)+(f-v)*(f-v)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(f-v)/S,this.z=(d-u)/S,this.w=Math.acos((c+x+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Pe(this.x,t.x,e.x),this.y=Pe(this.y,t.y,e.y),this.z=Pe(this.z,t.z,e.z),this.w=Pe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Pe(this.x,t,e),this.y=Pe(this.y,t,e),this.z=Pe(this.z,t,e),this.w=Pe(this.w,t,e),this}clampLength(t,e){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Pe(s,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,s){return this.x=t.x+(e.x-t.x)*s,this.y=t.y+(e.y-t.y)*s,this.z=t.z+(e.z-t.z)*s,this.w=t.w+(e.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zu extends Zs{constructor(t=1,e=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=s.depth,this.scissor=new fi(0,0,t,e),this.scissorTest=!1,this.viewport=new fi(0,0,t,e),this.textures=[];const r={width:t,height:e,depth:s.depth},a=new Wi(r),o=s.count;for(let h=0;h<o;h++)this.textures[h]=a.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(t={}){const e={minFilter:zi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,s=1){if(this.width!==t||this.height!==e||this.depth!==s){this.width=t,this.height=e,this.depth=s;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=s,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,s=t.textures.length;e<s;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Uh(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class On extends zu{constructor(t=1,e=1,s={}){super(t,e,s),this.isWebGLRenderTarget=!0}}class Mc extends Wi{constructor(t=null,e=1,s=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:s,depth:r},this.magFilter=Pi,this.minFilter=Pi,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fu extends Wi{constructor(t=null,e=1,s=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:s,depth:r},this.magFilter=Pi,this.minFilter=Pi,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ci{constructor(t,e,s,r,a,o,h,l,c,u,f,d,x,g,v,p){ci.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,s,r,a,o,h,l,c,u,f,d,x,g,v,p)}set(t,e,s,r,a,o,h,l,c,u,f,d,x,g,v,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=s,m[12]=r,m[1]=a,m[5]=o,m[9]=h,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=d,m[3]=x,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ci().fromArray(this.elements)}copy(t){const e=this.elements,s=t.elements;return e[0]=s[0],e[1]=s[1],e[2]=s[2],e[3]=s[3],e[4]=s[4],e[5]=s[5],e[6]=s[6],e[7]=s[7],e[8]=s[8],e[9]=s[9],e[10]=s[10],e[11]=s[11],e[12]=s[12],e[13]=s[13],e[14]=s[14],e[15]=s[15],this}copyPosition(t){const e=this.elements,s=t.elements;return e[12]=s[12],e[13]=s[13],e[14]=s[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,s){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),s.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(t,e,s){return this.set(t.x,e.x,s.x,0,t.y,e.y,s.y,0,t.z,e.z,s.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,s=t.elements,r=1/Cs.setFromMatrixColumn(t,0).length(),a=1/Cs.setFromMatrixColumn(t,1).length(),o=1/Cs.setFromMatrixColumn(t,2).length();return e[0]=s[0]*r,e[1]=s[1]*r,e[2]=s[2]*r,e[3]=0,e[4]=s[4]*a,e[5]=s[5]*a,e[6]=s[6]*a,e[7]=0,e[8]=s[8]*o,e[9]=s[9]*o,e[10]=s[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,s=t.x,r=t.y,a=t.z,o=Math.cos(s),h=Math.sin(s),l=Math.cos(r),c=Math.sin(r),u=Math.cos(a),f=Math.sin(a);if(t.order==="XYZ"){const d=o*u,x=o*f,g=h*u,v=h*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=x+g*c,e[5]=d-v*c,e[9]=-h*l,e[2]=v-d*c,e[6]=g+x*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*u,x=l*f,g=c*u,v=c*f;e[0]=d+v*h,e[4]=g*h-x,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-h,e[2]=x*h-g,e[6]=v+d*h,e[10]=o*l}else if(t.order==="ZXY"){const d=l*u,x=l*f,g=c*u,v=c*f;e[0]=d-v*h,e[4]=-o*f,e[8]=g+x*h,e[1]=x+g*h,e[5]=o*u,e[9]=v-d*h,e[2]=-o*c,e[6]=h,e[10]=o*l}else if(t.order==="ZYX"){const d=o*u,x=o*f,g=h*u,v=h*f;e[0]=l*u,e[4]=g*c-x,e[8]=d*c+v,e[1]=l*f,e[5]=v*c+d,e[9]=x*c-g,e[2]=-c,e[6]=h*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,x=o*c,g=h*l,v=h*c;e[0]=l*u,e[4]=v-d*f,e[8]=g*f+x,e[1]=f,e[5]=o*u,e[9]=-h*u,e[2]=-c*u,e[6]=x*f+g,e[10]=d-v*f}else if(t.order==="XZY"){const d=o*l,x=o*c,g=h*l,v=h*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=d*f+v,e[5]=o*u,e[9]=x*f-g,e[2]=g*f-x,e[6]=h*u,e[10]=v*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ou,t,Bu)}lookAt(t,e,s){const r=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),es.crossVectors(s,en),es.lengthSq()===0&&(Math.abs(s.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),es.crossVectors(s,en)),es.normalize(),Tr.crossVectors(en,es),r[0]=es.x,r[4]=Tr.x,r[8]=en.x,r[1]=es.y,r[5]=Tr.y,r[9]=en.y,r[2]=es.z,r[6]=Tr.z,r[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const s=t.elements,r=e.elements,a=this.elements,o=s[0],h=s[4],l=s[8],c=s[12],u=s[1],f=s[5],d=s[9],x=s[13],g=s[2],v=s[6],p=s[10],m=s[14],S=s[3],M=s[7],E=s[11],A=s[15],R=r[0],C=r[4],y=r[8],b=r[12],D=r[1],w=r[5],N=r[9],I=r[13],L=r[2],k=r[6],G=r[10],U=r[14],K=r[3],at=r[7],Y=r[11],ut=r[15];return a[0]=o*R+h*D+l*L+c*K,a[4]=o*C+h*w+l*k+c*at,a[8]=o*y+h*N+l*G+c*Y,a[12]=o*b+h*I+l*U+c*ut,a[1]=u*R+f*D+d*L+x*K,a[5]=u*C+f*w+d*k+x*at,a[9]=u*y+f*N+d*G+x*Y,a[13]=u*b+f*I+d*U+x*ut,a[2]=g*R+v*D+p*L+m*K,a[6]=g*C+v*w+p*k+m*at,a[10]=g*y+v*N+p*G+m*Y,a[14]=g*b+v*I+p*U+m*ut,a[3]=S*R+M*D+E*L+A*K,a[7]=S*C+M*w+E*k+A*at,a[11]=S*y+M*N+E*G+A*Y,a[15]=S*b+M*I+E*U+A*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],s=t[4],r=t[8],a=t[12],o=t[1],h=t[5],l=t[9],c=t[13],u=t[2],f=t[6],d=t[10],x=t[14],g=t[3],v=t[7],p=t[11],m=t[15],S=l*x-c*d,M=h*x-c*f,E=h*d-l*f,A=o*x-c*u,R=o*d-l*u,C=o*f-h*u;return e*(v*S-p*M+m*E)-s*(g*S-p*A+m*R)+r*(g*M-v*A+m*C)-a*(g*E-v*R+p*C)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,s){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=s),this}invert(){const t=this.elements,e=t[0],s=t[1],r=t[2],a=t[3],o=t[4],h=t[5],l=t[6],c=t[7],u=t[8],f=t[9],d=t[10],x=t[11],g=t[12],v=t[13],p=t[14],m=t[15],S=e*h-s*o,M=e*l-r*o,E=e*c-a*o,A=s*l-r*h,R=s*c-a*h,C=r*c-a*l,y=u*v-f*g,b=u*p-d*g,D=u*m-x*g,w=f*p-d*v,N=f*m-x*v,I=d*m-x*p,L=S*I-M*N+E*w+A*D-R*b+C*y;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/L;return t[0]=(h*I-l*N+c*w)*k,t[1]=(r*N-s*I-a*w)*k,t[2]=(v*C-p*R+m*A)*k,t[3]=(d*R-f*C-x*A)*k,t[4]=(l*D-o*I-c*b)*k,t[5]=(e*I-r*D+a*b)*k,t[6]=(p*E-g*C-m*M)*k,t[7]=(u*C-d*E+x*M)*k,t[8]=(o*N-h*D+c*y)*k,t[9]=(s*D-e*N-a*y)*k,t[10]=(g*R-v*E+m*S)*k,t[11]=(f*E-u*R-x*S)*k,t[12]=(h*b-o*w-l*y)*k,t[13]=(e*w-s*b+r*y)*k,t[14]=(v*M-g*A-p*S)*k,t[15]=(u*A-f*M+d*S)*k,this}scale(t){const e=this.elements,s=t.x,r=t.y,a=t.z;return e[0]*=s,e[4]*=r,e[8]*=a,e[1]*=s,e[5]*=r,e[9]*=a,e[2]*=s,e[6]*=r,e[10]*=a,e[3]*=s,e[7]*=r,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,s,r))}makeTranslation(t,e,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,s,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,e,-s,0,0,s,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),s=Math.sin(t);return this.set(e,0,s,0,0,1,0,0,-s,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),s=Math.sin(t);return this.set(e,-s,0,0,s,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const s=Math.cos(e),r=Math.sin(e),a=1-s,o=t.x,h=t.y,l=t.z,c=a*o,u=a*h;return this.set(c*o+s,c*h-r*l,c*l+r*h,0,c*h+r*l,u*h+s,u*l-r*o,0,c*l-r*h,u*l+r*o,a*l*l+s,0,0,0,0,1),this}makeScale(t,e,s){return this.set(t,0,0,0,0,e,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,e,s,r,a,o){return this.set(1,s,a,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,s){const r=this.elements,a=e._x,o=e._y,h=e._z,l=e._w,c=a+a,u=o+o,f=h+h,d=a*c,x=a*u,g=a*f,v=o*u,p=o*f,m=h*f,S=l*c,M=l*u,E=l*f,A=s.x,R=s.y,C=s.z;return r[0]=(1-(v+m))*A,r[1]=(x+E)*A,r[2]=(g-M)*A,r[3]=0,r[4]=(x-E)*R,r[5]=(1-(d+m))*R,r[6]=(p+S)*R,r[7]=0,r[8]=(g+M)*C,r[9]=(p-S)*C,r[10]=(1-(d+v))*C,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,s){const r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];const a=this.determinant();if(a===0)return s.set(1,1,1),e.identity(),this;let o=Cs.set(r[0],r[1],r[2]).length();const h=Cs.set(r[4],r[5],r[6]).length(),l=Cs.set(r[8],r[9],r[10]).length();a<0&&(o=-o),pn.copy(this);const c=1/o,u=1/h,f=1/l;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=u,pn.elements[5]*=u,pn.elements[6]*=u,pn.elements[8]*=f,pn.elements[9]*=f,pn.elements[10]*=f,e.setFromRotationMatrix(pn),s.x=o,s.y=h,s.z=l,this}makePerspective(t,e,s,r,a,o,h=zn,l=!1){const c=this.elements,u=2*a/(e-t),f=2*a/(s-r),d=(e+t)/(e-t),x=(s+r)/(s-r);let g,v;if(l)g=a/(o-a),v=o*a/(o-a);else if(h===zn)g=-(o+a)/(o-a),v=-2*o*a/(o-a);else if(h===gr)g=-o/(o-a),v=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=x,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,s,r,a,o,h=zn,l=!1){const c=this.elements,u=2/(e-t),f=2/(s-r),d=-(e+t)/(e-t),x=-(s+r)/(s-r);let g,v;if(l)g=1/(o-a),v=o/(o-a);else if(h===zn)g=-2/(o-a),v=-(o+a)/(o-a);else if(h===gr)g=-1/(o-a),v=-a/(o-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=x,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,s=t.elements;for(let r=0;r<16;r++)if(e[r]!==s[r])return!1;return!0}fromArray(t,e=0){for(let s=0;s<16;s++)this.elements[s]=t[s+e];return this}toArray(t=[],e=0){const s=this.elements;return t[e]=s[0],t[e+1]=s[1],t[e+2]=s[2],t[e+3]=s[3],t[e+4]=s[4],t[e+5]=s[5],t[e+6]=s[6],t[e+7]=s[7],t[e+8]=s[8],t[e+9]=s[9],t[e+10]=s[10],t[e+11]=s[11],t[e+12]=s[12],t[e+13]=s[13],t[e+14]=s[14],t[e+15]=s[15],t}}const Cs=new it,pn=new ci,Ou=new it(0,0,0),Bu=new it(1,1,1),es=new it,Tr=new it,en=new it,nl=new ci,sl=new $s;class kn{constructor(t=0,e=0,s=0,r=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=s,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,s,r=this._order){return this._x=t,this._y=e,this._z=s,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,s=!0){const r=t.elements,a=r[0],o=r[4],h=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],x=r[10];switch(e){case"XYZ":this._y=Math.asin(Pe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-u,x),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Pe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(h,x),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(Pe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,x),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Pe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,x),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Pe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(h,x));break;case"XZY":this._z=Math.asin(-Pe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(h,a)):(this._x=Math.atan2(-u,x),this._y=0);break;default:ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,s){return nl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nl,e,s)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sl.setFromEuler(this),this.setFromQuaternion(sl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class Sc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ku=0;const rl=new it,Ps=new $s,Gn=new ci,wr=new it,sr=new it,Vu=new it,Gu=new $s,al=new it(1,0,0),ol=new it(0,1,0),hl=new it(0,0,1),ll={type:"added"},Hu={type:"removed"},Ns={type:"childadded",child:null},Da={type:"childremoved",child:null};class Ri extends Zs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=_r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ri.DEFAULT_UP.clone();const t=new it,e=new kn,s=new $s,r=new it(1,1,1);function a(){s.setFromEuler(e,!1)}function o(){e.setFromQuaternion(s,void 0,!1)}e._onChange(a),s._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ci},normalMatrix:{value:new Me}}),this.matrix=new ci,this.matrixWorld=new ci,this.matrixAutoUpdate=Ri.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ri.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ps.setFromAxisAngle(t,e),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(t,e){return Ps.setFromAxisAngle(t,e),this.quaternion.premultiply(Ps),this}rotateX(t){return this.rotateOnAxis(al,t)}rotateY(t){return this.rotateOnAxis(ol,t)}rotateZ(t){return this.rotateOnAxis(hl,t)}translateOnAxis(t,e){return rl.copy(t).applyQuaternion(this.quaternion),this.position.add(rl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(al,t)}translateY(t){return this.translateOnAxis(ol,t)}translateZ(t){return this.translateOnAxis(hl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(t,e,s){t.isVector3?wr.copy(t):wr.set(t,e,s);const r=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(sr,wr,this.up):Gn.lookAt(wr,sr,this.up),this.quaternion.setFromRotationMatrix(Gn),r&&(Gn.extractRotation(r.matrixWorld),Ps.setFromRotationMatrix(Gn),this.quaternion.premultiply(Ps.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ze("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ll),Ns.child=t,this.dispatchEvent(Ns),Ns.child=null):ze("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Hu),Da.child=t,this.dispatchEvent(Da),Da.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ll),Ns.child=t,this.dispatchEvent(Ns),Ns.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let s=0,r=this.children.length;s<r;s++){const o=this.children[s].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,s=[]){this[t]===e&&s.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(t,e,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,t,Vu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,Gu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let s=0,r=e.length;s<r;s++)e[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let s=0,r=e.length;s<r;s++)e[s].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,s=t.y,r=t.z,a=this.matrix.elements;a[12]+=e-a[0]*e-a[4]*s-a[8]*r,a[13]+=s-a[1]*e-a[5]*s-a[9]*r,a[14]+=r-a[2]*e-a[6]*s-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let s=0,r=e.length;s<r;s++)e[s].updateMatrixWorld(t)}updateWorldMatrix(t,e){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",s={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(h=>({...h})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(h,l){return h[l.uuid]===void 0&&(h[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const l=h.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];a(t.shapes,f)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let l=0,c=this.material.length;l<c;l++)h.push(a(t.materials,this.material[l]));r.material=h}else r.material=a(t.materials,this.material);if(this.children.length>0){r.children=[];for(let h=0;h<this.children.length;h++)r.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let h=0;h<this.animations.length;h++){const l=this.animations[h];r.animations.push(a(t.animations,l))}}if(e){const h=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),d=o(t.skeletons),x=o(t.animations),g=o(t.nodes);h.length>0&&(s.geometries=h),l.length>0&&(s.materials=l),c.length>0&&(s.textures=c),u.length>0&&(s.images=u),f.length>0&&(s.shapes=f),d.length>0&&(s.skeletons=d),x.length>0&&(s.animations=x),g.length>0&&(s.nodes=g)}return s.object=r,s;function o(h){const l=[];for(const c in h){const u=h[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let s=0;s<t.children.length;s++){const r=t.children[s];this.add(r.clone())}return this}}Ri.DEFAULT_UP=new it(0,1,0);Ri.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ri.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Zn extends Ri{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wu={type:"move"};class Ua{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new it,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new it),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new it,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new it),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const s of t.hand.values())this._getHandJoint(e,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,s){let r=null,a=null,o=null;const h=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,s),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),x=.02,g=.005;c.inputState.pinching&&d>x+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=x-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,s),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));h!==null&&(r=e.getPose(t.targetRaySpace,s),r===null&&a!==null&&(r=a),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(Wu)))}return h!==null&&(h.visible=r!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const s=new Zn;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[e.jointName]=s,t.add(s)}return t.joints[e.jointName]}}const bc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function za(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ne{constructor(t,e,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,s)}set(t,e,s){if(e===void 0&&s===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ue.colorSpaceToWorking(this,e),this}setRGB(t,e,s,r=Ue.workingColorSpace){return this.r=t,this.g=e,this.b=s,Ue.colorSpaceToWorking(this,r),this}setHSL(t,e,s,r=Ue.workingColorSpace){if(t=Nu(t,1),e=Pe(e,0,1),s=Pe(s,0,1),e===0)this.r=this.g=this.b=s;else{const a=s<=.5?s*(1+e):s+e-s*e,o=2*s-a;this.r=za(o,a,t+1/3),this.g=za(o,a,t),this.b=za(o,a,t-1/3)}return Ue.colorSpaceToWorking(this,r),this}setStyle(t,e=sn){function s(a){a!==void 0&&parseFloat(a)<1&&ge("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const o=r[1],h=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:ge("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(a,16),e);ge("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=sn){const s=bc[t.toLowerCase()];return s!==void 0?this.setHex(s,e):ge("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Jn(t.r),this.g=Jn(t.g),this.b=Jn(t.b),this}copyLinearToSRGB(t){return this.r=Ws(t.r),this.g=Ws(t.g),this.b=Ws(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=sn){return Ue.workingToColorSpace(Ui.copy(this),t),Math.round(Pe(Ui.r*255,0,255))*65536+Math.round(Pe(Ui.g*255,0,255))*256+Math.round(Pe(Ui.b*255,0,255))}getHexString(t=sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Ue.workingColorSpace){Ue.workingToColorSpace(Ui.copy(this),e);const s=Ui.r,r=Ui.g,a=Ui.b,o=Math.max(s,r,a),h=Math.min(s,r,a);let l,c;const u=(h+o)/2;if(h===o)l=0,c=0;else{const f=o-h;switch(c=u<=.5?f/(o+h):f/(2-o-h),o){case s:l=(r-a)/f+(r<a?6:0);break;case r:l=(a-s)/f+2;break;case a:l=(s-r)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Ue.workingColorSpace){return Ue.workingToColorSpace(Ui.copy(this),e),t.r=Ui.r,t.g=Ui.g,t.b=Ui.b,t}getStyle(t=sn){Ue.workingToColorSpace(Ui.copy(this),t);const e=Ui.r,s=Ui.g,r=Ui.b;return t!==sn?`color(${t} ${e.toFixed(3)} ${s.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(s*255)},${Math.round(r*255)})`}offsetHSL(t,e,s){return this.getHSL(is),this.setHSL(is.h+t,is.s+e,is.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,s){return this.r=t.r+(e.r-t.r)*s,this.g=t.g+(e.g-t.g)*s,this.b=t.b+(e.b-t.b)*s,this}lerpHSL(t,e){this.getHSL(is),t.getHSL(Ar);const s=Ca(is.h,Ar.h,e),r=Ca(is.s,Ar.s,e),a=Ca(is.l,Ar.l,e);return this.setHSL(s,r,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,s=this.g,r=this.b,a=t.elements;return this.r=a[0]*e+a[3]*s+a[6]*r,this.g=a[1]*e+a[4]*s+a[7]*r,this.b=a[2]*e+a[5]*s+a[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ui=new Ne;Ne.NAMES=bc;class zh{constructor(t,e=1,s=1e3){this.isFog=!0,this.name="",this.color=new Ne(t),this.near=e,this.far=s}clone(){return new zh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xu extends Ri{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const mn=new it,Hn=new it,Fa=new it,Wn=new it,Is=new it,Ls=new it,cl=new it,Oa=new it,Ba=new it,ka=new it,Va=new fi,Ga=new fi,Ha=new fi;class vn{constructor(t=new it,e=new it,s=new it){this.a=t,this.b=e,this.c=s}static getNormal(t,e,s,r){r.subVectors(s,e),mn.subVectors(t,e),r.cross(mn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(t,e,s,r,a){mn.subVectors(r,e),Hn.subVectors(s,e),Fa.subVectors(t,e);const o=mn.dot(mn),h=mn.dot(Hn),l=mn.dot(Fa),c=Hn.dot(Hn),u=Hn.dot(Fa),f=o*c-h*h;if(f===0)return a.set(0,0,0),null;const d=1/f,x=(c*l-h*u)*d,g=(o*u-h*l)*d;return a.set(1-x-g,g,x)}static containsPoint(t,e,s,r){return this.getBarycoord(t,e,s,r,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(t,e,s,r,a,o,h,l){return this.getBarycoord(t,e,s,r,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Wn.x),l.addScaledVector(o,Wn.y),l.addScaledVector(h,Wn.z),l)}static getInterpolatedAttribute(t,e,s,r,a,o){return Va.setScalar(0),Ga.setScalar(0),Ha.setScalar(0),Va.fromBufferAttribute(t,e),Ga.fromBufferAttribute(t,s),Ha.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(Va,a.x),o.addScaledVector(Ga,a.y),o.addScaledVector(Ha,a.z),o}static isFrontFacing(t,e,s,r){return mn.subVectors(s,e),Hn.subVectors(t,e),mn.cross(Hn).dot(r)<0}set(t,e,s){return this.a.copy(t),this.b.copy(e),this.c.copy(s),this}setFromPointsAndIndices(t,e,s,r){return this.a.copy(t[e]),this.b.copy(t[s]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,s,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),mn.cross(Hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return vn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,s,r,a){return vn.getInterpolation(t,this.a,this.b,this.c,e,s,r,a)}containsPoint(t){return vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const s=this.a,r=this.b,a=this.c;let o,h;Is.subVectors(r,s),Ls.subVectors(a,s),Oa.subVectors(t,s);const l=Is.dot(Oa),c=Ls.dot(Oa);if(l<=0&&c<=0)return e.copy(s);Ba.subVectors(t,r);const u=Is.dot(Ba),f=Ls.dot(Ba);if(u>=0&&f<=u)return e.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(s).addScaledVector(Is,o);ka.subVectors(t,a);const x=Is.dot(ka),g=Ls.dot(ka);if(g>=0&&x<=g)return e.copy(a);const v=x*c-l*g;if(v<=0&&c>=0&&g<=0)return h=c/(c-g),e.copy(s).addScaledVector(Ls,h);const p=u*g-x*f;if(p<=0&&f-u>=0&&x-g>=0)return cl.subVectors(a,r),h=(f-u)/(f-u+(x-g)),e.copy(r).addScaledVector(cl,h);const m=1/(p+v+d);return o=v*m,h=d*m,e.copy(s).addScaledVector(Is,o).addScaledVector(Ls,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class yr{constructor(t=new it(1/0,1/0,1/0),e=new it(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,s=t.length;e<s;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,s=t.count;e<s;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,s=t.length;e<s;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const s=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const a=s.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let o=0,h=a.count;o<h;o++)t.isMesh===!0?t.getVertexPosition(o,xn):xn.fromBufferAttribute(a,o),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Rr.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Rr.copy(s.boundingBox)),Rr.applyMatrix4(t.matrixWorld),this.union(Rr)}const r=t.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,s;return t.normal.x>0?(e=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),e<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(rr),Cr.subVectors(this.max,rr),Ds.subVectors(t.a,rr),Us.subVectors(t.b,rr),zs.subVectors(t.c,rr),ns.subVectors(Us,Ds),ss.subVectors(zs,Us),cs.subVectors(Ds,zs);let e=[0,-ns.z,ns.y,0,-ss.z,ss.y,0,-cs.z,cs.y,ns.z,0,-ns.x,ss.z,0,-ss.x,cs.z,0,-cs.x,-ns.y,ns.x,0,-ss.y,ss.x,0,-cs.y,cs.x,0];return!Wa(e,Ds,Us,zs,Cr)||(e=[1,0,0,0,1,0,0,0,1],!Wa(e,Ds,Us,zs,Cr))?!1:(Pr.crossVectors(ns,ss),e=[Pr.x,Pr.y,Pr.z],Wa(e,Ds,Us,zs,Cr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Xn=[new it,new it,new it,new it,new it,new it,new it,new it],xn=new it,Rr=new yr,Ds=new it,Us=new it,zs=new it,ns=new it,ss=new it,cs=new it,rr=new it,Cr=new it,Pr=new it,us=new it;function Wa(n,t,e,s,r){for(let a=0,o=n.length-3;a<=o;a+=3){us.fromArray(n,a);const h=r.x*Math.abs(us.x)+r.y*Math.abs(us.y)+r.z*Math.abs(us.z),l=t.dot(us),c=e.dot(us),u=s.dot(us);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>h)return!1}return!0}const yi=new it,Nr=new Fe;let qu=0;class yn{constructor(t,e,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=s,this.usage=Zh,this.updateRanges=[],this.gpuType=Un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,s){t*=this.itemSize,s*=e.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[t+r]=e.array[s+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,s=this.count;e<s;e++)Nr.fromBufferAttribute(this,e),Nr.applyMatrix3(t),this.setXY(e,Nr.x,Nr.y);else if(this.itemSize===3)for(let e=0,s=this.count;e<s;e++)yi.fromBufferAttribute(this,e),yi.applyMatrix3(t),this.setXYZ(e,yi.x,yi.y,yi.z);return this}applyMatrix4(t){for(let e=0,s=this.count;e<s;e++)yi.fromBufferAttribute(this,e),yi.applyMatrix4(t),this.setXYZ(e,yi.x,yi.y,yi.z);return this}applyNormalMatrix(t){for(let e=0,s=this.count;e<s;e++)yi.fromBufferAttribute(this,e),yi.applyNormalMatrix(t),this.setXYZ(e,yi.x,yi.y,yi.z);return this}transformDirection(t){for(let e=0,s=this.count;e<s;e++)yi.fromBufferAttribute(this,e),yi.transformDirection(t),this.setXYZ(e,yi.x,yi.y,yi.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let s=this.array[t*this.itemSize+e];return this.normalized&&(s=nr(s,this.array)),s}setComponent(t,e,s){return this.normalized&&(s=Ji(s,this.array)),this.array[t*this.itemSize+e]=s,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=nr(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ji(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=nr(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ji(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=nr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ji(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=nr(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ji(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,s){return t*=this.itemSize,this.normalized&&(e=Ji(e,this.array),s=Ji(s,this.array)),this.array[t+0]=e,this.array[t+1]=s,this}setXYZ(t,e,s,r){return t*=this.itemSize,this.normalized&&(e=Ji(e,this.array),s=Ji(s,this.array),r=Ji(r,this.array)),this.array[t+0]=e,this.array[t+1]=s,this.array[t+2]=r,this}setXYZW(t,e,s,r,a){return t*=this.itemSize,this.normalized&&(e=Ji(e,this.array),s=Ji(s,this.array),r=Ji(r,this.array),a=Ji(a,this.array)),this.array[t+0]=e,this.array[t+1]=s,this.array[t+2]=r,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Zh&&(t.usage=this.usage),t}}class Ec extends yn{constructor(t,e,s){super(new Uint16Array(t),e,s)}}class Tc extends yn{constructor(t,e,s){super(new Uint32Array(t),e,s)}}class ln extends yn{constructor(t,e,s){super(new Float32Array(t),e,s)}}const Yu=new yr,ar=new it,Xa=new it;let ma=class{constructor(t=new it,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const s=this.center;e!==void 0?s.copy(e):Yu.setFromPoints(t).getCenter(s);let r=0;for(let a=0,o=t.length;a<o;a++)r=Math.max(r,s.distanceToSquared(t[a]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const s=this.center.distanceToSquared(t);return e.copy(t),s>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ar.subVectors(t,this.center);const e=ar.lengthSq();if(e>this.radius*this.radius){const s=Math.sqrt(e),r=(s-this.radius)*.5;this.center.addScaledVector(ar,r/s),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ar.copy(t.center).add(Xa)),this.expandByPoint(ar.copy(t.center).sub(Xa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},ju=0;const on=new ci,qa=new Ri,Fs=new it,nn=new yr,or=new yr,Ai=new it;class cn extends Zs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=_r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Au(t)?Tc:Ec)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,s=0){this.groups.push({start:t,count:e,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const a=new Me().getNormalMatrix(t);s.applyNormalMatrix(a),s.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,s){return on.makeTranslation(t,e,s),this.applyMatrix4(on),this}scale(t,e,s){return on.makeScale(t,e,s),this.applyMatrix4(on),this}lookAt(t){return qa.lookAt(t),qa.updateMatrix(),this.applyMatrix4(qa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r];s.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ln(s,3))}else{const s=Math.min(t.length,e.count);for(let r=0;r<s;r++){const a=t[r];e.setXYZ(r,a.x,a.y,a.z||0)}t.length>e.count&&ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new it(-1/0,-1/0,-1/0),new it(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){const a=e[s];nn.setFromBufferAttribute(a),this.morphTargetsRelative?(Ai.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ai),Ai.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ai)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ma);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new it,1/0);return}if(t){const s=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let a=0,o=e.length;a<o;a++){const h=e[a];or.setFromBufferAttribute(h),this.morphTargetsRelative?(Ai.addVectors(nn.min,or.min),nn.expandByPoint(Ai),Ai.addVectors(nn.max,or.max),nn.expandByPoint(Ai)):(nn.expandByPoint(or.min),nn.expandByPoint(or.max))}nn.getCenter(s);let r=0;for(let a=0,o=t.count;a<o;a++)Ai.fromBufferAttribute(t,a),r=Math.max(r,s.distanceToSquared(Ai));if(e)for(let a=0,o=e.length;a<o;a++){const h=e[a],l=this.morphTargetsRelative;for(let c=0,u=h.count;c<u;c++)Ai.fromBufferAttribute(h,c),l&&(Fs.fromBufferAttribute(t,c),Ai.add(Fs)),r=Math.max(r,s.distanceToSquared(Ai))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=e.position,r=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yn(new Float32Array(4*s.count),4));const o=this.getAttribute("tangent"),h=[],l=[];for(let y=0;y<s.count;y++)h[y]=new it,l[y]=new it;const c=new it,u=new it,f=new it,d=new Fe,x=new Fe,g=new Fe,v=new it,p=new it;function m(y,b,D){c.fromBufferAttribute(s,y),u.fromBufferAttribute(s,b),f.fromBufferAttribute(s,D),d.fromBufferAttribute(a,y),x.fromBufferAttribute(a,b),g.fromBufferAttribute(a,D),u.sub(c),f.sub(c),x.sub(d),g.sub(d);const w=1/(x.x*g.y-g.x*x.y);isFinite(w)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-x.y).multiplyScalar(w),p.copy(f).multiplyScalar(x.x).addScaledVector(u,-g.x).multiplyScalar(w),h[y].add(v),h[b].add(v),h[D].add(v),l[y].add(p),l[b].add(p),l[D].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let y=0,b=S.length;y<b;++y){const D=S[y],w=D.start,N=D.count;for(let I=w,L=w+N;I<L;I+=3)m(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const M=new it,E=new it,A=new it,R=new it;function C(y){A.fromBufferAttribute(r,y),R.copy(A);const b=h[y];M.copy(b),M.sub(A.multiplyScalar(A.dot(b))).normalize(),E.crossVectors(R,b);const w=E.dot(l[y])<0?-1:1;o.setXYZW(y,M.x,M.y,M.z,w)}for(let y=0,b=S.length;y<b;++y){const D=S[y],w=D.start,N=D.count;for(let I=w,L=w+N;I<L;I+=3)C(t.getX(I+0)),C(t.getX(I+1)),C(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new yn(new Float32Array(e.count*3),3),this.setAttribute("normal",s);else for(let d=0,x=s.count;d<x;d++)s.setXYZ(d,0,0,0);const r=new it,a=new it,o=new it,h=new it,l=new it,c=new it,u=new it,f=new it;if(t)for(let d=0,x=t.count;d<x;d+=3){const g=t.getX(d+0),v=t.getX(d+1),p=t.getX(d+2);r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),u.subVectors(o,a),f.subVectors(r,a),u.cross(f),h.fromBufferAttribute(s,g),l.fromBufferAttribute(s,v),c.fromBufferAttribute(s,p),h.add(u),l.add(u),c.add(u),s.setXYZ(g,h.x,h.y,h.z),s.setXYZ(v,l.x,l.y,l.z),s.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,x=e.count;d<x;d+=3)r.fromBufferAttribute(e,d+0),a.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,a),f.subVectors(r,a),u.cross(f),s.setXYZ(d+0,u.x,u.y,u.z),s.setXYZ(d+1,u.x,u.y,u.z),s.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,s=t.count;e<s;e++)Ai.fromBufferAttribute(t,e),Ai.normalize(),t.setXYZ(e,Ai.x,Ai.y,Ai.z)}toNonIndexed(){function t(h,l){const c=h.array,u=h.itemSize,f=h.normalized,d=new c.constructor(l.length*u);let x=0,g=0;for(let v=0,p=l.length;v<p;v++){h.isInterleavedBufferAttribute?x=l[v]*h.data.stride+h.offset:x=l[v]*u;for(let m=0;m<u;m++)d[g++]=c[x++]}return new yn(d,u,f)}if(this.index===null)return ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new cn,s=this.index.array,r=this.attributes;for(const h in r){const l=r[h],c=t(l,s);e.setAttribute(h,c)}const a=this.morphAttributes;for(const h in a){const l=[],c=a[h];for(let u=0,f=c.length;u<f;u++){const d=c[u],x=t(d,s);l.push(x)}e.morphAttributes[h]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let h=0,l=o.length;h<l;h++){const c=o[h];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const s=this.attributes;for(const l in s){const c=s[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const x=c[f];u.push(x.toJSON(t.data))}u.length>0&&(r[l]=u,a=!0)}a&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere=h.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const a=t.morphAttributes;for(const c in a){const u=[],f=a[c];for(let d=0,x=f.length;d<x;d++)u.push(f[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Ku=0;class Js extends Zs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=_r(),this.name="",this.type="Material",this.blending=Hs,this.side=ls,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lo,this.blendDst=co,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=As,this.stencilZFail=As,this.stencilZPass=As,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const s=t[e];if(s===void 0){ge(`Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){ge(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(s):r&&r.isVector3&&s&&s.isVector3?r.copy(s):this[e]=s}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Hs&&(s.blending=this.blending),this.side!==ls&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==lo&&(s.blendSrc=this.blendSrc),this.blendDst!==co&&(s.blendDst=this.blendDst),this.blendEquation!==_s&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Xs&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kh&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==As&&(s.stencilFail=this.stencilFail),this.stencilZFail!==As&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==As&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function r(a){const o=[];for(const h in a){const l=a[h];delete l.metadata,o.push(l)}return o}if(e){const a=r(t.textures),o=r(t.images);a.length>0&&(s.textures=a),o.length>0&&(s.images=o)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let s=null;if(e!==null){const r=e.length;s=new Array(r);for(let a=0;a!==r;++a)s[a]=e[a].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const qn=new it,Ya=new it,Ir=new it,rs=new it,ja=new it,Lr=new it,Ka=new it;class wc{constructor(t=new it,e=new it(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const s=e.dot(this.direction);return s<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(qn.copy(this.origin).addScaledVector(this.direction,e),qn.distanceToSquared(t))}distanceSqToSegment(t,e,s,r){Ya.copy(t).add(e).multiplyScalar(.5),Ir.copy(e).sub(t).normalize(),rs.copy(this.origin).sub(Ya);const a=t.distanceTo(e)*.5,o=-this.direction.dot(Ir),h=rs.dot(this.direction),l=-rs.dot(Ir),c=rs.lengthSq(),u=Math.abs(1-o*o);let f,d,x,g;if(u>0)if(f=o*l-h,d=o*h-l,g=a*u,f>=0)if(d>=-g)if(d<=g){const v=1/u;f*=v,d*=v,x=f*(f+o*d+2*h)+d*(o*f+d+2*l)+c}else d=a,f=Math.max(0,-(o*d+h)),x=-f*f+d*(d+2*l)+c;else d=-a,f=Math.max(0,-(o*d+h)),x=-f*f+d*(d+2*l)+c;else d<=-g?(f=Math.max(0,-(-o*a+h)),d=f>0?-a:Math.min(Math.max(-a,-l),a),x=-f*f+d*(d+2*l)+c):d<=g?(f=0,d=Math.min(Math.max(-a,-l),a),x=d*(d+2*l)+c):(f=Math.max(0,-(o*a+h)),d=f>0?a:Math.min(Math.max(-a,-l),a),x=-f*f+d*(d+2*l)+c);else d=o>0?-a:a,f=Math.max(0,-(o*d+h)),x=-f*f+d*(d+2*l)+c;return s&&s.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ya).addScaledVector(Ir,d),x}intersectSphere(t,e){qn.subVectors(t.center,this.origin);const s=qn.dot(this.direction),r=qn.dot(qn)-s*s,a=t.radius*t.radius;if(r>a)return null;const o=Math.sqrt(a-r),h=s-o,l=s+o;return l<0?null:h<0?this.at(l,e):this.at(h,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/e;return s>=0?s:null}intersectPlane(t,e){const s=this.distanceToPlane(t);return s===null?null:this.at(s,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let s,r,a,o,h,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(s=(t.min.x-d.x)*c,r=(t.max.x-d.x)*c):(s=(t.max.x-d.x)*c,r=(t.min.x-d.x)*c),u>=0?(a=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(a=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),s>o||a>r||((a>s||isNaN(s))&&(s=a),(o<r||isNaN(r))&&(r=o),f>=0?(h=(t.min.z-d.z)*f,l=(t.max.z-d.z)*f):(h=(t.max.z-d.z)*f,l=(t.min.z-d.z)*f),s>l||h>r)||((h>s||s!==s)&&(s=h),(l<r||r!==r)&&(r=l),r<0)?null:this.at(s>=0?s:r,e)}intersectsBox(t){return this.intersectBox(t,qn)!==null}intersectTriangle(t,e,s,r,a){ja.subVectors(e,t),Lr.subVectors(s,t),Ka.crossVectors(ja,Lr);let o=this.direction.dot(Ka),h;if(o>0){if(r)return null;h=1}else if(o<0)h=-1,o=-o;else return null;rs.subVectors(this.origin,t);const l=h*this.direction.dot(Lr.crossVectors(rs,Lr));if(l<0)return null;const c=h*this.direction.dot(ja.cross(rs));if(c<0||l+c>o)return null;const u=-h*rs.dot(Ka);return u<0?null:this.at(u/o,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ac extends Js{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=nc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ul=new ci,fs=new wc,Dr=new ma,fl=new it,Ur=new it,zr=new it,Fr=new it,Za=new it,Or=new it,dl=new it,Br=new it;class li extends Ri{constructor(t=new cn,e=new Ac){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,s=Object.keys(e);if(s.length>0){const r=e[s[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const h=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=a}}}}getVertexPosition(t,e){const s=this.geometry,r=s.attributes.position,a=s.morphAttributes.position,o=s.morphTargetsRelative;e.fromBufferAttribute(r,t);const h=this.morphTargetInfluences;if(a&&h){Or.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const u=h[l],f=a[l];u!==0&&(Za.fromBufferAttribute(f,t),o?Or.addScaledVector(Za,u):Or.addScaledVector(Za.sub(e),u))}e.add(Or)}return e}raycast(t,e){const s=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Dr.copy(s.boundingSphere),Dr.applyMatrix4(a),fs.copy(t.ray).recast(t.near),!(Dr.containsPoint(fs.origin)===!1&&(fs.intersectSphere(Dr,fl)===null||fs.origin.distanceToSquared(fl)>(t.far-t.near)**2))&&(ul.copy(a).invert(),fs.copy(t.ray).applyMatrix4(ul),!(s.boundingBox!==null&&fs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,e,fs)))}_computeIntersections(t,e,s){let r;const a=this.geometry,o=this.material,h=a.index,l=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,f=a.attributes.normal,d=a.groups,x=a.drawRange;if(h!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const p=d[g],m=o[p.materialIndex],S=Math.max(p.start,x.start),M=Math.min(h.count,Math.min(p.start+p.count,x.start+x.count));for(let E=S,A=M;E<A;E+=3){const R=h.getX(E),C=h.getX(E+1),y=h.getX(E+2);r=kr(this,m,t,s,c,u,f,R,C,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const g=Math.max(0,x.start),v=Math.min(h.count,x.start+x.count);for(let p=g,m=v;p<m;p+=3){const S=h.getX(p),M=h.getX(p+1),E=h.getX(p+2);r=kr(this,o,t,s,c,u,f,S,M,E),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const p=d[g],m=o[p.materialIndex],S=Math.max(p.start,x.start),M=Math.min(l.count,Math.min(p.start+p.count,x.start+x.count));for(let E=S,A=M;E<A;E+=3){const R=E,C=E+1,y=E+2;r=kr(this,m,t,s,c,u,f,R,C,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const g=Math.max(0,x.start),v=Math.min(l.count,x.start+x.count);for(let p=g,m=v;p<m;p+=3){const S=p,M=p+1,E=p+2;r=kr(this,o,t,s,c,u,f,S,M,E),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}}}function Zu(n,t,e,s,r,a,o,h){let l;if(t.side===Qi?l=s.intersectTriangle(o,a,r,!0,h):l=s.intersectTriangle(r,a,o,t.side===ls,h),l===null)return null;Br.copy(h),Br.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Br);return c<e.near||c>e.far?null:{distance:c,point:Br.clone(),object:n}}function kr(n,t,e,s,r,a,o,h,l,c){n.getVertexPosition(h,Ur),n.getVertexPosition(l,zr),n.getVertexPosition(c,Fr);const u=Zu(n,t,e,s,Ur,zr,Fr,dl);if(u){const f=new it;vn.getBarycoord(dl,Ur,zr,Fr,f),r&&(u.uv=vn.getInterpolatedAttribute(r,h,l,c,f,new Fe)),a&&(u.uv1=vn.getInterpolatedAttribute(a,h,l,c,f,new Fe)),o&&(u.normal=vn.getInterpolatedAttribute(o,h,l,c,f,new it),u.normal.dot(s.direction)>0&&u.normal.multiplyScalar(-1));const d={a:h,b:l,c,normal:new it,materialIndex:0};vn.getNormal(Ur,zr,Fr,d.normal),u.face=d,u.barycoord=f}return u}class $u extends Wi{constructor(t=null,e=1,s=1,r,a,o,h,l,c=Pi,u=Pi,f,d){super(null,o,h,l,c,u,r,a,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $a=new it,Ju=new it,Qu=new Me;let xs=class{constructor(t=new it(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,s,r){return this.normal.set(t,e,s),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,s){const r=$a.subVectors(s,e).cross(Ju.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const s=t.delta($a),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return e<0&&s>0||s<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const s=e||Qu.getNormalMatrix(t),r=this.coplanarPoint($a).applyMatrix4(t),a=this.normal.applyMatrix3(s).normalize();return this.constant=-r.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}};const ds=new ma,tf=new Fe(.5,.5),Vr=new it;class Fh{constructor(t=new xs,e=new xs,s=new xs,r=new xs,a=new xs,o=new xs){this.planes=[t,e,s,r,a,o]}set(t,e,s,r,a,o){const h=this.planes;return h[0].copy(t),h[1].copy(e),h[2].copy(s),h[3].copy(r),h[4].copy(a),h[5].copy(o),this}copy(t){const e=this.planes;for(let s=0;s<6;s++)e[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,e=zn,s=!1){const r=this.planes,a=t.elements,o=a[0],h=a[1],l=a[2],c=a[3],u=a[4],f=a[5],d=a[6],x=a[7],g=a[8],v=a[9],p=a[10],m=a[11],S=a[12],M=a[13],E=a[14],A=a[15];if(r[0].setComponents(c-o,x-u,m-g,A-S).normalize(),r[1].setComponents(c+o,x+u,m+g,A+S).normalize(),r[2].setComponents(c+h,x+f,m+v,A+M).normalize(),r[3].setComponents(c-h,x-f,m-v,A-M).normalize(),s)r[4].setComponents(l,d,p,E).normalize(),r[5].setComponents(c-l,x-d,m-p,A-E).normalize();else if(r[4].setComponents(c-l,x-d,m-p,A-E).normalize(),e===zn)r[5].setComponents(c+l,x+d,m+p,A+E).normalize();else if(e===gr)r[5].setComponents(l,d,p,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(t){ds.center.set(0,0,0);const e=tf.distanceTo(t.center);return ds.radius=.7071067811865476+e,ds.applyMatrix4(t.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(t){const e=this.planes,s=t.center,r=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(s)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let s=0;s<6;s++){const r=e[s];if(Vr.x=r.normal.x>0?t.max.x:t.min.x,Vr.y=r.normal.y>0?t.max.y:t.min.y,Vr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Vr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let s=0;s<6;s++)if(e[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Rc extends Js{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const pl=new ci,th=new wc,Gr=new ma,Hr=new it;class ef extends Ri{constructor(t=new cn,e=new Rc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const s=this.geometry,r=this.matrixWorld,a=t.params.Points.threshold,o=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Gr.copy(s.boundingSphere),Gr.applyMatrix4(r),Gr.radius+=a,t.ray.intersectsSphere(Gr)===!1)return;pl.copy(r).invert(),th.copy(t.ray).applyMatrix4(pl);const h=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=h*h,c=s.index,f=s.attributes.position;if(c!==null){const d=Math.max(0,o.start),x=Math.min(c.count,o.start+o.count);for(let g=d,v=x;g<v;g++){const p=c.getX(g);Hr.fromBufferAttribute(f,p),ml(Hr,p,l,r,t,e,this)}}else{const d=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let g=d,v=x;g<v;g++)Hr.fromBufferAttribute(f,g),ml(Hr,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,s=Object.keys(e);if(s.length>0){const r=e[s[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const h=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=a}}}}}function ml(n,t,e,s,r,a,o){const h=th.distanceSqToPoint(n);if(h<e){const l=new it;th.closestPointToPoint(n,l),l.applyMatrix4(s);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;a.push({distance:c,distanceToRay:Math.sqrt(h),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Cc extends Wi{constructor(t=[],e=Es,s,r,a,o,h,l,c,u){super(t,e,s,r,a,o,h,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class vr extends Wi{constructor(t,e,s=Bn,r,a,o,h=Pi,l=Pi,c,u=ts,f=1){if(u!==ts&&u!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:f};super(d,r,a,o,h,l,u,s,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Uh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class nf extends vr{constructor(t,e=Bn,s=Es,r,a,o=Pi,h=Pi,l,c=ts){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,s,r,a,o,h,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Pc extends Wi{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class rn extends cn{constructor(t=1,e=1,s=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:s,widthSegments:r,heightSegments:a,depthSegments:o};const h=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const l=[],c=[],u=[],f=[];let d=0,x=0;g("z","y","x",-1,-1,s,e,t,o,a,0),g("z","y","x",1,-1,s,e,-t,o,a,1),g("x","z","y",1,1,t,s,e,r,o,2),g("x","z","y",1,-1,t,s,-e,r,o,3),g("x","y","z",1,-1,t,e,s,r,a,4),g("x","y","z",-1,-1,t,e,-s,r,a,5),this.setIndex(l),this.setAttribute("position",new ln(c,3)),this.setAttribute("normal",new ln(u,3)),this.setAttribute("uv",new ln(f,2));function g(v,p,m,S,M,E,A,R,C,y,b){const D=E/C,w=A/y,N=E/2,I=A/2,L=R/2,k=C+1,G=y+1;let U=0,K=0;const at=new it;for(let Y=0;Y<G;Y++){const ut=Y*w-I;for(let Q=0;Q<k;Q++){const mt=Q*D-N;at[v]=mt*S,at[p]=ut*M,at[m]=L,c.push(at.x,at.y,at.z),at[v]=0,at[p]=0,at[m]=R>0?1:-1,u.push(at.x,at.y,at.z),f.push(Q/C),f.push(1-Y/y),U+=1}}for(let Y=0;Y<y;Y++)for(let ut=0;ut<C;ut++){const Q=d+ut+k*Y,mt=d+ut+k*(Y+1),Vt=d+(ut+1)+k*(Y+1),Yt=d+(ut+1)+k*Y;l.push(Q,mt,Yt),l.push(mt,Vt,Yt),K+=6}h.addGroup(x,K,b),x+=K,d+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Mr extends cn{constructor(t=1,e=1,s=1,r=32,a=1,o=!1,h=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:s,radialSegments:r,heightSegments:a,openEnded:o,thetaStart:h,thetaLength:l};const c=this;r=Math.floor(r),a=Math.floor(a);const u=[],f=[],d=[],x=[];let g=0;const v=[],p=s/2;let m=0;S(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new ln(f,3)),this.setAttribute("normal",new ln(d,3)),this.setAttribute("uv",new ln(x,2));function S(){const E=new it,A=new it;let R=0;const C=(e-t)/s;for(let y=0;y<=a;y++){const b=[],D=y/a,w=D*(e-t)+t;for(let N=0;N<=r;N++){const I=N/r,L=I*l+h,k=Math.sin(L),G=Math.cos(L);A.x=w*k,A.y=-D*s+p,A.z=w*G,f.push(A.x,A.y,A.z),E.set(k,C,G).normalize(),d.push(E.x,E.y,E.z),x.push(I,1-D),b.push(g++)}v.push(b)}for(let y=0;y<r;y++)for(let b=0;b<a;b++){const D=v[b][y],w=v[b+1][y],N=v[b+1][y+1],I=v[b][y+1];(t>0||b!==0)&&(u.push(D,w,I),R+=3),(e>0||b!==a-1)&&(u.push(w,N,I),R+=3)}c.addGroup(m,R,0),m+=R}function M(E){const A=g,R=new Fe,C=new it;let y=0;const b=E===!0?t:e,D=E===!0?1:-1;for(let N=1;N<=r;N++)f.push(0,p*D,0),d.push(0,D,0),x.push(.5,.5),g++;const w=g;for(let N=0;N<=r;N++){const L=N/r*l+h,k=Math.cos(L),G=Math.sin(L);C.x=b*G,C.y=p*D,C.z=b*k,f.push(C.x,C.y,C.z),d.push(0,D,0),R.x=k*.5+.5,R.y=G*.5*D+.5,x.push(R.x,R.y),g++}for(let N=0;N<r;N++){const I=A+N,L=w+N;E===!0?u.push(L,L+1,I):u.push(L+1,L,I),y+=3}c.addGroup(m,y,E===!0?1:2),m+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Oh extends Mr{constructor(t=1,e=1,s=32,r=1,a=!1,o=0,h=Math.PI*2){super(0,t,e,s,r,a,o,h),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:h}}static fromJSON(t){return new Oh(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Sr extends cn{constructor(t=1,e=1,s=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:s,heightSegments:r};const a=t/2,o=e/2,h=Math.floor(s),l=Math.floor(r),c=h+1,u=l+1,f=t/h,d=e/l,x=[],g=[],v=[],p=[];for(let m=0;m<u;m++){const S=m*d-o;for(let M=0;M<c;M++){const E=M*f-a;g.push(E,-S,0),v.push(0,0,1),p.push(M/h),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<h;S++){const M=S+c*m,E=S+c*(m+1),A=S+1+c*(m+1),R=S+1+c*m;x.push(M,E,R),x.push(E,A,R)}this.setIndex(x),this.setAttribute("position",new ln(g,3)),this.setAttribute("normal",new ln(v,3)),this.setAttribute("uv",new ln(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sr(t.width,t.height,t.widthSegments,t.heightSegments)}}function Ks(n){const t={};for(const e in n){t[e]={};for(const s in n[e]){const r=n[e][s];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][s]=null):t[e][s]=r.clone():Array.isArray(r)?t[e][s]=r.slice():t[e][s]=r}}return t}function Hi(n){const t={};for(let e=0;e<n.length;e++){const s=Ks(n[e]);for(const r in s)t[r]=s[r]}return t}function sf(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Nc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ue.workingColorSpace}const rf={clone:Ks,merge:Hi};var af=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,of=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends Js{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=af,this.fragmentShader=of,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ks(t.uniforms),this.uniformsGroups=sf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const s={};for(const r in this.extensions)this.extensions[r]===!0&&(s[r]=!0);return Object.keys(s).length>0&&(e.extensions=s),e}}class hf extends Vn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class gn extends Js{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_c,this.normalScale=new Fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class lf extends Js{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_u,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class cf extends Js{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Bh extends Ri{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class uf extends Bh{constructor(t,e,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ri.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ja=new ci,xl=new it,gl=new it;class ff{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Fe(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new ci,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fh,this._frameExtents=new Fe(1,1),this._viewportCount=1,this._viewports=[new fi(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,s=this.matrix;xl.setFromMatrixPosition(t.matrixWorld),e.position.copy(xl),gl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(gl),e.updateMatrixWorld(),Ja.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ja,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===gr||e.reversedDepth?s.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Ja)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Wr=new it,Xr=new $s,Nn=new it;class Ic extends Ri{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ci,this.projectionMatrix=new ci,this.projectionMatrixInverse=new ci,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Wr,Xr,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wr,Xr,Nn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(Wr,Xr,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wr,Xr,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const as=new it,vl=new Fe,_l=new Fe;class hn extends Ic{constructor(t=50,e=1,s=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Qo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ra*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qo*2*Math.atan(Math.tan(Ra*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,s){as.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(as.x,as.y).multiplyScalar(-t/as.z),as.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(as.x,as.y).multiplyScalar(-t/as.z)}getViewSize(t,e){return this.getViewBounds(t,vl,_l),e.subVectors(_l,vl)}setViewOffset(t,e,s,r,a,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=s,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ra*.5*this.fov)/this.zoom,s=2*e,r=this.aspect*s,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;a+=o.offsetX*r/l,e-=o.offsetY*s/c,r*=o.width/l,s*=o.height/c}const h=this.filmOffset;h!==0&&(a+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,e,e-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class kh extends Ic{constructor(t=-1,e=1,s=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=s,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,s,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=s,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=s-t,o=s+t,h=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,h-=u*this.view.offsetY,l=h-u*this.view.height}this.projectionMatrix.makeOrthographic(a,o,h,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class df extends ff{constructor(){super(new kh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pf extends Bh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ri.DEFAULT_UP),this.updateMatrix(),this.target=new Ri,this.shadow=new df}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class mf extends Bh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Os=-90,Bs=1;class xf extends Ri{constructor(t,e,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new hn(Os,Bs,t,e);r.layers=this.layers,this.add(r);const a=new hn(Os,Bs,t,e);a.layers=this.layers,this.add(a);const o=new hn(Os,Bs,t,e);o.layers=this.layers,this.add(o);const h=new hn(Os,Bs,t,e);h.layers=this.layers,this.add(h);const l=new hn(Os,Bs,t,e);l.layers=this.layers,this.add(l);const c=new hn(Os,Bs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[s,r,a,o,h,l]=e;for(const c of e)this.remove(c);if(t===zn)s.up.set(0,1,0),s.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===gr)s.up.set(0,-1,0),s.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,o,h,l,c,u]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(s,0,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(s,1,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(s,2,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(s,3,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(s,4,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),s.texture.generateMipmaps=v,t.setRenderTarget(s,5,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,d,x),t.xr.enabled=g,s.texture.needsPMREMUpdate=!0}}class gf extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function yl(n,t,e,s){const r=vf(s);switch(e){case xc:return n*t;case vc:return n*t/r.components*r.byteLength;case Ph:return n*t/r.components*r.byteLength;case Ys:return n*t*2/r.components*r.byteLength;case Nh:return n*t*2/r.components*r.byteLength;case gc:return n*t*3/r.components*r.byteLength;case _n:return n*t*4/r.components*r.byteLength;case Ih:return n*t*4/r.components*r.byteLength;case ta:case ea:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ia:case na:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case So:case Eo:return Math.max(n,16)*Math.max(t,8)/4;case Mo:case bo:return Math.max(n,8)*Math.max(t,8)/2;case To:case wo:case Ro:case Co:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ao:case Po:case No:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Io:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Lo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Do:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case zo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Fo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Oo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Bo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ko:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Vo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Go:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ho:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Wo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Xo:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case qo:case Yo:case jo:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Ko:case Zo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case $o:case Jo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vf(n){switch(n){case an:case fc:return{byteLength:1,components:1};case mr:case dc:case Qn:return{byteLength:2,components:1};case Rh:case Ch:return{byteLength:2,components:4};case Bn:case Ah:case Un:return{byteLength:4,components:1};case pc:case mc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Lc(){let n=null,t=!1,e=null,s=null;function r(a,o){e(a,o),s=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(s=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){n=a}}}function _f(n){const t=new WeakMap;function e(h,l){const c=h.array,u=h.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),h.onUploadCallback();let x;if(c instanceof Float32Array)x=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)x=n.HALF_FLOAT;else if(c instanceof Uint16Array)h.isFloat16BufferAttribute?x=n.HALF_FLOAT:x=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)x=n.SHORT;else if(c instanceof Uint32Array)x=n.UNSIGNED_INT;else if(c instanceof Int32Array)x=n.INT;else if(c instanceof Int8Array)x=n.BYTE;else if(c instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:x,bytesPerElement:c.BYTES_PER_ELEMENT,version:h.version,size:f}}function s(h,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,h),f.length===0)n.bufferSubData(c,0,u);else{f.sort((x,g)=>x.start-g.start);let d=0;for(let x=1;x<f.length;x++){const g=f[d],v=f[x];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,f[d]=v)}f.length=d+1;for(let x=0,g=f.length;x<g;x++){const v=f[x];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function a(h){h.isInterleavedBufferAttribute&&(h=h.data);const l=t.get(h);l&&(n.deleteBuffer(l.buffer),t.delete(h))}function o(h,l){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const u=t.get(h);(!u||u.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const c=t.get(h);if(c===void 0)t.set(h,e(h,l));else if(c.version<h.version){if(c.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(c.buffer,h,l),c.version=h.version}}return{get:r,remove:a,update:o}}var yf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Sf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ef=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Af=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Cf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,If=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Lf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Df=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Uf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,kf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Vf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Hf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Xf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,qf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zf="gl_FragColor = linearToOutputTexel( gl_FragColor );",$f=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Qf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,td=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,id=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,nd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ad=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,od=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ld=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ud=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,fd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,dd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,md=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_d=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,yd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Md=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ed=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Td=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ad=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Cd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Id=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ld=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ud=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Od=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Kd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$d=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ep=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,sp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ap=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,op=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,up=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,pp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,vp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _p=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ap=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Rp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Np=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ip=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Dp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Op=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Vp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Wp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$p=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ee={alphahash_fragment:yf,alphahash_pars_fragment:Mf,alphamap_fragment:Sf,alphamap_pars_fragment:bf,alphatest_fragment:Ef,alphatest_pars_fragment:Tf,aomap_fragment:wf,aomap_pars_fragment:Af,batching_pars_vertex:Rf,batching_vertex:Cf,begin_vertex:Pf,beginnormal_vertex:Nf,bsdfs:If,iridescence_fragment:Lf,bumpmap_pars_fragment:Df,clipping_planes_fragment:Uf,clipping_planes_pars_fragment:zf,clipping_planes_pars_vertex:Ff,clipping_planes_vertex:Of,color_fragment:Bf,color_pars_fragment:kf,color_pars_vertex:Vf,color_vertex:Gf,common:Hf,cube_uv_reflection_fragment:Wf,defaultnormal_vertex:Xf,displacementmap_pars_vertex:qf,displacementmap_vertex:Yf,emissivemap_fragment:jf,emissivemap_pars_fragment:Kf,colorspace_fragment:Zf,colorspace_pars_fragment:$f,envmap_fragment:Jf,envmap_common_pars_fragment:Qf,envmap_pars_fragment:td,envmap_pars_vertex:ed,envmap_physical_pars_fragment:fd,envmap_vertex:id,fog_vertex:nd,fog_pars_vertex:sd,fog_fragment:rd,fog_pars_fragment:ad,gradientmap_pars_fragment:od,lightmap_pars_fragment:hd,lights_lambert_fragment:ld,lights_lambert_pars_fragment:cd,lights_pars_begin:ud,lights_toon_fragment:dd,lights_toon_pars_fragment:pd,lights_phong_fragment:md,lights_phong_pars_fragment:xd,lights_physical_fragment:gd,lights_physical_pars_fragment:vd,lights_fragment_begin:_d,lights_fragment_maps:yd,lights_fragment_end:Md,logdepthbuf_fragment:Sd,logdepthbuf_pars_fragment:bd,logdepthbuf_pars_vertex:Ed,logdepthbuf_vertex:Td,map_fragment:wd,map_pars_fragment:Ad,map_particle_fragment:Rd,map_particle_pars_fragment:Cd,metalnessmap_fragment:Pd,metalnessmap_pars_fragment:Nd,morphinstance_vertex:Id,morphcolor_vertex:Ld,morphnormal_vertex:Dd,morphtarget_pars_vertex:Ud,morphtarget_vertex:zd,normal_fragment_begin:Fd,normal_fragment_maps:Od,normal_pars_fragment:Bd,normal_pars_vertex:kd,normal_vertex:Vd,normalmap_pars_fragment:Gd,clearcoat_normal_fragment_begin:Hd,clearcoat_normal_fragment_maps:Wd,clearcoat_pars_fragment:Xd,iridescence_pars_fragment:qd,opaque_fragment:Yd,packing:jd,premultiplied_alpha_fragment:Kd,project_vertex:Zd,dithering_fragment:$d,dithering_pars_fragment:Jd,roughnessmap_fragment:Qd,roughnessmap_pars_fragment:tp,shadowmap_pars_fragment:ep,shadowmap_pars_vertex:ip,shadowmap_vertex:np,shadowmask_pars_fragment:sp,skinbase_vertex:rp,skinning_pars_vertex:ap,skinning_vertex:op,skinnormal_vertex:hp,specularmap_fragment:lp,specularmap_pars_fragment:cp,tonemapping_fragment:up,tonemapping_pars_fragment:fp,transmission_fragment:dp,transmission_pars_fragment:pp,uv_pars_fragment:mp,uv_pars_vertex:xp,uv_vertex:gp,worldpos_vertex:vp,background_vert:_p,background_frag:yp,backgroundCube_vert:Mp,backgroundCube_frag:Sp,cube_vert:bp,cube_frag:Ep,depth_vert:Tp,depth_frag:wp,distance_vert:Ap,distance_frag:Rp,equirect_vert:Cp,equirect_frag:Pp,linedashed_vert:Np,linedashed_frag:Ip,meshbasic_vert:Lp,meshbasic_frag:Dp,meshlambert_vert:Up,meshlambert_frag:zp,meshmatcap_vert:Fp,meshmatcap_frag:Op,meshnormal_vert:Bp,meshnormal_frag:kp,meshphong_vert:Vp,meshphong_frag:Gp,meshphysical_vert:Hp,meshphysical_frag:Wp,meshtoon_vert:Xp,meshtoon_frag:qp,points_vert:Yp,points_frag:jp,shadow_vert:Kp,shadow_frag:Zp,sprite_vert:$p,sprite_frag:Jp},Wt={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Me},alphaMap:{value:null},alphaMapTransform:{value:new Me},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Me}},envmap:{envMap:{value:null},envMapRotation:{value:new Me},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Me}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Me}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Me},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Me},normalScale:{value:new Fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Me},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Me}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Me}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Me}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Me},alphaTest:{value:0},uvTransform:{value:new Me}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new Fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Me},alphaMap:{value:null},alphaMapTransform:{value:new Me},alphaTest:{value:0}}},Ln={basic:{uniforms:Hi([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.fog]),vertexShader:Ee.meshbasic_vert,fragmentShader:Ee.meshbasic_frag},lambert:{uniforms:Hi([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,Wt.lights,{emissive:{value:new Ne(0)},envMapIntensity:{value:1}}]),vertexShader:Ee.meshlambert_vert,fragmentShader:Ee.meshlambert_frag},phong:{uniforms:Hi([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,Wt.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ee.meshphong_vert,fragmentShader:Ee.meshphong_frag},standard:{uniforms:Hi([Wt.common,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.roughnessmap,Wt.metalnessmap,Wt.fog,Wt.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ee.meshphysical_vert,fragmentShader:Ee.meshphysical_frag},toon:{uniforms:Hi([Wt.common,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.gradientmap,Wt.fog,Wt.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Ee.meshtoon_vert,fragmentShader:Ee.meshtoon_frag},matcap:{uniforms:Hi([Wt.common,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,{matcap:{value:null}}]),vertexShader:Ee.meshmatcap_vert,fragmentShader:Ee.meshmatcap_frag},points:{uniforms:Hi([Wt.points,Wt.fog]),vertexShader:Ee.points_vert,fragmentShader:Ee.points_frag},dashed:{uniforms:Hi([Wt.common,Wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ee.linedashed_vert,fragmentShader:Ee.linedashed_frag},depth:{uniforms:Hi([Wt.common,Wt.displacementmap]),vertexShader:Ee.depth_vert,fragmentShader:Ee.depth_frag},normal:{uniforms:Hi([Wt.common,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,{opacity:{value:1}}]),vertexShader:Ee.meshnormal_vert,fragmentShader:Ee.meshnormal_frag},sprite:{uniforms:Hi([Wt.sprite,Wt.fog]),vertexShader:Ee.sprite_vert,fragmentShader:Ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Me},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ee.background_vert,fragmentShader:Ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Me}},vertexShader:Ee.backgroundCube_vert,fragmentShader:Ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ee.cube_vert,fragmentShader:Ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ee.equirect_vert,fragmentShader:Ee.equirect_frag},distance:{uniforms:Hi([Wt.common,Wt.displacementmap,{referencePosition:{value:new it},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ee.distance_vert,fragmentShader:Ee.distance_frag},shadow:{uniforms:Hi([Wt.lights,Wt.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Ee.shadow_vert,fragmentShader:Ee.shadow_frag}};Ln.physical={uniforms:Hi([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Me},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Me},clearcoatNormalScale:{value:new Fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Me},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Me},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Me},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Me},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Me},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Me},transmissionSamplerSize:{value:new Fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Me},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Me},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Me},anisotropyVector:{value:new Fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Me}}]),vertexShader:Ee.meshphysical_vert,fragmentShader:Ee.meshphysical_frag};const qr={r:0,b:0,g:0},ps=new kn,Qp=new ci;function tm(n,t,e,s,r,a){const o=new Ne(0);let h=r===!0?0:1,l,c,u=null,f=0,d=null;function x(S){let M=S.isScene===!0?S.background:null;if(M&&M.isTexture){const E=S.backgroundBlurriness>0;M=t.get(M,E)}return M}function g(S){let M=!1;const E=x(S);E===null?p(o,h):E&&E.isColor&&(p(E,1),M=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(S,M){const E=x(M);E&&(E.isCubeTexture||E.mapping===pa)?(c===void 0&&(c=new li(new rn(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Ks(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),ps.copy(M.backgroundRotation),ps.x*=-1,ps.y*=-1,ps.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),c.material.uniforms.envMap.value=E,c.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Qp.makeRotationFromEuler(ps)),c.material.toneMapped=Ue.getTransfer(E.colorSpace)!==Ge,(u!==E||f!==E.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,f=E.version,d=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new li(new Sr(2,2),new Vn({name:"BackgroundMaterial",uniforms:Ks(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:ls,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Ue.getTransfer(E.colorSpace)!==Ge,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||f!==E.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=E,f=E.version,d=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,M){S.getRGB(qr,Nc(n)),e.buffers.color.setClear(qr.r,qr.g,qr.b,M,a)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,M=1){o.set(S),h=M,p(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(S){h=S,p(o,h)},render:g,addToRenderList:v,dispose:m}}function em(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),s={},r=d(null);let a=r,o=!1;function h(w,N,I,L,k){let G=!1;const U=f(w,L,I,N);a!==U&&(a=U,c(a.object)),G=x(w,L,I,k),G&&g(w,L,I,k),k!==null&&t.update(k,n.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,E(w,N,I,L),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return n.createVertexArray()}function c(w){return n.bindVertexArray(w)}function u(w){return n.deleteVertexArray(w)}function f(w,N,I,L){const k=L.wireframe===!0;let G=s[N.id];G===void 0&&(G={},s[N.id]=G);const U=w.isInstancedMesh===!0?w.id:0;let K=G[U];K===void 0&&(K={},G[U]=K);let at=K[I.id];at===void 0&&(at={},K[I.id]=at);let Y=at[k];return Y===void 0&&(Y=d(l()),at[k]=Y),Y}function d(w){const N=[],I=[],L=[];for(let k=0;k<e;k++)N[k]=0,I[k]=0,L[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:I,attributeDivisors:L,object:w,attributes:{},index:null}}function x(w,N,I,L){const k=a.attributes,G=N.attributes;let U=0;const K=I.getAttributes();for(const at in K)if(K[at].location>=0){const ut=k[at];let Q=G[at];if(Q===void 0&&(at==="instanceMatrix"&&w.instanceMatrix&&(Q=w.instanceMatrix),at==="instanceColor"&&w.instanceColor&&(Q=w.instanceColor)),ut===void 0||ut.attribute!==Q||Q&&ut.data!==Q.data)return!0;U++}return a.attributesNum!==U||a.index!==L}function g(w,N,I,L){const k={},G=N.attributes;let U=0;const K=I.getAttributes();for(const at in K)if(K[at].location>=0){let ut=G[at];ut===void 0&&(at==="instanceMatrix"&&w.instanceMatrix&&(ut=w.instanceMatrix),at==="instanceColor"&&w.instanceColor&&(ut=w.instanceColor));const Q={};Q.attribute=ut,ut&&ut.data&&(Q.data=ut.data),k[at]=Q,U++}a.attributes=k,a.attributesNum=U,a.index=L}function v(){const w=a.newAttributes;for(let N=0,I=w.length;N<I;N++)w[N]=0}function p(w){m(w,0)}function m(w,N){const I=a.newAttributes,L=a.enabledAttributes,k=a.attributeDivisors;I[w]=1,L[w]===0&&(n.enableVertexAttribArray(w),L[w]=1),k[w]!==N&&(n.vertexAttribDivisor(w,N),k[w]=N)}function S(){const w=a.newAttributes,N=a.enabledAttributes;for(let I=0,L=N.length;I<L;I++)N[I]!==w[I]&&(n.disableVertexAttribArray(I),N[I]=0)}function M(w,N,I,L,k,G,U){U===!0?n.vertexAttribIPointer(w,N,I,k,G):n.vertexAttribPointer(w,N,I,L,k,G)}function E(w,N,I,L){v();const k=L.attributes,G=I.getAttributes(),U=N.defaultAttributeValues;for(const K in G){const at=G[K];if(at.location>=0){let Y=k[K];if(Y===void 0&&(K==="instanceMatrix"&&w.instanceMatrix&&(Y=w.instanceMatrix),K==="instanceColor"&&w.instanceColor&&(Y=w.instanceColor)),Y!==void 0){const ut=Y.normalized,Q=Y.itemSize,mt=t.get(Y);if(mt===void 0)continue;const Vt=mt.buffer,Yt=mt.type,nt=mt.bytesPerElement,$=Yt===n.INT||Yt===n.UNSIGNED_INT||Y.gpuType===Ah;if(Y.isInterleavedBufferAttribute){const O=Y.data,X=O.stride,H=Y.offset;if(O.isInstancedInterleavedBuffer){for(let tt=0;tt<at.locationSize;tt++)m(at.location+tt,O.meshPerAttribute);w.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let tt=0;tt<at.locationSize;tt++)p(at.location+tt);n.bindBuffer(n.ARRAY_BUFFER,Vt);for(let tt=0;tt<at.locationSize;tt++)M(at.location+tt,Q/at.locationSize,Yt,ut,X*nt,(H+Q/at.locationSize*tt)*nt,$)}else{if(Y.isInstancedBufferAttribute){for(let O=0;O<at.locationSize;O++)m(at.location+O,Y.meshPerAttribute);w.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let O=0;O<at.locationSize;O++)p(at.location+O);n.bindBuffer(n.ARRAY_BUFFER,Vt);for(let O=0;O<at.locationSize;O++)M(at.location+O,Q/at.locationSize,Yt,ut,Q*nt,Q/at.locationSize*O*nt,$)}}else if(U!==void 0){const ut=U[K];if(ut!==void 0)switch(ut.length){case 2:n.vertexAttrib2fv(at.location,ut);break;case 3:n.vertexAttrib3fv(at.location,ut);break;case 4:n.vertexAttrib4fv(at.location,ut);break;default:n.vertexAttrib1fv(at.location,ut)}}}}S()}function A(){b();for(const w in s){const N=s[w];for(const I in N){const L=N[I];for(const k in L){const G=L[k];for(const U in G)u(G[U].object),delete G[U];delete L[k]}}delete s[w]}}function R(w){if(s[w.id]===void 0)return;const N=s[w.id];for(const I in N){const L=N[I];for(const k in L){const G=L[k];for(const U in G)u(G[U].object),delete G[U];delete L[k]}}delete s[w.id]}function C(w){for(const N in s){const I=s[N];for(const L in I){const k=I[L];if(k[w.id]===void 0)continue;const G=k[w.id];for(const U in G)u(G[U].object),delete G[U];delete k[w.id]}}}function y(w){for(const N in s){const I=s[N],L=w.isInstancedMesh===!0?w.id:0,k=I[L];if(k!==void 0){for(const G in k){const U=k[G];for(const K in U)u(U[K].object),delete U[K];delete k[G]}delete I[L],Object.keys(I).length===0&&delete s[N]}}}function b(){D(),o=!0,a!==r&&(a=r,c(a.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:h,reset:b,resetDefaultState:D,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:p,disableUnusedAttributes:S}}function im(n,t,e){let s;function r(c){s=c}function a(c,u){n.drawArrays(s,c,u),e.update(u,s,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(s,c,u,f),e.update(u,s,f))}function h(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,c,0,u,0,f);let x=0;for(let g=0;g<f;g++)x+=u[g];e.update(x,s,1)}function l(c,u,f,d){if(f===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let g=0;g<c.length;g++)o(c[g],u[g],d[g]);else{x.multiDrawArraysInstancedWEBGL(s,c,0,u,0,d,0,f);let g=0;for(let v=0;v<f;v++)g+=u[v]*d[v];e.update(g,s,1)}}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=h,this.renderMultiDrawInstances=l}function nm(n,t,e,s){let r;function a(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==_n&&s.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(C){const y=C===Qn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==an&&s.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Un&&!y)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(ge("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),x=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),R=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:h,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:x,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:E,maxSamples:A,samples:R}}function sm(n){const t=this;let e=null,s=0,r=!1,a=!1;const o=new xs,h=new Me,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const x=f.length!==0||d||s!==0||r;return r=d,s=f.length,x},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,d){e=u(f,d,0)},this.setState=function(f,d,x){const g=f.clippingPlanes,v=f.clipIntersection,p=f.clipShadows,m=n.get(f);if(!r||g===null||g.length===0||a&&!p)a?u(null):c();else{const S=a?0:s,M=S*4;let E=m.clippingState||null;l.value=E,E=u(g,d,M,x);for(let A=0;A!==M;++A)E[A]=e[A];m.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function u(f,d,x,g){const v=f!==null?f.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const m=x+v*4,S=d.matrixWorldInverse;h.getNormalMatrix(S),(p===null||p.length<m)&&(p=new Float32Array(m));for(let M=0,E=x;M!==v;++M,E+=4)o.copy(f[M]).applyMatrix4(S,h),o.normal.toArray(p,E),p[E+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}const hs=4,Ml=[.125,.215,.35,.446,.526,.582],ys=20,rm=256,hr=new kh,Sl=new Ne;let Qa=null,to=0,eo=0,io=!1;const am=new it;class bl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,s=.1,r=100,a={}){const{size:o=256,position:h=am}=a;Qa=this._renderer.getRenderTarget(),to=this._renderer.getActiveCubeFace(),eo=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,s,r,l,h),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Qa,to,eo),this._renderer.xr.enabled=io,t.scissorTest=!1,ks(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Es||t.mapping===qs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qa=this._renderer.getRenderTarget(),to=this._renderer.getActiveCubeFace(),eo=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=e||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,s={magFilter:zi,minFilter:zi,generateMipmaps:!1,type:Qn,format:_n,colorSpace:js,depthBuffer:!1},r=El(t,e,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=El(t,e,s);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=om(a)),this._blurMaterial=lm(a,t,e),this._ggxMaterial=hm(a,t,e)}return r}_compileMaterial(t){const e=new li(new cn,t);this._renderer.compile(e,hr)}_sceneToCubeUV(t,e,s,r,a){const l=new hn(90,1,e,s),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,x=f.toneMapping;f.getClearColor(Sl),f.toneMapping=Fn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new li(new rn,new Ac({name:"PMREM.Background",side:Qi,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,p=v.material;let m=!1;const S=t.background;S?S.isColor&&(p.color.copy(S),t.background=null,m=!0):(p.color.copy(Sl),m=!0);for(let M=0;M<6;M++){const E=M%3;E===0?(l.up.set(0,c[M],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+u[M],a.y,a.z)):E===1?(l.up.set(0,0,c[M]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+u[M],a.z)):(l.up.set(0,c[M],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+u[M]));const A=this._cubeSize;ks(r,E*A,M>2?A:0,A,A),f.setRenderTarget(r),m&&f.render(v,l),f.render(t,l)}f.toneMapping=x,f.autoClear=d,t.background=S}_textureToCubeUV(t,e){const s=this._renderer,r=t.mapping===Es||t.mapping===qs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=wl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tl());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const h=a.uniforms;h.envMap.value=t;const l=this._cubeSize;ks(e,0,0,3*l,2*l),s.setRenderTarget(e),s.render(o,hr)}_applyPMREM(t){const e=this._renderer,s=e.autoClear;e.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(t,a-1,a);e.autoClear=s}_applyGGXFilter(t,e,s){const r=this._renderer,a=this._pingPongRenderTarget,o=this._ggxMaterial,h=this._lodMeshes[s];h.material=o;const l=o.uniforms,c=s/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=0+c*1.25,x=f*d,{_lodMax:g}=this,v=this._sizeLods[s],p=3*v*(s>g-hs?s-g+hs:0),m=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=x,l.mipInt.value=g-e,ks(a,p,m,3*v,2*v),r.setRenderTarget(a),r.render(h,hr),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=g-s,ks(t,p,m,3*v,2*v),r.setRenderTarget(t),r.render(h,hr)}_blur(t,e,s,r,a){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,s,r,"latitudinal",a),this._halfBlur(o,t,s,s,r,"longitudinal",a)}_halfBlur(t,e,s,r,a,o,h){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&ze("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const d=c.uniforms,x=this._sizeLods[s]-1,g=isFinite(a)?Math.PI/(2*x):2*Math.PI/(2*ys-1),v=a/g,p=isFinite(a)?1+Math.floor(u*v):ys;p>ys&&ge(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ys}`);const m=[];let S=0;for(let C=0;C<ys;++C){const y=C/v,b=Math.exp(-y*y/2);m.push(b),C===0?S+=b:C<p&&(S+=2*b)}for(let C=0;C<m.length;C++)m[C]=m[C]/S;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",h&&(d.poleAxis.value=h);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-s;const E=this._sizeLods[r],A=3*E*(r>M-hs?r-M+hs:0),R=4*(this._cubeSize-E);ks(e,A,R,3*E,2*E),l.setRenderTarget(e),l.render(f,hr)}}function om(n){const t=[],e=[],s=[];let r=n;const a=n-hs+1+Ml.length;for(let o=0;o<a;o++){const h=Math.pow(2,r);t.push(h);let l=1/h;o>n-hs?l=Ml[o-n+hs-1]:o===0&&(l=0),e.push(l);const c=1/(h-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],x=6,g=6,v=3,p=2,m=1,S=new Float32Array(v*g*x),M=new Float32Array(p*g*x),E=new Float32Array(m*g*x);for(let R=0;R<x;R++){const C=R%3*2/3-1,y=R>2?0:-1,b=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];S.set(b,v*g*R),M.set(d,p*g*R);const D=[R,R,R,R,R,R];E.set(D,m*g*R)}const A=new cn;A.setAttribute("position",new yn(S,v)),A.setAttribute("uv",new yn(M,p)),A.setAttribute("faceIndex",new yn(E,m)),s.push(new li(A,null)),r>hs&&r--}return{lodMeshes:s,sizeLods:t,sigmas:e}}function El(n,t,e){const s=new On(n,t,e);return s.texture.mapping=pa,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function ks(n,t,e,s,r){n.viewport.set(t,e,s,r),n.scissor.set(t,e,s,r)}function hm(n,t,e){return new Vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:rm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function lm(n,t,e){const s=new Float32Array(ys),r=new it(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:ys,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Tl(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function wl(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function xa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Dc extends On{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},r=[s,s,s,s,s,s];this.texture=new Cc(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new rn(5,5,5),a=new Vn({name:"CubemapFromEquirect",uniforms:Ks(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Qi,blending:$n});a.uniforms.tEquirect.value=e;const o=new li(r,a),h=e.minFilter;return e.minFilter===Ms&&(e.minFilter=zi),new xf(1,10,this).update(t,o),e.minFilter=h,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,s=!0,r=!0){const a=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,s,r);t.setRenderTarget(a)}}function cm(n){let t=new WeakMap,e=new WeakMap,s=null;function r(d,x=!1){return d==null?null:x?o(d):a(d)}function a(d){if(d&&d.isTexture){const x=d.mapping;if(x===Ta||x===wa)if(t.has(d)){const g=t.get(d).texture;return h(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const v=new Dc(g.height);return v.fromEquirectangularTexture(n,d),t.set(d,v),d.addEventListener("dispose",c),h(v.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const x=d.mapping,g=x===Ta||x===wa,v=x===Es||x===qs;if(g||v){let p=e.get(d);const m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return s===null&&(s=new bl(n)),p=g?s.fromEquirectangular(d,p):s.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),p.texture;if(p!==void 0)return p.texture;{const S=d.image;return g&&S&&S.height>0||v&&S&&l(S)?(s===null&&(s=new bl(n)),p=g?s.fromEquirectangular(d):s.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),d.addEventListener("dispose",u),p.texture):null}}}return d}function h(d,x){return x===Ta?d.mapping=Es:x===wa&&(d.mapping=qs),d}function l(d){let x=0;const g=6;for(let v=0;v<g;v++)d[v]!==void 0&&x++;return x===g}function c(d){const x=d.target;x.removeEventListener("dispose",c);const g=t.get(x);g!==void 0&&(t.delete(x),g.dispose())}function u(d){const x=d.target;x.removeEventListener("dispose",u);const g=e.get(x);g!==void 0&&(e.delete(x),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:r,dispose:f}}function um(n){const t={};function e(s){if(t[s]!==void 0)return t[s];const r=n.getExtension(s);return t[s]=r,r}return{has:function(s){return e(s)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(s){const r=e(s);return r===null&&oa("WebGLRenderer: "+s+" extension not supported."),r}}}function fm(n,t,e,s){const r={},a=new WeakMap;function o(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete r[d.id];const x=a.get(d);x&&(t.remove(x),a.delete(d)),s.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function h(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,e.memory.geometries++),d}function l(f){const d=f.attributes;for(const x in d)t.update(d[x],n.ARRAY_BUFFER)}function c(f){const d=[],x=f.index,g=f.attributes.position;let v=0;if(g===void 0)return;if(x!==null){const S=x.array;v=x.version;for(let M=0,E=S.length;M<E;M+=3){const A=S[M+0],R=S[M+1],C=S[M+2];d.push(A,R,R,C,C,A)}}else{const S=g.array;v=g.version;for(let M=0,E=S.length/3-1;M<E;M+=3){const A=M+0,R=M+1,C=M+2;d.push(A,R,R,C,C,A)}}const p=new(g.count>=65535?Tc:Ec)(d,1);p.version=v;const m=a.get(f);m&&t.remove(m),a.set(f,p)}function u(f){const d=a.get(f);if(d){const x=f.index;x!==null&&d.version<x.version&&c(f)}else c(f);return a.get(f)}return{get:h,update:l,getWireframeAttribute:u}}function dm(n,t,e){let s;function r(d){s=d}let a,o;function h(d){a=d.type,o=d.bytesPerElement}function l(d,x){n.drawElements(s,x,a,d*o),e.update(x,s,1)}function c(d,x,g){g!==0&&(n.drawElementsInstanced(s,x,a,d*o,g),e.update(x,s,g))}function u(d,x,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,x,0,a,d,0,g);let p=0;for(let m=0;m<g;m++)p+=x[m];e.update(p,s,1)}function f(d,x,g,v){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/o,x[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(s,x,0,a,d,0,v,0,g);let m=0;for(let S=0;S<g;S++)m+=x[S]*v[S];e.update(m,s,1)}}this.setMode=r,this.setIndex=h,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function pm(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function s(a,o,h){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=h*(a/3);break;case n.LINES:e.lines+=h*(a/2);break;case n.LINE_STRIP:e.lines+=h*(a-1);break;case n.LINE_LOOP:e.lines+=h*a;break;case n.POINTS:e.points+=h*a;break;default:ze("WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:s}}function mm(n,t,e){const s=new WeakMap,r=new fi;function a(o,h,l){const c=o.morphTargetInfluences,u=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,f=u!==void 0?u.length:0;let d=s.get(h);if(d===void 0||d.count!==f){let D=function(){y.dispose(),s.delete(h),h.removeEventListener("dispose",D)};var x=D;d!==void 0&&d.texture.dispose();const g=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,p=h.morphAttributes.color!==void 0,m=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],M=h.morphAttributes.color||[];let E=0;g===!0&&(E=1),v===!0&&(E=2),p===!0&&(E=3);let A=h.attributes.position.count*E,R=1;A>t.maxTextureSize&&(R=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const C=new Float32Array(A*R*4*f),y=new Mc(C,A,R,f);y.type=Un,y.needsUpdate=!0;const b=E*4;for(let w=0;w<f;w++){const N=m[w],I=S[w],L=M[w],k=A*R*4*w;for(let G=0;G<N.count;G++){const U=G*b;g===!0&&(r.fromBufferAttribute(N,G),C[k+U+0]=r.x,C[k+U+1]=r.y,C[k+U+2]=r.z,C[k+U+3]=0),v===!0&&(r.fromBufferAttribute(I,G),C[k+U+4]=r.x,C[k+U+5]=r.y,C[k+U+6]=r.z,C[k+U+7]=0),p===!0&&(r.fromBufferAttribute(L,G),C[k+U+8]=r.x,C[k+U+9]=r.y,C[k+U+10]=r.z,C[k+U+11]=L.itemSize===4?r.w:1)}}d={count:f,texture:y,size:new Fe(A,R)},s.set(h,d),h.addEventListener("dispose",D)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const v=h.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:a}}function xm(n,t,e,s,r){let a=new WeakMap;function o(c){const u=r.render.frame,f=c.geometry,d=t.get(c,f);if(a.get(d)!==u&&(t.update(d),a.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),a.set(c,u))),c.isSkinnedMesh){const x=c.skeleton;a.get(x)!==u&&(x.update(),a.set(x,u))}return d}function h(){a=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),s.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:h}}const gm={[sc]:"LINEAR_TONE_MAPPING",[rc]:"REINHARD_TONE_MAPPING",[ac]:"CINEON_TONE_MAPPING",[oc]:"ACES_FILMIC_TONE_MAPPING",[lc]:"AGX_TONE_MAPPING",[cc]:"NEUTRAL_TONE_MAPPING",[hc]:"CUSTOM_TONE_MAPPING"};function vm(n,t,e,s,r){const a=new On(t,e,{type:n,depthBuffer:s,stencilBuffer:r}),o=new On(t,e,{type:Qn,depthBuffer:!1,stencilBuffer:!1}),h=new cn;h.setAttribute("position",new ln([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new ln([0,2,0,0,2,0],2));const l=new hf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new li(h,l),u=new kh(-1,1,1,-1,0,1);let f=null,d=null,x=!1,g,v=null,p=[],m=!1;this.setSize=function(S,M){a.setSize(S,M),o.setSize(S,M);for(let E=0;E<p.length;E++){const A=p[E];A.setSize&&A.setSize(S,M)}},this.setEffects=function(S){p=S,m=p.length>0&&p[0].isRenderPass===!0;const M=a.width,E=a.height;for(let A=0;A<p.length;A++){const R=p[A];R.setSize&&R.setSize(M,E)}},this.begin=function(S,M){if(x||S.toneMapping===Fn&&p.length===0)return!1;if(v=M,M!==null){const E=M.width,A=M.height;(a.width!==E||a.height!==A)&&this.setSize(E,A)}return m===!1&&S.setRenderTarget(a),g=S.toneMapping,S.toneMapping=Fn,!0},this.hasRenderPass=function(){return m},this.end=function(S,M){S.toneMapping=g,x=!0;let E=a,A=o;for(let R=0;R<p.length;R++){const C=p[R];if(C.enabled!==!1&&(C.render(S,A,E,M),C.needsSwap!==!1)){const y=E;E=A,A=y}}if(f!==S.outputColorSpace||d!==S.toneMapping){f=S.outputColorSpace,d=S.toneMapping,l.defines={},Ue.getTransfer(f)===Ge&&(l.defines.SRGB_TRANSFER="");const R=gm[d];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(v),S.render(c,u),v=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o.dispose(),h.dispose(),l.dispose()}}const Uc=new Wi,eh=new vr(1,1),zc=new Mc,Fc=new Fu,Oc=new Cc,Al=[],Rl=[],Cl=new Float32Array(16),Pl=new Float32Array(9),Nl=new Float32Array(4);function Qs(n,t,e){const s=n[0];if(s<=0||s>0)return n;const r=t*e;let a=Al[r];if(a===void 0&&(a=new Float32Array(r),Al[r]=a),t!==0){s.toArray(a,0);for(let o=1,h=0;o!==t;++o)h+=e,n[o].toArray(a,h)}return a}function Ei(n,t){if(n.length!==t.length)return!1;for(let e=0,s=n.length;e<s;e++)if(n[e]!==t[e])return!1;return!0}function Ti(n,t){for(let e=0,s=t.length;e<s;e++)n[e]=t[e]}function ga(n,t){let e=Rl[t];e===void 0&&(e=new Int32Array(t),Rl[t]=e);for(let s=0;s!==t;++s)e[s]=n.allocateTextureUnit();return e}function _m(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function ym(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ei(e,t))return;n.uniform2fv(this.addr,t),Ti(e,t)}}function Mm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ei(e,t))return;n.uniform3fv(this.addr,t),Ti(e,t)}}function Sm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ei(e,t))return;n.uniform4fv(this.addr,t),Ti(e,t)}}function bm(n,t){const e=this.cache,s=t.elements;if(s===void 0){if(Ei(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ti(e,t)}else{if(Ei(e,s))return;Nl.set(s),n.uniformMatrix2fv(this.addr,!1,Nl),Ti(e,s)}}function Em(n,t){const e=this.cache,s=t.elements;if(s===void 0){if(Ei(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ti(e,t)}else{if(Ei(e,s))return;Pl.set(s),n.uniformMatrix3fv(this.addr,!1,Pl),Ti(e,s)}}function Tm(n,t){const e=this.cache,s=t.elements;if(s===void 0){if(Ei(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ti(e,t)}else{if(Ei(e,s))return;Cl.set(s),n.uniformMatrix4fv(this.addr,!1,Cl),Ti(e,s)}}function wm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Am(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ei(e,t))return;n.uniform2iv(this.addr,t),Ti(e,t)}}function Rm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ei(e,t))return;n.uniform3iv(this.addr,t),Ti(e,t)}}function Cm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ei(e,t))return;n.uniform4iv(this.addr,t),Ti(e,t)}}function Pm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Nm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ei(e,t))return;n.uniform2uiv(this.addr,t),Ti(e,t)}}function Im(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ei(e,t))return;n.uniform3uiv(this.addr,t),Ti(e,t)}}function Lm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ei(e,t))return;n.uniform4uiv(this.addr,t),Ti(e,t)}}function Dm(n,t,e){const s=this.cache,r=e.allocateTextureUnit();s[0]!==r&&(n.uniform1i(this.addr,r),s[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(eh.compareFunction=e.isReversedDepthBuffer()?Dh:Lh,a=eh):a=Uc,e.setTexture2D(t||a,r)}function Um(n,t,e){const s=this.cache,r=e.allocateTextureUnit();s[0]!==r&&(n.uniform1i(this.addr,r),s[0]=r),e.setTexture3D(t||Fc,r)}function zm(n,t,e){const s=this.cache,r=e.allocateTextureUnit();s[0]!==r&&(n.uniform1i(this.addr,r),s[0]=r),e.setTextureCube(t||Oc,r)}function Fm(n,t,e){const s=this.cache,r=e.allocateTextureUnit();s[0]!==r&&(n.uniform1i(this.addr,r),s[0]=r),e.setTexture2DArray(t||zc,r)}function Om(n){switch(n){case 5126:return _m;case 35664:return ym;case 35665:return Mm;case 35666:return Sm;case 35674:return bm;case 35675:return Em;case 35676:return Tm;case 5124:case 35670:return wm;case 35667:case 35671:return Am;case 35668:case 35672:return Rm;case 35669:case 35673:return Cm;case 5125:return Pm;case 36294:return Nm;case 36295:return Im;case 36296:return Lm;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return zm;case 36289:case 36303:case 36311:case 36292:return Fm}}function Bm(n,t){n.uniform1fv(this.addr,t)}function km(n,t){const e=Qs(t,this.size,2);n.uniform2fv(this.addr,e)}function Vm(n,t){const e=Qs(t,this.size,3);n.uniform3fv(this.addr,e)}function Gm(n,t){const e=Qs(t,this.size,4);n.uniform4fv(this.addr,e)}function Hm(n,t){const e=Qs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Wm(n,t){const e=Qs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Xm(n,t){const e=Qs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function qm(n,t){n.uniform1iv(this.addr,t)}function Ym(n,t){n.uniform2iv(this.addr,t)}function jm(n,t){n.uniform3iv(this.addr,t)}function Km(n,t){n.uniform4iv(this.addr,t)}function Zm(n,t){n.uniform1uiv(this.addr,t)}function $m(n,t){n.uniform2uiv(this.addr,t)}function Jm(n,t){n.uniform3uiv(this.addr,t)}function Qm(n,t){n.uniform4uiv(this.addr,t)}function t0(n,t,e){const s=this.cache,r=t.length,a=ga(e,r);Ei(s,a)||(n.uniform1iv(this.addr,a),Ti(s,a));let o;this.type===n.SAMPLER_2D_SHADOW?o=eh:o=Uc;for(let h=0;h!==r;++h)e.setTexture2D(t[h]||o,a[h])}function e0(n,t,e){const s=this.cache,r=t.length,a=ga(e,r);Ei(s,a)||(n.uniform1iv(this.addr,a),Ti(s,a));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Fc,a[o])}function i0(n,t,e){const s=this.cache,r=t.length,a=ga(e,r);Ei(s,a)||(n.uniform1iv(this.addr,a),Ti(s,a));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Oc,a[o])}function n0(n,t,e){const s=this.cache,r=t.length,a=ga(e,r);Ei(s,a)||(n.uniform1iv(this.addr,a),Ti(s,a));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||zc,a[o])}function s0(n){switch(n){case 5126:return Bm;case 35664:return km;case 35665:return Vm;case 35666:return Gm;case 35674:return Hm;case 35675:return Wm;case 35676:return Xm;case 5124:case 35670:return qm;case 35667:case 35671:return Ym;case 35668:case 35672:return jm;case 35669:case 35673:return Km;case 5125:return Zm;case 36294:return $m;case 36295:return Jm;case 36296:return Qm;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return e0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return n0}}class r0{constructor(t,e,s){this.id=t,this.addr=s,this.cache=[],this.type=e.type,this.setValue=Om(e.type)}}class a0{constructor(t,e,s){this.id=t,this.addr=s,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=s0(e.type)}}class o0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,s){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const h=r[a];h.setValue(t,e[h.id],s)}}}const no=/(\w+)(\])?(\[|\.)?/g;function Il(n,t){n.seq.push(t),n.map[t.id]=t}function h0(n,t,e){const s=n.name,r=s.length;for(no.lastIndex=0;;){const a=no.exec(s),o=no.lastIndex;let h=a[1];const l=a[2]==="]",c=a[3];if(l&&(h=h|0),c===void 0||c==="["&&o+2===r){Il(e,c===void 0?new r0(h,n,t):new a0(h,n,t));break}else{let f=e.map[h];f===void 0&&(f=new o0(h),Il(e,f)),e=f}}}class sa{constructor(t,e){this.seq=[],this.map={};const s=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<s;++o){const h=t.getActiveUniform(e,o),l=t.getUniformLocation(e,h.name);h0(h,l,this)}const r=[],a=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(o):a.push(o);r.length>0&&(this.seq=r.concat(a))}setValue(t,e,s,r){const a=this.map[e];a!==void 0&&a.setValue(t,s,r)}setOptional(t,e,s){const r=e[s];r!==void 0&&this.setValue(t,s,r)}static upload(t,e,s,r){for(let a=0,o=e.length;a!==o;++a){const h=e[a],l=s[h.id];l.needsUpdate!==!1&&h.setValue(t,l.value,r)}}static seqWithValue(t,e){const s=[];for(let r=0,a=t.length;r!==a;++r){const o=t[r];o.id in e&&s.push(o)}return s}}function Ll(n,t,e){const s=n.createShader(t);return n.shaderSource(s,e),n.compileShader(s),s}const l0=37297;let c0=0;function u0(n,t){const e=n.split(`
`),s=[],r=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let o=r;o<a;o++){const h=o+1;s.push(`${h===t?">":" "} ${h}: ${e[o]}`)}return s.join(`
`)}const Dl=new Me;function f0(n){Ue._getMatrix(Dl,Ue.workingColorSpace,n);const t=`mat3( ${Dl.elements.map(e=>e.toFixed(4))} )`;switch(Ue.getTransfer(n)){case ra:return[t,"LinearTransferOETF"];case Ge:return[t,"sRGBTransferOETF"];default:return ge("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Ul(n,t,e){const s=n.getShaderParameter(t,n.COMPILE_STATUS),a=(n.getShaderInfoLog(t)||"").trim();if(s&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const h=parseInt(o[1]);return e.toUpperCase()+`

`+a+`

`+u0(n.getShaderSource(t),h)}else return a}function d0(n,t){const e=f0(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const p0={[sc]:"Linear",[rc]:"Reinhard",[ac]:"Cineon",[oc]:"ACESFilmic",[lc]:"AgX",[cc]:"Neutral",[hc]:"Custom"};function m0(n,t){const e=p0[t];return e===void 0?(ge("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Yr=new it;function x0(){Ue.getLuminanceCoefficients(Yr);const n=Yr.x.toFixed(4),t=Yr.y.toFixed(4),e=Yr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function g0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fr).join(`
`)}function v0(n){const t=[];for(const e in n){const s=n[e];s!==!1&&t.push("#define "+e+" "+s)}return t.join(`
`)}function _0(n,t){const e={},s=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<s;r++){const a=n.getActiveAttrib(t,r),o=a.name;let h=1;a.type===n.FLOAT_MAT2&&(h=2),a.type===n.FLOAT_MAT3&&(h=3),a.type===n.FLOAT_MAT4&&(h=4),e[o]={type:a.type,location:n.getAttribLocation(t,o),locationSize:h}}return e}function fr(n){return n!==""}function zl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const y0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ih(n){return n.replace(y0,S0)}const M0=new Map;function S0(n,t){let e=Ee[t];if(e===void 0){const s=M0.get(t);if(s!==void 0)e=Ee[s],ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return ih(e)}const b0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ol(n){return n.replace(b0,E0)}function E0(n,t,e,s){let r="";for(let a=parseInt(t);a<parseInt(e);a++)r+=s.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Bl(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const T0={[Qr]:"SHADOWMAP_TYPE_PCF",[ur]:"SHADOWMAP_TYPE_VSM"};function w0(n){return T0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const A0={[Es]:"ENVMAP_TYPE_CUBE",[qs]:"ENVMAP_TYPE_CUBE",[pa]:"ENVMAP_TYPE_CUBE_UV"};function R0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":A0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const C0={[qs]:"ENVMAP_MODE_REFRACTION"};function P0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":C0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const N0={[nc]:"ENVMAP_BLENDING_MULTIPLY",[xu]:"ENVMAP_BLENDING_MIX",[gu]:"ENVMAP_BLENDING_ADD"};function I0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":N0[n.combine]||"ENVMAP_BLENDING_NONE"}function L0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:s,maxMip:e}}function D0(n,t,e,s){const r=n.getContext(),a=e.defines;let o=e.vertexShader,h=e.fragmentShader;const l=w0(e),c=R0(e),u=P0(e),f=I0(e),d=L0(e),x=g0(e),g=v0(a),v=r.createProgram();let p,m,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fr).join(`
`),m.length>0&&(m+=`
`)):(p=[Bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fr).join(`
`),m=[Bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Fn?"#define TONE_MAPPING":"",e.toneMapping!==Fn?Ee.tonemapping_pars_fragment:"",e.toneMapping!==Fn?m0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ee.colorspace_pars_fragment,d0("linearToOutputTexel",e.outputColorSpace),x0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fr).join(`
`)),o=ih(o),o=zl(o,e),o=Fl(o,e),h=ih(h),h=zl(h,e),h=Fl(h,e),o=Ol(o),h=Ol(h),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===$h?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$h?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=S+p+o,E=S+m+h,A=Ll(r,r.VERTEX_SHADER,M),R=Ll(r,r.FRAGMENT_SHADER,E);r.attachShader(v,A),r.attachShader(v,R),e.index0AttributeName!==void 0?r.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function C(w){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(v)||"",I=r.getShaderInfoLog(A)||"",L=r.getShaderInfoLog(R)||"",k=N.trim(),G=I.trim(),U=L.trim();let K=!0,at=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,A,R);else{const Y=Ul(r,A,"vertex"),ut=Ul(r,R,"fragment");ze("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+k+`
`+Y+`
`+ut)}else k!==""?ge("WebGLProgram: Program Info Log:",k):(G===""||U==="")&&(at=!1);at&&(w.diagnostics={runnable:K,programLog:k,vertexShader:{log:G,prefix:p},fragmentShader:{log:U,prefix:m}})}r.deleteShader(A),r.deleteShader(R),y=new sa(r,v),b=_0(r,v)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let D=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(v,l0)),D},this.destroy=function(){s.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=c0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=R,this}let U0=0;class z0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,s=t.fragmentShader,r=this._getShaderStage(e),a=this._getShaderStage(s),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const s of e)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let s=e.get(t);return s===void 0&&(s=new Set,e.set(t,s)),s}_getShaderStage(t){const e=this.shaderCache;let s=e.get(t);return s===void 0&&(s=new F0(t),e.set(t,s)),s}}class F0{constructor(t){this.id=U0++,this.code=t,this.usedTimes=0}}function O0(n,t,e,s,r,a){const o=new Sc,h=new z0,l=new Set,c=[],u=new Map,f=s.logarithmicDepthBuffer;let d=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function v(y,b,D,w,N){const I=w.fog,L=N.geometry,k=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?w.environment:null,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,U=t.get(y.envMap||k,G),K=U&&U.mapping===pa?U.image.height:null,at=x[y.type];y.precision!==null&&(d=s.getMaxPrecision(y.precision),d!==y.precision&&ge("WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const Y=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,ut=Y!==void 0?Y.length:0;let Q=0;L.morphAttributes.position!==void 0&&(Q=1),L.morphAttributes.normal!==void 0&&(Q=2),L.morphAttributes.color!==void 0&&(Q=3);let mt,Vt,Yt,nt;if(at){const te=Ln[at];mt=te.vertexShader,Vt=te.fragmentShader}else mt=y.vertexShader,Vt=y.fragmentShader,h.update(y),Yt=h.getVertexShaderID(y),nt=h.getFragmentShaderID(y);const $=n.getRenderTarget(),O=n.state.buffers.depth.getReversed(),X=N.isInstancedMesh===!0,H=N.isBatchedMesh===!0,tt=!!y.map,xt=!!y.matcap,Ut=!!U,Lt=!!y.aoMap,zt=!!y.lightMap,It=!!y.bumpMap,Jt=!!y.normalMap,z=!!y.displacementMap,kt=!!y.emissiveMap,_t=!!y.metalnessMap,Ct=!!y.roughnessMap,pt=y.anisotropy>0,P=y.clearcoat>0,_=y.dispersion>0,B=y.iridescence>0,st=y.sheen>0,ft=y.transmission>0,ht=pt&&!!y.anisotropyMap,gt=P&&!!y.clearcoatMap,lt=P&&!!y.clearcoatNormalMap,St=P&&!!y.clearcoatRoughnessMap,Gt=B&&!!y.iridescenceMap,Mt=B&&!!y.iridescenceThicknessMap,At=st&&!!y.sheenColorMap,Nt=st&&!!y.sheenRoughnessMap,bt=!!y.specularMap,vt=!!y.specularColorMap,Pt=!!y.specularIntensityMap,F=ft&&!!y.transmissionMap,Rt=ft&&!!y.thicknessMap,dt=!!y.gradientMap,ot=!!y.alphaMap,q=y.alphaTest>0,W=!!y.alphaHash,Et=!!y.extensions;let Xt=Fn;y.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Xt=n.toneMapping);const Zt={shaderID:at,shaderType:y.type,shaderName:y.name,vertexShader:mt,fragmentShader:Vt,defines:y.defines,customVertexShaderID:Yt,customFragmentShaderID:nt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:H,batchingColor:H&&N._colorsTexture!==null,instancing:X,instancingColor:X&&N.instanceColor!==null,instancingMorph:X&&N.morphTexture!==null,outputColorSpace:$===null?n.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:js,alphaToCoverage:!!y.alphaToCoverage,map:tt,matcap:xt,envMap:Ut,envMapMode:Ut&&U.mapping,envMapCubeUVHeight:K,aoMap:Lt,lightMap:zt,bumpMap:It,normalMap:Jt,displacementMap:z,emissiveMap:kt,normalMapObjectSpace:Jt&&y.normalMapType===yu,normalMapTangentSpace:Jt&&y.normalMapType===_c,metalnessMap:_t,roughnessMap:Ct,anisotropy:pt,anisotropyMap:ht,clearcoat:P,clearcoatMap:gt,clearcoatNormalMap:lt,clearcoatRoughnessMap:St,dispersion:_,iridescence:B,iridescenceMap:Gt,iridescenceThicknessMap:Mt,sheen:st,sheenColorMap:At,sheenRoughnessMap:Nt,specularMap:bt,specularColorMap:vt,specularIntensityMap:Pt,transmission:ft,transmissionMap:F,thicknessMap:Rt,gradientMap:dt,opaque:y.transparent===!1&&y.blending===Hs&&y.alphaToCoverage===!1,alphaMap:ot,alphaTest:q,alphaHash:W,combine:y.combine,mapUv:tt&&g(y.map.channel),aoMapUv:Lt&&g(y.aoMap.channel),lightMapUv:zt&&g(y.lightMap.channel),bumpMapUv:It&&g(y.bumpMap.channel),normalMapUv:Jt&&g(y.normalMap.channel),displacementMapUv:z&&g(y.displacementMap.channel),emissiveMapUv:kt&&g(y.emissiveMap.channel),metalnessMapUv:_t&&g(y.metalnessMap.channel),roughnessMapUv:Ct&&g(y.roughnessMap.channel),anisotropyMapUv:ht&&g(y.anisotropyMap.channel),clearcoatMapUv:gt&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:lt&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:St&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Gt&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Mt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:At&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&g(y.sheenRoughnessMap.channel),specularMapUv:bt&&g(y.specularMap.channel),specularColorMapUv:vt&&g(y.specularColorMap.channel),specularIntensityMapUv:Pt&&g(y.specularIntensityMap.channel),transmissionMapUv:F&&g(y.transmissionMap.channel),thicknessMapUv:Rt&&g(y.thicknessMap.channel),alphaMapUv:ot&&g(y.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Jt||pt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!L.attributes.uv&&(tt||ot),fog:!!I,useFog:y.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||L.attributes.normal===void 0&&Jt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:O,skinning:N.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:Q,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Xt,decodeVideoTexture:tt&&y.map.isVideoTexture===!0&&Ue.getTransfer(y.map.colorSpace)===Ge,decodeVideoTextureEmissive:kt&&y.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(y.emissiveMap.colorSpace)===Ge,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Dn,flipSided:y.side===Qi,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Et&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&y.extensions.multiDraw===!0||H)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Zt.vertexUv1s=l.has(1),Zt.vertexUv2s=l.has(2),Zt.vertexUv3s=l.has(3),l.clear(),Zt}function p(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)b.push(D),b.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(m(b,y),S(b,y),b.push(n.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function m(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function S(y,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),y.push(o.mask)}function M(y){const b=x[y.type];let D;if(b){const w=Ln[b];D=rf.clone(w.uniforms)}else D=y.uniforms;return D}function E(y,b){let D=u.get(b);return D!==void 0?++D.usedTimes:(D=new D0(n,b,y,r),c.push(D),u.set(b,D)),D}function A(y){if(--y.usedTimes===0){const b=c.indexOf(y);c[b]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function R(y){h.remove(y)}function C(){h.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:M,acquireProgram:E,releaseProgram:A,releaseShaderCache:R,programs:c,dispose:C}}function B0(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let h=n.get(o);return h===void 0&&(h={},n.set(o,h)),h}function s(o){n.delete(o)}function r(o,h,l){n.get(o)[h]=l}function a(){n=new WeakMap}return{has:t,get:e,remove:s,update:r,dispose:a}}function k0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function kl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Vl(){const n=[];let t=0;const e=[],s=[],r=[];function a(){t=0,e.length=0,s.length=0,r.length=0}function o(d){let x=0;return d.isInstancedMesh&&(x+=2),d.isSkinnedMesh&&(x+=1),x}function h(d,x,g,v,p,m){let S=n[t];return S===void 0?(S={id:d.id,object:d,geometry:x,material:g,materialVariant:o(d),groupOrder:v,renderOrder:d.renderOrder,z:p,group:m},n[t]=S):(S.id=d.id,S.object=d,S.geometry=x,S.material=g,S.materialVariant=o(d),S.groupOrder=v,S.renderOrder=d.renderOrder,S.z=p,S.group=m),t++,S}function l(d,x,g,v,p,m){const S=h(d,x,g,v,p,m);g.transmission>0?s.push(S):g.transparent===!0?r.push(S):e.push(S)}function c(d,x,g,v,p,m){const S=h(d,x,g,v,p,m);g.transmission>0?s.unshift(S):g.transparent===!0?r.unshift(S):e.unshift(S)}function u(d,x){e.length>1&&e.sort(d||k0),s.length>1&&s.sort(x||kl),r.length>1&&r.sort(x||kl)}function f(){for(let d=t,x=n.length;d<x;d++){const g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:s,transparent:r,init:a,push:l,unshift:c,finish:f,sort:u}}function V0(){let n=new WeakMap;function t(s,r){const a=n.get(s);let o;return a===void 0?(o=new Vl,n.set(s,[o])):r>=a.length?(o=new Vl,a.push(o)):o=a[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function G0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new it,color:new Ne};break;case"SpotLight":e={position:new it,direction:new it,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new it,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":e={direction:new it,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":e={color:new Ne,position:new it,halfWidth:new it,halfHeight:new it};break}return n[t.id]=e,e}}}function H0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let W0=0;function X0(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function q0(n){const t=new G0,e=H0(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)s.probe.push(new it);const r=new it,a=new ci,o=new ci;function h(c){let u=0,f=0,d=0;for(let b=0;b<9;b++)s.probe[b].set(0,0,0);let x=0,g=0,v=0,p=0,m=0,S=0,M=0,E=0,A=0,R=0,C=0;c.sort(X0);for(let b=0,D=c.length;b<D;b++){const w=c[b],N=w.color,I=w.intensity,L=w.distance;let k=null;if(w.shadow&&w.shadow.map&&(w.shadow.map.texture.format===Ys?k=w.shadow.map.texture:k=w.shadow.map.depthTexture||w.shadow.map.texture),w.isAmbientLight)u+=N.r*I,f+=N.g*I,d+=N.b*I;else if(w.isLightProbe){for(let G=0;G<9;G++)s.probe[G].addScaledVector(w.sh.coefficients[G],I);C++}else if(w.isDirectionalLight){const G=t.get(w);if(G.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const U=w.shadow,K=e.get(w);K.shadowIntensity=U.intensity,K.shadowBias=U.bias,K.shadowNormalBias=U.normalBias,K.shadowRadius=U.radius,K.shadowMapSize=U.mapSize,s.directionalShadow[x]=K,s.directionalShadowMap[x]=k,s.directionalShadowMatrix[x]=w.shadow.matrix,S++}s.directional[x]=G,x++}else if(w.isSpotLight){const G=t.get(w);G.position.setFromMatrixPosition(w.matrixWorld),G.color.copy(N).multiplyScalar(I),G.distance=L,G.coneCos=Math.cos(w.angle),G.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),G.decay=w.decay,s.spot[v]=G;const U=w.shadow;if(w.map&&(s.spotLightMap[A]=w.map,A++,U.updateMatrices(w),w.castShadow&&R++),s.spotLightMatrix[v]=U.matrix,w.castShadow){const K=e.get(w);K.shadowIntensity=U.intensity,K.shadowBias=U.bias,K.shadowNormalBias=U.normalBias,K.shadowRadius=U.radius,K.shadowMapSize=U.mapSize,s.spotShadow[v]=K,s.spotShadowMap[v]=k,E++}v++}else if(w.isRectAreaLight){const G=t.get(w);G.color.copy(N).multiplyScalar(I),G.halfWidth.set(w.width*.5,0,0),G.halfHeight.set(0,w.height*.5,0),s.rectArea[p]=G,p++}else if(w.isPointLight){const G=t.get(w);if(G.color.copy(w.color).multiplyScalar(w.intensity),G.distance=w.distance,G.decay=w.decay,w.castShadow){const U=w.shadow,K=e.get(w);K.shadowIntensity=U.intensity,K.shadowBias=U.bias,K.shadowNormalBias=U.normalBias,K.shadowRadius=U.radius,K.shadowMapSize=U.mapSize,K.shadowCameraNear=U.camera.near,K.shadowCameraFar=U.camera.far,s.pointShadow[g]=K,s.pointShadowMap[g]=k,s.pointShadowMatrix[g]=w.shadow.matrix,M++}s.point[g]=G,g++}else if(w.isHemisphereLight){const G=t.get(w);G.skyColor.copy(w.color).multiplyScalar(I),G.groundColor.copy(w.groundColor).multiplyScalar(I),s.hemi[m]=G,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Wt.LTC_FLOAT_1,s.rectAreaLTC2=Wt.LTC_FLOAT_2):(s.rectAreaLTC1=Wt.LTC_HALF_1,s.rectAreaLTC2=Wt.LTC_HALF_2)),s.ambient[0]=u,s.ambient[1]=f,s.ambient[2]=d;const y=s.hash;(y.directionalLength!==x||y.pointLength!==g||y.spotLength!==v||y.rectAreaLength!==p||y.hemiLength!==m||y.numDirectionalShadows!==S||y.numPointShadows!==M||y.numSpotShadows!==E||y.numSpotMaps!==A||y.numLightProbes!==C)&&(s.directional.length=x,s.spot.length=v,s.rectArea.length=p,s.point.length=g,s.hemi.length=m,s.directionalShadow.length=S,s.directionalShadowMap.length=S,s.pointShadow.length=M,s.pointShadowMap.length=M,s.spotShadow.length=E,s.spotShadowMap.length=E,s.directionalShadowMatrix.length=S,s.pointShadowMatrix.length=M,s.spotLightMatrix.length=E+A-R,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=R,s.numLightProbes=C,y.directionalLength=x,y.pointLength=g,y.spotLength=v,y.rectAreaLength=p,y.hemiLength=m,y.numDirectionalShadows=S,y.numPointShadows=M,y.numSpotShadows=E,y.numSpotMaps=A,y.numLightProbes=C,s.version=W0++)}function l(c,u){let f=0,d=0,x=0,g=0,v=0;const p=u.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){const M=c[m];if(M.isDirectionalLight){const E=s.directional[f];E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),f++}else if(M.isSpotLight){const E=s.spot[x];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),x++}else if(M.isRectAreaLight){const E=s.rectArea[g];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),o.identity(),a.copy(M.matrixWorld),a.premultiply(p),o.extractRotation(a),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const E=s.point[d];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){const E=s.hemi[v];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(p),v++}}}return{setup:h,setupView:l,state:s}}function Gl(n){const t=new q0(n),e=[],s=[];function r(u){c.camera=u,e.length=0,s.length=0}function a(u){e.push(u)}function o(u){s.push(u)}function h(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:h,setupLightsView:l,pushLight:a,pushShadow:o}}function Y0(n){let t=new WeakMap;function e(r,a=0){const o=t.get(r);let h;return o===void 0?(h=new Gl(n),t.set(r,[h])):a>=o.length?(h=new Gl(n),o.push(h)):h=o[a],h}function s(){t=new WeakMap}return{get:e,dispose:s}}const j0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,K0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Z0=[new it(1,0,0),new it(-1,0,0),new it(0,1,0),new it(0,-1,0),new it(0,0,1),new it(0,0,-1)],$0=[new it(0,-1,0),new it(0,-1,0),new it(0,0,1),new it(0,0,-1),new it(0,-1,0),new it(0,-1,0)],Hl=new ci,lr=new it,so=new it;function J0(n,t,e){let s=new Fh;const r=new Fe,a=new Fe,o=new fi,h=new lf,l=new cf,c={},u=e.maxTextureSize,f={[ls]:Qi,[Qi]:ls,[Dn]:Dn},d=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Fe},radius:{value:4}},vertexShader:j0,fragmentShader:K0}),x=d.clone();x.defines.HORIZONTAL_PASS=1;const g=new cn;g.setAttribute("position",new yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new li(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qr;let m=this.type;this.render=function(R,C,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;this.type===ic&&(ge("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Qr);const b=n.getRenderTarget(),D=n.getActiveCubeFace(),w=n.getActiveMipmapLevel(),N=n.state;N.setBlending($n),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const I=m!==this.type;I&&C.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(k=>k.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,k=R.length;L<k;L++){const G=R[L],U=G.shadow;if(U===void 0){ge("WebGLShadowMap:",G,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const K=U.getFrameExtents();r.multiply(K),a.copy(U.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/K.x),r.x=a.x*K.x,U.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/K.y),r.y=a.y*K.y,U.mapSize.y=a.y));const at=n.state.buffers.depth.getReversed();if(U.camera._reversedDepth=at,U.map===null||I===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===ur){if(G.isPointLight){ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new On(r.x,r.y,{format:Ys,type:Qn,minFilter:zi,magFilter:zi,generateMipmaps:!1}),U.map.texture.name=G.name+".shadowMap",U.map.depthTexture=new vr(r.x,r.y,Un),U.map.depthTexture.name=G.name+".shadowMapDepth",U.map.depthTexture.format=ts,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Pi,U.map.depthTexture.magFilter=Pi}else G.isPointLight?(U.map=new Dc(r.x),U.map.depthTexture=new nf(r.x,Bn)):(U.map=new On(r.x,r.y),U.map.depthTexture=new vr(r.x,r.y,Bn)),U.map.depthTexture.name=G.name+".shadowMap",U.map.depthTexture.format=ts,this.type===Qr?(U.map.depthTexture.compareFunction=at?Dh:Lh,U.map.depthTexture.minFilter=zi,U.map.depthTexture.magFilter=zi):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Pi,U.map.depthTexture.magFilter=Pi);U.camera.updateProjectionMatrix()}const Y=U.map.isWebGLCubeRenderTarget?6:1;for(let ut=0;ut<Y;ut++){if(U.map.isWebGLCubeRenderTarget)n.setRenderTarget(U.map,ut),n.clear();else{ut===0&&(n.setRenderTarget(U.map),n.clear());const Q=U.getViewport(ut);o.set(a.x*Q.x,a.y*Q.y,a.x*Q.z,a.y*Q.w),N.viewport(o)}if(G.isPointLight){const Q=U.camera,mt=U.matrix,Vt=G.distance||Q.far;Vt!==Q.far&&(Q.far=Vt,Q.updateProjectionMatrix()),lr.setFromMatrixPosition(G.matrixWorld),Q.position.copy(lr),so.copy(Q.position),so.add(Z0[ut]),Q.up.copy($0[ut]),Q.lookAt(so),Q.updateMatrixWorld(),mt.makeTranslation(-lr.x,-lr.y,-lr.z),Hl.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),U._frustum.setFromProjectionMatrix(Hl,Q.coordinateSystem,Q.reversedDepth)}else U.updateMatrices(G);s=U.getFrustum(),E(C,y,U.camera,G,this.type)}U.isPointLightShadow!==!0&&this.type===ur&&S(U,y),U.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(b,D,w)};function S(R,C){const y=t.update(v);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,x.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,x.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new On(r.x,r.y,{format:Ys,type:Qn})),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(C,null,y,d,v,null),x.uniforms.shadow_pass.value=R.mapPass.texture,x.uniforms.resolution.value=R.mapSize,x.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(C,null,y,x,v,null)}function M(R,C,y,b){let D=null;const w=y.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(w!==void 0)D=w;else if(D=y.isPointLight===!0?l:h,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=D.uuid,I=C.uuid;let L=c[N];L===void 0&&(L={},c[N]=L);let k=L[I];k===void 0&&(k=D.clone(),L[I]=k,C.addEventListener("dispose",A)),D=k}if(D.visible=C.visible,D.wireframe=C.wireframe,b===ur?D.side=C.shadowSide!==null?C.shadowSide:C.side:D.side=C.shadowSide!==null?C.shadowSide:f[C.side],D.alphaMap=C.alphaMap,D.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,D.map=C.map,D.clipShadows=C.clipShadows,D.clippingPlanes=C.clippingPlanes,D.clipIntersection=C.clipIntersection,D.displacementMap=C.displacementMap,D.displacementScale=C.displacementScale,D.displacementBias=C.displacementBias,D.wireframeLinewidth=C.wireframeLinewidth,D.linewidth=C.linewidth,y.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const N=n.properties.get(D);N.light=y}return D}function E(R,C,y,b,D){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&D===ur)&&(!R.frustumCulled||s.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,R.matrixWorld);const I=t.update(R),L=R.material;if(Array.isArray(L)){const k=I.groups;for(let G=0,U=k.length;G<U;G++){const K=k[G],at=L[K.materialIndex];if(at&&at.visible){const Y=M(R,at,b,D);R.onBeforeShadow(n,R,C,y,I,Y,K),n.renderBufferDirect(y,null,I,Y,R,K),R.onAfterShadow(n,R,C,y,I,Y,K)}}}else if(L.visible){const k=M(R,L,b,D);R.onBeforeShadow(n,R,C,y,I,k,null),n.renderBufferDirect(y,null,I,k,R,null),R.onAfterShadow(n,R,C,y,I,k,null)}}const N=R.children;for(let I=0,L=N.length;I<L;I++)E(N[I],C,y,b,D)}function A(R){R.target.removeEventListener("dispose",A);for(const y in c){const b=c[y],D=R.target.uuid;D in b&&(b[D].dispose(),delete b[D])}}}function Q0(n,t){function e(){let F=!1;const Rt=new fi;let dt=null;const ot=new fi(0,0,0,0);return{setMask:function(q){dt!==q&&!F&&(n.colorMask(q,q,q,q),dt=q)},setLocked:function(q){F=q},setClear:function(q,W,Et,Xt,Zt){Zt===!0&&(q*=Xt,W*=Xt,Et*=Xt),Rt.set(q,W,Et,Xt),ot.equals(Rt)===!1&&(n.clearColor(q,W,Et,Xt),ot.copy(Rt))},reset:function(){F=!1,dt=null,ot.set(-1,0,0,0)}}}function s(){let F=!1,Rt=!1,dt=null,ot=null,q=null;return{setReversed:function(W){if(Rt!==W){const Et=t.get("EXT_clip_control");W?Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.ZERO_TO_ONE_EXT):Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.NEGATIVE_ONE_TO_ONE_EXT),Rt=W;const Xt=q;q=null,this.setClear(Xt)}},getReversed:function(){return Rt},setTest:function(W){W?$(n.DEPTH_TEST):O(n.DEPTH_TEST)},setMask:function(W){dt!==W&&!F&&(n.depthMask(W),dt=W)},setFunc:function(W){if(Rt&&(W=Pu[W]),ot!==W){switch(W){case uo:n.depthFunc(n.NEVER);break;case fo:n.depthFunc(n.ALWAYS);break;case po:n.depthFunc(n.LESS);break;case Xs:n.depthFunc(n.LEQUAL);break;case mo:n.depthFunc(n.EQUAL);break;case xo:n.depthFunc(n.GEQUAL);break;case go:n.depthFunc(n.GREATER);break;case vo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ot=W}},setLocked:function(W){F=W},setClear:function(W){q!==W&&(q=W,Rt&&(W=1-W),n.clearDepth(W))},reset:function(){F=!1,dt=null,ot=null,q=null,Rt=!1}}}function r(){let F=!1,Rt=null,dt=null,ot=null,q=null,W=null,Et=null,Xt=null,Zt=null;return{setTest:function(te){F||(te?$(n.STENCIL_TEST):O(n.STENCIL_TEST))},setMask:function(te){Rt!==te&&!F&&(n.stencilMask(te),Rt=te)},setFunc:function(te,_e,He){(dt!==te||ot!==_e||q!==He)&&(n.stencilFunc(te,_e,He),dt=te,ot=_e,q=He)},setOp:function(te,_e,He){(W!==te||Et!==_e||Xt!==He)&&(n.stencilOp(te,_e,He),W=te,Et=_e,Xt=He)},setLocked:function(te){F=te},setClear:function(te){Zt!==te&&(n.clearStencil(te),Zt=te)},reset:function(){F=!1,Rt=null,dt=null,ot=null,q=null,W=null,Et=null,Xt=null,Zt=null}}}const a=new e,o=new s,h=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d=new WeakMap,x=[],g=null,v=!1,p=null,m=null,S=null,M=null,E=null,A=null,R=null,C=new Ne(0,0,0),y=0,b=!1,D=null,w=null,N=null,I=null,L=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,U=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(K)[1]),G=U>=1):K.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),G=U>=2);let at=null,Y={};const ut=n.getParameter(n.SCISSOR_BOX),Q=n.getParameter(n.VIEWPORT),mt=new fi().fromArray(ut),Vt=new fi().fromArray(Q);function Yt(F,Rt,dt,ot){const q=new Uint8Array(4),W=n.createTexture();n.bindTexture(F,W),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Et=0;Et<dt;Et++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(Rt,0,n.RGBA,1,1,ot,0,n.RGBA,n.UNSIGNED_BYTE,q):n.texImage2D(Rt+Et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,q);return W}const nt={};nt[n.TEXTURE_2D]=Yt(n.TEXTURE_2D,n.TEXTURE_2D,1),nt[n.TEXTURE_CUBE_MAP]=Yt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[n.TEXTURE_2D_ARRAY]=Yt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),nt[n.TEXTURE_3D]=Yt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),h.setClear(0),$(n.DEPTH_TEST),o.setFunc(Xs),It(!1),Jt(Xh),$(n.CULL_FACE),Lt($n);function $(F){u[F]!==!0&&(n.enable(F),u[F]=!0)}function O(F){u[F]!==!1&&(n.disable(F),u[F]=!1)}function X(F,Rt){return f[F]!==Rt?(n.bindFramebuffer(F,Rt),f[F]=Rt,F===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Rt),F===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Rt),!0):!1}function H(F,Rt){let dt=x,ot=!1;if(F){dt=d.get(Rt),dt===void 0&&(dt=[],d.set(Rt,dt));const q=F.textures;if(dt.length!==q.length||dt[0]!==n.COLOR_ATTACHMENT0){for(let W=0,Et=q.length;W<Et;W++)dt[W]=n.COLOR_ATTACHMENT0+W;dt.length=q.length,ot=!0}}else dt[0]!==n.BACK&&(dt[0]=n.BACK,ot=!0);ot&&n.drawBuffers(dt)}function tt(F){return g!==F?(n.useProgram(F),g=F,!0):!1}const xt={[_s]:n.FUNC_ADD,[Qc]:n.FUNC_SUBTRACT,[tu]:n.FUNC_REVERSE_SUBTRACT};xt[eu]=n.MIN,xt[iu]=n.MAX;const Ut={[nu]:n.ZERO,[su]:n.ONE,[ru]:n.SRC_COLOR,[lo]:n.SRC_ALPHA,[uu]:n.SRC_ALPHA_SATURATE,[lu]:n.DST_COLOR,[ou]:n.DST_ALPHA,[au]:n.ONE_MINUS_SRC_COLOR,[co]:n.ONE_MINUS_SRC_ALPHA,[cu]:n.ONE_MINUS_DST_COLOR,[hu]:n.ONE_MINUS_DST_ALPHA,[fu]:n.CONSTANT_COLOR,[du]:n.ONE_MINUS_CONSTANT_COLOR,[pu]:n.CONSTANT_ALPHA,[mu]:n.ONE_MINUS_CONSTANT_ALPHA};function Lt(F,Rt,dt,ot,q,W,Et,Xt,Zt,te){if(F===$n){v===!0&&(O(n.BLEND),v=!1);return}if(v===!1&&($(n.BLEND),v=!0),F!==Jc){if(F!==p||te!==b){if((m!==_s||E!==_s)&&(n.blendEquation(n.FUNC_ADD),m=_s,E=_s),te)switch(F){case Hs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qh:n.blendFunc(n.ONE,n.ONE);break;case Yh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case jh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ze("WebGLState: Invalid blending: ",F);break}else switch(F){case Hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qh:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Yh:ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case jh:ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ze("WebGLState: Invalid blending: ",F);break}S=null,M=null,A=null,R=null,C.set(0,0,0),y=0,p=F,b=te}return}q=q||Rt,W=W||dt,Et=Et||ot,(Rt!==m||q!==E)&&(n.blendEquationSeparate(xt[Rt],xt[q]),m=Rt,E=q),(dt!==S||ot!==M||W!==A||Et!==R)&&(n.blendFuncSeparate(Ut[dt],Ut[ot],Ut[W],Ut[Et]),S=dt,M=ot,A=W,R=Et),(Xt.equals(C)===!1||Zt!==y)&&(n.blendColor(Xt.r,Xt.g,Xt.b,Zt),C.copy(Xt),y=Zt),p=F,b=!1}function zt(F,Rt){F.side===Dn?O(n.CULL_FACE):$(n.CULL_FACE);let dt=F.side===Qi;Rt&&(dt=!dt),It(dt),F.blending===Hs&&F.transparent===!1?Lt($n):Lt(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),a.setMask(F.colorWrite);const ot=F.stencilWrite;h.setTest(ot),ot&&(h.setMask(F.stencilWriteMask),h.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),h.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),kt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?$(n.SAMPLE_ALPHA_TO_COVERAGE):O(n.SAMPLE_ALPHA_TO_COVERAGE)}function It(F){D!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),D=F)}function Jt(F){F!==Zc?($(n.CULL_FACE),F!==w&&(F===Xh?n.cullFace(n.BACK):F===$c?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):O(n.CULL_FACE),w=F}function z(F){F!==N&&(G&&n.lineWidth(F),N=F)}function kt(F,Rt,dt){F?($(n.POLYGON_OFFSET_FILL),(I!==Rt||L!==dt)&&(I=Rt,L=dt,o.getReversed()&&(Rt=-Rt),n.polygonOffset(Rt,dt))):O(n.POLYGON_OFFSET_FILL)}function _t(F){F?$(n.SCISSOR_TEST):O(n.SCISSOR_TEST)}function Ct(F){F===void 0&&(F=n.TEXTURE0+k-1),at!==F&&(n.activeTexture(F),at=F)}function pt(F,Rt,dt){dt===void 0&&(at===null?dt=n.TEXTURE0+k-1:dt=at);let ot=Y[dt];ot===void 0&&(ot={type:void 0,texture:void 0},Y[dt]=ot),(ot.type!==F||ot.texture!==Rt)&&(at!==dt&&(n.activeTexture(dt),at=dt),n.bindTexture(F,Rt||nt[F]),ot.type=F,ot.texture=Rt)}function P(){const F=Y[at];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(F){ze("WebGLState:",F)}}function B(){try{n.compressedTexImage3D(...arguments)}catch(F){ze("WebGLState:",F)}}function st(){try{n.texSubImage2D(...arguments)}catch(F){ze("WebGLState:",F)}}function ft(){try{n.texSubImage3D(...arguments)}catch(F){ze("WebGLState:",F)}}function ht(){try{n.compressedTexSubImage2D(...arguments)}catch(F){ze("WebGLState:",F)}}function gt(){try{n.compressedTexSubImage3D(...arguments)}catch(F){ze("WebGLState:",F)}}function lt(){try{n.texStorage2D(...arguments)}catch(F){ze("WebGLState:",F)}}function St(){try{n.texStorage3D(...arguments)}catch(F){ze("WebGLState:",F)}}function Gt(){try{n.texImage2D(...arguments)}catch(F){ze("WebGLState:",F)}}function Mt(){try{n.texImage3D(...arguments)}catch(F){ze("WebGLState:",F)}}function At(F){mt.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),mt.copy(F))}function Nt(F){Vt.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Vt.copy(F))}function bt(F,Rt){let dt=c.get(Rt);dt===void 0&&(dt=new WeakMap,c.set(Rt,dt));let ot=dt.get(F);ot===void 0&&(ot=n.getUniformBlockIndex(Rt,F.name),dt.set(F,ot))}function vt(F,Rt){const ot=c.get(Rt).get(F);l.get(Rt)!==ot&&(n.uniformBlockBinding(Rt,ot,F.__bindingPointIndex),l.set(Rt,ot))}function Pt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},at=null,Y={},f={},d=new WeakMap,x=[],g=null,v=!1,p=null,m=null,S=null,M=null,E=null,A=null,R=null,C=new Ne(0,0,0),y=0,b=!1,D=null,w=null,N=null,I=null,L=null,mt.set(0,0,n.canvas.width,n.canvas.height),Vt.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),h.reset()}return{buffers:{color:a,depth:o,stencil:h},enable:$,disable:O,bindFramebuffer:X,drawBuffers:H,useProgram:tt,setBlending:Lt,setMaterial:zt,setFlipSided:It,setCullFace:Jt,setLineWidth:z,setPolygonOffset:kt,setScissorTest:_t,activeTexture:Ct,bindTexture:pt,unbindTexture:P,compressedTexImage2D:_,compressedTexImage3D:B,texImage2D:Gt,texImage3D:Mt,updateUBOMapping:bt,uniformBlockBinding:vt,texStorage2D:lt,texStorage3D:St,texSubImage2D:st,texSubImage3D:ft,compressedTexSubImage2D:ht,compressedTexSubImage3D:gt,scissor:At,viewport:Nt,reset:Pt}}function tx(n,t,e,s,r,a,o){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Fe,u=new WeakMap;let f;const d=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,_){return x?new OffscreenCanvas(P,_):aa("canvas")}function v(P,_,B){let st=1;const ft=pt(P);if((ft.width>B||ft.height>B)&&(st=B/Math.max(ft.width,ft.height)),st<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ht=Math.floor(st*ft.width),gt=Math.floor(st*ft.height);f===void 0&&(f=g(ht,gt));const lt=_?g(ht,gt):f;return lt.width=ht,lt.height=gt,lt.getContext("2d").drawImage(P,0,0,ht,gt),ge("WebGLRenderer: Texture has been resized from ("+ft.width+"x"+ft.height+") to ("+ht+"x"+gt+")."),lt}else return"data"in P&&ge("WebGLRenderer: Image in DataTexture is too big ("+ft.width+"x"+ft.height+")."),P;return P}function p(P){return P.generateMipmaps}function m(P){n.generateMipmap(P)}function S(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(P,_,B,st,ft=!1){if(P!==null){if(n[P]!==void 0)return n[P];ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ht=_;if(_===n.RED&&(B===n.FLOAT&&(ht=n.R32F),B===n.HALF_FLOAT&&(ht=n.R16F),B===n.UNSIGNED_BYTE&&(ht=n.R8)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(ht=n.R8UI),B===n.UNSIGNED_SHORT&&(ht=n.R16UI),B===n.UNSIGNED_INT&&(ht=n.R32UI),B===n.BYTE&&(ht=n.R8I),B===n.SHORT&&(ht=n.R16I),B===n.INT&&(ht=n.R32I)),_===n.RG&&(B===n.FLOAT&&(ht=n.RG32F),B===n.HALF_FLOAT&&(ht=n.RG16F),B===n.UNSIGNED_BYTE&&(ht=n.RG8)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(ht=n.RG8UI),B===n.UNSIGNED_SHORT&&(ht=n.RG16UI),B===n.UNSIGNED_INT&&(ht=n.RG32UI),B===n.BYTE&&(ht=n.RG8I),B===n.SHORT&&(ht=n.RG16I),B===n.INT&&(ht=n.RG32I)),_===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(ht=n.RGB8UI),B===n.UNSIGNED_SHORT&&(ht=n.RGB16UI),B===n.UNSIGNED_INT&&(ht=n.RGB32UI),B===n.BYTE&&(ht=n.RGB8I),B===n.SHORT&&(ht=n.RGB16I),B===n.INT&&(ht=n.RGB32I)),_===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(ht=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(ht=n.RGBA16UI),B===n.UNSIGNED_INT&&(ht=n.RGBA32UI),B===n.BYTE&&(ht=n.RGBA8I),B===n.SHORT&&(ht=n.RGBA16I),B===n.INT&&(ht=n.RGBA32I)),_===n.RGB&&(B===n.UNSIGNED_INT_5_9_9_9_REV&&(ht=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(ht=n.R11F_G11F_B10F)),_===n.RGBA){const gt=ft?ra:Ue.getTransfer(st);B===n.FLOAT&&(ht=n.RGBA32F),B===n.HALF_FLOAT&&(ht=n.RGBA16F),B===n.UNSIGNED_BYTE&&(ht=gt===Ge?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(ht=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(ht=n.RGB5_A1)}return(ht===n.R16F||ht===n.R32F||ht===n.RG16F||ht===n.RG32F||ht===n.RGBA16F||ht===n.RGBA32F)&&t.get("EXT_color_buffer_float"),ht}function E(P,_){let B;return P?_===null||_===Bn||_===xr?B=n.DEPTH24_STENCIL8:_===Un?B=n.DEPTH32F_STENCIL8:_===mr&&(B=n.DEPTH24_STENCIL8,ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Bn||_===xr?B=n.DEPTH_COMPONENT24:_===Un?B=n.DEPTH_COMPONENT32F:_===mr&&(B=n.DEPTH_COMPONENT16),B}function A(P,_){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Pi&&P.minFilter!==zi?Math.log2(Math.max(_.width,_.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?_.mipmaps.length:1}function R(P){const _=P.target;_.removeEventListener("dispose",R),y(_),_.isVideoTexture&&u.delete(_)}function C(P){const _=P.target;_.removeEventListener("dispose",C),D(_)}function y(P){const _=s.get(P);if(_.__webglInit===void 0)return;const B=P.source,st=d.get(B);if(st){const ft=st[_.__cacheKey];ft.usedTimes--,ft.usedTimes===0&&b(P),Object.keys(st).length===0&&d.delete(B)}s.remove(P)}function b(P){const _=s.get(P);n.deleteTexture(_.__webglTexture);const B=P.source,st=d.get(B);delete st[_.__cacheKey],o.memory.textures--}function D(P){const _=s.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),s.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(_.__webglFramebuffer[st]))for(let ft=0;ft<_.__webglFramebuffer[st].length;ft++)n.deleteFramebuffer(_.__webglFramebuffer[st][ft]);else n.deleteFramebuffer(_.__webglFramebuffer[st]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[st])}else{if(Array.isArray(_.__webglFramebuffer))for(let st=0;st<_.__webglFramebuffer.length;st++)n.deleteFramebuffer(_.__webglFramebuffer[st]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let st=0;st<_.__webglColorRenderbuffer.length;st++)_.__webglColorRenderbuffer[st]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[st]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=P.textures;for(let st=0,ft=B.length;st<ft;st++){const ht=s.get(B[st]);ht.__webglTexture&&(n.deleteTexture(ht.__webglTexture),o.memory.textures--),s.remove(B[st])}s.remove(P)}let w=0;function N(){w=0}function I(){const P=w;return P>=r.maxTextures&&ge("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),w+=1,P}function L(P){const _=[];return _.push(P.wrapS),_.push(P.wrapT),_.push(P.wrapR||0),_.push(P.magFilter),_.push(P.minFilter),_.push(P.anisotropy),_.push(P.internalFormat),_.push(P.format),_.push(P.type),_.push(P.generateMipmaps),_.push(P.premultiplyAlpha),_.push(P.flipY),_.push(P.unpackAlignment),_.push(P.colorSpace),_.join()}function k(P,_){const B=s.get(P);if(P.isVideoTexture&&_t(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&B.__version!==P.version){const st=P.image;if(st===null)ge("WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)ge("WebGLRenderer: Texture marked for update but image is incomplete");else{nt(B,P,_);return}}else P.isExternalTexture&&(B.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function G(P,_){const B=s.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&B.__version!==P.version){nt(B,P,_);return}else P.isExternalTexture&&(B.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function U(P,_){const B=s.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&B.__version!==P.version){nt(B,P,_);return}e.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function K(P,_){const B=s.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&B.__version!==P.version){$(B,P,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}const at={[_o]:n.REPEAT,[Kn]:n.CLAMP_TO_EDGE,[yo]:n.MIRRORED_REPEAT},Y={[Pi]:n.NEAREST,[vu]:n.NEAREST_MIPMAP_NEAREST,[Er]:n.NEAREST_MIPMAP_LINEAR,[zi]:n.LINEAR,[Aa]:n.LINEAR_MIPMAP_NEAREST,[Ms]:n.LINEAR_MIPMAP_LINEAR},ut={[Mu]:n.NEVER,[wu]:n.ALWAYS,[Su]:n.LESS,[Lh]:n.LEQUAL,[bu]:n.EQUAL,[Dh]:n.GEQUAL,[Eu]:n.GREATER,[Tu]:n.NOTEQUAL};function Q(P,_){if(_.type===Un&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===zi||_.magFilter===Aa||_.magFilter===Er||_.magFilter===Ms||_.minFilter===zi||_.minFilter===Aa||_.minFilter===Er||_.minFilter===Ms)&&ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,at[_.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,at[_.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,at[_.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,Y[_.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,Y[_.minFilter]),_.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,ut[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Pi||_.minFilter!==Er&&_.minFilter!==Ms||_.type===Un&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||s.get(_).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");n.texParameterf(P,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),s.get(_).__currentAnisotropy=_.anisotropy}}}function mt(P,_){let B=!1;P.__webglInit===void 0&&(P.__webglInit=!0,_.addEventListener("dispose",R));const st=_.source;let ft=d.get(st);ft===void 0&&(ft={},d.set(st,ft));const ht=L(_);if(ht!==P.__cacheKey){ft[ht]===void 0&&(ft[ht]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,B=!0),ft[ht].usedTimes++;const gt=ft[P.__cacheKey];gt!==void 0&&(ft[P.__cacheKey].usedTimes--,gt.usedTimes===0&&b(_)),P.__cacheKey=ht,P.__webglTexture=ft[ht].texture}return B}function Vt(P,_,B){return Math.floor(Math.floor(P/B)/_)}function Yt(P,_,B,st){const ht=P.updateRanges;if(ht.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,B,st,_.data);else{ht.sort((Mt,At)=>Mt.start-At.start);let gt=0;for(let Mt=1;Mt<ht.length;Mt++){const At=ht[gt],Nt=ht[Mt],bt=At.start+At.count,vt=Vt(Nt.start,_.width,4),Pt=Vt(At.start,_.width,4);Nt.start<=bt+1&&vt===Pt&&Vt(Nt.start+Nt.count-1,_.width,4)===vt?At.count=Math.max(At.count,Nt.start+Nt.count-At.start):(++gt,ht[gt]=Nt)}ht.length=gt+1;const lt=n.getParameter(n.UNPACK_ROW_LENGTH),St=n.getParameter(n.UNPACK_SKIP_PIXELS),Gt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Mt=0,At=ht.length;Mt<At;Mt++){const Nt=ht[Mt],bt=Math.floor(Nt.start/4),vt=Math.ceil(Nt.count/4),Pt=bt%_.width,F=Math.floor(bt/_.width),Rt=vt,dt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Pt),n.pixelStorei(n.UNPACK_SKIP_ROWS,F),e.texSubImage2D(n.TEXTURE_2D,0,Pt,F,Rt,dt,B,st,_.data)}P.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,lt),n.pixelStorei(n.UNPACK_SKIP_PIXELS,St),n.pixelStorei(n.UNPACK_SKIP_ROWS,Gt)}}function nt(P,_,B){let st=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(st=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(st=n.TEXTURE_3D);const ft=mt(P,_),ht=_.source;e.bindTexture(st,P.__webglTexture,n.TEXTURE0+B);const gt=s.get(ht);if(ht.version!==gt.__version||ft===!0){e.activeTexture(n.TEXTURE0+B);const lt=Ue.getPrimaries(Ue.workingColorSpace),St=_.colorSpace===os?null:Ue.getPrimaries(_.colorSpace),Gt=_.colorSpace===os||lt===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);let Mt=v(_.image,!1,r.maxTextureSize);Mt=Ct(_,Mt);const At=a.convert(_.format,_.colorSpace),Nt=a.convert(_.type);let bt=M(_.internalFormat,At,Nt,_.colorSpace,_.isVideoTexture);Q(st,_);let vt;const Pt=_.mipmaps,F=_.isVideoTexture!==!0,Rt=gt.__version===void 0||ft===!0,dt=ht.dataReady,ot=A(_,Mt);if(_.isDepthTexture)bt=E(_.format===Ss,_.type),Rt&&(F?e.texStorage2D(n.TEXTURE_2D,1,bt,Mt.width,Mt.height):e.texImage2D(n.TEXTURE_2D,0,bt,Mt.width,Mt.height,0,At,Nt,null));else if(_.isDataTexture)if(Pt.length>0){F&&Rt&&e.texStorage2D(n.TEXTURE_2D,ot,bt,Pt[0].width,Pt[0].height);for(let q=0,W=Pt.length;q<W;q++)vt=Pt[q],F?dt&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,vt.width,vt.height,At,Nt,vt.data):e.texImage2D(n.TEXTURE_2D,q,bt,vt.width,vt.height,0,At,Nt,vt.data);_.generateMipmaps=!1}else F?(Rt&&e.texStorage2D(n.TEXTURE_2D,ot,bt,Mt.width,Mt.height),dt&&Yt(_,Mt,At,Nt)):e.texImage2D(n.TEXTURE_2D,0,bt,Mt.width,Mt.height,0,At,Nt,Mt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){F&&Rt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ot,bt,Pt[0].width,Pt[0].height,Mt.depth);for(let q=0,W=Pt.length;q<W;q++)if(vt=Pt[q],_.format!==_n)if(At!==null)if(F){if(dt)if(_.layerUpdates.size>0){const Et=yl(vt.width,vt.height,_.format,_.type);for(const Xt of _.layerUpdates){const Zt=vt.data.subarray(Xt*Et/vt.data.BYTES_PER_ELEMENT,(Xt+1)*Et/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,Xt,vt.width,vt.height,1,At,Zt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,vt.width,vt.height,Mt.depth,At,vt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,q,bt,vt.width,vt.height,Mt.depth,0,vt.data,0,0);else ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?dt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,vt.width,vt.height,Mt.depth,At,Nt,vt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,q,bt,vt.width,vt.height,Mt.depth,0,At,Nt,vt.data)}else{F&&Rt&&e.texStorage2D(n.TEXTURE_2D,ot,bt,Pt[0].width,Pt[0].height);for(let q=0,W=Pt.length;q<W;q++)vt=Pt[q],_.format!==_n?At!==null?F?dt&&e.compressedTexSubImage2D(n.TEXTURE_2D,q,0,0,vt.width,vt.height,At,vt.data):e.compressedTexImage2D(n.TEXTURE_2D,q,bt,vt.width,vt.height,0,vt.data):ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?dt&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,vt.width,vt.height,At,Nt,vt.data):e.texImage2D(n.TEXTURE_2D,q,bt,vt.width,vt.height,0,At,Nt,vt.data)}else if(_.isDataArrayTexture)if(F){if(Rt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ot,bt,Mt.width,Mt.height,Mt.depth),dt)if(_.layerUpdates.size>0){const q=yl(Mt.width,Mt.height,_.format,_.type);for(const W of _.layerUpdates){const Et=Mt.data.subarray(W*q/Mt.data.BYTES_PER_ELEMENT,(W+1)*q/Mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,W,Mt.width,Mt.height,1,At,Nt,Et)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Mt.width,Mt.height,Mt.depth,At,Nt,Mt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,bt,Mt.width,Mt.height,Mt.depth,0,At,Nt,Mt.data);else if(_.isData3DTexture)F?(Rt&&e.texStorage3D(n.TEXTURE_3D,ot,bt,Mt.width,Mt.height,Mt.depth),dt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Mt.width,Mt.height,Mt.depth,At,Nt,Mt.data)):e.texImage3D(n.TEXTURE_3D,0,bt,Mt.width,Mt.height,Mt.depth,0,At,Nt,Mt.data);else if(_.isFramebufferTexture){if(Rt)if(F)e.texStorage2D(n.TEXTURE_2D,ot,bt,Mt.width,Mt.height);else{let q=Mt.width,W=Mt.height;for(let Et=0;Et<ot;Et++)e.texImage2D(n.TEXTURE_2D,Et,bt,q,W,0,At,Nt,null),q>>=1,W>>=1}}else if(Pt.length>0){if(F&&Rt){const q=pt(Pt[0]);e.texStorage2D(n.TEXTURE_2D,ot,bt,q.width,q.height)}for(let q=0,W=Pt.length;q<W;q++)vt=Pt[q],F?dt&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,At,Nt,vt):e.texImage2D(n.TEXTURE_2D,q,bt,At,Nt,vt);_.generateMipmaps=!1}else if(F){if(Rt){const q=pt(Mt);e.texStorage2D(n.TEXTURE_2D,ot,bt,q.width,q.height)}dt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,At,Nt,Mt)}else e.texImage2D(n.TEXTURE_2D,0,bt,At,Nt,Mt);p(_)&&m(st),gt.__version=ht.version,_.onUpdate&&_.onUpdate(_)}P.__version=_.version}function $(P,_,B){if(_.image.length!==6)return;const st=mt(P,_),ft=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+B);const ht=s.get(ft);if(ft.version!==ht.__version||st===!0){e.activeTexture(n.TEXTURE0+B);const gt=Ue.getPrimaries(Ue.workingColorSpace),lt=_.colorSpace===os?null:Ue.getPrimaries(_.colorSpace),St=_.colorSpace===os||gt===lt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Gt=_.isCompressedTexture||_.image[0].isCompressedTexture,Mt=_.image[0]&&_.image[0].isDataTexture,At=[];for(let W=0;W<6;W++)!Gt&&!Mt?At[W]=v(_.image[W],!0,r.maxCubemapSize):At[W]=Mt?_.image[W].image:_.image[W],At[W]=Ct(_,At[W]);const Nt=At[0],bt=a.convert(_.format,_.colorSpace),vt=a.convert(_.type),Pt=M(_.internalFormat,bt,vt,_.colorSpace),F=_.isVideoTexture!==!0,Rt=ht.__version===void 0||st===!0,dt=ft.dataReady;let ot=A(_,Nt);Q(n.TEXTURE_CUBE_MAP,_);let q;if(Gt){F&&Rt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ot,Pt,Nt.width,Nt.height);for(let W=0;W<6;W++){q=At[W].mipmaps;for(let Et=0;Et<q.length;Et++){const Xt=q[Et];_.format!==_n?bt!==null?F?dt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Et,0,0,Xt.width,Xt.height,bt,Xt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Et,Pt,Xt.width,Xt.height,0,Xt.data):ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Et,0,0,Xt.width,Xt.height,bt,vt,Xt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Et,Pt,Xt.width,Xt.height,0,bt,vt,Xt.data)}}}else{if(q=_.mipmaps,F&&Rt){q.length>0&&ot++;const W=pt(At[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ot,Pt,W.width,W.height)}for(let W=0;W<6;W++)if(Mt){F?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,At[W].width,At[W].height,bt,vt,At[W].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Pt,At[W].width,At[W].height,0,bt,vt,At[W].data);for(let Et=0;Et<q.length;Et++){const Zt=q[Et].image[W].image;F?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Et+1,0,0,Zt.width,Zt.height,bt,vt,Zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Et+1,Pt,Zt.width,Zt.height,0,bt,vt,Zt.data)}}else{F?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,bt,vt,At[W]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Pt,bt,vt,At[W]);for(let Et=0;Et<q.length;Et++){const Xt=q[Et];F?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Et+1,0,0,bt,vt,Xt.image[W]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Et+1,Pt,bt,vt,Xt.image[W])}}}p(_)&&m(n.TEXTURE_CUBE_MAP),ht.__version=ft.version,_.onUpdate&&_.onUpdate(_)}P.__version=_.version}function O(P,_,B,st,ft,ht){const gt=a.convert(B.format,B.colorSpace),lt=a.convert(B.type),St=M(B.internalFormat,gt,lt,B.colorSpace),Gt=s.get(_),Mt=s.get(B);if(Mt.__renderTarget=_,!Gt.__hasExternalTextures){const At=Math.max(1,_.width>>ht),Nt=Math.max(1,_.height>>ht);ft===n.TEXTURE_3D||ft===n.TEXTURE_2D_ARRAY?e.texImage3D(ft,ht,St,At,Nt,_.depth,0,gt,lt,null):e.texImage2D(ft,ht,St,At,Nt,0,gt,lt,null)}e.bindFramebuffer(n.FRAMEBUFFER,P),kt(_)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,st,ft,Mt.__webglTexture,0,z(_)):(ft===n.TEXTURE_2D||ft>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ft<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,st,ft,Mt.__webglTexture,ht),e.bindFramebuffer(n.FRAMEBUFFER,null)}function X(P,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,P),_.depthBuffer){const st=_.depthTexture,ft=st&&st.isDepthTexture?st.type:null,ht=E(_.stencilBuffer,ft),gt=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;kt(_)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,z(_),ht,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,z(_),ht,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ht,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,gt,n.RENDERBUFFER,P)}else{const st=_.textures;for(let ft=0;ft<st.length;ft++){const ht=st[ft],gt=a.convert(ht.format,ht.colorSpace),lt=a.convert(ht.type),St=M(ht.internalFormat,gt,lt,ht.colorSpace);kt(_)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,z(_),St,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,z(_),St,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,St,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function H(P,_,B){const st=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,P),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ft=s.get(_.depthTexture);if(ft.__renderTarget=_,(!ft.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),st){if(ft.__webglInit===void 0&&(ft.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),ft.__webglTexture===void 0){ft.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,ft.__webglTexture),Q(n.TEXTURE_CUBE_MAP,_.depthTexture);const Gt=a.convert(_.depthTexture.format),Mt=a.convert(_.depthTexture.type);let At;_.depthTexture.format===ts?At=n.DEPTH_COMPONENT24:_.depthTexture.format===Ss&&(At=n.DEPTH24_STENCIL8);for(let Nt=0;Nt<6;Nt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,At,_.width,_.height,0,Gt,Mt,null)}}else k(_.depthTexture,0);const ht=ft.__webglTexture,gt=z(_),lt=st?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,St=_.depthTexture.format===Ss?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===ts)kt(_)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,St,lt,ht,0,gt):n.framebufferTexture2D(n.FRAMEBUFFER,St,lt,ht,0);else if(_.depthTexture.format===Ss)kt(_)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,St,lt,ht,0,gt):n.framebufferTexture2D(n.FRAMEBUFFER,St,lt,ht,0);else throw new Error("Unknown depthTexture format")}function tt(P){const _=s.get(P),B=P.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==P.depthTexture){const st=P.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),st){const ft=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,st.removeEventListener("dispose",ft)};st.addEventListener("dispose",ft),_.__depthDisposeCallback=ft}_.__boundDepthTexture=st}if(P.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let st=0;st<6;st++)H(_.__webglFramebuffer[st],P,st);else{const st=P.texture.mipmaps;st&&st.length>0?H(_.__webglFramebuffer[0],P,0):H(_.__webglFramebuffer,P,0)}else if(B){_.__webglDepthbuffer=[];for(let st=0;st<6;st++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[st]),_.__webglDepthbuffer[st]===void 0)_.__webglDepthbuffer[st]=n.createRenderbuffer(),X(_.__webglDepthbuffer[st],P,!1);else{const ft=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=_.__webglDepthbuffer[st];n.bindRenderbuffer(n.RENDERBUFFER,ht),n.framebufferRenderbuffer(n.FRAMEBUFFER,ft,n.RENDERBUFFER,ht)}}else{const st=P.texture.mipmaps;if(st&&st.length>0?e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),X(_.__webglDepthbuffer,P,!1);else{const ft=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ht),n.framebufferRenderbuffer(n.FRAMEBUFFER,ft,n.RENDERBUFFER,ht)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function xt(P,_,B){const st=s.get(P);_!==void 0&&O(st.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&tt(P)}function Ut(P){const _=P.texture,B=s.get(P),st=s.get(_);P.addEventListener("dispose",C);const ft=P.textures,ht=P.isWebGLCubeRenderTarget===!0,gt=ft.length>1;if(gt||(st.__webglTexture===void 0&&(st.__webglTexture=n.createTexture()),st.__version=_.version,o.memory.textures++),ht){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let St=0;St<_.mipmaps.length;St++)B.__webglFramebuffer[lt][St]=n.createFramebuffer()}else B.__webglFramebuffer[lt]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<_.mipmaps.length;lt++)B.__webglFramebuffer[lt]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(gt)for(let lt=0,St=ft.length;lt<St;lt++){const Gt=s.get(ft[lt]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=n.createTexture(),o.memory.textures++)}if(P.samples>0&&kt(P)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<ft.length;lt++){const St=ft[lt];B.__webglColorRenderbuffer[lt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const Gt=a.convert(St.format,St.colorSpace),Mt=a.convert(St.type),At=M(St.internalFormat,Gt,Mt,St.colorSpace,P.isXRRenderTarget===!0),Nt=z(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Nt,At,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),X(B.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ht){e.bindTexture(n.TEXTURE_CUBE_MAP,st.__webglTexture),Q(n.TEXTURE_CUBE_MAP,_);for(let lt=0;lt<6;lt++)if(_.mipmaps&&_.mipmaps.length>0)for(let St=0;St<_.mipmaps.length;St++)O(B.__webglFramebuffer[lt][St],P,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,St);else O(B.__webglFramebuffer[lt],P,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);p(_)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let lt=0,St=ft.length;lt<St;lt++){const Gt=ft[lt],Mt=s.get(Gt);let At=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(At=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(At,Mt.__webglTexture),Q(At,Gt),O(B.__webglFramebuffer,P,Gt,n.COLOR_ATTACHMENT0+lt,At,0),p(Gt)&&m(At)}e.unbindTexture()}else{let lt=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(lt=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(lt,st.__webglTexture),Q(lt,_),_.mipmaps&&_.mipmaps.length>0)for(let St=0;St<_.mipmaps.length;St++)O(B.__webglFramebuffer[St],P,_,n.COLOR_ATTACHMENT0,lt,St);else O(B.__webglFramebuffer,P,_,n.COLOR_ATTACHMENT0,lt,0);p(_)&&m(lt),e.unbindTexture()}P.depthBuffer&&tt(P)}function Lt(P){const _=P.textures;for(let B=0,st=_.length;B<st;B++){const ft=_[B];if(p(ft)){const ht=S(P),gt=s.get(ft).__webglTexture;e.bindTexture(ht,gt),m(ht),e.unbindTexture()}}}const zt=[],It=[];function Jt(P){if(P.samples>0){if(kt(P)===!1){const _=P.textures,B=P.width,st=P.height;let ft=n.COLOR_BUFFER_BIT;const ht=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=s.get(P),lt=_.length>1;if(lt)for(let Gt=0;Gt<_.length;Gt++)e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Gt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Gt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);const St=P.texture.mipmaps;St&&St.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let Gt=0;Gt<_.length;Gt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ft|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ft|=n.STENCIL_BUFFER_BIT)),lt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,gt.__webglColorRenderbuffer[Gt]);const Mt=s.get(_[Gt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Mt,0)}n.blitFramebuffer(0,0,B,st,0,0,B,st,ft,n.NEAREST),l===!0&&(zt.length=0,It.length=0,zt.push(n.COLOR_ATTACHMENT0+Gt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(zt.push(ht),It.push(ht),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,It)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,zt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),lt)for(let Gt=0;Gt<_.length;Gt++){e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Gt,n.RENDERBUFFER,gt.__webglColorRenderbuffer[Gt]);const Mt=s.get(_[Gt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Gt,n.TEXTURE_2D,Mt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const _=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function z(P){return Math.min(r.maxSamples,P.samples)}function kt(P){const _=s.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function _t(P){const _=o.render.frame;u.get(P)!==_&&(u.set(P,_),P.update())}function Ct(P,_){const B=P.colorSpace,st=P.format,ft=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||B!==js&&B!==os&&(Ue.getTransfer(B)===Ge?(st!==_n||ft!==an)&&ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ze("WebGLTextures: Unsupported texture color space:",B)),_}function pt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=N,this.setTexture2D=k,this.setTexture2DArray=G,this.setTexture3D=U,this.setTextureCube=K,this.rebindTextures=xt,this.setupRenderTarget=Ut,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=Jt,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=O,this.useMultisampledRTT=kt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function ex(n,t){function e(s,r=os){let a;const o=Ue.getTransfer(r);if(s===an)return n.UNSIGNED_BYTE;if(s===Rh)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Ch)return n.UNSIGNED_SHORT_5_5_5_1;if(s===pc)return n.UNSIGNED_INT_5_9_9_9_REV;if(s===mc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(s===fc)return n.BYTE;if(s===dc)return n.SHORT;if(s===mr)return n.UNSIGNED_SHORT;if(s===Ah)return n.INT;if(s===Bn)return n.UNSIGNED_INT;if(s===Un)return n.FLOAT;if(s===Qn)return n.HALF_FLOAT;if(s===xc)return n.ALPHA;if(s===gc)return n.RGB;if(s===_n)return n.RGBA;if(s===ts)return n.DEPTH_COMPONENT;if(s===Ss)return n.DEPTH_STENCIL;if(s===vc)return n.RED;if(s===Ph)return n.RED_INTEGER;if(s===Ys)return n.RG;if(s===Nh)return n.RG_INTEGER;if(s===Ih)return n.RGBA_INTEGER;if(s===ta||s===ea||s===ia||s===na)if(o===Ge)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===ta)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ea)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===ia)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===na)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===ta)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ea)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===ia)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===na)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Mo||s===So||s===bo||s===Eo)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Mo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===So)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===bo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Eo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===To||s===wo||s===Ao||s===Ro||s===Co||s===Po||s===No)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(s===To||s===wo)return o===Ge?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Ao)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(s===Ro)return a.COMPRESSED_R11_EAC;if(s===Co)return a.COMPRESSED_SIGNED_R11_EAC;if(s===Po)return a.COMPRESSED_RG11_EAC;if(s===No)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Io||s===Lo||s===Do||s===Uo||s===zo||s===Fo||s===Oo||s===Bo||s===ko||s===Vo||s===Go||s===Ho||s===Wo||s===Xo)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Io)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Lo)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Do)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Uo)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===zo)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Fo)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Oo)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Bo)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ko)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Vo)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Go)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ho)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Wo)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Xo)return o===Ge?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===qo||s===Yo||s===jo)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(s===qo)return o===Ge?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Yo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===jo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Ko||s===Zo||s===$o||s===Jo)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(s===Ko)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Zo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===$o)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Jo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===xr?n.UNSIGNED_INT_24_8:n[s]!==void 0?n[s]:null}return{convert:e}}const ix=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class sx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const s=new Pc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,s=new Vn({vertexShader:ix,fragmentShader:nx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new li(new Sr(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rx extends Zs{constructor(t,e){super();const s=this;let r=null,a=1,o=null,h="local-floor",l=1,c=null,u=null,f=null,d=null,x=null,g=null;const v=typeof XRWebGLBinding<"u",p=new sx,m={},S=e.getContextAttributes();let M=null,E=null;const A=[],R=[],C=new Fe;let y=null;const b=new hn;b.viewport=new fi;const D=new hn;D.viewport=new fi;const w=[b,D],N=new gf;let I=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let $=A[nt];return $===void 0&&($=new Ua,A[nt]=$),$.getTargetRaySpace()},this.getControllerGrip=function(nt){let $=A[nt];return $===void 0&&($=new Ua,A[nt]=$),$.getGripSpace()},this.getHand=function(nt){let $=A[nt];return $===void 0&&($=new Ua,A[nt]=$),$.getHandSpace()};function k(nt){const $=R.indexOf(nt.inputSource);if($===-1)return;const O=A[$];O!==void 0&&(O.update(nt.inputSource,nt.frame,c||o),O.dispatchEvent({type:nt.type,data:nt.inputSource}))}function G(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",U);for(let nt=0;nt<A.length;nt++){const $=R[nt];$!==null&&(R[nt]=null,A[nt].disconnect($))}I=null,L=null,p.reset();for(const nt in m)delete m[nt];t.setRenderTarget(M),x=null,d=null,f=null,r=null,E=null,Yt.stop(),s.isPresenting=!1,t.setPixelRatio(y),t.setSize(C.width,C.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){a=nt,s.isPresenting===!0&&ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){h=nt,s.isPresenting===!0&&ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(nt){c=nt},this.getBaseLayer=function(){return d!==null?d:x},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(r,e)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(nt){if(r=nt,r!==null){if(M=t.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",G),r.addEventListener("inputsourceschange",U),S.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let O=null,X=null,H=null;S.depth&&(H=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,O=S.stencil?Ss:ts,X=S.stencil?xr:Bn);const tt={colorFormat:e.RGBA8,depthFormat:H,scaleFactor:a};f=this.getBinding(),d=f.createProjectionLayer(tt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),E=new On(d.textureWidth,d.textureHeight,{format:_n,type:an,depthTexture:new vr(d.textureWidth,d.textureHeight,X,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const O={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:a};x=new XRWebGLLayer(r,e,O),r.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),E=new On(x.framebufferWidth,x.framebufferHeight,{format:_n,type:an,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(h),Yt.setContext(r),Yt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function U(nt){for(let $=0;$<nt.removed.length;$++){const O=nt.removed[$],X=R.indexOf(O);X>=0&&(R[X]=null,A[X].disconnect(O))}for(let $=0;$<nt.added.length;$++){const O=nt.added[$];let X=R.indexOf(O);if(X===-1){for(let tt=0;tt<A.length;tt++)if(tt>=R.length){R.push(O),X=tt;break}else if(R[tt]===null){R[tt]=O,X=tt;break}if(X===-1)break}const H=A[X];H&&H.connect(O)}}const K=new it,at=new it;function Y(nt,$,O){K.setFromMatrixPosition($.matrixWorld),at.setFromMatrixPosition(O.matrixWorld);const X=K.distanceTo(at),H=$.projectionMatrix.elements,tt=O.projectionMatrix.elements,xt=H[14]/(H[10]-1),Ut=H[14]/(H[10]+1),Lt=(H[9]+1)/H[5],zt=(H[9]-1)/H[5],It=(H[8]-1)/H[0],Jt=(tt[8]+1)/tt[0],z=xt*It,kt=xt*Jt,_t=X/(-It+Jt),Ct=_t*-It;if($.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(Ct),nt.translateZ(_t),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),H[10]===-1)nt.projectionMatrix.copy($.projectionMatrix),nt.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const pt=xt+_t,P=Ut+_t,_=z-Ct,B=kt+(X-Ct),st=Lt*Ut/P*pt,ft=zt*Ut/P*pt;nt.projectionMatrix.makePerspective(_,B,st,ft,pt,P),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function ut(nt,$){$===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices($.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(r===null)return;let $=nt.near,O=nt.far;p.texture!==null&&(p.depthNear>0&&($=p.depthNear),p.depthFar>0&&(O=p.depthFar)),N.near=D.near=b.near=$,N.far=D.far=b.far=O,(I!==N.near||L!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),I=N.near,L=N.far),N.layers.mask=nt.layers.mask|6,b.layers.mask=N.layers.mask&-5,D.layers.mask=N.layers.mask&-3;const X=nt.parent,H=N.cameras;ut(N,X);for(let tt=0;tt<H.length;tt++)ut(H[tt],X);H.length===2?Y(N,b,D):N.projectionMatrix.copy(b.projectionMatrix),Q(nt,N,X)};function Q(nt,$,O){O===null?nt.matrix.copy($.matrixWorld):(nt.matrix.copy(O.matrixWorld),nt.matrix.invert(),nt.matrix.multiply($.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy($.projectionMatrix),nt.projectionMatrixInverse.copy($.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=Qo*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&x===null))return l},this.setFoveation=function(nt){l=nt,d!==null&&(d.fixedFoveation=nt),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=nt)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(N)},this.getCameraTexture=function(nt){return m[nt]};let mt=null;function Vt(nt,$){if(u=$.getViewerPose(c||o),g=$,u!==null){const O=u.views;x!==null&&(t.setRenderTargetFramebuffer(E,x.framebuffer),t.setRenderTarget(E));let X=!1;O.length!==N.cameras.length&&(N.cameras.length=0,X=!0);for(let Ut=0;Ut<O.length;Ut++){const Lt=O[Ut];let zt=null;if(x!==null)zt=x.getViewport(Lt);else{const Jt=f.getViewSubImage(d,Lt);zt=Jt.viewport,Ut===0&&(t.setRenderTargetTextures(E,Jt.colorTexture,Jt.depthStencilTexture),t.setRenderTarget(E))}let It=w[Ut];It===void 0&&(It=new hn,It.layers.enable(Ut),It.viewport=new fi,w[Ut]=It),It.matrix.fromArray(Lt.transform.matrix),It.matrix.decompose(It.position,It.quaternion,It.scale),It.projectionMatrix.fromArray(Lt.projectionMatrix),It.projectionMatrixInverse.copy(It.projectionMatrix).invert(),It.viewport.set(zt.x,zt.y,zt.width,zt.height),Ut===0&&(N.matrix.copy(It.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),X===!0&&N.cameras.push(It)}const H=r.enabledFeatures;if(H&&H.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){f=s.getBinding();const Ut=f.getDepthInformation(O[0]);Ut&&Ut.isValid&&Ut.texture&&p.init(Ut,r.renderState)}if(H&&H.includes("camera-access")&&v){t.state.unbindTexture(),f=s.getBinding();for(let Ut=0;Ut<O.length;Ut++){const Lt=O[Ut].camera;if(Lt){let zt=m[Lt];zt||(zt=new Pc,m[Lt]=zt);const It=f.getCameraImage(Lt);zt.sourceTexture=It}}}}for(let O=0;O<A.length;O++){const X=R[O],H=A[O];X!==null&&H!==void 0&&H.update(X,$,c||o)}mt&&mt(nt,$),$.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:$}),g=null}const Yt=new Lc;Yt.setAnimationLoop(Vt),this.setAnimationLoop=function(nt){mt=nt},this.dispose=function(){}}}const ms=new kn,ax=new ci;function ox(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function s(p,m){m.color.getRGB(p.fogColor.value,Nc(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,S,M,E){m.isMeshBasicMaterial?a(p,m):m.isMeshLambertMaterial?(a(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(a(p,m),f(p,m)):m.isMeshPhongMaterial?(a(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(a(p,m),d(p,m),m.isMeshPhysicalMaterial&&x(p,m,E)):m.isMeshMatcapMaterial?(a(p,m),g(p,m)):m.isMeshDepthMaterial?a(p,m):m.isMeshDistanceMaterial?(a(p,m),v(p,m)):m.isMeshNormalMaterial?a(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&h(p,m)):m.isPointsMaterial?l(p,m,S,M):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Qi&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Qi&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const S=t.get(m),M=S.envMap,E=S.envMapRotation;M&&(p.envMap.value=M,ms.copy(E),ms.x*=-1,ms.y*=-1,ms.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),p.envMapRotation.value.setFromMatrix4(ax.makeRotationFromEuler(ms)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function h(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,S,M){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*S,p.scale.value=M*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function x(p,m,S){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Qi&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const S=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:r}}function hx(n,t,e,s){let r={},a={},o=[];const h=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const E=M.program;s.uniformBlockBinding(S,E)}function c(S,M){let E=r[S.id];E===void 0&&(g(S),E=u(S),r[S.id]=E,S.addEventListener("dispose",p));const A=M.program;s.updateUBOMapping(S,A);const R=t.render.frame;a[S.id]!==R&&(d(S),a[S.id]=R)}function u(S){const M=f();S.__bindingPointIndex=M;const E=n.createBuffer(),A=S.__size,R=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,A,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,E),E}function f(){for(let S=0;S<h;S++)if(o.indexOf(S)===-1)return o.push(S),S;return ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const M=r[S.id],E=S.uniforms,A=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let R=0,C=E.length;R<C;R++){const y=Array.isArray(E[R])?E[R]:[E[R]];for(let b=0,D=y.length;b<D;b++){const w=y[b];if(x(w,R,b,A)===!0){const N=w.__offset,I=Array.isArray(w.value)?w.value:[w.value];let L=0;for(let k=0;k<I.length;k++){const G=I[k],U=v(G);typeof G=="number"||typeof G=="boolean"?(w.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,N+L,w.__data)):G.isMatrix3?(w.__data[0]=G.elements[0],w.__data[1]=G.elements[1],w.__data[2]=G.elements[2],w.__data[3]=0,w.__data[4]=G.elements[3],w.__data[5]=G.elements[4],w.__data[6]=G.elements[5],w.__data[7]=0,w.__data[8]=G.elements[6],w.__data[9]=G.elements[7],w.__data[10]=G.elements[8],w.__data[11]=0):(G.toArray(w.__data,L),L+=U.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,w.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function x(S,M,E,A){const R=S.value,C=M+"_"+E;if(A[C]===void 0)return typeof R=="number"||typeof R=="boolean"?A[C]=R:A[C]=R.clone(),!0;{const y=A[C];if(typeof R=="number"||typeof R=="boolean"){if(y!==R)return A[C]=R,!0}else if(y.equals(R)===!1)return y.copy(R),!0}return!1}function g(S){const M=S.uniforms;let E=0;const A=16;for(let C=0,y=M.length;C<y;C++){const b=Array.isArray(M[C])?M[C]:[M[C]];for(let D=0,w=b.length;D<w;D++){const N=b[D],I=Array.isArray(N.value)?N.value:[N.value];for(let L=0,k=I.length;L<k;L++){const G=I[L],U=v(G),K=E%A,at=K%U.boundary,Y=K+at;E+=at,Y!==0&&A-Y<U.storage&&(E+=A-Y),N.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=E,E+=U.storage}}}const R=E%A;return R>0&&(E+=A-R),S.__size=E,S.__cache={},this}function v(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ge("WebGLRenderer: Unsupported uniform value type.",S),M}function p(S){const M=S.target;M.removeEventListener("dispose",p);const E=o.indexOf(M.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete a[M.id]}function m(){for(const S in r)n.deleteBuffer(r[S]);o=[],r={},a={}}return{bind:l,update:c,dispose:m}}const lx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let In=null;function cx(){return In===null&&(In=new $u(lx,16,16,Ys,Qn),In.name="DFG_LUT",In.minFilter=zi,In.magFilter=zi,In.wrapS=Kn,In.wrapT=Kn,In.generateMipmaps=!1,In.needsUpdate=!0),In}class ux{constructor(t={}){const{canvas:e=Ru(),context:s=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:h=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:x=an}=t;this.isWebGLRenderer=!0;let g;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=s.getContextAttributes().alpha}else g=o;const v=x,p=new Set([Ih,Nh,Ph]),m=new Set([an,Bn,mr,xr,Rh,Ch]),S=new Uint32Array(4),M=new Int32Array(4);let E=null,A=null;const R=[],C=[];let y=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let D=!1;this._outputColorSpace=sn;let w=0,N=0,I=null,L=-1,k=null;const G=new fi,U=new fi;let K=null;const at=new Ne(0);let Y=0,ut=e.width,Q=e.height,mt=1,Vt=null,Yt=null;const nt=new fi(0,0,ut,Q),$=new fi(0,0,ut,Q);let O=!1;const X=new Fh;let H=!1,tt=!1;const xt=new ci,Ut=new it,Lt=new fi,zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let It=!1;function Jt(){return I===null?mt:1}let z=s;function kt(T,V){return e.getContext(T,V)}try{const T={alpha:!0,depth:r,stencil:a,antialias:h,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wh}`),e.addEventListener("webglcontextlost",Et,!1),e.addEventListener("webglcontextrestored",Xt,!1),e.addEventListener("webglcontextcreationerror",Zt,!1),z===null){const V="webgl2";if(z=kt(V,T),z===null)throw kt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw ze("WebGLRenderer: "+T.message),T}let _t,Ct,pt,P,_,B,st,ft,ht,gt,lt,St,Gt,Mt,At,Nt,bt,vt,Pt,F,Rt,dt,ot;function q(){_t=new um(z),_t.init(),Rt=new ex(z,_t),Ct=new nm(z,_t,t,Rt),pt=new Q0(z,_t),Ct.reversedDepthBuffer&&d&&pt.buffers.depth.setReversed(!0),P=new pm(z),_=new B0,B=new tx(z,_t,pt,_,Ct,Rt,P),st=new cm(b),ft=new _f(z),dt=new em(z,ft),ht=new fm(z,ft,P,dt),gt=new xm(z,ht,ft,dt,P),vt=new mm(z,Ct,B),At=new sm(_),lt=new O0(b,st,_t,Ct,dt,At),St=new ox(b,_),Gt=new V0,Mt=new Y0(_t),bt=new tm(b,st,pt,gt,g,l),Nt=new J0(b,gt,Ct),ot=new hx(z,P,Ct,pt),Pt=new im(z,_t,P),F=new dm(z,_t,P),P.programs=lt.programs,b.capabilities=Ct,b.extensions=_t,b.properties=_,b.renderLists=Gt,b.shadowMap=Nt,b.state=pt,b.info=P}q(),v!==an&&(y=new vm(v,e.width,e.height,r,a));const W=new rx(b,z);this.xr=W,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const T=_t.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=_t.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return mt},this.setPixelRatio=function(T){T!==void 0&&(mt=T,this.setSize(ut,Q,!1))},this.getSize=function(T){return T.set(ut,Q)},this.setSize=function(T,V,rt=!0){if(W.isPresenting){ge("WebGLRenderer: Can't change size while VR device is presenting.");return}ut=T,Q=V,e.width=Math.floor(T*mt),e.height=Math.floor(V*mt),rt===!0&&(e.style.width=T+"px",e.style.height=V+"px"),y!==null&&y.setSize(e.width,e.height),this.setViewport(0,0,T,V)},this.getDrawingBufferSize=function(T){return T.set(ut*mt,Q*mt).floor()},this.setDrawingBufferSize=function(T,V,rt){ut=T,Q=V,mt=rt,e.width=Math.floor(T*rt),e.height=Math.floor(V*rt),this.setViewport(0,0,T,V)},this.setEffects=function(T){if(v===an){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let V=0;V<T.length;V++)if(T[V].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(G)},this.getViewport=function(T){return T.copy(nt)},this.setViewport=function(T,V,rt,J){T.isVector4?nt.set(T.x,T.y,T.z,T.w):nt.set(T,V,rt,J),pt.viewport(G.copy(nt).multiplyScalar(mt).round())},this.getScissor=function(T){return T.copy($)},this.setScissor=function(T,V,rt,J){T.isVector4?$.set(T.x,T.y,T.z,T.w):$.set(T,V,rt,J),pt.scissor(U.copy($).multiplyScalar(mt).round())},this.getScissorTest=function(){return O},this.setScissorTest=function(T){pt.setScissorTest(O=T)},this.setOpaqueSort=function(T){Vt=T},this.setTransparentSort=function(T){Yt=T},this.getClearColor=function(T){return T.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor(...arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha(...arguments)},this.clear=function(T=!0,V=!0,rt=!0){let J=0;if(T){let Z=!1;if(I!==null){const Ft=I.texture.format;Z=p.has(Ft)}if(Z){const Ft=I.texture.type,Bt=m.has(Ft),Ot=bt.getClearColor(),Ht=bt.getClearAlpha(),qt=Ot.r,Qt=Ot.g,re=Ot.b;Bt?(S[0]=qt,S[1]=Qt,S[2]=re,S[3]=Ht,z.clearBufferuiv(z.COLOR,0,S)):(M[0]=qt,M[1]=Qt,M[2]=re,M[3]=Ht,z.clearBufferiv(z.COLOR,0,M))}else J|=z.COLOR_BUFFER_BIT}V&&(J|=z.DEPTH_BUFFER_BIT),rt&&(J|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&z.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Et,!1),e.removeEventListener("webglcontextrestored",Xt,!1),e.removeEventListener("webglcontextcreationerror",Zt,!1),bt.dispose(),Gt.dispose(),Mt.dispose(),_.dispose(),st.dispose(),gt.dispose(),dt.dispose(),ot.dispose(),lt.dispose(),W.dispose(),W.removeEventListener("sessionstart",Ie),W.removeEventListener("sessionend",Le),Te.stop()};function Et(T){T.preventDefault(),Qh("WebGLRenderer: Context Lost."),D=!0}function Xt(){Qh("WebGLRenderer: Context Restored."),D=!1;const T=P.autoReset,V=Nt.enabled,rt=Nt.autoUpdate,J=Nt.needsUpdate,Z=Nt.type;q(),P.autoReset=T,Nt.enabled=V,Nt.autoUpdate=rt,Nt.needsUpdate=J,Nt.type=Z}function Zt(T){ze("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function te(T){const V=T.target;V.removeEventListener("dispose",te),_e(V)}function _e(T){He(T),_.remove(T)}function He(T){const V=_.get(T).programs;V!==void 0&&(V.forEach(function(rt){lt.releaseProgram(rt)}),T.isShaderMaterial&&lt.releaseShaderCache(T))}this.renderBufferDirect=function(T,V,rt,J,Z,Ft){V===null&&(V=zt);const Bt=Z.isMesh&&Z.matrixWorld.determinant()<0,Ot=xi(T,V,rt,J,Z);pt.setMaterial(J,Bt);let Ht=rt.index,qt=1;if(J.wireframe===!0){if(Ht=ht.getWireframeAttribute(rt),Ht===void 0)return;qt=2}const Qt=rt.drawRange,re=rt.attributes.position;let jt=Qt.start*qt,Se=(Qt.start+Qt.count)*qt;Ft!==null&&(jt=Math.max(jt,Ft.start*qt),Se=Math.min(Se,(Ft.start+Ft.count)*qt)),Ht!==null?(jt=Math.max(jt,0),Se=Math.min(Se,Ht.count)):re!=null&&(jt=Math.max(jt,0),Se=Math.min(Se,re.count));const Dt=Se-jt;if(Dt<0||Dt===1/0)return;dt.setup(Z,J,Ot,rt,Ht);let Je,Oe=Pt;if(Ht!==null&&(Je=ft.get(Ht),Oe=F,Oe.setIndex(Je)),Z.isMesh)J.wireframe===!0?(pt.setLineWidth(J.wireframeLinewidth*Jt()),Oe.setMode(z.LINES)):Oe.setMode(z.TRIANGLES);else if(Z.isLine){let Si=J.linewidth;Si===void 0&&(Si=1),pt.setLineWidth(Si*Jt()),Z.isLineSegments?Oe.setMode(z.LINES):Z.isLineLoop?Oe.setMode(z.LINE_LOOP):Oe.setMode(z.LINE_STRIP)}else Z.isPoints?Oe.setMode(z.POINTS):Z.isSprite&&Oe.setMode(z.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)oa("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Oe.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(_t.get("WEBGL_multi_draw"))Oe.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Si=Z._multiDrawStarts,Kt=Z._multiDrawCounts,Li=Z._multiDrawCount,Re=Ht?ft.get(Ht).bytesPerElement:1,ct=_.get(J).currentProgram.getUniforms();for(let ye=0;ye<Li;ye++)ct.setValue(z,"_gl_DrawID",ye),Oe.render(Si[ye]/Re,Kt[ye])}else if(Z.isInstancedMesh)Oe.renderInstances(jt,Dt,Z.count);else if(rt.isInstancedBufferGeometry){const Si=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,Kt=Math.min(rt.instanceCount,Si);Oe.renderInstances(jt,Dt,Kt)}else Oe.render(jt,Dt)};function di(T,V,rt){T.transparent===!0&&T.side===Dn&&T.forceSinglePass===!1?(T.side=Qi,T.needsUpdate=!0,ce(T,V,rt),T.side=ls,T.needsUpdate=!0,ce(T,V,rt),T.side=Dn):ce(T,V,rt)}this.compile=function(T,V,rt=null){rt===null&&(rt=T),A=Mt.get(rt),A.init(V),C.push(A),rt.traverseVisible(function(Z){Z.isLight&&Z.layers.test(V.layers)&&(A.pushLight(Z),Z.castShadow&&A.pushShadow(Z))}),T!==rt&&T.traverseVisible(function(Z){Z.isLight&&Z.layers.test(V.layers)&&(A.pushLight(Z),Z.castShadow&&A.pushShadow(Z))}),A.setupLights();const J=new Set;return T.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Ft=Z.material;if(Ft)if(Array.isArray(Ft))for(let Bt=0;Bt<Ft.length;Bt++){const Ot=Ft[Bt];di(Ot,rt,Z),J.add(Ot)}else di(Ft,rt,Z),J.add(Ft)}),A=C.pop(),J},this.compileAsync=function(T,V,rt=null){const J=this.compile(T,V,rt);return new Promise(Z=>{function Ft(){if(J.forEach(function(Bt){_.get(Bt).currentProgram.isReady()&&J.delete(Bt)}),J.size===0){Z(T);return}setTimeout(Ft,10)}_t.get("KHR_parallel_shader_compile")!==null?Ft():setTimeout(Ft,10)})};let ui=null;function Xi(T){ui&&ui(T)}function Ie(){Te.stop()}function Le(){Te.start()}const Te=new Lc;Te.setAnimationLoop(Xi),typeof self<"u"&&Te.setContext(self),this.setAnimationLoop=function(T){ui=T,W.setAnimationLoop(T),T===null?Te.stop():Te.start()},W.addEventListener("sessionstart",Ie),W.addEventListener("sessionend",Le),this.render=function(T,V){if(V!==void 0&&V.isCamera!==!0){ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;const rt=W.enabled===!0&&W.isPresenting===!0,J=y!==null&&(I===null||rt)&&y.begin(b,I);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(V),V=W.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,V,I),A=Mt.get(T,C.length),A.init(V),C.push(A),xt.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),X.setFromProjectionMatrix(xt,zn,V.reversedDepth),tt=this.localClippingEnabled,H=At.init(this.clippingPlanes,tt),E=Gt.get(T,R.length),E.init(),R.push(E),W.enabled===!0&&W.isPresenting===!0){const Bt=b.xr.getDepthSensingMesh();Bt!==null&&ee(Bt,V,-1/0,b.sortObjects)}ee(T,V,0,b.sortObjects),E.finish(),b.sortObjects===!0&&E.sort(Vt,Yt),It=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,It&&bt.addToRenderList(E,T),this.info.render.frame++,H===!0&&At.beginShadows();const Z=A.state.shadowsArray;if(Nt.render(Z,T,V),H===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset(),(J&&y.hasRenderPass())===!1){const Bt=E.opaque,Ot=E.transmissive;if(A.setupLights(),V.isArrayCamera){const Ht=V.cameras;if(Ot.length>0)for(let qt=0,Qt=Ht.length;qt<Qt;qt++){const re=Ht[qt];We(Bt,Ot,T,re)}It&&bt.render(T);for(let qt=0,Qt=Ht.length;qt<Qt;qt++){const re=Ht[qt];Ze(E,T,re,re.viewport)}}else Ot.length>0&&We(Bt,Ot,T,V),It&&bt.render(T),Ze(E,T,V)}I!==null&&N===0&&(B.updateMultisampleRenderTarget(I),B.updateRenderTargetMipmap(I)),J&&y.end(b),T.isScene===!0&&T.onAfterRender(b,T,V),dt.resetDefaultState(),L=-1,k=null,C.pop(),C.length>0?(A=C[C.length-1],H===!0&&At.setGlobalState(b.clippingPlanes,A.state.camera)):A=null,R.pop(),R.length>0?E=R[R.length-1]:E=null};function ee(T,V,rt,J){if(T.visible===!1)return;if(T.layers.test(V.layers)){if(T.isGroup)rt=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(V);else if(T.isLight)A.pushLight(T),T.castShadow&&A.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||X.intersectsSprite(T)){J&&Lt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(xt);const Bt=gt.update(T),Ot=T.material;Ot.visible&&E.push(T,Bt,Ot,rt,Lt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||X.intersectsObject(T))){const Bt=gt.update(T),Ot=T.material;if(J&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Lt.copy(T.boundingSphere.center)):(Bt.boundingSphere===null&&Bt.computeBoundingSphere(),Lt.copy(Bt.boundingSphere.center)),Lt.applyMatrix4(T.matrixWorld).applyMatrix4(xt)),Array.isArray(Ot)){const Ht=Bt.groups;for(let qt=0,Qt=Ht.length;qt<Qt;qt++){const re=Ht[qt],jt=Ot[re.materialIndex];jt&&jt.visible&&E.push(T,Bt,jt,rt,Lt.z,re)}}else Ot.visible&&E.push(T,Bt,Ot,rt,Lt.z,null)}}const Ft=T.children;for(let Bt=0,Ot=Ft.length;Bt<Ot;Bt++)ee(Ft[Bt],V,rt,J)}function Ze(T,V,rt,J){const{opaque:Z,transmissive:Ft,transparent:Bt}=T;A.setupLightsView(rt),H===!0&&At.setGlobalState(b.clippingPlanes,rt),J&&pt.viewport(G.copy(J)),Z.length>0&&Be(Z,V,rt),Ft.length>0&&Be(Ft,V,rt),Bt.length>0&&Be(Bt,V,rt),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function We(T,V,rt,J){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[J.id]===void 0){const jt=_t.has("EXT_color_buffer_half_float")||_t.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[J.id]=new On(1,1,{generateMipmaps:!0,type:jt?Qn:an,minFilter:Ms,samples:Ct.samples,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ue.workingColorSpace})}const Ft=A.state.transmissionRenderTarget[J.id],Bt=J.viewport||G;Ft.setSize(Bt.z*b.transmissionResolutionScale,Bt.w*b.transmissionResolutionScale);const Ot=b.getRenderTarget(),Ht=b.getActiveCubeFace(),qt=b.getActiveMipmapLevel();b.setRenderTarget(Ft),b.getClearColor(at),Y=b.getClearAlpha(),Y<1&&b.setClearColor(16777215,.5),b.clear(),It&&bt.render(rt);const Qt=b.toneMapping;b.toneMapping=Fn;const re=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),A.setupLightsView(J),H===!0&&At.setGlobalState(b.clippingPlanes,J),Be(T,rt,J),B.updateMultisampleRenderTarget(Ft),B.updateRenderTargetMipmap(Ft),_t.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let Se=0,Dt=V.length;Se<Dt;Se++){const Je=V[Se],{object:Oe,geometry:Si,material:Kt,group:Li}=Je;if(Kt.side===Dn&&Oe.layers.test(J.layers)){const Re=Kt.side;Kt.side=Qi,Kt.needsUpdate=!0,le(Oe,rt,J,Si,Kt,Li),Kt.side=Re,Kt.needsUpdate=!0,jt=!0}}jt===!0&&(B.updateMultisampleRenderTarget(Ft),B.updateRenderTargetMipmap(Ft))}b.setRenderTarget(Ot,Ht,qt),b.setClearColor(at,Y),re!==void 0&&(J.viewport=re),b.toneMapping=Qt}function Be(T,V,rt){const J=V.isScene===!0?V.overrideMaterial:null;for(let Z=0,Ft=T.length;Z<Ft;Z++){const Bt=T[Z],{object:Ot,geometry:Ht,group:qt}=Bt;let Qt=Bt.material;Qt.allowOverride===!0&&J!==null&&(Qt=J),Ot.layers.test(rt.layers)&&le(Ot,V,rt,Ht,Qt,qt)}}function le(T,V,rt,J,Z,Ft){T.onBeforeRender(b,V,rt,J,Z,Ft),T.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Z.onBeforeRender(b,V,rt,J,T,Ft),Z.transparent===!0&&Z.side===Dn&&Z.forceSinglePass===!1?(Z.side=Qi,Z.needsUpdate=!0,b.renderBufferDirect(rt,V,J,Z,T,Ft),Z.side=ls,Z.needsUpdate=!0,b.renderBufferDirect(rt,V,J,Z,T,Ft),Z.side=Dn):b.renderBufferDirect(rt,V,J,Z,T,Ft),T.onAfterRender(b,V,rt,J,Z,Ft)}function ce(T,V,rt){V.isScene!==!0&&(V=zt);const J=_.get(T),Z=A.state.lights,Ft=A.state.shadowsArray,Bt=Z.state.version,Ot=lt.getParameters(T,Z.state,Ft,V,rt),Ht=lt.getProgramCacheKey(Ot);let qt=J.programs;J.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?V.environment:null,J.fog=V.fog;const Qt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;J.envMap=st.get(T.envMap||J.environment,Qt),J.envMapRotation=J.environment!==null&&T.envMap===null?V.environmentRotation:T.envMapRotation,qt===void 0&&(T.addEventListener("dispose",te),qt=new Map,J.programs=qt);let re=qt.get(Ht);if(re!==void 0){if(J.currentProgram===re&&J.lightsStateVersion===Bt)return ue(T,Ot),re}else Ot.uniforms=lt.getUniforms(T),T.onBeforeCompile(Ot,b),re=lt.acquireProgram(Ot,Ht),qt.set(Ht,re),J.uniforms=Ot.uniforms;const jt=J.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(jt.clippingPlanes=At.uniform),ue(T,Ot),J.needsLights=vi(T),J.lightsStateVersion=Bt,J.needsLights&&(jt.ambientLightColor.value=Z.state.ambient,jt.lightProbe.value=Z.state.probe,jt.directionalLights.value=Z.state.directional,jt.directionalLightShadows.value=Z.state.directionalShadow,jt.spotLights.value=Z.state.spot,jt.spotLightShadows.value=Z.state.spotShadow,jt.rectAreaLights.value=Z.state.rectArea,jt.ltc_1.value=Z.state.rectAreaLTC1,jt.ltc_2.value=Z.state.rectAreaLTC2,jt.pointLights.value=Z.state.point,jt.pointLightShadows.value=Z.state.pointShadow,jt.hemisphereLights.value=Z.state.hemi,jt.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,jt.spotLightMatrix.value=Z.state.spotLightMatrix,jt.spotLightMap.value=Z.state.spotLightMap,jt.pointShadowMatrix.value=Z.state.pointShadowMatrix),J.currentProgram=re,J.uniformsList=null,re}function Xe(T){if(T.uniformsList===null){const V=T.currentProgram.getUniforms();T.uniformsList=sa.seqWithValue(V.seq,T.uniforms)}return T.uniformsList}function ue(T,V){const rt=_.get(T);rt.outputColorSpace=V.outputColorSpace,rt.batching=V.batching,rt.batchingColor=V.batchingColor,rt.instancing=V.instancing,rt.instancingColor=V.instancingColor,rt.instancingMorph=V.instancingMorph,rt.skinning=V.skinning,rt.morphTargets=V.morphTargets,rt.morphNormals=V.morphNormals,rt.morphColors=V.morphColors,rt.morphTargetsCount=V.morphTargetsCount,rt.numClippingPlanes=V.numClippingPlanes,rt.numIntersection=V.numClipIntersection,rt.vertexAlphas=V.vertexAlphas,rt.vertexTangents=V.vertexTangents,rt.toneMapping=V.toneMapping}function xi(T,V,rt,J,Z){V.isScene!==!0&&(V=zt),B.resetTextureUnits();const Ft=V.fog,Bt=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?V.environment:null,Ot=I===null?b.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:js,Ht=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,qt=st.get(J.envMap||Bt,Ht),Qt=J.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,re=!!rt.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),jt=!!rt.morphAttributes.position,Se=!!rt.morphAttributes.normal,Dt=!!rt.morphAttributes.color;let Je=Fn;J.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Je=b.toneMapping);const Oe=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,Si=Oe!==void 0?Oe.length:0,Kt=_.get(J),Li=A.state.lights;if(H===!0&&(tt===!0||T!==k)){const de=T===k&&J.id===L;At.setState(J,T,de)}let Re=!1;J.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==Li.state.version||Kt.outputColorSpace!==Ot||Z.isBatchedMesh&&Kt.batching===!1||!Z.isBatchedMesh&&Kt.batching===!0||Z.isBatchedMesh&&Kt.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Kt.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Kt.instancing===!1||!Z.isInstancedMesh&&Kt.instancing===!0||Z.isSkinnedMesh&&Kt.skinning===!1||!Z.isSkinnedMesh&&Kt.skinning===!0||Z.isInstancedMesh&&Kt.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Kt.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Kt.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Kt.instancingMorph===!1&&Z.morphTexture!==null||Kt.envMap!==qt||J.fog===!0&&Kt.fog!==Ft||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==At.numPlanes||Kt.numIntersection!==At.numIntersection)||Kt.vertexAlphas!==Qt||Kt.vertexTangents!==re||Kt.morphTargets!==jt||Kt.morphNormals!==Se||Kt.morphColors!==Dt||Kt.toneMapping!==Je||Kt.morphTargetsCount!==Si)&&(Re=!0):(Re=!0,Kt.__version=J.version);let ct=Kt.currentProgram;Re===!0&&(ct=ce(J,V,Z));let ye=!1,Ae=!1,et=!1;const j=ct.getUniforms(),fe=Kt.uniforms;if(pt.useProgram(ct.program)&&(ye=!0,Ae=!0,et=!0),J.id!==L&&(L=J.id,Ae=!0),ye||k!==T){pt.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),j.setValue(z,"projectionMatrix",T.projectionMatrix),j.setValue(z,"viewMatrix",T.matrixWorldInverse);const we=j.map.cameraPosition;we!==void 0&&we.setValue(z,Ut.setFromMatrixPosition(T.matrixWorld)),Ct.logarithmicDepthBuffer&&j.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&j.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),k!==T&&(k=T,Ae=!0,et=!0)}if(Kt.needsLights&&(Li.state.directionalShadowMap.length>0&&j.setValue(z,"directionalShadowMap",Li.state.directionalShadowMap,B),Li.state.spotShadowMap.length>0&&j.setValue(z,"spotShadowMap",Li.state.spotShadowMap,B),Li.state.pointShadowMap.length>0&&j.setValue(z,"pointShadowMap",Li.state.pointShadowMap,B)),Z.isSkinnedMesh){j.setOptional(z,Z,"bindMatrix"),j.setOptional(z,Z,"bindMatrixInverse");const de=Z.skeleton;de&&(de.boneTexture===null&&de.computeBoneTexture(),j.setValue(z,"boneTexture",de.boneTexture,B))}Z.isBatchedMesh&&(j.setOptional(z,Z,"batchingTexture"),j.setValue(z,"batchingTexture",Z._matricesTexture,B),j.setOptional(z,Z,"batchingIdTexture"),j.setValue(z,"batchingIdTexture",Z._indirectTexture,B),j.setOptional(z,Z,"batchingColorTexture"),Z._colorsTexture!==null&&j.setValue(z,"batchingColorTexture",Z._colorsTexture,B));const $e=rt.morphAttributes;if(($e.position!==void 0||$e.normal!==void 0||$e.color!==void 0)&&vt.update(Z,rt,ct),(Ae||Kt.receiveShadow!==Z.receiveShadow)&&(Kt.receiveShadow=Z.receiveShadow,j.setValue(z,"receiveShadow",Z.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&V.environment!==null&&(fe.envMapIntensity.value=V.environmentIntensity),fe.dfgLUT!==void 0&&(fe.dfgLUT.value=cx()),Ae&&(j.setValue(z,"toneMappingExposure",b.toneMappingExposure),Kt.needsLights&&gi(fe,et),Ft&&J.fog===!0&&St.refreshFogUniforms(fe,Ft),St.refreshMaterialUniforms(fe,J,mt,Q,A.state.transmissionRenderTarget[T.id]),sa.upload(z,Xe(Kt),fe,B)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(sa.upload(z,Xe(Kt),fe,B),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&j.setValue(z,"center",Z.center),j.setValue(z,"modelViewMatrix",Z.modelViewMatrix),j.setValue(z,"normalMatrix",Z.normalMatrix),j.setValue(z,"modelMatrix",Z.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const de=J.uniformsGroups;for(let we=0,qe=de.length;we<qe;we++){const $t=de[we];ot.update($t,ct),ot.bind($t,ct)}}return ct}function gi(T,V){T.ambientLightColor.needsUpdate=V,T.lightProbe.needsUpdate=V,T.directionalLights.needsUpdate=V,T.directionalLightShadows.needsUpdate=V,T.pointLights.needsUpdate=V,T.pointLightShadows.needsUpdate=V,T.spotLights.needsUpdate=V,T.spotLightShadows.needsUpdate=V,T.rectAreaLights.needsUpdate=V,T.hemisphereLights.needsUpdate=V}function vi(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,V,rt){const J=_.get(T);J.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),_.get(T.texture).__webglTexture=V,_.get(T.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:rt,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,V){const rt=_.get(T);rt.__webglFramebuffer=V,rt.__useDefaultFramebuffer=V===void 0};const _i=z.createFramebuffer();this.setRenderTarget=function(T,V=0,rt=0){I=T,w=V,N=rt;let J=null,Z=!1,Ft=!1;if(T){const Ot=_.get(T);if(Ot.__useDefaultFramebuffer!==void 0){pt.bindFramebuffer(z.FRAMEBUFFER,Ot.__webglFramebuffer),G.copy(T.viewport),U.copy(T.scissor),K=T.scissorTest,pt.viewport(G),pt.scissor(U),pt.setScissorTest(K),L=-1;return}else if(Ot.__webglFramebuffer===void 0)B.setupRenderTarget(T);else if(Ot.__hasExternalTextures)B.rebindTextures(T,_.get(T.texture).__webglTexture,_.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Qt=T.depthTexture;if(Ot.__boundDepthTexture!==Qt){if(Qt!==null&&_.has(Qt)&&(T.width!==Qt.image.width||T.height!==Qt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");B.setupDepthRenderbuffer(T)}}const Ht=T.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(Ft=!0);const qt=_.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(qt[V])?J=qt[V][rt]:J=qt[V],Z=!0):T.samples>0&&B.useMultisampledRTT(T)===!1?J=_.get(T).__webglMultisampledFramebuffer:Array.isArray(qt)?J=qt[rt]:J=qt,G.copy(T.viewport),U.copy(T.scissor),K=T.scissorTest}else G.copy(nt).multiplyScalar(mt).floor(),U.copy($).multiplyScalar(mt).floor(),K=O;if(rt!==0&&(J=_i),pt.bindFramebuffer(z.FRAMEBUFFER,J)&&pt.drawBuffers(T,J),pt.viewport(G),pt.scissor(U),pt.setScissorTest(K),Z){const Ot=_.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+V,Ot.__webglTexture,rt)}else if(Ft){const Ot=V;for(let Ht=0;Ht<T.textures.length;Ht++){const qt=_.get(T.textures[Ht]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ht,qt.__webglTexture,rt,Ot)}}else if(T!==null&&rt!==0){const Ot=_.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ot.__webglTexture,rt)}L=-1},this.readRenderTargetPixels=function(T,V,rt,J,Z,Ft,Bt,Ot=0){if(!(T&&T.isWebGLRenderTarget)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ht=_.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Bt!==void 0&&(Ht=Ht[Bt]),Ht){pt.bindFramebuffer(z.FRAMEBUFFER,Ht);try{const qt=T.textures[Ot],Qt=qt.format,re=qt.type;if(T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ot),!Ct.textureFormatReadable(Qt)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(re)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=T.width-J&&rt>=0&&rt<=T.height-Z&&z.readPixels(V,rt,J,Z,Rt.convert(Qt),Rt.convert(re),Ft)}finally{const qt=I!==null?_.get(I).__webglFramebuffer:null;pt.bindFramebuffer(z.FRAMEBUFFER,qt)}}},this.readRenderTargetPixelsAsync=async function(T,V,rt,J,Z,Ft,Bt,Ot=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ht=_.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Bt!==void 0&&(Ht=Ht[Bt]),Ht)if(V>=0&&V<=T.width-J&&rt>=0&&rt<=T.height-Z){pt.bindFramebuffer(z.FRAMEBUFFER,Ht);const qt=T.textures[Ot],Qt=qt.format,re=qt.type;if(T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ot),!Ct.textureFormatReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const jt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,jt),z.bufferData(z.PIXEL_PACK_BUFFER,Ft.byteLength,z.STREAM_READ),z.readPixels(V,rt,J,Z,Rt.convert(Qt),Rt.convert(re),0);const Se=I!==null?_.get(I).__webglFramebuffer:null;pt.bindFramebuffer(z.FRAMEBUFFER,Se);const Dt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Cu(z,Dt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,jt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Ft),z.deleteBuffer(jt),z.deleteSync(Dt),Ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,V=null,rt=0){const J=Math.pow(2,-rt),Z=Math.floor(T.image.width*J),Ft=Math.floor(T.image.height*J),Bt=V!==null?V.x:0,Ot=V!==null?V.y:0;B.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,rt,0,0,Bt,Ot,Z,Ft),pt.unbindTexture()};const pi=z.createFramebuffer(),mi=z.createFramebuffer();this.copyTextureToTexture=function(T,V,rt=null,J=null,Z=0,Ft=0){let Bt,Ot,Ht,qt,Qt,re,jt,Se,Dt;const Je=T.isCompressedTexture?T.mipmaps[Ft]:T.image;if(rt!==null)Bt=rt.max.x-rt.min.x,Ot=rt.max.y-rt.min.y,Ht=rt.isBox3?rt.max.z-rt.min.z:1,qt=rt.min.x,Qt=rt.min.y,re=rt.isBox3?rt.min.z:0;else{const fe=Math.pow(2,-Z);Bt=Math.floor(Je.width*fe),Ot=Math.floor(Je.height*fe),T.isDataArrayTexture?Ht=Je.depth:T.isData3DTexture?Ht=Math.floor(Je.depth*fe):Ht=1,qt=0,Qt=0,re=0}J!==null?(jt=J.x,Se=J.y,Dt=J.z):(jt=0,Se=0,Dt=0);const Oe=Rt.convert(V.format),Si=Rt.convert(V.type);let Kt;V.isData3DTexture?(B.setTexture3D(V,0),Kt=z.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(B.setTexture2DArray(V,0),Kt=z.TEXTURE_2D_ARRAY):(B.setTexture2D(V,0),Kt=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,V.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,V.unpackAlignment);const Li=z.getParameter(z.UNPACK_ROW_LENGTH),Re=z.getParameter(z.UNPACK_IMAGE_HEIGHT),ct=z.getParameter(z.UNPACK_SKIP_PIXELS),ye=z.getParameter(z.UNPACK_SKIP_ROWS),Ae=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,Je.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Je.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,qt),z.pixelStorei(z.UNPACK_SKIP_ROWS,Qt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,re);const et=T.isDataArrayTexture||T.isData3DTexture,j=V.isDataArrayTexture||V.isData3DTexture;if(T.isDepthTexture){const fe=_.get(T),$e=_.get(V),de=_.get(fe.__renderTarget),we=_.get($e.__renderTarget);pt.bindFramebuffer(z.READ_FRAMEBUFFER,de.__webglFramebuffer),pt.bindFramebuffer(z.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let qe=0;qe<Ht;qe++)et&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,_.get(T).__webglTexture,Z,re+qe),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,_.get(V).__webglTexture,Ft,Dt+qe)),z.blitFramebuffer(qt,Qt,Bt,Ot,jt,Se,Bt,Ot,z.DEPTH_BUFFER_BIT,z.NEAREST);pt.bindFramebuffer(z.READ_FRAMEBUFFER,null),pt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Z!==0||T.isRenderTargetTexture||_.has(T)){const fe=_.get(T),$e=_.get(V);pt.bindFramebuffer(z.READ_FRAMEBUFFER,pi),pt.bindFramebuffer(z.DRAW_FRAMEBUFFER,mi);for(let de=0;de<Ht;de++)et?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,fe.__webglTexture,Z,re+de):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,fe.__webglTexture,Z),j?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,$e.__webglTexture,Ft,Dt+de):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,$e.__webglTexture,Ft),Z!==0?z.blitFramebuffer(qt,Qt,Bt,Ot,jt,Se,Bt,Ot,z.COLOR_BUFFER_BIT,z.NEAREST):j?z.copyTexSubImage3D(Kt,Ft,jt,Se,Dt+de,qt,Qt,Bt,Ot):z.copyTexSubImage2D(Kt,Ft,jt,Se,qt,Qt,Bt,Ot);pt.bindFramebuffer(z.READ_FRAMEBUFFER,null),pt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else j?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(Kt,Ft,jt,Se,Dt,Bt,Ot,Ht,Oe,Si,Je.data):V.isCompressedArrayTexture?z.compressedTexSubImage3D(Kt,Ft,jt,Se,Dt,Bt,Ot,Ht,Oe,Je.data):z.texSubImage3D(Kt,Ft,jt,Se,Dt,Bt,Ot,Ht,Oe,Si,Je):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Ft,jt,Se,Bt,Ot,Oe,Si,Je.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Ft,jt,Se,Je.width,Je.height,Oe,Je.data):z.texSubImage2D(z.TEXTURE_2D,Ft,jt,Se,Bt,Ot,Oe,Si,Je);z.pixelStorei(z.UNPACK_ROW_LENGTH,Li),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Re),z.pixelStorei(z.UNPACK_SKIP_PIXELS,ct),z.pixelStorei(z.UNPACK_SKIP_ROWS,ye),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Ae),Ft===0&&V.generateMipmaps&&z.generateMipmap(Kt),pt.unbindTexture()},this.initRenderTarget=function(T){_.get(T).__webglFramebuffer===void 0&&B.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?B.setTextureCube(T,0):T.isData3DTexture?B.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?B.setTexture2DArray(T,0):B.setTexture2D(T,0),pt.unbindTexture()},this.resetState=function(){w=0,N=0,I=null,pt.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Ue._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ue._getUnpackColorSpace()}}function fx(){const n=new ux({antialias:!0});return n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio),n.shadowMap.enabled=!0,n.shadowMap.type=ic,n.outputColorSpace=sn,document.body.appendChild(n.domElement),{renderer:n}}function dx(){const n=new Xu;n.background=new Ne("#87ceeb"),n.fog=new zh("#87ceeb",40,180);const t=new mf(16777215,.7);n.add(t);const e=new pf(16777215,1.2);e.position.set(15,25,10),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048,e.shadow.camera.far=200,e.shadow.camera.left=-80,e.shadow.camera.right=80,e.shadow.camera.top=80,e.shadow.camera.bottom=-80,n.add(e);const s=new uf("#87ceeb","#4a7c59",.3);return n.add(s),{scene:n}}const px=new it(0,12,9),cr=new it,mx=.88,xx=.7;function gx(n){const t=new hn(50,n,.1,1e3);t.position.set(0,12,9);let e=0,s=0;function r(o){cr.addVectors(o.position,px),e>.001?(s+=xx,cr.x+=Math.sin(s*17.3)*e,cr.y+=Math.cos(s*23.7)*e*.6,cr.z+=Math.sin(s*13.1)*e*.4,e*=mx):e=0,t.position.copy(cr),t.lookAt(o.position.x,o.position.y,o.position.z)}function a(o){e=Math.max(e,o)}return{camera:t,update:r,shake:a}}function vx(){const n={forward:!1,backward:!1,left:!1,right:!1,interact:!1};function t(s){switch(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(s.code)&&s.preventDefault(),s.code){case"KeyW":case"ArrowUp":n.forward=!0;break;case"KeyS":case"ArrowDown":n.backward=!0;break;case"KeyA":case"ArrowLeft":n.left=!0;break;case"KeyD":case"ArrowRight":n.right=!0;break;case"KeyE":n.interact=!0;break}}function e(s){switch(s.code){case"KeyW":case"ArrowUp":n.forward=!1;break;case"KeyS":case"ArrowDown":n.backward=!1;break;case"KeyA":case"ArrowLeft":n.left=!1;break;case"KeyD":case"ArrowRight":n.right=!1;break;case"KeyE":n.interact=!1;break}}return window.addEventListener("keydown",t),window.addEventListener("keyup",e),{keys:n}}Number.EPSILON===void 0&&(Number.EPSILON=Math.pow(2,-52));Math.sign===void 0&&(Math.sign=function(n){return n<0?-1:n>0?1:+n});Function.prototype.name===void 0&&Object.defineProperty(Function.prototype,"name",{get:function(){return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]}});Object.assign===void 0&&(function(){Object.assign=function(n){if(n==null)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(n),e=1;e<arguments.length;e++){var s=arguments[e];if(s!=null)for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r])}return t}})();var _x="1.0.9",yx=0,Mx=1,Sx=2,bx=3,Ex=0,ha=1,dr=2,Tx=0,Yn=1,jn=2,gs=3,pr=4,wx=5,Ax=0,Rx=1,Cx=2,Px=3,Nx=4,Ix=5,Lx=6,va=.005,Tt={sqrt:Math.sqrt,abs:Math.abs,floor:Math.floor,cos:Math.cos,sin:Math.sin,acos:Math.acos,asin:Math.asin,atan2:Math.atan2,round:Math.round,pow:Math.pow,max:Math.max,min:Math.min,random:Math.random,degtorad:.017453292519943295,radtodeg:57.29577951308232,PI:3.141592653589793,TwoPI:6.283185307179586,PI90:1.570796326794896,PI270:4.712388980384689,INF:1/0,EPZ:1e-5,EPZ2:1e-6,lerp:function(n,t,e){return(1-e)*n+e*t},randInt:function(n,t){return n+Tt.floor(Tt.random()*(t-n+1))},rand:function(n,t){return n+Tt.random()*(t-n)},generateUUID:(function(){var n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),t=new Array(36),e=0,s;return function(){for(var a=0;a<36;a++)a===8||a===13||a===18||a===23?t[a]="-":a===14?t[a]="4":(e<=2&&(e=33554432+Math.random()*16777216|0),s=e&15,e=e>>4,t[a]=n[a===19?s&3|8:s]);return t.join("")}})(),int:function(n){return Tt.floor(n)},fix:function(n,t){return n.toFixed(t||3,10)},clamp:function(n,t,e){return Tt.max(t,Tt.min(e,n))},distance:function(n,t){var e=t[0]-n[0],s=t[1]-n[1],r=t[2]-n[2];return Tt.sqrt(e*e+s*s+r*r)},acosClamp:function(n){return n>1?0:n<-1?Tt.PI:Tt.acos(n)},distanceVector:function(n,t){var e=n.x-t.x,s=n.y-t.y,r=n.z-t.z;return e*e+s*s+r*r},dotVectors:function(n,t){return n.x*t.x+n.y*t.y+n.z*t.z}};function Ci(n,t){console.error("[OIMO] "+n+": "+t)}function Bc(n){this.parent=n,this.infos=new Float32Array(13),this.f=[0,0,0],this.times=[0,0,0,0],this.broadPhase=this.parent.broadPhaseType,this.version=_x,this.fps=0,this.tt=0,this.broadPhaseTime=0,this.narrowPhaseTime=0,this.solvingTime=0,this.totalTime=0,this.updateTime=0,this.MaxBroadPhaseTime=0,this.MaxNarrowPhaseTime=0,this.MaxSolvingTime=0,this.MaxTotalTime=0,this.MaxUpdateTime=0}Object.assign(Bc.prototype,{setTime:function(n){this.times[n||0]=performance.now()},resetMax:function(){this.MaxBroadPhaseTime=0,this.MaxNarrowPhaseTime=0,this.MaxSolvingTime=0,this.MaxTotalTime=0,this.MaxUpdateTime=0},calcBroadPhase:function(){this.setTime(2),this.broadPhaseTime=this.times[2]-this.times[1]},calcNarrowPhase:function(){this.setTime(3),this.narrowPhaseTime=this.times[3]-this.times[2]},calcEnd:function(){this.setTime(2),this.solvingTime=this.times[2]-this.times[1],this.totalTime=this.times[2]-this.times[0],this.updateTime=this.totalTime-(this.broadPhaseTime+this.narrowPhaseTime+this.solvingTime),this.tt===100&&this.resetMax(),this.tt>100&&(this.broadPhaseTime>this.MaxBroadPhaseTime&&(this.MaxBroadPhaseTime=this.broadPhaseTime),this.narrowPhaseTime>this.MaxNarrowPhaseTime&&(this.MaxNarrowPhaseTime=this.narrowPhaseTime),this.solvingTime>this.MaxSolvingTime&&(this.MaxSolvingTime=this.solvingTime),this.totalTime>this.MaxTotalTime&&(this.MaxTotalTime=this.totalTime),this.updateTime>this.MaxUpdateTime&&(this.MaxUpdateTime=this.updateTime)),this.upfps(),this.tt++,this.tt>500&&(this.tt=0)},upfps:function(){this.f[1]=Date.now(),this.f[1]-1e3>this.f[0]&&(this.f[0]=this.f[1],this.fps=this.f[2],this.f[2]=0),this.f[2]++},show:function(){var n=["Oimo.js "+this.version+"<br>",this.broadPhase+"<br><br>","FPS: "+this.fps+" fps<br><br>","rigidbody "+this.parent.numRigidBodies+"<br>","contact &nbsp;&nbsp;"+this.parent.numContacts+"<br>","ct-point &nbsp;"+this.parent.numContactPoints+"<br>","paircheck "+this.parent.broadPhase.numPairChecks+"<br>","island &nbsp;&nbsp;&nbsp;"+this.parent.numIslands+"<br><br>","Time in milliseconds<br><br>","broadphase &nbsp;"+Tt.fix(this.broadPhaseTime)+" | "+Tt.fix(this.MaxBroadPhaseTime)+"<br>","narrowphase "+Tt.fix(this.narrowPhaseTime)+" | "+Tt.fix(this.MaxNarrowPhaseTime)+"<br>","solving &nbsp;&nbsp;&nbsp;&nbsp;"+Tt.fix(this.solvingTime)+" | "+Tt.fix(this.MaxSolvingTime)+"<br>","total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+Tt.fix(this.totalTime)+" | "+Tt.fix(this.MaxTotalTime)+"<br>","updating &nbsp;&nbsp;&nbsp;"+Tt.fix(this.updateTime)+" | "+Tt.fix(this.MaxUpdateTime)+"<br>"].join(`
`);return n},toArray:function(){return this.infos[0]=this.parent.broadPhase.types,this.infos[1]=this.parent.numRigidBodies,this.infos[2]=this.parent.numContacts,this.infos[3]=this.parent.broadPhase.numPairChecks,this.infos[4]=this.parent.numContactPoints,this.infos[5]=this.parent.numIslands,this.infos[6]=this.broadPhaseTime,this.infos[7]=this.narrowPhaseTime,this.infos[8]=this.solvingTime,this.infos[9]=this.updateTime,this.infos[10]=this.totalTime,this.infos[11]=this.fps,this.infos}});function yt(n,t,e){this.x=n||0,this.y=t||0,this.z=e||0}Object.assign(yt.prototype,{Vec3:!0,set:function(n,t,e){return this.x=n,this.y=t,this.z=e,this},add:function(n,t){return t!==void 0?this.addVectors(n,t):(this.x+=n.x,this.y+=n.y,this.z+=n.z,this)},addVectors:function(n,t){return this.x=n.x+t.x,this.y=n.y+t.y,this.z=n.z+t.z,this},addEqual:function(n){return this.x+=n.x,this.y+=n.y,this.z+=n.z,this},sub:function(n,t){return t!==void 0?this.subVectors(n,t):(this.x-=n.x,this.y-=n.y,this.z-=n.z,this)},subVectors:function(n,t){return this.x=n.x-t.x,this.y=n.y-t.y,this.z=n.z-t.z,this},subEqual:function(n){return this.x-=n.x,this.y-=n.y,this.z-=n.z,this},scale:function(n,t){return this.x=n.x*t,this.y=n.y*t,this.z=n.z*t,this},scaleEqual:function(n){return this.x*=n,this.y*=n,this.z*=n,this},multiply:function(n){return this.x*=n.x,this.y*=n.y,this.z*=n.z,this},multiplyScalar:function(n){return this.x*=n,this.y*=n,this.z*=n,this},addScaledVector:function(n,t){return this.x+=n.x*t,this.y+=n.y*t,this.z+=n.z*t,this},subScaledVector:function(n,t){return this.x-=n.x*t,this.y-=n.y*t,this.z-=n.z*t,this},cross:function(n,t){if(t!==void 0)return this.crossVectors(n,t);var e=this.x,s=this.y,r=this.z;return this.x=s*n.z-r*n.y,this.y=r*n.x-e*n.z,this.z=e*n.y-s*n.x,this},crossVectors:function(n,t){var e=n.x,s=n.y,r=n.z,a=t.x,o=t.y,h=t.z;return this.x=s*h-r*o,this.y=r*a-e*h,this.z=e*o-s*a,this},tangent:function(n){var t=n.x,e=n.y,s=n.z;return this.x=e*t-s*s,this.y=-s*e-t*t,this.z=t*s+e*e,this},invert:function(n){return this.x=-n.x,this.y=-n.y,this.z=-n.z,this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},dot:function(n){return this.x*n.x+this.y*n.y+this.z*n.z},addition:function(){return this.x+this.y+this.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Tt.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},copy:function(n){return this.x=n.x,this.y=n.y,this.z=n.z,this},applyMatrix3:function(n,t){var e=this.x,s=this.y,r=this.z,a=n.elements;return t?(this.x=a[0]*e+a[1]*s+a[2]*r,this.y=a[3]*e+a[4]*s+a[5]*r,this.z=a[6]*e+a[7]*s+a[8]*r):(this.x=a[0]*e+a[3]*s+a[6]*r,this.y=a[1]*e+a[4]*s+a[7]*r,this.z=a[2]*e+a[5]*s+a[8]*r),this},applyQuaternion:function(n){var t=this.x,e=this.y,s=this.z,r=n.x,a=n.y,o=n.z,h=n.w,l=h*t+a*s-o*e,c=h*e+o*t-r*s,u=h*s+r*e-a*t,f=-r*t-a*e-o*s;return this.x=l*h+f*-r+c*-o-u*-a,this.y=c*h+f*-a+u*-r-l*-o,this.z=u*h+f*-o+l*-a-c*-r,this},testZero:function(){return this.x!==0||this.y!==0||this.z!==0},testDiff:function(n){return!this.equals(n)},equals:function(n){return n.x===this.x&&n.y===this.y&&n.z===this.z},clone:function(){return new this.constructor(this.x,this.y,this.z)},toString:function(){return"Vec3["+this.x.toFixed(4)+", "+this.y.toFixed(4)+", "+this.z.toFixed(4)+"]"},multiplyScalar:function(n){return isFinite(n)?(this.x*=n,this.y*=n,this.z*=n):(this.x=0,this.y=0,this.z=0),this},divideScalar:function(n){return this.multiplyScalar(1/n)},normalize:function(){return this.divideScalar(this.length())},toArray:function(n,t){t===void 0&&(t=0),n[t]=this.x,n[t+1]=this.y,n[t+2]=this.z},fromArray:function(n,t){return t===void 0&&(t=0),this.x=n[t],this.y=n[t+1],this.z=n[t+2],this}});function Ni(n,t,e,s){this.x=n||0,this.y=t||0,this.z=e||0,this.w=s!==void 0?s:1}Object.assign(Ni.prototype,{Quat:!0,set:function(n,t,e,s){return this.x=n,this.y=t,this.z=e,this.w=s,this},addTime:function(n,t){var e=n.x,s=n.y,r=n.z,a=this.w,o=this.x,h=this.y,l=this.z;return t*=.5,this.x+=t*(e*a+s*l-r*h),this.y+=t*(s*a+r*o-e*l),this.z+=t*(r*a+e*h-s*o),this.w+=t*(-e*o-s*h-r*l),this.normalize(),this},multiply:function(n,t){return t!==void 0?this.multiplyQuaternions(n,t):this.multiplyQuaternions(this,n)},multiplyQuaternions:function(n,t){var e=n.x,s=n.y,r=n.z,a=n.w,o=t.x,h=t.y,l=t.z,c=t.w;return this.x=e*c+a*o+s*l-r*h,this.y=s*c+a*h+r*o-e*l,this.z=r*c+a*l+e*h-s*o,this.w=a*c-e*o-s*h-r*l,this},setFromUnitVectors:function(n,t){var e=new yt,s=n.dot(t)+1;return s<Tt.EPS2?(s=0,Tt.abs(n.x)>Tt.abs(n.z)?e.set(-n.y,n.x,0):e.set(0,-n.z,n.y)):e.crossVectors(n,t),this._x=e.x,this._y=e.y,this._z=e.z,this._w=s,this.normalize()},arc:function(n,t){var e=n.x,s=n.y,r=n.z,a=t.x,o=t.y,h=t.z,l=e*a+s*o+r*h;if(l==-1)return a=s*e-r*r,o=-r*s-e*e,h=e*r+s*s,l=1/Tt.sqrt(a*a+o*o+h*h),this.w=0,this.x=a*l,this.y=o*l,this.z=h*l,this;var c=s*h-r*o,u=r*a-e*h,f=e*o-s*a;return this.w=Tt.sqrt((1+l)*.5),l=.5/this.w,this.x=c*l,this.y=u*l,this.z=f*l,this},normalize:function(){var n=this.length();return n===0?this.set(0,0,0,1):(n=1/n,this.x=this.x*n,this.y=this.y*n,this.z=this.z*n,this.w=this.w*n),this},inverse:function(){return this.conjugate().normalize()},invert:function(n){return this.x=n.x,this.y=n.y,this.z=n.z,this.w=n.w,this.conjugate().normalize(),this},conjugate:function(){return this.x*=-1,this.y*=-1,this.z*=-1,this},length:function(){return Tt.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},copy:function(n){return this.x=n.x,this.y=n.y,this.z=n.z,this.w=n.w,this},clone:function(n){return new Ni(this.x,this.y,this.z,this.w)},testDiff:function(n){return!this.equals(n)},equals:function(n){return this.x===n.x&&this.y===n.y&&this.z===n.z&&this.w===n.w},toString:function(){return"Quat["+this.x.toFixed(4)+", ("+this.y.toFixed(4)+", "+this.z.toFixed(4)+", "+this.w.toFixed(4)+")]"},setFromEuler:function(n,t,e){var s=Math.cos(n*.5),r=Math.cos(t*.5),a=Math.cos(e*.5),o=Math.sin(n*.5),h=Math.sin(t*.5),l=Math.sin(e*.5);return this.x=o*r*a+s*h*l,this.y=s*h*a-o*r*l,this.z=s*r*l+o*h*a,this.w=s*r*a-o*h*l,this},setFromAxis:function(n,t){n.normalize(),t=t*.5;var e=Tt.sin(t);return this.x=e*n.x,this.y=e*n.y,this.z=e*n.z,this.w=Tt.cos(t),this},setFromMat33:function(n){var t=n[0]+n[4]+n[8],e;if(t>0)e=Tt.sqrt(t+1),this.w=.5/e,e=.5/e,this.x=(n[5]-n[7])*e,this.y=(n[6]-n[2])*e,this.z=(n[1]-n[3])*e;else{var s=[],r=0;n[4]>n[0]&&(r=1),n[8]>n[r*3+r]&&(r=2);var a=(r+1)%3,o=(r+2)%3;e=Tt.sqrt(n[r*3+r]-n[a*3+a]-n[o*3+o]+1),s[r]=.5*fRoot,e=.5/fRoot,this.w=(n[a*3+o]-n[o*3+a])*e,s[a]=(n[a*3+r]+n[r*3+a])*e,s[o]=(n[o*3+r]+n[r*3+o])*e,this.x=s[1],this.y=s[2],this.z=s[3]}return this},toArray:function(n,t){t=t||0,n[t]=this.x,n[t+1]=this.y,n[t+2]=this.z,n[t+3]=this.w},fromArray:function(n,t){return t=t||0,this.set(n[t],n[t+1],n[t+2],n[t+3]),this}});function bi(n,t,e,s,r,a,o,h,l){this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("OIMO.Mat33: the constructor no longer reads arguments. use .set() instead.")}Object.assign(bi.prototype,{Mat33:!0,set:function(n,t,e,s,r,a,o,h,l){var c=this.elements;return c[0]=n,c[1]=t,c[2]=e,c[3]=s,c[4]=r,c[5]=a,c[6]=o,c[7]=h,c[8]=l,this},add:function(n,t){if(t!==void 0)return this.addMatrixs(n,t);var e=this.elements,s=n.elements;return e[0]+=s[0],e[1]+=s[1],e[2]+=s[2],e[3]+=s[3],e[4]+=s[4],e[5]+=s[5],e[6]+=s[6],e[7]+=s[7],e[8]+=s[8],this},addMatrixs:function(n,t){var e=this.elements,s=n.elements,r=t.elements;return e[0]=s[0]+r[0],e[1]=s[1]+r[1],e[2]=s[2]+r[2],e[3]=s[3]+r[3],e[4]=s[4]+r[4],e[5]=s[5]+r[5],e[6]=s[6]+r[6],e[7]=s[7]+r[7],e[8]=s[8]+r[8],this},addEqual:function(n){var t=this.elements,e=n.elements;return t[0]+=e[0],t[1]+=e[1],t[2]+=e[2],t[3]+=e[3],t[4]+=e[4],t[5]+=e[5],t[6]+=e[6],t[7]+=e[7],t[8]+=e[8],this},sub:function(n,t){if(t!==void 0)return this.subMatrixs(n,t);var e=this.elements,s=n.elements;return e[0]-=s[0],e[1]-=s[1],e[2]-=s[2],e[3]-=s[3],e[4]-=s[4],e[5]-=s[5],e[6]-=s[6],e[7]-=s[7],e[8]-=s[8],this},subMatrixs:function(n,t){var e=this.elements,s=n.elements,r=t.elements;return e[0]=s[0]-r[0],e[1]=s[1]-r[1],e[2]=s[2]-r[2],e[3]=s[3]-r[3],e[4]=s[4]-r[4],e[5]=s[5]-r[5],e[6]=s[6]-r[6],e[7]=s[7]-r[7],e[8]=s[8]-r[8],this},subEqual:function(n){var t=this.elements,e=n.elements;return t[0]-=e[0],t[1]-=e[1],t[2]-=e[2],t[3]-=e[3],t[4]-=e[4],t[5]-=e[5],t[6]-=e[6],t[7]-=e[7],t[8]-=e[8],this},scale:function(n,t){var e=this.elements,s=n.elements;return e[0]=s[0]*t,e[1]=s[1]*t,e[2]=s[2]*t,e[3]=s[3]*t,e[4]=s[4]*t,e[5]=s[5]*t,e[6]=s[6]*t,e[7]=s[7]*t,e[8]=s[8]*t,this},scaleEqual:function(n){var t=this.elements;return t[0]*=n,t[1]*=n,t[2]*=n,t[3]*=n,t[4]*=n,t[5]*=n,t[6]*=n,t[7]*=n,t[8]*=n,this},multiplyMatrices:function(n,t,e){e&&(t=t.clone().transpose());var s=this.elements,r=n.elements,a=t.elements,o=r[0],h=r[3],l=r[6],c=r[1],u=r[4],f=r[7],d=r[2],x=r[5],g=r[8],v=a[0],p=a[3],m=a[6],S=a[1],M=a[4],E=a[7],A=a[2],R=a[5],C=a[8];return s[0]=o*v+c*p+d*m,s[1]=o*S+c*M+d*E,s[2]=o*A+c*R+d*C,s[3]=h*v+u*p+x*m,s[4]=h*S+u*M+x*E,s[5]=h*A+u*R+x*C,s[6]=l*v+f*p+g*m,s[7]=l*S+f*M+g*E,s[8]=l*A+f*R+g*C,this},transpose:function(n){if(n!==void 0){var t=n.elements;return this.set(t[0],t[3],t[6],t[1],t[4],t[7],t[2],t[5],t[8]),this}var e=this.elements,s=e[1],r=e[2],a=e[5];return e[1]=e[3],e[2]=e[6],e[3]=s,e[5]=e[7],e[6]=r,e[7]=a,this},setQuat:function(n){var t=this.elements,e=n.x,s=n.y,r=n.z,a=n.w,o=e+e,h=s+s,l=r+r,c=e*o,u=e*h,f=e*l,d=s*h,x=s*l,g=r*l,v=a*o,p=a*h,m=a*l;return t[0]=1-(d+g),t[1]=u-m,t[2]=f+p,t[3]=u+m,t[4]=1-(c+g),t[5]=x-v,t[6]=f-p,t[7]=x+v,t[8]=1-(c+d),this},invert:function(n){var t=this.elements,e=n.elements,s=e[0],r=e[3],a=e[6],o=e[1],h=e[4],l=e[7],c=e[2],u=e[5],f=e[8],d=f*h-u*l,x=-f*r+u*a,g=l*r-h*a,v=s*d+o*x+c*g;return v===0?(console.log("can't invert matrix, determinant is 0"),this.identity()):(v=1/v,t[0]=d*v,t[1]=(-f*o+c*l)*v,t[2]=(u*o-c*h)*v,t[3]=x*v,t[4]=(f*s-c*a)*v,t[5]=(-u*s+c*r)*v,t[6]=g*v,t[7]=(-l*s+o*a)*v,t[8]=(h*s-o*r)*v,this)},addOffset:function(n,t){var e=t.x,s=t.y,r=t.z,a=this.elements;a[0]+=n*(s*s+r*r),a[4]+=n*(e*e+r*r),a[8]+=n*(e*e+s*s);var o=n*e*s,h=n*s*r,l=n*r*e;return a[1]-=o,a[3]-=o,a[2]-=h,a[6]-=h,a[5]-=l,a[7]-=l,this},subOffset:function(n,t){var e=t.x,s=t.y,r=t.z,a=this.elements;a[0]-=n*(s*s+r*r),a[4]-=n*(e*e+r*r),a[8]-=n*(e*e+s*s);var o=n*e*s,h=n*s*r,l=n*r*e;return a[1]+=o,a[3]+=o,a[2]+=h,a[6]+=h,a[5]+=l,a[7]+=l,this},multiplyScalar:function(n){var t=this.elements;return t[0]*=n,t[3]*=n,t[6]*=n,t[1]*=n,t[4]*=n,t[7]*=n,t[2]*=n,t[5]*=n,t[8]*=n,this},identity:function(){return this.set(1,0,0,0,1,0,0,0,1),this},clone:function(){return new bi().fromArray(this.elements)},copy:function(n){for(var t=0;t<9;t++)this.elements[t]=n.elements[t];return this},determinant:function(){var n=this.elements,t=n[0],e=n[1],s=n[2],r=n[3],a=n[4],o=n[5],h=n[6],l=n[7],c=n[8];return t*a*c-t*o*l-e*r*c+e*o*h+s*r*l-s*a*h},fromArray:function(n,t){t===void 0&&(t=0);for(var e=0;e<9;e++)this.elements[e]=n[e+t];return this},toArray:function(n,t){n===void 0&&(n=[]),t===void 0&&(t=0);var e=this.elements;return n[t]=e[0],n[t+1]=e[1],n[t+2]=e[2],n[t+3]=e[3],n[t+4]=e[4],n[t+5]=e[5],n[t+6]=e[6],n[t+7]=e[7],n[t+8]=e[8],n}});function _a(n,t,e,s,r,a){this.elements=new Float32Array(6);var o=this.elements;o[0]=n||0,o[1]=e||0,o[2]=r||0,o[3]=t||0,o[4]=s||0,o[5]=a||0}Object.assign(_a.prototype,{AABB:!0,set:function(n,t,e,s,r,a){var o=this.elements;return o[0]=n,o[3]=t,o[1]=e,o[4]=s,o[2]=r,o[5]=a,this},intersectTest:function(n){var t=this.elements,e=n.elements;return t[0]>e[3]||t[1]>e[4]||t[2]>e[5]||t[3]<e[0]||t[4]<e[1]||t[5]<e[2]},intersectTestTwo:function(n){var t=this.elements,e=n.elements;return t[0]<e[0]||t[1]<e[1]||t[2]<e[2]||t[3]>e[3]||t[4]>e[4]||t[5]>e[5]},clone:function(){return new this.constructor().fromArray(this.elements)},copy:function(n,t){var e=t||0,s=n.elements;return this.set(s[0]-e,s[3]+e,s[1]-e,s[4]+e,s[2]-e,s[5]+e),this},fromArray:function(n){return this.elements.set(n),this},combine:function(n,t){var e=n.elements,s=t.elements,r=this.elements;return r[0]=e[0]<s[0]?e[0]:s[0],r[1]=e[1]<s[1]?e[1]:s[1],r[2]=e[2]<s[2]?e[2]:s[2],r[3]=e[3]>s[3]?e[3]:s[3],r[4]=e[4]>s[4]?e[4]:s[4],r[5]=e[5]>s[5]?e[5]:s[5],this},surfaceArea:function(){var n=this.elements,t=n[3]-n[0],e=n[4]-n[1],s=n[5]-n[2];return 2*(t*(e+s)+e*s)},intersectsWithPoint:function(n,t,e){var s=this.elements;return n>=s[0]&&n<=s[3]&&t>=s[1]&&t<=s[4]&&e>=s[2]&&e<=s[5]},setFromPoints:function(n){this.makeEmpty();for(var t=0;t<n.length;t++)this.expandByPoint(n[t])},makeEmpty:function(){this.set(-1/0,-1/0,-1/0,1/0,1/0,1/0)},expandByPoint:function(n){var t=this.elements;this.set(Tt.min(t[0],n.x),Tt.min(t[1],n.y),Tt.min(t[2],n.z),Tt.max(t[3],n.x),Tt.max(t[4],n.y),Tt.max(t[5],n.z))},expandByScalar:function(n){var t=this.elements;t[0]+=-n,t[1]+=-n,t[2]+=-n,t[3]+=n,t[4]+=n,t[5]+=n}});var Dx=0;function Ux(){return Dx++}function Mn(n){this.type=Tx,this.id=Ux(),this.prev=null,this.next=null,this.proxy=null,this.parent=null,this.contactLink=null,this.numContacts=0,this.position=new yt,this.rotation=new bi,this.relativePosition=new yt().copy(n.relativePosition),this.relativeRotation=new bi().copy(n.relativeRotation),this.aabb=new _a,this.density=n.density,this.friction=n.friction,this.restitution=n.restitution,this.belongsTo=n.belongsTo,this.collidesWith=n.collidesWith}Object.assign(Mn.prototype,{Shape:!0,calculateMassInfo:function(n){Ci("Shape","Inheritance error.")},updateProxy:function(){Ci("Shape","Inheritance error.")}});function nh(n,t,e,s){Mn.call(this,n),this.type=jn,this.width=t,this.height=e,this.depth=s,this.halfWidth=t*.5,this.halfHeight=e*.5,this.halfDepth=s*.5,this.dimentions=new Float32Array(18),this.elements=new Float32Array(24)}nh.prototype=Object.assign(Object.create(Mn.prototype),{constructor:nh,calculateMassInfo:function(n){var t=this.width*this.height*this.depth*this.density,e=1/12;n.mass=t,n.inertia.set(t*(this.height*this.height+this.depth*this.depth)*e,0,0,0,t*(this.width*this.width+this.depth*this.depth)*e,0,0,0,t*(this.width*this.width+this.height*this.height)*e)},updateProxy:function(){var n=this.rotation.elements,t=this.dimentions;t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],t[9]=n[0]*this.halfWidth,t[10]=n[3]*this.halfWidth,t[11]=n[6]*this.halfWidth,t[12]=n[1]*this.halfHeight,t[13]=n[4]*this.halfHeight,t[14]=n[7]*this.halfHeight,t[15]=n[2]*this.halfDepth,t[16]=n[5]*this.halfDepth,t[17]=n[8]*this.halfDepth;var e=t[9],s=t[10],r=t[11],a=t[12],o=t[13],h=t[14],l=t[15],c=t[16],u=t[17],f=this.position.x,d=this.position.y,x=this.position.z,g=this.elements;g[0]=f+e+a+l,g[1]=d+s+o+c,g[2]=x+r+h+u,g[3]=f+e+a-l,g[4]=d+s+o-c,g[5]=x+r+h-u,g[6]=f+e-a+l,g[7]=d+s-o+c,g[8]=x+r-h+u,g[9]=f+e-a-l,g[10]=d+s-o-c,g[11]=x+r-h-u,g[12]=f-e+a+l,g[13]=d-s+o+c,g[14]=x-r+h+u,g[15]=f-e+a-l,g[16]=d-s+o-c,g[17]=x-r+h-u,g[18]=f-e-a+l,g[19]=d-s-o+c,g[20]=x-r-h+u,g[21]=f-e-a-l,g[22]=d-s-o-c,g[23]=x-r-h-u;var v=t[9]<0?-t[9]:t[9],p=t[10]<0?-t[10]:t[10],m=t[11]<0?-t[11]:t[11];v=t[12]<0?v-t[12]:v+t[12],p=t[13]<0?p-t[13]:p+t[13],m=t[14]<0?m-t[14]:m+t[14],v=t[15]<0?v-t[15]:v+t[15],p=t[16]<0?p-t[16]:p+t[16],m=t[17]<0?m-t[17]:m+t[17];var S=va;this.aabb.set(this.position.x-v-S,this.position.x+v+S,this.position.y-p-S,this.position.y+p+S,this.position.z-m-S,this.position.z+m+S),this.proxy!=null&&this.proxy.update()}});function sh(n,t){Mn.call(this,n),this.type=Yn,this.radius=t}sh.prototype=Object.assign(Object.create(Mn.prototype),{constructor:sh,volume:function(){return Tt.PI*this.radius*1.333333},calculateMassInfo:function(n){var t=this.volume()*this.radius*this.radius*this.density;n.mass=t;var e=t*this.radius*this.radius*.4;n.inertia.set(e,0,0,0,e,0,0,0,e)},updateProxy:function(){var n=va;this.aabb.set(this.position.x-this.radius-n,this.position.x+this.radius+n,this.position.y-this.radius-n,this.position.y+this.radius+n,this.position.z-this.radius-n,this.position.z+this.radius+n),this.proxy!=null&&this.proxy.update()}});function rh(n,t,e){Mn.call(this,n),this.type=gs,this.radius=t,this.height=e,this.halfHeight=e*.5,this.normalDirection=new yt,this.halfDirection=new yt}rh.prototype=Object.assign(Object.create(Mn.prototype),{constructor:rh,calculateMassInfo:function(n){var t=this.radius*this.radius,e=Tt.PI*t*this.height*this.density,s=(.25*t+.0833*this.height*this.height)*e,r=.5*t;n.mass=e,n.inertia.set(s,0,0,0,r,0,0,0,s)},updateProxy:function(){var n=this.rotation.elements,t,e,s,r,a,o,h,l,c,u,f;a=n[1]*n[1],o=n[4]*n[4],h=n[7]*n[7],this.normalDirection.set(n[1],n[4],n[7]),this.halfDirection.scale(this.normalDirection,this.halfHeight),e=1-a,t=Tt.sqrt(e*e+a*o+a*h),t>0&&(t=this.radius/t),e*=t,s=1-o,t=Tt.sqrt(o*a+s*s+o*h),t>0&&(t=this.radius/t),s*=t,r=1-h,t=Tt.sqrt(h*a+h*o+r*r),t>0&&(t=this.radius/t),r*=t,l=this.halfDirection.x<0?-this.halfDirection.x:this.halfDirection.x,c=this.halfDirection.y<0?-this.halfDirection.y:this.halfDirection.y,u=this.halfDirection.z<0?-this.halfDirection.z:this.halfDirection.z,l=e<0?l-e:l+e,c=s<0?c-s:c+s,u=r<0?u-r:u+r,f=va,this.aabb.set(this.position.x-l-f,this.position.x+l+f,this.position.y-c-f,this.position.y+c+f,this.position.z-u-f,this.position.z+u+f),this.proxy!=null&&this.proxy.update()}});function ah(n,t){Mn.call(this,n),this.type=pr,this.normal=new yt(0,1,0)}ah.prototype=Object.assign(Object.create(Mn.prototype),{constructor:ah,volume:function(){return Number.MAX_VALUE},calculateMassInfo:function(n){n.mass=this.density;var t=1;n.inertia.set(t,0,0,0,t,0,0,0,t)},updateProxy:function(){var n=va,t=-Tt.INF,e=Tt.INF,s=this.normal;this.aabb.set(s.x===-1?this.position.x-n:t,s.x===1?this.position.x+n:e,s.y===-1?this.position.y-n:t,s.y===1?this.position.y+n:e,s.z===-1?this.position.z-n:t,s.z===1?this.position.z+n:e),this.proxy!=null&&this.proxy.update()}});function Wl(n,t){Mn.call(this,n),this.type=wx}Wl.prototype=Object.assign(Object.create(Mn.prototype),{constructor:Wl,volume:function(){return Number.MAX_VALUE},calculateMassInfo:function(n){var t=0;n.inertia.set(t,0,0,0,t,0,0,0,t)},updateProxy:function(){var n=0;this.aabb.set(this.position.x-n,this.position.x+n,this.position.y-n,this.position.y+n,this.position.z-n,this.position.z+n),this.proxy!=null&&this.proxy.update()}});function zx(){this.relativePosition=new yt,this.relativeRotation=new bi,this.friction=.2,this.restitution=.2,this.density=1,this.belongsTo=1,this.collidesWith=4294967295}function Mi(n,t){t=t||!1,this.axis=n,this.angle=0,this.lowerLimit=t?0:1,this.upperLimit=0,this.motorSpeed=0,this.maxMotorForce=0,this.frequency=0,this.dampingRatio=0}Object.assign(Mi.prototype,{LimitMotor:!0,setLimit:function(n,t){this.lowerLimit=n,this.upperLimit=t},setMotor:function(n,t){this.motorSpeed=n,this.maxMotorForce=t},setSpring:function(n,t){this.frequency=n,this.dampingRatio=t}});function br(){this.parent=null,this.body1=null,this.body2=null,this.addedToIsland=!1}Object.assign(br.prototype,{Constraint:!0,preSolve:function(n,t){Ci("Constraint","Inheritance error.")},solve:function(){Ci("Constraint","Inheritance error.")},postSolve:function(){Ci("Constraint","Inheritance error.")}});function Xl(n){this.prev=null,this.next=null,this.body=null,this.joint=n}function tn(n){br.call(this),this.scale=1,this.invScale=1,this.name="",this.id=NaN,this.type=Ax,this.prev=null,this.next=null,this.body1=n.body1,this.body2=n.body2,this.localAnchorPoint1=new yt().copy(n.localAnchorPoint1),this.localAnchorPoint2=new yt().copy(n.localAnchorPoint2),this.relativeAnchorPoint1=new yt,this.relativeAnchorPoint2=new yt,this.anchorPoint1=new yt,this.anchorPoint2=new yt,this.allowCollision=n.allowCollision,this.b1Link=new Xl(this),this.b2Link=new Xl(this)}tn.prototype=Object.assign(Object.create(br.prototype),{constructor:tn,setId:function(n){this.id=i},setParent:function(n){this.parent=n,this.scale=this.parent.scale,this.invScale=this.parent.invScale,this.id=this.parent.numJoints,this.name||(this.name="J"+this.id)},updateAnchorPoints:function(){this.relativeAnchorPoint1.copy(this.localAnchorPoint1).applyMatrix3(this.body1.rotation,!0),this.relativeAnchorPoint2.copy(this.localAnchorPoint2).applyMatrix3(this.body2.rotation,!0),this.anchorPoint1.add(this.relativeAnchorPoint1,this.body1.position),this.anchorPoint2.add(this.relativeAnchorPoint2,this.body2.position)},attach:function(n){this.b1Link.body=this.body2,this.b2Link.body=this.body1,n?(this.body1.jointLink.push(this.b1Link),this.body2.jointLink.push(this.b2Link)):(this.body1.jointLink!=null?(this.b1Link.next=this.body1.jointLink).prev=this.b1Link:this.b1Link.next=null,this.body1.jointLink=this.b1Link,this.body1.numJoints++,this.body2.jointLink!=null?(this.b2Link.next=this.body2.jointLink).prev=this.b2Link:this.b2Link.next=null,this.body2.jointLink=this.b2Link,this.body2.numJoints++)},detach:function(n){if(n)this.body1.jointLink.splice(this.body1.jointLink.indexOf(this.b1Link),1),this.body2.jointLink.splice(this.body2.jointLink.indexOf(this.b2Link),1);else{var t=this.b1Link.prev,e=this.b1Link.next;t!=null&&(t.next=e),e!=null&&(e.prev=t),this.body1.jointLink==this.b1Link&&(this.body1.jointLink=e),this.b1Link.prev=null,this.b1Link.next=null,this.b1Link.body=null,this.body1.numJoints--,t=this.b2Link.prev,e=this.b2Link.next,t!=null&&(t.next=e),e!=null&&(e.prev=t),this.body2.jointLink==this.b2Link&&(this.body2.jointLink=e),this.b2Link.prev=null,this.b2Link.next=null,this.b2Link.body=null,this.body2.numJoints--}this.b1Link.body=null,this.b2Link.body=null},awake:function(){this.body1.awake(),this.body2.awake()},preSolve:function(n,t){},solve:function(){},postSolve:function(){},remove:function(){this.dispose()},dispose:function(){this.parent.removeJoint(this)},getPosition:function(){var n=new yt().scale(this.anchorPoint1,this.scale),t=new yt().scale(this.anchorPoint2,this.scale);return[n,t]}});function Vh(n){this.m1=NaN,this.m2=NaN,this.ii1=null,this.ii2=null,this.dd=null,this.r1x=NaN,this.r1y=NaN,this.r1z=NaN,this.r2x=NaN,this.r2y=NaN,this.r2z=NaN,this.ax1x=NaN,this.ax1y=NaN,this.ax1z=NaN,this.ay1x=NaN,this.ay1y=NaN,this.ay1z=NaN,this.az1x=NaN,this.az1y=NaN,this.az1z=NaN,this.ax2x=NaN,this.ax2y=NaN,this.ax2z=NaN,this.ay2x=NaN,this.ay2y=NaN,this.ay2z=NaN,this.az2x=NaN,this.az2y=NaN,this.az2z=NaN,this.vel=NaN,this.velx=NaN,this.vely=NaN,this.velz=NaN,this.joint=n,this.r1=n.relativeAnchorPoint1,this.r2=n.relativeAnchorPoint2,this.p1=n.anchorPoint1,this.p2=n.anchorPoint2,this.b1=n.body1,this.b2=n.body2,this.l1=this.b1.linearVelocity,this.l2=this.b2.linearVelocity,this.a1=this.b1.angularVelocity,this.a2=this.b2.angularVelocity,this.i1=this.b1.inverseInertia,this.i2=this.b2.inverseInertia,this.impx=0,this.impy=0,this.impz=0}Object.assign(Vh.prototype,{LinearConstraint:!0,preSolve:function(n,t){this.r1x=this.r1.x,this.r1y=this.r1.y,this.r1z=this.r1.z,this.r2x=this.r2.x,this.r2y=this.r2.y,this.r2z=this.r2.z,this.m1=this.b1.inverseMass,this.m2=this.b2.inverseMass,this.ii1=this.i1.clone(),this.ii2=this.i2.clone();var e=this.ii1.elements,s=this.ii2.elements;this.ax1x=this.r1z*e[1]+-this.r1y*e[2],this.ax1y=this.r1z*e[4]+-this.r1y*e[5],this.ax1z=this.r1z*e[7]+-this.r1y*e[8],this.ay1x=-this.r1z*e[0]+this.r1x*e[2],this.ay1y=-this.r1z*e[3]+this.r1x*e[5],this.ay1z=-this.r1z*e[6]+this.r1x*e[8],this.az1x=this.r1y*e[0]+-this.r1x*e[1],this.az1y=this.r1y*e[3]+-this.r1x*e[4],this.az1z=this.r1y*e[6]+-this.r1x*e[7],this.ax2x=this.r2z*s[1]+-this.r2y*s[2],this.ax2y=this.r2z*s[4]+-this.r2y*s[5],this.ax2z=this.r2z*s[7]+-this.r2y*s[8],this.ay2x=-this.r2z*s[0]+this.r2x*s[2],this.ay2y=-this.r2z*s[3]+this.r2x*s[5],this.ay2z=-this.r2z*s[6]+this.r2x*s[8],this.az2x=this.r2y*s[0]+-this.r2x*s[1],this.az2y=this.r2y*s[3]+-this.r2x*s[4],this.az2z=this.r2y*s[6]+-this.r2x*s[7];var r=this.m1+this.m2,a=new bi().set(r,0,0,0,r,0,0,0,r),o=a.elements;o[0]+=e[4]*this.r1z*this.r1z-(e[7]+e[5])*this.r1y*this.r1z+e[8]*this.r1y*this.r1y,o[1]+=(e[6]*this.r1y+e[5]*this.r1x)*this.r1z-e[3]*this.r1z*this.r1z-e[8]*this.r1x*this.r1y,o[2]+=(e[3]*this.r1y-e[4]*this.r1x)*this.r1z-e[6]*this.r1y*this.r1y+e[7]*this.r1x*this.r1y,o[3]+=(e[2]*this.r1y+e[7]*this.r1x)*this.r1z-e[1]*this.r1z*this.r1z-e[8]*this.r1x*this.r1y,o[4]+=e[0]*this.r1z*this.r1z-(e[6]+e[2])*this.r1x*this.r1z+e[8]*this.r1x*this.r1x,o[5]+=(e[1]*this.r1x-e[0]*this.r1y)*this.r1z-e[7]*this.r1x*this.r1x+e[6]*this.r1x*this.r1y,o[6]+=(e[1]*this.r1y-e[4]*this.r1x)*this.r1z-e[2]*this.r1y*this.r1y+e[5]*this.r1x*this.r1y,o[7]+=(e[3]*this.r1x-e[0]*this.r1y)*this.r1z-e[5]*this.r1x*this.r1x+e[2]*this.r1x*this.r1y,o[8]+=e[0]*this.r1y*this.r1y-(e[3]+e[1])*this.r1x*this.r1y+e[4]*this.r1x*this.r1x,o[0]+=s[4]*this.r2z*this.r2z-(s[7]+s[5])*this.r2y*this.r2z+s[8]*this.r2y*this.r2y,o[1]+=(s[6]*this.r2y+s[5]*this.r2x)*this.r2z-s[3]*this.r2z*this.r2z-s[8]*this.r2x*this.r2y,o[2]+=(s[3]*this.r2y-s[4]*this.r2x)*this.r2z-s[6]*this.r2y*this.r2y+s[7]*this.r2x*this.r2y,o[3]+=(s[2]*this.r2y+s[7]*this.r2x)*this.r2z-s[1]*this.r2z*this.r2z-s[8]*this.r2x*this.r2y,o[4]+=s[0]*this.r2z*this.r2z-(s[6]+s[2])*this.r2x*this.r2z+s[8]*this.r2x*this.r2x,o[5]+=(s[1]*this.r2x-s[0]*this.r2y)*this.r2z-s[7]*this.r2x*this.r2x+s[6]*this.r2x*this.r2y,o[6]+=(s[1]*this.r2y-s[4]*this.r2x)*this.r2z-s[2]*this.r2y*this.r2y+s[5]*this.r2x*this.r2y,o[7]+=(s[3]*this.r2x-s[0]*this.r2y)*this.r2z-s[5]*this.r2x*this.r2x+s[2]*this.r2x*this.r2y,o[8]+=s[0]*this.r2y*this.r2y-(s[3]+s[1])*this.r2x*this.r2y+s[4]*this.r2x*this.r2x;var h=1/(o[0]*(o[4]*o[8]-o[7]*o[5])+o[3]*(o[7]*o[2]-o[1]*o[8])+o[6]*(o[1]*o[5]-o[4]*o[2]));this.dd=new bi().set(o[4]*o[8]-o[5]*o[7],o[2]*o[7]-o[1]*o[8],o[1]*o[5]-o[2]*o[4],o[5]*o[6]-o[3]*o[8],o[0]*o[8]-o[2]*o[6],o[2]*o[3]-o[0]*o[5],o[3]*o[7]-o[4]*o[6],o[1]*o[6]-o[0]*o[7],o[0]*o[4]-o[1]*o[3]).scaleEqual(h),this.velx=this.p2.x-this.p1.x,this.vely=this.p2.y-this.p1.y,this.velz=this.p2.z-this.p1.z;var l=Tt.sqrt(this.velx*this.velx+this.vely*this.vely+this.velz*this.velz);l>.005?(l=(.005-l)/l*t*.05,this.velx*=l,this.vely*=l,this.velz*=l):(this.velx=0,this.vely=0,this.velz=0),this.impx*=.95,this.impy*=.95,this.impz*=.95,this.l1.x+=this.impx*this.m1,this.l1.y+=this.impy*this.m1,this.l1.z+=this.impz*this.m1,this.a1.x+=this.impx*this.ax1x+this.impy*this.ay1x+this.impz*this.az1x,this.a1.y+=this.impx*this.ax1y+this.impy*this.ay1y+this.impz*this.az1y,this.a1.z+=this.impx*this.ax1z+this.impy*this.ay1z+this.impz*this.az1z,this.l2.x-=this.impx*this.m2,this.l2.y-=this.impy*this.m2,this.l2.z-=this.impz*this.m2,this.a2.x-=this.impx*this.ax2x+this.impy*this.ay2x+this.impz*this.az2x,this.a2.y-=this.impx*this.ax2y+this.impy*this.ay2y+this.impz*this.az2y,this.a2.z-=this.impx*this.ax2z+this.impy*this.ay2z+this.impz*this.az2z},solve:function(){var n=this.dd.elements,t=this.l2.x-this.l1.x+this.a2.y*this.r2z-this.a2.z*this.r2y-this.a1.y*this.r1z+this.a1.z*this.r1y-this.velx,e=this.l2.y-this.l1.y+this.a2.z*this.r2x-this.a2.x*this.r2z-this.a1.z*this.r1x+this.a1.x*this.r1z-this.vely,s=this.l2.z-this.l1.z+this.a2.x*this.r2y-this.a2.y*this.r2x-this.a1.x*this.r1y+this.a1.y*this.r1x-this.velz,r=t*n[0]+e*n[1]+s*n[2],a=t*n[3]+e*n[4]+s*n[5],o=t*n[6]+e*n[7]+s*n[8];this.impx+=r,this.impy+=a,this.impz+=o,this.l1.x+=r*this.m1,this.l1.y+=a*this.m1,this.l1.z+=o*this.m1,this.a1.x+=r*this.ax1x+a*this.ay1x+o*this.az1x,this.a1.y+=r*this.ax1y+a*this.ay1y+o*this.az1y,this.a1.z+=r*this.ax1z+a*this.ay1z+o*this.az1z,this.l2.x-=r*this.m2,this.l2.y-=a*this.m2,this.l2.z-=o*this.m2,this.a2.x-=r*this.ax2x+a*this.ay2x+o*this.az2x,this.a2.y-=r*this.ax2y+a*this.ay2y+o*this.az2y,this.a2.z-=r*this.ax2z+a*this.ay2z+o*this.az2z}});function ya(n,t,e,s){this.cfm1=NaN,this.cfm2=NaN,this.cfm3=NaN,this.i1e00=NaN,this.i1e01=NaN,this.i1e02=NaN,this.i1e10=NaN,this.i1e11=NaN,this.i1e12=NaN,this.i1e20=NaN,this.i1e21=NaN,this.i1e22=NaN,this.i2e00=NaN,this.i2e01=NaN,this.i2e02=NaN,this.i2e10=NaN,this.i2e11=NaN,this.i2e12=NaN,this.i2e20=NaN,this.i2e21=NaN,this.i2e22=NaN,this.ax1=NaN,this.ay1=NaN,this.az1=NaN,this.ax2=NaN,this.ay2=NaN,this.az2=NaN,this.ax3=NaN,this.ay3=NaN,this.az3=NaN,this.a1x1=NaN,this.a1y1=NaN,this.a1z1=NaN,this.a2x1=NaN,this.a2y1=NaN,this.a2z1=NaN,this.a1x2=NaN,this.a1y2=NaN,this.a1z2=NaN,this.a2x2=NaN,this.a2y2=NaN,this.a2z2=NaN,this.a1x3=NaN,this.a1y3=NaN,this.a1z3=NaN,this.a2x3=NaN,this.a2y3=NaN,this.a2z3=NaN,this.lowerLimit1=NaN,this.upperLimit1=NaN,this.limitVelocity1=NaN,this.limitState1=0,this.enableMotor1=!1,this.motorSpeed1=NaN,this.maxMotorForce1=NaN,this.maxMotorImpulse1=NaN,this.lowerLimit2=NaN,this.upperLimit2=NaN,this.limitVelocity2=NaN,this.limitState2=0,this.enableMotor2=!1,this.motorSpeed2=NaN,this.maxMotorForce2=NaN,this.maxMotorImpulse2=NaN,this.lowerLimit3=NaN,this.upperLimit3=NaN,this.limitVelocity3=NaN,this.limitState3=0,this.enableMotor3=!1,this.motorSpeed3=NaN,this.maxMotorForce3=NaN,this.maxMotorImpulse3=NaN,this.k00=NaN,this.k01=NaN,this.k02=NaN,this.k10=NaN,this.k11=NaN,this.k12=NaN,this.k20=NaN,this.k21=NaN,this.k22=NaN,this.kv00=NaN,this.kv11=NaN,this.kv22=NaN,this.dv00=NaN,this.dv11=NaN,this.dv22=NaN,this.d00=NaN,this.d01=NaN,this.d02=NaN,this.d10=NaN,this.d11=NaN,this.d12=NaN,this.d20=NaN,this.d21=NaN,this.d22=NaN,this.limitMotor1=t,this.limitMotor2=e,this.limitMotor3=s,this.b1=n.body1,this.b2=n.body2,this.a1=this.b1.angularVelocity,this.a2=this.b2.angularVelocity,this.i1=this.b1.inverseInertia,this.i2=this.b2.inverseInertia,this.limitImpulse1=0,this.motorImpulse1=0,this.limitImpulse2=0,this.motorImpulse2=0,this.limitImpulse3=0,this.motorImpulse3=0}Object.assign(ya.prototype,{Rotational3Constraint:!0,preSolve:function(n,t){this.ax1=this.limitMotor1.axis.x,this.ay1=this.limitMotor1.axis.y,this.az1=this.limitMotor1.axis.z,this.ax2=this.limitMotor2.axis.x,this.ay2=this.limitMotor2.axis.y,this.az2=this.limitMotor2.axis.z,this.ax3=this.limitMotor3.axis.x,this.ay3=this.limitMotor3.axis.y,this.az3=this.limitMotor3.axis.z,this.lowerLimit1=this.limitMotor1.lowerLimit,this.upperLimit1=this.limitMotor1.upperLimit,this.motorSpeed1=this.limitMotor1.motorSpeed,this.maxMotorForce1=this.limitMotor1.maxMotorForce,this.enableMotor1=this.maxMotorForce1>0,this.lowerLimit2=this.limitMotor2.lowerLimit,this.upperLimit2=this.limitMotor2.upperLimit,this.motorSpeed2=this.limitMotor2.motorSpeed,this.maxMotorForce2=this.limitMotor2.maxMotorForce,this.enableMotor2=this.maxMotorForce2>0,this.lowerLimit3=this.limitMotor3.lowerLimit,this.upperLimit3=this.limitMotor3.upperLimit,this.motorSpeed3=this.limitMotor3.motorSpeed,this.maxMotorForce3=this.limitMotor3.maxMotorForce,this.enableMotor3=this.maxMotorForce3>0;var e=this.i1.elements,s=this.i2.elements;this.i1e00=e[0],this.i1e01=e[1],this.i1e02=e[2],this.i1e10=e[3],this.i1e11=e[4],this.i1e12=e[5],this.i1e20=e[6],this.i1e21=e[7],this.i1e22=e[8],this.i2e00=s[0],this.i2e01=s[1],this.i2e02=s[2],this.i2e10=s[3],this.i2e11=s[4],this.i2e12=s[5],this.i2e20=s[6],this.i2e21=s[7],this.i2e22=s[8];var r=this.limitMotor1.frequency,a=this.limitMotor2.frequency,o=this.limitMotor3.frequency,h=r>0,l=a>0,c=o>0,u=this.lowerLimit1<=this.upperLimit1,f=this.lowerLimit2<=this.upperLimit2,d=this.lowerLimit3<=this.upperLimit3,x=this.limitMotor1.angle;u?(this.lowerLimit1==this.upperLimit1?(this.limitState1!=0&&(this.limitState1=0,this.limitImpulse1=0),this.limitVelocity1=this.lowerLimit1-x):x<this.lowerLimit1?(this.limitState1!=-1&&(this.limitState1=-1,this.limitImpulse1=0),this.limitVelocity1=this.lowerLimit1-x):x>this.upperLimit1?(this.limitState1!=1&&(this.limitState1=1,this.limitImpulse1=0),this.limitVelocity1=this.upperLimit1-x):(this.limitState1=2,this.limitImpulse1=0,this.limitVelocity1=0),h||(this.limitVelocity1>.02?this.limitVelocity1-=.02:this.limitVelocity1<-.02?this.limitVelocity1+=.02:this.limitVelocity1=0)):(this.limitState1=2,this.limitImpulse1=0);var g=this.limitMotor2.angle;f?(this.lowerLimit2==this.upperLimit2?(this.limitState2!=0&&(this.limitState2=0,this.limitImpulse2=0),this.limitVelocity2=this.lowerLimit2-g):g<this.lowerLimit2?(this.limitState2!=-1&&(this.limitState2=-1,this.limitImpulse2=0),this.limitVelocity2=this.lowerLimit2-g):g>this.upperLimit2?(this.limitState2!=1&&(this.limitState2=1,this.limitImpulse2=0),this.limitVelocity2=this.upperLimit2-g):(this.limitState2=2,this.limitImpulse2=0,this.limitVelocity2=0),l||(this.limitVelocity2>.02?this.limitVelocity2-=.02:this.limitVelocity2<-.02?this.limitVelocity2+=.02:this.limitVelocity2=0)):(this.limitState2=2,this.limitImpulse2=0);var v=this.limitMotor3.angle;if(d?(this.lowerLimit3==this.upperLimit3?(this.limitState3!=0&&(this.limitState3=0,this.limitImpulse3=0),this.limitVelocity3=this.lowerLimit3-v):v<this.lowerLimit3?(this.limitState3!=-1&&(this.limitState3=-1,this.limitImpulse3=0),this.limitVelocity3=this.lowerLimit3-v):v>this.upperLimit3?(this.limitState3!=1&&(this.limitState3=1,this.limitImpulse3=0),this.limitVelocity3=this.upperLimit3-v):(this.limitState3=2,this.limitImpulse3=0,this.limitVelocity3=0),c||(this.limitVelocity3>.02?this.limitVelocity3-=.02:this.limitVelocity3<-.02?this.limitVelocity3+=.02:this.limitVelocity3=0)):(this.limitState3=2,this.limitImpulse3=0),this.enableMotor1&&(this.limitState1!=0||h)?this.maxMotorImpulse1=this.maxMotorForce1*n:(this.motorImpulse1=0,this.maxMotorImpulse1=0),this.enableMotor2&&(this.limitState2!=0||l)?this.maxMotorImpulse2=this.maxMotorForce2*n:(this.motorImpulse2=0,this.maxMotorImpulse2=0),this.enableMotor3&&(this.limitState3!=0||c)?this.maxMotorImpulse3=this.maxMotorForce3*n:(this.motorImpulse3=0,this.maxMotorImpulse3=0),this.a1x1=this.ax1*this.i1e00+this.ay1*this.i1e01+this.az1*this.i1e02,this.a1y1=this.ax1*this.i1e10+this.ay1*this.i1e11+this.az1*this.i1e12,this.a1z1=this.ax1*this.i1e20+this.ay1*this.i1e21+this.az1*this.i1e22,this.a2x1=this.ax1*this.i2e00+this.ay1*this.i2e01+this.az1*this.i2e02,this.a2y1=this.ax1*this.i2e10+this.ay1*this.i2e11+this.az1*this.i2e12,this.a2z1=this.ax1*this.i2e20+this.ay1*this.i2e21+this.az1*this.i2e22,this.a1x2=this.ax2*this.i1e00+this.ay2*this.i1e01+this.az2*this.i1e02,this.a1y2=this.ax2*this.i1e10+this.ay2*this.i1e11+this.az2*this.i1e12,this.a1z2=this.ax2*this.i1e20+this.ay2*this.i1e21+this.az2*this.i1e22,this.a2x2=this.ax2*this.i2e00+this.ay2*this.i2e01+this.az2*this.i2e02,this.a2y2=this.ax2*this.i2e10+this.ay2*this.i2e11+this.az2*this.i2e12,this.a2z2=this.ax2*this.i2e20+this.ay2*this.i2e21+this.az2*this.i2e22,this.a1x3=this.ax3*this.i1e00+this.ay3*this.i1e01+this.az3*this.i1e02,this.a1y3=this.ax3*this.i1e10+this.ay3*this.i1e11+this.az3*this.i1e12,this.a1z3=this.ax3*this.i1e20+this.ay3*this.i1e21+this.az3*this.i1e22,this.a2x3=this.ax3*this.i2e00+this.ay3*this.i2e01+this.az3*this.i2e02,this.a2y3=this.ax3*this.i2e10+this.ay3*this.i2e11+this.az3*this.i2e12,this.a2z3=this.ax3*this.i2e20+this.ay3*this.i2e21+this.az3*this.i2e22,this.k00=this.ax1*(this.a1x1+this.a2x1)+this.ay1*(this.a1y1+this.a2y1)+this.az1*(this.a1z1+this.a2z1),this.k01=this.ax1*(this.a1x2+this.a2x2)+this.ay1*(this.a1y2+this.a2y2)+this.az1*(this.a1z2+this.a2z2),this.k02=this.ax1*(this.a1x3+this.a2x3)+this.ay1*(this.a1y3+this.a2y3)+this.az1*(this.a1z3+this.a2z3),this.k10=this.ax2*(this.a1x1+this.a2x1)+this.ay2*(this.a1y1+this.a2y1)+this.az2*(this.a1z1+this.a2z1),this.k11=this.ax2*(this.a1x2+this.a2x2)+this.ay2*(this.a1y2+this.a2y2)+this.az2*(this.a1z2+this.a2z2),this.k12=this.ax2*(this.a1x3+this.a2x3)+this.ay2*(this.a1y3+this.a2y3)+this.az2*(this.a1z3+this.a2z3),this.k20=this.ax3*(this.a1x1+this.a2x1)+this.ay3*(this.a1y1+this.a2y1)+this.az3*(this.a1z1+this.a2z1),this.k21=this.ax3*(this.a1x2+this.a2x2)+this.ay3*(this.a1y2+this.a2y2)+this.az3*(this.a1z2+this.a2z2),this.k22=this.ax3*(this.a1x3+this.a2x3)+this.ay3*(this.a1y3+this.a2y3)+this.az3*(this.a1z3+this.a2z3),this.kv00=this.k00,this.kv11=this.k11,this.kv22=this.k22,this.dv00=1/this.kv00,this.dv11=1/this.kv11,this.dv22=1/this.kv22,h&&this.limitState1!=2){var p=6.2831853*r,m=p*p*n,S=t/(m+2*this.limitMotor1.dampingRatio*p);this.cfm1=this.kv00*S,this.limitVelocity1*=m*S}else this.cfm1=0,this.limitVelocity1*=t*.05;l&&this.limitState2!=2?(p=6.2831853*a,m=p*p*n,S=t/(m+2*this.limitMotor2.dampingRatio*p),this.cfm2=this.kv11*S,this.limitVelocity2*=m*S):(this.cfm2=0,this.limitVelocity2*=t*.05),c&&this.limitState3!=2?(p=6.2831853*o,m=p*p*n,S=t/(m+2*this.limitMotor3.dampingRatio*p),this.cfm3=this.kv22*S,this.limitVelocity3*=m*S):(this.cfm3=0,this.limitVelocity3*=t*.05),this.k00+=this.cfm1,this.k11+=this.cfm2,this.k22+=this.cfm3;var M=1/(this.k00*(this.k11*this.k22-this.k21*this.k12)+this.k10*(this.k21*this.k02-this.k01*this.k22)+this.k20*(this.k01*this.k12-this.k11*this.k02));this.d00=(this.k11*this.k22-this.k12*this.k21)*M,this.d01=(this.k02*this.k21-this.k01*this.k22)*M,this.d02=(this.k01*this.k12-this.k02*this.k11)*M,this.d10=(this.k12*this.k20-this.k10*this.k22)*M,this.d11=(this.k00*this.k22-this.k02*this.k20)*M,this.d12=(this.k02*this.k10-this.k00*this.k12)*M,this.d20=(this.k10*this.k21-this.k11*this.k20)*M,this.d21=(this.k01*this.k20-this.k00*this.k21)*M,this.d22=(this.k00*this.k11-this.k01*this.k10)*M,this.limitImpulse1*=.95,this.motorImpulse1*=.95,this.limitImpulse2*=.95,this.motorImpulse2*=.95,this.limitImpulse3*=.95,this.motorImpulse3*=.95;var E=this.limitImpulse1+this.motorImpulse1,A=this.limitImpulse2+this.motorImpulse2,R=this.limitImpulse3+this.motorImpulse3;this.a1.x+=E*this.a1x1+A*this.a1x2+R*this.a1x3,this.a1.y+=E*this.a1y1+A*this.a1y2+R*this.a1y3,this.a1.z+=E*this.a1z1+A*this.a1z2+R*this.a1z3,this.a2.x-=E*this.a2x1+A*this.a2x2+R*this.a2x3,this.a2.y-=E*this.a2y1+A*this.a2y2+R*this.a2y3,this.a2.z-=E*this.a2z1+A*this.a2z2+R*this.a2z3},solve_:function(){var n=this.a2.x-this.a1.x,t=this.a2.y-this.a1.y,e=this.a2.z-this.a1.z;this.limitVelocity3=30;var s=n*this.ax1+t*this.ay1+e*this.az1-this.limitVelocity1,r=n*this.ax2+t*this.ay2+e*this.az2-this.limitVelocity2,a=n*this.ax3+t*this.ay3+e*this.az3-this.limitVelocity3,o=s*this.d00+r*this.d01+a*this.d02,h=s*this.d10+r*this.d11+a*this.d12,l=s*this.d20+r*this.d21+a*this.d22;this.limitImpulse1+=o,this.limitImpulse2+=h,this.limitImpulse3+=l,this.a1.x+=o*this.a1x1+h*this.a1x2+l*this.a1x3,this.a1.y+=o*this.a1y1+h*this.a1y2+l*this.a1y3,this.a1.z+=o*this.a1z1+h*this.a1z2+l*this.a1z3,this.a2.x-=o*this.a2x1+h*this.a2x2+l*this.a2x3,this.a2.y-=o*this.a2y1+h*this.a2y2+l*this.a2y3,this.a2.z-=o*this.a2z1+h*this.a2z2+l*this.a2z3},solve:function(){var n=this.a2.x-this.a1.x,t=this.a2.y-this.a1.y,e=this.a2.z-this.a1.z,s=n*this.ax1+t*this.ay1+e*this.az1,r=n*this.ax2+t*this.ay2+e*this.az2,a=n*this.ax3+t*this.ay3+e*this.az3,o=this.motorImpulse1,h=this.motorImpulse2,l=this.motorImpulse3,c=0,u=0,f=0;this.enableMotor1&&(c=(s-this.motorSpeed1)*this.dv00,this.motorImpulse1+=c,this.motorImpulse1>this.maxMotorImpulse1?this.motorImpulse1=this.maxMotorImpulse1:this.motorImpulse1<-this.maxMotorImpulse1&&(this.motorImpulse1=-this.maxMotorImpulse1),c=this.motorImpulse1-o),this.enableMotor2&&(u=(r-this.motorSpeed2)*this.dv11,this.motorImpulse2+=u,this.motorImpulse2>this.maxMotorImpulse2?this.motorImpulse2=this.maxMotorImpulse2:this.motorImpulse2<-this.maxMotorImpulse2&&(this.motorImpulse2=-this.maxMotorImpulse2),u=this.motorImpulse2-h),this.enableMotor3&&(f=(a-this.motorSpeed3)*this.dv22,this.motorImpulse3+=f,this.motorImpulse3>this.maxMotorImpulse3?this.motorImpulse3=this.maxMotorImpulse3:this.motorImpulse3<-this.maxMotorImpulse3&&(this.motorImpulse3=-this.maxMotorImpulse3),f=this.motorImpulse3-l),s+=c*this.kv00+u*this.k01+f*this.k02,r+=c*this.k10+u*this.kv11+f*this.k12,a+=c*this.k20+u*this.k21+f*this.kv22,s-=this.limitVelocity1+this.limitImpulse1*this.cfm1,r-=this.limitVelocity2+this.limitImpulse2*this.cfm2,a-=this.limitVelocity3+this.limitImpulse3*this.cfm3;var d=this.limitImpulse1,x=this.limitImpulse2,g=this.limitImpulse3,v=s*this.d00+r*this.d01+a*this.d02,p=s*this.d10+r*this.d11+a*this.d12,m=s*this.d20+r*this.d21+a*this.d22;this.limitImpulse1+=v,this.limitImpulse2+=p,this.limitImpulse3+=m;var S=0;(this.limitState1==2||this.limitImpulse1*this.limitState1<0)&&(v=-d,r+=v*this.k10,a+=v*this.k20,S|=1),(this.limitState2==2||this.limitImpulse2*this.limitState2<0)&&(p=-x,s+=p*this.k01,a+=p*this.k21,S|=2),(this.limitState3==2||this.limitImpulse3*this.limitState3<0)&&(m=-g,s+=m*this.k02,r+=m*this.k12,S|=4);var M;switch(S){case 1:M=1/(this.k11*this.k22-this.k12*this.k21),p=(this.k22*r+-this.k12*a)*M,m=(-this.k21*r+this.k11*a)*M;break;case 2:M=1/(this.k00*this.k22-this.k02*this.k20),v=(this.k22*s+-this.k02*a)*M,m=(-this.k20*s+this.k00*a)*M;break;case 3:m=a/this.k22;break;case 4:M=1/(this.k00*this.k11-this.k01*this.k10),v=(this.k11*s+-this.k01*r)*M,p=(-this.k10*s+this.k00*r)*M;break;case 5:p=r/this.k11;break;case 6:v=s/this.k00;break}this.limitImpulse1=v+d,this.limitImpulse2=p+x,this.limitImpulse3=m+g;var E=c+v,A=u+p,R=f+m;this.a1.x+=E*this.a1x1+A*this.a1x2+R*this.a1x3,this.a1.y+=E*this.a1y1+A*this.a1y2+R*this.a1y3,this.a1.z+=E*this.a1z1+A*this.a1z2+R*this.a1z3,this.a2.x-=E*this.a2x1+A*this.a2x2+R*this.a2x3,this.a2.y-=E*this.a2y1+A*this.a2y2+R*this.a2y3,this.a2.z-=E*this.a2z1+A*this.a2z2+R*this.a2z3,n=this.a2.x-this.a1.x,t=this.a2.y-this.a1.y,e=this.a2.z-this.a1.z,r=n*this.ax2+t*this.ay2+e*this.az2}});function oh(n,t,e){tn.call(this,n),this.type=Px,this.localAxis1=n.localAxis1.clone().normalize(),this.localAxis2=n.localAxis2.clone().normalize();var s=new bi().setQuat(new Ni().setFromUnitVectors(this.localAxis1,this.localAxis2));this.localAngle1=new yt().tangent(this.localAxis1).normalize(),this.localAngle2=this.localAngle1.clone().applyMatrix3(s,!0),this.ax1=new yt,this.ax2=new yt,this.an1=new yt,this.an2=new yt,this.tmp=new yt,this.nor=new yt,this.tan=new yt,this.bin=new yt,this.limitMotor=new Mi(this.nor,!1),this.limitMotor.lowerLimit=t,this.limitMotor.upperLimit=e,this.lc=new Vh(this),this.r3=new ya(this,this.limitMotor,new Mi(this.tan,!0),new Mi(this.bin,!0))}oh.prototype=Object.assign(Object.create(tn.prototype),{constructor:oh,preSolve:function(n,t){this.updateAnchorPoints(),this.ax1.copy(this.localAxis1).applyMatrix3(this.body1.rotation,!0),this.ax2.copy(this.localAxis2).applyMatrix3(this.body2.rotation,!0),this.an1.copy(this.localAngle1).applyMatrix3(this.body1.rotation,!0),this.an2.copy(this.localAngle2).applyMatrix3(this.body2.rotation,!0),this.nor.set(this.ax1.x*this.body2.inverseMass+this.ax2.x*this.body1.inverseMass,this.ax1.y*this.body2.inverseMass+this.ax2.y*this.body1.inverseMass,this.ax1.z*this.body2.inverseMass+this.ax2.z*this.body1.inverseMass).normalize(),this.tan.tangent(this.nor).normalize(),this.bin.crossVectors(this.nor,this.tan);var e=Tt.acosClamp(Tt.dotVectors(this.an1,this.an2));this.tmp.crossVectors(this.an1,this.an2),Tt.dotVectors(this.nor,this.tmp)<0?this.limitMotor.angle=-e:this.limitMotor.angle=e,this.tmp.crossVectors(this.ax1,this.ax2),this.r3.limitMotor2.angle=Tt.dotVectors(this.tan,this.tmp),this.r3.limitMotor3.angle=Tt.dotVectors(this.bin,this.tmp),this.r3.preSolve(n,t),this.lc.preSolve(n,t)},solve:function(){this.r3.solve(),this.lc.solve()},postSolve:function(){}});function hh(n){tn.call(this,n),this.type=Cx,this.lc=new Vh(this)}hh.prototype=Object.assign(Object.create(tn.prototype),{constructor:hh,preSolve:function(n,t){this.updateAnchorPoints(),this.lc.preSolve(n,t)},solve:function(){this.lc.solve()},postSolve:function(){}});function kc(n,t){this.cfm=NaN,this.m1=NaN,this.m2=NaN,this.i1e00=NaN,this.i1e01=NaN,this.i1e02=NaN,this.i1e10=NaN,this.i1e11=NaN,this.i1e12=NaN,this.i1e20=NaN,this.i1e21=NaN,this.i1e22=NaN,this.i2e00=NaN,this.i2e01=NaN,this.i2e02=NaN,this.i2e10=NaN,this.i2e11=NaN,this.i2e12=NaN,this.i2e20=NaN,this.i2e21=NaN,this.i2e22=NaN,this.motorDenom=NaN,this.invMotorDenom=NaN,this.invDenom=NaN,this.ax=NaN,this.ay=NaN,this.az=NaN,this.r1x=NaN,this.r1y=NaN,this.r1z=NaN,this.r2x=NaN,this.r2y=NaN,this.r2z=NaN,this.t1x=NaN,this.t1y=NaN,this.t1z=NaN,this.t2x=NaN,this.t2y=NaN,this.t2z=NaN,this.l1x=NaN,this.l1y=NaN,this.l1z=NaN,this.l2x=NaN,this.l2y=NaN,this.l2z=NaN,this.a1x=NaN,this.a1y=NaN,this.a1z=NaN,this.a2x=NaN,this.a2y=NaN,this.a2z=NaN,this.lowerLimit=NaN,this.upperLimit=NaN,this.limitVelocity=NaN,this.limitState=0,this.enableMotor=!1,this.motorSpeed=NaN,this.maxMotorForce=NaN,this.maxMotorImpulse=NaN,this.limitMotor=t,this.b1=n.body1,this.b2=n.body2,this.p1=n.anchorPoint1,this.p2=n.anchorPoint2,this.r1=n.relativeAnchorPoint1,this.r2=n.relativeAnchorPoint2,this.l1=this.b1.linearVelocity,this.l2=this.b2.linearVelocity,this.a1=this.b1.angularVelocity,this.a2=this.b2.angularVelocity,this.i1=this.b1.inverseInertia,this.i2=this.b2.inverseInertia,this.limitImpulse=0,this.motorImpulse=0}Object.assign(kc.prototype,{TranslationalConstraint:!0,preSolve:function(n,t){this.ax=this.limitMotor.axis.x,this.ay=this.limitMotor.axis.y,this.az=this.limitMotor.axis.z,this.lowerLimit=this.limitMotor.lowerLimit,this.upperLimit=this.limitMotor.upperLimit,this.motorSpeed=this.limitMotor.motorSpeed,this.maxMotorForce=this.limitMotor.maxMotorForce,this.enableMotor=this.maxMotorForce>0,this.m1=this.b1.inverseMass,this.m2=this.b2.inverseMass;var e=this.i1.elements,s=this.i2.elements;this.i1e00=e[0],this.i1e01=e[1],this.i1e02=e[2],this.i1e10=e[3],this.i1e11=e[4],this.i1e12=e[5],this.i1e20=e[6],this.i1e21=e[7],this.i1e22=e[8],this.i2e00=s[0],this.i2e01=s[1],this.i2e02=s[2],this.i2e10=s[3],this.i2e11=s[4],this.i2e12=s[5],this.i2e20=s[6],this.i2e21=s[7],this.i2e22=s[8];var r=this.p2.x-this.p1.x,a=this.p2.y-this.p1.y,o=this.p2.z-this.p1.z,h=r*this.ax+a*this.ay+o*this.az,l=this.limitMotor.frequency,c=l>0,u=this.lowerLimit<=this.upperLimit;(c&&h>20||h<-20)&&(c=!1),u?(this.lowerLimit==this.upperLimit?(this.limitState!=0&&(this.limitState=0,this.limitImpulse=0),this.limitVelocity=this.lowerLimit-h,c||(h=this.lowerLimit)):h<this.lowerLimit?(this.limitState!=-1&&(this.limitState=-1,this.limitImpulse=0),this.limitVelocity=this.lowerLimit-h,c||(h=this.lowerLimit)):h>this.upperLimit?(this.limitState!=1&&(this.limitState=1,this.limitImpulse=0),this.limitVelocity=this.upperLimit-h,c||(h=this.upperLimit)):(this.limitState=2,this.limitImpulse=0,this.limitVelocity=0),c||(this.limitVelocity>.005?this.limitVelocity-=.005:this.limitVelocity<-.005?this.limitVelocity+=.005:this.limitVelocity=0)):(this.limitState=2,this.limitImpulse=0),this.enableMotor&&(this.limitState!=0||c)?this.maxMotorImpulse=this.maxMotorForce*n:(this.motorImpulse=0,this.maxMotorImpulse=0);var f=h*this.ax,d=h*this.ay,x=h*this.az,g=this.m1/(this.m1+this.m2),v=1-g;if(this.r1x=this.r1.x+f*g,this.r1y=this.r1.y+d*g,this.r1z=this.r1.z+x*g,this.r2x=this.r2.x-f*v,this.r2y=this.r2.y-d*v,this.r2z=this.r2.z-x*v,this.t1x=this.r1y*this.az-this.r1z*this.ay,this.t1y=this.r1z*this.ax-this.r1x*this.az,this.t1z=this.r1x*this.ay-this.r1y*this.ax,this.t2x=this.r2y*this.az-this.r2z*this.ay,this.t2y=this.r2z*this.ax-this.r2x*this.az,this.t2z=this.r2x*this.ay-this.r2y*this.ax,this.l1x=this.ax*this.m1,this.l1y=this.ay*this.m1,this.l1z=this.az*this.m1,this.l2x=this.ax*this.m2,this.l2y=this.ay*this.m2,this.l2z=this.az*this.m2,this.a1x=this.t1x*this.i1e00+this.t1y*this.i1e01+this.t1z*this.i1e02,this.a1y=this.t1x*this.i1e10+this.t1y*this.i1e11+this.t1z*this.i1e12,this.a1z=this.t1x*this.i1e20+this.t1y*this.i1e21+this.t1z*this.i1e22,this.a2x=this.t2x*this.i2e00+this.t2y*this.i2e01+this.t2z*this.i2e02,this.a2y=this.t2x*this.i2e10+this.t2y*this.i2e11+this.t2z*this.i2e12,this.a2z=this.t2x*this.i2e20+this.t2y*this.i2e21+this.t2z*this.i2e22,this.motorDenom=this.m1+this.m2+this.ax*(this.a1y*this.r1z-this.a1z*this.r1y+this.a2y*this.r2z-this.a2z*this.r2y)+this.ay*(this.a1z*this.r1x-this.a1x*this.r1z+this.a2z*this.r2x-this.a2x*this.r2z)+this.az*(this.a1x*this.r1y-this.a1y*this.r1x+this.a2x*this.r2y-this.a2y*this.r2x),this.invMotorDenom=1/this.motorDenom,c&&this.limitState!=2){var p=6.2831853*l,m=p*p*n,S=t/(m+2*this.limitMotor.dampingRatio*p);this.cfm=this.motorDenom*S,this.limitVelocity*=m*S}else this.cfm=0,this.limitVelocity*=t*.05;this.invDenom=1/(this.motorDenom+this.cfm);var M=this.limitImpulse+this.motorImpulse;this.l1.x+=M*this.l1x,this.l1.y+=M*this.l1y,this.l1.z+=M*this.l1z,this.a1.x+=M*this.a1x,this.a1.y+=M*this.a1y,this.a1.z+=M*this.a1z,this.l2.x-=M*this.l2x,this.l2.y-=M*this.l2y,this.l2.z-=M*this.l2z,this.a2.x-=M*this.a2x,this.a2.y-=M*this.a2y,this.a2.z-=M*this.a2z},solve:function(){var n=this.ax*(this.l2.x-this.l1.x)+this.ay*(this.l2.y-this.l1.y)+this.az*(this.l2.z-this.l1.z)+this.t2x*this.a2.x-this.t1x*this.a1.x+this.t2y*this.a2.y-this.t1y*this.a1.y+this.t2z*this.a2.z-this.t1z*this.a1.z,t;if(this.enableMotor){t=(n-this.motorSpeed)*this.invMotorDenom;var e=this.motorImpulse;this.motorImpulse+=t,this.motorImpulse>this.maxMotorImpulse?this.motorImpulse=this.maxMotorImpulse:this.motorImpulse<-this.maxMotorImpulse&&(this.motorImpulse=-this.maxMotorImpulse),t=this.motorImpulse-e,n-=t*this.motorDenom}else t=0;var s;if(this.limitState!=2){s=(n-this.limitVelocity-this.limitImpulse*this.cfm)*this.invDenom;var r=this.limitImpulse;this.limitImpulse+=s,this.limitImpulse*this.limitState<0&&(this.limitImpulse=0),s=this.limitImpulse-r}else s=0;var a=s+t;this.l1.x+=a*this.l1x,this.l1.y+=a*this.l1y,this.l1.z+=a*this.l1z,this.a1.x+=a*this.a1x,this.a1.y+=a*this.a1y,this.a1.z+=a*this.a1z,this.l2.x-=a*this.l2x,this.l2.y-=a*this.l2y,this.l2.z-=a*this.l2z,this.a2.x-=a*this.a2x,this.a2.y-=a*this.a2y,this.a2.z-=a*this.a2z}});function lh(n,t,e){tn.call(this,n),this.type=Rx,this.nor=new yt,this.limitMotor=new Mi(this.nor,!0),this.limitMotor.lowerLimit=t,this.limitMotor.upperLimit=e,this.t=new kc(this,this.limitMotor)}lh.prototype=Object.assign(Object.create(tn.prototype),{constructor:lh,preSolve:function(n,t){this.updateAnchorPoints(),this.nor.sub(this.anchorPoint2,this.anchorPoint1).normalize(),this.t.preSolve(n,t)},solve:function(){this.t.solve()},postSolve:function(){}});function Vc(n,t){this.joint=n,this.targetOrientation=new Ni().invert(t),this.relativeOrientation=new Ni,this.ii1=null,this.ii2=null,this.dd=null,this.vel=new yt,this.imp=new yt,this.rn0=new yt,this.rn1=new yt,this.rn2=new yt,this.b1=n.body1,this.b2=n.body2,this.a1=this.b1.angularVelocity,this.a2=this.b2.angularVelocity,this.i1=this.b1.inverseInertia,this.i2=this.b2.inverseInertia}Object.assign(Vc.prototype,{AngularConstraint:!0,preSolve:function(n,t){var e,s,r;this.ii1=this.i1.clone(),this.ii2=this.i2.clone(),r=new bi().add(this.ii1,this.ii2).elements,e=1/(r[0]*(r[4]*r[8]-r[7]*r[5])+r[3]*(r[7]*r[2]-r[1]*r[8])+r[6]*(r[1]*r[5]-r[4]*r[2])),this.dd=new bi().set(r[4]*r[8]-r[5]*r[7],r[2]*r[7]-r[1]*r[8],r[1]*r[5]-r[2]*r[4],r[5]*r[6]-r[3]*r[8],r[0]*r[8]-r[2]*r[6],r[2]*r[3]-r[0]*r[5],r[3]*r[7]-r[4]*r[6],r[1]*r[6]-r[0]*r[7],r[0]*r[4]-r[1]*r[3]).multiplyScalar(e),this.relativeOrientation.invert(this.b1.orientation).multiply(this.targetOrientation).multiply(this.b2.orientation),e=this.relativeOrientation.w*2,this.vel.copy(this.relativeOrientation).multiplyScalar(e),s=this.vel.length(),s>.02?(s=(.02-s)/s*t*.05,this.vel.multiplyScalar(s)):this.vel.set(0,0,0),this.rn1.copy(this.imp).applyMatrix3(this.ii1,!0),this.rn2.copy(this.imp).applyMatrix3(this.ii2,!0),this.a1.add(this.rn1),this.a2.sub(this.rn2)},solve:function(){var n=this.a2.clone().sub(this.a1).sub(this.vel);this.rn0.copy(n).applyMatrix3(this.dd,!0),this.rn1.copy(this.rn0).applyMatrix3(this.ii1,!0),this.rn2.copy(this.rn0).applyMatrix3(this.ii2,!0),this.imp.add(this.rn0),this.a1.add(this.rn1),this.a2.sub(this.rn2)}});function Ma(n,t,e,s){this.m1=NaN,this.m2=NaN,this.i1e00=NaN,this.i1e01=NaN,this.i1e02=NaN,this.i1e10=NaN,this.i1e11=NaN,this.i1e12=NaN,this.i1e20=NaN,this.i1e21=NaN,this.i1e22=NaN,this.i2e00=NaN,this.i2e01=NaN,this.i2e02=NaN,this.i2e10=NaN,this.i2e11=NaN,this.i2e12=NaN,this.i2e20=NaN,this.i2e21=NaN,this.i2e22=NaN,this.ax1=NaN,this.ay1=NaN,this.az1=NaN,this.ax2=NaN,this.ay2=NaN,this.az2=NaN,this.ax3=NaN,this.ay3=NaN,this.az3=NaN,this.r1x=NaN,this.r1y=NaN,this.r1z=NaN,this.r2x=NaN,this.r2y=NaN,this.r2z=NaN,this.t1x1=NaN,this.t1y1=NaN,this.t1z1=NaN,this.t2x1=NaN,this.t2y1=NaN,this.t2z1=NaN,this.l1x1=NaN,this.l1y1=NaN,this.l1z1=NaN,this.l2x1=NaN,this.l2y1=NaN,this.l2z1=NaN,this.a1x1=NaN,this.a1y1=NaN,this.a1z1=NaN,this.a2x1=NaN,this.a2y1=NaN,this.a2z1=NaN,this.t1x2=NaN,this.t1y2=NaN,this.t1z2=NaN,this.t2x2=NaN,this.t2y2=NaN,this.t2z2=NaN,this.l1x2=NaN,this.l1y2=NaN,this.l1z2=NaN,this.l2x2=NaN,this.l2y2=NaN,this.l2z2=NaN,this.a1x2=NaN,this.a1y2=NaN,this.a1z2=NaN,this.a2x2=NaN,this.a2y2=NaN,this.a2z2=NaN,this.t1x3=NaN,this.t1y3=NaN,this.t1z3=NaN,this.t2x3=NaN,this.t2y3=NaN,this.t2z3=NaN,this.l1x3=NaN,this.l1y3=NaN,this.l1z3=NaN,this.l2x3=NaN,this.l2y3=NaN,this.l2z3=NaN,this.a1x3=NaN,this.a1y3=NaN,this.a1z3=NaN,this.a2x3=NaN,this.a2y3=NaN,this.a2z3=NaN,this.lowerLimit1=NaN,this.upperLimit1=NaN,this.limitVelocity1=NaN,this.limitState1=0,this.enableMotor1=!1,this.motorSpeed1=NaN,this.maxMotorForce1=NaN,this.maxMotorImpulse1=NaN,this.lowerLimit2=NaN,this.upperLimit2=NaN,this.limitVelocity2=NaN,this.limitState2=0,this.enableMotor2=!1,this.motorSpeed2=NaN,this.maxMotorForce2=NaN,this.maxMotorImpulse2=NaN,this.lowerLimit3=NaN,this.upperLimit3=NaN,this.limitVelocity3=NaN,this.limitState3=0,this.enableMotor3=!1,this.motorSpeed3=NaN,this.maxMotorForce3=NaN,this.maxMotorImpulse3=NaN,this.k00=NaN,this.k01=NaN,this.k02=NaN,this.k10=NaN,this.k11=NaN,this.k12=NaN,this.k20=NaN,this.k21=NaN,this.k22=NaN,this.kv00=NaN,this.kv11=NaN,this.kv22=NaN,this.dv00=NaN,this.dv11=NaN,this.dv22=NaN,this.d00=NaN,this.d01=NaN,this.d02=NaN,this.d10=NaN,this.d11=NaN,this.d12=NaN,this.d20=NaN,this.d21=NaN,this.d22=NaN,this.limitMotor1=t,this.limitMotor2=e,this.limitMotor3=s,this.b1=n.body1,this.b2=n.body2,this.p1=n.anchorPoint1,this.p2=n.anchorPoint2,this.r1=n.relativeAnchorPoint1,this.r2=n.relativeAnchorPoint2,this.l1=this.b1.linearVelocity,this.l2=this.b2.linearVelocity,this.a1=this.b1.angularVelocity,this.a2=this.b2.angularVelocity,this.i1=this.b1.inverseInertia,this.i2=this.b2.inverseInertia,this.limitImpulse1=0,this.motorImpulse1=0,this.limitImpulse2=0,this.motorImpulse2=0,this.limitImpulse3=0,this.motorImpulse3=0,this.cfm1=0,this.cfm2=0,this.cfm3=0,this.weight=-1}Object.assign(Ma.prototype,{Translational3Constraint:!0,preSolve:function(n,t){this.ax1=this.limitMotor1.axis.x,this.ay1=this.limitMotor1.axis.y,this.az1=this.limitMotor1.axis.z,this.ax2=this.limitMotor2.axis.x,this.ay2=this.limitMotor2.axis.y,this.az2=this.limitMotor2.axis.z,this.ax3=this.limitMotor3.axis.x,this.ay3=this.limitMotor3.axis.y,this.az3=this.limitMotor3.axis.z,this.lowerLimit1=this.limitMotor1.lowerLimit,this.upperLimit1=this.limitMotor1.upperLimit,this.motorSpeed1=this.limitMotor1.motorSpeed,this.maxMotorForce1=this.limitMotor1.maxMotorForce,this.enableMotor1=this.maxMotorForce1>0,this.lowerLimit2=this.limitMotor2.lowerLimit,this.upperLimit2=this.limitMotor2.upperLimit,this.motorSpeed2=this.limitMotor2.motorSpeed,this.maxMotorForce2=this.limitMotor2.maxMotorForce,this.enableMotor2=this.maxMotorForce2>0,this.lowerLimit3=this.limitMotor3.lowerLimit,this.upperLimit3=this.limitMotor3.upperLimit,this.motorSpeed3=this.limitMotor3.motorSpeed,this.maxMotorForce3=this.limitMotor3.maxMotorForce,this.enableMotor3=this.maxMotorForce3>0,this.m1=this.b1.inverseMass,this.m2=this.b2.inverseMass;var e=this.i1.elements,s=this.i2.elements;this.i1e00=e[0],this.i1e01=e[1],this.i1e02=e[2],this.i1e10=e[3],this.i1e11=e[4],this.i1e12=e[5],this.i1e20=e[6],this.i1e21=e[7],this.i1e22=e[8],this.i2e00=s[0],this.i2e01=s[1],this.i2e02=s[2],this.i2e10=s[3],this.i2e11=s[4],this.i2e12=s[5],this.i2e20=s[6],this.i2e21=s[7],this.i2e22=s[8];var r=this.p2.x-this.p1.x,a=this.p2.y-this.p1.y,o=this.p2.z-this.p1.z,h=r*this.ax1+a*this.ay1+o*this.az1,l=r*this.ax2+a*this.ay2+o*this.az2,c=r*this.ax3+a*this.ay3+o*this.az3,u=this.limitMotor1.frequency,f=this.limitMotor2.frequency,d=this.limitMotor3.frequency,x=u>0,g=f>0,v=d>0,p=this.lowerLimit1<=this.upperLimit1,m=this.lowerLimit2<=this.upperLimit2,S=this.lowerLimit3<=this.upperLimit3;(x&&h>20||h<-20)&&(x=!1),(g&&l>20||l<-20)&&(g=!1),(v&&c>20||c<-20)&&(v=!1),p?(this.lowerLimit1==this.upperLimit1?(this.limitState1!=0&&(this.limitState1=0,this.limitImpulse1=0),this.limitVelocity1=this.lowerLimit1-h,x||(h=this.lowerLimit1)):h<this.lowerLimit1?(this.limitState1!=-1&&(this.limitState1=-1,this.limitImpulse1=0),this.limitVelocity1=this.lowerLimit1-h,x||(h=this.lowerLimit1)):h>this.upperLimit1?(this.limitState1!=1&&(this.limitState1=1,this.limitImpulse1=0),this.limitVelocity1=this.upperLimit1-h,x||(h=this.upperLimit1)):(this.limitState1=2,this.limitImpulse1=0,this.limitVelocity1=0),x||(this.limitVelocity1>.005?this.limitVelocity1-=.005:this.limitVelocity1<-.005?this.limitVelocity1+=.005:this.limitVelocity1=0)):(this.limitState1=2,this.limitImpulse1=0),m?(this.lowerLimit2==this.upperLimit2?(this.limitState2!=0&&(this.limitState2=0,this.limitImpulse2=0),this.limitVelocity2=this.lowerLimit2-l,g||(l=this.lowerLimit2)):l<this.lowerLimit2?(this.limitState2!=-1&&(this.limitState2=-1,this.limitImpulse2=0),this.limitVelocity2=this.lowerLimit2-l,g||(l=this.lowerLimit2)):l>this.upperLimit2?(this.limitState2!=1&&(this.limitState2=1,this.limitImpulse2=0),this.limitVelocity2=this.upperLimit2-l,g||(l=this.upperLimit2)):(this.limitState2=2,this.limitImpulse2=0,this.limitVelocity2=0),g||(this.limitVelocity2>.005?this.limitVelocity2-=.005:this.limitVelocity2<-.005?this.limitVelocity2+=.005:this.limitVelocity2=0)):(this.limitState2=2,this.limitImpulse2=0),S?(this.lowerLimit3==this.upperLimit3?(this.limitState3!=0&&(this.limitState3=0,this.limitImpulse3=0),this.limitVelocity3=this.lowerLimit3-c,v||(c=this.lowerLimit3)):c<this.lowerLimit3?(this.limitState3!=-1&&(this.limitState3=-1,this.limitImpulse3=0),this.limitVelocity3=this.lowerLimit3-c,v||(c=this.lowerLimit3)):c>this.upperLimit3?(this.limitState3!=1&&(this.limitState3=1,this.limitImpulse3=0),this.limitVelocity3=this.upperLimit3-c,v||(c=this.upperLimit3)):(this.limitState3=2,this.limitImpulse3=0,this.limitVelocity3=0),v||(this.limitVelocity3>.005?this.limitVelocity3-=.005:this.limitVelocity3<-.005?this.limitVelocity3+=.005:this.limitVelocity3=0)):(this.limitState3=2,this.limitImpulse3=0),this.enableMotor1&&(this.limitState1!=0||x)?this.maxMotorImpulse1=this.maxMotorForce1*n:(this.motorImpulse1=0,this.maxMotorImpulse1=0),this.enableMotor2&&(this.limitState2!=0||g)?this.maxMotorImpulse2=this.maxMotorForce2*n:(this.motorImpulse2=0,this.maxMotorImpulse2=0),this.enableMotor3&&(this.limitState3!=0||v)?this.maxMotorImpulse3=this.maxMotorForce3*n:(this.motorImpulse3=0,this.maxMotorImpulse3=0);var M=h*this.ax1+l*this.ax2+c*this.ax2,E=h*this.ay1+l*this.ay2+c*this.ay2,A=h*this.az1+l*this.az2+c*this.az2,R=this.m2/(this.m1+this.m2);this.weight>=0&&(R=this.weight);var C=1-R;this.r1x=this.r1.x+M*R,this.r1y=this.r1.y+E*R,this.r1z=this.r1.z+A*R,this.r2x=this.r2.x-M*C,this.r2y=this.r2.y-E*C,this.r2z=this.r2.z-A*C,this.t1x1=this.r1y*this.az1-this.r1z*this.ay1,this.t1y1=this.r1z*this.ax1-this.r1x*this.az1,this.t1z1=this.r1x*this.ay1-this.r1y*this.ax1,this.t2x1=this.r2y*this.az1-this.r2z*this.ay1,this.t2y1=this.r2z*this.ax1-this.r2x*this.az1,this.t2z1=this.r2x*this.ay1-this.r2y*this.ax1,this.l1x1=this.ax1*this.m1,this.l1y1=this.ay1*this.m1,this.l1z1=this.az1*this.m1,this.l2x1=this.ax1*this.m2,this.l2y1=this.ay1*this.m2,this.l2z1=this.az1*this.m2,this.a1x1=this.t1x1*this.i1e00+this.t1y1*this.i1e01+this.t1z1*this.i1e02,this.a1y1=this.t1x1*this.i1e10+this.t1y1*this.i1e11+this.t1z1*this.i1e12,this.a1z1=this.t1x1*this.i1e20+this.t1y1*this.i1e21+this.t1z1*this.i1e22,this.a2x1=this.t2x1*this.i2e00+this.t2y1*this.i2e01+this.t2z1*this.i2e02,this.a2y1=this.t2x1*this.i2e10+this.t2y1*this.i2e11+this.t2z1*this.i2e12,this.a2z1=this.t2x1*this.i2e20+this.t2y1*this.i2e21+this.t2z1*this.i2e22,this.t1x2=this.r1y*this.az2-this.r1z*this.ay2,this.t1y2=this.r1z*this.ax2-this.r1x*this.az2,this.t1z2=this.r1x*this.ay2-this.r1y*this.ax2,this.t2x2=this.r2y*this.az2-this.r2z*this.ay2,this.t2y2=this.r2z*this.ax2-this.r2x*this.az2,this.t2z2=this.r2x*this.ay2-this.r2y*this.ax2,this.l1x2=this.ax2*this.m1,this.l1y2=this.ay2*this.m1,this.l1z2=this.az2*this.m1,this.l2x2=this.ax2*this.m2,this.l2y2=this.ay2*this.m2,this.l2z2=this.az2*this.m2,this.a1x2=this.t1x2*this.i1e00+this.t1y2*this.i1e01+this.t1z2*this.i1e02,this.a1y2=this.t1x2*this.i1e10+this.t1y2*this.i1e11+this.t1z2*this.i1e12,this.a1z2=this.t1x2*this.i1e20+this.t1y2*this.i1e21+this.t1z2*this.i1e22,this.a2x2=this.t2x2*this.i2e00+this.t2y2*this.i2e01+this.t2z2*this.i2e02,this.a2y2=this.t2x2*this.i2e10+this.t2y2*this.i2e11+this.t2z2*this.i2e12,this.a2z2=this.t2x2*this.i2e20+this.t2y2*this.i2e21+this.t2z2*this.i2e22,this.t1x3=this.r1y*this.az3-this.r1z*this.ay3,this.t1y3=this.r1z*this.ax3-this.r1x*this.az3,this.t1z3=this.r1x*this.ay3-this.r1y*this.ax3,this.t2x3=this.r2y*this.az3-this.r2z*this.ay3,this.t2y3=this.r2z*this.ax3-this.r2x*this.az3,this.t2z3=this.r2x*this.ay3-this.r2y*this.ax3,this.l1x3=this.ax3*this.m1,this.l1y3=this.ay3*this.m1,this.l1z3=this.az3*this.m1,this.l2x3=this.ax3*this.m2,this.l2y3=this.ay3*this.m2,this.l2z3=this.az3*this.m2,this.a1x3=this.t1x3*this.i1e00+this.t1y3*this.i1e01+this.t1z3*this.i1e02,this.a1y3=this.t1x3*this.i1e10+this.t1y3*this.i1e11+this.t1z3*this.i1e12,this.a1z3=this.t1x3*this.i1e20+this.t1y3*this.i1e21+this.t1z3*this.i1e22,this.a2x3=this.t2x3*this.i2e00+this.t2y3*this.i2e01+this.t2z3*this.i2e02,this.a2y3=this.t2x3*this.i2e10+this.t2y3*this.i2e11+this.t2z3*this.i2e12,this.a2z3=this.t2x3*this.i2e20+this.t2y3*this.i2e21+this.t2z3*this.i2e22;var y=this.m1+this.m2;if(this.k00=(this.ax1*this.ax1+this.ay1*this.ay1+this.az1*this.az1)*y,this.k01=(this.ax1*this.ax2+this.ay1*this.ay2+this.az1*this.az2)*y,this.k02=(this.ax1*this.ax3+this.ay1*this.ay3+this.az1*this.az3)*y,this.k10=(this.ax2*this.ax1+this.ay2*this.ay1+this.az2*this.az1)*y,this.k11=(this.ax2*this.ax2+this.ay2*this.ay2+this.az2*this.az2)*y,this.k12=(this.ax2*this.ax3+this.ay2*this.ay3+this.az2*this.az3)*y,this.k20=(this.ax3*this.ax1+this.ay3*this.ay1+this.az3*this.az1)*y,this.k21=(this.ax3*this.ax2+this.ay3*this.ay2+this.az3*this.az2)*y,this.k22=(this.ax3*this.ax3+this.ay3*this.ay3+this.az3*this.az3)*y,this.k00+=this.t1x1*this.a1x1+this.t1y1*this.a1y1+this.t1z1*this.a1z1,this.k01+=this.t1x1*this.a1x2+this.t1y1*this.a1y2+this.t1z1*this.a1z2,this.k02+=this.t1x1*this.a1x3+this.t1y1*this.a1y3+this.t1z1*this.a1z3,this.k10+=this.t1x2*this.a1x1+this.t1y2*this.a1y1+this.t1z2*this.a1z1,this.k11+=this.t1x2*this.a1x2+this.t1y2*this.a1y2+this.t1z2*this.a1z2,this.k12+=this.t1x2*this.a1x3+this.t1y2*this.a1y3+this.t1z2*this.a1z3,this.k20+=this.t1x3*this.a1x1+this.t1y3*this.a1y1+this.t1z3*this.a1z1,this.k21+=this.t1x3*this.a1x2+this.t1y3*this.a1y2+this.t1z3*this.a1z2,this.k22+=this.t1x3*this.a1x3+this.t1y3*this.a1y3+this.t1z3*this.a1z3,this.k00+=this.t2x1*this.a2x1+this.t2y1*this.a2y1+this.t2z1*this.a2z1,this.k01+=this.t2x1*this.a2x2+this.t2y1*this.a2y2+this.t2z1*this.a2z2,this.k02+=this.t2x1*this.a2x3+this.t2y1*this.a2y3+this.t2z1*this.a2z3,this.k10+=this.t2x2*this.a2x1+this.t2y2*this.a2y1+this.t2z2*this.a2z1,this.k11+=this.t2x2*this.a2x2+this.t2y2*this.a2y2+this.t2z2*this.a2z2,this.k12+=this.t2x2*this.a2x3+this.t2y2*this.a2y3+this.t2z2*this.a2z3,this.k20+=this.t2x3*this.a2x1+this.t2y3*this.a2y1+this.t2z3*this.a2z1,this.k21+=this.t2x3*this.a2x2+this.t2y3*this.a2y2+this.t2z3*this.a2z2,this.k22+=this.t2x3*this.a2x3+this.t2y3*this.a2y3+this.t2z3*this.a2z3,this.kv00=this.k00,this.kv11=this.k11,this.kv22=this.k22,this.dv00=1/this.kv00,this.dv11=1/this.kv11,this.dv22=1/this.kv22,x&&this.limitState1!=2){var b=6.2831853*u,D=b*b*n,w=t/(D+2*this.limitMotor1.dampingRatio*b);this.cfm1=this.kv00*w,this.limitVelocity1*=D*w}else this.cfm1=0,this.limitVelocity1*=t*.05;g&&this.limitState2!=2?(b=6.2831853*f,D=b*b*n,w=t/(D+2*this.limitMotor2.dampingRatio*b),this.cfm2=this.kv11*w,this.limitVelocity2*=D*w):(this.cfm2=0,this.limitVelocity2*=t*.05),v&&this.limitState3!=2?(b=6.2831853*d,D=b*b*n,w=t/(D+2*this.limitMotor3.dampingRatio*b),this.cfm3=this.kv22*w,this.limitVelocity3*=D*w):(this.cfm3=0,this.limitVelocity3*=t*.05),this.k00+=this.cfm1,this.k11+=this.cfm2,this.k22+=this.cfm3;var N=1/(this.k00*(this.k11*this.k22-this.k21*this.k12)+this.k10*(this.k21*this.k02-this.k01*this.k22)+this.k20*(this.k01*this.k12-this.k11*this.k02));this.d00=(this.k11*this.k22-this.k12*this.k21)*N,this.d01=(this.k02*this.k21-this.k01*this.k22)*N,this.d02=(this.k01*this.k12-this.k02*this.k11)*N,this.d10=(this.k12*this.k20-this.k10*this.k22)*N,this.d11=(this.k00*this.k22-this.k02*this.k20)*N,this.d12=(this.k02*this.k10-this.k00*this.k12)*N,this.d20=(this.k10*this.k21-this.k11*this.k20)*N,this.d21=(this.k01*this.k20-this.k00*this.k21)*N,this.d22=(this.k00*this.k11-this.k01*this.k10)*N;var I=this.limitImpulse1+this.motorImpulse1,L=this.limitImpulse2+this.motorImpulse2,k=this.limitImpulse3+this.motorImpulse3;this.l1.x+=I*this.l1x1+L*this.l1x2+k*this.l1x3,this.l1.y+=I*this.l1y1+L*this.l1y2+k*this.l1y3,this.l1.z+=I*this.l1z1+L*this.l1z2+k*this.l1z3,this.a1.x+=I*this.a1x1+L*this.a1x2+k*this.a1x3,this.a1.y+=I*this.a1y1+L*this.a1y2+k*this.a1y3,this.a1.z+=I*this.a1z1+L*this.a1z2+k*this.a1z3,this.l2.x-=I*this.l2x1+L*this.l2x2+k*this.l2x3,this.l2.y-=I*this.l2y1+L*this.l2y2+k*this.l2y3,this.l2.z-=I*this.l2z1+L*this.l2z2+k*this.l2z3,this.a2.x-=I*this.a2x1+L*this.a2x2+k*this.a2x3,this.a2.y-=I*this.a2y1+L*this.a2y2+k*this.a2y3,this.a2.z-=I*this.a2z1+L*this.a2z2+k*this.a2z3},solve:function(){var n=this.l2.x-this.l1.x+this.a2.y*this.r2z-this.a2.z*this.r2y-this.a1.y*this.r1z+this.a1.z*this.r1y,t=this.l2.y-this.l1.y+this.a2.z*this.r2x-this.a2.x*this.r2z-this.a1.z*this.r1x+this.a1.x*this.r1z,e=this.l2.z-this.l1.z+this.a2.x*this.r2y-this.a2.y*this.r2x-this.a1.x*this.r1y+this.a1.y*this.r1x,s=n*this.ax1+t*this.ay1+e*this.az1,r=n*this.ax2+t*this.ay2+e*this.az2,a=n*this.ax3+t*this.ay3+e*this.az3,o=this.motorImpulse1,h=this.motorImpulse2,l=this.motorImpulse3,c=0,u=0,f=0;this.enableMotor1&&(c=(s-this.motorSpeed1)*this.dv00,this.motorImpulse1+=c,this.motorImpulse1>this.maxMotorImpulse1?this.motorImpulse1=this.maxMotorImpulse1:this.motorImpulse1<-this.maxMotorImpulse1&&(this.motorImpulse1=-this.maxMotorImpulse1),c=this.motorImpulse1-o),this.enableMotor2&&(u=(r-this.motorSpeed2)*this.dv11,this.motorImpulse2+=u,this.motorImpulse2>this.maxMotorImpulse2?this.motorImpulse2=this.maxMotorImpulse2:this.motorImpulse2<-this.maxMotorImpulse2&&(this.motorImpulse2=-this.maxMotorImpulse2),u=this.motorImpulse2-h),this.enableMotor3&&(f=(a-this.motorSpeed3)*this.dv22,this.motorImpulse3+=f,this.motorImpulse3>this.maxMotorImpulse3?this.motorImpulse3=this.maxMotorImpulse3:this.motorImpulse3<-this.maxMotorImpulse3&&(this.motorImpulse3=-this.maxMotorImpulse3),f=this.motorImpulse3-l),s+=c*this.kv00+u*this.k01+f*this.k02,r+=c*this.k10+u*this.kv11+f*this.k12,a+=c*this.k20+u*this.k21+f*this.kv22,s-=this.limitVelocity1+this.limitImpulse1*this.cfm1,r-=this.limitVelocity2+this.limitImpulse2*this.cfm2,a-=this.limitVelocity3+this.limitImpulse3*this.cfm3;var d=this.limitImpulse1,x=this.limitImpulse2,g=this.limitImpulse3,v=s*this.d00+r*this.d01+a*this.d02,p=s*this.d10+r*this.d11+a*this.d12,m=s*this.d20+r*this.d21+a*this.d22;this.limitImpulse1+=v,this.limitImpulse2+=p,this.limitImpulse3+=m;var S=0;(this.limitState1==2||this.limitImpulse1*this.limitState1<0)&&(v=-d,r+=v*this.k10,a+=v*this.k20,S|=1),(this.limitState2==2||this.limitImpulse2*this.limitState2<0)&&(p=-x,s+=p*this.k01,a+=p*this.k21,S|=2),(this.limitState3==2||this.limitImpulse3*this.limitState3<0)&&(m=-g,s+=m*this.k02,r+=m*this.k12,S|=4);var M;switch(S){case 1:M=1/(this.k11*this.k22-this.k12*this.k21),p=(this.k22*r+-this.k12*a)*M,m=(-this.k21*r+this.k11*a)*M;break;case 2:M=1/(this.k00*this.k22-this.k02*this.k20),v=(this.k22*s+-this.k02*a)*M,m=(-this.k20*s+this.k00*a)*M;break;case 3:m=a/this.k22;break;case 4:M=1/(this.k00*this.k11-this.k01*this.k10),v=(this.k11*s+-this.k01*r)*M,p=(-this.k10*s+this.k00*r)*M;break;case 5:p=r/this.k11;break;case 6:v=s/this.k00;break}this.limitImpulse1=d+v,this.limitImpulse2=x+p,this.limitImpulse3=g+m;var E=c+v,A=u+p,R=f+m;this.l1.x+=E*this.l1x1+A*this.l1x2+R*this.l1x3,this.l1.y+=E*this.l1y1+A*this.l1y2+R*this.l1y3,this.l1.z+=E*this.l1z1+A*this.l1z2+R*this.l1z3,this.a1.x+=E*this.a1x1+A*this.a1x2+R*this.a1x3,this.a1.y+=E*this.a1y1+A*this.a1y2+R*this.a1y3,this.a1.z+=E*this.a1z1+A*this.a1z2+R*this.a1z3,this.l2.x-=E*this.l2x1+A*this.l2x2+R*this.l2x3,this.l2.y-=E*this.l2y1+A*this.l2y2+R*this.l2y3,this.l2.z-=E*this.l2z1+A*this.l2z2+R*this.l2z3,this.a2.x-=E*this.a2x1+A*this.a2x2+R*this.a2x3,this.a2.y-=E*this.a2y1+A*this.a2y2+R*this.a2y3,this.a2.z-=E*this.a2z1+A*this.a2z2+R*this.a2z3}});function ch(n,t,e){tn.call(this,n),this.type=Lx,this.localAxis1=n.localAxis1.clone().normalize(),this.localAxis2=n.localAxis2.clone().normalize(),this.ax1=new yt,this.ax2=new yt,this.nor=new yt,this.tan=new yt,this.bin=new yt,this.ac=new Vc(this,new Ni().setFromUnitVectors(this.localAxis1,this.localAxis2)),this.limitMotor=new Mi(this.nor,!0),this.limitMotor.lowerLimit=t,this.limitMotor.upperLimit=e,this.t3=new Ma(this,this.limitMotor,new Mi(this.tan,!0),new Mi(this.bin,!0))}ch.prototype=Object.assign(Object.create(tn.prototype),{constructor:ch,preSolve:function(n,t){this.updateAnchorPoints(),this.ax1.copy(this.localAxis1).applyMatrix3(this.body1.rotation,!0),this.ax2.copy(this.localAxis2).applyMatrix3(this.body2.rotation,!0),this.nor.set(this.ax1.x*this.body2.inverseMass+this.ax2.x*this.body1.inverseMass,this.ax1.y*this.body2.inverseMass+this.ax2.y*this.body1.inverseMass,this.ax1.z*this.body2.inverseMass+this.ax2.z*this.body1.inverseMass).normalize(),this.tan.tangent(this.nor).normalize(),this.bin.crossVectors(this.nor,this.tan),this.ac.preSolve(n,t),this.t3.preSolve(n,t)},solve:function(){this.ac.solve(),this.t3.solve()},postSolve:function(){}});function uh(n,t,e){tn.call(this,n),this.type=Ix,this.localAxis1=n.localAxis1.clone().normalize(),this.localAxis2=n.localAxis2.clone().normalize();var s=new bi().setQuat(new Ni().setFromUnitVectors(this.localAxis1,this.localAxis2));this.localAngle1=new yt().tangent(this.localAxis1).normalize(),this.localAngle2=this.localAngle1.clone().applyMatrix3(s,!0),this.ax1=new yt,this.ax2=new yt,this.an1=new yt,this.an2=new yt,this.tmp=new yt,this.nor=new yt,this.tan=new yt,this.bin=new yt,this.rotationalLimitMotor=new Mi(this.nor,!1),this.r3=new ya(this,this.rotationalLimitMotor,new Mi(this.tan,!0),new Mi(this.bin,!0)),this.translationalLimitMotor=new Mi(this.nor,!0),this.translationalLimitMotor.lowerLimit=t,this.translationalLimitMotor.upperLimit=e,this.t3=new Ma(this,this.translationalLimitMotor,new Mi(this.tan,!0),new Mi(this.bin,!0))}uh.prototype=Object.assign(Object.create(tn.prototype),{constructor:uh,preSolve:function(n,t){this.updateAnchorPoints(),this.ax1.copy(this.localAxis1).applyMatrix3(this.body1.rotation,!0),this.an1.copy(this.localAngle1).applyMatrix3(this.body1.rotation,!0),this.ax2.copy(this.localAxis2).applyMatrix3(this.body2.rotation,!0),this.an2.copy(this.localAngle2).applyMatrix3(this.body2.rotation,!0),this.nor.set(this.ax1.x*this.body2.inverseMass+this.ax2.x*this.body1.inverseMass,this.ax1.y*this.body2.inverseMass+this.ax2.y*this.body1.inverseMass,this.ax1.z*this.body2.inverseMass+this.ax2.z*this.body1.inverseMass).normalize(),this.tan.tangent(this.nor).normalize(),this.bin.crossVectors(this.nor,this.tan),this.tmp.crossVectors(this.an1,this.an2);var e=Tt.acosClamp(Tt.dotVectors(this.an1,this.an2));Tt.dotVectors(this.nor,this.tmp)<0?this.rotationalLimitMotor.angle=-e:this.rotationalLimitMotor.angle=e,this.tmp.crossVectors(this.ax1,this.ax2),this.r3.limitMotor2.angle=Tt.dotVectors(this.tan,this.tmp),this.r3.limitMotor3.angle=Tt.dotVectors(this.bin,this.tmp),this.r3.preSolve(n,t),this.t3.preSolve(n,t)},solve:function(){this.r3.solve(),this.t3.solve()},postSolve:function(){}});function fh(n){tn.call(this,n),this.type=Nx,this.localAxis1=n.localAxis1.clone().normalize(),this.localAxis2=n.localAxis2.clone().normalize(),this.localAngle1=new yt,this.localAngle2=new yt;var t=Tt.dotVectors(this.localAxis1,this.localAxis2);if(t>-1&&t<1)this.localAngle1.set(this.localAxis2.x-t*this.localAxis1.x,this.localAxis2.y-t*this.localAxis1.y,this.localAxis2.z-t*this.localAxis1.z).normalize(),this.localAngle2.set(this.localAxis1.x-t*this.localAxis2.x,this.localAxis1.y-t*this.localAxis2.y,this.localAxis1.z-t*this.localAxis2.z).normalize();else{var e=new bi().setQuat(new Ni().setFromUnitVectors(this.localAxis1,this.localAxis2));this.localAngle1.tangent(this.localAxis1).normalize(),this.localAngle2=this.localAngle1.clone().applyMatrix3(e,!0)}this.ax1=new yt,this.ax2=new yt,this.an1=new yt,this.an2=new yt,this.tmp=new yt,this.nor=new yt,this.tan=new yt,this.bin=new yt,this.translationalLimitMotor=new Mi(this.tan,!0),this.translationalLimitMotor.frequency=8,this.translationalLimitMotor.dampingRatio=1,this.rotationalLimitMotor1=new Mi(this.tan,!1),this.rotationalLimitMotor2=new Mi(this.bin,!1),this.t3=new Ma(this,new Mi(this.nor,!0),this.translationalLimitMotor,new Mi(this.bin,!0)),this.t3.weight=1,this.r3=new ya(this,new Mi(this.nor,!0),this.rotationalLimitMotor1,this.rotationalLimitMotor2)}fh.prototype=Object.assign(Object.create(tn.prototype),{constructor:fh,preSolve:function(n,t){this.updateAnchorPoints(),this.ax1.copy(this.localAxis1).applyMatrix3(this.body1.rotation,!0),this.an1.copy(this.localAngle1).applyMatrix3(this.body1.rotation,!0),this.ax2.copy(this.localAxis2).applyMatrix3(this.body2.rotation,!0),this.an2.copy(this.localAngle2).applyMatrix3(this.body2.rotation,!0),this.r3.limitMotor1.angle=Tt.dotVectors(this.ax1,this.ax2);var e=Tt.dotVectors(this.an1,this.ax2);Tt.dotVectors(this.ax1,this.tmp.crossVectors(this.an1,this.ax2))<0?this.rotationalLimitMotor1.angle=-e:this.rotationalLimitMotor1.angle=e,e=Tt.dotVectors(this.an2,this.ax1),Tt.dotVectors(this.ax2,this.tmp.crossVectors(this.an2,this.ax1))<0?this.rotationalLimitMotor2.angle=-e:this.rotationalLimitMotor2.angle=e,this.nor.crossVectors(this.ax1,this.ax2).normalize(),this.tan.crossVectors(this.nor,this.ax2).normalize(),this.bin.crossVectors(this.nor,this.ax1).normalize(),this.r3.preSolve(n,t),this.t3.preSolve(n,t)},solve:function(){this.r3.solve(),this.t3.solve()},postSolve:function(){}});function Fx(){this.scale=1,this.invScale=1,this.body1=null,this.body2=null,this.localAnchorPoint1=new yt,this.localAnchorPoint2=new yt,this.localAxis1=new yt,this.localAxis2=new yt,this.allowCollision=!1}function Ox(){this.mass=0,this.inertia=new bi}function jr(n){this.prev=null,this.next=null,this.shape=null,this.body=null,this.contact=n}function Kr(){this.lp1X=NaN,this.lp1Y=NaN,this.lp1Z=NaN,this.lp2X=NaN,this.lp2Y=NaN,this.lp2Z=NaN,this.impulse=NaN}function Zr(){this.warmStarted=!1,this.position=new yt,this.localPoint1=new yt,this.localPoint2=new yt,this.normal=new yt,this.tangent=new yt,this.binormal=new yt,this.normalImpulse=0,this.tangentImpulse=0,this.binormalImpulse=0,this.normalDenominator=0,this.tangentDenominator=0,this.binormalDenominator=0,this.penetration=0}function dh(){this.body1=null,this.body2=null,this.numPoints=0,this.points=[new Zr,new Zr,new Zr,new Zr]}dh.prototype={constructor:dh,reset:function(n,t){this.body1=n.parent,this.body2=t.parent,this.numPoints=0},addPointVec:function(n,t,e,s){var r=this.points[this.numPoints++];r.position.copy(n),r.localPoint1.sub(n,this.body1.position).applyMatrix3(this.body1.rotation),r.localPoint2.sub(n,this.body2.position).applyMatrix3(this.body2.rotation),r.normal.copy(t),s&&r.normal.negate(),r.normalImpulse=0,r.penetration=e,r.warmStarted=!1},addPoint:function(n,t,e,s,r,a,o,h){var l=this.points[this.numPoints++];l.position.set(n,t,e),l.localPoint1.sub(l.position,this.body1.position).applyMatrix3(this.body1.rotation),l.localPoint2.sub(l.position,this.body2.position).applyMatrix3(this.body2.rotation),l.normalImpulse=0,l.normal.set(s,r,a),h&&l.normal.negate(),l.penetration=o,l.warmStarted=!1}};function $r(){this.nor=new yt,this.tan=new yt,this.bin=new yt,this.norU1=new yt,this.tanU1=new yt,this.binU1=new yt,this.norU2=new yt,this.tanU2=new yt,this.binU2=new yt,this.norT1=new yt,this.tanT1=new yt,this.binT1=new yt,this.norT2=new yt,this.tanT2=new yt,this.binT2=new yt,this.norTU1=new yt,this.tanTU1=new yt,this.binTU1=new yt,this.norTU2=new yt,this.tanTU2=new yt,this.binTU2=new yt,this.norImp=0,this.tanImp=0,this.binImp=0,this.norDen=0,this.tanDen=0,this.binDen=0,this.norTar=0,this.next=null,this.last=!1}function ph(n){br.call(this),this.manifold=n,this.restitution=NaN,this.friction=NaN,this.p1=null,this.p2=null,this.lv1=null,this.lv2=null,this.av1=null,this.av2=null,this.i1=null,this.i2=null,this.tmp=new yt,this.tmpC1=new yt,this.tmpC2=new yt,this.tmpP1=new yt,this.tmpP2=new yt,this.tmplv1=new yt,this.tmplv2=new yt,this.tmpav1=new yt,this.tmpav2=new yt,this.m1=NaN,this.m2=NaN,this.num=0,this.ps=n.points,this.cs=new $r,this.cs.next=new $r,this.cs.next.next=new $r,this.cs.next.next.next=new $r}ph.prototype=Object.assign(Object.create(br.prototype),{constructor:ph,attach:function(){this.p1=this.body1.position,this.p2=this.body2.position,this.lv1=this.body1.linearVelocity,this.av1=this.body1.angularVelocity,this.lv2=this.body2.linearVelocity,this.av2=this.body2.angularVelocity,this.i1=this.body1.inverseInertia,this.i2=this.body2.inverseInertia},detach:function(){this.p1=null,this.p2=null,this.lv1=null,this.lv2=null,this.av1=null,this.av2=null,this.i1=null,this.i2=null},preSolve:function(n,t){this.m1=this.body1.inverseMass,this.m2=this.body2.inverseMass;var e=this.m1+this.m2;this.num=this.manifold.numPoints;for(var s=this.cs,r,a,o,h,l,c,u,f,d=0;d<this.num;d++)r=this.ps[d],this.tmpP1.sub(r.position,this.p1),this.tmpP2.sub(r.position,this.p2),this.tmpC1.crossVectors(this.av1,this.tmpP1),this.tmpC2.crossVectors(this.av2,this.tmpP2),s.norImp=r.normalImpulse,s.tanImp=r.tangentImpulse,s.binImp=r.binormalImpulse,s.nor.copy(r.normal),this.tmp.set(this.lv2.x+this.tmpC2.x-(this.lv1.x+this.tmpC1.x),this.lv2.y+this.tmpC2.y-(this.lv1.y+this.tmpC1.y),this.lv2.z+this.tmpC2.z-(this.lv1.z+this.tmpC1.z)),a=Tt.dotVectors(s.nor,this.tmp),s.tan.set(this.tmp.x-a*s.nor.x,this.tmp.y-a*s.nor.y,this.tmp.z-a*s.nor.z),o=Tt.dotVectors(s.tan,s.tan),o<=.04&&s.tan.tangent(s.nor),s.tan.normalize(),s.bin.crossVectors(s.nor,s.tan),s.norU1.scale(s.nor,this.m1),s.norU2.scale(s.nor,this.m2),s.tanU1.scale(s.tan,this.m1),s.tanU2.scale(s.tan,this.m2),s.binU1.scale(s.bin,this.m1),s.binU2.scale(s.bin,this.m2),s.norT1.crossVectors(this.tmpP1,s.nor),s.tanT1.crossVectors(this.tmpP1,s.tan),s.binT1.crossVectors(this.tmpP1,s.bin),s.norT2.crossVectors(this.tmpP2,s.nor),s.tanT2.crossVectors(this.tmpP2,s.tan),s.binT2.crossVectors(this.tmpP2,s.bin),u=this.i1,f=this.i2,s.norTU1.copy(s.norT1).applyMatrix3(u,!0),s.tanTU1.copy(s.tanT1).applyMatrix3(u,!0),s.binTU1.copy(s.binT1).applyMatrix3(u,!0),s.norTU2.copy(s.norT2).applyMatrix3(f,!0),s.tanTU2.copy(s.tanT2).applyMatrix3(f,!0),s.binTU2.copy(s.binT2).applyMatrix3(f,!0),this.tmpC1.crossVectors(s.norTU1,this.tmpP1),this.tmpC2.crossVectors(s.norTU2,this.tmpP2),this.tmp.add(this.tmpC1,this.tmpC2),s.norDen=1/(e+Tt.dotVectors(s.nor,this.tmp)),this.tmpC1.crossVectors(s.tanTU1,this.tmpP1),this.tmpC2.crossVectors(s.tanTU2,this.tmpP2),this.tmp.add(this.tmpC1,this.tmpC2),s.tanDen=1/(e+Tt.dotVectors(s.tan,this.tmp)),this.tmpC1.crossVectors(s.binTU1,this.tmpP1),this.tmpC2.crossVectors(s.binTU2,this.tmpP2),this.tmp.add(this.tmpC1,this.tmpC2),s.binDen=1/(e+Tt.dotVectors(s.bin,this.tmp)),r.warmStarted?(h=r.normalImpulse,this.lv1.addScaledVector(s.norU1,h),this.av1.addScaledVector(s.norTU1,h),this.lv2.subScaledVector(s.norU2,h),this.av2.subScaledVector(s.norTU2,h),s.norImp=h,s.tanImp=0,s.binImp=0,a=0):(s.norImp=0,s.tanImp=0,s.binImp=0),a>-1&&(a=0),l=this.restitution*-a,c=-(r.penetration+.005)*t*.05,l<c&&(l=c),s.norTar=l,s.last=d==this.num-1,s=s.next},solve:function(){this.tmplv1.copy(this.lv1),this.tmplv2.copy(this.lv2),this.tmpav1.copy(this.av1),this.tmpav2.copy(this.av2);for(var n,t,e,s,r,a,o,h,l,c,u=this.cs;a=u.norImp,o=u.tanImp,h=u.binImp,l=-a*this.friction,this.tmp.sub(this.tmplv2,this.tmplv1),r=Tt.dotVectors(this.tmp,u.tan)+Tt.dotVectors(this.tmpav2,u.tanT2)-Tt.dotVectors(this.tmpav1,u.tanT1),n=o,t=r*u.tanDen,o+=t,r=Tt.dotVectors(this.tmp,u.bin)+Tt.dotVectors(this.tmpav2,u.binT2)-Tt.dotVectors(this.tmpav1,u.binT1),e=h,s=r*u.binDen,h+=s,c=o*o+h*h,c>l*l&&(c=l/Tt.sqrt(c),o*=c,h*=c),t=o-n,s=h-e,this.tmp.set(u.tanU1.x*t+u.binU1.x*s,u.tanU1.y*t+u.binU1.y*s,u.tanU1.z*t+u.binU1.z*s),this.tmplv1.addEqual(this.tmp),this.tmp.set(u.tanTU1.x*t+u.binTU1.x*s,u.tanTU1.y*t+u.binTU1.y*s,u.tanTU1.z*t+u.binTU1.z*s),this.tmpav1.addEqual(this.tmp),this.tmp.set(u.tanU2.x*t+u.binU2.x*s,u.tanU2.y*t+u.binU2.y*s,u.tanU2.z*t+u.binU2.z*s),this.tmplv2.subEqual(this.tmp),this.tmp.set(u.tanTU2.x*t+u.binTU2.x*s,u.tanTU2.y*t+u.binTU2.y*s,u.tanTU2.z*t+u.binTU2.z*s),this.tmpav2.subEqual(this.tmp),this.tmp.sub(this.tmplv2,this.tmplv1),r=Tt.dotVectors(this.tmp,u.nor)+Tt.dotVectors(this.tmpav2,u.norT2)-Tt.dotVectors(this.tmpav1,u.norT1),n=a,t=(r-u.norTar)*u.norDen,a+=t,a>0&&(a=0),t=a-n,this.tmplv1.addScaledVector(u.norU1,t),this.tmpav1.addScaledVector(u.norTU1,t),this.tmplv2.subScaledVector(u.norU2,t),this.tmpav2.subScaledVector(u.norTU2,t),u.norImp=a,u.tanImp=o,u.binImp=h,!u.last;)u=u.next;this.lv1.copy(this.tmplv1),this.lv2.copy(this.tmplv2),this.av1.copy(this.tmpav1),this.av2.copy(this.tmpav2)},postSolve:function(){for(var n=this.cs,t,e=this.num;e--;)t=this.ps[e],t.normal.copy(n.nor),t.tangent.copy(n.tan),t.binormal.copy(n.bin),t.normalImpulse=n.norImp,t.tangentImpulse=n.tanImp,t.binormalImpulse=n.binImp,t.normalDenominator=n.norDen,t.tangentDenominator=n.tanDen,t.binormalDenominator=n.binDen,n=n.next}});function Gc(){this.shape1=null,this.shape2=null,this.body1=null,this.body2=null,this.prev=null,this.next=null,this.persisting=!1,this.sleeping=!1,this.detector=null,this.constraint=null,this.touching=!1,this.close=!1,this.dist=Tt.INF,this.b1Link=new jr(this),this.b2Link=new jr(this),this.s1Link=new jr(this),this.s2Link=new jr(this),this.manifold=new dh,this.buffer=[new Kr,new Kr,new Kr,new Kr],this.points=this.manifold.points,this.constraint=new ph(this.manifold)}Object.assign(Gc.prototype,{Contact:!0,mixRestitution:function(n,t){return Tt.sqrt(n*t)},mixFriction:function(n,t){return Tt.sqrt(n*t)},updateManifold:function(){this.constraint.restitution=this.mixRestitution(this.shape1.restitution,this.shape2.restitution),this.constraint.friction=this.mixFriction(this.shape1.friction,this.shape2.friction);for(var n=this.manifold.numPoints,t=n;t--;){var e=this.buffer[t],s=this.points[t];e.lp1X=s.localPoint1.x,e.lp1Y=s.localPoint1.y,e.lp1Z=s.localPoint1.z,e.lp2X=s.localPoint2.x,e.lp2Y=s.localPoint2.y,e.lp2Z=s.localPoint2.z,e.impulse=s.normalImpulse}this.manifold.numPoints=0,this.detector.detectCollision(this.shape1,this.shape2,this.manifold);var r=this.manifold.numPoints;if(r==0){this.touching=!1,this.close=!1,this.dist=Tt.INF;return}for((this.touching||this.dist<.001)&&(this.close=!0),this.touching=!0,t=r;t--;){s=this.points[t];for(var a=s.localPoint1.x,o=s.localPoint1.y,h=s.localPoint1.z,l=s.localPoint2.x,c=s.localPoint2.y,u=s.localPoint2.z,f=-1,d=4e-4,x=n;x--;){e=this.buffer[x];var g=e.lp1X-a,v=e.lp1Y-o,p=e.lp1Z-h,m=g*g+v*v+p*p;g=e.lp2X-l,v=e.lp2Y-c,p=e.lp2Z-u;var S=g*g+v*v+p*p;m<S?m<d&&(d=m,f=x):S<d&&(d=S,f=x),d<this.dist&&(this.dist=d)}if(f!=-1){var M=this.buffer[f];this.buffer[f]=this.buffer[--n],this.buffer[n]=M,s.normalImpulse=M.impulse,s.warmStarted=!0}else s.normalImpulse=0,s.warmStarted=!1}},attach:function(n,t){this.shape1=n,this.shape2=t,this.body1=n.parent,this.body2=t.parent,this.manifold.body1=this.body1,this.manifold.body2=this.body2,this.constraint.body1=this.body1,this.constraint.body2=this.body2,this.constraint.attach(),this.s1Link.shape=t,this.s1Link.body=this.body2,this.s2Link.shape=n,this.s2Link.body=this.body1,n.contactLink!=null?(this.s1Link.next=n.contactLink).prev=this.s1Link:this.s1Link.next=null,n.contactLink=this.s1Link,n.numContacts++,t.contactLink!=null?(this.s2Link.next=t.contactLink).prev=this.s2Link:this.s2Link.next=null,t.contactLink=this.s2Link,t.numContacts++,this.b1Link.shape=t,this.b1Link.body=this.body2,this.b2Link.shape=n,this.b2Link.body=this.body1,this.body1.contactLink!=null?(this.b1Link.next=this.body1.contactLink).prev=this.b1Link:this.b1Link.next=null,this.body1.contactLink=this.b1Link,this.body1.numContacts++,this.body2.contactLink!=null?(this.b2Link.next=this.body2.contactLink).prev=this.b2Link:this.b2Link.next=null,this.body2.contactLink=this.b2Link,this.body2.numContacts++,this.prev=null,this.next=null,this.persisting=!0,this.sleeping=this.body1.sleeping&&this.body2.sleeping,this.manifold.numPoints=0},detach:function(){var n=this.s1Link.prev,t=this.s1Link.next;n!==null&&(n.next=t),t!==null&&(t.prev=n),this.shape1.contactLink==this.s1Link&&(this.shape1.contactLink=t),this.s1Link.prev=null,this.s1Link.next=null,this.s1Link.shape=null,this.s1Link.body=null,this.shape1.numContacts--,n=this.s2Link.prev,t=this.s2Link.next,n!==null&&(n.next=t),t!==null&&(t.prev=n),this.shape2.contactLink==this.s2Link&&(this.shape2.contactLink=t),this.s2Link.prev=null,this.s2Link.next=null,this.s2Link.shape=null,this.s2Link.body=null,this.shape2.numContacts--,n=this.b1Link.prev,t=this.b1Link.next,n!==null&&(n.next=t),t!==null&&(t.prev=n),this.body1.contactLink==this.b1Link&&(this.body1.contactLink=t),this.b1Link.prev=null,this.b1Link.next=null,this.b1Link.shape=null,this.b1Link.body=null,this.body1.numContacts--,n=this.b2Link.prev,t=this.b2Link.next,n!==null&&(n.next=t),t!==null&&(t.prev=n),this.body2.contactLink==this.b2Link&&(this.body2.contactLink=t),this.b2Link.prev=null,this.b2Link.next=null,this.b2Link.shape=null,this.b2Link.body=null,this.body2.numContacts--,this.manifold.body1=null,this.manifold.body2=null,this.constraint.body1=null,this.constraint.body2=null,this.constraint.detach(),this.shape1=null,this.shape2=null,this.body1=null,this.body2=null}});function Gs(n,t){this.position=n||new yt,this.orientation=t||new Ni,this.scale=1,this.invScale=1,this.mesh=null,this.id=NaN,this.name="",this.prev=null,this.next=null,this.type=Ex,this.massInfo=new Ox,this.newPosition=new yt,this.controlPos=!1,this.newOrientation=new Ni,this.newRotation=new yt,this.currentRotation=new yt,this.controlRot=!1,this.controlRotInTime=!1,this.quaternion=new Ni,this.pos=new yt,this.linearVelocity=new yt,this.angularVelocity=new yt,this.parent=null,this.contactLink=null,this.numContacts=0,this.shapes=null,this.numShapes=0,this.jointLink=null,this.numJoints=0,this.sleepPosition=new yt,this.sleepOrientation=new Ni,this.isStatic=!1,this.isDynamic=!1,this.isKinematic=!1,this.rotation=new bi,this.mass=0,this.inverseMass=0,this.inverseInertia=new bi,this.localInertia=new bi,this.inverseLocalInertia=new bi,this.tmpInertia=new bi,this.addedToIsland=!1,this.allowSleep=!0,this.sleepTime=0,this.sleeping=!1}Object.assign(Gs.prototype,{setParent:function(n){this.parent=n,this.scale=this.parent.scale,this.invScale=this.parent.invScale,this.id=this.parent.numRigidBodies,this.name||(this.name=this.id),this.updateMesh()},addShape:function(n){n.parent&&Ci("RigidBody","It is not possible that you add a shape which already has an associated body."),this.shapes!=null&&((this.shapes.prev=n).next=this.shapes),this.shapes=n,n.parent=this,this.parent&&this.parent.addShape(n),this.numShapes++},removeShape:function(n){var t=n;if(t.parent==this){var e=t.prev,s=t.next;e!=null&&(e.next=s),s!=null&&(s.prev=e),this.shapes==t&&(this.shapes=s),t.prev=null,t.next=null,t.parent=null,this.parent&&this.parent.removeShape(t),this.numShapes--}},remove:function(){this.dispose()},dispose:function(){this.parent.removeRigidBody(this)},checkContact:function(n){this.parent.checkContact(this.name,n)},setupMass:function(n,t){var e=t!==void 0?t:!0;this.type=n||dr,this.isDynamic=this.type===ha,this.isStatic=this.type===dr,this.mass=0,this.localInertia.set(0,0,0,0,0,0,0,0,0);for(var s=new bi,r=new yt,a=this.shapes;a!==null;a=a.next){a.calculateMassInfo(this.massInfo);var o=this.massInfo.mass;r.addScaledVector(a.relativePosition,o),this.mass+=o,this.rotateInertia(a.relativeRotation,this.massInfo.inertia,s),this.localInertia.add(s),this.localInertia.addOffset(o,a.relativePosition)}if(this.inverseMass=1/this.mass,r.scaleEqual(this.inverseMass),e){for(this.position.add(r),a=this.shapes;a!==null;a=a.next)a.relativePosition.subEqual(r);this.localInertia.subOffset(this.mass,r)}this.inverseLocalInertia.invert(this.localInertia),this.type===dr&&(this.inverseMass=0,this.inverseLocalInertia.set(0,0,0,0,0,0,0,0,0)),this.syncShapes(),this.awake()},awake:function(){if(!(!this.allowSleep||!this.sleeping)){this.sleeping=!1,this.sleepTime=0;for(var n=this.contactLink;n!=null;)n.body.sleepTime=0,n.body.sleeping=!1,n=n.next;for(var t=this.jointLink;t!=null;)t.body.sleepTime=0,t.body.sleeping=!1,t=t.next;for(var e=this.shapes;e!=null;e=e.next)e.updateProxy()}},sleep:function(){if(!(!this.allowSleep||this.sleeping)){this.linearVelocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.sleepPosition.copy(this.position),this.sleepOrientation.copy(this.orientation),this.sleepTime=0,this.sleeping=!0;for(var n=this.shapes;n!=null;n=n.next)n.updateProxy()}},testWakeUp:function(){(this.linearVelocity.testZero()||this.angularVelocity.testZero()||this.position.testDiff(this.sleepPosition)||this.orientation.testDiff(this.sleepOrientation))&&this.awake()},isLonely:function(){return this.numJoints==0&&this.numContacts==0},updatePosition:function(n){switch(this.type){case dr:this.linearVelocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.controlPos&&(this.position.copy(this.newPosition),this.controlPos=!1),this.controlRot&&(this.orientation.copy(this.newOrientation),this.controlRot=!1);break;case ha:this.isKinematic&&(this.linearVelocity.set(0,0,0),this.angularVelocity.set(0,0,0)),this.controlPos&&(this.linearVelocity.subVectors(this.newPosition,this.position).multiplyScalar(1/n),this.controlPos=!1),this.controlRot&&(this.angularVelocity.copy(this.getAxis()),this.orientation.copy(this.newOrientation),this.controlRot=!1),this.position.addScaledVector(this.linearVelocity,n),this.orientation.addTime(this.angularVelocity,n),this.updateMesh();break;default:Ci("RigidBody","Invalid type.")}this.syncShapes(),this.updateMesh()},getAxis:function(){return new yt(0,1,0).applyMatrix3(this.inverseLocalInertia,!0).normalize()},rotateInertia:function(n,t,e){this.tmpInertia.multiplyMatrices(n,t),e.multiplyMatrices(this.tmpInertia,n,!0)},syncShapes:function(){this.rotation.setQuat(this.orientation),this.rotateInertia(this.rotation,this.inverseLocalInertia,this.inverseInertia);for(var n=this.shapes;n!=null;n=n.next)n.position.copy(n.relativePosition).applyMatrix3(this.rotation,!0).add(this.position),n.rotation.multiplyMatrices(this.rotation,n.relativeRotation),n.updateProxy()},applyImpulse:function(n,t){this.linearVelocity.addScaledVector(t,this.inverseMass);var e=new yt().copy(n).sub(this.position).cross(t).applyMatrix3(this.inverseInertia,!0);this.angularVelocity.add(e)},setPosition:function(n){this.newPosition.copy(n).multiplyScalar(this.invScale),this.controlPos=!0,this.isKinematic||(this.isKinematic=!0)},setQuaternion:function(n){this.newOrientation.set(n.x,n.y,n.z,n.w),this.controlRot=!0,this.isKinematic||(this.isKinematic=!0)},setRotation:function(n){this.newOrientation=new Ni().setFromEuler(n.x*Tt.degtorad,n.y*Tt.degtorad,n.y*Tt.degtorad),this.controlRot=!0},resetPosition:function(n,t,e){this.linearVelocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.position.set(n,t,e).multiplyScalar(this.invScale),this.awake()},resetQuaternion:function(n){this.angularVelocity.set(0,0,0),this.orientation=new Ni(n.x,n.y,n.z,n.w),this.awake()},resetRotation:function(n,t,e){this.angularVelocity.set(0,0,0),this.orientation=new Ni().setFromEuler(n*Tt.degtorad,t*Tt.degtorad,e*Tt.degtorad),this.awake()},getPosition:function(){return this.pos},getQuaternion:function(){return this.quaternion},connectMesh:function(n){this.mesh=n,this.updateMesh()},updateMesh:function(){this.pos.scale(this.position,this.scale),this.quaternion.copy(this.orientation),this.mesh!==null&&(this.mesh.position.copy(this.getPosition()),this.mesh.quaternion.copy(this.getQuaternion()))}});function Bx(n,t){this.shape1=n||null,this.shape2=t||null}function Ts(){this.types=yx,this.numPairChecks=0,this.numPairs=0,this.pairs=[]}Object.assign(Ts.prototype,{BroadPhase:!0,createProxy:function(n){Ci("BroadPhase","Inheritance error.")},addProxy:function(n){Ci("BroadPhase","Inheritance error.")},removeProxy:function(n){Ci("BroadPhase","Inheritance error.")},isAvailablePair:function(n,t){var e=n.parent,s=t.parent;if(e==s||!e.isDynamic&&!s.isDynamic||(n.belongsTo&t.collidesWith)==0||(t.belongsTo&n.collidesWith)==0)return!1;var r;for(e.numJoints<s.numJoints?r=e.jointLink:r=s.jointLink;r!==null;){var a=r.joint;if(!a.allowCollision&&(a.body1==e&&a.body2==s||a.body1==s&&a.body2==e))return!1;r=r.next}return!0},detectPairs:function(){this.pairs=[],this.numPairs=0,this.numPairChecks=0,this.collectPairs()},collectPairs:function(){},addPair:function(n,t){var e=new Bx(n,t);this.pairs.push(e),this.numPairs++}});var kx=0;function Vx(){return kx++}function ws(n){this.shape=n,this.aabb=n.aabb}Object.assign(ws.prototype,{Proxy:!0,update:function(){Ci("Proxy","Inheritance error.")}});function mh(n){ws.call(this,n),this.id=Vx()}mh.prototype=Object.assign(Object.create(ws.prototype),{constructor:mh,update:function(){}});function xh(){Ts.call(this),this.types=Mx,this.proxies=[]}xh.prototype=Object.assign(Object.create(Ts.prototype),{constructor:xh,createProxy:function(n){return new mh(n)},addProxy:function(n){this.proxies.push(n)},removeProxy:function(n){var t=this.proxies.indexOf(n);t>-1&&this.proxies.splice(t,1)},collectPairs:function(){var n=0,t,e,s,r=this.proxies,a=r.length;for(this.numPairChecks=a*(a-1)>>1;n<a;)for(e=r[n++],t=n+1;t<a;)s=r[t++],!(e.aabb.intersectTest(s.aabb)||!this.isAvailablePair(e.shape,s.shape))&&this.addPair(e.shape,s.shape)}});function vs(){this.numElements=0,this.bufferSize=256,this.elements=[],this.elements.length=this.bufferSize,this.stack=new Float32Array(64)}Object.assign(vs.prototype,{SAPAxis:!0,addElements:function(n,t){if(this.numElements+2>=this.bufferSize){this.bufferSize*=2;for(var e=[],s=this.numElements;s--;)e[s]=this.elements[s]}this.elements[this.numElements++]=n,this.elements[this.numElements++]=t},removeElements:function(n,t){for(var e=-1,s=-1,r=0,a=this.numElements;r<a;r++){var o=this.elements[r];if(o==n||o==t)if(e==-1)e=r;else{s=r;break}}for(r=e+1,a=s;r<a;r++)this.elements[r-1]=this.elements[r];for(r=s+1,a=this.numElements;r<a;r++)this.elements[r-2]=this.elements[r];this.elements[--this.numElements]=null,this.elements[--this.numElements]=null},sort:function(){for(var n=0,t=1;this.numElements>>t!=0;)t++;t=t*this.numElements>>2,n=0;for(var e=!1,s=this.elements,r=1,a=this.numElements;r<a;r++){var o=s[r],h=o.value,l=s[r-1];if(l.value>h){var c=r;do{if(s[c]=l,--c==0)break;l=s[c-1]}while(l.value>h);if(s[c]=o,n+=r-c,n>t){e=!0;break}}}if(e){n=2;var u=this.stack;for(u[0]=0,u[1]=this.numElements-1;n>0;){var f=u[--n],d=u[--n],x=f-d;if(x>16){var g=d+Tt.floor(x*.5);for(o=s[g],s[g]=s[f],s[f]=o,h=o.value,r=d-1,c=f;;){var v,p;do v=s[++r];while(v.value<h);do p=s[--c];while(h<p.value&&c!=d);if(r>=c)break;s[r]=p,s[c]=v}s[f]=s[r],s[r]=o,r-d>f-r?(u[n++]=d,u[n++]=r-1,u[n++]=r+1,u[n++]=f):(u[n++]=r+1,u[n++]=f,u[n++]=d,u[n++]=r-1)}else for(r=d+1;r<=f;r++)if(o=s[r],h=o.value,l=s[r-1],l.value>h){c=r;do{if(s[c]=l,--c==0)break;l=s[c-1]}while(l.value>h);s[c]=o}}}},calculateTestCount:function(){for(var n=1,t=0,e=1,s=this.numElements;e<s;e++)this.elements[e].max?n--:(t+=n,n++);return t}});function Vs(n,t){this.proxy=n,this.pair=null,this.min1=null,this.max1=null,this.min2=null,this.max2=null,this.max=t,this.value=0}function gh(n,t){ws.call(this,t),this.belongsTo=0,this.max=[],this.min=[],this.sap=n,this.min[0]=new Vs(this,!1),this.max[0]=new Vs(this,!0),this.min[1]=new Vs(this,!1),this.max[1]=new Vs(this,!0),this.min[2]=new Vs(this,!1),this.max[2]=new Vs(this,!0),this.max[0].pair=this.min[0],this.max[1].pair=this.min[1],this.max[2].pair=this.min[2],this.min[0].min1=this.min[1],this.min[0].max1=this.max[1],this.min[0].min2=this.min[2],this.min[0].max2=this.max[2],this.min[1].min1=this.min[0],this.min[1].max1=this.max[0],this.min[1].min2=this.min[2],this.min[1].max2=this.max[2],this.min[2].min1=this.min[0],this.min[2].max1=this.max[0],this.min[2].min2=this.min[1],this.min[2].max2=this.max[1]}gh.prototype=Object.assign(Object.create(ws.prototype),{constructor:gh,isDynamic:function(){var n=this.shape.parent;return n.isDynamic&&!n.sleeping},update:function(){var n=this.aabb.elements;this.min[0].value=n[0],this.min[1].value=n[1],this.min[2].value=n[2],this.max[0].value=n[3],this.max[1].value=n[4],this.max[2].value=n[5],(this.belongsTo==1&&!this.isDynamic()||this.belongsTo==2&&this.isDynamic())&&(this.sap.removeProxy(this),this.sap.addProxy(this))}});function vh(){Ts.call(this),this.types=Sx,this.numElementsD=0,this.numElementsS=0,this.axesD=[new vs,new vs,new vs],this.axesS=[new vs,new vs,new vs],this.index1=0,this.index2=1}vh.prototype=Object.assign(Object.create(Ts.prototype),{constructor:vh,createProxy:function(n){return new gh(this,n)},addProxy:function(n){var t=n;t.isDynamic()?(this.axesD[0].addElements(t.min[0],t.max[0]),this.axesD[1].addElements(t.min[1],t.max[1]),this.axesD[2].addElements(t.min[2],t.max[2]),t.belongsTo=1,this.numElementsD+=2):(this.axesS[0].addElements(t.min[0],t.max[0]),this.axesS[1].addElements(t.min[1],t.max[1]),this.axesS[2].addElements(t.min[2],t.max[2]),t.belongsTo=2,this.numElementsS+=2)},removeProxy:function(n){var t=n;if(t.belongsTo!=0){switch(t.belongsTo){case 1:this.axesD[0].removeElements(t.min[0],t.max[0]),this.axesD[1].removeElements(t.min[1],t.max[1]),this.axesD[2].removeElements(t.min[2],t.max[2]),this.numElementsD-=2;break;case 2:this.axesS[0].removeElements(t.min[0],t.max[0]),this.axesS[1].removeElements(t.min[1],t.max[1]),this.axesS[2].removeElements(t.min[2],t.max[2]),this.numElementsS-=2;break}t.belongsTo=0}},collectPairs:function(){if(this.numElementsD!=0){var n=this.axesD[this.index1],t=this.axesD[this.index2];n.sort(),t.sort();var e=n.calculateTestCount(),s=t.calculateTestCount(),r,a;e<=s?(t=this.axesS[this.index1],t.sort(),r=n.elements,a=t.elements):(n=this.axesS[this.index2],n.sort(),r=t.elements,a=n.elements,this.index1^=this.index2,this.index2^=this.index1,this.index1^=this.index2);for(var o,h,l=0,c=0;l<this.numElementsD;){var u,f;if(c==this.numElementsS)u=r[l],f=!0,l++;else{var d=r[l],x=a[c];d.value<x.value?(u=d,f=!0,l++):(u=x,f=!1,c++)}if(u.max){var A=u.pair;if(f)if(A==o){o=o.pair;continue}else u=o;else if(A==h){h=h.pair;continue}else u=h;do{if(M=u.pair,M==A){u.pair=M.pair;break}u=M}while(u!=null)}else{for(var g=u.proxy.shape,v=u.min1.value,p=u.max1.value,m=u.min2.value,S=u.max2.value,M=o;M!=null;M=M.pair){var E=M.proxy.shape;this.numPairChecks++,!(v>M.max1.value||p<M.min1.value||m>M.max2.value||S<M.min2.value||!this.isAvailablePair(g,E))&&this.addPair(g,E)}if(f){for(M=h;M!=null;M=M.pair)E=M.proxy.shape,this.numPairChecks++,!(v>M.max1.value||p<M.min1.value||m>M.max2.value||S<M.min2.value||!this.isAvailablePair(g,E))&&this.addPair(g,E);u.pair=o,o=u}else u.pair=h,h=u}}this.index2=(this.index1|this.index2)^3}}});function Hc(){this.child1=null,this.child2=null,this.parent=null,this.proxy=null,this.height=0,this.aabb=new _a}function Wc(){this.root=null,this.freeNodes=[],this.freeNodes.length=16384,this.numFreeNodes=0,this.aabb=new _a}Object.assign(Wc.prototype,{DBVT:!0,moveLeaf:function(n){this.deleteLeaf(n),this.insertLeaf(n)},insertLeaf:function(n){if(this.root==null){this.root=n;return}for(var t=n.aabb,e=this.root,s,r;e.proxy==null;){var a=e.child1,o=e.child2,h=e.aabb,l=a.aabb,c=o.aabb;s=h.surfaceArea(),this.aabb.combine(t,h),r=this.aabb.surfaceArea();var u=r*2,f=(r-s)*2,d=f;this.aabb.combine(t,l),a.proxy!=null?d+=this.aabb.surfaceArea():d+=this.aabb.surfaceArea()-l.surfaceArea();var x=f;if(this.aabb.combine(t,c),o.proxy!=null?x+=this.aabb.surfaceArea():x+=this.aabb.surfaceArea()-c.surfaceArea(),d<x){if(u<d)break;e=a}else{if(u<x)break;e=o}}var g=e.parent,v;this.numFreeNodes>0?v=this.freeNodes[--this.numFreeNodes]:v=new Hc,v.parent=g,v.child1=n,v.child2=e,v.aabb.combine(n.aabb,e.aabb),v.height=e.height+1,e.parent=v,n.parent=v,e==this.root?this.root=v:g.child1==e?g.child1=v:g.child2=v;do v=this.balance(v),this.fix(v),v=v.parent;while(v!=null)},getBalance:function(n){return n.proxy!=null?0:n.child1.height-n.child2.height},deleteLeaf:function(n){if(n==this.root){this.root=null;return}var t=n.parent,e;if(t.child1==n?e=t.child2:e=t.child1,t==this.root){this.root=e,e.parent=null;return}var s=t.parent;e.parent=s,s.child1==t?s.child1=e:s.child2=e,this.numFreeNodes<16384&&(this.freeNodes[this.numFreeNodes++]=t);do s=this.balance(s),this.fix(s),s=s.parent;while(s!=null)},balance:function(n){var t=n.height;if(t<2)return n;var e=n.parent,s=n.child1,r=n.child2,a=s.height,o=r.height,h=a-o,l;if(h>1){var c=s.child1,u=s.child2,f=c.height,d=u.height;return f>d?(s.child2=n,n.parent=s,n.child1=u,u.parent=n,n.aabb.combine(u.aabb,r.aabb),l=d-o,n.height=d-(l&l>>31)+1,s.aabb.combine(c.aabb,n.aabb),l=f-t,s.height=f-(l&l>>31)+1):(s.child1=n,n.parent=s,n.child1=c,c.parent=n,n.aabb.combine(c.aabb,r.aabb),l=f-o,n.height=f-(l&l>>31)+1,s.aabb.combine(n.aabb,u.aabb),l=t-d,s.height=t-(l&l>>31)+1),e!=null?e.child1==n?e.child1=s:e.child2=s:this.root=s,s.parent=e,s}else if(h<-1){var x=r.child1,g=r.child2,v=x.height,p=g.height;return v>p?(r.child2=n,n.parent=r,n.child2=g,g.parent=n,n.aabb.combine(s.aabb,g.aabb),l=a-p,n.height=a-(l&l>>31)+1,r.aabb.combine(x.aabb,n.aabb),l=v-t,r.height=v-(l&l>>31)+1):(r.child1=n,n.parent=r,n.child2=x,x.parent=n,n.aabb.combine(s.aabb,x.aabb),l=a-v,n.height=a-(l&l>>31)+1,r.aabb.combine(n.aabb,g.aabb),l=t-p,r.height=t-(l&l>>31)+1),e!=null?e.child1==n?e.child1=r:e.child2=r:this.root=r,r.parent=e,r}return n},fix:function(n){var t=n.child1,e=n.child2;n.aabb.combine(t.aabb,e.aabb),n.height=t.height<e.height?e.height+1:t.height+1}});function _h(n){ws.call(this,n),this.leaf=new Hc,this.leaf.proxy=this}_h.prototype=Object.assign(Object.create(ws.prototype),{constructor:_h,update:function(){}});function yh(){Ts.call(this),this.types=bx,this.tree=new Wc,this.stack=[],this.leaves=[],this.numLeaves=0}yh.prototype=Object.assign(Object.create(Ts.prototype),{constructor:yh,createProxy:function(n){return new _h(n)},addProxy:function(n){this.tree.insertLeaf(n.leaf),this.leaves.push(n.leaf),this.numLeaves++},removeProxy:function(n){this.tree.deleteLeaf(n.leaf);var t=this.leaves.indexOf(n.leaf);t>-1&&(this.leaves.splice(t,1),this.numLeaves--)},collectPairs:function(){if(!(this.numLeaves<2))for(var n,t=.1,e=this.numLeaves;e--;)n=this.leaves[e],n.proxy.aabb.intersectTestTwo(n.aabb)&&(n.aabb.copy(n.proxy.aabb,t),this.tree.deleteLeaf(n),this.tree.insertLeaf(n),this.collide(n,this.tree.root))},collide:function(n,t){var e=2,s,r,a,o,h,l;for(this.stack[0]=n,this.stack[1]=t;e>0;)if(a=this.stack[--e],o=this.stack[--e],h=a.proxy!=null,l=o.proxy!=null,this.numPairChecks++,h&&l){if(s=a.proxy.shape,r=o.proxy.shape,s==r||s.aabb.intersectTest(r.aabb)||!this.isAvailablePair(s,r))continue;this.addPair(s,r)}else{if(a.aabb.intersectTest(o.aabb))continue;l||!h&&a.aabb.surfaceArea()>o.aabb.surfaceArea()?(this.stack[e++]=a.child1,this.stack[e++]=o,this.stack[e++]=a.child2,this.stack[e++]=o):(this.stack[e++]=a,this.stack[e++]=o.child1,this.stack[e++]=a,this.stack[e++]=o.child2)}}});function Ii(){this.flip=!1}Object.assign(Ii.prototype,{CollisionDetector:!0,detectCollision:function(n,t,e){Ci("CollisionDetector","Inheritance error.")}});function Mh(){Ii.call(this),this.clipVertices1=new Float32Array(24),this.clipVertices2=new Float32Array(24),this.used=new Float32Array(8),this.INF=1/0}Mh.prototype=Object.assign(Object.create(Ii.prototype),{constructor:Mh,detectCollision:function(n,t,e){var s,r;n.id<t.id?(s=n,r=t):(s=t,r=n);var a=s.elements,o=r.elements,h=s.dimentions,l=r.dimentions,c=s.position,u=r.position,f=c.x,d=c.y,x=c.z,g=u.x,v=u.y,p=u.z,m=g-f,S=v-d,M=p-x,E=s.halfWidth,A=s.halfHeight,R=s.halfDepth,C=r.halfWidth,y=r.halfHeight,b=r.halfDepth,D=h[0],w=h[1],N=h[2],I=h[3],L=h[4],k=h[5],G=h[6],U=h[7],K=h[8],at=h[9],Y=h[10],ut=h[11],Q=h[12],mt=h[13],Vt=h[14],Yt=h[15],nt=h[16],$=h[17],O=l[0],X=l[1],H=l[2],tt=l[3],xt=l[4],Ut=l[5],Lt=l[6],zt=l[7],It=l[8],Jt=l[9],z=l[10],kt=l[11],_t=l[12],Ct=l[13],pt=l[14],P=l[15],_=l[16],B=l[17],st=w*H-N*X,ft=N*O-D*H,ht=D*X-w*O,gt=w*Ut-N*xt,lt=N*tt-D*Ut,St=D*xt-w*tt,Gt=w*It-N*zt,Mt=N*Lt-D*It,At=D*zt-w*Lt,Nt=L*H-k*X,bt=k*O-I*H,vt=I*X-L*O,Pt=L*Ut-k*xt,F=k*tt-I*Ut,Rt=I*xt-L*tt,dt=L*It-k*zt,ot=k*Lt-I*It,q=I*zt-L*Lt,W=U*H-K*X,Et=K*O-G*H,Xt=G*X-U*O,Zt=U*Ut-K*xt,te=K*tt-G*Ut,_e=G*xt-U*tt,He=U*It-K*zt,di=K*Lt-G*It,ui=G*zt-U*Lt,Xi,Ie,Le,Te,ee,Ze,We,Be,le,ce,Xe,ue,xi,gi,vi,_i,pi,mi,T,V,rt,J,Z,Ft,Bt,Ot,Ht,qt,Qt,re,jt=!1,Se=!1,Dt=!1,Je=!1,Oe=!1,Si=!1,Kt=!1,Li=!1,Re=!1,ct,ye,Ae,et,j,fe;if(ct=D*m+w*S+N*M,Xi=ct>0,Xi||(ct=-ct),ye=E,et=D*O+w*X+N*H,j=D*tt+w*xt+N*Ut,fe=D*Lt+w*zt+N*It,et<0&&(et=-et),j<0&&(j=-j),fe<0&&(fe=-fe),Ae=et*C+j*y+fe*b,_i=ct-ye-Ae,!(_i>0)&&(ct=I*m+L*S+k*M,Ie=ct>0,Ie||(ct=-ct),ye=A,et=I*O+L*X+k*H,j=I*tt+L*xt+k*Ut,fe=I*Lt+L*zt+k*It,et<0&&(et=-et),j<0&&(j=-j),fe<0&&(fe=-fe),Ae=et*C+j*y+fe*b,pi=ct-ye-Ae,!(pi>0)&&(ct=G*m+U*S+K*M,Le=ct>0,Le||(ct=-ct),ye=R,et=G*O+U*X+K*H,j=G*tt+U*xt+K*Ut,fe=G*Lt+U*zt+K*It,et<0&&(et=-et),j<0&&(j=-j),fe<0&&(fe=-fe),Ae=et*C+j*y+fe*b,mi=ct-ye-Ae,!(mi>0)&&(ct=O*m+X*S+H*M,Te=ct>0,Te||(ct=-ct),et=O*D+X*w+H*N,j=O*I+X*L+H*k,fe=O*G+X*U+H*K,et<0&&(et=-et),j<0&&(j=-j),fe<0&&(fe=-fe),ye=et*E+j*A+fe*R,Ae=C,T=(ct-ye-Ae)*1,!(T>0)&&(ct=tt*m+xt*S+Ut*M,ee=ct>0,ee||(ct=-ct),et=tt*D+xt*w+Ut*N,j=tt*I+xt*L+Ut*k,fe=tt*G+xt*U+Ut*K,et<0&&(et=-et),j<0&&(j=-j),fe<0&&(fe=-fe),ye=et*E+j*A+fe*R,Ae=y,V=(ct-ye-Ae)*1,!(V>0)&&(ct=Lt*m+zt*S+It*M,Ze=ct>0,Ze||(ct=-ct),et=Lt*D+zt*w+It*N,j=Lt*I+zt*L+It*k,fe=Lt*G+zt*U+It*K,et<0&&(et=-et),j<0&&(j=-j),fe<0&&(fe=-fe),ye=et*E+j*A+fe*R,Ae=b,rt=(ct-ye-Ae)*1,!(rt>0))))))){if(ct=st*st+ft*ft+ht*ht,ct>1e-5){if(ct=1/Tt.sqrt(ct),st*=ct,ft*=ct,ht*=ct,ct=st*m+ft*S+ht*M,We=ct>0,We||(ct=-ct),et=st*I+ft*L+ht*k,j=st*G+ft*U+ht*K,et<0&&(et=-et),j<0&&(j=-j),ye=et*A+j*R,et=st*tt+ft*xt+ht*Ut,j=st*Lt+ft*zt+ht*It,et<0&&(et=-et),j<0&&(j=-j),Ae=et*y+j*b,J=ct-ye-Ae,J>0)return}else We=!1,J=0,jt=!0;if(ct=gt*gt+lt*lt+St*St,ct>1e-5){if(ct=1/Tt.sqrt(ct),gt*=ct,lt*=ct,St*=ct,ct=gt*m+lt*S+St*M,Be=ct>0,Be||(ct=-ct),et=gt*I+lt*L+St*k,j=gt*G+lt*U+St*K,et<0&&(et=-et),j<0&&(j=-j),ye=et*A+j*R,et=gt*O+lt*X+St*H,j=gt*Lt+lt*zt+St*It,et<0&&(et=-et),j<0&&(j=-j),Ae=et*C+j*b,Z=ct-ye-Ae,Z>0)return}else Be=!1,Z=0,Se=!0;if(ct=Gt*Gt+Mt*Mt+At*At,ct>1e-5){if(ct=1/Tt.sqrt(ct),Gt*=ct,Mt*=ct,At*=ct,ct=Gt*m+Mt*S+At*M,le=ct>0,le||(ct=-ct),et=Gt*I+Mt*L+At*k,j=Gt*G+Mt*U+At*K,et<0&&(et=-et),j<0&&(j=-j),ye=et*A+j*R,et=Gt*O+Mt*X+At*H,j=Gt*tt+Mt*xt+At*Ut,et<0&&(et=-et),j<0&&(j=-j),Ae=et*C+j*y,Ft=ct-ye-Ae,Ft>0)return}else le=!1,Ft=0,Dt=!0;if(ct=Nt*Nt+bt*bt+vt*vt,ct>1e-5){if(ct=1/Tt.sqrt(ct),Nt*=ct,bt*=ct,vt*=ct,ct=Nt*m+bt*S+vt*M,ce=ct>0,ce||(ct=-ct),et=Nt*D+bt*w+vt*N,j=Nt*G+bt*U+vt*K,et<0&&(et=-et),j<0&&(j=-j),ye=et*E+j*R,et=Nt*tt+bt*xt+vt*Ut,j=Nt*Lt+bt*zt+vt*It,et<0&&(et=-et),j<0&&(j=-j),Ae=et*y+j*b,Bt=ct-ye-Ae,Bt>0)return}else ce=!1,Bt=0,Je=!0;if(ct=Pt*Pt+F*F+Rt*Rt,ct>1e-5){if(ct=1/Tt.sqrt(ct),Pt*=ct,F*=ct,Rt*=ct,ct=Pt*m+F*S+Rt*M,Xe=ct>0,Xe||(ct=-ct),et=Pt*D+F*w+Rt*N,j=Pt*G+F*U+Rt*K,et<0&&(et=-et),j<0&&(j=-j),ye=et*E+j*R,et=Pt*O+F*X+Rt*H,j=Pt*Lt+F*zt+Rt*It,et<0&&(et=-et),j<0&&(j=-j),Ae=et*C+j*b,Ot=ct-ye-Ae,Ot>0)return}else Xe=!1,Ot=0,Oe=!0;if(ct=dt*dt+ot*ot+q*q,ct>1e-5){if(ct=1/Tt.sqrt(ct),dt*=ct,ot*=ct,q*=ct,ct=dt*m+ot*S+q*M,ue=ct>0,ue||(ct=-ct),et=dt*D+ot*w+q*N,j=dt*G+ot*U+q*K,et<0&&(et=-et),j<0&&(j=-j),ye=et*E+j*R,et=dt*O+ot*X+q*H,j=dt*tt+ot*xt+q*Ut,et<0&&(et=-et),j<0&&(j=-j),Ae=et*C+j*y,Ht=ct-ye-Ae,Ht>0)return}else ue=!1,Ht=0,Si=!0;if(ct=W*W+Et*Et+Xt*Xt,ct>1e-5){if(ct=1/Tt.sqrt(ct),W*=ct,Et*=ct,Xt*=ct,ct=W*m+Et*S+Xt*M,xi=ct>0,xi||(ct=-ct),et=W*D+Et*w+Xt*N,j=W*I+Et*L+Xt*k,et<0&&(et=-et),j<0&&(j=-j),ye=et*E+j*A,et=W*tt+Et*xt+Xt*Ut,j=W*Lt+Et*zt+Xt*It,et<0&&(et=-et),j<0&&(j=-j),Ae=et*y+j*b,qt=ct-ye-Ae,qt>0)return}else xi=!1,qt=0,Kt=!0;if(ct=Zt*Zt+te*te+_e*_e,ct>1e-5){if(ct=1/Tt.sqrt(ct),Zt*=ct,te*=ct,_e*=ct,ct=Zt*m+te*S+_e*M,gi=ct>0,gi||(ct=-ct),et=Zt*D+te*w+_e*N,j=Zt*I+te*L+_e*k,et<0&&(et=-et),j<0&&(j=-j),ye=et*E+j*A,et=Zt*O+te*X+_e*H,j=Zt*Lt+te*zt+_e*It,et<0&&(et=-et),j<0&&(j=-j),Ae=et*C+j*b,Qt=ct-ye-Ae,Qt>0)return}else gi=!1,Qt=0,Li=!0;if(ct=He*He+di*di+ui*ui,ct>1e-5){if(ct=1/Tt.sqrt(ct),He*=ct,di*=ct,ui*=ct,ct=He*m+di*S+ui*M,vi=ct>0,vi||(ct=-ct),et=He*D+di*w+ui*N,j=He*I+di*L+ui*k,et<0&&(et=-et),j<0&&(j=-j),ye=et*E+j*A,et=He*O+di*X+ui*H,j=He*tt+di*xt+ui*Ut,et<0&&(et=-et),j<0&&(j=-j),Ae=et*C+j*y,re=ct-ye-Ae,re>0)return}else vi=!1,re=0,Re=!0;var $e=_i,de=_i,we=0,qe=Xi;pi>de&&($e=pi,de=pi,we=1,qe=Ie),mi>de&&($e=mi,de=mi,we=2,qe=Le),T>de&&($e=T,de=T,we=3,qe=Te),V>de&&($e=V,de=V,we=4,qe=ee),rt>de&&($e=rt,de=rt,we=5,qe=Ze),J-.01>de&&!jt&&($e=J,de=J-.01,we=6,qe=We),Z-.01>de&&!Se&&($e=Z,de=Z-.01,we=7,qe=Be),Ft-.01>de&&!Dt&&($e=Ft,de=Ft-.01,we=8,qe=le),Bt-.01>de&&!Je&&($e=Bt,de=Bt-.01,we=9,qe=ce),Ot-.01>de&&!Oe&&($e=Ot,de=Ot-.01,we=10,qe=Xe),Ht-.01>de&&!Si&&($e=Ht,de=Ht-.01,we=11,qe=ue),qt-.01>de&&!Kt&&($e=qt,de=qt-.01,we=12,qe=xi),Qt-.01>de&&!Li&&($e=Qt,de=Qt-.01,we=13,qe=gi),re-.01>de&&!Re&&($e=re,we=14,qe=vi);var $t=0,ie=0,ne=0,ii=0,ni=0,si=0,ai=0,oi=0,hi=0,Qe=0,ti=0,ei=0,Sn=0,bn=0,En=0,Tn=0,wn=0,An=0,tr=!1;if(we==0?(qe?(Qe=f+at,ti=d+Y,ei=x+ut,$t=D,ie=w,ne=N):(Qe=f-at,ti=d-Y,ei=x-ut,$t=-D,ie=-w,ne=-N),Sn=Q,bn=mt,En=Vt,ii=-I,ni=-L,si=-k,Tn=Yt,wn=nt,An=$,ai=-G,oi=-U,hi=-K):we==1?(qe?(Qe=f+Q,ti=d+mt,ei=x+Vt,$t=I,ie=L,ne=k):(Qe=f-Q,ti=d-mt,ei=x-Vt,$t=-I,ie=-L,ne=-k),Sn=at,bn=Y,En=ut,ii=-D,ni=-w,si=-N,Tn=Yt,wn=nt,An=$,ai=-G,oi=-U,hi=-K):we==2?(qe?(Qe=f+Yt,ti=d+nt,ei=x+$,$t=G,ie=U,ne=K):(Qe=f-Yt,ti=d-nt,ei=x-$,$t=-G,ie=-U,ne=-K),Sn=at,bn=Y,En=ut,ii=-D,ni=-w,si=-N,Tn=Q,wn=mt,An=Vt,ai=-I,oi=-L,hi=-k):we==3?(tr=!0,qe?(Qe=g-Jt,ti=v-z,ei=p-kt,$t=-O,ie=-X,ne=-H):(Qe=g+Jt,ti=v+z,ei=p+kt,$t=O,ie=X,ne=H),Sn=_t,bn=Ct,En=pt,ii=-tt,ni=-xt,si=-Ut,Tn=P,wn=_,An=B,ai=-Lt,oi=-zt,hi=-It):we==4?(tr=!0,qe?(Qe=g-_t,ti=v-Ct,ei=p-pt,$t=-tt,ie=-xt,ne=-Ut):(Qe=g+_t,ti=v+Ct,ei=p+pt,$t=tt,ie=xt,ne=Ut),Sn=Jt,bn=z,En=kt,ii=-O,ni=-X,si=-H,Tn=P,wn=_,An=B,ai=-Lt,oi=-zt,hi=-It):we==5?(tr=!0,qe?(Qe=g-P,ti=v-_,ei=p-B,$t=-Lt,ie=-zt,ne=-It):(Qe=g+P,ti=v+_,ei=p+B,$t=Lt,ie=zt,ne=It),Sn=Jt,bn=z,En=kt,ii=-O,ni=-X,si=-H,Tn=_t,wn=Ct,An=pt,ai=-tt,oi=-xt,hi=-Ut):we==6?($t=st,ie=ft,ne=ht,ii=D,ni=w,si=N,ai=O,oi=X,hi=H):we==7?($t=gt,ie=lt,ne=St,ii=D,ni=w,si=N,ai=tt,oi=xt,hi=Ut):we==8?($t=Gt,ie=Mt,ne=At,ii=D,ni=w,si=N,ai=Lt,oi=zt,hi=It):we==9?($t=Nt,ie=bt,ne=vt,ii=I,ni=L,si=k,ai=O,oi=X,hi=H):we==10?($t=Pt,ie=F,ne=Rt,ii=I,ni=L,si=k,ai=tt,oi=xt,hi=Ut):we==11?($t=dt,ie=ot,ne=q,ii=I,ni=L,si=k,ai=Lt,oi=zt,hi=It):we==12?($t=W,ie=Et,ne=Xt,ii=G,ni=U,si=K,ai=O,oi=X,hi=H):we==13?($t=Zt,ie=te,ne=_e,ii=G,ni=U,si=K,ai=tt,oi=xt,hi=Ut):we==14&&($t=He,ie=di,ne=ui,ii=G,ni=U,si=K,ai=Lt,oi=zt,hi=It),we>5){qe||($t=-$t,ie=-ie,ne=-ne);var ve,ke,pe,me,xe,un,fn,dn,Rn,Cn,Pn;un=a[0],fn=a[1],dn=a[2],ke=$t*un+ie*fn+ne*dn,pe=a[3],me=a[4],xe=a[5],ve=$t*pe+ie*me+ne*xe,ve>ke&&(ke=ve,un=pe,fn=me,dn=xe),pe=a[6],me=a[7],xe=a[8],ve=$t*pe+ie*me+ne*xe,ve>ke&&(ke=ve,un=pe,fn=me,dn=xe),pe=a[9],me=a[10],xe=a[11],ve=$t*pe+ie*me+ne*xe,ve>ke&&(ke=ve,un=pe,fn=me,dn=xe),pe=a[12],me=a[13],xe=a[14],ve=$t*pe+ie*me+ne*xe,ve>ke&&(ke=ve,un=pe,fn=me,dn=xe),pe=a[15],me=a[16],xe=a[17],ve=$t*pe+ie*me+ne*xe,ve>ke&&(ke=ve,un=pe,fn=me,dn=xe),pe=a[18],me=a[19],xe=a[20],ve=$t*pe+ie*me+ne*xe,ve>ke&&(ke=ve,un=pe,fn=me,dn=xe),pe=a[21],me=a[22],xe=a[23],ve=$t*pe+ie*me+ne*xe,ve>ke&&(ke=ve,un=pe,fn=me,dn=xe),Rn=o[0],Cn=o[1],Pn=o[2],ke=$t*Rn+ie*Cn+ne*Pn,pe=o[3],me=o[4],xe=o[5],ve=$t*pe+ie*me+ne*xe,ve<ke&&(ke=ve,Rn=pe,Cn=me,Pn=xe),pe=o[6],me=o[7],xe=o[8],ve=$t*pe+ie*me+ne*xe,ve<ke&&(ke=ve,Rn=pe,Cn=me,Pn=xe),pe=o[9],me=o[10],xe=o[11],ve=$t*pe+ie*me+ne*xe,ve<ke&&(ke=ve,Rn=pe,Cn=me,Pn=xe),pe=o[12],me=o[13],xe=o[14],ve=$t*pe+ie*me+ne*xe,ve<ke&&(ke=ve,Rn=pe,Cn=me,Pn=xe),pe=o[15],me=o[16],xe=o[17],ve=$t*pe+ie*me+ne*xe,ve<ke&&(ke=ve,Rn=pe,Cn=me,Pn=xe),pe=o[18],me=o[19],xe=o[20],ve=$t*pe+ie*me+ne*xe,ve<ke&&(ke=ve,Rn=pe,Cn=me,Pn=xe),pe=o[21],me=o[22],xe=o[23],ve=$t*pe+ie*me+ne*xe,ve<ke&&(ke=ve,Rn=pe,Cn=me,Pn=xe),pe=Rn-un,me=Cn-fn,xe=Pn-dn,et=ii*ai+ni*oi+si*hi;var Ce=(pe*(ii-ai*et)+me*(ni-oi*et)+xe*(si-hi*et))/(1-et*et);e.addPoint(un+ii*Ce+$t*$e*.5,fn+ni*Ce+ie*$e*.5,dn+si*Ce+ne*$e*.5,$t,ie,ne,$e,!1);return}var Fi,Oi,Bi,ki,Vi,Gi,qi,Yi,ji,Ki,Zi,$i,Ve=1,se=0,ri=0;tr?(se=D*$t+w*ie+N*ne,se<Ve&&(Ve=se,ri=0),-se<Ve&&(Ve=-se,ri=1),se=I*$t+L*ie+k*ne,se<Ve&&(Ve=se,ri=2),-se<Ve&&(Ve=-se,ri=3),se=G*$t+U*ie+K*ne,se<Ve&&(Ve=se,ri=4),-se<Ve&&(Ve=-se,ri=5),ri==0?(Fi=a[0],Oi=a[1],Bi=a[2],ki=a[6],Vi=a[7],Gi=a[8],qi=a[9],Yi=a[10],ji=a[11],Ki=a[3],Zi=a[4],$i=a[5]):ri==1?(Fi=a[15],Oi=a[16],Bi=a[17],ki=a[21],Vi=a[22],Gi=a[23],qi=a[18],Yi=a[19],ji=a[20],Ki=a[12],Zi=a[13],$i=a[14]):ri==2?(Fi=a[12],Oi=a[13],Bi=a[14],ki=a[0],Vi=a[1],Gi=a[2],qi=a[3],Yi=a[4],ji=a[5],Ki=a[15],Zi=a[16],$i=a[17]):ri==3?(Fi=a[21],Oi=a[22],Bi=a[23],ki=a[9],Vi=a[10],Gi=a[11],qi=a[6],Yi=a[7],ji=a[8],Ki=a[18],Zi=a[19],$i=a[20]):ri==4?(Fi=a[12],Oi=a[13],Bi=a[14],ki=a[18],Vi=a[19],Gi=a[20],qi=a[6],Yi=a[7],ji=a[8],Ki=a[0],Zi=a[1],$i=a[2]):ri==5&&(Fi=a[3],Oi=a[4],Bi=a[5],ki=o[9],Vi=o[10],Gi=o[11],qi=a[21],Yi=a[22],ji=a[23],Ki=a[15],Zi=a[16],$i=a[17])):(se=O*$t+X*ie+H*ne,se<Ve&&(Ve=se,ri=0),-se<Ve&&(Ve=-se,ri=1),se=tt*$t+xt*ie+Ut*ne,se<Ve&&(Ve=se,ri=2),-se<Ve&&(Ve=-se,ri=3),se=Lt*$t+zt*ie+It*ne,se<Ve&&(Ve=se,ri=4),-se<Ve&&(Ve=-se,ri=5),ri==0?(Fi=o[0],Oi=o[1],Bi=o[2],ki=o[6],Vi=o[7],Gi=o[8],qi=o[9],Yi=o[10],ji=o[11],Ki=o[3],Zi=o[4],$i=o[5]):ri==1?(Fi=o[15],Oi=o[16],Bi=o[17],ki=o[21],Vi=o[22],Gi=o[23],qi=o[18],Yi=o[19],ji=o[20],Ki=o[12],Zi=o[13],$i=o[14]):ri==2?(Fi=o[12],Oi=o[13],Bi=o[14],ki=o[0],Vi=o[1],Gi=o[2],qi=o[3],Yi=o[4],ji=o[5],Ki=o[15],Zi=o[16],$i=o[17]):ri==3?(Fi=o[21],Oi=o[22],Bi=o[23],ki=o[9],Vi=o[10],Gi=o[11],qi=o[6],Yi=o[7],ji=o[8],Ki=o[18],Zi=o[19],$i=o[20]):ri==4?(Fi=o[12],Oi=o[13],Bi=o[14],ki=o[18],Vi=o[19],Gi=o[20],qi=o[6],Yi=o[7],ji=o[8],Ki=o[0],Zi=o[1],$i=o[2]):ri==5&&(Fi=o[3],Oi=o[4],Bi=o[5],ki=o[9],Vi=o[10],Gi=o[11],qi=o[21],Yi=o[22],ji=o[23],Ki=o[15],Zi=o[16],$i=o[17]));var wi,be,wt,ae,oe,he,Ye,je,Ke;this.clipVertices1[0]=Fi,this.clipVertices1[1]=Oi,this.clipVertices1[2]=Bi,this.clipVertices1[3]=ki,this.clipVertices1[4]=Vi,this.clipVertices1[5]=Gi,this.clipVertices1[6]=qi,this.clipVertices1[7]=Yi,this.clipVertices1[8]=ji,this.clipVertices1[9]=Ki,this.clipVertices1[10]=Zi,this.clipVertices1[11]=$i,be=0,ae=this.clipVertices1[9],oe=this.clipVertices1[10],he=this.clipVertices1[11],et=(ae-Qe-Sn)*ii+(oe-ti-bn)*ni+(he-ei-En)*si;for(var De=0;De<4;De++)wt=De*3,Ye=this.clipVertices1[wt],je=this.clipVertices1[wt+1],Ke=this.clipVertices1[wt+2],j=(Ye-Qe-Sn)*ii+(je-ti-bn)*ni+(Ke-ei-En)*si,et>0?j>0?(wt=be*3,be++,this.clipVertices2[wt]=Ye,this.clipVertices2[wt+1]=je,this.clipVertices2[wt+2]=Ke):(wt=be*3,be++,Ce=et/(et-j),this.clipVertices2[wt]=ae+(Ye-ae)*Ce,this.clipVertices2[wt+1]=oe+(je-oe)*Ce,this.clipVertices2[wt+2]=he+(Ke-he)*Ce):j>0&&(wt=be*3,be++,Ce=et/(et-j),this.clipVertices2[wt]=ae+(Ye-ae)*Ce,this.clipVertices2[wt+1]=oe+(je-oe)*Ce,this.clipVertices2[wt+2]=he+(Ke-he)*Ce,wt=be*3,be++,this.clipVertices2[wt]=Ye,this.clipVertices2[wt+1]=je,this.clipVertices2[wt+2]=Ke),ae=Ye,oe=je,he=Ke,et=j;if(wi=be,wi!=0){for(be=0,wt=(wi-1)*3,ae=this.clipVertices2[wt],oe=this.clipVertices2[wt+1],he=this.clipVertices2[wt+2],et=(ae-Qe-Tn)*ai+(oe-ti-wn)*oi+(he-ei-An)*hi,De=0;De<wi;De++)wt=De*3,Ye=this.clipVertices2[wt],je=this.clipVertices2[wt+1],Ke=this.clipVertices2[wt+2],j=(Ye-Qe-Tn)*ai+(je-ti-wn)*oi+(Ke-ei-An)*hi,et>0?j>0?(wt=be*3,be++,this.clipVertices1[wt]=Ye,this.clipVertices1[wt+1]=je,this.clipVertices1[wt+2]=Ke):(wt=be*3,be++,Ce=et/(et-j),this.clipVertices1[wt]=ae+(Ye-ae)*Ce,this.clipVertices1[wt+1]=oe+(je-oe)*Ce,this.clipVertices1[wt+2]=he+(Ke-he)*Ce):j>0&&(wt=be*3,be++,Ce=et/(et-j),this.clipVertices1[wt]=ae+(Ye-ae)*Ce,this.clipVertices1[wt+1]=oe+(je-oe)*Ce,this.clipVertices1[wt+2]=he+(Ke-he)*Ce,wt=be*3,be++,this.clipVertices1[wt]=Ye,this.clipVertices1[wt+1]=je,this.clipVertices1[wt+2]=Ke),ae=Ye,oe=je,he=Ke,et=j;if(wi=be,wi!=0){for(be=0,wt=(wi-1)*3,ae=this.clipVertices1[wt],oe=this.clipVertices1[wt+1],he=this.clipVertices1[wt+2],et=(ae-Qe+Sn)*-ii+(oe-ti+bn)*-ni+(he-ei+En)*-si,De=0;De<wi;De++)wt=De*3,Ye=this.clipVertices1[wt],je=this.clipVertices1[wt+1],Ke=this.clipVertices1[wt+2],j=(Ye-Qe+Sn)*-ii+(je-ti+bn)*-ni+(Ke-ei+En)*-si,et>0?j>0?(wt=be*3,be++,this.clipVertices2[wt]=Ye,this.clipVertices2[wt+1]=je,this.clipVertices2[wt+2]=Ke):(wt=be*3,be++,Ce=et/(et-j),this.clipVertices2[wt]=ae+(Ye-ae)*Ce,this.clipVertices2[wt+1]=oe+(je-oe)*Ce,this.clipVertices2[wt+2]=he+(Ke-he)*Ce):j>0&&(wt=be*3,be++,Ce=et/(et-j),this.clipVertices2[wt]=ae+(Ye-ae)*Ce,this.clipVertices2[wt+1]=oe+(je-oe)*Ce,this.clipVertices2[wt+2]=he+(Ke-he)*Ce,wt=be*3,be++,this.clipVertices2[wt]=Ye,this.clipVertices2[wt+1]=je,this.clipVertices2[wt+2]=Ke),ae=Ye,oe=je,he=Ke,et=j;if(wi=be,wi!=0){for(be=0,wt=(wi-1)*3,ae=this.clipVertices2[wt],oe=this.clipVertices2[wt+1],he=this.clipVertices2[wt+2],et=(ae-Qe+Tn)*-ai+(oe-ti+wn)*-oi+(he-ei+An)*-hi,De=0;De<wi;De++)wt=De*3,Ye=this.clipVertices2[wt],je=this.clipVertices2[wt+1],Ke=this.clipVertices2[wt+2],j=(Ye-Qe+Tn)*-ai+(je-ti+wn)*-oi+(Ke-ei+An)*-hi,et>0?j>0?(wt=be*3,be++,this.clipVertices1[wt]=Ye,this.clipVertices1[wt+1]=je,this.clipVertices1[wt+2]=Ke):(wt=be*3,be++,Ce=et/(et-j),this.clipVertices1[wt]=ae+(Ye-ae)*Ce,this.clipVertices1[wt+1]=oe+(je-oe)*Ce,this.clipVertices1[wt+2]=he+(Ke-he)*Ce):j>0&&(wt=be*3,be++,Ce=et/(et-j),this.clipVertices1[wt]=ae+(Ye-ae)*Ce,this.clipVertices1[wt+1]=oe+(je-oe)*Ce,this.clipVertices1[wt+2]=he+(Ke-he)*Ce,wt=be*3,be++,this.clipVertices1[wt]=Ye,this.clipVertices1[wt+1]=je,this.clipVertices1[wt+2]=Ke),ae=Ye,oe=je,he=Ke,et=j;if(wi=be,tr){var Kc=s;s=r,r=Kc}if(wi!=0){var er=s!=n;if(wi>4){ae=(Fi+ki+qi+Ki)*.25,oe=(Oi+Vi+Yi+Zi)*.25,he=(Bi+Gi+ji+$i)*.25,ii=Fi-ae,ni=Oi-oe,si=Bi-he,ai=ki-ae,oi=Vi-oe,hi=Gi-he;var ba=0,Hh=0,Ea=0,Wh=0,ir=-this.INF;for(Ve=this.INF,De=0;De<wi;De++)this.used[De]=!1,wt=De*3,ae=this.clipVertices1[wt],oe=this.clipVertices1[wt+1],he=this.clipVertices1[wt+2],se=ae*ii+oe*ni+he*si,se<Ve&&(Ve=se,ba=De),se>ir&&(ir=se,Ea=De);for(this.used[ba]=!0,this.used[Ea]=!0,ir=-this.INF,Ve=this.INF,De=0;De<wi;De++)this.used[De]||(wt=De*3,ae=this.clipVertices1[wt],oe=this.clipVertices1[wt+1],he=this.clipVertices1[wt+2],se=ae*ai+oe*oi+he*hi,se<Ve&&(Ve=se,Hh=De),se>ir&&(ir=se,Wh=De));wt=ba*3,ae=this.clipVertices1[wt],oe=this.clipVertices1[wt+1],he=this.clipVertices1[wt+2],se=(ae-Qe)*$t+(oe-ti)*ie+(he-ei)*ne,se<0&&e.addPoint(ae,oe,he,$t,ie,ne,se,er),wt=Hh*3,ae=this.clipVertices1[wt],oe=this.clipVertices1[wt+1],he=this.clipVertices1[wt+2],se=(ae-Qe)*$t+(oe-ti)*ie+(he-ei)*ne,se<0&&e.addPoint(ae,oe,he,$t,ie,ne,se,er),wt=Ea*3,ae=this.clipVertices1[wt],oe=this.clipVertices1[wt+1],he=this.clipVertices1[wt+2],se=(ae-Qe)*$t+(oe-ti)*ie+(he-ei)*ne,se<0&&e.addPoint(ae,oe,he,$t,ie,ne,se,er),wt=Wh*3,ae=this.clipVertices1[wt],oe=this.clipVertices1[wt+1],he=this.clipVertices1[wt+2],se=(ae-Qe)*$t+(oe-ti)*ie+(he-ei)*ne,se<0&&e.addPoint(ae,oe,he,$t,ie,ne,se,er)}else for(De=0;De<wi;De++)wt=De*3,ae=this.clipVertices1[wt],oe=this.clipVertices1[wt+1],he=this.clipVertices1[wt+2],se=(ae-Qe)*$t+(oe-ti)*ie+(he-ei)*ne,se<0&&e.addPoint(ae,oe,he,$t,ie,ne,se,er)}}}}}}});function la(n){Ii.call(this),this.flip=n}la.prototype=Object.assign(Object.create(Ii.prototype),{constructor:la,getSep:function(n,t,e,s,r){var a,o,h,l,c,u,f=new yt,d,x,g,v,p,m,S,M=n.position.x,E=n.position.y,A=n.position.z,R=t.position.x,C=t.position.y,y=t.position.z,b=R-M,D=C-E,w=y-A;b*b+D*D+w*w==0&&(D=.001);var N=-b,I=-D,L=-w;this.supportPointB(n,-N,-I,-L,f);var k=f.x,G=f.y,U=f.z;this.supportPointC(t,N,I,L,f);var K=f.x,at=f.y,Y=f.z,ut=K-k,Q=at-G,mt=Y-U;if(ut*N+Q*I+mt*L<=0)return!1;if(N=Q*w-mt*D,I=mt*b-ut*w,L=ut*D-Q*b,N*N+I*I+L*L==0)return e.set(ut-b,Q-D,mt-w).normalize(),s.set((k+K)*.5,(G+at)*.5,(U+Y)*.5),!0;this.supportPointB(n,-N,-I,-L,f);var Vt=f.x,Yt=f.y,nt=f.z;this.supportPointC(t,N,I,L,f);var $=f.x,O=f.y,X=f.z,H=$-Vt,tt=O-Yt,xt=X-nt;if(H*N+tt*I+xt*L<=0)return!1;a=ut-b,o=Q-D,h=mt-w,l=H-b,c=tt-D,u=xt-w,N=o*u-h*c,I=h*l-a*u,L=a*c-o*l,N*b+I*D+L*w>0&&(a=ut,o=Q,h=mt,ut=H,Q=tt,mt=xt,H=a,tt=o,xt=h,a=k,o=G,h=U,k=Vt,G=Yt,U=nt,Vt=a,Yt=o,nt=h,a=K,o=at,h=Y,K=$,at=O,Y=X,$=a,O=o,X=h,N=-N,I=-I,L=-L);for(var Ut=0;;){if(++Ut>100)return!1;this.supportPointB(n,-N,-I,-L,f);var Lt=f.x,zt=f.y,It=f.z;this.supportPointC(t,N,I,L,f);var Jt=f.x,z=f.y,kt=f.z,_t=Jt-Lt,Ct=z-zt,pt=kt-It;if(_t*N+Ct*I+pt*L<=0)return!1;if((Q*pt-mt*Ct)*b+(mt*_t-ut*pt)*D+(ut*Ct-Q*_t)*w<0){H=_t,tt=Ct,xt=pt,Vt=Lt,Yt=zt,nt=It,$=Jt,O=z,X=kt,a=ut-b,o=Q-D,h=mt-w,l=_t-b,c=Ct-D,u=pt-w,N=o*u-h*c,I=h*l-a*u,L=a*c-o*l;continue}if((Ct*xt-pt*tt)*b+(pt*H-_t*xt)*D+(_t*tt-Ct*H)*w<0){ut=_t,Q=Ct,mt=pt,k=Lt,G=zt,U=It,K=Jt,at=z,Y=kt,a=_t-b,o=Ct-D,h=pt-w,l=H-b,c=tt-D,u=xt-w,N=o*u-h*c,I=h*l-a*u,L=a*c-o*l;continue}for(var P=!1;;){if(a=H-ut,o=tt-Q,h=xt-mt,l=_t-ut,c=Ct-Q,u=pt-mt,N=o*u-h*c,I=h*l-a*u,L=a*c-o*l,d=1/Tt.sqrt(N*N+I*I+L*L),N*=d,I*=d,L*=d,N*ut+I*Q+L*mt>=0&&!P){var _=(Q*xt-mt*tt)*_t+(mt*H-ut*xt)*Ct+(ut*tt-Q*H)*pt,B=(Ct*xt-pt*tt)*b+(pt*H-_t*xt)*D+(_t*tt-Ct*H)*w,st=(D*mt-w*Q)*_t+(w*ut-b*mt)*Ct+(b*Q-D*ut)*pt,ft=(tt*mt-xt*Q)*b+(xt*ut-H*mt)*D+(H*Q-tt*ut)*w,ht=_+B+st+ft;ht<=0&&(_=0,B=(tt*pt-xt*Ct)*N+(xt*_t-H*pt)*I+(H*Ct-tt*_t)*L,st=(Ct*xt-pt*tt)*N+(pt*H-_t*xt)*I+(_t*tt-Ct*H)*L,ft=(Q*xt-mt*tt)*N+(mt*H-ut*xt)*I+(ut*tt-Q*H)*L,ht=B+st+ft);var gt=1/ht;x=(M*_+k*B+Vt*st+Lt*ft)*gt,g=(E*_+G*B+Yt*st+zt*ft)*gt,v=(A*_+U*B+nt*st+It*ft)*gt,p=(R*_+K*B+$*st+Jt*ft)*gt,m=(C*_+at*B+O*st+z*ft)*gt,S=(y*_+Y*B+X*st+kt*ft)*gt,P=!0}this.supportPointB(n,-N,-I,-L,f);var lt=f.x,St=f.y,Gt=f.z;this.supportPointC(t,N,I,L,f);var Mt=f.x,At=f.y,Nt=f.z,bt=Mt-lt,vt=At-St,Pt=Nt-Gt,F=-(bt*N+vt*I+Pt*L);if((bt-_t)*N+(vt-Ct)*I+(Pt-pt)*L<=.01||F>=0)return P?(e.set(-N,-I,-L),s.set((x+p)*.5,(g+m)*.5,(v+S)*.5),r.x=F,!0):!1;(vt*mt-Pt*Q)*b+(Pt*ut-bt*mt)*D+(bt*Q-vt*ut)*w<0?(vt*xt-Pt*tt)*b+(Pt*H-bt*xt)*D+(bt*tt-vt*H)*w<0?(ut=bt,Q=vt,mt=Pt,k=lt,G=St,U=Gt,K=Mt,at=At,Y=Nt):(_t=bt,Ct=vt,pt=Pt,Lt=lt,zt=St,It=Gt,Jt=Mt,z=At,kt=Nt):(vt*pt-Pt*Ct)*b+(Pt*_t-bt*pt)*D+(bt*Ct-vt*_t)*w<0?(H=bt,tt=vt,xt=Pt,Vt=lt,Yt=St,nt=Gt,$=Mt,O=At,X=Nt):(ut=bt,Q=vt,mt=Pt,k=lt,G=St,U=Gt,K=Mt,at=At,Y=Nt)}}},supportPointB:function(n,t,e,s,r){var a=n.rotation.elements,o=a[0]*t+a[3]*e+a[6]*s,h=a[1]*t+a[4]*e+a[7]*s,l=a[2]*t+a[5]*e+a[8]*s,c=n.halfWidth,u=n.halfHeight,f=n.halfDepth,d,x,g;o<0?d=-c:d=c,h<0?x=-u:x=u,l<0?g=-f:g=f,o=a[0]*d+a[1]*x+a[2]*g+n.position.x,h=a[3]*d+a[4]*x+a[5]*g+n.position.y,l=a[6]*d+a[7]*x+a[8]*g+n.position.z,r.set(o,h,l)},supportPointC:function(n,t,e,s,r){var a=n.rotation.elements,o=a[0]*t+a[3]*e+a[6]*s,h=a[1]*t+a[4]*e+a[7]*s,l=a[2]*t+a[5]*e+a[8]*s,c=o,u=l,f=c*c+u*u,d=n.radius,x=n.halfHeight,g,v,p;f==0?h<0?(g=d,v=-x,p=0):(g=d,v=x,p=0):(f=n.radius/Tt.sqrt(f),h<0?(g=c*f,v=-x,p=u*f):(g=c*f,v=x,p=u*f)),o=a[0]*g+a[1]*v+a[2]*p+n.position.x,h=a[3]*g+a[4]*v+a[5]*p+n.position.y,l=a[6]*g+a[7]*v+a[8]*p+n.position.z,r.set(o,h,l)},detectCollision:function(n,t,e){var s,r;this.flip?(s=t,r=n):(s=n,r=t);var a=new yt,o=new yt,h=new yt;if(this.getSep(s,r,a,o,h)){var l=s.position.x,c=s.position.y,u=s.position.z,f=r.position.x,d=r.position.y,x=r.position.z,g=s.halfWidth,v=s.halfHeight,p=s.halfDepth,m=r.halfHeight,S=r.radius,M=s.dimentions,E=M[0],A=M[1],R=M[2],C=M[3],y=M[4],b=M[5],D=M[6],w=M[7],N=M[8],I=M[9],L=M[10],k=M[11],G=M[12],U=M[13],K=M[14],at=M[15],Y=M[16],ut=M[17],Q=r.normalDirection.x,mt=r.normalDirection.y,Vt=r.normalDirection.z,Yt=r.halfDirection.x,nt=r.halfDirection.y,$=r.halfDirection.z,O=a.x,X=a.y,H=a.z,tt=O*E+X*A+H*R,xt=O*C+X*y+H*b,Ut=O*D+X*w+H*N,Lt=O*Q+X*mt+H*Vt,zt=tt>0,It=xt>0,Jt=Ut>0,z=Lt>0;zt||(tt=-tt),It||(xt=-xt),Jt||(Ut=-Ut),z||(Lt=-Lt);var kt=0;Lt>.999?tt>.999?tt>Lt?kt=1:kt=4:xt>.999?xt>Lt?kt=2:kt=4:Ut>.999&&Ut>Lt?kt=3:kt=4:tt>.999?kt=1:xt>.999?kt=2:Ut>.999&&(kt=3);var _t,Ct,pt,P,_,B,st,ft,ht,gt,lt,St,Gt,Mt,At,Nt,bt,vt,Pt,F,Rt,dt,ot,q,W,Et,Xt,Zt,te,_e,He,di,ui,Xi,Ie,Le,Te,ee,Ze,We,Be,le,ce,Xe,ue,xi,gi,vi,_i,pi,mi,T,V;if(kt==0)e.addPoint(o.x,o.y,o.z,O,X,H,h.x,this.flip);else if(kt==4){z?(P=f-Yt,_=d-nt,B=x-$,O=-Q,X=-mt,H=-Vt):(P=f+Yt,_=d+nt,B=x+$,O=Q,X=mt,H=Vt);var rt,J,Z,Ft,Bt,Ot,Ht,qt,Qt,re,jt,Se;F=1,kt=0,ce=E*O+A*X+R*H,ce<F&&(F=ce,kt=0),-ce<F&&(F=-ce,kt=1),ce=C*O+y*X+b*H,ce<F&&(F=ce,kt=2),-ce<F&&(F=-ce,kt=3),ce=D*O+w*X+N*H,ce<F&&(F=ce,kt=4),-ce<F&&(F=-ce,kt=5);var Dt=s.elements;switch(kt){case 0:rt=Dt[0],J=Dt[1],Z=Dt[2],Ft=Dt[6],Bt=Dt[7],Ot=Dt[8],Ht=Dt[9],qt=Dt[10],Qt=Dt[11],re=Dt[3],jt=Dt[4],Se=Dt[5];break;case 1:rt=Dt[15],J=Dt[16],Z=Dt[17],Ft=Dt[21],Bt=Dt[22],Ot=Dt[23],Ht=Dt[18],qt=Dt[19],Qt=Dt[20],re=Dt[12],jt=Dt[13],Se=Dt[14];break;case 2:rt=Dt[12],J=Dt[13],Z=Dt[14],Ft=Dt[0],Bt=Dt[1],Ot=Dt[2],Ht=Dt[3],qt=Dt[4],Qt=Dt[5],re=Dt[15],jt=Dt[16],Se=Dt[17];break;case 3:rt=Dt[21],J=Dt[22],Z=Dt[23],Ft=Dt[9],Bt=Dt[10],Ot=Dt[11],Ht=Dt[6],qt=Dt[7],Qt=Dt[8],re=Dt[18],jt=Dt[19],Se=Dt[20];break;case 4:rt=Dt[12],J=Dt[13],Z=Dt[14],Ft=Dt[18],Bt=Dt[19],Ot=Dt[20],Ht=Dt[6],qt=Dt[7],Qt=Dt[8],re=Dt[0],jt=Dt[1],Se=Dt[2];break;case 5:rt=Dt[3],J=Dt[4],Z=Dt[5],Ft=Dt[9],Bt=Dt[10],Ot=Dt[11],Ht=Dt[21],qt=Dt[22],Qt=Dt[23],re=Dt[15],jt=Dt[16],Se=Dt[17];break}Pt=O*(rt-P)+X*(J-_)+H*(Z-B),Pt<=0&&e.addPoint(rt,J,Z,-O,-X,-H,Pt,this.flip),Pt=O*(Ft-P)+X*(Bt-_)+H*(Ot-B),Pt<=0&&e.addPoint(Ft,Bt,Ot,-O,-X,-H,Pt,this.flip),Pt=O*(Ht-P)+X*(qt-_)+H*(Qt-B),Pt<=0&&e.addPoint(Ht,qt,Qt,-O,-X,-H,Pt,this.flip),Pt=O*(re-P)+X*(jt-_)+H*(Se-B),Pt<=0&&e.addPoint(re,jt,Se,-O,-X,-H,Pt,this.flip)}else{switch(kt){case 1:zt?(_t=l+I,Ct=c+L,pt=u+k,O=E,X=A,H=R):(_t=l-I,Ct=c-L,pt=u-k,O=-E,X=-A,H=-R),xi=C,gi=y,vi=b,T=v,_i=D,pi=w,mi=N,V=p;break;case 2:It?(_t=l+G,Ct=c+U,pt=u+K,O=C,X=y,H=b):(_t=l-G,Ct=c-U,pt=u-K,O=-C,X=-y,H=-b),xi=E,gi=A,vi=R,T=g,_i=D,pi=w,mi=N,V=p;break;case 3:Jt?(_t=l+at,Ct=c+Y,pt=u+ut,O=D,X=w,H=N):(_t=l-at,Ct=c-Y,pt=u-ut,O=-D,X=-w,H=-N),xi=E,gi=A,vi=R,T=g,_i=C,pi=y,mi=b,V=v;break}if(F=O*Q+X*mt+H*Vt,F<0?Rt=m:Rt=-m,P=f+Rt*Q,_=d+Rt*mt,B=x+Rt*Vt,Lt>=.999999?(dt=-X,ot=H,q=O):(dt=O,ot=X,q=H),Rt=dt*Q+ot*mt+q*Vt,Et=Rt*Q-dt,Xt=Rt*mt-ot,Zt=Rt*Vt-q,Rt=Tt.sqrt(Et*Et+Xt*Xt+Zt*Zt),Rt==0)return;if(Rt=S/Rt,Et*=Rt,Xt*=Rt,Zt*=Rt,dt=P+Et,ot=_+Xt,q=B+Zt,F<-.96||F>.96)st=Q*Q*1.5-.5,ft=Q*mt*1.5-Vt*.866025403,ht=Q*Vt*1.5+mt*.866025403,gt=mt*Q*1.5+Vt*.866025403,lt=mt*mt*1.5-.5,St=mt*Vt*1.5-Q*.866025403,Gt=Vt*Q*1.5-mt*.866025403,Mt=Vt*mt*1.5+Q*.866025403,At=Vt*Vt*1.5-.5,Nt=dt,bt=ot,vt=q,Pt=O*(Nt-_t)+X*(bt-Ct)+H*(vt-pt),dt=Nt-Pt*O-_t,ot=bt-Pt*X-Ct,q=vt-Pt*H-pt,ee=xi*dt+gi*ot+vi*q,le=_i*dt+pi*ot+mi*q,ee<-T?ee=-T:ee>T&&(ee=T),le<-V?le=-V:le>V&&(le=V),dt=ee*xi+le*_i,ot=ee*gi+le*pi,q=ee*vi+le*mi,Nt=_t+dt,bt=Ct+ot,vt=pt+q,e.addPoint(Nt,bt,vt,O,X,H,Pt,this.flip),Nt=Et*st+Xt*ft+Zt*ht,bt=Et*gt+Xt*lt+Zt*St,vt=Et*Gt+Xt*Mt+Zt*At,Nt=(Et=Nt)+P,bt=(Xt=bt)+_,vt=(Zt=vt)+B,Pt=O*(Nt-_t)+X*(bt-Ct)+H*(vt-pt),Pt<=0&&(dt=Nt-Pt*O-_t,ot=bt-Pt*X-Ct,q=vt-Pt*H-pt,ee=xi*dt+gi*ot+vi*q,le=_i*dt+pi*ot+mi*q,ee<-T?ee=-T:ee>T&&(ee=T),le<-V?le=-V:le>V&&(le=V),dt=ee*xi+le*_i,ot=ee*gi+le*pi,q=ee*vi+le*mi,Nt=_t+dt,bt=Ct+ot,vt=pt+q,e.addPoint(Nt,bt,vt,O,X,H,Pt,this.flip)),Nt=Et*st+Xt*ft+Zt*ht,bt=Et*gt+Xt*lt+Zt*St,vt=Et*Gt+Xt*Mt+Zt*At,Nt=(Et=Nt)+P,bt=(Xt=bt)+_,vt=(Zt=vt)+B,Pt=O*(Nt-_t)+X*(bt-Ct)+H*(vt-pt),Pt<=0&&(dt=Nt-Pt*O-_t,ot=bt-Pt*X-Ct,q=vt-Pt*H-pt,ee=xi*dt+gi*ot+vi*q,le=_i*dt+pi*ot+mi*q,ee<-T?ee=-T:ee>T&&(ee=T),le<-V?le=-V:le>V&&(le=V),dt=ee*xi+le*_i,ot=ee*gi+le*pi,q=ee*vi+le*mi,Nt=_t+dt,bt=Ct+ot,vt=pt+q,e.addPoint(Nt,bt,vt,O,X,H,Pt,this.flip));else{if(Ie=dt,Le=ot,Te=q,ee=O*(Ie-_t)+X*(Le-Ct)+H*(Te-pt),Ie-=ee*O,Le-=ee*X,Te-=ee*H,F>0?(Ze=dt+Yt*2,We=ot+nt*2,Be=q+$*2):(Ze=dt-Yt*2,We=ot-nt*2,Be=q-$*2),le=O*(Ze-_t)+X*(We-Ct)+H*(Be-pt),Ze-=le*O,We-=le*X,Be-=le*H,te=Ie-_t,_e=Le-Ct,He=Te-pt,di=Ze-_t,ui=We-Ct,Xi=Be-pt,dt=Ze-Ie,ot=We-Le,q=Be-Te,W=le-ee,tt=te*xi+_e*gi+He*vi,xt=di*xi+ui*gi+Xi*vi,ce=tt-T,Xe=xt-T,ce>0){if(Xe>0)return;ue=ce/(ce-Xe),Ie=Ie+dt*ue,Le=Le+ot*ue,Te=Te+q*ue,ee=ee+W*ue,te=Ie-_t,_e=Le-Ct,He=Te-pt,tt=te*xi+_e*gi+He*vi,dt=Ze-Ie,ot=We-Le,q=Be-Te,W=le-ee}else Xe>0&&(ue=ce/(ce-Xe),Ze=Ie+dt*ue,We=Le+ot*ue,Be=Te+q*ue,le=ee+W*ue,di=Ze-_t,ui=We-Ct,Xi=Be-pt,xt=di*xi+ui*gi+Xi*vi,dt=Ze-Ie,ot=We-Le,q=Be-Te,W=le-ee);if(ce=tt+T,Xe=xt+T,ce<0){if(Xe<0)return;ue=ce/(ce-Xe),Ie=Ie+dt*ue,Le=Le+ot*ue,Te=Te+q*ue,ee=ee+W*ue,te=Ie-_t,_e=Le-Ct,He=Te-pt,dt=Ze-Ie,ot=We-Le,q=Be-Te,W=le-ee}else Xe<0&&(ue=ce/(ce-Xe),Ze=Ie+dt*ue,We=Le+ot*ue,Be=Te+q*ue,le=ee+W*ue,di=Ze-_t,ui=We-Ct,Xi=Be-pt,dt=Ze-Ie,ot=We-Le,q=Be-Te,W=le-ee);if(tt=te*_i+_e*pi+He*mi,xt=di*_i+ui*pi+Xi*mi,ce=tt-V,Xe=xt-V,ce>0){if(Xe>0)return;ue=ce/(ce-Xe),Ie=Ie+dt*ue,Le=Le+ot*ue,Te=Te+q*ue,ee=ee+W*ue,te=Ie-_t,_e=Le-Ct,He=Te-pt,tt=te*_i+_e*pi+He*mi,dt=Ze-Ie,ot=We-Le,q=Be-Te,W=le-ee}else Xe>0&&(ue=ce/(ce-Xe),Ze=Ie+dt*ue,We=Le+ot*ue,Be=Te+q*ue,le=ee+W*ue,di=Ze-_t,ui=We-Ct,Xi=Be-pt,xt=di*_i+ui*pi+Xi*mi,dt=Ze-Ie,ot=We-Le,q=Be-Te,W=le-ee);if(ce=tt+V,Xe=xt+V,ce<0){if(Xe<0)return;ue=ce/(ce-Xe),Ie=Ie+dt*ue,Le=Le+ot*ue,Te=Te+q*ue,ee=ee+W*ue}else Xe<0&&(ue=ce/(ce-Xe),Ze=Ie+dt*ue,We=Le+ot*ue,Be=Te+q*ue,le=ee+W*ue);ee<0&&e.addPoint(Ie,Le,Te,O,X,H,ee,this.flip),le<0&&e.addPoint(Ze,We,Be,O,X,H,le,this.flip)}}}}});function Sh(){Ii.call(this)}Sh.prototype=Object.assign(Object.create(Ii.prototype),{constructor:Sh,getSep:function(n,t,e,s,r){var a,o,h,l,c,u,f=new yt,d,x,g,v,p,m,S,M=n.position.x,E=n.position.y,A=n.position.z,R=t.position.x,C=t.position.y,y=t.position.z,b=R-M,D=C-E,w=y-A;b*b+D*D+w*w==0&&(D=.001);var N=-b,I=-D,L=-w;this.supportPoint(n,-N,-I,-L,f);var k=f.x,G=f.y,U=f.z;this.supportPoint(t,N,I,L,f);var K=f.x,at=f.y,Y=f.z,ut=K-k,Q=at-G,mt=Y-U;if(ut*N+Q*I+mt*L<=0)return!1;if(N=Q*w-mt*D,I=mt*b-ut*w,L=ut*D-Q*b,N*N+I*I+L*L==0)return e.set(ut-b,Q-D,mt-w).normalize(),s.set((k+K)*.5,(G+at)*.5,(U+Y)*.5),!0;this.supportPoint(n,-N,-I,-L,f);var Vt=f.x,Yt=f.y,nt=f.z;this.supportPoint(t,N,I,L,f);var $=f.x,O=f.y,X=f.z,H=$-Vt,tt=O-Yt,xt=X-nt;if(H*N+tt*I+xt*L<=0)return!1;a=ut-b,o=Q-D,h=mt-w,l=H-b,c=tt-D,u=xt-w,N=o*u-h*c,I=h*l-a*u,L=a*c-o*l,N*b+I*D+L*w>0&&(a=ut,o=Q,h=mt,ut=H,Q=tt,mt=xt,H=a,tt=o,xt=h,a=k,o=G,h=U,k=Vt,G=Yt,U=nt,Vt=a,Yt=o,nt=h,a=K,o=at,h=Y,K=$,at=O,Y=X,$=a,O=o,X=h,N=-N,I=-I,L=-L);for(var Ut=0;;){if(++Ut>100)return!1;this.supportPoint(n,-N,-I,-L,f);var Lt=f.x,zt=f.y,It=f.z;this.supportPoint(t,N,I,L,f);var Jt=f.x,z=f.y,kt=f.z,_t=Jt-Lt,Ct=z-zt,pt=kt-It;if(_t*N+Ct*I+pt*L<=0)return!1;if((Q*pt-mt*Ct)*b+(mt*_t-ut*pt)*D+(ut*Ct-Q*_t)*w<0){H=_t,tt=Ct,xt=pt,Vt=Lt,Yt=zt,nt=It,$=Jt,O=z,X=kt,a=ut-b,o=Q-D,h=mt-w,l=_t-b,c=Ct-D,u=pt-w,N=o*u-h*c,I=h*l-a*u,L=a*c-o*l;continue}if((Ct*xt-pt*tt)*b+(pt*H-_t*xt)*D+(_t*tt-Ct*H)*w<0){ut=_t,Q=Ct,mt=pt,k=Lt,G=zt,U=It,K=Jt,at=z,Y=kt,a=_t-b,o=Ct-D,h=pt-w,l=H-b,c=tt-D,u=xt-w,N=o*u-h*c,I=h*l-a*u,L=a*c-o*l;continue}for(var P=!1;;){if(a=H-ut,o=tt-Q,h=xt-mt,l=_t-ut,c=Ct-Q,u=pt-mt,N=o*u-h*c,I=h*l-a*u,L=a*c-o*l,d=1/Tt.sqrt(N*N+I*I+L*L),N*=d,I*=d,L*=d,N*ut+I*Q+L*mt>=0&&!P){var _=(Q*xt-mt*tt)*_t+(mt*H-ut*xt)*Ct+(ut*tt-Q*H)*pt,B=(Ct*xt-pt*tt)*b+(pt*H-_t*xt)*D+(_t*tt-Ct*H)*w,st=(D*mt-w*Q)*_t+(w*ut-b*mt)*Ct+(b*Q-D*ut)*pt,ft=(tt*mt-xt*Q)*b+(xt*ut-H*mt)*D+(H*Q-tt*ut)*w,ht=_+B+st+ft;ht<=0&&(_=0,B=(tt*pt-xt*Ct)*N+(xt*_t-H*pt)*I+(H*Ct-tt*_t)*L,st=(Ct*xt-pt*tt)*N+(pt*H-_t*xt)*I+(_t*tt-Ct*H)*L,ft=(Q*xt-mt*tt)*N+(mt*H-ut*xt)*I+(ut*tt-Q*H)*L,ht=B+st+ft);var gt=1/ht;x=(M*_+k*B+Vt*st+Lt*ft)*gt,g=(E*_+G*B+Yt*st+zt*ft)*gt,v=(A*_+U*B+nt*st+It*ft)*gt,p=(R*_+K*B+$*st+Jt*ft)*gt,m=(C*_+at*B+O*st+z*ft)*gt,S=(y*_+Y*B+X*st+kt*ft)*gt,P=!0}this.supportPoint(n,-N,-I,-L,f);var lt=f.x,St=f.y,Gt=f.z;this.supportPoint(t,N,I,L,f);var Mt=f.x,At=f.y,Nt=f.z,bt=Mt-lt,vt=At-St,Pt=Nt-Gt,F=-(bt*N+vt*I+Pt*L);if((bt-_t)*N+(vt-Ct)*I+(Pt-pt)*L<=.01||F>=0)return P?(e.set(-N,-I,-L),s.set((x+p)*.5,(g+m)*.5,(v+S)*.5),r.x=F,!0):!1;(vt*mt-Pt*Q)*b+(Pt*ut-bt*mt)*D+(bt*Q-vt*ut)*w<0?(vt*xt-Pt*tt)*b+(Pt*H-bt*xt)*D+(bt*tt-vt*H)*w<0?(ut=bt,Q=vt,mt=Pt,k=lt,G=St,U=Gt,K=Mt,at=At,Y=Nt):(_t=bt,Ct=vt,pt=Pt,Lt=lt,zt=St,It=Gt,Jt=Mt,z=At,kt=Nt):(vt*pt-Pt*Ct)*b+(Pt*_t-bt*pt)*D+(bt*Ct-vt*_t)*w<0?(H=bt,tt=vt,xt=Pt,Vt=lt,Yt=St,nt=Gt,$=Mt,O=At,X=Nt):(ut=bt,Q=vt,mt=Pt,k=lt,G=St,U=Gt,K=Mt,at=At,Y=Nt)}}},supportPoint:function(n,t,e,s,r){var a=n.rotation.elements,o=a[0]*t+a[3]*e+a[6]*s,h=a[1]*t+a[4]*e+a[7]*s,l=a[2]*t+a[5]*e+a[8]*s,c=o,u=l,f=c*c+u*u,d=n.radius,x=n.halfHeight,g,v,p;f==0?h<0?(g=d,v=-x,p=0):(g=d,v=x,p=0):(f=n.radius/Tt.sqrt(f),h<0?(g=c*f,v=-x,p=u*f):(g=c*f,v=x,p=u*f)),o=a[0]*g+a[1]*v+a[2]*p+n.position.x,h=a[3]*g+a[4]*v+a[5]*p+n.position.y,l=a[6]*g+a[7]*v+a[8]*p+n.position.z,r.set(o,h,l)},detectCollision:function(n,t,e){var s,r;n.id<t.id?(s=n,r=t):(s=t,r=n);var a=s.position,o=r.position,h=a.x,l=a.y,c=a.z,u=o.x,f=o.y,d=o.z,x=s.halfHeight,g=r.halfHeight,v=s.normalDirection,p=r.normalDirection,m=s.halfDirection,S=r.halfDirection,M=s.radius,E=r.radius,A=v.x,R=v.y,C=v.z,y=p.x,b=p.y,D=p.z,w=m.x,N=m.y,I=m.z,L=S.x,k=S.y,G=S.z,U=h-u,K=l-f,at=c-d,Y,ut,Q,mt,Vt,Yt,nt,$,O,X,H,tt,xt,Ut,Lt,zt,It,Jt,z,kt,_t,Ct=new yt,pt=new yt,P=new yt;if(this.getSep(s,r,Ct,pt,P)){var _=Ct.x*A+Ct.y*R+Ct.z*C,B=Ct.x*y+Ct.y*b+Ct.z*D,st=_>0,ft=B>0;st||(_=-_),ft||(B=-B);var ht=0;(_>.999||B>.999)&&(_>B?ht=1:ht=2);var gt,lt,St,Gt=P.x,Mt,At,Nt,bt,vt,Pt,F,Rt,dt,ot,q,W,Et,Xt,Zt,te,_e;switch(gt=Ct.x,lt=Ct.y,St=Ct.z,ht){case 0:e.addPoint(pt.x,pt.y,pt.z,gt,lt,St,Gt,!1);break;case 1:if(st?(ut=h+w,Q=l+N,mt=c+I,gt=A,lt=R,St=C):(ut=h-w,Q=l-N,mt=c-I,gt=-A,lt=-R,St=-C),z=gt*y+lt*b+St*D,z<0?Y=g:Y=-g,Vt=u+Y*y,Yt=f+Y*b,nt=d+Y*D,B>=.999999?($=-lt,O=St,X=gt):($=gt,O=lt,X=St),Y=$*y+O*b+X*D,U=Y*y-$,K=Y*b-O,at=Y*D-X,Y=Tt.sqrt(U*U+K*K+at*at),Y==0)break;if(Y=E/Y,U*=Y,K*=Y,at*=Y,$=Vt+U,O=Yt+K,X=nt+at,z<-.96||z>.96)Mt=y*y*1.5-.5,At=y*b*1.5-D*.866025403,Nt=y*D*1.5+b*.866025403,bt=b*y*1.5+D*.866025403,vt=b*b*1.5-.5,Pt=b*D*1.5-y*.866025403,F=D*y*1.5-b*.866025403,Rt=D*b*1.5+y*.866025403,dt=D*D*1.5-.5,ot=$,q=O,W=X,Et=gt*(ot-ut)+lt*(q-Q)+St*(W-mt),$=ot-Et*gt-ut,O=q-Et*lt-Q,X=W-Et*St-mt,Y=$*$+O*O+X*X,Y>M*M&&(Y=M/Tt.sqrt(Y),$*=Y,O*=Y,X*=Y),ot=ut+$,q=Q+O,W=mt+X,e.addPoint(ot,q,W,gt,lt,St,Et,!1),ot=U*Mt+K*At+at*Nt,q=U*bt+K*vt+at*Pt,W=U*F+K*Rt+at*dt,ot=(U=ot)+Vt,q=(K=q)+Yt,W=(at=W)+nt,Et=gt*(ot-ut)+lt*(q-Q)+St*(W-mt),Et<=0&&($=ot-Et*gt-ut,O=q-Et*lt-Q,X=W-Et*St-mt,Y=$*$+O*O+X*X,Y>M*M&&(Y=M/Tt.sqrt(Y),$*=Y,O*=Y,X*=Y),ot=ut+$,q=Q+O,W=mt+X,e.addPoint(ot,q,W,gt,lt,St,Et,!1)),ot=U*Mt+K*At+at*Nt,q=U*bt+K*vt+at*Pt,W=U*F+K*Rt+at*dt,ot=(U=ot)+Vt,q=(K=q)+Yt,W=(at=W)+nt,Et=gt*(ot-ut)+lt*(q-Q)+St*(W-mt),Et<=0&&($=ot-Et*gt-ut,O=q-Et*lt-Q,X=W-Et*St-mt,Y=$*$+O*O+X*X,Y>M*M&&(Y=M/Tt.sqrt(Y),$*=Y,O*=Y,X*=Y),ot=ut+$,q=Q+O,W=mt+X,e.addPoint(ot,q,W,gt,lt,St,Et,!1));else{if(H=$,tt=O,xt=X,It=gt*(H-ut)+lt*(tt-Q)+St*(xt-mt),H-=It*gt,tt-=It*lt,xt-=It*St,z>0?(Ut=$+y*g*2,Lt=O+b*g*2,zt=X+D*g*2):(Ut=$-y*g*2,Lt=O-b*g*2,zt=X-D*g*2),Jt=gt*(Ut-ut)+lt*(Lt-Q)+St*(zt-mt),Ut-=Jt*gt,Lt-=Jt*lt,zt-=Jt*St,U=ut-H,K=Q-tt,at=mt-xt,$=Ut-H,O=Lt-tt,X=zt-xt,Xt=U*U+K*K+at*at,Zt=U*$+K*O+at*X,te=$*$+O*O+X*X,_e=Zt*Zt-te*(Xt-M*M),_e<0)break;_e=Tt.sqrt(_e),kt=(Zt+_e)/te,_t=(Zt-_e)/te,_t<kt&&(Y=kt,kt=_t,_t=Y),_t>1&&(_t=1),kt<0&&(kt=0),$=H+(Ut-H)*kt,O=tt+(Lt-tt)*kt,X=xt+(zt-xt)*kt,Ut=H+(Ut-H)*_t,Lt=tt+(Lt-tt)*_t,zt=xt+(zt-xt)*_t,H=$,tt=O,xt=X,Y=It+(Jt-It)*kt,Jt=It+(Jt-It)*_t,It=Y,It<0&&e.addPoint(H,tt,xt,gt,lt,St,Et,!1),Jt<0&&e.addPoint(Ut,Lt,zt,gt,lt,St,Et,!1)}break;case 2:if(ft?(Vt=u-L,Yt=f-k,nt=d-G,gt=-y,lt=-b,St=-D):(Vt=u+L,Yt=f+k,nt=d+G,gt=y,lt=b,St=D),z=gt*A+lt*R+St*C,z<0?Y=x:Y=-x,ut=h+Y*A,Q=l+Y*R,mt=c+Y*C,_>=.999999?($=-lt,O=St,X=gt):($=gt,O=lt,X=St),Y=$*A+O*R+X*C,U=Y*A-$,K=Y*R-O,at=Y*C-X,Y=Tt.sqrt(U*U+K*K+at*at),Y==0)break;if(Y=M/Y,U*=Y,K*=Y,at*=Y,$=ut+U,O=Q+K,X=mt+at,z<-.96||z>.96)Mt=A*A*1.5-.5,At=A*R*1.5-C*.866025403,Nt=A*C*1.5+R*.866025403,bt=R*A*1.5+C*.866025403,vt=R*R*1.5-.5,Pt=R*C*1.5-A*.866025403,F=C*A*1.5-R*.866025403,Rt=C*R*1.5+A*.866025403,dt=C*C*1.5-.5,ot=$,q=O,W=X,Et=gt*(ot-Vt)+lt*(q-Yt)+St*(W-nt),$=ot-Et*gt-Vt,O=q-Et*lt-Yt,X=W-Et*St-nt,Y=$*$+O*O+X*X,Y>E*E&&(Y=E/Tt.sqrt(Y),$*=Y,O*=Y,X*=Y),ot=Vt+$,q=Yt+O,W=nt+X,e.addPoint(ot,q,W,-gt,-lt,-St,Et,!1),ot=U*Mt+K*At+at*Nt,q=U*bt+K*vt+at*Pt,W=U*F+K*Rt+at*dt,ot=(U=ot)+ut,q=(K=q)+Q,W=(at=W)+mt,Et=gt*(ot-Vt)+lt*(q-Yt)+St*(W-nt),Et<=0&&($=ot-Et*gt-Vt,O=q-Et*lt-Yt,X=W-Et*St-nt,Y=$*$+O*O+X*X,Y>E*E&&(Y=E/Tt.sqrt(Y),$*=Y,O*=Y,X*=Y),ot=Vt+$,q=Yt+O,W=nt+X,e.addPoint(ot,q,W,-gt,-lt,-St,Et,!1)),ot=U*Mt+K*At+at*Nt,q=U*bt+K*vt+at*Pt,W=U*F+K*Rt+at*dt,ot=(U=ot)+ut,q=(K=q)+Q,W=(at=W)+mt,Et=gt*(ot-Vt)+lt*(q-Yt)+St*(W-nt),Et<=0&&($=ot-Et*gt-Vt,O=q-Et*lt-Yt,X=W-Et*St-nt,Y=$*$+O*O+X*X,Y>E*E&&(Y=E/Tt.sqrt(Y),$*=Y,O*=Y,X*=Y),ot=Vt+$,q=Yt+O,W=nt+X,e.addPoint(ot,q,W,-gt,-lt,-St,Et,!1));else{if(H=$,tt=O,xt=X,It=gt*(H-Vt)+lt*(tt-Yt)+St*(xt-nt),H-=It*gt,tt-=It*lt,xt-=It*St,z>0?(Ut=$+A*x*2,Lt=O+R*x*2,zt=X+C*x*2):(Ut=$-A*x*2,Lt=O-R*x*2,zt=X-C*x*2),Jt=gt*(Ut-Vt)+lt*(Lt-Yt)+St*(zt-nt),Ut-=Jt*gt,Lt-=Jt*lt,zt-=Jt*St,U=Vt-H,K=Yt-tt,at=nt-xt,$=Ut-H,O=Lt-tt,X=zt-xt,Xt=U*U+K*K+at*at,Zt=U*$+K*O+at*X,te=$*$+O*O+X*X,_e=Zt*Zt-te*(Xt-E*E),_e<0)break;_e=Tt.sqrt(_e),kt=(Zt+_e)/te,_t=(Zt-_e)/te,_t<kt&&(Y=kt,kt=_t,_t=Y),_t>1&&(_t=1),kt<0&&(kt=0),$=H+(Ut-H)*kt,O=tt+(Lt-tt)*kt,X=xt+(zt-xt)*kt,Ut=H+(Ut-H)*_t,Lt=tt+(Lt-tt)*_t,zt=xt+(zt-xt)*_t,H=$,tt=O,xt=X,Y=It+(Jt-It)*kt,Jt=It+(Jt-It)*_t,It=Y,It<0&&e.addPoint(H,tt,xt,-gt,-lt,-St,It,!1),Jt<0&&e.addPoint(Ut,Lt,zt,-gt,-lt,-St,Jt,!1)}break}}}});function ca(n){Ii.call(this),this.flip=n}ca.prototype=Object.assign(Object.create(Ii.prototype),{constructor:ca,detectCollision:function(n,t,e){var s,r;this.flip?(s=t,r=n):(s=n,r=t);var a=r.dimentions,o=s.position,h=o.x,l=o.y,c=o.z,u=r.position,f=u.x,d=u.y,x=u.z,g=s.radius,v=r.halfWidth,p=r.halfHeight,m=r.halfDepth,S=h-f,M=l-d,E=c-x,A=a[0]*S+a[1]*M+a[2]*E,R=a[3]*S+a[4]*M+a[5]*E,C=a[6]*S+a[7]*M+a[8]*E,y,b,D,w,N,I=0;A>v?A=v:A<-v?A=-v:I=1,R>p?R=p:R<-p?R=-p:I|=2,C>m?C=m:C<-m?C=-m:I|=4,I==7?(A<0?S=v+A:S=v-A,R<0?M=p+R:M=p-R,C<0?E=m+C:E=m-C,S<M?S<E?(w=S-v,A<0?(A=-v,S=a[0],M=a[1],E=a[2]):(A=v,S=-a[0],M=-a[1],E=-a[2])):(w=E-m,C<0?(C=-m,S=a[6],M=a[7],E=a[8]):(C=m,S=-a[6],M=-a[7],E=-a[8])):M<E?(w=M-p,R<0?(R=-p,S=a[3],M=a[4],E=a[5]):(R=p,S=-a[3],M=-a[4],E=-a[5])):(w=E-m,C<0?(C=-m,S=a[6],M=a[7],E=a[8]):(C=m,S=-a[6],M=-a[7],E=-a[8])),y=f+A*a[0]+R*a[3]+C*a[6],b=d+A*a[1]+R*a[4]+C*a[7],D=x+A*a[2]+R*a[5]+C*a[8],e.addPoint(h+g*S,l+g*M,c+g*E,S,M,E,w-g,this.flip)):(y=f+A*a[0]+R*a[3]+C*a[6],b=d+A*a[1]+R*a[4]+C*a[7],D=x+A*a[2]+R*a[5]+C*a[8],S=y-o.x,M=b-o.y,E=D-o.z,w=S*S+M*M+E*E,w>0&&w<g*g&&(w=Tt.sqrt(w),N=1/w,S*=N,M*=N,E*=N,e.addPoint(h+g*S,l+g*M,c+g*E,S,M,E,w-g,this.flip)))}});function ua(n){Ii.call(this),this.flip=n}ua.prototype=Object.assign(Object.create(Ii.prototype),{constructor:ua,detectCollision:function(n,t,e){var s,r;this.flip?(s=t,r=n):(s=n,r=t);var a=s.position,o=a.x,h=a.y,l=a.z,c=r.position,u=c.x,f=c.y,d=c.z,x=r.normalDirection.x,g=r.normalDirection.y,v=r.normalDirection.z,p=s.radius,m=r.radius,S=p+m,M=r.halfHeight,E=o-u,A=h-f,R=l-d,C=E*x+A*g+R*v;if(!(C<-M-p||C>M+p)){var y=u+C*x,b=f+C*g,D=d+C*v,w=o-y,N=h-b,I=l-D,L=w*w+N*N+I*I;if(!(L>S*S)){L>m*m&&(L=m/Tt.sqrt(L),w*=L,N*=L,I*=L),C<-M?C=-M:C>M&&(C=M),y=u+C*x+w,b=f+C*g+N,D=d+C*v+I,E=y-o,A=b-h,R=D-l,L=E*E+A*A+R*R;var k;L>0&&L<p*p&&(L=Tt.sqrt(L),k=1/L,E*=k,A*=k,R*=k,e.addPoint(o+E*p,h+A*p,l+R*p,E,A,R,L-p,this.flip))}}}});function bh(){Ii.call(this)}bh.prototype=Object.assign(Object.create(Ii.prototype),{constructor:bh,detectCollision:function(n,t,e){var s=n,r=t,a=s.position,o=r.position,h=o.x-a.x,l=o.y-a.y,c=o.z-a.z,u=h*h+l*l+c*c,f=s.radius,d=r.radius,x=f+d;if(u>0&&u<x*x){u=Tt.sqrt(u);var g=1/u;h*=g,l*=g,c*=g,e.addPoint(a.x+h*f,a.y+l*f,a.z+c*f,h,l,c,u-x,!1)}}});function fa(n){Ii.call(this),this.flip=n,this.n=new yt,this.p=new yt}fa.prototype=Object.assign(Object.create(Ii.prototype),{constructor:fa,detectCollision:function(n,t,e){var s=this.n,r=this.p,a=this.flip?t:n,o=this.flip?n:t,h=a.radius,l;s.sub(a.position,o.position),s.x*=o.normal.x,s.y*=o.normal.y,s.z*=o.normal.z;var l=s.lengthSq();l>0&&l<h*h&&(l=Tt.sqrt(l),s.copy(o.normal).negate(),r.copy(a.position).addScaledVector(s,h),e.addPointVec(r,s,l-h,this.flip))}});function da(n){Ii.call(this),this.flip=n,this.n=new yt,this.p=new yt,this.dix=new yt,this.diy=new yt,this.diz=new yt,this.cc=new yt,this.cc2=new yt}da.prototype=Object.assign(Object.create(Ii.prototype),{constructor:da,detectCollision:function(n,t,e){var s=this.n,r=this.p,a=this.cc,o=this.flip?t:n,h=this.flip?n:t,l=o.dimentions,c=o.halfWidth,u=o.halfHeight,f=o.halfDepth,d,x=0;this.dix.set(l[0],l[1],l[2]),this.diy.set(l[3],l[4],l[5]),this.diz.set(l[6],l[7],l[8]),s.sub(o.position,h.position),s.x*=h.normal.x,s.y*=h.normal.y,s.z*=h.normal.z,a.set(Tt.dotVectors(this.dix,s),Tt.dotVectors(this.diy,s),Tt.dotVectors(this.diz,s)),a.x>c?a.x=c:a.x<-c?a.x=-c:x=1,a.y>u?a.y=u:a.y<-u?a.y=-u:x|=2,a.z>f?a.z=f:a.z<-f?a.z=-f:x|=4,x===7&&(s.set(a.x<0?c+a.x:c-a.x,a.y<0?u+a.y:u-a.y,a.z<0?f+a.z:f-a.z),s.x<s.y?s.x<s.z?(d=s.x-c,a.x<0?(a.x=-c,s.copy(this.dix)):(a.x=c,s.subEqual(this.dix))):(d=s.z-f,a.z<0?(a.z=-f,s.copy(this.diz)):(a.z=f,s.subEqual(this.diz))):s.y<s.z?(d=s.y-u,a.y<0?(a.y=-u,s.copy(this.diy)):(a.y=u,s.subEqual(this.diy))):(d=s.z-f,a.z<0?(a.z=-f,s.copy(this.diz)):(a.z=f,s.subEqual(this.diz))),r.copy(h.position).addScaledVector(s,1),e.addPointVec(r,s,d,this.flip))}});function Xc(n){switch(n instanceof Object||(n={}),this.scale=n.worldscale||1,this.invScale=1/this.scale,this.timeStep=n.timestep||.01666,this.timerate=this.timeStep*1e3,this.timer=null,this.preLoop=null,this.postLoop=null,this.numIterations=n.iterations||8,n.broadphase||2){case 1:this.broadPhase=new xh;break;case 2:default:this.broadPhase=new vh;break;case 3:this.broadPhase=new yh;break}this.Btypes=["None","BruteForce","Sweep & Prune","Bounding Volume Tree"],this.broadPhaseType=this.Btypes[n.broadphase||2],this.performance=null,this.isStat=n.info===void 0?!1:n.info,this.isStat&&(this.performance=new Bc(this)),this.enableRandomizer=n.random!==void 0?n.random:!0,this.rigidBodies=null,this.numRigidBodies=0,this.contacts=null,this.unusedContacts=null,this.numContacts=0,this.numContactPoints=0,this.joints=null,this.numJoints=0,this.numIslands=0,this.gravity=new yt(0,-9.8,0),n.gravity!==void 0&&this.gravity.fromArray(n.gravity);var t=5;this.detectors=[],this.detectors.length=t;for(var e=t;e--;)this.detectors[e]=[],this.detectors[e].length=t;this.detectors[Yn][Yn]=new bh,this.detectors[Yn][jn]=new ca(!1),this.detectors[jn][Yn]=new ca(!0),this.detectors[jn][jn]=new Mh,this.detectors[gs][gs]=new Sh,this.detectors[gs][jn]=new la(!0),this.detectors[jn][gs]=new la(!1),this.detectors[gs][Yn]=new ua(!0),this.detectors[Yn][gs]=new ua(!1),this.detectors[pr][Yn]=new fa(!0),this.detectors[Yn][pr]=new fa(!1),this.detectors[pr][jn]=new da(!0),this.detectors[jn][pr]=new da(!1),this.randX=65535,this.randA=98765,this.randB=123456789,this.islandRigidBodies=[],this.islandStack=[],this.islandConstraints=[]}Object.assign(Xc.prototype,{World:!0,play:function(){if(this.timer===null){var n=this;this.timer=setInterval(function(){n.step()},this.timerate)}},stop:function(){this.timer!==null&&(clearInterval(this.timer),this.timer=null)},setGravity:function(n){this.gravity.fromArray(n)},getInfo:function(){return this.isStat?this.performance.show():""},clear:function(){for(this.stop(),this.preLoop=null,this.postLoop=null,this.randX=65535;this.joints!==null;)this.removeJoint(this.joints);for(;this.contacts!==null;)this.removeContact(this.contacts);for(;this.rigidBodies!==null;)this.removeRigidBody(this.rigidBodies)},addRigidBody:function(n){n.parent&&Ci("World","It is not possible to be added to more than one world one of the rigid body"),n.setParent(this);for(var t=n.shapes;t!==null;t=t.next)this.addShape(t);this.rigidBodies!==null&&((this.rigidBodies.prev=n).next=this.rigidBodies),this.rigidBodies=n,this.numRigidBodies++},removeRigidBody:function(n){var t=n;if(t.parent===this){t.awake();for(var e=t.jointLink;e!=null;){var s=e.joint;e=e.next,this.removeJoint(s)}for(var r=n.shapes;r!==null;r=r.next)this.removeShape(r);var a=t.prev,o=t.next;a!==null&&(a.next=o),o!==null&&(o.prev=a),this.rigidBodies==t&&(this.rigidBodies=o),t.prev=null,t.next=null,t.parent=null,this.numRigidBodies--}},getByName:function(n){for(var t=this.rigidBodies;t!==null;){if(t.name===n)return t;t=t.next}for(var e=this.joints;e!==null;){if(e.name===n)return e;e=e.next}return null},addShape:function(n){(!n.parent||!n.parent.parent)&&Ci("World","It is not possible to be added alone to shape world"),n.proxy=this.broadPhase.createProxy(n),n.updateProxy(),this.broadPhase.addProxy(n.proxy)},removeShape:function(n){this.broadPhase.removeProxy(n.proxy),n.proxy=null},addJoint:function(n){n.parent&&Ci("World","It is not possible to be added to more than one world one of the joint"),this.joints!=null&&((this.joints.prev=n).next=this.joints),this.joints=n,n.setParent(this),this.numJoints++,n.awake(),n.attach()},removeJoint:function(n){var t=n,e=t.prev,s=t.next;e!==null&&(e.next=s),s!==null&&(s.prev=e),this.joints==t&&(this.joints=s),t.prev=null,t.next=null,this.numJoints--,t.awake(),t.detach(),t.parent=null},addContact:function(n,t){var e;this.unusedContacts!==null?(e=this.unusedContacts,this.unusedContacts=this.unusedContacts.next):e=new Gc,e.attach(n,t),e.detector=this.detectors[n.type][t.type],this.contacts&&((this.contacts.prev=e).next=this.contacts),this.contacts=e,this.numContacts++},removeContact:function(n){var t=n.prev,e=n.next;e&&(e.prev=t),t&&(t.next=e),this.contacts==n&&(this.contacts=e),n.prev=null,n.next=null,n.detach(),n.next=this.unusedContacts,this.unusedContacts=n,this.numContacts--},getContact:function(n,t){n=n.constructor===Gs?n.name:n,t=t.constructor===Gs?t.name:t;for(var e,s,r=this.contacts;r!==null;){if(e=r.body1.name,s=r.body2.name,e===n&&s===t||s===n&&e===t)return r.touching?r:null;r=r.next}return null},checkContact:function(n,t){for(var e,s,r=this.contacts;r!==null;){if(e=r.body1.name||" ",s=r.body2.name||" ",e==n&&s==t||s==n&&e==t)return!!r.touching;r=r.next}},callSleep:function(n){return!(!n.allowSleep||n.linearVelocity.lengthSq()>.04||n.angularVelocity.lengthSq()>.25)},step:function(){var n=this.isStat;n&&this.performance.setTime(0);for(var t=this.rigidBodies;t!==null;)t.addedToIsland=!1,t.sleeping&&t.testWakeUp(),t=t.next;n&&this.performance.setTime(1),this.broadPhase.detectPairs();for(var e=this.broadPhase.pairs,s=this.broadPhase.numPairs;s--;){var r=e[s],a,o;r.shape1.id<r.shape2.id?(a=r.shape1,o=r.shape2):(a=r.shape2,o=r.shape1);var h;a.numContacts<o.numContacts?h=a.contactLink:h=o.contactLink;for(var l=!1;h;){var c=h.contact;if(c.shape1==a&&c.shape2==o){c.persisting=!0,l=!0;break}h=h.next}l||this.addContact(a,o)}for(n&&this.performance.calcBroadPhase(),this.numContactPoints=0,c=this.contacts;c!==null;){if(!c.persisting&&c.shape1.aabb.intersectTest(c.shape2.aabb)){var u=c.next;this.removeContact(c),c=u;continue}var f=c.body1,d=c.body2;(f.isDynamic&&!f.sleeping||d.isDynamic&&!d.sleeping)&&c.updateManifold(),this.numContactPoints+=c.manifold.numPoints,c.persisting=!1,c.constraint.addedToIsland=!1,c=c.next}n&&this.performance.calcNarrowPhase();var x=1/this.timeStep,g,v;for(g=this.joints;g!==null;g=g.next)g.addedToIsland=!1;this.islandRigidBodies=[],this.islandConstraints=[],this.islandStack=[],n&&this.performance.setTime(1),this.numIslands=0;for(var p=this.rigidBodies;p!==null;p=p.next)if(!(p.addedToIsland||p.isStatic||p.sleeping)){if(p.isLonely()){p.isDynamic&&p.linearVelocity.addScaledVector(this.gravity,this.timeStep),this.callSleep(p)?(p.sleepTime+=this.timeStep,p.sleepTime>.5?p.sleep():p.updatePosition(this.timeStep)):(p.sleepTime=0,p.updatePosition(this.timeStep)),this.numIslands++;continue}var m=0,S=0,M=1;this.islandStack[0]=p,p.addedToIsland=!0;do if(t=this.islandStack[--M],this.islandStack[M]=null,t.sleeping=!1,this.islandRigidBodies[m++]=t,!t.isStatic){for(var E=t.contactLink;E!==null;E=E.next){var c=E.contact;if(v=c.constraint,!(v.addedToIsland||!c.touching)){this.islandConstraints[S++]=v,v.addedToIsland=!0;var u=E.body;u.addedToIsland||(this.islandStack[M++]=u,u.addedToIsland=!0)}}for(var A=t.jointLink;A!==null;A=A.next)v=A.joint,!v.addedToIsland&&(this.islandConstraints[S++]=v,v.addedToIsland=!0,u=A.body,!(u.addedToIsland||!u.isDynamic)&&(this.islandStack[M++]=u,u.addedToIsland=!0))}while(M!=0);for(var R=new yt().addScaledVector(this.gravity,this.timeStep),C=m;C--;)t=this.islandRigidBodies[C],t.isDynamic&&t.linearVelocity.addEqual(R);if(this.enableRandomizer){for(C=S;C--;)if(C!==0){var y=(this.randX=this.randX*this.randA+this.randB&2147483647)/2147483648*C|0;v=this.islandConstraints[C],this.islandConstraints[C]=this.islandConstraints[y],this.islandConstraints[y]=v}}for(C=S;C--;)this.islandConstraints[C].preSolve(this.timeStep,x);for(var b=this.numIterations;b--;)for(C=S;C--;)this.islandConstraints[C].solve();for(C=S;C--;)this.islandConstraints[C].postSolve(),this.islandConstraints[C]=null;var D=10;for(C=m;C--;)if(t=this.islandRigidBodies[C],this.callSleep(t))t.sleepTime+=this.timeStep,t.sleepTime<D&&(D=t.sleepTime);else{t.sleepTime=0,D=0;continue}if(D>.5)for(C=m;C--;)this.islandRigidBodies[C].sleep(),this.islandRigidBodies[C]=null;else for(C=m;C--;)this.islandRigidBodies[C].updatePosition(this.timeStep),this.islandRigidBodies[C]=null;this.numIslands++}n&&this.performance.calcEnd(),this.postLoop!==null&&this.postLoop()},remove:function(n){},add:function(n){n=n||{};var t=n.type||"box";t.constructor===String&&(t=[t]);var e=t[0].substring(0,5)==="joint";return e?this.initJoint(t[0],n):this.initBody(t,n)},initBody:function(n,t){var e=this.invScale,s=t.move||!1,r=t.kinematic||!1,a=t.pos||[0,0,0];a=a.map(function(m){return m*e});var o=t.posShape||[0,0,0];o=o.map(function(m){return m*e});var h=t.rot||[0,0,0];h=h.map(function(m){return m*Tt.degtorad});var l=t.rotShape||[0,0,0];l=h.map(function(m){return m*Tt.degtorad});var c=t.size===void 0?[1,1,1]:t.size;c.length===1&&(c[1]=c[0]),c.length===2&&(c[2]=c[0]),c=c.map(function(m){return m*e});var u=new zx;t.density!==void 0&&(u.density=t.density),t.friction!==void 0&&(u.friction=t.friction),t.restitution!==void 0&&(u.restitution=t.restitution),t.belongsTo!==void 0&&(u.belongsTo=t.belongsTo),t.collidesWith!==void 0&&(u.collidesWith=t.collidesWith),t.config!==void 0&&(t.config[0]!==void 0&&(u.density=t.config[0]),t.config[1]!==void 0&&(u.friction=t.config[1]),t.config[2]!==void 0&&(u.restitution=t.config[2]),t.config[3]!==void 0&&(u.belongsTo=t.config[3]),t.config[4]!==void 0&&(u.collidesWith=t.config[4]));for(var f=new yt(a[0],a[1],a[2]),d=new Ni().setFromEuler(h[0],h[1],h[2]),x=new Gs(f,d),g,v,p=0;p<n.length;p++){switch(v=p*3,o[v]!==void 0&&u.relativePosition.set(o[v],o[v+1],o[v+2]),l[v]!==void 0&&u.relativeRotation.setQuat(new Ni().setFromEuler(l[v],l[v+1],l[v+2])),n[p]){case"sphere":g=new sh(u,c[v]);break;case"cylinder":g=new rh(u,c[v],c[v+1]);break;case"box":g=new nh(u,c[v],c[v+1],c[v+2]);break;case"plane":g=new ah(u);break}x.addShape(g)}return t.neverSleep||r?x.allowSleep=!1:x.allowSleep=!0,x.isKinematic=r,s?t.massPos||t.massRot?x.setupMass(ha,!1):x.setupMass(ha,!0):x.setupMass(dr),t.name!==void 0&&(x.name=t.name),this.addRigidBody(x),s&&(t.sleep?x.sleep():x.awake()),x},initJoint:function(n,t){var e=this.invScale,s=t.axe1||[1,0,0],r=t.axe2||[1,0,0],a=t.pos1||[0,0,0],o=t.pos2||[0,0,0];a=a.map(function(p){return p*e}),o=o.map(function(p){return p*e});var h,l;n==="jointDistance"?(h=t.min||0,l=t.max||10,h=h*e,l=l*e):(h=t.min||57.29578,l=t.max||0,h=h*Tt.degtorad,l=l*Tt.degtorad);var c=t.limit||null,u=t.spring||null,f=t.motor||null,d=new Fx;d.scale=this.scale,d.invScale=this.invScale,d.allowCollision=t.collision||!1,d.localAxis1.set(s[0],s[1],s[2]),d.localAxis2.set(r[0],r[1],r[2]),d.localAnchorPoint1.set(a[0],a[1],a[2]),d.localAnchorPoint2.set(o[0],o[1],o[2]);var x=null,g=null;if(t.body1===void 0||t.body2===void 0)return Ci("World","Can't add joint if attach rigidbodys not define !");if(t.body1.constructor===String?x=this.getByName(t.body1):t.body1.constructor===Number?x=this.getByName(t.body1):t.body1.constructor===Gs&&(x=t.body1),t.body2.constructor===String?g=this.getByName(t.body2):t.body2.constructor===Number?g=this.getByName(t.body2):t.body2.constructor===Gs&&(g=t.body2),x===null||g===null)return Ci("World","Can't add joint attach rigidbodys not find !");d.body1=x,d.body2=g;var v;switch(n){case"jointDistance":v=new lh(d,h,l),u!==null&&v.limitMotor.setSpring(u[0],u[1]),f!==null&&v.limitMotor.setMotor(f[0],f[1]);break;case"jointHinge":case"joint":v=new oh(d,h,l),u!==null&&v.limitMotor.setSpring(u[0],u[1]),f!==null&&v.limitMotor.setMotor(f[0],f[1]);break;case"jointPrisme":v=new ch(d,h,l);break;case"jointSlide":v=new uh(d,h,l);break;case"jointBall":v=new hh(d);break;case"jointWheel":v=new fh(d),c!==null&&v.rotationalLimitMotor1.setLimit(c[0],c[1]),u!==null&&v.rotationalLimitMotor1.setSpring(u[0],u[1]),f!==null&&v.rotationalLimitMotor1.setMotor(f[0],f[1]);break}return v.name=t.name||"",this.addJoint(v),v}});function Gx(){const n=new Xc({timestep:.016666666666666666,iterations:8,gravity:[0,-20,0],broadphase:2,worldscale:1});function t(){n.step()}return{world:n,step:t}}const ql=12,Yl=11,Hx=18,Wx=.94,Xx=.18,jl=2.8,ro=1/60,ao={w:1,h:.38,d:1.9},Kl=.5;function qx(){return{steer:0,speed:0,forwardSpeed:0}}function Yx(n,t,e){const s=e.left?jl:e.right?-jl:0;t.steer+=(s-t.steer)*Xx;const r=n.linearVelocity,a=n.orientation,o=2*(a.x*a.z+a.w*a.y),h=a.w*a.w-a.x*a.x-a.y*a.y+a.z*a.z,l=r.x*o+r.z*h;t.forwardSpeed=l;let c=l;e.forward?c=Math.min(l+ql*ro,Yl):e.backward?l>.05?c=Math.max(l-Hx*ro,0):c=Math.max(l-ql*.5*ro,-3.5):(c=l*Wx,Math.abs(c)<.04&&(c=0));const u=c-l,f=h,d=-o,x=r.x*f+r.z*d,g=.7;r.x+=o*u+f*(x*g-x),r.z+=h*u+d*(x*g-x);const v=Math.min(Math.abs(l)/Yl,1),p=v*(1-v*.6)*2.2;Math.abs(l)>.08?n.angularVelocity.y=t.steer*Math.sign(l)*p:n.angularVelocity.y*=.8,n.angularVelocity.x=0,n.angularVelocity.z=0,jx(n),t.speed=Math.abs(l)}function jx(n){const t=n.orientation,s=Math.atan2(2*(t.w*t.y+t.x*t.z),1-2*(t.y*t.y+t.z*t.z))*.5;t.w=Math.cos(s),t.x=0,t.y=Math.sin(s),t.z=0}const Eh=120,Zl=35,Kx=.6;new it;function Zx(){const n=new Zn,t=A=>new gn({color:A,flatShading:!0}),e=new li(new rn(1,.38,1.9),t("#ff6b35"));e.castShadow=!0,n.add(e);const s=new li(new rn(.78,.34,1.1),t("#ff8c5a"));s.position.set(0,.34,-.05),s.castShadow=!0,n.add(s);const r=new li(new rn(.72,.28,.05),new gn({color:"#88bbee",transparent:!0,opacity:.7,flatShading:!0}));r.position.set(0,.36,.52),r.rotation.x=.25,n.add(r);const a=new li(new rn(.72,.28,.05),new gn({color:"#88bbee",transparent:!0,opacity:.7,flatShading:!0}));a.position.set(0,.36,-.62),a.rotation.x=-.25,n.add(a);const o=new gn({color:"#ffffcc",emissive:"#ffff88",emissiveIntensity:.5}),h=new rn(.2,.1,.05),l=new li(h,o);l.position.set(-.3,.04,.96);const c=new li(h,o);c.position.set(.3,.04,.96),n.add(l,c);const u=new gn({color:"#ff2222",emissive:"#ff0000",emissiveIntensity:.6}),f=new rn(.2,.1,.05),d=new li(f,u);d.position.set(-.3,.04,-.96);const x=new li(f,u);x.position.set(.3,.04,-.96),n.add(d,x);const g=new Mr(.22,.22,.16,8),v=new gn({color:"#222222",flatShading:!0});function p(){const A=new li(g,v);return A.rotation.z=Math.PI/2,A.castShadow=!0,A}const m=new Zn;m.position.set(-.57,-.13,.62),m.add(p());const S=new Zn;S.position.set(.57,-.13,.62),S.add(p());const M=p();M.position.set(-.57,-.13,-.62);const E=p();return E.position.set(.57,-.13,-.62),n.add(m,S,M,E),{group:n,flGroup:m,frGroup:S}}function $x(n){const t=new Float32Array(Eh*3),e=new cn;e.setAttribute("position",new yn(t,3));const s=new Rc({color:"#c8a96e",size:.18,transparent:!0,opacity:0,sizeAttenuation:!0,depthWrite:!1}),r=new ef(e,s);return n.add(r),{geo:e,mat:s,positions:t,particles:[]}}function Jx(n,t){const{group:e,flGroup:s,frGroup:r}=Zx();n.add(e);const a=$x(n),o=qx(),h=t.add({type:"box",size:[ao.w,ao.h,ao.d],pos:[0,Kl,0],rot:[0,0,0],move:!0,density:1,friction:.6,restitution:.1,neverSleep:!0,name:"car"}),l=new it(0,Kl,0),c={position:l,rotation:0,speed:0,steer:0};function u(d){Yx(h,o,d)}function f(){const d=h.getPosition();l.set(d.x,d.y,d.z);const x=h.getQuaternion();c.rotation=Math.atan2(2*(x.w*x.y+x.x*x.z),1-2*(x.y*x.y+x.z*x.z)),c.speed=o.speed,c.steer=o.steer,e.position.copy(l),e.quaternion.set(x.x,x.y,x.z,x.w),s.rotation.y=o.steer/$l*.5,r.rotation.y=o.steer/$l*.5,Qx(a,c)}return{carState:c,preStep:u,postStep:f}}const $l=2.8;function Qx(n,t){const{position:e,rotation:s,speed:r}=t,{geo:a,mat:o,positions:h,particles:l}=n;if(Math.abs(r)>Kx&&l.length<Eh){const u=e.x-Math.sin(s)*1.05,f=e.z-Math.cos(s)*1.05,d=r>5?2:1;for(let x=0;x<d;x++)l.push({position:new it(u+(Math.random()-.5)*.3,.15+Math.random()*.1,f+(Math.random()-.5)*.3),velocity:new it((Math.random()-.5)*.04-Math.sin(s)*.02,.01+Math.random()*.02,(Math.random()-.5)*.04-Math.cos(s)*.02),life:Zl,maxLife:Zl})}for(let u=l.length-1;u>=0;u--)l[u].life--,l[u].position.add(l[u].velocity),l[u].velocity.y*=.98,l[u].life<=0&&l.splice(u,1);const c=l.length;for(let u=0;u<c;u++)h[u*3]=l[u].position.x,h[u*3+1]=l[u].position.y,h[u*3+2]=l[u].position.z;for(let u=c;u<Eh;u++)h[u*3+1]=-999;a.attributes.position.needsUpdate=!0,a.setDrawRange(0,c),o.opacity=c>0?l.reduce((u,f)=>u+f.life/f.maxLife,0)/c*.75:0}function tg(n,t){eg(n,t),ig(n,t)}function eg(n,t){const e=new li(new Sr(300,300),new gn({color:"#4a7c59",side:Dn,flatShading:!0}));e.rotation.x=-Math.PI/2,e.receiveShadow=!0,n.add(e),t.add({type:"box",size:[300,1,300],pos:[0,-.5,0],rot:[0,0,0],move:!1,density:1,friction:.8,restitution:0,name:"ground"});const s=10,r=2,a=150,o=[{pos:[a+r/2,s/2,0],size:[r,s,300]},{pos:[-a-r/2,s/2,0],size:[r,s,300]},{pos:[0,s/2,a+r/2],size:[300,s,r]},{pos:[0,s/2,-a-r/2],size:[300,s,r]}];for(const h of o)t.add({type:"box",size:h.size,pos:h.pos,move:!1,density:1,friction:.5,restitution:.2,name:"wall"})}function ig(n,t){[[-15,0,-20],[20,0,-15],[-25,0,10],[18,0,25],[-10,0,30],[30,0,5],[-35,0,-5],[12,0,-30],[-20,0,-40],[35,0,-25],[-40,0,20],[25,0,40],[-8,0,-15],[14,0,8],[-18,0,18],[28,0,-10],[-30,0,35],[40,0,15],[-45,0,-15],[22,0,-45],[-12,0,45],[38,0,-40],[-50,0,8],[16,0,50],[-22,0,-52],[44,0,28],[-38,0,-30],[10,0,-48]].forEach(([s,r,a],o)=>{const h=.8+Math.sin(o*7.3)*.4,l=o%3===0?"#2d6a4f":o%3===1?"#40916c":"#52b788",c=new Zn;c.position.set(s,r,a),c.scale.setScalar(h);const u=new li(new Mr(.15,.2,1.6,5),new gn({color:"#6b4c2a",flatShading:!0}));u.position.set(0,.8,0),u.castShadow=!0,c.add(u);const f=[[1.2,2,6,2.4],[.9,1.6,6,3.6],[.5,1.2,5,4.5]],d=new gn({color:l,flatShading:!0});f.forEach(([v,p,m,S])=>{const M=new li(new Oh(v,p,m),d);M.position.set(0,S,0),M.castShadow=!0,c.add(M)}),n.add(c);const x=.35*h,g=2*h;t.add({type:"cylinder",size:[x,g],pos:[s,g/2,a],move:!1,density:1,friction:.4,restitution:.3,name:`tree_${o}`})})}const ng=[{id:"about",label:"About Me",position:{x:0,z:-20},color:"#5b8dee",bodySize:{w:4,h:5,d:3},bodyY:2.5,signOffset:{x:0,y:4.7,z:1.57},content:`
      <h3 style="margin:0 0 12px;font-size:1.1rem;color:#5b8dee;">Hi, I'm Eric</h3>
      <p style="margin:0 0 12px;">Software engineer and creative technologist. I build things for the web — interactive experiences, developer tools, and whatever else seems interesting.</p>
      <p style="color:rgba(255,255,255,0.45);font-size:0.85rem;margin:0;">More coming soon.</p>
    `},{id:"projects",label:"Projects",position:{x:20,z:0},color:"#f5a623",bodySize:{w:5.5,h:3.5,d:3.5},bodyY:1.75,signOffset:{x:0,y:3.1,z:1.82},content:`
      <h3 style="margin:0 0 12px;font-size:1.1rem;color:#f5a623;">Work in progress</h3>
      <p style="margin:0 0 12px;">A collection of projects spanning web tooling, 3D graphics, and side experiments. Each one taught me something useful.</p>
      <p style="color:rgba(255,255,255,0.45);font-size:0.85rem;margin:0;">More coming soon.</p>
    `},{id:"contact",label:"Contact",position:{x:0,z:20},color:"#50c878",bodySize:{w:4,h:4,d:3.5},bodyY:2,signOffset:{x:0,y:3.7,z:1.82},content:`
      <h3 style="margin:0 0 12px;font-size:1.1rem;color:#50c878;">Say hello</h3>
      <p style="margin:0 0 12px;">I'm available for interesting conversations, collaborations, and the occasional coffee chat.</p>
      <p style="color:rgba(255,255,255,0.45);font-size:0.85rem;margin:0;">More coming soon.</p>
    `},{id:"blog",label:"Blog",position:{x:-20,z:0},color:"#e84393",bodySize:{w:3.5,h:6,d:3},bodyY:3,signOffset:{x:0,y:5.7,z:1.57},content:`
      <h3 style="margin:0 0 12px;font-size:1.1rem;color:#e84393;">Thinking out loud</h3>
      <p style="margin:0 0 12px;">Notes on engineering, design, and the occasional rabbit hole. Written when something feels worth writing down.</p>
      <p style="color:rgba(255,255,255,0.45);font-size:0.85rem;margin:0;">More coming soon.</p>
    `}];function sg(n){const t=new Zn;t.position.set(n.position.x,0,n.position.z);const e=new li(new rn(n.bodySize.w,n.bodySize.h,n.bodySize.d),new gn({color:n.color,flatShading:!0}));e.position.y=n.bodyY,e.castShadow=!0,e.receiveShadow=!0,t.add(e);const s=new li(new rn(n.bodySize.w*.8,n.bodySize.h*.15,.15),new gn({color:"#ffffff",transparent:!0,opacity:.9,flatShading:!0}));return s.position.set(n.signOffset.x,n.signOffset.y,n.signOffset.z),s.castShadow=!0,t.add(s),t}function rg(n,t){const e=[];for(const s of ng)n.add(sg(s)),t.add({type:"box",size:[s.bodySize.w,s.bodySize.h,s.bodySize.d],pos:[s.position.x,s.bodyY,s.position.z],move:!1,density:1,friction:.5,restitution:.2,name:`building_${s.id}`}),e.push({id:s.id,label:s.label,color:s.color,radius:6,content:s.content,position:new it(s.position.x,0,s.position.z)});return{locations:e}}function ag(){const n=document.getElementById("hud");n.innerHTML=`
    <div style="
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      pointer-events: none;
      user-select: none;
      font-family: monospace;
    ">
      <div style="display:flex;gap:4px;">
        ${Jr("W")}
      </div>
      <div style="display:flex;gap:4px;">
        ${Jr("A")}${Jr("S")}${Jr("D")}
      </div>
      <p style="
        color: rgba(255,255,255,0.6);
        font-size: 12px;
        margin: 4px 0 0;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      ">or Arrow Keys to drive</p>
    </div>
  `;const t=document.createElement("div");t.id="proximity-prompt",Object.assign(t.style,{position:"fixed",bottom:"120px",left:"50%",transform:"translateX(-50%) translateY(8px)",background:"rgba(10,10,20,0.75)",backdropFilter:"blur(8px)",webkitBackdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:"10px",padding:"10px 20px",color:"#ffffff",fontFamily:"monospace",fontSize:"14px",letterSpacing:"0.06em",boxShadow:"0 4px 16px rgba(0,0,0,0.4)",pointerEvents:"none",userSelect:"none",opacity:"0",transition:"opacity 0.14s ease, transform 0.14s ease",whiteSpace:"nowrap"}),n.appendChild(t);function e(s){s?(t.textContent=`[ E ]  Enter ${s.label}`,t.style.opacity="1",t.style.transform="translateX(-50%) translateY(0)"):(t.style.opacity="0",t.style.transform="translateX(-50%) translateY(8px)")}return{updateProximityPrompt:e}}function Jr(n){return`<div style="
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  ">${n}</div>`}function og(n){const t=document.createElement("div");t.id="location-overlay",Object.assign(t.style,{position:"fixed",inset:"0",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.55)",backdropFilter:"blur(3px)",webkitBackdropFilter:"blur(3px)",zIndex:"1000",opacity:"0",pointerEvents:"none",transition:"opacity 0.18s ease"});const e=document.createElement("div");e.id="location-panel",Object.assign(e.style,{width:"min(600px, 80vw)",height:"min(500px, 70vh)",display:"flex",flexDirection:"column",background:"rgba(10,10,20,0.82)",backdropFilter:"blur(16px)",webkitBackdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:"16px",boxShadow:"0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",overflow:"hidden",fontFamily:"Arial, sans-serif",color:"#ffffff",transform:"translateY(12px)",transition:"transform 0.18s ease"});const s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center",gap:"12px",padding:"20px 24px 16px",borderBottom:"1px solid rgba(255,255,255,0.1)",flexShrink:"0"});const r=document.createElement("div");Object.assign(r.style,{width:"4px",height:"28px",borderRadius:"2px",flexShrink:"0",background:"#fff"});const a=document.createElement("h2");Object.assign(a.style,{flex:"1",margin:"0",fontSize:"1.375rem",fontWeight:"700",letterSpacing:"-0.02em",color:"#ffffff"});const o=document.createElement("button");o.textContent="✕",Object.assign(o.style,{width:"32px",height:"32px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.7)",fontSize:"14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.12s ease, color 0.12s ease",flexShrink:"0"}),o.addEventListener("mouseover",()=>{o.style.background="rgba(255,255,255,0.18)",o.style.color="#fff"}),o.addEventListener("mouseout",()=>{o.style.background="rgba(255,255,255,0.08)",o.style.color="rgba(255,255,255,0.7)"}),o.addEventListener("click",()=>{u(),n()}),s.append(r,a,o);const h=document.createElement("div");Object.assign(h.style,{flex:"1",overflowY:"auto",padding:"24px",fontSize:"0.9375rem",lineHeight:"1.65",color:"rgba(255,255,255,0.82)",scrollbarWidth:"thin",scrollbarColor:"rgba(255,255,255,0.2) transparent"});const l=document.createElement("div");Object.assign(l.style,{flexShrink:"0",padding:"12px 24px",borderTop:"1px solid rgba(255,255,255,0.08)",fontFamily:"monospace",fontSize:"12px",color:"rgba(255,255,255,0.38)",letterSpacing:"0.08em",textAlign:"center"}),l.innerHTML='Press <kbd style="display:inline-block;padding:1px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.1);font-family:monospace;font-size:11px;">Esc</kbd> to close and resume driving',e.append(s,h,l),t.appendChild(e),document.body.appendChild(t);function c(f){r.style.background=f.color,a.textContent=f.label,h.innerHTML=f.content,h.scrollTop=0,t.style.opacity="1",t.style.pointerEvents="auto",e.style.transform="translateY(0)"}function u(){t.style.opacity="0",t.style.pointerEvents="none",e.style.transform="translateY(12px)"}return{open:c,close:u}}const{renderer:qc}=fx(),{scene:Sa}=dx(),{camera:Th,update:hg}=gx(window.innerWidth/window.innerHeight),{keys:oo}=vx(),{world:Gh,step:lg}=Gx();tg(Sa,Gh);const{locations:cg}=rg(Sa,Gh),{carState:Jl,preStep:ug,postStep:fg}=Jx(Sa,Gh),{updateProximityPrompt:dg}=ag(),Yc=og(()=>{bs=!1});let bs=!1,Ql=!1;window.addEventListener("keydown",n=>{n.code==="Escape"&&bs&&(bs=!1,Yc.close())});window.addEventListener("resize",()=>{qc.setSize(window.innerWidth,window.innerHeight),Th.aspect=window.innerWidth/window.innerHeight,Th.updateProjectionMatrix()});const tc=1/60;let ec=performance.now(),ho=0;function jc(n){requestAnimationFrame(jc);const t=Math.min((n-ec)/1e3,.05);for(ec=n,ho+=t;ho>=tc;)bs||ug(oo),lg(),ho-=tc;fg();const e=bs?null:pg(Jl.position,cg);dg(e);const s=oo.interact&&!Ql;Ql=oo.interact,s&&e&&!bs&&(bs=!0,Yc.open(e)),hg(Jl),qc.render(Sa,Th)}jc(performance.now());function pg(n,t){let e=null,s=1/0;for(const r of t){const a=n.x-r.position.x,o=n.z-r.position.z,h=Math.sqrt(a*a+o*o);h<r.radius&&h<s&&(e=r,s=h)}return e}
