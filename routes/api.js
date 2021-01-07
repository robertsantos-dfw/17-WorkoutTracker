const router = require("express").Router();

const Workout = require("../models/workout");

router.get("/api/workouts", async(req, res) => {
    //if (err) throw err;
    Workout.find({})
        .sort({ date: -1 })
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    // const json = await res.json();

    // return json[json.length - 1];
    //     res.send({
    //         name: "Robert",
    //         date: "01/04/2021"
    //     })
});

module.exports = router;

// const API = {
//   async getLastWorkout() {
//       let res;
//       try {
//           res = await fetch("/api/workouts");
//       } catch (err) {
//           console.log(err)
//       }
//       const json = await res.json();

//       return json[json.length - 1];
//   },
//   async addExercise(data) {
//       const id = location.search.split("=")[1];

//       const res = await fetch("/api/workouts/" + id, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data)
//       });

//       const json = await res.json();

//       return json;
//   },
//   async createWorkout(data = {}) {
//       const res = await fetch("/api/workouts", {
//           method: "POST",
//           body: JSON.stringify(data),
//           headers: { "Content-Type": "application/json" }
//       });

//       const json = await res.json();

//       return json;
//   },

//   async getWorkoutsInRange() {
//       const res = await fetch(`/api/workouts/range`);
//       const json = await res.json();

//       return json;
//   },
// },