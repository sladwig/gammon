import React from 'react';
import renderer from 'react-test-renderer';
import moving from './moving';

const player = {black: "0", white: "1"}


it('has correct move Directions', () => {
  expect(moving.direction(player.white)).toBe(1)
  expect(moving.direction(player.black)).toBe(-1)
});

it('has correct counter move Directions', () => {
  expect(moving.counterDirection(player.white)).toBe(-1)
  expect(moving.counterDirection(player.black)).toBe(1)
});


it('calculates moving to', () => {
  expect(moving.to(player.white, 22, 6)).toBe(25)
  expect(moving.to(player.white, 6, 4)).toBe(10)
  expect(moving.to(player.black, 6, 4)).toBe(2)
  expect(moving.to(player.black, 4, 6)).toBe(0)

});

it('correctly sanitizeTo', () => {
  expect(moving.sanitizeTo(-2)).toBe(0)
  expect(moving.sanitizeTo(-1)).toBe(0)
  expect(moving.sanitizeTo(0)).toBe(0)
  expect(moving.sanitizeTo(1)).toBe(1)
  expect(moving.sanitizeTo(2)).toBe(2)
  expect(moving.sanitizeTo(23)).toBe(23)
  expect(moving.sanitizeTo(24)).toBe(24)
  expect(moving.sanitizeTo(25)).toBe(25)
  expect(moving.sanitizeTo(26)).toBe(25)
  expect(moving.sanitizeTo(27)).toBe(25)
})

it('calculates moving from', () => {
  expect(moving.from(player.white, 2, 6)).toBe(0)
  expect(moving.from(player.white, 6, 4)).toBe(2)
  expect(moving.from(player.black, 6, 4)).toBe(10)
  expect(moving.from(player.black, 23, 6)).toBe(25)
});

it('correctly moves out', () => {
  expect(moving.to(player.white, 19,6)).toBe(25)
  expect(moving.to(player.white, 20,6)).toBe(25)
  expect(moving.to(player.white, 21,6)).toBe(25)
  expect(moving.to(player.white, 22,6)).toBe(25)
  expect(moving.to(player.white, 23,6)).toBe(25)
  expect(moving.to(player.white, 24,6)).toBe(25)

  expect(moving.to(player.black, 1,6)).toBe(0)
  expect(moving.to(player.black, 2,6)).toBe(0)
  expect(moving.to(player.black, 3,6)).toBe(0)
  expect(moving.to(player.black, 4,6)).toBe(0)
  expect(moving.to(player.black, 5,6)).toBe(0)
  expect(moving.to(player.black, 6,6)).toBe(0)
});

it('correctly bar out', () => {
  expect(moving.out(player.white, 1)).toBe(1)
  expect(moving.out(player.white, 2)).toBe(2)
  expect(moving.out(player.white, 3)).toBe(3)
  expect(moving.out(player.white, 4)).toBe(4)
  expect(moving.out(player.white, 5)).toBe(5)
  expect(moving.out(player.white, 6)).toBe(6)

  expect(moving.out(player.black, 6)).toBe(19)
  expect(moving.out(player.black, 5)).toBe(20)
  expect(moving.out(player.black, 4)).toBe(21)
  expect(moving.out(player.black, 3)).toBe(22)
  expect(moving.out(player.black, 2)).toBe(23)
  expect(moving.out(player.black, 1)).toBe(24)
});

it('correctly calculates distance between two fields', () => {
  expect(moving.distance(1,6)).toBe(5)
  expect(moving.distance(6,1)).toBe(5)
});




