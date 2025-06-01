let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    nom: String,
    dateDeRendu: String,
    rendu: Boolean,
    eleve: String,
    matiere: String, 
    imageMatiere: String, 
    professeur: String,
    imageProfesseur: String, 
    note: Number, 
    remarques: String
});


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
