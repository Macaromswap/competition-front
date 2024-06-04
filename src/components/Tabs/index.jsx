import React from 'react';
import styled from 'styled-components';
import { TextStyle } from '../../components/Text/TextCss'

const Wrapper = styled.div`
    margin-bottom: 30px;
    @media screen and (max-width: 500px) {
        padding: 0;
        margin-bottom: 20px;
    }
`
const FlexStyle = styled.div`
    display: none;
    justify-content: space-around;
    align-items: stretch;
    border: 2px solid #000;
    box-shadow: 4px 4px 0px 0px #000;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    height: 48px;  
    border-radius: 14px;
    @media screen and (max-width: 690px) {
        display: flex;
    }
    @media screen and (min-width: 691px) {
        :nth-child(1){
            margin-left: -8px;
        }
        :nth-child(2){
            margin-right: -8px;
        }
    }
`

const StyledTabItem = styled.div`
    flex: 1;
    height: 56px;
    cursor: pointer;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => (props.active ? '#000' : '#fff')};
    transform: skewX(-22deg);
    margin: 0 -6px;
    div {
        transform: skewX(22deg);
    }
    @media screen and (max-width: 540px) {
        height: 48px;
    }
`

const TabItem = ({ label, active, onClick }) => {
    return (
        <StyledTabItem active={active} onClick={onClick}>
            <TextStyle color={active?'#fff':'#000'} size={20} hsize={14}>{label}</TextStyle>
        </StyledTabItem>
    )
}

const Tab = ({ activeTab, onTabClick, tabItems }) => {
    const handleTabClick = (tabName) => {
        onTabClick(tabName);
    }

    return (
        <Wrapper>
            <FlexStyle>
                {tabItems.map((item, index) => (
                    <TabItem
                        key={index}
                        label={item.label}
                        active={item.index === activeTab}
                        onClick={() => handleTabClick(item.index)}
                    />
                ))}
            </FlexStyle>
        </Wrapper>
    )
}

export default Tab;
