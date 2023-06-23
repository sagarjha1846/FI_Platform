import axios from 'axios';
import constants from '../constant/routesConstant';

const { backendURL } = constants;

const URLs = [
  { route: 'darkweb.php', name: 'torDomain', key: 'domain' },
  { route: 'domain.php', name: 'domain', key: 'domain' },
  { route: 'urls.php', name: 'url', key: 'domain' },
  { route: 'files.php', name: 'files', key: 'hash' },
  { route: 'ips.php', name: 'IP', key: 'ip' },
];

const getParams = (key, searchQuery) => {
  return { [key]: searchQuery };
};
const fetchData = async (endpoint, searchQuery, key) => {
  const response = await axios.get(`${backendURL}${endpoint}`, {
    params: getParams(key, searchQuery),
  });

  const data = await response?.data;

  return {
    name: URLs.filter((el) => el.route === endpoint)[0].name,
    list: data,
  };
};

const getTORDomain = async (searchRef) => {
  try {
    const res = await axios.get(backendURL + 'darkweb.php', {
      params: {
        domain: searchRef,
      },
    });
    return res;
  } catch (e) {
    return e;
  }
};

const getDomain = async (searchRef) => {
  try {
    const res = await axios.get(backendURL + 'domain.php', {
      params: { domain: searchRef },
    });
    return res;
  } catch (error) {
    return error;
  }
};

const getUrl = async (searchRef) => {
  try {
    const res = await axios.get(backendURL + 'urls.php', {
      params: { domain: searchRef },
    });
    return res;
  } catch (error) {
    return error;
  }
};

const getFiles = async (searchRef) => {
  try {
    const res = await axios.get(backendURL + 'files.php', {
      params: { hash: searchRef },
    });
    return res;
  } catch (error) {
    return error;
  }
};

const getIP = async (searchRef) => {
  try {
    const res = await axios.get(backendURL + 'ips.php', {
      params: { ip: searchRef },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export { getTORDomain, getDomain, getUrl, getFiles, getIP, fetchData, URLs };
