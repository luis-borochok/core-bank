import { Body, Controller, Inject, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { DebitAccountService } from './debit-account.service';
import { DebitAccountRequestDTO } from './request.dto';
import {
  BadRequestExceptionDTO,
  DebitAccountResponseDTO,
  UnprocessableEntityExceptionDTO,
} from './response.dto';

@Controller('accounts')
export class DebitAccountController {
  constructor(
    @Inject(DebitAccountService)
    private readonly debitAccountService: DebitAccountService,
  ) {}

  @Put('/debit')
  @ApiOperation({ summary: 'Debit a account' })
  @ApiOkResponse({
    type: DebitAccountResponseDTO,
  })
  @ApiBadRequestResponse({
    type: BadRequestExceptionDTO,
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDTO,
  })
  async debit(
    @Body() body: DebitAccountRequestDTO,
  ): Promise<DebitAccountResponseDTO> {
    const { id, value } = body;
    const accountEntity = await this.debitAccountService.debitAccount({
      accountIdToDebit: id,
      value,
    });
    return new DebitAccountResponseDTO(accountEntity);
  }
}
