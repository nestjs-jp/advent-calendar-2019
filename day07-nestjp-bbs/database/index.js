const dayjs = require('dayjs')

const items = [
  {
    id: 1,
    title: 'NestJS Meetup Tokyo #2',
    body: `次回の NestJS Meetup について話しましょう。`,
    deletePassword: '1234',
    createdAt: dayjs('2019-12-06T09:00:00+09:00').unix(),
  },
  {
    id: 2,
    title: 'NestJS Advent Calendar 2019',
    body: `この記事は NestJS アドベントカレンダー一日目の記事です。

記念すべき一記事目ということで、今回は NestJS の基本的な構造について、概念を理解し、実際に触ってみるまでを紹介したいと思います。

NestJS の概念的な部分においての概要は下記スライドをご参照ください。前提知識として一読いただいた上で、手を動かしていただけると。

https://speakerdeck.com/potato4d/what-is-nestjs-number-nestjs-meetup
`,
    deletePassword: '5678',
    createdAt: dayjs('2019-12-06T10:00:00+09:00').unix()
  },
]

const comments = [
  {
    id: 1,
    itemId: 2,
    body: '面倒なのでスライドを読みたくないです。どうすればいいですか？',
    createdAt: dayjs('2019-12-06T10:32:00+09:00').unix()
  }
]

module.exports = () => {
  return {
    items: items.map((i) => i),
    comments: comments.map((c) => c)
  }
}
