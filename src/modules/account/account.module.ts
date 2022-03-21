import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOrmEntity } from './database/account.orm-entity';
import { AccountRepository } from './database/account.repository';
import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateAccountService } from './use-cases/create-account/create-account.service';
import { CreditAccountController } from './use-cases/credit-account/credit-account.controller';
import { CreditAccountService } from './use-cases/credit-account/credit-account.service';
import { GetAccountService } from './use-cases/get-account/get-account.service';
import { GetAccountBalanceController } from './use-cases/get-balance-account/get-balance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity])],
  controllers: [
    CreateAccountController,
    GetAccountBalanceController,
    CreditAccountController,
  ],
  providers: [
    CreateAccountService,
    GetAccountService,
    CreditAccountService,
    AccountRepository,
  ],
})
export class AccountModule {}
