import { createElement } from 'lwc';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import { ShowToastEventName } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import RelatedListDeletePopup from 'c/relatedListDeletePopup';

// Register a fake wire adapter for `deleteRecord` so we can mock its response
const deleteRecordAdapter = registerLdsTestWireAdapter(deleteRecord);

// Mock the `ShowToastEvent` class so we can spy on its constructor
jest.mock('lightning/platformShowToastEvent', () => {
    return {
        __esModule: true,
        ShowToastEvent: jest.fn()
    };
});

describe('c-related-list-delete-popup', () => {
    afterEach(() => {
        // Reset the mock after each test
        jest.resetAllMocks();
    });

    it('renders the component with default properties', () => {
        const element = createElement('c-related-list-delete-popup', {
            is: RelatedListDeletePopup
        });

        expect(element.showModal).toBe(false);
        expect(element.sobjectLabel).toBeUndefined();
        expect(element.recordId).toBeUndefined();
        expect(element.recordName).toBeUndefined();
    });

    it('shows the dialog when the show() method is called', () => {
        const element = createElement('c-related-list-delete-popup', {
            is: RelatedListDeletePopup
        });

        element.show();
        expect(element.showModal).toBe(true);
    });

    it('hides the dialog when the hide() method is called', () => {
        const element = createElement('c-related-list-delete-popup', {
            is: RelatedListDeletePopup
        });

        element.show();
        element.hide();
        expect(element.showModal).toBe(false);
    });

    it('sets the body and header properties correctly', () => {
        const element = createElement('c-related-list-delete-popup', {
            is: RelatedListDeletePopup
        });

        element.sobjectLabel = 'Account';
        expect(element.body).toBe('Are you sure you want to delete this account');
        expect(element.header).toBe('Delete Account');
    });

    it('deletes the record when the handleDelete() method is called', () => {
        const element = createElement('c-related-list-delete-popup', {
            is: RelatedListDeletePopup
        });

        element.sobjectLabel = 'Account';
        element.recordId = '001xxxxxxxxxxxxxxx';
        element.recordName = 'Test Account';

        // Simulate a successful delete
        deleteRecordAdapter.emit({
            data: {}
        });

        element.handleDelete();

        // Verify that deleteRecord was called with the correct parameters
        expect(deleteRecordAdapter.getLastConfig().recordId).toBe(element.recordId);

        // Verify that the dialog was hidden
        expect(element.showModal).toBe(false);

        // Verify that the toast event was dispatched with the correct parameters
        expect(ShowToastEvent).toHaveBeenCalledWith({
            title: 'Account "Test Account" was deleted.',
            variant: 'success'
        });

        // Verify that the "refreshdata" event was dispatched
        expect(element.dispatchEvent).toHaveBeenCalledWith(expect.any(CustomEvent));
        expect(element.dispatchEvent.mock.calls[0][0].type).toBe('refreshdata');
    });
})