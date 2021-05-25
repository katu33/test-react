import React from 'react';
import renderRouter from './routes';
import './App.scss';

function App() {
  return (
    <div className="App">
      {renderRouter()}
    </div>
  );
}

export default App;
