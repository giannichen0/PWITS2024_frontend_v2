import React, { useEffect } from 'react';
import axios from 'axios';

const ResponseInterceptor = () => {
  useEffect(() => {

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response
      ,
      (error) => {
       
        if (error.response) {
          
          const { status, data } = error.response;

          displayAlert(status, data.message || 'si è presentato un errore');
        } else if (error.request) {
         
          displayAlert(500, 'Nessuna risposta del server');
        } else {

          displayAlert(500, error.message);
        }
        return Promise.reject(error);
      }
    );

    const displayAlert = (status, message) => {
      
      alert(`${message}`);
      
    };

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return <></>;
};

export default ResponseInterceptor;