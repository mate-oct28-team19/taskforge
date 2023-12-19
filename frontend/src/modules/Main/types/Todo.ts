enum Status {
  TODO = 'TODO',
  IN_PROCESS = 'IN_PROCESS',
  DONE = 'DONE'
}

export type Todo = {
  id: number,
  title: string,
  status: Status
};