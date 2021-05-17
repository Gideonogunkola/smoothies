<template>
    <div class="edit-smoothie container">
        <h2 v-if="smoothie"> Edit {{smoothie.title}} Smoothie</h2>
           <form @submit.prevent = "EditSmoothie">

       <div class="field title">
           <label for="title">Smoothie title:</label>
           <input type="text" name="title" v-model="smoothie.title">
       </div>

       <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
           <label for="ing">Ingredient:</label>
           <input type="text" name="ing" v-model="smoothie.ingredients[index]">
           <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
       </div>

        <div class="field ingredient">
           <label for="ingredient">Add an ingredient:</label>
           <input type="text" name="ingredient" @keydown.tab.prevent="addIng" v-model="another" >
       </div>

       <div class="field center-align">
           <p v-if="feedback" class="red-text">{{ feedback }}</p>
           <button class="btn pink">Update Smoothie</button>
       </div>

   </form>
    </div>
</template>

<script>
import db from '@/Firebase/Init'
import slugify from 'slugify'
export default {
    data(){
        return{
            smoothie: null,
            another: null,
            feedback: null,
        }
    },
    created(){
        let ref = db.collection ('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot =>{
            snapshot.forEach(doc =>{
              this.smoothie = doc.data()
              this.smoothie.id = doc.id
            })
        })
    },
    methods:{
        EditSmoothie(){
       if(this.smoothie.title){
               this.feedback = null

                //create slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: "-",
                    remove: /[*+~.()'"!:@]/g,
                    lower: true
                })

               db.collection('smoothies').doc(this.smoothie.id).update({
                   title : this.smoothie.title,
                   ingredients : this.smoothie.ingredients,
                   slug : this.smoothie.slug
               }).then(()=>{
                   this.$router.push({name:'Index'})
                   }).catch(err =>{
                       console.log(err)
                   })

           }else{
               this.feedback = 'You must enter a title'
           }        },

        addIng(){
            if(this.another){
              this.smoothie.ingredients.push(this.another)  
              console.log(this.ingredients)
              this.another = null
              this.feedback = null
            }else{
                this.feedback = "Please an ingredient"
            }
        },
        deleteIng(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingred =>{
                return ingred != ing
            })
        }
    }
        
}
</script>

<style  scoped>
.edit-smoothie{
    margin-top: 3em;
    padding: 2em;
    max-width: 600px;
}

.edit-smoothie h2{
    font-size: 2.5rem;
    margin: 1em auto;
}

.edit-smoothie .field{
    margin: 1.5em auto;
    position: relative;
}

.edit-smoothie .delete{
  position: absolute;
  top: 4px;
  right: 0;
  cursor: pointer;
  color:#aaa;
  font-size: 1.4rem
}
</style>
</style>