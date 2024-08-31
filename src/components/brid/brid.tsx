// utils/browserId.js
import { v4 as uuidv4 } from 'uuid';

export const getBrowserId = () => {
    // Check if the browser ID already exists in local storage
    let browserId:any = localStorage.getItem('brId');
    
    // If it doesn't exist, create a new one and store it
    if (!browserId) {
        browserId = uuidv4();
        localStorage.setItem('brId', browserId);
    }

    return browserId;
};