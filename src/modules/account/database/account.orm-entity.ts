import { TypeormEntityBase } from 'src/infrastructure/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('accounts')
export class AccountOrmEntity extends TypeormEntityBase {
  constructor(props?: AccountOrmEntity) {
    super(props);
  }

  @Column({ unique: true })
  cpf: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  balance: number;
}
