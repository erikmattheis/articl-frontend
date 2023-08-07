import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import path from 'path';

const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();\

app.use(compression());
app.use(serveStatic(path.join(__dirname, 'dist')));

const port = process.env.PORT || 3000;

app.listen(port);
