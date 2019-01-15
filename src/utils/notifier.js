import { toast } from 'react-toastify';

export const notify = message => {
  if (toast.isActive(message)) {
    return;
  }
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    toastId: message,
  });
};
