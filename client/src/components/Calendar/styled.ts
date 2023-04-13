import styled from "styled-components";

  
  export const CalenderContainer = styled.div`
    width: 100%;
    height: 20%;
    left: 50%;
    top: 20%;
    @media screen and (max-width: ${"700px"}) {

  }
    .title {
     display: flex;
    }
    .calender { 
      width: 100%;
      /* height: 30%; */
      font-size: 7px;
      .react-caleder{
        max-width: 100%;
      }
      .dot {
        height: 0.5rem;
        width: 0.5rem;
        background-color: #f87171;
        border-radius: 50%;
        display: flex;
        margin-left: 1px;
}}
  .react-calendar {
    background: white;
    border: 1px solid #a0a096;
    font-family:  "Noto Sans KR";
    line-height: 1.125em;
    font-size: 20px;
  }
/* 
  .react-calendar--doubleView {
    width: 700px;
  } */

  /* .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  } */

  /* .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  } */
/* 
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  } */
/* 
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  } */

  /* .react-calendar button:enabled:hover {
    cursor: pointer;
  } */

  .react-calendar__navigation {
    display: flex;
    height: 20px;
    margin: 0.5em 0;
  }

  /* .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  } */

  /* .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  } */

  /* .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  } */

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
/* 
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  } */

  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  /* .react-calendar__month-view__days__day .react-calendar__tile{
    background-color: #d10000;
  } */

  /* .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  } */

  /* .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  } */

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }

  /* .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  } */

  /* .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  } */

  /* .react-calendar__tile--now {
    background: #ffff76;
  } */

  /* .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  } */

  /* .react-calendar__tile--hasActive {
    background: #76baff;
  } */

  /* .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  } */

  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }

  /* .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  } */
/* 
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  } */

  `