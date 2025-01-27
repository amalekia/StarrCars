import React, { useEffect, useState, createContext, useContext, JSX } from "react";

type UserContext = {
  name: string;
  email: string;
} | null;

export type AuthContext = {
  user: UserContext;
  loading: boolean;
};

export const AuthContextValue = createContext<AuthContext>({
  user: null,
  loading: true,
});

export const AuthProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [user, setUser] = useState<UserContext>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/user/check-auth`, {
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.authenticated) {
          setUser({ name: data.user.name, email: data.user.email });
        } else {
          console.warn("User not authenticated");
          setUser(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error during fetch:", err);
        setUser(null);
        setLoading(false);
      });
  }, []);

  const contextValue = {
    user,
    loading,
  };

  return (
    <AuthContextValue.Provider value={contextValue}>{children}</AuthContextValue.Provider>
  );
};

export const useAuth = (): AuthContext => useContext(AuthContextValue);
