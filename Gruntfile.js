module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        // Unfortunately, the order matters
        src: [
          "js/d3.js", "js/nv.core.js", "js/nv.utils.js", "js/nv.tooltip.js",
          "js/nv.interactiveLayer.js", "js/nv.legend.js", "js/nv.scatter.js", "js/nv.axis.js",
          "js/nv.line.js", "js/nv.lineChart.js", "js/nv.discreteBar.js", "js/nv.discreteBarChart.js",
          "js/nv.multiBar.js", "js/nv.multiBarChart.js",
          "js/nv.historicalBar.js", "js/nv.linePlusBarChart.js"
        ],
        dest: 'dist/nv.<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/nv.<%= pkg.name %>.min.js': ['<%= concat.dist.src %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['concat', 'uglify']);

};