import React, { Component, ReactSVGElement } from "react";
import Header from "../_layout/header";
import { DesktopAppState } from "platforms/desktop/reducers";
import { connect } from "react-redux";
import {
  selectValueOfAssetsInUSD,
  ViewBalance,
  XViewBalance
} from "shared/reducers/xBalance";
import { Ticker, BalanceTypes as BalanceType } from "shared/reducers/types";
import { Container, DonutChart, Legend } from "./style";
import { blockHeaderExchangeRate } from "platforms/desktop/reducers/blockHeaderExchangeRates";

interface AssetAllocationProps {
  assetsInUSD: XViewBalance;
}

type DonutSegementItem = {
  length: number;
  lengthCounterValue: number;
  color: string;
  offset: number;
  balance: number;
  stake: number;
  ticker: Ticker;
  balanceType: string;
};

const SEGMENT_COLORS = {
  [Ticker.XHV]: {
    locked: "#4c7c9b",
    unLocked: "#004c6d"
  },
  [Ticker.xUSD]: {
    locked: "#ff7c43",
    unLocked: "#ffa600"
  }
};

const radius = 70;
const epimeter = Math.PI * 2 * radius;
const strokeWidth = 20;
const center = radius + strokeWidth;
const width = center * 2;

const DonutTickers = [Ticker.XHV, Ticker.xUSD];

class AssetAllocationComponent extends Component<AssetAllocationProps, any> {
  segments: DonutSegementItem[] = [];

  createSegments = () => {
    this.segments = [];

    const balances = this.props.assetsInUSD;
    const totalBalance =
      //@ts-ignore
      this.props.assetsInUSD.XHV.balance +
      //@ts-ignore
      this.props.assetsInUSD.xUSD.balance;

    let dashOffset = (25 / 100) * epimeter;
    DonutTickers.forEach((ticker: Ticker) => {
      //@ts-ignore
      const unlockedBalance = balances[ticker].unlockedBalance;

      if (unlockedBalance > 0) {
        const unlockedSegment: DonutSegementItem = {
          //@ts-ignore
          color: SEGMENT_COLORS[ticker].unLocked,
          length: (unlockedBalance / totalBalance) * epimeter,
          lengthCounterValue:
            epimeter - (unlockedBalance / totalBalance) * epimeter,
          stake: (unlockedBalance / totalBalance) * 100,
          balance: unlockedBalance,
          offset: dashOffset,
          ticker,
          balanceType: BalanceType.unLocked
        };

        dashOffset -= unlockedSegment.length;
        this.segments.push(unlockedSegment);
      }
      //@ts-ignore
      const lockedBalance = balances[ticker].lockedBalance;

      if (lockedBalance > 0) {
        const lockedSegment: DonutSegementItem = {
          //@ts-ignore
          color: SEGMENT_COLORS[ticker].locked,
          length: (lockedBalance / totalBalance) * epimeter,
          lengthCounterValue:
            epimeter - (lockedBalance / totalBalance) * epimeter,
          stake: (lockedBalance / totalBalance) * 100,
          balance: lockedBalance,
          offset: dashOffset,
          ticker,
          balanceType: BalanceType.locked
        };

        dashOffset -= lockedSegment.length;
        this.segments.push(lockedSegment);
      }
    });
  };

  createDonutSVGChart = () => {
    if (this.props.assetsInUSD.XHV && this.props.assetsInUSD.xUSD) {
      return (
        <svg
          shapeRendering={"geometricPrecision"}
          preserveAspectRatio="xMinYMin"
          height={width}
          width={width}
          viewBox={`0 0 ${width} ${width}`}
        >
          {this.segments.map((segement: DonutSegementItem) => {
            return (
              <circle
                strokeDashoffset={segement.offset}
                r={radius}
                cx={center}
                stroke={segement.color}
                strokeDasharray={
                  segement.length + " " + segement.lengthCounterValue
                }
                cy={center}
                strokeWidth={strokeWidth}
                fill="none"
              ></circle>
            );
          })}
        </svg>
      );
    }

    return null;
  };

  render() {
    const donutSegments = this.createSegments();

    return (
      <>
        <Header
          title="Asset Allocation"
          description="Allocation of your owned Assets"
        />

        <Container>
          <DonutChart>{this.createDonutSVGChart()}</DonutChart>
          <Legend>
            <ul>
              {this.segments.map((segment: DonutSegementItem) => {
                return (
                  <li>
                    <span
                      style={{
                        height: "12px",
                        width: "12px",
                        display: "inline-block",
                        backgroundColor: segment.color,
                        marginRight: "5px",
                        borderRadius: "5px",
                        verticalAlign: "middle"
                      }}
                    />
                    {segment.balanceType === BalanceType.locked
                      ? "locked "
                      : ""}
                    {segment.ticker} {"(" + Math.round(segment.stake) + "%)"}
                  </li>
                );
              })}
            </ul>
          </Legend>
        </Container>
      </>
    );
  }
}

export const mapStateToProps = (state: DesktopAppState) => ({
  assetsInUSD: selectValueOfAssetsInUSD(state)
});

export const AssetAllocation = connect(
  mapStateToProps,
  {}
)(AssetAllocationComponent);
