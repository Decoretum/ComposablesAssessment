import { fetchData } from "@/utils/fetchdata";
import { Ref, ref, watch } from "vue";

export function useQueryUser (
    authenticated : Ref<Boolean>, 
    accessToken : Ref<String>
    ) {

    // Initialize and Declare variables
    const queriedUser = ref(null);
    const userId = ref("");
    const isPublished = ref(false);
    let params = undefined;
    
    // Declare and initialize functions
    const queryUser = async () => {
        const url = `http://localhost:7500/bffs/profiles/${userId.value}`;
        if (authenticated.value === true)
        {
            params = {'Authorization' : `Bearer ${accessToken.value}`};
        }
       
        let query = await fetchData(url, 'GET', undefined, params);
        queriedUser.value = query;
        queriedUser.value.id = userId.value;
        let queryValue = queriedUser.value;
        if (queryValue.hasOwnProperty('data'))
        {
            if (queryValue['data']['personalDetails'].hasOwnProperty('tags'))
            {
                if (queryValue['data']['personalDetails']['tags'].includes('unpublished'))
                {
                    isPublished.value = false;
                } 
                else
                {
                    isPublished.value = true;
                }
            } 
            else 
            {
                isPublished.value = true;
            }
        } 
        else 
        {
            isPublished.value = true;
        }
        console.log(queriedUser)
       
    }

    return { queriedUser, isPublished, queryUser, userId };
    
  }