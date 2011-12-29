/*global ko */
/*global beforeEach expect */
beforeEach(function () {
    ko.bindingHandlers.testBindingHandler = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            ko.utils.unwrapObservable(valueAccessor()); // so that this is marked as dependent on the value of the observable
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            ko.utils.unwrapObservable(valueAccessor()); // so that this is marked as dependent on the value of the observable
        }
    };
    ko.bindingHandlers.checkForTestBindingHandler = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            // so that this is marked as dependent on the value of the observable
            var val = ko.utils.unwrapObservable(valueAccessor());
            // only expect if the value is truthy
            if (val) {
                expect(allBindingsAccessor().testBindingHandler).toBeDefined();
            }
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            // so that this is marked as dependent on the value of the observable
            var val = ko.utils.unwrapObservable(valueAccessor());
            // only expect if the value is truthy
            if (val) {
                expect(allBindingsAccessor().testBindingHandler).toBeDefined();
            }
        }
    };
});
