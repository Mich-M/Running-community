// --- Kontaktformular check with fancy modal ---
// Select the contact form and modal elements
const contactForm = document.querySelector('#contact form');
const modal = document.getElementById('confirmationModal');
const okBtn = document.getElementById('okBtn');
const cancelBtn = document.getElementById('cancelBtn');

// If the form and modal exist, set up event listeners
if (contactForm && modal) {
  // When the form is submitted
  contactForm.addEventListener('submit', event => {
    event.preventDefault(); // prevent immediate submission
    modal.style.display = 'flex'; // show modal
  });

  // When "OK" is clicked in the modal
  okBtn.addEventListener('click', () => {
    modal.style.display = 'none';

    // Create a wrapper to center the message
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.margin = '0';

    // Create the thank-you message
    const thankYouMsg = document.createElement('p');
    thankYouMsg.textContent = '🎉 Tak for beskeden! Vi svarer hurtigst muligt.';
    thankYouMsg.style.color = '#28a745';
    thankYouMsg.style.fontWeight = 'bold';
    thankYouMsg.style.fontSize = '1.1em';
    thankYouMsg.style.textAlign = 'center';
    thankYouMsg.style.margin = '0';

    // Append message into wrapper
    wrapper.appendChild(thankYouMsg);

    // Insert wrapper after the form
    contactForm.parentNode.insertBefore(wrapper, contactForm.nextSibling);

    // Reset form
    contactForm.reset();

    // Auto-hide message after 10 seconds
    setTimeout(() => {
      wrapper.remove();
    }, 10000);
  });

  // When "Cancel" is clicked, hide the modal
  cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

// --- Training program buttons ---
// Keeps track of which program is currently displayed
let currentProgram = null;

function showProgram(programId) {
  const programs = ['beginner', 'intermediate', 'advanced'];

  const buttonMap = {
    beginner: document.getElementById('btn-beginner'),
    intermediate: document.getElementById('btn-intermediate'),
    advanced: document.getElementById('btn-advanced')
  };

  // Check that buttons exist
  if (!buttonMap[programId] || !document.getElementById(programId)) return;

  // Toggle off if the same program is clicked again
  if (currentProgram === programId) {
    document.getElementById(programId).style.display = 'none';
    buttonMap[programId].innerText = capitalize(programId);
    currentProgram = null;
    return;
  }

  // Hide all programs and reset button text
  programs.forEach(id => {
    const programEl = document.getElementById(id);
    if (programEl) programEl.style.display = 'none';
    if (buttonMap[id]) buttonMap[id].innerText = capitalize(id);
  });

  // Show selected program and update button text
  document.getElementById(programId).style.display = 'block';
  buttonMap[programId].innerText = capitalize(programId) + ' (Skjul)';
  currentProgram = programId;
}

// Capitalize program button text for display
function capitalize(id) {
  switch(id) {
    case 'beginner': return 'Nybegynder';
    case 'intermediate': return 'Letøvede';
    case 'advanced': return 'Øvede';
    default: return id;
  }
}

// --- Scroller ----
// Select header for hide/show on scroll
const header = document.querySelector('header');
let lastScroll = 0;

// Detect mobile based on screen width
const isMobile = window.innerWidth <= 768;

// Hide header on scroll down, show on scroll up
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    // Scrolling down -> hide header
    if (isMobile) {
      header.style.transition = 'none';  // no transition on mobile
      header.style.top = '-100px';
    } else {
      header.style.transition = 'top 0.03s ease-in';
      header.style.top = '-100px';
    }
  } else {
    // Scrolling up -> show header
    if (isMobile) {
      header.style.transition = 'none';
      header.style.top = '0';
    } else {
      header.style.transition = 'top 0.03s ease-out';
      header.style.top = '0';
    }
  }

  lastScroll = currentScroll;
});

// --- Language button logic ---
document.addEventListener("DOMContentLoaded", function () {
  const languageButton = document.getElementById('language-toggle');
  if (!languageButton) return;

  let currentLanguage = 'da';

  function updateLanguageButton() {
    if (currentLanguage === 'da') {
      languageButton.innerHTML = `
        <img src="Images/UK_flag.png" alt="English" width="20" height="14">
        <span>English</span>
      `;
    } else {
      languageButton.innerHTML = `
        <img src="Images/Danish_flag.png" alt="Dansk" width="20" height="14">
        <span>Dansk</span>
      `;
    }
  }

  // Toggle language on click
  languageButton.addEventListener('click', function (e) {
    e.preventDefault();
    currentLanguage = currentLanguage === 'da' ? 'en' : 'da';
    updateLanguageButton();
  });

  updateLanguageButton();
});

