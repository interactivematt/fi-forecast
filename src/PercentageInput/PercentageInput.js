import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
  prefix: '',
  suffix: '%',
  allowDecimal: false,
  decimalSymbol: '.',
  decimalLimit: 0, // how many digits allowed after the decimal
  integerLimit: 2, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const PercentageInput = ({ maskOptions, ...inputProps }) => {
  const percentageMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })

  return <MaskedInput mask={percentageMask} {...inputProps} />
}

PercentageInput.defaultProps = {
  inputMode: 'numeric',
  maskOptions: {},
}

PercentageInput.propTypes = {
  inputmode: PropTypes.string,
  maskOptions: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    includeThousandsSeparator: PropTypes.bool,
    thousandsSeparatorSymbol: PropTypes.string,
    allowDecimal: PropTypes.bool,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.string,
    requireDecimal: PropTypes.bool,
    allowNegative: PropTypes.bool,
    allowLeadingZeroes: PropTypes.bool,
    integerLimit: PropTypes.number,
  }),
}

export default PercentageInput