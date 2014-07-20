module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		banner: '/* <%= pkg.name %> v<%= pkg.version %> | ' +
		'<%= pkg.homepage %>\n' +
		//' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= _.pluck(pkg.author).join(" | ") %>\n' +
		' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= _.values(pkg.author).join(" | ") %>\n' +
		' * Licensed under the <%= pkg.license.type  %> License */\n',

		concat: {

			helpers: {
				options: {
					separator: ',\n',
					banner: '<%= banner %>\n' + 'jQuery.fn.extend({\n',
					footer: '\n});\n'
				},
				src: ['src/helpers/*.js'],
				dest: 'build/jquery.helpers.js'
			},

			additional: {
				options: {
					separator: '\n',
				},
				src: ['build/jquery.helpers.js', 'src/*.js'],
				dest: 'build/jquery.helpers.js'
			},

			support: {
				options: {
					banner: '<%= banner %>'
				},
				src: ['src/support/*.js'],
				dest: 'build/jquery.support.js'
			}
		},

		uglify: {
			helpers: {
				src: 'build/jquery.helpers.js',
				dest: 'build/jquery.helpers.min.js'
			},

			support: {
				src: 'build/jquery.support.js',
				dest: 'build/jquery.support.min.js'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['concat', 'uglify']);
};