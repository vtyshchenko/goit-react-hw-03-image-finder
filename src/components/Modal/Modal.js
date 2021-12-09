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
    switch (event.code) {
      case 'Esc':
      case 'Escape':
        this.props.onClose();
        break;
      case 'Left':
      case 'ArrowLeft':
        this.props.onLeft();
        break;
      case 'Right':
      case 'ArrowRight':
        this.props.onRight();
        break;
      default:
        break;
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
