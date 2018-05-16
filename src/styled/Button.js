import styled from 'styled-components'

export default styled.button`
  background-color: ${({ disabled }) => disabled ? '#bdc3c7' : '#2980b9'};
  border-radius: 3px;
  border: none;
  color: white;
  font-family: monospace;
  font-size: 16px;
  padding: 8px;
  cursor: ${({ disabled }) => disabled ? 'progress' : 'pointer'};;

  &:focus {
    outline: none;
  }
`
