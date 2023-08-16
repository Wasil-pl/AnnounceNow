const baseOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const httpClient = {
  get: (url) => fetch(url),
  post: (url, body) => fetch(url, { ...baseOptions, method: 'POST', body: JSON.stringify(body) }),
  put: (url, body) => fetch(url, { ...baseOptions, method: 'PUT', body: JSON.stringify(body) }),
  patch: (url, body) => fetch(url, { ...baseOptions, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (url, body) => fetch(url, { ...baseOptions, method: 'DELETE' }),
};
