// Closure Compiler externs
// @link https://developers.google.com/closure/compiler/

var global;
window.CacheApiDB = global.CacheApiDB = this.CacheApiDB = self.CacheApiDB = window.onCacheApiDB = global.onCacheApiDB = this.onCacheApiDB = self.onCacheApiDB = function(store, options) {

    options.namespace = '';

    return {
        supported: false,
        get: function() {},
        set: function() {},
        del: function() {},
        prune: function() {}
    }
}

var cache_headers = {
    "x-date": '',
    "x-expire": '',
    "Content-Type": ''
};