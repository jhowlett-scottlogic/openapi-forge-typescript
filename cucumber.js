// cucumber.js
const featurePath = "node_modules/openapi-forge/features/*.feature";

let common = [
  featurePath, // Specify our feature files
  "--require-module ts-node/register", // Load TypeScript module
  "--require features/support/*.ts", // Load step definitions
].join(" ");

module.exports = {
  default: common,
};
