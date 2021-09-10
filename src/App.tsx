import React, { useState } from 'react';
import { useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import generateMessage, { Message } from './Api';
import MessageCard from './components/MessageCard';
import './styled/style.css';

const App: React.FC<{}> = () => {
  const [message, setMessage] = useState<string>('');
  const [messagesError, setMessagesError] = useState<Message[]>([]);
  const [messagesWarning, setMessagesWarning] = useState<Message[]>([]);
  const [messagesInfo, setMessagesInfo] = useState<Message[]>([]);
  const [actionState, setActionState] = useState('STOP');
  const [open, setOpen] = React.useState(false);

  const addMessage = (oldMessages: Message[], message: Message) => {
    return  [message, ...oldMessages];
  }

  const changeAction = () => {
    setActionState(action => action === 'STOP' ? 'START': 'STOP')
  }

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClear = (messages: Message[], message: Message) => {
    for( var i = 0; i < messages.length; i++){                           
      if ( messages[i].message === message.message) { 
        messages.splice(i, 1); 
        break; 
      }
    }
    updateMessageStrategy[message.priority](messages);
    return true;
  }

  const clearMessages = () => {
    setMessagesError([]);
    setMessagesInfo([]);
    setMessagesWarning([]);
  }

  const updateMessageStrategy = {
    0: (messages: Message[]) => setMessagesError([...messages]),
    1: (messages: Message[]) => setMessagesWarning([...messages]),
    2: (messages: Message[]) => setMessagesInfo([...messages]),
  }

  const addMessageStrategy = {
    0: (message: Message) => setMessagesError(oldMessages => addMessage(oldMessages, message)),
    1: (message: Message) => setMessagesWarning(oldMessages => addMessage(oldMessages, message)),
    2: (message: Message) => setMessagesInfo(oldMessages => addMessage(oldMessages, message)),
  }

  useEffect(() => {
    const cleanUp = generateMessage((message: Message) => {
      if(actionState !== 'START') {
        setMessage(message?.message)
        setOpen(true)
        addMessageStrategy[message.priority](message);
      } 
    });
    return cleanUp;
  }, [ setMessagesError, setMessagesInfo, setMessagesWarning, setActionState, actionState]);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} message={message} onClose={handleClose} />
       
      <div className="controls">
        <input type="button" value={actionState} onClick={changeAction} />
        <input type="button" value="CLEAR" onClick={clearMessages}  />
      </div>
      <div className="dashboard-messages">
        <MessageCard messages={messagesError} type={"error"} title={"Error Type 1"} handleClear={handleClear}/>
        <MessageCard messages={messagesWarning} type={"warning"} title={"Warning Type 2"} handleClear={handleClear}/>
        <MessageCard messages={messagesInfo} type={"info"} title={"Info Type 3"} handleClear={handleClear}/>
      </div>
    </div>
  );
}

export default App;
