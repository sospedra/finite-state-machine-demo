import React from 'react'

import Error from './components/Error'
import Idle from './components/Idle'
import Loading from './components/Loading'
import User from './components/User'
import { Main, Text } from './styled'
import { fetchUser } from './repository'
import Machine, {
  events,
  actions,
  states,
  withMachine
} from './machine'

export const machine = {
  initial: states.IDLE,
  states: {
    [states.IDLE]: {
      on: {
        [events.FETCH]: states.FETCHING
      }
    },
    [states.FETCHING]: {
      on: {
        [events.FULFILL]: states.SUCCESS,
        [events.FAIL]: states.FAILURE
      },
      action: actions.FETCH_USER
    },
    [states.SUCCESS]: {
      on: {
        [events.FETCH]: states.FETCHING
      }
    },
    [states.FAILURE]: { on: {} }
  }
}

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { user: {} }

    // Add commands listeners
    props.commands({
      [actions.FETCH_USER]: () => this.fetchUser()
    })
  }

  async fetchUser () {
    try {
      const user = await fetchUser()

      this.setState({ user }, () => {
        this.props.transition(events.FULFILL)
      })
    } catch (e) {
      this.props.transition(events.FAIL)
    }
  }

  renderFromMachine () {
    switch (this.props.machineState) {
      case states.IDLE: return <Idle
        transition={this.props.transition}
      />
      case states.FETCHING: return <Loading />
      case states.SUCCESS: return <User
        user={this.state.user}
        transition={this.props.transition}
      />
      case states.FAILURE:
      default:
        return <Error />
    }
  }

  render () {
    return (
      <Main>
        <Text>State: {this.props.machineState}</Text>
        {this.renderFromMachine()}
      </Main>
    )
  }
}

export default withMachine(Machine(machine))(App)
