/* global it, expect */
import React from 'react'
import renderer from 'react-test-renderer'

import { machine, App } from '../App'
import Machine, { withMachine } from '../machine'

it('should render all the possible states', () => {
  Object.keys(machine.states).forEach((initial) => {
    const stateMachine = { ...machine, initial }
    const Automata = withMachine(Machine(stateMachine))(App)
    const wrapper = renderer.create(<Automata />)

    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
