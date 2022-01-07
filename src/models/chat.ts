import { useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { _login } from '@/service';
import { useMount } from 'ahooks';

type ChatRecord = {
  msg: string;
  username: string;
  sendTime: string;
  messageId: string;
}[];

export default function useChat() {
  const [chatRecord, setChatRecord] = useState<ChatRecord>([]);

  const socket = useRef<Socket>();

  useMount(() => {
    socket.current = io('localhost:3000');
    socket.current.on('msg', (r: ChatRecord) => {
      setChatRecord(r);
    });
  });

  const sendChatMessage = useCallback(
    (data: { msg: string; username: string }) => {
      return new Promise<boolean>((resolve) => {
        if (!socket.current) {
          return;
        }
        socket.current.emit('newMsg', data, (succeed: boolean) => {
          resolve(succeed);
        });
      });
    },
    [],
  );

  return {
    socket,
    chatRecord,
    sendChatMessage,
  };
}
