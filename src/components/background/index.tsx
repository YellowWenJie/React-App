import React from 'react';
import IMG from '../../public/img/IMG_0936.jpeg'

function BackGround() {
  return (
    <div style={{objectFit: 'cover', width: '100%', height: '100%'}}>
      <img src={IMG} alt="" style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
    </div>
  );
}

export default BackGround;