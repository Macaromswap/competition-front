import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import styled from 'styled-components'
import wallet from "../../assets/img/wallet.png";
import { TextStyle } from '../../components/Text/TextCss'
import { useTranslation } from 'react-i18next';
import { useNetworkStore } from '../../store';

const ToggleItme = styled.div `
    position: relative;
    margin-right: -50px;
    &::after {
        content: "";
        display: block;
        width: 95%;
        height: 20px;
        position: absolute;
        left: 2px;
        bottom: -1px;
        // transform: rotate(0deg);
        background-color: #E5C75D;
        border-radius: 10px;
        z-index: 9;
    }
`
const Toggle = styled.div `
    height: 34px;
    border-radius: 8px;
    cursor: pointer;
    transform: rotate(-6.413deg);
    border: 1px solid #000;
    position: relative;
    z-index: 999;
    color: #3E7AF5;
    background: #FFDB58;
    padding: 4px 28px 2px 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`

const SearchImgStyle = styled.img`
    width: 34px;
    position: absolute;
    right: -10px;
    top:2px;
    z-index: 999;
`

const Wallet = () => {
    const { t, i18n } = useTranslation();
    const [isConnected, setIsConnected] = useState(false);
    const userAddress = useNetworkStore((state) => state.userAddress);
    const setUserAddress = useNetworkStore((state) => state.setUserAddress);

  // 连接 MetaMask 钱包
    const connectWallet = async () => {
        const provider = await detectEthereumProvider();
        if (provider) {
            try {
                const accounts = await provider.request({ method: 'eth_requestAccounts' });
                setUserAddress(accounts[0]);
                setIsConnected(true);
            } catch (error) {
                console.error('连接 MetaMask 失败:', error);
            }
        } else {
            alert('请安装 MetaMask 钱包');
        }
    };

    // 监听钱包断开连接
    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            setIsConnected(false);
            setUserAddress('');
        } else {
            setUserAddress(accounts[0]);
        }
    };

    const handleChainChanged = () => {
        window.location.reload();
    };

    useEffect(() => {
        const initializeProvider = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                provider.on('accountsChanged', handleAccountsChanged);
                provider.on('chainChanged', handleChainChanged);
                
                // 检查当前连接状态
                const accounts = await provider.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                  setUserAddress(accounts[0]);
                  setIsConnected(true);
                }
              
                return () => {
                  provider.removeListener('accountsChanged', handleAccountsChanged);
                  provider.removeListener('chainChanged', handleChainChanged);
                };
            }
        };
        initializeProvider();
    }, [setUserAddress]);

    const shortenAddress = (address) => {
        if(address === '') {
            return '-'
        }
        return `${address.substring(0, 6)}...${address.substring(42 - 4)}`
    }

    return (
        <ToggleItme>
            {
                isConnected?
                <Toggle onClick={connectWallet}>
                    <TextStyle color={'#000'} size={16}>{shortenAddress(userAddress)}</TextStyle>
                </Toggle>
                :
                <Toggle onClick={connectWallet}>
                    <TextStyle color={'#000'} size={16}>{t('wallet')}</TextStyle>
                </Toggle>
            }
           <SearchImgStyle src={wallet}/>
       </ToggleItme>
    );
};

export default Wallet;
