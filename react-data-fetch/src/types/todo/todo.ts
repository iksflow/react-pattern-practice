export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoCreateInput {
  title: string;
  completed?: boolean;
}
