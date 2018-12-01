import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { updatePicture } from '../../../redux/action';
import './profile-pic.css';

class ProfilePic extends Component {

    componentDidMount = () => {
        this.callUserInfo()
    }

    callUserInfo = () => {
        this.props.updatePicture(this.props.user.picture)
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.user.id !== prevProps.user.id) {
            this.callUserInfo()
        }
    }

    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "whzpnyeu"); // Replace the preset name with your own
            formData.append("api_key", "282516959124826"); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/dkxmyspum/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                console.log(data);
                this.props.updatePicture(fileURL);
                axios.post('/profile-picture', { url: fileURL, userID: this.props.user.id })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(err => {
                        console.log('error updating picture')
                    })
            })
        });

        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
            console.log('Image upload is complete and has save to user profile')
            console.log(this.props)
        });
    }

    render() {
        return (
            <div className="view-container" id="profile-pic-container">
                <div className="profile-pic-container">
                    <div className="image-container">
                        <div className="image" style={{
                            backgroundImage: `url(${this.props.profileImage})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}
                        ></div>
                    </div>
                    <div className="dropzone-container">
                        <Dropzone
                            className="dropzone"
                            onDrop={this.handleDrop}
                            multiple
                            accept="image/*"
                        >
                            <p>Drop your files or click here to upload</p>
                        </Dropzone>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        profileImage: state.profileImage
    }
}

export default connect(mapStateToProps, { updatePicture })(ProfilePic);