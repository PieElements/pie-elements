import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import NumberFormat from 'react-number-format';

const log = debug('pie-elements:text-entry:input');

const BuildFormat = (opts) => {
  return class extends React.Component {

    render() {
      log('[render] this.props: ', this.props);
      return (
        <NumberFormat
          {...opts}
          {...this.props}
          onValueChange={values => {
            log('[onValueChange]: ', values);
            this.props.onChange({
              target: {
                value: values.value,
              },
            });
          }}
        />
      );
    }
  }
}

const DecimalNegativeSeparator = BuildFormat({
  decimalScale: 2,
  fixedDecimalScale: true,
  thousandSeparator: true,
  allowNegative: true
});

const NotDecimalNegativeSeparator = BuildFormat({
  decimalScale: 0,
  thousandSeparator: true,
  allowNegative: true
});

const NotDecimalNoNegativeSeparator = BuildFormat({
  decimalScale: 0,
  thousandSeparator: true,
  allowNegative: false
});

const NotDecimalNegativeNoSeparator = BuildFormat({
  decimalScale: 0,
  allowNegative: true
});

const NotDecimalNoNegativeNoSeparator = BuildFormat({
  decimalScale: 0,
  allowNegative: false
});

const DecimalNoNegativeNoSeparator = BuildFormat({
  decimalScale: 2,
  fixedDecimalScale: true,
  allowNegative: false
});

const DecimalNoNegativeSeparator = BuildFormat({
  decimalScale: 2,
  fixedDecimalScale: true,
  thousandSeparator: true,
  allowNegative: false
});

const DecimalNegativeNoSeparator = BuildFormat({
  decimalScale: 2,
  fixedDecimalScale: true,
  allowNegative: true
});

function mtch() {
  return _.every(arguments, Boolean);
}

/**
 * It seems like the Mui Input component does not like getting an anonymous class
 * built each time if wants the format component. 
 * Instead we predefine them and return them.
 */
export const getFormatTag = ({ allowDecimal, allowSeparator, allowNegative, allowIntegersOnly }) => {

  if (allowIntegersOnly) {
    /**
     * This would be preferable: 
     * return BuildFormat({
     *  decimalScale: allowDecimal ? 2 : 0,
     *  fixedDecimalScale: allowDecimal ? true : false,
     *  thousandSeparator: allowSeparator,
     *  allowNegative
     * })
     */
    if (mtch(allowDecimal, allowSeparator, allowNegative)) {
      return DecimalNegativeSeparator;
    } else if (mtch(!allowDecimal, allowSeparator, allowNegative)) {
      return NotDecimalNegativeSeparator;
    } else if (mtch(!allowDecimal, !allowSeparator, allowNegative)) {
      return NotDecimalNegativeNoSeparator;
    } else if (mtch(!allowDecimal, allowSeparator, !allowNegative)) {
      return NotDecimalNoNegativeSeparator;
    } else if (mtch(!allowDecimal, !allowSeparator, !allowNegative)) {
      return NotDecimalNoNegativeNoSeparator;
    } else if (mtch(allowDecimal, !allowSeparator, !allowNegative)) {
      return DecimalNoNegativeNoSeparator;
    } else if (mtch(allowDecimal, allowSeparator, !allowNegative)) {
      return DecimalNoNegativeSeparator;
    } else if (mtch(allowDecimal, !allowSeparator, allowNegative)) {
      return DecimalNegativeNoSeparator;
    }
  } else {
    return null;
  }
}
