export const serviceResult = (data, status, errors) => ({
  data: data.toJSON(),
  status: status,
  errors: errors ? errors.toString() : "",
});
