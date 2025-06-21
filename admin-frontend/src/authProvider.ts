const authProvider = {
  login: async ({ username, password }: { username: string; password: string }) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid: username, password }),
    });

    if (!res.ok) {
      throw new Error('Login failed');
    }

    const { access_token } = await res.json();
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
