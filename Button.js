const joinButton = document.querySelector('#join button');

joinButton.addEventListener('click', () => {
  const width = 400;
  const height = 450;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);

  const popupWindow = window.open(
    '',
    'Tilmeld',
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
  );

  popupWindow.document.write(`
    <html>
    <head>
      <title>Tilmelding til løbeklub</title>
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
              <p>Gennemgå dine oplysninger</p>
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
