import React, { useRef, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { TextStyle } from '../../components/Text/TextCss'
import { useTranslation } from 'react-i18next';
import { toMacaronRoute, toMacaronInfo } from "../../utils";
import satoshi from '../../assets/img/satoshi.png'
import cbd from '../../assets/img/cbd.png'
import runesx from '../../assets/img/runesx.png'

const MenuBar = styled.div`
    width: 100vw;
    height: 100vh;
    background: #F3FFCF;
    position: fixed;
    top: 0;
    left: 0;
    z-index:9999;
    overflow-y: auto;
    text-align: center;
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
    padding-bottom: 20px;
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
    display: inline-block;
    margin: 70px 0 80px;
`
const CompetitionMenu = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`
const activeclassname = 'active'
const RouterNavLink = styled(NavLink).attrs({
    activeclassname,
})`
    outline: none;
    cursor: pointer;
    text-decoration: none;
    line-height: 20.64px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    gap: 16px;
    &.${activeclassname} {
          div {
            color: #FFCC14;
          }
    }
    &:hover {
        span {
            color: #FFCC14;
        }
    }
`
const IconBox = styled.div`
    display: flex;
    width: 28px;
    height: 28px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 9999px;
    border: 1px solid var(--Black, #24282B);
    background: var(--White, #FFF);
    box-shadow: 2px 2px 0px 0px #000;
`
const LogoIcon = styled.img`
    width: 100%;
    height: 100%;
`

function MenuPage({handleClick}) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

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
                    <StyledNavLink onClick={() => selectChange('/leaderboard')}>
                        <TextStyle color={'#0b0f17'} size={20}>{t('leaderboard')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink onClick={toInfo}>
                        <TextStyle color={'#0b0f17'} size={20}>{t('analytics')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink onClick={() => selectChange('/ecosystem')}>
                        <TextStyle color={'#0b0f17'} size={20}>{t('ecosystem')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink className={'active'} onClick={handleClick}>
                        <TextStyle color={'#fff'} size={20}>{t('competition')}</TextStyle>
                    </StyledNavLink>
                    <CompetitionMenu>
                        <RouterNavLink to='/runesx'>
                            <IconBox>
                                <LogoIcon src={runesx} />
                            </IconBox>
                            <TextStyle color={'#24282B'} size={18}><span>RunesX</span></TextStyle>
                        </RouterNavLink>
                        <RouterNavLink to='/satoshi' exact>
                            <IconBox>
                                <LogoIcon src={satoshi} />
                            </IconBox>
                            <TextStyle color={'#24282B'} size={18}><span>Satoshi</span></TextStyle>
                        </RouterNavLink>
                        {/* <RouterNavLink to='/cbd'>
                            <IconBox>
                                <LogoIcon src={cbd} />
                            </IconBox>
                            <TextStyle color={'#24282B'} size={18}><span>CBD</span></TextStyle>
                        </RouterNavLink> */}
                    </CompetitionMenu>
                </NavList>
            </TopBox>
            <BackBtn onClick={handleClick}>
                <TextStyle color={'#000'} size={20} spac={-1.7}>{t('back')}</TextStyle>
            </BackBtn>
        </MenuBar>
    )
}

export default MenuPage