import styled from 'styled-components';

export const Container = styled.div`
    box-sizing: border;
    width: 100%;
    max-width: 750px;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 10px 10px;
    border-radius: 10px 10px 0 0;
`;

export const Info = styled.div`
    display: flex;
    width: auto;

    @media (max-width: 750px) {
        margin-bottom: 50px;
        align-items: center;
    }
`;

export const LogoLink = styled.a`
    display: block;
`;

export const InfoArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 2px 0;

    @media (max-width: 750px) {
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
`;

export const GridArea = styled.div`
    max-width: 750px;
    display: flex;
    flex: 1;
    justify-content: center;

    @media (max-width: 750px) {
        justify-content: center;
        margin: 0 20px;
    }
`;

export const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;

    @media (max-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
    }

`;

