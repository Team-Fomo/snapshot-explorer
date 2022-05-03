import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import s from './GettingStarted.module.css';
import { Button, Input, message, Modal } from 'antd';
import { addressContext } from '../../adress.context';

const GettingStarted = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [addressValue, setAddressValue] = React.useState('');
  const { address, setAddress } = React.useContext(addressContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => setAddressValue(e.target.value);

  const okHandler = () => {
    localStorage.setItem('address', addressValue);
    setAddress(addressValue);
    setAddressValue('');
    setIsModalVisible(false);
    message.success('Success login');
  };

  const cancelHandler = () => {
    setAddressValue('');
    setIsModalVisible(false);
  };
  return (
    <div className={s.container}>
      <h1>Check your all your proposals simple</h1>
      <SearchOutlined style={{ fontSize: 50, margin: '20px 0' }} />
      <Button onClick={showModal}>Geting started</Button>

      <Modal title="Enter Your Ethereum Address" visible={isModalVisible} onOk={okHandler} onCancel={cancelHandler}>
        <Input autoFocus value={addressValue} onChange={inputHandler} placeholder='Adress like 0x...' />
      </Modal>
    </div>
  )
}

export default GettingStarted;