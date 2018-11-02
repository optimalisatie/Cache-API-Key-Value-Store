// Closure Compiler externs
// @link https://developers.google.com/closure/compiler/

window.CacheApiDB = global.CacheApiDB = this.CacheApiDB = self.CacheApiDB = function(store, options) {

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