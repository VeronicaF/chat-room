import { io } from 'socket.io-client'
import {  useRequest } from 'ahooks';
import style from './index.less';
import { _fetchCurrentUser } from '@/service';

export default function IndexPage() {
  const { data: currentUser } = useRequest(_fetchCurrentUser)

  return (
    <div>
      <div className={}>

      </div>
    </div>
  );
}
