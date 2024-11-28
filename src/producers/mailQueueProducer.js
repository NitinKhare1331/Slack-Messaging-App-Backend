import '../processors/mailProcessor.js'

import mailQueue from "../queues/mailQueue.js"

export const addEmailToMailQueue = async (emailData) => {
    try {
        await mailQueue.add(emailData);
        console.log('Email added to queue');
        
    } catch (error) {
        console.log('Add email to mail queue error',error);
    }
};