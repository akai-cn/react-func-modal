import CustomModal from './customModal';
import ContentWrap from './contentWrap';
import Modal from '../';

export const configModal = () => {
  Modal.config(
    {
      placement: 'top',
      contentWrap: ContentWrap,
    },
    [
      {
        name: 'test',
        component: CustomModal,
      },
    ],
  );
};
