import { PartialType } from '@nestjs/mapped-types';
import { ChatDto } from './create-ai_chat.dto';

export class UpdateAiChatDto extends PartialType(ChatDto) {}
