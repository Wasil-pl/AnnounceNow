const baseOptions = {
  method: 'GET',
  credentials: 'include',
};

const validateRequest = async (res) => {
  if (res.status === 204) return ''; // No content - empty response

  const response = await res.json();
  if (res.status >= 200 && res.status < 400) return response; // Success

  if (res.status >= 500) throw new Error('Server error. Detals: ' + response.message);
  if (res.status >= 400) throw new Error('Client error. Detals: ' + response.message);
  throw new Error('Unknown error. Details: ' + response.message);
};

const makeRequest = async (url, method = 'GET', body, options) => {
  const requestOptions = {
    ...baseOptions,
    method,
    ...options,
  };

  if (body) {
    if (body instanceof FormData) {
      requestOptions.body = body;
    } else {
      requestOptions.headers = {
        'Content-Type': 'application/json',
      };
      requestOptions.body = JSON.stringify(body);
    }
  }
  return fetch(url, requestOptions).then(validateRequest);
};

export const httpClient = {
  get: (url) => makeRequest(url),
  post: (url, body) => makeRequest(url, 'POST', body),
  put: (url, body) => makeRequest(url, 'PUT', body),
  patch: (url, body) => makeRequest(url, 'PATCH', body),
  delete: (url, body) => makeRequest(url, 'DELETE'),
};
