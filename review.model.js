const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Review = new Schema({
    userID: {
        type: String
    },
    text: {
        type: String
    },
    workload: {
        type: String
    },
    difficulty: {
        type: String
    },
    learn_quality: {
        type: String
    },
    grade_leniency: {
        type: String
    },
    teacher_quality: {
        type: String
    }
});

module.exports = mongoose.model('Review', Review);