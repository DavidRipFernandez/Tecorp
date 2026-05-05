import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5239/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function extractApiError(err: unknown): string {
  if (
    axios.isAxiosError(err) &&
    err.response?.data &&
    typeof err.response.data === 'object' &&
    'error' in err.response.data &&
    typeof (err.response.data as Record<string, unknown>).error === 'object'
  ) {
    const apiErr = (err.response.data as { error: { message?: string } }).error;
    if (apiErr.message) return apiErr.message;
  }
  return 'Error inesperado. Intenta de nuevo.';
}

export default apiClient;
