import { useEffect } from 'react';
import userApi from '../../api/user.js';

interface Props {
  id: string | undefined
}

const Setting: React.FunctionComponent<Props> = (props) => {
  // props
  const { id } = props;
  // 페이지가 렌더링되면 로그인된 유저 정보 불러오기
  const func = async () => {
    console.log(id);
    const res = await userApi.getUserInfo();
    console.log(res.data);
  }
  useEffect(() => {
    func();
  }, []);
  return (
    <>
    </>
  );
}

export default Setting;