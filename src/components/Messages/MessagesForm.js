import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Button, Input } from 'semantic-ui-react'
import firebase from '../../firebase'
import FileModal from './FileModal'
import uuidv4 from 'uuidv4'
import ProgressBar from './ProgressBar'

class MessagesForm extends Component {
    state = {
        message: '',
        loading: false,
        errors: [],
        modal: false,
        uploadState: '',
        uploadTask: null,
        storageRef: firebase.storage().ref(),
        percentUploaded: 0
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    createMessage = (fileURL = null) => {
        const { currentUser } = this.props
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: currentUser.uid,
                name: currentUser.displayName,
                avatar: currentUser.photoURL
            }
        }
        if (fileURL !== null) {
            message['image'] = fileURL
        }
        if (this.state.message.length > 0) {
            message['content'] = this.state.message
        }

        return message
    }

    sendMessageHandler = () => {
        const { messagesRef, currentChannel } = this.props;
        const { message } = this.state;

        if (message.length>0) {
            this.setState({ loading: true });
            messagesRef.child(currentChannel.id).push()
                .set(this.createMessage())
                .then(() => {
                    this.setState({ loading: false, message: '', errors: [] })
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(error)
                    })
                })
        } else {
            this.setState({
                errors: this.state.errors.concat({message:"Add a message!"})
            })
        }

    }

    uploadFileHandler = (file, metadata) => {
        const pathToUpload = this.props.currentChannel.id;
        const ref = this.props.messagesRef;
        const filePath = `chat/public/${uuidv4()}.jpg`;

        this.setState(
            {
                uploadState: "uploading",
                uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
            },
            () => {
                this.state.uploadTask.on(
                    "state_changed",
                    snap => {
                        const percentUploaded = Math.round(
                            (snap.bytesTransferred / snap.totalBytes) * 100
                        );
                        this.setState({ percentUploaded });
                    },
                    err => {
                        console.error(err);
                        this.setState({
                            errors: this.state.errors.concat(err),
                            uploadState: "error",
                            uploadTask: null
                        });
                    },
                    () => {
                        this.state.uploadTask.snapshot.ref
                            .getDownloadURL()
                            .then(downloadUrl => {
                                this.sendFileMessage(downloadUrl, ref, pathToUpload);
                            })
                            .catch(err => {
                                console.error(err);
                                this.setState({
                                    errors: this.state.errors.concat(err),
                                    uploadState: "error",
                                    uploadTask: null
                                });
                            });
                    }
                );
            }
        );
    }

    sendFileMessage = (fileURL, ref, pathToUpload) => {
        ref.child(pathToUpload).push().set(this.createMessage(fileURL))
            .then(() => {
                this.setState({ uploadState: 'done' })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errors: this.state.errors.concat(error)
                })
            })

    }

    openModalHandler = () => this.setState({ modal: true })

    closeModalHandler = () => this.setState({ modal: false })




    render() {
        const { errors, modal, loading, uploadState, percentUploaded } = this.state
        return (
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    style={{ marginBottom: '0.7em' }}
                    label={<Button icon={'add'} />}
                    labelPosition="left"
                    placeholder="write your message"
                    onChange={(event) => this.changeHandler(event)}
                    value={this.state.message}
                    className={errors.some(error => error.message.includes('message')) ? 'error' : ''}
                />
                <Button.Group icon widths="2">
                    <Button
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                        onClick={() => this.sendMessageHandler()}
                        disabled={loading}
                    />

                    <Button
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                        onClick={this.openModalHandler}
                        disabled={uploadState==='uploading'}
                    />
                </Button.Group>
                <FileModal
                    modal={modal}
                    close={this.closeModalHandler}
                    upload={this.uploadFileHandler}
                />
                <ProgressBar
                uploadState={uploadState}
                percentUploaded={percentUploaded} 
                />

            </Segment>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentChannel: state.channel.currentChannel,
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(MessagesForm)