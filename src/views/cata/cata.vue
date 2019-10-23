<template>
    <div class="cata"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="5">
        <ul>
            <router-link :to="{name:'read',params:{link:index}}" tag="li" v-for="(cata,index) in catas" :key="cata.link">
                    {{cata.title}}
            </router-link>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';//引入mint-ui toast
import {mapActions,mapState,mapGetters} from "vuex"
export default {
    name:"cata",
    data(){

        return {
         
            catas:[],
            limit:15,//查询条数
            page:0,//第几页
            loading:false,  //默认开启无限滚动
            hasMore:true ,   //默认有更多数据
            isone:false,
           
        }
    },
   
    methods:{
         loadMore(){
           if(!this.hasMore){ //没有更多数据
                Toast({
                    message:"我是有底线的...",
                    position:"bottom"
                })
                this.loading = true;//关闭无限滚动  loadMore方法就不会进来了
                return false;
            }
          
            this.searchcata()
           
        },
        searchcata(){
             let instance = Toast({
                message:"正在加载中...",
                duration:-1,
                iconClass: 'fa fa-cog fa-spin'
            });
            let {limit,page} = this; 
            this.loading = true;//关闭无限滚动
            this.$http.get('/api/chapters',{
            params:{
                 id:this.$route.params.id,
                 limit:this.limit,
                 page:this.page
            }
           
        }).then(res=>{
           this.catas=this.catas.concat(res.data)
            this.loading = false;//开启无限滚动
                instance.close();//关闭loading弹出框
                if(res.data==0){
                    this.hasMore = false //代表没有更多数据了
                    return false;
                }
                this.page++
        })
        },
        ...mapActions(["addcatas"])
    },
    created(){
      
         this.$http.get('/api/chapters',{
            params:{
                 id:this.$route.params.id,
                 limit:9999,
         }
         }).then(res=>{
             
             this.addcatas(res)
         })
    },
 

}
</script>

<style lang="scss" scoped>
    .cata{
        ul{
            li{
                width:100%;
                height:0.45rem;
                line-height:0.45rem;
                border-bottom :1px solid #ccc;
                text-align: center;
            }
        }
    }
</style>