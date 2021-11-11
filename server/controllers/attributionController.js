const attribution = require('../models/attribution')
const computer = require('../models/computer')
const customer = require('../models/customer')

// Create and Save a new attribution
exports.create = async (req,res) => {
    let {computerId, customerId, date, hour, firstname, lastname } = req.body;

    console.log(req.body)
    try {

        if (!customerId){
            const user = new customer({firstname, lastname});
            const createdCustomer = await user.save();

            customerId = createdCustomer.id
        }



        const attr= new attribution({
            date,
            hour,
            customerId,
            computerId});

        const nouvelleAttribution = await attr.save();

        const user = await customer.findOne({
            attributes: ['id', 'firstname', 'lastname'],
            where: {
                id: customerId
            }
        });



        return res.status(200).json({
            id: nouvelleAttribution.id,
            date: nouvelleAttribution.date,
            hour: nouvelleAttribution.hour,
            Customer: user
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            success: false,
            message: 'Ressource indisponible',
        })
    }

}

// Retrieve all Computers from the database.
exports.findAll = (req, res) => {
    attribution.findAll({
        attributes: ['id', 'date', 'hour'],
        include: [
            {
                model: customer,
                attributes: ['id', 'firstname', 'lastname'],
                required: false,
            },
            {
                model: computer,
                attributes: ['id', 'name'],
                required: false,
            }

        ]
    }).then(data => {
        res.status(200).json(data);
    });

};

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//
// };

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
    const {id }= req.body;
    try {
        let attr = await attribution.findOne({
            where: { id }
        });
        if(!attr){
            return res.status(200).json({
                success: false,
                message: 'Information introuvable',
            })
        }else{
            await attr.destroy();
            return res.status(200).json({
                success: true,
                message: 'Attribution annulée',
                content: id
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
