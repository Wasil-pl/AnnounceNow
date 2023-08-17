const baseOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const validateRequest = async (res) => {
  if (res.status === 204) return ''; // No content - empty response

  const response = await res.json();
  if (res.status >= 200 && res.status < 400) return response; // Success

  if (res.status >= 500) throw new Error('Server error. Detals: ' + response.message);
  if (res.status >= 400) throw new Error('Client error. Detals: ' + response.message);
  throw new Error('Unknown error. Details: ' + response.message);
};

const makeRequest = async (url, method = 'GET', body, options) =>
  await fetch(url, { ...baseOptions, method, body: JSON.stringify(body), ...options }).then(validateRequest);

export const httpClient = {
  get: (url) => makeRequest(url),
  post: (url, body) => makeRequest(url, 'POST', body),
  put: (url, body) => makeRequest(url, 'PUT', body),
  patch: (url, body) => makeRequest(url, 'PATCH', body),
  delete: (url, body) => makeRequest(url, 'DELETE'),
};
