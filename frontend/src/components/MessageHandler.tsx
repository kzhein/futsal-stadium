import { useSelector } from 'react-redux';
import useMessage from '../hooks/useMessage';
import { RootStore } from '../store';

const MessageHandler: React.FC = () => {
  const { success: successNewBooking, error: errorNewBooking } = useSelector(
    (state: RootStore) => state.newBooking
  );
  const { error: errorUserBookings } = useSelector(
    (state: RootStore) => state.userBookings
  );
  const { success: successUserAuth, error: errorUserAuth } = useSelector(
    (state: RootStore) => state.userAuth
  );
  const {
    error: errorApproveBooking,
    success: successApproveBooking,
  } = useSelector((state: RootStore) => state.bookingApprove);
  const {
    error: errorDeleteBooking,
    success: successDeleteBooking,
  } = useSelector((state: RootStore) => state.bookingDelete);
  const { error: errorGetBookings } = useSelector(
    (state: RootStore) => state.allBookings
  );
  const { error: errorDayDetails, success: successDayDetails } = useSelector(
    (state: RootStore) => state.dayDetails
  );

  // for displaying success and error messages
  useMessage(successNewBooking, errorNewBooking);
  useMessage(null, errorUserBookings);
  useMessage(successUserAuth, errorUserAuth);
  useMessage(successApproveBooking, errorApproveBooking);
  useMessage(successDeleteBooking, errorDeleteBooking);
  useMessage(null, errorGetBookings);
  useMessage(successDayDetails, errorDayDetails);

  return null;
};

export default MessageHandler;
