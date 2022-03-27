import { useState } from 'react';

export default function StepThree(/* { formData, setFormData } */) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div>
      <div>
        <input
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </div>
      <div>
        <input
          value={firstName}
          placeholder="First Name"
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </div>
      <div>
        <input
          value={lastName}
          placeholder="Last Name"
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </div>
    </div>
  );
}
