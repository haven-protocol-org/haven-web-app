import { Component } from "react";
import { connect } from "react-redux";
import { closeWallet } from "../../actions";
import {selectWebSyncState} from "../../../platforms/web/reducers/chain";

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

    // do not track idle time while syncing
    if (this.props.isInSyncProcess) {
      return;
    }

    this.addActivityListener();
    this.clearTimer();
    this.startTimer();
  }

  addActivityListener() {

    ACTIVITY_EVENTS.forEach(event => {
      document.addEventListener(event, this.onActivity, {
        capture: true,
        passive: true
      });
    });
  }

  removeActivityListener() {

    ACTIVITY_EVENTS.forEach(event => {
      document.removeEventListener(event, this.onActivity, { capture: true });
    });

  }


  componentDidUpdate(prevProps, prevState, snapshot) {

    if (!prevProps.isInSyncProcess && this.props.isInSyncProcess) {
      this.clearTimer();
      this.removeActivityListener();
    }
    else if (prevProps.isInSyncProcess && !this.props.isInSyncProcess) {
      this.clearTimer();
      this.startTimer();
      this.addActivityListener();
    }

  }

  onActivity = event => {

    this.clearTimer();
    this.startTimer();
  };

  componentWillUnmount() {

    this.removeActivityListener();
    this.clearTimer();
  }

  clearTimer() {
    clearTimeout(this.idleTimer);
    this.idleTimer = null;
  }


  startTimer(){
    this.idleTimer = setTimeout(this.onIdle, IDLE_TIME);
  }

  onIdle = event => {

    this.clearTimer();
    this.props.closeWallet();
  };

  render() {
    return null;
  }
}


const mapStateToProps = state => ({
    isInSyncProcess: selectWebSyncState(state).isSyncing
});

export default connect(
    mapStateToProps,
  { closeWallet }
)(Idle);
