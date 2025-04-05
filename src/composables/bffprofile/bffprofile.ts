import { MaybeRef, ref, watchEffect } from "vue";

export function useBffProfile(queriedUser : MaybeRef<Object>)
{
    const userName = ref("No User");
    const userBody = ref("This area will contain user data");

    // Check if data is an array or simple string/number
    const op  = () => {
        console.log(queriedUser.value)
        // console.log(queriedUser.hasOwnProperty('data'))
        if (queriedUser.value  !== null)
        {

            userName.value = queriedUser.value.data.personalDetails.email;
            userBody.value = queriedUser;
            return userBody;

            
        } 
        // else if (queriedUser.value.name === 'NotFound')
        // {
        //     userName.value = 'No User';
        //     userBody.value = {};
        // }
    }  

    // const parseData = (data : Object) => {
    //     let personalDetails = data.personalDetails;
    //     let orgs = data.organizations;
        
    //     let formattedPd = [];
    //     //Iterate through props
    //     for (let p in personalDetails)
    //     {
    //         if (typeof personalDetails[p] === 'array')
    //         {
    //             if (typeof personalDetails[p][0] === 'object')
    //                 for (let prop in personalDetails[p][0])
    //                     {
                            
    //                     }
    //         }
    //         formattedPd.push([])
    //     }
    // }

    watchEffect(() => {
        op();
    })
    return {userName, userBody};
}