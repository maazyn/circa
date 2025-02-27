import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { ModeProvider } from "../context/ModeContext";
import { ForecastProvider } from "../context/ForecastContext";
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
          <ForecastProvider>
            <Navigation />
              {/* <AuxiliaryNav/> */}
              {isLoaded && <Outlet />}
            <Modal />
          </ForecastProvider>
        </ModeProvider>
      </ModalProvider>
    </>
  );
}
