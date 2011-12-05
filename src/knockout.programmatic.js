/*
 * Knockout jQuery Data-Bind plugin
 * (c) Adam Pflug
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function (jQuery, undefined) {
    /*global ko*/
    var $ = jQuery;

    var bindToBindingHandler = function (options) {
        /*
         * dependentObservable will be called every time one of the observable it depends
         * on changes. Also, options will still be accessable because it's in the closure.
         * This should be more efficient than regular knockout because bindings don't need
         * to be reparsed each time an observable changes its value.
         */
        if (options.bindingHandler && typeof options.bindingHandler.init == "function") {
            options.bindingHandler.init(
                options.element,
                options.valueAccessor,
                options.allBindingsAccessor,
                options.viewModel
            );
        }
        var updateListener = new ko.dependentObservable(function () {
            if (options.bindingHandler && typeof options.bindingHandler.update == "function") {
                options.bindingHandler.update(
                    options.element,
                    options.valueAccessor,
                    options.allBindingsAccessor,
                    options.viewModel
                );
            }
        }, window, { disposeWhenNodeIsRemoved: options.element });
    };

    $.fn.databind = function (bindings, viewModel) {
        var allBindingsAccessor = function () { return bindings; };
        var buildValueAccessor = function (value) {
            return function () { return value; };
        };

        // process each of the databindings in turn
        this.each(function () {
            for (var bindingProperty in bindings) {
                if (bindings.hasOwnProperty(bindingProperty)) {
                    bindToBindingHandler({
                        element: this,
                        valueAccessor: buildValueAccessor(bindings[bindingProperty]),
                        allBindingsAccessor: allBindingsAccessor,
                        bindingHandler: ko.bindingHandlers[bindingProperty],
                        viewModel: viewModel || window
                    });
                }
            }

        });
        return this; // preserve jquery chaining support
    };

})(jQuery);