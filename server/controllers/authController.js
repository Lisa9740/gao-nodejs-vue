const user = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {

    const { email, password } = req.body;

        console.log(req.body)
        const userExist = await user.findOne({
            attributes: ['id', 'email', 'password' ],
            where: {
                email
            }
        });

        console.log(userExist)
        if(!userExist){
            return res.status(200).json({
                success: false,
                message: 'Identifiants invalides',
            })
        }

        const isEqual = await bcrypt.compare(password, userExist.password);
        if(!isEqual){
            return res.status(200).json({
                success: false,
                message: 'Identifiants invalides',
            })
        }

        const token = jwt.sign({
                userId: userExist.id
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        )

        return res.status(200).json({
            success: true,
            message: 'Vous êtes connecté(e)',
            token
        })


}
