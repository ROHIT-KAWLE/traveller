<script setup lang="ts">
interface CustomFormData {
  id: string
  tagline: string | null
  headline: string | null
  form: CustomForm
}
interface CustomForm {
  id: string
  on_success?: 'redirect' | 'message' | null
  sort?: number | null
  submit_label?: string | null
  success_message?: string | null
  title?: string | null
  success_redirect_url?: string | null
  is_active?: boolean | null
  fields: FormField[]
}

const { setAttr } = useVisualEditing()
defineProps<{ data: CustomFormData }>()
</script>

<template>
  <section
    v-if="data.form"
    class="w-full bg-[var(--background-variant-color)] text-white rounded-2xl px-6 py-10 md:px-12 md:py-14"
  >
    <div class="max-w-3xl mx-auto text-center">

      <Tagline
        v-if="data.tagline"
        :tagline="data.tagline"
        class="!text-white/70"
        :data-directus="setAttr({ collection: 'block_form', item: data.id, fields: 'tagline', mode: 'popover' })"
      />

      <Headline
        v-if="data.headline"
        :headline="data.headline"
        class="!text-white"
        :data-directus="setAttr({ collection: 'block_form', item: data.id, fields: 'headline', mode: 'popover' })"
      />

      <div
        class="mt-8"
        :data-directus="setAttr({ collection: 'block_form', item: data.id, fields: ['form'], mode: 'popover' })"
      >
        <FormBuilder :form="data.form" class="[&_input]:bg-white/10 [&_input]:text-white [&_input]:border-white/20 [&_input::placeholder]:text-white/50 [&_label]:text-white/80 [&_button[type=submit]]:bg-white [&_button[type=submit]]:text-gray-900 [&_button[type=submit]]:font-bold [&_button[type=submit]]:hover:bg-white/90" />
      </div>

    </div>
  </section>
</template>