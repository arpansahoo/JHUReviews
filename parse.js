'use strict';

const fs = require('fs');
let output = '[]';
// let hashmap = new Map()

fs.readFile('courses.json', (err, data) => {
    if (err) throw err;
    let input = JSON.parse(data);
    let length = input.length;
    for (var i = 0; i < length; i++) {
        var course = input[i];
        var obj = JSON.parse(output);
        obj.push({
            "name": course.name,
            "number": course.number,
            "instructor": course.instructor,
            "department": course.department,
            "area": course.area,
            "writing": course.writing,
            "credits": course.credits,
            "rating": "0.00",
            "color": "dark",
            "reviews": [],
        });
        output = JSON.stringify(obj);
    }
    console.log(output)
});


// fs.readFile('classes.json', (err, data) => {
//     if (err) throw err;
//     let input = JSON.parse(data);
//     let length = input.length;
//     for(var i = 1200; i < length; i++) {
//         var course = input[i];
//         var areas = course.Areas;
//         if (areas == "None")
//             areas = "N/A";
//         var w = "N";
//         if (course.IsWritingIntensive == "Yes")
//             w = "Y";
//         var instructor = course.Instructors;
//         if (instructor.length == 0) 
//             instructor = "Staff"

//         if (course.Status != "Canceled") {
//             if(!hashmap.has(course.Title) || !hashmap.get(course.Title).includes(instructor)) {
//                 if (!hashmap.has(course.Title)) {
//                     var array = [instructor]
//                     hashmap.set(course.Title, array)
//                 } else if (!hashmap.get(course.Title).includes(instructor)) {
//                     var array = hashmap.get(course.Title)
//                     array.push(instructor)
//                     hashmap.set(course.Title, array)
//                 }
//                 var obj = JSON.parse(output);
//                 obj.push({
//                     "name": course.Title,
//                     "number": course.OfferingName,
//                     "instructor": instructor,
//                     "department": course.Department,
//                     "area": areas,
//                     "writing": w,
//                     "credits": course.Credits,
//                     "rating": "0.00",
//                     "color": "dark",
//                     "reviews": []
//                 });
//             }
//         }
//         output = JSON.stringify(obj);
//     }

    
// });

