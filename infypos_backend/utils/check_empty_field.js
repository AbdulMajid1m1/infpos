const { isEmpty } = require("lodash");

function checkEmptyFields(fields) {
  const missingFields = fields.filter(field => isEmpty(field.value));

  if (missingFields.length > 0) {
    return {
      success: false,
      error: `Missing required fields: ${missingFields.map(field => field.name).join(', ')}`,
      body: null,
    };
  }

  return {
    success: true,
  };
}

module.exports = checkEmptyFields;
