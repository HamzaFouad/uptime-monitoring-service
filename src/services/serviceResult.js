export const serviceResult = (data, status, errors) => ({
  data: data,
  status: status,
  errors: errors ? errors.toString() : "",
});
