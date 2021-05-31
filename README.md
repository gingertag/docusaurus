# @gingertag/docusaurus

Docusaurus plugin to integrate GingerTag analytics.

## Usage

In your `docusaurus.config.js`, add `'@gingertag/docusaurus'` to plugins.

Add your `projectId` to `themeConfig` key.

``` 
{
  ...
  plugins: ['@gingertag/docusaurus'],
  themeConfig: {
    ...
    gingertag: {
      projectId: 123,
    },
  }
}
```


Note that analytics will only be triggered in production build, and not while development.