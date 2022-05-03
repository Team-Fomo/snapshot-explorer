import React from 'react'
import { GithubOutlined } from '@ant-design/icons';
import s from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={s.container}>
      <span>© 2022 TeamFomo</span>
      <a target='_blank' href='https://github.com/Team-Fomo/snapshot-parser' rel="noreferrer" >
        <GithubOutlined size={20} />
      </a>
    </footer>
  )
}

export default Footer;
