import React, { Component } from 'react'

class Signup extends Component {
	constructor(){
		super()
		this.state = {
			visitor: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			}
		}
	}

	updateVisitor(event){
		let updated = Object.assign({}, this.state.visitor)
		updated[event.target.id] = event.target.value
		this.setState({
			visitor: updated
		})
	}

	register(event){
		event.preventDefault()
		// console.log(JSON.stringify(this.state.visitor))
		this.props.onRegister(this.state.visitor)
	}

	login(event){
		event.preventDefault()
		this.props.onLogin(this.state.visitor)
	}

	render(){

		return (
			<div>
				<h2>Sign Up</h2>
				<input onChange={this.updateVisitor.bind(this)} type="text" id="firstName" placeholder="First Name" /><br />
				<input onChange={this.updateVisitor.bind(this)} type="text" id="lastName" placeholder="Last Name" /><br />
				<input onChange={this.updateVisitor.bind(this)} type="text" id="email" placeholder="Email" /><br />
				<input onChange={this.updateVisitor.bind(this)} type="text" id="password" placeholder="Password" /><br />
				<button onClick={this.register.bind(this)}>Join</button>

				<h2>Log In</h2>
				<input onChange={this.updateVisitor.bind(this)} type="text" id="email" placeholder="Email" /><br />
				<input onChange={this.updateVisitor.bind(this)} type="text" id="password" placeholder="Password" /><br />
				<button onClick={this.login.bind(this)}>Log In</button>
			</div>
		)
	}
}

export default Signup


