import React, { FunctionComponent, ComponentClass } from 'react';
import ReactDOM from 'react-dom';
import Base from './base';

/**
 * @example
 * import Modal from 'react-func-modal';
 * import YourWidget from 'your-component-path';
 *
 * Modal.show({
 *    name: 'allotment',    // plan A need register
 *    component: YourWidget // plan B
 *    onOk: () => {},
 *    params: {
 *    }
 * })
 */

export declare type Placement = 'top' | 'center' | 'bottom';

export interface IModalParent {
  parentId?: string;
  placement?: Placement;
  contentWrap?: FunctionComponent<any> | ComponentClass<any> | string;
}

export interface IFunctionModals extends IModalParent {
  title?: string;
  name?: string;
  component?: FunctionComponent<any> | ComponentClass<any> | string;
  toast?: boolean;
  canScroll?: boolean;
  maskClosable?: boolean;
}

export type ICustomModalProps<T = any> = {
  onOk?: Function;
  onCancel?: Function;
  onDestroy?: Function;
} & T

export interface IFunctionModalProps extends IFunctionModals {
  getPopupContainer?: Function;
  params?: any;
  onOk?: Function;
  onCancel?: Function;
}

enum DESTROY_TYPE {
  Ok = 0,
  Cancel,
  Destroy
}

const modalParentNodeId = 'modalParentNodeId';
const modalToastNodeId = 'modalToastNodeId';
let userModals: IFunctionModals[] = [];
let globalSettings: IModalParent = { placement: 'center' };

function getConfigByName(config: IFunctionModalProps) {
  let findModal = null;
  if (config.name) {
    findModal = userModals.find((item) => {
      return item.name === config.name;
    });
  }
  // 优先级 config > findModal > global
  const finalConfig = Object.assign(
    { ...globalSettings, ...findModal },
    config,
  );
  if (!finalConfig.parentId) {
    finalConfig.parentId = config.toast ? modalToastNodeId : modalParentNodeId;
  }
  return finalConfig;
}

export default {
  config(settings: IModalParent, modals: IFunctionModals[]) {
    if (settings) {
      globalSettings = Object.assign(globalSettings, settings);
    }
    userModals = modals;
  },

  show(config: IFunctionModalProps) {
    config = getConfigByName(config);
    let div = document.getElementById(config.parentId || modalParentNodeId);

    if (!div) {
      div = document.createElement('div');

      div.id = config.parentId || modalParentNodeId;
      if (config.getPopupContainer) {
        config.getPopupContainer().appendChild(div);
      } else {
        document.body.appendChild(div);
      }
    }

    if (!config.canScroll) {
      document.body.classList.add('func-body-modal');
    }

    ReactDOM.render(this.renderModal(config), div);
  },

  toast(text: string, duration?: number) {
    console.log('[react-func-modal] warn unfinished Function !')
    // MK-TODO: toast 方案
    // this.show({
    //     name: 'toast',
    //     parentId: modalToastNodeId,
    //     params: {
    //         text,
    //         duration,
    //     },
    //     canScroll: true,
    // });
  },

  destroy(config: IFunctionModalProps, destroyType?: DESTROY_TYPE) {
    const div = document.getElementById(config?.parentId || modalParentNodeId);

    if (!div) {
      return false;
    }

    const unmountResult = ReactDOM.unmountComponentAtNode(div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    if (!config?.canScroll) {
      document.body.classList.remove('func-body-modal');
    }

    if (destroyType === DESTROY_TYPE.Cancel) {
      config?.onCancel?.();
    }
  },

  renderModal(config: IFunctionModalProps) {
    const _this = this;
    let modalElement = <div />;
    let wrapElement = null;

    // 当前作用域内的config会被下一个弹窗修改, 再次做一次stage
    function stageCancel(prevConfig: IFunctionModalProps, destroyType: DESTROY_TYPE) {
      var stageConfig = Object.assign({}, prevConfig);
      return () => {
        return _this.destroy(stageConfig, destroyType);
      };
    }

    if (config.component) {
      const stageOk = stageCancel(config, DESTROY_TYPE.Ok)
      modalElement = React.createElement(config.component, {
        onCancel: stageCancel(config, DESTROY_TYPE.Cancel),
        onOk: (...args: any[]) => {
          stageOk()
          return config.onOk?.(...args)
        },
        onDestroy: stageCancel(config, DESTROY_TYPE.Destroy),
        ...config.params,
      });
    }

    if (config.contentWrap) {
      wrapElement = React.createElement(
        config.contentWrap,
        {
          onCancel: stageCancel(config, DESTROY_TYPE.Cancel),
          maskClosable: config.maskClosable,
          placement: config.placement,
        },
        modalElement,
      );
    }

    if (config.toast) {
      return <React.Fragment>{modalElement}</React.Fragment>;
    } else if (wrapElement) {
      return <React.Fragment>{wrapElement}</React.Fragment>;
    } else {
      return (
        <Base
          onCancel={stageCancel(config, DESTROY_TYPE.Cancel)}
          maskClosable={config.maskClosable}
          placement={config.placement}
          title={config.title}
        >
          {modalElement}
        </Base>
      );
    }
  },
};
