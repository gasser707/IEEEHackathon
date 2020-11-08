import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 50%;
  padding: 8px;
  margin-right: 8px;
  background-color: ${props => props.isDragging ? 'lightGreen' : 'white'};
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  
  &:focus {
    outline: none;
    border-color: red;
  }
`;

export default class Task extends React.Component {
  render() {
    return (
    <Draggable draggableId={this.props.task.id} index={this.props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {this.props.task.content}
        </Container>
      )}
    </Draggable>
    );
  }
}