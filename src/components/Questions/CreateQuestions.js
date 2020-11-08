import React from "react";
import firebase from "../../firebase";
import { Modal, Form, Input, Button, Icon, Container, Header, Grid, Card } from 'semantic-ui-react';

export default class CreateQuestions extends React.Component {
    state = {
        questions: [],
        questionsRef: firebase.database().ref("questions"),
        modal: false,
        title1: "",
        title2: "",
        elements: ""
    };

    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    addQuestion = () => {
        const { questionsRef, title1, title2, elements } = this.state;

        const key = questionsRef.push().key;


        const newQuestion = {
            id: key,
            title1,
            elements
        };

        if (title2.length > 0) {
            newQuestion.title2 = title2;
        }

        questionsRef
            .child(key)
            .update(newQuestion)
            .then(() => {
                this.setState({ channelName: "", channelDetails: "" });
                this.closeModal();
                console.log("channel added");
            })
            .catch(err => {
                console.error(err);
            });
    };


    isFormValid = ({ title1, elements }) =>
        title1 && elements;

    addListeners = () => {
        let questions = [];
        this.state.questionsRef.on("child_added", snap => {
            questions.push(snap.val());
            this.setState({ questions });
        });
    };

    closeModal = () => this.setState({ modal: false });
    openModal = () => this.setState({ modal: true });



    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.addQuestion();
        }
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    removeListeners = () => {
        this.state.questionsRef.off();
    };

    render() {
        return (
            <React.Fragment>
                <Grid>
                    <Grid.Column>
                        <Container style={{ height: 500, textAlign: 'center' }}>
                            <div style={{paddingTop:150}}>
                                <Header as="h2">Create A new Question</Header>
                                <Button color="green" inverted onClick={this.openModal}>
                                    <Icon name="add" /> Add
                            </Button>

                            <Card fluid>
                    <Card.Content header="Want to share the screen with your students?" />
                    <Card.Content description={
                   <Button
                   color='teal'
                   icon='tv'
                   label={{ basic: true, color: 'teal', pointing: 'left', content: 'Share Now!' }}
                 />
                        
                    } />
                </Card>
                            </div>
                        </Container>

                        <Modal basic open={this.state.modal} onClose={this.closeModal}>
                            <Modal.Header>Add a Question</Modal.Header>
                            <Modal.Content>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Field>
                                        <Input
                                            fluid
                                            label="Description of question"
                                            name="title1"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                        <Input
                                            fluid
                                            label="(Optional second description)"
                                            name="title2"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Input
                                            fluid
                                            label="Elements of answer"
                                            name="elements"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                </Form>
                            </Modal.Content>

                            <Modal.Actions>
                                <Button color="green" inverted onClick={this.handleSubmit}>
                                    <Icon name="checkmark" /> Add
              </Button>
                                <Button color="red" inverted onClick={this.closeModal}>
                                    <Icon name="remove" /> Cancel
              </Button>
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                </Grid>
            </React.Fragment >
        );
    }
}