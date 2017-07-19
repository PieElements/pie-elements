import PropTypes from 'prop-types';
import React from 'react';

require('./icons.less');

export default class Correct extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const icons = {
      feedback: {
        round: {
          check:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <path className="correct-background" d="M31.2,29.1v-0.3c2.2-2.8,3.6-6.3,3.6-10.1c0-8.9-7.2-16.1-16.1-16.1c-8.8,0.1-16,7.3-16,16.2
              s7.2,16.1,16.1,16.1h18.5L31.2,29.1z"/>
              <g>
              <g>
                <polygon className="correct-foreground" points="19.1,28.6 11.8,22.3 14.4,19.2 17.9,22.1 23.9,11.4 27.5,13.4     " />
              </g>
            </g>
          </svg>,
          emoji:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <path className="correct-background" d="M31.2,29.1v-0.3c2.2-2.8,3.6-6.3,3.6-10.1c0-8.9-7.2-16.1-16.1-16.1c-8.8,0.1-16,7.3-16,16.2
              s7.2,16.1,16.1,16.1h18.5L31.2,29.1z"/>
              <g>
              <g>
                <g>
                  <g>
                    <path className="correct-foreground" d="M24.7,22.1c-1.5,1.7-3.6,2.7-5.8,2.7s-4.5-1.1-5.8-2.7l-2.8,1.6c2,2.7,5.2,4.2,8.7,4.2
                      c3.4,0,6.6-1.6,8.7-4.2L24.7,22.1z"/>
                      <rect x="21.1" y="13.1" className="correct-foreground" width="3.7" height="4.7" />
                    <rect x="12.7" y="13.1" className="correct-foreground" width="3.7" height="4.7" />
                  </g>
                </g>
              </g>
            </g>
          </svg>,
          open: {
            check:
            <svg preserveAspectRatio="xMinYMin meet" className="" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
              <g>
                <g>
                  <polygon className="correct-background" points="19.1,28.6 11.8,22.3 14.4,19.2 17.9,22.1 23.9,11.4 27.5,13.4     " />
                </g>
              </g>
            </svg>,
            emoji:
            <svg preserveAspectRatio="xMinYMin meet" className="" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
              <g>
                <g>
                  <g>
                    <g>
                      <path className="correct-background" d="M24.7,22.1c-1.5,1.7-3.6,2.7-5.8,2.7s-4.5-1.1-5.8-2.7l-2.8,1.6c2,2.7,5.2,4.2,8.7,4.2
                        c3.4,0,6.6-1.6,8.7-4.2L24.7,22.1z"/>
                        <rect x="21.1" y="13.1" className="correct-background" width="3.7" height="4.7" />
                      <rect x="12.7" y="13.1" className="correct-background" width="3.7" height="4.7" />
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
                  <polygon className="correct-background" points="34.1,28.6 34.1,2.2 2,2.2 2,34.3 40.1,34.3       " />
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <polygon className="correct-foreground" points="17.4,26.9 10.1,20.6 12.8,17.5 16.3,20.5 22.3,9.7 25.9,11.7        " />
                  </g>
                </g>
              </g>
            </g>
          </svg>,
          emoji:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <g>
                  <g>
                    <polygon className="correct-background" points="34.1,28.6 34.1,2.2 2,2.2 2,34.3 40.1,34.3" />
                  </g>
                </g>
                <g>
                  <g>
                    <g>
                      <path className="correct-foreground" d="M24.5,21.7c-1.6,1.8-3.9,2.9-6.3,2.9s-4.8-1.1-6.3-2.9l-3,1.7c2.2,2.9,5.6,4.6,9.4,4.6
                        c3.7,0,7.1-1.7,9.4-4.6L24.5,21.7z"/>
                        <rect x="20.6" y="12" className="correct-foreground" width="4" height="5" />
                      <rect x="11.5" y="12" className="correct-foreground" width="4" height="5" />
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
                <g>
                  <g>
                    <g>
                      <polygon className="correct-background" points="17.4,26.9 10.1,20.6 12.8,17.5 16.3,20.5 22.3,9.7 25.9,11.7        " />
                    </g>
                  </g>
                </g>
              </g>
            </svg>,
            emoji:
            <svg preserveAspectRatio="xMinYMin meet" className="" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <path className="correct-background" d="M24.5,21.7c-1.6,1.8-3.9,2.9-6.3,2.9s-4.8-1.1-6.3-2.9l-3,1.7c2.2,2.9,5.6,4.6,9.4,4.6
                          c3.7,0,7.1-1.7,9.4-4.6L24.5,21.7z"/>
                          <rect x="20.6" y="12" className="correct-background" width="4" height="5" />
                        <rect x="11.5" y="12" className="correct-background" width="4" height="5" />
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
        <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
          <circle className="correct-background" cx="21.6" cy="20.4" r="16" />
          <g>
            <g>
              <polygon className="correct-foreground" points="20.6,29 13.3,22.7 16,19.6 19.5,22.6 25.5,11.8 29.1,13.8     " />
            </g>
          </g>
        </svg>,
        emoji:
        <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
          <circle className="correct-background" cx="21.6" cy="20.4" r="16" />
          <g>
            <g>
              <g>
                <g>
                  <path className="correct-foreground" d="M27.6,23.7c-1.5,1.7-3.6,2.6-5.8,2.6s-4.4-1.1-5.8-2.6l-2.7,1.6c2,2.6,5.2,4.2,8.7,4.2
                    c3.4,0,6.6-1.6,8.7-4.2L27.6,23.7z"/>
                      <rect x="24" y="14.7" className="correct-foreground" width="3.7" height="4.7" />
                  <rect x="15.6" y="14.7" className="correct-foreground" width="3.7" height="4.7" />
                </g>
              </g>
            </g>
          </g>
        </svg>,
        open: {
          check:
          <svg preserveAspectRatio="xMinYMin meet" className="" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <polygon className="correct-background" points="19.1,28.6 11.8,22.3 14.4,19.2 17.9,22.1 23.9,11.4 27.5,13.4     " />
              </g>
            </g>
          </svg>,
          emoji:
          <svg preserveAspectRatio="xMinYMin meet" className="" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <g>
                  <g>
                    <path className="correct-background" d="M24.7,22.1c-1.5,1.7-3.6,2.7-5.8,2.7s-4.5-1.1-5.8-2.7l-2.8,1.6c2,2.7,5.2,4.2,8.7,4.2
                      c3.4,0,6.6-1.6,8.7-4.2L24.7,22.1z"/>
                      <rect x="21.1" y="13.1" className="correct-background" width="3.7" height="4.7" />
                    <rect x="12.7" y="13.1" className="correct-background" width="3.7" height="4.7" />
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
                <rect x="5.6" y="4.1" className="correct-background" width="32" height="32" />
              </g>
            </g>
          </g>
          <g>
            <g>
              <g>
                <polygon className="correct-foreground" points="21,28.7 13.7,22.4 16.4,19.3 19.9,22.3 25.9,11.5 29.5,13.5       " />
              </g>
            </g>
          </g>
        </svg>
        ,
        emoji:
        <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
          <g>
            <g>
              <g>
                <rect x="5.6" y="4.1" className="correct-background" width="32" height="32" />
              </g>
            </g>
            <g>
              <g>
                <g>
                  <path className="correct-foreground" d="M27.6,23.3C26.1,25,23.9,26,21.7,26c-2.3,0-4.4-1-5.9-2.7l-2.8,1.6c2.1,2.7,5.3,4.3,8.7,4.3
                    c3.4,0,6.6-1.6,8.7-4.3L27.6,23.3z"/>
                    <rect x="24" y="14.2" className="correct-foreground" width="3.7" height="4.7" />
                  <rect x="15.6" y="14.2" className="correct-foreground" width="3.7" height="4.7" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        ,
        open: {
          check:
          <svg preserveAspectRatio="xMinYMin meet" className="" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <g>
                  <g>
                    <polygon className="correct-background" points="17.4,26.9 10.1,20.6 12.8,17.5 16.3,20.5 22.3,9.7 25.9,11.7        " />
                  </g>
                </g>
              </g>
            </g>
          </svg>,
          emoji:
          <svg preserveAspectRatio="xMinYMin meet" className="" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path className="correct-background" d="M24.5,21.7c-1.6,1.8-3.9,2.9-6.3,2.9s-4.8-1.1-6.3-2.9l-3,1.7c2.2,2.9,5.6,4.6,9.4,4.6
                        c3.7,0,7.1-1.7,9.4-4.6L24.5,21.7z"/>
                        <rect x="20.6" y="12" className="correct-background" width="4" height="5" />
                      <rect x="11.5" y="12" className="correct-background" width="4" height="5" />

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

Correct.propTypes = {
  iconSet: PropTypes.oneOf(['emoji', 'check']),
  shape: PropTypes.oneOf(['round', 'square']),
  category: PropTypes.oneOf(['feedback', undefined]),
  open: PropTypes.bool
};

Correct.defaultProps = {
  iconSet: 'check',
  shape: 'round',
  category: undefined,
  open: false
};

