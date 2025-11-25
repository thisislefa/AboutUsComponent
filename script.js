function animateNumber(element) {
            const target = parseInt(element.dataset.target);
            const prefix = element.dataset.prefix || '';
            const suffix = element.dataset.suffix || '';
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            const stepDuration = duration / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = prefix + Math.floor(current) + suffix;
            }, stepDuration);
        }

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateNumber(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stat-value').forEach(stat => {
            observer.observe(stat);
        });