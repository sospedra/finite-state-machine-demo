import React from 'react'

import { Text, Emoji, Button } from '../styled'
import { events } from '../machine'

export default (props) => (
  <React.Fragment>
    <Text>
      <Emoji is={props.user.gender} /> {props.user.name}
    </Text>
    <Button onClick={() => props.transition(events.FETCH)}>
      Find another
    </Button>
  </React.Fragment>
)
