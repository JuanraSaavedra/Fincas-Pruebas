const C='fincas-v3-0-20261122';
const A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
// Librerías opcionales (mapa, Excel, PDF): se guardan en segundo plano para poder usarlas sin conexión. No bloquean la instalación.
const CDN=['https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'];
const HOSTS=['cdnjs.cloudflare.com','cdn.jsdelivr.net'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(A);CDN.forEach(u=>{fetch(u).then(r=>{if(r.ok)return c.put(u,r)}).catch(()=>{})})}));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 if(u.origin!==location.origin&&!HOSTS.includes(u.hostname))return;
 e.respondWith(caches.open(C).then(async cache=>{try{const response=await fetch(e.request);if(response.ok||response.type==='opaque')cache.put(e.request,response.clone());return response}catch{return (await cache.match(e.request))||(e.request.mode==='navigate'?(await cache.match('index.html')||await cache.match('./')):null)||Response.error()}}))});
