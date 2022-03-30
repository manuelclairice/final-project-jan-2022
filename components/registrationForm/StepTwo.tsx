import { Form } from 'react-bootstrap';
import { useState } from 'react';

const StepTwo = ({ handleChange }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postCode: '',
  });
  const updateAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
    return handleChange(updateAddress);
  };
  return (
    <div>
      <h2>Step 2</h2>
      <Form.Group>
        <Form.Control
          placeholder="Company Name"
          onChange={handleChange('companyName')}
          name="companyName"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          placeholder="Street"
          onChange={updateAddress}
          name="street"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control placeholder="City" onChange={updateAddress} name="city" />
      </Form.Group>
      <Form.Group>
        <Form.Control
          placeholder="Post Code"
          onChange={updateAddress}
          name="postCode"
        />
      </Form.Group>
    </div>
  );
};

export default StepTwo;
