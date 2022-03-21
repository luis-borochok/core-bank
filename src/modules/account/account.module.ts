import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOrmEntity } from './database/account.orm-entity';
import { AccountRepository } from './database/account.repository';
import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateAccountService } from './use-cases/create-account/create-account.service';
import { GetAccountService } from './use-cases/get-account/get-account.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity])],
  controllers: [CreateAccountController],
  providers: [CreateAccountService, GetAccountService, AccountRepository],
})
export class AccountModule {}
