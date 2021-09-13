const express = require('express');

const app = express();


//routes
app.get('/', (req, res) => {
    res.status(200)
       .json({message:'Hello from the server side 🌻 🌻', app: 'Pet me'});
});

app.post('/', (req,res) => {
    res.send('You can post to this api endpoint!...');
});

const port = 3001;
app.listen(port, () => {
    console.log(`App running on server port ${port}...`);
});