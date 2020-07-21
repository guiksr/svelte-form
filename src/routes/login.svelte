<script>
  
	import { fade } from 'svelte/transition';
  
  let showCriterea = false;
  
  let passwordInput;
  let passwordValid;
  let passwordValidations = [false];
  
  let emailInput;
  let emailEmpty = true;
  let emailValid = null;

  function validatePassword() {
    const password = passwordInput.value;
    
    passwordValidations = [
        (password.length > 5), 
        (password.search(/[A-Z]/) > -1), 
        (password.search(/[0-9]/) > -1), 
        (password.search(/[#?!@$%^&*-]/) > -1) 
    ]

    if (passwordValidations.every(v => v == true)) {
      return passwordValid = true
    } else {
      return passwordValid = false
    }
  }

  function validateEmail() {
    const email = emailInput.value;

    (email.length > 5) ? emailEmpty = false : emailEmpty = true;

    if (email.search(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) > -1) {
      return emailValid = true
    } else {
      return emailValid = false;
    }
  }

</script>

<style>

.wrapper {
  box-shadow: 0 8px 24px #00000030;
  padding: 32px;
  width: 25vw;
  min-width: 250px;
  border-radius: 24px;
  background-color: var(--color-black);
}

.text {
  margin: 8px 0 48px 0;
  color: var(--color-main);
  font-size: 3rem;
}

/* Field */

.field {
  display: block;
  width: 100%;
  margin: 2rem auto 1rem;
  position: relative;
  z-index: 2;
  font-size: 1rem;
  border-bottom: 1px solid var(--color-light);
}

.field::after {
    content: "";
    position: relative;
    display: block;
    height: 2px;
    width: 100%;
    background: var(--color-main);
    transform: scaleX(0);
    transform-origin: 0%;
    opacity: 0;
    transition: all 500ms ease;
    bottom: -1px;
    z-index: 10;
}
  
.field:focus-within::after {
  transform: scaleX(1);
  opacity: 1;
}

.field-invalid.field::after {
  background-color: red;
}

  
.field-valid::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  right: 8px;
  bottom: 18px;
  width: 8px;
  height: 16px;
  border-width: 0 2px 2px 0;
  border-style: solid;
  transform-origin: bottom left;
  transform: rotate(45deg);
  color: var(--color-main);
}

/* Input */

.input {
  outline: none;
  border: none;
  overflow: hidden;
  margin: 0;
  padding: 6px 0 6px 0;
  width: 100%;
  background-color: transparent;
  font-size: 1.2rem;
  color: var(--color-white);
}

/* Label */

.label {
  color: var(--color-white);
  position: absolute;
  font-size: 1em;
  z-index: -1;
  transform: translateY(-1.8rem);
  transform-origin: 0%;
  transition: transform 400ms;
}

.field:focus-within .label,
.input:not(:placeholder-shown) + .label {
  transform: scale(0.9) translateY(-4rem);
}

/* Password */

.password-items {
  margin: 0;
  padding: 0 0 0 18px;
  color: var(--color-white);
}
@media only screen and (max-width: 1000px) {
  .password-criterea {
    font-size: 0.8rem;
  }
}
.password-criterea {
  position: relative;
  width: max-content;
}

.password-criterea::after {
  content: "";
  position: relative;
  display: block;
  height: 1px;
  width: 100%;
  background: var(--color-main);
  transform: scaleX(0);
  transform-origin: 0%;
  opacity: 0;
  transition: all 500ms ease;
  bottom: 9px;
  left: -1px;
  z-index: 10;
}

.valid {
  position: relative;
  color: #ffffff50;
}

.valid::after {
  transform: scaleX(1.025);
  opacity: 1;
}

/* Button */

.button {
  margin-top: 2rem;
  width: 100%;
  height: 3rem;
  border-radius: 8px;
  border: none;
  padding: 0 0 1px 0;
  box-shadow: 0 2px 8px #00000015;
  transition: transform 400ms ease-in-out, box-shadow 400ms ease-in-out;
}

.locked {
  background-color: #00D0B030;
  color: #ffffff80;
  pointer-events: none;
}

.unlocked {
  background-color: var(--color-main);
  color: var(--color-white);
  pointer-events: auto;
}

.button:hover {
  transform: scale(1.025);
  box-shadow: 0 4px 10px #00000020;
  cursor: pointer;
}

.button:active {
  transform: scale(0.975);
  box-shadow: 0 4px 10px #00000020;
  cursor: pointer;
}

</style>

<main>
  <div class="wrapper">
    <h1 class="text">Create<br>Account</h1>
    
    <div class="field {(emailValid == false && emailEmpty == false) ? 'field-invalid' : ' '} {emailValid == true ? 'field-valid' : ''}">
      <input type="email" name="email" class="input" placeholder=" "
      bind:this={emailInput}
      on:input={validateEmail} />
      <label for="email" class="label">Email</label>
    </div>

    <div class="field" class:field-valid={passwordValid == true}>
      <input type="password" name="password" class="input" placeholder=" " 
      bind:this={passwordInput}
      on:focus={setTimeout(() => showCriterea = true, 500)} 
      on:input={validatePassword}/>
      <label for="password" class="label">Password</label>
    </div>
    
    {#if showCriterea == true}

      <ul transition:fade={{duration: 500}} class="password-items">
        <li class="password-criterea" class:valid={passwordValidations[0] == true}>  Must be at least 5 characters</li>
        <li class="password-criterea" class:valid={passwordValidations[1] == true}>  Must contain a capital letter</li>
        <li class="password-criterea" class:valid={passwordValidations[2] == true}>  Must contain a number</li>
        <li class="password-criterea" class:valid={passwordValidations[3] == true}>  Must contain one special character</li>
      </ul>
    
    {/if}

    <button class="button {(passwordValid == true && emailValid == true) ? 'unlocked' : 'locked'}" on:click={() => window.location.href = ""}>Sign up</button>
  </div>
</main>