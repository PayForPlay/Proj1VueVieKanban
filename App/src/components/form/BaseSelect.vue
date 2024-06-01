<!-- form/BaseSelect.vue -->
<template>
  <div>
    <label
      v-if="inputName"
      :for="inputName"
      class="text-medium-grey dark:text-white text-xs font-bold"
    >
      {{ inputName }}
    </label>
    <div
      ref="select"
      @focusin="onFocusSelect"
      tabindex="1"
      class=" w-full text-sm text-black dark:text-white font-bold rounded px-4 py-5 relative flex items-center border border-medium-grey border-opacity-25 cursor-pointer hover:border-main-purple focus:border-main-purple group"
    >
      <input
        ref="inputSelect"
        disabled
        :value="placeholder"
        class=" bg-white absolute left-2 top-2 w-3/4 dark:bg-dark-grey cursor-pointerp placeholder:text-medium-grey dark:text-white"
      />
      <IconArrowDown class="absolute right-2 group-focus:hidden" />
      <div
        div
        ref="options"
        class="hidden rounded left-0 top-full mt-4 w-full bg-white dark:bg-dark-grey group-focus:block"
      >
        <div
          @click="onClickOption(option.value, option.label, props.inputName)"
          class="p-4 text-medium-grey hover:text-black dark:hover:text-white border-medium-grey border-opacity-25"
          v-for="(option, index) in options"
        >
          {{ option.label }}
        </div>
      </div>
      <IconArrowUp class="absoulute right-2 hidden group-focus:block" />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed} from 'vue';
import IconArrowDown from "../Kanban/icons/IconArrowDown.vue";
import IconArrowUp from "../Kanban/icons/IconArrowUp.vue";
const select = ref(null);
// const options = ref([])
const inputSelect = ref(null);
const selectedOption = ref(null);
const props = defineProps([ "inputName", "options"]);
const emit = defineEmits(['update:model', 'onClickOption']);

const onFocusSelect = () => {
  select.value.scrollIntoView({ behavior: "smooth", block: "end" });
};
const onClickOption = (value, label, inputName) => {
  // emit('update:model', value);
  
  selectedOption.value = label;
  select.value.blur();
  emit("onClickOption", { value, label, inputName})
};

const placeholder = computed(() => selectedOption.value || props.inputName);
</script>

<!-- <template>
  <div>
    <label v-if="inputName" :for="inputName" class="text-medium-grey dark:text-white text-xs font-bold">
      {{ inputName }}
    </label>
    <select v-model="model">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['v-model', 'inputName', 'options']);

const model = ref(props['v-model']);

</script> -->
