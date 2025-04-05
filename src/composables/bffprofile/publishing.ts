import { fetchData } from "@/utils/fetchdata";
import { MaybeRef, Ref, ref, watch, watchEffect } from "vue";


// userId will be based on queried User
export function usePublishUser (
    queriedUser: Ref<Object>, 
    accessToken: Ref<String>, 
    isPublished: Ref<Boolean>) {

    const publicFields = ref("");
    const publishUser = async () => {
        let publishedId = queriedUser.value.id;
        const url = `http://localhost:7500/bffs/profiles/${publishedId}:publish`;
        let formattedArray = null;
        if (publicFields.value.trim() === "")
        {
            formattedArray = [];
        } else {
            formattedArray = publicFields.value.replace(/\s/g, "").split(",");
        }
        let params = {'Authorization' : `Bearer ${accessToken.value}`};
        let body = { publicFields: formattedArray };
        
        await fetchData(url, 'POST', body, params)
        .then((r) =>{ 
            console.log(r)
            if (Object.keys(r).length === 0 || r.name !== 'Unauthorized') isPublished.value = true;
            else isPublished.value = false;
        })

    }
            
    return { publicFields, publishUser }
  }
  
  export function useUnpublishUser (
    userId: Ref<Object>, 
    accessToken: Ref<String>, 
    unpublishPressed: Ref<Boolean>, 
    isPublished: Ref<Boolean>) {

    
    const unpublishUser = async () => {
        const url = `http://localhost:7500/bffs/profiles/${userId.value}:unpublish`;
        let params = {'Authorization' : `Bearer ${accessToken.value}`};

        await fetchData(url, 'POST', undefined, params)
        .then((r) => {
            console.log(r)
            if (r.name !== 'Unauthorized') isPublished.value = false;
            else isPublished.value = true;
        })        
    }

    return { unpublishUser };
  }