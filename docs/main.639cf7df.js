!function(c){function e(e){for(var t,r,n=e[0],a=e[1],o=e[2],i=0,s=[];i<n.length;i++)r=n[i],Object.prototype.hasOwnProperty.call(l,r)&&l[r]&&s.push(l[r][0]),l[r]=0;for(t in a)Object.prototype.hasOwnProperty.call(a,t)&&(c[t]=a[t]);for(d&&d(e);s.length;)s.shift()();return f.push.apply(f,o||[]),u()}function u(){for(var e,t=0;t<f.length;t++){for(var r=f[t],n=!0,a=1;a<r.length;a++){var o=r[a];0!==l[o]&&(n=!1)}n&&(f.splice(t--,1),e=i(i.s=r[0]))}return e}var r={},l={0:0},f=[];function i(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return c[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=c,i.c=r,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var t=window.webpackJsonp=window.webpackJsonp||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var a=0;a<t.length;a++)e(t[a]);var d=n;f.push([99,1]),u()}({141:function(e,t,r){},142:function(e,t,r){},147:function(e,t){},149:function(e,t){},162:function(e,t,r){},163:function(e,t,r){},164:function(e,t,r){"use strict";r.r(t);var b=r(0),k=r.n(b),n=r(97),a=r.n(n),o=(r(33),r(36),r(45),r(38),r(41),r(53),r(114),r(122),r(123),r(52),r(126),r(128),r(98)),d=r.n(o);function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function v(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var N=function(){function r(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),this._offset=0,this._dv=new DataView(e),this.name=t,this.frames=[],this.layers=[],this.tags=[],this.fileSize,this.numFrames,this.width,this.height,this.colorDepth,this.numColors,this.pixelRatio}return function(e,t,r){t&&i(e.prototype,t),r&&i(e,r)}(r,[{key:"readNextByte",value:function(){var e=this._dv.getUint8(this._offset,!0);return this._offset+=1,e}},{key:"readByte",value:function(e){return this._dv.getUint8(e,!0)}},{key:"readNextWord",value:function(){var e=this._dv.getUint16(this._offset,!0);return this._offset+=2,e}},{key:"readWord",value:function(e){return this._dv.getUint16(e,!0)}},{key:"readNextShort",value:function(){var e=this._dv.getInt16(this._offset,!0);return this._offset+=2,e}},{key:"readShort",value:function(e){return this._dv.getInt16(e,!0)}},{key:"readNextDWord",value:function(){var e=this._dv.getUint32(this._offset,!0);return this._offset+=4,e}},{key:"readDWord",value:function(e){return this._dv.getUint32(e,!0)}},{key:"readNextLong",value:function(){var e=this._dv.getInt32(this._offset,!0);return this._offset+=4,e}},{key:"readLong",value:function(e){return this._dv.getInt32(e,!0)}},{key:"readNextFixed",value:function(){var e=this._dv.getFloat32(this._offset,!0);return this._offset+=4,e}},{key:"readFixed",value:function(e){return this._dv.getFloat32(e,!0)}},{key:"readNextBytes",value:function(e){for(var t=new ArrayBuffer(e),r=new DataView(t),n=0;n<e;n++)r.setUint8(n,this.readNextByte());return this.Utf8ArrayToStr(new Uint8Array(t))}},{key:"readNextRawBytes",value:function(e){for(var t=new ArrayBuffer(e),r=new DataView(t),n=0;n<e;n++)r.setUint8(n,this.readNextByte());return new Uint8Array(t)}},{key:"readRawBytes",value:function(e,t,r){for(var n=new ArrayBuffer(e-r),a=new DataView(n),o=0;o<e-r;o++)a.setUint8(o,t.getUint8(r+o,!0));return new Uint8Array(n)}},{key:"readNextString",value:function(){var e=this.readNextWord();return this.readNextBytes(e)}},{key:"skipBytes",value:function(e){this._offset+=e}},{key:"Utf8ArrayToStr",value:function(e){var t,r,n,a,o,i;for(t="",n=e.length,r=0;r<n;)switch((a=e[r++])>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:t+=String.fromCharCode(a);break;case 12:case 13:o=e[r++],t+=String.fromCharCode((31&a)<<6|63&o);break;case 14:o=e[r++],i=e[r++],t+=String.fromCharCode((15&a)<<12|(63&o)<<6|(63&i)<<0)}return t}},{key:"readHeader",value:function(){this.fileSize=this.readNextDWord(),this.readNextWord(),this.numFrames=this.readNextWord(),this.width=this.readNextWord(),this.height=this.readNextWord(),this.colorDepth=this.readNextWord(),this.skipBytes(18),this.numColors=this.readNextWord();var e=this.readNextByte(),t=this.readNextByte();return this.pixelRatio="".concat(e,":").concat(t),this.skipBytes(92),this.numFrames}},{key:"readFrame",value:function(){var e=this.readNextDWord();this.skipBytes(2);var t=this.readNextWord(),r=this.readNextWord();this.skipBytes(2);var n=this.readNextDWord();console.log({bytesInFrame:e,oldChunk:t,frameDuration:r,newChunk:n});for(var a=[],o=0;o<n;o++){var i=this.readChunk();switch(i.type){case 4:case 17:case 8214:case 8215:case 8224:case 8226:this.skipBytes(i.chunkSize-6);break;case 8196:console.log("Layer"),this.readLayerChunk();break;case 8197:console.log("Cel");var s=this.readCelChunk(i.chunkSize);a.push(s);break;case 8199:this.readColorProfileChunk();break;case 8216:this.readFrameTagsChunk();break;case 8217:console.log("Palette"),this.palette=this.readPaletteChunk()}}this.frames.push({bytesInFrame:e,frameDuration:r,numChunks:n,cels:a})}},{key:"readColorProfileChunk",value:function(){var e=this.readNextWord(),t=this.readNextWord(),r=this.readNextFixed();this.skipBytes(8),console.log({type:e,flag:t,fGamma:r}),this.colorProfile={type:e,flag:t,fGamma:r}}},{key:"readPaletteChunk",value:function(){var e=this.readNextDWord(),t=this.readNextDWord(),r=this.readNextDWord();this.skipBytes(8);for(var n=[],a=0;a<e;a++){var o=this.readNextWord(),i=this.readNextByte(),s=this.readNextByte(),c=this.readNextByte(),u=this.readNextByte(),l=void 0;1===o&&(l=this.readNextString()),n.push({red:i,green:s,blue:c,alpha:u,name:void 0!==l?l:"none"})}return console.log({paletteSize:e,firstColor:t,secondColor:r,colors:n}),{paletteSize:e,firstColor:t,lastColor:r,colors:n}}},{key:"readLayerChunk",value:function(){var e=this.readNextWord(),t=this.readNextWord(),r=this.readNextWord();this.skipBytes(4);var n=this.readNextWord(),a=this.readNextByte();this.skipBytes(3);var o=this.readNextString();this.layers.push({flags:e,type:t,layerChildLevel:r,blendMode:n,opacity:a,name:o}),console.log({flags:e,type:t,layerChildLevel:r,blendMode:n,opacity:a,name:o})}},{key:"readCelChunk",value:function(e){var t=this.readNextWord(),r=this.readNextShort(),n=this.readNextShort(),a=this.readNextByte(),o=this.readNextWord();this.skipBytes(7),console.log(this._offset);var i,s,c,u,l,f={};return 1!==o?(i=this.readNextWord(),s=this.readNextWord(),c=this.readNextRawBytes(e-26),2===o?u=d.a.inflate(c):0===o&&(u=c)):l=this.readNextWord(),void 0!==i?(f.w=i,f.h=s,f.rawCelData=u):f.linkedFrame=l,console.log({layerIndex:t,x:r,y:n,opacity:a,celType:o,w:i,h:s}),function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(r,!0).forEach(function(e){v(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}({layerIndex:t,xpos:r,ypos:n,opacity:a,celType:o},f)}},{key:"readChunk",value:function(){var e=this.readNextDWord(),t=this.readNextWord();return console.log({cSize:e,type:t}),{chunkSize:e,type:t}}},{key:"readFrameTagsChunk",value:function(){var e=["Forward","Reverse","Ping-pong"],t=this.readNextWord();this.skipBytes(8);for(var r=0;r<t;r++){var n={};n.from=this.readNextWord(),n.to=this.readNextWord();var a=this.readNextByte();n.animDirection=e[a],this.skipBytes(8),n.color=this.readNextRawBytes(3).toString("hex"),this.skipBytes(1),n.name=this.readNextString(),this.tags.push(n)}}},{key:"parse",value:function(){for(var e=this.readHeader(),t=0;t<e;t++)this.readFrame()}}]),r}();r(141);function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(a)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function C(t){function e(){var e=t.colors[n];return"".concat(e.red.toString(16)).concat(e.green.toString(16)).concat(e.blue.toString(16))}var r=s(Object(b.useState)(0),2),n=r[0],a=r[1],o=t.colors.map(function(e,t){return k.a.createElement("div",{key:"color_".concat(t),className:"ase-palette-color ".concat(t===n?"active-color":""),style:{background:"rgba(".concat(e.red,", ").concat(e.green,", ").concat(e.blue,", ").concat(e.alpha,")")},onClick:function(){return function(e){a(e)}(t)}},k.a.createElement("div",{className:"ase-palette-hover"},"r: ".concat(e.red,", g: ").concat(e.green,", b: ").concat(e.blue,", a: ").concat(e.alpha)))});return k.a.createElement("div",{className:"ase-palette"},o,k.a.createElement("div",{className:"ase-palette-active"},k.a.createElement("div",{className:"ase-palette-active-preview",style:{background:"#".concat(e())}}),k.a.createElement("div",{className:"ase-palette-active-hex"},"#".concat(e())),k.a.createElement("div",{className:"ase-palette-active-alpha"},"Alpha: ".concat(t.colors[n].alpha))))}r(142),r(143);function c(e,t,r,n,a,o,i){try{var s=e[o](i),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,a)}function S(s){return function(){var e=this,i=arguments;return new Promise(function(t,r){var n=s.apply(e,i);function a(e){c(n,t,r,a,o,"next",e)}function o(e){c(n,t,r,a,o,"throw",e)}a(void 0)})}}function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(a)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function u(a){var n,o,e=B(Object(b.useState)({}),2),i=e[0],s=e[1],t=B(Object(b.useState)(null),2),c=t[0],u=t[1],l=Object(b.useRef)(null),f=Object(b.useRef)(null),d={},r=function(){var t=S(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(r=new FileReader).onload=function(){var t=S(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(r=new N(t.target.result,a.name)).parse(),(n=l.current.getContext("2d")).canvas.width=800,n.canvas.height=600,d.x=400,d.y=300,w(n),s(r),u(0);case 10:case"end":return e.stop()}},e)}));return function(e){return t.apply(this,arguments)}}(),r.readAsArrayBuffer(t);case 3:case"end":return e.stop()}},e)}));return function(e){return t.apply(this,arguments)}}();function h(e){var t=i.frames[c].cels[e];if(console.log(t),void 0===t.linkedFrame){var r=l.current.getContext("2d"),n=f.current.getContext("2d");n.clearRect(0,0,f.width,f.height),n.width=i.width,n.height=i.height;for(var a=n.createImageData(t.w,t.h),o=0;o<t.rawCelData.byteLength;o++)a.data[o]=t.rawCelData[o];n.putImageData(a,t.xpos,t.ypos),r.drawImage(f.current,0,0)}}function v(){var e=l.current.getContext("2d");e.imageSmoothingEnabled=!1,e.scale(1,1),m()}function p(e){var t=l.current.getContext("2d"),r=t.transformedPoint(d.x,d.y);t.translate(r.x,r.y);var n=Math.pow(1.1,e);t.scale(n,n),t.translate(-r.x,-r.y),v()}Object(b.useEffect)(function(){r(a.file)},[a.file]),Object(b.useEffect)(function(){void 0!==i.name&&(g(),x(),m())},[c]);var y,m=function(){var e=l.current.getContext("2d");e.save(),g(),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,l.current.width,l.current.height),x(),e.restore();for(var t=i.frames[c].cels.length,r=0;r<t;r++)h(r)},g=function(){var e=l.current.getContext("2d"),t=e.transformedPoint(0,0),r=e.transformedPoint(l.width,l.height);e.clearRect(t.x,t.y,r.x-t.x,r.y-t.y)},x=function(){f.current.getContext("2d").clearRect(0,0,i.width,i.height)},w=function(s){var c=document.createElementNS("http://www.w3.org/2000/svg","svg"),u=c.createSVGMatrix();s.getTransform=function(){return u};var e=[],t=s.save;s.save=function(){return e.push(u.translate(0,0)),t.call(s)};var r=s.restore;s.restore=function(){return u=e.pop(),r.call(s)};var n=s.scale;s.scale=function(e,t){return u=u.scaleNonUniform(e,t),n.call(s,e,t)};var a=s.rotate;s.rotate=function(e){return u=u.rotate(180*e/Math.PI),a.call(s,e)};var o=s.translate;s.translate=function(e,t){return u=u.translate(e,t),o.call(s,e,t)};var l=s.transform;s.transform=function(e,t,r,n,a,o){var i=c.createSVGMatrix();return i.a=e,i.b=t,i.c=r,i.d=n,i.e=a,i.f=o,u=u.multiply(i),l.call(s,e,t,r,n,a,o)};var i=s.setTransform;s.setTransform=function(e,t,r,n,a,o){return u.a=e,u.b=t,u.c=r,u.d=n,u.e=a,u.f=o,i.call(s,e,t,r,n,a,o)};var f=c.createSVGPoint();s.transformedPoint=function(e,t){return f.x=e,f.y=t,f.matrixTransform(u.inverse())}};return void 0!==i.name&&(y=k.a.createElement(C,{colors:i.palette.colors})),k.a.createElement("div",{className:"ase-preview-container"},void 0!==i.name?k.a.createElement("span",{className:"ase-preview-file-info"},"".concat(i.name," ").concat(function(e,t){if(0===e)return"0 Byte";var r=t+1||3,n=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,n)).toFixed(r))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][n]}(i.fileSize,2))):"",k.a.createElement("canvas",{ref:f,style:{display:"none"}}),k.a.createElement("div",{className:"ase-preview-image"},k.a.createElement("div",{className:"ase-palette-container"},y),k.a.createElement("div",{className:"ase-preview-image-view"},k.a.createElement("canvas",{className:"",ref:l,onWheel:function(e){!function(e){console.log(1),console.log("DeltaX: ",e.deltaX," DeltaY: ",e.deltaY," DeltaZ: ",e.deltaZ);var t=e.deltaY?e.deltaY/40:0;t&&p(t)}(e)},onMouseDown:function(e){!function(e){var t=l.current.getContext("2d");d.x=e.offsetX||e.pageX-l.current.offsetLeft,d.y=e.offsetY||e.pageY-l.current.offsetTop,n=t.transformedPoint(d.x,d.y),o=!1}(e)},onMouseMove:function(e){!function(e){var t=l.current.getContext("2d");if(null!==n){d.x=e.offsetX||e.pageX-l.current.offsetLeft,d.y=e.offsetY||e.pageY-l.current.offsetTop,o=!0;var r=t.transformedPoint(d.x,d.y);t.translate(r.x-n.x,r.y-n.y),v()}}(e)},onMouseUp:function(e){!function(e){n=null,o||p(e.shiftKey?-1:1)}(e)}}))),k.a.createElement("div",{className:"ase-preview-timeline"},k.a.createElement("div",{className:"ase-preview-frames"},void 0!==i.name?i.frames.map(function(e,t){return k.a.createElement("div",{key:"frame_".concat(t),className:"ase-preview-frame ".concat(t===c?"active":""),onClick:function(){return function(e){u(e)}(t)}},"".concat(t+1))}):"")))}r(162);function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(a)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function f(e){var t,r=Object(b.useRef)(null),n=l(Object(b.useState)([]),2),a=n[0],o=n[1];return 0<a.length&&(t=k.a.createElement(u,{key:a[0].name,name:a[0].name,file:a[0]})),k.a.createElement(k.a.Fragment,null,k.a.createElement("div",{className:"file-upload-wrapper"},k.a.createElement("button",{className:"file-upload-button",onClick:function(){r.current.click()},onDrop:function(e){return function(e){e.stopPropagation(),e.preventDefault(),r.current.onDrop(e)}(e)}},e.text),k.a.createElement("input",{accept:e.accept,ref:r,type:"file",multiple:e.multiple,name:e.name,onChange:function(e){return function(e){for(var t=e.target.files,r=t.length,n=[],a=0;a<r;a++)n.push(t[a]);o(n)}(e)}})),t)}function p(e){return k.a.createElement("div",null,k.a.createElement(f,{preview:!0,accept:".ase, .aseprite",name:"file",text:"Upload a file"}))}r(163);a.a.render(k.a.createElement(p,null),document.getElementById("root"))},99:function(e,t,r){e.exports=r(164)}});