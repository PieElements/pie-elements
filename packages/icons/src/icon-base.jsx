import { Circle, IconRoot, RoundFeedbackBox, Square, SquareFeedbackBox, getStyles } from './icon-root';

import PropTypes from 'prop-types';
import React from 'react';

export default (Action, Emoji) => {

  class IconBase extends React.Component {

    constructor(props) {
      super(props);
      const { classes } = this.props;

      this.icons = {
        feedback: {
          round: {
            check: <IconRoot>
              <RoundFeedbackBox className={classes.bg} />
              <Action className={classes.fg} />
            </IconRoot>,
            emoji: <IconRoot>
              <RoundFeedbackBox className={classes.bg} />
              <Emoji className={classes.fg} />
            </IconRoot>,
            open: {
              check: <IconRoot>
                <Action className={classes.bg} />
              </IconRoot>,
              emoji: <IconRoot>
                <Emoji className={classes.bg} />
              </IconRoot>
            }
          },
          square: {
            check: <IconRoot>
              <SquareFeedbackBox className={classes.bg} />
              <Action className={classes.fg} />
            </IconRoot>,
            emoji: <IconRoot>
              <SquareFeedbackBox className={classes.bg} />
              <Emoji className={classes.fg} />
            </IconRoot>,
            open: {
              check: <IconRoot>
                <Action className={classes.bg} />
              </IconRoot>,
              emoji: <IconRoot>
                <Emoji className={classes.bg} />
              </IconRoot>
            }
          }
        },
        round: {
          check: <IconRoot>
            <Circle className={classes.bg} />
            <Action className={classes.fg} />
          </IconRoot>,
          emoji: <IconRoot>
            <Circle className={classes.bg} />
            <Emoji className={classes.fg} />
          </IconRoot>,
          open: {
            check: <IconRoot>
              <Action className={classes.bg} />
            </IconRoot>,
            emoji: <IconRoot>
              <Emoji className={classes.bg} />
            </IconRoot>
          }
        },
        square: {
          check: <IconRoot>
            <Square className={classes.bg} />
            <Action className={classes.fg} />
          </IconRoot>,
          emoji: <IconRoot>
            <Square className={classes.bg} />
            <Emoji className={classes.fg} />
          </IconRoot>,
          open: {
            check:
            <IconRoot>
              <Action className={classes.bg} />
            </IconRoot>,
            emoji:
            <IconRoot>
              <Emoji className={classes.bg} />
            </IconRoot>
          }
        }
      }
    }

    render() {
      if (this.props.category === undefined) {
        if (this.props.open === true) {
          return this.icons[this.props.shape].open[this.props.iconSet];
        } else {
          return this.icons[this.props.shape][this.props.iconSet];
        }
      } else {
        if (this.props.open === true) {
          return this.icons.feedback[this.props.shape].open[this.props.iconSet];
        } else {
          return this.icons.feedback[this.props.shape][this.props.iconSet];
        }
      }
      return null;
    }

  }

  IconBase.propTypes = {
    iconSet: PropTypes.oneOf(['emoji', 'check']),
    shape: PropTypes.oneOf(['round', 'square']),
    category: PropTypes.oneOf(['feedback', undefined]),
    open: PropTypes.bool
  };

  IconBase.defaultProps = {
    iconSet: 'check',
    shape: 'round',
    category: undefined,
    open: false
  };

  return IconBase;
}

