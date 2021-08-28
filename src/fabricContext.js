import React, { useContext } from 'react';

const FabricContext = React.createContext(null);

const useFabricContext = () => useContext(FabricContext);

export {
  FabricContext,
  useFabricContext,
};
