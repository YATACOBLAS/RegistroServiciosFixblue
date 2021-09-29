var path = require('path');
const express = require('express');
const server = express();
const template=require('fs').readFileSync(path.resolve(__dirname, './public/index.html'), 'utf-8');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('./public/js/vue-ssr-client-manifest.json');
const { createBundleRenderer } = require('vue-server-renderer');

const renderer = createBundleRenderer(serverBundle, { 
  template,  
  clientManifest 
}); 


server.get('*', (req, res) => { 
  const context = { url: req.url } 

  renderer.renderToString(context, (err, html) => { 
      // se quita el manejo de error para simplificar... 
      res.end(html) 
  });
});