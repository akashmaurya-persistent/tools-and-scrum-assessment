import { createElement } from 'lwc';
import AccountPage from 'c/accountPage';

describe('c-account-page', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays correct columns for Contact', () => {
        const element = createElement('c-account-page', {
            is: AccountPage
        });
        element.contactColumns = [            { label: 'CONTACT NAME', fieldName: 'LinkName', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_top' } },            { label: 'Title', fieldName: 'Title', type: 'text' },            { label: 'Email', fieldName: 'Email', type: 'email' },            { label: 'Phone', fieldName: 'Phone', type: 'phone' }        ];

        document.body.appendChild(element);

        const tableEl = element.shadowRoot.querySelector('.contactTable');
        expect(tableEl).not.toBeNull();

        const headerEls = tableEl.querySelectorAll('th');
        expect(headerEls.length).toBe(4);
        expect(headerEls[0].textContent).toBe('CONTACT NAME');
        expect(headerEls[1].textContent).toBe('Title');
        expect(headerEls[2].textContent).toBe('Email');
        expect(headerEls[3].textContent).toBe('Phone');
    });

    it('displays correct columns for Opportunity', () => {
        const element = createElement('c-account-page', {
            is: AccountPage
        });
        element.opptyColumns = [            { label: 'OPPORTUNITY  Name', fieldName: 'LinkName', type: 'url', typeAttributes: {label: { fieldName: 'Name' }, target: '_top'} },            { label: 'Stage', fieldName: 'StageName', type: 'text' },            { label: 'Amount', fieldName: 'Amount', type: 'currency', cellAttributes: { alignment: 'left' } },            { label: 'Close Date', fieldName: 'CloseDate', type:'date-local', typeAttributes:{month:'2-digit', day:'2-digit'} }        ];

        document.body.appendChild(element);

        const tableEl = element.shadowRoot.querySelector('.opptyTable');
        expect(tableEl).not.toBeNull();

        const headerEls = tableEl.querySelectorAll('th');
        expect(headerEls.length).toBe(4);
        expect(headerEls[0].textContent).toBe('OPPORTUNITY  Name');
        expect(headerEls[1].textContent).toBe('Stage');
        expect(headerEls[2].textContent).toBe('Amount');
        expect(headerEls[3].textContent).toBe('Close Date');
    });

})
