<template>
  <div class="index container row ">
    <div class="card col s12" v-for="smoothie in smoothies" :key = "smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredient">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to = "{name: 'EditSmoothie', params:{smoothie_slug : smoothie.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
   
  </div>
</template>

<script>
import db from '@/Firebase/Init'
export default {
  name: 'Index',
  data () {
    return {
     smoothies:[ ] 
    }
  },

  methods:{
    deleteSmoothie(id){
      db.collection('smoothies').doc(id).delete()
      .then(() => {
         this.smoothies = this.smoothies.filter(smoothie =>{
        return smoothie.id != id
      })
      })
     
    }
  },

created(){
  //fetch data from the firestore
  db.collection('smoothies').get()
  .then(snapshot =>{
    snapshot.forEach(doc => {
    let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
    });
  })
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap:30px;
  margin-top: 60px;
}

h2{
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
}

.ingredient{
  margin: 3em auto;
}

.ingredient li{
  display: inline-block;
} 
.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color:#aaa;
  font-size: 1.4rem
}
@media screen and (max-width: 1400px){
  .index{
 grid-template-columns: 1fr 1fr;
  }
  
}
@media screen and (max-width: 1000px){
  .index{
 grid-template-columns: 1fr;
  }
  
}

</style>
