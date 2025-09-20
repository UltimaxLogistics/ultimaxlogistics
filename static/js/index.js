const contactSubmitButton = document.getElementById('contact-button');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactSubmitButton && contactForm && formMessage) {
contactSubmitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    contactSubmitButton.disabled = true;
    contactSubmitButton.innerText = "Sending Message..."
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    try {
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.color = 'green';
            contactForm.reset();
            contactSubmitButton.disabled = false;
            contactSubmitButton.innerText = "Submit Message";
        } else {
            formMessage.textContent = 'Failed to send message. Please try again later.';
            formMessage.style.color = 'red';
            contactSubmitButton.disabled = false;
            contactSubmitButton.innerText = "Submit Message";
        }   
    } catch (error) {
        formMessage.textContent = 'An error occurred. Please try again later.';
        formMessage.style.color = 'red';
        contactSubmitButton.disabled = false;
        contactSubmitButton.innerText = "Submit Message";
    }
});
}