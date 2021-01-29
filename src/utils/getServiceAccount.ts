export const getServiceAccount = ()=>{
  if (process.env.NODE_ENV === 'production' && process.env.FIRE && process.env.private_key) {
    const serviceAccount = JSON.parse(process.env.FIRE)
    const privateKey = process.env.private_key
    serviceAccount.privateKey = privateKey
    return serviceAccount
  } else if (process.env.NODE_ENV === 'development') {
    const serviceAccount = require('../../8889eb754138.json');
    return serviceAccount
  }
}