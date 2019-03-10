import React from 'react'

import { events } from '../../machine'
import { Text, Button, Emoji } from './styled'

export default (props) => (
  <React.Fragment>
    <Text>Let's do a search <Emoji is='🕵🏻‍♂️' /></Text>
    <Button onClick={() => props.transition(events.FETCH)}>
      Find new one!
    </Button>
  </React.Fragment>
)
