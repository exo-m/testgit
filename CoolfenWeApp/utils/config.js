/**
 * Created by feng on 2017/2/14.
 */
const localServiceUrl = 'https://localhost/WebApi';
const demoServiceUrl = 'https://tfs.coolfen.com/apidemo';
const prodServiceUrl = 'https://api.coolfen.com';
const version = '0.0.3';
const baseUrl = prodServiceUrl;
const appGuid = 'B0142D38-20D8-4EE1-95F0-E0CB0EA6273A';
module.exports={
    appGuid:appGuid,
    version:version,
    baseUrl:baseUrl,
    baseApiUrl:baseUrl+'/api',
    tokenUrl:baseUrl+'/token'
};