import React, {Component} from "react";
import {connect} from "react-redux";
// Library Imports
import {selectTheme} from "shared/actions";
// Relative Imports
import Body from "shared/components/_layout/body";
import Header from "shared/components/_layout/header";
import Form from "shared/components/_inputs/form";
import Theme from "shared/components/_inputs/theme";


import {dark, light} from "assets/styles/themes.js";
import {DesktopAppState} from "platforms/desktop/reducers";
import {MiningRequestTypes, MiningStatus} from "platforms/desktop/reducers/mining";
import {MiningState} from "platforms/desktop/pages/_wallet/settings/styles";
import {Information} from "assets/styles/type";
import {Button} from "shared/components/chart/styles";
import {Spinner} from "shared/components/spinner";
import {miningStatus, startMining, stopMining} from "platforms/desktop/actions/mining";

type ThemeOption = {theme:string, value: string}


interface SettingsProps {
  theme:any;
  mining:MiningStatus;
  selectTheme:(theme: any) => void;
  startMining:() => void;
  stopMining:() => void;
  miningStatus:() => void;
}


const options:ThemeOption[] = [
  { theme: "dark", value: "Dark Theme" },
  { theme: "light", value: "Light Theme" }
];

class SettingsDesktopPage extends Component<SettingsProps,any> {

  refreshTimer:number = -1;

  state = {
    value: "",
  };

  componentDidMount() {

    this.props.miningStatus();
    window.scrollTo(0, 0);
    this.setState({
      value: this.props.theme.value
    });
  }


  componentWillReceiveProps(nextProps: Readonly<SettingsProps>, nextContext: any): void {

    if (!this.props.mining.active && nextProps.mining.active) {
      this.addMiningStatusRefresh();
      return;
    }

    if (this.props.mining.active && !nextProps.mining.active) {
      this.removeMiningStatusRefresh();
    }
  }

  componentWillMount(): void {

    this.removeMiningStatusRefresh();

  }


  addMiningStatusRefresh() {

    this.refreshTimer = window.setInterval(() => this.props.miningStatus(), 2000);

  }


  removeMiningStatusRefresh() {

    window.clearInterval(this.refreshTimer);

  }


  handleClick = ({theme, value }:ThemeOption) => {
    if (theme === "light") {
      this.props.selectTheme(light);
      this.setState({
        value: value
      });
    } else if (theme === "dark") {
      this.props.selectTheme(dark);
      this.setState({
        value: value
      });
    } else {
      return null;
    }
  };


  onMiningButtonClicked = () => {

    const mining:MiningStatus = this.props.mining;

    if (mining.miningRequest !== MiningRequestTypes.None) {
      return;
    }

    if (mining.active) {

      this.props.stopMining();

    } else {

      this.props.startMining();

    }
  };


  render() {
    const { value } = this.state;


    const mining: MiningStatus = this.props.mining;
    let buttonLabel = (mining.miningRequest !== MiningRequestTypes.None && mining.miningRequest !== MiningRequestTypes.Status) ? (<Spinner/>) :
        mining.active? 'Stop Mining' : 'Start Mining';


    return (
        <Body>
        <Header
            title="Theme "
            description="Choose between light and dark themes"
        />
        <Form onSubmit={() => {}}>
          <Theme
              label="Select Theme"
              placeholder="Dark Theme"
              name="value"
              value={value}
              options={options}
              onClick={this.handleClick}
          />
        </Form>
        <Header
            title="Mining "
            description="Decentralize and stable Haven while earning XHV"
        />
        <MiningState><Information>{mining.active? `Mining with ${mining.speed} hashes per second` : 'Not Mining'}</Information></MiningState>
        <Button  onClick={() => this.onMiningButtonClicked()}>{ buttonLabel }</Button>
        </Body>
    );
  }
}

const mapStateToProps = (state:DesktopAppState) => ({
  theme: state.theme,
  mining:state.mining
});

export const SettingsDesktop = connect(
    mapStateToProps,
    { selectTheme, startMining, stopMining, miningStatus }
)(SettingsDesktopPage);
