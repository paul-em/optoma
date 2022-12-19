
<script setup>
const title = ref('Hi')
let projectorStatus = ref({})
const ip = ref('')
if (process.client) {
    ip.value = localStorage.getItem('ip') || '';
  }
const storeIp = () => {
  if (process.client) {
    localStorage.setItem('ip', ip.value);
  }
}
async function sendRequest(command, val) {
  try {
    const response = await fetch('/api/control', {
      method: 'POST',
      body: JSON.stringify({
        ip: ip.value,
        command,
        val,
      }),
    });
    projectorStatus.value = await response.json();
  } catch (error) {
    console.log('error', error)
  }
}

sendRequest('QueryControl', 'QueryControl');
</script>

<template>
  <div>
  <input v-model="ip" @input="storeIp"/>
  <div>
    <p>
      Status:
      {{ projectorStatus.pw === '1' ? 'On': 'Off'}}
    </p>
    <p>
      Volume:
      {{ projectorStatus.m }}
    </p>
  </div>
  <button @click="sendRequest('vol1', '-')">
    Volume down
  </button>
  <button @click="sendRequest('vol2', 'vol2')">
    Volume up
  </button>
  <button @click="sendRequest('btn_powoff', 'Power Off')">
    Power off
  </button>
  <button @click="sendRequest('btn_powoff', 'Power On')">
    Power on
  </button>
  <button @click="sendRequest('QueryControl', 'QueryControl')">
    Check
  </button>
  {{ turnedOn }}
  </div>
</template>
