import { IsNumberString } from 'class-validator';

export class ServeParamsInput {
  @IsNumberString()
  readonly id: string;
}
