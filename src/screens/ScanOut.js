import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Share, Clipboard, ToastAndroid, Platform } from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  Provider as PaperProvider, 
  DefaultTheme,
  RadioButton,
  Card,
  Divider,
  Surface,
  IconButton,
  Menu,
  Tooltip,
  ActivityIndicator
} from 'react-native-paper';
import { validateRetailerCoupon } from 'react-native-vg-retailer-sdk';

const ScanOut = () => {
  const [formData, setFormData] = React.useState({
    category: 'Customer',
    couponCode: '9516304880380631',
    from: 'SDK',
    geolocation: '',
    latitude: '12.892242',
    longitude: '77.5976361',
    retailerCoupon: 'true',
    pin: '',
  });
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState('');
  const [responseData, setResponseData] = useState('');
  
  // Menu visibility states
  const [requestMenuVisible, setRequestMenuVisible] = useState(false);
  const [responseMenuVisible, setResponseMenuVisible] = useState(false);

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    // Format the request data as JSON string for display
    const formattedRequest = JSON.stringify(formData, null, 2);
    setRequestData(formattedRequest);
    setLoading(true);
    // Here you would normally make an API call with the formData
    // For demo purposes, we'll just set a mock response
    let data = await validateRetailerCoupon(formData);
    setLoading(false);
    setResponseData(JSON.stringify(data, null, 2));
  };

  // Clear the form
  const handleClear = () => {
    setFormData({
      category: '',
      couponCode: '',
      from: 'SDK',
      
      retailerCoupon: 'false',
      pin: '',
    });
    setRequestData('');
    setResponseData('');
  };

  // Function to handle barcode scanning
  const handleScan = () => {
    // In a real app, this would integrate with the device camera for scanning
    // For demo purposes, just simulate a scan with a random code
    const randomCode = Math.floor(Math.random() * 10000000000000000).toString();
    handleChange('couponCode', randomCode);
    showToast('Coupon code scanned');
  };

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    showToast('Copied to clipboard');
  };

  // Share function
  const shareText = async (text, title) => {
    try {
      await Share.share({
        message:text,
        title: title,
      });
    } catch (error) {
        console.error('Error sharing content:', error);
      showToast('Error sharing content');
    }
  };

  // Toast message function
  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      // For iOS you would typically use a custom toast or alert
      // This is just a placeholder
      alert(message);
    }
  };

  const samplebody = {
    category: 'Customer',
    couponCode: '9516304880380631',
    from: 'APP',
    geolocation: '',
    latitude: '12.892242',
    longitude: '77.5976361',
    retailerCoupon: 'true',
    pin: '',
  };

  return (
    <PaperProvider theme={DefaultTheme}>
      <ScrollView style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <Card style={styles.card}>
          <Card.Title title="Coupon Form" subtitle="Enter coupon details" />
          <Card.Content>
            <TextInput
              label="Category"
              value={formData.category}
              onChangeText={(text) => handleChange('category', text)}
              style={styles.input}
              mode="outlined"
            />

            <View style={styles.rowContainer}>
              <TextInput
                label="Coupon Code"
                value={formData.couponCode}
                onChangeText={(text) => handleChange('couponCode', text)}
                style={[styles.input, {flex: 1, marginRight: 8}]}
                mode="outlined"
              />
             
            </View>

          

            

           

            <Text style={styles.sectionLabel}>Retailer Coupon</Text>
            <RadioButton.Group
              onValueChange={(value) => handleChange('retailerCoupon', value)}
              value={formData.retailerCoupon}
            >
              <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
                  <RadioButton value="true" />
                  <Text>Yes</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="false" />
                  <Text>No</Text>
                </View>
              </View>
            </RadioButton.Group>

            <TextInput
              label="PIN"
              value={formData.pin}
              onChangeText={(text) => handleChange('pin', text)}
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    color: '#555',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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
  scanButton: {
    marginTop: 6,
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
  }
});

export default ScanOut;