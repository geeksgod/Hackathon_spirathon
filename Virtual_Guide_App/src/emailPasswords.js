export let _email = ["VirtualGuide@gmail.com","a"]
export let _password =["password","a"]


export default saveEmailPassword = (email,password)=>{
    _email.push(email)
    _password.push(password)
}