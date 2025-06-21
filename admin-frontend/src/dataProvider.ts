import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';

const fetchJsonWithToken = (url: string, options: any = {}) => {
  const token = localStorage.getItem('token');
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(
  process.env.REACT_APP_API_URL || '',
  fetchJsonWithToken
);

export default dataProvider;
