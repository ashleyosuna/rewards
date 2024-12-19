import { User } from "@/types";
import { Dispatch, SetStateAction, createContext } from "react";

type userContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const UserContext = createContext<userContextType>({
  user: null,
  setUser: () => {},
});
export default UserContext;
