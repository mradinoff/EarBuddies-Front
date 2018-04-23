import React, { PureComponent as Component } from "react";
import axios from "axios";
//import ReactDOM from "react-dom";
import Swipeable from 'react-swipeable';
import './Swipe.css';
//("use strict");

const FRIENDSHIPS_URL = "https://earbuddies1.herokuapp.com/friendships.json";
//const USERS_URL = "https://earbuddies1.herokuapp.com/users.json";

const IMG_1 = `https://unsplash.it/342/249`;
const IMG_2 = `https://unsplash.it/342/250`;
const IMG_3 = `https://unsplash.it/342/251`;
const IMG_4 = `https://unsplash.it/342/252`;
const IMG_5 = `https://unsplash.it/342/253`;
const IMAGES = [IMG_1, IMG_2, IMG_3, IMG_4, IMG_5];
const IMG_WIDTH = "342px";
const IMG_HEIGHT = "249px";

const RIGHT = "-1";
const LEFT = "+1";

const buttonStyles = {
  height: IMG_HEIGHT,
  color: "#eeeeee",
  fontSize: "2em"
};



class SimpleCarousel extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { imageIdx: 0 };
  }

  onSwiped(direction) {
    const change = direction === RIGHT ? RIGHT : LEFT;
    console.log(direction);
    const adjustedIdx = this.state.imageIdx + Number(change);
    let newIdx;
    if (adjustedIdx >= IMAGES.length) {
      newIdx = 0;
    } else if (adjustedIdx < 0) {
      newIdx = IMAGES.length - 1
    } else {
      newIdx = adjustedIdx;
    }
    this.setState({ imageIdx: newIdx });
    if (direction === '+1') {
      this._handleSubmit();
     }
   }

   _handleSubmit(e) {

     axios({
       url: FRIENDSHIPS_URL,
       method: "post",
       headers: {
         authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQzNTYwMjQsInN1YiI6MSwiZW1haWwiOiJ0YXJ5bkB0YXJ5bi5jb2RlcyIsImFkbWluIjp0cnVlfQ.vuSUIA_yVabwfha2KLA-0TDPkPRIoTyR2iRh9a6OOiE`
       },
       data: {
         friend_id: 2
       }
     }).then(res => console.log(res));
   }

  render() {
    const { imageIdx = 0 } = this.state;
    const imageStyles = {
      width: IMG_WIDTH,
      height: IMG_HEIGHT,
      backgroundImage: `url(${IMAGES[imageIdx]})`
    };
    return (
      <div className="swipeContainer">
        <div>User Name</div>
        <Swipeable
          className="swipe"
          trackMouse
          style={{ touchAction: "none" }}
          preventDefaultTouchmoveEvent
          onSwipedLeft={() => this.onSwiped(LEFT)}
          onSwipedRight={() => this.onSwiped(RIGHT)}
        >
          <div id="arrow-buttons" style={imageStyles}>
            <button
              onClick={() => this.onSwiped(RIGHT)}
              className="hollow float-left"
              style={buttonStyles}
            >
              ⇦
            </button>
            <button
              onClick={() => this.onSwiped(LEFT)}
              className="hollow float-right"
              style={buttonStyles}
            >
              ⇨
            </button>
          </div>
        </Swipeable>
      </div>
    );
  }
}


function preload(...images) {
  return images.reduce((acc, img) => {
    let newImage = new Image();
    newImage.src = img;
    acc.push(newImage);
    return acc;
  }, []);
}
preload.apply(null, IMAGES);

class Swipe extends Component {
  render() {
    return (
      <div className="container">
        <SimpleCarousel />
      </div>
    );
  }
}


export default Swipe;
