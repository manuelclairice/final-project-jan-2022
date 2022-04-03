import { useState } from 'react';
import { css } from '@emotion/react';

const formStyle = css`
  display: flex;
  border-radius: 20px;
  padding: 5px;
  width: 450px;
  height: auto;
  justify-content: center;
  margin: 6% auto;
  align-items: center;

  input {
    display: table-cell;
    margin-bottom: 10px;
    width: 300px;
    padding: 10px 0;
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid #999;
    outline: none;
    background: transparent;
  }
  button {
    padding: 5px 15px;
    width: 35%;
    background-color: #ab0068;
    color: #fff;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    border: 0;
    outline: none;
  }
`;

export default function ContactForm() {
  const [mailerState, setMailerState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const submitEmail = async (e) => {
    e.preventDefault();
    console.log({ mailerState });
    const response = await fetch('http://localhost:3001/send', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ mailerState }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === 'success') {
          alert('Email sent successfully');
        } else if (resData.status === 'fail') {
          alert('Email failed to send');
        }
      })
      .then(() => {
        setMailerState({
          email: '',
          name: '',
          message: '',
        });
      });
  };

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="App">
      <form css={formStyle} onSubmit={submitEmail}>
        <div>
          <h3>Get in touch with us!</h3>
          <div>
            <input
              placeholder="Name"
              onChange={handleStateChange}
              name="name"
              value={mailerState.name}
            />
          </div>
          <div>
            <input
              placeholder="Email"
              onChange={handleStateChange}
              name="email"
              value={mailerState.email}
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              onChange={handleStateChange}
              name="message"
              value={mailerState.message}
            />
          </div>
          <button>Send Message</button>
        </div>
      </form>
    </div>
  );
}
