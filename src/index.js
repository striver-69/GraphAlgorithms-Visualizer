import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown';
import PathFindingVisualizer from './pathfindingVisualizer/pathFindingVisualizer';

ReactDOM.render(
  <React.StrictMode>
    <PathFindingVisualizer />
  </React.StrictMode>,
  document.getElementById('root')
);
