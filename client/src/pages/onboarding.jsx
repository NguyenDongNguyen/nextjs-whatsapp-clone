import Avatar from '@/components/common/Avatar';
import Input from '@/components/common/Input';
import { reducerCases } from '@/context/constants';
import { useStateProvider } from '@/context/StateContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import axios from 'axios';
import { ONBOARD_USER_ROUTE } from '@/utils/ApiRoutes';

function onboarding() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = React.useState(userInfo?.name || '');
  const [about, setAbout] = React.useState('');
  const [image, setImage] = React.useState('/default_avatar.png');

  useEffect(() => {
    if (!newUser && !userInfo?.email) router.push('/login');
    else if (!newUser && userInfo?.email) router.push('/');
  }, [newUser, userInfo, router]);

  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          name,
          email,
          about,
          image,
        });
        if (data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.id,
              name,
              email,
              profileImage: image,
              status: '',
            },
          });
          router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  }

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="whatsapp" width={300} height={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <h2 className="text-2xl">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div 
            className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
            onClick={onboardUserHandler}
          >
            <button>Create Profile</button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
