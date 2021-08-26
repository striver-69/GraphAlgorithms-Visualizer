import React, { Component } from 'react';
import './pathFindingVisualizer.css';
import Node from './node';
import Navbar from './navbar';

//Pathfinding Algorithms
import {
  depthFirstSearch,
  getNodesInShortestPathOrderDFS,
} from '../pathfindingAlgorithms/depthFirstSearch';

import {
  breadthFirstSearch,
  getNodesInShortestPathOrderBFS,
} from '../pathfindingAlgorithms/breadthFirstSearch';

import {
  dijkstra,
  getNodesInShortestPathOrderDijkstra,
} from '../pathfindingAlgorithms/dijkstra';

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
    visualizingAlgorithm: false,
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

  visualizeDFS() {
    if (this.state.visualizingAlgorithm) {
      return;
    }
    this.setState({ visualizingAlgorithm: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderDFS(finishNode);
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, 10);
  }

  visualizeBFS() {
    if (this.state.visualizingAlgorithm) {
      return;
    }
    this.setState({ visualizingAlgorithm: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const visitedNodesInOrder = breadthFirstSearch(
        grid,
        startNode,
        finishNode
      );
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderBFS(finishNode);
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, 10);
  }

  visualizeDijkstra() {
    if (this.state.visualizingAlgorithm) {
      return;
    }
    this.setState({ visualizingAlgorithm: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderDijkstra(finishNode);
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, 10);
  }

  animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    let newGrid = this.state.grid.slice();
    for (let row of newGrid) {
      for (let node of row) {
        let newNode = {
          ...node,
          isVisited: false,
        };
        newGrid[node.row][node.col] = newNode;
      }
    }
    this.setState({ grid: newGrid });
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      let node = visitedNodesInOrder[i];
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(
            nodesInShortestPathOrder,
            visitedNodesInOrder
          );
        }, i * 10);
        return;
      }
      setTimeout(() => {
        //visited node
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, i * 10);
    }
  };

  animateShortestPath = (nodesInShortestPathOrder, visitedNodesInOrder) => {
    if (nodesInShortestPathOrder.length === 1)
      this.setState({ visualizingAlgorithm: false });
    for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
      if (i === nodesInShortestPathOrder.length - 1) {
        setTimeout(() => {
          let newGrid = updateNodesForRender(
            this.state.grid,
            nodesInShortestPathOrder,
            visitedNodesInOrder
          );
          this.setState({ grid: newGrid, visualizingAlgorithm: false });
        }, i * 10);
        return;
      }
      let node = nodesInShortestPathOrder[i];
      setTimeout(() => {
        //shortest path node
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, i * 10);
    }
  };

  clearGrid() {
    if (this.state.visualizingAlgorithm) {
      return;
    }
    for (let row = 0; row < this.state.grid.length; row++) {
      for (let col = 0; col < this.state.grid[0].length; col++) {
        if (
          !(
            (row === startNodeRow && col === startNodeCol) ||
            (row === finishNodeRow && col === finishNodeCol)
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className = 'node';
        }
      }
    }
    const newGrid = getInitialGrid(this.state.numRows, this.state.numColumns);
    this.setState({
      grid: newGrid,
      visualizingAlgorithm: false,
    });
  }

  clearPath() {
    if (this.state.visualizingAlgorithm) {
      return;
    }
    for (let row = 0; row < this.state.grid.length; row++) {
      for (let col = 0; col < this.state.grid[0].length; col++) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          'node node-shortest-path'
        ) {
          document.getElementById(`node-${row}-${col}`).className = 'node';
        }
      }
    }
    const newGrid = getGridWithoutPath(this.state.grid);
    this.setState({
      grid: newGrid,
      visualizingAlgorithm: false,
    });
  }

  render() {
    let { grid } = this.state;
    console.log(grid);
    return (
      <>
        <Navbar
          visualizingAlgorithm={this.state.visualizingAlgorithm}
          visualizeDFS={this.visualizeDFS.bind(this)}
          visualizeBFS={this.visualizeBFS.bind(this)}
          visualizeDijkstra={this.visualizeDijkstra.bind(this)}
          clearGrid={this.clearGrid.bind(this)}
          clearPath={this.clearPath.bind(this)}
        />
        <div className="grid">
          {grid.map((row, rowId) => {
            return (
              <div key={rowId}>
                {row.map((node, nodeId) => {
                  const { row, col, isStart, isFinish, isShortest, isVisited } =
                    node;
                  return (
                    <Node
                      key={nodeId}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isShortest={isShortest}
                      isVisited={isVisited}
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
      </>
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

const getGridWithoutPath = (grid) => {
  let newGrid = grid.slice();
  for (let row of grid) {
    for (let node of row) {
      let newNode = {
        ...node,
        distance: Infinity,
        totalDistance: Infinity,
        isVisited: false,
        isShortest: false,
        previousNode: null,
      };
      newGrid[node.row][node.col] = newNode;
    }
  }
  return newGrid;
};

const updateNodesForRender = (
  grid,
  nodesInShortestPathOrder,
  visitedNodesInOrder
) => {
  let newGrid = grid.slice();
  for (let node of visitedNodesInOrder) {
    if (
      (node.row === startNodeRow && node.col === startNodeCol) ||
      (node.row === finishNodeRow && node.col === finishNodeCol)
    )
      continue;
    let newNode = {
      ...node,
      isVisited: true,
    };
    newGrid[node.row][node.col] = newNode;
  }
  for (let node of nodesInShortestPathOrder) {
    if (node.row === finishNodeRow && node.col === finishNodeCol) {
      return newGrid;
    }
    let newNode = {
      ...node,
      isVisited: false,
      isShortest: true,
    };
    newGrid[node.row][node.col] = newNode;
  }
};

export default PathFindingVisualizer;
