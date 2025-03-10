import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ServeQueryInput {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumberString()
  readonly take?: string;

  @IsOptional()
  @IsNumberString()
  readonly skip?: string;
}
