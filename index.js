let cooldownExpiration = localStorage.getItem('submissionCooldown');
    
      async function sendContact(ev) {
        ev.preventDefault();
        if (cooldownExpiration && new Date(cooldownExpiration) > new Date()) {
          Swal.fire({
            title: 'Cooldown Active!',
            text: 'You could resubmit this form next week in meanwhile check your discord if you got the role!',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }
    
        const senderEmail = document.getElementById('emailInput').value;
        const senderMessage = document.getElementById('messageInput').value;
    
        const messageBody = {
          embeds: [{
            title: 'The Form Has Been Submitted',
            fields: [
              { name: 'Sender', value: senderEmail },
              { name: 'Message', value: senderMessage }
              
            ]
          }],
        };
        try {
          const response = await fetch('https://discord.com/api/webhooks/1262584884233244743/DuxetmdzmhZuE7tS3U9lBVLRn4-tofQvLly5p5umQauWXzpNLNCdmNXFKHRiKSTIW0wv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageBody),
          });
    
          if (response.ok) {
            Swal.fire({
              title: 'Successful Submission!',
              text: 'Your message has been sent successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
              timer: 8000,
            });
            // Set a cooldown using localStorage for 1 week
            cooldownExpiration = new Date(Date.now() + 604800000); // 1 week in milliseconds
            localStorage.setItem('submissionCooldown', cooldownExpiration.toISOString());
            setTimeout(() => {
              location.reload();
            }, 1000); // 1 second delay
          } else {
            document.getElementById('form-response').innerHTML = 'Error: Unable to submit form. Please try again later.';
          }
        } catch (error) {
          document.getElementById('form-response').innerHTML = 'Error: Unable to submit form. Please try again later.';
        }
      }