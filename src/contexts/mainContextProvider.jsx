import { createContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "../helpers/cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
export const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [user, setUser] = useState(getCookie("token") ? true : null);
  const [role, setRole] = useState();
  const [expire, setExpire] = useState(null);
  const navigate = useNavigate();

  const requestNewToken = async () => {
    const refreshToken = getCookie("refresh_token");
    console.log(refreshToken);
    if (refreshToken !== undefined) {
      try {
        const response = await fetch(
          `https://apistreet.aimtech.az/api/Auth/LoginWithRefreshToken?refreshToken=${refreshToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setCookie("token", data.token, data.expires);
        setCookie("refresh_token", data.refreshToken, data.refreshTokenExpires);
        setExpire(data.refreshTokenExpires);
      } catch (error) {
        console.error("Error refreshing token:", error.message);
      }
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    const retrieveTokenData = async () => {
      if (token) {
        const decoded = jwtDecode(token);
        const user_name =
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        setUser(user_name);

        const user_role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        setRole(user_role);
        setExpire(decoded.exp);
        navigate("/");
        // navigate('/adminpanel/products')
      }
    };
    retrieveTokenData();
  }, [user]);

  useEffect(() => {
    const convertToUnixTimestamp = expire => {
      if (typeof expire === "number") {
        return expire; // If expire is already a Unix timestamp
      } else if (typeof expire === "string") {
        return Math.floor(new Date(expire).getTime() / 1000); // Convert ISO 8601 date string to Unix timestamp
      }
      return null;
    };

    const token = getCookie("token");
    const expireTimestamp = convertToUnixTimestamp(expire);

    if (expireTimestamp && token) {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeDifferenceInMilliseconds = (expireTimestamp - now) * 1000; // Convert to milliseconds

      const timeout = setTimeout(() => {
        requestNewToken();
      }, timeDifferenceInMilliseconds - 10000); // Request 10 seconds before expiry

      // Cleanup the timeout when component unmounts or expire changes
      return () => clearTimeout(timeout);
    }
  }, [expire]);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        role,
        setRole,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
