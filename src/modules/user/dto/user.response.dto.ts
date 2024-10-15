import { IsPositive } from 'class-validator';

export class CreateUserResponseDto {
  @IsPositive()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
