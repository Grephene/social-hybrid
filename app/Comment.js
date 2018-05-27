import React from 'react'
import { TableRow, TableCell, Text, theme } from '@aragon/ui'
import styled from 'styled-components'

const Comment = ({ comment }) => (
  <TableRow>
    <TableCell>
      <Avatar>
        <img src={comment.author.profilePhoto} width='32' style={{
          borderRadius: 16
        }} />
      </Avatar>
    </TableCell>
    <TableCell>
      <Text><strong>{comment.author.name}</strong></Text>
    </TableCell>
    <TableCell>
      <Text>{comment.text}</Text>
    </TableCell>
    <TableCell>
      <Text>{comment.time}</Text>
    </TableCell>
  </TableRow>
)

const StyledComment = styled(Comment)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Avatar = styled.div`
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

export default StyledComment
