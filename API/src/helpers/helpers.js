require("dotenv").config();
const { Course } = require("../db");

const promedioRating = async (ratingNumber, rating) => {
  console.log(rating);
  console.log(ratingNumber);
  let arr = [];
  let newValue = 0;
  //arr.push(parseInt(rating), ratingNumber);
  console.log(arr); //[ '5', null ]
  if (ratingNumber === null) {
    arr.push(parseInt(rating));
    console.log(rating);
    for (let i = 0; i < arr.length; i++) {
      newValue = newValue + arr[i];
    }
    console.log(newValue / arr.length);
  } else {
    arr.push(parseInt(rating), ratingNumber);
    console.log(rating);
    for (let i = 0; i < arr.length; i++) {
      newValue = newValue + arr[i];
    }
    console.log(newValue / arr.length);
  }
  let promRating = Math.ceil(newValue / arr.length);
  return promRating;
};

// for (let i = 0; i < promRating.length; i++) {
//       9              2                 7
//   ratingNumber = promRating[i] + ratingNumber;
//   promRating.push(ratingNumber / i);
// }
// return parseInt(promRating);

// let changeRating = [];
// console.log("aaaaaaaaaaaaaaa");

// if (id.includes("-")) {
//   let currentCourse = await Course.findOne({ where: { id: id } });
//   changeRating.push(currentCourse);
//   //console.log(currentCourse);
//   let ratingNumber = parseInt(changeRating[0].rating);
//   console.log(ratingNumber);
//   // changeRating.push(rating, { where: { id: id } });
//   // console.log(changeRating);
//   // return {
//   //   changeRating,
//   // };
//   return currentCourse;
// }
module.exports = { promedioRating };
