import React, {Component} from 'react';
import { Button} from 'react-native';
import Share from 'react-native-share';

class ShareExample extends Component {
    shareOptions = {
        title: 'Share via',
        message: 'some message',
        url: 'some share url',
        social: Share.Social.WHATSAPP,
        whatsAppNumber: "9199999999",  // country code + phone number(currently only works on Android)
        filename: 'test' , // only for base64 file in Android 
    };
    //Share.shareSingle(shareOptions);
 /* onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }; */

  render() {
    return <Button onPress={Share.shareSingle(shareOptions)} title="Share" />;
  }
}