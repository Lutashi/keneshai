// Remove preloader on window load
// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);

  // Scroll animations for sections
  const sections = document.querySelectorAll('section');
  const options = {
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Enhanced FAQ
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isActive = answer.classList.contains('active');
      
      document.querySelectorAll('.faq-answer').forEach(item => {
        item.classList.remove('active');
      });
      
      if (!isActive) {
        answer.classList.add('active');
      }
    });
  });
});

// Mentor Hover Animation
document.querySelectorAll('.mentor').forEach(mentor => {
  mentor.addEventListener('mousemove', (e) => {
    const rect = mentor.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mentor.style.transform = `
      perspective(1000px)
      rotateX(${(y - rect.height/2)/10}deg)
      rotateY(${-(x - rect.width/2)/10}deg)
      translateY(-10px)
    `;
  });
  
  mentor.addEventListener('mouseleave', () => {
    mentor.style.transform = 'translateY(-10px)';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  /*** Typed Text Animation ***/
  const typedTextSpan = document.querySelector('.typed-text');
  const textArray = ["начинается здесь", "только с нами", "ждет вас"];
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1000);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, 500);
    }
  }

  if (textArray.length) {
    setTimeout(type, 1000);
  }

  /*** Smooth Scroll for CTA Button ***/
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.querySelector('#consultation');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /*** Counters Animation ***/
  const counters = document.querySelectorAll('.stat h3');
  const speed = 200;
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });

  /*** FAQ Toggle ***/
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isActive = answer.classList.contains('active');
      document.querySelectorAll('.faq-answer').forEach(item => {
        item.classList.remove('active');
      });
      if (!isActive) {
        answer.classList.add('active');
      }
    });
  });

  /*** Starry Background Functions ***/
  function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      // Random size (small stars look better)
      const size = Math.random() * 2 + 1;

      // Random twinkle speed
      const twinkleDuration = Math.random() * 3 + 2;

      // Random drift speed and direction
      const driftDuration = Math.random() * 50 + 30; // Between 30-80 seconds for full drift
      const driftDistance = Math.random() * 10 + 5;   // Distance to drift in pixels
      const driftDirection = Math.random() * 360;     // Random direction in degrees

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDuration = `${twinkleDuration}s, ${driftDuration}s`;
      star.style.setProperty('--drift-distance', `${driftDistance}px`);
      star.style.setProperty('--drift-direction', `${driftDirection}deg`);

      starsContainer.appendChild(star);
    }
  }

  function createParallaxStars() {
    const starsContainer = document.querySelector('.stars');
    const layers = 3;
    const starsPerLayer = 50;

    for (let layer = 1; layer <= layers; layer++) {
      const layerElement = document.createElement('div');
      layerElement.className = `star-layer star-layer-${layer}`;

      for (let i = 0; i < starsPerLayer; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random size (farther layers have smaller stars)
        const size = Math.random() * (4 - layer) + 1;

        // Random twinkle speed
        const duration = Math.random() * 3 + 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;

        layerElement.appendChild(star);
      }

      starsContainer.appendChild(layerElement);
    }

    // Parallax effect based on mouse movement
    document.addEventListener('mousemove', function(e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      document.querySelectorAll('.star-layer').forEach((layer, index) => {
        const depth = index + 1;
        const moveX = (mouseX - 0.5) * depth * 20;
        const moveY = (mouseY - 0.5) * depth * 20;
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  }

  createStars();
  createParallaxStars();

  /*** Smooth Hover Effect for Mentors ***/
  document.querySelectorAll('.mentor').forEach(mentor => {
    mentor.addEventListener('mousemove', (e) => {
      const rect = mentor.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mentor.style.transform = `
        perspective(1000px)
        rotateX(${(y - rect.height / 2) / 10}deg)
        rotateY(${-(x - rect.width / 2) / 10}deg)
        translateY(-10px)
      `;
    });

    mentor.addEventListener('mouseleave', () => {
      mentor.style.transform = 'translateY(-10px)';
    });
  });

  /*** Scroll Animations ***/
  const sections = document.querySelectorAll('section');
  const options = {
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Read More functionality for review cards
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const reviewContent = this.previousElementSibling;
      const isExpanded = reviewContent.classList.contains('expanded');
      const buttonText = this.querySelector('span');
      
      if (!isExpanded) {
        reviewContent.classList.add('expanded');
        buttonText.textContent = 'Свернуть';
        this.classList.add('expanded');
      } else {
        reviewContent.classList.remove('expanded');
        buttonText.textContent = 'Читать далее';
        this.classList.remove('expanded');
      }
    });
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 100; // Adjust this value based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Consultation Form Handling
  const consultationForm = document.getElementById('consultationForm');
  
  if (consultationForm) {
    consultationForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправка...';
      
      try {
        // Get form data
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          location: document.getElementById('location').value,
          major: document.getElementById('major').value,
          ielts: {
            status: document.getElementById('ielts_status').value,
            score: document.getElementById('ielts_score').value
          },
          sat: {
            status: document.getElementById('sat_status').value,
            english: document.getElementById('sat_english').value,
            math: document.getElementById('sat_math').value
          },
          age: document.getElementById('age').value,
          extracurriculars: [],
          honors: [],
          education: document.getElementById('education').value,
          goals: document.getElementById('goals').value
        };

        // Get extracurricular activities
        const extracurricularsContainer = document.getElementById('extracurriculars_container');
        const extracurricularInputs = extracurricularsContainer.querySelectorAll('input[type="text"]');
        const extracurricularTextareas = extracurricularsContainer.querySelectorAll('textarea');
        
        for (let i = 0; i < extracurricularInputs.length; i++) {
          formData.extracurriculars.push({
            activity: extracurricularInputs[i].value,
            description: extracurricularTextareas[i].value
          });
        }

        // Get honors
        const honorsContainer = document.getElementById('honors_container');
        const honorsInputs = honorsContainer.querySelectorAll('input[type="text"]');
        const honorsTextareas = honorsContainer.querySelectorAll('textarea');
        
        for (let i = 0; i < honorsInputs.length; i++) {
          formData.honors.push({
            title: honorsInputs[i].value,
            description: honorsTextareas[i].value
          });
        }

        const response = await fetch('http://localhost:3000/api/consultation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
          consultationForm.reset();
          
          // Clear dynamic fields
          document.getElementById('extracurriculars_container').innerHTML = '';
          document.getElementById('honors_container').innerHTML = '';
        } else {
          throw new Error('Error submitting form');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Записаться на консультацию';
      }
    });
  }

  // Show/hide IELTS score input
  const ieltsStatus = document.getElementById('ielts_status');
  const ieltsScore = document.getElementById('ielts_score');
  
  if (ieltsStatus) {
    ieltsStatus.addEventListener('change', function() {
      ieltsScore.style.display = this.value === 'taken' ? 'block' : 'none';
    });
  }

  // Show/hide SAT scores
  const satStatus = document.getElementById('sat_status');
  const satScores = document.getElementById('sat_scores');
  
  if (satStatus) {
    satStatus.addEventListener('change', function() {
      satScores.style.display = this.value === 'taken' ? 'flex' : 'none';
    });
  }

  // Handle dynamic fields for extracurriculars
  const extracurricularsCount = document.getElementById('extracurriculars_count');
  if (extracurricularsCount) {
    extracurricularsCount.addEventListener('change', function() {
      const container = document.getElementById('extracurriculars_container');
      container.innerHTML = '';
      container.classList.add('visible');

      for (let i = 0; i < this.value; i++) {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        formGroup.innerHTML = `
          <label>Внеклассная активность ${i + 1}</label>
          <input type="text" name="extracurricular_${i + 1}" required>
          <textarea name="extracurricular_desc_${i + 1}" placeholder="Описание" required></textarea>
        `;
        
        container.appendChild(formGroup);
        setTimeout(() => formGroup.classList.add('visible'), 100 * i);
      }
    });
  }

  // Handle dynamic fields for honors
  const honorsCount = document.getElementById('honors_count');
  if (honorsCount) {
    honorsCount.addEventListener('change', function() {
      const container = document.getElementById('honors_container');
      container.innerHTML = '';
      container.classList.add('visible');

      for (let i = 0; i < this.value; i++) {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        formGroup.innerHTML = `
          <label>Достижение ${i + 1}</label>
          <input type="text" name="honor_${i + 1}" required>
          <textarea name="honor_desc_${i + 1}" placeholder="Описание" required></textarea>
        `;
        
        container.appendChild(formGroup);
        setTimeout(() => formGroup.classList.add('visible'), 100 * i);
      }
    });
  }
});

// Notification System
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Trigger reflow
  notification.offsetHeight;
  
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 8px;
    background: rgba(26, 26, 46, 0.95);
    color: #E0E0E0;
    font-size: 1rem;
    transform: translateX(120%);
    transition: transform 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 0, 0.2);
  }
  
  .notification.show {
    transform: translateX(0);
  }
  
  .notification.success {
    border-left: 4px solid #4CAF50;
  }
  
  .notification.error {
    border-left: 4px solid #f44336;
  }
`;
document.head.appendChild(style);
