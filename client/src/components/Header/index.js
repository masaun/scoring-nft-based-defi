import React from 'react';
import styles from './header.module.scss';
import logo from './zk_logo.svg';

const Header = () => (
  <div className={styles.header}>
    <nav id="menu" className="menu">
      <div className={styles.brand}>
        <a href="/" className={styles.link}> <img src={logo} alt="logo" /></a>
      </div>
      <ul>
        <li><a href="/" className={styles.link}> Home</a></li>
        
        {/* 
        {process.env.NODE_ENV !== 'production' && (
          <li><a href="/counter" className={styles.link}> Counter</a></li>
        )} 
        */}

        {/* 
        {process.env.NODE_ENV !== 'production' && (
          <li><a href="/evm" className={styles.link}> EVM Packages</a></li>
        )} 
        */}
        
        {/* <li><a href="/faq" className={styles.link}> FAQ</a></li>  */}

        {process.env.NODE_ENV !== 'asset' && (
          <li><a href="/asset" className={styles.link}> Asset</a></li>
        )}

        {process.env.NODE_ENV !== 'exchange' && (
          <li><a href="/exchange" className={styles.link}> Exchange</a></li>
        )}

        {process.env.NODE_ENV !== 'escrow_payment' && (
          <li><a href="/escrow_payment" className={styles.link}> EscrowPayment</a></li>
        )}

        {process.env.NODE_ENV !== 'scoring_by_third_party' && (
          <li><a href="/scoring_by_third_party" className={styles.link}> ScoringByThirdParty</a></li>
        )}

        {process.env.NODE_ENV !== 'provable' && (
          <li><a href="/provable" className={styles.link}> Provable</a></li>
        )}
      </ul>
    </nav>
  </div>
)

export default Header;
