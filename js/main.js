/**
 * GUTO SPINOZA - PERSONAL TRAINER
 * Main JavaScript File with jQuery
 */

$(document).ready(function() {
    'use strict';

    // ==================== VARIABLES ====================
    const $header = $('#header');
    const $navMenu = $('.nav-menu');
    const $hamburger = $('.hamburger');
    const $navLinks = $('.nav-link');
    const $backToTop = $('.back-to-top');
    const $faqItems = $('.faq-item');
    
    // ==================== HEADER SCROLL ====================
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
        
        // Back to top button visibility
        if ($(this).scrollTop() > 500) {
            $backToTop.addClass('visible');
        } else {
            $backToTop.removeClass('visible');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // ==================== MOBILE MENU ====================
    $hamburger.on('click', function() {
        $(this).toggleClass('active');
        $navMenu.toggleClass('active');
        $('body').toggleClass('menu-open');
    });

    // Close menu when clicking on a link
    $navLinks.on('click', function() {
        $hamburger.removeClass('active');
        $navMenu.removeClass('active');
        $('body').removeClass('menu-open');
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.nav-menu, .hamburger').length) {
            $hamburger.removeClass('active');
            $navMenu.removeClass('active');
            $('body').removeClass('menu-open');
        }
    });

    // ==================== SMOOTH SCROLL ====================
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutQuad');
        }
    });

    // jQuery easing function
    $.easing.easeInOutQuad = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };

    // ==================== ACTIVE NAV LINK ====================
    function updateActiveNavLink() {
        const scrollPosition = $(window).scrollTop() + 100;
        
        $('section[id]').each(function() {
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).outerHeight();
            const sectionId = $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                $navLinks.removeClass('active');
                $navLinks.filter('[href="#' + sectionId + '"]').addClass('active');
            }
        });
    }

    // ==================== FAQ ACCORDION ====================
    $faqItems.find('.faq-question').on('click', function() {
        const $item = $(this).parent();
        
        // Close other items
        $faqItems.not($item).removeClass('active');
        
        // Toggle current item
        $item.toggleClass('active');
    });

    // ==================== TESTIMONIALS SLIDER ====================
    let currentSlide = 0;
    const $slides = $('.depoimento-card');
    const $dots = $('.dot');
    const totalSlides = Math.ceil($slides.length / getVisibleSlides());
    
    function getVisibleSlides() {
        if ($(window).width() >= 992) return 3;
        if ($(window).width() >= 768) return 2;
        return 1;
    }
    
    function updateSlider() {
        const visibleSlides = getVisibleSlides();
        const slideWidth = 100 / visibleSlides;
        
        $slides.each(function(index) {
            const translateX = (index - currentSlide * visibleSlides) * slideWidth;
            $(this).css({
                'flex': '0 0 ' + slideWidth + '%',
                'transform': 'translateX(' + translateX + '%)'
            });
        });
        
        $dots.removeClass('active');
        $dots.eq(currentSlide).addClass('active');
    }
    
    $('.slider-btn.next').on('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });
    
    $('.slider-btn.prev').on('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });
    
    $dots.on('click', function() {
        currentSlide = $(this).index();
        updateSlider();
    });
    
    // Auto slide
    setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);

    // ==================== SCROLL ANIMATIONS ====================
    const $animateElements = $('.step-card, .servico-card, .plano-card, .depoimento-card, .transformacao-card, .vantagens-list li');
    
    function checkVisibility() {
        const windowHeight = $(window).height();
        const windowTop = $(window).scrollTop();
        const windowBottom = windowTop + windowHeight;
        
        $animateElements.each(function() {
            const elementTop = $(this).offset().top;
            const elementHeight = $(this).outerHeight();
            
            if (elementTop + elementHeight * 0.3 <= windowBottom && elementTop + elementHeight >= windowTop) {
                $(this).addClass('animate-on-scroll visible');
            }
        });
    }
    
    $animateElements.addClass('animate-on-scroll');
    
    $(window).on('scroll resize', checkVisibility);
    checkVisibility(); // Initial check

    // ==================== FORM VALIDATION ====================
    $('#form-contato').on('submit', function(e) {
        e.preventDefault();
        
        const $form = $(this);
        const $button = $form.find('button[type="submit"]');
        const originalText = $button.text();
        
        // Simple validation
        let isValid = true;
        $form.find('input[required], select[required], textarea[required]').each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).css('border-color', '#ff4444');
            } else {
                $(this).css('border-color', '');
            }
        });
        
        if (!isValid) {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Email validation
        const email = $('#email').val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, insira um e-mail válido.', 'error');
            $('#email').css('border-color', '#ff4444');
            return;
        }
        
        // Simulate form submission
        $button.prop('disabled', true).text('Enviando...');
        
        // Here you would normally send the form data via AJAX
        // For now, we'll simulate a successful submission
        setTimeout(function() {
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            $form[0].reset();
            $button.prop('disabled', false).text(originalText);
        }, 1500);
    });

    // ==================== NEWSLETTER FORM ====================
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        
        const $input = $(this).find('input[type="email"]');
        const email = $input.val().trim();
        
        if (!email) {
            showNotification('Por favor, insira seu e-mail.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        showNotification('Inscrição realizada com sucesso!', 'success');
        $input.val('');
    });

    // ==================== NOTIFICATION SYSTEM ====================
    function showNotification(message, type) {
        // Remove existing notifications
        $('.notification').remove();
        
        const bgColor = type === 'success' ? '#25D366' : '#ff4444';
        
        const $notification = $('<div class="notification"></div>')
            .css({
                'position': 'fixed',
                'top': '100px',
                'right': '30px',
                'padding': '20px 30px',
                'background': bgColor,
                'color': '#fff',
                'border-radius': '10px',
                'box-shadow': '0 5px 25px rgba(0,0,0,0.3)',
                'z-index': '9999',
                'font-size': '14px',
                'font-weight': '500',
                'transform': 'translateX(150%)',
                'transition': 'transform 0.3s ease'
            })
            .text(message)
            .appendTo('body');
        
        // Animate in
        setTimeout(function() {
            $notification.css('transform', 'translateX(0)');
        }, 100);
        
        // Animate out
        setTimeout(function() {
            $notification.css('transform', 'translateX(150%)');
            setTimeout(function() {
                $notification.remove();
            }, 300);
        }, 4000);
    }

    // ==================== PHONE MASK ====================
    $('#telefone').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        if (value.length > 6) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
        } else if (value.length > 2) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        } else if (value.length > 0) {
            value = '(' + value;
        }
        
        $(this).val(value);
    });

    // ==================== PARALLAX EFFECT ====================
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        
        $('.hero-image img').css({
            'transform': 'translateY(' + scrolled * 0.1 + 'px)'
        });
    });

    // ==================== COUNTER ANIMATION ====================
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        const $stats = $('.stat-number');
        const statsOffset = $('.sobre-stats').offset();
        
        if (statsOffset && $(window).scrollTop() + $(window).height() > statsOffset.top) {
            countersAnimated = true;
            
            $stats.each(function() {
                const $this = $(this);
                const target = $this.text();
                const numericValue = parseInt(target.replace(/\D/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                
                $({ count: 0 }).animate({ count: numericValue }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.count) + suffix);
                    },
                    complete: function() {
                        $this.text(numericValue + suffix);
                    }
                });
            });
        }
    }
    
    $(window).on('scroll', animateCounters);

    // ==================== IMAGE LAZY LOADING ====================
    function lazyLoadImages() {
        $('img[data-src]').each(function() {
            const $img = $(this);
            const imgTop = $img.offset().top;
            const scrollBottom = $(window).scrollTop() + $(window).height() + 200;
            
            if (imgTop < scrollBottom) {
                $img.attr('src', $img.data('src'));
                $img.removeAttr('data-src');
            }
        });
    }
    
    $(window).on('scroll resize', lazyLoadImages);
    lazyLoadImages();

    // ==================== HOVER EFFECTS ====================
    $('.servico-card, .plano-card').on('mouseenter', function() {
        $(this).find('img').css('transform', 'scale(1.1)');
    }).on('mouseleave', function() {
        $(this).find('img').css('transform', 'scale(1)');
    });

    // ==================== WINDOW RESIZE ====================
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu on resize to desktop
            if ($(window).width() > 992) {
                $hamburger.removeClass('active');
                $navMenu.removeClass('active');
                $('body').removeClass('menu-open');
            }
        }, 250);
    });

    // ==================== PRELOADER ====================
    $(window).on('load', function() {
        $('.preloader').fadeOut(500, function() {
            $(this).remove();
        });
    });

    // ==================== INITIALIZE ====================
    // Trigger scroll event on load to set initial states
    $(window).trigger('scroll');
    
    console.log('Guto Spinoza Personal Trainer - Website Loaded Successfully');
});
