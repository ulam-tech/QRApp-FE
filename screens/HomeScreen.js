import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Formik } from 'formik';
import * as yup from 'yup';

import * as authActions from '../store/actions/auth';

import { Card } from 'react-native-material-ui';

import QRCode from 'react-native-qrcode-generator';

export default function HomeScreen() {
  const userId = useSelector(state => state.auth.userId);
  const token = useSelector(state => state.auth.token);

  const [qrCodes, setQrCodes] = useState([])
  const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    axios.get('https://qrapp.ulam.tech/users_qr_codes/' + userId + '.json', {headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {
          const qrCodes = [];
          res.data.qr_codes.forEach(code => {
            qrCodes.push({id: code.id, title: code.title, url: code.url})
          })
          setQrCodes(qrCodes)
        })
        .catch(err => {
          console.log(err)
        })
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {loaded ?
            qrCodes.map(code => {
              return (
                  <View key={code.id} style={styles.card}>
                    <QRCode
                        style={styles.codeImg}
                        size={150}
                        value={code.url}
                        bgColor='black'
                        fgColor='white'/>
                    <Text>Title: {code.title}</Text>
                  </View>
              )
            }) : <Text>Loading...</Text>
        }
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 10,
  },
  card: {
    margin: 10,
    padding: 10,
    width: '50%',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgrey'
  },
  codeImg: {
    width: '100%',
    height: 150
  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
