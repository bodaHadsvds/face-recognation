import React from "react";

class Regsiter extends React.Component{
  constructor(props){
    super(props)
    this.state={
       email :"",
      password:"",
      name:"",
      
      
    }
     
    
  }

  onnamechange=(event)=>{
    this.setState({name:event.target.value})
  }
  onemailchange=(event)=>{
    this.setState({email:event.target.value})
  }
  onpasswordchange=(event)=>{
    this.setState({ password:event.target.value})
  }
  onsubmitsignin =()=>{
    fetch("https://test-app-1kyg.onrender.com/register", {
      method:'Post',
      headers:{"content-Type":"application/json"},
      body:JSON.stringify({
        email:this.state.email,
        name:this.state.name,
        password:this.state.password
        
       })
       
    })
    .then(response=>response.json())
    .then(
      user=>{
        if(user.id){ 
          this.props.loaduser(user)
          this.props.onRouteChange("home")
        }
      }
    )
    console.log(this.state)
   
  }
  render(){
   
    
    return (<article className="br4 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 Shadow-5 center">
    <main className="pa4 black-80">
<div className="measure ">
<fieldset
  id="sign_up"
  className="ba b--transparent ph0 mh0"
>
<legend className="f1 fw6 ph0 mh0">
Register
</legend>
<div className="mt3">
<label
  className="db fw6 lh-copy f6"
  htmlfor="email-address"
>
Name
</label>
<input
  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
  type="text"
  name="name"
  id="name"
  onChange={this.onnamechange}
/>
</div>
<div className="mt3">
<label
  className="db fw6 lh-copy f6"
  htmlfor="email-address"
>
Email
</label>
<input
  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
  type="email"
  name="email-address"
  id="email-address"
  onChange={this.onemailchange}
/>
</div>
<div className="mv3">
<label
  className="db fw6 lh-copy f6"
  htmlfor="password"
>
Password
</label>
<input
  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
  type="password"
  name="password"
  id="password"
  onChange={this.onpasswordchange}
/>
</div>
</fieldset>
<div className="">
<input
onClick={ this.onsubmitsignin}
  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
  type="submit"
  value="Register"
 
/>
</div>

</div>
</main>
</article>
)
  }
  

}

export default Regsiter ;