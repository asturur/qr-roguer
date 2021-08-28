import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from 'fabric';
import { useFabricContext } from './fabricContext';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
}));

const FabricCanvas = ({ setFabricCanvas }) => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const classes = useStyles();
  const fabricCanvas = useFabricContext();

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, { backgroundColor: 'cyan' });
      fabricCanvas.add(new fabric.Rect({ width: 300, height: 40 }))
      setFabricCanvas(fabricCanvas);
    }
  }, [setFabricCanvas]);

  useEffect(() => {
    const actualRef = containerRef.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (fabricCanvas) {
        const { width, height } = entries[0].contentRect;
        fabricCanvas.setDimensions({ width, height });
      }
    });
    resizeObserver.observe(actualRef);
    return () => resizeObserver.unobserve(actualRef);
  }, [fabricCanvas]);

  return (
    <div ref={containerRef} className={classes.container}>
      <canvas ref={canvasRef} ></canvas>
    </div>);
}

export default FabricCanvas;
