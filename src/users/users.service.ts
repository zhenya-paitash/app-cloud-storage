import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  /**
   * This is a constructor function that injects a repository of UserEntity into
   * the class.
   * @param repository - The "repository" parameter is an instance of the TypeORM
   * Repository class that is used to interact with the database table for the
   * "UserEntity" entity. It provides methods for querying, inserting, updating,
   * and deleting records in the database. The "@InjectRepository" decorator is
   * used to inject the repository
   */
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  /**
   * This function finds a record in the repository by email.
   * @param {string} email - The email parameter is a string that represents the
   * email address of a user. This function is likely used to find a user in a
   * database by their email address.
   * @returns The `findByEmail` function is returning a promise that resolves to
   * the result of calling the `findOneBy` method on the repository object with the
   * `email` parameter passed as an argument. The exact return value depends on the
   * implementation of the `findOneBy` method, but it is likely to be an object or
   * `null` if no matching record is found.
   */
  async findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  /**
   * This function finds a record in the repository by its ID.
   * @param {number} id - The `id` parameter is a number representing the unique
   * identifier of an entity that we want to find in the database. The `findById`
   * method is an asynchronous function that takes in this `id` parameter and
   * returns a promise that resolves to the entity with the matching `id` value.
   * The method
   * @returns The `findById` method is returning a promise that resolves to the
   * result of calling the `findOneBy` method on the repository object with the
   * `id` parameter passed as an argument. The exact data type of the returned
   * value depends on the implementation of the `findOneBy` method and the data
   * stored in the repository.
   */
  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  /**
   * The function creates a new user by saving the data from the CreateUserDto
   * object to the repository.
   * @param {CreateUserDto} dto - CreateUserDto is a data transfer object (DTO)
   * that contains the information needed to create a new user. It likely includes
   * properties such as the user's name, email address, password, and any other
   * relevant information. The `create` method takes in this DTO as a parameter and
   * uses it to
   * @returns The `create` method is returning the result of calling the `save`
   * method on the repository with the `dto` parameter passed in. The `save` method
   * is likely saving the `CreateUserDto` object to a database or other data store.
   * Therefore, the `create` method is returning the result of the save operation,
   * which could be a Promise or the saved object itself.
   */
  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }
}
