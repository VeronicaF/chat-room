import { io } from 'socket.io-client';
import { useRequest } from 'ahooks';
import { _fetchCurrentUser } from '@/service';
import React, { KeyboardEvent, useEffect, useRef } from 'react';
import styles from './index.less';
import moment from 'moment';
import defaultAvatar from '../pages/avatar.png';
import { Button, Input } from 'antd';
import { useModel } from 'umi';

export default function IndexPage() {
  const { data: currentUser } = useRequest(_fetchCurrentUser);

  const { chatRecord, sendChatMessage } = useModel('chat');

  // 聊天窗口DOM
  const chatWindow = useRef<HTMLDivElement>(null);
  // 输入框DOM
  const textAreaDOM = useRef<HTMLTextAreaElement | null>(null);

  // 聊天记录发生变化时滚动聊天窗口
  useEffect(() => {
    if (chatWindow.current && chatWindow.current.lastChild) {
      const lastChild = chatWindow.current.lastChild as HTMLParagraphElement;
      lastChild.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatRecord]);

  useEffect(() => {
    textAreaDOM.current = document.querySelector('#INPUT_AREA');
  }, []);

  // 按回车发消息
  const onEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const el = e.target as HTMLTextAreaElement;
    const text = el.value.trim();
    if (!text || !currentUser) {
      return;
    }
    if (e.shiftKey) {
      return;
    }
    sendChatMessage({
      msg: text,
      username: currentUser.name,
    }).then(
      (succeed) =>
        succeed && setTimeout(() => (textAreaDOM.current!.value = '')),
    );
  };
  // 点发送发消息
  const onSend = () => {
    if (!textAreaDOM.current) {
      return;
    }
    const text = textAreaDOM.current.value.trim();
    if (!text || !currentUser) {
      return;
    }
    sendChatMessage({
      msg: text,
      username: currentUser.name,
    }).then(
      (succeed) =>
        succeed && setTimeout(() => (textAreaDOM.current!.value = '')),
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.chatWindow} ref={chatWindow}>
          {chatRecord.map((record, index, arr) => {
            const { username, msg } = record;
            const sendTime = moment(record.sendTime);
            let date = null;
            if (
              index === 0 ||
              sendTime.diff(moment(arr[index - 1].sendTime), 'minutes') > 3
            ) {
              date = (
                <div className={styles.date}>
                  {sendTime.format('YYYY-MM-DD HH:mm:ss')}
                </div>
              );
            }
            return (
              <div key={record.messageId} className={styles.message}>
                {date}
                <div
                  className={`${
                    username === currentUser?.name
                      ? styles.itemRight
                      : styles.itemLeft
                  }`}
                >
                  <div className={styles.username}>{record.username}</div>
                  <img
                    src={defaultAvatar}
                    alt="avatar"
                    className={styles.avatar}
                  />
                  <div className={styles.main}>
                    <div className={styles.mc}>
                      <div className={styles.chatBub}>
                        <div className={styles.cnt}>
                          {msg.split('\n').map((item: string, i, _arr) => {
                            return (
                              // eslint-disable-next-line react/no-array-index-key
                              <p key={i}>
                                {item}
                                {i < _arr.length - 1 && <br />}
                              </p>
                            );
                          })}
                        </div>
                        <i className={styles.corr} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* TODO: 这里要改成div，然后可以插入图片 */}
        <Input.TextArea
          autoFocus
          className={styles.input}
          onPressEnter={onEnter}
          id="INPUT_AREA"
        />
        <Button type="primary" onClick={onSend} className={styles.sendBtn}>
          发送
        </Button>
      </div>
    </div>
  );
}
