import React from "react";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <div className="navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">INSTANT</a>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active"><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/mainbanner">Main Banner</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
