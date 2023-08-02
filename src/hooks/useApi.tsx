import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

axios.defaults.baseURL = 'https://disability-map.azurewebsites.net';

export const useApi = (axiosParams: AxiosRequestConfig) => {
  const [data, setData] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (params: AxiosRequestConfig) => {
    setIsLoading(true);
    try {
      const result = await axios.request(params);
      setData(result);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const sendData = () => {
    fetchData(axiosParams);
  };

  useEffect(() => {
    if (axiosParams.method === 'get') {
      fetchData(axiosParams);
    }
  }, []);

  return { data, error, isLoading, sendData };
};
