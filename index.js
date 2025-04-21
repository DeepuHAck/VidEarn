document.addEventListener('DOMContentLoaded', function() {
    const adminLoginBtn = document.getElementById('admin-login-btn');

    adminLoginBtn.addEventListener('click', function() {
        const password = prompt('Enter Admin Password:');
        if (password === 'Admin@VidEarn') {
            window.location.href = 'admin.html';
        } else {
            alert('Incorrect password.');
        }
    });

    const userLoginBtn = document.getElementById('user-login-btn');
    const loginSignupContainer = document.getElementById('login-signup-container');
    const userLoginBtnToggle = document.getElementById('user-login-btn-toggle');
    const userSignupBtnToggle = document.getElementById('user-signup-btn-toggle');
    const userLoginForm = document.getElementById('user-login-form');
    const userSignupForm = document.getElementById('user-signup-form');
    const popupContainer = document.getElementById('popup-container');
    const closeBtn = document.getElementById('close-btn');

    userLoginBtn.addEventListener('click', function() {
        popupContainer.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        popupContainer.style.display = 'none';
    });

    userLoginBtnToggle.addEventListener('click', function() {
        userLoginForm.style.display = 'block';
        userSignupForm.style.display = 'none';
    });

    userSignupBtnToggle.addEventListener('click', function() {
        userLoginForm.style.display = 'none';
        userSignupForm.style.display = 'block';
    });

    userLoginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('user-login-username').value;
        const password = document.getElementById('user-login-password').value;

        // Retrieve users from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[username] && users[username].password === password) {
            // Login successful
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password');
        }
    });

    userSignupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('user-signup-username').value;
        const password = document.getElementById('user-signup-password').value;

        // Retrieve users from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[username]) {
            alert('Username already exists');
        } else {
            // Create new user
            const joiningDate = new Date().toLocaleDateString();
            users[username] = { password: password, joining: joiningDate, email: '', phone: '' };
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('loggedInUser', username);
            alert('Successfully signed up, please login.');

            // Send message to admin page to update user list
            localStorage.setItem('updateUsers', 'true');
        }
    });

    // Retrieve user details form from dashboard.html
    const userDetailsForm = document.getElementById('userDetailsForm');

    // Add event listener to the "Save Details" button
    if (userDetailsForm) {
        userDetailsForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Retrieve the updated user details from the form
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const joining = document.getElementById('joining').value;

            // Retrieve the logged-in username from localStorage
            const username = localStorage.getItem('loggedInUser');

            // Retrieve users from localStorage
            let users = JSON.parse(localStorage.getItem('users')) || {};

            // Update the user details in the users object
            if (users[username]) {
                users[username].email = email;
                users[username].phone = phone;
                users[username].joining = joining;

                // Store the updated users object in localStorage
                localStorage.setItem('users', JSON.stringify(users));

                alert('User details updated successfully!');
            } else {
                alert('User not found!');
            }
        });
    }
});
