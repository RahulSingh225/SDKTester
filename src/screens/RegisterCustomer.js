import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  Provider as PaperProvider, 
  DefaultTheme,
  Card,
  Divider,
  Surface,
  IconButton,
  Menu,
  Tooltip,
  HelperText,
  ActivityIndicator
} from 'react-native-paper';
import { height, width } from '../worker/dimension';
import { getDetailsByPinCode, getPincodeList } from '../worker/apiService';
import { AppContext } from '../context/AppContext';
import { registerCustomer, validateRetailerCoupon } from 'react-native-vg-retailer-sdk';


const RegisterCustomer = () => {

    const context = React.useContext(AppContext)
    const user  = context.getUserDetails()

const samplebody = {
        nameTitle: '',
        contactNo: '6565656565',
        name: 'SHIVAKAR',
        email: 'test65@gmail.com',
        currAdd: 'Central Delhi',
        alternateNo: '7575757575',
        state: 'Delhi',
        district: 'Delhi',
        city: 'Central Delhi',
        landmark: 'Delhi',
        pinCode: '110006',
        dealerName: 'Mohit test',
        dealerAdd: 'Central Delhi',
        dealerState: 'Delhi',
        dealerDist: 'Central Delhi',
        dealerCity: 'Central Delhi',
        dealerPinCode: '110006',
        dealerNumber: '9873608820',
        addedBy: 22390, //Retailer UserId
        billDetails: '4b34eb9a-6e4c-4314-b408-31f6623b0a71.jpg',
        warrantyPhoto: '4b34eb9a-6e4c-4314-b408-31f6623b0a71.jpg',
        sellingPrice: '1500',
        emptStr: '',
        cresp: {
          custIdForProdInstall: '',
          modelForProdInstall: '',
          errorCode: 0,
          errorMsg: '',
          statusType: 1,
          balance: '',
          currentPoints: '',
          couponPoints: '',
          promotionPoints: '',
          transactId: '',
          schemePoints: '',
          basePoints: '',
          clubPoints: '',
          scanDate: '',
          scanStatus: '',
          copuonCode: '5362224187701942',
          bitEligibleScratchCard: false,
          partId: '141',
          pardId: 123,
          partNumber: '3002751',
          partName: '',
          skuDetail: 'JAADOO1050',
          purchaseDate: '2024-05-11', //also Manufacturing Date
          categoryId: '1',
          category: 'Digital Ups',
          anomaly: 0,
          warranty: '365',
        },
        selectedProd: {
          specs: '',
          pointsFormat: '',
          product: '',
          productName: '',
          productCategory: 'Digital Ups',
          productCode: '3002751',
          points: 0.0,
          imageUrl: '',
          userId: '22390',
          productId: '',
          paytmMobileNo: '',
        },
        latitude: '28.6798562',
        longitude: '77.0622139',
        geolocation: 'Central Delhi',
        dealerCategory: 'Customer',
      }


const [formData, setFormData] = useState({
        nameTitle: '',
        contactNo: '',
        name: '',
        email: '',
        currAdd: '',
        alternateNo: '',
        state: '',
        district: '',
        city: '',
        landmark: '',
        pinCode: '',
        dealerName: user.name,
        dealerAdd:user.currentAddress,
        dealerState: (user.currState),
        dealerDist: (user.currDist),
        dealerCity: (user.currCity),
        dealerPinCode: user.currPinCode,
        dealerNumber: user.contactNo,
        addedBy: user.userId, //Retailer UserId
        billDetails: '',
        warrantyPhoto: '',
        sellingPrice: '',
        emptStr: '',
       
        selectedProd: {
          specs: '',
          pointsFormat: '',
          product: '',
          productName: '',
          productCategory: '',
          productCode: '',
          points: 0.0,
          imageUrl: '',
          userId: '',
          productId: '',
          paytmMobileNo: '',
        },
        latitude: '28.6798562',
        longitude: '77.0622139',
        geolocation: 'Central Delhi',
        dealerCategory: 'Customer',
      });
const [cresp, setCresp] = useState({
          custIdForProdInstall: '',
          modelForProdInstall: '',
          errorCode: 0,
          errorMsg: '',
          statusType: 1,
          balance: '',
          currentPoints: '',
          couponPoints: '',
          promotionPoints: '',
          transactId: '',
          schemePoints: '',
          basePoints: '',
          clubPoints: '',
          scanDate: '',
          scanStatus: '',
          copuonCode: '',
          bitEligibleScratchCard: false,
          partId:null ,
          pardId: null,
          partNumber: '',
          partName: '',
          skuDetail: '',
          purchaseDate: '', //also Manufacturing Date
          categoryId: '',
          category: '',
          anomaly: 0,
          warranty: '',
        })
      const [pin, setPin] = useState('');

  // State for request/response display
  const [requestData, setRequestData] = useState('');
  const [responseData, setResponseData] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Menu visibility states
  const [requestMenuVisible, setRequestMenuVisible] = useState(false);
  const [responseMenuVisible, setResponseMenuVisible] = useState(false);

  // Form validation state
  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (field, value) => {
    console.log(formData)
    if(field === 'pinCode' && value.length == 6) {
        getPincodeList(value, context.baseurl)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            getDetailsByPinCode(data[0].pinCodeId, context.baseurl)
            .then((response) => {
              if (response.status === 200) {
                const data = response.data;
                setFormData({
                  ...formData,
                  state: data.stateName,
                  district: data.distName,
                  city: data.cityName,
                });
              } else {
                console.error('Error fetching pincode details:', response.status);
              }
            })
           
          } else {
            console.error('Error fetching pincode details:', response.status);
          }
        })


    }

    
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear error when user starts typing
    
  };

  const validateCoupon = () => {
  setLoading(true)
    validateRetailerCoupon({
    category: 'Customer',
    couponCode: cresp.copuonCode,
    from: 'SDK',
    geolocation: '',
    latitude: '12.892242',
    longitude: '77.5976361',
    retailerCoupon: 'true',
    pin: pin,
  }).then((response) => {  
    console.log('Response:', response);
    setCresp(JSON.parse(response))
    setLoading(false)
   
    //setRequestData(formData)
  }).catch((error)=>{
    setLoading(false)
    Alert.alert('Error', error.message);
  })
    

}

  // Validation function
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    
    // Basic email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Phone number validation (10 digits)
    if (formData.contactNo && !/^\d{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }
    
    // Alternate phone validation (optional, but if entered should be 10 digits)
    if (formData.alternateNo && !/^\d{10}$/.test(formData.alternateNo)) {
      newErrors.alternateNo = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }
    
    // PIN code validation (6 digits for Indian PIN codes)
    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit PIN code';
      isValid = false;
    }
    
    // Name validation (not empty)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Function to handle file selection for photos
  const handleSelectPhoto = (field) => {
    // In a real app, this would open image picker
    // For demo purposes, simulate a file selection
    const mockFileName = `photo_${Math.floor(Math.random() * 1000)}.jpg`;
    handleChange(field, mockFileName);
  };

  // Handle form submission
  const handleSubmit = async () => {
     setRequestData(formData)
     setLoading(true)
    let data = await registerCustomer(formData)
   setLoading(false)
    setResponseData(data)
  };

  // Clear the form
  const handleClear = () => {
    setFormData({
      contactNo: '',
      name: '',
      email: '',
      currAdd: '',
      alternateNo: '',
      state: '',
      district: '',
      city: '',
      landmark: '',
      pinCode: '',
      billDetails: '',
      warrantyPhoto: '',
      sellingPrice: '',
      emptStr: '',
    });
    setRequestData('');
    setResponseData('');
    setErrors({});
  };

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    if (Platform.OS === 'web') {
      navigator.clipboard.writeText(text);
    } else {
      // React Native implementation
    }
    showToast('Copied to clipboard');
  };

  // Share function
  const shareText = async (text, title) => {
    // Implementation would depend on platform
    showToast('Sharing content...');
  };

  // Toast message function
  const showToast = (message) => {
    if (Platform.OS === 'android') {
      // Android Toast implementation
    } else {
      // For iOS you would typically use a custom toast or alert
      console.log(message);
    }
  };


  return (
    <PaperProvider theme={DefaultTheme}>
      <ScrollView style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
          <View style={styles.rowContainer}>
                      <TextInput
                        label="Coupon Code"
                        value={cresp.copuonCode}
                        keyboardType='numeric'
                        onChangeText={(text) => setCresp({...cresp, copuonCode: text})}
                        style={[styles.input, {flex: 1, marginRight: 8}]}
                        mode="outlined"
                      />
                      <Tooltip title="Scan Coupon">
                        <IconButton
                          icon="check-outline"
                          size={24}
                          mode="contained"
                          onPress={validateCoupon}
                          style={styles.scanButton}
                        />
                      </Tooltip>
                    </View>
           <TextInput
                        label="PIN"
                        value={pin}
                        onChangeText={(text) =>setPin(text)}
                        style={[styles.input, {flex: 1, marginRight: 8}]}
                        mode="outlined"
                      />
        <Card style={styles.card}>
          <Card.Title title="Customer Information" subtitle="Enter customer details" />
          <Card.Content>
            {/* Personal Information Section */}
            <Text style={styles.sectionHeader}>Personal Information</Text>
            <Divider style={styles.sectionDivider} />
            
            <TextInput
              label="Name *"
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
              style={styles.input}
              mode="outlined"
              error={!!errors.name}
            />
            {errors.name && <HelperText type="error">{errors.name}</HelperText>}
            
            <View style={styles.rowContainer}>
              <TextInput
                label="Contact No. *"
                value={formData.contactNo}
                onChangeText={(text) => handleChange('contactNo', text)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                keyboardType="phone-pad"
                error={!!errors.contactNo}
              />
              <TextInput
                label="Alternate No."
                value={formData.alternateNo}
                onChangeText={(text) => handleChange('alternateNo', text)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                keyboardType="phone-pad"
                error={!!errors.alternateNo}
              />
            </View>
            {errors.contactNo && <HelperText type="error">{errors.contactNo}</HelperText>}
            {errors.alternateNo && <HelperText type="error">{errors.alternateNo}</HelperText>}
            
            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              style={styles.input}
              mode="outlined"
              keyboardType="email-address"
              error={!!errors.email}
            />
            {errors.email && <HelperText type="error">{errors.email}</HelperText>}
            
            {/* Address Section */}
            <Text style={styles.sectionHeader}>Address Information</Text>
            <Divider style={styles.sectionDivider} />
            
            <TextInput
              label="Current Address"
              value={formData.currAdd}
              onChangeText={(text) => handleChange('currAdd', text)}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={2}
            />
            
            <View style={styles.rowContainer}>
              <TextInput
                label="State"
                value={formData.state}
                disabled={true}
                onChangeText={(text) => handleChange('state', text)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
              />
              <TextInput
                label="District"
                value={formData.district}
                disabled={true}
                onChangeText={(text) => handleChange('district', text)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
              />
            </View>
            
            <View style={styles.rowContainer}>
              <TextInput
                label="City"
                disabled={true}
                value={formData.city}
                onChangeText={(text) => handleChange('city', text)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
              />
              <TextInput
                label="PIN Code"
                value={formData.pinCode}
                onChangeText={(text) => handleChange('pinCode', text)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                keyboardType="numeric"
                error={!!errors.pinCode}
              />
            </View>
            {errors.pinCode && <HelperText type="error">{errors.pinCode}</HelperText>}
            
            <TextInput
              label="Landmark"
              value={formData.landmark}
              onChangeText={(text) => handleChange('landmark', text)}
              style={styles.input}
              mode="outlined"
            />
            
            {/* Product Information Section */}
            <Text style={styles.sectionHeader}>Product Information</Text>
            <Divider style={styles.sectionDivider} />
            
            <TextInput
              label="Selling Price (₹)"
              value={formData.sellingPrice}
              onChangeText={(text) => handleChange('sellingPrice', text)}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
            />
            
           
            <View style={styles.buttonContainer}>
              <Button 
                mode="contained" 
                onPress={handleSubmit} 
                style={styles.button}
              >
                Submit
              </Button>
              <Button 
                mode="outlined" 
                onPress={handleClear} 
                style={styles.button}
              >
                Clear
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        <Card style={styles.card}>
          <Card.Title title="Request / Response" />
          <Card.Content>
            {/* Request section with interactive menu */}
            <View style={styles.textAreaHeader}>
              <Text style={styles.sectionLabel}>Request</Text>
              <Menu
                visible={requestMenuVisible}
                onDismiss={() => setRequestMenuVisible(false)}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    size={20}
                    onPress={() => setRequestMenuVisible(true)}
                    disabled={!requestData}
                  />
                }
              >
                <Menu.Item 
                  title="Copy" 
                  leadingIcon="content-copy"
                  onPress={() => {
                    copyToClipboard(requestData);
                    setRequestMenuVisible(false);
                  }} 
                />
                <Menu.Item 
                  title="Share" 
                  leadingIcon="share"
                  onPress={() => {
                    shareText(requestData, 'Request Data');
                    setRequestMenuVisible(false);
                  }} 
                />
              </Menu>
            </View>
            <Surface style={styles.codeBlock}>
              <ScrollView horizontal>
                <Text style={styles.codeText}>{requestData || 'No request sent yet'}</Text>
              </ScrollView>
              {requestData && (
                <View style={styles.quickActionButtons}>
                  <IconButton
                    icon="content-copy"
                    size={16}
                    onPress={() => copyToClipboard(requestData)}
                  />
                  <IconButton
                    icon="share"
                    size={16}
                    onPress={() => shareText(requestData, 'Request Data')}
                  />
                </View>
              )}
            </Surface>
            
            {/* Response section with interactive menu */}
            <View style={styles.textAreaHeader}>
              <Text style={styles.sectionLabel}>Response</Text>
              <Menu
                visible={responseMenuVisible}
                onDismiss={() => setResponseMenuVisible(false)}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    size={20}
                    onPress={() => setResponseMenuVisible(true)}
                    disabled={!responseData}
                  />
                }
              >
                <Menu.Item 
                  title="Copy" 
                  leadingIcon="content-copy"
                  onPress={() => {
                    copyToClipboard(responseData);
                    setResponseMenuVisible(false);
                  }} 
                />
                <Menu.Item 
                  title="Share" 
                  leadingIcon="share"
                  onPress={() => {
                    shareText(responseData, 'Response Data');
                    setResponseMenuVisible(false);
                  }} 
                />
              </Menu>
            </View>
            <Surface style={styles.codeBlock}>
              <ScrollView horizontal>
                <Text style={styles.codeText}>{responseData || 'No response received yet'}</Text>
              </ScrollView>
              {responseData && (
                <View style={styles.quickActionButtons}>
                  <IconButton
                    icon="content-copy"
                    size={16}
                    onPress={() => copyToClipboard(responseData)}
                  />
                  <IconButton
                    icon="share"
                    size={16}
                    onPress={() => shareText(responseData, 'Response Data')}
                  />
                </View>
              )}
            </Surface>
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  halfInput: {
    width: '48%',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  sectionDivider: {
    height: 1,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    width: '48%',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  codeBlock: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 16,
    elevation: 1,
    position: 'relative',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    paddingRight: 40, // Space for the action buttons
  },
  textAreaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickActionButtons: {
    position: 'absolute',
    right: 0,
    top: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    borderBottomLeftRadius: 4,
  },
  fileUploadContainer: {
    marginBottom: 16,
  },
  fileLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  fileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileInput: {
    flex: 1,
    marginRight: 8,
    marginBottom: 4,
  },
  uploadButton: {
    minWidth: 100,
  },
  fileSelectedText: {
    fontSize: 12,
    color: 'green',
    marginTop: 2,
  }
});

export default RegisterCustomer