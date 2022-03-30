import { NextApiRequest, NextApiResponse } from 'next';
import {
  Activity,
  ActivityType,
  deleteActivityTypeById,
  getActivityTypeById,
  updateActivityTypeById,
} from '../../util/database';

type ActivityTypeRequestBody = {
  activityType: ActivityType;
  activityTypeId: number;
};

type ActivityTypeNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: ActivityTypeRequestBody;
};

export type ActivityTypeResponseBody =
  | { error: string }
  | { activityType: ActivityType };

export default async function handler(
  request: ActivityTypeNextApiRequest,
  response: NextApiResponse<ActivityTypeResponseBody>,
) {
  const activityTypeId = Number(request.body.activityTypeId);
  console.log(activityTypeId);

  if (!activityTypeId) {
    response.status(400).json({ error: 'activityTypeId must be a number' });
    return;
  }

  if (request.method === 'GET') {
    const activityType = await getActivityTypeById(activityTypeId);

    if (!activityType) {
      response.status(404).json({ error: 'activityType not found' });
      return;
    }
    response.status(200).json({ activityType: activityType });
    return;
  } else if (request.method === 'PUT') {
    const activityTypeFromRequest = request.body.activityType;

    const updatedActivityType = await updateActivityTypeById(
      activityTypeId,
      activityTypeFromRequest.name,
    );

    if (!updatedActivityType) {
      response.status(404).json({ error: 'activityType not found' });
      return;
    }
    response.status(200).json({ activityType: updatedActivityType });
    return;
  } else if (request.method === 'DELETE') {
    const deletedActivityType = await deleteActivityTypeById(activityTypeId);

    if (!deletedActivityType) {
      response.status(404).json({ error: 'activityType not found' });
      return;
    }
    response.status(200).json({ activityType: deletedActivityType });
    return;
  }
  response.status(405).json({ error: 'method not allowed' });
}
