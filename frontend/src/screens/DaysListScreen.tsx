import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Spinner, Table } from 'react-bootstrap';
import { getAllDays } from '../actions/dayActions';
import { RootStore } from '../store';

const DaysListScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { days, loading } = useSelector((state: RootStore) => state.dayDetails);

  useEffect(() => {
    dispatch(getAllDays());
  }, [dispatch]);

  return (
    <Container className='py-3'>
      <h3 className='text-center mb-3'>Manage days</h3>
      {loading ? (
        <Spinner
          animation='border'
          variant='primary'
          style={{ width: '50px', height: '50px' }}
          className='d-block mx-auto my-5'
        />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Day</th>
              <th>Sections</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {days.map((day, index) => (
              <tr key={day._id}>
                <td>{index + 1}</td>
                <td>{day.day}</td>
                <td>{day.openHours.length} Sections</td>
                <td>
                  <Link
                    to={`/admin/days/${day._id}/edit`}
                    className='btn btn-warning btn-sm'
                  >
                    <i className='fas fa-edit'></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default DaysListScreen;
