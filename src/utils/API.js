export default async function fetchData({
  url, method = 'get', params = {}, data = {},
}) {
  const response = await fetch(
    `/${process.env.VUE_APP_API_VERSION}/${url}`,
    {
      method,
      data,
      params,
      'data-raw': data,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`,
      },
    },
  );

  if (response.ok) {
    return response.json();
  }
  /**
     * we return the errors object, in case any module needs custom error handling,
     * but for global errors has to be handled here to avoid duplication
     */
  return { status: response.status, message: response.statusText };
}
