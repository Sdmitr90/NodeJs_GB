"use strict";
const ps = require("prompt-sync");
const prompt = ps();
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.setMaxListeners(1);

let input = prompt("Select one or more Date: hour-day-month-year&hour-day-month-year&hour-day-month-year ... :")

input = input.split('&')

function getTimeRemaining(dates) {

  const total = Date.parse(dates) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((total / 1000 / 60) % 60),
      seconds = Math.floor((total / 1000) % 60);

  console.log("____________________________________________________________");

  return {
    total: total/1000,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function setClock(dates) {
  const timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function stopTimer() {
    clearInterval(timeInterval);
  }

  function updateClock() {
    const t = getTimeRemaining(dates);

    emitter.emit("remainder", t);

    if (t.total <= 0) {
      stopTimer();
      console.log("Время вышло!");
    }
  }
}

emitter.on("remainder", console.log);

input.forEach(el => {
  el = el.split('-')

  let dates = new Date(
      +el[3], +(el[2] - 1), +el[1], +el[0], 0, 0, 0
  );
  if (dates != 'Invalid Date') {
    setClock(dates);
  } else {
    console.log('Введите корректную дату')
  }
})