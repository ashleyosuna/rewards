export type TaskType = {
  _id?: string;
  description: string;
  price: number;
  completed: boolean;
  user: string;
};

export type User = {
  _id?: string;
  username: string;
  total: number;
  tasks: string[];
};

export type RewardType = {
  _id?: string;
  description: string;
  price: number;
  user?: string;
};
