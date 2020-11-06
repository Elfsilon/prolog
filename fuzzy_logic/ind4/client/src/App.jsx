import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import pic from './assets/pic.jpg';


function App() {
  const imgRef = useRef(null);
  const [img, setImg] = useState(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const image = new Image();
    image.onload = function() {
      setImg(this);
      setHeight(this.height);
      setWidth(this.width);
    }
    image.src = imgRef.current.src;
  }, []);

  return (
    <div>
      <img src={pic} ref={imgRef}/>
      <Canvas img={img} width={width} height={height}/>
    </div>
  );
}

function Canvas(props) {
  const [img, setImg] = useState(null);
  const [rest, setRest] = useState(null);
  const [context, setContext] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);

  const toGrayscale = (img, height, width) => {
    const {data} = img.getImageData(0, 0, height, width);
    console.log(data);
    // for (let i = 0; i < imgData.data.length; i += 4) {
    //   const = grayscale
    //   imgData.data[i]
    // }
    return img;
  }

  useEffect(() => {
    setCanvas(canvasRef.current);
    setContext(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    const {img, ...restProps} = props;
    if (img) {
      const image = new Image;
      image.src = img.src;
      setImg(image);
      setRest(restProps);
    }
  }, [props]);
  
  useEffect(() => {
    if (img && context) {
      img.onload = function() {
        context.drawImage(img, 0, 0)
        toGrayscale(context, canvas.width, canvas.height);
      };
    }
  }, [img, context]);

  return <canvas ref={canvasRef} {...rest}></canvas>;
}

export default App;
