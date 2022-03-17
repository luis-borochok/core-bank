import { ExceptionBase } from './Exception.base';
import { ExceptionCodes } from './Exception.codes';

/**
 * Used to indicate that an argument was passed is not acceptable.
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ExceptionCodes.argumentInvalid;
}
