var path = require("path");

module.exports = function(grunt) {
  "use strict";
  var jsFiles = ["Gruntfile.js", "src/**/*.js"];

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Run JSHint on all sources
    jshint: {
      options: {
        jshintrc: "./.jshintrc"
      },
      all: jsFiles
    },

    // JSBeautifier on all sources
    jsbeautifier: {
      standard: {
        src: jsFiles,
        options: {
          js: grunt.file.readJSON(".jsbeautifyrc")
        }
      }
    },

    // browserify for packing all commonjs files
    browserify: {
      client: {
        src: ["src/QRCode.js"],
        dest: "lib/qrcode.js",
        options: {
          standalone: "QRCode"
        }
      }
    },

    // uglify for compression
    uglify: {
      lib: {
        files: {
          "lib/qrcode.min.js": ["lib/qrcode.js"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-jsbeautifier");

  grunt.registerTask("lint", ["jshint", "jsbeautifier"]);
  grunt.registerTask("compile", ["browserify", "uglify"]);

  grunt.registerTask("default", ["lint", "compile"]);
};
