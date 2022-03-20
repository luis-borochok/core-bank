/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AggregateRoot } from 'src/domain/base-classes/aggregate-root.base';
import { CreateEntityProps } from 'src/domain/base-classes/entity.base';
import { DateVO } from 'src/domain/value-objects/date.vo';
import { ID } from 'src/domain/value-objects/identifier.vo';
import { TypeormEntityBase } from './typeorm.entity.base';

export type OrmEntityProps<OrmEntity> = Omit<OrmEntity, 'id' | 'createdAt'>;

export interface EntityProps<EntityProps> {
  id: ID;
  props: EntityProps;
}

export abstract class OrmMapper<
  Entity extends AggregateRoot<unknown>,
  OrmEntity,
> {
  constructor(
    private entityConstructor: new (props: CreateEntityProps<any>) => Entity,
    private ormEntityConstructor: new (props: any) => OrmEntity,
  ) {}

  protected abstract toDomainProps(ormEntity: OrmEntity): EntityProps<unknown>;

  protected abstract toOrmProps(entity: Entity): OrmEntityProps<OrmEntity>;

  toDomainEntity(ormEntity: OrmEntity): Entity {
    const { id, props } = this.toDomainProps(ormEntity);
    const ormEntityBase: TypeormEntityBase =
      ormEntity as unknown as TypeormEntityBase;
    return new this.entityConstructor({
      id,
      props,
      createdAt: new DateVO(ormEntityBase.createdAt),
    });
  }

  toOrmEntity(entity: Entity): OrmEntity {
    const props = this.toOrmProps(entity);
    return new this.ormEntityConstructor({
      ...props,
      id: entity.id.value,
      createdAt: entity.createdAt.value,
    });
  }
}
