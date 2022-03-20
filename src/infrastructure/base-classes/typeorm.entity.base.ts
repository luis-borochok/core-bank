import { CreateDateColumn, PrimaryColumn } from 'typeorm';

export abstract class TypeormEntityBase {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryColumn({ update: false, type: 'uuid' })
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    update: false,
  })
  createdAt: Date;
}
