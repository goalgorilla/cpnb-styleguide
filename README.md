# CPNB Theme

## Changelog
- 11 DEC 2015: Initial version

## About this theme

This theme is a subtheme of Omega(4). Theme settings are stored in the cpnb.info file. To exchange settings with the site use drush:

- drush orev: (omega revert) Write settings to database
- drush oexp: (omega export) Write settings from your admin/appearance interface to the info file.

## Taskrunner: Gulp

All CSS and Javascript that is used is generated with Gulp JS. This is also all you need. We do not use Ruby Gems, such as Compass or grids systems.

In this folder you will find a package.json file. In this file you find all the gulp plugins you need. 

First make sure you have gulp installed on your machine:

```bash
$ npm install --global gulp
```

To install the gulp plugins and gulp itself in the project you can simple run the following commands from the theme (this) folder.

```bash
$ npm install
```

## Drupal and Gulp

The folder __node-modules__ in your theme contains .info files which conflict with the reset script we use.

To avoid problems, you can remove the .info files in __node-modules__ with this command in CLI:

```
cd /node-modules/
```

```
$ find . -type f -name '*.info' -exec rm -rf {} \;
```

## Development

To start compiling you scss files into css, you can use the following gulp task:


```bash
$ gulp
```

What this task does can be found in the gulpfile (default). It will automically open the styleguide in your browser, including livereload. You do not have to use this feature each time you work on the theme, it is just default behavior of the gulp tasks.

## Javascript 

As you can see in the Gulpfile javascript is being concatenated from the contrib and custom folder. The custom folder is where you store the â€˜themeâ€™ javascript. For each function you can create a new file. This way developers can find it more easily. Gulp compiles this into one theme.js file. 

The contrib folder contains manipulated drupal files, which are only used for the styleguide (which has no Drupal logic of course). Whenever you need some JS function from Drupal in the styleguide, you put this in the contrib folder and change the matching taks in gulpfile. If you do not need to manipulate the function, but just call it, you can get the file directly from the sites/all/modules folder and do not store a copy in the contrib folder.

## Styleguide

The styleguide is generated from the theme. There is no extra task required. This is to ensure there is no difference between the site and the styleguide. 

The styleguide uses the Assemble script to generate the styleguide templates. 

You will see the following folder in the styleguide:

- Templates/pages: Here you can create new pages for the styleguide.
- Templates/layouts: The default page wrapper for all pages
- Templates/includes: This is where to styleguide partials and components are stored. Whenever you include a partial in your page, you must make sure it exist here. In the partial you will use plain HTML.

### Using partials

``includes/atoms/radio-input.hbs``

```
<div class="form-type-radio">
  <input class="form-radio" id="radio{{version}}" name="radio" type="radio" value="radio-value{{version}}" {{state}}>
  <label class="option" for="radio{{version}}">radio label {{version}}</label>
</div>
```

4. Make the call from your template file of choice like soâ€¦

``templates/pages/formelements.hbs``

```
{{> radio-input}}
<pre class="language-html"><code>{{> radio-input}}</code></pre>

```


### Conditions

Control scripts, styles or anything desired from appearing in your templates. A few examples are:

```
{{#any 'index single case' this.basename}}
{{/any}}
```

```
{{#is 'index' this.basename}}
{{/is}}
```

```
{{#if 'single' this.basename}}
{{/if}}
```

For further reading on conditionals see the [Handlebars](http://handlebarsjs.com/block_helpers.html) documentation.

### Code Blocks

Here's an example from your assemble template to import a partial called headings that's also called within the associated code block. The class name on the `pre` tag tells Prism this is a block we would like [Prism](http://prismjs.com) to style using html grammar.

```markup
{{> headings}}
<pre class="language-html"><code>{{> headings}}</code></pre>
```

Here's an example using a JavaScript snippet.

```markup
{{> button}}
<pre class="language-javascript"><code></code></pre>
```

The partial with the required JavaScript sets up the pre block to accept the JavaScript it will be injected with. The required JavaScript is included in your layout of choice and it's `script` tag is given a class of `atomic-js`.

```javascript
<script class="atomic-js">var button = document.querySelector('button');
button.addEventListener('click', function() {
console.log('hello world');
})</script>
```
