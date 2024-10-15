import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:5000'
};

const outputFile = './swagger-output.json'; 
const routes = ['./src/routes/authRoutes.js' , './src/routes/appointmentRoutes.js' , './src/routes/doctor.route.js' , './src/routes/patient.route.js'];



swaggerAutogen()(outputFile, routes, doc).then(()=>{
  import('./server.js');
});