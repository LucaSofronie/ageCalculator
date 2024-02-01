const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const dayInput = document.querySelector('.day #number-input');
const dayDiv = document.querySelector('.day');
const monthInput = document.querySelector('.month #number-input');
const monthDiv = document.querySelector('.month');
const yearInput = document.querySelector('.year #number-input');
const yearDiv = document.querySelector('.year');
const inputs = document.querySelectorAll('#number-input');

const outputY = document.querySelector('.age-years');
const outputM = document.querySelector('.age-months');
const outputD = document.querySelector('.age-days');

let birthDay = 10;
let birthMonth = 2;
let birthYear = 2006;

const yourAge = {
  years: 0,
  months: 0,
  days: 0
}

let ERROR = false;

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
})

const Exception = (str) => {
  alert(str);
}

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', ()=>{
  // console.log('clicked!');
  ERROR = false;
  checkInput();
  // console.log('num checked!')
  if (ERROR === false)
  { 
    getDaysMonthsYears();
    displayValues();
  }
})

function repeatFn(elem, end, i){
  if (i>end)
    return;
  elem.innerText = i;

  if (i>end-5){
    setTimeout(() => {
      repeatFn(elem, end, ++i);
    }, 250);
    return;
  }
  
  setTimeout(() => {
    repeatFn(elem, end, ++i);
  }, 70);
}

const displayValues = () => {
  // outputY.innerText = yourAge.years;
  // outputM.innerText = yourAge.months;
  // outputD.innerText = yourAge.days;
  repeatFn(outputY, yourAge.years, 0);
  repeatFn(outputM, yourAge.months, 0);
  repeatFn(outputD, yourAge.days, 0);
}

const verifyNumber = (str) => {
  if (!str)
    return 0;
  const regex = /^\+?0?[1-9]\d*$/;
  const result = str.match(regex);
  if (!result)
    return -1;
  return parseInt(result);

  // 0 if the is no number
  // -1 if the number is not valid
  // number if it is valid
}

const verifyInput = (str, className, minLen, maxLen) => {
  const number = verifyNumber(str);
  const upperText = document.querySelector(`.${className}`).children[0];
  const input = document.querySelector(`.${className}`).children[1];
  const errorText = document.querySelector(`.${className}`).children[2];
  // dayText.style.color = 'var(--color-lightRed)';
  if (number == 0 || number == -1 || number < minLen || number > maxLen){
    const text = number == 0? 'This field is required' : `Must be a valid ${className}`;
    errorText.style.opacity = 1;
    errorText.innerText = text;
    errorText.style.color = 'var(--color-lightRed)';
    upperText.style.color = 'var(--color-lightRed)';
    input.style.borderColor = 'var(--color-lightRed)';
    ERROR = true;
    return;
  }
  errorText.style.opacity = 0;
  upperText.style.color = 'black';
  input.style.borderColor = 'black';
  switch (className){
    case 'day':
      birthDay = number;
      break;
    case 'month':
      birthMonth = number;
      break;
    case 'year':
      birthYear = number;
      break;
  }
}

const maxLenForDays = (month, year) => {
  if (year === currentYear && month === currentMonth) return currentDay;
  if (month === 2){
    return year % 4 === 0 ? 29 : 28; 
  }
  const arr1 = [1, 3, 5, 7, 8, 10, 12];
  return arr1.find((nr) => nr === month) ? 31 : 30;
}

const maxLenForMonths = (year) => {
  console.log(year, currentYear, year !== currentYear)
  if (year !== currentYear) return 12;
  return currentMonth;
}

//ERROR opreste programul cand vede o eroare!
const checkInput = () => {
  for (let i=inputs.length - 1; !ERROR && i>=0; --i){
    switch (inputs[i].parentNode.className){
      case 'day':
        verifyInput(dayInput.value, 'day', 1, maxLenForDays(birthMonth, birthYear));
        break;
      case 'month':
        verifyInput(monthInput.value, 'month', 1, maxLenForMonths(birthYear));
        break;
      case 'year':
        verifyInput(yearInput.value, 'year', 1901, currentYear);
        break;
    }
  }
}














/* const isLeapYear = (year) => {
  return year%4==0 && (year%100!==0 || year%400===0);
}

const getDaysInMonth = (month, year) => {
  // const arr = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const arr1 = [1, 3, 5, 7, 8, 10, 12];
  if (arr1.findIndex((nr) => nr===month)!==-1)
    return 31;
  else{
    if (month === 2)
      return isLeapYear(year) ? 29 : 28;
    return 30;
  }
}

const youAreOld = () => {

  const daysAlive = daysSince(currentDay, currentMonth, currentYear) - daysSince(birthDay, birthMonth, birthYear);
  const leapYrs = daysFromLeapYears(currentYear) - daysFromLeapYears(birthYear);
  const years = parseInt((daysAlive-leapYrs)/365);
  
  // console.log('in');
  let newYear = years + birthYear;
  let month = birthMonth;
  let day = birthDay;

  let daysUntil = daysAlive-leapYrs-years*365;
  let monthsCounter = 0;

  // let daysThisMonth = 
  let maxLen = getDaysInMonth(month, newYear);
  while (month !== currentMonth || day !== currentDay || newYear !== currentYear){
    // console.log(day, month, newYear);

    if (day === maxLen){
      day=0;
      month++;
      monthsCounter++;
      if (month > 12){
        month = 1;
        newYear ++;
      }
      // console.log('reset days', day, month, newYear, 'MONTHS C: ', monthsCounter);
      maxLen = getDaysInMonth(month, newYear);
    }

    day++;
  }
  
  const arr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const DAYS = daysAlive - (years*365 + leapYrs) - arr[month];
  // console.log(DAYS);

  yourAge.days = DAYS;
  yourAge.months = monthsCounter;
  yourAge.years = years;
} */



const daysFromLeapYears = (year, month) => {
  return month > 2? Math.floor(year/4) - Math.floor(year/100) + Math.floor(year/400): 
    Math.floor((year-1)/4) - Math.floor((year-1)/100) + Math.floor((year-1)/400);
}

const daysSince = (day, month, year) => {
  const arr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let daySinceBirth = year*365 + arr[month-1] + day + daysFromLeapYears(year, month);
  return daySinceBirth;
}

const getDaysMonthsYears = () =>{
  const daysAlive = daysSince(currentDay, currentMonth, currentYear) - daysSince(birthDay, birthMonth, birthYear);
  const years = parseInt(daysAlive / 365.2425);
  const months = parseInt(daysAlive % 365.2425 / 30.437);
  const days = parseInt(daysAlive - (years*365.2425 + months*30.437));
  // console.log(years, months, days);
  yourAge.years = years;
  yourAge.months = months;
  yourAge.days = days;
}