import { Test, TestingModule } from '@nestjs/testing';
import { UserLibraryController } from './user-library.controller';
import { UserLibraryService } from './user-library.service';

describe('UserLibraryController', () => {
  let controller: UserLibraryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLibraryController],
      providers: [UserLibraryService],
    }).compile();

    controller = module.get<UserLibraryController>(UserLibraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
