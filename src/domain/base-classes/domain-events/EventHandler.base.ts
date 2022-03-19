import { DomainEvent } from './Event.base';
import { DomainEventClass, DomainEvents } from './Events';

export abstract class DomainEventHandler {
  constructor(private readonly event: DomainEventClass) {}

  abstract handle(event: DomainEvent): Promise<void>;

  public listen(): void {
    DomainEvents.subscribe(this.event, this);
  }
}
