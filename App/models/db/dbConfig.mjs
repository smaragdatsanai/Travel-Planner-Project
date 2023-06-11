//Sequelize
// code connecting  Node.js application to the PostgreSQL database
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize({
    host:process.env.PGHOST||'localhost',
    port:process.env.PGPORT,
    dialect:'postgres',
    username:process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database:process.env.PGDATABASE,
    logging: false,
    define:{
        timestamps:false,
        freezeTableName: true
    },
});

const testDbConnection = async () => {
      try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
};



testDbConnection()
export {sequelize}