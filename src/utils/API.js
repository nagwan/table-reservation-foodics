export default async function fetchData({
  url, method = 'get', params = {}, data = {},
}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`,
    },
  };

  if (method.toLowerCase() === 'get') {
    options.params = params;
  } else {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`/${process.env.VUE_APP_API_VERSION}/${url}`, options);

  if (response.ok) {
    return { status: response.status, data: await response.json() };
  }
  /**
     * we return the errors object, in case any module needs custom error handling,
     * but for global errors has to be handled here to avoid duplication
     */
  return { status: response.status, data: { message: response.statusText } };
}
