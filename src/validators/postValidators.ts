import * as yup from "yup";

export const textPostValidator = yup.object().shape({
  title: yup.string(),
  content: yup.string().required("Content cannot be empty."),
  tags: yup.array().of(yup.string().required()),
});

export const quotePostValidator = yup.object().shape({
  quote: yup.string().required("Quote cannot be empty."),
  source: yup.string(),
  tags: yup.array().of(yup.string().required()),
});

export const photoPostValidator = yup.object().shape({
  caption: yup.string().required("Caption cannot be empty."),
  tags: yup.array().of(yup.string().required()),
});

export const videoPostValidator = yup.object().shape({
  description: yup.string().required("Description cannot be empty."),
  tags: yup.array().of(yup.string().required()),
});

export const audioPostValidator = yup.object().shape({
  songTitle: yup.string().required("Song title cannot be empty."),
  artist: yup.string().required("Artist cannot be empty."),
  yourThoughts: yup.string().required("Your thoughts cannot be empty."),
  tags: yup.array().of(yup.string().required()),
});

export const linkPostValidator = yup.object().shape({
  title: yup.string(),
  description: yup.string().required("Description cannot be empty."),
  tags: yup.array().of(yup.string().required()),
});
