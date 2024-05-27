
// Named exports
export let movieTitle = (name) => {
  return `Movie Title - ${name}`;
};

export let movieCast = (name) => {
  return `Movie Cast - ${name}`;
};

export let movieStory = (about) => {
  return `Movie Story - ${about}`;
};

// Default export
const defaultExport = {
  movieTitle,
  movieCast,
  movieStory,
};

export default defaultExport;
