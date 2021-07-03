const env = process.env.NODE_ENV;

export const apiHost =
    (env === `development`) ?
        `http://localhost:3000/api/v2/lattice` :
        `https://revolutionuc-api.herokuapp.com/api/v2/lattice`;
