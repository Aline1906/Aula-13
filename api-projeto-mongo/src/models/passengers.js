const mongoose = require('mongoose');

//estrutura do seu model (atributos da sua entidade)
const passengersSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    email: { type: String },
    documentNumber: { type: String },
    travelId: { type: String }
}, {
    
    versionKey: false
});


const passengers = mongoose.model('passengers', passengersSchema);


module.exports = passengers;
