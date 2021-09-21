const app = require('./app');

//SERVER INTIALIZATION:
const port = 3001;
app.listen(port, () => {
  console.log(`App running on server port ${port}...`);
});
