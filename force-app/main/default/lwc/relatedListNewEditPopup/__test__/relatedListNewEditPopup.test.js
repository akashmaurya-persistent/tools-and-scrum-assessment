import { createElement } from 'lwc';
import RelatedListNewEditPopup from 'c/relatedListNewEditPopup';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle } from 'lightning/platformResourceLoader';
import relatedListResource from '@salesforce/resourceUrl/relatedListResource';

// Mock data
const sobjectLabel = 'Contact';
const sobjectApiName = 'Contact';
const recordId = '003XXXXXXXXXXXXXXX';
const recordName = 'John Doe';

describe('c-related-list-new-edit-popup', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    // Helper function to wait for Promises to resolve
    async function flushPromises() {
        return new Promise((resolve) => setImmediate(resolve));
    }

    it('renders with the correct header for new record', async () => {
        // Create element
        const element = createElement('c-related-list-new-edit-popup', {
            is: RelatedListNewEditPopup
        });
        element.sobjectLabel = sobjectLabel;
        element.sobjectApiName = sobjectApiName;
        element.recordId = null;
        element.recordName = null;
        document.body.appendChild(element);

        // Wait for lightning-record-form to be rendered
        await flushPromises();

        // Check header
        const headerEl = element.shadowRoot.querySelector('h2');
        expect(headerEl.textContent).toBe(`New ${sobjectLabel}`);
    });

    it('renders with the correct header for existing record', async () => {
        // Create element
        const element = createElement('c-related-list-new-edit-popup', {
            is: RelatedListNewEditPopup
        });
        element.sobjectLabel = sobjectLabel;
        element.sobjectApiName = sobjectApiName;
        element.recordId = recordId;
        element.recordName = recordName;
        document.body.appendChild(element);

        // Wait for lightning-record-form to be rendered
        await flushPromises();

        // Check header
        const headerEl = element.shadowRoot.querySelector('h2');
        expect(headerEl.textContent).toBe(`Edit ${recordName}`);
    });

    it('calls the correct method when save button is clicked', async () => {
        // Create element
        const element = createElement('c-related-list-new-edit-popup', {
            is: RelatedListNewEditPopup
        });
        element.sobjectLabel = sobjectLabel;
        element.sobjectApiName = sobjectApiName;
        element.recordId = null;
        element.recordName = null;
        document.body.appendChild(element);

        // Wait for lightning-record-form to be rendered
        await flushPromises();

        // Mock submit method
        const submitMock = jest.fn();
        element.template.querySelector('lightning-record-form').submit = submitMock;

        // Click save button
        const saveButtonEl = element.shadowRoot.querySelector('.slds-button_brand');
        saveButtonEl.click();

        // Check that submit method was called
        expect(submitMock).toHaveBeenCalledTimes(1);
    });
})