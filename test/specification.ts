import Configuration, { TransportFunc } from "./api/configuration";
import Api from "./api/api";
import { ChildObject, ObjectResponse, ParentObject } from "./api/model";

describe("data types", () => {
  let api: Api;

  beforeEach(() => {
    const config = new Configuration(jest.fn(async (_) => {}));
    api = new Api(config);
  });

  //https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types
  test("primitive data types", async () => {
    api.testDataTypes(
      1,
      2,
      3,
      5,
      "string",
      "string",
      "string",
      true,
      new Date(),
      new Date(),
      "string"
    );
  });

  //github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#data-types
  test("schema / object data types", async () => {
    api.testObjectDataTypes(new ObjectResponse());
  });
});

// https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#oasObject
describe("Open API Document", () => {
  let api: Api;
  let config: Configuration;
  let mockTransport;

  beforeEach(() => {
    mockTransport = jest.fn(async (_) => {});
    config = new Configuration(mockTransport);
    config.basePath = "https://example.com";
    api = new Api(config);
  });

  test("servers", () => {
    expect(config.servers).toEqual(["/api/v3"]);
  });

  // TODO: the generator doesn't support the 'consumes' or 'produces' properties, it assumed JSON

  // https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#pathsObject
  describe("paths", () => {
    // https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#operationObject
    describe("operation object ", () => {
      test("operationId", async () => {
        // this maps to the name exposed by the API
        api.testGetMethod("foo");
      });

      // https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#parameterObject
      describe("parameter object", () => {
        // https://swagger.io/docs/specification/serialization/
        test.skip("parameter encoding", async () => {
          // TODO
        });
        test.skip("required parameters moved to front of signature", async () => {
          api.testRequiredParameters("required");
          api.testRequiredParameters("required", "optional");
        });
        test("path parameters", async () => {
          await api.testPathParameters("foo");
          expect(mockTransport.mock.calls[0][0].url).toBe(
            "https://example.com/api/v3/test/foo/pathParameters"
          );
        });

        test("query parameters", async () => {
          await api.testGetMethod("foo");
          expect(mockTransport.mock.calls[0][0].url).toBe(
            "https://example.com/api/v3/test/get?value=foo"
          );
        });

        test("parameter default values", async () => {
          await api.testDefaultParam();
          expect(mockTransport.mock.calls[0][0].url).toBe(
            "https://example.com/api/v3/test/testDefaultParam?paramTwo=valTwo"
          );
        });
        test.skip("header parameters", async () => {
          // TODO
        });
        test.skip("body parameters", async () => {
          // TODO
        });
        test.skip("form parameters", async () => {
          // TODO
        });

        // https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#path-item-object
        describe("items object", () => {
          describe("collectionFormat", () => {
            test("defaults to CSV", async () => {
              await api.testCsvCollectionParams(["one", "two"]);
              expect(mockTransport.mock.calls[0][0].url).toBe(
                "https://example.com/api/v3/test/csvCollectionParams?value=one%2Ctwo"
              );
            });
            test.skip("supports SSV", async () => {
              // TODO
            });
            test.skip("supports TSV", async () => {
              // TODO
            });
            test.skip("supports pipes", async () => {
              // TODO
            });
            test.skip("supports multi", async () => {
              // TODO
            });
          });
        });

        // https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#responseObject
        describe("responses object", () => {
          test("primitive response type", async () => {
            let str: string = await api.testResponsePrimitive();
          });
          test("object response type", async () => {
            let obj: ObjectResponse = await api.testResponseObject();
          });
        });
      });
    });

    describe("HTTP verbs", () => {
      test("get", async () => {
        await api.testGetMethod("foo");
        expect(mockTransport.mock.calls[0][0].url).toBe("https://example.com/api/v3/test/get?value=foo");
        expect(mockTransport.mock.calls[0][0].method).toBe("get");
      });

      test.skip("put", () => {});
      test.skip("post", () => {});
      test.skip("delete", () => {});
      test.skip("options", () => {});
      test.skip("head", () => {});
      test.skip("patch", () => {});
    });
  });
});

// https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#componentsObject
describe("components", () => {
  let api: Api;

  beforeEach(() => {
    const config = new Configuration(jest.fn(async (_) => {}));
    api = new Api(config);
  });

  // https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#schemaObject
  describe("schemas", () => {
    test("simple object", () => {
      const obj = new ObjectResponse();
      obj.value = undefined;
      obj.id = undefined;
      expect(obj.id).toBeUndefined();
      expect(obj.value).toBeUndefined();
    });

    test("required properties", () => {
      const obj = new ObjectResponse();
      obj.value = "foo";
      expect(obj.value).toBe("foo");
    });

    test("object references", () => {
      const obj = new ParentObject();
      obj.child = new ChildObject();
    });

    test.skip("additional properties", () => {});
  });
});
