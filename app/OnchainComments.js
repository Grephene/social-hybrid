import React from 'react'
import { Table, TableHeader, TableRow } from '@aragon/ui'
import Message from './Message'

const mockedMessges = [
  {
    text: 'This post will never die!',
    user: '0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb',
    time: 1527426549000,
    nick: '',
    pic: '',
  },
  {
    text: '',
    user: '0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb',
    time: 1527426549000,
    nick: '',
    pic: '',
  },
]

const OnchainComments = ({ messages }) => {
  console.log('messages')
  console.log(messages)
  return (
    <div>
      <Table
        header={
          <TableRow>
            <TableHeader title="Registered" />
          </TableRow>
        }
      >
        {mockedMessges.map(message => <Message message={message} key={message.time} />)}
      </Table>
    </div>
  )
}

export default OnchainComments
