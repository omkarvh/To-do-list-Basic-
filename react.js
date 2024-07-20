import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <h1>My Favourite Foods</h1>
    <ul>
      <li>Bacon</li>
      <li>Jamon</li>
      <li>Noodles</li>
    </ul>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
