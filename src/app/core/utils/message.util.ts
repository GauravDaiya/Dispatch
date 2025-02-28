const messages = {
    customer: {
        firstName: {
            required: 'First name is required',
            minLength: 'First name should be at least 1 character long',
        },
        businessName: {
            required: 'Business name is required',
        },
        phoneNumber: {
            required: 'Phone number is required',
        },
        carrierName: {
            required: 'Carrier Name is required',
        },
        email: {
            required: 'Please enter your email address',
            email: 'Please enter a valid email address',
        },
        notes: {
            maxLength: 'Notes must be less than 250 characters',
        },
        address: {
            required: 'Address is required',
        },
        city: {
            required: 'City is required',
        },
        state: {
            required: 'State is required',
        },
        zip: {
            required: 'Zip code is required',
            minlength: 'Zip Code should be at least 5 digit long',
            pattern: 'Zip Code should be at least 5 digit long',
        },
        country: {
            required: 'Country is required',
        },
    }
}

export class MessagesUtil {
    readonly messages: any;
    constructor() {
        this.messages = messages;
    }
    public getMessage<
        T extends keyof Partial<typeof messages>,
        S extends keyof Partial<typeof messages[T]>,
        C extends keyof Partial<typeof messages[T][S]>
    >(key: T, subKey?: S, subChildKey?: C): any {
        if (subKey && subChildKey) {
            return this.messages[key][subKey][subChildKey];
        } else if (subKey && !subChildKey) {
            return this.messages[key][subKey];
        }
        return this.messages[key];
    }

}

export const MessagesClass = new MessagesUtil();
