# Knockout.Programmatic

jQuery-based programmatic binding for [KnockoutJS] (http://knockoutjs.com)

### Prerequisites

* KnockoutJS v1.2.1 or higher

Knockout.Programmatic has been tested with v1.2.1 of KnockoutJS. If you run into any issues with this or future versions, let me know on the [Issues tab] (https://github.com/AdamPflug/Knockout.Programmatic/issues) and I'll take a look.

## Getting Started

The main purpose of Knockout.Programmatic is to move from a declarative binding syntax to a programmatic one. This has three major benefits:
* It allows for the javascript and html to be less tightly coupled.
* It is easier to debug, because the data-binding process can be walked through with a debugger.
* Faster because databinding can be executed before appending to the dom, minimizing repaints

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

#### Removing databinds

Sometimes you might want to remove existing databinds from a dom node. Because this plugin makes it easy to databind to elements before they're appended to the dom, it doesn't remove databinds automatically when a observable/dependency is updated while the databound node is detached (as traditional KnockoutJS does). Instead, it hooks into jQuery's cleanup functionality to unbind itself at the same time that jQuery removes data and event handlers. This happens when ```$.remove``` (as opposed to ```$.detach```), ```$.empty```, or ```$.removeData``` are called on a set of elements.

Alternatively, you can explicity unbind with the ```$.undatabind([binding])``` method. This method takes one optional parameter, a string containing the name of the binding you want to remove. If this parameter is omitted then all bindings for that element will be removed.

```javascript
$('#someElement').undatabind('text'); // remove the text databinding
$('#someElement').undatabind(); // remove all databindings
```

### Additional Examples
* [Nested Templates] (http://jsfiddle.net/AdamPflug/wcNHh/)
* ... More to come

### ToDo...

* Come up with better examples
* Improve the performance of .remove() by moving away from jQuery's .data() doing manually
* Patch KnockoutJS to support a beforeRender event for template rendering (so you can remove dom elements without clobbering all their event bindings).
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