import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {_email,_password} from '../emailPasswords'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const onLoginPressed=(email,password)=>{
      //check for email and password
      for (i = 0; i < _email.length; i++) {
        if (_email[i] === email && _password[i]===password){
          navigation.navigate('Home')
        }
      }
  }
  return (
    <View style={styles.container}>
    <StatusBar  
                    backgroundColor = "#fff"  
                    barStyle = "dark-content"   
                    hidden = {false}    
                     
                />  
    <View >
    <Image style={styles.imagecontainer} source={require('../images/logo.jpg')} />
    </View>
      <Text style={styles.logo}>Welcome</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Email"
          value={email}
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
          autoCapitalize='none'
          autoCompleteType='off'
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
          autoCapitalize='none'
          autoCompleteType='off'
          
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={()=>{onLoginPressed(email,password)}}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Signin')}>
        <Text style={styles.forgote}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -60,
  },
  logo: {
    fontWeight: 'bold',
    width: '100%' ,
    fontSize: 40,
    color: '#fb5b5a',
    marginBottom: 40,
    paddingLeft: 150,
    marginTop:40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fcd8d2',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    shadowColor: "#fcd8d2",
        shadowOffset: {
	        width: 0,
	      height: 8,
            },
          shadowOpacity: 0.01,
          shadowRadius: 10.32,

          elevation: 16,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgot: {
    color: 'black',
    fontSize: 13,
    marginTop: 40,
    paddingLeft:10,
  },
  forgote: {
    color: 'black',
    fontSize: 13,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#fcd8d2",
        shadowOffset: {
	        width: 0,
	      height: 8,
            },
          shadowOpacity: 0.01,
          shadowRadius: 10.32,

          elevation: 16,
    
  },
  loginText: {
    color: 'white',
  },
  imagecontainer: {
    height:200,
    width:200,
    marginLeft:25,  

  },
});

export default LoginScreen;
