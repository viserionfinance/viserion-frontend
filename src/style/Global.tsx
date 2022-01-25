import {createGlobalStyle} from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import {PancakeTheme} from 'uikit/theme'

declare module 'styled-components' {
    /* eslint-disable @typescript-eslint/no-empty-interface */
    export interface DefaultTheme extends PancakeTheme {
    }
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Viserion';
  }
  body {
    background-color: ${({theme}) => theme.colors.background};
    color: #fff;
    background-image: url("images/bg.png");
    img {
      height: auto;
      max-width: 100%;
    }
    .whitelist{
      width: 750px !important;
      height: 450px;
      background-image: url('images/whitelist-banner.png');
      background-size: 100% 100%;
      @media (max-width: 700px){
        background-image: url('images/whitelist-banner-mobile.png');
        width: 350px !important;
        height: 570px;
      }
      .ant-modal-content{
        background-color: transparent;
        width: 100%;
        height: 100%;
        box-shadow: unset;
      }
      .ant-modal-body{
        width: 100%;
        height: 100%;
        .join{
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
      }
    }
    .logo-header{
      height: 120px;
    }
    .socials-menu{
      display: flex;
      margin-right: 18px;
      div{
        margin: auto;
      }
    }
  }
`

export default GlobalStyle
