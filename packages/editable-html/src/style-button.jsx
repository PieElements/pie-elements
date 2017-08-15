import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  button: {
    color: 'blue'
  },
  active: {
    color: 'red'
  }
}

export class StyleButton extends React.Component {
  constructor(props) {
    super(props);

    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    const { classes, children, active } = this.props;
    let className = classes.button;

    if (active) {
      className += ` ${classes.active}`;
    }

    return <span
      className={className}
      onMouseDown={this.onToggle}>{children}</span>
  }
}

export default injectSheet(styles)(StyleButton);