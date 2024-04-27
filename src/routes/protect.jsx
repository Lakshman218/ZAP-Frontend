import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function protect() {
  const navigate = useNavigate();
  const selectUser = (state) => state.auth.user
  const user = useSelector(selectUser)

  if (user) {
    return children;
  } else {
    navigate("/login"); 
  }
}

export default protect