import { Component } from "react";
import { connect } from "react-redux";
import { closeWallet } from "../../actions";

const ACTIVITY_EVENTS = [
  "mousemove",
  "keydown",
  "wheel",
  "DOMMouseScroll",
  "mouseWheel",
  "mousedown",
  "touchstart",
  "touchmove",
  "MSPointerDown",
  "MSPointerMove"
];

// set a limit of 10 minutes inactivity
const IDLE_TIME = 10 * 60 * 1000;

class Idle extends Component {
  idleTimer = null;

  componentDidMount() {
    ACTIVITY_EVENTS.forEach(event => {
      document.addEventListener(event, this.onActivity, {
        capture: true,
        passive: true
      });
    });

    clearTimeout(this.idleTimer);
    this.idleTimer = null;
    this.idleTimer = setTimeout(this.onIdle, IDLE_TIME);
  }

  onActivity = event => {
    clearTimeout(this.idleTimer);
    this.idleTimer = null;
    this.idleTimer = setTimeout(this.onIdle, IDLE_TIME);
  };

  componentWillUnmount() {

    ACTIVITY_EVENTS.forEach(event => {
      document.removeEventListener(event, this.onActivity, { capture: true });
    });

    clearTimeout(this.idleTimer);
    this.idleTimer = null;
  }

  onIdle = event => {
    clearTimeout(this.idleTimer);
    this.idleTimer = null;
    this.props.closeWallet();
  };

  render() {
    return null;
  }
}

export default connect(
  null,
  { closeWallet }
)(Idle);
