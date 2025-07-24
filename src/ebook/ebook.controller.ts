import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EbookService } from './ebook.service';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';

@Controller('ebook')
export class EbookController {
  constructor(private readonly ebookService: EbookService) {}

  @Post()
  create(@Body() dto: CreateEbookDto) {
    return this.ebookService.create(dto);
  }

  @Get()
  findAll() {
    return this.ebookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ebookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEbookDto: UpdateEbookDto) {
    return this.ebookService.update(+id, updateEbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ebookService.remove(+id);
  }
}
