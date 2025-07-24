import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiChatService } from './ai_chat.service';
import { ChatDto } from './dto/create-ai_chat.dto';
import { UpdateAiChatDto } from './dto/update-ai_chat.dto';

@Controller('ai-chat')
export class AiChatController {
  constructor(private readonly aiChatService: AiChatService) {}

  @Post(':userId')
  async chat(
    @Param('userId') userId: string,
    @Body() chatDto: ChatDto,
  ) {
    const reply = await this.aiChatService.chat(userId, chatDto.message);
    return { response: reply };
  }

  @Get('logs/:userId')
  async getUserChatLogs(@Param('userId') userId: string) {
    return this.aiChatService.getUserChatLogs(userId);
  }
}
