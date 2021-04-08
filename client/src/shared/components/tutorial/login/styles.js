import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  margin-top: -20px;
  margin-bottom: 20px;
`;

export const Background = styled.div`
  width: auto;
`;

export const Image = styled.img`
  height: 200px;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='5' stroke-opacity='0.25'%3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E");
`;

export const List = styled.div`
  list-style-type: none;
  font-size: 15px;
  font-family: Inter-SemiBold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 8px;
  background: #36393f;
`;

export const Item = styled.div`
  list-style-type: none;
  font-size: 14px;
  color: #8a8d90;
  line-height: 1.5em;
  font-family: Inter-Regular;
  text-align: center;
  background: #36393f;
`;
