import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../util/database';

export default async function signUpHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    const user = createUser(request.body.username, passwordHash);

    response.status(201).json({ user: user });
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
