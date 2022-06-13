function typeConvert(prop) {
  if (prop == undefined) return "";

  // resolve references
  if (prop.$ref) {
    return prop.$ref.split("/").pop();
  }

  switch (prop.type) {
    case "integer":
    case "number":
      return "number";
    case "string":
      return "string";
    case "boolean":
      return "boolean";
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
