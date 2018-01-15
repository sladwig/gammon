import React from 'react';
// import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
// import App from './App';
import Field from './Field'



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
          ctx={{currentPlayer: "1"}} 
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
          ctx={{currentPlayer: "1"}} 
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
          ctx={{currentPlayer: "1"}} 
          openDice={[]} 
          board={{}}
          selected={false}
          selecting={()=>{}}
          makeMove={()=>{}} />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(false)
});
