let movieTitle = (name) => {
  return `Movie Title - ${name}`;
};

let movieCast = (name) => {
  return `Movie Cast - ${name}`;
};

let movieStory = (about) => {
  return `Movie Story - ${about}`;
};

// Exporting using module.exports- type 1
module.exports.movieTitle = movieTitle;
module.exports.movieCast = movieCast;
module.exports.movieStory = movieStory;

// another, you can use exports  in short - type 2
exports.movieTitle = movieTitle;
exports.movieCast = movieCast;
exports.movieStory = movieStory;
