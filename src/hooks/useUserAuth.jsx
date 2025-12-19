import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apipaths";

export const useUserAuth = (requireAuth = true) => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!requireAuth) return; // ✅ PUBLIC PAGE SAFE

    if (user) return;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.AUTH.GET_USER_INFO
        );
        if (response?.data) {
          updateUser(response.data);
        }
      } catch {
        clearUser();
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [requireAuth, user]);
};
