const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const PORT = process.env.PORT || 4000;
const path = require('path')

let Course = require('./course.model');
let Review = require('./review.model');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27018/courses', { useNewUrlParser: true })
    .then(function () {
        console.log("Promise Resolved");
    }).catch(function () {
        console.log("Promise Rejected");
    });
mongoose.connection.on('connected', () => {
	console.log('Established Mongoose Default Connection');
});
mongoose.connection.on('error', err => {
	console.log('Mongoose Default Connection Error : ' + err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))

// get all courses (sorted)
app.get("/courses", function(req, res) {
    Course.find(function(err, courses) {
        if (err) {
            console.log(err);
        } else {
            res.json(courses.sort((a, b) => (a.rating < b.rating) ? 1 : (a.rating === b.rating) ? ((a.number < b.number) ? -1 : 1) : -1 ));
        }
    });
});

// get course by id
app.get("/courses/:id", function(req, res) {
    let id = req.params.id;
    Course.findById(id, function(err, course) {
        res.json(course);
    });
});

// add review to a course with certain id
app.post("/courses/add-review/:id", function(req, res) {
    Course.findById(req.params.id, function(err, course) {
        if (!course)
            res.status(404).send("Data not found");
        else {
            let review = new Review(req.body);
            var avg_rating = course.rating * course.reviews.length
            var review_rating = Number(review.workload)
                + Number(review.difficulty)
                + Number(review.grade_leniency)
                + Number(review.learn_quality)
                + Number(review.teacher_quality)
            review_rating /= 5
            avg_rating += review_rating
            avg_rating /= (course.reviews.length + 1)
            avg_rating = Number(avg_rating).toPrecision(3)

            if (avg_rating < 1) {
                course.color = "dark"
            } else if (avg_rating < 3) {
                course.color = "danger"
            } else if (avg_rating < 4) {
                course.color = "warning"
            } else {
                course.color = "success"
            }

            course.rating = avg_rating
            course.reviews.push(review);
            course.save().then(course => {
                res.json(course.reviews);
            })
            .catch(err => {
                res.status(400).send("Review could not be added");
            });
        }
    });
});

// // add a course
// app.post("/courses/add", function(req, res) {
//     var l = req.body.length;
//     for (var i = 0; i < l; i++) {
//         let course = new Course(req.body[i]);
//         course.save()
//         .then(course => {
//             res.status(200).json({'course': 'Courses added successfully'});
//         })
//         .catch(err => {
//             res.status(400).send('Adding new courses failed');
//         });
//     }
// });

// update specific course by id
// app.post("/courses/update/:id", function(req, res) {
//     Course.findById(req.params.id, function(err, course) {
//         if (!course)
//             res.status(404).send("Data not found");
//         else
//             // course.name = req.body.name;
//             // course.number = req.body.number;
//             // course.instructor = req.body.instructor;
//             // course.department = req.body.department;
//             // course.area = req.body.area;
//             // course.credits = req.body.credits;
//             // course.writing = req.body.writing;
//             // course.rating = req.body.rating;
//             // course.color = req.body.color
//             course.reviews = [];

//             course.save().then(course => {
//                 res.json('Course was updated!');
//             })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//     });
// });

// // delete specific course by id
// '/delete/:id'
// app.post('/courses/delete/:id', function(req, res) {
//     Course.findByIdAndRemove(req.params.id, function(err, course) {
//         if (!course)
//             res.status(404).send("Data not found");
//         else {
//             res.json('Course deleted!');
//         }
//     });
// });

app.use('/courses', router);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});