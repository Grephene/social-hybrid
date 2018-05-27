import React from 'react'
import { TableRow, TableCell, Text, theme } from '@aragon/ui'
import styled from 'styled-components'

const Message = ({ message }) => (
  <TableRow>
    <TableCell>
      <Avatar>
        <img
          src={message.pic}
          width="32"
          style={{
            borderRadius: 16,
          }}
        />
      </Avatar>
    </TableCell>
    <TableCell>
      <Text>
        <strong>{message.user}</strong>
      </Text>
    </TableCell>
    <TableCell>
      <Text>{message.text}</Text>
    </TableCell>
    <TableCell>
      <Text>{new Date(message.time)}</Text>
    </TableCell>
  </TableRow>
)

const StyledMessage = styled(Message)`
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

export default StyledMessage
