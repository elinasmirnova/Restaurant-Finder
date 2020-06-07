import React, { Component } from "react";
import NavbarSearch from "../../components/NavbarSearch/NavbarSearch";
import { getRestaurants } from "../../api/zomato";
import styles from "./index.module.css";
import UpArrow from "../../components/UpArrow";
import DownArrow from "../../components/DownArrow";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";

const PREFIX = "search";

class Search extends Component {
  state = {
    cuisine: "",
    operation: "Search",
    offset: 0,
    position: undefined,
    restaurants: [],
    sortBy: "rating",
    order: "desc",
    favourites: [],
    isLoading: false,
  };

  componentDidMount() {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    this.setState({ favourites });
  }

  onChange = (event) => {
    this.setState({
      cuisine: event.target.value,
    });
  };

  search = (event) => {
    this.setState({
      restaurants: [],
      operation: "Fetching location...",
      isLoading: true,
    });

    navigator.geolocation.getCurrentPosition(async (position) => {
      this.setState({
        operation: "Fetching restaurants...",
        position: position,
      });

      const data = await getRestaurants(
        position,
        this.state.cuisine,
        this.state.offset
      );

      this.setState({
        restaurants: data,
        operation: "Search",
        isLoading: false,
      });
    });
  };

  handleShowMore = async () => {
    this.setState({
      offset: (this.state.offset += 10),
    });

    console.log(this.state.offset);

    const newRestaurants = await getRestaurants(
      this.state.position,
      this.state.cuisine,
      this.state.offset,
      this.state.sortBy,
      this.state.order
    );
    this.setState({
      restaurants: this.state.restaurants.concat(newRestaurants),
    });
  };

  handleSort = async (sortBy, order) => {
    this.setState({
      sortBy,
      order,
    });
    const restaurants = await getRestaurants(
      this.state.position,
      this.state.cuisine,
      this.state.offset,
      sortBy,
      order
    );
    this.setState({ restaurants });
  };

  handleClick = (isFavourite, restaurant) => {
    let favourites;
    if (isFavourite) {
      favourites = this.state.favourites.filter(
        (favourite) => favourite.id !== restaurant.id
      );
    } else {
      favourites = this.state.favourites.concat(restaurant);
    }
    this.setState({ favourites });
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  render() {
    console.log(this.state.sortBy);
    console.log(this.state.order);
    const { sortBy, order } = this.state;
    return (
      <div className={styles[`${PREFIX}_container`]}>
        <div className={styles.navbar}>
          {" "}
          <NavbarSearch
            onChange={this.onChange}
            value={this.state.cuisine}
            search={this.search}
          ></NavbarSearch>{" "}
        </div>
        <div className={styles.sidebar}>
          <p className={styles["filters-label"]}>Filters</p>
          <div className={styles.ratings}>
            <p className={styles["filters-text"]}> Ratings </p>
            <UpArrow
              onClick={() => {
                if (this.state.restaurants.length > 0) {
                  this.handleSort("rating", "asc");
                }
              }}
              className={styles.arrow}
              fill={ sortBy === "rating" && order === "asc" ? "#ffff00" : "#d50000" }
              stroke="white"
              width={30}
            ></UpArrow>
            <DownArrow
              width={30}
              fill={ sortBy === "rating" && order === "desc" ? "#ffff00" : "#d50000" }
              stroke="white"
              onClick={() => {
                if (this.state.restaurants.length > 0) {
                  this.handleSort("rating", "desc");
                }
              }
                
              }
            ></DownArrow>
          </div>
          <div className={styles.cost}>
            <p className={styles["filters-text"]}> Average cost for two </p>
            <UpArrow
              onClick={() => {
                if (this.state.restaurants.length > 0) {
                  this.handleSort("cost", "asc");
                }
              }
              }
              fill={ sortBy === "cost" && order === "asc" ? "#ffff00" : "#d50000" }
              stroke="white"
              width={30}
            ></UpArrow>
            <DownArrow
              width={30}
              fill={ sortBy === "cost" && order === "desc" ? "#ffff00" : "#d50000" }
              stroke="white"
              onClick={() => {
                if (this.state.restaurants.length > 0) {
                  this.handleSort("cost", "desc");
                }
              }
              }
            ></DownArrow>
          </div>
        </div>
        <main>
          {this.state.isLoading && (
            <div className={styles["loader-wrapper"]}>
              {" "}
              <div className={styles.loader}></div> {this.state.operation}{" "}
            </div>
          )}
          {this.state.restaurants.map(({ restaurant }, index) => {
            //restaurant.restaurant = { restaurant } destrukturalizace
            const isFavourite =
              this.state.favourites
                .map(({ id }) => id)
                .indexOf(restaurant.id) !== -1;

            return (
              <div key={index} className={styles.container}>
                <RestaurantCard
                  restaurant={restaurant}
                  isFavourite={isFavourite}
                  handleClick={this.handleClick}
                />
              </div>
            );
          })}
          {this.state.restaurants.length !== 0 ? (
            <button onClick={this.handleShowMore} className={styles.btn}>
              Show more
            </button>
          ) : null}
        </main>
      </div>
    );
  }
}

export default Search;
