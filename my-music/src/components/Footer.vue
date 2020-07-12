<template>
  <div class="footer">
    <div class="f1">
        <p class="f11">
          <a href="javascript:void(0)">服务条款</a>
          <span>|</span>
          <a href="javascript:void(0)">隐私策略</a>
          <span>|</span>
          <a href="javascript:void(0)">儿童隐私策略</a>
          <span>|</span>
          <a href="javascript:void(0)">版权投诉指引</a>
          <span>|</span>
          <a href="javascript:void(0)">意见反馈</a>
        </p>
        <p>
          <span>网易公司版权所有©1997-2020</span>
          <span>杭州乐读科技有限公司运营:</span>
          <a href="javascript:void(0)">浙网文[2018]3506-263号</a>
        </p>
        <p>
          <span>违法和不良信息举报电话：0571-89853516</span>
          <span>举报邮箱：</span>
          <a href="javascript:void(0)">ncm5990@163.com</a>
        </p>
        <p>
          <span>粤B2-20090191-18</span>
          <a href="javascript:void(0)">工业和信息化部备案管理系统网站</a>
        </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>

    .footer{
        width: 100%;
        height: 173px;
        border-top: 1px solid #d3d3d3;
        a:hover{
            text-decoration: underline;
        }
        .f1{
            width: 980px;
            margin: 0 auto;
            height: 150px;
            // background-color: #999;
            text-align: center;
            font-size: 12px;
            line-height: 30px;
            span{
                margin: 0 5px;
            }
            a{
                margin: 0 10px;
                color: #999;
            }
        }
    }
</style>