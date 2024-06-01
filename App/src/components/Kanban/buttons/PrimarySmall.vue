<template>
  <div 
      :class="divClasses">
    <button
      type="button"
      v-bind="$attrs"
      :class="buttonClasses"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CustomButton',
  computed: {
    buttonClasses() {
      // Здесь предполагается, что router есть в контексте (например, вы используете Vue Router)
      const isCalendar = this.$router.currentRoute.value.path === '/Calendar'
      return {
        'text-sm font-bold py-3 px-4 rounded-3xl bg-main-purple hover:bg-main-purple-light': true,
        'hover:bg-gray dark:hover:bg-very-dark-grey dark:hover:text-white hover:text-black dark:text-white text-black text-md font-bold rounded-none dark:bg-dark-grey bg-white  hover:bg-main-light-gray m-[-5px]': isCalendar
      }
    },
    divClasses() {
      // Здесь предполагается, что router есть в контексте (например, вы используете Vue Router)
      const isCalendar = this.$router.currentRoute.value.path === '/Calendar'
      return {
        '': true,
        '': isCalendar
      }
    }
  }
}
</script>