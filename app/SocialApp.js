import React from 'react'
import Aragon, { providers } from '@aragon/client'
import { AragonApp } from '@aragon/ui'
import styled from 'styled-components'

import AllComments from './AllComments'

const AppContainer = styled(AragonApp)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SocialApp = ({ observable, app, userAccount }) => (
  <AppContainer>
    <AllComments />
  </AppContainer>
)

export default SocialApp
