const progressify_cache = "{{CACHE_NAME}}"
const assets = "{{ASSET_LIST}}";

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(progressify_cache).then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener('activate',(e)=>{
    e.waitUntil(
        caches.keys().then(key_list=>{
                return Promise.all(key_list.map(key=>{
                    if (key === progressify_cache) {
                        return;
                    }
                    return caches.delete(key);
                }));
            }
        )
    );
});