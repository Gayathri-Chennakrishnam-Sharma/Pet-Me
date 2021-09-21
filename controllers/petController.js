const fs = require('fs');

const pets = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/pets-simple.json`)
    );

 exports.getAllPets = (req, res) => {
    res.status(200).json({
        status: 'Success',
        results: pets.length,
        data:{
            pets
        }
    })
};

 exports.getAPet = (req, res) => {
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

exports.createAPet = (req, res) => {
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

exports.updateApet =  (req,res) => {
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

exports.deleteAPet =  (req,res) => {
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
