const production = false;
const hostname = production ? window.location.origin : 'http://localhost:3001';

export {
  production,
  hostname
};