export class Order {
  static propertyTypes: Array<{ name: string; type: string }> = [
    {
      name: "id",
      type: "number",
    },
    {
      name: "petId",
      type: "number",
    },
    {
      name: "quantity",
      type: "number",
    },
    {
      name: "shipDate",
      type: "string",
    },
    {
      name: "status",
      type: "string",
    },
    {
      name: "complete",
      type: "boolean",
    },
  ];

  public id?: number;
  public petId?: number;
  public quantity?: number;
  public shipDate?: string;
  // Order Status
  public status?: string;
  public complete?: boolean;
}

export class Customer {
  static propertyTypes: Array<{ name: string; type: string }> = [
    {
      name: "id",
      type: "number",
    },
    {
      name: "username",
      type: "string",
    },
    {
      name: "address",
      type: "Address[]",
    },
  ];

  public id?: number;
  public username?: string;
  public address?: Address[];
}

export class Address {
  static propertyTypes: Array<{ name: string; type: string }> = [
    {
      name: "street",
      type: "string",
    },
    {
      name: "city",
      type: "string",
    },
    {
      name: "state",
      type: "string",
    },
    {
      name: "zip",
      type: "string",
    },
  ];

  public street?: string;
  public city?: string;
  public state?: string;
  public zip?: string;
}

export class Category {
  static propertyTypes: Array<{ name: string; type: string }> = [
    {
      name: "id",
      type: "number",
    },
    {
      name: "name",
      type: "string",
    },
  ];

  public id?: number;
  public name?: string;
}

export class User {
  static propertyTypes: Array<{ name: string; type: string }> = [
    {
      name: "id",
      type: "number",
    },
    {
      name: "username",
      type: "string",
    },
    {
      name: "firstName",
      type: "string",
    },
    {
      name: "lastName",
      type: "string",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "password",
      type: "string",
    },
    {
      name: "phone",
      type: "string",
    },
    {
      name: "userStatus",
      type: "number",
    },
  ];

  public id?: number;
  public username?: string;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;
  public phone?: string;
  // User Status
  public userStatus?: number;
}

export class Tag {
  static propertyTypes: Array<{ name: string; type: string }> = [
    {
      name: "id",
      type: "number",
    },
    {
      name: "name",
      type: "string",
    },
  ];

  public id?: number;
  public name?: string;
}

export class Pet {
  static propertyTypes: Array<{ name: string; type: string }> = [
    {
      name: "id",
      type: "number",
    },
    {
      name: "name",
      type: "string",
    },
    {
      name: "category",
      type: "Category",
    },
    {
      name: "photoUrls",
      type: "string[]",
    },
    {
      name: "tags",
      type: "Tag[]",
    },
    {
      name: "status",
      type: "string",
    },
  ];

  public id?: number;
  public name: string;
  public category?: Category;
  public photoUrls: string[];
  public tags?: Tag[];
  // pet status in the store
  public status?: string;
}

export class ApiResponse {
  static propertyTypes: Array<{ name: string; type: string }> = [
    {
      name: "code",
      type: "number",
    },
    {
      name: "type",
      type: "string",
    },
    {
      name: "message",
      type: "string",
    },
  ];

  public code?: number;
  public type?: string;
  public message?: string;
}

export const models = [
  "Order",
  "Customer",
  "Address",
  "Category",
  "User",
  "Tag",
  "Pet",
  "ApiResponse",
];
