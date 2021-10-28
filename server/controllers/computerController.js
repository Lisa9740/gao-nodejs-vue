const computer = require('../models/computer');
const attribution = require('../models/attribution')
const customer = require('../models/customer')

// Define relation (needed if we don't use database.sync() in app.js)
customer.hasMany(attribution)
computer.hasMany(attribution)
attribution.belongsTo(customer)
attribution.belongsTo(computer)


// Create and Save a new computer
exports.create = (req, res) => {
     computer.create(req.body).then(data =>{
         res.status(200).json({success: true, content: data});
     })
};

// Retrieve all Computers from the database.
exports.findAll = (req, res) => {
    const currentDate = req.query.date

    try {
        computer.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: attribution,
                attributes: ['id', 'date', 'hour'],
                required: false,
                where: {
                    date: currentDate
                },
                include: [{
                    model: customer,
                    attributes: ['id', 'firstname', 'lastname'],
                    required: false
                }]
            }]
        }).then(data => {
            res.status(200).json(getComputerAttributions(data));
        });
    } catch (e){
        return res.status(200).json({
            success: false,
            message: 'Ressource indisponible',
        })
    }

};

// Find a single Tutorial with an id
exports.findComputerAttribution = (req, res) => {
    attribution.findAll().then(data => {
        res.status(200).json({data})
    })
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {

    try {
        const id = req.body.id;
        const computer = computer.findOne({
            where: { id }
        });
        console.log(computer)
        if(computer) {
            //computer.destroy();
            return res.status(200).json({
                success: true,
                message: 'Attribution annulée'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            success: false,
            message: 'Ressource indisponible',
        })
    }
}

function getComputerAttributions(data) {
    let computers = []
    data.forEach( computer => {
        let attributions = []
        if (computer.Attributions.length !== 0) {
            attributions.push(computer.Attributions)
        }
        computers.push({
            id : computer.id,
            name : computer.name,
            Attributions: attributions
        })
    })
    return computers;
}


