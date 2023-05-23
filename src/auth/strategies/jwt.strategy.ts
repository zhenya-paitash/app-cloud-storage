import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * This is a constructor function that initializes a JWT authentication strategy
   * with a secret key and extracts the token from the authorization header.
   *
   * @param userService The `userService` parameter is an instance of the
   * `UsersService` class, which is likely used to interact with the database or
   * other data sources to retrieve user information needed for authentication and
   * authorization.
   */
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  /**
   * This function validates a user's access by checking if their ID exists in the
   * user service and returns their ID if it does.
   *
   * @param payload The `payload` parameter is an object that contains information
   * about the user's authentication token. It is passed to the `validate` method of
   * an authentication guard or strategy in order to verify the user's identity and
   * determine whether they have access to a particular resource or endpoint. In this
   * specific example, the
   * @return An object with the user's ID is being returned.
   */
  async validate(payload: any) {
    const user = await this.userService.findById(Number(payload.id));
    if (!user) {
      throw new UnauthorizedException("You don't have access");
    }

    return {
      id: user.id,
    };
  }
}
