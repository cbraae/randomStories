<template>
  <div v-if="dataIsReady">
    <h1> 10 random stories from the Hacker News API</h1>
    <div class="table-container">
          <table class="table">
              <thead>
                  <tr>
                      <th>Number</th>
                      <th>Title</th>
                      <th>Score</th>
                      <th>Posted Date</th>
                      <th>Author Id</th>
                      <th>Author Karma</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item, idx in final" :key="item.id">
                      <td>{{ idx+1 }}</td>
                      <td class="title-item"> <a v-bind:href="item.url" target="_blank">{{item.title}} </a></td>
                      <td>{{ item.score }}</td>
                      <td>{{ new Date(item.time * 1000).toLocaleDateString("da-DK") }}</td>
                      <td>{{ item.id }}</td>
                      <td>{{ item.karma }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'Table',
  data () {
    return {
      all: [],
      randomIndexes: [],
      randomStories: [],
      articles: [],
      authors: [],
      final: [],
      dataIsReady: false
    }
  },
  created () {
    // Initialize loading of content
    this.getTopStories()
  },
  watch: {
    all () {
      if (this.all.length > 0) {
        // When all topstories have been loaded we select 10 random id's and fetch the articles
        this.selectRandomIndexes()
        this.getArticles()
      }
    },
    articles () {
      if (this.articles.length > 0) {
        // When articles have been loaded, get authors of the stories
        this.getAuthors()
      }
    },
    authors () {
      if (this.authors.length > 0) {
        // Match articles with authors to get one collective array
        var final = this.articles.map(x => Object.assign(x, this.authors.find(y => y.id === x.by)))
        // Order by score ascending
        final.sort(function (a, b) {
          return a.score - b.score
        })
        this.final = final
        this.dataIsReady = true
      }
    }
  },
  methods: {
    getTopStories () {
      axios
        .get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(response => {
          this.all = response.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    selectRandomIndexes () {
      // Select 10 indexes in the range from 0 to length of array of topstories
      var i
      var max = this.all.length + 1
      for (i = 0; i < 10; i++) {
        this.randomIndexes.push(Math.floor(Math.random() * max))
      }
    },
    getArticles () {
      // Get ids of stories from the indexes
      this.randomStories = this.randomIndexes.map(j => this.all[j])
      var promises = this.randomStories.map(item => {
        return axios.get('https://hacker-news.firebaseio.com/v0/item/' + item + '.json')
          .then(response => response.data)
      })
      // Await all data to be loaded and only select the properties we need
      Promise.all(promises).then(data => {
        console.log(data)
        this.articles = data.map(({ by, title, url, time, score }) => ({ by, title, url, time, score }))
      })
    },
    getAuthors () {
      var promises = this.articles.map(item => {
        return axios.get('https://hacker-news.firebaseio.com/v0/user/' + item.by + '.json')
          .then(response => response.data)
      })
      // Await all data to be loaded and only select the properties we need
      Promise.all(promises).then(data => {
        this.authors = data.map(({ id, karma }) => ({ id, karma }))
      })
    }
  }
})

</script>
