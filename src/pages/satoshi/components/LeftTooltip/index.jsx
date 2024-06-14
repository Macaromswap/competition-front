import React, { useState } from 'react';
import styled from 'styled-components';
import question from "../../../../assets/img/question.png";
import { ReactComponent as ImgIcon } from '../../../../assets/img/sanjx.svg'
import { TextStyle } from '../../../../components/Text/TextCss'
import { useTranslation } from 'react-i18next';

const Container = styled.div`
    position: relative;
    display: inline-block;
    @media screen and (max-width: 690px) {
        display: none;
    }
`;

const Image = styled.img`
    width: 20px;
    height: 20px;
    display: block;
`;

const Popup = styled.div`
    width: 464px;
    padding: 20px;
    position: absolute;
    bottom: 46px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px;
    border: 2px solid var(--Text-heading, #000);
    background: #FFF;
    box-shadow: 4px 4px 0px 0px #000;
    display: ${(props) => (props.show ? 'block' : 'none')};
    transition: opacity 0.2s ease;
    box-sizing: border-box;
`;
const SanjxImg = styled(ImgIcon)`
    position: absolute;
    left: 51%;
    transform: translateX(-50%);
    bottom: -21.9px;
`
const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
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

const LeftTooltip = () => {
    const { t, i18n } = useTranslation();

    const [showPopup, setShowPopup] = useState(false);

    return (
        <Container
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
        >
            <Image src={question} />
            <Popup show={showPopup}>
                <SanjxImg />
                <Content>
                    <div>
                        <TextStyle color={'#24282B'} size={20}>{t('sat_left_title')}</TextStyle>
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
            </Popup>
        </Container>
    );
};

export default LeftTooltip;
