import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetAccountService } from '../get-account/get-account.service';
import { GetAccountBalanceRequestDTO } from './request.dto';
import { GetAccountBalanceResponseDTO } from './response.dto';

@Controller('accounts')
export class GetAccountBalanceController {
  constructor(private readonly getAccountService: GetAccountService) {}
  @Get('balance/:id')
  @ApiOperation({ summary: 'Get balance from a account' })
  @ApiParam({ name: 'id', type: GetAccountBalanceRequestDTO })
  @ApiResponse({
    type: GetAccountBalanceResponseDTO,
  })
  async getBalance(
    @Query() { id }: GetAccountBalanceRequestDTO,
  ): Promise<GetAccountBalanceResponseDTO> {
    const accountEntity = await this.getAccountService.getAccount({
      accountId: id,
    });
    return new GetAccountBalanceResponseDTO(accountEntity);
  }
}
