import React, { Component } from "react";
import styles from "./index.module.css";
import { findRestaurant } from "../../api/zomato";
import NavbarHome from "../../components/NavbarHome/NavbarHome";
import Highlights from "./Highlights";
import RestaurantMap from "../../components/RestaurantMap/RestaurantMap";
const photo = require("../../assets/no-image-found.png");

class RestaurantPage extends Component {
  state = {
    restaurant: null,
  };

  async componentDidMount() {
    const restaurant = await findRestaurant(this.props.match.params.id);
    this.setState({
      restaurant,
    });
  }

  render() {
    const { restaurant } = this.state;

    if (!restaurant) {
      return <div> Loading ...</div>;
    }

    return (
      <div className={styles.container}>
        <div className={styles.navbar}>
          <NavbarHome></NavbarHome>
        </div>
        <div className={styles.column1}> </div>
        <div className={styles["restaurant-photo"]}>
          <img
            className={styles.img}
            src={restaurant.featured_image || photo}
            alt="thumb"
          />
        </div>
        <div className={styles.map}>
          {" "}
          <RestaurantMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDlRic6xdzD863ERw3ytycvY7djAIan7Is&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%`, width: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={restaurant.location.latitude}
            lng={restaurant.location.longitude}
          ></RestaurantMap>
        </div>
        <div className={styles.column2}> </div>
        <main className={styles.main}>
          <div className={styles["res-info"]}>
            <h1 className={styles["restaurant-name"]}>{restaurant.name}</h1>

            <div className={styles["content-right"]}>
              <span style={{ color: "#ff5252" }}>
                {restaurant.user_rating.rating_text}
              </span>
              <span> {restaurant.user_rating["votes"]} votes </span>
            </div>
          </div>

          <div className={styles["res-info"]}>
            <p>
              {" "}
              <span>{restaurant.establishment}</span>{" "}
            </p>
            <p>&nbsp;</p>
            <p>
              <strong>Cuisines: </strong>
              {restaurant.cuisines}
            </p>
            <p>
              <strong>Cost for two: </strong>
              {restaurant.average_cost_for_two}
              {restaurant.currency}
            </p>
          </div>

          <div className={styles["res-info"]}>
            <p>{restaurant.location.city}</p>
            <p>&nbsp;</p>
            <p>
              <strong>Address:</strong>
            </p>
            <p>{restaurant.location.address}</p>
            <p>{restaurant.location.locality}</p>
          </div>
          <div className={styles["res-info"]}>
            <strong>Phone number: </strong>
            <span>{restaurant.phone_numbers}</span>
            <p>&nbsp;</p>
            <strong>Opening hours: </strong>
            <span>{restaurant.timings}</span>
          </div>
          <div className={styles["res-info"]}>
            <ul className={styles["highlights-list"]}>
              {restaurant.highlights.map((item) => (
                <Highlights name={item} />
              ))}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

export default RestaurantPage;
