import React, { useRef, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { TextStyle } from '../../components/Text/TextCss'
import { useTranslation } from 'react-i18next';
import { toMacaronRoute, toMacaronInfo } from "../../utils";

const MenuBar = styled.div`
    width: 100vw;
    height: 100vh;
    background: #F3FFCF;
    position: fixed;
    top: 0;
    left: 0;
    z-index:9999;
    @media screen and (min-width: 861px) {
        display: none;
    }
`
const TopBox = styled.div`
    width: 100%;
    z-index: 9999;
    border-radius: 0 0 20px 20px;
    border-bottom: 3px solid #0B0F17;
    background: #FFF;
    box-shadow: 4px 4px 0px 0px #000;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`
const NavList = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const StyledNavLink = styled.div`
    width: 100%;
    height: 68px;
    cursor: pointer;
    text-decoration: none;
    font-family: MT-MEDINM;
    text-align: center;
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
          color: #fff;
          background: #000;
          transform: skewY(3deg);
          div {
              transform: skewY(-3deg);;
          }
    }
`
const LogoImg = styled.img`
    width: 264px;
`
const BackBtn = styled.div`
    padding: 9px 38px;
    border-radius: 60px;
    border: 2px solid var(--Button-button_solid_border, #292627);
    background: #FFF;
    box-shadow: 4px 4px 0px 0px #000;
    position: absolute;
    left: 50%;
    bottom: 100px;
    transform: translateX(-50%);
`

function MenuPage({handleClick}) {
    const { t, i18n } = useTranslation();
    const selectChange = (router) => {
        const route = `${router}?lang=${i18n.language}`
        toMacaronRoute(route)
        handleClick()
    }
    const toInfo = () => {
        toMacaronInfo('/')
        handleClick()
    }
    return(
        <MenuBar>
            <TopBox>
                <NavList>
                    <StyledNavLink onClick={() => selectChange('/swap')}>
                        <TextStyle color={'#0b0f17'} size={20}>{t('swap')}</TextStyle> 
                    </StyledNavLink>
                    <StyledNavLink onClick={() => selectChange('/pool')}>
                        <TextStyle color={'#0b0f17'} size={20}>{t('pool')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink onClick={() => selectChange('/airdrop')}>
                        <TextStyle color={'#0b0f17'} size={20}>{t('airdrop')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink className={'active'} onClick={handleClick}>
                        <TextStyle color={'#fff'} size={20}>{t('leaderboard')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink onClick={toInfo}>
                        <TextStyle color={'#0b0f17'} size={20}>{t('analytics')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink onClick={() => selectChange('/ecosystem')}>
                        <TextStyle color={'#0b0f17'} size={20}>{t('ecosystem')}</TextStyle>
                    </StyledNavLink>
                </NavList>
            </TopBox>
            <BackBtn onClick={handleClick}>
                <TextStyle color={'#000'} size={20} spac={-1.7}>{t('back')}</TextStyle>
            </BackBtn>
        </MenuBar>
    )
}

export default MenuPage