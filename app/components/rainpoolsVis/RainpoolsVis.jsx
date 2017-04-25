import React, { Component, PropTypes } from 'react';
import css from './rainpoolsVis.less';

export default class RainpoolsVis extends Component {

  static defaultProps = {
    walls: [],
    width: 800,
    height: 500,
    maxWallHeight: 100,
  };

  static propTypes = {
    walls: PropTypes.array.isRequired,
  };

  constructor(...args) {
    super(...args);

  }

  getWallHight(wall) {
    const margin = 10;
    return (this.props.height - (margin * 2)) * wall.height / this.props.maxWallHeight;
  }

  render() {
    const blockSize = 15;

    const wallsDivs = this.props.walls.map((wall, index) => {
      const blocks = [];
      for (let i = 0; i < wall.height; i++) {
        const blockStyle = {
          bottom: i * blockSize,
          width: blockSize,
          height: blockSize,
        };

        blocks.push(
          <div className="block" key={i} style={blockStyle}></div>
        );
      }

      const wallStyle = {
        left: index * (blockSize + 2),
      };

      const rainStyle = {
        width: wall.rain ? blockSize : 0,
        height: blockSize * wall.rain || 0,
        bottom: blockSize * wall.height,
      }

      return (
        <div className="wall" key={index} style={wallStyle}>
          {blocks}
          <div className="rain" style={rainStyle}></div>
        </div>
      );
    });

    return (
      <div className="rainpoolsVis" >
        {wallsDivs}
      </div>
    );
  }
}
