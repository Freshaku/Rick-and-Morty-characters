import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner: React.FC = () => {
  return (
    <ClipLoader color="#fe9494" loading size={35}  />
  );
};

export default Spinner;