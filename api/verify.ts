import { TWILIO_URL } from "../store/constants";

export const sendSmsVerification = async (phoneNumber : any) => {
    try {
        const data = JSON.stringify({
            phone: phoneNumber,
            mode: 'verify'
        });
        const response = await fetch(`${TWILIO_URL}`, {
            method: "post",
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
        });

        const json = await response.json();
        const result = JSON.parse(json)
        if(result.status == 'pending'){
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const checkVerification = async (phoneNumber : any, code : any)  => {
    try {
        const data = JSON.stringify({
            phone: phoneNumber,
            mode: 'check',
            code,
        });

        const response = await fetch(`${TWILIO_URL}`, {
            method: "post",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });

        const json = await response.json();
        const result = JSON.parse(json)
        if(result.status == 'approved'){
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};