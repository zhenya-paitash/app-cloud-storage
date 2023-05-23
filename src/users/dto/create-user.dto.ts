import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'default@email.com' })
  email: string;

  @ApiProperty({ default: 'default User' })
  fullName: string;

  @ApiProperty({ default: 'defaultpassword123' })
  password: string;
}
