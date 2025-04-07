import { fetchData } from "@/utils/fetchdata";
import { ref, Ref } from "vue";

export function useAuth (
    queriedUser: Ref<Object>,
    isPublished: Ref<Boolean>,
    authenticated: Ref<Boolean>,
    accessToken: Ref<String>
    ) {

    // Declare and initialize variables
    const email = ref("");
    const password = ref("");
    const userData = ref(null);
    
    // Declare and initialize functions
    const login  = async () => {
        const url = 'http://localhost:7500/authentication';
        let body = {email: email.value, password: password.value};
        let payload = await fetchData(url, 'POST', body);
        console.log(payload)

        // Not authenticated / Failed Login
        if (payload.className === 'not-authenticated') return;

        // Authenticated
        console.log(authenticated)

        userData.value = payload;
        authenticated.value = true;
        accessToken.value = payload.accessToken;

        // Query Account of authenticated User
        let authenticatedUserId = userData.value.authentication.payload.uid;
        const authenticatedAccUrl = `http://localhost:7500/bff/profiles/${authenticatedUserId}`;
        let query = await fetchData(authenticatedAccUrl, 'GET', undefined);
        
        console.log(userData.value)

        // Checking if the Last Queried User is published or unpublished
        if (queriedUser.hasOwnProperty('data') && queriedUser.value !== null)
        {
            if (query['data']['personalDetails'].hasOwnProperty('tags'))
            {
                if (query['data']['personalDetails']['tags'].includes('unpublished'))
                {
                    isPublished.value = false;
                }
            }
            else
            {
                isPublished.value = true;
            }      
        } 
        else 
        {
            isPublished.value = false;
        }
        queriedUser.value = null;
    }

    return { userData, login, email, password };
  }