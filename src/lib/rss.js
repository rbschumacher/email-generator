const Feed = require('feed').Feed;
const fs = require('fs');

function generateRssFeed() {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const baseUrl = 'https://email-generator.vercel.app/';
  const date = new Date();
  const author = {
    name: 'Rafael Schumacher',
    email: 'rafael.schumacher@nave.rs',
    link: 'https://twitter.com/rschumacher_'
  };

  const feed = new Feed({
    title: 'Email de teste',
    description: 'Email de teste do rss feed para o nave news',
    id: '1',
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/vercel.svg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Rafael Schumacher`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`
    },
    author
  });

  feed.addItem({
    title: 'post title',
    id: 'post_id',
    link: 'https://email-generator.vercel.app/post_1',
    description: 'post description',
    content: '<div><h1>Teste rss feed</h1><p>Sera que o rss foi certinho?</p></div>',
    author: [author],
    contributor: [author],
    date: new Date()
  });

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}

export default generateRssFeed;
