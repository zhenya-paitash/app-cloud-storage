import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  /**
   * This is a constructor function that takes in two parameters, a UsersService and
   * a JwtService.
   *
   * @param usersService The `usersService` parameter is an instance of the
   * `UsersService` class, which is likely a service responsible for handling
   * user-related functionality such as authentication, registration, and user data
   * management.
   * @param jwtService JwtService is a service provided by the `@nestjs/jwt` package
   * that allows for the creation and verification of JSON Web Tokens (JWTs). It
   * provides methods for signing and verifying tokens, as well as setting options
   * for token expiration and secret keys. In this constructor, the `jwtService`
   */
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * This function validates a user's email and password and returns the user's
   * information if they are valid.
   *
   * @param email A string representing the email address of the user being
   * validated.
   * @param password The password parameter is a string representing the password
   * that the user is trying to validate.
   * @return The function `validateUser` returns either an object containing user
   * information (excluding the password) if the email and password match a user in
   * the database, or `null` if there is no match.
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * This is an async function that registers a new user by creating their data and
   * returning a JWT token.
   *
   * @param dto CreateUserDto is a data transfer object that contains the necessary
   * information to create a new user. It likely includes fields such as username,
   * email, and password.
   * @return An object with a property "token" which contains a JWT signed with the
   * user's ID.
   */
  async register(dto: CreateUserDto) {
    try {
      const userData = await this.usersService.create(dto);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (e) {
      console.log(e);
      throw new ForbiddenException('Error registration');
    }
  }

  /**
   * This function generates a JWT token for a given user ID.
   *
   * @param user The parameter `user` is of type `UserEntity`, which is likely a
   * custom class or interface representing a user object with properties such as
   * `id`, `username`, `email`, etc. The `login` function is likely used to generate
   * a JWT (JSON Web Token) for the user,
   * @return An object with a property "token" which is the result of signing a JSON
   * Web Token (JWT) containing the user's ID.
   */
  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
