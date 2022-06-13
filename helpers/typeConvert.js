function typeConvert(prop) {
  if (prop == undefined) return "";

  // resolve references
  if (prop.$ref) {
    return prop.$ref.split("/").pop();
  }

  switch (prop.type) {
    case "integer":
    case "long":
    case "float":
    case "double":
      return "number";
    case "string":
    case "byte":
    case "binary":
    case "password":
      return "string";
    case "boolean":
      return "boolean";
    case "date":
    case "dateTime":
      return "Date";
    case "array":
      return `${typeConvert(prop.items)}[]`;
    // inline object definition
    case "object":
      if (prop.additionalProperties) {
        return `{ [name: string]: ${typeConvert(prop.additionalProperties)} }`
      } else {
        return "{}";
      }
  }
  return "";
}

module.exports = typeConvert;
