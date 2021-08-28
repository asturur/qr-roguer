import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useFabricContext } from './fabricContext';

const Controls = () => {
  const fabricCanvas = useFabricContext();

  return <>
    <TextField label="Enter a url" variant="outlined" />
  </>
};

export default Controls;
