import React, { useEffect } from 'react';
import Modal from '../';
import CustomModal from './customModal';
import { configModal } from './config';

export default () => {
  const onClick = () => {
    Modal.show({
      name: 'top',
      onCancel: () => {
        console.log('on cancel');
      },
      onOk: () => {
        console.log('on ok');
      },
    });
  };

  const onClick2 = () => {
    Modal.show({
      component: CustomModal,
      onCancel: () => {
        console.log('on cancel');
      },
      onOk: () => {
        console.log('on ok');
      },
    });
  };

  useEffect(() => {
    configModal();
  }, []);

  return (
    <div>
      <button onClick={onClick}>
        test config modal
      </button>
      <button onClick={onClick2}>
        test import modal
      </button>
    </div>
  );
};
