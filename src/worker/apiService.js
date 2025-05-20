import axios from 'axios';
import { prodConfig } from './sdkworker';


async function createGetRequest(relativeUrl) {

    
  try {
    console.log('Calling GET REQUEST')
    console.log('URL:', relativeUrl);
    const response = await axios.get(relativeUrl);
    return response;
  } catch (error) {
    console.log(error.response.status);
   
    console.error('Error:', relativeUrl, error);
    return error;
  }
}

export function getDetailsByPinCode(pinCode,baseurl) {
  const path = `${baseurl}/state/detailByPincode/${pinCode}`;
    return createGetRequest(path);

}

export function getPincodeList(pinCode,baseurl) {
  const path = `${baseurl}/state/pinCodeList/${pinCode}`;
  return createGetRequest(path);
}

export async function getUserDetails(token,baseurl){
const path = `${baseurl}/user/userDetails`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
    return axios
        .get(path, { headers })
        .then(response => {
        console.log('User details:', response.data);
        return response.data;
        })
        .catch(error => {
        console.error('Error fetching user details:', error);
        throw error;
        });
}

export async function verifyUser(mobile,config){
    console.log(config)
const path = `${config.url}/user/verifyUserMobile`;
  const headers = {
    origin: prodConfig.origin,
    'api-key': prodConfig.apiKey
  };
    return axios
        .post(path, {userMobile:mobile},{ headers })
        .then(response => {
        console.log('User details:', response.data);
        return response.data.InfluencerDetails;
        })
        .catch(error => {
        console.error('Error fetching user details:', error);
        throw error;
        });

}