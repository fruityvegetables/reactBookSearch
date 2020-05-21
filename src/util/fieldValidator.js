export const FieldValidator = (fieldLabel, fieldRules, value) => {
  const error = [];
  Object.keys(fieldRules).forEach(key => {
    switch (key) {
      case "required":
        if (/^\s*$/.test(value)) {
          error.push(`${fieldLabel} field is required`);
        }
        break;
      case "string":
        if (typeof value !== "string") {
          error.push(`${fieldLabel} must be a string`);
        }
        break;
      case "numeric":
        if (!/^\+?[1-9]\d*$/.test(value)) {
          error.push(`${fieldLabel} must be a Positive Integer`);
        }
        break;
      case "boolean":
        if (typeof value !== "boolean") {
          error.push(`${fieldLabel} must be a boolean`);
        }
        break;
      case "match":
        if (!fieldRules.match.match.test(value)) {
          error.push(`${fieldRules.match.message}`);
        }
        break;
      case "json":
        try {
          const json = JSON.parse(value);
        } catch (err) {
          error.push("JSON format cannot be parsed");
        }
        break;
    }
  });
  return error;
};
