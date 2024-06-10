const config = require("../config")

const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: "mysql",
    host: config.db.host
});


async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Mysql server baglantisi yapildi");
    } 
    catch (err) {
        console.log("Baglanti hatasi", err);
    } 
}

connect()

module.exports = sequelize;


// let connection = mysql.createConnection(config.db)

// connection.connect((err)=>{
//     if(err)
//         return console.log(err)

//     console.log("mysql server bağlantisi yapildi.")
// })

// module.exports = connection.promise();