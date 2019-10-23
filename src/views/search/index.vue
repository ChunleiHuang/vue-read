<template>
    <div class="search"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
    >
        <!-- 头部 -->
        <Header title="搜索" :key="key" @search="search" ref="headerChild"></Header>
        <!-- 占位撑开距离顶部的距离 -->
        <div class="placeholder"></div>
        <!-- 书籍 -->
        <bookitem  
        v-for="data in books" 
        :key="data._id+Math.random()" 
        :data="data"
       
        ></bookitem>
        
        <!-- 底部模块 -->
        <TabBar></TabBar>
    </div>
</template>

<script>
import Header from "@/components/Header"// 引入头部
import TabBar from "@/components/TabBar"// 引入底部
import bookitem from "@/views/search/bookitem"// 引入书籍样式模块
import { Toast } from 'mint-ui';//引入mint-ui toast
export default {    
    name:'search',
    components:{
        Header,bookitem,TabBar
    },
    data(){
        return{
            books:[],//书籍信息
            limit:6,//查询条数
            page:0,//第几页
            key:'',
            loading:true,  //默认关闭无限滚动
            hasMore:true,    //默认有更多数据
            isone:false
        }
    },
  
    methods:{
        //点击小说跳转详情页时间
       
       //点击搜索事件每次点击代表一次新的提交
        search(){
           this.books = [];//每次类型切换的时候，数组清空
            this.page = 0;//每次类型切换的时候，页码从第一页开始
            this.hasMore = true;//有更多数据
            if(this.$refs.headerChild.key==""){
                return  false;
            }else{
                this.searchAPI()
            }
        },
        loadMore(){
           if(!this.hasMore){ //没有更多数据
                Toast({
                    message:"我是有底线的...",
                    position:"bottom"
                })
                this.loading = true;//关闭无限滚动  loadMore方法就不会进来了
                return false;
            }
       
            this.searchAPI()
           
        },
        searchAPI(){
            let instance = Toast({
                message:"正在加载中...",
                duration:-1,
                iconClass: 'fa fa-cog fa-spin'
            });
            let {limit,page} = this; 
            this.loading = true;//关闭无限滚动
            this.$http.get("/api/bookname",{
                params:{
                    key:this.$refs.headerChild.key,
                    limit,
                    page
                }
            }).then(res=>{
                this.books = this.books.concat(res.data.books)  
                this.loading = false;//开启无限滚动
                instance.close();//关闭loading弹出框
                if(res.data.books==0){
                    this.hasMore = false //代表没有更多数据了
                    return false;
                }
                this.page++
            })
           
        }

    },
    activated(){
        if(this.isone){
            this.loading = false;//继续开启无限滚动
        }
        
    },
    deactivated(){
        this.loading = true;//关闭无限滚动
        this.isone=true;
        
    }
}
</script>

<style>

</style>