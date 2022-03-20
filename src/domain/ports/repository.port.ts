import { BaseEntityProps } from '../base-classes/entity.base';

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type QueryParams<EntityProps> = DeepPartial<
  BaseEntityProps & EntityProps
>;

export interface Save<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export interface SaveMultiple<Entity> {
  saveMultiple(entities: Entity[]): Promise<Entity[]>;
}

export interface DeleteOne<Entity> {
  delete(entity: Entity): Promise<Entity>;
}

export interface RepositoryPort<Entity, EntityProps>
  extends Save<Entity>,
    DeleteOne<Entity>,
    SaveMultiple<Entity> {
  setCorrelationId(correlationId: string): this;
}
