<script>
  import Login from "./login.svelte";
</script>

<style>

main {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 100vh;
}

.footer-wrapper {
  font-size: 16px;
  position: absolute;
  bottom: 0px;
  left: 24px;
  right: 24px;
  display: flex;
  justify-content: space-between;
}

.footer-paragraph {
  color: var(--color-white);
}

.footer-links {
  margin-right: 16px;
  font-size: 16px;
  color: var(--color-white);
  text-decoration: underline;
}

.footer-links:hover {
  cursor: pointer;
  color: var(--color-main);
}

</style>

<main>
  <Login />

  <div class="footer-wrapper">
    <p class="footer-paragraph">Sign up form UI made with Svelte 3</p>
    <p>
      <a class="footer-links" href="http://twitter.com/guiksr">Twitter</a>
      <a class="footer-links" href="http://instagram.com/guiksr">Instagram</a>
      <a class="footer-links" href="http://github.com/guiksr/svelte-form-ui">Github</a>
    </p>
  </div>
</main>