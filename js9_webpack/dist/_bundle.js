!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=(e,t)=>{let n=document.getElementsByTagName("main")[0];e.forEach(function(e){imageElement=document.createElement("img"),imageElement.src=e.src,headerElement=document.createElement("p"),choseElement=document.createElement("span"),choseElement.className="fa fa-star"+(storageAPI.isInStorage(e.id)?"":"-o")+" icon",choseElement.addEventListener("mousedown",function(e){let t=this.closest(".film-element").getAttribute("id");storageAPI.isInStorage(t)?storageAPI.removeInStorage(t):storageAPI.addInStorage(t),this.className="fa fa-star"+(storageAPI.isInStorage(t)?"":"-o")+" icon"}),headerElement.innerText=e.text,divElement=document.createElement("div"),divElement.className="film-element",divElement.setAttribute("id",e.id),divElement.appendChild(headerElement),divElement.appendChild(choseElement),divElement.appendChild(imageElement),imageElement.addEventListener("mousedown",function(e){let n=this.closest(".film-element").getAttribute("id");t(n,this.closest(".film-element").getElementsByTagName("span")[0])}),n.appendChild(divElement)})},a=()=>{let e=document.getElementsByTagName("main")[0];Array.from(e.getElementsByClassName("film-element")).forEach(t=>{e.removeChild(t)})},o=e=>{let t,n,r=document.getElementById("search-container");Array.from(r.getElementsByTagName("input")).forEach(e=>{"text"==e.type?t=e:"checkbox"==e.type&&(n=e)});let a=r.getElementsByClassName("static")[0];t.addEventListener("keydown",a=>{13==a.keyCode&&t.value&&(e(t.value),(r=document.getElementById("search-danger")).innerText="",n.checked=!0)}),a.addEventListener("mousedown",a=>{t.value?(e(t.value),(r=document.getElementById("search-danger")).innerText="",n.checked=!0):n.checked=!1})},l=(e="")=>{let t,n=document.getElementById("search-container");Array.from(n.getElementsByTagName("input")).forEach(e=>{"checkbox"==e.type&&(t=e)}),t.checked=!1,(n=document.getElementById("search-danger")).innerText=e},i=async(e,t)=>{let n="http://www.omdbapi.com/?s="+encodeURI(e.toLowerCase())+"&apikey=d5677312";try{let r=await fetch(n);t(await r.json())}catch(e){console.log(e),t(null,"Ошибка сервера")}},m=(e,t)=>{api.detail(e,(e,n="")=>{elementObject=t,document.getElementById("modal").style.display="block";let r=document.getElementById("modal"),a=r.getElementsByTagName("p");r.getElementsByTagName("img")[0].src=e.Poster&&"N/A"!=e.Poster?e.Poster:"image/not_found.jpg",r.getElementsByTagName("span")[0].className="fa fa-star"+(storageAPI.isInStorage(e.imdbID.trim())?"":"-o")+" icon",filmId=e.imdbID.trim();let o=(e,t)=>{e.getElementsByTagName("span")[0].innerText="N/A"!=t?t:"Информация недоступна"};o(a[0],e.Title),o(a[1],e.Released),o(a[2],e.Plot),o(a[3],e.Country),o(a[4],e.Language),o(a[5],e.imdbRating)})};document.getElementById("modal").getElementsByTagName("span")[0].addEventListener("mousedown",function(e){let t=filmId;storageAPI.isInStorage(t)?storageAPI.removeInStorage(t):storageAPI.addInStorage(t);let n="fa fa-star"+(storageAPI.isInStorage(t)?"":"-o")+" icon";this.className=n,elementObject.className=n}),document.getElementById("modal").addEventListener("mousedown",function(e){"span"!=e.target.localName&&(this.style.display="none")}),o(e=>{i(e,(e,t=null)=>{a(),e&&e.Search?(contentList=[],Array.from(e.Search).forEach(e=>{contentList.push({src:"N/A"!=e.Poster?e.Poster:"image/not_found.jpg",text:e.Title+" "+("N/A"!=e.Year?`(${e.Year} год)`:""),id:e.imdbID.trim()})}),r(contentList,m),l()):t||e.Search?l(t||""):l("Поиск не дал результатов")})})}])}]);