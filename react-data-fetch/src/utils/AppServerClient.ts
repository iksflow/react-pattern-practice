export class AppServerClient {
  private static instance: AppServerClient;
  private constructor() {}

  public static getInstance() {
    if (!AppServerClient.instance) {
      AppServerClient.instance = new AppServerClient();
    }
    return AppServerClient.instance;
  }

  public async getTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
  }
}
