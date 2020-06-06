import React, { Component } from 'react';
import Navbar from '../../components/NavbarSearch/Navbar';
import { getRestaurants } from '../../api/zomato';
import styles from './index.module.css';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

const PREFIX = 'search';

class Search extends Component {
  state = {
    cuisine: '',
    operation: 'Search',
    offset: 0,
    position: undefined,
    restaurants: [],
    sortBy: 'rating',
    order: 'desc',
    favourites: [],
    isLoading: false,
  };

  componentDidMount() {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    this.setState({ favourites });
  }

  onChange = (event) => {
    this.setState({
      cuisine: event.target.value,
    });
  };

  search = (event) => {
    this.setState({
      operation: 'Fetching location..',
      isLoading: true,
    });

    navigator.geolocation.getCurrentPosition(async (position) => {
      this.setState({
        operation: 'Fetching restaurants...',
        position: position,
      });

      const data = await getRestaurants(position, this.state.cuisine, this.state.offset);

      this.setState({
        restaurants: data,
        operation: 'Search',
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
      favourites = this.state.favourites.filter((favourite) => favourite.id !== restaurant.id);
    } else {
      favourites = this.state.favourites.concat(restaurant);
    }
    this.setState({ favourites });
    localStorage.setItem('favourites', JSON.stringify(favourites));
  };

  render() {
    return (
      <div className={styles[`${PREFIX}_container`]}>
        <div className={styles.navbar}>
          {' '}
          <Navbar
            onChange={this.onChange}
            value={this.state.cuisine}
            search={this.search}
            operation={this.state.operation}
          ></Navbar>{' '}
        </div>
        <div className={styles.sidebar}>
          <button
            onClick={() => this.handleSort('rating', 'asc')}
            className={
              this.state.sort === 'ratings'
                ? `${styles.active} ${styles.btn} ${styles['btn-link']}`
                : `${styles.btn} ${styles['btn-link']}`
            }
            type='button'
          >
            Ratings
            <span className={`${styles.sort} ${styles['sorting-up']}`} />
          </button>
          <button
            onClick={() => this.handleSort('cost', 'asc')}
            className={
              this.state.sort === 'ratings'
                ? `${styles.active} ${styles.btn} ${styles['btn-link']}`
                : `${styles.btn} ${styles['btn-link']}`
            }
            type='button'
          >
            Average cost for two
            <span className={`${styles.sort} ${styles['sorting-down']}`} />
          </button>
        </div>
        <main>
          {this.state.isLoading && <div>Loading... </div>}
          {this.state.restaurants.map(({ restaurant }, index) => {
            //restaurant.restaurant = { restaurant } destrukturalizace
            const isFavourite =
              this.state.favourites.map(({ id }) => id).indexOf(restaurant.id) !== -1;

            return (
              <div key={index} className={styles.container}>
                <button
                  data-id={restaurant}
                  onClick={() => this.handleClick(isFavourite, restaurant)}
                  className={styles['add-button']}
                >
                  {isFavourite ? 'Remove' : 'Add'}
                </button>
                <RestaurantCard restaurant={restaurant} />
              </div>
            );
          })}
          <button onClick={this.handleShowMore.bind(this)} className={styles.btn}>
            Show more
          </button>
        </main>
      </div>
    );
  }
}

export default Search;
