const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path')

var port = 3031;

const bodyParser = require('body-parser');

// Configuración del servidor

app.set('port', process.env.PORT || port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('short'));
app.use(cors());
app.use(express.static(path.join(__dirname + '/public')));

// Iniciar servidor

app.listen(app.get('port'), () => console.log(`Client listening on port ${app.get('port')}!`));