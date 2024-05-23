// Importing the whole module - type 1
const Movies = require("./Movies.js");
console.log(Movies.movieTitle("RRR")); 
console.log(Movies.movieCast("NTR & Ram Charan")); 
console.log(Movies.movieStory("Revolutionary Story")); 

// Destructuring the imports - type 2
const { movieTitle, movieCast, movieStory } = require("./Movies");
console.log(movieTitle("Jailer")); 
console.log(movieCast("RajniKanth")); 
console.log(movieStory("father & son story")); 
