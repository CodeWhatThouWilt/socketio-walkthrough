import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { restoreUser } from "./store/session";
import { Switch, Route } from "react-router-dom";
import Application from "./components/Application";
import SplashPage from "./components/SplashPage/SplashPage";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        (async () => {
            try {
                dispatch(restoreUser());
                setIsLoaded(true);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [dispatch]);

    return (
        <>
            {/* <Navbar isLoaded={isLoaded} /> */}
            {isLoaded && (
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={user ? Application : SplashPage}
                    />
                </Switch>
            )}
        </>
    );
}

export default App;
