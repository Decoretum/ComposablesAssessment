import { fetchData } from "@/utils/fetchdata";
import { ref, Ref } from "vue";

export function useAuth (
    queriedUser: Ref<Object>,
    authenticated: Ref<Boolean>, 
    email: Ref<String>, 
    password: Ref<String>, 
    accessToken: Ref<String>, 
    isPublished: Ref<Boolean>,
    ) {

    const userData = ref(null);

    const login  = async () => {
        const url = 'http://localhost:7500/authentication';
        let body = {email: email.value, password: password.value};

        let payload = await fetchData(url, 'POST', body);

        // Not authenticated / Failed Login
        if (payload.className === 'not-authenticated') return;
        console.log(authenticated)
        userData.value = payload;
        authenticated.value = true;
        accessToken.value = payload.accessToken;

        // Query User
        let userId = userData.value.authentication.payload.uid;
        const accUrl = `http://localhost:7500/bff/profiles/${userId}`;
        let query = await fetchData(accUrl, 'GET', undefined);
        
        console.log(userData.value)
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

    return { userData, login };
  }