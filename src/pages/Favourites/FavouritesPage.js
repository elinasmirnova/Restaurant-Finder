import React, { Component } from "react";
import styles from "./index.module.css";
import Navbar from "../../components/NavbarHome/NavbarHome";
import RestaurantCardFavourite from "../../components/RestaurantCardFavourite/RestaurantCardFavourite";

class FavouritesPage extends Component {
  state = {
    favourites: JSON.parse(localStorage.getItem("favourites")) || [],
  };

  handleClick = (restaurant) => {
    let favourites;
    favourites = this.state.favourites.filter(
      (favourite) => favourite.id !== restaurant.id
    );
    this.setState({ favourites });
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.navbar}>
          {" "}
          <Navbar />
        </div>
        <div className={styles.title}> <h2> Your favourite restaurants </h2> </div>
        <div className={styles.column1}></div>
        <main className={styles.main}>
            {this.state.favourites.map((restaurant, index) => {
              return (
                <div className={styles.card}>
                <RestaurantCardFavourite
                  restaurant={restaurant}
                  handleClick={this.handleClick}
                />
                </div>
              );
            })}
        </main>
        <div className={styles.column2}></div>
      </div>
    );
  }
}

export default FavouritesPage;
