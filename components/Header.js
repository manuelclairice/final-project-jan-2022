import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  background-color: #5f83b6;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 8px 8px 20px;
  display: flex;

  a {
    margin-left: 10px;
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    transition: box-shadow 0.3s;
    :hover {
      color: #ab0068;
    }
  }
  > div:first-child {
    margin-right: auto;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <div>
        <Link href="/activities">
          <a>Activities</a>
        </Link>
        <Link href="/messages">
          <a>Messages()</a>
        </Link>
      </div>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </header>
  );
}
