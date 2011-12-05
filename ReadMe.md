# Knockout.Programmatic

jQuery-based programmatic binding for [KnockoutJS] (http://knockoutjs.com)

### Prerequisites

* KnockoutJS v1.2.1 or higher

Knockout.Programmatic has been tested with v1.2.1 of KnockoutJS. If you run into any issues with this or future versions, let me know on the [Issues tab] (https://github.com/AdamPflug/Knockout.Programmatic/issues) and I'll take a look.

## Getting Started

The main purpose of Knockout.Programmatic is to move from a declarative binding syntax to a programmatic one. This has two major benefits:
* It allows for the javascript and html to be less tightly coupled.
* It is easier to debug, because the data-binding process can be walked through with a debugger.

To get started download [KnockoutJS] (http://knockoutjs.com), jQuery, and this plugin and include them on your page.

```html
<script src="jquery-1.7.1.js"></script>
<script src="knockout-1.2.1.js"></script>
<script src="Knockout.programmatic.js"></script>
```

### Compared to Traditional Knockout

To get a feel of the difference between the declarative data-bind syntax of knockout and this programmatic one, let's look at an [example] (http://jsfiddle.net/AdamPflug/MeXpc/) (working jsfiddle).


#### Traditional Knockout
First we need a view model with an observable property:

```javascript
var viewModel = {
   name: ko.observable("Adam")
};
```

The next step is to bind the view model to our view. With declarative binding we embed the data-binding code directly into the html:

```html
<label for="name">Name: </label>
<input type="text" data-bind="value: name, valueUpdate: 'afterkeydown'" />
<div>Hello <span data-bind="name"></span>!</div>
```

We also need to tell Knockout to look through the DOM, parse all the data-bind attributes it finds, and apply those data-bindings.

```javascript
ko.applyBindings(viewModel);
```

#### Knockout with Programmatic Binding
With programmatic binding we can keep our html clean:

```html
<label for="name">Name: </label>
<input type="text" id="name" />
<div id="greeting">Hello <span></span>!</div>
```

Then, we define our view model and data-bind in javascript. Note that we no longer need to call ```ko.applyBindings```.

```javascript
var viewModel = {
   name: ko.observable("Adam")
};
$("#name").databind({
   value: viewModel.name,
   valueUpdate: 'afterkeydown'
});
$('#greeting span').databind({
   text: viewModel.name
});
```
Also, because we don't need to ```eval()``` strings from the dom every time an observable changes, this method should be faster.

### Additional Examples
* [Nested Templates] (http://jsfiddle.net/AdamPflug/wcNHh/)
* ... More to come

### ToDo...

* Allow multiple ```databind``` calls on a single element (binding the same type more than once should result in an exception)
* Come up with better examples
* Support better workflows for jQuery templates
* Other ideas? Let me know!

## MIT License

Copyright (c) 2011 Adam Pflug

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.