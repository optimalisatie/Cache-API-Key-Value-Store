/**
 * Cache API key/value store - github.com/optimalisatie/Cache-API-Key-Value-Store
 * Released under the terms of MIT license
 *
 * Copyright (C) 2018 github.com/optimalisatie
 */

(function(factory) {

    var _root = ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this);

    function print_error(msg) {
        if (console) {
            console.error(msg);
        }
    }

    var queue = [];
    _root.onCacheApiDB = function(callback) {
        if (_root.CacheApiDB) {
            callback();
        } else {
            queue.push(callback);
        }
    }

    // set cache api db controller
    function setCacheApiDB(factory) {

        _root.CacheApiDB = factory;

        // process callback queue
        var callback = queue.shift();
        while (callback) {
            callback();
        }
    }

    if (!_root.CacheApiDBFallback) {
        _root.CacheApiDBFallback = function() {
            var that = this;
            that.supported = 0;
            ['get', 'set', 'del', 'prune'].forEach(function(method) {
                that[method] = function() {
                    return Promise.reject(error);
                }
            });
        }
    }

    // detect Cache API support
    if (!(caches instanceof CacheStorage)) {
        print_error('Browser does not support Cache API');
        _root.CacheApiDB = _root.CacheApiDBFallback;
    } else {

        // test cache support
        // Cache API could be blocked by browser privacy settings
        caches.open('x').catch(function(e) {
            if (e.name == 'SecurityError') {
                print_error('Cache API is blocked by browser. Please check privacy settings (cookies, no-track option etc).');
            } else {
                print_error('Cache API error: ' + e.message);
            }
            setCacheApiDB(_root.CacheApiDBFallback);
        }).then(function() {
            setCacheApiDB(factory());
        })

    }
})(function() {

    var DATE_HEADER = 'x-date';
    var EXPIRE_HEADER = 'x-expire';
    var CONTENT_TYPE_HEADER = 'Content-Type';

    // return timestamp
    function NOW() {
        return Math.round(Date.now() / 1000);
    }

    // open cache storage
    function CACHE_OPEN(store, callback) {
        return caches.open(store).then(callback);
    }

    // return cache key
    function CACHE_KEY(key) {
        return new Request(STRING(key || ''));
    }

    // get key from cache
    function CACHE_GET(store, key) {
        return CACHE_OPEN(store, function(cache) {

            var cache_key = CACHE_KEY(key);

            return cache.match(cache_key).then(function(cachedata) {

                // handle expiration
                if (!cachedata || CACHE_EXPIRED(cachedata)) {
                    return false;
                }

                return cachedata.json();
            });

        });
    }

    // set key in cache
    function CACHE_SET(store, key, data, expire) {
        return CACHE_OPEN(store, function(cache) {

            var cache_key = CACHE_KEY(key);

            var cache_headers = {};

            // cache date
            cache_headers[DATE_HEADER] = NOW();

            // JSON
            cache_headers[CONTENT_TYPE_HEADER] = 'application/json';
            data = JSON.stringify(data);

            // expire time
            if (expire) {
                expire = parseInt(expire);
                if (isNaN(expire) || expire < 0) {
                    ERROR('Expire time not numeric');
                }
                cache_headers[EXPIRE_HEADER] = STRING(expire);
            }

            var cache_data = new Response(data, {
                headers: cache_headers
            });

            return cache.put(cache_key, cache_data);

        });
    }

    // return cache expired state
    function CACHE_EXPIRED(cachedata) {
        var exp = cachedata.headers.get(EXPIRE_HEADER);
        if (exp) {

            var date = cachedata.headers.get(DATE_HEADER);

            // expired
            if ((date + exp) < NOW()) {
                CACHE_DELETE(store, key);
                return true;
            }
        }
    }

    // set key in cache
    function CACHE_DELETE(store, key) {
        return CACHE_OPEN(store, function(cache) {
            var cache_key = CACHE_KEY(key);
            return cache.delete(cache_key);
        });
    }

    // set key in cache
    function CACHE_PRUNE(store, key) {
        return CACHE_OPEN(store, function(cache) {

            // get all keys from store
            return cache.keys().then(function(keys) {

                var queries = [];

                // read all entries in cache
                keys.forEach(function(cache_key) {
                    //cacheRequests.push(cache_key);
                    queries.push(cache.match(cache_key));
                });

                // process cache data
                return Promise.all(queries)
                    .then(function(cacheEntries) {

                        cacheEntries.forEach(function(cachedata, key) {

                            // run expired check, auto-deletes expired entry
                            CACHE_EXPIRED(cachedata);
                        });
                    });
            });
        });
    }

    // cache api constructor
    function CACHE(store, options) {
        var that = this;
        if (that instanceof CACHE) {
            that.store = store;
            that.supported = 1;

            if (IS_OBJECT(options)) {
                if (options.namespace) {
                    that.ns = options.namespace;
                }
            }
        } else {

            // instantiate
            return new CACHE(store, options);
        }
    }

    // return namespaced key
    function NAMESPACE(ns, key) {
        return ((ns) ? ns + ':' : '') + key;
    }

    // return string
    function STRING(str) {
        return str.toString();
    }

    // detect if object
    function IS_OBJECT(obj) {
        return typeof obj == 'object';
    }

    // output error
    function ERROR(msg) {
        throw new Error(msg);
    }

    // public get method
    CACHE.prototype.get = function(key) {
        return CACHE_GET(this.store, NAMESPACE(this.ns, key));
    }

    // public set method
    CACHE.prototype.set = function(key, value, expire) {
        return CACHE_SET(this.store, NAMESPACE(this.ns, key), value);
    }

    // public delete method
    CACHE.prototype.del = function(key) {
        return CACHE_DELETE(this.store, NAMESPACE(this.ns, key));
    }

    // public cache prune method
    CACHE.prototype.prune = function() {
        return CACHE_PRUNE(this.store);
    }

    // cache api constructor
    return CACHE;

});