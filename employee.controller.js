const db = require('../models')
const fs = require('fs');
const { pick, pickGTE, pickLTE, pickLike } = require('../utils/pick');
const employeeService = require('../services/employee.service');
const path = require('path');
const sequelize = require('sequelize');
const Employee = db.employees;



const createEmployee = async (req, res) => {
      const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }
      const employee = await employeeService.createEmployee(payload);
      res.status(200).send(employee);
    }

    const uploadEmployee = async (req, res) => {
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
            // const employee = await Employee.update(encoded, { where: { id: id }});
           const employee = await Employee.update(payload,{ where: { id: id }});

            res.status(200).send("image successfully");
        })
    }




    const getAllEmployees =  async (req, res) => {
        const filter = pick(req.body, ['firstName', 'lastName', 'filename','email','originalname']);
        let lteFilter = {};
        let gteFilter = {};
        let firstNameFilter = {};
        let lastNameFilter = {};
        let filenameFilter = {};
        let emailFilter = {};
        let originalnameFilter = {};
        if (req.body.fromDate && req.body.fromDate != '') {
            const data = pickGTE(req.body, ['fromDate']);
            gteFilter = { createdAt: data.fromDate }
        }
        if (req.body.toDate && req.body.toDate != '') {
            const data = pickLTE(req.body, ['toDate']);
            lteFilter = { updatedAt: data.toDate }
        }
        if (req.body.firstName && req.body.firstName != '' || 
        req.body.lastName && req.body.lastName != '' ||
        req.body.filename && req.body.filename != '' || 
        req.body.email && req.body.email != '' || 
        req.body.originalname && req.body.originalname != '') {
            const data = pickLike(req.body, ['firstName', 'lastName','filename', 'email', 'originalname']);
        if(req.body.firstName){
            nameFilter = { firstName: data.firstName}
        }else if( req.body.lastName){
                  lastNameFilter = { lastName: data.lastName}
        }else if(req.body.filename){
            filenameFilter = { filename: data.filename}
        }else if(req.body.email){
            emailFilter = { emailFilter: data.email}
        }else if(req.body.originalname){
            originalnameFilter = { originalname: data.originalname}
        }
        pickLike
    }
        const payload = {...gteFilter, ...lteFilter, ...firstNameFilter, ...filenameFilter, ...emailFilter, ...originalnameFilter }
        const result = await employeeService.queryFiles(payload);
        res.send(result)
    };

const pagination = async(req,res)=>{
        const options = pick(req.body, ['limit', 'page']);
        const result = await Employee.findAndCountAll(options);  
        res.send(result);
    }

const sorting = async(req,res)=>{
        if(req.body.name){
            const result = await Employee.findAndCountAll({ order: [[req.body.name,req.body.order]]});
            res.send(result); 
        }else if(req.body.filename){
            const result = await Employee.findAndCountAll({ order: [[req.body.filename,req.body.order]]});
            res.send(result); 
        }else if(req.body.originalname){
            const result = await Employee.findAndCountAll({ order: [[req.body.originalname,req.body.order]]});
            res.send(result); 
        }else if(req.body.email){
            const result = await Employee.findAndCountAll({ order: [[req.body.email,req.body.order]]});
            res.send(result);
        }
    }
const fullTextSearch = async(req,res)=>{
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const result = await employeeService.fullTextSearch(firstName,lastName);

    res.send(result);
}
// 3. get single Company

const getOneEmployee = async (req, res) => {
    const employee = await Employee.findOne(req.params.id);
    res.status(200).send(employee);

}

// 4. update Company

const updateEmployee = async (req, res) => {

    const employee = await Employee.update(req.params.id);

    res.status(200).send("sucess");
   

}

// 5. delete product by id

const deleteEmployee = async (req, res) => {

    let id = req.params.id;
    
    await Employee.destroy({ where: { id: id }} );

    res.status(200).send('employee is deleted !')

}
 

module.exports = {
    createEmployee,
    uploadEmployee,
    getAllEmployees,
    pagination,
    sorting,
    fullTextSearch,
    getOneEmployee,
    updateEmployee,
    deleteEmployee,
    
}



