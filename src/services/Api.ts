const env = process.env.NODE_ENV;

export const apiHost =
    (env === `development`) ?
        `https://makeuc-registration-dev.herokuapp.com` :
        `https://makeuc-registration.herokuapp.com`;
