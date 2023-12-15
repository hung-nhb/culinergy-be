import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsArray } from 'class-validator';

class UpdateableUserDto {
  @ApiProperty()
  isVegan: boolean

  @ApiProperty()
  allergies: string[]
}

export class UpdateUserDto extends PartialType(UpdateableUserDto) {}
