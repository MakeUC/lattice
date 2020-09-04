const env = process.env.NODE_ENV;
export const apiHost =
  (env === `development`) ?
    `http://localhost:4000` :
    `https://makeuc-registration-dev.herokuapp.com`;
