

const path = require('path');

const historyApiFallback = require('connect-history-api-fallback');


module.exports = {
  paths: {
    public: './public',
    revisionedFiles: {
      in: './public/**/*',
      out: './public',
    },
    application: { in: './source/index.html', out: './' },
    stylesheets: { in: './source/stylesheets/main.scss', out: './' },
    images: { in: './source/resources/images/**', out: 'images/' },
    fonts: {
      in: [
        './source/resources/fonts/**',
        // './node_modules/bootstrap-sass/assets/fonts/bootstrap/**',
      ],
      out: 'fonts/',
    },
    templates: { in: './source/**/tpl_*.{htm,html}', out: './' },
  },
  watchers: [
    { glob: './source/**/*.{js,htm,html}', tasks: ['templates', 'application'] },
    { glob: './config/**', tasks: ['application'] },
    { glob: './source/**/*.{css,scss,sass}', tasks: ['styles'] },
    { glob: './source/**/*.{png,svg,jpg,jpeg,gif}', tasks: ['images'] },
    { glob: './source/**/*.{ttf,woff,woff2,otf}', tasks: ['fonts'] },
  ],
  sourcemaps: {
    enabled: true,
    init: { loadMaps: true, debug: true },
    write: './',
  },
  revision: {
    revOptions: {
      fileNameManifest: 'rev-manifest.json',
      fileNameVersion: 'rev-version.json',
      dontRenameFile: ['.html', '.html.map'],
      dontSearchFile: ['vendor.js'],
    },
  },
  browsersync: {
    server: {
      baseDir: './public',
      middleware: [
        historyApiFallback({ index: '/index.html' }),
      ],
    },
    logConnections: true,
    reloadOnRestart: true,
    notify: true,
    minify: false,
    open: false,
    reloadDelay: 2000,
  },
  sass: {},
  autoprefixer: {
    cascase: false,
    browsers: ['last 2 version'],
  },
  babel: {},
  ngAnnotate: {},
  useref: {},
  templateCache: {
    filename: 'templates.js',
    transformUrl(file) {
      return path.basename(file);
    },
    module: 'application.templates',
    standalone: true,
  },
  cleanCSS: {},
  uglify: {
    mangle: true,
  },
};
