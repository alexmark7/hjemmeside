/*
 * Contact form validation and message preparation.
 * No message is sent unless SITE_CONFIG.contactEndpoint is configured.
 */
(function () {
  "use strict";

  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  var config = window.SITE_CONFIG || {};
  var status = document.querySelector("[data-contact-status]");
  var copyWrap = document.querySelector("[data-contact-copy-wrap]");
  var copyField = document.querySelector("[data-contact-copy]");
  var copyButton = document.querySelector("[data-contact-copy-button]");
  var fieldNames = ["name", "email", "phone", "message"];

  function inputFor(name) {
    return form.elements[name];
  }

  function errorFor(name) {
    return form.querySelector('[data-error-for="' + name + '"]');
  }

  function setError(name, message) {
    var input = inputFor(name);
    var error = errorFor(name);
    if (input) input.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  }

  function clearError(name) {
    var input = inputFor(name);
    var error = errorFor(name);
    if (input) input.removeAttribute("aria-invalid");
    if (error) error.textContent = "";
  }

  function clearStatus() {
    if (status) {
      status.textContent = "";
      status.className = "form__status";
    }
    if (copyWrap) copyWrap.hidden = true;
    if (copyField) copyField.value = "";
    if (copyButton) {
      copyButton.hidden = true;
      copyButton.textContent = "Copy message";
    }
  }

  function addStatusParagraph(parent, text) {
    var paragraph = document.createElement("p");
    paragraph.textContent = text;
    parent.appendChild(paragraph);
  }

  function validate() {
    var errors = {};
    var name = inputFor("name").value.trim();
    var email = inputFor("email").value.trim();
    var phone = inputFor("phone").value.trim();
    var message = inputFor("message").value.trim();

    if (name.length < 2) {
      errors.name = "Enter your full name (at least two characters).";
    }
    if (!email) {
      errors.email = "Enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter an email address in a format such as name@example.com.";
    }
    if (phone && !/^[+()\d\s.-]{7,20}$/.test(phone)) {
      errors.phone = "Use digits, spaces, +, -, or parentheses (7–20 characters), or leave the field empty.";
    }
    if (message.length < 10) {
      errors.message = "Write at least 10 characters so the team has enough context.";
    }

    return {
      errors: errors,
      payload: {
        name: name,
        email: email,
        phone: phone,
        message: message
      }
    };
  }

  function formatMessage(payload) {
    var lines = [
      "Name: " + payload.name,
      "Email: " + payload.email
    ];
    if (payload.phone) lines.push("Phone: " + payload.phone);
    lines.push("", "Message:", payload.message);
    return lines.join("\n");
  }

  function prepareMessage(payload) {
    clearStatus();
    if (status) {
      status.className = "form__status form__status--info";
      var heading = document.createElement("strong");
      heading.textContent = "Your message is ready — but it was not sent.";
      status.appendChild(heading);
      addStatusParagraph(status, "This student project site has no contact endpoint configured, so nothing was transmitted or stored. Copy the message below and send it through the team’s published contact channel once one is available.");
      status.hidden = false;
      status.focus();
    }
    if (copyField) copyField.value = formatMessage(payload);
    if (copyWrap) copyWrap.hidden = false;
    if (copyButton) copyButton.hidden = false;
  }

  function sendMessage(payload) {
    clearStatus();
    if (status) {
      status.className = "form__status form__status--info";
      status.textContent = "Sending message…";
      status.hidden = false;
    }

    fetch(config.contactEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        if (status) {
          status.className = "form__status form__status--success";
          status.textContent = "";
          var heading = document.createElement("strong");
          heading.textContent = "Message sent.";
          status.appendChild(heading);
          addStatusParagraph(status, "The configured contact endpoint accepted the message.");
          status.focus();
        }
        form.reset();
        fieldNames.forEach(clearError);
      })
      .catch(function () {
        if (status) {
          status.className = "form__status form__status--error";
          status.textContent = "";
          var heading = document.createElement("strong");
          heading.textContent = "The message could not be sent.";
          status.appendChild(heading);
          addStatusParagraph(status, "Nothing was delivered. Please try again later or use the project’s published contact channel.");
          status.focus();
        }
      });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearStatus();

    var result = validate();
    var firstInvalid = null;

    fieldNames.forEach(function (name) {
      if (result.errors[name]) {
        setError(name, result.errors[name]);
        if (!firstInvalid) firstInvalid = inputFor(name);
      } else {
        clearError(name);
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    if (config.contactEndpoint) {
      sendMessage(result.payload);
    } else {
      prepareMessage(result.payload);
    }
  });

  fieldNames.forEach(function (name) {
    var input = inputFor(name);
    if (!input) return;
    input.addEventListener("input", function () {
      clearError(name);
      if (status && status.textContent) clearStatus();
    });
  });

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      if (!copyField) return;
      copyField.focus();
      copyField.select();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyField.value).then(function () {
          copyButton.textContent = "Copied to clipboard";
          window.setTimeout(function () {
            copyButton.textContent = "Copy message";
          }, 2200);
        }).catch(function () {
          copyButton.textContent = "Text selected — press Ctrl+C";
        });
      } else {
        copyButton.textContent = "Text selected — press Ctrl+C";
      }
    });
  }
})();
