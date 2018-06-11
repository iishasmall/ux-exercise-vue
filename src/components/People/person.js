import Vue from 'vue';

import { starWarsResource } from 'src/util/resources';
import template from './person.html';

export default Vue.extend({
  template,

  data() {
    return {
      person: {},
      transport:'N/A'
    };
  },

  created(){
    this.fetchPost();
  },

  methods: {
    fetchPost(){
      const id = this.$route.params.id;

      return starWarsResource.get(`people/${id}`)
        .then((response) => {
          this.person = response.data;

         if(this.person.vehicles.length!=0){

            return starWarsResource.get(this.person.vehicles[0])
            .then((response)=> {
              this.transport = response.data.name;
            })
            .catch((errorResponse) => {
              // Handle error...
              console.log('API responded with:', errorResponse);
            });
          }

        })
        .catch((errorResponse) => {
          // Handle error...
          console.log('API responded with:', errorResponse);
        });


    }


  }

});
