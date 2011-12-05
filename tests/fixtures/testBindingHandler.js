/*global ko */
/*global beforeEach */
beforeEach(function () {
    ko.bindingHandlers.testBindingHandler = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            ko.utils.unwrapObservable(valueAccessor()); // so that this is marked as dependent on the value of the observable
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            ko.utils.unwrapObservable(valueAccessor()); // so that this is marked as dependent on the value of the observable
        }
    };
});
