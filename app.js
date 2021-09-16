const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

//routes-sample code:
// app.get('/', (req, res) => {
//     res.status(200)
//        .json({message:'Hello from the server side 🌻 🌻', app: 'Pet me'});
// });

// app.post('/', (req,res) => {
//     res.send('You can post to this api endpoint!...');
// });

const pets = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/pets-simple.json`));

//routes-actual routes:
app.get('/api/v1/pets', (req, res) => {
    res.status(200).json({
        status: 'Success',
        results: pets.length,
        data:{
            pets
        }
    })
});

app.get('/api/v1/pets/:id', (req, res) => {
    console.log(req.params);
    res.status(200).json({
        status: 'Success',
        // results: pets.length,
        // data:{
        //     pets
        // }
    })
});

app.post('/api/v1/pets', (req, res) => {
    // console.log(req.body);

    const newId = pets[pets.length-1].id + 1;
    const newPet = Object.assign( {id :newId}, req.body );

    pets.push(newPet);

    fs.writeFile(`${__dirname}/dev-data/data/pets-simple.json`, JSON.stringify(pets), err => {
        res.status(201).json({
            status: 'Success',
            data: {
                pet : newPet
            }
        });
    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`App running on server port ${port}...`);
});