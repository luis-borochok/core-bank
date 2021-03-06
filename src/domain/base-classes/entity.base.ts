import { ArgumentInvalidException } from 'src/exceptions/argument-invalid.exception';
import { ArgumentNotProvidedException } from 'src/exceptions/argument-not-provided.exception';
import { Guard } from '../utils/guard';
import { DateVO } from '../value-objects/date.vo';
import { ID } from '../value-objects/identifier.vo';

export interface BaseEntityProps {
  id: ID;
  createdAt: DateVO;
}

export interface CreateEntityProps<T> {
  id: ID;
  props: T;
  createdAt?: DateVO;
}

export abstract class Entity<EntityProps> {
  constructor({ id, createdAt, props }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    this.validateProps(props);
    const now = DateVO.now();
    this._createdAt = createdAt || now;
    this.props = props;
    this.validate();
  }

  protected readonly props: EntityProps;

  // ID is set in the entity to support different ID types
  protected abstract _id: ID;

  private readonly _createdAt: DateVO;

  get id(): ID {
    return this._id;
  }

  private setId(id: ID): void {
    this._id = id;
  }

  get createdAt(): DateVO {
    return this._createdAt;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  /**
   *  Check if two entities are the same Entity. Checks using ID field.
   * @param object Entity
   */
  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id.equals(object.id) : false;
  }

  /**
   * Returns current **copy** of entity's props.
   * Modifying entity's state won't change previously created
   * copy returned by this method since it doesn't return a reference.
   * If a reference to a specific property is needed create a getter in parent class.
   *
   * @return {*}  {Props & EntityProps}
   * @memberof Entity
   */
  public getPropsCopy(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  /**
   * Validate invariant
   */
  public abstract validate(): void;

  private validateProps(props: EntityProps): void {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Entity props should not be empty',
      );
    }
    if (typeof props !== 'object') {
      throw new ArgumentInvalidException('Entity props should be an object');
    }
  }
}
