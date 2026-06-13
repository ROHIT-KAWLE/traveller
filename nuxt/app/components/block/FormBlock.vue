<script setup lang="ts">
interface CustomFormData {
  id: string
  tagline?: string | null
  headline?: string | null
  form: {
    id: string
    on_success?: 'redirect' | 'message' | null
    submit_label?: string | null
    success_message?: string | null
    title?: string | null
    success_redirect_url?: string | null
    is_active?: boolean | null
    fields: any[]
  }
}

const { setAttr } = useVisualEditing()
defineProps<{ data: CustomFormData }>()
</script>

<template>
  <section
    v-if="data.form"
    class="w-full bg-[var(--background-variant-color)] text-white px-6 py-14 md:py-20"
  >
    <Container>
      <div class="max-w-3xl mx-auto text-center">

        <p
          v-if="data.tagline"
          class="uppercase tracking-widest text-white/60 text-sm mb-2"
          :data-directus="setAttr({ collection: 'block_form', item: data.id, fields: 'tagline', mode: 'popover' })"
        >
          {{ data.tagline }}
        </p>

        <h2
          v-if="data.headline"
          class="font-heading text-white text-3xl md:text-4xl font-bold mb-8"
          :data-directus="setAttr({ collection: 'block_form', item: data.id, fields: 'headline', mode: 'popover' })"
        >
          {{ data.headline }}
        </h2>

        <div
          :data-directus="setAttr({ collection: 'block_form', item: data.id, fields: ['form'], mode: 'popover' })"
          class="[&_label]:text-white/80 [&_label]:text-sm [&_input]:bg-white/10 [&_input]:text-white [&_input]:border-white/20 [&_input::placeholder]:text-white/40 [&_textarea]:bg-white/10 [&_textarea]:text-white [&_textarea]:border-white/20 [&_select]:bg-white/10 [&_select]:text-white [&_select]:border-white/20 [&_button[type=submit]]:bg-white [&_button[type=submit]]:text-gray-900 [&_button[type=submit]]:font-bold [&_button[type=submit]]:w-full [&_button[type=submit]]:py-3 [&_button[type=submit]]:rounded-lg [&_button[type=submit]]:hover:bg-white/90 [&_button[type=submit]]:transition-colors"
        >
          <FormBuilder :form="data.form" />
        </div>

      </div>
    </Container>
  </section>
</template>