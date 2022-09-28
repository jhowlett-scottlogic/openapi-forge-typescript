## OpenAPI Forge - TypeScript

This repository is the TypeScript template for the [OpenAPI Forge](https://github.com/ColinEberhardt/openapi-forge), see that repository for usage instructions:

https://github.com/ColinEberhardt/openapi-forge


## Quick Start

Clone and then navigate to root directory of the repository.

Install all the dependencies needed:
~~~
npm install
~~~
Once you have a local version, you can reference it's location as the 'generator' argument of the 'forge' command of openapi-forge. 
~~~
$ openapi-forge forge
 \ https://petstore3.swagger.io/api/v3/openapi.json
 \ {location of local generator}
 \ -o api
~~~

## Testing
There are two scripts that can be used for testing, one that uses preset values for file paths to *.feature files and the generate.js file of the forge:

Using default values:
~~~
npm run test:defaultPaths
~~
This method uses:

featurePath: node_modules/openapi-forge/features/*.feature

generatorPath: openapi-forge/src/generate

The second script requires values for the featurePath & generatePath:
~~~
npm test {featurePath} {generatorPath}
~~~


## Notes

The openapi-forge dependency is pointing to commit:6be3962bc263948237f71689b2df7ba73e116a55. If openapi-forge is updated and openapi-forge-typescript requires this updated version then the commit reference in package.json will have to be updated. This is a temporary measure and will be fixed once the packages are properly versioned and hosted on npm.  
