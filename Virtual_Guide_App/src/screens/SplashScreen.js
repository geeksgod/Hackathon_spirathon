//import liraries
import React, { useEffect } from 'react';
import {ProgressBarAndroid, View, Text, StyleSheet,Image,StatusBar } from 'react-native';

// create a component
const SplashScreen = ({navigation}) => {
    useEffect(()=>{
        setTimeout(
            () => { navigation.navigate('Login') }, //showing this screen for 3000 ms period
            3000
          )
    },[])
    return (
        <View style={styles.container}>
                <StatusBar  
                    backgroundColor = "#fff"  
                    barStyle = "dark-content"   
                    hidden = {false}    
                     
                />  
                <Image style={styles.imagecontainer} source={require('../images/logo.jpg')} />
                <Text style={styles.textstyle}> Hello there! </Text>
                <Text style={styles.textstyle2}> I am your travel Companion </Text>
                <View>
                
                <Image style={styles.imagecontainer2} source={require('../images/vn20.png')} />
                <View style={styles.bar}>
                    <ProgressBarAndroid color="#fb5b5a"/>
                                    
                </View>
                    <Image style={styles.imagecontainer3} source={require('../images/sp20.png')} />                
                   
                </View>
                

        
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop:100,
    },
    textstyle: {
        marginTop:50,
        fontSize:50,
        color:'#fb5b5a',
    },
    textstyle2: {
        marginTop:5,
        fontSize:20,
        color:'#fe3737',
    },
    
    imagecontainer: {
        height:200,
        width:200,
        marginLeft:25,  
    
      },
    imagecontainer2: {
        height:200,
        width:200,
        marginLeft:70,  
        marginTop:30,
    
      },
      imagecontainer3: {
        height:50,
        width:300,
        marginLeft:13,  
        marginTop:30,
    
      },
      bar: {       
        marginTop:30,
    
      },
});

export default SplashScreen;
