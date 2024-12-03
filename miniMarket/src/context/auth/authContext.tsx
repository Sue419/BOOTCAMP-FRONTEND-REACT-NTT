import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { initialAuthState, authReducer } from "./authReducer";
import { AuthState, AuthAction } from "./authTypes";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { storedValue: storedToken, setStoredValue: setStoredToken } = useLocalStorage<string | null>("authToken", null);
  const { storedValue: storedUser, setStoredValue: setStoredUser } = useLocalStorage<string | null>("authUser", null);

  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    if (storedToken && storedUser) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: JSON.parse(storedUser), token: storedToken },
      });
    }
  }, [storedToken, storedUser]);

  useEffect(() => {
    if (state.token && state.user) {
      setStoredToken(state.token);
      setStoredUser(JSON.stringify(state.user));
    } else {
      setStoredToken(null);
      setStoredUser(null);
    }
  }, [state.token, state.user, setStoredToken, setStoredUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};