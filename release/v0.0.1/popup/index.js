!function(){"use strict";!function(){const e="__except__",n=n=>`${e}${new URL(n).origin}`,t=async()=>{const a=await(async()=>Object.keys(await chrome.storage.local.get(null)).filter((n=>0==n.indexOf(e))).map((n=>n.replace(e,""))))(),c=document.getElementById("exceptionList");c.innerHTML=null,a.forEach((e=>{const a=document.createElement("li"),o=document.createElement("span");o.innerText="-",o.onclick=()=>(async e=>{await(async e=>{const t=n(e);await chrome.storage.local.remove(t)})(e),t()})(e),a.innerHTML=`<span>${e}</span>`,a.appendChild(o),c.appendChild(a)}))};document.getElementById("addExeptions").onclick=async()=>{const e=await(async()=>{const e=await(async(e={})=>await chrome.tabs.query(e))({active:!0});return 0==e.length?null:e[0]})();let a="";e&&(a=new URL(e.url).origin);const c=prompt("Except url",a);c&&(await(async e=>{const t={};t[n(e)]=!0,await chrome.storage.local.set(t)})(c),t())},document.getElementById("managePage").onclick=()=>{window.open(chrome.runtime.getURL("manage/index.html"))},t()}()}();