import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <TailSpin
        height="50" // Increased size for better visibility
        width="50" // Increased size
        color="#003a70" // One of your desired colors
        ariaLabel="loading"
        visible={true}
      />
    </div>
  );
}