const gulp = require('gulp'),
  inject = require('gulp-inject'),
  client = __dirname + '/client',
  js = client + '/modules/**/*.js',
  css = client + '/modules/**/*.css',
  threejs = client + '/public/vendor/threejs/build/three.min.js',
  physijs = client + '/public/vendor/Physijs/physi.js',
  mainBower = require('main-bower-files'),
  bower = mainBower({
    main: ['build/three.min.js']
  });

console.log('bower:', bower);

gulp.task('inject', function() {

  var sources = gulp.src([js, css, ...bower, physijs], {
      read: false
    }),
    target = gulp.src(client + '/index.html'),
    options = {
      ignorePath: '/client'
    };

  return target.pipe(inject(sources, options))
    .pipe(gulp.dest(client));
});

gulp.task('default', ['inject']);
