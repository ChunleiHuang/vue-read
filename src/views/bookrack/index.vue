<template>

     <div class="bookitem" v-if="data.leng!=0">
         <router-link :to='{name:"catas",params:{id:data._id}}'>
        <img :src="data.cover" alt="">
        </router-link>
        <i class="iconfont edicon" v-if="isbtn" @click.self="selbook(data,$event)">&#xe613;</i>
     </div>

</template>

<script>
export default {
    props:{
        isbtn:{type:Boolean,default:false},
        data:{default:[]}
    },
    data(){
        return{
            iscolor:false,
            deldata:[]
        }
    },
    methods:{
        selbook(data,e){
          
            if(this.iscolor){
                  e.target.style.color="#00BFFF"
                  this.iscolor=!this.iscolor
                  this.deldata = this.deldata.filter(item=>{
                       if(item._id === data._id){
                            return false; //
                        }
                        return true
                  })
            }else{
                this.iscolor=!this.iscolor
                e.target.style.color="red"
                this.deldata.push(data)

            }
        }
    }
}
</script>

<style lang="scss" scoped>
      .bookitem{
            border:1px solid #ccc;
            position: relative;
            float: left;
            margin:0.1rem 0.02rem;
            width:1.2rem;
            height:1.6rem;
            //书的图片
            img{
                width: 95%;
                height: 95%;
                display:block;
                position: relative;
                left:0;top:0.04rem;right:0;bottom:0;
                margin:auto;
            }
            //书上面的选择按钮
            .edicon{
                position: absolute;
                z-index:30;
                top:0;left:0;bottom:0;right:0;
                margin:auto;
                height:0.28rem;
                width:0.28rem;
                border:1px solid #fff;
                background: #00BFFF;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;

            }
            .iconfont{
                font-size:18px;
                font-weight: bold;
                color:#00BFFF;
            }
        }
</style>