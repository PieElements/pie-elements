import PropTypes from 'prop-types';
import React from 'react';
import Tile from './tile';
import { withStyles } from 'material-ui/styles';

const common = {
  tiler: {
    display: 'grid',
    gridGap: '10px'
  }
}

const types = {
  choiceLabel: PropTypes.string,
  targetLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onDropChoice: PropTypes.func.isRequired,
  tiles: PropTypes.array.isRequired,
  tileSize: PropTypes.string
}

const defaults = {
  tileSize: '1fr',
  disabled: false
}

class HTiler extends React.Component {

  render() {
    const {
      includeTargets,
      choiceLabel,
      targetLabel,
      tiles,
      classes,
      tileSize,
      disabled,
      onDropChoice,
      onRemoveChoice } = this.props;

    const rows = includeTargets ? `auto ${tileSize} auto ${tileSize}` : `auto ${tileSize} auto`;
    const columns = (includeTargets ? (tiles.length / 2) : tiles.length);

    const style = {
      gridTemplateColumns: `repeat(${columns}, ${tileSize})`,
      gridTemplateRows: rows,
    };

    const labelStyle = {
      gridColumn: `1/${columns + 1}`
    }

    return <div className={classes.htiler} style={style}>
      <div
        className={classes.choiceLabel}
        style={labelStyle}>{choiceLabel}</div>
      {includeTargets && <div
        className={classes.targetLabel}
        style={labelStyle}>{targetLabel}</div>}
      {
        tiles.map((t, index) => {
          t.onDropChoice = (source, index) => onDropChoice(t, source, index);
          t.onRemoveChoice = () => onRemoveChoice(t);
          t.disabled = disabled;
          return <Tile {...t} key={index} />;
        })
      }
    </div >
  }
}

HTiler.propTypes = Object.assign({}, types);
HTiler.defaultProps = Object.assign({}, defaults);

const horizontalStyles = {
  htiler: common.tiler,
  choiceLabel: {
    textAlign: 'center'
  },
  targetLabel: {
    textAlign: 'center',
    gridRow: '3/4'
  }
}

export const HorizontalTiler = withStyles(horizontalStyles)(HTiler);

class VTiler extends React.Component {

  render() {

    const {
      includeTargets,
      choiceLabel,
      targetLabel,
      tiles,
      classes,
      tileSize,
      disabled,
      onDropChoice,
      onRemoveChoice } = this.props;

    const columns = includeTargets ? 2 : 1;
    const rows = (includeTargets ? (tiles.length / 2) : tiles.length);

    const style = {
      gridTemplateColumns: `repeat(${columns}, ${tileSize})`,
      gridTemplateRows: `auto repeat(${rows}, ${tileSize})`
    };

    return <div className={classes.vtiler} style={style}>
      <div className={classes.choiceLabel}>{choiceLabel}</div>
      {includeTargets && <div className={classes.targetLabel}>{targetLabel}</div>}
      {tiles.map((t, index) => {
        t.onDropChoice = (source, index) => onDropChoice(t, source, index);
        t.onRemoveChoice = () => onRemoveChoice(t);
        t.disabled = disabled;
        return <Tile {...t} key={index} />;
      })}
    </div>
  }
}

VTiler.propTypes = Object.assign({}, types);
VTiler.defaultProps = Object.assign({}, defaults);

const verticalStyles = {
  vtiler: Object.assign({ gridAutoFlow: 'column' }, common.tiler),
  choiceLabel: {
    gridColumn: '1/2',
    textAlign: 'center'
  },
  targetLabel: {
    gridColumn: '2/3',
    textAlign: 'center'
  }
}

export const VerticalTiler = withStyles(verticalStyles)(VTiler);