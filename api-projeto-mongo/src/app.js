const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//String de conexao
mongoose.connect("mongodb://localhost:27017/reprograma-trip", {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});



let db = mongoose.connection;


db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
    console.log("conexão feita com sucesso.")
})


const travelsRoutes = require("./routes/travelsRoutes");

app.use(cors());
app.use(express.json());
app.use("/", travelsRoutes);

module.exports = app;