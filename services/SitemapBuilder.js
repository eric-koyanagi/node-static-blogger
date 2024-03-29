const express = require('express')
const xml = require('xml')

class SitemapBuilder {
  buildSitemap(articles, publisher) 
  {  
    const sitemapXml = this.getXML(articles);
    publisher.publish("sitemap.xml", sitemapXml, {contentType: "application/xml"});
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
          if (article.publish) {
            return {
              url: [
                { loc: (process.env.WEB_URL_BASE || "") + "/" + article.slug },
                { lastmod: article.updated_at },
                { changefreq: 'monthly' },
                { priority: 0.8 },
              ],
            }
          }
        }),
      ],
    }

    return xml(xmlObject)
  }
}
module.exports = new SitemapBuilder()
