import Configuration from "./configuration";
import {
  Order,
  Customer,
  Address,
  Category,
  User,
  Tag,
  Pet,
  ApiResponse,
} from "./model";
import { request, Parameter } from "./request";

// Swagger Petstore - OpenAPI 3.0
export default class Api {
  private config: Configuration;

  constructor(config: Configuration) {
    this.config = config;
  }

  // Update an existing pet
  // Update an existing pet by Id
  // @param body
  async updatePet(body: Pet): Promise<Pet> {
    const params: Parameter[] = [
      {
        name: "body",
        value: body.toString(),
        type: "query",
      },
    ];
    return request(this.config, "/pet", "put", params);
  }

  // Add a new pet to the store
  // Add a new pet to the store
  // @param body
  async addPet(body: Pet): Promise<Pet> {
    const params: Parameter[] = [
      {
        name: "body",
        value: body.toString(),
        type: "query",
      },
    ];
    return request(this.config, "/pet", "post", params);
  }

  // Finds Pets by status
  // Multiple status values can be provided with comma separated strings
  // @param status Status values that need to be considered for filter
  async findPetsByStatus(status: string = "available"): Promise<Pet[]> {
    const params: Parameter[] = [
      {
        name: "status",
        value: status.toString(),
        type: "query",
      },
    ];
    return request(this.config, "/pet/findByStatus", "get", params);
  }

  // Finds Pets by tags
  // Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
  // @param tags Tags to filter by
  async findPetsByTags(tags?: string[]): Promise<Pet[]> {
    const params: Parameter[] = [];
    if (tags) {
      params.push({
        name: "tags",
        value: tags.toString(),
        type: "query",
      });
    }
    return request(this.config, "/pet/findByTags", "get", params);
  }

  // Find pet by ID
  // Returns a single pet
  // @param petId ID of pet to return
  async getPetById(petId: number): Promise<Pet> {
    const params: Parameter[] = [
      {
        name: "petId",
        value: petId.toString(),
        type: "path",
      },
    ];
    return request(this.config, "/pet/{petId}", "get", params);
  }

  // Deletes a pet

  // @param petId Pet id to delete
  // @param api_key
  async deletePet(petId: number, api_key?: string): Promise<null> {
    const params: Parameter[] = [
      {
        name: "petId",
        value: petId.toString(),
        type: "path",
      },
    ];
    if (api_key) {
      params.push({
        name: "api_key",
        value: api_key.toString(),
        type: "header",
      });
    }
    return request(this.config, "/pet/{petId}", "delete", params);
  }

  // Place an order for a pet
  // Place a new order in the store
  // @param body
  async placeOrder(body: Order): Promise<Order> {
    const params: Parameter[] = [
      {
        name: "body",
        value: body.toString(),
        type: "query",
      },
    ];
    return request(this.config, "/store/order", "post", params);
  }

  // Find purchase order by ID
  // For valid response try integer IDs with value &lt;&#x3D; 5 or &gt; 10. Other values will generate exceptions.
  // @param orderId ID of order that needs to be fetched
  async getOrderById(orderId: number): Promise<Order> {
    const params: Parameter[] = [
      {
        name: "orderId",
        value: orderId.toString(),
        type: "path",
      },
    ];
    return request(this.config, "/store/order/{orderId}", "get", params);
  }

  // Delete purchase order by ID
  // For valid response try integer IDs with value &lt; 1000. Anything above 1000 or nonintegers will generate API errors
  // @param orderId ID of the order that needs to be deleted
  async deleteOrder(orderId: number): Promise<null> {
    const params: Parameter[] = [
      {
        name: "orderId",
        value: orderId.toString(),
        type: "path",
      },
    ];
    return request(this.config, "/store/order/{orderId}", "delete", params);
  }

  // Create user
  // This can only be done by the logged in user.
  // @param body
  async createUser(body: User): Promise<User> {
    const params: Parameter[] = [
      {
        name: "body",
        value: body.toString(),
        type: "query",
      },
    ];
    return request(this.config, "/user", "post", params);
  }

  // Creates list of users with given input array
  // Creates list of users with given input array
  // @param body
  async createUsersWithListInput(body: User[]): Promise<User> {
    const params: Parameter[] = [
      {
        name: "body",
        value: body.toString(),
        type: "query",
      },
    ];
    return request(this.config, "/user/createWithList", "post", params);
  }

  // Logs user into the system

  // @param username The user name for login
  // @param password The password for login in clear text
  async loginUser(username?: string, password?: string): Promise<string> {
    const params: Parameter[] = [];
    if (username) {
      params.push({
        name: "username",
        value: username.toString(),
        type: "query",
      });
    }
    if (password) {
      params.push({
        name: "password",
        value: password.toString(),
        type: "query",
      });
    }
    return request(this.config, "/user/login", "get", params);
  }

  // Get user by user name

  // @param username The name that needs to be fetched. Use user1 for testing.
  async getUserByName(username: string): Promise<User> {
    const params: Parameter[] = [
      {
        name: "username",
        value: username.toString(),
        type: "path",
      },
    ];
    return request(this.config, "/user/{username}", "get", params);
  }

  // Update user
  // This can only be done by the logged in user.
  // @param username name that need to be deleted
  // @param body
  async updateUser(username: string, body: User): Promise<null> {
    const params: Parameter[] = [
      {
        name: "username",
        value: username.toString(),
        type: "path",
      },
      {
        name: "body",
        value: body.toString(),
        type: "query",
      },
    ];
    return request(this.config, "/user/{username}", "put", params);
  }

  // Delete user
  // This can only be done by the logged in user.
  // @param username The name that needs to be deleted
  async deleteUser(username: string): Promise<null> {
    const params: Parameter[] = [
      {
        name: "username",
        value: username.toString(),
        type: "path",
      },
    ];
    return request(this.config, "/user/{username}", "delete", params);
  }
}
