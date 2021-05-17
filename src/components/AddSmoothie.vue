<template>

<div class="container add-smoothie">

   <h2 class="center-align indigo-text" >Add new smoothie recipe</h2>
   
   <form @submit.prevent = "addSmoothie">

       <div class="field title">
           <label for="title">Smoothie title:</label>
           <input type="text" name="title" v-model="title">
       </div>

       <div v-for="(ing, index) in ingredients" :key="index" class="field">
           <label for="ing">Ingredient:</label>
           <input type="text" name="ing" v-model="ingredients[index]">
           <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
       </div>

        <div class="field ingredient">
           <label for="ingredient">Add an ingredient:</label>
           <input type="text" name="ingredient" @keydown.tab.prevent="addIng" v-model="another" >
       </div>

       <div class="field center-align">
           <p v-if="feedback" class="red-text">{{ feedback }}</p>
           <button class="btn pink">Add Smoothie</button>
       </div>

   </form>

</div>

</template>

<script>

import db from '@/Firebase/Init'
import slugify from 'slugify'

export default {
    name:'AddSmoothie',
    data (){
        return{
            title : null,
            another: null,
            ingredients: [],
            feedback: null,
            slug : null
        }
    },

    methods:{
        addSmoothie(){
           if(this.title){
               this.feedback = null

                //create slug
                this.slug = slugify(this.title, {
                    replacement: "-",
                    remove: /[*+~.()'"!:@]/g,
                    lower: true
                })

               db.collection('smoothies').add({
                   title : this.title,
                   ingredients : this.ingredients,
                   slug : this.slug
               }).then(()=>{
                   this.$router.push({name:'Index'})
                   }).catch(err =>{
                       console.log(err)
                   })

           }else{
               this.feedback = 'You must enter a title'
           }
        },
        addIng(){
            if(this.another){
              this.ingredients.push(this.another)  
              console.log(this.ingredients)
              this.another = null
              this.feedback = null
            }else{
                this.feedback = "Please an ingredient"
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingred =>{
                return ingred != ing
            })
        }
    }
}
</script>

<style scoped>
.add-smoothie{
    margin-top: 3em;
    padding: 2em;
    max-width: 600px;
}

.add-smoothie h2{
    font-size: 2.5rem;
    margin: 1em auto;
}

.add-smoothie .field{
    margin: 1.5em auto;
    position: relative;
}

.add-smoothie .delete{
  position: absolute;
  top: 4px;
  right: 0;
  cursor: pointer;
  color:#aaa;
  font-size: 1.4rem
}
</style>
