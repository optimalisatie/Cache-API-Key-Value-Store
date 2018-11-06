/* global module:false */
module.exports = function(grunt) {

    // Grunt configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! Cache API Key/Value Store v<%= pkg.version %>\n * (c) https://github.com/optimalisatie */\n'
        },

        // minify
        uglify: {

            "cache-api-keyval": {
                options: {
                    compress: {
                        global_defs: {
                            "SILENT": false
                        }
                    },
                    mangle: {},
                    dead_code: true,
                    banner: ''
                },
                files: {
                    'min/cache-api-keyval.js': [
                        'src/cache-api-keyval.js'
                    ]
                }
            },

            "cache-api-keyval-silent": {
                options: {
                    compress: {
                        global_defs: {
                            "SILENT": true
                        }
                    },
                    mangle: {},
                    dead_code: true,
                    banner: ''
                },
                files: {
                    'min/cache-api-keyval.silent.js': [
                        'src/cache-api-keyval.js'
                    ]
                }
            }

        },

        // closure compiler
        "closure-compiler": {
            "cache-api-keyval": {
                closurePath: 'closure-compiler',
                js: 'min/cache-api-keyval.js',
                jsOutputFile: 'dist/cache-api-keyval.js',
                maxBuffer: 10000,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: ['cache-api-keyval.ext.js'],
                    define: ['DEBUG=false']
                }
            },

            "cache-api-keyval-silent": {
                closurePath: 'closure-compiler',
                js: 'min/cache-api-keyval.silent.js',
                jsOutputFile: 'dist/cache-api-keyval.silent.js',
                maxBuffer: 10000,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: ['cache-api-keyval.ext.js'],
                    define: ['DEBUG=false']
                }
            }
        }
    });

    // Load Dependencies
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('build', [
        'uglify',
        'closure-compiler'
    ]);
    grunt.registerTask('default', ['']);
};