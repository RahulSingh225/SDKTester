import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput,Button } from 'react-native-paper'
import { height } from '../worker/dimension'
import { getUserDetails, verifyUser } from '../worker/apiService'
import { prodConfig, uatConfig } from '../worker/sdkworker'
import App from '../../App'
import { AppContext } from '../context/AppContext'
import { InitializeSDK } from 'react-native-vg-retailer-sdk'

const Welcome = ({navigation}) => {
  const context = React.useContext(AppContext)
  const handleSubmit = () => {
    console.log('calling handle submit')
    context.setEnvironment(env==='production'?prodConfig:uatConfig)
    verifyUser(mobileNumber,env==='production'?prodConfig:uatConfig).then((res) => {
      console.log('Response:', res)
      
        console.log('User verified successfully')
        InitializeSDK({
        baseurl: env==='production'?prodConfig.url:uatConfig.url,
        accesstoken:res.tokens.accessToken,
          
        refreshtoken:res.tokens.refreshToken,
          
      }).then((res) => {
          console.log('SDK initialized successfully')
        })
        getUserDetails(res.tokens.accessToken,env==='production'?prodConfig.url:uatConfig.url).then((res) => {
          console.log('User details:', res)
          
            console.log('User details fetched successfully')
            console.log('User details:', res)
            context.signIn(res)
            navigation.navigate('Home')
          
        }).catch((error) => {
          console.error('Error fetching user details:', error)
        })
      
    }).catch((error) => {
      console.error('Error verifying user:', error)
    })
  }
  const [mobileNumber, setMobileNumber] = React.useState('')
  const [env,setEnv] = React.useState('production')
  return (
    <View style={{ height:height,flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Selected Environment : {env}</Text>
    <TouchableOpacity onPress={()=>setEnv('production')} style={{ width:'50%',height:40,borderWidth:env ==='production'?2:1,borderColor:env==='production'?'purple':'black',borderRadius:5, justifyContent: 'center', alignItems: 'center',alignSelf:'center',marginVertical:20 }}>
      <Text>Production</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>setEnv('staging')} style={{ width:'50%',height:40,borderWidth:env ==='staging'?2:1,borderColor:env==='staging'?'purple':'black',borderRadius:5, justifyContent: 'center', alignItems: 'center',alignSelf:'center'}}>
      <Text>Staging</Text>
    </TouchableOpacity>

     <TextInput label='Retailer Number' value={mobileNumber} onChangeText={text => setMobileNumber(text)} keyboardType='numeric' mode='outlined' style={{ width: '80%',marginVertical:50 }} />
    
    <Button style={{alignSelf:'center',marginVertical:50}} icon="child-care" mode="outlined" onPress={()=>handleSubmit()}>
    Login
  </Button>
    </View>
  )
}

export default Welcome