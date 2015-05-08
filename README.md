angular-devtrw-translate
===

Provides a `translate-base` and `translate-child` directive that wrap angular-translate 
functionality.

`translate-base` sets a base translation key that will be prepended to any `translate-child` 
directives.

See the `demo/index.html` file for example usage.

Installation
===

1. Install the source files using bower: `bower install angular-devtrw-translate`
2. Include either source file in `dist/`, they are both the same.

  __Note:__ _Both files have the same content however one has a hash of the file appended to 
  the filename and will change with each version. The revisioned filename is referenced in 
  the `main` section of the contained `bower.json` for use with automated build tools._
3. Include the `dtrw.translate` module in your Angular app

Usage
===

See the demo/index.html for usage examples. If this gains any useage outside of our internal team I
will add some more documentation here. Shoot me an email at <steven@devtrw.com> if you need any 
help.

License
===
See the included LICENSE file.
