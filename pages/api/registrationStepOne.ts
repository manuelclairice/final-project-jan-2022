import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  createUser,
  getUserByUsername,
  User,
} from '../../util/database';

type SignUpRequestBody = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

type SignUpNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: SignUpRequestBody;
};

export type SignUpResponseBody =
  | { errors: { message: string }[] }
  | { user: User };

export default async function signUpHandler(
  request: SignUpNextApiRequest,
  response: NextApiResponse<SignUpResponseBody>,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password ||
      typeof request.body.firstName !== 'string' ||
      !request.body.firstName ||
      typeof request.body.lastName !== 'string' ||
      !request.body.lastName
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
    if (await getUserByUsername(request.body.username)) {
      response.status(409).json({
        errors: [
          {
            message: 'Someone already has that username. Try another?',
          },
        ],
      });
      return;
    }
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    const user = await createUser(
      request.body.username,
      passwordHash,
      request.body.firstName,
      request.body.lastName,
    );

    const sessionToken = crypto.randomBytes(64).toString('base64');

    const session = await createSession(sessionToken, user.id);

    console.log(session);

    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    response.status(201).setHeader('Set-Cookie', serializedCookie).json({
      user: user,
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
