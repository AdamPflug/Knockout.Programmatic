/*global describe, it, expect, beforeEach, afterEach, spyOn */
/*global ko */
describe("Knockout jQuery DataBind", function () {
    var testElement, testObservable, testContainer;
    beforeEach(function () {
        testElement = document.createElement('div');

        document.body.appendChild(testElement);

        testObservable = ko.observable("Hello");
    });
    afterEach(function () {
        if (testElement && testElement.parentNode) {
            testElement.parentNode.removeChild(testElement);
        }
    });

    describe("Basic Behavior", function () {
        it ("Lets you bind to an element", function () {
            var handler = ko.bindingHandlers.testBindingHandler;

            spyOn(handler, "init").andCallThrough();
            $(testElement).databind({
                testBindingHandler: "Hello"
            });
            expect(handler.init).toHaveBeenCalled();
        });
        it ("Sends updates to bound elements", function () {
            var handler = ko.bindingHandlers.testBindingHandler;
            
            spyOn(handler, "init").andCallThrough();
            $(testElement).databind({
                testBindingHandler: testObservable
            });
            expect(handler.init).toHaveBeenCalled();

            spyOn(handler, "update").andCallThrough();
            testObservable("Hello World");

            expect(handler.update).toHaveBeenCalled();
        });
        it ("Can update the text in the dom", function () {
            expect(testElement.innerText).toBe("");
            $(testElement).databind({
                text: testObservable
            });

            expect(testElement.innerText).toBe("Hello");

            testObservable("Hello World");

            expect(testElement.innerText).toBe("Hello World");
        });
    });
    
    describe("Multiple Databind Support", function () {
        it ("Throws an exception when you bind the same binding twice to the same element", function () {
            $(testElement).databind({
                testBindingHandler: testObservable
            });
            expect(function () {
                $(testElement).databind({
                    testBindingHandler: testObservable
                });
            }).toThrow(new $.databind.DuplicateBindingException('testBindingHandler', testElement));
            try {
                $(testElement).databind({
                    testBindingHandler: testObservable
                });
            } catch (e) {
                expect(e.toString().length).toBeGreaterThan(1);
                expect(e.property).toBe("testBindingHandler");
                expect(e.element).toBe(testElement);
            }
        });
        it ("Should share the same all bindings object between multiple databind attempts", function () {
            spyOn(ko.bindingHandlers.checkForTestBindingHandler,"init").andCallThrough();
            spyOn(ko.bindingHandlers.checkForTestBindingHandler,"update").andCallThrough();
            $(testElement).databind({
                testBindingHandler: testObservable
            });
            $(testElement).databind({
                checkForTestBindingHandler: true
            });
            expect(ko.bindingHandlers.checkForTestBindingHandler.init).toHaveBeenCalled();
            expect(ko.bindingHandlers.checkForTestBindingHandler.update).toHaveBeenCalled();
        });
        it ("Should share the same all bindings object between multiple databind attempts, regardless of order", function () {
            var shouldTestBinding = ko.observable(false);
            $(testElement).databind({
                checkForTestBindingHandler: shouldTestBinding
            });
            $(testElement).databind({
                testBindingHandler: testObservable
            });
            shouldTestBinding(true); // call expect
        });
    });
    
    describe("Support for detached dom nodes", function () {
        it ("Should allow you to make changes while the node is detached from the dom without unbinding", function () {
            $(testElement).databind({
                text: testObservable
            });
            $(testElement).detach(); // Not .remove() so it shouldn't clear bindings
            testObservable("Hello World");
            expect(testElement.innerText).toBe("Hello World");
        });
        it ("Should allow you to programmatically undatabind.", function (){
            $(testElement).databind({
                text: testObservable
            });
            $(testElement).undatabind("text");
            testObservable("Hello World");
            expect(testElement.innerText).toBe("Hello");
        });
        it ("Should let you replace a binding.", function (){
            var otherObservable = ko.observable("World");
            $(testElement).databind({
                text: testObservable
            });
            expect(testElement.innerText).toBe("Hello");
            $(testElement).undatabind("text");
            $(testElement).databind({
                text: otherObservable
            });
            expect(testElement.innerText).toBe("World");
        });
        it ("Should correctly unbind bindings when removed by jQuery.", function () {
            $(testElement).databind({
                text: testObservable
            });
            $(testElement).remove(); // .remove() should clear bindings
            testObservable("Hello World");
            expect(testElement.innerText).toBe("Hello");
        });
    });
});