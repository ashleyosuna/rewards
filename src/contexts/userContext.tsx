import { User } from "@/types";
import { createContext } from "react";

type userContextType = {
  user: User | null;
};

const UserContext = createContext<userContextType>({
  user: null,
});
export default UserContext;
