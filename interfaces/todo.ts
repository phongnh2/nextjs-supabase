export enum TodoStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface ITodo {
  id: string;
  note: string;
  status: TodoStatus;
  created_at: string;
}