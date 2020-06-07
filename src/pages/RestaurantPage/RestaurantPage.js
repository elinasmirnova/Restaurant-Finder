import React, { Component } from "react";
import styles from "./index.module.css";
import { findRestaurant } from "../../api/zomato";
import NavbarHome from "../../components/NavbarHome/NavbarHome";
import Highlights from "./Highlights";
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
    console.log(restaurant);
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
          <img className={styles.img} src={restaurant.featured_image || photo} alt="thumb" />
        </div>
        <div className={styles.map}>  </div>
        <div className={styles.column2}> </div>
        <main>
          <div className={styles["res-info"]}>
            <h3 className={styles["restaurant-name"]}>
              {restaurant.restaurant_name}
            </h3>

            <span className={`${styles}`}>{restaurant.aggregate_rating}</span>
            <span>{restaurant.rating_text}</span>
            <span> {restaurant.user_rating["votes"]} votes </span>
          </div>
          <div className={styles["res-info"]}>
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
            <p>
              <strong>Address:</strong>
            </p>
            <p>{restaurant.location.address}</p>
            <p>{restaurant.location.locality}</p>
          </div>
          <div className={styles["res-info"]}>
            <span>{restaurant.establishment}</span>
            <span>{restaurant.phone_numbers}</span>
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
