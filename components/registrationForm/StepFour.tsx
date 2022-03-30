import { useState } from 'react';

export default function StepFour(handleChange) {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postCode: '',
  });
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const updateAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div>
        <input
          placeholder="Company Name"
          value={companyName}
          onChange={(event) => setCompanyName(event.currentTarget.value)}
        />
      </div>
      <div>
        <input
          placeholder="Street"
          value={address.street}
          name="street"
          onChange={updateAddress}
        />
      </div>
      <div>
        <input
          placeholder="City"
          value={address.city}
          name="city"
          onChange={updateAddress}
        />
      </div>
      <div>
        <input
          placeholder="Post Code"
          value={address.postCode}
          name="postCode"
          onChange={updateAddress}
        />
      </div>

      <br />
      <br />
      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </div>
    </div>
  );
}
