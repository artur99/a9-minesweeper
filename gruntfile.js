module.exports = function(grunt) {
	grunt.initConfig({
		bower_concat: {
			basic: {
				dest: {
					js: 'bower_components/bower_tmp.js',
                    css: 'bower_components/bower_tmp.js'
				}
			}
		},
		concat: {
		    dist: {
		      files: [
		        {
					src: ['bower_components/bower_tmp.js', 'src/js/screens/*.js', 'src/js/*.js', '!src/js/init.js', 'src/js/init.js'],
					dest: 'game/dist/data.js'
				},
				{
					src: ['bower_components/bower_tmp.css', 'src/css/*.css'],
					dest: 'game/dist/data.css'
				}
		      ],
		    },
		},
		clean: ['bower_components/bower_tmp.js', 'bower_components/bower_tmp.css'],
		uglify: {
			options: {
			  mangle: false,
			  preserveComments: 'some'
			},
			my_target: {
			  files: {
			    'game/dist/data.js': ['game/dist/data.js']
			  }
			}
		},
		cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'game/dist/data.css': ['game/dist/data.css']
		    }
		  }
	  	},
		watch: {
		    scripts: {
		        files: ['src/js/*.js', 'src/css/*.css'],
		        tasks: ['dev-watcher'],
		        options: {
		            interrupt: true
		        }
		    }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['bower_concat', 'concat', 'uglify', 'cssmin', 'clean']);
	grunt.registerTask('prep', ['bower_concat', 'concat']);
	grunt.registerTask('dev-watcher', ['less', 'concat']);
};
