import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

class NavbarHome extends Component {
  render() {
    return (
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles["list-item"]}>
              <Link to={`/`}>
                <a className={styles["list-item__link"]} href="#">
                  Home
                </a>{" "}
              </Link>
            </li>
            <li className={styles["list-item"]}>
              <Link to={`/favourites`}>
                <a className={styles["list-item__link"]} href="#">
                  Favourites
                </a>{" "}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavbarHome;
