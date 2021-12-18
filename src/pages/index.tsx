import { io } from 'socket.io-client'
import { useMount, useRequest } from 'ahooks';
import request from '@/utils/request'
import styles from './index.less';

export default function IndexPage() {
  useMount(() => {
    const socket = io("http://localhost:3000")
  })

  const { data } = useRequest(() => {
    return request('/api/')
  })

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <h1>{ data?.toString() }</h1>
    </div>
  );
}
