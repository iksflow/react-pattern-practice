export class AppServerClient {
  private static instance: AppServerClient;
  private baseURL = 'https://jsonplaceholder.typicode.com';

  static getInstance() {
    if (!AppServerClient.instance) {
      AppServerClient.instance = new AppServerClient();
    }
    return AppServerClient.instance;
  }

  async get(endpoint: string): Promise<any> {
    return fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
