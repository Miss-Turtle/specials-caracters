var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-handlebars');
var modernizr =  require('gulp-modernizr');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var path = require('path');
var browsersync = require('browser-sync').create();

var source = './src';
var destination = './dist';

gulp.task('css', function() {
    return gulp.src(source + '/css/**/*.scss')
    .pipe(sourcemaps.init({largeFile: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({browsers : ['defaults']}))
        .pipe(concat('main.css'))
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))        
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(destination + '/css'))
    .pipe(browsersync.stream());
});

gulp.task('js', function() {
    return gulp.src(source + '/js/**/*.js')
    .pipe(sourcemaps.init({largeFile: true}))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('bootstrapCss', function() {
    return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(destination + '/css'));
});

gulp.task('bootstrapCssMap', function() {
    return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css.map')
    .pipe(gulp.dest(destination + '/css'));
});

gulp.task('bootstrapJs', function() {
    return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('bootstrapJsMap', function() {
    return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js.map')
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('jquery', function() {
    return gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('popper', function() {
    return gulp.src('./node_modules/popper.js/dist/umd/popper.min.js')
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('popperMap', function() {
    return gulp.src('./node_modules/popper.js/dist/umd/popper.min.js.map')
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('tooltip', function() {
    return gulp.src('./node_modules/tooltip.js/dist/umd/tooltip.min.js')
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('tooltipMap', function() {
    return gulp.src('./node_modules/tooltip.js/dist/umd/tooltip.min.js.map')
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('handlebars', function() {
    return gulp.src('./node_modules/handlebars/dist/handlebars.min.js')
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('templates', function() {
    var partials = gulp.src(source + '/templates/_*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function(fileName) {
                    return JSON.stringify(path.basename(fileName, '.js').substr(1));
                }
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(destination + '/templates/'));

    var templates = gulp.src(source + '/templates/**/[^_]*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
          namespace: 'smaSpecialsCharacters.templates',
          noRedeclare: true // Avoid duplicate declarations
        }));
    
      // Output both the partials and the templates as build/js/templates.js
      return merge(partials, templates)
        .pipe(sourcemaps.init({largeFile: true}))
            .pipe(concat('templates.js'))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(destination + '/templates/'));
});

gulp.task('img', function() {
    return gulp.src(source + '/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest(destination + '/img'))
});

gulp.task('modernizr', function() {
    return gulp.src(source + '/**/*.+(js|scss)')
      .pipe(modernizr({        
        "options" : [
            "setClasses",
            "addTest",
            "html5printshiv",
            "testProp",
            "fnBind"
        ],
        'tests': ['webworkers', 'objectfit', 'flexbox', 'ie8compat', 'json', 'svg', 'cssall', 'cssanimations', 'emoji']
      }))
      .pipe(uglify())
      .pipe(gulp.dest(destination + '/js'))
});

gulp.task('watch', ['jquery', 'popper', 'popperMap', 'tooltip', 'tooltipMap', 'handlebars', 'bootstrapJs', 'bootstrapJsMap', 'bootstrapCss', 'bootstrapCssMap', 'css', 'js', 'modernizr', 'img'], function() {
    browsersync.init({
        server: './'
    });
    gulp.watch(source + '/css/**/*.scss', ['css']);
    gulp.watch(source + '/js/**/*.js', ['modernizr', 'js']).on('change', browsersync.reload);
    gulp.watch(source + '/templates/**/*.hbs', ['templates']).on('change', browsersync.reload);
    gulp.watch(source + '/img/**/*.+(png|jpg|gif|svg)', ['img']).on('change', browsersync.reload);
    gulp.watch(source + '/img/**/*.+(png|jpg|gif|svg)', ['img']).on('load', browsersync.reload);
});