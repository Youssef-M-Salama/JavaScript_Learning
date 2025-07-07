#  Project Requirements

 We need to build a website exactly like this one (same design or better):  
**DEMO:** https://smart-login.netlify.app/

---

## 1- Registration Page

- The user should be able to register.
- If registration is successful, redirect automatically to the **Login** page.
- If there's an error (e.g. invalid email), show a message like:
  > "This email is not valid"
- If the user tries to register with an already used email, show:
  > "This email already exists. Please use a different one "

---

## 2- Login Page

- The user can login with email and password.
- We check if the user exists and the password is correct.
- If everything is fine, redirect automatically to the **Home** page.
- If there's a problem (like wrong password), show the specific error message.

---

## 3- Home Page

- A simple page that shows:
  > "Welcome [User Name]"
- The user **cannot access** the home page without logging in first.

---

## 4- Logout

- The user can click a **Logout** button.
- It should log them out and redirect to the Login page.

