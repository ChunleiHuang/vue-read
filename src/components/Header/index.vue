<template>
    <div class="header">
        <span class="index">{{title}}</span>
        <div class="search"  @click.once="isBtn=!isBtn">
            <i class="iconfont">&#xe625;</i>
            <input type="text" v-model="key">
        </div>
       <button class="serbtn" v-show="isBtn"  @click="btnsearch">搜索</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isBtn:false,
            key:""
        }
    },
    props:{
        title:{ //标题
            type:String,
            default:"首页"
        },
       

    },
    methods:{
        btnsearch(){
            this.$emit("search")
        }
    }
}
</script>

<style lang="scss" scoped>
    .header{
        position: fixed;
        top:0;
        z-index: 10;
        background:#fff;
        .serbtn{
            margin-left:0.04rem;
            width:0.45rem;;
            height:0.26rem;
            border-radius:0.06rem;
            outline: none;
            border:none;
            background: #00BFFF;
            font-size:14px;
            color:#fff;
        }
        height:0.5rem;
        width:100%;
        // background:#ffff;
        border-radius:0.09rem  0.09rem  0.09rem 0.09rem;
        box-shadow:0px 6px 5px #E6E6FA;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#00BFFF;
        .iconfont{
            margin-left:0.02rem;
        }
        .search{
            border:1px solid #00BFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            height:0.28rem;
            width:2.6rem;
            border-radius: 0.2rem;
            input{
                width:2.44rem;
                height:0.26rem;
                border-radius: 0.2rem;
                border:none;
                font-size:16px;
                text-indent: 12px;
                background: rgba(0,0,0,0)
            }
        }
        .index{
            margin-right:0.16rem;
            font-size:16px;
          
        }
    }
</style>