const C='fincas-v2-39-20261119';
const A=['./','index.html','config.js','manifest.webmanifest','icon-192.png','icon-512.png'];
// Librerías externas (mismas versiones que index.html): se precargan para que la app funcione sin conexión desde la primera instalación.
const CDN=['https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css','https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(A);await Promise.all(CDN.map(u=>fetch(new Request(u,{mode:'no-cors'})).then(r=>c.put(u,r)).catch(()=>{})))}));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 if(u.origin!==location.origin&&!['cdn.jsdelivr.net','cdnjs.cloudflare.com'].includes(u.hostname))return;
 e.respondWith(caches.open(C).then(async cache=>{try{const response=await fetch(e.request);if(response.ok||response.type==='opaque')cache.put(e.request,response.clone());return response}catch{return (await cache.match(e.request))||(e.request.mode==='navigate'?(await cache.match('index.html')||await cache.match('./')):null)||Response.error()}}))});
