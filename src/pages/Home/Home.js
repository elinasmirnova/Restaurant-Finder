import React, { Component } from "react";
import styles from "./index.module.css";
import NavbarHome from "../../components/NavbarHome/NavbarHome";
import videoSrc from "../../assets/video-bg.mp4";

class Home extends Component {

  handleClick = () => {
    this.props.history.push('Restaurant-Finder/search'); //history api
  }

  render() {
    console.log(this.props)
    return (
      <div className={styles.container}>
        <div className={styles.navbar}>
          <NavbarHome />
        </div>
        <div className={styles.main}>
          <video autoPlay loop muted className={styles.video}>
            <source src={videoSrc} type="video/mp4" /> 
          </video>
        </div>
        <div className={styles.title}>
          <h2> Don't know where to eat? </h2>
          <button class={styles["glow-on-hover"]} type="button" onClick={this.handleClick}>
            {" "}
            Let's start!
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
