import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  Club,
  createClub,
  createSession,
  getClubByUsername,
} from '../../util/database';

type RegisterClubRequestBody = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  addressId: number;
  companyName: string;
  email: string;
  hourlyRate: string;
};

type RegisterClubNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: RegisterClubRequestBody;
};

export type RegisterClubResponseBody =
  | { errors: { message: string }[] }
  | { club: Club };

export default async function clubRegistrationHandler(
  request: RegisterClubNextApiRequest,
  response: NextApiResponse<RegisterClubResponseBody>,
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
    if (await getClubByUsername(request.body.username)) {
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

    const club = await createClub(
      request.body.username,
      passwordHash,
      request.body.firstName,
      request.body.lastName,
      request.body.addressId,
      request.body.companyName,
      request.body.email,
      request.body.hourlyRate,
    );

    const sessionToken = crypto.randomBytes(64).toString('base64');

    const session = await createSession(sessionToken, club.id);

    console.log(session);

    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    response.status(201).setHeader('Set-Cookie', serializedCookie).json({
      club: club,
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
