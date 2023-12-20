import React, { Component } from 'react';
import { Placement } from './';

interface Props {
  onCancel?: Function; // 返回事件
  maskClosable?: boolean; // 阴影点击是否back
  placement?: Placement;
  title?: string;
}

const MASK_ID = 'baseMask';

export default class Base extends Component<Props> {
  static defaultProps = {
    maskClosable: true,
  };

  onMaskClick = (event: any) => {
    const { maskClosable } = this.props;
    if (event.target.id !== MASK_ID || !maskClosable) {
      // event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.onClose();
  };

  onClose = () => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  render() {
    const { children, placement, title } = this.props;
    return (
      <div
        className={`func-modal-mask fuc-modal-${placement}`}
        id={MASK_ID}
        onClick={this.onMaskClick}
      >
        <div>
          {title && (
            <div className="func-modal-header">
              <div className="func-modal-title">{title}</div>
              <div className="func-modal-close" onClick={this.onClose}>
                <svg
                  fill-rule="evenodd"
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="close"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                </svg>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }
}
