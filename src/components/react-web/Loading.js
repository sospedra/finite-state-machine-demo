import React from 'react'

import { Text, Emoji, Button } from './styled'

export default (props) => (
  <React.Fragment>
    <Text><Emoji is='👀' /></Text>
    <Button disabled>
      Searching...
    </Button>
  </React.Fragment>
)
