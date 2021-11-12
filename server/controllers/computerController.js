const computer = require('../models/computer');
const attribution = require('../models/attribution')
const customer = require('../models/customer')

// Define relation (needed if we don't use database.sync() in app.js)
customer.hasMany(attribution)
computer.hasMany(attribution)
attribution.belongsTo(customer)
attribution.belongsTo(computer)

// Define element per page for pagination
let ITEM_PER_PAGE = 3;

// Create and Save a new computer
exports.create = (req, res) => {
     computer.create(req.body).then(data =>{
         res.status(200).json({success: true, content: data});
     })
};

exports.edit =(req, res) => {
    let {id, name} = req.body
    console.log("test", req.body)
    try {
      computer.findByPk(id).then(data =>{
          data.name = name
          data.save();
            res.status(200).json({success:true, content: data});
        })

    } catch (e){
        console.log(e)
        return res.status(200).json({
            success: false,
            message: 'Ressource indisponible',
        })
    }
}
// Retrieve all Computers from the database.
exports.findAll = async (req, res) => {
    const currentDate = req.query.date
    const page = +req.query.page || 1;

    try {
        computer.findAll({
            attributes: ['id', 'name'],
            offset: (page - 1) * ITEM_PER_PAGE,
            limit: ITEM_PER_PAGE,
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
    } catch (e) {
        return res.status(200).json({
            success: false,
            message: 'Ressource indisponible',
        })
    }

};

exports.getTotalPage = (req, res) => {
    try {
        computer.findAndCountAll().then(data => {
            res.status(200).json(Math.ceil(data.count / ITEM_PER_PAGE));
        });
    } catch (e) {
        return res.status(200).json({
            success: false,
            message: 'Ressource indisponible',
        })
    }
}

// Find a single Tutorial with an id
exports.findComputerAttribution = (req, res) => {
    attribution.findAll().then(data => {
        res.status(200).json({data})
    })
};


// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const id = req.body.id;
        const Computer = await computer.findOne({
            where: { id }
        });

        if (Computer) {
            await Computer.destroy();
            return res.status(200).json({
                success: true,
                message: 'Poste supprimé'
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


