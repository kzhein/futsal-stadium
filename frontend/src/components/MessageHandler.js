import { useSelector } from 'react-redux';
import useMessage from '../hooks/useMessage';

const MessageHandler = () => {
  const { success: successNewBooking, error: errorNewBooking } = useSelector(
    state => state.newBooking
  );
  const { error: errorUserBookings } = useSelector(state => state.userBookings);
  const { success: successUserAuth, error: errorUserAuth } = useSelector(
    state => state.userAuth
  );
  const {
    error: errorApproveBooking,
    success: successApproveBooking,
  } = useSelector(state => state.bookingApprove);
  const {
    error: errorDeleteBooking,
    success: successDeleteBooking,
  } = useSelector(state => state.bookingDelete);
  const { error: errorGetBookings } = useSelector(state => state.allBookings);
  const { error: errorDayDetails, success: successDayDetails } = useSelector(
    state => state.dayDetails
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
