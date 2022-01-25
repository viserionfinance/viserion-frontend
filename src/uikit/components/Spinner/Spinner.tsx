import React from 'react'
import styled, {keyframes} from 'styled-components'
import {SpinnerProps} from './types'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(10px);
	}
	100% {
		transform: translatey(0px);
	}
`

const Container = styled.div`
  position: relative;
`

const RotatingPancakeIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${rotate} 2s linear infinite;
  transform: translate3d(0, 0, 0);
`

const Spinner: React.FC<SpinnerProps> = () => {
    return (
        <Container>
            <RotatingPancakeIcon>
                <img src="./logo.png" alt="logo" width="40px"/>
            </RotatingPancakeIcon>
        </Container>
    )
}

export default Spinner
