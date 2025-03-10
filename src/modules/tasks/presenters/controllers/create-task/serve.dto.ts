import { IsOptional, IsString } from 'class-validator';

export class ServeBodyInput {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