// --- Join button popup ---
const joinButton = document.querySelector('#join button');
if (joinButton) {
  joinButton.addEventListener('click', () => {
    // Get screen width and height
    const screenW = window.screen.width;
    const screenH = window.screen.height;

    // Determine popup size as a percentage of screen size
    let width, height;

    if (screenW >= 1200) {          // Desktop
      width = Math.round(screenW * 0.5);  // 50% of screen width
      height = Math.round(screenH * 0.6); // 60% of screen height
    } else if (screenW >= 768) {    // Tablet/iPad
      width = Math.round(screenW * 0.7);
      height = Math.round(screenH * 0.7);
    } else {                        // Mobile
      width = Math.round(screenW * 0.95);
      height = Math.round(screenH * 0.9);
    }

    // Center popup on screen
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    // Calculate popup position
    //const width = 400;
    //const height = 450;
    //const left = (window.screen.width / 2) - (width / 2);
    //const top = (window.screen.height / 2) - (height / 2);

    // Open popup window
    const popupWindow = window.open(
      '',
      'Tilmeld',
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );

    popupWindow.document.write(`
      <html>
      <head>
        <title>Tilmelding til FTC</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 20px; }
          input, select { margin: 10px 0; padding: 5px; width: 90%; }
          button { padding: 10px 20px; margin-top: 10px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer; }
          button:hover { background: #45a049; }
          .progress { margin-top: 20px; width: 90%; height: 20px; background: #eee; border-radius: 10px; overflow: hidden; margin-left: auto; margin-right: auto; }
          .progress-fill { height: 100%; width: 0; background: #4caf50; transition: width 0.2s ease; }
          #errorMsg { color: red; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div id="content"></div>

        <script>
          const content = document.getElementById('content');
          let step = 1;
          const userData = {};

          function showStep() {
            let html = '<div id="errorMsg"></div>';

            if(step === 1){
              html += \`
                <h2>Step 1: Personlige oplysninger</h2>
                <input type="text" id="firstName" placeholder="Fornavn" value="\${userData.firstName || ''}"><br>
                <input type="text" id="lastName" placeholder="Efternavn" value="\${userData.lastName || ''}"><br>
                <input type="date" id="birthDate" value="\${userData.birthDate || ''}"><br>
                <button id="nextBtn">Næste</button>
              \`;
            } else if(step === 2){
              html += \`
                <h2>Step 2: Kontaktinformation</h2>
                <input type="email" id="email" placeholder="E-mail" value="\${userData.email || ''}"><br>
                <input type="tel" id="phone" placeholder="Telefon (valgfri)" value="\${userData.phone || ''}"><br>
                <button id="nextBtn">Næste</button>
              \`;
            } else if(step === 3){
              html += \`
                <h2>Step 3: Løbeniveau</h2>
                <select id="level">
                  <option\${userData.level === 'Begynder' ? ' selected' : ''}>Begynder</option>
                  <option\${userData.level === 'Let øvet' ? ' selected' : ''}>Let øvet</option>
                  <option\${userData.level === 'Erfaren' ? ' selected' : ''}>Erfaren</option>
                </select><br>
                <button id="nextBtn">Næste</button>
              \`;
            } else if(step === 4){
              html += \`
                <h2>Step 4: Ekstra oplysninger</h2>
                <input type="text" id="extra" placeholder="Ekstra info" value="\${userData.extra || ''}"><br>
                <button id="nextBtn">Næste</button>
              \`;
            } else if(step === 5){
              html += \`
                <h2>Step 5: Bekræft oplysninger</h2>
                <button id="finishBtn">Afslut</button>
              \`;
            }

            content.innerHTML = html;
            const errorMsg = document.getElementById('errorMsg');
            attachHandlers(errorMsg);
          }

          function attachHandlers(errorMsg){
            const nextBtn = content.querySelector('#nextBtn');
            const finishBtn = content.querySelector('#finishBtn');

            if(nextBtn){
              nextBtn.addEventListener('click', () => {
                if(step === 1){
                  const firstName = document.getElementById('firstName').value.trim();
                  const lastName = document.getElementById('lastName').value.trim();
                  const birthDate = document.getElementById('birthDate').value;

                  if(!firstName || !lastName || !birthDate){
                    errorMsg.textContent = "Udfyld venligst alle felter";
                    return;
                  } else { errorMsg.textContent = ""; }

                  userData.firstName = firstName;
                  userData.lastName = lastName;
                  userData.birthDate = birthDate;

                } else if(step === 2){
                  const email = document.getElementById('email').value.trim();
                  if(!email){
                    errorMsg.textContent = "Udfyld venligst e-mail";
                    return;
                  } else { errorMsg.textContent = ""; }

                  userData.email = email;
                  userData.phone = document.getElementById('phone').value.trim();

                } else if(step === 3){
                  userData.level = document.getElementById('level').value;

                } else if(step === 4){
                  userData.extra = document.getElementById('extra').value.trim();
                }

                step++;
                showStep();
              });
            }

            if(finishBtn){
              finishBtn.addEventListener('click', () => {
                content.innerHTML = \`
                  <h2>Tilmelding i gang...</h2>
                  <div class="progress"><div class="progress-fill"></div></div>
                \`;

                const fill = content.querySelector('.progress-fill');
                let progress = 0;
                const interval = setInterval(() => {
                  progress += 10;
                  fill.style.width = progress + "%";
                  if(progress >= 100){
                    clearInterval(interval);
                    content.innerHTML = \`
                      <h2>Velkommen, \${userData.firstName}! 🎉</h2>
                      <p>Vi glæder os til at løbe sammen med dig. 🏃‍♂️✨</p>
                      <button onclick="window.close()">Luk</button>
                    \`;
                  }
                }, 200);
              });
            }
          }

          showStep();
        </script>
      </body>
      </html>
    `);
  });
}