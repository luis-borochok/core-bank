import { BadRequestException } from '@nestjs/common';
import { ValueObject } from 'src/domain/base-classes/value-object.base';
import { Guard } from 'src/domain/utils/guard';

interface AccountCpfProps {
  cpf: string;
}

export class AccountCpf extends ValueObject<AccountCpfProps> {
  get value(): string {
    return this.props.cpf;
  }

  protected validate(props: AccountCpfProps): void {
    if (Guard.isEmpty(props.cpf))
      throw new BadRequestException('CPF cannot be empty');

    if (typeof props.cpf !== 'string')
      throw new BadRequestException(`CPF has to be a 'string'`);

    let cpf = props.cpf;

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
      throw new BadRequestException('CPF incorrect format');

    const cpfSplit = cpf.split('').map((el) => +el);

    const rest = (count: number) =>
      ((cpfSplit
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10;

    if (!(rest(10) === cpfSplit[9] && rest(11) === cpfSplit[10])) {
      throw new BadRequestException('CPF has a invalid value');
    }
  }
}
