import React from 'react';
import renderer from 'react-test-renderer';
import moving from './moving';

const player = {black: "0", white: "1"}


it('has correct move Directions', () => {
  expect(moving.direction(player.white)).toBe(1)
  expect(moving.direction(player.black)).toBe(-1)
});

it('calculates moving to', () => {
  expect(moving.to(player.white, 6, 4)).toBe(10)
  expect(moving.to(player.black, 6, 4)).toBe(2)
});

it('calculates moving from', () => {
  expect(moving.from(player.white, 6, 4)).toBe(2)
  expect(moving.from(player.black, 6, 4)).toBe(10)
});



