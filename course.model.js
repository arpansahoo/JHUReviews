const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Course = new Schema({
    name: {
        type: String
    },
    number: {
        type: String
    },
    instructor: {
        type: String
    },
    department: {
        type: String
    },
    area: {
        type: String
    },
    writing: {
        type: String
    },
    credits: {
        type: String
    },
    rating: {
        type: String
    },
    color: {
        type: String
    },
    reviews: {
        type: [{ text: String, workload: String, difficulty: String, learn_quality: String, grade_leniency: String, teacher_quality: String, userID: String}]
    }
}); 

module.exports = mongoose.model('Course', Course);