import styled from 'styled-components';

const Skeleton = styled.div`
    width: ${(props) => props.width? props.width + 'px' : '100%' };
    height: ${(props) => props.height? props.height + 'px' : '100%' };
    background: linear-gradient(90deg,
        rgba(190, 190, 190, 0.1) 25%,
        rgba(129, 129, 129, 0.2) 37%,
        rgba(190, 190, 190, 0.1) 63%);
    background-size: 400% 100%;
    background-color: #f1f2f3;
    animation: skeleton-loading 1.4s ease infinite;
    border-radius: 6px;
`

export{
    Skeleton
} 