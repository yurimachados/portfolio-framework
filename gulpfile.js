const { on } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

// Transpila o SASS em CSS
function sassTask() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/css'));
}

// Minifica os arquivos CSS
function minifyCssTask() {
    return gulp.src('./public/css/style.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./public/css'))
}

// Observa as mudanças no SASS e transpila automaticamente
function sassWatch() {
  gulp.watch('./src/sass/*.scss', gulp.series(sassTask));
  gulp.watch('./public/css/style.css', gulp.series(minifyCssTask));
}

// Comando de tranpilação do SASS para CSS 'gulp sass'
exports.sass = sassTask;
// Comando de minificação de CSS 'gulp min'
exports.min = minifyCssTask;

/** Define o sassWatch como task padrão, para observar 
 *  e transpilar automaticamente basta inserir o comando
 *  'gulp'
*/
exports.default = gulp.series(sassWatch);