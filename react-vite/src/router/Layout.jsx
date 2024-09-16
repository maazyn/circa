import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { ModeProvider } from "../context/ModeContext";
// import AuxiliaryNav from "../components/AuxiliaryNav/AuxiliaryNav";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <ModeProvider>
          <Navigation />
          {/* <AuxiliaryNav/> */}
          {isLoaded && <Outlet />}
          <Modal />
        </ModeProvider>
      </ModalProvider>
    </>
  );
}
