import About from "../components/About";
import Header from "../components/Header";
import Services from "../components/Services";
import IncomingSchedule from "../components/IncomingSchedule";
import Map from "../components/Map";
import Footer from "../components/Footer";

function HomePage() {
    return (
        <>
            <Header />
            <About />
            <Services />
            <IncomingSchedule />
            <Map />
            <Footer />
        </>
    );
}

export default HomePage;
