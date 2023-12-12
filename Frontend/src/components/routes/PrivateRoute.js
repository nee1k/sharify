import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/about", { replace: true });
    }
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return children;
}

export default PrivateRoute;
