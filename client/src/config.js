export const API_URL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:8000';
export const IMAGES_URL =
  process.env.NODE_ENV === 'production' ? '/uploads/images/' : 'http://localhost:8000/uploads/images/';
export const AVATARS_URL =
  process.env.NODE_ENV === 'production' ? '/uploads/avatars/' : 'http://localhost:8000/uploads/avatars/';
