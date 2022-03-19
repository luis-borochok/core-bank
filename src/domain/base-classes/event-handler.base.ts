import { DomainEventClass, DomainEvents } from '../domain-events/events';
import { DomainEvent } from './event.base';

export abstract class DomainEventHandler {
  constructor(private readonly event: DomainEventClass) {}

  abstract handle(event: DomainEvent): Promise<void>;

  public listen(): void {
    DomainEvents.subscribe(this.event, this);
  }
}
