import React, { useState } from 'react';
import styled from 'styled-components';
import question from "../../assets/img/question.png";
import { ReactComponent as ImgIcon } from '../../assets/img/sanjx.svg'
import { TextStyle } from '../../components/Text/TextCss'

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
                        <TextStyle color={'#24282B'} size={20}>Rewards</TextStyle>
                        <TextStyle color={'#6A6969'} size={16}>All rewards will be sent out within 5 Working Days after the end of the Competition. </TextStyle>
                    </div>
                    <div>
                        <TextStyle color={'#24282B'} size={20}>Section II - Trading Volume </TextStyle>
                        <TextStyle color={'#6A6969'} size={16}>
                            Gold: 10,000,000 $CBDs<br />
                            Silver: 5,000,000 $CBDs<br />
                            Bronze: 3,000,000 $CBDs<br />
                            Top 4-11: 1,000,000 $CBDs for each winner<br />
                            Top 12-21: 600,000 $CBDs for each winner<br />
                            Top 22-121: 180,000 $CBDs and 500 veMACAs for each winner
                         </TextStyle> 
                    </div>
                    <div>
                        <TextStyle color={'#24282B'} size={20}>Sunny Award:  </TextStyle>
                        <TextStyle color={'#6A6969'} size={16}>
                            All participants who are not in the winner list above but traded a minimum amount of $100 AND hold at least 100 CBD tokens will split a Prize Pool of  50,000,000 CBD tokens!  Each Prize Pool Share is 10,000 CBD tokens, with a total number of 5000 winners!~  FCFS!
                         </TextStyle> 
                    </div>
                    <div>
                        <TextStyle color={'#24282B'} size={20}>How to Participate  </TextStyle>
                        <TextStyle color={'#6A6969'} size={16}>
                            1. Log in: Ensure you're logged into Macaron.Connect wallet to Bitlayer Mainnet. <br />
                            2. Trade: Engage in trading the CBD/BTC pair. <br />
                            3. There is no minimum trading volume restriction.<br />
                         </TextStyle> 
                    </div>
                </Content>
            </Popup>
        </Container>
    );
};

export default RightTooltip;
