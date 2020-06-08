import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import foodIcon from "../../assets/images/food.svg";
import hornIcon from "../../assets/images/horn.png";
import locationIcon from "../../assets/images/location-pin.svg";
import restaurantBuilding from "../../assets/images/restaurant-building.svg";
import starIcon from "../../assets/images/star.svg";

const photo = require("../../assets/no-image-found.png");

class RestaurantCard extends Component {
  render() {
    const { restaurant, isFavourite, handleClick } = this.props;

    let color = {
      "background-color": "#" + restaurant.user_rating["rating_color"],
    };
    return (
      <div className={styles["card-container"]}>
        <div className={styles["media-left"]}>
          <Link to={`/restaurant/${restaurant.id}`}>
            <img
              src={restaurant.thumb || photo}
              alt="thumb"
              className={styles["media-left__image"]}
            />
          </Link>
        </div>
        <div className={styles["media-body"]}>
          <div className={styles["res-info"]}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <div className={styles["info-container"]}>
                <img
                  className={styles.icon}
                  src={restaurantBuilding}
                  alt="Restaurant"
                />
                <h2 className={styles["res_name"]}>{restaurant.name}</h2>{" "}
              </div>
            </Link>
            <div className={styles["info-container"]}>
              <img
                className={styles.icon}
                src={locationIcon}
                alt="Location icon"
              />
              <p className={styles["res-info__text"]}>
                {restaurant.location["city"]}
              </p>
            </div>
            <p className={styles["res-info__text"]}>
              {restaurant.location["address"]}
            </p>

            <p className={styles["average-title"]}>Average Cost for two:</p>
            <p className={styles["average-info"]}>
              {restaurant.average_cost_for_two}
              {restaurant.currency}
            </p>
          </div>
          <div className={styles["res-info"]}>
            <span className={styles["res-info__right-title"]}>Review</span>
            <div className={styles["info-container"]}>
              <p className={styles["res-info__text"]}>Aggregate rating</p>
              <img className={styles.icon} src={starIcon} alt="Star icon" />
              <div className={styles["rating-wrapper"]} style={color}>
                <span className={styles["res_rating"]}>
                  {restaurant.user_rating["aggregate_rating"]}
                </span>
              </div>
              <span> ({restaurant.user_rating["votes"]} votes)</span>
            </div>
            <div className={styles["info-container"]}>
              <img className={styles.icon} src={foodIcon} alt="Food icon" />
              <span className={styles["res-info__right-title"]}>Cursine</span>
            </div>
            {restaurant.cuisines.split(",").map((cuisine, index) => {
              return (
                <div key={index} className={styles.cuisine}>
                  <span className={styles["cuisine-text"]}>{cuisine}</span>
                </div>
              );
            })}
            <div className={styles["info-container"]}>
              <img className={styles.icon} src={hornIcon} alt="Horn icon" />
              <span className={styles["res-info__right-title"]}>
                User Rating
              </span>
            </div>
            <span className={styles["user-rating__text"]}>
              {restaurant.user_rating["rating_text"]}
            </span>
          </div>
          <div className={styles["add-button-wrap"]}>
            <button
              onClick={() => handleClick(isFavourite, restaurant)}
              className={styles["add-button"]}
            >
              {isFavourite ? "Remove" : "Add"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantCard;
