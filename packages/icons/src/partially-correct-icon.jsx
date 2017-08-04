import { IconRoot, Tick, getStyles } from './icon-root';

import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';

// require('./icons.less');

const styles = getStyles('partially-correct');

export class PartiallyCorrect extends React.Component {

  constructor(props) {
    super(props);

    const { classes } = this.props;
    this.icons = {
      feedback: {
        round: {
          check:
          <IconRoot>
            <path className={classes.bg} d="M31.2,29.1v-0.3c2.2-2.8,3.6-6.3,3.6-10.1c0-8.9-7.2-16.1-16.1-16.1c-8.8,0.1-16,7.3-16,16.2
              s7.2,16.1,16.1,16.1h18.5L31.2,29.1z"/>
            <Tick className={classes.fg} />
            {/* <polygon className={classes.fg} points="27.5,13.4 23.9,11.4 15.9,25.8 19.1,28.6       " />
            <polygon className={classes.fg} points="16.2,20.6 14.4,19.2 11.8,22.3 14.1,24.3   " /> */}
          </IconRoot>,
          emoji:
          <IconRoot>
            <g>
              <g>
                <path className={classes.bg} d="M31.2,29.1v-0.3c2.2-2.8,3.6-6.3,3.6-10.1c0-8.9-7.2-16.1-16.1-16.1c-8.8,0.1-16,7.3-16,16.2
                  s7.2,16.1,16.1,16.1h18.5L31.2,29.1z"/>
                  <rect x="21" y="12.3" className={classes.fg} width="3.7" height="4.7" />
                <rect x="12.7" y="12.3" className={classes.fg} width="3.7" height="4.7" />
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <rect x="12" y="22.5" transform="matrix(0.9794 -0.2019 0.2019 0.9794 -4.5017 4.275)" className={classes.fg} width="13.4" height="3.4" />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </IconRoot>,
          open: {
            check:
            <IconRoot>
              <g>
                <g>
                  <g>
                    {/* <polygon className={classes.bg} points="27.5,13.4 23.9,11.4 15.9,25.8 19.1,28.6       " /> */}
                  </g>
                </g>

                <Tick className={classes.bg} />
                {/* <polygon className={classes.bg} points="16.2,20.6 14.4,19.2 11.8,22.3 14.1,24.3   " /> */}
              </g>
            </IconRoot>,
            emoji:
            <IconRoot>
              <g>
                <g>
                  <rect x="21" y="12.3" className={classes.bg} width="3.7" height="4.7" />
                  <rect x="12.7" y="12.3" className={classes.bg} width="3.7" height="4.7" />
                  <g>
                    <g>
                      <g>
                        <g>
                          <g>
                            <rect x="12" y="22.5" transform="matrix(0.9794 -0.2019 0.2019 0.9794 -4.5017 4.275)" className={classes.bg} width="13.4" height="3.4" />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </IconRoot>
          }
        },
        square: {
          check:
          <IconRoot>
            <g>
              <g>
                <g>
                  <polygon className={classes.bg} points="34.1,28.6 34.1,2.2 2,2.2 2,34.3 40.1,34.3       " />
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <polygon className={classes.fg} points="25.9,11.7 22.3,9.6 14.2,24.1 17.4,26.9      " />
                </g>
              </g>
              <polygon className={classes.fg} points="14.5,18.9 12.8,17.5 10.1,20.6 12.5,22.6   " />
            </g>
          </IconRoot>,
          emoji:
          <IconRoot>
            <g>
              <g>
                <g>
                  <polygon className={classes.bg} points="34.1,28.6 34.1,2.2 2,2.2 2,34.3 40.1,34.3" />
                  <g>
                    <rect x="20.6" y="11.8" className={classes.fg} width="4" height="5" />
                    <rect x="11.5" y="11.8" className={classes.fg} width="4" height="5" />
                    <g>
                      <g>
                        <g>
                          <g>
                            <g>
                              <rect x="10.9" y="22.9" transform="matrix(0.9794 -0.2019 0.2019 0.9794 -4.6237 4.1559)" className={classes.fg} width="14.3" height="3.7" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </IconRoot>,
          open: {
            check:
            <IconRoot>
              <g>
                <g>
                  <g>
                    <polygon className={classes.bg} points="25.9,11.7 22.3,9.6 14.2,24.1 17.4,26.9      " />
                  </g>
                </g>
                <polygon className={classes.bg} points="14.5,18.9 12.8,17.5 10.1,20.6 12.5,22.6   " />
              </g>
            </IconRoot>,
            emoji:
            <IconRoot>
              <g>
                <g>
                  <g>
                    <g>
                      <rect x="20.6" y="11.8" className={classes.bg} width="4" height="5" />
                      <rect x="11.5" y="11.8" className={classes.bg} width="4" height="5" />
                      <g>
                        <g>
                          <g>
                            <g>
                              <g>
                                <rect x="10.9" y="22.9" transform="matrix(0.9794 -0.2019 0.2019 0.9794 -4.6237 4.1559)" className={classes.bg} width="14.3" height="3.7" />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </IconRoot>
          }
        }
      },
      round: {
        check:
        <IconRoot>
          <circle className={classes.bg} cx="21.6" cy="20.4" r="16" />
          <g>
            <g>
              <g>
                <polygon className={classes.fg} points="28.6,13.8 25,11.8 16.9,26.3 20.1,29       " />
              </g>
            </g>
            <polygon className={classes.fg} points="17.2,21 15.5,19.6 12.8,22.7 15.2,24.7   " />
          </g>
        </IconRoot>,
        emoji:
        <IconRoot>
          <g>
            <circle className={classes.bg} cx="21.6" cy="20.4" r="16" />
            <rect x="24" y="14" className={classes.fg} width="3.7" height="4.6" />
            <rect x="15.6" y="14" className={classes.fg} width="3.7" height="4.6" />
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <rect x="15" y="24.1" transform="matrix(0.9794 -0.2019 0.2019 0.9794 -4.7645 4.9018)" className={classes.fg} width="13.3" height="3.4" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </IconRoot>,
        open: {
          check:
          <IconRoot>
            <g>
              <g>
                <g>
                  <polygon className={classes.bg} points="27.5,13.4 23.9,11.4 15.9,25.8 19.1,28.6       " />
                </g>
              </g>
              <polygon className={classes.bg} points="16.2,20.6 14.4,19.2 11.8,22.3 14.1,24.3   " />
            </g>
          </IconRoot>,
          emoji:
          <IconRoot>
            <g>
              <g>
                <rect x="21" y="12.3" className={classes.bg} width="3.7" height="4.7" />
                <rect x="12.7" y="12.3" className={classes.bg} width="3.7" height="4.7" />
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <rect x="12" y="22.5" transform="matrix(0.9794 -0.2019 0.2019 0.9794 -4.5017 4.275)" className={classes.bg} width="13.4" height="3.4" />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </IconRoot>
        }
      },
      square: {
        check:
        <IconRoot>
          <g>
            <g>
              <g>
                <g>
                  <rect x="5.6" y="4.1" className={classes.bg} width="32" height="32" />
                </g>
              </g>
            </g>
          </g>
          <g>
            <g>
              <g>
                <polygon className={classes.fg} points="29.5,13.5 25.9,11.5 17.8,26 21,28.7       " />
              </g>
            </g>
            <polygon className={classes.fg} points="18.1,20.7 16.4,19.3 13.7,22.4 16.1,24.4   " />
          </g>
        </IconRoot>,
        emoji:
        <IconRoot>
          <g>
            <g>
              <g>
                <g>
                  <rect x="5.6" y="4.1" className={classes.bg} width="32" height="32" />
                </g>
              </g>
            </g>
            <rect x="24" y="14.2" className={classes.fg} width="3.7" height="4.7" />
            <rect x="15.6" y="14.2" className={classes.fg} width="3.7" height="4.7" />
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <rect x="15" y="24.4" transform="matrix(0.9794 -0.2019 0.2019 0.9794 -4.817 4.9052)" className={classes.fg} width="13.4" height="3.4" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </IconRoot>,
        open: {
          check:
          <IconRoot>
            <g>
              <g>
                <g>
                  <polygon className={classes.bg} points="25.9,11.7 22.3,9.6 14.2,24.1 17.4,26.9      " />
                </g>
              </g>
              <polygon className={classes.bg} points="14.5,18.9 12.8,17.5 10.1,20.6 12.5,22.6   " />
            </g>
          </IconRoot>,
          emoji:
          <IconRoot>
            <g>
              <g>
                <g>
                  <g>
                    <rect x="20.6" y="11.8" className={classes.bg} width="4" height="5" />
                    <rect x="11.5" y="11.8" className={classes.bg} width="4" height="5" />
                    <g>
                      <g>
                        <g>
                          <g>
                            <g>
                              <rect x="10.9" y="22.9" transform="matrix(0.9794 -0.2019 0.2019 0.9794 -4.6237 4.1559)" className={classes.bg} width="14.3" height="3.7" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </IconRoot>
        }
      }
    };
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

PartiallyCorrect.propTypes = {
  iconSet: PropTypes.oneOf(['emoji', 'check']),
  shape: PropTypes.oneOf(['round', 'square']),
  category: PropTypes.oneOf(['feedback', undefined]),
  open: PropTypes.bool
};

PartiallyCorrect.defaultProps = {
  iconSet: 'check',
  shape: 'round',
  category: undefined,
  open: false
};

export default injectSheet(styles)(PartiallyCorrect);