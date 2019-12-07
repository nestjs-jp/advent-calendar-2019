<template>
  <div id="MAIN">
    <header>
      <h1 class="text-center font-bold text-3xl py-2">NestJS JP BBS</h1>
      <p class="text-xs text-center">
        <a href="https://qiita.com/advent-calendar/2019/nestjs" target="_blank">
          <b>はじめてのかたへ</b>
        </a>
        <span>|</span>
        <a
          href="https://github.com/nestjs-jp/advent-calendar-2019"
          target="_blank"
        >
          <b>ソースコード</b>
        </a>
      </p>
      <hr />
      <p class="text-xs text-center pb-4">
        <small>Japanese traditional style BSS system build with NestJS</small>
      </p>
    </header>
    <form
      @submit.prevent="createItem"
      class="border p-4 mb-4"
      style="border-color: blue;"
    >
      <p class="pb-2">
        <label class="flex items-center justify-start text-sm">
          <span class="inline-block">件名:</span>
          <input
            type="text"
            v-model="itemFormData.title"
            required
            class="border border-gray-500 inline-block ml-2"
          />
        </label>
      </p>
      <p class="pb-2">
        <label class="text-sm">
          <span class="inline-block pb-2">本文:</span>
          <br />
          <textarea
            rows="10"
            v-model="itemFormData.body"
            required
            class="border-gray-500 w-full border"
          />
        </label>
      </p>
      <p class="pb-2">
        <label class="flex items-center justify-start text-sm">
          <span class="inline-block">削除パスワード(数字4桁):</span>
          <input
            type="number"
            required
            class="border border-gray-500 inline-block ml-2 w-12"
            maxlength="4"
            v-model="itemFormData.deletePassword"
          />
        </label>
      </p>
      <p class="text-xs">
        <button
          type="submit"
          class="px-2 text-xs mt-1 bg-white border border-gray-600 rounded"
          style="appearance: initial !important;"
        >
          <small>投稿</small>
        </button>
      </p>
    </form>
    <main>
      <article
        v-for="item in items"
        :key="item.id"
        style="background-color: #eee;"
        class="border border-black p-4 mb-4"
      >
        <div>
          <h2 class="text-sm font-bold" style="color: red;">
            {{ item.title }}
          </h2>
          <p class="text-right" style="color: #d42">
            {{ item.createdAt | dateTime }}
          </p>
          <p
            class="text-sm py-4"
            style="color: blue;"
            v-html="decorateHtml(item.body)"
          ></p>
          <form
            @submit.prevent="deleteItem($event.target, item.id)"
            class="text-sm text-right"
          >
            <label>
              <span>
                <small>削除パスワード</small>
              </span>
              <input
                type="text"
                name="deletePassword"
                class="w-12 h-6 text-xs border border-gray-500"
              />
            </label>
            <button
              type="submit"
              class="px-2 text-xs mt-2 bg-white border border-gray-600 rounded"
              style="appearance: initial !important;"
            >
              <small>削除</small>
            </button>
          </form>
        </div>
        <ul>
          <li
            class="pl-16 pt-4"
            v-for="comment in item.comments"
            :key="comment.id"
          >
            <hr />
            <div class="pt-4">
              <h2 class="text-sm font-bold" style="color: red;">
                Re: {{ item.title }}
              </h2>
              <p class="text-right" style="color: #d42">
                {{ comment.createdAt | dateTime }}
              </p>
              <p
                class="text-sm py-4"
                style="color: red;"
                v-html="decorateHtml(comment.body)"
              ></p>
            </div>
          </li>
          <li class="pl-16 pt-4">
            <hr />
            <form
              @submit.prevent="createComment($event.target, item.id)"
              class="pt-4"
            >
              <p>
                <label class="text-sm">
                  <span class="inline-block pb-2">コメント:</span>
                  <br />
                  <textarea
                    name="body"
                    rows="4"
                    required
                    class="border-gray-500 w-full border"
                  />
                </label>
              </p>
              <p class="text-xs text-right">
                <button
                  type="submit"
                  class="px-2 text-xs mt-1 bg-white border border-gray-600 rounded"
                  style="appearance: initial !important;"
                >
                  <small>投稿</small>
                </button>
              </p>
            </form>
          </li>
        </ul>
      </article>
    </main>
    <footer class="py-4 text-center">
      &copy; 2019 NestJS Japan Users Group
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';
import { ItemData, CommentData } from '../types/entity';
import xss from 'xss';
import Autolinker from 'autolinker';

type ViewItem = ItemData & {
  comments: CommentData[];
};

type LocalData = {
  itemFormData: {
    title: string;
    body: string;
    deletePassword: string;
  };
  items: ViewItem[];
};

export default Vue.extend({
  data(): LocalData {
    return {
      itemFormData: {
        title: '',
        body: '',
        deletePassword: '',
      },
      items: [],
    };
  },
  async asyncData({ app }): Promise<LocalData> {
    const items = await app.$axios.$get<ViewItem[]>('/items');
    return {
      itemFormData: {
        title: '',
        body: '',
        deletePassword: '',
      },
      items: items.reverse(),
    };
  },
  methods: {
    async createItem() {
      await this.$axios.post('/items', {
        ...this.itemFormData,
      });

      // Traditional Reload
      location.reload();
    },
    async deleteItem(target: HTMLElement, itemId: string) {
      try {
        // Tradional Selector
        const deletePassword = (target.querySelector(
          '[name="deletePassword"]',
        ) as HTMLTextAreaElement)!.value;

        await this.$axios.post(`/items/${itemId}/delete`, {
          deletePassword,
        });

        // Traditional Reload
        location.reload();
      } catch (e) {
        alert('！削除パスワードが違います！');
      }
    },
    async createComment(target: HTMLElement, itemId: string) {
      // Tradional Selector
      const body = (target.querySelector(
        '[name="body"]',
      ) as HTMLTextAreaElement)!.value;
      await this.$axios.$post(`/items/${itemId}/comments`, {
        body,
      });

      // Traditional Reload
      location.reload();
    },
    decorateHtml(value: string) {
      return Autolinker.link(xss.filterXSS(value).replace(/\n/g, '<br>'));
    },
  },
  filters: {
    dateTime(value: number) {
      return dayjs.unix(value).format('YYYY/MM/DD hh:mm:ss');
    },
  },
});
</script>

<style>
#MAIN {
  max-width: 600px;
  margin: 0 auto;
  font-family: 'ＭＳ Ｐゴシック', Osaka, sans-serif;
  -webkit-font-smoothing: initial;
}

a {
  color: #9039b3 !important;
  text-decoration: underline;
}

#MAIN hr {
  display: block;
  unicode-bidi: isolate;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: auto;
  margin-inline-end: auto;
  overflow: hidden;
  border-style: inset;
  border-width: 1px;
}
</style>
