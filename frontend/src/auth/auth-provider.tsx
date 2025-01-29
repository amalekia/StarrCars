import React, { useEffect, useState, createContext, useContext, JSX } from "react";

type UserContext = {
  _id: string;
  name: string;
  email: string;
} | null;

export type AuthContext = {
  user: UserContext;
  loading: boolean;
  setUser: (user: UserContext) => void;
};

export const AuthContextValue = createContext<AuthContext>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const AuthProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [user, setUser] = useState<UserContext>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/user/check-auth`, {
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.authenticated) {
          setUser({ _id: data.user._id, name: data.user.name, email: data.user.email });
        } else {
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
    setUser,
  };

  return (
    <AuthContextValue.Provider value={contextValue}>{children}</AuthContextValue.Provider>
  );
};

export const useAuth = (): AuthContext => useContext(AuthContextValue);
