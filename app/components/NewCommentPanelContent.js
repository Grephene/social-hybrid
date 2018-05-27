import React from 'react'
import styled from 'styled-components'
import { Button, Info, Text, TextInput, Field } from '@aragon/ui'

const initialState = {
  question: '',
}

class NewCommentPanelContent extends React.Component {
  static defaultProps = {
    onPostComment: () => {},
  }
  state = {
    ...initialState,
  }
  componentWillReceiveProps({ opened }) {
    if (opened && !this.props.opened) {
      // setTimeout is needed as a small hack to wait until the input's on
      // screen until we call focus
      this.questionInput && setTimeout(() => this.questionInput.focus(), 0)
    } else if (!opened && this.props.opened) {
      // Finished closing the panel, so reset its state
      this.setState({ ...initialState })
    }
  }
  handleQuestionChange = event => {
    this.setState({ question: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.onPostComment(this.state.question.trim())
  }
  render() {
    const { question } = this.state
    return (
      <div>
        <Info.Action title="On-chain comments are forever!">
          Once posted to the blockchain, they can never be taken down.
        </Info.Action>
        <Form onSubmit={this.handleSubmit}>
          <Field label="Message">
            <TextInput
              innerRef={question => (this.questionInput = question)}
              value={question}
              onChange={this.handleQuestionChange}
              required
              wide
            />
          </Field>
          <Button mode="strong" type="submit" wide>
            Send Message
          </Button>
          <Warning>You may be held accountable for what you say!</Warning>
        </Form>
      </div>
    )
  }
}

const Form = styled.form`
  margin-top: 20px;
`

const Warning = styled(Text.Paragraph).attrs({
  size: 'xsmall',
})`
  margin-top: 10px;
`

export default NewCommentPanelContent
