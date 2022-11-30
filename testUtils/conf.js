// @ts-check

// Returns the current environment
function getEnv() {
  const env = process.env.BML_ENV ? process.env.BML_ENV : 'qa';
  return env?.toLowerCase();
}

module.exports = {
  getEnv
}