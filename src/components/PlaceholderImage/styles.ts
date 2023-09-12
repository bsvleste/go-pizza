import styled, { css } from 'styled-components/native';


export const Placeholder = styled.View`
  width:160px;
  height:160px;
  border-radius: 80px;

  justify-content: center;
  align-items: center;

  border: 1px dashed ${({ theme }) => theme.COLORS.SECONDARY_900};

`
export const PlaceHolderTitle = styled.Text`
  font-size: 14px;
  text-align: center;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color : ${theme.COLORS.SECONDARY_900};
  `}
`