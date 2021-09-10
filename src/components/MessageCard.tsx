import React from 'react';
import { Message } from '../Api';


interface MessageCardProps {
  messages: Message[];
  type: string;
  title: string;
  handleClear: (messages: Message[], message: Message) => { };
}

const MessageCard: React.FC<MessageCardProps> = ({ messages, type, title, handleClear }) => {
  return <div className="column-messages">
    <h1>{title}</h1>
    <h3>Count {messages.length}</h3>
    {messages?.map?.(msg => 
        <div className={`message message-${type}`} key={msg?.message}>
          {msg?.message}
          <input type="submit" className="btn-clear" value="Clear" onClick={() => handleClear(messages, msg)} />
        </div>
    )}
  </div>
}
 
export default MessageCard;