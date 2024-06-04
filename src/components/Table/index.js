import styled from 'styled-components';
import { TextStyle } from '../../components/Text/TextCss'
import back from "../../assets/img/back.png";
import go from "../../assets/img/go.png";
import backBright from "../../assets/img/back-bright.png";
import goBright from "../../assets/img/go-bright.png";

const TableWrapper = styled.div `
    margin-bottom: 22px;
    // overflow: hidden;
    @media screen and (max-width: 1000px) {
        padding: 10px 0px 20px;
        border-radius: 14px;
        border: 3px solid var(--Black, #0B0F17);
        background: #FFF;
        box-shadow: 4px 4px 0px 0px #000;
    }
`
const RowShadow = styled.div `
    position: relative;
    &::after {
        content: "";
        display: block;
        width: 78.6%;
        height: 20px;
        position: absolute;
        left: 10.6%;
        top: -17px;
        z-index: 9;
        background-color: #000;
        transform: skewX(-84deg);
        @media screen and (max-width: 1000px) {
            display: none;
        }
    }
`
const ActiveStyle = styled.div.attrs(({ active }) => ({
    className: active ? 'active' : '',
}))
`
    cursor: pointer;
    display: inline-block;
    &.active{
        padding: 0 6px;
        border-radius: 6px;
    }
`

const PaginationWrapper = styled.div `
    display: flex;
    padding: 30px 0 0;
    justify-content: center;
    align-items: center;
    gap: 12px;
    @media screen and (max-width: 1000px) {
        padding: 0;
    }
`

const PaginationButton = styled.div `
    display: flex;
    padding: 6px 6px;
    align-items: center;
    gap: 10px;
    border: 2px solid var(--Text-heading, #000);
    background: #FFF;
    box-shadow: 4px 4px 0px 0px #000;
`
const PaginationButtonBack = styled.div `
    width: 46px;
    height: 46px;
    background-image: url(${back});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    opacity: ${(props) => (props.faded? 0.5 : 1)};
    cursor: pointer;
    &:hover {
        background-image: url(${backBright});
    }
    @media screen and (max-width: 600px) {
        width: 36px;
        height: 36px;
    }
`
const PaginationButtonGo = styled.div `
    width: 46px;
    height: 46px;
    background-image: url(${go});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    opacity: ${(props) => (props.faded? 0.5 : 1)};
    cursor: pointer;
    &:hover {
        background-image: url(${goBright});
    }
    @media screen and (max-width: 600px) {
        width: 36px;
        height: 36px;
    }
`

export {
    TableWrapper,
    RowShadow,
    ActiveStyle,
    PaginationWrapper,
    PaginationButtonBack,
    PaginationButton,
    PaginationButtonGo,
}