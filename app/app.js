var express     = require( 'express' ),
    app         = express(),
    nunjucks    = require( 'nunjucks' ) ;
var path = require('path');

// Define port to run server on
var port = process.env.PORT || 9000 ;

// Configure Nunjucks
const pathView = require('../config/paths.json');
var _templates = process.env.NODE_PATH ? process.env.NODE_PATH + '/templates' : 'templates' ;
var _templates = [
  '',
  'node_modules/lbh-frontend/lbh/',
  'node_modules/lbh-frontend/lbh/components/',
  'node_modules/govuk-frontend/govuk/',
  'node_modules/govuk-frontend/govuk/components/',
  pathView.views
];
nunjucks.configure( _templates, {
    autoescape: true,
    cache: false,
    express: app,
} ) ;
// Set Nunjucks as rendering engine for pages with .html suffix
app.engine( 'html', nunjucks.render ) ;
app.set( 'view engine', 'html' ) ;
app.use('/public', express.static('public'));
app.use('/assets', express.static('node_modules/lbh-frontend/lbh/assets'));
app.use('/assets', express.static('node_modules/govuk-frontend/govuk/assets'));

// Respond to all GET requests by rendering relevant page using Nunjucks
app.get( '/', function( req, res ) {
  res.render( 'index.html' );
} ) ;
app.get( '/:page', function( req, res ) {
    res.render( req.params.page );
} ) ;

// Start server
app.listen( port ) ;
console.log( 'Listening on port %s...', port ) ;
