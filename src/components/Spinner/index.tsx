import React from 'react'
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';

const Spinner: React.FC<SpinProps> = (props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin {...props} />
    </div>
  )
}

export default Spinner;
