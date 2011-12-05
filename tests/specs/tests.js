/*global describe, it, expect, beforeEach, afterEach, spyOn */
/*global ko */
describe("Knockout jQuery DataBind", function () {
    var testElement, testObservable;
    beforeEach(function () {
        testElement = document.createElement('div');
        document.body.appendChild(testElement);

        testObservable = ko.observable("Hello");
    });
    afterEach(function () {
        testElement.parentNode.removeChild(testElement);
    });

    it ("Lets you bind to an element", function () {
        var handler = ko.bindingHandlers.testBindingHandler;

        spyOn(handler, "init").andCallThrough();
        $(testElement).databind({
            testBindingHandler: "Hello"
        });
        expect(handler.init).toHaveBeenCalled();
    });
    it ("Lets sends updates to bound elements", function () {
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