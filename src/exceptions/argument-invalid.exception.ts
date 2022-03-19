import { ExceptionBase } from '../domain/base-classes/exception.base';
import { ExceptionCodes } from './exception.codes';

/**
 * Used to indicate that an argument was passed is not acceptable.
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ExceptionCodes.argumentInvalid;
}
