// src/user-library/user-library.controller.ts
import { Controller, Post, Param, UseGuards, Req, Get } from '@nestjs/common';
import { UserLibraryService } from './user-library.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller()
export class UserLibraryController {
  constructor(private readonly userLibraryService: UserLibraryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/ebooks/:id/save')
  saveEbook(@Param('id') ebookId: number, @Req() req) {
    return this.userLibraryService.saveBook(req.user.id, ebookId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/library')
  getLibrary(@Req() req) {
    return this.userLibraryService.getUserLibrary(req.user.id);
  }
}
