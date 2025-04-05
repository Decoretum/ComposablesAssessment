<script setup lang="ts">
import { personalDetailObject } from '@/dataschemas/RequestObject';
import { ref, reactive, h, Ref } from 'vue';

const props = defineProps({
    detailObj: Object
})

const dObj = ref([])

interface customObj {
    name: String,
    message: String
}

let obj : customObj = {
    name: "Gael",
    message: "Sakalam"
}

dObj.value.push(obj);

// Change value of a Reference Object through index
function changeObj (obj: Ref<customObj[]>, index: number) : void
{
    obj.value[index].message = "To reclaim Philippines and make it great again";
}

changeObj(dObj, 0);

function displaySpecialties(ad : Array<string>) : String
{
    if (ad === undefined) return "No Specialty";

    let s = "";
    for (let i of ad) {
        s += i + ", ";
    }
    return s.substring(0, s.length - 2);
}

function displayPersonalDetail (pd : personalDetailObject) : personalDetailObject
{
    return pd;
}





</script>

<template>
    <main>
        <!-- <div> ID: {{ props?.detailObj?.id }}, First Name: {{ props?.detailObj?.name?.firstName }} </div>
        <div> Service Specialties: {{ displaySpecialties(props?.detailObj?.doc_specialties) }}  </div>
        <div> Message of the GM: {{ dObj[0].message }}</div> -->
        <div> {{ displayPersonalDetail(<personalDetailObject> props.detailObj) }}</div>
    </main>


</template>