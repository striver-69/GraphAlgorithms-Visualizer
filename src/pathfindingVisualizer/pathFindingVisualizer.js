import React, { Component } from 'react';
import './pathFindingVisualizer.css';
import Node from './node';

const initialNum = getInitialNum(window.innerWidth, window.innerHeight);
const numberOfRows = initialNum[0];
const numberOfColumns = initialNum[1];

const startNodeRow = 0;
const startNodeCol = 0;
const finishNodeRow = 10;
const finishNodeCol = 10;

export class PathFindingVisualizer extends Component {
  state = {
    grid: [],
    height: window.innerHeight,
    width: window.innerWidth,
    numRows: numberOfRows,
    numColumns: numberOfColumns,
  };
  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    const grid = getInitialGrid(this.state.numRows, this.state.numColumns);
    this.setState({ grid });
  }

  render() {
    let { grid } = this.state;
    console.log(grid);
    return (
      <div className="grid">
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              {row.map((node, nodeId) => {
                const { row, col, isStart, isFinish } = node;
                return (
                  <Node
                    key={nodeId}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    width={this.state.width}
                    height={this.state.height}
                    numRows={this.state.numRows}
                    numColumns={this.state.numColumns}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

function getInitialNum(width = 0, height = 0) {
  let numColumns;
  if (width > 1500) {
    numColumns = Math.floor(width / 25);
  } else if (width > 1250) {
    numColumns = Math.floor(width / 22.5);
  } else if (width > 1000) {
    numColumns = Math.floor(width / 20);
  } else if (width > 750) {
    numColumns = Math.floor(width / 17.5);
  } else if (width > 500) {
    numColumns = Math.floor(width / 15);
  } else if (width > 250) {
    numColumns = Math.floor(width / 12.5);
  } else if (width > 0) {
    numColumns = Math.floor(width / 10);
  }
  let cellWidth = Math.floor(width / numColumns);
  let numRows = Math.floor(height / cellWidth);
  return [numRows, numColumns];
}

const getInitialGrid = (numRows, numColumns) => {
  let grid = [];
  for (let row = 0; row < numRows; row++) {
    let currentRow = [];
    for (let col = 0; col < numColumns; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    distance: Infinity,
    totalDistance: Infinity,
    isVisited: false,
    isShortest: false,
    isWall: false,
    previousNode: null,
  };
};

export default PathFindingVisualizer;
