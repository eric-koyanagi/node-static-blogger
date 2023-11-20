const express = require('express')
const xml = require('xml')

class SitemapBuilder {
  buildSitemap(articles, publisher) 
  {
    var appInstance = express();    
    const sitemapXml = this.getXML(articles);
    console.log("Gen of xml ", sitemapXml);
    
    publisher.publish("sitemap.xml", sitemapXml);
  }

  // Construct and return a basic XML object with entries for each article
  getXML(articles) { 
    const xmlObject = {
      urlset: [
        {
          _attr: {
            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          },
        },

        // For every page of the site, generate a <url> object
        ...articles.map((article) => {
          return {
            url: [
              { loc: process.env.WEB_URL_BASE || "" + article.slug },
              { lastmod: article.updated_at },
              { changefreq: 'monthly' },
              { priority: 0.8 },
            ],
          }
        }),
      ],
    }

    return xml(xmlObject)
  }
}
module.exports = new SitemapBuilder()
