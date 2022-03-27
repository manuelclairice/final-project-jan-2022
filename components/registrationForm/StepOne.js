// export type Errors = { message: string }[];

// export type Props = {
//   refreshUserProfile: () => void;
//   // userObject: { firstName: string };
// };

export default function StepOne({ formData, setFormData }) {
  return (
    <div>
      <div>
        <input
          value={formData.username}
          placeholder="Username"
          onChange={(event) =>
            setFormData({ ...formData, username: event.currentTarget.value })
          }
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.currentTarget.value })
          }
        />
      </div>
      <div>
        <input
          value={formData.firstName}
          placeholder="First Name"
          onChange={(event) =>
            setFormData({ ...formData, firstName: event.currentTarget.value })
          }
        />
      </div>
      <div>
        <input
          value={formData.lastName}
          placeholder="Last Name"
          onChange={(event) =>
            setFormData({ ...formData, lastName: event.currentTarget.value })
          }
        />
      </div>
    </div>
  );
}
