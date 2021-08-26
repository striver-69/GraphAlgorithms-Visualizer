import React, { Component } from 'react';
import './navbar.css';
const brand = window.innerWidth > 600 ? 'Pathfinding Visualizer' : 'Pathfinder';

export class Navbar extends Component {
  state = {
    algorithm: 'Visualize Algorithm',
    maze: 'Generate Maze',
    pathState: false,
    mazeState: false,
  };

  selectAlgorithm(selection) {
    if (this.props.visualizingAlgorithm) {
      return;
    }
    if (
      selection === this.state.algorithm ||
      this.state.algorithm === 'Visualize Algorithm' ||
      this.state.algorithm === 'Select an Algorithm!'
    ) {
      this.setState({ algorithm: selection });
    } else if (this.state.pathState) {
      this.clearPath();
      this.setState({ algorithm: selection });
    } else {
      this.setState({ algorithm: selection });
    }
  }

  visualizeAlgorithm() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (this.state.pathState) {
      this.clearTemp();
      return;
    }
    if (
      this.state.algorithm === 'Visualize Algorithm' ||
      this.state.algorithm === 'Select an Algorithm!'
    ) {
      this.setState({ algorithm: 'Select an Algorithm!' });
    } else {
      this.setState({ pathState: true });
      if (this.state.algorithm === 'Visualize Depth First Search')
        this.props.visualizeDFS();
      else if (this.state.algorithm === 'Visualize Breadth First Search')
        this.props.visualizeBFS();
      else if (this.state.algorithm === 'Visualize Dijkstra')
        this.props.visualizeDijkstra();
      else if (this.state.algorithm === 'Visualize A*')
        this.props.visualizeAStar();
      else if (this.state.algorithm === 'Visualize Random Walk')
        this.props.visualizeRandomWalk();
    }
  }

  clearPath() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearPath();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  clearTemp() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  clearGrid() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      algorithm: 'Visualize Algorithm',
      maze: 'Generate Maze',
      pathState: false,
      mazeState: false,
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand h1 mb-0" href="http://localhost:3000">
          {brand}
        </a>
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Algorithms
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm('Visualize Dijkstra')}
                  >
                    Dijkstra's Algorithm
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm('Visualize Depth First Search')
                    }
                  >
                    Depth First Search
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm('Visualize Breadth First Search')
                    }
                  >
                    Breadth First Search
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm('Visualize A*')}
                  >
                    A* Algorithm
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm('Visualize Random Walk')
                    }
                  >
                    Random Walk
                  </button>
                </div>
              </div>{' '}
            </li>
            <li>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.visualizeAlgorithm()}
              >
                {this.state.algorithm}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.clearGrid()}
              >
                Clear Gird
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
