import { adminUrls } from "../endPoints";
import adminApiCalls from "./apiCalls";

// Admin login

export const adminPostLogin = (adminData) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("post", adminUrls.login, adminData)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

