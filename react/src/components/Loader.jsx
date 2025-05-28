import React from 'react';
import { Circles } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <Circles
        height="30"
        width="30"
        color="#00BFFF"
        ariaLabel="loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
