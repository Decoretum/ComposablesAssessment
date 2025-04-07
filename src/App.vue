<script setup lang="ts">
import { ref, reactive, h } from 'vue';
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup';
import { InputText, Card } from 'primevue';
import { usePublishUser, useUnpublishUser } from './composables/bffprofile/publishing';
import { usePublishing } from './composables/bffprofile/publishing';
import { useQueryUser } from './composables/dataaccess/query';
import { useAuth } from './composables/auth/login';

// Importing composables and their results and dependencies
const authenticated = ref(false);
const accessToken = ref("");
const { queriedUser, isPublished, queryUser, userId } = useQueryUser(authenticated, accessToken);
const { userData, login, email, password } = useAuth(queriedUser,isPublished, authenticated, accessToken); 
const { publishUser, unpublishUser, publicFields } = usePublishing(queriedUser, accessToken, isPublished);
</script>

<template>
  <header>
  </header>

  <main>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div style="margin-right: 10vw; grid-column: 1; max-width: 30vw; margin-bottom: 5vh;">
        <Card style="background-color:bisque; color: black;" v-if="authenticated === false">
              <template #title> No user Logged in </template>
              <template #content> Login using the Login panel on the right </template> 
        </Card>
        <Card style="background-color:bisque; color: black" v-else>
          <template #title> Authenticated </template>
          <template #content> Logged in: {{ userData.user.email }} </template>
        </Card>    
      </div>

        <div style="margin-right: 10vw; grid-column: 1; width: 50vw;">
            <div v-if="queriedUser !== null && queriedUser.name !== 'NotFound'">
              <Card style="background-color: antiquewhite; color: black;">
                <template #title> {{queriedUser.data.personalDetails.email}} </template>
                <template #content> {{ queriedUser.data }} </template>
              </Card>
            </div>
            <div v-else>
              <Card style="background-color: antiquewhite; color: black;">
                <template #title> This will contain the queried user's email </template>
                <template #content> This will contain the queried user's data </template>
              </Card>
            </div>
            
          
        </div>
        
        <div style="grid-column: 2; width: 15vw;">
          <InputGroup>
            <InputText v-model="email" placeholder="Email" />
          </InputGroup>

          <InputGroup style="margin-top: 2vh;">
            <InputText v-model="password" placeholder="Password" />
          </InputGroup>

          <Button style="margin-top: 2vh;" @click="login" label="Login"/>

          <Card style="background-color: antiquewhite; color: black; margin-top: 8vh;">  
            <template #title> Query User Profile </template>
            <template #content> 
              <InputGroup>
                <InputText v-model="userId" style="background-color: azure; color: black;" placeholder="User ID" />
              </InputGroup>
            </template>
          </Card>

          <div v-if="authenticated === true">
            <Card style="background-color: antiquewhite; color: black; margin-top: 8vh;"> 
            <template #title> Public Fields </template>
            <template #content> 
              <InputGroup>
                <InputText v-model="publicFields" style="background-color: azure; color: black;" placeholder="User ID" />
              </InputGroup>
            </template>
            </Card> 
          </div>

          <div style="display: flex;">
            <Button style="margin-top: 2vh;" @click="queryUser" label="Query"/>
            <div v-if="authenticated === true">
              <div v-if="isPublished === false">
                <Button style="margin-top: 2vh; margin-left: 2vw;" @click="publishUser" label="Publish"/>  
              </div>
              <div v-else>
                <Button style="margin-top: 2vh; margin-left: 2vw;" @click="unpublishUser" label="Unpublish"/>  
              </div>
            </div>
          </div>
          
          
          
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
