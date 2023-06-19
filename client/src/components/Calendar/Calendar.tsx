import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import moment from "moment";
import * as S from "./styled";

  
const DataCalendar = ({itemDateStart, itemDateEnd}:any ) => {

    const [value] = useState(new Date())
    const [startMark, setStartMark] = useState([])
    const [endMark, setEndMark] = useState([])
  
    useEffect(()=> {
      setStartMark([itemDateStart.substr(0,10)])
      setEndMark([itemDateEnd.substr(0,10)])
    },[])
  
    return (
      <S.CalenderContainer>
        <Calendar 
          className="calender" 
          value={value} 
          next2Label={null}
          prev2Label={null} 
          formatDay={(locale, date) => moment(date).format('D')} // '일' 표시 x
          tileContent={({ date, view }) => {
            if (startMark.find(x => x === moment(date).format('YYYY-MM-DD')) || endMark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
            return (
              <>
                  <div className="dot"></div>
              </>
              )
            }
          }}
        />
      </S.CalenderContainer>
    )
  }

export default DataCalendar;