// Closure Compiler externs
// @link https://developers.google.com/closure/compiler/

var global;
window.CacheApiDB = global.CacheApiDB = this.CacheApiDB = self.CacheApiDB = window.onCacheApiDB = global.onCacheApiDB = this.onCacheApiDB = self.onCacheApiDB = function(store, options) {

    options.namespace = '';

    return {
        no: 1,
        get: function() {},
        set: function() {},
        del: function() {},
        prune: function() {}
    }
}

window.CacheApiDBFallback = global.CacheApiDBFallback = this.CacheApiDBFallback = self.CacheApiDBFallback = window.CacheApiDB;

function CACHE(store, options) {
    this.no = 1;
}

// public get method
CACHE.prototype.get = function(key) {}

// public set method
CACHE.prototype.set = function(key, value, expire) {}

// public delete method
CACHE.prototype.del = function(key) {}

// public cache prune method
CACHE.prototype.prune = function() {}

var cache_headers = {
    "x-date": '',
    "x-expire": '',
    "Content-Type": ''
};