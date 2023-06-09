<script setup lang="ts">
import { Form } from 'vee-validate'
import * as Yup from 'yup'

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2))
}

function onInvalidSubmit() {
  console.log('==================>错误')
  const submitBtn = document.querySelector('.submit-btn')!
  submitBtn.classList.add('invalid')
  setTimeout(() => {
    submitBtn.classList.remove('invalid')
  }, 1000)
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
})
</script>

<template>
  <div class=" bg-gray-200 rounded-xl  p-5 w-[400px] h-[500px]">
    <Form :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
      <TextInput name="name" type="text" label="Full Name" placeholder="Your Name" success-message="Nice to meet you!" />
      <TextInput
        name="email" type="email" label="E-mail" placeholder="Your email address"
        success-message="Got it, we won't spam you!"
      />
      <TextInput
        name="password" type="password" label="Password" placeholder="Your password"
        success-message="Nice and secure!"
      />
      <TextInput
        name="confirm_password" type="password" label="Confirm Password" placeholder="Type it again"
        success-message="Glad you remembered it!"
      />

      <button class="submit-btn w-full rounded-md bg-blue-500 p-4 border-none text-white" type="submit">
        Submit
      </button>
    </Form>
  </div>
</template>

<style scoped>

</style>
