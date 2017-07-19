import PropTypes from 'prop-types';
import React from 'react';

require('./icons.less');

export default class NothingSubmitted extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const icons = {
      check:
      <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <polygon className="nothing-submitted-background" points="14.8,4.5 5.6,13.8 5.6,27 14.8,36.5 28.1,36.5 37.6,27 37.6,13.8 28.1,4.5           " />
                </g>
              </g>
            </g>
          </g>
          <g>
            <g>
              <rect x="19.3" y="10.3" className="nothing-submitted-foreground" width="4.5" height="12.7" />
            </g>
            <rect x="19.3" y="26.2" className="nothing-submitted-foreground" width="4.5" height="4.5" />
          </g>
        </g>
      </svg>,
      emoji:
      <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
        <g>
          <g>
            <g>
              <g>
                <polygon className="nothing-submitted-background" points="15.4,5.4 6.6,14.1 6.6,26.6 15.4,35.4 27.8,35.4 36.6,26.6 36.6,14.1 27.8,5.4" />
              </g>
            </g>
          </g>
          <g>
            <g>
              <g>
                <rect x="23.8" y="15" className="nothing-submitted-foreground" width="3.5" height="4.4" />
                <rect x="16" y="15" className="nothing-submitted-foreground" width="3.5" height="4.4" />
                <path className="nothing-submitted-foreground" d="M24.2,27.1h-5.1c-0.8,0-1.5-0.7-1.5-1.5v0c0-0.8,0.7-1.5,1.5-1.5h5.1c0.8,0,1.5,0.7,1.5,1.5v0
                  C25.7,26.4,25,27.1,24.2,27.1z"/>
                </g>
            </g>
          </g>
        </g>
      </svg>,
      feedback: {
        check:
        <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <polygon className="nothing-submitted-background" points="15.6,4.8 7.5,13 7.5,24.5 15.6,32.8 27.2,32.8 35.5,24.5 35.5,13 27.2,4.8             " />
                  </g>
                </g>
              </g>
              <g>
                <path className="nothing-submitted-foreground" d="M23.9,25h-4.8c-0.8,0-1.4-0.6-1.4-1.4l0,0c0-0.8,0.6-1.4,1.4-1.4h4.8c0.8,0,1.4,0.6,1.4,1.4l0,0
                  C25.3,24.5,24.7,25,23.9,25z"/>
                  <g>
                  <rect x="23.7" y="13.3" className="nothing-submitted-foreground" width="3.5" height="4.4" />
                  <rect x="15.8" y="13.3" className="nothing-submitted-foreground" width="3.5" height="4.4" />
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
                  <g>
                    <polygon className="nothing-submitted-background" points="15.6,4.8 7.5,13 7.5,24.5 15.6,32.8 27.2,32.8 35.5,24.5 35.5,13 27.2,4.8             " />
                  </g>
                </g>
              </g>
              <g>
                <path className="nothing-submitted-foreground" d="M23.9,25h-4.8c-0.8,0-1.4-0.6-1.4-1.4l0,0c0-0.8,0.6-1.4,1.4-1.4h4.8c0.8,0,1.4,0.6,1.4,1.4l0,0
                  C25.3,24.5,24.7,25,23.9,25z"/>
                  <g>
                  <rect x="23.7" y="13.3" className="nothing-submitted-foreground" width="3.5" height="4.4" />
                  <rect x="15.8" y="13.3" className="nothing-submitted-foreground" width="3.5" height="4.4" />
                </g>
              </g>
            </g>
          </g>
        </svg>,
        square: {
          check:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <polygon className="nothing-submitted-background" points="14.8,4.5 5.6,13.8 5.6,27 14.8,36.5 28.1,36.5 37.6,27 37.6,13.8 28.1,4.5" />
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <rect x="19.3" y="10.3" className="nothing-submitted-foreground" width="4.5" height="12.7" />
                </g>
                <rect x="19.3" y="26.2" className="nothing-submitted-foreground" width="4.5" height="4.5" />
              </g>
            </g>
          </svg>,
          emoji:
          <svg preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <polygon className="nothing-submitted-background" points="15.6,4.8 7.5,13 7.5,24.5 15.6,32.8 27.2,32.8 35.5,24.5 35.5,13 27.2,4.8             " />
                    </g>
                  </g>
                </g>
                <g>
                  <path className="nothing-submitted-foreground" d="M23.9,25h-4.8c-0.8,0-1.4-0.6-1.4-1.4l0,0c0-0.8,0.6-1.4,1.4-1.4h4.8c0.8,0,1.4,0.6,1.4,1.4l0,0
                    C25.3,24.5,24.7,25,23.9,25z"/>
                    <g>
                    <rect x="23.7" y="13.3" className="nothing-submitted-foreground" width="3.5" height="4.4" />
                    <rect x="15.8" y="13.3" className="nothing-submitted-foreground" width="3.5" height="4.4" />
                  </g>
                </g>
              </g>
            </g>
          </svg>,
          open: {
            check:
            <svg preserveAspectRatio="xMinYMin meet" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
              <g>
                <g>
                  <g>
                    <rect x="19.3" y="10.3" className="nothing-submitted-background" width="4.5" height="12.7" />
                  </g>
                  <rect x="19.3" y="26.2" className="nothing-submitted-background" width="4.5" height="4.5" />
                </g>
              </g>
            </svg>,
            emoji:
            <svg preserveAspectRatio="xMinYMin meet" className="" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{ enableBackground: 'new 0 0 44 40' }}>
              <g>
                <g>
                  <g>
                    <path className="nothing-submitted-background" d="M23.9,25h-4.8c-0.8,0-1.4-0.6-1.4-1.4l0,0c0-0.8,0.6-1.4,1.4-1.4h4.8c0.8,0,1.4,0.6,1.4,1.4l0,0
                      C25.3,24.5,24.7,25,23.9,25z"/>
                      <g>
                      <rect x="23.7" y="13.3" className="nothing-submitted-background" width="3.5" height="4.4" />
                      <rect x="15.8" y="13.3" className="nothing-submitted-background" width="3.5" height="4.4" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          }
        }
      }
    };

    if (this.props.category === undefined) {
      console.log(`icons[${this.props.iconSet}]`);
      return icons[this.props.iconSet];
    } else {
      if (this.props.shape === undefined) {
        console.log(`icons.feedback[${this.props.iconSet}]`);
        return icons.feedback[this.props.iconSet];
      } else {
        if (this.props.open === true) {
          console.log(`icons.feedback.square.open[${this.props.iconSet}]`);
          return icons.feedback.square.open[this.props.iconSet];
        } else {
          console.log(`icons.feedback.square[${this.props.iconSet}]`);
          return icons.feedback.square[this.props.iconSet];
        }
      }
    }

    return null;
  }

}

NothingSubmitted.propTypes = {
  iconSet: PropTypes.oneOf(['emoji', 'check', undefined]),
  shape: PropTypes.oneOf(['square', undefined]),
  category: PropTypes.oneOf(['feedback', undefined]),
  open: PropTypes.bool
};

NothingSubmitted.defaultProps = {
  iconSet: 'check',
  shape: undefined,
  category: undefined,
  open: false
};
