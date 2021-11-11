const attribution = require('../models/attribution')
const customer = require('../models/customer')
const {Sequelize} = require("sequelize");
const Op = Sequelize.Op


exports.create =  async (req, res, next) => {
    const {firstname, lastname, computerId, date, hours} = req.body;

    try {

        console.log(req.body)
        const user = new customer({firstname, lastname});
        const createdCustomer = await user.save();

        const attr = new attribution({
            customerId: createdCustomer.id,
            computerId: computerId,
            hour : hours,
            date
        });
        const newAttribution = await attr.save();

        const returnData = {
            id: newAttribution.id,
            date: newAttribution.date,
            hours: newAttribution.hours,
            Customer: createdCustomer
        }

        return res.status(200).json({
           returnData
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            success: false,
            message: 'Ressource indisponible',
        })
    }
}

// Retrieve all Customers from the database.
exports.findAll = async  (req, res) => {
    const queryCustomer = req.query.query;
    console.log(queryCustomer)
    try{
        let data = await customer.findAll({
            attributes: ['id', 'firstname', "lastname"],
            where: {
                [Op.or]: [
                    {
                        firstname: {
                            [Op.substring]: queryCustomer
                        }
                    },
                    {
                        lastname: {
                            [Op.substring]: queryCustomer
                        }
                    }
                ]
            }
        })

        console.log(data)

        res.status(200).json(data);

    }catch (e){
        return res.status(200).json({
            success: false,
            message: 'Ressource indisponible',
        })
    }

};

