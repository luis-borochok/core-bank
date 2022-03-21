import { Body, Controller, Inject, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreditAccountService } from '../credit-account/credit-account.service';
import { DebitAccountService } from '../debit-account/debit-account.service';
import { MovementAccountRequestDTO } from './request.dto';

@Controller('accounts')
export class MovementAccountController {
  constructor(
    @Inject(DebitAccountService)
    private readonly debitAccountService: DebitAccountService,
    @Inject(CreditAccountService)
    private readonly creditAccountService: CreditAccountService,
  ) {}

  @Put('/movement')
  @ApiOperation({ summary: 'Movement accounts' })
  async debit(@Body() body: MovementAccountRequestDTO): Promise<void> {
    const { creditAccountId, debitAccountId, value } = body;
    await this.debitAccountService.debitAccount({
      accountIdToDebit: debitAccountId,
      value,
    });

    await this.creditAccountService.creditAccount({
      accountIdToCredit: creditAccountId,
      value,
    });

    return null;
  }
}
