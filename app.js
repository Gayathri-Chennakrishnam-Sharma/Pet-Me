const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const pets = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/pets-simple.json`));

//route-handlers:
const getAllPets = (req, res) => {
    res.status(200).json({
        status: 'Success',
        results: pets.length,
        data:{
            pets
        }
    })
};

const getAPet = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const pet = pets.find(el => el.id === id);

    if((!pet || id > pets.length)){
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        })

    }

    res.status(200).json({
        status: 'Success',
        data:{
            pet
        }
    })
};

const createAPet = (req, res) => {
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
};

const updateApet =  (req,res) => {
    if((req.params.id * 1 > pets.length)){
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        });
    }
        res.status(200).json({
            status: 'Success',
            data:{
                pet : '<Updated Pet here...>'
            }

        });
};

const deleteAPet =  (req,res) => {
    if((req.params.id * 1 > pets.length)){
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        });
    }
        res.status(204).json({
            status: 'Success',
            data: null

        });
} ;

//routes:
// app.get('/api/v1/pets', getAllPets );
// app.get('/api/v1/pets/:id', getAPet );
// app.post('/api/v1/pets', createAPet );
// app.patch('/api/v1/pets/:id', updateApet);
// app.delete('/api/v1/pets/:id', deleteAPet );


//simplified routes:
app.route('/api/v1/pets')
.get(getAllPets)
.post(createAPet);

app.route('/api/v1/pets/:id')
.get(getAPet)
.patch(updateApet)
.delete(deleteAPet);


const port = 3001;
app.listen(port, () => {
    console.log(`App running on server port ${port}...`);
});