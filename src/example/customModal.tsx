import React, { Component } from 'react';
import './customModal.css';

class CustomModal extends Component<any> {
  onOk = () => {
    this.props.onOk && this.props.onOk();
    this.props.onCancel && this.props.onCancel();
  };

  render() {
    return (
      <div className="custom-content">
        <p onClick={this.onOk}>hello world</p>
      </div>
    );
  }
}

export default CustomModal;
