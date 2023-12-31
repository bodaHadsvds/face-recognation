import React from "react";

class Signin extends React.Component {
  constructor(props){
    super(props);
    this.state={
      Signinemail :"",
      Signinpassword:""
    }
     
    
  }
  onemailChange=(event)=>{
    this.setState({Signinemail:event.target.value})
  }
  onpasswordChange=(event)=>{
    this.setState({Signinpassword:event.target.value})
  }
  onsubmitsignin =()=>{
    fetch("https://test-app-1kyg.onrender.com/signin", {
      method:'post',
      headers:{"content-Type":"application/json"},
      body:JSON.stringify({
        email:this.state.Signinemail,
        password:this.state.Signinpassword
        
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
    const {onRouteChange}=this.props;
    return ( 
      
    <article className="br4 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 Shadow-5 center">
    <main className="pa4 black-80">
<div className="measure ">
<fieldset
  id="sign_up"
  className="ba b--transparent ph0 mh0"
>
<legend className="f1 fw6 ph0 mh0">
Sign In
</legend>
<div className="mt3">
<label
  className="db fw6 lh-copy f6"
  htmlFor="email-address"
>
Email
</label>
<input
  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
  type="email"
  name="email-address"
  id="email-address"
  onChange={this.onemailChange}
/>
</div>
<div className="mv3">
<label
  className="db fw6 lh-copy f6"
  htmlFor="password"
>
Password
</label>
<input
  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
  type="password"
  name="password"
  id="password"
  onChange={this.onpasswordChange}
/>
</div>
</fieldset>
<div className="">
<input
  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
  type="submit"
  value="Sign in"
onClick={this.onsubmitsignin}
/>
</div>
<div className="lh-copy mt3">
<p
 
  className="f6 link dim black db pointer"
   onClick={()=>onRouteChange("Register")}
>
Regsiter
</p>
</div>
</div>
</main>
</article>
)
  }
  
r
}

export default Signin ;