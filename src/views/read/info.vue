<template>
    <div class="info" v-if="data.length!=0">
        <div class="header">
            <span class="iconfont back" @click="back">&#xe610;</span>
            <span class="title">{{data.title}}</span>
             <span class="iconfont share" share>&#xe614;</span>
        </div>
     
        <div class="content">
            <div class="top">
                <div class="left">
                    <img :src="data.cover" alt="">
                </div>
                <div class="right">
                    <span class="title">{{data.title}}</span>
                    <span class="author">{{data.author}}</span>
                     <span class="time">{{data.updated}}</span>
                </div>
            </div>
            <div class="middle">
                {{data.longIntro}}
            </div>
            <!-- <div class="bottom" @click="opencata(data._id)">
                <span class="iconfont">&#xe61b;目录:</span>{{data.lastChapter}}
            </div> -->
            <div class="adv">
                <img :src="data.cover" alt="">
                <img :src="data.cover" alt="">
                <img :src="data.cover" alt="">
                <img :src="data.cover" alt="">
                <img :src="data.cover" alt="">
                <img :src="data.cover" alt="">
            </div>
        </div>
       
        <div class="foot">
            <button @click="toggbook(isbook)">{{!isbook?"加入书架":"移出书架"}}</button>
            <button @click="opencata(data._id)">开始阅读</button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';//引入mint-ui toast
import {mapActions,mapState,mapGetters} from "vuex"
export default {
    name:"info",
 
    data(){
        return{
            data:[],
            isone:false,
            isbook:false,
            
          
        }
    },
    methods:{
      back(){
            this.$router.go(-1)
      },
      toggbook(type){
          if(!type){
              this.addBookshelf(this.data)
              this.isbook=true
          }else{
              this.removeBookshelf(this.data)
               this.isbook=false
          }
      },
        opencata(id){
            this.$router.push({name:"catas",params:{id:id}})
        },
         ...mapActions(["addBookshelf","removeBookshelf"]),
    },
    created(){
          scrollTo(0,0)
          let instance = Toast({
                message:"正在加载中...",
                duration:-1,
                iconClass: 'fa fa-cog fa-spin'
            });
        this.$http.get('apiinfo',{
            params:{
                id:this.$route.params.id
            }
        }).then(res=>{
            this.data = res.data
            instance.close();//关闭loading弹出框
        })

      
    },
  
}
</script>

<style lang="scss" scoped>
    .adv{
       margin-top:0.5rem;
        img{
             float:left;
             height:1.5rem;
             margin:0.02rem 0.06rem;
             width:30%;
        }
    }
    .content{
        width: 100%;
        
        margin-top:0.05rem;
        .top{
            width:100%;
            height:1.5rem;
            display: flex;
            .left{
                margin-left:0.05rem;
                width:1.2rem;
                height:1.5rem;
                img{
                    width:100%;
                    height:100%
                }
               
            }
            .right{
                display: flex;
                flex-direction: column;
                color:#ccc;
                .title{
                    
                    font-size:24px;
                    text-indent: 0.5rem;
                }
                .author{
                    margin-top:0.3rem;
                    
                    font-size:14px;
                    text-indent: 0.5rem;
                }
                .time{
                    margin-top:0.3rem;
                    font-size:14px;
                    text-indent: 0.5rem;
                }
            }
        }
        .middle{
            margin-top:0.1rem;
            font-size:14px;
            color: #ccc;
            padding:0 0.12rem;
            line-height:0.2rem;
        }
        .bottom{
            margin-top:0.2rem;
            padding:0 0.12rem;
            color:#ccc;
            font-size: 24px;
        
            .iconfont{
                font-size:24px;
                color:#ccc;
                padding-right:0.05rem;
            }
        }
    }
    .header{
        height:0.45rem;
        width:100%;
        background: #FF7F50;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .back{
            font-size:24px;
             color: #ffF;
            margin-left:0.05rem;
            font-weight: bold;
        }
        .share{
            font-size:18px;
            color:#fff;
            margin-right:0.05rem;
        }
        .title{
            color:#fff;
            font-size:18px;
        }
    }
  
    
    .foot{
        height:0.45rem;
        width:100%;
        // background: #FF7F50;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-around;
    
        button{
            color:#fff;
            width:100%;
            height:100%;
            background:#FF7F50;
            border-radius: 0.2rem;
            // border:1px solid #00bfff;
            outline:none;
        }
    }
</style>