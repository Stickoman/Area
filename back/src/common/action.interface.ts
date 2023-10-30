
type ActionType = 'timer:scheduled_task';

interface Action {
  timerId?: string;
}

export type {Action, ActionType};
