import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import {
  verifyBankDetails,
  rewardPointsHistory,
  ScannedBalancePoints,
  userScanOutPointSummary,
  InitializeSDK,
  getCategoriesList,
  getUserBasePoints,
  getUserScanHistory,
  captureCustomerDetails,
  registerWarranty,
  getEligibleProducts,
  getSchemeSlabBasedSlab,
  RewardsPoints,
  getSlabBasedSchemes,
  getCrossSchemesDetails,
  validateRetailerCoupon,
  registerCustomer,
  processForPin,
  processCoupon,
  getProductCrossSellScheme,
  getProductSlabBasedScheme,
  bankTransfer,
  scanIn,
  getFile,
  uploadFile,
  getTdsCertificate,
  getSchemeFileList,
  GetPrimarySchemeFileList,
  getSchemeCrossBasedSlab,
  getCurrentSlabOnSlabBased,
  getCurrentSlabOnCrossSell,
} from 'react-native-vg-retailer-sdk';
import { AppContext } from '../context/AppContext';

const functions = [
  // 'verifyBankDetails',
  // 'rewardPointsHistory',
  // 'ScannedBalancePoints',
  // 'userScanOutPointSummary',
  // 'InitializeSDK',
  // 'getCategoriesList',
  // 'getUserBasePoints',
  // 'getUserScanHistory',
  // 'captureCustomerDetails',
  // 'registerWarranty',
  // 'getEligibleProducts',
  // 'getSchemeSlabBasedSlab',
  // 'RewardsPoints',
  // 'getSlabBasedSchemes',
  // 'getCrossSchemesDetails',
  'validateRetailerCoupon',
  'registerCustomer',
  // 'processForPin',
  // 'processCoupon',
  // 'getProductCrossSellScheme',
  // 'getProductSlabBasedScheme',
  // 'bankTransfer',
  'scanIn',
  // 'getFile',
  // 'uploadFile',
  // 'getTdsCertificate',
  // 'getSchemeFileList',
  // 'GetPrimarySchemeFileList',
  // 'getSchemeCrossBasedSlab',
  // 'getCurrentSlabOnSlabBased',
  // 'getCurrentSlabOnCrossSell',
];

const TileComponent = ({ label,navigation }) => (
  <TouchableOpacity onPress={()=>navigation.navigate(label)} style={styles.itemContainer}>
    <Text style={styles.itemText}>{label}</Text>
  </TouchableOpacity>
);
const Home = ({navigation}) => {
  const context = React.useContext(AppContext);
  const user = context.getUserDetails();
  return (
    <View style={styles.container}>
    <View style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
  <Text style={{ fontSize: 24, fontWeight: '700', color: '#222', marginBottom: 8 }}>Retailer Name : {user.name}</Text>
  
  <Text style={{ fontSize: 18, fontWeight: '600', color: '#444', marginBottom: 16 }}>Rishta ID : {user.userCode}</Text>
  
  <Text style={{ fontSize: 16, fontWeight: '500', color: '#666', marginBottom: 24 }}>Mobile Number : {user.contactNo}</Text>
  
  <View style={{ height: 1, backgroundColor: '#eee', marginBottom: 20 }}></View>
</View>
      <FlatList
        data={functions}
        renderItem={({ item }) => <TileComponent label={item} navigation={navigation} />}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / 3 - 20, // Adjust height based on width
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderColor:'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 10,
    color: '#333',
  },
});

export default Home;
