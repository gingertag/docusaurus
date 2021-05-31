/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { gingertag } = themeConfig || {};

  if (!gingertag) {
    throw new Error(
      `You need to specify 'gingertag' object in 'themeConfig' with 'projectId' field in it to use docusaurus-plugin-gingertag`,
    );
  }

  const { projectId } = gingertag;

  if (!projectId) {
    throw new Error(
      'You specified the `gingertag` object in `themeConfig` but the `projectId` field was missing. ' +
      'Please ensure this is not a mistake.',
    );
  }

  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'docusaurus-plugin-gingertag',

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              (function (w,n,pid) {
                w[n]=w[n] || (function () {
                  d=document,h=d.getElementsByTagName('head')[0],s=d.createElement('script'),eq=[];
                  s.src="https://cdn.gingertag.com/gt.js?pid="+pid;s.type='text/javascript';s.async=1;h.appendChild(s);
                  return {event:function(){w[n].eq.push(arguments);},eq};
                }());
              })(window,'gingertag', ${projectId});
             `,
          },
        ],
      };
    },
  };
};
