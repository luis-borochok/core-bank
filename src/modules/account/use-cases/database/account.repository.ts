import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormRepositoryBase } from 'src/infrastructure/base-classes/typeorm.repository.base';
import { Repository } from 'typeorm';
import { Account, AccountProps } from '../../domain/account.entity';
import { AccountOrmEntity } from './account.orm-entity';
import { AccountOrmMapper } from './account.orm-mapper';
import { AccountRepositoryPort } from './account.repository-port';

@Injectable()
export class AccountRepository
  extends TypeormRepositoryBase<Account, AccountProps, AccountOrmEntity>
  implements AccountRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly accountRepo: Repository<AccountOrmEntity>,
  ) {
    super(
      accountRepo,
      new AccountOrmMapper(Account, AccountOrmEntity),
      new Logger('AccountRepository'),
    );
  }

  private async findOneByCpf(
    cpf: string,
  ): Promise<AccountOrmEntity | undefined> {
    const account = await this.accountRepo.findOne({
      where: { cpf },
    });

    return account;
  }

  async findOneByCpfOrThrow(cpf: string): Promise<Account> {
    const account = await this.findOneByCpf(cpf);
    if (!account) {
      throw new NotFoundException(`Account with CPF '${cpf}' not found`);
    }
    return this.mapper.toDomainEntity(account);
  }

  async exists(cpf: string): Promise<boolean> {
    const found = await this.findOneByCpf(cpf);
    if (found) {
      return true;
    }
    return false;
  }
}
