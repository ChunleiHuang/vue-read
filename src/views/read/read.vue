<template>
    <div class="read"  v-if="data">
         
        <div class="content" :style="{'font-size':font+'px','color':color,'background':bgcolor}">
            <div class="header">
            <span class="iconfont back" @click="back">&#xe610;</span>
            <span class="title">{{title}}</span>
             <span class="iconfont share" style="visibility:hidden">&#xe614;</span>
            </div>
             
               {{data}}
        </div>
     
        <div class="ls"></div>
       <div class="effect">
            <button @click="upcata(true)">上一章</button>
            <button @click="gocata">目录</button>
            <button @click="isSet=!isSet">设置</button>
            <button @click="upcata(false)">下一章</button>
       </div>
       <div class="set" v-if="isSet">
           <div class="font">
             字体大小  <button @click="fonts('-')">-</button><button @click="fonts('+')">+</button>
           </div>
            <div>
            字体颜色 <span @click="colors('white')">白</span>
                    <span @click="colors('black')">黑</span>
                    <span @click="colors('yellow')">黄</span>
                    <span @click="colors('red')">红</span>
                    <span @click="colors('green')">绿</span>
           </div>
           <div>
            背景颜色 
                    <span @click="change('yellow')">黄</span>
                    <span @click="change('red')">红</span>
                    <span @click="change('green')">绿</span>
           </div>
           <div>
            阅读模式 <span @click="change('black')">黑</span>
                     <span @click="change('#fff')">白</span>
                   
           </div>
       </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';//引入mint-ui toastbg
import {mapActions,mapState,mapGetters} from "vuex"
export default {
    name:"read",
    data(){
        return{
            data:null,
            blackcolor:'white',
            cata:0,
            title:null,
            isSet:false,
            isone:false,
            font:14,
            color:"#666",
            bgcolor:"#fff",
        }
    },
    methods:{
         back(){
            this.$router.push('/home')
         },
        change(type){
            this.bgcolor=type
        },
        colors(type){
            this.color=type
        },
        fonts(type){
          
                if(type==='+'){
                    this.font=this.font+2;
                    if(this.font>=28){
                         this.font=28;
                    }
                
                }else{
                    this.font=this.font-2;
                    if(this.font<=12){
                         this.font=12;
                    }
                   
                    
                }
           
           
        },
        changecolor(){
            this.blackcolor = this.blackcolor=="white"?"black":"white"
        },
        gocata(){
            this.$router.go(-1)
        },
        upcata(status){
            if(status){
                this.cata = this.cata-1
            }else{
                this.cata = this.cata+1
            }
          
          this.title=this.$store.state.catamodule.catas.data[this.cata].title
            let instance = Toast({
                message:"正在加载中...",
                duration:-1,
                iconClass: 'fa fa-cog fa-spin'
                });
             this.$http.get("api/details",{
                params:{
                    link:this.$store.state.catamodule.catas.data[this.cata].link
                }
            }).then(res=>{
            this.data=res.data.chapter.body;
            instance.close();//关闭loading弹出框
            scrollTo(0,0)
             })
        },
         ...mapActions(["initcatas"])
    },
    created(){
        this.initcatas();
        this.cata = Number(this.$route.params.link)
        
        let instance = Toast({
                message:"正在加载中...",
                duration:-1,
                iconClass: 'fa fa-cog fa-spin'
                });
        this.$http.get("api/details",{
           params:{
               link:this.$store.state.catamodule.catas.data[this.cata].link
           }
        }).then(res=>{
             instance.close();//关闭loading弹出框
            this.data=res.data.chapter.body;
            this.title=this.$store.state.catamodule.catas.data[this.cata].title
           
             scrollTo(0,0)
        })
    },
    activated(){
       if(this.isone){
            this.cata = Number(this.$route.params.link)
    
        let instance = Toast({
                message:"正在加载中...",
                duration:-1,
                iconClass: 'fa fa-cog fa-spin'
                });
        this.$http.get("api/details",{
           params:{
               link:this.$store.state.catamodule.catas.data[this.cata].link
           }
        }).then(res=>{
             instance.close();//关闭loading弹出框
            this.data=res.data.chapter.body;
            this.title=this.$store.state.catamodule.catas.data[this.cata].title
           
             scrollTo(0,0)
        })
       }
       
    },
    deactivated(){
        this.data=null;
        this.isone=true
    }
    
}
</script>
<style lang="scss" scoped>
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
  
    .set{
        width:100%;
        height:1.2rem;
        background:#ccc;
        position: fixed;
        z-index: 99;
        bottom:0.25rem;
        color:#fff;
        .font{
            display: flex;
           button{
               width:0.6rem;
               height:0.2rem;
               margin-left:0.15rem;
           }

        }
        div{
            display: flex;
            margin:0.05rem;
            span{
                margin:0 0.15rem;
                font-size:12px;
                display: block;
                width:0.18rem;
                height:0.18rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: #00BFFF;
            }
        }
    }
    .effect{
        width:100%;
        height:0.25rem;
        margin-top:0.05rem;
        background: red;
        position: fixed;
        bottom: 0;
        button{
            width:25%;
            height:100%;
            border:none;
            outline: none;
            background:#F8F8FF
        }
    }
    .ls{
        height:0.3rem;
        width:100%;
    }
</style>
