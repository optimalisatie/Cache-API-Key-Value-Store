![Version](https://img.shields.io/github/release/optimalisatie/Cache-API-Key-Value-Store.svg) [![npm version](https://badge.fury.io/js/cache-api-keyval.svg)](http://badge.fury.io/js/cache-api-keyval)

# Cache API Key/Value Store

Fast and tiny key/value store with +50MB storage capacity in [most browsers](https://developer.mozilla.org/en-US/docs/Web/API/Cache#Browser_compatibility), expiration and JSON object data-type support.

Cache API is currently available in Chrome >= 40, Firefox >=39 and Opera >= 27.

Safari and Edge recently introduced support for it.

# Install

```
npm install --save cache-api-keyval
```

# Use

```html
<script src="/cache-api-keyval-full.js"></script>
<script>

// load database
var db = new CacheApiDB('my-store', { namespace: 'optional' });

// set JSON object data
db.set('key', { json: 'object' }); 

// set text data with expiration in 24 hours
db.set('key2', 'string', 86400); 

// get data from cache
db.get('key').then(function(json) {
    console.log('json object', json);
});

// delete key from database
db.del('key2'); 

// prune expired cache entries
db.prune();

// if no fallback is provided, all methods will reject and the constructor will contain `no` with integer 1.
if (db.no === 1) { // === 1 is optional
    // Cache API is not supported by the browser
}

// optional: wait for async browser check to complete
// the test checks if Cache API is blocked by privacy or cookie settings
// when blocked, the fallback storage is loaded
onCacheApiDB(function() {

    /* initiate database with certain availability */

});
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

## Tinier

The complete library provides a fallback mechanism, a check to detect if Cache API is blocked by browser privacy settings and cache expire functionality. While at `871 bytes` compressed it is small, some users may prefer just the `key/val` part with optional expire functionality.

_cache-api-keyval-no-fallback.js_ is a stripped version without error reporting and fallback mechanism with a size of `688 bytes`. _cache-api-keyval-no-fallback-expire.js_ is further stripped of expire functionality for a compressed size of `461 bytes`.


```html
<script src="/cache-api-keyval-no-fallback-expire.js"></script>
<script>

// check if Cache API is available
if ("caches" in window) {

    // load database
    var db = new CacheApiDB('my-store', { namespace: 'optional' });

    // ...
}
