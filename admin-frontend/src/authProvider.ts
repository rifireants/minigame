const authProvider = {
  login: async ({ username, password }: { username: string; password: string }) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid: username, password }),
    });

    if (!res.ok) {
      throw new Error('인증 실패. 다시 시도해주세요');
    }

    const { access_token } = await res.json();

    const meRes = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!meRes.ok) {
      throw new Error('사용자 정보를 불러오지 못했습니다');
    }

    const user = await meRes.json();

    if (user.role != 'admin') {
      throw new Error('권한이 없습니다');
    }

    localStorage.setItem('token', access_token);
  },

  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },

  checkAuth: () =>
    localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),

  checkError: ({ status }: { status: number }) =>
    status === 401 || status === 403
      ? Promise.reject()
      : Promise.resolve(),

  getPermissions: () => Promise.resolve(),
};

export default authProvider;
