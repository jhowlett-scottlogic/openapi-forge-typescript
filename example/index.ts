import Api from "./api/api";
import Configuration from "./api/configuration";
import { Pet } from "./api/model";
import { transport } from "./api/nodeFetch"

const config = new Configuration(transport);
config.basePath = "https://petstore3.swagger.io";
const api = new Api(config);

// equivalent to
//
// curl -X 'GET' \
//   'https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available' \
//   -H 'accept: application/json'
api.findPetsByStatus("available").then((data) => {
  console.log(data);
});

// api
//   .addPet({
//     id: 2330,
//     name: "Fido",
//     photoUrls: ["http://example.com/photo1"],
//     status: "available",
//     category: {
//       id: 1,
//       name: "dog",
//     },
//     tags: [
//       {
//         id: 0,
//         name: "string",
//       },
//     ],
//   })
//   .then((data) => {
//     console.log(data);
//   });

