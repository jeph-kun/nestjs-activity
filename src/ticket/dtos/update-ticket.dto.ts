import { IsString, IsOptional } from 'class-validator';

export class UpdateTicketDto {

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
