import React from "react";
import PortfolioGrid from './PortfolioGrid';
import MainBanner from "./MainBanner";

const Home: React.FC = () => {
    return(
        <main>
            <MainBanner />
            <PortfolioGrid />
        </main>
    )
}

export default Home;