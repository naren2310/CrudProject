const db = require('../models');

const Manager = db.managers;
const Token = db.tokens;
const createManager = async(managerBody)=>{
    
    const manager = await Manager.create(managerBody);
    return manager;
}

const queryFiles = async (filter, options) => {;
    const files = await Manager.findAndCountAll({
        filter,
        options,
        where: filter,
    });
    return files;
};


const getOneManager = async(id)=>{
    const manager = await Manager.findOne({ where: { id: id }});
    return manager;

}

const updateManager = async()=>{
    const manager = await Manager.update(req.body, { where: { id: id }});
    return manager;

}

const deleteManager = async()=>{
   const manager =  await Manager.destroy({ where: { id: id }} );
   return manager;
}


module.exports = {
    createManager,
    queryFiles,
    getOneManager,
    updateManager,
    deleteManager
}