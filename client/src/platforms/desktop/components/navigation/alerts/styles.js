// import styled, { keyframes } from "styled-components";
// import { ReactComponent as ArrowUp } from "../../../../../assets/icons/arrow-up.svg";
//
// const appear = keyframes`
//   0% { transform: translateY(-20px);  }
//   50% { transform: translateY(10px);  }
//   100% {transform: translateY(0px);   }
// `;
//
// export const Notifications = styled.button`
//   height: 64px;
//   width: 64px;
//   background: none;
//   border: none;
//   outline: none;
//   display: flex;
//   margin-left: 20px;
//   align-items: center;
//   justify-content: center;
//
//   &:hover {
//     cursor: pointer;
//   }
// `;
//
// export const Options = styled.button`
//   height: 64px;
//   width: 64px;
//   background: none;
//   border: none;
//   outline: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-left: 1px solid ${(props) => props.theme.body.border};
//
//   &:hover {
//     cursor: pointer;
//   }
// `;
//
// export const OptionsIcon = styled.div`
//   height: 20px;
//   width: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
//
// export const Arr = styled(ArrowUp)`
//   position: fixed;
//   margin-top: -7px;
//
//   .bg {
//     fill: ${(props) => props.theme.body.foreground};
//   }
//
//   .outline {
//     stroke: ${(props) => props.theme.body.border};
//   }
// `;
//
// export const NotificationDropdown = styled.div`
//   height: auto;
//   min-height: 140px;
//   width: 280px;
//   background: ${(props) => props.theme.body.foreground}
//   border: 1px solid ${(props) => props.theme.body.border};
//   border-radius: 4px;
//   position: fixed;
//   left: 10px;
//   top: 74px;
//   box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
//   z-index: 1000;
//   animation: ${appear} 0.5s forwards;
// `;
//
// export const NotificationArrow = styled.div`
//   height: auto;
//   width: 20px;
//   background: white;
//   left: 165px;
//   position: absolute;
//   z-index: 999;
// `;
//
// export const NotificationCell = styled.div`
//   height: auto;
//   color: white;
//   padding-left: 20px;
//   padding: 16px;
//   font-size: 14px;
//   text-align: left;
//   display: flex;
//   flex-direction: column;
//   border-bottom: 1px solid ${(props) => props.theme.body.border};
//
//   &:hover {
//     cursor: pointer;
//   }
// `;
