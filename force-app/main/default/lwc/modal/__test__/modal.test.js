import { createElement } from 'lwc';
import Modal from 'c/modal';

describe('c-modal', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders modal content', () => {
        const element = createElement('c-modal', {
            is: Modal
        });
        document.body.appendChild(element);

        expect(element.shadowRoot.querySelector('header.slds-modal__header')).not.toBeNull();
        expect(element.shadowRoot.querySelector('h2.slds-modal__title')).not.toBeNull();
        expect(element.shadowRoot.querySelector('button.slds-modal__close')).not.toBeNull();
        expect(element.shadowRoot.querySelector('p')).not.toBeNull();
        expect(element.shadowRoot.querySelector('footer')).not.toBeNull();
    });

    it('dispatches closedialog event when close button is clicked', () => {
        const element = createElement('c-modal', {
            is: Modal
        });
        document.body.appendChild(element);

        const dispatchSpy = jest.spyOn(element, 'dispatchEvent');

        const closeButton = element.shadowRoot.querySelector('button.slds-modal__close');
        closeButton.click();

        expect(dispatchSpy).toHaveBeenCalled();
    });

    it('shows modal when show() is called', () => {
        const element = createElement('c-modal', {
            is: Modal
        });
        document.body.appendChild(element);

        element.show();

        expect(element.showModal).toBe(true);
        expect(element.shadowRoot.querySelector('.slds-fade-in-open')).not.toBeNull();
    });

    it('hides modal when hide() is called', () => {
        const element = createElement('c-modal', {
            is: Modal
        });
        document.body.appendChild(element);

        element.show();
        element.hide();

        expect(element.showModal).toBe(false);
        expect(element.shadowRoot.querySelector('.slds-fade-in-open')).toBeNull();
    });

    it('removes hidden class from tagline slot content', () => {
        const element = createElement('c-modal', {
            is: Modal
        });
        document.body.appendChild(element);

        const taglineSlot = element.shadowRoot.querySelector('slot[name="tagline"]');
        taglineSlot.dispatchEvent(new CustomEvent('slotchange'));

        const taglineEl = element.shadowRoot.querySelector('p');
        expect(taglineEl.classList.contains('modal-hidden')).toBe(false);
    });

    it('removes hidden class from footer slot content', () => {
        const element = createElement('c-modal', {
            is: Modal
        });
        document.body.appendChild(element);

        const footerSlot = element.shadowRoot.querySelector('slot[name="footer"]');
        footerSlot.dispatchEvent(new CustomEvent('slotchange'));

        const footerEl = element.shadowRoot.querySelector('footer');
        expect(footerEl.classList.contains('modal-hidden')).toBe(false);
    });
});
