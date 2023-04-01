const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Contacts API',
      version: '0.0.1',
      description: 'REST CONTACTS API (WDD341) FINAL PROJECT'
    },
    host: 'localhost:8000',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);