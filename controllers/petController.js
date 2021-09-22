const fs = require('fs');

const pets = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/pets-simple.json`)
    );

    exports.checkID = (req, res, next , val) => {
        console.log(`Pet id is : ${val}`);
        if(req.params.id * 1 > pets.length){
            return res.status(404).json({
                status: 'Fail',
                message: 'Invalid ID'
            });
        }
        next();
    }

    exports.checkBody = (req, res, next ) => {
        // console.log(`req.body is : ${val}`);
        if (!req.body.name || !req.body.age) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Missing name or age'
            });
        }
        next();
    }

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

    fs.writeFile(`${__dirname}/../dev-data/data/pets-simple.json`, JSON.stringify(pets), err => {
        res.status(201).json({
            status: 'Success',
            data: {
                pet : newPet
            }
        });
    });
};

exports.updateApet =  (req,res) => {

        res.status(200).json({
            status: 'Success',
            data:{
                pet : '<Updated Pet here...>'
            }

        });
};

exports.deleteAPet =  (req,res) => {
        res.status(204).json({
            status: 'Success',
            data: null

        });
} ;
