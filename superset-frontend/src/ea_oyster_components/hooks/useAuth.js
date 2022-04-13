import { useContext } from "react";
import AuthContext from "src/ea_oyster_components/contexts/JWTAuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
