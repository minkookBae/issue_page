<template>
  <div class="container">

    <div class="jumbotron text-center">
            <h1>컨테이너. 질문 IT sue !</h1>
            <p>컨테이너에 대한 새로운 기술지원 도구, 질문 IT sue입니다.</p>
        <router-link v-bind:to="{ name: 'Issues' }" class="add_issue_link">이슈 등록하기</router-link>
    </div>

</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: rgb(242,113,115);
}
</style>
