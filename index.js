const dbConfig = require('../config/db.config');

const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.managers = require('./manager.model')(sequelize, DataTypes);
db.employees = require('./employee.model')(sequelize, DataTypes);
db.tokens = require('./token.model')(sequelize, DataTypes);



db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!');
});


// db.managers.hasMany(db.managers, {
//     foreignKey: 'employee_id',
//     as: 'managers'
// });


module.exports = db;