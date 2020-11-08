import React from "react";
import firebase from "../../firebase";
import { Card, Icon, Button, Header } from 'semantic-ui-react';
import HQuestion from './HQuestion';
import VQuestion from './VQuestion';
import Reward from 'react-rewards';
import data1 from "./data1";
import data2 from "./data2";
import data3 from "./data3";
import CanvasDraw from "react-canvas-draw";


export default class DisplayQuestions extends React.Component {
    state = {
        questions: [{ id: 1, title1: "Arrange letters to get a fruit", data: data1, orientation: 'h' },
        { id: 2, title1: "Arrange The planets from smallest to biggest", data: data2, orientation: 'v' },
        { id: 3, title1: "Separate the fruits and the vegetables", data: data3, orientation: 'v' }
        ],
        questionsRef: firebase.database().ref("questions"),

    };

    componentDidMount() {
        // this.addListeners();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    verifyAnswer = (index) => {
        if (index % 2 === 0)
            this.reward.rewardMe();
        // to "punish" user :
        else
            this.reward.punishMe();

    };

    removeListeners = () => {
        this.state.questionsRef.off();
    };


    render() {
        return (
            <div>
                <Header as="h2" content="Your Teacher put some exercises just for you!" style={{marginBottom:30, marginTop:20}}/>
                {
                    this.state.questions.map((question, index) =>
                        <Card key={question.id} fluid>
                            <Card.Content header={question.title1} />
                            <Card.Content description={question.orientation === "h" ? <HQuestion data={question.data} /> : <VQuestion data={question.data} />} />
                            <Card.Content extra>
                                <Reward
                                    ref={(ref) => { this.reward = ref; }}
                                    type='confetti'
                                >
                                    <Icon name='check circle' size="big" color="blue" inverted onClick={() => this.verifyAnswer(index)} />Check Answer
                                    </Reward>
                            </Card.Content>
                        </Card>
                    )
                }
                <Card fluid>
                    <Card.Content header="Draw a cat" />
                    <Card.Content description={
                        <CanvasDraw brushRadius="8"
                        />
                    } />
                </Card>
                <Card fluid>
                    <Card.Content header="Colour this image the way you like!" />
                    <Card.Content description={
                        <CanvasDraw brushRadius="8" imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg"
                        brushColor="blue"
                        />
                    } />
                </Card>

                <Card fluid>
                    <Card.Content header="Want to share the screen with your Teacher?" />
                    <Card.Content description={
                   <Button
                   color='teal'
                   icon='tv'
                   label={{ basic: true, color: 'teal', pointing: 'left', content: 'Share Now!' }}
                 />
                        
                    } />
                </Card>

            </div>
        );
    }
}