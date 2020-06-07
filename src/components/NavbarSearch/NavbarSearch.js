import React, { Component } from "react";
import { getRestaurants } from "../../api/zomato.js";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

class NavbarSearch extends Component {
  render() {
    return (
      <div className={styles.navbar}>
        <nav className={styles["nav-header"]}>
          <div className={styles["button-wrapper"]}>
            <input
              type="text"
              value={this.props.value}
              onChange={this.props.onChange}
              placeholder="Search.."
              className={styles["search-input"]}
            />
            <button
              className={styles["search-button"]}
              type="submit"
              onClick={this.props.search}
            >
              Search
            </button>
          </div>

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

export default NavbarSearch;
