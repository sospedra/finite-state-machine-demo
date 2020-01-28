import React from 'react'
import Components from './components'
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
      action: actions.FETCHING
    },
    [states.SUCCESS]: {
      on: {
        [events.FETCH]: states.FETCHING
      }
    },
    [states.FAILURE]: { on: {} }
  }
}

const { Error, Idle, Loading, User, Main, Text } = Components

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { user: {} }

    props.commands({
      [actions.FETCHING]: this.fetchUser.bind(this)
    })
  }

  async fetchUser () {
    try {
      const user = await fetchUser()
      // throw Error()

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
