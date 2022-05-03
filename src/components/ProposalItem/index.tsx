import { Avatar } from 'antd';
import React from 'react'
import s from './ProposalItem.module.css';

const ProposalItem = (props: any) => {
  const { proposal } = props;
  return (
    <div className={s.container}>
      <div className={s.main_info}>
        <div>
          <Avatar src={proposal.space.avatar.replace("ipfs://", "https://ipfs.io/ipfs/")} />
          <div>{proposal.space.name}</div>
        </div>
        <span>Closed</span>
      </div>
      <div className={s.content}>
        <h1>{proposal.title}</h1>
        <div className={s.body}>{proposal.body}</div>
      </div>
    </div>
  )
}

export default ProposalItem;
