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
import { deserialize } from "./serializer";

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
    const response = await request(this.config, "/pet", "put", params);
    return deserialize(response, "Pet");
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
    const response = await request(this.config, "/pet", "post", params);
    return deserialize(response, "Pet");
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
    const response = await request(
      this.config,
      "/pet/findByStatus",
      "get",
      params
    );
    return deserialize(response, "Pet[]");
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
    const response = await request(
      this.config,
      "/pet/findByTags",
      "get",
      params
    );
    return deserialize(response, "Pet[]");
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
    const response = await request(this.config, "/pet/{petId}", "get", params);
    return deserialize(response, "Pet");
  }

  // Updates a pet in the store with form data

  // @param petId ID of pet that needs to be updated
  // @param name Name of pet that needs to be updated
  // @param status Status of pet that needs to be updated
  async updatePetWithForm(
    petId: number,
    name?: string,
    status?: string
  ): Promise<null> {
    const params: Parameter[] = [
      {
        name: "petId",
        value: petId.toString(),
        type: "path",
      },
    ];
    if (name) {
      params.push({
        name: "name",
        value: name.toString(),
        type: "query",
      });
    }
    if (status) {
      params.push({
        name: "status",
        value: status.toString(),
        type: "query",
      });
    }
    const response = await request(this.config, "/pet/{petId}", "post", params);
    return deserialize(response, "null");
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
    const response = await request(
      this.config,
      "/pet/{petId}",
      "delete",
      params
    );
    return deserialize(response, "null");
  }

  // uploads an image

  // @param petId ID of pet to update
  // @param additionalMetadata Additional Metadata
  async uploadFile(
    petId: number,
    additionalMetadata?: string
  ): Promise<ApiResponse> {
    const params: Parameter[] = [
      {
        name: "petId",
        value: petId.toString(),
        type: "path",
      },
    ];
    if (additionalMetadata) {
      params.push({
        name: "additionalMetadata",
        value: additionalMetadata.toString(),
        type: "query",
      });
    }
    const response = await request(
      this.config,
      "/pet/{petId}/uploadImage",
      "post",
      params
    );
    return deserialize(response, "ApiResponse");
  }

  // Returns pet inventories by status
  // Returns a map of status codes to quantities
  async getInventory(): Promise<{ [name: string]: number }> {
    const params: Parameter[] = [];
    const response = await request(
      this.config,
      "/store/inventory",
      "get",
      params
    );
    return deserialize(response, "{ [name: string]: number }");
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
    const response = await request(this.config, "/store/order", "post", params);
    return deserialize(response, "Order");
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
    const response = await request(
      this.config,
      "/store/order/{orderId}",
      "get",
      params
    );
    return deserialize(response, "Order");
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
    const response = await request(
      this.config,
      "/store/order/{orderId}",
      "delete",
      params
    );
    return deserialize(response, "null");
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
    const response = await request(this.config, "/user", "post", params);
    return deserialize(response, "User");
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
    const response = await request(
      this.config,
      "/user/createWithList",
      "post",
      params
    );
    return deserialize(response, "User");
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
    const response = await request(this.config, "/user/login", "get", params);
    return deserialize(response, "string");
  }

  // Logs out current logged in user session

  async logoutUser(): Promise<null> {
    const params: Parameter[] = [];
    const response = await request(this.config, "/user/logout", "get", params);
    return deserialize(response, "null");
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
    const response = await request(
      this.config,
      "/user/{username}",
      "get",
      params
    );
    return deserialize(response, "User");
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
    const response = await request(
      this.config,
      "/user/{username}",
      "put",
      params
    );
    return deserialize(response, "null");
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
    const response = await request(
      this.config,
      "/user/{username}",
      "delete",
      params
    );
    return deserialize(response, "null");
  }
}
