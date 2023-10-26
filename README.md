# node-static-blogger
A static blogger to cheaply host content on S3. This is similar in concept to a project I wrote in PHP/Laravel that does the same thing: https://github.com/eric-koyanagi/laravel-static-blogger. 

# What is this for?
As stated in my Laravel project, this allows a tech-savvy author to host simple articles or blog posts without the overhead of a hosted blog. Using a very simple UI, this allows a user to create one or more articles. These are converted to static files (complete with headers, footers, auto-generated links, images, and content) and uploaded to Amazon's S3.

Additionally, the app generates a simple "index" for articles that allows search engines or users to browse.

# What does this do, how is it structured...?
This uses one article controller and article model to handle the basic CRUD operations around the article model. 

We'll keep this model and controller very simple, we'll handle some of the business logic in service classes (mediators or strategies).

First, we want a way to return rendered HTML, complete with any arbitrary header or footer, so we can beam that content into S3. We'll make an interface to define the shape of this data, then implement this interface both for an article view and an article "list" view. Our service will accept any instance of this interface and will understand how to return the correct rendered HTML given those parameters. This makes it easy to add additional page or content types. 

Next, we will create a generic data store interface, implementing that interface with some method to upload the file to S3, perhaps with some existing package that can do that securely. This way we can easily switch to another data store or implement multiple data stores if we need to in the future. 

We will use these structures to implement several pages and features:
* We will be using Sequalize as an ORM (to connect to an existing mySQL DB) and adopt an MVC structure with lean controllers
* The article index will refresh whenever an article is saved, created, or deleted and will list all articles with links
* The article detail page will render the article content (with a header/footer, links to next/previous articles, and metadata)

# Improvements 
Compared to the laravel version, I'll include a few upgrades:
* A sitemap that is generated whenever articles are changed
* Related articles section
* An author model; relates 1 to many with articles
* (possibly) a proper syntax highighter for code blocks

# More about hosting a blog for a dollar per month
As an example, see https://articles.erickoyanagi.com/hosting-a-blog-on-s3-for-pennies-a-month.html -- this describes more about how the Laravel platform works and describes how to set this up on AWS through S3 and CloudFront (instructions that aren't always easy to find).
