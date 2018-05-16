import React from 'react'

import { Text, Button, Emoji } from '../styled'
import { events } from '../machine'

export default (props) => (
  <React.Fragment>
    <Text>Let's do a search <Emoji is='🕵🏻‍♂️' /></Text>
    <Button onClick={() => props.transition(events.FETCH)}>
      Find new one!
    </Button>
  </React.Fragment>
)
