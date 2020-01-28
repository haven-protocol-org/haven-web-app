import styled from "styled-components";
import media from "../../../../assets/styles/media.js";
import * as _ from "../../../../assets/styles/colors.js";

export const Wrapper = styled.div`
  height: auto;
  background: #36393f;
  display: flex;
  flex-direction: column;
  padding: 40px;

  align-items: center;

  ${media.tablet`
      padding: 20px;
  `}
`;

export const Container = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  background: #36393f;
  justify-content: center;
  align-items: center;
  max-width: 1400px;

  ${media.laptop`
    grid-template-columns: 1fr 1fr ;
  `}
  ${media.tablet`
    grid-template-columns: 1fr;
  `}
`;

export const Route = styled.a`
  font-size: 16px;
  color: ${_.link};
  height: auto;
  text-decoration: none;
  margin-top: 20px;
  transition: 500ms;

  &:hover {
    color: ${_.link_hover};
    transition: 500ms;
  }
`;

export const Cell = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  flex: 1;
  justify-content: center;
  padding: 20px;
  border-radius: 4px;
  background: ${_.background};
  border: 1px solid ${_.border};
  transition: 500ms;

  &:hover {
    background: ${props => props.theme.body.foreground};
    border: 1px solid ${props => props.theme.body.border};
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    transition: 500ms;
`;

export const Aspect = styled.div`
  height: 0;
  padding-top: 56.25%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`;

export const Image = styled.img`
  width: 110%;
  height: auto;
  margin-top: -56.25%;
`;

export const Title = styled.div`
  color: #fff;
  letter-spacing: 0;
  font-size: 18px;
  font-weight: bold;
  line-height: 26px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Clip = styled.div`
  overflow: hidden;
  height: 100px;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #8a8d90;
  letter-spacing: 0;
  line-height: 26px;
  text-overflow: ellipsis;
`;
