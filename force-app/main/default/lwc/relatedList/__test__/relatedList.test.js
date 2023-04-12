import { createElement } from "lwc";
import RelatedList from "c/relatedList";
import { loadStyle } from "lightning/platformResourceLoader";

// mock the helper class
jest.mock("c/relatedListHelper");

describe("c-related-list", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch data and update state when recordId is set", async () => {
        // create the component
        const element = createElement("c-related-list", {
            is: RelatedList
        });
        document.body.appendChild(element);

        // set the public properties
        element.sobjectApiName = "Account";
        element.relatedFieldApiName = "Contacts";
        element.recordId = "001000000000001";

        // wait for the component to render and update state
        await Promise.resolve();

        // verify that the fetchData method was called
        expect(element.helper.fetchData).toHaveBeenCalledTimes(1);
        expect(element.helper.fetchData).toHaveBeenCalledWith({
            sobjectApiName: "Account",
            relatedFieldApiName: "Contacts",
            recordId: "001000000000001",
            fields: undefined,
            columns: undefined,
            numberOfRecords: 6,
            sortedBy: undefined,
            sortedDirection: "ASC",
            customActions: []
        });

        // verify that the state was updated
        expect(element.state.showRelatedList).toBe(true);
        expect(element.state.records).toEqual([]);
        expect(element.state.fields).toBe(undefined);
        expect(element.state.relatedFieldApiName).toBe("Contacts");
        expect(element.state.recordId).toBe("001000000000001");
        expect(element.state.numberOfRecords).toBe(6);
        expect(element.state.sobjectApiName).toBe("Account");
        expect(element.state.sortedBy).toBe(undefined);
        expect(element.state.sortedDirection).toBe("ASC");
        expect(element.state.customActions).toEqual([]);
    });

    it("should not fetch data or update state when required properties are not set", async () => {
        // create the component
        const element = createElement("c-related-list", {
            is: RelatedList
        });
        document.body.appendChild(element);

        // set the public properties
        element.recordId = "001000000000001";

        // wait for the component to render and update state
        await Promise.resolve();

        // verify that the fetchData method was not called
        expect(element.helper.fetchData).not.toHaveBeenCalled();

        // verify that the state was not updated
        expect(element.state.showRelatedList).toBe(undefined);
        expect(element.state.records).toBe(undefined);
        expect(element.state.fields).toBe(undefined);
        expect(element.state.relatedFieldApiName).toBe(undefined);
        expect(element.state.recordId).toBe(undefined);
        expect(element.state.numberOfRecords).toBe(undefined);
        expect(element.state.sobjectApiName).toBe(undefined);
        expect(element.state.sortedBy).toBe(undefined);
        expect(element.state.sortedDirection).toBe(undefined);
        expect(element.state.customActions).toEqual([]);
    });
})