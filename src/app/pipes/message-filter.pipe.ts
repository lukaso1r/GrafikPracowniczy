// message-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageFilter'
})
export class MessageFilterPipe implements PipeTransform {
  transform(messages: any[], searchText: string): any[] {
    if (!messages || !searchText) {
      return messages;
    }

    return messages.filter(message =>
      message.receiverName.toLowerCase().includes(searchText.toLowerCase()) ||
      message.senderName.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}

