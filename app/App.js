import React from 'react'
import PropTypes from 'prop-types'
import Aragon, { providers } from '@aragon/client'
import { AragonApp, AppBar, Button, SidePanel, observe } from '@aragon/ui'
import EmptyState from './screens/EmptyState'
import AppLayout from './components/AppLayout'
import NewCommentPanelContent from './components/NewCommentPanelContent'
import styled from 'styled-components'
import { networkContextType } from './utils/provideNetwork'
import { hasLoadedVoteSettings } from './vote-settings'

import OffchainComments from './OffchainComments'
import OnchainComments from './OnchainComments'

class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  }
  static defaultProps = {
    userAccount: '',
    messages: [],
  }
  static childContextTypes = {
    network: networkContextType,
  }
  getChildContext() {
    return { network: this.props.network }
  }

  constructor(props) {
    super(props)
    this.state = {
      createVoteVisible: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { settingsLoaded } = this.state
    // Is this the first time we've loaded the settings?
    if (!settingsLoaded && hasLoadedVoteSettings(nextProps)) {
      this.setState({
        settingsLoaded: true,
      })
    }
    if (nextProps.messages !== this.props.messages) {
      this.setState({
        messages: nextProps.messages,
      })
    }
  }

  handlePostComment = text => {
    this.props.app.postComment(text)
    this.handleCreateVoteClose()
  }
  handleCreateVoteOpen = () => {
    this.setState({ createVoteVisible: true })
  }
  handleCreateVoteClose = () => {
    this.setState({ createVoteVisible: false })
  }

  render() {
    console.log('SocialApp render')
    const { app, userAccount, votes, messages } = this.props
    const { createVoteVisible } = this.state
    console.log('props')
    console.log(this.props)
    console.log('state')
    console.log(this.state)

    const displayMessage = messages.length > 0
    console.log('displayMessage')
    console.log(displayMessage)

    return (
      <AragonApp publicUrl="/aragon-ui/">
        <AppLayout>
          <AppLayout.Header>
            <AppBar
              title="Social"
              endContent={
                <Button mode="strong" onClick={this.handleCreateVoteOpen}>
                  New Message
                </Button>
              }
            />
          </AppLayout.Header>
          <AppLayout.ScrollWrapper>
            <AppLayout.Content>
              <OnchainComments messages={messages} />
              <OffchainComments />
            </AppLayout.Content>
          </AppLayout.ScrollWrapper>
        </AppLayout>

        <SidePanel
          title="New Comment"
          opened={createVoteVisible}
          onClose={this.handleCreateVoteClose}
        >
          <NewCommentPanelContent
            opened={createVoteVisible}
            onPostComment={this.handlePostComment}
          />
        </SidePanel>
      </AragonApp>
    )
  }
}

export default observe(observable => observable.map(state => ({ ...state })), {})(App)
