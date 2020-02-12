import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Button,
  Vibration,
  Clipboard,
  Linking

} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import Geolocation from '@react-native-community/geolocation';
import SoundPlayer from 'react-native-sound-player'//npm library

import data from '../data/activityData'; //maile affai banayeko temp-database type where activity coordinates are saved
import {NavigationEvents} from 'react-navigation';
//import Share from 'react-native-share';
import GetLocation from 'react-native-get-location'




// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;

//zoom level in map
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.001;
const LATITUDE = 27.67475296591504;
const LONGITUDE = 85.32274916768074;
//vibration pattern
const PATTERN = [1000, 2000, 3000];
// key so that the sound doesnot keep on replayinh
let key =[0,0,0,0,0,0,0,0];
var loc;
/*
const shareOptions = {
  title: 'Facebook',
  message: 'your location', 
  social:Share.Social.FACEBOOK, // country code + phone number(currently only works on Android)
};*/

class AnimatedMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      changeState:false,
      //huge array of markers
      markers: [{
        title: 'Tourist information Center',
        coordinates: {
          latitude: 27.672789,
          longitude: 85.324777
          
        },
        image : require('../markers/me.png'),
      },
      {
        title: 'Ticket Counter',
        coordinates: {
          latitude: 27.672696,
          longitude: 85.324884
        },
        image : require('../markers/counter.png'),  
      },
      {
        title: 'Dustbin',
        coordinates: {
          latitude: 27.673371,
          longitude: 85.325024
        },
        image : require('../markers/dustbin.png'),  
      },
      {
        title: 'Dustbin',
        coordinates: {
          latitude: 27.651904,
          longitude: 85.267886
        },
        image : require('../markers/dustbin.png'),  
      },
      {
        title: 'Dustbin',
        coordinates: {
          latitude: 27.648612,
          longitude:  85.271090
        },
        image : require('../markers/dustbin.png'),  
      },
      {
        coordinates: {
            latitude: 27.676011,
            longitude: 85.318092
        },
        image : require('../markers/red.png'),  
      },
      {
        coordinates: {
          latitude: 27.672629,
          longitude: 85.324894
        },
        image : require('../markers/red.png'),  
      },
      {
        coordinates: {
          latitude: 27.673404,
          longitude: 85.325128
        },
        image : require('../markers/red.png'),  
      },
      {
        coordinates: {
          latitude: 27.673573,
          longitude: 85.325096
        },
        image : require('../markers/red.png'),  
      },
      
      {
        title: 'Dustbin',
        coordinates: {
          latitude: 27.675564,
          longitude: 85.326020
        },
        image : require('../markers/dustbin.png'),  
      },
      {
        title: 'Dustbin',
        coordinates: {
          latitude: 27.675111,
          longitude: 85.321511
        },
        image : require('../markers/dustbin.png'),  
      },
      {
        title: 'Dustbin',
        coordinates: {
          latitude: 27.67578,
          longitude: 85.3255
        },
        image : require('../markers/dustbin.png'),  
      },
      {
        title: 'Dustbin',
        coordinates: {
          latitude: 27.675895,
          longitude: 85.321511
        },
        image : require('../markers/dustbin.png'),  
      },
      {
        title: 'Dustbin',
        coordinates: {
          latitude: 27.676050,
          longitude:  85.320827
        },
        image : require('../markers/dustbin.png'),  
      },
      {
        title: 'Dustbin',
        coordinates: {
          latitude: 27.675481,
          longitude:85.319208
        },
        image : require('../markers/dustbin.png'),  
      },
      {
        title: 'Bench',
        coordinates: {
          latitude: 27.675974,
          longitude:85.320977
        },
        image : require('../markers/bench.png'),  
      },
      {
        title: 'Bench',
        coordinates: {
          latitude: 27.673187,
          longitude:85.325156
        },
        image : require('../markers/bench.png'),  
      },
      {
        title: 'Bench',
        coordinates: {
          latitude: 27.673543,
          longitude:85.324992
        },
        image : require('../markers/bench.png'),  
      },
      {
        title: 'Bench',
        coordinates: {
          latitude: 27.673315,
          longitude:85.324928
        },
        image : require('../markers/bench.png'),  
      },
      {
        title: 'Bench',
        coordinates: {
          latitude: 27.649523,
          longitude:85.273169
        },
        image : require('../markers/bench.png'),  
      },
      {
        title: 'Bench',
        coordinates: {
          latitude: 27.651521,
          longitude:85.268359
        },
        image : require('../markers/bench.png'),  
      },
      {
        title: 'Ticket Counter',
        coordinates: {
          latitude: 27.673851,
          longitude:85.325300
        },
        image : require('../markers/counter.png'),  
      },
      {
        title: 'washroom',
        coordinates: {
          latitude: 27.672472,
          longitude:85.324968
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: 'washroom',
        coordinates: {
          latitude: 27.648066,
          longitude:85.272890
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: 'washroom',
        coordinates: {
          latitude: 27.651678,
          longitude:85.268220
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: 'washroom',
        coordinates: {
          latitude: 27.673493,
          longitude:85.325215
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: 'Starting Point',
        coordinates: {
          latitude: 27.646656,
          longitude:85.277317
        },
        image : require('../markers/flag.png'),  
      },
      {
        title: 'washroom',
        coordinates: {
          latitude: 27.673985,
          longitude:85.324941
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: 'washroom',
        coordinates: {
          latitude: 27.673619,
          longitude:85.323427
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: 'washroom',
        coordinates: {
          latitude: 27.674155,
          longitude:85.321070
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: 'washroom',
        coordinates: {
          latitude: 27.675352,
          longitude:85.318912
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: 'washroom',
        coordinates: {
          latitude: 27.675783,
          longitude:85.317637
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: 'washroom',
        coordinates: {
          latitude: 27.676431,
          longitude:85.319338
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: 'Famous lassi ',
        coordinates: {
          latitude:27.672746,
          longitude:85.324510
        },
        image : require('../markers/food.png'),  
      },
      {
        title: ' Famous Potato chips corner ',
        coordinates: {
          latitude:27.677672,
          longitude:85.321317
        },
        image : require('../markers/food.png'),  
      },
      {
        title: 'To ratnapark ',
        coordinates: {
          latitude:27.678788,
          longitude:85.320897
        },
        image : require('../markers/bus.png'),  
      },
      {
        title: ' washroom ',
        coordinates: {
          latitude:27.678679,
          longitude:85.320899
        },
        image : require('../markers/wc.png'),  
      },
      {
        title: ' Gift shop ',
        coordinates: {
          latitude:27.673563,
          longitude:85.324986
        },
        image : require('../markers/gift.png'),  
      },
      {
        title: ' Gift shop ',
        coordinates: {
          latitude:27.673886,
          longitude:85.324986
        },
        image : require('../markers/gift.png'),  
      },
      {
        title: ' Gift shop ',
        coordinates: {
          latitude:27.673886,
          longitude:85.325673},
        image : require('../markers/gift.png'),  
      },
      {
        title: ' Gift shop ',
        coordinates: {
          latitude:27.674722,
          longitude:85.322636},
        image : require('../markers/gift.png'),  
      },
      {
        title: ' Taxi Station ',
        coordinates: {
          latitude:27.672330,
          longitude:85.325113},
        image : require('../markers/gift.png'),  
      },
      {
        title: 'Dustbin',
        coordinates: {
          latitude: 27.672955,
          longitude: 85.324815
        },
        image : require('../markers/dustbin.png'),  
      }
    ]
    };

  }
   sendSms = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        //current location saved after getting location
        phoneNo = 9849285770;
        latitude = location.latitude;
        longitude = location.longitude;
        msg= 'i am at '+latitude.toString() +'and longitude'+longitude.toString();
        url = `sms:${phoneNo}${Platform.OS === 'ios' ? '&' : '?'}body=${msg}`;
  
        Linking.openURL(url);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      })
  };
  
  componentDidMount() {
    const { coordinate } = this.state;
    
    this.watchID = Geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;
        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
           
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
            //update cordinates
            let x= newCoordinate.latitude, y=newCoordinate.longitude;
            let h=[27.676011,27.672629,27.673404,27.673573], k=[85.318092,85.324894,85.325128,85.325096];
            let r = 0.0001**2
            var t, i;
            loc=toString(newCoordinate) ;
            for(i=0;i<h.length;i++){
                 t = (x-h[i])**2 + (y-k[i])**2;
                 if(t <= r){
                     t=i;
                     break;
                 }
            } 
            //condition for playing different sounds
            switch(t) {
                case 0:
                    if (key[0] < 1 ) {
                        Vibration.vibrate(PATTERN);
                        try {
                            // play the file tone.mp3
                            SoundPlayer.playSoundFile('busstandd', 'mp3')
                            key[0] = 1
            
                            
                        } catch (e) {
                            console.log(`cannot play the sound file`, e)
                        }
                    }
                   
                    break;
                case 1:
                    if (key[1] < 1) {
                        Vibration.vibrate(PATTERN);
                        try {
                            // play the file tone.mp3
                            SoundPlayer.playSoundFile('ticketcounter', 'mp3')
                            key[1] = 1

                        } catch (e) {
                            console.log(`cannot play the sound file`, e)
                        }
                    }
                    
                    break;
                case 2:
                    if (key[2] < 1) {
                        Vibration.vibrate(PATTERN);
                        try {
                            // play the file tone.mp3
                            SoundPlayer.playSoundFile('museum', 'mp3')
                            key[2] = 1
                           
                        } catch (e) {
                            console.log(`cannot play the sound file`, e)
                        }
                    }
                   
                    break;

                    case 3:
                        if (key[3] < 1) {
                            Vibration.vibrate(PATTERN);
                            try {
                                // play the file tone.mp3
                                SoundPlayer.playSoundFile('khrishnamandir', 'mp3')
                                key[3] = 1
                            } catch (e) {
                                console.log(`cannot play the sound file`, e)
                            }
                        }
                        
                        break;


            }         
                 
              
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
        
          //distace walla
        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1 //yo distance
      }
    );
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
          hidden={false}

        />  
        <NavigationEvents onWillFocus={()=>{this.setState({changeState:!this.changeState})}} />
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          showsMyLocationButton
          region={this.getMapRegion()}
          
            >
          
            {this.state.markers.map((marker,index) => (
                <MapView.Marker 
                    key={index}
                    coordinate={marker.coordinates}
                    title={marker.title}
                    image ={marker.image} //rendering markers
                />
              ))}
         
          <Marker.Animated
            image={require('../markers/dustbin.png')}
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
            image={require('../markers/mee.png')}
          />

        {data.map(( // on selecting activity, show correspondning marker on the map
          item,
          i, 
        ) =>
          item.isSelected ? (
            <MapView.Marker key={item.id} coordinate={item.coordinates} title={item.title}/>
          ) : null,
        )}
          <Polyline
            coordinates={[
              { latitude: 27.676011, longitude: 85.318092},
              { latitude: 27.675749, longitude: 85.318560},
              { latitude: 27.674536, longitude: 85.320271},
              { latitude: 27.673925, longitude: 85.322018},
              { latitude: 27.673735, longitude: 85.323230},
              { latitude: 27.673513, longitude: 85.323837},
              { latitude: 27.672609, longitude: 85.324892},
              { latitude: 27.674563, longitude: 85.325480},
              { latitude: 27.675278, longitude: 85.325960},
              { latitude: 27.675975, longitude: 85.326379},
              { latitude: 27.676291, longitude: 85.325859},
              { latitude: 27.676437, longitude: 85.325637},
              { latitude: 27.674263, longitude: 85.324266},
              { latitude: 27.674495, longitude: 85.323481},
              { latitude: 27.675455, longitude: 85.321128},
              { latitude: 27.675505, longitude: 85.321121},
              { latitude: 27.676617, longitude: 85.319122},
              { latitude: 27.675762, longitude: 85.318559},
            ]}
            strokeColor="#00FF00" // fallback for when `strokeColors` is not supported by the map-provide
            strokeWidth={10}
          />
          <Polyline
            coordinates={[
              { latitude: 27.646678, longitude: 85.277398},
              { latitude: 27.646602, longitude: 85.277060},
              { latitude: 27.646822, longitude: 85.276816},
              { latitude: 27.646870, longitude: 85.276640},
              { latitude: 27.647049, longitude: 85.276343},
              { latitude: 27.647213, longitude: 85.276058},
              { latitude: 27.647764, longitude: 85.275650},
              { latitude: 27.648011, longitude: 85.275559},
              { latitude: 27.648339, longitude: 85.275087},
              { latitude: 27.649280, longitude: 85.274996},
              { latitude: 27.649320, longitude: 85.274928},
              { latitude: 27.649098, longitude: 85.274518},
              { latitude: 27.648830, longitude: 85.274238},
              { latitude: 27.649166, longitude: 85.274094},
              { latitude: 27.649753, longitude: 85.274453},
              { latitude: 27.649824, longitude: 85.274003},
              { latitude: 27.649381, longitude: 85.273421},
              { latitude: 27.648198, longitude: 85.272857},
              { latitude: 27.648582, longitude: 85.272757},
              { latitude: 27.648907, longitude: 85.272141},
              { latitude: 27.648830, longitude: 85.271975},
              { latitude: 27.648521, longitude: 85.271740},
              { latitude: 27.648475, longitude: 85.270683},             
              { latitude: 27.648651, longitude: 85.270164},
              { latitude: 27.648884, longitude: 85.269415},
              { latitude: 27.649208, longitude: 85.268031},
              { latitude: 27.649607, longitude: 85.267776},
              { latitude: 27.649669, longitude: 85.268071},
              { latitude: 27.651643, longitude: 85.268411},
              

             
            ]}
            strokeColor="#00FF00" // fallback for when `strokeColors` is not supported by the map-provide
            strokeWidth={10}
          />    
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent} onPress={()=>{this.sendSms()}}>
              share
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent} onPress={()=>{SoundPlayer.pause();}}>
             Pause
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent} onPress={()=>{SoundPlayer.resume();}}>
             Resume
            </Text>
          </TouchableOpacity>
          
          
        </View> 
            
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#fcd8d2",
        shadowOffset: {
	        width: 0,
	      height: 8,
            },
          shadowOpacity: 0.01,
          shadowRadius: 10.32,

          elevation: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

export default AnimatedMarkers;