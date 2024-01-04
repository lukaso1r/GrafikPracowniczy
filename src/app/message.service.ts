// message.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private urlMessages = "http://localhost:3000/messages/";

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get(this.urlMessages);
  }

  sendMessage(senderId: number, senderName: string, receiverId: number, receiverName: string, content: string) {
    const newMessage = {
      senderId: senderId,
      senderName: senderName,
      receiverId: receiverId,
      receiverName: receiverName,
      content: content
    };
    return this.http.post(this.urlMessages, newMessage);
  }

  deleteMessage(messageId: number): Observable<any> {
    const url = `${this.urlMessages}${messageId}`;
    return this.http.delete(url);
  }
}
