<script setup lang="ts">
import { ref, reactive, h } from 'vue';
import {RequestObject, personalDetails} from './dataschemas/RequestObject'
import GaelComponent from './components/GaelComponent.vue';
import { login } from './composables/auth/auth';
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup';
import { InputText, Card } from 'primevue';
import { useProfile } from './composables/auth/formatprofile';
import { useBffProfile } from './composables/bffprofile/bffprofile';

const message = ref("Default Act");
const baseUrl = 'https://api.stg.mycure.md';

const resultArr = reactive([]);

// Unwrapping is present here as a reactive object property
const babyI = ref(0);
const testObj = reactive({
  babyI 
})

testObj.babyI += 200;
console.log(babyI.value);

// No unwrapping done here, unlike if a ref is accessed or mutated as a property of a reactive object
const testArr = reactive([ref(209)]);
const testMap = reactive(new Map([['count', 0]]));


// General Controller
async function getData(reqObject : RequestObject) : Promise<object[]>
{
  console.log("Initializing Client Operations");
  const path = reqObject.url.substring(baseUrl.length);
  if (path === '/personal-details')
  {
    let arr : personalDetails = await fetchPersonalDetails(reqObject.url);
    if (arr !== undefined)
    {
      console.log("fetching DONE");
    }
    return arr.data;
  }
}

async function fetchPersonalDetails(url : string) : Promise<personalDetails>
{
  // Search Parameters for a Request
  const params = new URLSearchParams();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "*");

return await fetch(url, {
    method: "GET",
    headers: headers
  })
  .then((r) => {
    return r.json();
  })
  .then((r) => {return r;})

}


let rObj : RequestObject = {
  url: baseUrl + '/personal-details',
  operation: 'GET'
}

// ---------------------- Assessment ------------------------------------------------------------------

// Make Button to update ref for email and pass (login)
// Make composable to format data of profile

// Make Button to publish / unpublish current profile
// Button should be dynamic


const email = ref("");
const pass = ref("");

const userData = ref(null);
const doneFetching = ref(false);
const authenticated = ref(false);

const accessToken = ref("");
const currentUser = ref("");
const userId = ref("");


const loginUser = async () => {
  const payload = await login(email, pass);
  userData.value = payload;

  // Not authenticated / Failed Login
  if (payload.className === 'not-authenticated')
  {
    return;
  }

  authenticated.value = true;
  accessToken.value = payload.accessToken;
  currentUser.value = payload.authentication.payload;
}

const {title, bodyText} = useProfile(userData); 



</script>

<template>
  <header>
  </header>

  <main>
    <!-- <div v-if="doneFetching === true">
      <div v-for="item of resultArr">
        <GaelComponent :detailObj="item" class="mt-20" /> <br/><br/>
      </div>
    </div>
    <div v-else>
    </div> -->

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div style="margin-right: 10vw; grid-column: 1; max-width: 30vw; margin-bottom: 5vh;">
        <Card style="background-color:bisque; color: black;" v-if="authenticated === false || title === 'Not authenticated'">
              <template #title>{{ title }}</template>
              <template #content> {{ bodyText }} </template>
        </Card>
        <Card style="background-color:bisque; color: black" v-else>
          <template #title> {{ title }}</template>
          <template #content> {{ bodyText }} </template>
        </Card>    
      </div>

        <div style="margin-right: 10vw; grid-column: 1; width: 50vw;">
          <Card style="background-color: antiquewhite; color: black;">
            <template #title> Data </template>
            <template #content> data </template>
          </Card>
        </div>
        
        <div style="grid-column: 2; width: 15vw;">
          <InputGroup>
            <InputText v-model="email" placeholder="Email" />
          </InputGroup>

          <InputGroup style="margin-top: 2vh;">
            <InputText v-model="pass" placeholder="Password" />
          </InputGroup>

          <Button style="margin-top: 2vh;" @click="loginUser" label="Login"/>

          <Card style="background-color: antiquewhite; color: black; margin-top: 8vh;">  
            <template #title> Query User Profile </template>
            <template #content> 
              <InputGroup>
                <InputText v-model="userId" style="background-color: azure; color: black;" placeholder="User ID" />
              </InputGroup>
            </template>
            
          </Card>
          
        </div>

    </div>
    
  </main> 
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
