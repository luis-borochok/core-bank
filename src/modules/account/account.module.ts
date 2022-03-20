import { Module } from '@nestjs/common';
import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateAccountService } from './use-cases/create-account/create-account.service';

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [CreateAccountService],
})
export class AccountModule {}
