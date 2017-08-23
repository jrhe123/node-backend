import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Signup } from '../presentation'

class Admin extends Component {
	constructor(){
		super()
		this.state = {
			link: ''
		}
	}

	componentDidMount(){ // check the current user
		APIManager.get('/account/currentuser', null, (err, response) => {
			if (err){
				alert(err)
				return
			}

			if (response.profile == null)
				return

			// user is logged in:
//			console.log('Current User: '+JSON.stringify(response))
			this.props.currentUserReceived(response.profile)
		})
	}

	register(visitor){
		APIManager.post('/account/register', visitor, (err, response) => {
			if (err){
				let msg = err.message || err
				alert(msg)
				return
			}

			console.log('REGISTER: '+JSON.stringify(response))
			this.props.profileCreated(response.profile)
		})
	}

	login(credentials){
		APIManager.post('/account/login', credentials, (err, response) => {
			if (err){
				let msg = err.message || err
				alert(msg)
				return
			}

			console.log('Login: '+JSON.stringify(response))
			this.props.currentUserReceived(response.profile)
		})
	}

	updateLink(event){
		event.preventDefault()
		this.setState({
			link: event.target.value
		})
	}

	submitLink(event){
		event.preventDefault()

		const bookmark = {
			profile: this.props.currentUser.id,
			url: this.state.link
		}

//		console.log('submitLink: '+JSON.stringify(bookmark))

		APIManager.post('/api/bookmark', bookmark, (err, response) => {
			if (err){
				alert(err)
				return
			}

			console.log('Submit Link: '+JSON.stringify(response))
		})
	}

	render(){
		return (
			<div>
				{ (this.props.currentUser == null) ? <Signup onRegister={this.register.bind(this)} onLogin={this.login.bind(this)} /> : 
					<div>
						<h2>Welcome {this.props.currentUser.firstName}</h2>
						<input onChange={this.updateLink.bind(this)} placeholder="http://www.example.com" type="text" /><br />
						<button onClick={this.submitLink.bind(this)}>Submit Link</button>
					</div>
				}

			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		currentUser: state.account.currentUser
	}
}

const dispatchToProps = (dispatch) => {
	return {
		profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
		currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
	}
}

export default connect(stateToProps, dispatchToProps)(Admin)


