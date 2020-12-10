import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../actions/messageActions';

const useMessage = (success: string | null, error: string | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setMessage({ text: success, type: 'success' }));
    }
    if (error) {
      dispatch(setMessage({ text: error, type: 'danger' }));
    }
  }, [success, error, dispatch]);
};

export default useMessage;
