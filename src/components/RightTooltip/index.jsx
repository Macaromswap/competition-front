import React, { useState } from 'react';
import styled from 'styled-components';
import question from "../../assets/img/question.png";
import { ReactComponent as ImgIcon } from '../../assets/img/sanjx.svg'
import { TextStyle } from '../../components/Text/TextCss'
import { useTranslation } from 'react-i18next';

const Container = styled.div`
    position: relative;
    display: inline-block;
    z-index: 999;
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
    max-height: 500px;
    padding: 20px;
    position: absolute;
    bottom: 46px;
    right: 60%;
    transform: translateX(16%);
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
    left: 82%;
    // transform: translateX(-50%);
    bottom: -21.9px;
`
const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-height: 470px;
    overflow-y: scroll;
`

const RightTooltip = () => {
    const { t, i18n } = useTranslation();
    const [showPopup, setShowPopup] = useState(false);

    return (
        <Container
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
        >
            <Image src={question} />
            <Popup className={'scrollbar'} show={showPopup}>
                <SanjxImg />
                <Content>
                    <div>
                        <TextStyle color={'#24282B'} size={20}>{t('right_title1')}</TextStyle>
                        <TextStyle color={'#6A6969'} size={16}>{t('right_1_text1')} </TextStyle>
                    </div>
                    <div>
                        <TextStyle color={'#24282B'} size={20}>{t('right_title2')}</TextStyle>
                        <TextStyle color={'#6A6969'} size={16}>
                            {t('right_2_text1')}<br />
                            {t('right_2_text2')}<br />
                            {t('right_2_text3')}<br />
                            {t('right_2_text4')}<br />
                            {t('right_2_text5')}<br />
                            {t('right_2_text6')}
                         </TextStyle> 
                    </div>
                    <div>
                        <TextStyle color={'#24282B'} size={20}>{t('right_title3')}</TextStyle>
                        <TextStyle color={'#6A6969'} size={16}>
                            {t('right_3_text1')}
                         </TextStyle> 
                    </div>
                    <div>
                        <TextStyle color={'#24282B'} size={20}>{t('right_title4')}</TextStyle>
                        <TextStyle color={'#6A6969'} size={16}>
                            {t('right_4_text1')}<br />
                            {t('right_4_text2')}<br />
                            {t('right_4_text3')}<br />
                         </TextStyle> 
                    </div>
                </Content>
            </Popup>
        </Container>
    );
};

export default RightTooltip;
