import React, { useEffect, useState, createContext, useContext, JSX } from "react";

type UserContext = {
  name: string;
  email: string;
};

export type AuthContext = {
  user: UserContext;
  loading: boolean;
};

export const AuthContextValue = createContext<AuthContext>({
  user: {
    name: "",
    email: "",
  },
  loading: true,
});

export const AuthProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/user/check-auth`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status === 200) {
          const json = await res.json();
          setName(json.user.name);
          setEmail(json.user.email);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error checking authentication:", err);
        setLoading(false);
      });
      
  }, []);

  const contextValue = {
    user: {
      name,
      email,
    },
    loading,
  };

  return (
    <AuthContextValue.Provider value={contextValue}>{children}</AuthContextValue.Provider>
  );
};

export const useAuth = (): AuthContext => useContext(AuthContextValue);