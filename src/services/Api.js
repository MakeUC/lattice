const env = process.env.NODE_ENV;

export const apiHost =
    (env === `development`) ?
        `http://localhost:3000` :
        `https://api.revolutionuc.com`;
