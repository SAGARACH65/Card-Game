import User from '../domains/responses/User';
import { getUserData } from '../models/User';
import { ADMIN_USER_ID } from '../constants/common';

/**
 * Query for fetching the user data.
 *
 * @export
 * @param {*} parent
 * @param {id?: number} params
 * @returns {Promise<User>}
 */
export function getUser(parent: any, params: { id?: number }): Promise<User> {
  const userId = params.id;

  // FIXME: Since we dont have a mechanism to signup and add users. If any id is not provided we consider them as admin.
  const userIdToFetch = userId || ADMIN_USER_ID;

  return getUserData(userIdToFetch);
}
