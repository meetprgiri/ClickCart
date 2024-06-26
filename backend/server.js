const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("../backend/config/database");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception...`);
  process.exit(1);
});


//config
dotenv.config({path:"backend/config/config.env"});

//connect database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
console.log(`Error: ${err.message}`);
console.log("Shutting down the server due to unhandled promise rejection...");

server.close(()=>{
  process.exit(1);
})
})