import React from 'react';

export const IconRoot = ({ children }) => (<svg
  preserveAspectRatio="xMinYMin meet"
  version="1.1"
  x="0px"
  y="0px"
  viewBox="0 0 44 40"
  style={{ enableBackground: 'new 0 0 44 40' }}>{children}</svg>);


const colors = {
  green: '#4aaf46',
  white: '#f8ffe2'
}

export const getStyles = (name) => ({
  bg: {
    fill: `var(--icons-${name}-bg, ${colors.green})`
  },
  fg: {
    fill: `var(--icons-${name}-fg, ${colors.white})`
  }
});

export const Tick = ({ className }) => (
  <polygon
    className={className}
    points="17.4,26.9 10.1,20.6 12.8,17.5 16.3,20.5 22.3,9.7 25.9,11.7" />
)