import React from 'react';
import PropTypes from 'prop-types';

import styles from './ButtonClose.module.scss';

const ButtonClose = ({ children, onClick, ...anyProp }) => (
  <button type="button" className={styles.button} onClick={onClick} {...anyProp}>
    {children}
  </button>
);
ButtonClose.defaultProps = {
  onClick: () => null,
  children: null,
};

ButtonClose.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default ButtonClose;
