const ZOMATO_USER_KEY = "7f899a00ed70e95dd8dbda4c78c3b426";

export const getRestaurants = async (
  userLocation,
  cuisine,
  offset,
  sortBy = "rating",
  order = "desc"
) => {
  try {
    const url = `https://developers.zomato.com/api/v2.1/search?q=${cuisine}&start=${offset}&count=10&lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&sort=${sortBy}&order=${order} `;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": ZOMATO_USER_KEY,
      },
    });
    const responseJson = await response.json();
    const restaurants = responseJson.restaurants;
    return restaurants;
  } catch (error) {
    console.error(error);
  }
};

export const findRestaurant = async (id) => {
  try {
    const response = await fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": ZOMATO_USER_KEY,
      },
    });
    const restaurant = await response.json();
    return restaurant;
  }
  catch (error) {
    console.error(error);
  }
};
