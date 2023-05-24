import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../decorators/userid.decorator';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  /**
   * This is a constructor function that takes in an instance of the UsersService
   * class as a parameter and assigns it to a private readonly property.
   * @param {UsersService} usersService - The `usersService` parameter is a
   * dependency injection of the `UsersService` class. It allows the current class
   * to access the methods and properties of the `UsersService` class. The
   * `readonly` keyword ensures that the `usersService` property cannot be
   * reassigned to a new value once it
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * This function retrieves a user by their ID using a decorator in TypeScript.
   * @param {number} id - The "id" parameter is a number that represents the user
   * ID. It is decorated with the "@UserId()" decorator, which indicates that it is
   * a parameter that will be extracted from the request URL. This method is likely
   * part of an API endpoint that retrieves a user's information based on their ID.
   * @returns The `getMe` function is returning the result of calling the
   * `findById` method of the `usersService` with the `id` parameter passed to the
   * function. The specific data being returned depends on the implementation of
   * the `findById` method, but it is likely returning information about a user
   * with the specified `id`.
   */
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@UserId() id: number) {
    return this.usersService.findById(id);
  }
}
