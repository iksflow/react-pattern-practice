export class AppServerClient {
  private baseURL = 'https://jsonplaceholder.typicode.com';

  async get(endpoint: string): Promise<any> {
    return fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
