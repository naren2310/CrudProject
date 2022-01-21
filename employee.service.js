const db = require('../models');
const sequelize = require('sequelize');
const Employee = db.employees;
const Token = db.tokens;
const createEmployee = async(employeeBody)=>{
    
    const employee = await Employee.create(employeeBody);
    return employee;
}

const queryFiles = async (filter, options) => {
    const files = await Employee.findAndCountAll({
        filter,
        options,
        where: filter,
    });
    return files;
};

const fullTextSearch = async(firstName,lastName)=>{
    const result = await  Employee.findAndCountAll({
        where: {
          [sequelize.Op.or]:{
           namesQuery: sequelize.where(
            sequelize.fn(
              "CONCAT",
              sequelize.col("firstName","lastName") 
            ),
          ),
          firstName: {[sequelize.Op.like]: `%${firstName}%`},
          lastName: {[sequelize.Op.like]: `%${lastName}%`},
        }
      }
      
    })
    return result;
}


const getOneEmployee = async()=>{
    const employee = await Employee.findOne({ where: { id: id }});
    return employee;

}

const updateEmployee = async(body)=>{
    const employee = await Employee.update(req.body, { where: { id: id }});
    return employee;

}

const deleteEmployee = async()=>{
   const employee =  await Employee.destroy({ where: { id: id }} );
   return employee;
}

const getName = async()=>{
    return new Promise((res)=>{
        db.query("select * from employees where name LIKE 's%'", (err,rows)=>{
        if(err){
            console.log('error',err);
        }
        return res(rows);
        })
    })
}
module.exports = {
    createEmployee,
    queryFiles,
    fullTextSearch,
    getOneEmployee,
    updateEmployee,
    deleteEmployee,
    getName
    
}