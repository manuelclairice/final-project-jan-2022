import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyle = css`
  position: relative;
  display: inline-block;
  align-items: center;
  background-color: #152f4f;
  color: #fff;
  padding: 15px;
  /* margin-bottom: 10px; */
  /* margin-right: 10px; */
  width: 100%;
`;
const locationStyle = css`
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
`;
const topActivityStyle = css`
  position: relative;
  top: 8px;
  left: 16px;
  font-size: 18px;
  a {
    color: #fff;
    transition: color 0.2s;
    :hover {
      color: #4180cb;
    }
  }
`;

export default function Footer() {
  return (
    <footer>
      <div css={footerStyle}>
        <div css={topActivityStyle}>
          <h4>Top activities</h4>
          <div>
            <Link href="/activities/1">
              <a>Crafting</a>
            </Link>
          </div>
          <br />
          <div>
            <Link href="/activities/13">
              <a>Swimming</a>
            </Link>
          </div>
          <br />
          <div>
            <Link href="/activities/5">
              <a>Guitar</a>
            </Link>
          </div>
          <br />
          <div>
            <Link href="/activities/14">
              <a>Gymnastics</a>
            </Link>
          </div>
        </div>
        <div css={locationStyle}>
          <h4>Location</h4>
          <p>22, Lorem ipsum dolor, consectetur adipiscing</p>
          <p>vienna</p>
          <p>viennakidsclub@gmail.com</p>
        </div>
        <div>
          <div>
            <p>
              <small>© 2022. All Rights Reserved.</small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
