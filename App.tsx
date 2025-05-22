/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useMemo } from 'react';


import MainNavigator from './src/navigator/MainNavigator';
import { AppContext } from './src/context/AppContext';
import Home from './src/screens/Home';
import ScanOut from './src/screens/ScanOut';
import ScanIn from './src/screens/ScanIn';
import RegisterCustomer from './src/screens/RegisterCustomer';



function App(): React.JSX.Element {

  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [url,setUrl] = React.useState();
 


 const appUtils = useMemo(
    () => ({
      signIn: async (data:any) => {
        
        setUser(data);
         
        
        
      },
      clearAll: () => {
        setUser(null);
      },
      setEnvironment: (url:any) => {
        setUrl(url);
      },
      getEnvironment: () => url,
      getUserDetails: () => user,
    }),
    [user]
  );
  const safePadding = '5%';

 
return(
<NavigationContainer>
  <AppContext.Provider value={appUtils}>
  <MainNavigator/>
  </AppContext.Provider>
</NavigationContainer>

)
 
}



export default App;
