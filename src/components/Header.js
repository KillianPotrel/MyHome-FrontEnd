import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="home">Accueil</Link>
            </li>
            <li>
              <Link to="contact">Contact</Link>
            </li>
            <li></li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
