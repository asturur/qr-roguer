import { useCallback } from 'react';
import { useActiveObjectsContext } from '../fabricContext';

// set on one or more objects some properties,
// using the simple set on all objects rather than one

const useGenericSetter = () => {
  const activeObjects = useActiveObjectsContext();
  return useCallback((properties) => {
    const promises = activeObjects.map((object) => {
      object.set({ dirty: true, ...properties });
      return object.update();
    });
    const activeObject = activeObjects[0];
    if (activeObject) {
      activeObject.canvas.fire('object:propertySet');
      Promise.all(promises).then(() => {
        activeObject.canvas.requestRenderAll();
      });
    }

  }, [activeObjects]);
}

export default useGenericSetter;
