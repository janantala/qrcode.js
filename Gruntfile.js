var path = require("path");

module.exports = function(grunt) {
  "use strict";
  var jsFiles = ["Gruntfile.js", "src/**/*.js", "test/**/*.js"];

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // cleaning output directories
    clean: ["build", "lib"],

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
      lib: {
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
    },

    // Run tests using mocha
    mochaTest: {
      libRaw: {
        options: {
          require: ["./test/testStandard.js"],
          reporter: "spec"
        },
        src: ["test/**/*Test.js"]
      },
      coverage: {
        options: {
          require: ["./test/testCoverage.js"],
          reporter: "min"
        },
        src: ["test/**/*Test.js"]
      }
    },

    // tasks for coverage analysis (istanbul)
    instrument: {
      files: ["src/**/*.js"],
      options: {
        basePath: "build/instrumented/"
      }
    },
    storeCoverage: {
      options: {
        dir: "build/reports/coverage/"
      }
    },
    makeReport: {
      src: "build/reports/coverage/**/*.json",
      options: {
        type: "lcov",
        dir: "build/reports/coverage/",
        print: "text-summary"
      }
    },
    changelog: {
      options: {
        dest: "CHANGELOG.md"
      }
    }
  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("lint", ["jshint", "jsbeautifier"]);
  grunt.registerTask("test", ["mochaTest:libRaw"]);
  grunt.registerTask("compile", ["browserify", "uglify"]);

  grunt.registerTask("coverage", ["instrument", "mochaTest:coverage", "storeCoverage", "makeReport"]);

  grunt.registerTask("default", ["clean", "lint", "test", "compile"]);
};
