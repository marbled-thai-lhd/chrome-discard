!function(){"use strict";const a=async(a,e=!1,t=(()=>{}))=>{let c=!0;if(!e){const e=await chrome.tabs.get(a);e&&(async a=>{const e=(a=>`except_${new URL(a).hostname}`)(a);return await(async a=>await chrome.storage.local.get([a])[a])(e)})(e.url)||(c=!1)}return c&&await chrome.tabs.discard(a)};chrome.runtime.onInstalled.addListener((()=>{chrome.storage.local.set({activated:!1}),chrome.commands.onCommand.addListener((async e=>{if("cleanUp"==e)return(async()=>{(await(async()=>await chrome.tabs.query({}))()).forEach((e=>!e.discarded&&a(e.id)))})()})),(async()=>{await chrome.alarms.clearAll()})()}))}();