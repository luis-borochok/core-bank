import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateAccountService } from './use-cases/create-account/create-account.service';
import { AccountOrmEntity } from './use-cases/database/account.orm-entity';
import { AccountRepository } from './use-cases/database/account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity])],
  controllers: [CreateAccountController],
  providers: [CreateAccountService, AccountRepository],
})
export class AccountModule {}
