import React from 'react';
// import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
// import App from './App';
import Field from './Field'
import boardPosition from './boardPosition'

const blackPlayer = {currentPlayer: "0"}
const whitePlayer = {currentPlayer: "1"}

it('has Stones', () => {
  const component = renderer.create(
    <Field key={1} 
          id={1} 
          boardField={[1,1,1]} 
          ctx={{}} 
          openDice={[]} 
          board={{}}
          selected={false}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().hasStones()).toBe(true)

});

it('has no Stones', () => {
  const component = renderer.create(
    <Field key={1} 
          id={1} 
          boardField={[]} 
          ctx={{}} 
          openDice={[]} 
          board={{}}
          selected={false}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().hasStones()).toBe(false)
});



it('white has Stones', () => {
  const component = renderer.create(
    <Field key={1} 
          id={1} 
          boardField={[1, 1]} 
          ctx={whitePlayer} 
          openDice={[]} 
          board={{}}
          selected={false}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(true)
});

it('white has no black Stones', () => {
  const component = renderer.create(
    <Field key={1} 
          id={1} 
          boardField={[0, 0]} 
          ctx={whitePlayer} 
          openDice={[]} 
          board={{}}
          selected={false}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(false)
});

it('white has no empty Stones', () => {
  const component = renderer.create(
    <Field key={1} 
          id={1} 
          boardField={[]} 
          ctx={whitePlayer} 
          openDice={[]} 
          board={{}}
          selected={false}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(false)
});



it('black has Stones', () => {
  const component = renderer.create(
    <Field key={1} 
          id={1} 
          boardField={[0, 0]} 
          ctx={blackPlayer} 
          openDice={[]} 
          board={{}}
          selected={false}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(true)
});

it('black has no white Stones', () => {
  const component = renderer.create(
    <Field key={1} 
          id={1} 
          boardField={[1, 1]} 
          ctx={blackPlayer} 
          openDice={[]} 
          board={{}}
          selected={false}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(false)
});

it('black has no empty Stones', () => {
  const component = renderer.create(
    <Field key={1} 
          id={1} 
          boardField={[]} 
          ctx={blackPlayer} 
          openDice={[]} 
          board={{}}
          selected={false}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(false)
});



// isPossibleDestinationOf
it('isPossibleDestinationOf for black', () => {
  const component = renderer.create(
    <Field key={1} 
          id={6} 
          boardField={[0,0]} 
          ctx={blackPlayer} 
          openDice={[2,4]} 
          board={boardPosition.empty}
          selected={6}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().isPossibleDestinationOf()).toEqual([8,10])
});
it('isPossibleDestinationOf for white', () => {
  const component = renderer.create(
    <Field key={1} 
          id={6} 
          boardField={[1,1]} 
          ctx={whitePlayer} 
          openDice={[2,4]} 
          board={boardPosition.empty}
          selected={6}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().isPossibleDestinationOf()).toEqual([4,2])
});


// is possible destination
it('isPossibleDestination for black', () => {
  const component = renderer.create(
    <Field key={1} 
          id={2} 
          boardField={[]} 
          ctx={blackPlayer} 
          openDice={[2,4]} 
          board={boardPosition.empty}
          selected={6}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(true)
});

it('not isPossibleDestination for black', () => {
  const component = renderer.create(
    <Field key={1} 
          id={3} 
          boardField={[]} 
          ctx={blackPlayer} 
          openDice={[2,4]} 
          board={boardPosition.empty}
          selected={6}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(false)
});

it('isPossibleDestination for white', () => {
  const component = renderer.create(
    <Field key={1} 
          id={8} 
          boardField={[]} 
          ctx={whitePlayer} 
          openDice={[2,4]} 
          board={boardPosition.empty}
          selected={6}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(true)
});

it('not isPossibleDestination for white', () => {
  const component = renderer.create(
    <Field key={1} 
          id={11} 
          boardField={[]} 
          ctx={whitePlayer} 
          openDice={[2,4]} 
          board={boardPosition.empty}
          selected={6}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(false)
});
