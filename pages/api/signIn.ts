import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  getUserWithPasswordHashByUsername,
  User,
} from '../../util/database';

type SignInRequestBody = {
  username: string;
  password: string;
};

type SignInNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: SignInRequestBody;
};

export type SignInResponseBody =
  | { errors: { message: string }[] }
  | { user: Pick<User, 'id'> };

export default async function signInHandler(
  request: SignInNextApiRequest,
  response: NextApiResponse<SignInResponseBody>,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password
    ) {
      response.status(400).json({
        errors: [
          {
            message: 'Username or Password cannot be empty',
          },
        ],
      });
      return;
    }

    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      request.body.username,
    );

    if (!userWithPasswordHash) {
      response.status(401).json({
        errors: [
          {
            message: 'Username or password does not match',
          },
        ],
      });
      return;
    }

    const passwordMatches = await bcrypt.compare(
      request.body.password,
      userWithPasswordHash.passwordHash,
    );

    if (!passwordMatches) {
      response.status(401).json({
        errors: [
          {
            message: 'Username or password does not match',
          },
        ],
      });
      return;
    }

    const sessionToken = crypto.randomBytes(64).toString('base64');

    const session = await createSession(sessionToken, userWithPasswordHash.id);

    console.log(session);

    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    response
      .status(201)
      .setHeader('Set-Cookie', serializedCookie)
      .json({
        user: {
          id: userWithPasswordHash.id,
        },
      });
    return;
  }

  response.status(405).json({
    errors: [
      {
        message: 'Method not supported',
      },
    ],
  });
}
