/* global module:false */
module.exports = function(grunt) {

    // Grunt configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! Cache API Key/Value Store v<%= pkg.version %>\n * (c) https://github.com/optimalisatie */\n'
        },

        // closure compiler
        "closure-compiler": {
            "cache-api-keyval": {
                closurePath: 'closure-compiler',
                js: 'src/cache-api-keyval-full.js',
                jsOutputFile: 'dist/cache-api-keyval-full.js',
                maxBuffer: 10000,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: ['cache-api-keyval.ext.js'],
                    define: ['DEBUG=false']
                },
                noreport: true
            },

            // no fallback and error messages
            "cache-api-keyval-no-fallback": {
                closurePath: 'closure-compiler',
                js: 'src/cache-api-keyval-no-fallback.js',
                jsOutputFile: 'dist/cache-api-keyval-no-fallback.js',
                maxBuffer: 10000,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: ['cache-api-keyval.ext.js'],
                    define: ['DEBUG=false']
                },
                noreport: true
            },

            // no fallback, errors and expire
            "cache-api-keyval-no-fallback-expire": {
                closurePath: 'closure-compiler',
                js: 'src/cache-api-keyval-no-fallback-expire.js',
                jsOutputFile: 'dist/cache-api-keyval-no-fallback-expire.js',
                maxBuffer: 10000,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: ['cache-api-keyval.ext.js'],
                    define: ['DEBUG=false']
                },
                noreport: true
            }
        }
    });

    // Load Dependencies
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('build', [
        'closure-compiler'
    ]);
    grunt.registerTask('default', ['']);
};