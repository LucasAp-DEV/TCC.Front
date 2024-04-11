import React, { createContext, useContext, useState } from 'react';

const LocalContext = createContext();

export const LocalProvider = ({ children }) => {
  const [localData, setLocalData] = useState(null);

  return (
    <LocalContext.Provider value={{ localData, setLocalData }}>
      {children}
    </LocalContext.Provider>
  );
};

export const useLocal = () => useContext(LocalContext);
