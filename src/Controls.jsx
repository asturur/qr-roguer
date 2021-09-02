import React, { useCallback, useState, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import useGenericSetter from './hooks/useGenericSetter';
import ColorChanger from './ColorChanger';
import { Add } from '@material-ui/icons';
import { useFabricContext, useActiveObjectsContext, ActiveObjectsContext } from './fabricContext';
import { fabric } from 'fabric';
import { useTranslations } from './hooks/useTranslations';

const Controls = () => {
  const fabricCanvas = useFabricContext();
  const currentText = useRef();
  const activeObject = useActiveObjectsContext()[0];
  const genericSetter = useGenericSetter();
  const { t } = useTranslations();
  const createNew = useCallback(() => {
    fabricCanvas.add(new fabric.Qrcode({ data: currentText.current.value || 'test data' }));
  }, [fabricCanvas]);
  const data = activeObject?.data;
  return <>
    <List>
    <ListItem>
      <TextField inputRef={currentText} label={t('Enter a url')} variant="outlined" onChange={({ target }) => genericSetter({ data: target.value })} />
      <IconButton>
        <Add onClick={createNew} />
      </IconButton>
    </ListItem>
    {activeObject && (
      <>
        <ListItem>
          <ColorChanger
            color={activeObject.fill}
            label={t('dots color')}
            property="fill"
          />
        </ListItem>
        <ListItem>
          <ColorChanger
            color={activeObject.backgroundColor}
            label={t('background')}
            property="backgroundColor"
          />
        </ListItem>
      </>
    )}
    </List>
  </>
};

const WrappedControls = () => {
  const fabricCanvas = useFabricContext();
  const [activeObjects, setActiveObjects] = useState([]);
  useEffect(() => {
    const selectionHandler = () => {
      setActiveObjects([...fabricCanvas.getActiveObjects()]);
    };
    if (fabricCanvas) {
      fabricCanvas.on('object:propertySet', selectionHandler);
      fabricCanvas.on('selection:cleared', selectionHandler);
      fabricCanvas.on('selection:created', selectionHandler);
      fabricCanvas.on('selection:updated', selectionHandler);
    }
    return () => {
      if (fabricCanvas) {
        fabricCanvas.off('object:propertySet', selectionHandler);
        fabricCanvas.off('selection:cleared', selectionHandler);
        fabricCanvas.off('selection:created', selectionHandler);
        fabricCanvas.off('selection:updated', selectionHandler);
      }
    }
  }, [fabricCanvas])
  return (
    <ActiveObjectsContext.Provider value={activeObjects}>
      <Controls />
    </ActiveObjectsContext.Provider>
  );
};

export default WrappedControls;
