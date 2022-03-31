import { css, Interpolation, Theme } from '@emotion/react';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { User } from '../util/database';

const headerStyles = css`
  position: relative;
  /* background-color: #5f83b6; */
  background: #8360c3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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

const userNameStyle = css`
  font-style: italic;
  color: #fff;
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
    <div css={headerStyles}>
      <header>
        <div>
          <Link href="/">
            <a>Vienna KidsClub</a>
          </Link>
          <Link href="/activities">
            <a>Activities</a>
          </Link>
          <Link href="users/protected-user">
            <a>My profile</a>
          </Link>
        </div>
        {props.userObject && (
          <div css={userNameStyle}>Hey {props.userObject.firstName}!</div>
        )}
        {props.userObject ? (
          <Anchor href="/logout">Logout</Anchor>
        ) : (
          <>
            <Link href="/signIn">
              <a>Sign in</a>
            </Link>
            <Link href="/club-registration-steps">
              <a>Are you a club?</a>
            </Link>
            <Link href="/logout">
              <a>Logout</a>
            </Link>
          </>
        )}
      </header>
    </div>
  );
}
