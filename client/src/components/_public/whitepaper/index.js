// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Cell,
  Description,
  Wrapper,
  Image,
  Route,
  Aspect,
  Clip
} from "./styles";

import chinese from "../../../assets/whitepapers/wp_chinese.svg";
import english from "../../../assets/whitepapers/wp_english.svg";
import french from "../../../assets/whitepapers/wp_french.svg";

const Content = () => {
  return (
    <Wrapper>
      <Container>
        <Cell>
          <Aspect>
            <Image src={english} />
          </Aspect>
          <Clip>
            <Description>
              Bitcoin paved the way for electronic peer-to-peer currency. It was
              the first digital currency to successfully implement a distributed
              ledger of transactions based on cryptographic proof over trust.
            </Description>
          </Clip>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/haven-offshore-testnet-update-october-2019-49057d6329de"
          >
            Read more
          </Route>
        </Cell>
        <Cell>
          <Aspect>
            <Image src={french} />
          </Aspect>
          <Clip>
            <Description>
              Le Bitcoin a ouvert la voie des monnaies électroniques
              pair-à-pair. Il a été la première monnaie digitale à implémenter
              avec succès un registre de transactions distribuées basé sur la
              preuve cryptographique au lieu de la confiance.
            </Description>
          </Clip>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/haven-protocol-april-2019-update-ca2e911176c8"
          >
            Lire la suite
          </Route>
        </Cell>

        <Cell>
          <Aspect>
            <Image src={chinese} />
          </Aspect>
          <Clip>
            <Description>
              比 特 币 为 点 对 点 电 ⼦ 货 币 交 易 铺 平 了 道 路 。 它 是 第
              ⼀ 个 成 功 实 施 基 于 信 任 加 密 证 明 的 分 布 式 交 易 分 类
              记 账 的 数 字 货 币 。 最 近 以 来 ︐ 随 着 ⼈ 们 意 识 到 在 比
              特 币 和 许 多 其 他 加 密 货 币 的 钱 包 中 ︐ 任 何 交 易 对 于
              所 有 关 注 交 易 的 ⼈ 来 说 都 是 可 见 的 。
            </Description>
          </Clip>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/haven-added-to-zelcore-ecosystem-ab3bb530153f"
          >
            阅读更多
          </Route>
        </Cell>
      </Container>
    </Wrapper>
  );
};

export default Content;
