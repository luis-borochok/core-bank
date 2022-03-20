import { Logger } from '@nestjs/common';
import { AggregateRoot } from 'src/domain/base-classes/aggregate-root.base';
import { DomainEvents } from 'src/domain/domain-events/events';
import { RepositoryPort } from 'src/domain/ports/repository.port';
import { DeepPartial, Repository } from 'typeorm';
import { OrmMapper } from './orm-mapper.base';

export abstract class TypeormRepositoryBase<
  Entity extends AggregateRoot<unknown>,
  EntityProps,
  OrmEntity,
> implements RepositoryPort<Entity, EntityProps>
{
  protected constructor(
    protected readonly repository: Repository<OrmEntity>,
    protected readonly mapper: OrmMapper<Entity, OrmEntity>,
    protected readonly logger: Logger,
  ) {}

  protected abstract relations: string[];

  protected tableName = this.repository.metadata.tableName;

  async save(entity: Entity): Promise<Entity> {
    entity.validate(); // Protecting invariant before saving
    const ormEntity = this.mapper.toOrmEntity(entity) as DeepPartial<OrmEntity>;
    const result = await this.repository.save(ormEntity);
    await DomainEvents.publishEvents(
      entity.id,
      this.logger,
      this.correlationId,
    );
    this.logger.debug(
      `[${entity.constructor.name}] persisted ${entity.id.value}`,
    );
    return this.mapper.toDomainEntity(result);
  }

  async saveMultiple(entities: Entity[]): Promise<Entity[]> {
    const ormEntities = entities.map((entity) => {
      entity.validate();
      return this.mapper.toOrmEntity(entity) as DeepPartial<OrmEntity>;
    });
    const result = await this.repository.save(ormEntities);
    await Promise.all(
      entities.map((entity) =>
        DomainEvents.publishEvents(entity.id, this.logger, this.correlationId),
      ),
    );
    this.logger.debug(
      `[${entities}]: persisted ${entities.map((entity) => entity.id)}`,
    );
    return result.map((entity) => this.mapper.toDomainEntity(entity));
  }

  async delete(entity: Entity): Promise<Entity> {
    entity.validate();
    await this.repository.remove(this.mapper.toOrmEntity(entity));
    await DomainEvents.publishEvents(
      entity.id,
      this.logger,
      this.correlationId,
    );
    this.logger.debug(
      `[${entity.constructor.name}] deleted ${entity.id.value}`,
    );
    return entity;
  }

  protected correlationId?: string;

  setCorrelationId(correlationId: string): this {
    this.correlationId = correlationId;
    return this;
  }
}
