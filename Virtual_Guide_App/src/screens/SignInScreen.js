import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import saveEmailPassword,{_email,_password} from '../emailPasswords'

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err,setErr]= useState(null)

  useEffect(()=>{
    setErr(false)
  },[])

  const onSignInPressed = (email, password,confirmPassword) => {
    //check for email and password
    if (password === confirmPassword){
      saveEmailPassword(email,password)
      navigation.navigate('Login');
      setErr(false)
  }else{
    setErr(true)
  }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Full Name.."
          value={name}
          placeholderTextColor="#003f5c"
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          value={email}
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          value={password}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          value={confirmPassword}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          onChangeText={setConfirmPassword}
        />
      </View>
      {err?<Text style={styles.errMsg}>Invaid Input</Text>:null}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          onSignInPressed(email, password,confirmPassword);
        }}>
        <Text style={styles.loginText}>SIGN IN</Text>
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
    width: '80%' ,
    fontSize: 40,
    color: '#fb5b5a',
    marginBottom: 40,
    paddingLeft: 20,
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
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
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
  errMsg:{
    fontSize:18,
    color:'red',
    justifyContent:'center'
  }
});

export default SignInScreen;
