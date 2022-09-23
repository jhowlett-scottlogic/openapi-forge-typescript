const shell = require("shelljs");

// Extract cl arguments
const clArgs = process.argv.slice(2);

// Retrieve the path to feature paths from cl arguments of 'npm test', use default value if none given
const featurePath = clArgs[0] || "node_modules/openapi-forge/features/*.feature";

// Retrieve the path to generate.js from cl arguments of 'npm test', use default value if none given
const generatePath = clArgs[1] || "openapi-forge/src/generate";

// Pass both paths to cucumber-js which spawns another node process to handle the testing.
const result = shell.exec(`"./node_modules/.bin/cucumber-js" -p default "${featurePath}" "${generatePath}"`);

process.exit(result.code);