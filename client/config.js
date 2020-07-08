const production = true;
const hostname = production ? window.location.origin : 'http://localhost:3001';

export {
  production,
  hostname
};