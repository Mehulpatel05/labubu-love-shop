import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    navigate("/login", { replace: true, state: location.state });
  }, []);
  return null;
}
