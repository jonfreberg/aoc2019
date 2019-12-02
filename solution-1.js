'use strict';
const fs = require('fs');
const input = fs
  .readFileSync('./input1')
  .toString('utf-8')
  .trim()
  .split('\n')
console.time('run');

// Fuel pr. module = Math.floor(mass / 3) - 2
const masses = input.map(value => parseInt(value));

const getFuelRequired = (mass) => {
  return Math.floor(mass / 3) - 2;
}

const answer = masses.reduce((acc, curr) => {
  const currentFuel = getFuelRequired(curr);
  return acc += currentFuel;
}, 0);

console.log(`Answer part 1: ${answer}`);

// PART TWO ====================================

let fuelArray = [];
const calculateFuelConsumption = (mass) => {
  let totalFuel = getFuelRequired(mass);
  fuelArray.push(totalFuel);
  if (getFuelRequired(totalFuel) >= 0) {
    return calculateFuelConsumption(totalFuel);
  }
  return fuelArray;
};

const answerPartTwo = masses.reduce((acc, curr) => {
  const totalFuel = calculateFuelConsumption(curr).reduce((a, b) => a + b, 0);
  fuelArray = [];
  return acc += totalFuel;
}, 0);

console.log(`Answer part 2: ${answerPartTwo}`);

console.timeEnd('run');
