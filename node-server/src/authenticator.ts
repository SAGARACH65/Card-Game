import { Request } from 'express';
import HttpStatus from 'http-status-codes';

import { en } from './lang/en-us';

/**
 * Get token from header in request object.
 *
 * @export
 * @param {Request} req
 * @returns {*}
 */
export function getTokenFromHeaders(req: Request): any {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return { token: authorization.split(' ')[1] };
  }

  // TODO: Since since the auth is not implemented fully. Just returning a random string to mimic it being the token.
  return '123';

  return {
    error: {
      details: new Error(en.EMPTY_TOKEN),
      extensions: {
        code: HttpStatus.FORBIDDEN.toString(),
      },
    },
  };
}
