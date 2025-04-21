document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const withdrawRequestBtn = document.getElementById('withdraw-request-btn');
    const coinsRequestBtn = document.getElementById('coins-request-btn');
    const allUsersBtn = document.getElementById('all-users-btn');
    const googleFormsBtn = document.getElementById('google-forms-btn');
    const contentContainer = document.getElementById('content-container');

    // Toggle between Login and Signup forms
    loginBtn.addEventListener('click', function() {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    });

    signupBtn.addEventListener('click', function() {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
    });

    // Admin accounts
    const admins = {
        'AkshayHB': { password: 'password', isSuperAdmin: false },
        'DarshanR': { password: 'password', isSuperAdmin: false },
        'Deepumon': { password: 'password', isSuperAdmin: true }
    };

    // Function to handle form submission (Login or Signup)
    function handleFormSubmit(event, formType) {
        event.preventDefault();
        const usernameInput = document.querySelector(`#${formType}-form [name="${formType}-username"]`);
        const passwordInput = document.querySelector(`#${formType}-form [name="${formType}-password"]`);
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (formType === 'login') {
            if (admins[username] && admins[username].password === password) {
                // Login successful
                alert('Login successful!');
                // Enable buttons after login
                enableButtons();
                // Store login state in localStorage
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', username);
                // Display welcome message
                contentContainer.textContent = 'Welcome, ' + username + '!';
            } else {
                alert('Login failed. Invalid username or password.');
            }
        } else if (formType === 'signup') {
            // In a real application, you would store the new admin in a database
            admins[username] = { password: password, isSuperAdmin: false };
            alert('Signup successful! You can now login.');
        }
    }

    // Function to enable buttons
    function enableButtons() {
        withdrawRequestBtn.disabled = false;
        coinsRequestBtn.disabled = false;
        allUsersBtn.disabled = false;
        googleFormsBtn.disabled = false;
    }

    // Function to disable buttons
    function disableButtons() {
        withdrawRequestBtn.disabled = true;
        coinsRequestBtn.disabled = true;
        allUsersBtn.disabled = true;
        googleFormsBtn.disabled = true;
    }

    // Attach form submission handlers
    loginForm.addEventListener('submit', function(event) {
        handleFormSubmit(event, 'login');
    });

    signupForm.addEventListener('submit', function(event) {
        handleFormSubmit(event, 'signup');
    });

    // Check if admin is already logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        // Enable buttons if logged in
        enableButtons();
        // Display welcome message
        contentContainer.textContent = 'Welcome, ' + localStorage.getItem('username') + '!';
    } else {
        // Disable buttons by default
        disableButtons();
    }

    // Button click handlers (placeholders)
    withdrawRequestBtn.addEventListener('click', function() {
        window.location.href = 'withdraw-request.html';
    });

    coinsRequestBtn.addEventListener('click', function() {
        window.location.href = 'coins-request.html';
    });

    allUsersBtn.addEventListener('click', function() {
        const users = localStorage.getItem('users');
        window.location.href = 'all-users.html?users=' + encodeURIComponent(users);
    });

    googleFormsBtn.addEventListener('click', function() {
        window.location.href = 'google-forms.html';
    });

    // Logout button click handler
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function() {
        // Clear login state from localStorage
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        // Reload the page
        window.location.reload();
    });

    // Listen for message from index page to update user list
    window.addEventListener('storage', function(event) {
        if (event.key === 'updateUsers' && event.newValue === 'true') {
            localStorage.removeItem('updateUsers');
            // Reload the page to update the user list
            window.location.href = 'all-users.html?update=true';
        }
    });
});
