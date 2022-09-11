import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/users',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          list: ['1', '2'],
        },
      };
    },
  },
] as MockMethod[];
