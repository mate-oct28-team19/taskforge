import { Task } from "./Task";

export type Board = {
  board_id: number,
  board_title: string,
  items: Task[],
}