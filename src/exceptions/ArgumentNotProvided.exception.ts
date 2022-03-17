import { ExceptionBase } from './Exception.base';
import { ExceptionCodes } from './Exception.codes';

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {ExceptionBase}
 */
export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ExceptionCodes.argumentNotProvided;
}
