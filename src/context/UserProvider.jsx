import React, { useEffect, useState } from "react";
import { userContext } from "./userContext";

export default function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "mohit",
  });

  useEffect(() => setUser({ name: "Mohit Joshi" }), []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}
