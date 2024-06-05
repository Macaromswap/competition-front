import React, { useRef, useState, useMemo, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { toMacaronRoute, toMacaronInfo } from "../../utils";
import styled from 'styled-components'
import Logo from '../../assets/img/logo.png'
import wallet from "../../assets/img/wallet.png";
import lanuage from "../../assets/img/lanuage.png";
import dialog from "../../assets/img/dialog.png";
import menuIcon from "../../assets/img/menuIcon.png";
import { TextStyle } from '../../components/Text/TextCss'
import MenuPage from "../MenuPage";
import LanuagePage from "../LanuagePage";
import { useTranslation } from 'react-i18next';
import Wallet from "../Wallet";

const Wrapper = styled.div`
    display: flex;
    row-gap: 12px;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    margin: 30px 4px 0 0;
    height: 72px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 3px solid #0B0F17;
    background: #FFF;
    box-shadow: 4px 4px 0px 0px #000;
    position: relative;
    box-sizing: border-box;
    @media screen and (max-width: 860px) {
        height: 75px;
        align-items: flex-end;
        margin: 0;
        width: 100vw;
        padding: 0 2px;
        margin: -3px 0 0 -16px;
        // z-index: 9999;
        border-radius: 0px 0px 29px 29px;
        border: 1px solid #24282B;
        box-shadow: 2px 2px 0px 0px #000;
        padding: 0 24px;
    }
`
const MenuBox = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 860px) {
        height: 100%;
        gap: 20px;
        flex-direction: row-reverse;
        .pointer {
            margin-left: 25px;
        }
    }
`

const LeftMenuBox = styled(MenuBox)`
    position: relative;
    height: 100%;
`

const StyledLogo = styled.div`
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    margin: 0 10px 0px 29px;
    background-image: url(${Logo});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    cursor: pointer;
    @media screen and (max-width: 860px) {
        width: 36px;
        height: 36px;
        margin: 0;
    }
`
const Gap = styled.div`
    display: flex;
    height: 100%;
    margin-left: 24px;
    @media screen and (max-width: 860px) {
        display: none;
    }
`
const MiniMenu = styled.div`
    display: flex;
    height: 75px;
    @media screen and (min-width: 861px) {
        display: none;
    }
`
const StyledNavLink = styled.div`
    cursor: pointer;
    text-align: center;
    min-width: 118px;
    height: 100%;
    padding: 0 20px;
    line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    &.active {
          color: #fff;
          background: #000;
          transform: skewX(-15deg);
          div {
              transform: skewX(15deg);;
          }
    }
`
const H5menu = styled.div`
    cursor: pointer;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

const SearchStyle = styled.div`
    display: flex;
    padding: 8px 16px;
    align-items: center;
    gap: 40px;
    border-radius: 9999px;
    @media screen and (max-width: 860px) {
        display: none !important;
    }
`
const SearchImgStyle = styled.img`
    width: 34px;
    position: absolute;
    right: -10px;
    top:2px;
    z-index: 999;
`
const LanuageBox = styled.div`
    position: relative;
`
const LanuageImgStyle = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    @media screen and (max-width: 860px) {
        width: 24px;
        height: 24px;
    }
`
const FloatingBox = styled.div`
    position: absolute;
    top: 62px;
    left: -140px;
    width: 189px;
    height: 292px;
    padding: 43px 0px 0px 30px;
    background-image: url(${dialog});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 9999;
    box-sizing: border-box;
`
const UlBox = styled.ul`
    margin: 0;
    padding: 0;
`
const LiBox = styled.li`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 12px;
    cursor: pointer;
`
const BorderStyle = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 16px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 50%;
    box-shadow: rgb(0, 0, 0) 2px 2px 0px 0px;
`
const MenuImg = styled.img`
    width: 24px;
    height: 24px;
`

