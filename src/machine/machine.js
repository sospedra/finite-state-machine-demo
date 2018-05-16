import React from 'react'

export const withMachine = (machine) => (Component) => {
  return class StateMachine extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        commands: {},
        machineState: machine.initial()
      }
    }

    registerCommands () {
      return (commands) => this.setState({ commands })
    }

    transition (current) {
      return (action) => {
        const next = machine.transition(current)(action)
        const command = this.state.commands[machine.action(next)]

        this.setState({ machineState: next }, command)
      }
    }

    render () {
      return <Component
        {...this.props}
        commands={this.registerCommands()}
        machineState={this.state.machineState}
        transition={this.transition(this.state.machineState)}
      />
    }
  }
}

export default ({ states, initial }) => {
  const machine = function () {}
  const history = []

  machine.action = (current) => states[current].action
  machine.history = () => history
  machine.initial = () => initial
  machine.transition = (current = initial) => {
    return (action) => {
      const next = states[current].on[action]

      if (next) {
        history.push(next)
        return next
      } else {
        return current
      }
    }
  }

  return machine
}
