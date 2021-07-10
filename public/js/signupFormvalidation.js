// Retrieving the values of form elements 
    const signupForm = document.querySelector("#signupForm")
    const firstName = document.querySelector("#firstNameInput")
    const lastName = document.querySelector("#surnameInput")
    const email = document.querySelector("#emailInput")
    const pwd = document.querySelector("#passwordInput")
    const confirmPwd = document.querySelector("#confirmPasswordInput")

    signupForm.onsubmit = (e) => { 
       // console.log("Signup form validation")
        if (validateName(firstName) && validateName(lastName) && validateEmail(email) && validatePwd(pwd) && validatePwd(confirmPwd) && comparePasswords(pwd, confirmPwd)) {
             console.log("Form validation is successful")
        }
        else {
            console.log("Error while validating the form.")
            e.preventDefault()
        }
     }   

    function validateName(name) {
        
        let nameRegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i
  
        if(!(nameRegExp.test(name.value.trim()))) {
             if(name === lastName) {
                printError("lastNameErr", "Please enter a valid last name");
                return false;
             } else if(name === firstName) {
                printError("firstNameErr", "Please enter a valid first name");
                return false;
             }
        } else {
            if(name === lastName) {
                printError("lastNameErr", "");
                return true;
             } else if(name === firstName) {
                printError("firstNameErr", "");
             return true;
            }
        }        
    }

    function validateEmail (email) {
        const emailRegExp = /^[a-zA-Z0-9_.-]+[a-zA-Z0-9_.-]+@+[a-z]{3,5}.+[a-z]{2,4}/g
        if(!(emailRegExp.test(email.value.toLocaleLowerCase().trim()))) {
            printError("emailErr", "Please enter a valid email address");
            return false;
        } else {
            printError("emailErr", "");
            return true;
        }       
    }

    function validatePwd(pwd) {
// This regular expression macthes password which is 8 characters long including 1 capital letter, 1 small letter, 1 number, and 1 special character
        const pwdRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,32}$/
        if(pwd.value.length < 1 ) {
            if(pwd === pwd) {
                printError("pwdErr", "Please enter the password");
                return false;
            } else if (pwd === confirmPwd) {
                console.log("chk c.pwd")
                printError("confirmPwdErr", "Please enter the confirm password");
                return false;
            }
        } else if (!(pwdRegExp.test(pwd.value))) { 
            if(pwd === pwd) {
                printError("pwdErr", "Password must be atleast 8 characters long including 1 capital letter, 1 small letter, 1 number, and 1 special character");
                return false;
            } else if(pwd === confirmPwd) {
                printError("confirmPwdErr", "Password and confirm Password don't match");
                return false;
            }
        }  else {
                if(pwd === pwd) {
                    printError("pwdErr", "")
                    return true
                } else if (pwd === confirmPwd) {
                    printError("confirmPwdErr", "")
                    return true;
                }
        }
    }

    function comparePasswords(pwd, confirmPwd) {
        console.log(pwd.value + " " + confirmPwd.value)
         if (pwd.value !== confirmPwd.value) {
             printError("confirmPwdErr", "Password and confirm password don't match.");
             return false;
        } else {
            printError("confirmPwdErr", "")
            return true;
        }
    }
  
     // Defining a function to display error message
    function printError(elemId, hintMsg) {
         document.getElementById(elemId).innerHTML = hintMsg;
    }      
