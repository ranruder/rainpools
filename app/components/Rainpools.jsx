import React, { Component } from 'react';
import RainpoolsVis from './rainpoolsVis/RainpoolsVis';
import { clone } from 'lodash';
import css from './rainpools.less';

export default class Rainpools extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      walls: [], // each item has { height: wall height, rain: accumulated rain }
      numberOfWalls: 25,
      total: 0,
      calculatedRain: false, // true if calculated rain accumulation
      list: null,
    };
  }

  componentDidMount() {
    this.setRandomWalls();
  }

  // create array of random walls
  setRandomWalls() {
    const maxHeight = 20;

    const walls = [...new Array(this.state.numberOfWalls)]
      .map(() => ({
        height: Math.round(Math.random() * maxHeight + 1),
      }));

    this.setState({
      walls,
      calculatedRain: false,
      total: 0,
    });
  }

  handleListChange(e) {
    this.setState ({
      list: e.target.value,
    });
  }

  setWallsFromList() {
    if (!this.state.list) return;
    const values = this.state.list.split(',');
    this.setState({
      walls: values.map(h => ({ height: parseInt(h) })),
      calculatedRain: false,
      total: 0,
    });
  }

  calcRainAccumulation() {
    // O(n) algorithm:
    //  1. for each wall find max wall height to it's left
    //  2. for each wall find max wall hight to it's right
    //  3. for each wall rain accumulation = max(0, min(maxLeft, maxRight) - wallHeight)
    //  4. sum rain accumulation for all walls
    const walls = clone(this.state.walls);
    let max = 0;
    //  1
    for (let i = 0; i < walls.length; i++) {
      walls[i].maxLeft = max;
      max = Math.max(max, walls[i].height);
    }
    //  2 + 3
    max = 0;
    let total = 0;
    for (let i = walls.length - 1; i >= 0; i--) {
      // max = maxRight
      walls[i].rain = Math.max(0, Math.min(walls[i].maxLeft, max) - walls[i].height);
      total += walls[i].rain;
      max = Math.max(max, walls[i].height);
    }

    this.setState({
      walls,
      calculatedRain: true,
      total,
    });
  }

  render() {
    return (
      <div className='rainpools'>
        <h1>Rainpools App</h1>
        <div className="tools">
          <button className="btn" onClick={() => this.setRandomWalls()} >
            <span className="glyphicon glyphicon-stats"> </span>
            Build Random Walls
          </button>
          <button className="btn" onClick={() => this.calcRainAccumulation()} >
            <span className="glyphicon glyphicon-tint rain"> </span>
            Simulate Rain
          </button>
        </div>
        <div className="tools">
          <input type="text" placeholder="Insert comma separated values" value={this.state.listValues} onChange={(e) => this.handleListChange(e)} />
          <button className="btn btn-sm" onClick={() => this.setWallsFromList()} >
            Build from list
          </button>
        </div>
        <div className="result">Total rain accumulation: <span className="total">{this.state.total}</span></div>
        <RainpoolsVis walls={this.state.walls} />
      </div>
    );
  }
}
