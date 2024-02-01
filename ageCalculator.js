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
    getDaysMonthsYears_2();
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



const getDaysMonthsYears_2 = () => {
  let days = currentDay - birthDay;
  let todayMonth = currentMonth;
  let todayYear = currentYear;
  if (days < 0){
    todayMonth--;
    if (todayMonth < 1){
      todayYear--;
      todayMonth+=12;
    }
    let daysInMonth = new Date(todayYear, todayMonth, 0).getDate();
    days += daysInMonth;
  }
  let months = todayMonth - birthMonth;
  if (months < 0){
    todayYear--;
    months+=12;
  }
  let years = todayYear - birthYear;
  yourAge.years = years;
  yourAge.months = months;
  yourAge.days = days;
}
