import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  button: {
    color: 'grey',
    display: 'inline-flex',
    padding: '2px',
    '& :hover': {
      color: 'black'
    }
  },
  active: {
    color: 'black'
  }
}

const buttonStyles = {
  root: Object.assign(styles.button, {
    display: 'inline-flex'
  })
}

export class RawButton extends React.Component {
  render() {
    const { classes, children, onClick } = this.props;
    return <div
      onClick={onClick}
      className={classes.root}>{children}</div>;
  }
}

export const Button = injectSheet(buttonStyles)(RawButton);


export class RawMarkButton extends React.Component {
  constructor(props) {
    super(props);

    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.mark);
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

export const MarkButton = injectSheet(styles)(RawMarkButton);