import React from "react";

const Header: React.FC = () => {
    return (
        <header>
            <h1>Mi Portfolio</h1>
            <nav>
                <ul>
                    <li><a href="#about">Sobre Mi</a></li>
                    <li><a href="#proyects">Proyectos</a></li>
                    <li><a href="#contract">Contacto</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;