<template>
    <div class="home">
        
         <Header title="首页" ></Header>
         <div class="bookcontent">
           
             <p v-if="isshow">赶快去添加喜欢的书籍把</p>
             
             <Bookitem   :isbtn="isbtn" v-for="book in lsbooks" :key="book._id" :data="book" ref="bookitem" ></Bookitem>
        </div>
         
         <Edit @togglebtn="togglebtn"></Edit>
         <Tabbar></Tabbar>
    </div>
</template>

<script>

import Tabbar from "@/components/TabBar"// 引入底部
import Header from "@/components/Header"// 引入头部
import Edit from "@/components/Edit"// 引入头部
import Bookitem from "@/views/bookrack"// 引入头部
import {mapActions,mapState,mapGetters} from "vuex"
export default {
    components:{
         Header,Tabbar,Edit,Bookitem
    },
    data(){
        return{
            isbtn:false, //删除按钮是否出现
            isshow:true
        }
    },
    created(){
        
        if(this.lsbooks.length>=1){
          this.isshow=false
        }else{
            this.isshow=true
        }
        
    },
    computed:{
        ...mapState({
            lsbooks:state=>state.bookmodule.Bookshelf
        }),
       
    },
    methods:{
       ...mapActions(["addBookshelf","removeBookshelf"]),
        
        //写三个 函数进行 书架的书的编辑 传递给子组件编辑组件
        //点击编辑出现遮罩并且出现选择按钮
        togglebtn(){
          
            this.isbtn=!this.isbtn
          
        },

        

    },
    activated(){
        if(this.lsbooks.length>=1){
          this.isshow=false
        }else{
            this.isshow=true
        }
    },
    
    
   
}
</script>

<style lang="scss" scoped>
    .bookcontent{
        margin-top:0.6rem;
        //每一本书
      
    }
</style>