import React, { Component } from 'react';
import styles from './Modal.module.scss';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose({});
    }
  };

  hendleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose({});
    }
  };

  render() {
    return (
      <div className={styles.Overlay} onClick={this.hendleOverlayClick}>
        <div className={styles.Modal}>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
