import styled from "styled-components";

type ContainerProps = {
    showBackground: boolean;
}
export const Container = styled.div<ContainerProps>`
    background-color: ${props=> props.showBackground ? '#ff9505' : '#ffb627'};
    height: 100px;
    border-radius: 20px;;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

type IconProps = {
    opacity?: number;
}
export const Icon = styled.img<IconProps>`
    width: 60px;
    height: 60px;
    opacity: ${props => props.opacity ? props.opacity : 1} // ou pode ser assim "props.opacity ?? 1" resumidamente. quando e ele mesmo.
`;