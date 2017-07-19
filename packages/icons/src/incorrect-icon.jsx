import PropTypes from 'prop-types';
import React from 'react';

export default class Incorrect extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const icons = {
      feedback: {
        round: {
          check:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <path className="incorrect-background" d="M31.2,29.1v-0.3c2.2-2.8,3.6-6.3,3.6-10.1c0-8.9-7.2-16.1-16.1-16.1c-8.8,0.1-16,7.3-16,16.2
              s7.2,16.1,16.1,16.1h18.5L31.2,29.1z"/>
              <g>
              <rect x="11" y="17.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.852 19.2507)" className="incorrect-foreground" width="16.6" height="3.7" />
              <rect x="17.4" y="10.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.8175 19.209)" className="incorrect-foreground" width="3.7" height="16.6" />
            </g>
          </svg>,
          emoji:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableForeground: 'new 0 0 44 40' }}>
            <g>
              <path className="incorrect-background" d="M31.2,29.1v-0.3c2.2-2.8,3.6-6.3,3.6-10.1c0-8.9-7.2-16.1-16.1-16.1c-8.8,0.1-16,7.3-16,16.2
                s7.2,16.1,16.1,16.1h18.5L31.2,29.1z"/>
                <g>
                <g>
                  <g>
                    <g>
                      <rect x="21" y="12.9" className="incorrect-foreground" width="3.7" height="4.7" />
                      <rect x="12.7" y="12.9" className="incorrect-foreground" width="3.7" height="4.7" />
                      <rect x="12.2" y="22.5" className="incorrect-foreground" width="13" height="3.3" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>,
          open: {
            check:
            <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
              <g>
                <rect x="11" y="17.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.852 19.2507)" className="incorrect-background" width="16.6" height="3.7" />
                <rect x="17.4" y="10.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.8175 19.209)" className="incorrect-background" width="3.7" height="16.6" />
              </g>
            </svg>,
            emoji:
            <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <rect x="21" y="12.9" className="incorrect-background" width="3.7" height="4.7" />
                        <rect x="12.7" y="12.9" className="incorrect-background" width="3.7" height="4.7" />
                        <rect x="12.2" y="22.5" className="incorrect-background" width="13" height="3.3" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          }
        },
        square: {
          check:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <g>
                  <polygon className="incorrect-background" points="34.1,28.6 34.1,2.2 2,2.2 2,34.3 40.1,34.3       " />
                </g>
              </g>
            </g>
            <g>
              <rect x="8.9" y="16.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.9427 18.0432)" className="incorrect-foreground" width="17.9" height="4" />
              <rect x="15.7" y="9.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -8.011 17.9927)" className="incorrect-foreground" width="4" height="17.9" />
            </g>
          </svg>,
          emoji:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <g>
                  <polygon className="incorrect-background" points="34.1,28.6 34.1,2.2 2,2.2 2,34.3 40.1,34.3" />
                  <g>
                    <g>
                      <g>
                        <g>
                          <rect x="20.6" y="11.8" className="incorrect-foreground" width="4" height="5" />
                          <rect x="11.5" y="11.8" className="incorrect-foreground" width="4" height="5" />
                          <rect x="11.1" y="22.2" className="incorrect-foreground" width="14" height="3.6" />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>,
          open: {
            check:
            <svg preserveAspectRatio="xMinYMin meet" className="" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
              <g>
                <rect x="8.9" y="16.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.9427 18.0432)" className="incorrect-background" width="17.9" height="4" />
                <rect x="15.7" y="9.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -8.011 17.9927)" className="incorrect-background" width="4" height="17.9" />
              </g>
            </svg>,
            emoji:
            <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <g>
                            <rect x="20.6" y="11.8" className="incorrect-background" width="4" height="5" />
                            <rect x="11.5" y="11.8" className="incorrect-background" width="4" height="5" />
                            <rect x="11.1" y="22.2" className="incorrect-background" width="14" height="3.6" />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          }
        }
      },
      round: {
        check:
        <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
          <circle className="incorrect-background" cx="21.6" cy="20.4" r="16" />
          <g>
            <rect x="19.8" y="12.4" transform="matrix(0.7071 0.7071 -0.7071 0.7071 20.9671 -9.2092)" className="incorrect-foreground" width="3.7" height="16.6" />
            <rect x="19.8" y="12.4" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 51.5141 20.0719)" className="incorrect-foreground" width="3.7" height="16.6" />
          </g>
        </svg>,
        emoji:
        <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
          <circle className="incorrect-background" cx="21.6" cy="20.4" r="16" />
          <g>
            <g>
              <g>
                <g>
                  <rect x="24" y="14" className="incorrect-foreground" width="3.7" height="4.6" />
                  <rect x="15.6" y="14" className="incorrect-foreground" width="3.7" height="4.6" />
                  <rect x="15.1" y="23.6" className="incorrect-foreground" width="12.9" height="3.3" />
                </g>
              </g>
            </g>
          </g>
        </svg>,
        open: {
          check:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <rect x="11" y="17.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.852 19.2507)" className="incorrect-background" width="16.6" height="3.7" />
              <rect x="17.4" y="10.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.8175 19.209)" className="incorrect-background" width="3.7" height="16.6" />
            </g>
          </svg>,
          emoji:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <rect x="21" y="12.9" className="incorrect-background" width="3.7" height="4.7" />
                      <rect x="12.7" y="12.9" className="incorrect-background" width="3.7" height="4.7" />
                      <rect x="12.2" y="22.5" className="incorrect-background" width="13" height="3.3" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        }
      },
      square: {
        check:
        <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <rect x="5.6" y="4.1" className="incorrect-background" width="32" height="32" />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g>
            <rect x="19.7" y="12.1" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 51.8729 20.6794)" className="incorrect-foreground" width="4" height="17.9" />
            <rect x="19.7" y="12.1" transform="matrix(0.7071 0.7071 -0.7071 0.7071 21.2501 -9.1364)" className="incorrect-foreground" width="4" height="17.9" />
          </g>
        </svg>,
        emoji:
        <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <rect x="5.6" y="4.1" className="incorrect-background" width="32" height="32" />
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <rect x="24" y="14.2" className="incorrect-foreground" width="3.7" height="4.7" />
                    <rect x="15.6" y="14.2" className="incorrect-foreground" width="3.7" height="4.7" />
                    <rect x="15.1" y="23.8" className="incorrect-foreground" width="13" height="3.3" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>,
        open: {
          check:
          <svg preserveAspectRatio="xMinYMin meet" className="" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <rect x="8.9" y="16.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.9427 18.0432)" className="incorrect-background" width="17.9" height="4" />
              <rect x="15.7" y="9.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -8.011 17.9927)" className="incorrect-background" width="4" height="17.9" />
            </g>
          </svg>,
          emoji:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <rect x="20.6" y="11.8" className="incorrect-background" width="4" height="5" />
                          <rect x="11.5" y="11.8" className="incorrect-background" width="4" height="5" />
                          <rect x="11.1" y="22.2" className="incorrect-background" width="14" height="3.6" />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        }
      }
    };

    if (this.props.category === undefined) {
      if (this.props.open === true) {
        return icons[this.props.shape].open[this.props.iconSet];
      } else {
        return icons[this.props.shape][this.props.iconSet];
      }
    } else {
      if (this.props.open === true) {
        return icons.feedback[this.props.shape].open[this.props.iconSet];
      } else {
        return icons.feedback[this.props.shape][this.props.iconSet];
      }
    }
    return null;
  }

}

Incorrect.propTypes = {
  iconSet: PropTypes.oneOf(['emoji', 'check']),
  shape: PropTypes.oneOf(['round', 'square']),
  category: PropTypes.oneOf(['feedback', undefined]),
  open: PropTypes.bool
};

Incorrect.defaultProps = {
  iconSet: 'check',
  shape: 'round',
  category: undefined,
  open: false
};
