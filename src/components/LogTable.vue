<template>
  <Card>
    <template #content>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="message in messages" :key="message.id">
            <td>{{ message.id }}</td>
            <td>{{ message.timestamp || new Date() }}</td>
            <td>
              <pre>{{ message.data }}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </Card>
</template>

<script>
import Card from "./Card";
export default {
  props: {
    messages: {
      type: Array,
      default: []
    }
  },
  beforeUpdate() {
    console.log(this.messages);
  },
  components: {
    Card
  }
};
</script>

<style lang="scss" scoped>
@import "../layouts/_global.scss";
table {
  width: 100%;
  border-collapse: collapse;
  thead {
    tr {
      th {
        padding: 0.25rem 1rem;
        border-bottom: 0.1rem solid lighten($color, 48);
        &.center {
          text-align: center;
        }
        &.nunmeric {
          text-align: right;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 0.25rem 1rem;
        margin: 0;
        pre {
          width: 100%;
          max-block-size: 100%;
          overflow: auto;
          background-color: rgba(21, 21, 21, 0.05);
          border-radius: .5rem;
          padding: 1rem 0.8rem;
        }
      }
    }
  }
}
</style>
