import { RepositoryPort } from 'src/domain/ports/repository.port';
import { Account, AccountProps } from '../../domain/account.entity';

export interface AccountRepositoryPort
  extends RepositoryPort<Account, AccountProps> {
  exists(cpf: string): Promise<boolean>;
  findOneByCpfOrThrow(cpf: string): Promise<Account>;
}
