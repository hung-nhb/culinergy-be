import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsArray } from 'class-validator';

class UpdateableUserDto {
  @ApiProperty()
  isVegan: boolean

  @ApiProperty()
  allergies: number[]
}

export class UpdateUserDto extends PartialType(UpdateableUserDto) {}
