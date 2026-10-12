const C='fincas-v2-test-3';
const A=['./','index.html','config.js','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 if(u.origin!==location.origin&&!['cdn.jsdelivr.net','cdnjs.cloudflare.com'].includes(u.hostname))return;
 e.respondWith(caches.open(C).then(async cache=>{try{const response=await fetch(e.request);if(response.ok||response.type==='opaque')cache.put(e.request,response.clone());return response}catch{return (await cache.match(e.request))||Response.error()}}))});
