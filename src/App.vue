<template>
  <router-view/>
</template>

<style lang="css">

body {
  font-family: 'Play', sans-serif;
  font-size: 12px;
  text-align: center;
}

h1 {
  margin: 50px;
}

a {
  color: inherit;
  text-decoration: inherit;
}

/* Table styling */
.table-container{
  width: 100%;
}

.table {
  background-color: #f9f5ec;
  width: 70%;
  margin: 0 auto;
  border-color: #fa4113;
  border-style: solid;
  border-width: 1px;
  color: grey;
}

.table td, .table th  {
  text-align: left;
  border-bottom: 1px solid #f2ebd9;
}

.table th {
  color: #4e4b4b;
}

.table tr:hover td {
  background-color: white;
  border-color: white;
}

.title-item{
  font-weight: bolder;
}

</style>
