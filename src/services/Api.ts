const env = import.meta.env.VITE_NODE_ENV;

export const apiHost =
  env === `development`
    ? `http://localhost:3000/api/v2/lattice`
    : `https://web-production-66b6.up.railway.app/api/v2/lattice`;
