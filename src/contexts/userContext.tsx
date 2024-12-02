import { Dispatch, SetStateAction, createContext } from "react";

export type User = {
  name: String;
  total: Number;
  tasks: Object[];
};

type userContextType = {
  user: User | null;
};

const UserContext = createContext<userContextType>({
  user: null,
});
export default UserContext;
