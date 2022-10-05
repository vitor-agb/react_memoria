import styled from 'styled-components';

export const Container = styled.div`
    margin: 5px 0;
`;

export const Label = styled.div`
    font-size: 15px;
    color: #6a7d8b;
`;

export const Value = styled.div`
    font-size: 37px;
    font-weight: bold;
    color: #101c40;

    @media (max-width: 425px) {
        font-size: 25px;
    }
`;