import nookies from 'nookies';
import axios from 'axios';
import { GetServerSidePropsContext } from "next";
import Api from '@api';

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
  const { _token } = nookies.get(ctx);
  axios.defaults.headers.Authorization = `Bearer ${_token}`
  try {
    await Api.auth.getMe();
    return {
      props: {},
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/dashboard/auth',
        permanent: false,
      }
    }
  }
}
