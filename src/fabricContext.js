import React, { useContext } from 'react';

const FabricContext = React.createContext(null);

const ActiveObjectsContext = React.createContext(null);

const useFabricContext = () => useContext(FabricContext);
const useActiveObjectsContext = () => useContext(ActiveObjectsContext);

export {
  FabricContext,
  useFabricContext,
  ActiveObjectsContext,
  useActiveObjectsContext,
};