function Menu() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [showH5, setShowH5] = useState(false);
    const btnRef = useRef(null)
    const ref = useRef(null)
    const lang = [
        {label: 'EN', value: 'English', lang: 'en' },
        {label: 'CN', value: '简体中文', lang: 'zh-CN' },
        {label: 'HK', value: '繁體中文', lang: 'zh-HK' },
        {label: 'JP', value: '日本語', lang: 'ja' },
        {label: 'VN', value: 'Tiếng Việt', lang: 'vi' },
    ]
    const handleLanguageChange  = (lng) => {
        i18n.changeLanguage(lng)
        setShow(false)
    }

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    const showDropdownH5 = () => {
        setShowH5(!showH5)
    }
    const showDropdown = () => {
        setShow(!show)
    }
    const handleClick = (e: any) => {
        if (!(btnRef.current && btnRef.current.contains(e.target)) && !(ref.current && ref.current.contains(e.target))) {
            setShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    const selectChange = (router) => {
        const route = `${router}?lang=${i18n.language}`
        toMacaronRoute(route)
    }
    const toInfo = () => {
        toMacaronInfo('/')
    }

    return(
        <Wrapper>
            <LeftMenuBox>
                <MenuBox>
                    <StyledLogo className={'logo'} src={Logo} onClick={() => toMacaronRoute('/')}/>
                </MenuBox>
                <Gap>
                    <StyledNavLink onClick={() => selectChange('/swap')}>
                        <TextStyle color={'#0b0f17'} size={16}>{t('swap')}</TextStyle> 
                    </StyledNavLink>
                    <StyledNavLink onClick={() => selectChange('/pool')}>
                        <TextStyle color={'#0b0f17'} size={16}>{t('pool')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink onClick={() => selectChange('/airdrop')}>
                        <TextStyle color={'#0b0f17'} size={16}>{t('airdrop')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink onClick={() => selectChange('/leaderboard')}>
                        <TextStyle color={'#0b0f17'} size={16}>{t('leaderboard')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink onClick={toInfo}>
                        <TextStyle color={'#0b0f17'} size={16}>{t('analytics')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink onClick={() => selectChange('/ecosystem')}>
                        <TextStyle color={'#0b0f17'} size={16}>{t('ecosystem')}</TextStyle>
                    </StyledNavLink>
                    <StyledNavLink className={'active'} onClick={handleClick}>
                        <TextStyle color={'#fff'} size={16}>{t('competition')}</TextStyle>
                    </StyledNavLink>
                </Gap>
            </LeftMenuBox>
            <MiniMenu>
                <H5menu>
                    <Wallet />
                    <LanuageImgStyle ref={btnRef} src={lanuage} onClick={showDropdownH5}/>
                    <MenuImg  onClick={toggleDropdown} src={menuIcon}/>
                </H5menu>
            </MiniMenu>
            {isOpen && (
                <MenuPage handleClick={toggleDropdown} />
            )}
            {showH5 && (
                <LanuagePage handleClick={showDropdownH5} />
            )}
            <SearchStyle>
                <LanuageBox>
                    <LanuageImgStyle ref={btnRef} src={lanuage} onClick={showDropdown}/>
                    {
                        show &&
                        <FloatingBox ref={ref} >
                            <TextStyle color={'#0b0f17'} size={16}>Language</TextStyle>
                            <UlBox>
                                {
                                    lang.map(item => {
                                        return(
                                            <LiBox key={item.lang} onClick={() => handleLanguageChange(item.lang)}>
                                                <BorderStyle>
                                                    <TextStyle color={'#0b0f17'} size={12}>{item.label}</TextStyle>
                                                </BorderStyle>
                                                <TextStyle color={i18n.language === item.lang? '#ffcc14':'#0b0f17'} size={16}>{item.value}</TextStyle>
                                            </LiBox>
                                        )
                                    })
                                }
                            </UlBox>
                        </FloatingBox>
                    }
                </LanuageBox>
                <Wallet />
            </SearchStyle>
        </Wrapper>
    )
}

export default Menu