const db = require('../models');
const tokens  = require('../models/token.model');
const managerService = require('../services/manager.service');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const fs = require('fs');
const Manager = db.managers;
const Token = db.tokens;




const registerManager = async (req, res) => {
        const payload = {
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         role: req.body.role
        };

    const manager = await Manager.create(payload);
    res.status(200).send(manager);

}

const uploadManager = async (req, res) => {
    req.files.map(async (item) => {

        const payload = {
            originalname: item.originalname,
            filename: item.filename,
            path: item.path,
            scanStatus: true,
            size: item.size,

        }
        const id = req.params.id
        // const files =  fs.readFileSync(`${payload.path}`,{encoding: "base64"});
        //  fs.writeFileSync(`images/${Date.now()}.png`, files);
        //  const encoded = { encoded: files, ...payload}
        // const manager = await Manager.update(encoded, { where: { id: id }});
        const manager = await Manager.update(payload, { where: { id: id }});

        res.status(200).send("image successfully");
    })
}


const login = async (req, res) => {
    const manager = await Manager.findOne({ where: { email: req.body.email } });
    if(manager){
    bcrypt.compare(req.body.password, manager.password, async(err, result) => {
        if (err) {
            throw new Error();
        }
        if (result) {

            jwt.sign({ id: manager.id }, "secret", { expiresIn: "1h" }, async(err, token) => {
                if (err)
                    throw err;
                res.status(200).json({
                    message: "login succesfully",
                    token: token ,
                })
               await Token.create({Token:token});
            })
        }
        else {
            res.status(200).json({
                message: "please enter your correct password"
            })
        }
    })
  }
}






// 3. get single manager

const getOneManager = async (req, res) => {

    let id = req.params.id;
    let manager = await Manager.findOne({ where: { id: id }});
    res.status(200).send(manager);

}

// 4. update manager

const updateManager = async (req, res) => {

    let id = req.params.id;

    const manager = await Manager.update(req.body, { where: { id: id }});

    res.status(200).send("sucess");
   

}

// 5. delete manager 

const deleteManager = async (req, res) => {

    let id = req.params.id;
    
    await Manager.destroy({ where: { id: id }} );

    res.status(200).send('Product is deleted !')

}


module.exports = {
    registerManager,
    login,
    uploadManager,
    getOneManager,
    updateManager,
    deleteManager,
    
}