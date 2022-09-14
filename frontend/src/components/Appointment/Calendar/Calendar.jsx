import React, { useState, useEffect } from 'react'
import { AiOutlineDoubleLeft } from 'react-icons/ai'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import './Calendar.css'

const date = new Date();
const thisYear = date.getFullYear();
const thisMonth = date.getMonth();
const thisDate = date.getDate();
// const weekObj={0:'Sun', 1:'Mon', 2:'Tue', 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sat'};
const monthObj = {
  0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June',
  6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December'
}



const Calendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(thisDate);
  const [selectedMonth, setSelectedMonth] = useState(thisMonth);
  const [selectedYear, setSelectedYear] = useState(thisYear);
  const {setDate}=props;

  document.addEventListener('click', e => {
    if (e.target.matches('[data-tablecell]')) {
      setSelectedDate(e.target.innerText);
      setDate(`${selectedYear}-${selectedMonth}-${e.target.innerText}`);
    }
  });

  

  const firstDayOfThisMonth = new Date(selectedYear, selectedMonth, 0).getDay();
  const daysOfThisMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const selectedDay = new Date(selectedYear, selectedMonth, selectedDate);
  const daysOfLastMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const daysOfLastMonthInThisMonth = firstDayOfThisMonth + 1;
  const daysOfNextMonthInThisMonth = 42 - daysOfThisMonth - daysOfLastMonthInThisMonth;
  const firstDateOfLastMonthInThisMonth = daysOfLastMonth - firstDayOfThisMonth;

  const monthPlus = () => {
    setSelectedDate(1);
    if (selectedMonth < 11) {
      setSelectedMonth(selectedMonth + 1)
      
    } else {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    }
  }
  const monthMinus = () => {
    setSelectedDate(daysOfLastMonth);
    if (selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1);
    } else {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    }
  }

  useEffect(() => {
    const bodyCells = document.querySelectorAll('.bodyCell');
    for (let i = 0; i < bodyCells.length; i++) {
      if(bodyCells[i].innerText*1===selectedDate*1){
        bodyCells[i].style.backgroundColor='lightpink';
        setDate(`${selectedYear}-${selectedMonth}-${bodyCells[i].innerText}`);
      } else {
        bodyCells[i].style.backgroundColor='transparent';
      }
    }
  }, [selectedDate, selectedYear, selectedMonth, setDate])

  let lastMonthArr = [], thisMonthArr = [], nextMonthArr = []

  for (let i = firstDateOfLastMonthInThisMonth; i <= daysOfLastMonth; i++) {
    lastMonthArr.push(i);
  }
  for (let k = 1; k <= daysOfThisMonth; k++) {
    thisMonthArr.push(k);
  }
  for (let l = 1; l <= daysOfNextMonthInThisMonth; l++) {
    nextMonthArr.push(l);
  }

  return (
    
      <div className="calendar-container">
        <div className="head">
          <span onClick={monthMinus}><AiOutlineDoubleLeft /></span>
          <div>
            <h3>{monthObj[selectedMonth]}</h3>
            <p>{selectedDay.toDateString()}</p>
          </div>
          <span onClick={monthPlus}><AiOutlineDoubleRight /></span>
        </div>
        <table className='calendar'>
          <thead>
            <tr>
              <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
            </tr>
          </thead>
          <tbody >
            <tr>
              {lastMonthArr.map(date => <td key={date} style={{ color: 'rgba(0,0,0,0.4)' }}>{date}</td>)}
              {thisMonthArr.map(date => <td data-tablecell key={date} className='bodyCell'>{date}</td>)}
              {nextMonthArr.map(date => <td key={date} style={{ color: 'rgba(0,0,0,0.4)' }}>{date}</td>)}
            </tr>
          </tbody>
        </table>
      </div>

  )
}

export default Calendar