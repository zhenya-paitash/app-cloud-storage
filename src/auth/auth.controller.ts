import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserEntity } from '../users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  /**
   * This is a constructor function that takes an instance of the AuthService class
   * as a parameter and assigns it to a private readonly property.
   *
   * @param authService The `authService` parameter is a dependency injection of
   * the `AuthService` class. It is marked as `readonly`, which means that it
   * cannot be reassigned once it is initialized in the constructor. This parameter
   * is used to access the authentication service methods and properties within the
   * class.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * This function logs in a user using the user entity obtained from the request
   * object.
   *
   * @param req The `req` parameter is an object that represents the incoming HTTP
   * request. It contains information about the request such as the request headers,
   * request body, request method, and request URL. In this case, it is being used to
   * extract the `user` property from the request object and pass it to
   * @return The `login()` method of the `authService` is being called with the
   * `UserEntity` object extracted from the `req` object's `user` property, and the
   * result of that method call is being returned.
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: CreateUserDto,
  })
  async login(@Request() req) {
    return this.authService.login(req.user as UserEntity);
  }

  /**
   * This function registers a new user using the provided CreateUserDto object and
   * returns the result from the authService.
   *
   * @param dto The parameter "dto" is of type "CreateUserDto" and is being passed as
   * the request body in an asynchronous function called "register". It is likely
   * that this function is part of an API endpoint that handles user registration.
   * The "CreateUserDto" is a data transfer object that contains the
   * @return The `register` method of the `authService` is being called with the
   * `dto` object as a parameter, and the result of that method call is being
   * returned. The specific return value depends on the implementation of the
   * `register` method.
   */
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
