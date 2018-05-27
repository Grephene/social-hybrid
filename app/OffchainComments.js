import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Table, TableHeader, TableRow } from '@aragon/ui'
import Comment from './Comment'
import PostComment from './PostComment'

const fakeAuthor = {
  name: '',
  address: '0x',
  profilePhoto: 'https://s3.amazonaws.com/workflo/ethba/Love.jpeg',
}

const OffchainComments = ({ data, messages }) => {
  if (data.loading) return <div>Loading...</div>
  const { commentThreads } = data
  const comments = commentThreads[0]
  return (
    <div>
      <Table
        header={
          <TableRow>
            <TableHeader title="Facebook User" />
          </TableRow>
        }
      >
        {comments &&
          [...comments.comments].map(comment => (
            <Comment comment={comment} key={comment.time} />
          ))}
      </Table>
    </div>
  )
}

export default graphql(gql`
  query {
    commentThreads(where: { id: "cjhnmgvq8qn9g0b62a00dz1hl" }) {
      comments {
        author {
          name
          address
          profilePhoto
        }
        text
        time
      }
    }
  }
`)(OffchainComments)
