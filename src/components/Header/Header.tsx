import React from 'react'
import { Modal, Button, Input, message, Avatar } from 'antd';
import s from './Header.module.css'
import { addressContext } from '../../adress.context';
import { cutAdddress } from '../../utils/cutAddress';
import snapshotLogo from '../../assets/logo.png'

const Header = () => {
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

  const logoutHander = () => {
    localStorage.removeItem('address');
    setAddress('');
    setIsModalVisible(false);
  }

  return (
    <>
      <header className={s.container}>
        <div className={s.title}>
          <img src={snapshotLogo} alt='Snapshot' />
          <h1>Snapshot Explorer</h1>
        </div>
        {address &&
          (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a href={`https://etherscan.io/address/${address}`} target='_blank' rel="noreferrer">
                <div className={s.address} style={{ marginRight: 10 }}>
                  <Avatar size='small' src={`https://stamp.fyi/avatar/eth:${address}`} />
                  <span>{cutAdddress(address)}</span>
                </div>
              </a>

              <Button type='default' onClick={logoutHander}>
                Logout
              </Button>
            </div>
          )}
        {!address && <Button type='default' onClick={showModal}>
          Login
        </Button>}
      </header>
      <Modal title="Enter Your Ethereum Address" visible={isModalVisible} onOk={okHandler} onCancel={cancelHandler}>
        <Input autoFocus value={addressValue} onChange={inputHandler} placeholder='Adress like 0x...' />
      </Modal>
    </>
  )
}

export default Header;