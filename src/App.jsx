import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Header, Footer } from "./_containers";
import { _AppRouter } from "./_pages";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from ".";
import Loader from "./_components/Loader";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const App = () => {
    const { auth } = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    if (loading) return <Loader />;

    return (
        <Router>
            <ScrollToTop />
            <Header />
            <main className="page">
                <Suspense fallback={<Loader />}>
                    <_AppRouter />
                </Suspense>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
