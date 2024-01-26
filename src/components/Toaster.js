import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const ToasterComponent = () => {
  const showToast = () => {
    toast.success('Registration successful!', {
      icon: <FiCheckCircle size={24} color="#10B981" />,
    });
  };

  return (
    <>
      {/* <button onClick={showToast}>Show Toast</button> */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default ToasterComponent;
