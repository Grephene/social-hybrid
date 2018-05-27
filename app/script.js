// import Aragon from '@aragon/client'
// import { combineLatest } from './rxjs'
// // import voteSettings, { hasLoadedVoteSettings } from './vote-settings'
// // import { EMPTY_CALLSCRIPT } from './vote-utils'

// const sortedIndexBy = require('lodash.sortedindexby')

// const app = new Aragon()

// console.debug('we in script.js whats good')

// // Hook up the script as an aragon.js store
// app.store(async (state, { event, returnValues }) => {
//   let nextState = {
//     ...state,
//     // Fetch the app's settings, if we haven't already
//     // ...(!hasLoadedSocialSettings(state) ? await loadSocialSettings() : {}),
//   }

//   console.debug('Received event')
//   console.debug(event)
//   console.debug('returnValues')
//   console.debug(returnValues)

//   switch (event) {
//     case 'Message':
//       nextState = await displayMessage(nextState, returnValues)
//       break
//     default:
//       break
//   }

//   console.log('finally, the next state is....')
//   console.log(nextState)
//   return nextState
// })

// /***********************
//  *                     *
//  *   Event Handlers    *
//  *                     *
//  ***********************/
// async function displayMessage(state, { text, user, time }) {
//   console.debug('we in displayMessage')
//   console.debug('text: %s', text)
//   console.debug('user: %s', user)
//   console.debug('time: %s', time)
//   //parse msg
//   // empty for now...

//   //parse user
//   const nick = await app.nicknames(user)
//   const pic = await app.profilePics(user)
//   console.debug('nick')
//   console.debug(nick)
//   console.debug('pic')
//   console.debug(pic)
//   time = parseInt(time, 10) * 1000
//   return updateState(state, { text, user, time, nick, pic }, msgInfo => msgInfo)
// }

// // async function castVote(state, { voteId }) {
// //   // Let's just reload the entire vote again,
// //   // cause do we really want more than one source of truth with a blockchain?
// //   const transform = async vote => ({
// //     ...vote,
// //     data: await loadVoteData(voteId),
// //   })
// //   return updateState(state, voteId, transform)
// // }
// //
// // async function executeVote(state, { voteId }) {
// //   const transform = ({ data, ...vote }) => ({
// //     ...vote,
// //     data: { ...data, executed: true },
// //   })
// //   return updateState(state, voteId, transform)
// // }
// //
// // async function startVote(state, { voteId }) {
// //   return updateState(state, voteId, vote => vote)
// // }

// /***********************
//  *                     *
//  *       Helpers       *
//  *                     *
//  ***********************/
// // async function loadVoteDescription(vote) {
// //   if (!vote.script || vote.script === EMPTY_CALLSCRIPT) {
// //     return vote
// //   }
// //
// //   const path = await app.describeScript(vote.script).toPromise()
// //
// //   vote.description = path
// //     .map(step => {
// //       const identifier = step.identifier ? ` (${step.identifier})` : ''
// //       const app = step.name ? `${step.name}${identifier}` : `${step.to}`
// //
// //       return `${app}: ${step.description || 'No description'}`
// //     })
// //     .join('\n')
// //
// //   return vote
// // }

// // function loadVoteData(voteId) {
// //   return new Promise(resolve => {
// //     combineLatest(app.call('getVote', voteId), app.call('getVoteMetadata', voteId))
// //       .first()
// //       .subscribe(([vote, metadata]) => {
// //         loadVoteDescription(vote).then(vote => {
// //           resolve({
// //             ...marshallVote(vote),
// //             metadata,
// //           })
// //         })
// //       })
// //   })
// // }

// // async function updateVotes(votes, voteId, transform) {
// //   const voteIndex = votes.findIndex(vote => vote.voteId === voteId)
// //
// //   if (voteIndex === -1) {
// //     // If we can't find it, load its data, perform the transformation, and concat
// //     return votes.concat(
// //       await transform({
// //         voteId,
// //         data: await loadVoteData(voteId),
// //       }),
// //     )
// //   } else {
// //     const nextVotes = Array.from(votes)
// //     nextVotes[voteIndex] = await transform(nextVotes[voteIndex])
// //     return nextVotes
// //   }
// // }

// async function updateState(state, msgInfo, transform) {
//   console.debug('oh shit, time to update state!')
//   console.debug('msgInfo')
//   console.debug(msgInfo)
//   const { messages = [] } = state

//   return {
//     ...state,
//     messages: await updateMessages(messages, msgInfo, transform),
//   }
// }

// async function updateMessages(messages, msgInfo, transform) {
//   console.debug('but first, messaging')
//   console.debug('msgInfo')
//   console.debug(msgInfo)
//   const nextMsgs = Array.from(messages)
//   console.debug('nextMsgs')
//   console.debug(nextMsgs)
//   let msgIndex = sortedIndexBy(nextMsgs, msgInfo, 'time')
//   console.debug('msgIndex')
//   console.debug(msgIndex)
//   nextMsgs.splice(msgIndex, 0, msgInfo)
//   console.debug('nextMsgs (after splicing)')
//   console.debug(nextMsgs)

//   nextMsgs[msgIndex] = await transform(nextMsgs[msgIndex])
//   console.debug('nextMsgs (after transform)')
//   console.debug(nextMsgs)
//   return nextMsgs
// }

// // function loadSocialSettings() {
// //   return Promise.all(
// //     voteSettings.map(
// //       ([name, key, type = 'string']) =>
// //         new Promise((resolve, reject) =>
// //           app
// //             .call(name)
// //             .first()
// //             .map(val => {
// //               if (type === 'number') {
// //                 return parseInt(val, 10)
// //               }
// //               if (type === 'time') {
// //                 // Adjust for js time (in ms vs s)
// //                 return parseInt(val, 10) * 1000
// //               }
// //               return val
// //             })
// //             .subscribe(value => {
// //               resolve({ [key]: value })
// //             }, reject),
// //         ),
// //     ),
// //   )
// //     .then(settings => settings.reduce((acc, setting) => ({ ...acc, ...setting }), {}))
// //     .catch(err => {
// //       console.error('Failed to load Vote settings', err)
// //       // Return an empty object to try again later
// //       return {}
// //     })
// // }
// //
// // // Apply transmations to a vote received from web3
// // // Note: ignores the 'open' field as we calculate that locally
// // function marshallVote({
// //   creator,
// //   executed,
// //   minAcceptQuorum,
// //   nay,
// //   snapshotBlock,
// //   startDate,
// //   totalVoters,
// //   yea,
// //   script,
// //   description,
// // }) {
// //   return {
// //     creator,
// //     executed,
// //     minAcceptQuorum: parseInt(minAcceptQuorum, 10),
// //     nay: parseInt(nay, 10),
// //     snapshotBlock: parseInt(snapshotBlock, 10),
// //     startDate: parseInt(startDate, 10) * 1000, // adjust for js time (in ms vs s)
// //     totalVoters: parseInt(totalVoters, 10),
// //     yea: parseInt(yea, 10),
// //     script,
// //     description,
// //   }
// // }
