import { css, Interpolation, Theme } from '@emotion/react';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { User } from '../util/database';

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

type Props = {
  userObject?: User;
};

function Anchor({
  children,
  ...restProps
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  css?: Interpolation<Theme>;
}) {
  return <a {...restProps}>{children}</a>;
}

export default function Header(props: Props) {
  return (
    <header css={headerStyles}>
      <div>
        <Link href="/">
          <a>LOGO</a>
        </Link>
        <Link href="/activities">
          <a>Activities</a>
        </Link>
        <Link href="users/protected-user">
          <a>My profile</a>
        </Link>
      </div>
      {props.userObject && <div>Hey {props.userObject.username}!</div>}
      {props.userObject ? (
        <Anchor href="/logout">Logout</Anchor>
      ) : (
        <>
          <Link href="/signIn">
            <a>Sign in</a>
          </Link>
          <Link href="/signUp">
            <a>Sign up</a>
          </Link>
          <Link href="/logout">
            <a>Logout</a>
          </Link>
        </>
      )}
    </header>
  );
}
