import React from 'react'
import { TextInput, Text, theme } from '@aragon/ui'
import styled from 'styled-components'

const PostComment = ({ author }) => (
  <div>
    <Text.Block size="xxlarge">Post a comment</Text.Block>
    <Comment>
      <img
        src={author.profilePhoto}
        width="32"
        style={{
          borderRadius: 16,
        }}
      />
      <TextInput />
    </Comment>
  </div>
)

const StyledPostComment = styled(PostComment)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Comment = styled.div`
  margin-right: 20px;
  canvas {
    display: block;
    border: 1px solid ${theme.contentBorder};
    border-radius: 16px;
  }
  & + div {
    a {
      color: ${theme.accent};
    }
  }
`

export default StyledPostComment
