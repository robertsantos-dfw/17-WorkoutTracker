const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date(),
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Enter an exercise type",
        },
        name: {
            type: String,
            trim: true,
            required: "Enter an exercise name",
        },
        duration: {
            type: Number,
            required: "Enter an exercise duration in minutes",
        },
        weight: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        distance: {
            type: Number,
        },
    }, ],
}, {
    toJSON: {
        // include any virtual properties when data is requested
        virtuals: true,
    },
});

// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function() {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

// async function initWorkout() {
//   const lastWorkout = await API.getLastWorkout();
//   console.log("Last workout:", lastWorkout);
//   if (lastWorkout) {
//     document
//       .querySelector("a[href='/exercise?']")
//       .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

//     const workoutSummary = {
//       date: formatDate(lastWorkout.day),
//       totalDuration: lastWorkout.totalDuration,
//       numExercises: lastWorkout.exercises.length,
//       ...tallyExercises(lastWorkout.exercises)
//     };

//     renderWorkoutSummary(workoutSummary);
//   } else {
//     renderNoWorkoutText()
//   }
// }

// function tallyExercises(exercises) {
//   const tallied = exercises.reduce((acc, curr) => {
//     if (curr.type === "resistance") {
//       acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
//       acc.totalSets = (acc.totalSets || 0) + curr.sets;
//       acc.totalReps = (acc.totalReps || 0) + curr.reps;
//     } else if (curr.type === "cardio") {
//       acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
//     }
//     return acc;
//   }, {});
//   return tallied;
// }

// function formatDate(date) {
//   const options = {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric"
//   };

//   return new Date(date).toLocaleDateString(options);
// }

// function renderWorkoutSummary(summary) {
//   const container = document.querySelector(".workout-stats");

//   const workoutKeyMap = {
//     date: "Date",
//     totalDuration: "Total Workout Duration",
//     numExercises: "Exercises Performed",
//     totalWeight: "Total Weight Lifted",
//     totalSets: "Total Sets Performed",
//     totalReps: "Total Reps Performed",
//     totalDistance: "Total Distance Covered"
//   };

//   Object.keys(summary).forEach(key => {
//     const p = document.createElement("p");
//     const strong = document.createElement("strong");

//     strong.textContent = workoutKeyMap[key];
//     const textNode = document.createTextNode(`: ${summary[key]}`);

//     p.appendChild(strong);
//     p.appendChild(textNode);

//     container.appendChild(p);
//   });
// }

// function renderNoWorkoutText() {
//   const container = document.querySelector(".workout-stats");
//   const p = document.createElement("p");
//   const strong = document.createElement("strong");
//   strong.textContent = "You have not created a workout yet!"

//   p.appendChild(strong);
//   container.appendChild(p);
// }

// initWorkout();