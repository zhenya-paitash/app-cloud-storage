import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  MaxFileSizeValidator,
  ParseFilePipe,
  Get,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../decorators/userid.decorator';
import { EnumFileType } from './entities/file.entity';

@Controller('files')
@ApiTags('files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FilesController {
  /**
   * This is a constructor function that takes in a FilesService object as a
   * parameter and assigns it to a private readonly property.
   *
   * @param filesService The `filesService` parameter is a dependency injection of
   * the `FilesService` class. It allows the class that contains this constructor to
   * use the methods and properties of the `FilesService` class without creating a
   * new instance of it. This is a common practice in Angular applications to promote
   * modularity and
   */
  constructor(private readonly filesService: FilesService) {}

  /**
   * This function finds all files of a specific type for a given user ID.
   *
   * @param userId The userId parameter is a number that is annotated with the
   * @UserId() decorator. This decorator is likely used to retrieve the user ID from
   * the request context or from the authentication token.
   * @param fileType The `fileType` parameter is a query parameter that is used to
   * filter the files based on their type. It is of type `EnumFileType`, which is
   * likely an enum that defines the different types of files that can be filtered.
   * The `@Query` decorator is used to extract the value of
   * @return The `findAll` method of the `filesService` is being called with the
   * `userId` and `fileType` parameters, and the result of that method call is being
   * returned.
   */
  @Get()
  findAll(@UserId() userId: number, @Query('type') fileType: EnumFileType) {
    return this.filesService.findAll(userId, fileType);
  }

  /**
   * This function creates a file with a maximum size of 5MB and associates it with a
   * user ID.
   *
   * @param file file is a parameter of type Express.Multer.File which represents a
   * file uploaded through a form. It contains information about the uploaded file
   * such as its name, size, and content.
   * @param userId The `userId` parameter is a number representing the ID of the user
   * who uploaded the file. It is obtained using a custom decorator `@UserId()` which
   * extracts the user ID from the request object.
   * @return The `create()` method is returning the result of calling the `create()`
   * method of the `filesService` with the `file` and `userId` parameters. The
   * specific return value depends on the implementation of the `create()` method in
   * the `filesService`.
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @UserId() userId: number,
  ) {
    return this.filesService.create(file, userId);
  }

  /**
   * This function removes files based on the user ID and a list of file IDs.
   *
   * @param userId a number representing the user ID of the user who is making the
   * request to remove files.
   * @param ids The `ids` parameter is a string that contains a comma-separated list
   * of file IDs. It is passed as a query parameter in the URL. The purpose of this
   * parameter is to specify which files should be removed by the `remove` method of
   * the `filesService`.
   * @return The `remove` method is returning the result of calling the `remove`
   * method of the `filesService` with the `userId` and `ids` parameters passed as
   * arguments. The specific return value depends on the implementation of the
   * `remove` method in the `filesService`.
   */
  @Delete()
  remove(@UserId() userId: number, @Query('ids') ids: string) {
    // {{API}}/files?ids=1,2,7,8
    return this.filesService.remove(userId, ids);
  }
}
