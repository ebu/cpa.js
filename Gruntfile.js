module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= requirejs.compile.options.out %>']
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          optimize: 'none',
          name: 'lib/almond/almond',
          baseUrl: 'src',
          include: ['main'],
          mainConfigFile: 'src/main.js',
          out: 'dist/cpa.js',
          wrap: {
            startFile: 'src/wrap/_start.js',
            endFile: 'src/wrap/_end.js'
          }
        }
      }
    },

    jshint: {
      files: ['src/*.js', 'src/utils/*.js', 'src/cpa/*.js'],
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },

    mocha: {
      test: {
        src: ['test/**/*.html'],
        options: {
          run: true
        }
      }
    },

    watch: {
      files: ['src/*', 'src/utils/*', 'src/cpa/*.js'],
      tasks: ['requirejs', 'jshint', 'uglify', 'mocha']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('default', ['requirejs', 'jshint', 'uglify']);
};
