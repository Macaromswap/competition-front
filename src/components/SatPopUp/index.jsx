import React, { useState } from 'react';
import styled from 'styled-components';
import { TextStyle } from '../../components/Text/TextCss'
import close from "../../assets/img/close.png";
import { useTranslation } from 'react-i18next';
import { goLink } from "../../utils";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9991;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 800px;
    padding: 30px 40px;
    border-radius: 24px;
    border: 2px solid var(--Text-heading, #000);
    background: #FFF;
    box-shadow: 4px 4px 0px 0px #000;
    position: relative;
    box-sizing: border-box;
    @media screen and (max-width: 800px) {
        width: 94%;
        padding: 20px;
    }
`;

const Content = styled.div`
    width: 100%;
    max-height: 480px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
`;

const ToggleItme = styled.div `
    position: absolute;
    transform: translateX(-51%);
    margin-right: -50px;
    right: 0;
    top: -4px;
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
    @media screen and (max-width: 690px) {
        transform: translateX(-50%);
        left: 50%;
        right: auto;
        top: -18px;
    }
`
const Toggle = styled.div `
    height: 34px;
    cursor: pointer;
    transform: rotate(-8deg);
    position: relative;
    z-index: 999;
    color: #3E7AF5;
    border-radius: 5px;
    border: 1px solid var(--Black, #24282B);
    background: var(--Button-button_solid, #FFDB58);
    padding: 8px 22px 6px 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    @media screen and (max-width: 690px) {
        padding: 10px 34px 10px 18px;
    }
`
const CloseImgStyle = styled.img`
    width: 32px;
    height: 32px;
    position: absolute;
    right: -11px;
    top: -17px;
    z-index: 999;
    @media screen and (max-width: 690px) {
        right: -8px;
        top: -6px;
    }
`
const UlBox = styled.ul`
    padding-left: 30px;
    margin:0;
    list-style-color: #6A6969;
    font-size: 14px;
    li {
        &::marker {
          color: #6A6969; /* Custom color for the markers */
        }
    }
`
const OlBox = styled.ol`
    padding-left: 30px;
    margin:0;
    list-style-color: #6A6969;
    font-size: 16px;
    font-family: ENGLISH-VILANE-MEDIUM;
    li {
        &::marker {
          color: #6A6969; /* Custom color for the markers */
        }
    }
`
const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const LinkStyle = styled.div`
    cursor: pointer;
    text-decoration-line: underline;
    color: #5576f2;
`

const PopupComponent = ({open, closeModal, type}) => {
    const { t, i18n } = useTranslation();

    return (
        <div>
            {open && (
                <Overlay>
                    <Modal className={'scrollbar'}>
                    <ToggleItme>
                        {
                            <Toggle onClick={closeModal}>
                                <TextStyle color={'#000'} size={16}>{t('close')}</TextStyle>
                            </Toggle>
                        }
                        <CloseImgStyle src={close}/>
                    </ToggleItme>
                    {
                        type === 1 &&(
                            <Content>
                                <div>
                                    <TextStyle color={'#24282B'} size={20}>{t('sat_rules_title1')}</TextStyle>
                                    <UlBox>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_text1')} </TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_text2')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_text3')}</TextStyle></li>
                                    </UlBox>
                                </div>
                                <div>
                                    <TextStyle color={'#24282B'} size={20}>{t('sat_left_title')}</TextStyle>
                                </div>
                                <div>
                                    <UlBox>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_left_text1')} </TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_left_text2')}</TextStyle></li>
                                    </UlBox>
                                </div>
                                <div>
                                    <TextStyle color={'#6A6969'} size={16}>
                                        {t('sat_left_text3')}<br />
                                        {t('sat_left_text4')}<br />
                                        {t('sat_left_text5')}<br />
                                        {t('sat_left_text6')}<br />
                                        {t('sat_left_text7')}<br />
                                        {t('sat_left_text8')}
                                     </TextStyle> 
                                </div>
                                <div>
                                    <TextStyle color={'#24282B'} size={20}>{t('sat_right_title')}</TextStyle>
                                </div>
                                <div>
                                    <UlBox>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_right_text1')} </TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_right_text2')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_right_text3')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_right_text4')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_right_text4-5')}</TextStyle></li>
                                    </UlBox>
                                </div>
                                <div>
                                    <TextStyle color={'#6A6969'} size={16}>
                                        {t('sat_right_text5')}<br />
                                        {t('sat_right_text6')}<br />
                                        {t('sat_right_text7')}<br />
                                        {t('sat_right_text8')}
                                     </TextStyle> 
                                </div>
                                <div>
                                    <TextStyle color={'#24282B'} size={20}>{t('sat_rules_how1')}</TextStyle>
                                    <TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how1_text1')}</TextStyle>
                                </div>
                                <div>
                                    <OlBox>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how1_text2')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how1_text3')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how1_text4')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how1_text5')}</TextStyle></li>
                                    </OlBox>
                                </div>
                                <div>
                                    <Flex>
                                        <TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how1_text6')}</TextStyle>
                                        <LinkStyle onClick={()=> goLink('howGetSat')}>
                                            <TextStyle color={'#5576f2'} size={16}>
                                                https://youtu.be/__IsmvhLN8I?t=42
                                            </TextStyle>
                                        </LinkStyle>
                                    </Flex>
                                </div>
                                <div>
                                    <TextStyle color={'#24282B'} size={20}>{t('sat_rules_how2')}</TextStyle>
                                    <TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how2_text1')}</TextStyle>
                                </div>
                                <div>
                                    <OlBox>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how2_text2')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how2_text3')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how2_text4')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how2_text5')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how2_text6')}</TextStyle></li>
                                        <li><TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how2_text7')}</TextStyle></li>
                                    </OlBox>
                                </div>
                                <div>
                                    <Flex>
                                        <TextStyle color={'#6A6969'} size={16}>{t('sat_rules_how1_text6')}</TextStyle>
                                        <LinkStyle onClick={()=> goLink('howSwapSat')}>
                                            <TextStyle color={'#5576f2'} size={16}>
                                                https://youtu.be/pUvQUXs7gIs?t=15
                                            </TextStyle>
                                        </LinkStyle>
                                    </Flex>
                                </div>
                            </Content>
                        )
                    }
                    {
                        type === 2 &&(
                            <Content>
                                <div>
                                    <TextStyle color={'#24282B'} size={20}>{t('sat_left_title')}</TextStyle>
                                </div>
                                <div>
                                    <UlBox>
                                        <li>
                                            <TextStyle color={'#6A6969'} size={16}>{t('sat_left_text1')}</TextStyle> 
                                        </li>
                                        <li>
                                            <TextStyle color={'#6A6969'} size={16}>{t('sat_left_text2')}</TextStyle> 
                                        </li>
                                    </UlBox>
                                </div>
                                <div>
                                    <TextStyle color={'#6A6969'} size={16}>
                                        {t('sat_left_text3')}<br />
                                        {t('sat_left_text4')}<br />
                                        {t('sat_left_text5')}<br />
                                        {t('sat_left_text6')}<br />
                                        {t('sat_left_text7')}<br />
                                        {t('sat_left_text8')}
                                    </TextStyle> 
                                </div>
                            </Content>
                        )
                    }
                    {
                        type === 3 &&(
                            <Content>
                                <div>
                                    <TextStyle color={'#24282B'} size={20}>{t('sat_right_title')}</TextStyle>
                                    <UlBox>
                                        <li>
                                            <TextStyle color={'#6A6969'} size={16}>{t('sat_right_text1')}</TextStyle> 
                                        </li>
                                        <li>
                                            <TextStyle color={'#6A6969'} size={16}>{t('sat_right_text2')}</TextStyle> 
                                        </li>
                                        <li>
                                            <TextStyle color={'#6A6969'} size={16}>{t('sat_right_text3')}</TextStyle> 
                                        </li>
                                        <li>
                                            <TextStyle color={'#6A6969'} size={16}>{t('sat_right_text4')}</TextStyle> 
                                        </li>
                                        <li>
                                            <TextStyle color={'#6A6969'} size={16}>{t('sat_right_text4-5')}</TextStyle> 
                                        </li>
                                    </UlBox>
                                </div>
                                <div>
                                    <TextStyle color={'#6A6969'} size={16}>
                                        {t('sat_right_text5')}<br />
                                        {t('sat_right_text6')}<br />
                                        {t('sat_right_text7')}<br />
                                        {t('sat_right_text8')}
                                     </TextStyle> 
                                </div>
                            </Content>
                        )
                    }
                  </Modal>
                </Overlay>
            )}
        </div>
    );
};

export default PopupComponent;
