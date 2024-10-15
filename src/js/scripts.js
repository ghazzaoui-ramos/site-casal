document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messageList = document.getElementById('messageList');

    let messages = JSON.parse(localStorage.getItem('messages')) || [];

    function saveMessages() {
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function addMessage(text) {
        const message = {
            id: new Date().getTime(),
            text: text
        };

        messages.push(message);

        renderMessages();
        saveMessages();
    }

    function renderMessages() {
        messageList.innerHTML = '';

        messages.forEach(message => {
            const li = document.createElement('li');
            li.textContent = message.text;
            li.classList.add('message-item');

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.classList.add('editBtn');
            editBtn.addEventListener('click', () => editMessage(message.id));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.addEventListener('click', () => deleteMessage(message.id));

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            messageList.appendChild(li);
        });
    }

    function editMessage(id) {
        const message = messages.find(msg => msg.id === id);
        if (!message) return;

        const newText = prompt('Editar mensagem:', message.text);
        if (newText !== null) {
            message.text = newText.trim();
            renderMessages();
            saveMessages();
        }
    }

    function deleteMessage(id) {
        messages = messages.filter(msg => msg.id !== id);
        renderMessages();
        saveMessages();
    }

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const messageText = messageInput.value.trim();
        if (messageText === '') {
            alert('Por favor, escreva algo antes de enviar.');
            return;
        }

        addMessage(messageText);
        messageInput.value = '';
    });

    renderMessages();

    // Carrossel de portfólio
    const portfolioCarousel = document.querySelector('.portfolio .flex');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let scrollAmount = 0;

    nextBtn.addEventListener('click', () => {
        scrollAmount += portfolioCarousel.offsetWidth + 20;
        portfolioCarousel.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        scrollAmount -= portfolioCarousel.offsetWidth + 20;
        if (scrollAmount < 0) scrollAmount = 0;
        portfolioCarousel.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Menu móvel
    const btnMenu = document.getElementById('btn-menu');
    const menuMobile = document.getElementById('menu-mobile');
    const overlayMenu = document.getElementById('overlay-menu');
    const btnFecharMenu = document.getElementById('btn-fechar-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    btnMenu.addEventListener('click', function() {
        menuMobile.style.left = menuMobile.style.left === '0px' ? '-100%' : '0px';
        overlayMenu.classList.toggle('ativo');
    });

    overlayMenu.addEventListener('click', function() {
        menuMobile.style.left = '-100%';
        overlayMenu.classList.remove('ativo');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuMobile.style.left = '-100%';
            overlayMenu.classList.remove('ativo');
        });
    });

    btnFecharMenu.addEventListener('click', function() {
        menuMobile.style.left = '-100%';
        overlayMenu.classList.remove('ativo');
    });
    
    
});


