const db = require("../models");


module.exports = function(app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find()
            .then(dbWorkouts => {
                res.json(dbWorkouts);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.put("/api/workouts", (req, res) => {
        db.Workout.create({})
            .then(dbWorkout => {
                console.log("works")
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });
    app.put("/api/workouts/:id", (req, res) => {

        db.Workout.findOneAndUpdate({ _id: req.params.id }, {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        }, { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

    });


    app.post("/api/workouts", ({ body }, res) => {
        console.log("WORKOUT TO BE ADDED");


        db.Workout.create(body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err => {
            res.json(err);
        });
    });

    app.get("/api/workouts/range", (req, res) => {

        db.Workout.find({}).then(dbWorkout => {
            console.log(dbWorkout);

            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

    });
}