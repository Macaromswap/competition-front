import styled from 'styled-components'
import { TextStyle } from '../../components/Text/TextCss'
import gitBook from "../../assets/app/GitBook.svg"
import github from "../../assets/app/Github.svg"
import medium from "../../assets/app/Medium.svg";
import telegram from "../../assets/app/Telegram.svg";
import twitter from "../../assets/app/Twitter.svg";
import { useTranslation } from 'react-i18next';
import { goLink } from "../../utils";

const Wrapper = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 20px 120px;
    border-radius: 20px 20px 0px 0px;
    border-top: 4px solid rgb(0, 0, 0);
    background: rgb(255, 255, 255);
    flex-wrap: wrap;
    // position: absolute;
    // bottom: 0;
    @media screen and (max-width: 960px) {
        padding: 20px 16px 0px;
        justify-content: center;
    }
`
const WrapFlex = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 20px;
    @media screen and (max-width: 560px) {
        flex-wrap: wrap;
        justify-content: space-around;
        margin-bottom: 20px;
    }
`
const ImgStyle = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
`
const DivStyle = styled.div`
    cursor: pointer;
`

function PageBottom() {
    const { t, i18n } = useTranslation();
    const label = [
        {value: t('documentation'), link: 'doc'},
        {value: t('documentation'), link: 'doc'},
        {value: t('documentation'), link: 'doc'},
        {value: t('documentation'), link: 'doc'},
        {value: t('documentation'), link: 'doc'},
    ]
    return(
        <Wrapper>
            <WrapFlex>
                <ImgStyle onClick={() => goLink('x')} src={twitter} />
                <ImgStyle onClick={() => goLink('medium')} src={medium} />
                <ImgStyle onClick={() => goLink('tg')} src={telegram} />
                <ImgStyle onClick={() => goLink('github')} src={github} />
                <ImgStyle onClick={() => goLink('gitbook')} src={gitBook} />
            </WrapFlex>
            <WrapFlex>
                <DivStyle onClick={() => goLink('doc')}>
                    <TextStyle color={'#0b0f17'} size={16}>{t('documentation')}</TextStyle>
                </DivStyle>
                <DivStyle onClick={() => goLink('security')}>
                    <TextStyle color={'#0b0f17'} size={16}>{t('security')}</TextStyle>
                </DivStyle>
                <DivStyle onClick={() => goLink('brandKit')}>
                    <TextStyle color={'#0b0f17'} size={16}>{t('brandKit')}</TextStyle>
                </DivStyle>
                <DivStyle>
                    <TextStyle color={'#0b0f17'} size={16}>{t('ecosystem1')}</TextStyle>
                </DivStyle>
                <DivStyle>
                    <TextStyle color={'#0b0f17'} size={16}>{t('tokenlist')}</TextStyle>
                </DivStyle>
            </WrapFlex>
        </Wrapper>
    )
}

export default PageBottom