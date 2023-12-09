enum status {
  TODO, IN_PROCESS, DONE
}

export type Todo = {
  id: number,
  title: string,
  status: status
};