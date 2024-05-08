import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  // const [user, setUser] = useState({
  //   id: 1,
  //   name: "Alfian Prisma Yopiangga",
  //   email: "yopiangga@email.com",
  //   role: "doctor",
  // });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
