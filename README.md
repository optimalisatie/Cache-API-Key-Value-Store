![Version](https://img.shields.io/github/release/optimalisatie/cache-api-keyval-store.svg)

# Cache API Key/Value Store

Fast and tiny key/value store with +50MB storage capacity in [most browsers](https://developer.mozilla.org/en-US/docs/Web/API/Cache#Browser_compatibility), expiration and JSON object data-type.

Cache API is currently available in Chrome >= 40, Firefox >=39 and Opera >= 27.

Safari and Edge recently introduced support for it.

# Install

```
npm install --save cache-api-keyval
```

# Use

```html
<script src="/cache-api-keyval.js"></script>
<script>

// load database
var db = new CacheApiDB('my-store', { namespace: 'optional' });

if (db.supported) { // Cache API supported by browser

    // set JSON object data
    db.set('key', { json: 'object' }); 

    // set text data with expiration in 24 hours
    db.set('key2', 'string', 86400); 

    // get data from cache
    db.get('key').then(function(json) {
        console.log('json object', json);
    });

    // prune expired cache entries
    db.prune();

}
</script>
```

## Fallback storage

To enable a fallback storage for browsers that do not yet support Cache API, you can define a constructor on global variable `CacheApiDBFallback`. The constructor needs to provide 4 methods: `set`, `get`, `del` and `prune`.

```js
window.CacheApiDBFallback = function(store, options) {
    this.get = function(key) { /* return key from store */ }
    this.set = function(key,data,expire) { /* set key in store */ }
    this.del = function(key) { /* delete key from store */ }
    this.prune = function() { /* cleanup database */ }
};
```