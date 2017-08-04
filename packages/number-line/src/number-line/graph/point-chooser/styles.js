const iconHeight = 41;
const iconWidth = 42;
export default {
  pointChooser: {
    backgroundColor: 'white',
    display: 'inline-block',
    borderRadius: '4px',
    height: `${iconHeight + 1}px`,
    paddingLeft: '1px',
    paddingRight: '1px'
  },
  deleteIconHolder: {
    position: 'relative',
    top: '6px'
  },
  deleteIcon: {
    fill: 'black',
    cursor: 'pointer',
    transition: 'opacity 100ms linear',
    '&:hover': {
      opacity: '0.5'
    }
  }
}