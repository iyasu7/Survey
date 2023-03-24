  <template>
    <pageComponent>
      <template v-slot:header>
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
          <RouterLink :to="{ name: 'SurveyCreate' }" class="py-2 px-3 text-white bg-emerald-400 
                rounded-md over:bg-emerald-600">Add New survey<svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 -mt-1 inline-block">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg></RouterLink>


        </div>
        <div class="grid gird-clos-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="survey in surveys" :key="survey.id"
            class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
            <img src="survey.image" alt="img" class="w-full h-48 object-cover">
            <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
            <div v-html="survey.description" class="overflow-hidden flex-1"></div>
            
              <div class="flex justify-between items-center mt-3">
              <RouterLink :to="{ name: 'SurveyView', params: { id: survey.id } }" class="flex py-2 px-4 border border-transport text-sm rounded-md
                  text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-2 
                    focus:ring-offset-2 focus:ring-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit</RouterLink>
              <button v-if="'survey.id'" class="h-8 w-8 flex items-center justify-center rounded-full
                  text-sm text-red-500 border border-transparent focus:ring-2 
                    focus:ring-offset-2 focus:ring-red-500" type="button" @click="deleteSurvey(survey)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
              </button>
            </div>
          
          </div>
        </div>
        <div class="w-72 bg-white text-gray-100 shadow-lg">
  </div>
      </template>
    </pageComponent>
  </template>

  <script setup>
  import { RouterLink } from 'vue-router';
  import pageComponent from '../components/pageComponent.vue';
  import store from '../store';
  import { computed } from "vue";

  const surveys = computed(() => store.state.surveys);
  function deleteSurvey(survey) {
    if (confirm('Are you sure you want to delete this survey?can\'t be UNDONE')){
      //delete survey
    }
  }

  </script>
  <style scoped>

  </style>