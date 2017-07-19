import PropTypes from 'prop-types';
import React from 'react';

require('./icons.less');

export default class Instructions extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.open === true) {
      return <svg version="1.1" id="Layer_1" viewBox="-128 129 31 31" style={{ enableBackground: 'new -128 129 31 31' }}>
        <g>
          <g>
            <g>
              <g>
                <rect x="-123.9" y="135.3" style={{ fill: '#D0CAC5', stroke: '#E6E3E0', strokeWidth: 0.75, strokeLinejoin: 'round', strokeMiterlimit: 10 }} width="4.1" height="4.1" />
                <polygon style={{ fill: '#D0CAC5', stroke: '#E6E3E0', strokeWidth: 0.75, strokeLinejoin: 'round', strokeMiterlimit: 10 }} points="-119.8,150.4 -119.8,142.2 -125,142.2 -125,144.9 -122.6,144.9 -122.6,150.4 -125.6,150.4 
                  -125.6,153.2 -116.8,153.2 -116.8,150.4        "/>
              </g>
            </g>
          </g>
          <g>
            <g>
              <g>
                <rect x="-124.7" y="134.7" style={{ fill: '#B3ABA4', stroke: '#CDC7C2', strokeWidth: 0.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} width="4.1" height="4.1" />
                <polygon style={{ fill: '#B3ABA4', stroke: '#CDC7C2', strokeWidth: 0.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} points="-120.6,149.8 -120.6,141.5 -125.8,141.5 -125.8,144.3 -123.3,144.3 -123.3,149.8 -126.4,149.8 
                  -126.4,152.5 -117.6,152.5 -117.6,149.8        "/>
              </g>
            </g>
          </g>
          <g>
            <g>
              <g>
                <rect x="-125.5" y="134" style={{ fill: '#7FABC6' }} width="4.1" height="4.1" />
                <polygon style={{ fill: '#7FABC6' }} points="-121.4,149.1 -121.4,140.9 -126.5,140.9 -126.5,143.6 -124.1,143.6 -124.1,149.1 -127.1,149.1 
                  -127.1,151.9 -118.4,151.9 -118.4,149.1        "/>
              </g>
            </g>
          </g>
          <g>
            <line style={{ fill: 'none', stroke: '#BCE2FF', strokeWidth: 2, strokeMiterlimit: 10 }} x1="-98" y1="142" x2="-114.6" y2="142" />
            <line style={{ fill: 'none', stroke: '#BCE2FF', strokeWidth: 2, strokeMiterlimit: 10 }} x1="-98" y1="146.3" x2="-114.6" y2="146.3" />
            <line style={{ fill: 'none', stroke: '#BCE2FF', strokeWidth: 2, strokeMiterlimit: 10 }} x1="-104" y1="150.7" x2="-114.6" y2="150.7" />
          </g>
        </g>
      </svg>;
    } else {
      return <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="-128 129 31 31" style={{ enableBackground: 'new -128 129 31 31' }}>
        <g>
          <g>
            <g>
              <g>
                <rect x="-123.9" y="135.3" style={{ fill: '#D0CAC5', stroke: '#E6E3E0', strokeWidth: 0.75, strokeLinejoin: 'round', strokeMiterlimit: 10 }} width="4.1" height="4.1" />
                <polygon style={{ fill: '#D0CAC5', stroke: '#E6E3E0', strokeWidth: 0.75, strokeLinejoin: 'round', strokeMiterlimit: 10 }} points="-119.8,150.4 -119.8,142.2 -125,142.2 -125,144.9 -122.6,144.9 -122.6,150.4 -125.6,150.4 
                  -125.6,153.2 -116.8,153.2 -116.8,150.4        "/>
              </g>
            </g>
          </g>
          <g>
            <g>
              <g>
                <rect x="-124.7" y="134.7" style={{ fill: '#B3ABA4', stroke: '#CDC7C2', strokeWidth: 0.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} width="4.1" height="4.1" />
                <polygon style={{ fill: '#B3ABA4', stroke: '#CDC7C2', strokeWidth: 0.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} points="-120.6,149.8 -120.6,141.5 -125.8,141.5 -125.8,144.3 -123.3,144.3 -123.3,149.8 -126.4,149.8 
                  -126.4,152.5 -117.6,152.5 -117.6,149.8        "/>
              </g>
            </g>
          </g>
          <g>
            <g>
              <g>
                <rect x="-125.5" y="134" style={{ fill: '#1A9CFF' }} width="4.1" height="4.1" />
                <polygon style={{ fill: '#1A9CFF' }} points="-121.4,149.1 -121.4,140.9 -126.5,140.9 -126.5,143.6 -124.1,143.6 -124.1,149.1 -127.1,149.1 
                  -127.1,151.9 -118.4,151.9 -118.4,149.1        "/>
              </g>
            </g>
          </g>
          <g>
            <line style={{ fill: 'none', stroke: '#BCE2FF', strokeWidth: 2, strokeMiterlimit: 10 }} x1="-98" y1="142" x2="-114.6" y2="142" />
            <line style={{ fill: 'none', stroke: '#BCE2FF', strokeWidth: 2, strokeMiterlimit: 10 }} x1="-98" y1="146.3" x2="-114.6" y2="146.3" />
            <line style={{ fill: 'none', stroke: '#BCE2FF', strokeWidth: 2, strokeMiterlimit: 10 }} x1="-104" y1="150.7" x2="-114.6" y2="150.7" />
          </g>
        </g>
      </svg>;
    }
  }

}

Instructions.propTypes = {
  open: PropTypes.bool
};

Instructions.defaultProps = {
  open: false
};

