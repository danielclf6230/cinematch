import { useContext, useEffect } from "react";
import socket from "../components/socket";
import AuthContext from "../../../../Cinematch4.0/frontend/src/security/AuthContext";

const useSocketSetup = () => {
    const { userLogout } = useContext(AuthContext); // Assuming userLogout is a function in your AuthContext

    useEffect(() => {
        socket.connect();

        const handleConnectError = () => {
            userLogout(); // Assuming userLogout is the correct function in your AuthContext
        };

        // Attach the connect_error event listener
        socket.on("connect_error", handleConnectError);

        // Cleanup: Remove the connect_error event listener on unmount
        return () => {
            socket.off("connect_error", handleConnectError);
        };
    }, [userLogout]);
};

export default useSocketSetup;
