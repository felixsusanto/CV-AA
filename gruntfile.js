// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
 
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  // Configure Grunt 
  grunt.initConfig({
 
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      stylesheet: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['src'], // Replace with the directory you want the files served from
                             // Make sure you don't use `.` or `..` in the path as Express
                             // is likely to return 403 Forbidden responses if you do
                             // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },
    
    //grunt-contrib-compass to compile scss file to dist files
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'src/scss',
          cssDir: 'src/css',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'src/css'
        }
      }
    },

    //grunt-watch will monitor the project files
    watch: {
      view_stylesheet: {
        // Replace with whatever file you want to trigger the update from
        // Either as a String for a single entry 
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        files: ['src/*.html', 'src/css/*.css'],
        options: {
          livereload: true
        }
      },
      compile_scss: {
        files: ['src/scss/*.scss'],
        tasks: ['compass-scss'],
        options: {
          livereload: true
        }
      }
    },
  });
 
  // Creates the `server` task
  grunt.registerTask('server-stylesheet', [
    'express',
    'watch'
  ]);
  //Compile scss task
  grunt.registerTask('compass-scss', ['compass']);
};